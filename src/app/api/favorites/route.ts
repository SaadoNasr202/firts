// app/api/favorites/route.ts
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import {
	TB_favouriteStores,
	TB_favouriteusers,
	TB_products,
	TB_stores,
} from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		// جلب الكوكي تبع الجلسة
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من الجلسة
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// هون صار عندك userId من الجلسة
		const userId = user.id;

		// المنتجات المفضلة مع تفاصيلها ومعلومات المتجر
		const favProducts = await db
			.select({
				id: TB_products.id,
				name: TB_products.name,
				image: TB_products.image,
				price: TB_products.price,
				originalPrice: TB_products.originalPrice,
				unit: TB_products.unit,
				storeId: TB_products.storeId,
				storeName: TB_stores.name,
			})
			.from(TB_favouriteusers)
			.innerJoin(TB_products, eq(TB_favouriteusers.productId, TB_products.id))
			.innerJoin(TB_stores, eq(TB_products.storeId, TB_stores.id))
			.where(eq(TB_favouriteusers.userId, userId));

		// المتاجر المفضلة مع تفاصيلها
		const favStores = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				rating: TB_stores.rating,
				image: TB_stores.image,
			})
			.from(TB_favouriteStores)
			.innerJoin(TB_stores, eq(TB_favouriteStores.storeId, TB_stores.id))
			.where(eq(TB_favouriteStores.userId, userId));

		return NextResponse.json({ favProducts, favStores });
	} catch (err) {
		console.error("Error fetching favorites:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
