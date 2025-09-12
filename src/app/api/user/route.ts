// app/api/user/route.ts
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// الحصول على بيانات المستخدم الكاملة من قاعدة البيانات
		const userData = await db
			.select({
				id: TB_user.id,
				fullName: TB_user.fullName,
				phoneNumber: TB_user.phoneNumber,
				birthDate: TB_user.birthDate,
				email: TB_user.email,
			})
			.from(TB_user)
			.where(eq(TB_user.id, user.id))
			.limit(1);

		if (!userData[0]) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(userData[0]);
	} catch (error) {
		console.error("Error fetching user data:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
