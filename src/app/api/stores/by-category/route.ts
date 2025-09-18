import { db } from "@/lib/db";
import { TB_stores, TB_categories } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const categoryName = searchParams.get('category');
		const limitParam = searchParams.get('limit');
		const offsetParam = searchParams.get('offset');

		// ضبط الباجينغ: حد افتراضي 20 وبحد أقصى 50
		const pageSizeRaw = Number.parseInt(limitParam ?? '20', 10);
		const pageSize = Number.isNaN(pageSizeRaw) ? 20 : Math.min(Math.max(pageSizeRaw, 1), 50);
		const offsetRaw = Number.parseInt(offsetParam ?? '0', 10);
		const offset = Number.isNaN(offsetRaw) ? 0 : Math.max(offsetRaw, 0);

		if (!categoryName) {
			return NextResponse.json(
				{ error: "اسم القسم مطلوب" },
				{ status: 400 }
			);
		}

		// البحث عن القسم بالاسم أولاً
		const category = await db
			.select()
			.from(TB_categories)
			.where(eq(TB_categories.name, categoryName))
			.limit(1);

		if (category.length === 0) {
			// إذا لم يوجد القسم، إرجاع مصفوفة فارغة
			return NextResponse.json({ 
				stores: [],
				categoryExists: false 
			});
		}

		// جلب المتاجر التي تنتمي لهذا القسم
		// نجلب (pageSize + 1) عنصر لمعرفة إن كان هناك المزيد
		const storesPage = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				rating: TB_stores.rating,
				image: TB_stores.image,
			})
			.from(TB_stores)
			.where(eq(TB_stores.categoryId, category[0].id))
			.orderBy(TB_stores.createdAt)
			.limit(pageSize + 1)
			.offset(offset);

		// تطبيع روابط الصور لضمان العرض الصحيح في الواجهة
		const normalizeImageUrl = (raw?: string | null) => {
			if (!raw) return raw as unknown as string;
			let url = String(raw).trim().replace(/\\/g, "/");
			if (url.startsWith("lh3.googleusercontent.com")) {
				url = `https://${url}`;
			}
			return url;
		};

		const normalizedStoresAll = storesPage.map((s) => ({
			...s,
			image: normalizeImageUrl(s.image),
		}));

		// قص النتائج للحد المطلوب وتحديد إن كان هناك المزيد
		const hasMore = normalizedStoresAll.length > pageSize;
		const normalizedStores = hasMore ? normalizedStoresAll.slice(0, pageSize) : normalizedStoresAll;

		return NextResponse.json({ 
			stores: normalizedStores,
			categoryExists: true,
			category: {
				id: category[0].id,
				name: category[0].name
			},
			hasMore,
			nextOffset: offset + normalizedStores.length,
			limit: pageSize
		});
	} catch (error) {
		console.error("خطأ في جلب المتاجر حسب القسم:", error);
		return NextResponse.json(
			{ stores: [], categoryExists: false },
			{ status: 200 } // إرجاع 200 مع مصفوفة فارغة بدلاً من خطأ
		);
	}
}
