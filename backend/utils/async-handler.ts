import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (func: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
