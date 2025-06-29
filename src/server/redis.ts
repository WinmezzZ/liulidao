import Redis from 'ioredis';
import { env } from '@/env';

const redisHost = env.REDIS_HOST;
const redisPort = parseInt(env.REDIS_PORT);

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

export { redis };
