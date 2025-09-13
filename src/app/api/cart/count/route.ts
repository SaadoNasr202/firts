import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_cart, TB_cartItems } from "@/lib/schema";
import { eq, sum } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return NextResponse.json({ count: 0 });
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return NextResponse.json({ count: 0 });
		}

		// البحث عن السلة
		const cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			return NextResponse.json({ count: 0 });
		}

		// حساب عدد العناصر في السلة
		const result = await db
			.select({ 
				totalCount: sum(TB_cartItems.quantity) 
			})
			.from(TB_cartItems)
			.where(eq(TB_cartItems.cartId, cart[0].id));

		const count = result[0]?.totalCount ? parseInt(result[0].totalCount.toString()) : 0;

		return NextResponse.json({ count });

	} catch (error) {
		console.error("خطأ في حساب عناصر السلة:", error);
		return NextResponse.json({ count: 0 });
	}
}
