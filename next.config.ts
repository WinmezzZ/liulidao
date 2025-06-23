import type { NextConfig } from 'next';
import './src/env';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    nodeMiddleware: true,
    useCache: true,
    authInterrupts: true,
    typedRoutes: ['1', 'true'].includes(process.env.TYPED_ROUTES ?? ''),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
