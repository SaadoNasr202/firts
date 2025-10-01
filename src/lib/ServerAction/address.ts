"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_addresses } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

// جلب جميع عناوين المستخدم
export async function getAddressesAction(): Promise<{
	addresses: Array<{
		id: string;
		address: string;
		createdAt: string;
	}>;
	error?: string;
}> {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = cookies().get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return { addresses: [], error: "Not authenticated" };
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return { addresses: [], error: "Invalid session" };
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

		return { addresses };
	} catch (error) {
		console.error("Error fetching addresses:", error);
		return { addresses: [], error: "Internal Server Error" };
	}
}

// إضافة عنوان جديد
export async function addAddressAction(address: string): Promise<{
	success: boolean;
	message?: string;
	addressId?: string;
	error?: string;
}> {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = cookies().get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return { success: false, error: "Not authenticated" };
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return { success: false, error: "Invalid session" };
		}

		if (!address) {
			return { success: false, error: "Address required" };
		}

		// إضافة عنوان جديد
		const addressId = `addr_${Date.now()}_${user.id}`;
		await db.insert(TB_addresses).values({
			id: addressId,
			userId: user.id,
			address: address,
		});

		return {
			success: true,
			message: "Address added successfully",
			addressId,
		};
	} catch (error) {
		console.error("Error adding address:", error);
		return { success: false, error: "Internal Server Error" };
	}
}

// تحديث عنوان موجود
export async function updateAddressAction(
	addressId: string,
	address: string,
): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = cookies().get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return { success: false, error: "Not authenticated" };
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return { success: false, error: "Invalid session" };
		}

		if (!addressId || !address) {
			return { success: false, error: "Address ID and address required" };
		}

		// التحقق من أن العنوان يخص المستخدم
		const existingAddress = await db
			.select()
			.from(TB_addresses)
			.where(eq(TB_addresses.id, addressId))
			.limit(1);

		if (!existingAddress[0] || existingAddress[0].userId !== user.id) {
			return { success: false, error: "Address not found or unauthorized" };
		}

		// تحديث العنوان
		await db
			.update(TB_addresses)
			.set({ address: address })
			.where(eq(TB_addresses.id, addressId));

		return { success: true, message: "Address updated successfully" };
	} catch (error) {
		console.error("Error updating address:", error);
		return { success: false, error: "Internal Server Error" };
	}
}

// حذف عنوان
export async function deleteAddressAction(addressId: string): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		// الحصول على الجلسة الحالية
		const sessionCookie = cookies().get(lucia.sessionCookieName);

		if (!sessionCookie?.value) {
			return { success: false, error: "Not authenticated" };
		}

		// التحقق من صحة الجلسة والحصول على بيانات المستخدم
		const { user, session } = await lucia.validateSession(sessionCookie.value);

		if (!session || !user) {
			return { success: false, error: "Invalid session" };
		}

		if (!addressId) {
			return { success: false, error: "Address ID required" };
		}

		// التحقق من أن العنوان يخص المستخدم
		const existingAddress = await db
			.select()
			.from(TB_addresses)
			.where(eq(TB_addresses.id, addressId))
			.limit(1);

		if (!existingAddress[0] || existingAddress[0].userId !== user.id) {
			return { success: false, error: "Address not found or unauthorized" };
		}

		// حذف العنوان
		await db.delete(TB_addresses).where(eq(TB_addresses.id, addressId));

		return { success: true, message: "Address deleted successfully" };
	} catch (error) {
		console.error("Error deleting address:", error);
		return { success: false, error: "Internal Server Error" };
	}
}
