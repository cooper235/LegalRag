/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // Optimize production builds
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
