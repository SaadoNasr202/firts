// app/api/user/route.ts
import { db } from "@/lib/db";
import { TB_shellausers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		// مؤقتاً: نحدد الإيميل يدوياً
		const email = "test@gmail.com";

		const user = await db
			.select({
				id: TB_shellausers.id,
				fullName: TB_shellausers.fullName,
				phoneNumber: TB_shellausers.phoneNumber,
				birthDate: TB_shellausers.birthDate,
				email: TB_shellausers.email,
			})
			.from(TB_shellausers)
			.where(eq(TB_shellausers.email, email))
			.limit(1);

		if (!user[0]) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user[0]);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
