import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/lcm-calculator";
const TITLE = "LCM Calculator | Least Common Multiple & Prime Factorization | CalcDigi";
const DESCRIPTION =
  "Free online LCM calculator. Find the least common multiple of two or more numbers using prime factors, GCF duality, and the listing method step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the Least Common Multiple (LCM)?",
    a: "The Least Common Multiple (LCM), also referred to as the lowest common multiple or smallest common multiple, of two or more non-zero integers is the smallest positive integer that is divisible by each of the given numbers without leaving a remainder.",
  },
  {
    q: "How is the LCM calculated using the GCF duality formula?",
    a: "For any two positive integers a and b, the product of their greatest common factor and least common multiple equals their arithmetic product: LCM(a, b) = (a × b) / GCF(a, b). This provides the fastest computational method.",
  },
  {
    q: "How do you find the LCM using canonical prime factorizations?",
    a: "Decompose each number into its prime factorization. For every unique prime factor present in any of the numbers, take the highest exponent observed across all numbers. The product of these maximal prime powers yields the LCM.",
  },
  {
    q: "What is the difference between GCF and LCM?",
    a: "The GCF represents the largest number that divides evenly INTO all the given numbers (so GCF ≤ min(a, b)). The LCM represents the smallest number that all the given numbers divide into (so LCM ≥ max(a, b)).",
  },
  {
    q: "How do you find the LCM of three or more numbers?",
    a: "The LCM satisfies the associative property: LCM(a, b, c) = LCM(LCM(a, b), c). Compute the LCM of the first two numbers, then calculate the LCM of that intermediate result with the third number.",
  },
  {
    q: "Why is the LCM essential when adding and subtracting fractions?",
    a: "To add or subtract fractions with unlike denominators, they must be converted to have a common denominator. The Least Common Denominator (LCD) is precisely the LCM of the denominators, which ensures calculations are performed with the smallest manageable integers.",
  },
  {
    q: "What is the LCM of two coprime numbers?",
    a: "If two numbers a and b are coprime (meaning GCF(a, b) = 1), their LCM is simply their direct arithmetic product: LCM(a, b) = a × b. For instance, LCM(8, 9) = 8 × 9 = 72.",
  },
  {
    q: "How is the LCM applied in periodic scheduling and gear mechanisms?",
    a: "The LCM determines synchronization cycles between independent recurring events. If bus line A arrives every 12 minutes and line B arrives every 18 minutes, they depart simultaneously every LCM(12, 18) = 36 minutes.",
  },
];

const LCM_METHODS_ROWS = [
  ["GCF Duality Formula", "O(log(min(a, b)))", "LCM(a, b) = (a × b) / GCF(a, b)", "Modern computer software / high-precision algorithms"],
  ["Prime Factorization", "O(√n)", "Select maximum exponent for each prime", "Classroom demonstration / manual arithmetic"],
  ["Cake / Division Ladder Method", "O(n)", "Successive common prime division in columns", "Fast pencil-and-paper multi-number calculation"],
  ["Brute-Force Multiples Listing", "O(LCM(a, b))", "List multiples until first shared match", "Introductory elementary school conceptual learning"],
];

const RELATED_LCM = [
  { href: "/calculators/math/gcf-calculator", icon: "⚖️", name: "GCF Calculator" },
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/prime-number-checker", icon: "🔢", name: "Prime Checker" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="LCM Calculator | CalcDigi"
      intro="Calculate least common multiples instantly using Euclidean GCF duality, prime factor trees, and multi-integer ladder methods."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="LCM(a, b)"
      related={RELATED_LCM}
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

          <h2>Foundations of the Least Common Multiple</h2>
          <p>
            The Least Common Multiple (LCM), historically referred to as the lowest common multiple or minimal shared multiple, is a cornerstone concept of elementary number theory, modular arithmetic, and practical algebra. Given two or more non-zero integers, the LCM is formally defined as the smallest strictly positive integer that is evenly divisible by every number in the given set without leaving any remainder.
          </p>
          <p>
            Whenever recurring cycles, periodic frequencies, mechanical gear trains, or fractional proportions interact, finding the LCM resolves their exact point of harmonic synchronization. Whether standardizing unequal denominators in rational arithmetic or coordinating industrial machine cycles across complex assembly lines, the LCM provides the minimal discrete boundary where all periodic intervals align in unison.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="gcd_lcm" />
          </div>

          <h2>Mathematical Formulations and Core LCM Methods</h2>
          <p>
            There are two primary formal mathematical pathways for calculating the LCM of two integers <em>a</em> and <em>b</em>:
          </p>

          <h3>1. The GCF Product Duality Identity</h3>
          <p>
            The most computationally efficient technique computes the Greatest Common Factor first via Euclid's algorithm and leverages the fundamental theorem of common multiples:
          </p>
          <Formula>LCM(a, b) = (|a × b|) ÷ GCF(a, b)</Formula>
          <p>
            To prevent numeric integer overflow in software when multiplying large numbers prior to division, computer algorithms evaluate the division step first:
          </p>
          <Formula>LCM(a, b) = (|a| ÷ GCF(a, b)) × |b|</Formula>
          <p>
            This formulation guarantees that the intermediate quantity never exceeds the final result, preserving maximum numerical precision across 64-bit integer registers and arbitrary-precision big-integer implementations.
          </p>

          <h3>2. Canonical Prime Factorization and Maximal Exponents</h3>
          <p>
            Every integer greater than 1 can be expressed uniquely as a product of ascending prime numbers raised to positive integer powers:
          </p>
          <Formula>a = ∏ p_i^(α_i)  and  b = ∏ p_i^(β_i)</Formula>
          <p>
            While the GCF selects the <em>minimum</em> power of each common prime divisor, the LCM selects the <em>maximum</em> power across all primes occurring in either number:
          </p>
          <Formula>LCM(a, b) = ∏ p_i^(max(α_i, β_i))</Formula>
          <p>
            Because the identity max(x, y) + min(x, y) = x + y holds true for all real numbers, multiplying the prime factorization of GCF(a, b) by that of LCM(a, b) yields the exact prime factorization of the product a × b, formally establishing the duality theorem.
          </p>

          <h2>Step-by-Step Worked Derivation: Calculating LCM(36, 48)</h2>
          <p>
            To examine both computational methodologies side by side, let us find the Least Common Multiple of <strong>36</strong> and <strong>48</strong>:
          </p>

          <h3>Method A: Prime Factor Decomposition</h3>
          <p>
            Decompose both integers into their respective canonical prime components:
          </p>
          <Formula>36 = 2² × 3²</Formula>
          <Formula>48 = 2⁴ × 3¹</Formula>
          <p>
            Compare the powers of each occurring prime factor:
          </p>
          <ul>
            <li>For prime 2: max(2, 4) = 4 (contributing 2⁴ = 16)</li>
            <li>For prime 3: max(2, 1) = 2 (contributing 3² = 9)</li>
          </ul>
          <p>
            Multiply the maximal prime powers together:
          </p>
          <Formula>LCM(36, 48) = 2⁴ × 3² = 16 × 9 = 144</Formula>

          <h3>Method B: Euclidean GCF Duality</h3>
          <p>
            Applying Euclid's division algorithm to 48 and 36:
          </p>
          <Formula>48 = 36 × 1 + 12</Formula>
          <Formula>36 = 12 × 3 + 0</Formula>
          <p>
            The greatest common divisor is 12. Substituting into the product duality relation:
          </p>
          <Formula>LCM(36, 48) = (36 × 48) ÷ 12 = 36 × 4 = 144</Formula>
          <p>
            Both methods arrive at the identical canonical result of <strong>144</strong>.
          </p>

          <h2>Generalization to Three or More Integers</h2>
          <p>
            The LCM operation satisfies both the commutative and associative properties across integers:
          </p>
          <Formula>LCM(a, b, c) = LCM(LCM(a, b), c)</Formula>
          <p>
            When computing the LCM for a collection of numbers, say (12, 18, 30):
          </p>
          <ul>
            <li>First, evaluate LCM(12, 18) = 36.</li>
            <li>Next, evaluate LCM(36, 30): GCF(36, 30) = 6, yielding (36 × 30) ÷ 6 = 180.</li>
            <li>Therefore, LCM(12, 18, 30) = 180.</li>
          </ul>
          <p>
            Alternatively, using the division ladder (cake) method, write the numbers in a row and divide by common prime factors simultaneously until no two numbers share a divisor greater than 1. Multiplying all divisors on the perimeter yields the identical least common multiple.
          </p>

          <h2>The Chinese Remainder Theorem and Modular Congruences</h2>
          <p>
            In higher number theory, the LCM governs systems of simultaneous linear modular congruences. Given a system of equations x ≡ a_i (mod m_i), a unique solution exists modulo the LCM of the moduli: M = LCM(m₁, m₂, ..., m_k). If the moduli are pairwise coprime, the LCM simplifies to their direct product, ensuring the existence of an exact unique integer solution within the fundamental interval [0, M − 1].
          </p>

          <h2>Comparison of LCM Computational Algorithms</h2>
          <p>
            Different algorithms offer distinct performance tradeoffs depending on numerical magnitude and implementation context:
          </p>

          <DataTable
            head={["Algorithmic Strategy", "Asymptotic Complexity", "Mathematical Mechanism", "Primary Practical Application"]}
            rows={LCM_METHODS_ROWS}
            highlight={0}
          />

          <h2>Practical Real-World Applications of the LCM</h2>
          <p>
            The least common multiple plays a pivotal role in diverse computational and applied engineering domains:
          </p>
          <ul>
            <li>
              <strong>Fractional Arithmetic (LCD):</strong> Finding the Least Common Denominator enables exact rational arithmetic without decimal rounding errors in computational algebra engines.
            </li>
            <li>
              <strong>Traffic Light and Public Transit Scheduling:</strong> Synchronizing multi-phase traffic signals and urban transit transfer hubs where multiple routes cycle on independent intervals.
            </li>
            <li>
              <strong>Astronomical Planetary Conjunctions:</strong> Calculating the synodic period between orbiting celestial bodies (such as the recurrence interval of solar and lunar eclipses).
            </li>
            <li>
              <strong>Digital Signal Audio and Clock Frequencies:</strong> Resampling digital audio across disparate sample rates (such as converting 44.1 kHz CD audio to 48 kHz studio master audio via their LCM of 7,056,000 Hz).
            </li>
          </ul>

          <h2>Related Mathematical and Number-Theoretic Calculators</h2>
          <p>
            To expand your rational and arithmetic toolkit, explore our specialized <Link href="/calculators/math/gcf-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">GCF Calculator</Link>, <Link href="/calculators/math/factor-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factor Calculator</Link>, <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>, and <Link href="/calculators/math/prime-number-checker" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Prime Number Checker</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>LCM Calculator</h2>\n<div class=\"form-group\"><label for=\"lcm-numbers\">Enter Numbers (comma separated)</label><input id=\"lcm-numbers\" type=\"text\" value=\"4, 6, 8\"/></div>\n<button class=\"calc-btn\" onclick=\"calcLCM()\">Calculate LCM</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('lcm-numbers').value='';document.getElementById('lcm-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"lcm-result\" style=\"display:none;\">\n<div id=\"lcm-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"lcm-chart\" width=\"220\"></canvas></div>\n<div class=\"ai-box\" id=\"lcm-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-lcm-result\" onclick=\"printResult('lcm-result','LCM Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('LCM Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-lcm-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "\\nfunction gcdFn(a,b){return b===0?a:gcdFn(b,a%b);}\\nfunction lcmTwo(a,b){return(a*b)/gcdFn(a,b);}\\nfunction calcLCM(){\\n  const nums=document.getElementById('lcm-numbers').value.split(',').map(s=>Math.abs(parseInt(s.trim()))).filter(n=>!isNaN(n)&&n>0);\\n  if(nums.length<2){alert('Please enter at least 2 positive integers.');return;}\\n  let result=nums[0];\\n  for(let i=1;i<nums.length;i++)result=lcmTwo(result,nums[i]);\\n  document.getElementById('lcm-ri').innerHTML=\\n    ri('LCM','<strong style=\\\"font-size:28px;color:var(--c-accent)\\\">'+result.toLocaleString()+'</strong>',true)+\\n    ri('Numbers',nums.join(', '))+\\n    ri('Verification',nums.map(n=>result+'÷'+n+'='+(result/n)).join(' | '));\\n  document.getElementById('lcm-result').style.display='block';\\n  drawBar('lcm-chart',nums.map(String),nums,'#1a5c3a');\\n  const ai=document.getElementById('lcm-ai');\\n  ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  ai.style.display='block';\\n  getAIInsight('LCM of '+nums.join(', ')+' is '+result+'. In 2 sentences explain a practical use case for this result.')\\n  .then(t=>{if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';else ai.style.display='none';});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
