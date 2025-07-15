import createJiti from 'jiti';
import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    useCache: true,
    authInterrupts: true,
    typedRoutes: ['1', 'true'].includes(process.env.TYPED_ROUTES ?? ''),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
