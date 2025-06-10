import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis: any = null;
export async function connectToRedis() {
  try {
    if (REDIS_URL) {
      redis = await createClient({
        url: REDIS_URL,
        disableOfflineQueue: true,
      }).connect();
      console.log('Redis Connected: ' + REDIS_URL);
    } else {
      console.log('Redis not configured, cache disabled.');
    }
  } catch (error: any) {
    console.error('Error connecting to Redis:', error.message);
  }
}

export function getRedisClient(): any {
  return redis;
}
