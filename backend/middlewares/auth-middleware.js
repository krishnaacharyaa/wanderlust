import { JWT_SECRET } from '../config/utils.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';

export const authenticationHandler = async (req, res, next) => {
  const authHeader = req.headers.access_token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: RESPONSE_MESSAGES.USERS.INVALID_TOKEN,
        });
      }
      req.user = payload;
      next();
    });
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
    });
  }
};
