import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';

export type ErrorMiddlewareType = {
  stack: string;
  status: number;
  message: string;
  errors: string[];
};

const errorMiddleware = (
  err: ErrorMiddlewareType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
  next();
};

export default errorMiddleware;
