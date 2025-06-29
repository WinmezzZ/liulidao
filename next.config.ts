import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
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
