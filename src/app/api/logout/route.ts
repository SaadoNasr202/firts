import { lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "No active session" }, { status: 401 });
		}

		// إلغاء الجلسة الحالية
		await lucia.invalidateSession(sessionCookie.value);

		// إنشاء كوكي فارغ لحذف الجلسة من المتصفح
		const blankSessionCookie = lucia.createBlankSessionCookie();

		const response = NextResponse.json({ 
			success: true, 
			message: "Logged out successfully" 
		});

		// تعيين الكوكي الفارغ
		response.cookies.set(
			blankSessionCookie.name,
			blankSessionCookie.value,
			blankSessionCookie.attributes
		);

		return response;
	} catch (error) {
		console.error("Error during logout:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
