import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },

  // Optional for later (pretty URLs like /about/):
  // trailingSlash: true,
};

export default nextConfig;
