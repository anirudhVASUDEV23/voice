import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during the build process
  },
};

export default nextConfig;
