import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.112",
        port: "8000",
        pathname: "/stream/realtime-data/**",
      },
    ],
  },
};

export default nextConfig;
