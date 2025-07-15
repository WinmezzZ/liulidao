import { type Duration, Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const DEFAULT_LIMIT = 60;
const DEFAULT_DURATION: Duration = '1 m';

export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  reset: number;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function checkRateLimit(
  key: string,
  options?: { limit?: number; duration?: Duration }
) {
  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(
      options?.limit ?? DEFAULT_LIMIT,
      options?.duration ?? DEFAULT_DURATION
    ),
  });
  return await ratelimit.limit(key);
}
