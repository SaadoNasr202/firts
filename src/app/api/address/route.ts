import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_addresses, TB_shellausers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// إجبار Next.js على معاملة هذا الـ route كـ dynamic
export const dynamic = 'force-dynamic';

// GET → جلب جميع عناوين المستخدم
export async function GET(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// جلب جميع عناوين المستخدم
		const addresses = await db
			.select({
				id: TB_addresses.id,
				address: TB_addresses.address,
				createdAt: TB_addresses.createdAt,
			})
			.from(TB_addresses)
			.where(eq(TB_addresses.userId, user.id))
			.orderBy(TB_addresses.createdAt);

		return NextResponse.json({ addresses });
	} catch (error) {
		console.error("Error fetching addresses:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// POST → إضافة عنوان جديد
export async function POST(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// قراءة البيانات من الطلب
		const body = await req.json();
		const { address } = body;

		if (!address)
			return NextResponse.json({ error: "Address required" }, { status: 400 });

		// إضافة عنوان جديد
		const addressId = `addr_${Date.now()}_${user.id}`;
		await db.insert(TB_addresses).values({
			id: addressId,
			userId: user.id,
			address: address,
		});

		return NextResponse.json({ 
			success: true, 
			message: "Address added successfully",
			addressId 
		});
	} catch (error) {
		console.error("Error adding address:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// PUT → تعديل عنوان موجود
export async function PUT(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// قراءة البيانات من الطلب
		const body = await req.json();
		const { addressId, address } = body;

		if (!addressId || !address)
			return NextResponse.json({ error: "Address ID and address required" }, { status: 400 });

		// التحقق من أن العنوان يخص المستخدم
		const existingAddress = await db
			.select()
			.from(TB_addresses)
			.where(eq(TB_addresses.id, addressId))
			.limit(1);

		if (!existingAddress[0] || existingAddress[0].userId !== user.id) {
			return NextResponse.json({ error: "Address not found or unauthorized" }, { status: 404 });
		}

		// تحديث العنوان
		await db
			.update(TB_addresses)
			.set({ address: address })
			.where(eq(TB_addresses.id, addressId));

		return NextResponse.json({ success: true, message: "Address updated successfully" });
	} catch (error) {
		console.error("Error updating address:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// DELETE → حذف عنوان
export async function DELETE(req: NextRequest) {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = req.cookies.get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 401 });
		}

		// قراءة معرف العنوان من الطلب
		const { searchParams } = new URL(req.url);
		const addressId = searchParams.get('id');

		if (!addressId)
			return NextResponse.json({ error: "Address ID required" }, { status: 400 });

		// التحقق من أن العنوان يخص المستخدم
		const existingAddress = await db
			.select()
			.from(TB_addresses)
			.where(eq(TB_addresses.id, addressId))
			.limit(1);

		if (!existingAddress[0] || existingAddress[0].userId !== user.id) {
			return NextResponse.json({ error: "Address not found or unauthorized" }, { status: 404 });
		}

		// حذف العنوان
		await db
			.delete(TB_addresses)
			.where(eq(TB_addresses.id, addressId));

		return NextResponse.json({ success: true, message: "Address deleted successfully" });
	} catch (error) {
		console.error("Error deleting address:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
