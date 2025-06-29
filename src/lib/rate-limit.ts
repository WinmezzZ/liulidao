import ms, { type StringValue } from 'ms';
import { redis } from '@/server/redis';

const DEFAULT_LIMIT = 5;
const DEFAULT_DURATION: StringValue = '1 m';

export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(
  key: string,
  options?: { limit?: number; duration?: StringValue }
): Promise<RateLimitResult> {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const duration = options?.duration ?? DEFAULT_DURATION;

  console.log(ms(duration));

  const redisKey = `rate-limit:${key}`;

  const current = await redis.incr(redisKey);
  if (current === 1) {
    await redis.expire(redisKey, ms(duration) / 1000);
  }

  const ttl = await redis.ttl(redisKey);
  return {
    allowed: current <= limit,
    current,
    remaining: Math.max(limit - current, 0),
    reset: ttl,
  };
}
