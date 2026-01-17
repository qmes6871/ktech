import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ktech',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
