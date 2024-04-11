import dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config();

let redis;
if (process.env.REDIS_URL) {
  try {
    redis = await createClient({
      url: process.env.REDIS_URL,
      disableOfflineQueue: true,
    }).connect();
    console.log('Redis Connected: ' + process.env.REDIS_URL);
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
    redis = null;
  }
} else {
  console.log('Redis not configured, cache disabled.');
}
export { redis };
