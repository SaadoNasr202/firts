import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_cart, TB_cartItems, TB_products, TB_stores } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

// الحصول على السلة
export async function GET() {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return NextResponse.json({ error: "غير مسجل دخول" }, { status: 401 });
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return NextResponse.json({ error: "جلسة غير صالحة" }, { status: 401 });
		}

		// البحث عن السلة
		const cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			// إنشاء سلة جديدة إذا لم تكن موجودة
			const newCartId = `cart_${Date.now()}_${user.id}`;
			await db.insert(TB_cart).values({
				id: newCartId,
				userId: user.id,
			});

			return NextResponse.json({
				id: newCartId,
				items: [],
				totalAmount: 0,
				itemsCount: 0,
			});
		}

		// جلب عناصر السلة مع تفاصيل المنتجات والمتاجر
		const cartItems = await db
			.select({
				id: TB_cartItems.id,
				productId: TB_cartItems.productId,
				productName: TB_products.name,
				productImage: TB_products.image,
				storeId: TB_cartItems.storeId,
				storeName: TB_stores.name,
				quantity: TB_cartItems.quantity,
				priceAtAdd: TB_cartItems.priceAtAdd,
			})
			.from(TB_cartItems)
			.leftJoin(TB_products, eq(TB_cartItems.productId, TB_products.id))
			.leftJoin(TB_stores, eq(TB_cartItems.storeId, TB_stores.id))
			.where(eq(TB_cartItems.cartId, cart[0].id));

		// حساب الإجمالي
		const items = cartItems.map(item => ({
			...item,
			totalPrice: parseFloat(item.priceAtAdd || "0") * item.quantity,
		}));

		const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
		const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

		return NextResponse.json({
			id: cart[0].id,
			items,
			totalAmount,
			itemsCount,
		});

	} catch (error) {
		console.error("خطأ في جلب السلة:", error);
		return NextResponse.json(
			{ error: "خطأ في الخادم" },
			{ status: 500 }
		);
	}
}
