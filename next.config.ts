import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Case-study photos now live in /public/case-studies — no
    // third-party image host needed at runtime. Reserve unsplash
    // for any future swap to client-supplied screenshots.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "@react-three/drei"],
  },
};

export default nextConfig;
