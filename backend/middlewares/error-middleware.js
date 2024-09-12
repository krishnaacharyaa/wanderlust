const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../utils/constants.js');

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });

  // It's typically better not to call `next()` here to avoid additional handlers.
  // This would be useful if you had more middleware to run after the error handler.
  // If you're sure there are no more middlewares, you can omit the `next()` call.
};

module.exports = errorMiddleware;

