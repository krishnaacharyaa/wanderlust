import dotenv from 'dotenv';
import { Redis } from 'ioredis';
dotenv.config();
function connectRedis() {
  if (process.env.REDIS_URL) {
    console.log('Redis Connected');
    return process.env.REDIS_URL;
  }
  throw new Error('REDIS_URL is not defined');
}

export const redis = new Redis(connectRedis(), {
  tls: {
    rejectUnauthorized: false,
  },
});
