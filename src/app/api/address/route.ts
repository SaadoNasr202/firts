import { db } from "@/lib/db";
import { TB_shellausers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET → جلب العنوان الحالي
export async function GET() {
	try {
		const email = "test@gmail.com"; // مؤقتاً
		const user = await db
			.select({
				id: TB_shellausers.id,
				address: TB_shellausers.Adress,
			})
			.from(TB_shellausers)
			.where(eq(TB_shellausers.email, email))
			.limit(1);

		if (!user[0])
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		return NextResponse.json(user[0]);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// PUT → تعديل العنوان
export async function PUT(req: Request) {
	try {
		const email = "test@gmail.com"; // مؤقتاً
		const body = await req.json();
		const { address } = body;

		if (!address)
			return NextResponse.json({ error: "Address required" }, { status: 400 });

		await db
			.update(TB_shellausers)
			.set({ Adress: address })
			.where(eq(TB_shellausers.email, email));

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
