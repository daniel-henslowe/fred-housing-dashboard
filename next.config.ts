import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use "export" only for production builds via: STATIC_EXPORT=1 npm run build
  output: process.env.STATIC_EXPORT ? "export" : undefined,
};

export default nextConfig;
