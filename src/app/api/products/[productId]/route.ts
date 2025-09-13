import { db } from "@/lib/db";
import { TB_products, TB_stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
	request: NextRequest,
	{ params }: { params: { productId: string } }
) {
	try {
		const productId = params.productId;

		if (!productId) {
			return NextResponse.json(
				{ error: "معرف المنتج مطلوب" },
				{ status: 400 }
			);
		}

		// جلب تفاصيل المنتج مع معلومات المتجر
		const productResult = await db
			.select({
				// بيانات المنتج
				id: TB_products.id,
				name: TB_products.name,
				image: TB_products.image,
				price: TB_products.price,
				originalPrice: TB_products.originalPrice,
				unit: TB_products.unit,
				// بيانات المتجر
				storeId: TB_stores.id,
				storeName: TB_stores.name,
				storeType: TB_stores.type,
			})
			.from(TB_products)
			.leftJoin(TB_stores, eq(TB_products.storeId, TB_stores.id))
			.where(eq(TB_products.id, productId))
			.limit(1);

		if (productResult.length === 0) {
			return NextResponse.json(
				{ error: "المنتج غير موجود" },
				{ status: 404 }
			);
		}

		const productData = productResult[0];

		// تحويل البيانات للتنسيق المطلوب
		const product = {
			id: productData.id,
			name: productData.name,
			description: `${productData.name} - منتج عالي الجودة`,
			image: productData.image,
			mainImage: productData.image,
			thumbnailImages: [productData.image],
			category: productData.storeType || "منتجات عامة",
			newPrice: productData.price,
			oldPrice: productData.originalPrice,
			size: productData.unit,
			store: {
				id: productData.storeId,
				name: productData.storeName,
				type: productData.storeType,
			}
		};

		return NextResponse.json({ 
			product,
			success: true 
		});
	} catch (error) {
		console.error("خطأ في جلب تفاصيل المنتج:", error);
		return NextResponse.json(
			{ error: "فشل في جلب تفاصيل المنتج" },
			{ status: 500 }
		);
	}
}
