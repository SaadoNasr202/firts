import { db } from "@/lib/db";
import { TB_stores, TB_categories, TB_store_categories, TB_products } from "@/lib/schema";
import { eq, inArray, sql } from "drizzle-orm";
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

		// جلب جميع المتاجر التي تنتمي لهذا القسم أولاً
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

		// تطبيع روابط الصور لضمان العرض الصحيح في الواجهة
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

        // جلب شعارات المتاجر (storelogo) من أول قسم مرتبط بكل متجر
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

                // نختار أول لوجو موجود لكل متجر
                for (const row of logos) {
                    if (!storeLogosMap.has(row.storeId) && row.storelogo) {
                        storeLogosMap.set(row.storeId, row.storelogo);
                    }
                }
            } catch {}
        }

        // جلب معلومات المنتجات لكل متجر
        const storeIdsForProducts = normalizedStoresAll.map(s => s.id);
        const storesWithProducts = new Set<string>();
        
        if (storeIdsForProducts.length > 0) {
            const products = await db
                .select({ storeId: TB_products.storeId })
                .from(TB_products)
                .where(inArray(TB_products.storeId, storeIdsForProducts));
            
            products.forEach(p => storesWithProducts.add(p.storeId));
        }

        const enrichedStoresAll = normalizedStoresAll.map((s) => ({
            ...s,
            logo: storeLogosMap.get(s.id) ?? null,
            hasProducts: storesWithProducts.has(s.id),
            hasCategories: true, // نفترض أن جميع المتاجر لها أقسام
        }));

        // إزالة التكرار: نأخذ أول مطعم لكل اسم
        const uniqueStores = new Map<string, typeof enrichedStoresAll[0]>();
        enrichedStoresAll.forEach(store => {
            if (!uniqueStores.has(store.name)) {
                uniqueStores.set(store.name, store);
            }
        });
        const deduplicatedStores = Array.from(uniqueStores.values());

        // ترتيب بسيط: المطاعم مع المنتجات أولاً
        const sortedStores = deduplicatedStores.sort((a, b) => {
            if (a.hasProducts === b.hasProducts) return 0;
            return a.hasProducts ? -1 : 1;
        });

		// تطبيق الـ pagination بعد الترتيب
		const startIndex = offset;
		const endIndex = offset + pageSize;
		const paginatedStores = sortedStores.slice(startIndex, endIndex);
		const hasMore = endIndex < sortedStores.length;

		return NextResponse.json({ 
			stores: paginatedStores,
			categoryExists: true,
			category: {
				id: category[0].id,
				name: category[0].name
			},
			hasMore,
			nextOffset: hasMore ? endIndex : offset + paginatedStores.length,
			limit: pageSize,
			total: sortedStores.length
		});
	} catch (error) {
		console.error("خطأ في جلب المتاجر حسب القسم:", error);
		return NextResponse.json(
			{ stores: [], categoryExists: false },
			{ status: 200 } // إرجاع 200 مع مصفوفة فارغة بدلاً من خطأ
		);
	}
}
