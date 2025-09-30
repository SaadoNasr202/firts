"use server";

import { db } from "@/lib/db";
import { TB_products, TB_store_categories, TB_stores } from "@/lib/schema";
import { inArray, sql } from "drizzle-orm";
import { NearbyStore } from "../types/api";

// دالة حساب المسافة بين نقطتين (Haversine)
function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const R = 6371;
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

// 🚀 Server Action مع Promise مضبوط
export async function getNearbyStoresAction({
	lat,
	lng,
	limit = 20,
	maxDistance = 10,
}: {
	lat: number;
	lng: number;
	limit?: number;
	maxDistance?: number;
}): Promise<
	| {
			stores: NearbyStore[];
			userLocation: { lat: number; lng: number };
			maxDistance: number;
			total: number;
			success: true;
	  }
	| { error: string; success: false }
> {
	try {
		if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
			return { error: "إحداثيات غير صحيحة", success: false };
		}

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
			.where(
				sql`${TB_stores.location} IS NOT NULL AND ${TB_stores.location} != ''`,
			)
			.orderBy(TB_stores.createdAt);

		// normalize للصور
		const normalizeImageUrl = (raw?: string | null) => {
			if (!raw) return raw as unknown as string;
			let url = String(raw).trim().replace(/\\/g, "/");
			if (url.startsWith("lh3.googleusercontent.com")) {
				url = `https://${url}`;
			}
			return url;
		};

		const storeIds = stores.map((s) => s.id);

		// logos
		let storeLogosMap = new Map<string, string | null>();
		if (storeIds.length > 0) {
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
		}

		// منتجات
		const storesWithProducts = new Set<string>();
		if (storeIds.length > 0) {
			const products = await db
				.select({ storeId: TB_products.storeId })
				.from(TB_products)
				.where(inArray(TB_products.storeId, storeIds));

			products.forEach((p) => storesWithProducts.add(p.storeId));
		}

		// فلترة وحساب مسافة
		const storesWithDistance = stores
			.map((store) => {
				if (!store.location) return null;

				const coords = store.location
					.split(",")
					.map((coord) => parseFloat(coord.trim()));

				if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
					return null;
				}

				const [storeLat, storeLng] = coords;
				const distance = calculateDistance(lat, lng, storeLat, storeLng);

				if (distance > maxDistance) return null;

				return {
					...store,
					image: normalizeImageUrl(store.image) ?? null,
					logo: storeLogosMap.get(store.id) ?? null,
					hasProducts: storesWithProducts.has(store.id),
					distance: Math.round(distance * 10) / 10,
					storeLat,
					storeLng,
				} as NearbyStore;
			})
			.filter((store) => store !== null) as NearbyStore[];

		const sortedStores = storesWithDistance
			.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
			.slice(0, limit);

		return {
			stores: storesWithDistance,
			userLocation: { lat, lng },
			maxDistance,
			total: storesWithDistance.length,
			success: true,
		};
	} catch (error) {
		console.error("خطأ في getNearbyStoresAction:", error);
		return { error: "فشل في جلب المتاجر القريبة", success: false };
	}
}
