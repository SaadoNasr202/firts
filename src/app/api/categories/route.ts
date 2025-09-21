import { db } from "@/lib/db";
import { TB_categories } from "@/lib/schema";
import { NextResponse } from "next/server";
import { cache, cacheKey, isValidCacheData } from "@/lib/cache";

export const dynamic = 'force-dynamic';

interface Category {
	id: string;
	name: string;
	description?: string;
}

export async function GET() {
	try {
		// التحقق من التخزين المؤقت أولاً
		const cacheKeyForCategories = cacheKey.categories();
		const cachedCategories = cache.get<Category[]>(cacheKeyForCategories);
		
		if (isValidCacheData(cachedCategories)) {
			return NextResponse.json({ 
				categories: cachedCategories,
				success: true,
				cached: true
			});
		}

		let categories: Category[] = [];
		
		try {
			// محاولة جلب البيانات من قاعدة البيانات
			const result = await db.select({
				id: TB_categories.id,
				name: TB_categories.name,
				description: TB_categories.description,
			}).from(TB_categories).orderBy(TB_categories.createdAt);
			
			categories = result.map(cat => ({
				id: cat.id,
				name: cat.name,
				description: cat.description || undefined
			}));
		} catch (dbError) {
			console.log("جدول categories غير موجود في قاعدة البيانات، سيتم استخدام بيانات افتراضية مؤقتة");
			
			// بيانات افتراضية مؤقتة لحتى يتم إنشاء الجدول
			categories = [
				{ id: "restaurants", name: "المطاعم", description: "مطاعم ومأكولات" },
				{ id: "supermarkets", name: "السوبرماركت", description: "بقالة ومواد غذائية" },
				{ id: "pharmacies", name: "الصيدليات", description: "أدوية ومستلزمات طبية" },
				{ id: "electronics", name: "الإلكترونيات", description: "أجهزة ومعدات إلكترونية" },
				{ id: "clothing", name: "الملابس", description: "أزياء وملابس" },
				{ id: "home", name: "المنزل", description: "مستلزمات منزلية" }
			] as Category[];
		}

		// حفظ النتائج في التخزين المؤقت لمدة 15 دقيقة
		cache.set(cacheKeyForCategories, categories, 900);

		return NextResponse.json({ 
			categories,
			success: true,
			cached: false
		});
	} catch (error) {
		console.error("خطأ في جلب الأقسام:", error);
		return NextResponse.json(
			{ error: "فشل في جلب الأقسام" },
			{ status: 500 }
		);
	}
}
