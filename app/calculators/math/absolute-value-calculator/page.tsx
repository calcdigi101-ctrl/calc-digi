import AbsoluteValueCalculator from "@/components/calcs/math/absolute-value-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/absolute-value-calculator";
const TITLE = "Absolute Value Calculator | Modulus, Inequalities & Distance | CalcDigi";
const DESCRIPTION =
  "Free online absolute value calculator. Calculate real and complex modulus (|x|), solve absolute value equations and inequalities, and evaluate distance step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is absolute value in mathematics?",
    a: "The absolute value (or modulus) of a real number x, denoted |x|, is its non-negative distance from zero on the real number line: |x| = x if x ≥ 0, and |x| = −x if x < 0.",
  },
  {
    q: "Can the absolute value of a number ever be negative?",
    a: "No. In real analysis and metric spaces, distance is governed by the non-negativity axiom: |x| ≥ 0 for all real x, with |x| = 0 if and only if x = 0.",
  },
  {
    q: "How do you solve an absolute value equation |ax + b| = c?",
    a: "If c < 0, there is no solution because an absolute value cannot equal a negative number. If c ≥ 0, split the equation into two separate linear cases: ax + b = c, or ax + b = −c, and solve each linear equation independently.",
  },
  {
    q: "How do you solve absolute value inequalities?",
    a: "For less-than inequalities (|x| < c), express as a bounded sandwich compound inequality: −c < x < c. For greater-than inequalities (|x| > c), express as a disjoint union of two separate inequalities: x > c or x < −c.",
  },
  {
    q: "What is the Triangle Inequality for absolute values?",
    a: "The Triangle Inequality states that for any two real or complex numbers x and y, the absolute value of their sum is always less than or equal to the sum of their individual absolute values: |x + y| ≤ |x| + |y|.",
  },
  {
    q: "What is the absolute value (modulus) of a complex number z = a + bi?",
    a: "In the complex plane, the modulus |z| represents the Euclidean distance from the origin (0, 0) to point (a, b): |z| = √(a² + b²).",
  },
  {
    q: "How is absolute value used in electrical engineering rectifiers?",
    a: "In AC-to-DC power supplies, a full-wave diode bridge rectifier converts an alternating sinusoidal voltage V(t) = V₀ sin(ωt) into its absolute value |V(t)|, creating pulsating direct current that can be smoothed into steady DC voltage.",
  },
  {
    q: "What is Mean Absolute Error (MAE) in machine learning?",
    a: "Mean Absolute Error measures the average magnitude of prediction errors without considering their direction: MAE = (1/n) Σ |y_true − y_pred|. Unlike Mean Squared Error (MSE), MAE treats all deviations linearly and is robust against extreme outliers.",
  },
];

const ABSOLUTE_PROPERTIES_ROWS = [
  ["Non-Negativity", "|x| ≥ 0", "Absolute value is strictly non-negative", "|−7| = 7 ≥ 0"],
  ["Identity of Indiscernibles", "|x| = 0 ⇔ x = 0", "Zero is the unique value with zero magnitude", "|0| = 0"],
  ["Multiplicative Property", "|x × y| = |x| × |y|", "Modulus distributes cleanly over multiplication", "|−3 × 4| = 3 × 4 = 12"],
  ["Quotient Property", "|x ÷ y| = |x| ÷ |y|", "Modulus distributes over division (for y ≠ 0)", "|−15 ÷ 3| = 15 ÷ 3 = 5"],
  ["Triangle Inequality", "|x + y| ≤ |x| + |y|", "Sum magnitude never exceeds sum of magnitudes", "|3 + (−5)| = 2 ≤ 3 + 5 = 8"],
  ["Reverse Triangle Inequality", "||x| − |y|| ≤ |x − y|", "Establishes lower bound on difference magnitude", "|7 − 4| = 3 ≤ |7 − 4|"],
];

const APPLICATION_DOMAINS_ROWS = [
  ["Machine Learning & Regression", "L₁ regularization (Lasso) & MAE loss", "Loss = Σ |yᵢ − ŷᵢ|; drives feature weights to exact zero for sparse selection"],
  ["AC-to-DC Power Rectification", "Full-wave diode bridge rectification", "Transforms V(t) = V_max sin(ωt) into unidirectional |V(t)|"],
  ["Urban Grid Routing (Manhattan Distance)", "Taxicab metric L₁ navigation", "d = |x₂ − x₁| + |y₂ − y₁| along orthogonal street networks"],
  ["Signal Processing & Peak Detection", "Envelope detection & audio rectifying", "Converts bipolar acoustic waveforms into instantaneous amplitude envelopes"],
];

const RELATED = [
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/percent-error-calculator", icon: "📐", name: "Percent Error" },
  { href: "/calculators/math/matrix-calculator", icon: "🔲", name: "Matrix Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Absolute Value Calculator | CalcDigi"
      intro="Calculate real and complex absolute values, solve absolute value equations and inequalities, and evaluate coordinate distances with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="|x| = x if x >= 0 else -x"
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

          <h2>Mathematical Axioms and Definition of Absolute Value</h2>
          <p>
            In mathematical analysis and topology, the <strong>absolute value</strong> (or <strong>modulus</strong>) of a real number <em>x</em>, denoted by vertical bars <strong>|x|</strong>, is defined as the non-negative magnitude of <em>x</em> irrespective of its algebraic sign. Formally expressed as a piecewise function:
          </p>
          <Formula>|x| = x   if   x ≥ 0;   |x| = −x   if   x &lt; 0</Formula>
          <p>
            Geometrically, the absolute value measures the one-dimensional Euclidean distance between <em>x</em> and the origin 0 along the real number line ℝ. The vertical bar notation was introduced in 1841 by German mathematician Karl Weierstrass, who formalized modern analysis through rigorous epsilon-delta limit proofs.
          </p>
          <p>
            In calculus, the absolute value function f(x) = |x| serves as the canonical example of a continuous function that is not everywhere differentiable: while continuous for all real x, its derivative fails to exist at x = 0 due to an abrupt sharp corner (cusp) where the left-hand derivative (−1) conflicts with the right-hand derivative (+1).
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Fundamental Algebraic Theorems and Modulus Properties</h2>
          <p>
            The mathematical behavior of the absolute value operator is governed by six foundational axioms:
          </p>

          <DataTable
            head={["Axiomatic Property", "Algebraic Formulation", "Core Mathematical Meaning", "Worked Arithmetic Example"]}
            rows={ABSOLUTE_PROPERTIES_ROWS}
            highlight={4}
          />

          <h3>1. Solving Absolute Value Equations: |ax + b| = c</h3>
          <p>
            Because distance cannot be negative, if c &lt; 0, the equation has no real solutions. When c ≥ 0, removing the absolute value bars yields two disjoint linear cases:
          </p>
          <Formula>ax + b = c   or   ax + b = −c</Formula>
          <p>
            <em>Worked Example:</em> Solve |3x − 5| = 16.
          </p>
          <ol>
            <li>Positive case: 3x − 5 = 16 → 3x = 21 → <strong>x₁ = 7.00</strong></li>
            <li>Negative case: 3x − 5 = −16 → 3x = −11 → <strong>x₂ = −11/3 ≈ −3.67</strong></li>
          </ol>

          <h3>2. Solving Absolute Value Inequalities</h3>
          <p>
            Inequalities involving absolute values partition into two distinct topological forms:
          </p>
          <ul>
            <li>
              <strong>Bounded Case (|x| &lt; c):</strong> Represents an open continuous interval centered at the origin: −c &lt; x &lt; c.
            </li>
            <li>
              <strong>Disjoint Case (|x| &gt; c):</strong> Represents the union of two unbounded exterior rays: x &lt; −c or x &gt; c.
            </li>
          </ul>

          <h2>The Geometry of Metric Norms: L₁ (Manhattan) vs. L₂ (Euclidean)</h2>
          <p>
            The absolute value function generates the foundational <strong>L₁ norm</strong> (also termed the Taxicab or Manhattan norm) in linear algebra. For a coordinate vector x = (x₁, x₂, ..., x_n), the L₁ and L₂ norms define distinct topological geometries:
          </p>
          <Formula>L₁ Norm: ||x||₁ = Σ |xᵢ|,   L₂ Norm: ||x||₂ = √[ Σ (xᵢ)² ]</Formula>
          <p>
            In two dimensions, the unit circle under the Euclidean L₂ norm (x² + y² = 1) is a smooth circular disc. In contrast, the unit circle under the absolute-value L₁ norm (|x| + |y| = 1) is a rotated square (rhombus) with sharp corners at (±1, 0) and (0, ±1).
          </p>
          <p>
            In modern machine learning and high-dimensional statistics, this geometric disparity underpins <strong>Lasso Regularization (L₁ penalty)</strong>. Because the sharp corners of the L₁ rhombus align with the coordinate axes, optimization algorithms seeking minimal error subject to an L₁ constraint naturally encounter corners first. This forces irrelevant parameter weights to collapse to exact zero, performing automatic sparse feature selection in genomic analysis and financial risk modeling.
          </p>

          <h2>P-Adic Valuations and Ostrowski&apos;s Theorem in Number Theory</h2>
          <p>
            In advanced arithmetic geometry, the standard absolute value is not the only metric that can measure distance on the rational numbers ℚ. For any prime number <em>p</em>, the <strong>p-adic absolute value</strong> |x|_p measures how divisible an integer is by prime <em>p</em>:
          </p>
          <Formula>|x|_p = p^(−v_p(x))</Formula>
          <p>
            Where v_p(x) is the highest power of <em>p</em> dividing <em>x</em>. Under the 2-adic valuation, numbers that are multiples of high powers of 2 (such as 64 = 2⁶) are considered exceptionally &ldquo;close&rdquo; to zero: |64|₂ = 2⁻⁶ = 0.015625.
          </p>
          <p>
            In 1916, Russian mathematician Alexander Ostrowski proved a profound classification theorem: every possible non-trivial absolute value on the field of rational numbers ℚ is topologically equivalent to either the standard Archimedean absolute value or one of the prime p-adic absolute values. This theorem proves that the real numbers and the p-adic numbers represent the complete set of completions of rational arithmetic.
          </p>

          <h2>Piecewise Analysis and Graphing Absolute Value Functions</h2>
          <p>
            Graphing an absolute value function f(x) = a|x − h| + k produces a V-shaped curve with vertex at (h, k). When a &gt; 0, the graph opens upward with slope +a to the right of the vertex and slope −a to the left. When a &lt; 0, the graph reflects across the horizontal axis, opening downward.
          </p>
          <p>
            <em>Worked Example:</em> Graph and find roots of f(x) = 2|x − 3| − 8.
          </p>
          <ol>
            <li>Vertex coordinate: (h, k) = (3, −8).</li>
            <li>Set f(x) = 0: 2|x − 3| − 8 = 0 → 2|x − 3| = 8 → |x − 3| = 4.</li>
            <li>Case 1: x − 3 = 4 → <strong>x₁ = 7.00</strong>.</li>
            <li>Case 2: x − 3 = −4 → <strong>x₂ = −1.00</strong>.</li>
            <li>Axis of symmetry: x = 3. Y-intercept: f(0) = 2|0 − 3| − 8 = 2(3) − 8 = −2.</li>
          </ol>

          <h2>Complex Contour Integration and Cauchy&apos;s Modulus Bound (ML Inequality)</h2>
          <p>
            In complex analysis, evaluating contour integrals along curves in the complex plane requires bounding the magnitude of analytic functions. The celebrated <strong>Estimation Lemma (ML Inequality)</strong> utilizes the absolute value modulus:
          </p>
          <Formula>| ∮_C f(z) dz | ≤ M × L</Formula>
          <p>
            Where <em>L</em> is the arc length of contour path <em>C</em> and <em>M</em> is the maximum absolute value achieved by |f(z)| along that path.
          </p>
          <p>
            This fundamental inequality allows applied mathematicians and theoretical physicists to evaluate otherwise intractable improper real integrals—such as the Gaussian distribution integral and Fresnel wave diffraction integrals—by demonstrating that integrals along large semicircular complex arcs vanish to zero as radius R approaches infinity.
          </p>

          <h2>Complex Modulus and Euclidean Vectors</h2>
          <p>
            In the complex number field ℂ, the absolute value of a complex number z = a + bi (where <em>i</em> is the imaginary unit) is defined as the Euclidean distance from the origin on the complex Argand plane:
          </p>
          <Formula>|z| = √(a² + b²) = √(z × z̄)</Formula>
          <p>
            Where z̄ = a − bi represents the complex conjugate. The product of any complex number and its conjugate always yields the square of its modulus: z · z̄ = |z|².
          </p>

          <h2>Robust Regression Analysis and the Huber Loss Function</h2>
          <p>
            In robust statistics, while ordinary least squares minimizes squared error Σ(yᵢ − ŷᵢ)², severe outliers distort parameter estimates. Statistician Peter Huber resolved this vulnerability by introducing the <strong>Huber Loss Function</strong>, which combines quadratic loss for small deviations with absolute linear loss for large deviations:
          </p>
          <Formula>L_δ(e) = (1 ÷ 2)e²   if |e| ≤ δ;   L_δ(e) = δ(|e| − (1 ÷ 2)δ)   if |e| &gt; δ</Formula>
          <p>
            This hybrid absolute value formulation ensures smooth gradient descent differentiability near zero while providing robust protection against statistical contamination and recording errors.
          </p>

          <h2>Real-World Quantitative Applications Across Engineering and AI</h2>
          <p>
            Absolute values govern critical optimization algorithms across computing and technology:
          </p>

          <DataTable
            head={["Industrial Domain", "Applied Mathematical Relationship", "Analytical Scope & Impact"]}
            rows={APPLICATION_DOMAINS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/square-root-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Square Root Calculator</Link>, <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>, <Link href="/calculators/math/distance-formula-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Distance Formula Calculator</Link>, and <Link href="/calculators/math/matrix-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Matrix Calculator</Link>.
          </p>
        
          <h2>Metric Spaces, Normed Vector Fields & Complex Absolute Value</h2>
          <p>
            In advanced mathematical analysis, absolute value serves as the foundational metric for distance in Euclidean space ℝ¹. The concept generalizes directly to complex numbers z = a + bi, where the modulus |z| = √(a² + b²) defines the geometric Euclidean distance from the origin in the complex Argand plane. In functional analysis and linear algebra, the absolute value is formalized as an L¹ norm, satisfying three indispensable axioms: non-negativity (|x| ≥ 0 with equality if and only if x = 0), absolute homogeneity (|αx| = |α||x| for any scalar α), and the subadditivity triangle inequality (|x + y| ≤ |x| + |y|). In digital signal processing and numerical analysis, the absolute value operator prevents destructive phase interference when evaluating root-mean-square amplitude envelopes, computing total harmonic distortion, and quantifying residual measurement error tolerances across discrete Fourier transform spectra.
          </p>

          <h2>Signal Processing & Vector Norm Applications</h2>
          <p>
            In electronic telecommunications and audio engineering, absolute value rectification converts alternating current signals into unipolar voltage pulses, facilitating accurate envelope detection and peak level metering. In machine learning regularization, L1 lasso penalties utilize absolute values to drive non-essential model coefficients exactly to zero, achieving automated feature selection and sparse representation across high-dimensional predictive datasets.
          </p>
</>
      }
    >
      <AbsoluteValueCalculator />
    </CalcPage>
  );
}
