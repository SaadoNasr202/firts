import { db } from "@/lib/db";
import { TB_store_categories, TB_stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { cache, cacheKey, isValidCacheData } from "@/lib/cache";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const storeName = searchParams.get('storeName');

		if (!storeName) {
			return NextResponse.json(
				{ error: "اسم المتجر مطلوب" },
				{ status: 400 }
			);
		}

		// التحقق من التخزين المؤقت أولاً
		const cacheKeyForStore = `store-categories:${storeName}`;
		const cachedData = cache.get<any>(cacheKeyForStore);
		
		if (isValidCacheData(cachedData)) {
			return NextResponse.json({ 
				...cachedData,
				cached: true
			});
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
				storeExists: false 
			};
			// حفظ النتيجة الفارغة في التخزين المؤقت لمدة دقيقة واحدة
			cache.set(cacheKeyForStore, emptyResult, 60);
			return NextResponse.json(emptyResult);
		}

		// جلب أقسام المتجر
		const storeCategories = await db
			.select({
				id: TB_store_categories.id,
				name: TB_store_categories.name,
			})
			.from(TB_store_categories)
			.where(eq(TB_store_categories.storeId, store[0].id))
			.orderBy(TB_store_categories.createdAt);

		const result = { 
			categories: storeCategories.map(cat => cat.name), // إرجاع أسماء فقط مثل الـ array الأصلي
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

		return NextResponse.json({ 
			...result,
			cached: false
		});
	} catch (error) {
		console.error("خطأ في جلب أقسام المتجر:", error);
		return NextResponse.json(
			{ categories: [], storeExists: false },
			{ status: 200 } // إرجاع 200 مع array فارغ بدلاً من خطأ
		);
	}
}
