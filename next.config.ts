import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYSE_BUNDLE === 'true'
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    dynamicOnHover: true
  },
  compress: true,
  reactStrictMode: true,
  allowedDevOrigins: ['localhost:3000', '127.0.0.1'],
  output: 'export',
  basePath: BASE_PATH
};

export default withBundleAnalyzer(nextConfig);
