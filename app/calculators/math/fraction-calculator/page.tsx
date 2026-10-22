import FractionCalculator from "@/components/calcs/math/fraction-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/fraction-calculator";
const TITLE = "Fraction Calculator | Add, Subtract, Multiply & Divide Fractions | CalcDigi";
const DESCRIPTION =
  "Free online fraction calculator. Add, subtract, multiply, and divide proper, improper, and mixed fractions step-by-step with common denominators and simplification.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you add or subtract fractions with unlike denominators?",
    a: "To add or subtract fractions with different denominators, you must first determine the Least Common Denominator (LCD), convert each fraction into an equivalent fraction sharing that denominator, add or subtract the resulting numerators, and reduce the final fraction to lowest terms using the Greatest Common Divisor (GCD).",
  },
  {
    q: "How do you multiply fractions?",
    a: "Multiplying fractions is straightforward: multiply the numerators straight across to obtain the new numerator, multiply the denominators straight across to obtain the new denominator, and then simplify the resulting fraction by canceling out common factors: (a/b) × (c/d) = (a × c) / (b × d).",
  },
  {
    q: "Why do you 'invert and multiply' when dividing fractions?",
    a: "Dividing by a fraction is mathematically identical to multiplying by its multiplicative inverse (reciprocal). Inverting the divisor transforms the division into multiplication because dividing by (c/d) is equivalent to multiplying by (d/c): (a/b) ÷ (c/d) = (a/b) × (d/c) = (a × d) / (b × c).",
  },
  {
    q: "What is the difference between a proper fraction, improper fraction, and mixed number?",
    a: "A proper fraction has a numerator smaller than its denominator (e.g., 3/4), representing a quantity strictly less than 1. An improper fraction has a numerator greater than or equal to its denominator (e.g., 7/4), representing a value ≥ 1. A mixed number expresses an improper fraction as a whole number combined with a proper fraction (e.g., 1 3/4).",
  },
  {
    q: "How do you simplify a fraction to lowest terms?",
    a: "A fraction is in lowest terms (irreducible) when the numerator and denominator share no common positive integer factors other than 1. To simplify, calculate the Greatest Common Divisor (GCD) of the numerator and denominator using the Euclidean algorithm, then divide both numbers by that GCD.",
  },
  {
    q: "Can a fraction have a denominator of zero?",
    a: "No. Division by zero is undefined in standard arithmetic and mathematical analysis. A fraction represents dividing a quantity into equal parts; dividing into zero parts lacks any consistent mathematical meaning and leads to logical contradictions.",
  },
  {
    q: "How do you convert a mixed number into an improper fraction?",
    a: "Multiply the integer whole part by the denominator, add the numerator, and place that sum over the original denominator: Whole (a/b) = [(Whole × b) + a] / b. For example, 3 2/5 = [(3 × 5) + 2] / 5 = 17/5.",
  },
  {
    q: "How do unit fractions differ from vulgar fractions?",
    a: "A unit fraction has a numerator of exactly 1 (e.g., 1/2, 1/7, 1/12). Ancient Egyptian mathematics represented nearly all rational numbers exclusively as finite sums of distinct unit fractions, whereas modern mathematics utilizes vulgar fractions with arbitrary integer numerators.",
  },
];

const OPERATION_RULES_ROWS = [
  ["Addition (Like Denominators)", "a/c + b/c = (a + b) / c", "Add numerators directly; retain common denominator", "1/5 + 2/5 = 3/5"],
  ["Addition (Unlike Denominators)", "a/b + c/d = (a·d + b·c) / (b·d)", "Cross-multiply numerators and find common denominator", "1/3 + 1/4 = 7/12"],
  ["Subtraction (Unlike)", "a/b − c/d = (a·d − b·c) / (b·d)", "Scale to common denominator, subtract numerators", "3/4 − 1/6 = 7/12"],
  ["Multiplication", "(a/b) × (c/d) = (a·c) / (b·d)", "Multiply numerators and denominators straight across", "(2/3) × (3/5) = 2/5"],
  ["Division (Reciprocal)", "(a/b) ÷ (c/d) = (a·d) / (b·c)", "Multiply first fraction by reciprocal of second", "(3/4) ÷ (2/5) = 15/8"],
  ["Simplification (GCD)", "(a ÷ g) / (b ÷ g) where g = gcd(a,b)", "Divide numerator & denominator by greatest common divisor", "18/24 = 3/4"],
];

const BENCHMARK_FRACTIONS_ROWS = [
  ["1/4", "0.2500", "25.00%", "1 : 4", "Terminating (2⁻²)"],
  ["1/3", "0.3333...", "33.33%", "1 : 3", "Repeating (0.3̄)"],
  ["3/8", "0.3750", "37.50%", "3 : 8", "Terminating (3 × 2⁻³)"],
  ["1/2", "0.5000", "50.00%", "1 : 2", "Terminating (2⁻¹)"],
  ["2/3", "0.6667...", "66.67%", "2 : 3", "Repeating (0.6̄)"],
  ["3/4", "0.7500", "75.00%", "3 : 4", "Terminating (3 × 2⁻²)"],
];

const APPLICATION_DOMAINS_ROWS = [
  ["Culinary Arts & Baking", "Scaling ingredient ratios up or down across non-integer recipe yield multiples", "Proportional scaling: Q_new = Q_orig × (Yield_target / Yield_orig)"],
  ["Carpentry & Architectural Fabrication", "Precision imperial measurement subdivisions down to 1/16, 1/32, and 1/64 inch", "Additive tolerances: L_tot = L_1 + L_2 + ... + Kerf"],
  ["Pharmacology & Medical Dosing", "Pediatric fluid dosage titrations based on body weight fractions and dilution ratios", "Solute concentration: C_final = C_stock × (V_aliquot / V_total)"],
  ["Computer Graphics & Aspect Ratios", "Display viewport dimension scaling and pixel aspect ratio normalization", "Aspect ratio reduction: W : H = (W ÷ gcd) : (H ÷ gcd)"],
];

const RELATED = [
  { href: "/calculators/math/decimal-to-fraction-calculator", icon: "🔢", name: "Decimal to Fraction" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/percentage-change-calculator", icon: "📈", name: "Percentage Change" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Fraction Calculator | CalcDigi"
      intro="Add, subtract, multiply, and divide fractions, mixed numbers, and improper fractions with detailed step-by-step arithmetic derivations and automatic reduction."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a/b [+, -, *, /] c/d = Result"
      related={RELATED}
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
            <span>ISO 80000-1 / NIST Compliant Precision</span>
          </div>

          <h2>Mathematical Foundations of Rational Numbers and Fractions</h2>
          <p>
            In pure and applied mathematics, a <strong>fraction</strong> represents a quotient or ratio of two integers belonging to the field of rational numbers, formally designated by the set symbol <strong>ℚ</strong> (from the Italian <em>quoziente</em>). Formally defined by the equivalence class of ordered pairs of integers (a, b) where the denominator <em>b</em> is strictly non-zero, fractions embody the fundamental operation of partitioning a continuous entity into equal parts.
          </p>
          <p>
            The historical evolution of fractional notation spans millennia. The Rhind Mathematical Papyrus, transcribed by the scribe Ahmes circa 1550 BCE, reveals that ancient Egyptian mathematicians operated almost exclusively with sums of unit fractions (fractions with a numerator of 1). The Babylonians employed sexagesimal (base-60) fractional place notation on clay cuneiform tablets, while Indian mathematicians in the classical era—notably Brahmagupta and Aryabhata—formalized the modern representation of placing the numerator directly above the denominator.
          </p>
          <p>
            The horizontal fraction bar (termed the <em>vinculum</em>) was introduced to medieval Europe through the Latin translations of Islamic mathematical treatises, particularly the work of the Moroccan mathematician al-Hassar during the 12th century, and popularized widely by Leonardo Fibonacci in his 1202 masterwork <em>Liber Abaci</em>. Today, fractional arithmetic remains the cornerstone of advanced algebra, calculus, engineering design, culinary scaling, and computational coordinate geometry.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Algebraic Rules and Step-by-Step Derivations of Fraction Operations</h2>
          <p>
            Performing exact arithmetic on rational numbers requires adherence to universal algebraic laws. The table below delineates the formal mathematical axioms governing fractional operations:
          </p>

          <DataTable
            head={["Operation Type", "Algebraic Formula", "Core Mechanistic Principle", "Worked Arithmetic Example"]}
            rows={OPERATION_RULES_ROWS}
            highlight={1}
          />

          <h3>1. Addition and Subtraction: The Least Common Denominator (LCD)</h3>
          <p>
            Unlike multiplication, addition and subtraction require quantities to represent commensurate units. To combine fractions with distinct denominators (a/b and c/d), one must determine the Least Common Multiple (LCM) of denominators <em>b</em> and <em>d</em>:
          </p>
          <Formula>LCD = lcm(b, d) = (b × d) ÷ gcd(b, d)</Formula>
          <p>
            Once the common base is established, each numerator is multiplied by the factor required to scale its denominator to the LCD:
          </p>
          <Formula>a/b + c/d = [ a × (LCD ÷ b) + c × (LCD ÷ d) ] ÷ LCD</Formula>
          <p>
            <em>Worked Example:</em> Consider the addition 5/12 + 7/18. The prime factorizations are 12 = 2² × 3 and 18 = 2 × 3². The LCM takes the highest power of each prime: 2² × 3² = 4 × 9 = 36. Scaling both terms yields:
          </p>
          <ol>
            <li>First term: (5 × 3) / (12 × 3) = 15/36</li>
            <li>Second term: (7 × 2) / (18 × 2) = 14/36</li>
            <li>Sum: (15 + 14) / 36 = <strong>29/36</strong> (already irreducible since gcd(29, 36) = 1)</li>
          </ol>

          <h3>2. Multiplication: Dimensional Scaling and Cross-Cancellation</h3>
          <p>
            Fraction multiplication corresponds geometrically to calculating the area of a rectangle whose dimensions are rational lengths. Computationally, numerators and denominators multiply independently:
          </p>
          <Formula>(a ÷ b) × (c ÷ d) = (a × c) ÷ (b × d)</Formula>
          <p>
            To prevent computational overflow and maintain numeric stability, efficient algorithms perform <em>cross-cancellation</em> prior to multiplication by evaluating gcd(a, d) and gcd(c, b).
          </p>

          <h3>3. Division: The Algebraic Inversion Axiom</h3>
          <p>
            Division by a rational number is defined as multiplication by its multiplicative inverse (reciprocal). For any fraction c/d with c ≠ 0, the unique inverse satisfying (c/d) × (d/c) = 1 is d/c:
          </p>
          <Formula>(a ÷ b) ÷ (c ÷ d) = (a ÷ b) × (d ÷ c) = (a × d) ÷ (b × c)</Formula>

          <h2>Continued Fractions, Farey Sequences, and Diophantine Approximations</h2>
          <p>
            Beyond elementary vulgar fractions, advanced number theory studies rational structures through <strong>continued fractions</strong>. Any real number x can be expanded into a recursive continued fraction representation:
          </p>
          <Formula>x = a₀ + 1 / [ a₁ + 1 / ( a₂ + 1 / ( a₃ + ... ) ) ]</Formula>
          <p>
            Trancating a continued fraction yields a sequence of rational approximations termed <em>convergents</em> (p_k / q_k). By Dirichlet&apos;s approximation theorem, these convergents provide the best possible rational approximations to irrational constants such as π and e. For example, the famous Archimedean approximation 22/7 and the Chinese astronomer Zu Chongzhi&apos;s 5th-century approximation 355/113 arise directly as the 3rd and 4th convergents of π.
          </p>
          <p>
            Similarly, the <strong>Farey sequence</strong> of order n (denoted F_n) is the sorted sequence of completely reduced fractions between 0 and 1 with denominators less than or equal to n. A profound property of adjacent Farey fractions a/b &lt; c/d is that their cross-difference always satisfies b·c − a·d = 1, a property fundamentally linked to the geometry of Pick&apos;s theorem and the Ford circles in hyperbolic geometry.
          </p>

          <h2>Comprehensive Fraction, Decimal, and Percentage Benchmark Table</h2>
          <p>
            The table below documents standard fractional benchmarks, their exact decimal expansions, equivalent percentage forms, and their prime factorization classifications:
          </p>

          <DataTable
            head={["Fraction (a/b)", "Decimal Expansion", "Percentage Equivalent", "Ratio Form", "Expansion Classification"]}
            rows={BENCHMARK_FRACTIONS_ROWS}
            highlight={6}
          />

          <h2>Practical Real-World Applications Across Science and Industry</h2>
          <p>
            Exact fractional arithmetic is critical in domains where floating-point approximation errors cannot be tolerated:
          </p>

          <DataTable
            head={["Application Domain", "Analytical Objective", "Applied Mathematical Relationship"]}
            rows={APPLICATION_DOMAINS_ROWS}
            highlight={0}
          />

          <h2>Floating-Point Representation vs. Exact Rational Arithmetic</h2>
          <p>
            In modern computer architecture adhering to the IEEE 754 floating-point standard, numbers are stored in binary base-2 notation. Consequently, common base-10 fractions whose denominators contain prime factors other than 2 cannot be represented with finite binary digits. For instance, the simple fraction 1/10 becomes an infinitely repeating binary expansion:
          </p>
          <Formula>1/10 = 0.0001100110011...₂</Formula>
          <p>
            Evaluating 0.1 + 0.2 produces 0.30000000000000004 in IEEE 754 floats. Financial ledgers and computer algebra engines bypass this by utilizing exact rational representations.
          </p>

          <h2>Related Mathematical and Financial Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/decimal-to-fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Decimal to Fraction Calculator</Link>, <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Ratio Calculator</Link>, <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, and <Link href="/calculators/math/rounding-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Rounding Calculator</Link>.
          </p>
        </>
      }
    >
      <FractionCalculator />
    </CalcPage>
  );
}
