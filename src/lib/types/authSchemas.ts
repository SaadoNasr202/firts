import { z } from "zod";
import { BaseZodError } from "./errorUtilities";

export const loginFormSchema = z.object({
	email: z.string().min(8),
	password: z.string().min(8).max(32),
});

export const registerFormSchema = z.object({
	fullName: z.string().min(2, "الاسم الكامل مطلوب"),
	phoneNumber: z.string().regex(/^(\+966|966|0)?5[0-9]{8}$/, "رقم الهاتف غير صحيح"),
	birthDate: z.date().refine((date) => date !== null && date !== undefined, {
		message: "تاريخ الميلاد مطلوب",
	}),
	email: z.string().email("البريد الإلكتروني غير صحيح"),
	password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").max(32),
	confirmPassword: z.string(),
	address: z.object({
		formattedAddress: z.string().min(1, "العنوان مطلوب"),
		lat: z.number(),
		lng: z.number(),
	}),
}).refine((data) => data.password === data.confirmPassword, {
	message: "كلمة المرور غير متطابقة",
	path: ["confirmPassword"],
});

export type LoginFormError = BaseZodError<typeof loginFormSchema>;
export type RegisterFormError = BaseZodError<typeof registerFormSchema>;
