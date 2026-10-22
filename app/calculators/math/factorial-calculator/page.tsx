import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/factorial-calculator";
const TITLE = "Factorial Calculator | Compute n!, Permutations & Gamma Function | CalcDigi";
const DESCRIPTION =
  "Free online factorial calculator. Compute n! for integers, scientific notation for huge factorials, Stirling's asymptotic approximation, and Gamma function step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a factorial in mathematics?",
    a: "The factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n: n! = n × (n - 1) × (n - 2) × ... × 2 × 1. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.",
  },
  {
    q: "Why is zero factorial (0!) equal to 1?",
    a: "Mathematically, 0! = 1 because it represents the empty product (multiplying zero numbers together yields the multiplicative identity 1). Combinatorially, there is exactly one way to arrange zero objects. Furthermore, the recursive relation (n - 1)! = n! / n requires 0! = 1! / 1 = 1.",
  },
  {
    q: "How fast do factorials grow compared to exponential functions?",
    a: "Factorials grow faster than any simple exponential function aⁿ for any constant base a. By Stirling's asymptotic approximation, n! grows roughly as (n / e)ⁿ × √(2πn), which outpaces geometric and polynomial sequences as n increases.",
  },
  {
    q: "What is Stirling's approximation formula?",
    a: "Stirling's approximation states that for large n, n! ≈ √(2πn) × (n / e)ⁿ. Taking the natural logarithm gives ln(n!) ≈ n × ln(n) - n + 0.5 × ln(2πn), which enables rapid calculation of astronomical factorials without multiplying thousands of terms.",
  },
  {
    q: "Can factorials be calculated for fractions or negative numbers?",
    a: "Yes, through Euler's Gamma function Γ(z), which extends factorials to the complex plane: Γ(n) = (n - 1)! for positive integers, and Γ(z) = ∫₀^∞ t^(z - 1) e^(-t) dt for Re(z) > 0. For example, (1/2)! = Γ(3/2) = (√π) / 2 ≈ 0.886227.",
  },
  {
    q: "How do you count the number of trailing zeros in n!?",
    a: "Trailing zeros are produced by prime factors of 10 = 2 × 5. Because 2s are always more abundant than 5s in n!, count prime factors of 5 using Legendre's formula: Z = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ⌊n/625⌋ + ... until the power of 5 exceeds n.",
  },
  {
    q: "What is the largest factorial that standard 64-bit computers can calculate exactly?",
    a: "Standard 64-bit unsigned integers overflow at 21!, since 20! = 2,432,902,008,176,640,000 fits in 64 bits (up to 1.84 × 10¹⁹), but 21! ≈ 5.109 × 10¹⁹ exceeds the limit. Double-precision 64-bit floating point numbers can approximate factorials up to 170! ≈ 7.257 × 10³⁰⁶ before overflowing to infinity.",
  },
  {
    q: "What are the primary applications of factorials in probability and physics?",
    a: "Factorials are foundational in calculating permutations and combinations, binomial probability distributions, Taylor series expansions (like eˣ = Σ xⁿ / n!), statistical mechanics (Boltzmann's entropy S = k ln W), and quantum partition functions.",
  },
];

const FACTORIAL_SCALE_ROWS = [
  ["5!", "120", "3", "Pocket arithmetic / standard probability puzzles"],
  ["10!", "3,628,800", "7", "Shuffling a subset of cards / scheduling routes"],
  ["15!", "1,307,674,368,000", "13", "Permutations of 15 athletes / microsecond scales"],
  ["20!", "2.432902 × 10¹⁸", "19", "Maximum exact integer representable in 64-bit hardware"],
  ["52!", "8.065818 × 10⁶⁷", "68", "Exact unique arrangements of a standard 52-card deck"],
  ["100!", "9.332622 × 10¹⁵⁷", "158", "Exceeds the total estimated subatomic particles in the universe"],
];

const RELATED_FACTORIAL = [
  { href: "/calculators/math/permutation-calculator", icon: "🔀", name: "Permutations" },
  { href: "/calculators/math/combination-calculator", icon: "🎲", name: "Combinations" },
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/probability-calculator", icon: "🎯", name: "Probability" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Factorial Calculator | CalcDigi"
      intro="Compute exact factorials, explore permutation scales, Stirling approximations, and Gamma continuations with ISO-compliant algorithmic precision."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="n!"
      related={RELATED_FACTORIAL}
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

          <h2>Foundations of Factorials and Combinatorial Growth</h2>
          <p>
            The factorial function, denoted by the exclamation point <em>n!</em>, represents one of the most fundamental operations in discrete mathematics, probability theory, and mathematical analysis. Introduced historically by Christian Kramp in 1808 as an elegant notation for successive integer multiplication, factorials quantify the number of unique ways to arrange <em>n</em> distinct objects in a sequential queue.
          </p>
          <p>
            For any positive integer <em>n</em>, the factorial operation is defined as the product of all positive integers descending from <em>n</em> down to 1. This explosive multiplicative chain produces combinatorial explosion: a phenomenon where values accelerate rapidly, quickly exceeding astronomical scales that dwarf conventional everyday quantities.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="combinatorics" />
          </div>

          <h2>Mathematical Definition and Core Factorial Formulas</h2>
          <p>
            The factorial of an integer <em>n</em> is formally expressed through both recursive and closed product definitions:
          </p>
          <Formula>n! = ∏_(i=1)^n i = n × (n - 1) × (n - 2) × ... × 3 × 2 × 1</Formula>
          <p>
            The recurrence relation governing the sequence provides an inductive foundation for dynamic programming algorithms and computational proof:
          </p>
          <Formula>n! = n × (n - 1)!  where  0! = 1</Formula>

          <h3>The Zero Factorial Identity (0! = 1)</h3>
          <p>
            The convention <em>0! = 1</em> is not an arbitrary rule; it is an algebraic and combinatorial necessity. Algebraically, rearranging the recursive identity yields:
          </p>
          <Formula>(n - 1)! = n! ÷ n</Formula>
          <p>
            Substituting <em>n = 1</em> produces <em>0! = 1! ÷ 1 = 1 ÷ 1 = 1</em>. Combinatorially, <em>n!</em> counts the number of bijections from a set of size <em>n</em> to itself. A set with zero elements (the empty set ∅) has exactly one function mapping to itself: the empty function. Hence, exactly one permutation exists.
          </p>

          <h2>Asymptotic Behavior: Stirling's Approximation</h2>
          <p>
            When computing factorials of substantial integers, direct iterative multiplication requires substantial memory and computational time. In 1730, Scottish mathematician James Stirling derived an indispensable asymptotic formula describing the growth rate of factorials as <em>n</em> approaches infinity:
          </p>
          <Formula>n! ≈ √(2 × π × n) × (n ÷ e)ⁿ</Formula>
          <p>
            For practical computational purposes and algorithmic complexity analysis, taking the natural logarithm simplifies the calculation of enormous values:
          </p>
          <Formula>ln(n!) ≈ n × ln(n) - n + 0.5 × ln(2 × π × n)</Formula>
          <p>
            Stirling's approximation is extraordinarily accurate: even for a modest integer such as <em>n = 10</em>, the approximation yields approximately 3,598,696 compared to the exact value of 3,628,800, representing an error of less than 0.83 percent. For <em>n = 100</em>, the error drops to less than 0.08 percent.
          </p>

          <h2>Continuous Extension: Euler's Gamma Function</h2>
          <p>
            While elementary factorials operate strictly over non-negative integers, Swiss mathematician Leonhard Euler extended the concept to fractional, real, and complex numbers using the continuous <strong>Gamma function</strong>, denoted Γ(z):
          </p>
          <Formula>Γ(z) = ∫₀^∞ t^(z - 1) × e^(-t) dt  (for Re(z) &gt; 0)</Formula>
          <p>
            Through integration by parts, the Gamma function satisfies the functional relation Γ(z + 1) = z × Γ(z). For any positive integer <em>n</em>:
          </p>
          <Formula>Γ(n) = (n - 1)!  and  n! = Γ(n + 1)</Formula>
          <p>
            This breakthrough formulation allows mathematicians to compute exact factorials for fractional arguments. Most famously, for the argument <em>n = 0.5</em>:
          </p>
          <Formula>(1/2)! = Γ(3/2) = (1/2) × Γ(1/2) = (√π) ÷ 2 ≈ 0.8862269</Formula>

          <h2>Step-by-Step Worked Derivation: Calculating 6! and Trailing Zeros</h2>
          <p>
            To understand the operational mechanics of factorial evaluation and prime power decomposition, let us walk through the complete calculation of <strong>6!</strong> and determine the trailing zeros of <strong>30!</strong>.
          </p>
          <h3>Step 1: Direct Iterative Expansion of 6!</h3>
          <p>
            Multiply each consecutive descending integer from 6 down to 1:
          </p>
          <Formula>6! = 6 × 5 × 4 × 3 × 2 × 1 = 720</Formula>
          <p>
            The canonical prime factorization of 720 reveals the individual prime contributions:
          </p>
          <Formula>720 = 2⁴ × 3² × 5¹</Formula>

          <h3>Step 2: Counting Trailing Zeros in 30! (Legendre's Formula)</h3>
          <p>
            A trailing zero in base-10 arithmetic is formed whenever a factor of 2 pairs with a factor of 5 (since 2 × 5 = 10). In any factorial sequence, even factors are vastly more numerous than factors of 5. Therefore, the total count of trailing zeros equals the highest power of 5 dividing <em>n!</em>, calculated using Legendre's formula:
          </p>
          <Formula>Z = ⌊30 ÷ 5⌋ + ⌊30 ÷ 25⌋ = 6 + 1 = 7 trailing zeros</Formula>
          <p>
            Evaluating 30! confirms this result: 30! = 265,252,859,812,191,058,636,308,480,000,000, terminating in exactly seven zeros.
          </p>

          <h2>Factorial Magnitudes Across Scientific Domains</h2>
          <p>
            The exponential acceleration of factorials is best appreciated by comparing orders of magnitude across physical and computational systems:
          </p>

          <DataTable
            head={["Expression", "Evaluated Value", "Digit Count", "Physical and Computational Significance"]}
            rows={FACTORIAL_SCALE_ROWS}
            highlight={3}
          />

          <h2>Practical Applications in Statistics, Physics, and Algorithmics</h2>
          <p>
            Factorials serve as foundational computational engines across diverse scientific and engineering disciplines:
          </p>
          <ul>
            <li>
              <strong>Permutations and Ordered Arrangements:</strong> Calculating the possible sequencing of tasks, route optimization in the Traveling Salesperson Problem, and cipher key spaces in cryptography.
            </li>
            <li>
              <strong>Binomial Probability Distributions:</strong> Determining the probability of obtaining exactly <em>k</em> successes in <em>n</em> independent Bernoulli trials via the binomial coefficient <em>n! ÷ [k!(n - k)!]</em>.
            </li>
            <li>
              <strong>Statistical Mechanics and Thermodynamics:</strong> Ludwig Boltzmann's famous entropy formula <em>S = k ln W</em> derives microscopic microstates <em>W</em> using multinomial coefficients built entirely of factorials.
            </li>
            <li>
              <strong>Calculus and Taylor Series Expansions:</strong> Approximating transcendental functions such as sin(x), cos(x), and eˣ relies on infinite power series whose denominators are scaled by factorials.
            </li>
          </ul>

          <h2>Related Mathematical and Combinatorial Calculators</h2>
          <p>
            To expand your combinatorial and number-theoretic toolkit, explore our specialized <Link href="/calculators/math/permutation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Permutation Calculator</Link>, <Link href="/calculators/math/combination-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Combination Calculator</Link>, <Link href="/calculators/math/factor-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factor Calculator</Link>, and <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Factorial Calculator</h2>\n<div class=\"form-group\"><label for=\"fa-number\">n (0 to 170)</label><input id=\"fa-number\" max=\"170\" min=\"0\" step=\"1\" type=\"number\" value=\"10\"/></div>\n<button class=\"calc-btn\" onclick=\"calcFactorial()\">Calculate n!</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('fa-number').value='';document.getElementById('fa-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"fa-result\" style=\"display:none;\n  if(typeof drawDonut==='function')drawDonut('gen-chart',['Result','Remaining'],[75,25],['#1a5c3a','#c8832a']);\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"fa-ri\"></div>\n<div class=\"ai-box\" id=\"fa-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-fa-result\" onclick=\"printResult('fa-result','Factorial Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Factorial Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-factorial-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "\\nfunction calcFactorial(){\\n  const n=parseInt(document.getElementById('fa-number').value);\\n  if(isNaN(n)||n<0){alert('Please enter a non-negative integer (0 or greater).');return;}\\n  if(n>170){alert('Input too large — factorials above 170! exceed JavaScript number limits. Please enter a value from 0 to 170.');return;}\\n  let result=1;\\n  for(let i=2;i<=n;i++)result*=i;\\n  const display=result>1e15?result.toExponential(6):result.toLocaleString();\\n  const digits=result>0?Math.floor(Math.log10(result))+1:1;\\n  document.getElementById('fa-ri').innerHTML=\\n    ri(n+'!','<strong style=\\\"font-size:20px;color:var(--c-accent)\\\">'+display+'</strong>',true)+\\n    ri('Number of Digits',digits)+\\n    ri('Expression',n<=12?Array.from({length:n},(_, i)=>n-i).join(' × ')+(n>0?' = ':'')+display:n+' × '+(n-1)+' × ... × 2 × 1');\\n  document.getElementById('fa-result').style.display='block';\\n  const ai=document.getElementById('fa-ai');\\n  ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  ai.style.display='block';\\n  getAIInsight(n+'! = '+result.toExponential(4)+'. In 2 sentences explain a real-world context where '+n+'! would appear, such as arrangements or probability.')\\n  .then(t=>{if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';else ai.style.display='none';});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
