import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Duplicate of the finance mortgage calculator (which it already canonicalised to).
      { source: "/calculators/housing/mortgage-calculator", destination: "/calculators/finance/mortgage-calculator", permanent: true },
      // Year dropped from the slug so the article URL doesn't go stale.
      { source: "/pages/blog/how-much-house-can-you-afford-2025", destination: "/pages/blog/how-much-house-can-you-afford", permanent: true },
    ];
  },
};

export default nextConfig;
