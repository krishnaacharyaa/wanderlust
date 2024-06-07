import { NextFunction, Request, Response } from 'express';
import { retrieveDataFromCache } from './cache-posts';
import { HTTP_STATUS } from './constants';

export const cacheHandler =
  (key: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await retrieveDataFromCache(key);
      if (cachedData) {
        console.log(`Getting cached data for key: ${key}`);
        return res.status(HTTP_STATUS.OK).json(cachedData);
      }
      next(); // Proceed to the route handler if data is not cached
    } catch (err) {
      if (err instanceof Error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err });
      }
    }
  };
