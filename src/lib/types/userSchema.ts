import { createSelectSchema } from "drizzle-zod";
import { TB_user } from "../schema";
import z from "zod";
import { BaseZodError } from "./errorUtilities";

export const userSchema = createSelectSchema(TB_user, {
	email: (schema) => schema.email(),
	password: (schema) => schema.min(8).max(32),
	fullName: (schema) => schema.min(2).max(50),
	phoneNumber: (schema) => schema.min(10).max(15),
});
export type User = z.infer<typeof userSchema>;

export const userViewSchema = userSchema.pick({
	id: true,
	email: true,
	fullName: true,
	phoneNumber: true,
	birthDate: true,
});

export type UserView = z.infer<typeof userViewSchema>;

export const loginSchema = createSelectSchema(TB_user).pick({
	email: true,
	password: true,
});

export type LoginFormError = BaseZodError<typeof loginSchema>;
