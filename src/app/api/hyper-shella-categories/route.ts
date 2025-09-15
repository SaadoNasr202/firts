import { db } from "@/lib/db";
import { TB_hyper_shella_categories } from "@/lib/schema";
import { NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = "force-dynamic";

export async function GET() {
	try {
		// جلب أقسام هايبر شلة من قاعدة البيانات
		const categories = await db
			.select({
				id: TB_hyper_shella_categories.id,
				name: TB_hyper_shella_categories.name,
				image: TB_hyper_shella_categories.image,
			})
			.from(TB_hyper_shella_categories)
			.orderBy(TB_hyper_shella_categories.createdAt);

		// إذا لم توجد أقسام في قاعدة البيانات، إرجاع رسالة عدم وجود بيانات
		if (categories.length === 0) {
			return NextResponse.json({ 
				categories: [],
				success: true,
				message: "لا توجد أقسام متاحة حالياً"
			});
		}

		return NextResponse.json({
			categories,
			success: true,
			isDefault: false,
		});
	} catch (error) {
		console.error("خطأ في جلب أقسام هايبر شلة:", error);
		return NextResponse.json(
			{ error: "فشل في جلب أقسام هايبر شلة" },
			{ status: 500 },
		);
	}
}
