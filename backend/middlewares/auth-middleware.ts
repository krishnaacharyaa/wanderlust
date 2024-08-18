import { JWT_SECRET } from '../config/utils';
import { ApiError } from '../utils/api-error';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role-type';
import User from '../models/user';

import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  _id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(
      new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
      })
    );
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET as string) as JwtPayload;

    req.user = await User.findById(_id);
    next();
  } catch (error: any) {
    console.log('Token verification error:', error.message);
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