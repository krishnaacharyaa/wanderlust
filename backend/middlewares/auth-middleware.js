import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role-type.js';
import User from '../models/user.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.RE_LOGIN));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(payload.id);
    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    return next(new ApiError(HTTP_STATUS.FORBIDDEN, RESPONSE_MESSAGES.USERS.INVALID_TOKEN));
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  const role = req.user.role;
  if (role !== Role.Admin) {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER);
  }
  next();
};
