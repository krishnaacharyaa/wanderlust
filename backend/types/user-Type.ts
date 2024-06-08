import mongoose from 'mongoose';

export type UserType = {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  password: string | undefined;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  posts: mongoose.Types.ObjectId[];
  refreshToken: string;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
  isPasswordCorrect(password: string): Promise<boolean>;
};
