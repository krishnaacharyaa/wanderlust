import { retrieveDataFromCache } from './cache-posts.js';
import { HTTP_STATUS } from './constants.js';

export const cacheHandler = (key) => async (req, res, next) => {
  try {
    const cachedData = await retrieveDataFromCache(key);
    if (cachedData) {
      console.log(`Getting cached data for key: ${key}`);
      return res.status(HTTP_STATUS.OK).json(cachedData);
    }
    next(); // Proceed to the route handler if data is not cached
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
