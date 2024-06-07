import { getRedisClient } from '../services/redis';
import { REDIS_PREFIX } from './constants';

// Helper function to check if Redis is available
function isRedisEnabled() {
  return getRedisClient() !== null;
}

export async function retrieveDataFromCache(key: string) {
  if (!isRedisEnabled()) return null; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  const cachedData = await getRedisClient().get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

export async function storeDataInCache(key: string, data: any) {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await getRedisClient().set(cacheKey, JSON.stringify(data));
}

export async function deleteDataFromCache(key: string) {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await getRedisClient().del(cacheKey);
}
