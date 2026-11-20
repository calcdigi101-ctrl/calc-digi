import type { Metadata } from "next";
import Link from "next/link";
import { PercentageCalculator } from "@/components/flagship/math/PercentageCalculator";
import { PercentageBreakdownVisualizerChart } from "@/components/flagship/math/editorial-charts/PercentageBreakdownVisualizerChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/math/percentage-calculator";
const TITLE = "Percentage Calculator: Calculate Percent, Increase and Difference | CalcDigi";
const DESCRIPTION =
  "Free online percentage calculator. Quickly calculate the percentage of a number, percentage increase or decrease, and common discounts with simple formulas.";

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
    siteName: "CalcDigi",
    images: [
      {
        url: "https://www.calcdigi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Percentage Calculator - CalcDigi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@CalcDigi",
    site: "@CalcDigi",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I calculate the percentage of a number?",
    a: "Convert the percentage to a decimal by dividing it by 100, then multiply by the total number. For example, to find 20% of 80, multiply 0.20 by 80 to get 16.",
  },
  {
    q: "What is the formula for percentage increase or decrease?",
    a: "Subtract the original value from the new value, divide that difference by the original value, and multiply by 100: Percentage Change = ((New Value - Old Value) / Old Value) * 100. A positive result is an increase and a negative result is a decrease.",
  },
  {
    q: "What is the difference between percentage change and percentage points?",
    a: "Percentage change measures the relative rate of growth between two numbers. Percentage points represent the simple arithmetic difference between two percentage values. For example, if an interest rate moves from 5% to 6%, it rose by 1 percentage point, which is a 20% relative increase.",
  },
  {
    q: "How do I calculate percentage difference between two numbers?",
    a: "Take the absolute difference between the two numbers, divide it by the average of the two numbers, and multiply by 100. This formula is used when neither number is considered the baseline or original value.",
  },
  {
    q: "Why does a 10% increase followed by a 10% decrease not equal the original number?",
    a: "Because the second percentage is calculated off a larger base number. If you start with 100 and add 10%, you have 110. Taking 10% off 110 subtracts 11, leaving you with 99 instead of 100.",
  },
  {
    q: "How do I calculate what percentage one number is of another?",
    a: "Divide the part by the whole and multiply by 100: Percentage = (Part / Total) * 100. For example, if you scored 45 out of 60 on a test, divide 45 by 60 to get 0.75, which equals 75%.",
  },
];

const QUICK_REFERENCE_ROWS = [
  [<strong key="25">25</strong>, "2.50", "3.75", "5.00", "6.25", "12.50"],
  [<strong key="50">50</strong>, "5.00", "7.50", "10.00", "12.50", "25.00"],
  [<strong key="100">100</strong>, "10.00", "15.00", "20.00", "25.00", "50.00"],
  [<strong key="250">250</strong>, "25.00", "37.50", "50.00", "62.50", "125.00"],
  [<strong key="500">500</strong>, "50.00", "75.00", "100.00", "125.00", "250.00"],
  [<strong key="1000">1,000</strong>, "100.00", "150.00", "200.00", "250.00", "500.00"],
];

const POINTS_VS_CHANGE_ROWS = [
  ["Starting Value", "4.00% annual interest", "4.00% annual interest"],
  ["Final Value", "5.00% annual interest", "5.00% annual interest"],
  ["Formula", "New % - Old %", "((New - Old) / Old) * 100"],
  ["Result", "+1.00 Percentage Point (pp)", "+25.00% Relative Increase"],
  ["Typical Usage", "Central bank rates, bond yields", "Revenue growth, sales numbers"],
];

const ERROR_ROWS = [
  ["Low Uncertainty (High Accuracy)", "0.00% to 1.00%", "Analytical chemistry, GPS timing"],
  ["Acceptable Experimental Margin", "1.00% to 5.00%", "Physics lab mechanics, heat experiments"],
  ["Moderate Empirical Variance", "5.00% to 15.00%", "Field surveys, macroeconomic forecasts"],
  ["High Error Margin (Requires Calibration)", "> 15.00%", "Sensor drift, uncalibrated instruments"],
];

const FRACTION_ROWS = [
  ["1/1", "1.000", "100.0%", "Full integer baseline"],
  ["1/2", "0.500", "50.0%", "Half division"],
  ["1/3", "0.333...", "33.33%", "One-third proportion"],
  ["1/4", "0.250", "25.0%", "Quarter share"],
  ["1/5", "0.200", "20.0%", "Standard tip rate"],
  ["1/6", "0.166...", "16.67%", "One-sixth fraction"],
  ["1/8", "0.125", "12.5%", "One-eighth division"],
  ["1/10", "0.100", "10.0%", "One-tenth decimal shift"],
  ["1/20", "0.050", "5.0%", "Nominal rate"],
  ["1/100", "0.010", "1.0%", "Single percent (100 basis points)"],
];

const RELATED = [
  { href: "/calculators/finance/discount-calculator", icon: "🏷️", name: "Discount Calculator" },
  { href: "/calculators/business/sales-tax-calculator", icon: "🧾", name: "Sales Tax Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      breadcrumbLabel="Percentage Calculator"
      title="Online Percentage Calculator (Percent of, Increase and Difference)"
      intro="Calculate the percentage of any number, find percentage increases or decreases, and solve common everyday percentage problems with step-by-step math."
      description={DESCRIPTION}
      category={{ href: "/pages/math", label: "Math" }}
      appCategory="EducationalApplication"
      mathExpression="P = (X / Y) \times 100"
      mathSolver={{
        name: "Percentage Calculator",
        assesses: ["Percentages", "Percentage Calculations", "Percentage Change"],
        eduQuestionType: ["Percentage"],
      }}
      authorOverride={{
        "@type": "Person",
        name: "CalcDigi Math Team",
        url: "https://www.calcdigi.com/about",
      }}
      howToNameOverride="How to Calculate Percentages Online"
      datePublishedOverride="2026-01-01"
      dateModifiedOverride="2026-11-20"
      exactFaq={true}
      hideEmbedAttribution={true}
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified Mathematical Standards
            </span>
            <span>•</span>
            <span>Last updated: November 2026</span>
            <span>•</span>
            <span>Step-by-Step Accuracy</span>
          </div>

          {/* Quick Answer Box */}
          <div className="not-prose mb-8 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 p-5 dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-teal-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">💡</span> Quick Answer: How to Calculate Percentages and Percentage Change
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              To find <strong>P% of X</strong>, convert the percentage to a decimal and multiply: <strong>(P / 100) * X</strong> (for example, 15% of $80 is 0.15 * 80 = $12). To find the <strong>percentage change</strong> from an old value to a new value, use <strong>((New Value - Old Value) / Old Value) * 100</strong> (for example, from $50 to $65 is ((65 - 50) / 50) * 100 = <strong>+30% increase</strong>).
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            How to Use the Percentage Calculator
          </h2>
          <ol className="mb-8 list-decimal space-y-2 pl-6 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Choose your calculation mode:</strong> Select what you want to calculate, such as the percentage of a number, percentage increase or decrease, or what percentage one number is of another.</li>
            <li><strong>Enter your numbers:</strong> Type your values into the input boxes.</li>
            <li><strong>View your instant result:</strong> The calculator updates in real time with the final answer and step-by-step arithmetic.</li>
          </ol>

          <h2>What is a Percentage and How Does It Work?</h2>
          <p>
            A <strong>percentage</strong> is simply a number or ratio expressed as a fraction of 100. The term comes from the Latin <em>per centum</em>, meaning &ldquo;by the hundred.&rdquo; It is written with the percent sign (<strong>%</strong>).
          </p>
          <p>
            Because comparing parts of 100 is much easier than comparing uneven fractions like 17/83 or 43/215, percentages are the standard way people communicate proportions in finance, shopping discounts, taxes, test scores, and statistics. For example, 1% means 1 part out of 100, which equals the decimal 0.01. Similarly, 50% means 50 parts out of 100, which simplifies to 1/2 or 0.50.
          </p>

          <div className="not-prose my-8">
            <PercentageBreakdownVisualizerChart />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Quick Percentage Reference Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Use this quick reference table to find standard percentages, tips, and common discounts across numbers from 25 to 1,000:
          </p>
          <DataTable
            head={["Base Number", "10% of Number", "15% (Standard Tip)", "20% (Common Tip)", "25% (Quarter Off)", "50% (Half Off)"]}
            rows={QUICK_REFERENCE_ROWS}
            highlight={2}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2 mb-6">
            *Mental math tip: To quickly calculate 10% of any number, move the decimal point one place to the left. To find 20%, double that 10% amount. To find 15%, find 10% and add half of it.
          </p>

          <h2>The Most Common Percentage Formulas Explained</h2>
          <p>
            Most everyday percentage questions use one of these five core formulas:
          </p>

          <h3>1. Percentage of a Number (What is P% of X?)</h3>
          <p>
            Convert the percentage to a decimal by dividing by 100, then multiply by the total number:
          </p>
          <Formula>{"\\text{Value} = \\left( \\frac{P}{100} \\right) \\times X"}</Formula>
          <p>
            <em>Example:</em> To find 15% of $80, divide 15 by 100 to get 0.15, then multiply by 80 to get $12.00.
          </p>

          <h3>2. Determining What Percentage One Number is of Another (X is What % of Y?)</h3>
          <p>
            Divide the part by the whole and multiply by 100:
          </p>
          <Formula>{"\\text{Percentage (\\%)} = \\left( \\frac{\\text{Part}}{\\text{Whole}} \\right) \\times 100"}</Formula>
          <p>
            <em>Example:</em> If an inspection finds 34 defective items in a batch of 850 units, the defect rate is (34 / 850) * 100 = 4.00%.
          </p>

          <h3>3. Percentage Increase or Decrease (Percentage Change)</h3>
          <p>
            Subtract the original value from the new value, divide that difference by the original value, and multiply by 100:
          </p>
          <Formula>{"\\text{Percentage Change (\\%)} = \\left( \\frac{\\text{New Value} - \\text{Original Value}}{\\text{Original Value}} \\right) \\times 100"}</Formula>
          <p>
            A positive result means growth (increase), while a negative result means decline (decrease). For example, if monthly revenue grows from $120,000 to $156,000: ((156,000 - 120,000) / 120,000) * 100 = +30.00%.
          </p>

          <h3>4. Reverse Percentage (Finding the Original Base Before Discount or Tax)</h3>
          <p>
            When finding an original price before tax was added or before a discount was subtracted, divide by the combined multiplier instead of subtracting directly:
          </p>
          <Formula>{"\\text{Original Price} = \\frac{\\text{Final Price}}{1 \\pm \\left( \\frac{\\text{Rate \\%}}{100} \\right)}"}</Formula>
          <p>
            <em>Example:</em> An item costs $336.00 after an 8% sales tax using our <Link href="/calculators/business/sales-tax-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">sales tax calculator</Link>. The pre-tax price is $336.00 / 1.08 = $311.11.
          </p>

          <h3>5. Percentage Difference Between Two Numbers</h3>
          <p>
            Use percentage difference when comparing two numbers where neither number is the starting baseline. Divide the absolute difference by the average of the two numbers:
          </p>
          <Formula>{"\\text{Percentage Difference (\\%)} = \\left( \\frac{|A - B|}{\\frac{A + B}{2}} \\right) \\times 100"}</Formula>
          <p>
            <em>Example:</em> If two manufacturing teams produce 180 and 220 units per shift, the percentage difference is (|180 - 220| / 200) * 100 = 20.00%.
          </p>

          <h2>Percentage Change vs Percentage Points</h2>
          <p>
            People often mix up percentage points with percentage change:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>Percentage Points (pp):</strong> The direct arithmetic difference between two percentage values.
            </li>
            <li>
              <strong>Percentage Change (%):</strong> The relative rate of growth or decrease compared to the starting number.
            </li>
          </ul>
          <p>
            For example, if an interest rate moves from 4.00% to 5.00%, the difference is 5.00% - 4.00% = <strong>1.00 percentage point</strong>. However, the relative increase is ((5.00 - 4.00) / 4.00) * 100 = <strong>25.00% increase</strong> in borrowing costs.
          </p>

          <DataTable
            head={["Comparison Item", "Percentage Points (pp)", "Percentage Change (%)"]}
            rows={POINTS_VS_CHANGE_ROWS}
            highlight={1}
          />

          <h2>How to Calculate Percentage Error</h2>
          <p>
            In science, chemistry, and engineering, percentage error measures how close an experimental measurement is to the true, accepted theoretical value:
          </p>
          <Formula>{"\\text{Percentage Error (\\%)} = \\left( \\frac{|\\text{Experimental Value} - \\text{Theoretical Value}|}{\\text{Theoretical Value}} \\right) \\times 100"}</Formula>
          <p>
            Lower percentage error means higher measurement accuracy:
          </p>

          <DataTable
            head={["Error Range", "Accuracy Level", "Typical Practical Use"]}
            rows={ERROR_ROWS}
            highlight={1}
          />

          <h2>Fraction, Decimal, and Percentage Conversion Guide</h2>
          <p>
            Converting between fractions, decimals, and percentages is simple. Divide by 100 to convert a percentage to a decimal. To convert a fraction to a decimal, divide the top number by the bottom number using our <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">fraction calculator</Link>. To turn a decimal into a percentage, multiply by 100:
          </p>
          <DataTable
            head={["Fraction", "Decimal Value", "Percentage Equivalent", "Common Use"]}
            rows={FRACTION_ROWS}
            highlight={1}
          />

          <h2>Why a 10% Increase Followed by a 10% Decrease Does Not Equal Zero</h2>
          <p>
            A common percentage trap is assuming that gaining 10% and then losing 10% brings you back to your starting amount. It does not:
          </p>
          <Formula>{"100 \\times (1 + 0.10) = 110  \\longrightarrow  110 \\times (1 - 0.10) = 99.00  \\quad (\\text{Net Loss: } -1.00\\%)"}</Formula>
          <p>
            Because the 10% reduction applies to the higher base ($110), it subtracts $11.00, leaving you with $99.00 (a net loss of 1%). This asymmetry applies to investments, prices, and savings. For instance, after a 50% loss, you need a 100% gain just to get back to even.
          </p>

          <h2>Common Everyday Percentage Examples (Tips, Taxes, and Discounts)</h2>
          <p>
            Percentages appear constantly in everyday financial and shopping decisions:
          </p>
          <ol className="mb-6 list-decimal space-y-3 pl-6 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>Finding a Tip:</strong> To find a 20% tip on a $65 restaurant bill, multiply 65 by 0.20 to get $13.
            </li>
            <li>
              <strong>Finding a Discount:</strong> A $120 jacket with a 25% discount means you save $30 (120 x 0.25), so the final price is $90. You can also calculate sale prices with our <Link href="/calculators/finance/discount-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">discount calculator</Link>.
            </li>
            <li>
              <strong>Percentage Increase:</strong> If your rent goes from $1,200 to $1,320, the increase is $120. Divide 120 by 1,200 to get 0.10, which is a 10% increase.
            </li>
          </ol>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            For related calculations, explore our <Link href="/calculators/business/sales-tax-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">sales tax calculator</Link>, <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">fraction calculator</Link>, and <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">ratio calculator</Link>.
          </p>
        </>
      }
    >
      <PercentageCalculator />
    </CalcPage>
  );
}
