import { Request } from 'express';

type RequestUserType = {
  _id: string;
  role: string;
  userName: string;
  email: string;
};

export type RequestWithUserRole = Request & {
  user?: RequestUserType;
};
