import { Schema, model, Document } from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ACCESS_TOKEN_EXPIRES_IN, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config/utils.js';
import { Role } from '../types/role-type.js';

interface UserObject extends Document {
  userName: string;
  fullName: string;
  email: string;
  password?: string;
  avatar: string;
  role: string;
  posts: Schema.Types.ObjectId[];
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  googleId?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
  generateResetToken(): Promise<string>;
}

const userSchema = new Schema<UserObject>(
  {
    userName: {
      type: String,
      required: [true, 'Username is required'],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [15, 'Name should be less than 15 characters'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: false,
      minLength: [8, 'Password must be at least 8 characters'],
      match: [
        /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/,
        'Password must contain at least one uppercase, one lowercase, one digit, and one special character',
      ],
      select: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: Role.User,
      enum: [Role.User, Role.Admin],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    googleId: {
      type: String,
      unique: true,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  this: UserObject,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password || '');
};

userSchema.methods.generateAccessToken = async function (this: UserObject): Promise<string> {
  return JWT.sign(
    {
      _id: this._id,
      username: this.userName,
      email: this.email,
      role: this.role,
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

userSchema.methods.generateRefreshToken = async function (this: UserObject): Promise<string> {
  return JWT.sign(
    {
      _id: this._id,
      username: this.userName,
      email: this.email,
      role: this.role,
    },
    JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

userSchema.methods.generateResetToken = async function (this: UserObject): Promise<string> {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.forgotPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  await this.save();
  return resetToken;
};

const User = model<UserObject>('User', userSchema);

export default User;
