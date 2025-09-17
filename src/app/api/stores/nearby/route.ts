import { db } from "@/lib/db";
import { TB_stores } from "@/lib/schema";
import { NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		// جلب المتاجر من قاعدة البيانات (اسم المتجر والصورة)
		const stores = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				image: TB_stores.image,
				type: TB_stores.type,
				rating: TB_stores.rating,
			})
			.from(TB_stores)
			.orderBy(TB_stores.createdAt);

		// تطبيع روابط الصور لضمان العرض الصحيح في الواجهة
		const normalizeImageUrl = (raw?: string | null) => {
			if (!raw) return raw as unknown as string;
			let url = String(raw).trim().replace(/\\/g, "/");
			if (url.startsWith("lh3.googleusercontent.com")) {
				url = `https://${url}`;
			}
			return url;
		};

		const normalizedStores = stores.map((s) => ({
			...s,
			image: normalizeImageUrl(s.image),
		}));

		return NextResponse.json({ stores: normalizedStores });
	} catch (error) {
		console.error("خطأ في جلب المتاجر:", error);
		return NextResponse.json(
			{ error: "فشل في جلب المتاجر" },
			{ status: 500 }
		);
	}
}
