import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/articles/:path*", destination: "/", permanent: true },
      { source: "/notes/:path*", destination: "/", permanent: true },
      { source: "/now", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
