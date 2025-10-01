"use server";

import { db } from "@/lib/db";
import {
	TB_categories,
	TB_products,
	TB_store_categories,
	TB_stores,
} from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";

// السيرفر أكشن: بترجع Promise فيها البيانات
export async function getStoresByCategory(
	categoryName: string,
	limitParam?: string,
	offsetParam?: string,
): Promise<{
	stores: any[];
	categoryExists: boolean;
	category?: { id: string; name: string };
	hasMore?: boolean;
	nextOffset?: number;
	limit?: number;
	total?: number;
	error?: string;
}> {
	try {
		// ضبط الباجينغ
		const pageSizeRaw = Number.parseInt(limitParam ?? "20", 10);
		const pageSize = Number.isNaN(pageSizeRaw)
			? 20
			: Math.min(Math.max(pageSizeRaw, 1), 50);
		const offsetRaw = Number.parseInt(offsetParam ?? "0", 10);
		const offset = Number.isNaN(offsetRaw) ? 0 : Math.max(offsetRaw, 0);

		if (!categoryName) {
			return {
				error: "اسم القسم مطلوب",
				stores: [],
				categoryExists: false,
			};
		}

		// البحث عن القسم
		const category = await db
			.select()
			.from(TB_categories)
			.where(eq(TB_categories.name, categoryName))
			.limit(1);

		if (category.length === 0) {
			return {
				stores: [],
				categoryExists: false,
			};
		}

		// جلب جميع المتاجر
		const allStores = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				rating: TB_stores.rating,
				image: TB_stores.image,
				location: TB_stores.location,
			})
			.from(TB_stores)
			.where(eq(TB_stores.categoryId, category[0].id))
			.orderBy(TB_stores.createdAt);

		// دالة لتطبيع روابط الصور
		const normalizeImageUrl = (raw?: string | null) => {
			if (!raw) return raw as unknown as string;
			let url = String(raw).trim().replace(/\\/g, "/");
			if (url.startsWith("lh3.googleusercontent.com")) {
				url = `https://${url}`;
			}
			return url;
		};

		const normalizedStoresAll = allStores.map((s) => ({
			...s,
			image: normalizeImageUrl(s.image),
		}));

		// جلب الشعارات
		const storeIds = normalizedStoresAll.map((s) => s.id);
		let storeLogosMap = new Map<string, string | null>();
		if (storeIds.length > 0) {
			try {
				const logos = await db
					.select({
						storeId: TB_store_categories.storeId,
						storelogo: TB_store_categories.storelogo,
					})
					.from(TB_store_categories)
					.where(inArray(TB_store_categories.storeId, storeIds));

				for (const row of logos) {
					if (!storeLogosMap.has(row.storeId) && row.storelogo) {
						storeLogosMap.set(row.storeId, row.storelogo);
					}
				}
			} catch {}
		}

		// جلب معلومات المنتجات
		const storesWithProducts = new Set<string>();
		if (storeIds.length > 0) {
			const products = await db
				.select({ storeId: TB_products.storeId })
				.from(TB_products)
				.where(inArray(TB_products.storeId, storeIds));

			products.forEach((p) => storesWithProducts.add(p.storeId));
		}

		const enrichedStoresAll = normalizedStoresAll.map((s) => ({
			...s,
			logo: storeLogosMap.get(s.id) ?? null,
			hasProducts: storesWithProducts.has(s.id),
			hasCategories: true,
		}));

		// إزالة التكرار بالاسم
		const uniqueStores = new Map<string, (typeof enrichedStoresAll)[0]>();
		enrichedStoresAll.forEach((store) => {
			if (!uniqueStores.has(store.name)) {
				uniqueStores.set(store.name, store);
			}
		});
		const deduplicatedStores = Array.from(uniqueStores.values());

		// ترتيب: اللي عنده منتجات أولاً
		const sortedStores = deduplicatedStores.sort((a, b) => {
			if (a.hasProducts === b.hasProducts) return 0;
			return a.hasProducts ? -1 : 1;
		});

		// تطبيق الباجينغ
		const startIndex = offset;
		const endIndex = offset + pageSize;
		const paginatedStores = sortedStores.slice(startIndex, endIndex);
		const hasMore = endIndex < sortedStores.length;

		return {
			stores: paginatedStores,
			categoryExists: true,
			category: {
				id: category[0].id,
				name: category[0].name,
			},
			hasMore,
			nextOffset: hasMore ? endIndex : offset + paginatedStores.length,
			limit: pageSize,
			total: sortedStores.length,
		};
	} catch (error) {
		console.error("خطأ في جلب المتاجر حسب القسم:", error);
		return {
			stores: [],
			categoryExists: false,
		};
	}
}
