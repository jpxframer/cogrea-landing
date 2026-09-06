import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * English is served without a locale prefix so the URLs that are already
   * live ("/", "/legal/terms") keep working. Other locales are prefixed:
   * /fr, /fr/legal/terms, and so on.
   */
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/legal/:path*", destination: "/en/legal/:path*" },
    ];
  },
};

export default nextConfig;
