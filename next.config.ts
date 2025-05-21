const nextConfig = {}

const path = require('path')

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
    {
      protocol: 'https',
      hostname: 'pcam-static-home.s3.ap-south-1.amazonaws.com',
    },
    {
      protocol: 'https',
      hostname: 'randomuser.me',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    }
  ],
    },
}