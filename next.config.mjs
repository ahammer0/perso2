/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_IMAGE_HOST).hostname,
        pathname: '/api/uploads/**'
      }
    ]
  }
};

export default nextConfig;
