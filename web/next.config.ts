import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Lecture file uploads go through a Server Action; Next's own default
      // (1mb) rejects any real PDF/slide deck before the handler even runs.
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
