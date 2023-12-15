import { z } from 'zod';

export const FormDataSchema = z.object({
  title: z.string().refine((value) => value.trim().split(/\s+/).length > 3, {
    message: 'Oops! Title needs more spice. Give it at least 3 words.',
  }),
  authorName: z.string().refine((value) => value.trim().length >= 3 && value.trim().length <= 15, {
    message: 'Hey, Your name should be more than 5 letters.',
  }),
  imageLink: z.string().refine((value) => isValidImageLink(value), {
    message: 'Hmm... Image link should end with .jpg, .jpeg, .webp, or .png.',
  }),
  categories: z.array(z.string()).refine((value) => value.length <= 3, {
    message: 'Easy there! Select up to 3 categories.',
  }),
  description: z.string(),
  isFeaturedPost: z.boolean(),
});

// validate the image link
const isValidImageLink = (value: string) => {
  const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;
  return imageLinkRegex.test(value);
};

export type TFormData = z.infer<typeof FormDataSchema>;
