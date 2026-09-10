import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  // next/image's built-in optimizer needs a server to resize images on
  // request — static export has none. Without this, `next build` still
  // succeeds but every <Image> 404s at runtime on OVH. Images ship as-is;
  // they're already pre-sized/compressed source files, not a regression.
  images: { unoptimized: true },
};

export default nextConfig;