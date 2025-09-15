import { db } from "@/lib/db";
import { TB_products, TB_stores } from "@/lib/schema";
import { eq, ne, and, notInArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get('category');
		const exclude = searchParams.get('exclude');
		const limit = parseInt(searchParams.get('limit') || '10');

		// بناء الشروط
		const conditions = [];
		
		if (category) {
			conditions.push(eq(TB_stores.type, category));
		}
		
		// دعم استبعاد عدة منتجات
		if (exclude) {
			const excludeIds = exclude.split(',').filter(id => id.trim());
			if (excludeIds.length === 1) {
				conditions.push(ne(TB_products.id, excludeIds[0]));
			} else if (excludeIds.length > 1) {
				conditions.push(notInArray(TB_products.id, excludeIds));
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
		const products = conditions.length > 0 
			? await baseQuery.where(and(...conditions)).limit(limit)
			: await baseQuery.limit(limit);

		// تحويل البيانات للتنسيق المطلوب
		const formattedProducts = products.map(product => ({
			id: product.id,
			name: product.name,
			description: `${product.name} - منتج عالي الجودة`,
			image: product.image,
			price: product.price,
			originalPrice: product.originalPrice,
			unit: product.unit,
			storeId: product.storeId,
			storeName: product.storeName || "متجر عام",
			category: product.storeType || "منتجات عامة",
		}));

		return NextResponse.json({ 
			products: formattedProducts,
			success: true 
		});
	} catch (error) {
		console.error("خطأ في جلب المنتجات:", error);
		return NextResponse.json(
			{ error: "فشل في جلب المنتجات" },
			{ status: 500 }
		);
	}
}
