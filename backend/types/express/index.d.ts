import { IUser } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        role: string;
        _id: string;
        userName: string;
      };
    }
  }
}
