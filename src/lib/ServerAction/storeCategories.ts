"use server";

import { db } from "@/lib/db";
import { TB_store_categories, TB_stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cache, cacheKey, isValidCacheData } from "@/lib/cache";

export async function getStoreCategoriesAction(storeName: string): Promise<{
	categories: string[];
	storeCategories: any[];
	storeExists: boolean;
	store?: {
		id: string;
		name: string;
		type: string;
		rating: string | null;
		image: string | null;
	};
	cached?: boolean;
	error?: string;
}> {
	try {
		if (!storeName) {
			return {
				categories: [],
				storeCategories: [],
				storeExists: false,
				error: "اسم المتجر مطلوب",
			};
		}

		// التحقق من التخزين المؤقت أولاً
		const cacheKeyForStore = `store-categories:${storeName}`;
		const cachedData = cache.get<any>(cacheKeyForStore);
		
		if (isValidCacheData(cachedData)) {
			return {
				...cachedData,
				cached: true,
			};
		}

		// البحث عن المتجر بالاسم أولاً
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, storeName))
			.limit(1);

		if (store.length === 0) {
			// إذا لم يوجد المتجر، إرجاع array فارغ بدلاً من خطأ
			const emptyResult = { 
				categories: [],
				storeCategories: [],
				storeExists: false,
			};
			// حفظ النتيجة الفارغة في التخزين المؤقت لمدة دقيقة واحدة
			cache.set(cacheKeyForStore, emptyResult, 60);
			return emptyResult;
		}

		// جلب أقسام المتجر
		const storeCategories = await db
			.select({
				id: TB_store_categories.id,
				name: TB_store_categories.name,
				storecover: TB_store_categories.storecover,
				storelogo: TB_store_categories.storelogo,
			})
			.from(TB_store_categories)
			.where(eq(TB_store_categories.storeId, store[0].id))
			.orderBy(TB_store_categories.createdAt);

		const result = { 
			categories: storeCategories.map(cat => cat.name), // إرجاع أسماء فقط مثل الـ array الأصلي
			storeCategories: storeCategories, // إرجاع الأقسام كاملة مع الصور
			storeExists: true,
			store: {
				id: store[0].id,
				name: store[0].name,
				type: store[0].type,
				rating: store[0].rating,
				image: store[0].image
			}
		};

		// حفظ النتائج في التخزين المؤقت لمدة 10 دقائق
		cache.set(cacheKeyForStore, result, 600);

		return {
			...result,
			cached: false,
		};
	} catch (error) {
		console.error("خطأ في جلب أقسام المتجر:", error);
		return {
			categories: [],
			storeCategories: [],
			storeExists: false,
			error: "فشل في جلب أقسام المتجر",
		};
	}
}
