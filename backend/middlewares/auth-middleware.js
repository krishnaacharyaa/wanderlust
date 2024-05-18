import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.RE_LOGIN));
  }

  if (token) {
    await jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return new ApiError(HTTP_STATUS.FORBIDDEN, RESPONSE_MESSAGES.USERS.INVALID_TOKEN);
      }
      req.user = payload;
      next();
    });
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  const role = req.user.role;
  if (role !== 'ADMIN') {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER);
  }
  next();
};
