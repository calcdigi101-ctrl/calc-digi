import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Duplicate of the finance mortgage calculator (which it already canonicalised to).
      { source: "/calculators/housing/mortgage-calculator", destination: "/calculators/finance/mortgage-calculator", permanent: true },
      // Year dropped from the slug so the article URL doesn't go stale.
      { source: "/pages/blog/how-much-house-can-you-afford-2025", destination: "/pages/blog/how-much-house-can-you-afford", permanent: true },
      // Category index fallbacks to canonical /pages/[category] landing pages
      { source: "/calculators/geography", destination: "/pages/geography", permanent: true },
      { source: "/pages/baby", destination: "/pages/baby", permanent: true },
      // Duplicate calculator consolidation (301 permanent redirects)
      { source: "/calculators/measurements/currency-converter", destination: "/calculators/finance/currency-converter", permanent: true },
      { source: "/calculators/math/roman-numeral-converter", destination: "/calculators/math/roman-numeral-converter", permanent: true },
      { source: "/calculators/health/child-height-predictor", destination: "/calculators/health/child-height-predictor", permanent: true },
      // Legacy / broken link fallbacks
      { source: "/calculators/conversion/length-converter", destination: "/calculators/measurements/length-converter", permanent: true },
      { source: "/calculators/health/protein-calculator", destination: "/calculators/health/protein-intake-calculator", permanent: true },
    ];
  },
};

export default nextConfig;
