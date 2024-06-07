import { z } from 'zod';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signInSchema = z.object({
  userNameOrEmail: z.string().min(1, { message: 'username or email is required' }),
  password: z.string().min(1, 'Password must be at least 1 character'),
});

export const signUpSchema = z
  .object({
    userName: z.string().min(1, { message: 'Username is required' }),
    fullName: z
      .string()
      .min(3, { message: 'Name must be at least 3 character' })
      .max(15, { message: 'Name should be less than 15 character' }),
    email: z.string().email('Enter valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 character')
      .regex(
        passwordRegex,
        'Password must be contains at least one uppercase and one lowercase and one digit and one special character'
      ),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm Password do not match',
    path: ['confirmPassword'],
  });
export const addBlogSchema = z.object({
  title: z.string().min(3),
  authorName: z.string().min(3),
  imageLink: z.string().url(),
  categories: z.array(z.string()).min(1),
  description: z.string().min(10),
  isFeaturedPost: z.boolean(),
});
export interface AuthData {
  _id: string;
  role: string;
  token: string;
  loading: boolean;
}

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TAddBlogScheme = z.infer<typeof addBlogSchema>;
