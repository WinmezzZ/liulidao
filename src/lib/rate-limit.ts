const DEFAULT_LIMIT = 5;
const DEFAULT_DURATION = 60;
import { redis } from './redis';

export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(
  key: string,
  options?: { limit?: number; duration?: number }
): Promise<RateLimitResult> {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const duration = options?.duration ?? DEFAULT_DURATION;

  const redisKey = `rate-limit:${key}`;

  const current = await redis.incr(redisKey);
  if (current === 1) {
    await redis.expire(redisKey, duration);
  }

  const ttl = await redis.ttl(redisKey);
  return {
    allowed: current <= limit,
    current,
    remaining: Math.max(limit - current, 0),
    reset: ttl,
  };
}
