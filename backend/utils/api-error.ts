import { RESPONSE_MESSAGES } from './constants';
import { ApiErrorType } from '../types/api-Error-Type';

class ApiError extends Error implements ApiErrorType {
  status: number;
  data: string;
  success: boolean;
  errors: {
    message: string;
  }[];
  constructor(
    status: number,
    message = RESPONSE_MESSAGES.COMMON.SOMETHING_WRONG,
    errors = [],
    stack = ''
  ) {
    super(message);
    this.status = status;
    this.data = '';
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
