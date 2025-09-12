import { lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		console.log("🔍 API: Checking login status...");
		console.log("🔍 API: Cookie name:", lucia.sessionCookieName);
		
		// استخدام اسم الكوكي الصحيح من Lucia
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);
		console.log("🔍 API: Session cookie found:", !!sessionCookie?.value);

		if (!sessionCookie?.value) {
			console.log("❌ API: No session cookie, returning false");
			return NextResponse.json({ isLoggedIn: false }, { status: 401 });
		}

		// التحقق من صحة الجلسة
		const { user, session } = await lucia.validateSession(sessionCookie.value);
		console.log("🔍 API: Session validation result:", { hasUser: !!user, hasSession: !!session });

		if (!session || !user) {
			console.log("❌ API: Invalid session, returning false");
			return NextResponse.json({ isLoggedIn: false }, { status: 401 });
		}

		console.log("✅ API: User logged in successfully");
		return NextResponse.json({ isLoggedIn: true, user }, { status: 200 });
	} catch (error) {
		console.error("💥 API Error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 },
		);
	}
}
