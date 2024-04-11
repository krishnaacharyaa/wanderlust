import { redis } from '../config/redis.js';
import { REDIS_PREFIX } from './constants.js';

// Helper function to check if Redis is available
function isRedisEnabled() {
  return redis !== null;
}

export async function getKeyFromCache(key) {
  if (!isRedisEnabled()) return null; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

export async function setKeyInCache(key, data) {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await redis.set(cacheKey, JSON.stringify(data));
}

export async function invalidateKeyInCache(key) {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await redis.del(cacheKey);
}
