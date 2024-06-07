import { Request } from 'express';

interface RequestUserType {
  _id: string;
  role: string;
  userName: string;
  email: string;
}

export interface RequestWithUserRole extends Request {
  user?: RequestUserType;
}
