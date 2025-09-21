import { db } from "@/lib/db";
import { TB_products, TB_stores, TB_store_categories } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { cache, isValidCacheData } from "@/lib/cache";

export const dynamic = 'force-dynamic';

export async function GET(
	request: NextRequest,
	{ params }: { params: { storeName: string } }
) {
	try {
		const { searchParams } = new URL(request.url);
		const categoryName = searchParams.get('category');

		if (!categoryName) {
			return NextResponse.json(
				{ error: "اسم القسم مطلوب" },
				{ status: 400 }
			);
		}

		// التحقق من التخزين المؤقت أولاً
		const cacheKeyForProducts = `products:${params.storeName}:${categoryName}`;
		const cachedData = cache.get<any>(cacheKeyForProducts);
		
		if (isValidCacheData(cachedData)) {
			return NextResponse.json({ 
				...cachedData,
				cached: true
			});
		}

		// البحث عن المتجر بالاسم
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, params.storeName))
			.limit(1);

		if (store.length === 0) {
			const emptyResult = { 
				products: [],
				storeExists: false 
			};
			cache.set(cacheKeyForProducts, emptyResult, 60);
			return NextResponse.json(emptyResult);
		}

		// البحث عن القسم في المتجر
		const storeCategory = await db
			.select()
			.from(TB_store_categories)
			.where(
				and(
					eq(TB_store_categories.storeId, store[0].id),
					eq(TB_store_categories.name, categoryName)
				)
			)
			.limit(1);

		if (storeCategory.length === 0) {
			const emptyResult = { 
				products: [],
				storeExists: true,
				categoryExists: false 
			};
			cache.set(cacheKeyForProducts, emptyResult, 60);
			return NextResponse.json(emptyResult);
		}

		// جلب المنتجات من المتجر المفلترة حسب القسم
		const products = await db
			.select({
				id: TB_products.id,
				name: TB_products.name,
				image: TB_products.image,
				price: TB_products.price,
				originalPrice: TB_products.originalPrice,
				unit: TB_products.unit,
			})
			.from(TB_products)
			.where(
				and(
					eq(TB_products.storeId, store[0].id),
					eq(TB_products.storeCategoryId, storeCategory[0].id)
				)
			);

		const result = { 
			products,
			storeExists: true,
			categoryExists: true,
			store: {
				id: store[0].id,
				name: store[0].name
			},
			category: {
				id: storeCategory[0].id,
				name: storeCategory[0].name
			}
		};

		// حفظ النتائج في التخزين المؤقت لمدة 5 دقائق
		cache.set(cacheKeyForProducts, result, 300);

		return NextResponse.json({ 
			...result,
			cached: false
		});
	} catch (error) {
		console.error("خطأ في جلب منتجات المتجر:", error);
		return NextResponse.json(
			{ products: [], storeExists: false, categoryExists: false },
			{ status: 200 }
		);
	}
}
