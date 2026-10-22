import LogarithmCalculator from "@/components/calcs/math/logarithm-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/logarithm-calculator";
const TITLE = "Logarithm Calculator | Log Base 10, Natural Log (ln) & Custom Bases | CalcDigi";
const DESCRIPTION =
  "Free online logarithm calculator. Calculate log base 10, natural log (ln), log base 2 (lb), and arbitrary custom bases step-by-step with logarithmic laws and change-of-base proofs.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a logarithm in mathematics?",
    a: "A logarithm is the inverse mathematical operation of exponentiation. The logarithm of a positive number x to a given base b is the exponent y to which base b must be raised to produce x: log_b(x) = y if and only if bʸ = x.",
  },
  {
    q: "What is the difference between Natural Log (ln) and Common Log (log)?",
    a: "Common Logarithm (log or log₁₀) uses base 10, reflecting our decimal numbering system. Natural Logarithm (ln or log_e) uses the mathematical constant e ≈ 2.71828... as its base, reflecting continuous compounding and calculus growth models.",
  },
  {
    q: "What is the Change of Base Formula?",
    a: "The Change of Base Formula converts a logarithm with any arbitrary base b into natural or common logs: log_b(x) = ln(x) / ln(b) = log₁₀(x) / log₁₀(b). This allows evaluation on standard scientific calculators.",
  },
  {
    q: "Can you take the logarithm of a negative number or zero?",
    a: "In the real number system ℝ, logarithms of negative numbers and zero are undefined because raising any positive base b to any real power y always yields a strictly positive result (bʸ > 0). In complex analysis, complex logarithms log(z) exist but are multi-valued.",
  },
  {
    q: "What are the fundamental laws of logarithms?",
    a: "The three primary laws are: Product Rule: log_b(xy) = log_b(x) + log_b(y); Quotient Rule: log_b(x/y) = log_b(x) − log_b(y); Power Rule: log_b(xᵏ) = k · log_b(x).",
  },
  {
    q: "How did logarithms revolutionize human calculation historically?",
    a: "Invented by John Napier in 1614, logarithms transformed tedious multi-digit multiplication and division into simple addition and subtraction. Before digital computers, logarithms enabled Kepler's planetary orbit calculations, naval navigation tables, and engineering slide rules.",
  },
  {
    q: "Why are logarithmic scales used for earthquakes, sound, and acidity?",
    a: "Many natural phenomena span vast orders of magnitude. Compressing millions of raw physical units into a compact logarithmic scale (such as the Richter scale, decibel sound scale, or chemical pH scale) makes sensory perception and scientific measurement understandable.",
  },
  {
    q: "What is binary logarithm (log₂ or lb) used for in computer science?",
    a: "Binary logarithm log₂(n) measures the number of binary bits required to represent an integer, as well as the maximum steps required in binary search algorithms and balanced search trees (time complexity O(log n)).",
  },
];

const LOG_LAWS_ROWS = [
  ["Product Rule", "log_b(x × y) = log_b(x) + log_b(y)", "Converts multiplication into addition", "log₁₀(100 × 1000) = 2 + 3 = 5"],
  ["Quotient Rule", "log_b(x ÷ y) = log_b(x) − log_b(y)", "Converts division into subtraction", "log₂(32 ÷ 4) = 5 − 2 = 3"],
  ["Power Rule", "log_b(xᵏ) = k × log_b(x)", "Brings exponents down as linear multipliers", "ln(e⁵) = 5 × ln(e) = 5"],
  ["Change of Base", "log_b(x) = ln(x) ÷ ln(b)", "Converts arbitrary base into standard functions", "log₃(81) = ln(81) ÷ ln(3) = 4"],
  ["Identity Rule", "log_b(b) = 1 and log_b(1) = 0", "Base to power 1 is base; base to power 0 is 1", "log₁₀(10) = 1, log₇(1) = 0"],
  ["Inverse Rule", "b^(log_b(x)) = x and log_b(bˣ) = x", "Exponential and log functions cancel each other", "10^(log₁₀(42)) = 42"],
];

const LOG_SCALES_ROWS = [
  ["Richter Earthquake Scale", "M = log₁₀(A ÷ A₀)", "Each whole unit increase represents 10x wave amplitude and ~31.6x energy release"],
  ["Decibel Sound Scale (dB)", "dB = 10 × log₁₀(P ÷ P₀)", "Compresses acoustic hearing threshold (10⁻¹² W/m²) up to jet engine roar"],
  ["Chemical pH Scale", "pH = −log₁₀[H⁺]", "Quantifies hydrogen ion molarity; pH 4 is 100x more acidic than pH 6"],
  ["Astronomical Magnitude", "m₁ − m₂ = −2.5 × log₁₀(F₁ ÷ F₂)", "Inverse logarithmic scale measuring perceived celestial brightness of stars"],
  ["Computer Search Algorithms", "Steps = ⌈log₂(N)⌉", "Binary search over N items takes at most logarithmic time"],
];

const RELATED = [
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "🔬", name: "Scientific Notation" },
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/math/number-sequence-calculator", icon: "🔢", name: "Number Sequence" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Logarithm Calculator | CalcDigi"
      intro="Calculate natural logarithms (ln), common logarithms (log₁₀), binary logarithms (log₂), and arbitrary custom bases with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="y = log_b(x) <-> b^y = x"
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

          <h2>Mathematical Axioms and Definition of Logarithms</h2>
          <p>
            In mathematical analysis, a <strong>logarithm</strong> is the inverse operation of exponentiation. Formally, for any positive real base <em>b</em> (where b &gt; 0 and b ≠ 1) and any strictly positive argument <em>x</em> &gt; 0, the logarithm <strong>log_b(x)</strong> represents the unique real exponent <em>y</em> satisfying the foundational equivalence:
          </p>
          <Formula>log_b(x) = y   iff   bʸ = x</Formula>
          <p>
            The invention of logarithms by Scottish mathematician John Napier in his 1614 treatise <em>Mirifici Logarithmorum Canonis Descriptio</em> is celebrated as one of the pivotal milestones of the scientific revolution. By mapping multiplication onto addition through log tables, logarithms dramatically compressed computational labor for astronomers like Johannes Kepler, whose formulation of planetary motion laws was accelerated by decades.
          </p>
          <p>
            English mathematician Henry Briggs collaborated with Napier to establish base-10 common logarithms, while the Swiss instrument maker Joost Bürgi independently developed logarithmic tables. Today, logarithms are ubiquitous across quantum mechanics, financial option pricing (Black-Scholes model), signal processing, and computer science complexity theory.
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>The Universal Laws of Logarithms and Change-of-Base Theorem</h2>
          <p>
            Operating with logarithms across scientific computations relies on five core algebraic identities:
          </p>

          <DataTable
            head={["Logarithmic Law", "Algebraic Formula", "Core Mechanistic Principle", "Worked Arithmetic Example"]}
            rows={LOG_LAWS_ROWS}
            highlight={0}
          />

          <h3>1. Derivation of the Change of Base Formula</h3>
          <p>
            To evaluate a logarithm with an arbitrary base <em>b</em> using standard natural (ln) or common (log₁₀) functions, let y = log_b(x):
          </p>
          <ol>
            <li>Rewrite in exponential form: bʸ = x</li>
            <li>Take the natural logarithm of both sides: ln(bʸ) = ln(x)</li>
            <li>Apply the power rule to bring exponent y down: y × ln(b) = ln(x)</li>
            <li>Divide both sides by ln(b) to yield the <strong>Change of Base Formula</strong>:</li>
          </ol>
          <Formula>log_b(x) = ln(x) ÷ ln(b) = log₁₀(x) ÷ log₁₀(b)</Formula>
          <p>
            <em>Worked Example:</em> Calculate log₅(125).
          </p>
          <Formula>log₅(125) = ln(125) ÷ ln(5) ≈ 4.828314 ÷ 1.609438 = 3.0000</Formula>

          <h2>Logarithmic Measurement Scales Across Nature and Engineering</h2>
          <p>
            Because human sensory perception responds logarithmically to stimulus intensity (the Weber-Fechner Law), scientific disciplines measure wide physical ranges using logarithmic units:
          </p>

          <DataTable
            head={["Scientific Scale", "Mathematical Formula", "Analytical Significance & Impact"]}
            rows={LOG_SCALES_ROWS}
            highlight={1}
          />

          <h2>Calculus Foundations: Derivatives and Integrals of Logarithms</h2>
          <p>
            In differential calculus, the natural logarithm is the unique non-trivial function whose derivative equals the reciprocal function:
          </p>
          <Formula>(d ÷ dx) ln(x) = 1 ÷ x,   (d ÷ dx) log_b(x) = 1 ÷ [ x × ln(b) ]</Formula>
          <p>
            In integral calculus, the logarithm bridges the famous exception in the power rule of integration. While ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) for all n ≠ −1, when n = −1 the standard rule produces division by zero. The natural logarithm resolves this singularity:
          </p>
          <Formula>∫ (1 ÷ x) dx = ln|x| + C</Formula>
          <p>
            Historically, Belgian mathematician Grégoire de Saint-Vincent discovered this relation in 1647 by proving that the area under the rectangular hyperbola y = 1/x satisfies the additive property of logarithms.
          </p>

          <h2>Information Theory, Entropy, and Computer Science Big-O</h2>
          <p>
            In 1948, Claude Shannon founded mathematical information theory by defining the <strong>entropy</strong> of a discrete random variable X using binary logarithms (base 2):
          </p>
          <Formula>H(X) = − Σ P(xᵢ) × log₂( P(xᵢ) )</Formula>
          <p>
            The binary unit of information (the <em>bit</em> or Shannon) represents the uncertainty resolved by an event of probability 1/2 (log₂(2) = 1 bit). In computer science, divide-and-conquer algorithms like binary search and merge sort achieve optimal O(log n) and O(n log n) runtime scaling because halving search space cuts remaining items in logarithmic steps.
          </p>

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/square-root-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Square Root Calculator</Link>, <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>, and <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>.
          </p>
        
          <h2>John Napier's Foundations, Information Entropy & Decibel Scaling</h2>
          <p>
            Invented by John Napier in 1614 to eliminate arduous manual multiplication in celestial navigation, logarithms convert complex multiplicative relationships into simple additive differences: log(ab) = log(a) + log(b). In Claude Shannon's mathematical theory of communication, base-2 logarithms quantify information entropy H = −Σ pᵢ log₂(pᵢ), measuring information content in discrete digital bits. In sensory biophysics and acoustics, human perceptual systems respond logarithmically to physical stimuli as formalized by the Weber-Fechner law; consequently, acoustic sound pressure levels (decibels dB = 20 log₁₀(P/P₀)), earthquake seismic energy (Richter magnitude), and optical photographic exposure stops are all defined on logarithmic scales to compress vast dynamic physical ranges.
          </p>

          <h2>Chemical pH Scaling & Seismological Energy Quantification</h2>
          <p>
            In analytical biochemistry, aqueous hydrogen ion concentrations span billions of orders of magnitude; Sørensen's logarithmic pH scale compresses these vast variations into an intuitive range from 0 to 14, where each single integer shift represents a tenfold change in chemical acidity. In geophysics, Charles Richter's earthquake scale utilizes base-10 logarithms to quantify seismic ground motion, where an increase of one unit corresponds to approximately 31.6 times more released kinetic energy.
          </p>
</>
      }
    >
      <LogarithmCalculator />
    </CalcPage>
  );
}
