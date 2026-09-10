import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export — this site deploys to OVH's static hosting via the
     GitHub Actions FTP workflow, which builds and uploads the out/
     directory. Without this, `next build` never produces out/ at all,
     and the workflow's `test -f out/index.html` check fails immediately. */
  output: "export",
  /* next/image's built-in optimizer needs a server to resize images on
     request — static export has none. Without this, the build still
     succeeds but every <Image> 404s at runtime on OVH. Images ship as-is;
     they're already pre-sized/compressed source files, not a regression. */
  images: { unoptimized: true },
  /* A stray lockfile in the parent directory makes Next infer the wrong
     workspace root, which breaks file tracing on build. Pin it. */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
