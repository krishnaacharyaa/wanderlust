import { Model, Schema, model } from 'mongoose';
import { PostType } from '../types/post-type';

const postSchema = new Schema({
  authorName: String,
  title: String,
  imageLink: String,
  categories: [String],
  description: String,
  isFeaturedPost: Boolean,
  timeOfPost: { type: Date, default: Date.now },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Post: Model<PostType> = model<PostType>('Post', postSchema);

export default Post;
