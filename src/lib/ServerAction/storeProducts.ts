"use server";

import { db } from "@/lib/db";
import { TB_products, TB_stores, TB_store_categories } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { cache, isValidCacheData } from "@/lib/cache";

// جلب منتجات متجر معين حسب القسم
export async function getStoreProductsAction(
	storeName: string,
	categoryName: string,
): Promise<{
	products: Array<{
		id: string;
		name: string;
		image: string;
		price: string;
		originalPrice?: string;
		unit?: string;
	}>;
	storeExists: boolean;
	categoryExists?: boolean;
	store?: {
		id: string;
		name: string;
	};
	category?: {
		id: string;
		name: string;
	};
	cached?: boolean;
	error?: string;
}> {
	try {
		if (!categoryName) {
			return {
				products: [],
				storeExists: false,
				error: "اسم القسم مطلوب",
			};
		}

		// التحقق من التخزين المؤقت أولاً
		const cacheKeyForProducts = `products:${storeName}:${categoryName}`;
		const cachedData = cache.get<any>(cacheKeyForProducts);

		if (isValidCacheData(cachedData)) {
			return {
				...cachedData,
				cached: true,
			};
		}

		// البحث عن المتجر بالاسم
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, storeName))
			.limit(1);

		if (store.length === 0) {
			const emptyResult = {
				products: [],
				storeExists: false,
			};
			cache.set(cacheKeyForProducts, emptyResult, 60);
			return emptyResult;
		}

		// البحث عن القسم في المتجر
		const storeCategory = await db
			.select()
			.from(TB_store_categories)
			.where(
				and(
					eq(TB_store_categories.storeId, store[0].id),
					eq(TB_store_categories.name, categoryName),
				),
			)
			.limit(1);

		if (storeCategory.length === 0) {
			const emptyResult = {
				products: [],
				storeExists: true,
				categoryExists: false,
			};
			cache.set(cacheKeyForProducts, emptyResult, 60);
			return emptyResult;
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
					eq(TB_products.storeCategoryId, storeCategory[0].id),
				),
			);

		const result = {
			products,
			storeExists: true,
			categoryExists: true,
			store: {
				id: store[0].id,
				name: store[0].name,
			},
			category: {
				id: storeCategory[0].id,
				name: storeCategory[0].name,
			},
		};

		// حفظ النتائج في التخزين المؤقت لمدة 5 دقائق
		cache.set(cacheKeyForProducts, result, 300);

		return {
			...result,
			cached: false,
		};
	} catch (error) {
		console.error("خطأ في جلب منتجات المتجر:", error);
		return {
			products: [],
			storeExists: false,
			categoryExists: false,
			error: "Internal Server Error",
		};
	}
}
