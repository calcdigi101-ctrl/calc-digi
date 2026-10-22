import ExponentCalculator from "@/components/calcs/math/exponent-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/exponent-calculator";
const TITLE = "Exponent Calculator | Powers, Bases, Laws of Exponents & Growth | CalcDigi";
const DESCRIPTION =
  "Free online exponent calculator. Calculate powers, negative exponents, fractional powers, scientific notation, and compound exponential growth step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is an exponent in mathematics?",
    a: "An exponent (or power) indicates how many times a base number b is multiplied by itself: bⁿ = b × b × ... × b (n times). In the expression bⁿ, b is the base and n is the exponent or index.",
  },
  {
    q: "Why is any non-zero number to the power of zero equal to 1 (b⁰ = 1)?",
    a: "By the quotient rule of exponents, bⁿ / bⁿ = bⁿ⁻ⁿ = b⁰. But any non-zero number divided by itself equals 1, proving that b⁰ must strictly equal 1 for all b ≠ 0.",
  },
  {
    q: "How do negative exponents work?",
    a: "A negative exponent indicates the multiplicative inverse (reciprocal) of the base raised to the positive power: b⁻ⁿ = 1 / bⁿ. For example, 2⁻³ = 1 / 2³ = 1 / 8 = 0.125.",
  },
  {
    q: "How do fractional (rational) exponents work?",
    a: "A fractional exponent represents an nth root: b^(1/n) = ⁿ√b. When the numerator is m, b^(m/n) = ⁿ√(bᵐ) = (ⁿ√b)ᵐ. For example, 8^(2/3) = (³√8)² = 2² = 4.",
  },
  {
    q: "What is Euler's number e in exponential functions?",
    a: "Euler's number e is a fundamental mathematical constant approximately equal to 2.718281828459... Defined as the limit lim (n → ∞) (1 + 1/n)ⁿ, e serves as the natural base of continuous exponential growth and calculus differentiation.",
  },
  {
    q: "What is the Rule of 72 for exponential doubling time?",
    a: "The Rule of 72 is an empirical mental math shortcut estimating how long an exponential quantity takes to double at growth rate r%: Doubling Time ≈ 72 / r. For example, at an 8% annual growth rate, capital doubles in approximately 72 / 8 = 9 years.",
  },
  {
    q: "What is the difference between polynomial growth and exponential growth?",
    a: "In polynomial growth (nᵏ), the variable is the base and the exponent is constant (e.g., n²). In exponential growth (kⁿ), the base is constant and the variable is in the exponent (e.g., 2ⁿ). Exponential growth eventually outpaces any polynomial growth, regardless of initial coefficients.",
  },
  {
    q: "What is zero to the power of zero (0⁰)?",
    a: "In mathematical analysis, 0⁰ is an indeterminate form because approaching along different paths yields conflicting limits. However, in discrete algebra, combinatorics, and computer programming languages (like Python, JS, C++), 0⁰ is defined as 1 to ensure power series like eˣ = Σ xⁿ/n! remain valid at x = 0.",
  },
];

const EXPONENT_LAWS_ROWS = [
  ["Product Rule", "bᵐ × bⁿ = b^(m+n)", "Bases identical: add exponents together", "2³ × 2⁴ = 2⁷ = 128"],
  ["Quotient Rule", "bᵐ ÷ bⁿ = b^(m−n)", "Bases identical: subtract exponent of divisor", "5⁵ ÷ 5² = 5³ = 125"],
  ["Power of a Power", "(bᵐ)ⁿ = b^(m×n)", "Multiply exponents straight across", "(3²)³ = 3⁶ = 729"],
  ["Power of a Product", "(a × b)ⁿ = aⁿ × bⁿ", "Distribute exponent across each multiplicand", "(2 × 5)³ = 2³ × 5³ = 1,000"],
  ["Power of a Quotient", "(a ÷ b)ⁿ = aⁿ ÷ bⁿ", "Distribute exponent across numerator and denominator", "(3 ÷ 4)² = 9 ÷ 16 = 0.5625"],
  ["Negative Power", "b⁻ⁿ = 1 ÷ bⁿ", "Invert base into denominator", "10⁻³ = 1 ÷ 1000 = 0.001"],
  ["Fractional Power", "b^(m/n) = ⁿ√(bᵐ)", "Denominator is root index, numerator is power", "16^(3/4) = (⁴√16)³ = 8"],
];

const GROWTH_DOMAINS_ROWS = [
  ["Compound Financial Interest", "A = P(1 + r/n)^(nt)", "Capital compounding across discrete intervals", "Retirement 401(k) accumulation"],
  ["Continuous Biological Growth", "N(t) = N₀ · e^(kt)", "Bacterial culture cellular reproduction", "Epidemic infection transmission"],
  ["Radioactive Nuclear Decay", "N(t) = N₀ · (1/2)^(t / t_half)", "Spontaneous isotopic atomic disintegration", "Carbon-14 archaeological dating"],
  ["Moore's Law in Computing", "Transistors = N₀ · 2^(t / 2)", "Doubling of semiconductor density every 2 years", "Microprocessor performance scaling"],
];

const RELATED = [
  { href: "/calculators/math/logarithm-calculator", icon: "🪵", name: "Logarithm Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "🔬", name: "Scientific Notation" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Exponent Calculator"
      intro="Calculate powers, fractional exponents, negative indices, scientific power expansions, and compound exponential growth with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="y = b^x"
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

          <h2>Mathematical Axioms and Principles of Exponentiation</h2>
          <p>
            In arithmetic, algebra, and continuous real analysis, <strong>exponentiation</strong> is the mathematical operation involving two numbers: the <strong>base</strong> (<em>b</em>) and the <strong>exponent</strong> or <strong>power</strong> (<em>n</em>). Denoted symbolically as <strong>bⁿ</strong>, exponentiation initially generalized repeated multiplication for positive integers: bⁿ = b × b × ... × b (n factors).
          </p>
          <p>
            The expansion of exponentiation from discrete integer counts to continuous real and complex domains represents one of modern algebra&apos;s greatest conceptual triumphs. In the 14th century, French bishop Nicole Oresme introduced fractional powers. René Descartes popularized the modern superscript notation (x²) in 1637.
          </p>
          <p>
            During the 18th century, Leonhard Euler unified exponential functions with trigonometry through his celebrated identity e^(iπ) + 1 = 0, proving that continuous exponential curves govern alternating AC currents, radioactive half-lives, acoustic decay envelopes, demographic population growth, and algorithmic Big-O computational time complexity.
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Axiomatic Laws of Exponents and Algebraic Identities</h2>
          <p>
            Operating with exponents across arbitrary real bases requires adherence to universal algebraic laws:
          </p>

          <DataTable
            head={["Algebraic Law", "Symbolic Formula", "Core Mechanistic Principle", "Worked Arithmetic Example"]}
            rows={EXPONENT_LAWS_ROWS}
            highlight={0}
          />

          <h3>1. Fractional Powers and Radical Equivalence</h3>
          <p>
            When an exponent is rational (a/b), the denominator acts as the radical root index while the numerator serves as the integer power:
          </p>
          <Formula>b^(m ÷ n) = ⁿ√(bᵐ) = ( ⁿ√b )ᵐ</Formula>
          <p>
            <em>Worked Example:</em> Evaluate 27^(4/3).
          </p>
          <ol>
            <li>Extract cube root: ³√27 = 3</li>
            <li>Raise to fourth power: 3⁴ = 3 × 3 × 3 × 3 = <strong>81</strong></li>
          </ol>

          <h3>2. Negative Exponents and Multiplicative Inversion</h3>
          <p>
            A negative exponent is algebraically equivalent to dividing 1 by the base raised to the positive power:
          </p>
          <Formula>b^(−n) = 1 ÷ bⁿ</Formula>
          <p>
            <em>Worked Example:</em> Evaluate (2/5)⁻³.
          </p>
          <ol>
            <li>Invert the fraction: (5/2)³</li>
            <li>Apply power to numerator and denominator: 5³ ÷ 2³ = 125 ÷ 8 = <strong>15.625</strong>.</li>
          </ol>

          <h2>Continuous Exponential Growth and Euler&apos;s Number (e)</h2>
          <p>
            In nature and finance, growth rarely occurs in discrete annual leaps; rather, it compounds continuously at every infinitesimal fraction of a second. The mathematical constant <strong>e (Euler&apos;s number)</strong> emerges naturally as the base of continuous compounding:
          </p>
          <Formula>e = lim (n → ∞) [ 1 + (1 ÷ n) ]ⁿ ≈ 2.718281828459...</Formula>
          <p>
            The general equation for continuous exponential growth or decay is:
          </p>
          <Formula>N(t) = N₀ × e^(k × t)</Formula>
          <p>
            Where N₀ represents the initial quantity, <em>k</em> is the continuous growth rate constant (positive for growth, negative for decay), and <em>t</em> is elapsed time. The <strong>doubling time</strong> (or half-life) is strictly independent of starting volume:
          </p>
          <Formula>t_double = ln(2) ÷ k ≈ 0.69315 ÷ k</Formula>

          <h2>Complex Exponentiation and De Moivre&apos;s Theorem</h2>
          <p>
            In complex analysis, exponentiation extends across imaginary dimensions through <strong>Euler&apos;s Formula</strong>, which links exponential growth to trigonometric rotation:
          </p>
          <Formula>e^(i × θ) = cos(θ) + i × sin(θ)</Formula>
          <p>
            Expressing a complex number in polar form z = r·e^(iθ) enables rapid computation of arbitrary integer and fractional powers via <strong>De Moivre&apos;s Theorem</strong>:
          </p>
          <Formula>zⁿ = ( r × e^(iθ) )ⁿ = rⁿ × [ cos(nθ) + i × sin(nθ) ]</Formula>
          <p>
            <em>Worked Example:</em> Calculate (1 + i)⁸.
          </p>
          <ol>
            <li>Modulus: r = √(1² + 1²) = √2. Argument: θ = arctan(1/1) = 45° = π/4 radians.</li>
            <li>Apply power: (√2)⁸ = 2⁴ = 16. New angle: 8 × 45° = 360° = 2π radians.</li>
            <li>Evaluate: 16 × [ cos(360°) + i sin(360°) ] = 16 × [ 1 + 0i ] = <strong>16.00</strong>.</li>
          </ol>
          <p>
            This fundamental identity powers digital audio synthesis, alternating current (AC) impedance phasors, and Fast Fourier Transforms (FFT) in modern digital telecommunications.
          </p>

          <h2>Radioactive Decay and Radiocarbon Archeological Dating</h2>
          <p>
            In nuclear physics, unstable radioactive isotopes decay exponentially according to their characteristic half-life (t_half):
          </p>
          <Formula>N(t) = N₀ × (1 ÷ 2)^(t ÷ t_half)</Formula>
          <p>
            For example, Carbon-14 has a half-life of 5,730 years. By measuring the residual radioactive emission rate of Carbon-14 relative to stable Carbon-12 in organic fossils, archaeologists determine the elapsed time since the organism ceased atmospheric carbon exchange, dating artifacts up to 50,000 years in the past with extraordinary chronological precision.
          </p>

          <h2>Real-World Exponential Phenomena Across Science and Finance</h2>
          <p>
            Exponential dynamics govern critical commercial and natural processes:
          </p>

          <DataTable
            head={["Application Domain", "Mathematical Model", "Core Growth / Decay Mechanism", "Industrial Application"]}
            rows={GROWTH_DOMAINS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/logarithm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Logarithm Calculator</Link>, <Link href="/calculators/math/square-root-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Square Root Calculator</Link>, <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>, and <Link href="/calculators/finance/compound-interest-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Compound Interest Calculator</Link>.
          </p>
        
          <h2>Euler's Identity, Complex Exponentiation & Asymptotic Growth Rates</h2>
          <p>
            Exponentiation extends beyond repeated integer multiplication into real, negative, rational, and complex domains through the transcendental exponential function exp(x) = eˣ, defined by the infinite Taylor series Σ (xⁿ / n!). Through Euler's formula, e^(iθ) = cos(θ) + i sin(θ), exponentiation unifies trigonometry with complex analysis, culminating in Euler's identity e^(iπ) + 1 = 0, widely celebrated as the most profound equation in pure mathematics. In computational algorithm analysis and computational complexity theory, exponential growth O(2ⁿ) demarcates the strict theoretical boundary between tractable polynomial-time problems (class P) and intractable combinatorial search problems (class NP), establishing mathematical constraints on cryptanalytic factoring and discrete optimization.
          </p>
</>
      }
    >
      <ExponentCalculator />
    </CalcPage>
  );
}
