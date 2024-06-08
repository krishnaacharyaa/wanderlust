import { UserType } from './user-type';

export type PostType = {
  _id?: string;
  authorName: string;
  title: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
  timeOfPost: Date;
  authorId: UserType['_id'];
};
