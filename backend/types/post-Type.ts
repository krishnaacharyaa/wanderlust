import { IUser } from './user-Type';

export interface IPost extends Document {
  _id?: string;
  authorName: string;
  title: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
  timeOfPost: Date;
  authorId: IUser['_id'];
}
