import { db } from "@/lib/db";
import { TB_favouriteusers, TB_shellausers } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// إضافة منتج للمفضلة
export async function POST(request: NextRequest) {
	try {
		const { productId } = await request.json();

		if (!productId) {
			return NextResponse.json(
				{ error: "معرف المنتج مطلوب" },
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

		// التحقق من وجود المنتج في المفضلة مسبقاً
		const existingFavorite = await db
			.select()
			.from(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
				)
			)
			.limit(1);

		if (existingFavorite.length > 0) {
			return NextResponse.json(
				{ error: "المنتج موجود في المفضلة بالفعل" },
				{ status: 400 }
			);
		}

		// إضافة المنتج للمفضلة
		const favoriteId = `fav_product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		
		await db.insert(TB_favouriteusers).values({
			id: favoriteId,
			userId,
			productId,
		});

		return NextResponse.json({
			success: true,
			message: "تم إضافة المنتج للمفضلة بنجاح",
			favoriteId
		});

	} catch (error) {
		console.error("خطأ في إضافة المنتج للمفضلة:", error);
		return NextResponse.json(
			{ error: "فشل في إضافة المنتج للمفضلة" },
			{ status: 500 }
		);
	}
}

// إزالة منتج من المفضلة
export async function DELETE(request: NextRequest) {
	try {
		const { productId } = await request.json();

		if (!productId) {
			return NextResponse.json(
				{ error: "معرف المنتج مطلوب" },
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
			.delete(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
				)
			);

		return NextResponse.json({
			success: true,
			message: "تم إزالة المنتج من المفضلة بنجاح"
		});

	} catch (error) {
		console.error("خطأ في إزالة المنتج من المفضلة:", error);
		return NextResponse.json(
			{ error: "فشل في إزالة المنتج من المفضلة" },
			{ status: 500 }
		);
	}
}

// التحقق من حالة المفضلة
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const productId = searchParams.get('productId');

		if (!productId) {
			return NextResponse.json(
				{ error: "معرف المنتج مطلوب" },
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
			.from(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
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
