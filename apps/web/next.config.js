/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: `${'/server'}/:ctrl*`,
        destination: `${process.env.BACKEND_URL}/:ctrl*`,
      },
    ]
  },
}

module.exports = nextConfig
