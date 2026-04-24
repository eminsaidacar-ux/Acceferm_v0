import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Next.js 15 + Payload CMS 3.
 *
 * PPR, React Compiler et View Transitions sont canary-only — on les active
 * quand on bascule sur next@canary (ou sur un release stable qui les graduera).
 */
const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(config);
