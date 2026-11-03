import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Deduplicated calculators (301 permanent redirects to main URLs)
      { source: "/calculators/finance/break-even-calculator", destination: "/calculators/business/break-even-calculator", permanent: true },
      { source: "/calculators/finance/roi-calculator", destination: "/calculators/business/roi-calculator", permanent: true },
      { source: "/calculators/finance/sales-tax-calculator", destination: "/calculators/business/sales-tax-calculator", permanent: true },
      { source: "/calculators/science/ohms-law-calculator", destination: "/calculators/electronics/ohms-law-calculator", permanent: true },
      { source: "/calculators/environment/solar-panel-calculator", destination: "/calculators/electronics/solar-panel-calculator", permanent: true },
      { source: "/calculators/food/calorie-burn-calculator", destination: "/calculators/health/calorie-burn-calculator", permanent: true },
      { source: "/calculators/health/baby-weight-calculator", destination: "/calculators/baby/baby-weight-percentile-calculator", permanent: true },
      // Duplicate of the finance mortgage calculator (which it already canonicalised to).
      { source: "/calculators/housing/mortgage-calculator", destination: "/calculators/finance/mortgage-calculator", permanent: true },
      // Year dropped from the slug so the article URL doesn't go stale.
      { source: "/pages/blog/how-much-house-can-you-afford-2025", destination: "/pages/blog/how-much-house-can-you-afford", permanent: true },
      // Category index fallbacks to canonical /pages/[category] landing pages
      { source: "/calculators/geography", destination: "/pages/geography", permanent: true },
      { source: "/calculators/baby", destination: "/pages/baby", permanent: true },
      // Duplicate calculator consolidation (301 permanent redirects)
      { source: "/calculators/measurements/currency-converter", destination: "/calculators/finance/currency-converter", permanent: true },
      { source: "/calculators/measurements/roman-numeral-converter", destination: "/calculators/math/roman-numeral-converter", permanent: true },
      { source: "/calculators/baby/child-height-predictor-calculator", destination: "/calculators/health/child-height-predictor", permanent: true },
      // Legacy / broken link fallbacks
      { source: "/calculators/conversion/length-converter", destination: "/calculators/measurements/length-converter", permanent: true },
      { source: "/calculators/health/protein-calculator", destination: "/calculators/health/protein-intake-calculator", permanent: true },
    ];
  },
};

export default nextConfig;
