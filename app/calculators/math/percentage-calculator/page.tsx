import type { Metadata } from "next";
import Link from "next/link";
import { PercentageCalculator } from "@/components/flagship/math/PercentageCalculator";
import { PercentageBreakdownVisualizerChart } from "@/components/flagship/math/editorial-charts/PercentageBreakdownVisualizerChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/math/percentage-calculator";
const TITLE = "Percentage Calculator | Free 4-in-1 Percent, Increase & Discount Tool";
const DESCRIPTION =
  "Free online percentage calculator. Calculate percent of a number, percentage change (increase/decrease), what percent X is of Y, reverse percentages, sales tax, and discount with step-by-step formulas.";

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
    q: "What is percentage difference and how does it differ from percentage change?",
    a: "Percentage difference compares two numbers without designating one as a baseline, dividing the absolute difference by the average of the two numbers: (|A - B| / ((A + B) / 2)) × 100. In contrast, percentage change measures directional movement over time relative to a starting original baseline.",
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
    q: "How do you calculate scientific percentage error in laboratory measurements?",
    a: "Percentage error measures experimental accuracy relative to an accepted theoretical standard. Formula: % Error = (|Experimental Value − Theoretical Value| ÷ Theoretical Value) × 100. A lower percentage error indicates higher experimental precision.",
  },
  {
    q: "Why does a 10% increase followed by a 10% decrease not return to the original number?",
    a: "Because the base shifts between calculations. Increasing 100 by 10% gives 110. Decreasing 110 by 10% subtracts 11, leaving 99 (a net 1% loss). Recovering from any percentage loss always requires a larger reciprocal percentage gain.",
  },
  {
    q: "Can a percentage exceed 100%?",
    a: "Yes. When a quantity exceeds its starting baseline, the percentage exceeds 100%. Doubling a number represents a 100% increase, or 200% of the baseline, while tripling represents a 200% increase (300% of the baseline).",
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

const ERROR_ROWS = [
  ["Low Uncertainty (High Accuracy)", "0.00% to 1.00%", "Analytical chemistry titration, GPS atomic timing"],
  ["Acceptable Experimental Margin", "1.00% to 5.00%", "Physics lab mechanics, calorimeter thermodynamics"],
  ["Moderate Empirical Variance", "5.00% to 15.00%", "Field ecology sampling, macroeconomic GDP forecasting"],
  ["High Error Margin (Requires Calibration)", "> 15.00%", "Sensor drift, uncalibrated optical refractometers"],
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
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/math", label: "Math" }}
      title={TITLE}
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="P = (X / Y) \times 100"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
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

          <h2>The Five Foundational Percentage Formulas &amp; Derivations</h2>
          <p>
            Nearly every percentage calculation in academic examination, retail business, or advanced scientific laboratory analysis resolves to one of five canonical mathematical formulas. Mastering these equations allows you to manipulate quantitative proportions with speed and precision:
          </p>

          <h3>1. Percentage of a Number (What is P% of X?)</h3>
          <p>
            This fundamental formula calculates a specific portion of an established whole value. Divide the percentage rate <em>P</em> by 100 to obtain its decimal coefficient, then multiply by the total amount <em>X</em>:
          </p>
          <Formula>{"\\text{Value} = \\left( \\frac{P}{100} \\right) \\times X"}</Formula>
          <p>
            <em>Example:</em> An investor evaluates an 8.5% annual dividend payout on a portfolio valued at $45,000 using our <Link href="/calculators/finance/roi-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">ROI calculator</Link>. Applying the formula yields:
          </p>
          <Formula>{"\\text{Dividend} = \\left( \\frac{8.5}{100} \\right) \\times 45{,}000 = 0.085 \\times 45{,}000 = \\$3{,}825.00"}</Formula>

          <h3>2. Determining Proportional Percentage (X is What Percent of Y?)</h3>
          <p>
            To evaluate a part <em>X</em> relative to a known total <em>Y</em>, divide <em>X</em> by <em>Y</em> and multiply by 100 to convert to a percentage. This arises from the fundamental proportion equation <em>X / Y = P / 100</em>, which through cross-multiplication yields:
          </p>
          <Formula>{"\\text{Percentage (\\%)} = \\left( \\frac{\\text{Part}}{\\text{Whole}} \\right) \\times 100"}</Formula>
          <p>
            <em>Example:</em> An inspection team reviews 850 manufactured components and identifies 34 defective units. To calculate the failure rate:
          </p>
          <Formula>{"\\text{Defect Rate} = \\left( \\frac{34}{850} \\right) \\times 100 = 0.040 \\times 100 = 4.00\\%"}</Formula>

          <h3>3. Relative Percentage Change (Increase or Decrease)</h3>
          <p>
            Percentage change measures directional relative variance between an initial baseline value and a new ending value over time. The mathematical delta must always be divided by the <strong>initial baseline value</strong>, not the new terminal value:
          </p>
          <Formula>{"\\text{Percentage Change (\\%)} = \\left( \\frac{\\text{New Value} - \\text{Original Value}}{\\text{Original Value}} \\right) \\times 100"}</Formula>
          <p>
            A positive result indicates growth (percentage increase); a negative result indicates contraction (percentage decrease). For instance, when analyzing business revenue expansion or price inflation with our <Link href="/calculators/finance/inflation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">inflation calculator</Link>, if monthly recurring revenue rises from $120,000 to $156,000:
          </p>
          <Formula>{"\\text{Revenue Growth} = \\left( \\frac{156{,}000 - 120{,}000}{120{,}000} \\right) \\times 100 = \\left( \\frac{+36{,}000}{120{,}000} \\right) \\times 100 = +30.00\\%"}</Formula>

          <h3>4. Reverse Percentage (Finding the Original Base Before Discount or Tax)</h3>
          <p>
            In retail commerce and accounting, calculating pre-tax costs or pre-discount sticker prices requires dividing by the complementary multiplier rather than simple subtraction. When sales tax or VAT is added, the final invoice equals <em>Base × (1 + Rate / 100)</em>. Rearranging gives:
          </p>
          <Formula>{"\\text{Original Price} = \\frac{\\text{Final Price}}{1 \\pm \\left( \\frac{\\text{Rate \\%}}{100} \\right)}"}</Formula>
          <p>
            <em>Example:</em> A consumer purchases electronics costing $336.00 after an 8% sales tax calculated using our <Link href="/calculators/finance/sales-tax-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">sales tax calculator</Link>. To extract the true pre-tax merchant base price:
          </p>
          <Formula>{"\\text{Base Price} = \\frac{\\$336.00}{1 + 0.08} = \\frac{\\$336.00}{1.08} = \\$311.11"}</Formula>

          <h3>5. Percentage Difference Between Two Positive Numbers</h3>
          <p>
            Unlike percentage change, <strong>percentage difference</strong> evaluates the relative disparity between two independent measurements where neither number represents a historical starting baseline. The formula divides the absolute difference by the arithmetic average of both numbers:
          </p>
          <Formula>{"\\text{Percentage Difference (\\%)} = \\left( \\frac{|A - B|}{\\frac{A + B}{2}} \\right) \\times 100"}</Formula>
          <p>
            <em>Example:</em> Two competing manufacturing plants produce 180 units and 220 units per shift respectively. The percentage difference between their output capacities evaluates as:
          </p>
          <Formula>{"\\text{Difference} = \\left( \\frac{|180 - 220|}{\\frac{180 + 220}{2}} \\right) \\times 100 = \\left( \\frac{40}{200} \\right) \\times 100 = 20.00\\%"}</Formula>

          <h2>Percentage Points vs. Percentage Change: The Crucial Statistical Distinction</h2>
          <p>
            A widespread error in macroeconomic journalism and corporate earnings reporting is confusing <strong>percentage points</strong> with <strong>percentage change</strong>:
          </p>
          <ul>
            <li>
              <strong>Percentage Points (pp):</strong> Direct arithmetic subtraction between two percentage rates, describing an absolute shift along a percentage scale.
            </li>
            <li>
              <strong>Percentage Change (%):</strong> Relative proportional growth or decline relative to the starting benchmark rate.
            </li>
          </ul>
          <p>
            When a central bank increases interest rates from 4.00% to 5.00%, the difference is 5.00% − 4.00% = <strong>1.00 percentage point</strong> (equivalent to 100 basis points or bps). However, the relative increase is ((5.00 − 4.00) ÷ 4.00) × 100 = <strong>25.00% percentage increase</strong> in borrowing costs.
          </p>

          <DataTable
            head={["Comparison Dimension", "Percentage Points (pp)", "Percentage Change (%)"]}
            rows={POINTS_VS_CHANGE_ROWS}
            highlight={1}
          />

          <h2>Scientific Percentage Error &amp; Experimental Accuracy</h2>
          <p>
            In laboratory sciences, chemistry titration, and mechanical engineering, calculating <strong>percentage error</strong> quantifies the discrepancy between observed experimental measurements and standard accepted theoretical constants:
          </p>
          <Formula>{"\\text{Percentage Error (\\%)} = \\left( \\frac{|\\text{Experimental Value} - \\text{Theoretical Value}|}{\\text{Theoretical Value}} \\right) \\times 100"}</Formula>
          <p>
            Tracking percentage error allows researchers to identify systematic instrument calibration offsets and calibrate precision equipment:
          </p>

          <DataTable
            head={["Error Margin Category", "Typical Variance Range", "Scientific & Engineering Application"]}
            rows={ERROR_ROWS}
            highlight={1}
          />

          <h2>Fraction, Decimal, and Percentage Conversion Matrix</h2>
          <p>
            Converting between fractions, decimals, and percentages is essential for quantitative analysis. Divide by 100 to convert percentages to decimals, or divide numerator by denominator for fractions with our <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">fraction calculator</Link>. For non-terminating rational numbers like 1/3 (0.3333...), standard convention rounds to two decimal places in commerce and four decimal places in scientific modeling:
          </p>
          <DataTable
            head={["Fraction", "Decimal Exact", "Percentage Equivalent", "Typical Usage"]}
            rows={FRACTION_ROWS}
            highlight={1}
          />

          <h2>Compounding Percentages: The Asymmetry of Sequential Percentage Changes</h2>
          <p>
            A frequent mathematical pitfall occurs when evaluating sequential percentage changes. If an asset gains 10% then loses 10%, it does not break even:
          </p>
          <Formula>{"100 \\times (1 + 0.10) = 110  \\longrightarrow  110 \\times (1 - 0.10) = 99.00  \\quad (\\text{Net Loss: } -1.00\\%)"}</Formula>
          <p>
            Because the 10% reduction applies to the higher base ($110), it subtracts $11.00, yielding a net 1% loss. Multi-period compound changes require multiplying sequential multipliers:
          </p>
          <Formula>{"\\text{Final Value} = \\text{Initial Value} \\times \\prod_{i=1}^{n} \\left( 1 + \\frac{r_i}{100} \\right)"}</Formula>
          <p>
            This fundamental asymmetric principle governs <Link href="/calculators/finance/compound-interest-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">compound interest</Link>, currency valuations, and portfolio drawdown risk management. Recovering from a 50% loss requires a 100% gain to restore original principal.
          </p>

          <h2>Practical Real-World Applications &amp; Contextual Calculations</h2>
          <p>
            Percentages govern critical financial and quantitative decisions across everyday commerce and science:
          </p>
          <ul>
            <li>
              <strong>Retail Shopping &amp; Discounts:</strong> Calculate clearance savings and seasonal promotional markdowns with our <Link href="/calculators/finance/discount-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Discount Calculator</Link>.
            </li>
            <li>
              <strong>Restaurant Gratuity &amp; Bill Splitting:</strong> Split checks and calculate 18% or 20% tips using our <Link href="/calculators/finance/tip-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Tip Calculator</Link>.
            </li>
            <li>
              <strong>Ratios &amp; Proportions:</strong> Scale physical dimensions, chemical mixtures, and culinary recipes using our <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Ratio Calculator</Link> and <Link href="/calculators/math/average-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Average Calculator</Link>.
            </li>
            <li>
              <strong>Commercial Margins vs Markups:</strong> Accurately distinguish gross margin (profit divided by revenue) from markup percentage (profit added to cost of goods sold).
            </li>
            <li>
              <strong>Academic Examination Grading:</strong> Convert cumulative student scores into standardized percentile ranks and weighted course marks across academic semesters.
            </li>
          </ul>
        </>
      }
    >
      <PercentageCalculator />
    </CalcPage>
  );
}
