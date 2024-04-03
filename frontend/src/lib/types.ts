import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, { message: "Password is required" }),
});

export type TSignInSchema = z.infer<typeof signInSchema>;