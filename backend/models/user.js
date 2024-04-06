import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
  },
  password: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export default model('User', userSchema);
