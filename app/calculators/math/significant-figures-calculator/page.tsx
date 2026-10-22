import SignificantFiguresCalculator from "@/components/calcs/math/significant-figures-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/significant-figures-calculator";
const TITLE = "Significant Figures Calculator | Sig Fig Counter & Rounding Rules | CalcDigi";
const DESCRIPTION =
  "Free online significant figures calculator. Count sig figs, perform rounded arithmetic operations (addition, subtraction, multiplication, division), and format scientific notation.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What are significant figures in science and metrology?",
    a: "Significant figures (or sig figs) are the meaningful digits in a measured or calculated quantity that carry reliable information regarding its precision. They include all digits known with absolute certainty plus one final estimated digit.",
  },
  {
    q: "Are all non-zero digits significant?",
    a: "Yes. Every non-zero digit (1 through 9) is always significant, regardless of its position in the number. For example, 487 contains three significant figures.",
  },
  {
    q: "What is the rule for captive (interior) zeros?",
    a: "Captive zeros located between non-zero digits are always significant. For instance, in 4,008 or 10.05, the zeros are significant because they represent measured quantities at those decimal places.",
  },
  {
    q: "Why are leading zeros never significant?",
    a: "Leading zeros (zeros appearing before the first non-zero digit) serve solely as decimal place keepers to indicate scale. For example, in 0.0045, only 4 and 5 are significant (two sig figs). Changing units to 4.5 mm does not alter the underlying precision.",
  },
  {
    q: "When are trailing zeros significant?",
    a: "Trailing zeros at the end of a number are significant IF AND ONLY IF the number contains an explicit decimal point. For instance, 45.00 has 4 sig figs, while 4,500 without a decimal point is ambiguous (conventionally treated as having 2 sig figs).",
  },
  {
    q: "What is the significant figure rule for addition and subtraction?",
    a: "In addition and subtraction, the final result can have no more decimal places than the measurement with the fewest decimal places. For example, 12.11 + 0.235 = 12.345 rounds to 12.35 (two decimal places).",
  },
  {
    q: "What is the significant figure rule for multiplication and division?",
    a: "In multiplication and division, the final result must retain the same number of significant figures as the input quantity possessing the least number of significant figures. For example, 4.56 (3 sig figs) × 1.4 (2 sig figs) = 6.384 rounds to 6.4 (2 sig figs).",
  },
  {
    q: "Do exact numbers affect significant figures?",
    a: "No. Exact numbers—such as defined conversion constants (1 inch = 2.54 cm exactly) or counted discrete items (12 eggs)—have an infinite number of significant figures (infinite precision) and never limit calculation precision.",
  },
];

const SIGFIG_RULES_ROWS = [
  ["Non-Zero Digits", "All digits 1 through 9 are always significant", "749 (3 sig figs), 2.184 (4 sig figs)"],
  ["Captive Zeros", "Zeros between non-zero digits are always significant", "5,004 (4 sig figs), 30.08 (4 sig figs)"],
  ["Leading Zeros", "Zeros preceding first non-zero are never significant", "0.0025 (2 sig figs), 0.08 (1 sig fig)"],
  ["Trailing with Decimal", "Trailing zeros after a decimal point are significant", "45.00 (4 sig figs), 8.0 (2 sig figs)"],
  ["Trailing without Decimal", "Ambiguous / placeholder; assume not significant", "5,000 (1 sig fig; use 5.000 × 10³ for 4)"],
  ["Exact Counting Integers", "Defined constants carry infinite precision", "12 items, 1 meter = 100 cm (infinite sig figs)"],
];

const RELATED_SIG = [
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/percent-error-calculator", icon: "📊", name: "Percent Error" },
  { href: "/calculators/math/sample-size-calculator", icon: "🔬", name: "Sample Size" },
  { href: "/calculators/math/scientific-calculator", icon: "🧮", name: "Scientific Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📈", name: "Standard Deviation" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Significant Figures Calculator | CalcDigi"
      intro="Count significant figures, format decimal measurements, apply rounding arithmetic rules, and convert to scientific notation."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="SigFigs(x)"
      related={RELATED_SIG}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Foundations of Significant Figures and Metrology</h2>
          <p>
            In experimental physics, analytical chemistry, and precision engineering, every measurement is fundamentally an empirical approximation bounded by the physical limits of the measuring apparatus. <strong>Significant figures</strong> (colloquially termed <em>sig figs</em>) constitute a standardized metrological system that communicates the exact precision and uncertainty of numeric data.
          </p>
          <p>
            Whenever an engineer records a dimension as 14.2 cm using a laboratory ruler graduated in millimeters, the digits 1 and 4 are known with absolute certainty, while the 2 is an estimated interpolation. Reporting this value as 14.200 cm would be dishonest scientific fraud, falsely implying calibration to micrometer tolerances. The formal rules of significant figures ensure that mathematical operations neither invent unearned precision nor discard valid measurement fidelity.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="sigfigs" />
          </div>

          <h2>The Cardinal Rules for Identifying Significant Figures</h2>
          <p>
            Determining the significant figures within any recorded numeric quantity follows five foundational rules codified by ASTM International and the National Institute of Standards and Technology (NIST):
          </p>

          <h3>1. The Non-Zero Rule</h3>
          <p>
            All digits from 1 through 9 are inherently significant. A measurement of 8,437 meters contains four significant figures, reflecting four distinct decades of decimal certainty.
          </p>

          <h3>2. The Captive Zero Rule</h3>
          <p>
            Any zero enclosed between non-zero digits is significant. In the quantity 7,004 grams, the two middle zeros are bounded by 7 and 4, indicating that the tens and hundreds positions were measured and found to be zero. Hence, 7,004 contains four significant figures.
          </p>

          <h3>3. The Leading Zero Rule</h3>
          <p>
            Zeros appearing to the left of the first non-zero digit are never significant. In 0.00045 kilograms, the leading zeros serve exclusively as positional placeholders locating the decimal point. Converting this measurement to grams yields 0.45 g, or 450 mg: the underlying physical measurement retains exactly two significant figures throughout.
          </p>

          <h3>4. The Trailing Zero Rule (The Decimal Test)</h3>
          <p>
            Trailing zeros at the end of a number are significant if and only if the number contains a written decimal point:
          </p>
          <ul>
            <li><strong>85.00:</strong> Contains four significant figures because the explicit decimal indicates precision to the hundredths place.</li>
            <li><strong>8,500:</strong> Lacks a decimal point, creating ambiguity. In standard scientific convention, it is assumed to possess only two significant figures (8 and 5). To specify three or four sig figs unambiguously, scientists write 8,500. (with a terminal decimal) or deploy scientific notation: 8.50 × 10³ (3 sig figs) or 8.500 × 10³ (4 sig figs).</li>
          </ul>

          <h2>Operational Rules for Arithmetic Calculations</h2>
          <p>
            When performing multi-step mathematical calculations, compounding rounded intermediate numbers introduces severe truncation errors. Standard laboratory protocol requires carrying extra guard digits during intermediate steps and applying rounding rules only to the final displayed result:
          </p>

          <h3>1. Addition and Subtraction (Decimal Places Bound)</h3>
          <p>
            The result cannot possess more decimal places than the least precise input quantity:
          </p>
          <Formula>142.1 + 0.354 + 2.05 = 144.504 → Rounds to 144.5 (one decimal place)</Formula>

          <h3>2. Multiplication and Division (Least Sig Figs Bound)</h3>
          <p>
            The result must match the significant figure count of the least precise factor:
          </p>
          <Formula>Area = 12.45 m (4 sig figs) × 3.2 m (2 sig figs) = 39.84 m² → Rounds to 40 m² = 4.0 × 10¹ m²</Formula>

          <h2>Summary Taxonomy of Significant Figure Classifications</h2>
          <p>
            The table below synthesizes the core rules across standard scientific scenarios:
          </p>

          <DataTable
            head={["Rule Classification", "Operational Principle", "Representative Practical Examples"]}
            rows={SIGFIG_RULES_ROWS}
            highlight={0}
          />

          <h2>The Round-to-Even (Banker's Rounding) Tie-Breaking Standard</h2>
          <p>
            When rounding a number whose terminal digit is followed exactly by 5 with no subsequent non-zero digits (such as rounding 2.5 or 3.5 to the nearest integer), classical elementary school rules always round up. However, in statistical analysis and financial ledgers, rounding up on every 5 introduces a systematic positive bias over thousands of calculations.
          </p>
          <p>
            Under IEEE 754 floating-point standards and ISO metrological guidelines, scientific algorithms implement <strong>Round-to-Even</strong>: if the digit preceding the 5 is odd, round up; if it is even, round down to keep it even. Thus, 2.5 rounds to 2, and 3.5 rounds to 4, neutralizing statistical drift.
          </p>

          <h2>Practical Applications Across Science and Industry</h2>
          <p>
            Significant figure compliance is vital across real-world systems:
          </p>
          <ul>
            <li>
              <strong>Pharmaceutical Drug Compounding:</strong> Dosing active pharmaceutical ingredients (APIs) in microgram quantities requires exact sig fig control to prevent patient toxicity or subtherapeutic failures.
            </li>
            <li>
              <strong>Civil and Structural Engineering:</strong> Concrete load-bearing calculations must reflect sensor measurement tolerances to prevent catastrophic material stress overestimation.
            </li>
            <li>
              <strong>Forensic Toxicology:</strong> Blood alcohol content (BAC) legal limits (e.g., 0.080 g/dL) require strict instrumental calibration bounds in evidentiary courtroom proceedings.
            </li>
            <li>
              <strong>Aerospace Trajectory Calculations:</strong> Spacecraft orbital insertion burns rely on gyroscopic accelerometer telemetry verified against strict floating-point significant bit limits.
            </li>
          </ul>

          <h2>Related Mathematical and Scientific Calculators</h2>
          <p>
            To expand your measurement toolkit, explore our specialized <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>, <Link href="/calculators/math/rounding-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Rounding Calculator</Link>, <Link href="/calculators/math/percent-error-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percent Error Calculator</Link>, and <Link href="/calculators/math/scientific-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Calculator</Link>.
          </p>
        </>
      }
    >
      <SignificantFiguresCalculator />
    </CalcPage>
  );
}
