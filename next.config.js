/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.promebel.local',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'api.promebel.tj',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.100',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
