import { db } from "@/lib/db";
import { TB_stores } from "@/lib/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface Discount {
	id: string;
	title: string;
	description: string;
	time: string;
	image: string;
}

export async function GET() {
	try {
		let discounts: Discount[] = [];
		
		try {
			// جلب المتاجر من قاعدة البيانات لعرضها كخصومات
			const stores = await db.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				image: TB_stores.image,
				rating: TB_stores.rating,
			}).from(TB_stores).limit(6); // عرض 6 متاجر كحد أقصى

			discounts = stores.map(store => ({
				id: store.id,
				title: store.name,
				description: store.type || "متجر",
				time: "متاح للتوصيل",
				image: store.image || "https://via.placeholder.com/400x200?text=" + encodeURIComponent(store.name),
			}));
		} catch (dbError) {
			console.error("خطأ في جلب المتاجر للخصومات:", dbError);
			discounts = []; // إرجاع مصفوفة فارغة في حالة الخطأ
		}

		return NextResponse.json({ 
			discounts,
			success: true 
		});
	} catch (error) {
		console.error("خطأ في جلب الخصومات:", error);
		return NextResponse.json(
			{ error: "فشل في جلب الخصومات" },
			{ status: 500 }
		);
	}
}
