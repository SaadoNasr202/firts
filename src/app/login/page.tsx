import { LoginForm } from "@/components/LoginForm";
import hash from "@/components/utils";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { LoginFormError, loginFormSchema } from "@/lib/types/authSchemas";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// export const metadata: Metadata = {
// 	title: "SQLMentor - Login",
// 	icons: {
// 		icon: "/logo.ico",
// 		apple: "/logo.png",
// 	},
// };

export default function LoginPage() {
	return <LoginForm loginAction={LoginAction} />;
}

async function LoginAction(
	input: z.infer<typeof loginFormSchema>,
): Promise<LoginFormError | undefined | { field: string; message: string }> {
	"use server";
	try {
		const data = await loginFormSchema.parseAsync(input);

		const user = await db
			.select()
			.from(TB_user)
			.where(eq(TB_user.email, data.email));

		if (user.length === 0) {
			return { field: "email", message: "Username not found" };
		}
		// تعطيل الهاش مؤقتاً للتجربة مع كلمات مرور غير مشفرة
		//if (user[0].password !== data.password) {
		 if (user[0].password !== hash(data.password)) {
			return { field: "password", message: "Incorrect password" };
		}
		const session = await lucia.createSession(user[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		
		// إرجاع نجاح العملية بدون redirect (سيتم التوجيه من client-side)
	} catch (e) {
		return {
			field: "root",
			message: "An unexpected error occurred, please try again later",
		};
	}
}
