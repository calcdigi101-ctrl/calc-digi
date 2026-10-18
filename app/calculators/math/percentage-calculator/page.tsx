import type { Metadata } from "next";
import { Suspense } from "react";
import { PercentageCalculator } from "@/components/flagship/math/PercentageCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/math/percentage-calculator";
const TITLE = "Percentage Calculator – 4-in-1 Free Online Tool | CalcDigi";
const DESCRIPTION =
  "Free online percentage calculator. Calculate percentage of a number, percentage change (increase/decrease), what percent X is of Y, sales tax, discounts, and step-by-step formulas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I calculate the percentage of a number?",
    a: "To find the percentage of a number, convert the percentage into a decimal by dividing it by 100, then multiply by the total number. Formula: Value = (Percentage ÷ 100) × Total. For example, to find 15% of 200: (15 ÷ 100) × 200 = 0.15 × 200 = 30.",
  },
  {
    q: "How do I calculate percentage change (increase or decrease)?",
    a: "Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: Percentage Change = ((New − Original) ÷ Original) × 100. If the result is positive, it is an increase; if negative, it is a decrease.",
  },
  {
    q: "What is the difference between percentage change and percentage points?",
    a: "Percentage points are the simple arithmetic difference between two percentage values. Percentage change is the relative rate of growth. For example, if an interest rate increases from 4% to 5%, that is a 1 percentage point increase, but a 25% relative increase ((5 − 4) ÷ 4 × 100 = 25%).",
  },
  {
    q: "How do I find the original price before a percentage discount?",
    a: "Divide the discounted price by (1 − (Discount % ÷ 100)). For example, if a jacket costs $80 after a 20% discount: $80 ÷ (1 − 0.20) = $80 ÷ 0.80 = $100 original price.",
  },
  {
    q: "How do I find the original price before sales tax was added?",
    a: "Divide the total price by (1 + (Tax % ÷ 100)). For example, if total is $108 with 8% tax: $108 ÷ 1.08 = $100 base price.",
  },
  {
    q: "What does the percent sign (%) actually mean?",
    a: "The word percent originates from the Latin phrase 'per centum', meaning 'by the hundred'. The percent sign (%) represents a fraction with a denominator of 100. For instance, 45% literally means 45 parts out of 100, or 0.45.",
  },
  {
    q: "Can a percentage be greater than 100%?",
    a: "Yes. When a quantity exceeds its reference whole or starting point, the percentage is greater than 100%. For example, doubling a number is a 100% increase, resulting in 200% of the original value.",
  },
];

const FRACTION_ROWS = [
  ["1/1", "1.0", "100%"],
  ["1/2", "0.5", "50%"],
  ["1/3", "0.3333...", "33.33%"],
  ["1/4", "0.25", "25%"],
  ["1/5", "0.2", "20%"],
  ["1/6", "0.1667...", "16.67%"],
  ["1/8", "0.125", "12.5%"],
  ["1/10", "0.1", "10%"],
  ["1/20", "0.05", "5%"],
  ["1/100", "0.01", "1%"],
];

const RELATED = [
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/finance/discount-calculator", icon: "🏷️", name: "Discount Calculator" },
  { href: "/calculators/finance/tip-calculator", icon: "🧾", name: "Tip Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
  { href: "/calculators/math/average-calculator", icon: "📐", name: "Average Calculator" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Math Calculators", item: `${SITE_URL}/pages/math` },
                { "@type": "ListItem", position: 3, name: "Percentage Calculator", item: `${SITE_URL}${PATH}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Percentage Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "HowTo",
              name: "How to Calculate Percentages",
              description: "Step-by-step instructions to calculate percentages of numbers, proportions, and percentage changes.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Convert percentage to decimal",
                  text: "Divide the given percentage by 100 (e.g., 20% becomes 0.20).",
                },
                {
                  "@type": "HowToStep",
                  name: "Multiply by total amount",
                  text: "Multiply the decimal by the total number (e.g., 0.20 × 150 = 30).",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      <CalculatorPage
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/pages/math", label: "Math" },
          { label: "Percentage Calculator" },
        ]}
        title="Percentage Calculator"
        intro="Free interactive 4-in-1 percentage tool: compute percentage of a number, find ratios and proportions, calculate percentage increase or decrease, and add sales tax or discounts with step-by-step solutions."
      >
        <Suspense fallback={<div className="mt-6 h-[480px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <PercentageCalculator />
        </Suspense>

        <Editorial>
          <h2>What is a Percentage? (Definition & Quick Summary)</h2>
          <p>
            A <strong>percentage</strong> is a number or ratio expressed as a fraction of 100. Derived from the Latin phrase{" "}
            <em>per centum</em>, meaning &ldquo;by the hundred,&rdquo; it provides a standardized way to compare parts to a whole regardless of the total size. The percentage symbol is <strong>%</strong>.
          </p>
          <p>
            In mathematical terms, 1% corresponds to 1/100 or 0.01. Percentages are universally used in financial calculations (interest rates, mortgage yields, sales tax, inflation), scientific measurements (purity, error margins, statistical confidence), and everyday decision-making (discounts, tips, exam scores).
          </p>

          <h2>Core Percentage Formulas</h2>
          <p>
            Depending on your calculation objective, use one of the standard mathematical formulas below:
          </p>

          <h3>1. Percentage of a Number (What is P% of X?)</h3>
          <Formula>Value = (P ÷ 100) × X</Formula>
          <p>
            <em>Example:</em> What is 15% of $240? Convert 15% to 0.15, then multiply by 240: 0.15 × 240 = <strong>$36.00</strong>.
          </p>

          <h3>2. Proportion (X is What Percent of Y?)</h3>
          <Formula>Percentage (%) = (X ÷ Y) × 100</Formula>
          <p>
            <em>Example:</em> If a student scores 42 out of 50 on an exam: (42 ÷ 50) × 100 = 0.84 × 100 = <strong>84%</strong>.
          </p>

          <h3>3. Percentage Change (Increase or Decrease)</h3>
          <Formula>Percentage Change (%) = [(New Value − Original Value) ÷ Original Value] × 100</Formula>
          <p>
            <em>Example:</em> If a house price rises from $300,000 to $345,000: [(345,000 − 300,000) ÷ 300,000] × 100 = (45,000 ÷ 300,000) × 100 = <strong>+15% increase</strong>.
          </p>

          <h3>4. Reverse Percentage (Finding Original Before Discount or Tax)</h3>
          <Formula>Original Price = Sale Price ÷ (1 − (Discount % ÷ 100))</Formula>
          <p>
            <em>Example:</em> If an item is on sale for $72 after a 20% discount: 72 ÷ (1 − 0.20) = 72 ÷ 0.80 = <strong>$90.00</strong> original price.
          </p>

          <h2>Common Fractions to Percentages Conversion Table</h2>
          <p>
            The table below serves as a quick reference conversion chart between common fractions, decimal equivalents, and percentages:
          </p>
          <DataTable
            head={["Fraction", "Decimal", "Percentage (%)"]}
            rows={FRACTION_ROWS}
            highlight={1}
          />

          <h2>Practical Real-World Applications</h2>
          <ul>
            <li>
              <strong>Sales Tax &amp; Tipping:</strong> Calculate dinner tips (e.g., 18% or 20% of your bill) and local state sales taxes in seconds.
            </li>
            <li>
              <strong>Retail Shopping &amp; Discounts:</strong> Double-check clearance savings (e.g. &ldquo;Take an extra 30% off&rdquo;) to verify actual cash savings.
            </li>
            <li>
              <strong>Salary Raises &amp; Inflation:</strong> Measure your real wage growth against the annual Consumer Price Index (CPI) inflation percentage.
            </li>
            <li>
              <strong>Financial Investments:</strong> Analyze capital gains yield, dividend percentages, and mortgage interest rates across banking institutions.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <Faq items={FAQ_ITEMS} />

          <h2 className="mt-10">Related Calculators</h2>
          <RelatedLinks links={RELATED} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
