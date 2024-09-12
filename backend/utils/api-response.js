import { HTTP_STATUS } from './constants.js';

class ApiResponse {
  public status: number;
  public data: any;
  public message: string;
  public success: boolean;

  constructor(status: number, data: any, message = 'Success') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < HTTP_STATUS.BAD_REQUEST;
  }
}

export { ApiResponse };
