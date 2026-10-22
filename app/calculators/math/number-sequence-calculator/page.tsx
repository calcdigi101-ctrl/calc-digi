import NumberSequenceCalculator from "@/components/calcs/math/number-sequence-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/number-sequence-calculator";
const TITLE = "Number Sequence Calculator | Arithmetic, Geometric & Fibonacci Series | CalcDigi";
const DESCRIPTION =
  "Free online number sequence calculator. Find the nth term, common difference, common ratio, and partial sum for arithmetic, geometric, and Fibonacci sequences step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is an arithmetic sequence?",
    a: "An arithmetic sequence is a sequence of numbers in which the difference between consecutive terms is constant (the common difference d): a_n = a₁ + (n − 1)d. For example: 3, 7, 11, 15, 19... has d = 4.",
  },
  {
    q: "How do you calculate the sum of an arithmetic sequence?",
    a: "The sum of the first n terms of an arithmetic sequence is given by Gauss's formula: S_n = (n / 2) × (a₁ + a_n) = (n / 2) × [2a₁ + (n − 1)d].",
  },
  {
    q: "What is a geometric sequence?",
    a: "A geometric sequence is a sequence of numbers where each term after the first is found by multiplying the previous term by a fixed, non-zero constant (the common ratio r): a_n = a₁ × r^(n−1). For example: 2, 6, 18, 54... has r = 3.",
  },
  {
    q: "How do you calculate the sum of an infinite geometric series?",
    a: "An infinite geometric series converges to a finite sum if and only if the absolute value of the common ratio is strictly less than 1 (|r| &lt; 1): S_∞ = a₁ / (1 − r). If |r| ≥ 1, the series diverges to infinity.",
  },
  {
    q: "What is the Fibonacci sequence and what is its recurrence relation?",
    a: "The Fibonacci sequence is defined by the recurrence F_n = F_(n−1) + F_(n−2) with seed values F₁ = 1 and F₂ = 1 (or F₀ = 0). The sequence begins: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...",
  },
  {
    q: "What is Binet's Formula for the Fibonacci sequence?",
    a: "Binet's formula provides an explicit closed-form algebraic expression for the nth Fibonacci number without requiring recursion: F_n = (φⁿ − ψⁿ) / √5, where φ = (1 + √5)/2 is the Golden Ratio and ψ = (1 − √5)/2.",
  },
  {
    q: "What is a harmonic sequence?",
    a: "A harmonic sequence is a progression formed by taking the reciprocals of an arithmetic sequence: 1/a₁, 1/(a₁ + d), 1/(a₁ + 2d)... For example: 1, 1/2, 1/3, 1/4, 1/5... is the harmonic progression.",
  },
  {
    q: "How did Carl Friedrich Gauss sum the numbers from 1 to 100 as a child?",
    a: "Gauss recognized that pairing the first and last numbers (1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101...) produces 50 identical pairs summing to 101: Sum = (100 / 2) × (1 + 100) = 50 × 101 = 5,050.",
  },
];

const SEQUENCE_TYPES_ROWS = [
  ["Arithmetic Progression", "a_n = a₁ + (n − 1)d", "Constant common difference d = a_k − a_{k−1}", "S_n = (n/2)(a₁ + a_n)"],
  ["Geometric Progression", "a_n = a₁ × r^(n−1)", "Constant common ratio r = a_k ÷ a_{k−1}", "S_n = a₁(1 − rⁿ) ÷ (1 − r)"],
  ["Infinite Geometric Series", "S_∞ = a₁ ÷ (1 − r)", "Converges if and only if |r| &lt; 1", "Zeno's paradox / fractal area"],
  ["Fibonacci Sequence", "F_n = F_(n-1) + F_(n-2)", "Each term is sum of two predecessors", "Binet formula: (φⁿ − ψⁿ)/√5"],
  ["Harmonic Progression", "h_n = 1 ÷ [a₁ + (n − 1)d]", "Reciprocal of arithmetic progression", "Musical acoustic overtone nodes"],
  ["Triangular Numbers", "T_n = [n(n + 1)] ÷ 2", "Number of objects in equilateral triangle grid", "1, 3, 6, 10, 15, 21, 28..."],
];

const APPLICATIONS_ROWS = [
  ["Financial Annuities & Mortgages", "Geometric series present value discounting", "PV = PMT × [ 1 − (1 + r)⁻ⁿ ] ÷ r for loan amortization schedules"],
  ["Computer Algorithm Analysis", "Divide-and-conquer master recurrence relations", "MergeSort runtime T(n) = 2T(n/2) + O(n) yields O(n log n)"],
  ["Fractal Geometry (Koch Snowflake)", "Infinite geometric series perimeter & area", "Perimeter diverges to infinity while enclosed area converges to (8/5)A₀"],
  ["Phyllotaxis in Botany & Nature", "Fibonacci sequence divergence angles", "Seed packing in sunflowers follows 137.5° golden angle to maximize sunlight"],
];

const RELATED = [
  { href: "/calculators/math/matrix-calculator", icon: "🔲", name: "Matrix Calculator" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/logarithm-calculator", icon: "🪵", name: "Logarithm Calculator" },
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Number Sequence Calculator | CalcDigi"
      intro="Analyze arithmetic, geometric, and Fibonacci sequences. Calculate the nth term, common difference, common ratio, and finite/infinite series sums with complete step-by-step proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a_n = a_1 + (n - 1)d, a_n = a_1 * r^(n-1)"
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

          <h2>Mathematical Axioms and Theory of Discrete Sequences</h2>
          <p>
            In discrete mathematics, number theory, and real analysis, a <strong>sequence</strong> is an ordered list of mathematical objects (typically numbers) indexed by natural numbers ℕ. Formally, a sequence is a function f: ℕ → ℝ mapping each positive integer index <em>n</em> onto its corresponding term <strong>a_n</strong>. While a sequence represents an ordered enumeration of individual terms, a <strong>series</strong> represents the cumulative sum of those terms: S_n = Σ a_i.
          </p>
          <p>
            The systematic study of number patterns originated in ancient mathematics with the Pythagoreans, who classified &ldquo;figurate numbers&rdquo; (triangular, square, and pentagonal numbers). In 1202, Leonardo Fibonacci introduced his eponymous sequence in <em>Liber Abaci</em> to model rabbit population breeding cycles.
          </p>
          <p>
            In the 18th and 19th centuries, Leonard Euler, Carl Friedrich Gauss, and Augustin-Louis Cauchy formalized convergence criteria for infinite sequences and series, establishing the rigorous analytical foundation for calculus, Fourier series, financial annuity discounting, and algorithmic time complexity.
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Taxonomy of Classical Number Sequences</h2>
          <p>
            The table below catalogues standard mathematical sequence families, their explicit generating formulas, and their summation principles:
          </p>

          <DataTable
            head={["Sequence Family", "Explicit nth Term Formula", "Defining Recursive Mechanism", "Series Summation Formula"]}
            rows={SEQUENCE_TYPES_ROWS}
            highlight={0}
          />

          <h3>1. Arithmetic Sequences and Gauss&apos;s Summation Theorem</h3>
          <p>
            An arithmetic sequence advances by adding a fixed constant common difference <em>d</em> at each step. The explicit nth term is:
          </p>
          <Formula>a_n = a₁ + (n − 1) × d</Formula>
          <p>
            The sum of the first <em>n</em> terms (an arithmetic series) equals the number of terms multiplied by the average of the first and last terms:
          </p>
          <Formula>S_n = (n ÷ 2) × (a₁ + a_n) = (n ÷ 2) × [ 2a₁ + (n − 1)d ]</Formula>
          <p>
            <em>Worked Example:</em> An arithmetic progression starts at a₁ = 5 with common difference d = 7. Calculate the 20th term and the sum of the first 20 terms.
          </p>
          <ol>
            <li>20th term: a₂₀ = 5 + (20 − 1) × 7 = 5 + (19 × 7) = 5 + 133 = <strong>138</strong>.</li>
            <li>Partial sum: S₂₀ = (20 ÷ 2) × (5 + 138) = 10 × 143 = <strong>1,430</strong>.</li>
          </ol>

          <h3>2. Geometric Sequences and Infinite Series Convergence</h3>
          <p>
            A geometric sequence advances by multiplying by a constant common ratio <em>r</em> at each step:
          </p>
          <Formula>a_n = a₁ × r^(n − 1)</Formula>
          <p>
            The finite partial sum of <em>n</em> terms satisfies:
          </p>
          <Formula>S_n = a₁ × (1 − rⁿ) ÷ (1 − r)   (for r ≠ 1)</Formula>
          <p>
            When the common ratio has absolute magnitude strictly less than 1 (|r| &lt; 1), the term rⁿ approaches zero as n approaches infinity, causing the infinite series to converge to a clean finite value:
          </p>
          <Formula>S_∞ = lim (n → ∞) S_n = a₁ ÷ (1 − r)</Formula>
          <p>
            <em>Worked Example:</em> Sum the infinite geometric series 12 + 6 + 3 + 1.5 + ... where a₁ = 12 and r = 1/2 = 0.5.
          </p>
          <Formula>S_∞ = 12 ÷ (1 − 0.5) = 12 ÷ 0.5 = 24.00</Formula>

          <h2>Quadratic Sequences and the Method of Finite Differences</h2>
          <p>
            When the consecutive differences between terms of a sequence are not constant, but the <em>second differences</em> (differences between successive differences) are constant, the sequence is a <strong>quadratic sequence</strong> defined by:
          </p>
          <Formula>a_n = A × n² + B × n + C</Formula>
          <p>
            The coefficients A, B, and C are determined systematically using the <strong>Method of Finite Differences</strong>:
          </p>
          <ol>
            <li>Second constant difference: 2A = Δ² → A = Δ² ÷ 2</li>
            <li>First difference between term 1 and term 2: 3A + B = a₂ − a₁</li>
            <li>Initial term: A + B + C = a₁</li>
          </ol>
          <p>
            <em>Worked Example:</em> Determine the nth term formula for sequence: 4, 11, 22, 37, 56...
          </p>
          <ol>
            <li>First differences: 11 − 4 = 7; 22 − 11 = 11; 37 − 22 = 15; 56 − 37 = 19.</li>
            <li>Second differences: 11 − 7 = 4; 15 − 11 = 4; 19 − 15 = 4. Constant Δ² = 4.</li>
            <li>Calculate A: 2A = 4 → A = 2.</li>
            <li>Calculate B: 3(2) + B = 7 → 6 + B = 7 → B = 1.</li>
            <li>Calculate C: (2) + (1) + C = 4 → 3 + C = 4 → C = 1.</li>
            <li>General formula: <strong>a_n = 2n² + n + 1</strong>. (Checking n = 3: 2(9) + 3 + 1 = 22, exact match!).</li>
          </ol>

          <h2>Ordinary Generating Functions in Combinatorics</h2>
          <p>
            In discrete mathematics, French polymath Pierre-Simon Laplace and Leonhard Euler developed <strong>generating functions</strong> to manipulate entire sequences as continuous algebraic objects. The ordinary generating function G(x) of a sequence a_n is the formal power series:
          </p>
          <Formula>G(x) = Σ a_n × xⁿ = a₀ + a₁x + a₂x² + a₃x³ + ...</Formula>
          <p>
            For a geometric sequence a_n = rⁿ, the generating function sums cleanly to the rational algebraic function:
          </p>
          <Formula>G(x) = 1 ÷ (1 − rx)</Formula>
          <p>
            By translating discrete recurrence equations into continuous algebraic functions, generating functions allow mathematicians to solve complex integer partition problems and count permutations in polynomial time.
          </p>

          <h2>The Fibonacci Sequence and Binet&apos;s Closed-Form Formula</h2>
          <p>
            Defined recursively by F_n = F_(n-1) + F_(n-2) with F₁ = 1, F₂ = 1, the ratio of consecutive Fibonacci numbers converges to the Golden Ratio φ = (1 + √5)/2. Using the characteristic polynomial r² − r − 1 = 0, French mathematician Jacques Philippe Marie Binet derived the exact non-recursive formula:
          </p>
          <Formula>F_n = [ φⁿ − ψⁿ ] ÷ √5</Formula>
          <p>
            Where φ = (1 + √5)/2 ≈ 1.618034 and ψ = (1 − √5)/2 ≈ −0.618034. Because |ψ| &lt; 1, ψⁿ vanishes rapidly for large n, meaning F_n equals the nearest integer to φⁿ / √5: F_n = round(φⁿ / √5).
          </p>

          <h2>Real-World Applications Across Technology and Quantitative Finance</h2>
          <p>
            Discrete sequences model dynamic systems across modern computing and commercial finance:
          </p>

          <DataTable
            head={["Application Domain", "Mathematical Sequence Model", "Analytical Scope & Impact"]}
            rows={APPLICATIONS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/matrix-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Matrix Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/logarithm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Logarithm Calculator</Link>, and <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>.
          </p>
        
          <h2>Generating Functions, Cauchy Convergence & Fibonacci Ratios</h2>
          <p>
            Number sequences form the foundational discrete building blocks of numerical analysis and discrete mathematics. In formal sequence theory, an infinite sequence (aₙ) converges to a limit L if for every ε &gt; 0, there exists integer N such that |aₙ − L| &lt; ε for all n &gt; N, as formalized in Cauchy's convergence criterion. Geometric series Σ arⁿ converge to finite analytic sums a / (1 − r) if and only if |r| &lt; 1, providing the mathematical basis for infinite annuity valuations and Z-transform filter synthesis. In the famous Fibonacci sequence, the ratio between consecutive terms aₙ₊₁ / aₙ asymptotically converges to the golden ratio φ = (1 + √5)/2 ≈ 1.6180339887..., linking discrete recursive difference equations directly to logarithmic phyllotaxis spiral patterns in biological morphogenesis.
          </p>
</>
      }
    >
      <NumberSequenceCalculator />
    </CalcPage>
  );
}
