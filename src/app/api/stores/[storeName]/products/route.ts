import { db } from "@/lib/db";
import { TB_products, TB_stores, TB_store_categories } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

		// البحث عن المتجر بالاسم
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, params.storeName))
			.limit(1);

		if (store.length === 0) {
			return NextResponse.json({ 
				products: [],
				storeExists: false 
			});
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
			return NextResponse.json({ 
				products: [],
				storeExists: true,
				categoryExists: false 
			});
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

		return NextResponse.json({ 
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
		});
	} catch (error) {
		console.error("خطأ في جلب منتجات المتجر:", error);
		return NextResponse.json(
			{ products: [], storeExists: false, categoryExists: false },
			{ status: 200 }
		);
	}
}
