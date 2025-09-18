import { db } from "@/lib/db";
import { TB_favouriteStores, TB_shellausers } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// إضافة متجر للمفضلة
export async function POST(request: NextRequest) {
	try {
		const { storeId } = await request.json();

		if (!storeId) {
			return NextResponse.json(
				{ error: "معرف المتجر مطلوب" },
				{ status: 400 }
			);
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return NextResponse.json(
				{ error: "يجب تسجيل الدخول أولاً" },
				{ status: 401 }
			);
		}

		const userId = user.id;

		// التحقق من وجود المتجر في المفضلة مسبقاً
		const existingFavorite = await db
			.select()
			.from(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			)
			.limit(1);

		if (existingFavorite.length > 0) {
			return NextResponse.json(
				{ error: "المتجر موجود في المفضلة بالفعل" },
				{ status: 400 }
			);
		}

		// إضافة المتجر للمفضلة
		const favoriteId = `fav_store_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		
		await db.insert(TB_favouriteStores).values({
			id: favoriteId,
			userId,
			storeId,
		});

		return NextResponse.json({
			success: true,
			message: "تم إضافة المتجر للمفضلة بنجاح",
			favoriteId
		});

	} catch (error) {
		console.error("خطأ في إضافة المتجر للمفضلة:", error);
		return NextResponse.json(
			{ error: "فشل في إضافة المتجر للمفضلة" },
			{ status: 500 }
		);
	}
}

// إزالة متجر من المفضلة
export async function DELETE(request: NextRequest) {
	try {
		const { storeId } = await request.json();

		if (!storeId) {
			return NextResponse.json(
				{ error: "معرف المتجر مطلوب" },
				{ status: 400 }
			);
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return NextResponse.json(
				{ error: "يجب تسجيل الدخول أولاً" },
				{ status: 401 }
			);
		}

		const userId = user.id;

		// البحث عن المفضلة وحذفها
		const result = await db
			.delete(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			);

		return NextResponse.json({
			success: true,
			message: "تم إزالة المتجر من المفضلة بنجاح"
		});

	} catch (error) {
		console.error("خطأ في إزالة المتجر من المفضلة:", error);
		return NextResponse.json(
			{ error: "فشل في إزالة المتجر من المفضلة" },
			{ status: 500 }
		);
	}
}

// التحقق من حالة المفضلة
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const storeId = searchParams.get('storeId');

		if (!storeId) {
			return NextResponse.json(
				{ error: "معرف المتجر مطلوب" },
				{ status: 400 }
			);
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return NextResponse.json(
				{ error: "يجب تسجيل الدخول أولاً" },
				{ status: 401 }
			);
		}

		const userId = user.id;

		// البحث عن المفضلة
		const favorite = await db
			.select()
			.from(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			)
			.limit(1);

		return NextResponse.json({
			isFavorite: favorite.length > 0,
			favoriteId: favorite.length > 0 ? favorite[0].id : null
		});

	} catch (error) {
		console.error("خطأ في التحقق من حالة المفضلة:", error);
		return NextResponse.json(
			{ error: "فشل في التحقق من حالة المفضلة" },
			{ status: 500 }
		);
	}
}
