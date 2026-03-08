/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/archive',
        destination: '/articles',
        permanent: true, // 301 redirect
      },
      {
        source: '/newsletter/:slug',
        destination: '/article/:slug',
        permanent: true, // 301 redirect
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
