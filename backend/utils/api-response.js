import { HTTP_STATUS } from './constants.js';

class ApiResponse {
  constructor(status, data, message = 'Success') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < HTTP_STATUS.BAD_REQUEST;
  }
}

export { ApiResponse };
