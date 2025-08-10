import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed"), new URL("https://loremflickr.com")],
    domains : [
      'res.cloudinary.com',
      'picsum.photos',
      'loremflickr.com'
    ]
  }
};

export default nextConfig;
