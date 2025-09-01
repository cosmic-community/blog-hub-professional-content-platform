/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: [
      'cdn.cosmicjs.com',
      'imgix.cosmicjs.com'
    ],
  },
  experimental: {
    typedRoutes: false,
  }
}

module.exports = nextConfig