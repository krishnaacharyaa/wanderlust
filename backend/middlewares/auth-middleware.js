import { JWT_SECRET } from '../config/utils.js';
import { HTTP_STATUS } from '../utils/constants.js';
import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.access_token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: 'Token is Invalid or expired!',
        });
      }
      req.user = payload;
      next();
    });
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'You are not authorized!',
    });
  }
};
