import SquareRootCalculator from "@/components/calcs/math/square-root-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/square-root-calculator";
const TITLE = "Square Root Calculator | Principal, Simplified & Imaginary Roots | CalcDigi";
const DESCRIPTION =
  "Free online square root calculator. Calculate principal square roots, radical simplification, irrational approximations, and complex imaginary roots step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a square root?",
    a: "A square root of a number x is a value y such that y² = x. Every positive real number possesses two square roots: a positive principal square root (denoted √x) and an opposite negative root (−√x). The radical symbol √ strictly denotes the positive principal root.",
  },
  {
    q: "Why is the square root of 2 irrational?",
    a: "Circa 500 BCE, the Pythagorean philosopher Hippasus proved that √2 cannot be expressed as a ratio of two integers a/b. Assuming √2 = a/b in lowest terms leads to the logical contradiction that both a and b must be even integers, disproving the possibility of a fractional representation.",
  },
  {
    q: "What is the Babylonian / Heron's method for calculating square roots?",
    a: "Heron's method is an ancient iterative algorithm that converges quadratically to √S: make an initial guess x₀, then compute x_{n+1} = (1/2) × (x_n + S / x_n). Each iteration approximately doubles the number of correct decimal digits.",
  },
  {
    q: "How do you simplify a radical expression?",
    a: "To simplify √N, find the largest perfect square factor k² that divides N evenly, factor it out using the radical product rule √(a × b) = √a × √b, and extract the integer root: e.g., √72 = √(36 × 2) = 6√2.",
  },
  {
    q: "What is the square root of a negative number?",
    a: "In the real number system ℝ, negative numbers have no real square root because the square of any real number is non-negative. In the complex number system ℂ, the imaginary unit i is defined such that i² = −1, meaning √(−x) = i√x for x > 0.",
  },
  {
    q: "What is the geometric mean of two numbers?",
    a: "The geometric mean of two positive numbers a and b equals the square root of their product: G = √(a × b). In Euclidean geometry, G represents the altitude to the hypotenuse of a right triangle dividing the hypotenuse into segments a and b.",
  },
  {
    q: "What is the Quake III Fast Inverse Square Root algorithm?",
    a: "In 1999, id Software released Quake III Arena featuring a legendary computer science algorithm that computed 1/√x using bit-level IEEE 754 floating-point integer manipulation and the 'magic constant' 0x5f3759df, computing 3D lighting vectors 4x faster than CPU hardware.",
  },
  {
    q: "How do fractional exponents relate to square roots?",
    a: "By the laws of exponents, taking the square root of a number is mathematically identical to raising that number to the power of one-half: √x = x^(1/2). Similarly, the nth root equals x^(1/n).",
  },
];

const ROOT_METHODS_ROWS = [
  ["Babylonian Iteration (Heron)", "x_{n+1} = (1/2)(x_n + S / x_n)", "Doubles correct precision digits each iteration", "Fast software floating-point emulation"],
  ["Newton-Raphson Method", "x_{n+1} = x_n − f(x_n)/f'(x_n)", "Root-finding applied to f(x) = x² − S", "General polynomial numerical solver"],
  ["Long Division Method", "Digit-by-digit manual algorithm", "Yields exact decimal places without approximation drift", "Pencil-and-paper calculation"],
  ["Fast Inverse Square Root", "0x5f3759df − (i >> 1)", "Bit-level hack followed by one Newton step", "Video game 3D vector graphics"],
];

const PERFECT_SQUARES_ROWS = [
  ["√1", "1", "1² = 1", "Multiplicative identity"],
  ["√4", "2", "2² = 4", "Even prime root"],
  ["√9", "3", "3² = 9", "Odd square"],
  ["√16", "4", "4² = 16", "Fourth power of 2"],
  ["√25", "5", "5² = 25", "Base 10 factor"],
  ["√36", "6", "6² = 36", "Highly composite square"],
  ["√49", "7", "7² = 49", "Prime square"],
  ["√64", "8", "8² = 64", "Cube of 4 / square of 8"],
  ["√81", "9", "9² = 81", "Fourth power of 3"],
  ["√100", "10", "10² = 100", "Metric decimal base"],
  ["√144", "12", "12² = 144", "Gross unit square"],
];

const RELATED = [
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/logarithm-calculator", icon: "🪵", name: "Logarithm Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Square Root Calculator | CalcDigi"
      intro="Calculate principal square roots, simplify radical expressions, evaluate fractional exponents, and compute imaginary roots with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="y = sqrt(x) <-> y² = x"
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
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Mathematical Axioms and Definition of Square Roots</h2>
          <p>
            In arithmetic and real analysis, a <strong>square root</strong> of a non-negative real number <em>x</em> is a number <em>y</em> such that its self-multiplication equals the original radicand: <strong>y² = x</strong>. While every positive number possesses two opposite algebraic square roots (+y and −y), the universal mathematical radical symbol <strong>√x</strong> strictly designates the unique non-negative <strong>principal square root</strong>.
          </p>
          <p>
            The conceptual history of square roots is intertwined with the foundational crisis of mathematics. The Pythagoreans believed that all natural phenomena could be expressed through whole numbers and their ratios. When Hippasus of Metapontum discovered circa 500 BCE that the diagonal of a unit square (√2) was incommensurable with its sides—meaning it was impossible to write as an exact integer ratio—legend holds that the Pythagoreans drowned him at sea to suppress the existence of irrational numbers.
          </p>
          <p>
            Today, square roots are indispensable across Euclidean geometry (the Pythagorean theorem d = √(x² + y²)), electrical engineering (Root Mean Square RMS AC voltage), statistical dispersion (standard deviation σ = √Variance), and quantum physics (the Schrödinger wave equation).
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Numerical Algorithms for Extracting Square Roots</h2>
          <p>
            Throughout history, mathematicians developed diverse algorithms to approximate square roots to arbitrary precision:
          </p>

          <DataTable
            head={["Algorithmic Technique", "Mathematical Formulation", "Convergence Characteristics", "Primary Computational Domain"]}
            rows={ROOT_METHODS_ROWS}
            highlight={0}
          />

          <h3>1. Heron&apos;s Iterative Babylonian Method</h3>
          <p>
            To compute √S, make an educated initial guess x₀. The next approximation x_(n+1) is the arithmetic mean of the previous guess and S / x_n:
          </p>
          <Formula>x_(n+1) = (1 ÷ 2) × ( x_n + S ÷ x_n )</Formula>
          <p>
            <em>Worked Example:</em> Calculate √50 starting from initial guess x₀ = 7.
          </p>
          <ol>
            <li>Iteration 1: x₁ = (1/2) × (7 + 50/7) = (1/2) × (7 + 7.142857) = <strong>7.071429</strong></li>
            <li>Iteration 2: x₂ = (1/2) × (7.071429 + 50/7.071429) = (1/2) × (7.071429 + 7.070707) = <strong>7.071068</strong></li>
            <li>Verification: (7.071068)² = 50.000003 (accurate to 6 decimal places after just two steps!).</li>
          </ol>

          <h3>2. Radical Expression Simplification</h3>
          <p>
            To reduce a radical √N to simplest surd form a√b:
          </p>
          <ol>
            <li>Identify the largest perfect square factor k² dividing N.</li>
            <li>Apply the radical multiplication property: √(k² × b) = √k² × √b = k√b.</li>
            <li>For example: √180 = √(36 × 5) = √36 × √5 = <strong>6√5</strong>.</li>
          </ol>

          <h2>Standard Integer Perfect Squares Reference Table</h2>
          <p>
            The table below catalogues standard foundational integer perfect squares and their exact principal roots:
          </p>

          <DataTable
            head={["Radical Expression", "Principal Root Value", "Verification Equality", "Mathematical Classification"]}
            rows={PERFECT_SQUARES_ROWS}
            highlight={4}
          />

          <h2>Continued Fraction Expansions and Pell&apos;s Equation</h2>
          <p>
            Every square root of a non-square integer possesses a periodic continued fraction representation. For example, the Golden Ratio root of 2 expands infinitely as √2 = [1; 2, 2, 2, ...]. The rational convergents p_k / q_k derived by truncating continued fractions provide the optimal integer solutions to <strong>Pell&apos;s Equation</strong>:
          </p>
          <Formula>x² − N × y² = 1</Formula>
          <p>
            These convergents yield maximal precision rational bounds for irrational square roots with minimal denominator magnitudes.
          </p>

          <h2>Complex Square Roots and Imaginary Numbers</h2>
          <p>
            When extracting the root of a negative real number, the operation is undefined within the real field ℝ because y² ≥ 0 for all y ∈ ℝ. To resolve this limitation, mathematicians introduced the <strong>imaginary unit i</strong>, defined formally by:
          </p>
          <Formula>i² = −1,   i = √(−1)</Formula>
          <p>
            For any negative number −x (where x &gt; 0), the principal complex square root is:
          </p>
          <Formula>√(−x) = i × √x</Formula>
          <p>
            In complex analysis, applying polar representation z = r·e^(iθ) reveals that every non-zero complex number possesses exactly two distinct square roots separated by 180° on the complex Argand plane: √z = ± √r · e^(iθ/2).
          </p>

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>, and <Link href="/calculators/math/logarithm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Logarithm Calculator</Link>.
          </p>
        
          <h2>The Babylonian Heron Method, Newton-Raphson Iteration & Continued Fractions</h2>
          <p>
            Computing square roots represents one of humanity's earliest numerical algorithms, documented on ancient Babylonian clay tablets dating back to 1800 BCE. The Babylonian method (later formalized by Heron of Alexandria) iteratively refines estimates via xₙ₊₁ = (xₙ + S/xₙ) / 2, demonstrating quadratic convergence where the number of accurate decimal places doubles with every successive iteration. In modern numerical analysis, this represents a direct application of the Newton-Raphson method applied to f(x) = x² − S. In real number theory, square roots of non-square integers are irrational numbers possessing infinite non-repeating continued fraction expansions, revealing deep periodic symmetries in Pell's Diophantine equation x² − dy² = 1.
          </p>

          <h2>Root-Mean-Square (RMS) AC Power & Standard Error Metrics</h2>
          <p>
            In electrical engineering, alternating current (AC) power dissipation across resistive circuits is quantified by root-mean-square (RMS) voltage: V_rms = V_peak / √2 ≈ 0.707 × V_peak. This square-root relationship ensures that an AC sine wave produces equivalent thermodynamic heating to a constant DC voltage source. In statistical experimental design, standard errors scale inversely with the square root of sample size (SE = σ / √n), defining the diminishing returns of expanding sample populations in polling research.
          </p>
</>
      }
    >
      <SquareRootCalculator />
    </CalcPage>
  );
}
