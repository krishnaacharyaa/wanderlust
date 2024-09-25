import { Error as MongooseError } from 'mongoose';
import { RESPONSE_MESSAGES } from './constants.js';

interface ApiErrorParams {
  status: number;
  message?: string;
  errors?: any[];
  stack?: string;
}

class ApiError extends MongooseError {
  public status: number;
  public data: null;
  public success: boolean;
  public errors: any[];
  constructor({
    status,
    message = RESPONSE_MESSAGES.COMMON.SOMETHING_WRONG,
    errors = [],
    stack = '',
  }: ApiErrorParams) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
