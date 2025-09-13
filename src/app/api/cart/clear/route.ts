import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_cart, TB_cartItems } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function DELETE() {
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
			return NextResponse.json({ error: "السلة غير موجودة" }, { status: 404 });
		}

		// حذف جميع العناصر من السلة
		await db
			.delete(TB_cartItems)
			.where(eq(TB_cartItems.cartId, cart[0].id));

		return NextResponse.json({ success: true });

	} catch (error) {
		console.error("خطأ في إفراغ السلة:", error);
		return NextResponse.json(
			{ error: "خطأ في الخادم" },
			{ status: 500 }
		);
	}
}
