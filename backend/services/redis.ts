import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';
import logger from '../config/logger.js';

let redis: any = null;
export async function connectToRedis() {
  try {
    if (REDIS_URL) {
      redis = await createClient({
        url: REDIS_URL,
        disableOfflineQueue: true,
      }).connect();
      logger.info('Redis Connected: ' + REDIS_URL);
    } else {
      logger.warn('Redis not configured, cache disabled.');
    }
  } catch (error: any) {
    logger.error('Error connecting to Redis:', error.message);
  }
}

export function getRedisClient(): any {
  return redis;
}
