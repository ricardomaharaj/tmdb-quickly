/** @type {import('next-pwa').PWAConfig} */
const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  disableDevLogs: true,
}

const withPWA = require('next-pwa')(pwaConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['image.tmdb.org', 'i.ytimg.com'],
    unoptimized: true,
    disableStaticImages: true,
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withPWA(nextConfig)
