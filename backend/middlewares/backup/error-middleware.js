const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../utils/constants.js');
const { Request, Response, NextFunction } = require('express');

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
  next();
};

module.exports = errorMiddleware;

