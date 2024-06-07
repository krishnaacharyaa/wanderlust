import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../config/utils';
import { ApiError } from '../utils/api-error';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';
import jwt from 'jsonwebtoken';
import { RequestWithUserRole } from '../types/request-User-Type';

export const authMiddleware = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.RE_LOGIN));
  }

  if (token) {
    jwt.verify(token, JWT_SECRET!, (error: any, payload: any) => {
      if (error) {
        return new ApiError(HTTP_STATUS.FORBIDDEN, RESPONSE_MESSAGES.USERS.INVALID_TOKEN);
      }
      req.user = payload;
      next();
    });
  }
};

export const isAdminMiddleware = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const role = req.user?.role;
  if (role !== 'ADMIN') {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER);
  }
  next();
};
