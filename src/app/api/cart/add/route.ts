import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_cart, TB_cartItems, TB_products } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "lucia";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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

		const { productId, storeId, quantity = 1 } = await request.json();

		if (!productId || !storeId) {
			return NextResponse.json({ error: "معرف المنتج والمتجر مطلوبان" }, { status: 400 });
		}

		// التحقق من وجود المنتج
		const product = await db
			.select()
			.from(TB_products)
			.where(eq(TB_products.id, productId))
			.limit(1);

		if (product.length === 0) {
			return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
		}

		// البحث عن السلة أو إنشاء واحدة جديدة
		let cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			const newCartId = `cart_${Date.now()}_${user.id}`;
			await db.insert(TB_cart).values({
				id: newCartId,
				userId: user.id,
			});
			cart = [{ id: newCartId, userId: user.id, createdAt: new Date() }];
		}

		// التحقق من وجود المنتج في السلة
		const existingItem = await db
			.select()
			.from(TB_cartItems)
			.where(
				and(
					eq(TB_cartItems.cartId, cart[0].id),
					eq(TB_cartItems.productId, productId)
				)
			)
			.limit(1);

		if (existingItem.length > 0) {
			// تحديث الكمية إذا كان المنتج موجود
			await db
				.update(TB_cartItems)
				.set({ 
					quantity: existingItem[0].quantity + quantity 
				})
				.where(eq(TB_cartItems.id, existingItem[0].id));
		} else {
			// إضافة منتج جديد للسلة
			const cartItemId = generateId(15);
			await db.insert(TB_cartItems).values({
				id: cartItemId,
				cartId: cart[0].id,
				productId,
				storeId,
				quantity,
				priceAtAdd: product[0].price,
			});
		}

		return NextResponse.json({ 
			success: true, 
			message: "تم إضافة المنتج للسلة بنجاح" 
		});

	} catch (error) {
		console.error("خطأ في إضافة المنتج للسلة:", error);
		return NextResponse.json(
			{ error: "خطأ في الخادم" },
			{ status: 500 }
		);
	}
}
