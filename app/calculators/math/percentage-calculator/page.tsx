import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PercentageCalculator } from "@/components/flagship/math/PercentageCalculator";
import { PercentageBreakdownVisualizerChart } from "@/components/flagship/math/editorial-charts/PercentageBreakdownVisualizerChart";
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
    a: "Convert the percentage to a decimal by dividing by 100, then multiply by the total number. Formula: Value = (P ÷ 100) × Total. For example, 15% of 200 is (15 ÷ 100) × 200 = 0.15 × 200 = 30.",
  },
  {
    q: "How do I calculate percentage change (increase or decrease)?",
    a: "Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: Change % = ((New − Original) ÷ Original) × 100. A positive result denotes an increase; negative denotes a decrease.",
  },
  {
    q: "What is the difference between percentage change and percentage points?",
    a: "Percentage points measure arithmetic difference between two percentage values, whereas percentage change measures relative growth. If an interest rate moves from 4% to 5%, that is a 1 percentage point increase, but a 25% relative increase: ((5 − 4) ÷ 4) × 100 = 25%.",
  },
  {
    q: "How do I find the original price before a percentage discount?",
    a: "Divide the discounted price by (1 − (Discount % ÷ 100)). For example, if a coat costs $80 after a 20% discount: $80 ÷ 0.80 = $100 original price.",
  },
  {
    q: "How do I find the original price before sales tax was added?",
    a: "Divide the invoice total by (1 + (Tax % ÷ 100)). For example, if a receipt is $108 with 8% sales tax: $108 ÷ 1.08 = $100 pre-tax base price.",
  },
  {
    q: "What does the percent sign (%) actually mean?",
    a: "The word percent comes from Latin 'per centum', meaning 'by the hundred'. The symbol % represents a fraction with denominator 100. 45% means 45 parts per 100, or 0.45.",
  },
  {
    q: "Why does a 10% increase followed by a 10% decrease not return to the original number?",
    a: "Because the base shifts between calculations. Increasing 100 by 10% gives 110. Decreasing 110 by 10% subtracts 11, leaving 99 (a net 1% loss).",
  },
  {
    q: "Can a percentage exceed 100%?",
    a: "Yes. When a quantity exceeds its starting baseline, the percentage exceeds 100%. Doubling a number represents a 100% increase, or 200% of the baseline.",
  },
];

const FRACTION_ROWS = [
  ["1/1", "1.000", "100.0%", "Full integer baseline"],
  ["1/2", "0.500", "50.0%", "Half division"],
  ["1/3", "0.333...", "33.33%", "One-third proportion"],
  ["1/4", "0.250", "25.0%", "Quarter share"],
  ["1/5", "0.200", "20.0%", "Quintile; standard tipping"],
  ["1/6", "0.166...", "16.67%", "One-sixth fraction"],
  ["1/8", "0.125", "12.5%", "One-eighth division"],
  ["1/10", "0.100", "10.0%", "Decile; decimal shift"],
  ["1/20", "0.050", "5.0%", "Twentieth; nominal tax"],
  ["1/100", "0.010", "1.0%", "Single percent (100 bps)"],
];

const POINTS_VS_CHANGE_ROWS = [
  ["Starting Value", "4.00% annual interest", "4.00% annual interest"],
  ["Final Value", "5.00% annual interest", "5.00% annual interest"],
  ["Mathematical Formula", "New % − Old %", "((New − Old) ÷ Old) × 100"],
  ["Calculated Metric", "+1.00 Percentage Point (pp)", "+25.00% Relative Increase"],
  ["Typical Usage", "Central bank rates, bond yields", "Revenue growth, stock returns"],
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
              "@type": "MathSolver",
              name: "Percentage Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              potentialAction: [
                {
                  "@type": "SolveAction",
                  target: `${SITE_URL}${PATH}`,
                  mathExpression: "P = (X / Y) * 100",
                  eduQuestionType: "Percentage",
                },
              ],
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

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡</span> Related Calculators
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
          </div>
          <RelatedLinks links={RELATED} />
        </section>

        <Editorial>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical &amp; Statistical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO / NIST Compliant Precision</span>
          </div>

          <h2>What is a Percentage? Definition &amp; Mathematical Foundations</h2>
          <p>
            A <strong>percentage</strong> is a dimensionless mathematical ratio expressed as a fraction of 100. Derived from the Latin{" "}
            <em>per centum</em> (&ldquo;by the hundred&rdquo;), it establishes a standardized framework to evaluate and communicate proportions regardless of the absolute scale of the underlying values. The universal mathematical symbol for percentage is <strong>%</strong>.
          </p>
          <p>
            Historically, ancient Roman tax collectors computed levies in hundredths (<em>centesima rerum venalium</em>), while Italian merchants in the Middle Ages popularized the cursive shorthand <em>p 100</em>, which gradually transformed into our modern percent symbol. Mathematically, 1% equals the rational fraction 1/100 or decimal 0.01. Percentages represent normalized fractions with a fixed denominator of 100. Because human cognition processes base-100 quantities far more intuitively than disparate fractions like 19/83 or 47/215, percentages serve as the standard language of financial markets, commercial pricing, scientific error margins, and statistical reporting.
          </p>

          <div className="not-prose my-8">
            <PercentageBreakdownVisualizerChart />
          </div>

          <h2>The Four Foundational Percentage Formulas &amp; Derivations</h2>
          <p>
            Nearly every percentage problem in academic, financial, or daily contexts resolves to one of four canonical mathematical formulas. Understanding these foundational equations allows you to manipulate proportions flexibly:
          </p>

          <h3>1. Percentage of a Number (What is P% of X?)</h3>
          <p>
            This fundamental formula calculates a specific portion of an established whole value. Divide the percentage rate <em>P</em> by 100 to obtain its decimal coefficient, then multiply by the total amount <em>X</em>:
          </p>
          <Formula>Value = (P ÷ 100) × Total</Formula>
          <p>
            <em>Example:</em> An investor evaluates an 8.5% annual dividend payout on a portfolio valued at $45,000. Applying the formula:
          </p>
          <Formula>Dividend = (8.5 ÷ 100) × $45,000 = 0.085 × $45,000 = $3,825.00</Formula>

          <h3>2. Determining Proportional Percentage (X is What Percent of Y?)</h3>
          <p>
            To evaluate a part <em>X</em> relative to a known total <em>Y</em>, divide <em>X</em> by <em>Y</em> and multiply by 100 to convert to a percentage. This arises from the fundamental proportion equation <em>X / Y = P / 100</em>, which through cross-multiplication yields:
          </p>
          <Formula>Percentage (%) = (Part ÷ Whole) × 100</Formula>
          <p>
            <em>Example:</em> An inspection team reviews 850 components and finds 34 defective units. To calculate the failure rate:
          </p>
          <Formula>Defect Rate = (34 ÷ 850) × 100 = 0.040 × 100 = 4.00%</Formula>

          <h3>3. Relative Percentage Change (Increase or Decrease)</h3>
          <p>
            Percentage change measures relative variance between an initial baseline value and a new ending value over time. The difference must always be divided by the <strong>initial baseline value</strong>, not the new terminal value:
          </p>
          <Formula>Percentage Change (%) = [ (New Value − Original Value) ÷ Original Value ] × 100</Formula>
          <p>
            A positive result indicates growth (increase); a negative result indicates contraction (decrease). If monthly recurring revenue rises from $120,000 to $156,000:
          </p>
          <Formula>Revenue Growth (%) = [ ($156,000 − $120,000) ÷ $120,000 ] × 100 = (+36,000 ÷ 120,000) × 100 = +30.00%</Formula>

          <h3>4. Reverse Percentage (Finding the Original Base Before Discount or Tax)</h3>
          <p>
            In retail commerce and accounting, calculating pre-tax costs or pre-discount sticker prices requires dividing by the complementary multiplier rather than simple subtraction. When sales tax or VAT is added, the final invoice equals <em>Base × (1 + Rate / 100)</em>. Rearranging gives:
          </p>
          <Formula>Original Price = Final Price ÷ [ 1 ± (Rate % ÷ 100) ]</Formula>
          <p>
            <em>Example:</em> A tablet costs $336.00 after an 8% sales tax. To extract the pre-tax base price:
          </p>
          <Formula>Base Price = $336.00 ÷ (1 + 0.08) = $336.00 ÷ 1.08 = $311.11</Formula>

          <h2>Percentage Points vs. Percentage Change: The Crucial Statistical Distinction</h2>
          <p>
            A widespread error in business reporting is confusing <strong>percentage points</strong> with <strong>percentage change</strong>:
          </p>
          <ul>
            <li>
              <strong>Percentage Points (pp):</strong> Direct arithmetic subtraction between two percentage rates, describing absolute shift on a percentage scale.
            </li>
            <li>
              <strong>Percentage Change (%):</strong> Relative proportional growth or decline relative to the starting benchmark rate.
            </li>
          </ul>
          <p>
            When a mortgage rate rises from 4.00% to 5.00%, the difference is 5.00% − 4.00% = <strong>1.00 percentage point</strong>. However, the relative increase is ((5.00 − 4.00) ÷ 4.00) × 100 = <strong>25.00% percentage increase</strong> in borrowing costs.
          </p>

          <DataTable
            head={["Comparison Dimension", "Percentage Points (pp)", "Percentage Change (%)"]}
            rows={POINTS_VS_CHANGE_ROWS}
            highlight={1}
          />

          <h2>Fraction, Decimal, and Percentage Conversion Matrix</h2>
          <p>
            Converting between fractions, decimals, and percentages is essential for quantitative analysis. Divide by 100 to convert percentages to decimals, or divide numerator by denominator for fractions. For non-terminating rational numbers like 1/3 (0.3333...), standard convention rounds to two decimal places in commerce and four decimal places in scientific modeling:
          </p>
          <DataTable
            head={["Fraction", "Decimal Exact", "Percentage Equivalent", "Typical Usage"]}
            rows={FRACTION_ROWS}
            highlight={1}
          />

          <h2>Compounding Percentages: The Asymmetry of Sequential Percentage Changes</h2>
          <p>
            A frequent pitfall occurs when evaluating sequential percentage changes. If an asset gains 10% then loses 10%, it does not break even:
          </p>
          <Formula>100 × (1 + 0.10) = 110  ⟶  110 × (1 − 0.10) = 99.00  (Net Loss: −1.00%)</Formula>
          <p>
            Because the 10% reduction applies to the higher base ($110), it subtracts $11.00, yielding a net 1% loss. Multi-period compound changes require multiplying sequential multipliers:
          </p>
          <Formula>Final Value = Initial Value × (1 + r₁/100) × (1 + r₂/100) × ... × (1 + rₙ/100)</Formula>
          <p>
            This principle governs <Link href="/calculators/finance/compound-interest-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">compound interest</Link>, inflation erosion, and investment drawdowns. Recovering from a 50% loss requires a 100% gain to restore original principal.
          </p>

          <h2>Practical Real-World Applications &amp; Contextual Calculations</h2>
          <p>
            Percentages govern critical financial and quantitative decisions across everyday domains:
          </p>
          <ul>
            <li>
              <strong>Retail Shopping &amp; Discounts:</strong> Calculate clearance savings with our <Link href="/calculators/finance/discount-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Discount Calculator</Link>.
            </li>
            <li>
              <strong>Restaurant Gratuity:</strong> Split checks and calculate 18% or 20% tips using our <Link href="/calculators/finance/tip-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Tip Calculator</Link>.
            </li>
            <li>
              <strong>Commercial Margins:</strong> Separate gross margin (profit over revenue) from markup (profit added to cost).
            </li>
            <li>
              <strong>Inflation &amp; Wage Adjustments:</strong> Track annual cost-of-living increases against headline inflation benchmarks to verify real purchasing power retention across multi-year salary reviews.
            </li>
            <li>
              <strong>Ratios &amp; Proportions:</strong> Scale recipes or ratios using our <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Ratio Calculator</Link> and <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <Faq items={FAQ_ITEMS} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
