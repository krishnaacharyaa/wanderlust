import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
};

export default errorMiddleware;
