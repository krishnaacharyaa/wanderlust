import { NextFunction, Request, Response } from 'express';

export const asyncHandler = (func: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
