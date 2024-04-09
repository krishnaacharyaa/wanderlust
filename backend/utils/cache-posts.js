import { redis } from '../config/redis.js';

const REDIS_PREFIX = 'post-cache';

export async function getKeyFromCache(key) {
  const cacheKey = `${REDIS_PREFIX}:${key}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

export async function setKeyInCache(key, data) {
  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await redis.set(cacheKey, JSON.stringify(data));
}

export async function invalidateKeyInCache(key) {
  await redis.del(key);
}
