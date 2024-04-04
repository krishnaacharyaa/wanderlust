import { z } from "zod";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signInSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).regex(emailRegex, "Invalid email address"),
    password: z.string().min(1, { message: "Password is required" }),
});

export type TSignInSchema = z.infer<typeof signInSchema>;