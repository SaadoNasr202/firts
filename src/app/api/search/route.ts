import { db } from "@/lib/db";
import { TB_stores, TB_products } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { or, like, and, eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

interface SearchResult {
	id: string;
	name: string;
	type: "store" | "product";
	image: string | null;
	description?: string;
	rating?: number;
	price?: string;
	storeName?: string;
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get('q');

		if (!query || query.trim().length === 0) {
			return NextResponse.json({ 
				results: [],
				success: true 
			});
		}

		const searchTerm = `%${query.trim()}%`;
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
						like(TB_stores.type, searchTerm)
					)
				)
				.limit(10);

			// تحويل المتاجر إلى نتائج البحث
			stores.forEach(store => {
				results.push({
					id: store.id,
					name: store.name,
					type: "store",
					image: store.image,
					description: `${store.name} - ${store.type || "متجر"}`,
					rating: typeof store.rating === 'number' ? store.rating : 0,
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
			products.forEach(product => {
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
			if (a.type === 'store' && b.type === 'product') return -1;
			if (a.type === 'product' && b.type === 'store') return 1;
			return 0;
		});

		return NextResponse.json({ 
			results,
			success: true,
			query: query.trim(),
			total: results.length
		});

	} catch (error) {
		console.error("خطأ في البحث:", error);
		return NextResponse.json(
			{ 
				error: "فشل في البحث",
				results: [],
				success: false 
			},
			{ status: 500 }
		);
	}
}
