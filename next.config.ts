import type { NextConfig } from 'next';
import './src/env';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
