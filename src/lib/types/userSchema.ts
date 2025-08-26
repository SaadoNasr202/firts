import { createSelectSchema } from "drizzle-zod";
import { TB_user } from "../schema";
import z from "zod";
import { BaseZodError } from "./errorUtilities";
export const userSchema = createSelectSchema(TB_user, {
	username: (schema) => schema.min(6).max(24),
	password: (schema) => schema.min(8).max(32),
});
export type User = z.infer<typeof userSchema>;

export const userViewSchema = userSchema.pick({
	id: true,
	username: true,
	
});

export type UserView = z.infer<typeof userViewSchema>;

export const loginSchema = createSelectSchema(TB_user).pick({
	username: true,
	password: true,
});


export type LoginFormError = BaseZodError<typeof loginSchema>;
