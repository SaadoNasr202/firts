"use server";

import { cache, isValidCacheData } from "@/lib/cache";
import { db } from "@/lib/db";
import { TB_store_categories, TB_stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { StoreCategoriesResult } from "../types/api";

export async function getStoreCategoriesAction(
	storeName: string,
): Promise<StoreCategoriesResult> {
	try {
		if (!storeName) {
			return { error: "اسم المتجر مطلوب", success: false };
		}

		const cacheKeyForStore = `store-categories:${storeName}`;
		const cachedData = cache.get<any>(cacheKeyForStore);

		if (isValidCacheData(cachedData)) {
			return {
				...cachedData,
				cached: true,
				success: true,
			};
		}

		// البحث عن المتجر
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, storeName))
			.limit(1);

		if (store.length === 0) {
			const emptyResult = {
				categories: [] as string[], // تعديل
				storeExists: false as const,
				storeCategories: [], // 👈 ضفناها
				cached: false,
				success: false as const,
			};
			cache.set(cacheKeyForStore, emptyResult, 60);
			return emptyResult;
		}

		// جلب الأقسام الخاصة بالمتجر
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

		const result: StoreCategoriesResult = {
			categories: storeCategories.map((cat) => cat.name),
			storeCategories,
			storeExists: true,
			store: {
				id: store[0].id,
				name: store[0].name,
				type: store[0].type,
				rating: store[0].rating
					? parseFloat(store[0].rating as unknown as string) // 👈 تحويل string → number
					: null,
				image: store[0].image,
			},
			cached: false,
			success: true,
		};

		// التخزين المؤقت 10 دقائق
		cache.set(cacheKeyForStore, result, 600);

		return result;
	} catch (error) {
		console.error("خطأ في جلب أقسام المتجر:", error);
		return { error: "فشل في جلب أقسام المتجر", success: false };
	}
}
