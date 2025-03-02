/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7001',
        pathname: '*',
      },
    ],
  },
};

export default nextConfig;
