import { HTTP_STATUS } from './constants';

class ApiResponse<T = any> {
  status: number;
  data: T;
  message: string;
  success: boolean;
  constructor(status: number, data: any, message = 'Success') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < HTTP_STATUS.BAD_REQUEST;
  }
}

export { ApiResponse };
