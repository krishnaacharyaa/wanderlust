import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role-type.js';
import User from '../models/user.js';

import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';

interface JwtPayload {
  id: ObjectId;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = await req.cookies.access_token;
  if (!token) {
    return next(
      new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
      })
    );
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = await User.findById(id);
    next();
  } catch (error: any) {
    console.log('Token verification error:', error);
    return next(
      new ApiError({
        status: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.USERS.INVALID_TOKEN,
      })
    );
  }
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const role = req.user.role;
  if (role !== Role.Admin) {
    return new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
    });
  }
  next();
};
