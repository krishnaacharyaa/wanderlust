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
const isValidImageLink = (value: string) => {
  const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;
  return imageLinkRegex.test(value);
};
export const formBlogSchema = z.object({
  title: z.string().refine((value) => value.trim().split(/\s+/).length >= 3, {
    message: 'Oops! Title needs more spice. Give it at least 3 words.',
  }),
  isFeaturedPost: z.boolean(),
  description: z.string().refine((value) => value.trim().split(/\s+/).length >= 10, {
    message: 'Oops! Description needs more detail. Give it at least 10 words',
  }),
  authorName: z
    .string()
    .min(3, {
      message: "C'ome on! Your name cannot be less than 3 characters.",
    })
    .max(15, {
      message: "Hey isn't it too big of a name, can you limit it to 15 characters",
    }),
  imageLink: z.string().refine((value) => isValidImageLink(value), {
    message: 'Hmm... Image link should end with .jpg, .jpeg, .webp, or .png.',
  }),
  categories: z
    .array(z.string())
    .min(1, {
      message: 'Easy there! Select at least one category.',
    })
    .max(3, {
      message: 'Easy there! Not more than 3 categories.',
    }),
});

export interface AuthData {
  _id: string;
  role: string;
  token: string;
  loading: boolean;
}

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TFormBlogSchema = z.infer<typeof formBlogSchema>;
