import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Case-study photography via Pollinations AI. Deterministic
      // by seed so each card always shows the same image.
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
        pathname: "/prompt/**",
      },
      // Reserve unsplash too — useful for swapping in real photos
      // when client-supplied screenshots aren't available yet.
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
