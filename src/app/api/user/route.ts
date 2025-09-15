import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = "force-dynamic";

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

		// جلب بيانات المستخدم من قاعدة البيانات
		const userData = await db
			.select({
				id: TB_user.id,
				fullName: TB_user.fullName,
				email: TB_user.email,
				phoneNumber: TB_user.phoneNumber,
				birthDate: TB_user.birthDate,
			})
			.from(TB_user)
			.where(eq(TB_user.id, user.id))
			.limit(1);

		if (userData.length === 0) {
			return NextResponse.json(
				{ error: "المستخدم غير موجود" },
				{ status: 404 },
			);
		}

		return NextResponse.json(userData[0]);
	} catch (error) {
		console.error("خطأ في جلب بيانات المستخدم:", error);
		return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
	}
}
