"use server";
import { cache, cacheKey, isValidCacheData } from "@/lib/cache";
import { db } from "@/lib/db";
import { TB_categories } from "@/lib/schema";
import { Category } from "../types/api";

export async function getCategoriesAction(): Promise<
	| { categories: Category[]; cached: boolean; success: boolean }
	| { error: string }
> {
	try {
		// التحقق من الكاش
		const cacheKeyForCategories = cacheKey.categories();
		const cachedCategories = cache.get<Category[]>(cacheKeyForCategories);

		if (isValidCacheData(cachedCategories)) {
			return {
				categories: cachedCategories,
				success: true,
				cached: true,
			};
		}

		let categories: Category[] = [];

		try {
			// جلب البيانات من قاعدة البيانات
			const result = await db
				.select({
					id: TB_categories.id,
					name: TB_categories.name,
					description: TB_categories.description,
					image: TB_categories.image,
				})
				.from(TB_categories)
				.orderBy(TB_categories.createdAt);

			categories = result.map((cat) => ({
				id: cat.id,
				name: cat.name,
				description: cat.description || undefined,
				image: cat.image || undefined,
			}));
		} catch (dbError) {
			console.log(
				"جدول categories غير موجود في قاعدة البيانات، سيتم استخدام بيانات افتراضية مؤقتة",
			);
		}

		// حفظ الكاش لمدة دقيقتين
		cache.set(cacheKeyForCategories, categories, 120);

		return {
			categories,
			success: true,
			cached: false,
		};
	} catch (error) {
		console.error("خطأ في جلب الأقسام:", error);
		return { error: "فشل في جلب الأقسام" };
	}
}
