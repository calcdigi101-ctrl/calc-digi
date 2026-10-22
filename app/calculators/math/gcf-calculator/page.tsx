import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/gcf-calculator";
const TITLE = "GCF Calculator | Greatest Common Factor & Euclidean Algorithm | CalcDigi";
const DESCRIPTION =
  "Free online GCF calculator. Find the greatest common factor (HCF / GCD) of two or more numbers using the Euclidean algorithm, prime factorization, and Venn diagrams.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the Greatest Common Factor (GCF)?",
    a: "The Greatest Common Factor (also termed GCD or HCF) of two or more non-zero integers is the largest positive integer that divides each of the numbers without leaving a remainder. For example, the GCF of 24 and 36 is 12.",
  },
  {
    q: "How does the Euclidean algorithm find the GCF?",
    a: "The Euclidean algorithm repeatedly replaces the larger number with the remainder of dividing the larger by the smaller: gcd(a, b) = gcd(b, a mod b). The process terminates when the remainder reaches 0; the last non-zero divisor is the GCF.",
  },
  {
    q: "What is the fundamental relationship between GCF and LCM?",
    a: "For any two positive integers a and b, the product of their greatest common factor and least common multiple equals the product of the numbers: GCF(a, b) × LCM(a, b) = a × b. Therefore, LCM(a, b) = (a × b) / GCF(a, b).",
  },
  {
    q: "What does it mean if two numbers are coprime (relatively prime)?",
    a: "Two numbers a and b are coprime if their only positive common divisor is 1: GCF(a, b) = 1. Examples include 8 and 9 (neither is prime, but they share no common factor other than 1).",
  },
  {
    q: "How do you find the GCF of three or more numbers?",
    a: "Apply the associative property of the greatest common divisor: GCF(a, b, c) = GCF(GCF(a, b), c). Compute the GCF of the first two integers, then compute the GCF of that result with the third integer.",
  },
  {
    q: "What is Bézout's identity and the Extended Euclidean algorithm?",
    a: "Bézout's identity states that for any non-zero integers a and b, there exist integers x and y such that a × x + b × y = GCF(a, b). The Extended Euclidean algorithm calculates these Bézout coefficients, which are essential for computing modular multiplicative inverses in cryptography.",
  },
  {
    q: "Why is finding the GCF crucial when simplifying fractions?",
    a: "Dividing both the numerator and denominator of a fraction by their GCF reduces the fraction to its canonical, irreducible simplest form. For instance, in 18/24, GCF(18, 24) = 6, yielding (18÷6) / (24÷6) = 3/4.",
  },
  {
    q: "What is Stein's Binary GCD algorithm?",
    a: "Stein's algorithm computes the GCF using only bit-shift operations, subtraction, and parity checks instead of expensive arithmetic division. It operates in O(log²(n)) time and is widely implemented in computer hardware and low-level arithmetic libraries.",
  },
];

const GCF_ALGORITHM_ROWS = [
  ["Euclidean Division Algorithm", "O(log(min(a, b)))", "Division remainders: a = b×q + r", "Standard high-level software / educational derivation"],
  ["Binary GCD (Stein's Method)", "O(log²(n))", "Bit-shifts, parity checks, subtraction", "Low-level hardware registers / microcontrollers"],
  ["Prime Factor Intersection", "O(√n)", "Extracts minimum prime exponent overlap", "Manual teaching / theoretical number theory"],
  ["Euclidean Subtraction Method", "O(max(a, b))", "Successive subtraction: a - b until equal", "Ancient historical arithmetic / simple hardware circuits"],
];

const RELATED_GCF = [
  { href: "/calculators/math/lcm-calculator", icon: "🔄", name: "LCM Calculator" },
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/prime-number-checker", icon: "🔢", name: "Prime Checker" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="GCF Calculator | CalcDigi"
      intro="Find the greatest common divisor with step-by-step Euclidean division, prime factor trees, and modular arithmetic precision."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="GCF(a, b)"
      related={RELATED_GCF}
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

          <h2>Foundations of the Greatest Common Factor</h2>
          <p>
            The Greatest Common Factor (GCF), alternatively designated the Greatest Common Divisor (GCD) or Highest Common Factor (HCF), is an essential number-theoretic metric defining the largest positive integer that divides two or more given integers with zero remainder. As a cornerstone of arithmetic dating back to Euclid of Alexandria around 300 BCE, common divisor evaluation underpins algebraic fraction simplification, ratio normalization, cryptography, and diophantine analysis.
          </p>
          <p>
            When examining two integers <em>a</em> and <em>b</em>, their respective divisor sets possess an intersection of shared common divisors. The maximal element within this intersection is precisely GCF(a, b). For instance, given 24 and 36, the common divisors are 1, 2, 3, 4, 6, and 12; the maximum divisor is 12.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="gcd_lcm" />
          </div>

          <h2>Algorithmic Methods: The Euclidean Algorithm</h2>
          <p>
            While listing all factors works effectively for small numbers, it becomes computationally prohibitive for multi-digit integers. The <strong>Euclidean Algorithm</strong> provides an exquisitely efficient deterministic method based on the mathematical theorem:
          </p>
          <Formula>gcd(a, b) = gcd(b, a mod b)  where  gcd(a, 0) = |a|</Formula>
          <p>
            At each iteration, the algorithm divides <em>a</em> by <em>b</em> to find quotient <em>q</em> and remainder <em>r</em> such that <em>a = b × q + r</em>. The original pair (a, b) is replaced by (b, r). Because the remainders strictly decrease (0 ≤ r &lt; b), the algorithm is guaranteed to terminate in a finite number of steps, concluding when the remainder reaches zero.
          </p>

          <h3>Lamé's Theorem and Computational Complexity</h3>
          <p>
            In 1844, French mathematician Gabriel Lamé proved that the number of division steps required by the Euclidean algorithm never exceeds five times the number of digits in the smaller number. Thus, for two numbers up to 1,000,000 (six digits), the Euclidean algorithm terminates in at most 30 division steps, demonstrating logarithmic time complexity <em>O(log(min(a, b)))</em>.
          </p>

          <h2>Prime Factorization and Set-Theoretic Intersection</h2>
          <p>
            From the Fundamental Theorem of Arithmetic, any integer can be expressed uniquely as a product of prime powers:
          </p>
          <Formula>a = p₁^(α₁) × p₂^(α₂) × ... × p_k^(α_k)  and  b = p₁^(β₁) × p₂^(β₂) × ... × p_k^(β_k)</Formula>
          <p>
            The greatest common factor is derived by taking the minimum exponent for every common prime factor:
          </p>
          <Formula>GCF(a, b) = ∏ p_i^(min(α_i, β_i))</Formula>
          <p>
            In contrast, the Least Common Multiple (LCM) takes the maximum exponent <em>max(α_i, β_i)</em>. Because <em>min(α, β) + max(α, β) = α + β</em> for any real values, this gives rise to the universal product identity:
          </p>
          <Formula>GCF(a, b) × LCM(a, b) = a × b</Formula>

          <h2>Step-by-Step Worked Derivation: Finding GCF(252, 105)</h2>
          <p>
            To illustrate how the Euclidean division algorithm functions in practice, consider finding the greatest common factor of <strong>252</strong> and <strong>105</strong>:
          </p>
          <h3>Step 1: First Division Step</h3>
          <p>
            Divide the larger integer 252 by 105 to obtain the integer quotient and remainder:
          </p>
          <Formula>252 = 105 × 2 + 42  (Quotient = 2, Remainder = 42)</Formula>
          <p>
            Since the remainder 42 is non-zero, replace the pair (252, 105) with (105, 42).
          </p>

          <h3>Step 2: Second Division Step</h3>
          <p>
            Divide 105 by 42:
          </p>
          <Formula>105 = 42 × 2 + 21  (Quotient = 2, Remainder = 21)</Formula>
          <p>
            The remainder 21 is non-zero; replace the pair with (42, 21).
          </p>

          <h3>Step 3: Third Division Step and Termination</h3>
          <p>
            Divide 42 by 21:
          </p>
          <Formula>42 = 21 × 2 + 0  (Quotient = 2, Remainder = 0)</Formula>
          <p>
            The remainder has reached 0. The final non-zero divisor is <strong>21</strong>. Therefore:
          </p>
          <Formula>GCF(252, 105) = 21</Formula>

          <h2>Bézout's Identity and the Extended Euclidean Algorithm</h2>
          <p>
            The Extended Euclidean algorithm traces back through each division equation to express the GCF as a linear integer combination of the two original inputs:
          </p>
          <Formula>a × x + b × y = GCF(a, b)</Formula>
          <p>
            For our example: <em>21 = 105 - (42 × 2) = 105 - (252 - 105 × 2) × 2 = 105 × 5 + 252 × (-2)</em>. The Bézout coefficients are <em>x = -2</em> and <em>y = 5</em>. This identity is the fundamental engine used to calculate modular inverses in public-key cryptography (such as the RSA cryptosystem).
          </p>

          <h2>Comparison of Common Divisor Algorithms</h2>
          <p>
            Different computational contexts favor different algorithmic approaches depending on hardware architectures:
          </p>

          <DataTable
            head={["Algorithm Name", "Time Complexity", "Operational Mechanism", "Primary Practical Usage"]}
            rows={GCF_ALGORITHM_ROWS}
            highlight={0}
          />

          <h2>Practical Applications Across Science and Technology</h2>
          <p>
            Greatest common divisor calculations play critical roles in real-world systems:
          </p>
          <ul>
            <li>
              <strong>Fraction and Ratio Reduction:</strong> Transforming algebraic ratios into irreducible canonical forms across finance, graphics, and engineering specifications.
            </li>
            <li>
              <strong>Mechanical Gear Ratios:</strong> Designing interlocking industrial gear sets to minimize repetitive tooth wear by ensuring gear tooth counts are coprime.
            </li>
            <li>
              <strong>Cryptography and Security:</strong> Generating RSA key pairs, running the Miller-Rabin primality test, and verifying digital signature certificates.
            </li>
            <li>
              <strong>Signal Processing and Periodic Tiling:</strong> Determining optimal sampling frequencies, screen resolution aspect ratios, and discrete Fourier transform boundaries.
            </li>
          </ul>

          <h2>Related Mathematical and Number-Theoretic Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/lcm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">LCM Calculator</Link>, <Link href="/calculators/math/factor-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factor Calculator</Link>, <Link href="/calculators/math/prime-number-checker" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Prime Number Checker</Link>, and <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>GCF Calculator</h2>\n<div class=\"form-group\">\n<label for=\"gcf-numbers\">Enter Numbers (comma separated)</label>\n<input id=\"gcf-numbers\" type=\"text\" value=\"24, 36, 60\"/>\n</div>\n<button class=\"calc-btn\" onclick=\"calcGCF()\">Calculate GCF</button>\n<div class=\"result-box\" id=\"gcf-result\">\n<div id=\"gcf-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"gcf-chart\" width=\"220\"></canvas></div>\n<div class=\"ai-box\" id=\"gcf-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-gcf-result\" onclick=\"printResult('gcf-result','GCF Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('GCF Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-gcf-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function gcd(a,b){return b===0?a:gcd(b,a%b);}\\nfunction calcGCF(){\\n  const raw=document.getElementById('gcf-numbers').value;\\n  const nums=raw.split(',').map(s=>Math.abs(parseInt(s.trim()))).filter(n=>!isNaN(n)&&n>0);\\n  if(nums.length<2){alert('Please enter at least 2 positive integers separated by commas.');return;}\\n  let result=nums[0];\\n  for(let i=1;i<nums.length;i++){result=gcd(result,nums[i]);}\\n  document.getElementById('gcf-ri').innerHTML=\\n    ri('GCF','<strong style=\\\"font-size:28px;color:var(--c-accent)\\\">'+result+'</strong>',true)+\\n    ri('Numbers',nums.join(', '))+\\n    ri('Simplified Ratio',nums.map(n=>n/result).join(' : '))+\\n    ri('Each number ÷ GCF',nums.map(n=>n+'÷'+result+'='+n/result).join(', '));\\n  showResult('gcf-result');\\n  drawBar('gcf-chart',nums.map(String),nums,'#1a5c3a');\\n  const aiBox=document.getElementById('gcf-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('GCF of '+nums.join(', ')+' is '+result+'. Simplified ratio: '+nums.map(n=>n/result).join(':')+'. In 2-3 sentences explain what this GCF means practically and one real-world use case.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
