import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Next.js 15 + Payload CMS 3.
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
  // Redirections 301 — anciennes URLs dépréciées
  async redirects() {
    return [
      {
        source: "/vs/accesso-ferm",
        destination: "/comparatif-centrales-achat",
        permanent: true,
      },
      {
        source: "/vs/:path*",
        destination: "/comparatif-centrales-achat",
        permanent: true,
      },
    ];
  },
};

export default withPayload(config);
