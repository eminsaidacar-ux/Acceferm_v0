import type { NextConfig } from "next";

/**
 * Next.js 15 stable config.
 * PPR, React Compiler et View Transitions sont canary-only — on les active
 * quand on bascule sur next@canary (ou sur un release stable qui les graduera).
 */
const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default config;
