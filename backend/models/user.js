import { Schema, model } from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ACCESS_TOKEN_EXPIRES_IN, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config/utils.js';
import { Role } from '../types/role-type.js';

const userSchema = new Schema(
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
      minLength: [3, 'Name must be at least 3 character'],
      maxLength: [15, 'Name should be less than 15 character'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        'Please Enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: false,
      minLength: [8, 'Password must be at least 8 character '],
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must be contains at least one uppercase and one lowercase and one digit and one special character',
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
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  isPasswordCorrect: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  generateAccessToken: async function () {
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
  },
  generateRefreshToken: async function () {
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
  },
  generateResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};

const User = model('User', userSchema);

export default User;
