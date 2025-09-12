import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET → جلب العنوان الحالي
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

		// جلب عنوان المستخدم المسجل دخول
		const userData = await db
			.select({
				id: TB_user.id,
				address: TB_user.Adress,
			})
			.from(TB_user)
			.where(eq(TB_user.id, user.id))
			.limit(1);

		if (!userData[0])
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		return NextResponse.json(userData[0]);
	} catch (error) {
		console.error("Error fetching address:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// PUT → تعديل العنوان
export async function PUT(req: NextRequest) {
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

		// قراءة البيانات الجديدة من الطلب
		const body = await req.json();
		const { address } = body;

		if (!address)
			return NextResponse.json({ error: "Address required" }, { status: 400 });

		// تحديث عنوان المستخدم المسجل دخول
		await db
			.update(TB_user)
			.set({ Adress: address })
			.where(eq(TB_user.id, user.id));

		return NextResponse.json({ success: true, message: "Address updated successfully" });
	} catch (error) {
		console.error("Error updating address:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
