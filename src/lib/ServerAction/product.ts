"use server";

import { db } from "@/lib/db";
import { TB_products, TB_stores } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

// ✅ Server Action لجلب المنتجات
export async function getProductsAction({
	limit = 50,
	category,
	exclude,
}: {
	limit?: number;
	category?: string;
	exclude?: string;
} = {}): Promise<{
	products: any[];
	success: boolean;
	error?: string;
}> {
	try {
		// بناء الشروط
		const conditions = [];

		if (category) {
			conditions.push(eq(TB_stores.type, category));
		}

		// دعم استبعاد عدة منتجات
		if (exclude) {
			const excludeIds = exclude.split(",").filter((id) => id.trim());
			if (excludeIds.length === 1) {
				conditions.push(eq(TB_products.id, excludeIds[0]));
			} else if (excludeIds.length > 1) {
				// يمكن إضافة notInArray هنا لاحقاً
			}
		}

		// بناء الـ query مع الشروط
		const baseQuery = db
			.select({
				id: TB_products.id,
				name: TB_products.name,
				image: TB_products.image,
				price: TB_products.price,
				originalPrice: TB_products.originalPrice,
				unit: TB_products.unit,
				storeId: TB_products.storeId,
				storeName: TB_stores.name,
				storeType: TB_stores.type,
			})
			.from(TB_products)
			.leftJoin(TB_stores, eq(TB_products.storeId, TB_stores.id));

		// تطبيق الشروط والحصول على النتائج
		const products =
			conditions.length > 0
				? await baseQuery.where(and(...conditions)).limit(limit)
				: await baseQuery.limit(limit);

		// تحويل البيانات للتنسيق المطلوب
		const formattedProducts = products.map((product) => ({
			id: product.id,
			name: product.name,
			description: `${product.name} - منتج عالي الجودة`,
			image: product.image,
			price: product.price,
			original_price: product.originalPrice,
			unit: product.unit,
			storeId: product.storeId,
			storeName: product.storeName || "متجر عام",
			category: product.storeType || "منتجات عامة",
		}));

		return {
			products: formattedProducts,
			success: true,
		};
	} catch (error) {
		console.error("خطأ في جلب المنتجات:", error);
		return {
			products: [],
			success: false,
			error: "فشل في جلب المنتجات",
		};
	}
}
