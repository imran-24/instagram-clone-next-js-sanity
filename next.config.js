/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains: ['cdn-icons-png.flaticon.com']
  }
}

module.exports = nextConfig
