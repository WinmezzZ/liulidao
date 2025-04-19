import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    APP_NAME: z.string(),
    BASE_HOST: z.string(),
    BASE_PORT: z.string(),
    BASE_URL: z.string(),
    HOST_HOME: z.string(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_TYPE: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_URL: z.string(),
    CRYPTO_DIGEST: z.string(),
    RESEND_API_KEY: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    BETTER_AUTH_EMAIL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string(),
    OPENAI_API_KEY: z.string().optional(),
    UPLOADTHING_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: process.env as Record<string, string>,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
