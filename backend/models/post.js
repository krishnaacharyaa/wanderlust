import { Schema, model } from 'mongoose';

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

export default model('Post', postSchema);
