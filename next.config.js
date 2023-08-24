/** @type {import('next-pwa').PWAConfig} */
const pwaConfig = {
  dest: 'public',
}

const withPWA = require('next-pwa')(pwaConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['image.tmdb.org', 'i.ytimg.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withPWA(nextConfig)
