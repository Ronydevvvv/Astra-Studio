import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* A stray lockfile in the parent directory makes Next infer the wrong
     workspace root, which breaks file tracing on build. Pin it. */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
