import { z } from "zod";
import { BaseZodError } from "./errorUtilities";

export const loginFormSchema = z.object({
	email: z.string().min(8),
	password: z.string().min(8).max(32),
});

export type LoginFormError = BaseZodError<typeof loginFormSchema>;
