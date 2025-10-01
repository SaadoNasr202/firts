"use server";

import { cache, cacheKey, isValidCacheData } from "@/lib/cache";
import { db } from "@/lib/db";
import { TB_products, TB_stores } from "@/lib/schema";
import { eq, inArray, like, or } from "drizzle-orm";

interface SearchResult {
	id: string;
	name: string;
	type: "store" | "product";
	image: string | null;
	description?: string;
	rating?: number;
	price?: string;
	storeName?: string;
	hasProducts?: boolean;
	hasCategories?: boolean;
}

export async function searchAction(query: string): Promise<{
	results: SearchResult[];
	success: boolean;
	query?: string;
	total?: number;
	cached?: boolean;
	error?: string;
}> {
	try {
		if (!query || query.trim().length === 0) {
			return { results: [], success: true };
		}

		const trimmedQuery = query.trim();

		// التحقق من الكاش
		const cacheKeyForQuery = cacheKey.search(trimmedQuery);
		const cachedResults = cache.get<SearchResult[]>(cacheKeyForQuery);

		if (isValidCacheData(cachedResults)) {
			return {
				results: cachedResults,
				success: true,
				query: trimmedQuery,
				total: cachedResults.length,
				cached: true,
			};
		}

		const searchTerm = `%${trimmedQuery}%`;
		const results: SearchResult[] = [];

		// البحث في المتاجر
		try {
			const stores = await db
				.select({
					id: TB_stores.id,
					name: TB_stores.name,
					image: TB_stores.image,
					type: TB_stores.type,
					rating: TB_stores.rating,
				})
				.from(TB_stores)
				.where(
					or(
						like(TB_stores.name, searchTerm),
						like(TB_stores.type, searchTerm),
					),
				)
				.limit(10);

			// جلب معلومات المنتجات للمتاجر
			const storeIds = stores.map((store) => store.id);
			const storesWithProducts = new Set<string>();

			if (storeIds.length > 0) {
				const products = await db
					.select({ storeId: TB_products.storeId })
					.from(TB_products)
					.where(inArray(TB_products.storeId, storeIds));

				products.forEach((p) => storesWithProducts.add(p.storeId));
			}

			// تحويل المتاجر إلى نتائج البحث
			stores.forEach((store) => {
				results.push({
					id: store.id,
					name: store.name,
					type: "store",
					image: store.image,
					description: `${store.name} - ${store.type || "متجر"}`,
					rating: typeof store.rating === "number" ? store.rating : 0,
					hasProducts: storesWithProducts.has(store.id),
					hasCategories: true,
				});
			});
		} catch (storeError) {
			console.error("خطأ في البحث في المتاجر:", storeError);
		}

		// البحث في المنتجات
		try {
			const products = await db
				.select({
					id: TB_products.id,
					name: TB_products.name,
					image: TB_products.image,
					price: TB_products.price,
					storeId: TB_products.storeId,
					storeName: TB_stores.name,
				})
				.from(TB_products)
				.leftJoin(TB_stores, eq(TB_products.storeId, TB_stores.id))
				.where(like(TB_products.name, searchTerm))
				.limit(10);

			// تحويل المنتجات إلى نتائج البحث
			products.forEach((product) => {
				results.push({
					id: product.id,
					name: product.name,
					type: "product",
					image: product.image,
					description: `${product.name} - منتج عالي الجودة`,
					price: product.price ? `${product.price} ريال` : undefined,
					storeName: product.storeName || "متجر عام",
				});
			});
		} catch (productError) {
			console.error("خطأ في البحث في المنتجات:", productError);
		}

		// ترتيب النتائج (المتاجر أولاً، ثم المنتجات)
		results.sort((a, b) => {
			if (a.type === "store" && b.type === "product") return -1;
			if (a.type === "product" && b.type === "store") return 1;
			return 0;
		});

		// حفظ النتائج في الكاش 5 دقائق
		cache.set(cacheKeyForQuery, results, 300);

		return {
			results,
			success: true,
			query: trimmedQuery,
			total: results.length,
			cached: false,
		};
	} catch (error) {
		console.error("خطأ في البحث:", error);
		return {
			error: "فشل في البحث",
			results: [],
			success: false,
		};
	}
}
