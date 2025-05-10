import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
    domains : [
      'res.cloudinary.com',
    ]
  }
};

export default nextConfig;
