import { Model, Schema, model } from 'mongoose';
import { IPost } from '../types/post-Type';

const postSchema = new Schema({
  authorfName: String,
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

const Post: Model<IPost> = model<IPost>('Post', postSchema);

export default Post;
