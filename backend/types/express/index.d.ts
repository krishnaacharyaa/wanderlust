declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: string;
        userName: string;
        role: string;
        email: string;
      };
    }
  }
}
