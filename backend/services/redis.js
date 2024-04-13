import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis;
if (REDIS_URL) {
  try {
    redis = await createClient({
      url: REDIS_URL,
      disableOfflineQueue: true,
    }).connect();
    console.log('Redis Connected: ' + REDIS_URL);
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
    redis = null;
  }
} else {
  console.log('Redis not configured, cache disabled.');
}
export { redis };
