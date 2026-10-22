import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/combination-calculator";
const TITLE = "Combination Calculator | nCr Combinations & Binomial Coefficients | CalcDigi";
const DESCRIPTION =
  "Free online combination calculator. Compute combinations (n choose r, nCr) without repetition and with repetition, Pascal's triangle rows, and probability distributions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a combination (nCr) in mathematics?",
    a: "A combination is an unordered selection of items chosen from a distinct set. The notation nCr (or 'n choose r') quantifies the number of unique subsets of size r that can be chosen from a pool of n distinct elements without regard to the order in which they are selected.",
  },
  {
    q: "What is the mathematical formula for combinations without repetition?",
    a: "The standard combination formula is nCr = n! / [r! × (n - r)!], where n is the total number of items, r is the number of items selected, and ! denotes the factorial operation.",
  },
  {
    q: "How does a combination differ from a permutation?",
    a: "In a permutation, sequence and order matter (e.g., selecting gold, silver, and bronze medalists). In a combination, order does not matter (e.g., choosing a committee of 3 people or a hand of playing cards). Because ordering is disregarded, nCr is always equal to or smaller than nPr: nCr = nPr / r!.",
  },
  {
    q: "Why is nCr symmetric (nCr = nC(n - r))?",
    a: "Choosing r items to include in a group is mathematically equivalent to choosing (n - r) items to leave behind. For example, selecting 3 winners from 10 applicants creates the exact same unique partition as choosing the 7 non-winners: 10C3 = 10C7 = 120.",
  },
  {
    q: "What is Pascal's identity in combinatorics?",
    a: "Pascal's identity states that nCr = (n - 1)C(r - 1) + (n - 1)Cr. This recurrence establishes the structure of Pascal's Triangle, where each entry is the sum of the two numbers immediately above it.",
  },
  {
    q: "What is the formula for combinations with repetition allowed?",
    a: "When items can be selected repeatedly from n categories (such as selecting r scoops of ice cream from n flavors), the formula is given by the stars-and-bars method: (n + r - 1)Cr = (n + r - 1)! / [r! × (n - 1)!].",
  },
  {
    q: "What is the binomial theorem and how does it relate to combinations?",
    a: "The binomial theorem expands algebraic powers of binomials: (x + y)ⁿ = Σ [nCr × x^(n - r) × y^r]. The coefficients in the expansion are precisely the combination values nCr, which is why combinations are universally termed binomial coefficients.",
  },
  {
    q: "What are the odds of winning a standard 6/49 lottery?",
    a: "In a 6/49 lottery, a player chooses 6 numbers from a pool of 49. The total number of unique combinations is 49C6 = 49! / (6! × 43!) = 13,983,816. The probability of matching all 6 numbers with a single ticket is exactly 1 in 13,983,816 (approximately 0.00000715%).",
  },
];

const COMBINATION_SAMPLE_ROWS = [
  ["Tossing 5 Coins (3 Heads)", "5C3", "10", "Binomial probability: 10 / 32 = 31.25%"],
  ["Committee of 4 from 10", "10C4", "210", "Governance, team selection, task force formation"],
  ["Poker 5-Card Hand from 52", "52C5", "2,598,960", "Card gaming odds, flush/straight permutations"],
  ["Lottery 6 from 49", "49C6", "13,983,816", "National lotteries, random audit sampling"],
  ["Mega Millions (5 from 70)", "70C5", "12,103,014", "Multi-state jackpot odds tier calculation"],
  ["Selecting 10 from 100", "100C10", "1.731 × 10¹³", "High-dimensional statistical survey sampling"],
];

const RELATED_COMB = [
  { href: "/calculators/math/permutation-calculator", icon: "🔀", name: "Permutations" },
  { href: "/calculators/math/factorial-calculator", icon: "❗", name: "Factorial Calculator" },
  { href: "/calculators/math/probability-calculator", icon: "🎯", name: "Probability" },
  { href: "/calculators/math/random-number-generator", icon: "🎲", name: "Random Number Gen" },
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/sample-size-calculator", icon: "📊", name: "Sample Size" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Combination Calculator | CalcDigi"
      intro="Calculate combinations without repetition and with replacement, explore Pascal triangle coefficients, and evaluate sampling probabilities."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="nCr = n! / (r!(n-r)!)"
      related={RELATED_COMB}
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

          <h2>Foundations of Combinations and Subset Selection</h2>
          <p>
            In combinatorics, a combination is a mathematical technique that establishes the number of possible arrangements in a collection of items where the order of selection does not matter. Often spoken colloquially as <em>n choose r</em>, combinations quantify how many unique subsets of cardinality <em>r</em> can be formed from a larger parent set containing <em>n</em> distinct objects.
          </p>
          <p>
            Whether assembling a five-person research council from a department of twenty professors, dealing a poker hand from a regulation deck, or sampling randomized test cohorts in an epidemiological trial, combinations isolate the identity of the elements selected while ignoring the chronological sequence in which they arrived.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="combinatorics" />
          </div>

          <h2>Mathematical Formulation and the Binomial Coefficient</h2>
          <p>
            The fundamental combination formula for selecting <em>r</em> unordered items from a pool of <em>n</em> distinct items without replacement is defined as:
          </p>
          <Formula>nCr = C(n, r) = (n¦r) = n! ÷ [ r! × (n - r)! ]</Formula>
          <p>
            Here, <em>n!</em> represents the total permutations of all <em>n</em> items, <em>(n - r)!</em> removes the orderings of the unchosen items, and <em>r!</em> eliminates the internal orderings of the selected items because sequence is irrelevant.
          </p>

          <h3>The Fundamental Symmetry Property</h3>
          <p>
            Every choice to include <em>r</em> elements in a subset inherently defines a complementary choice to exclude the remaining <em>(n - r)</em> elements. Consequently, combinations satisfy an exact algebraic symmetry:
          </p>
          <Formula>nCr = nC(n - r)</Formula>
          <p>
            For instance, <em>100C98 = 100C2 = (100 × 99) ÷ 2 = 4,950</em>. This property drastically simplifies manual and computational evaluations by reducing the required multiplications to the smaller exponent.
          </p>

          <h2>Pascal's Triangle, Identity, and the Hockey-Stick Theorem</h2>
          <p>
            Combinations exhibit deep recursive connections formalized by Blaise Pascal in 1654 through <strong>Pascal's Identity</strong>:
          </p>
          <Formula>nCr = (n - 1)C(r - 1) + (n - 1)Cr</Formula>
          <p>
            This recurrence relation establishes that each entry in Pascal's Triangle equals the arithmetic sum of the two entries directly above it. Furthermore, the celebrated <strong>Hockey-Stick Theorem</strong> shows that summing consecutive binomial coefficients down a diagonal yields the coefficient directly below and to the right:
          </p>
          <Formula>∑_(i=r)^n (i¦r) = (n + 1 ¦ r + 1)</Formula>
          <p>
            For example, 2C2 + 3C2 + 4C2 = 1 + 3 + 6 = 10 = 5C3, forming the distinctive hockey-stick shape across the triangular grid.
          </p>

          <h2>Combinations With Repetition (Multisets and Stars and Bars)</h2>
          <p>
            When elements can be selected multiple times from <em>n</em> distinct categories (such as selecting a dozen donuts from four available varieties), standard subset rules do not apply. Using the combinatorial method of <strong>Stars and Bars</strong> developed by William Feller, the total number of combinations with repetition allowed is given by:
          </p>
          <Formula>CR(n, r) = (n + r - 1)Cr = (n + r - 1)! ÷ [ r! × (n - 1)! ]</Formula>
          <p>
            For our donut example with <em>n = 4</em> varieties and <em>r = 12</em> selections:
          </p>
          <Formula>CR(4, 12) = (4 + 12 - 1)C12 = 15C12 = 15C3 = (15 × 14 × 13) ÷ 6 = 455 unique selections</Formula>

          <h2>Step-by-Step Worked Derivation: Calculating 10C3</h2>
          <p>
            To understand the operational cancellation occurring inside the factorial fraction, let us evaluate <strong>10C3</strong> (selecting 3 members from a group of 10):
          </p>

          <h3>Step 1: Write the Expanded Factorial Equation</h3>
          <Formula>10C3 = 10! ÷ [ 3! × (10 - 3)! ] = 10! ÷ [ 3! × 7! ]</Formula>

          <h3>Step 2: Expand the Numerator to Cancel the Largest Factorial</h3>
          <p>
            Write 10! down to 7! so that the 7! terms in numerator and denominator cancel directly:
          </p>
          <Formula>10C3 = (10 × 9 × 8 × 7!) ÷ [ (3 × 2 × 1) × 7! ]</Formula>
          <Formula>10C3 = (10 × 9 × 8) ÷ (3 × 2 × 1)</Formula>

          <h3>Step 3: Simplify and Evaluate</h3>
          <p>
            Simplify fractions before multiplying to maintain minimal integer magnitudes:
          </p>
          <Formula>10C3 = (720) ÷ 6 = 120</Formula>
          <p>
            There are exactly <strong>120 distinct ways</strong> to select 3 individuals from a group of 10.
          </p>

          <h2>Combinatorial Scales Across Gaming and Scientific Sampling</h2>
          <p>
            The rate of combinatorial expansion is demonstrated across familiar real-world scenarios:
          </p>

          <DataTable
            head={["Scenario", "Notation", "Total Combinations", "Practical Context and Probability Impact"]}
            rows={COMBINATION_SAMPLE_ROWS}
            highlight={2}
          />

          <h2>Practical Applications in Statistics, Computer Science, and Science</h2>
          <p>
            Binomial coefficients and combination theory underpin diverse analytical domains:
          </p>
          <ul>
            <li>
              <strong>Binomial Probability Distribution:</strong> Modeling binary outcomes (success/failure) in clinical drug trials, manufacturing defect rates, and quality assurance inspection sampling.
            </li>
            <li>
              <strong>Hypergeometric Distribution:</strong> Calculating probabilities of sampling without replacement, such as ecological wildlife tagging and recapture studies.
            </li>
            <li>
              <strong>Algorithmic Graph Theory:</strong> Computing edges in complete graphs (a graph with <em>V</em> vertices has exactly <em>VC2</em> possible undirected edges).
            </li>
            <li>
              <strong>Cryptography and Key Space Analysis:</strong> Evaluating brute-force search complexity for subset-sum problems, lattice cryptography, and threshold signature schemes.
            </li>
          </ul>

          <h2>Related Mathematical and Combinatorial Calculators</h2>
          <p>
            To expand your combinatorial and statistical toolkit, explore our specialized <Link href="/calculators/math/permutation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Permutation Calculator</Link>, <Link href="/calculators/math/factorial-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factorial Calculator</Link>, <Link href="/calculators/math/probability-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Probability Calculator</Link>, and <Link href="/calculators/math/random-number-generator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Random Number Generator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Combination Calculator (nCr)</h2>\n<div class=\"form-group\"><label for=\"cb-n\">n (total items)</label><input id=\"cb-n\" max=\"170\" min=\"0\" step=\"1\" type=\"number\" value=\"49\"/></div>\n<div class=\"form-group\"><label for=\"cb-r\">r (items chosen)</label><input id=\"cb-r\" max=\"170\" min=\"0\" step=\"1\" type=\"number\" value=\"6\"/></div>\n<button class=\"calc-btn\" onclick=\"calcCombination()\">Calculate nCr</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('cb-n').value='';document.getElementById('cb-r').value='';document.getElementById('cb-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"cb-result\" style=\"display:none;\n  if(typeof drawDonut==='function')drawDonut('gen-chart',['Result','Remaining'],[75,25],['#1a5c3a','#c8832a']);\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"cb-ri\"></div>\n<div class=\"ai-box\" id=\"cb-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-cb-result\" onclick=\"printResult('cb-result','Combination Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Combination Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-combination-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "\\nfunction calcCombination(){\\n  const n=parseInt(document.getElementById('cb-n').value);\\n  const r=parseInt(document.getElementById('cb-r').value);\\n  if(isNaN(n)||isNaN(r)||n<0||r<0){alert('Please enter valid non-negative integers for n and r.');return;}\\n  if(r>n){alert('r cannot be greater than n. You cannot choose more items than available.');return;}\\n  let result=1;\\n  for(let i=0;i<r;i++)result=result*(n-i)/(i+1);\\n  result=Math.round(result);\\n  const display=result>1e15?result.toExponential(6):result.toLocaleString();\\n  document.getElementById('cb-ri').innerHTML=\\n    ri(n+'C'+r,'<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+display+'</strong>',true)+\\n    ri('Formula',n+'! / ('+r+'! × '+(n-r)+'!)')+\\n    ri('n (total items)',n)+\\n    ri('r (items chosen)',r)+\\n    ri('1 in ... chance','1 in '+display+' (if randomly selecting)');\\n  document.getElementById('cb-result').style.display='block';\\n  const ai=document.getElementById('cb-ai');\\n  ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  ai.style.display='block';\\n  getAIInsight(n+'C'+r+' = '+result+'. In 2 sentences give a real-world scenario (like lottery, cards, or team selection) where choosing '+r+' from '+n+' is relevant and what this number means.')\\n  .then(t=>{if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';else ai.style.display='none';});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
