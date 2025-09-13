import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ error: "البريد الإلكتروني مطلوب" },
				{ status: 400 }
			);
		}

		// التحقق من وجود المستخدم
		const existingUser = await db
			.select()
			.from(TB_user)
			.where(eq(TB_user.email, email));

		return NextResponse.json({
			exists: existingUser.length > 0,
			message: existingUser.length > 0 
				? "البريد الإلكتروني مستخدم بالفعل" 
				: "البريد الإلكتروني متاح"
		});

	} catch (error) {
		console.error("خطأ في التحقق من البريد الإلكتروني:", error);
		return NextResponse.json(
			{ error: "حدث خطأ في الخادم" },
			{ status: 500 }
		);
	}
}
