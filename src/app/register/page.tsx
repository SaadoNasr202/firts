import { RegisterForm } from "@/components/RegisterForm";
import hash from "@/components/utils";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { RegisterFormError, registerFormSchema } from "@/lib/types/authSchemas";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

export default function RegisterPage() {
	return <RegisterForm registerAction={RegisterAction} />;
}

async function RegisterAction(
	input: z.infer<typeof registerFormSchema>,
): Promise<RegisterFormError | undefined | { field: string; message: string }> {
	"use server";
	try {
		const data = await registerFormSchema.parseAsync(input);

		// التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
		const existingUser = await db
			.select()
			.from(TB_user)
			.where(eq(TB_user.email, data.email));

		if (existingUser.length > 0) {
			return { field: "email", message: "البريد الإلكتروني مستخدم بالفعل" };
		}

		// التحقق من عدم وجود مستخدم بنفس رقم الهاتف
		const existingPhone = await db
			.select()
			.from(TB_user)
			.where(eq(TB_user.phoneNumber, data.phoneNumber));

		if (existingPhone.length > 0) {
			return { field: "phoneNumber", message: "رقم الهاتف مستخدم بالفعل" };
		}

		// إنشاء المستخدم الجديد
		const userId = generateId(15);
		
		await db.insert(TB_user).values({
			id: userId,
			fullName: data.fullName,
			phoneNumber: data.phoneNumber,
			birthDate: data.birthDate,
			email: data.email,
			password: hash(data.password), // تشفير كلمة المرور
			Adress: `${data.address.lat},${data.address.lng}`, // حفظ العنوان بصيغة lat,lng
		});

		console.log("✅ تم إنشاء المستخدم بنجاح:", userId);
		
		// إرجاع نجاح العملية
		return undefined;
	} catch (e) {
		console.error("❌ خطأ في إنشاء المستخدم:", e);
		return {
			field: "root",
			message: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى",
		};
	}
}
