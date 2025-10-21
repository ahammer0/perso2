/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST,
        pathname: '/uploads/**'
      }
    ]
  }
};

export default nextConfig;
