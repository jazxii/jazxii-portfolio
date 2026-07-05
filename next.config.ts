import type { NextConfig } from "next";

// The site is served at the custom domain jazxii.com (root), deployed to GitHub
// Pages as a static export. CI sets STATIC_EXPORT=1 for the deploy build; it is
// intentionally unset for local dev and for CI's Lighthouse `next start` build,
// which must stay a normal (non-export) build — `next start` rejects output:"export".
// NEXT_PUBLIC_BASE_PATH remains supported for subpath previews (e.g. the old
// jazxii.github.io/jazxii-portfolio address) and also drives the asset() helper.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isExport = process.env.STATIC_EXPORT === "1" || Boolean(basePath);

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      ...(basePath ? { basePath } : {}),
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
