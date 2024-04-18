import { Schema, model } from 'mongoose';

const postSchema : Schema = new Schema({
  authorName: String,
  title: String,
  imageLink: String,
  categories: [String],
  description: String,
  isFeaturedPost: Boolean,
  timeOfPost: { type: Date, default: Date.now },
});

export default model('Post', postSchema);
