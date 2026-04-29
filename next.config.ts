import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};


export default nextConfig;
