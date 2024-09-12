const { JWT_SECRET } = require('../config/utils.js');
const { ApiError } = require('../utils/api-error.js');
const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../utils/constants.js');
const jwt = require('jsonwebtoken');
const { Role } = require('../types/role-type.js'); // Make sure this file exports Role correctly
const User = require('../models/user.js');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(
      new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
      })
    );
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(_id);
    next();
  } catch (error) {
    console.log('Token verification error:', error);
    return next(
      new ApiError({
        status: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.USERS.INVALID_TOKEN,
      })
    );
  }
};

const isAdminMiddleware = async (req, res, next) => {
  const role = req.user.role;
  if (role !== Role.Admin) {
    return next(
      new ApiError({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
      })
    );
  }
  next();
};

module.exports = { authMiddleware, isAdminMiddleware };

