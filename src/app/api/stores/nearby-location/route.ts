import { db } from "@/lib/db";
import { TB_stores, TB_store_categories, TB_products } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { inArray, sql, and, gte } from "drizzle-orm";

export const dynamic = 'force-dynamic';

// دالة حساب المسافة بين نقطتين باستخدام Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371; // نصف قطر الأرض بالكيلومتر
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
		Math.sin(dLon/2) * Math.sin(dLon/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return R * c; // المسافة بالكيلومتر
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userLat = searchParams.get('lat');
		const userLng = searchParams.get('lng');
		const limitParam = searchParams.get('limit');
		const maxDistanceParam = searchParams.get('maxDistance'); // المسافة القصوى بالكيلومتر

		// ضبط المعاملات
		const limit = Math.min(parseInt(limitParam || '20'), 50);
		const maxDistance = parseFloat(maxDistanceParam || '10'); // 10 كم افتراضياً

		if (!userLat || !userLng) {
			return NextResponse.json(
				{ error: "إحداثيات الموقع مطلوبة" },
				{ status: 400 }
			);
		}

		const userLatNum = parseFloat(userLat);
		const userLngNum = parseFloat(userLng);

		if (isNaN(userLatNum) || isNaN(userLngNum)) {
			return NextResponse.json(
				{ error: "إحداثيات غير صحيحة" },
				{ status: 400 }
			);
		}

		// جلب جميع المتاجر التي لها موقع
		const stores = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				rating: TB_stores.rating,
				image: TB_stores.image,
				location: TB_stores.location,
			})
			.from(TB_stores)
			.where(sql`${TB_stores.location} IS NOT NULL AND ${TB_stores.location} != ''`)
			.orderBy(TB_stores.createdAt);

		// تطبيع روابط الصور
		const normalizeImageUrl = (raw?: string | null) => {
			if (!raw) return raw as unknown as string;
			let url = String(raw).trim().replace(/\\/g, "/");
			if (url.startsWith("lh3.googleusercontent.com")) {
				url = `https://${url}`;
			}
			return url;
		};

		// جلب شعارات المتاجر
		const storeIds = stores.map(s => s.id);
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

				for (const row of logos) {
					if (!storeLogosMap.has(row.storeId) && row.storelogo) {
						storeLogosMap.set(row.storeId, row.storelogo);
					}
				}
			} catch {}
		}

		// جلب معلومات المنتجات
		const storesWithProducts = new Set<string>();
		if (storeIds.length > 0) {
			const products = await db
				.select({ storeId: TB_products.storeId })
				.from(TB_products)
				.where(inArray(TB_products.storeId, storeIds));
			
			products.forEach(p => storesWithProducts.add(p.storeId));
		}

		// حساب المسافات وتصفية المتاجر
		const storesWithDistance = stores
			.map(store => {
				if (!store.location) return null;
				
				const coords = store.location.split(',').map(coord => parseFloat(coord.trim()));
				if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
					return null;
				}

				const [storeLat, storeLng] = coords;
				const distance = calculateDistance(userLatNum, userLngNum, storeLat, storeLng);
				
				if (distance > maxDistance) return null;

				return {
					...store,
					image: normalizeImageUrl(store.image),
					logo: storeLogosMap.get(store.id) ?? null,
					hasProducts: storesWithProducts.has(store.id),
					distance: Math.round(distance * 10) / 10, // تقريب لرقم عشري واحد
					storeLat,
					storeLng
				};
			})
			.filter(store => store !== null)
			.sort((a, b) => a!.distance - b!.distance) // ترتيب حسب المسافة
			.slice(0, limit);

		return NextResponse.json({
			stores: storesWithDistance,
			userLocation: { lat: userLatNum, lng: userLngNum },
			maxDistance,
			total: storesWithDistance.length
		});

	} catch (error) {
		console.error("خطأ في جلب المتاجر القريبة:", error);
		return NextResponse.json(
			{ error: "فشل في جلب المتاجر القريبة" },
			{ status: 500 }
		);
	}
}
