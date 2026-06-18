import type { NextConfig } from "next";

// On GitHub Pages the site is served from a repo subpath (e.g. /jazxii-portfolio).
// CI sets NEXT_PUBLIC_BASE_PATH for the static-export deploy/preview build. It is
// intentionally empty for local dev and for CI's Lighthouse `next start` build,
// which must stay a normal (non-export) build — `next start` rejects output:"export".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = basePath
  ? {
      output: "export",
      basePath,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
