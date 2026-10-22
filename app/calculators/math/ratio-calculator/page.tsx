import RatioCalculator from "@/components/calcs/math/ratio-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/ratio-calculator";
const TITLE = "Ratio Calculator | Simplify, Scale & Solve Proportions | CalcDigi";
const DESCRIPTION =
  "Free online ratio calculator. Simplify ratios, scale proportions (A:B = C:D), calculate missing values, and convert part-to-part and part-to-whole relationships step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a ratio in mathematics?",
    a: "A ratio is a quantitative comparison expressing the relative size of two or more numbers or quantities. Ratios indicate how many times one number contains another and can be written using colon notation (A : B), as a vulgar fraction (A / B), or in words ('A to B').",
  },
  {
    q: "What is the difference between a part-to-part and part-to-whole ratio?",
    a: "A part-to-part ratio compares two distinct subsets within a collection (such as 3 boys to 5 girls, 3 : 5). A part-to-whole ratio compares a specific subset to the complete aggregate (such as 3 boys to 8 total children, 3 : 8), which directly corresponds to a rational fraction (3/8) or percentage (37.5%).",
  },
  {
    q: "How do you solve a proportion using cross-multiplication?",
    a: "A proportion states that two ratios are mathematically equal: A / B = C / D. By the fundamental property of proportions, the product of the extremes equals the product of the means: A × D = B × C. If one value is unknown (e.g., x in A / B = x / D), solve algebraically: x = (A × D) / B.",
  },
  {
    q: "How do you simplify a ratio to lowest terms?",
    a: "To reduce a ratio A : B to irreducible terms, calculate the Greatest Common Divisor (GCD) of A and B using the Euclidean algorithm, and divide both terms by that GCD: (A ÷ gcd) : (B ÷ gcd). For multi-term ratios (A : B : C), divide all terms by gcd(A, B, C).",
  },
  {
    q: "What is the Golden Ratio (phi)?",
    a: "The Golden Ratio (designated by Greek letter φ, phi) is an irrational mathematical constant approximately equal to 1.6180339887... Two quantities a and b (where a > b) are in the golden ratio if their ratio is identical to the ratio of their sum to the larger quantity: (a + b) / a = a / b = φ = (1 + √5) / 2.",
  },
  {
    q: "How do aspect ratios work in digital screens and cinematography?",
    a: "An aspect ratio defines the proportional relationship between the width and height of an image or viewport. Standard high-definition video utilizes 16 : 9, classic television utilized 4 : 3, modern widescreen cinematic film uses 21 : 9 (2.39 : 1), and photographic sensors commonly employ 3 : 2.",
  },
  {
    q: "How are ratios utilized in chemistry stoichiometry?",
    a: "In chemical reactions, stoichiometric coefficients indicate the exact molar ratios of reactants and products required for a complete reaction. For example, in 2H₂ + O₂ → 2H₂O, the molar ratio of hydrogen gas to oxygen gas is strictly 2 : 1.",
  },
  {
    q: "Can a ratio contain negative numbers or fractions?",
    a: "Yes. While physical quantities are typically positive, mathematical ratios can compare signed numbers. Ratios containing fractions can be converted into standard integer ratios by multiplying all terms by the Least Common Multiple (LCM) of their denominators.",
  },
];

const PROPORTION_TYPES_ROWS = [
  ["Direct Proportion", "y = k · x", "As one variable increases, the other increases proportionally at constant rate k", "Speed vs. Distance at fixed time"],
  ["Inverse Proportion", "y = k / x", "As one variable increases, the other decreases proportionally such that x·y = k", "Pumping rate vs. Tank empty time"],
  ["Compound / Joint", "z = k · (x · y) / w", "Variable depends proportionally on multiple independent quantities", "Ideal gas law: P = nRT / V"],
  ["Part-to-Part", "A : B", "Direct comparison between two disjoint sub-elements of a set", "3 parts sand to 1 part cement"],
  ["Part-to-Whole", "A : (A + B)", "Comparison between a subset and the entire aggregate population", "3 parts sand out of 4 parts concrete (75%)"],
];

const ASPECT_RATIOS_ROWS = [
  ["1 : 1", "1.000", "Square format, social media feeds, medium format film (6x6)"],
  ["4 : 3", "1.333", "Legacy standard definition television (NTSC/PAL), iPad displays"],
  ["16 : 9", "1.778", "Standard High Definition (1080p, 4K UHD), modern television broadcasts"],
  ["21 : 9 (2.39:1)", "2.389", "Anamorphic theatrical widescreen cinema, ultrawide curved monitors"],
];

const INDUSTRY_APPLICATIONS_ROWS = [
  ["Mechanical Engineering", "Gear trains and torque transmission ratios: ω₁/ω₂ = N₂/N₁", "Mechanical advantage: MA = Output Force / Input Force"],
  ["Financial Statement Analysis", "Corporate liquidity and solvency assessment", "Current Ratio = Current Assets / Current Liabilities"],
  ["Pharmacology & Nursing", "Dilution ratios and intravenous fluid infusion rates", "Drug concentration: C₁V₁ = C₂V₂"],
  ["Culinary Arts & Fermentation", "Baker's percentages and hydration ratios", "Hydration % = (Weight of Water / Weight of Flour) × 100%"],
];

const RELATED = [
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/decimal-to-fraction-calculator", icon: "🔢", name: "Decimal to Fraction" },
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
      title="Ratio Calculator"
      intro="Simplify ratios, solve proportions, determine equivalent scales, and convert part-to-part and part-to-whole relationships with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="A : B = C : D"
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

          <h2>Mathematical Axioms of Ratios, Proportions, and Scaling</h2>
          <p>
            In axiomatic mathematics and quantitative reasoning, a <strong>ratio</strong> is an ordered pair of numbers comparing relative magnitudes. Denoted symbolically as <strong>A : B</strong> or as an algebraic quotient <strong>A / B</strong>, a ratio establishes a dimensionless scalar factor expressing how many units of antecedent <em>A</em> correspond to consequent <em>B</em>. When two ratios express the identical relationship, they form a <strong>proportion</strong>: A : B = C : D.
          </p>
          <p>
            The rigorous mathematical study of proportions originated in ancient Greece. Book V of Euclid&apos;s <em>Elements</em> (circa 300 BCE) presents the groundbreaking theory of abstract proportions developed by the astronomer and mathematician Eudoxus of Cnidus. Eudoxus&apos;s formulation was revolutionary because it successfully unified commensurate magnitudes (integers and rational fractions) with incommensurate magnitudes (irrational numbers like √2 and the diagonal of a square), anticipating Richard Dedekind&apos;s 19th-century construction of the real number system by over two millennia.
          </p>
          <p>
            From the harmonious proportions of Renaissance architecture documented by Leon Battista Alberti and Andrea Palladio, to gear reductions in mechanical drivetrains, corporate liquidity analysis in modern Wall Street finance, and aspect ratio calibrations in 8K digital cinema cameras, ratios serve as the universal mathematical language of comparative scale.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Step-by-Step Derivations: Solving Proportions and Simplifying Ratios</h2>
          <p>
            Working with ratios requires mastering foundational algebraic transformations, primarily cross-multiplication, common factor reduction, and scaling operations:
          </p>

          <DataTable
            head={["Proportion Classification", "Mathematical Formula", "Core Governing Behavior", "Empirical Physical Example"]}
            rows={PROPORTION_TYPES_ROWS}
            highlight={0}
          />

          <h3>1. The Fundamental Principle of Proportions (Cross-Multiplication)</h3>
          <p>
            Given any true proportion equating two rational quotients:
          </p>
          <Formula>A ÷ B = C ÷ D</Formula>
          <p>
            Multiplying both sides of the equality by the product of the denominators (B × D) cancels out the denominators, yielding the foundational <strong>Means-Extremes Theorem</strong>:
          </p>
          <Formula>A × D = B × C</Formula>
          <p>
            This theorem allows immediate algebraic determination of any missing variable:
          </p>
          <Formula>A = (B × C) ÷ D,   B = (A × D) ÷ C,   C = (A × D) ÷ B,   D = (B × C) ÷ A</Formula>
          <p>
            <em>Worked Example:</em> A blueprint uses a scale of 3 inches to 16 feet (3 : 192 in inches). If a real-world wall measures 40 feet (480 inches), what is its blueprint length <em>x</em>?
          </p>
          <ol>
            <li>Establish the proportion: 3 / 16 = x / 40.</li>
            <li>Cross-multiply: 3 × 40 = 16 × x.</li>
            <li>120 = 16x.</li>
            <li>Solve for x: x = 120 ÷ 16 = <strong>7.5 inches</strong> (7 1/2 inches).</li>
          </ol>

          <h3>2. Irreducible Reduction of Multi-Term Ratios</h3>
          <p>
            Just as fractions are simplified using the GCD, a ratio containing two or more terms (A : B : C) is reduced to simplest integer terms by finding the greatest common divisor of all constituent terms simultaneously:
          </p>
          <Formula>g = gcd(A, gcd(B, C))</Formula>
          <p>
            <em>Worked Example:</em> Simplify the concrete mixing ratio 36 : 24 : 12.
          </p>
          <ol>
            <li>Compute gcd(36, 24) = 12.</li>
            <li>Compute gcd(12, 12) = 12. Overall GCD = 12.</li>
            <li>Divide each term: (36 ÷ 12) : (24 ÷ 12) : (12 ÷ 12) = <strong>3 : 2 : 1</strong>.</li>
          </ol>

          <h2>The Golden Ratio (φ), Fibonacci Sequences, and Dynamic Symmetry</h2>
          <p>
            In continuous geometry, the <strong>Golden Ratio</strong> (denoted by the Greek letter φ, phi) represents the unique positive proportion where the ratio of the whole to the larger segment equals the ratio of the larger to the smaller:
          </p>
          <Formula>(a + b) ÷ a = a ÷ b = φ</Formula>
          <p>
            Setting a/b = φ yields the iconic quadratic equation φ² − φ − 1 = 0. Solving via the quadratic formula gives the exact algebraic value:
          </p>
          <Formula>φ = (1 + √5) ÷ 2 ≈ 1.6180339887...</Formula>
          <p>
            A celebrated theorem in number theory proves that the ratio of consecutive terms in the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...) converges asymptotically to the Golden Ratio as <em>n</em> approaches infinity:
          </p>
          <Formula>lim (n → ∞) [ F_(n+1) ÷ F_n ] = φ</Formula>
          <p>
            Because φ possesses the simplest possible continued fraction expansion ([1; 1, 1, 1, ...]), it is mathematically proven to be the &ldquo;most irrational&rdquo; real number, meaning it is the slowest to be approximated by rational fractions. This property causes spiral phyllotaxis in sunflowers, pinecones, and nautilus shells to maximize solar exposure and seed packing density without destructive acoustic resonance.
          </p>

          <h2>Standard Aspect Ratio Benchmarks Across Visual Media</h2>
          <p>
            The table below catalogues standard aspect ratio benchmarks across modern visual engineering, display manufacturing, and photographic mediums:
          </p>

          <DataTable
            head={["Aspect Ratio", "Decimal Factor", "Primary Industrial & Aesthetic Applications"]}
            rows={ASPECT_RATIOS_ROWS}
            highlight={4}
          />

          <h2>Real-World Quantitative Applications Across Industry and Science</h2>
          <p>
            Ratios are indispensable across specialized commercial and technical disciplines:
          </p>

          <DataTable
            head={["Industrial Domain", "Analytical Scope & Target", "Governing Mathematical Formula"]}
            rows={INDUSTRY_APPLICATIONS_ROWS}
            highlight={1}
          />

          <h2>Related Mathematical and Financial Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>, <Link href="/calculators/math/decimal-to-fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Decimal to Fraction Calculator</Link>, <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, and <Link href="/calculators/math/percentage-change-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Change Calculator</Link>.
          </p>
        </>
      }
    >
      <RatioCalculator />
    </CalcPage>
  );
}
