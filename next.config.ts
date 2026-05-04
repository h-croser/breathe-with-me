import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

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
  basePath: '/breathe-with-me'
};

export default withBundleAnalyzer(nextConfig);
