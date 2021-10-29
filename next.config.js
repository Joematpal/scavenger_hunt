/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `http://localhost:8000/api/v1/:path*` // Proxy to Backend
      }
    ]
  }
})
