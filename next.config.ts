import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable production optimizations
  reactStrictMode: true,
  
  // Performance optimizations
  compress: true,
  
  // Image optimization for mobile
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Production-only: remove console logs
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
