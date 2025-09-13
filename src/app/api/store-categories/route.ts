import { db } from "@/lib/db";
import { TB_store_categories, TB_stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const storeName = searchParams.get('storeName');

		if (!storeName) {
			return NextResponse.json(
				{ error: "اسم المتجر مطلوب" },
				{ status: 400 }
			);
		}

		// البحث عن المتجر بالاسم أولاً
		const store = await db
			.select()
			.from(TB_stores)
			.where(eq(TB_stores.name, storeName))
			.limit(1);

		if (store.length === 0) {
			// إذا لم يوجد المتجر، إرجاع array فارغ بدلاً من خطأ
			return NextResponse.json({ 
				categories: [],
				storeExists: false 
			});
		}

		// جلب أقسام المتجر
		const storeCategories = await db
			.select({
				id: TB_store_categories.id,
				name: TB_store_categories.name,
			})
			.from(TB_store_categories)
			.where(eq(TB_store_categories.storeId, store[0].id))
			.orderBy(TB_store_categories.createdAt);

		return NextResponse.json({ 
			categories: storeCategories.map(cat => cat.name), // إرجاع أسماء فقط مثل الـ array الأصلي
			storeExists: true,
			store: {
				id: store[0].id,
				name: store[0].name,
				type: store[0].type,
				rating: store[0].rating,
				image: store[0].image
			}
		});
	} catch (error) {
		console.error("خطأ في جلب أقسام المتجر:", error);
		return NextResponse.json(
			{ categories: [], storeExists: false },
			{ status: 200 } // إرجاع 200 مع array فارغ بدلاً من خطأ
		);
	}
}
