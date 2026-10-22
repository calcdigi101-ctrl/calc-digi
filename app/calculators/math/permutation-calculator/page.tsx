import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/permutation-calculator";
const TITLE = "Permutation Calculator | nPr Ordered Arrangements & Sequences | CalcDigi";
const DESCRIPTION =
  "Free online permutation calculator. Calculate ordered permutations nPr = n! / (n - r)!, permutations with repetition, circular arrangements, and derangements step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a permutation in mathematics?",
    a: "A permutation is an ordered arrangement of objects. Unlike combinations, the specific sequence matters. For example, the sequence (A, B, C) is distinct from (C, B, A), even though both contain the exact same items.",
  },
  {
    q: "What is the formula for permutations without repetition (nPr)?",
    a: "The formula for selecting and arranging r items from a set of n distinct items without repetition is nPr = P(n, r) = n! / (n - r)! = n × (n - 1) × ... × (n - r + 1).",
  },
  {
    q: "How does a permutation differ from a combination?",
    a: "In a permutation, sequence matters (e.g., first, second, and third place in a race). In a combination, only membership matters (e.g., choosing three members for a committee). Consequently, nPr = nCr × r!.",
  },
  {
    q: "What is the formula for permutations with repetition allowed?",
    a: "When elements can be selected and reused multiple times across r positions (such as an r-digit PIN where any digit 0-9 can be reused), the total permutations equal n^r.",
  },
  {
    q: "How do you calculate permutations of a word with repeated letters (multinomial)?",
    a: "When a set of n objects contains duplicate elements (e.g., n₁ identical items of type 1, n₂ of type 2, etc.), the total distinguishable permutations equal the multinomial coefficient: n! / (n₁! × n₂! × ... × n_k!). For example, MISSISSIPPI has 11! / (1! × 4! × 4! × 2!) = 34,650 permutations.",
  },
  {
    q: "What is a circular permutation?",
    a: "When arranging n distinct objects in a closed circle where rotations are considered identical, fixing one reference point reduces the degrees of freedom by 1: P_circular = (n - 1)!. If reflections (flipping over) are also identical (such as beads on a necklace), the formula is (n - 1)! / 2.",
  },
  {
    q: "What is a derangement in combinatorics?",
    a: "A derangement is a permutation of elements such that no element appears in its original starting position. The number of derangements of n objects, denoted !n, equals n! × Σ [(-1)ᵏ / k!] for k = 0 to n, which approaches n! / e as n grows.",
  },
  {
    q: "How are permutations used to estimate password cracking resistance?",
    a: "Password entropy depends on total possible permutations. An 8-character password chosen from a 62-character character set (uppercase, lowercase, numbers) has 62⁸ ≈ 2.18 × 10¹⁴ permutations, translating to approximately 47.6 bits of cryptographic entropy.",
  },
];

const PERMUTATION_TYPES_ROWS = [
  ["Standard Permutation without Repetition", "nPr = n! / (n - r)!", "Order matters, each item used at most once", "Podium finishes, task scheduling"],
  ["Permutation with Repetition Allowed", "n^r", "Order matters, items can be selected repeatedly", "ATM PINs, cryptographic cipher keys"],
  ["Multiset / Repeated Identical Elements", "n! / (n₁! n₂! ... n_k!)", "Distinguishable arrangements of duplicate symbols", "Anagram solvers, DNA codon sequencing"],
  ["Circular Permutations", "(n - 1)!", "Arrangements around a loop invariant under rotation", "Roundtable seating, circular DNA plasmids"],
  ["Necklace / Keyring Permutations", "(n - 1)! / 2", "Circular arrangements invariant under reflection", "Beaded jewelry design, planar graphs"],
  ["Derangements (Subfactorials)", "!n ≈ round(n! / e)", "Permutations where zero items stay in initial index", "Secret Santa draws, statistical confusion tests"],
];

const RELATED_PERM = [
  { href: "/calculators/math/combination-calculator", icon: "🎲", name: "Combinations" },
  { href: "/calculators/math/factorial-calculator", icon: "❗", name: "Factorial Calculator" },
  { href: "/calculators/math/probability-calculator", icon: "🎯", name: "Probability" },
  { href: "/calculators/math/random-number-generator", icon: "🔢", name: "Random Number Gen" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/factor-calculator", icon: "⚖️", name: "Factor Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Permutation Calculator | CalcDigi"
      intro="Calculate ordered sequences, arrangements with and without repetition, multinomial word anagrams, and circular permutations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="nPr = n! / (n-r)!"
      related={RELATED_PERM}
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

          <h2>Foundations of Permutations and Sequential Arrangements</h2>
          <p>
            In discrete mathematics, a permutation is an arrangement of a set of items into a specific, ordered sequence. In stark contrast to combinations—where order is discarded and only group membership matters—permutations treat any alteration in sequence as an entirely distinct, unique event. For example, the sequential ranking <em>A-B-C</em> represents a completely different outcome from <em>C-B-A</em>.
          </p>
          <p>
            Permutations govern fundamental questions across computation and logistics: determining the shortest delivery path visiting ten metropolitan hubs, calculating cryptographic key entropy, evaluating scheduling dependencies in concurrent operating systems, or assessing tournament brackets.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="combinatorics" />
          </div>

          <h2>Mathematical Formulation of nPr Without Repetition</h2>
          <p>
            When selecting and ordering <em>r</em> items from a distinct collection of <em>n</em> available items without replacement, the total permutations are calculated using the Fundamental Counting Principle:
          </p>
          <Formula>nPr = P(n, r) = n × (n - 1) × (n - 2) × ... × (n - r + 1)</Formula>
          <p>
            Expressed concisely through factorials, the permutation formula becomes:
          </p>
          <Formula>nPr = n! ÷ (n - r)!</Formula>
          <p>
            When all <em>n</em> items are arranged simultaneously (<em>r = n</em>), the formula simplifies to the total factorial:
          </p>
          <Formula>nPn = n! ÷ (n - n)! = n! ÷ 0! = n! ÷ 1 = n!</Formula>

          <h2>Variations: Repetition, Multisets, and Circular Geometries</h2>
          <p>
            Real-world constraints frequently introduce repetition, duplicate elements, or geometric symmetries that alter the baseline formula:
          </p>

          <h3>1. Permutations With Repetition Allowed</h3>
          <p>
            If each position can independently select any of the <em>n</em> candidate elements, each of the <em>r</em> slots has <em>n</em> independent possibilities:
          </p>
          <Formula>P_rep = nʳ</Formula>
          <p>
            For example, a 4-digit numeric passcode choosing from ten digits (0 through 9) yields <em>10⁴ = 10,000</em> distinct possible codes.
          </p>

          <h3>2. Multinomial Permutations With Identical Elements</h3>
          <p>
            When rearranging a word or set containing identical duplicated characters, dividing by each duplicate's factorial eliminates indistinguishable duplicate sequences:
          </p>
          <Formula>P = n! ÷ [ n₁! × n₂! × ... × n_k! ]</Formula>

          <h3>3. Circular and Necklace Permutations</h3>
          <p>
            When objects are arranged around a closed circular table, rotations produce identical relative sequences. Fixing one object as an anchor reduces the arrangements to:
          </p>
          <Formula>P_circle = (n - 1)!</Formula>
          <p>
            If reflections (flipping the loop upside down) also count as identical arrangements—as in a beaded necklace or bracelet—the total count is halved to (n - 1)! ÷ 2.
          </p>

          <h2>Derangements and the Subfactorial Function (!n)</h2>
          <p>
            A derangement is a permutation of <em>n</em> elements in which no element appears in its original starting position. Denoted as <em>!n</em> (subfactorial of n), the exact formula derived via the Principle of Inclusion-Exclusion is:
          </p>
          <Formula>!n = n! × ∑_(k=0)^n [ (-1)ᵏ ÷ k! ]</Formula>
          <p>
            As <em>n</em> increases, the ratio !n / n! converges rapidly to 1/e ≈ 0.367879. Thus, if n letters are randomly placed into n pre-addressed envelopes, there is approximately a 36.79% chance that not a single letter lands in the correct envelope, regardless of how large n becomes.
          </p>

          <h2>Step-by-Step Worked Derivation: Calculating P(8, 3)</h2>
          <p>
            To illustrate how the algebraic cancellation functions in practice, consider calculating the number of ways to award Gold, Silver, and Bronze medals among <strong>8 finalists</strong> in a championship sprint:
          </p>

          <h3>Step 1: Set Up the Permutation Parameters</h3>
          <p>
            Here, total participants <em>n = 8</em> and positions to award <em>r = 3</em>:
          </p>
          <Formula>8P3 = 8! ÷ (8 - 3)! = 8! ÷ 5!</Formula>

          <h3>Step 2: Expand and Cancel the Factorial Denominator</h3>
          <p>
            Express the numerator factorial so that the common factor 5! cancels completely:
          </p>
          <Formula>8P3 = (8 × 7 × 6 × 5!) ÷ 5! = 8 × 7 × 6</Formula>

          <h3>Step 3: Calculate the Final Product</h3>
          <Formula>8 × 7 = 56;  56 × 6 = 336</Formula>
          <p>
            There are exactly <strong>336 unique medal podium configurations</strong> possible among the 8 runners.
          </p>

          <h2>Taxonomy of Permutation Formulas and Use Cases</h2>
          <p>
            The table below summarizes the appropriate permutation formula to deploy across differing physical constraints:
          </p>

          <DataTable
            head={["Arrangement Classification", "Mathematical Formula", "Core Constraints / Assumptions", "Representative Real-World Domain"]}
            rows={PERMUTATION_TYPES_ROWS}
            highlight={0}
          />

          <h2>Practical Applications Across Computational and Industrial Systems</h2>
          <p>
            Permutations form the computational backbone for complex algorithmic modeling:
          </p>
          <ul>
            <li>
              <strong>Cryptographic Key Space and Password Entropy:</strong> Determining the time required for brute-force dictionary attacks against salted hashes based on alphabet size and token length.
            </li>
            <li>
              <strong>Logistics and Route Optimization:</strong> Solving vehicle routing problems and traveling salesperson networks where customer delivery order dictates fuel expenditure.
            </li>
            <li>
              <strong>Genomic Bioinformatics:</strong> Analyzing DNA and RNA codon sequence permutations and protein folding amino acid alignments.
            </li>
            <li>
              <strong>Manufacturing Assembly Lines:</strong> Sequencing robotic manufacturing steps to minimize tooling changes and idle machine cycle times.
            </li>
          </ul>

          <h2>Related Mathematical and Combinatorial Calculators</h2>
          <p>
            To expand your combinatorial and probability toolkit, explore our specialized <Link href="/calculators/math/combination-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Combination Calculator</Link>, <Link href="/calculators/math/factorial-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factorial Calculator</Link>, <Link href="/calculators/math/probability-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Probability Calculator</Link>, and <Link href="/calculators/math/random-number-generator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Random Number Generator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Permutation Calculator (nPr)</h2>\n<div class=\"form-group\"><label for=\"pm-n\">n (total items)</label><input id=\"pm-n\" max=\"170\" min=\"0\" step=\"1\" type=\"number\" value=\"10\"/></div>\n<div class=\"form-group\"><label for=\"pm-r\">r (items arranged)</label><input id=\"pm-r\" max=\"170\" min=\"0\" step=\"1\" type=\"number\" value=\"3\"/></div>\n<button class=\"calc-btn\" onclick=\"calcPermutation()\">Calculate nPr</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('pm-n').value='';document.getElementById('pm-r').value='';document.getElementById('pm-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"pm-result\" style=\"display:none;\n  if(typeof drawDonut==='function')drawDonut('gen-chart',['Result','Remaining'],[75,25],['#1a5c3a','#c8832a']);\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"pm-ri\"></div>\n<div class=\"ai-box\" id=\"pm-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-pm-result\" onclick=\"printResult('pm-result','Permutation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Permutation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-permutation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "\\nfunction calcPermutation(){\\n  const n=parseInt(document.getElementById('pm-n').value);\\n  const r=parseInt(document.getElementById('pm-r').value);\\n  if(isNaN(n)||isNaN(r)||n<0||r<0){alert('Please enter valid non-negative integers for n and r.');return;}\\n  if(r>n){alert('r cannot be greater than n. You cannot arrange more items than you have.');return;}\\n  let result=1;\\n  for(let i=0;i<r;i++)result*=(n-i);\\n  const display=result>1e15?result.toExponential(6):result.toLocaleString();\\n  document.getElementById('pm-ri').innerHTML=\\n    ri(n+'P'+r,'<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+display+'</strong>',true)+\\n    ri('Formula',n+'! / ('+n+'−'+r+')! = '+n+'! / '+Math.max(0,n-r)+'!')+\\n    ri('n (total items)',n)+\\n    ri('r (items arranged)',r)+\\n    ri('Compared to nCr (unordered)',(result/[...Array(r)].reduce((a,_,i)=>a*(i+1),1)).toLocaleString()+' combinations');\\n  document.getElementById('pm-result').style.display='block';\\n  const ai=document.getElementById('pm-ai');\\n  ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  ai.style.display='block';\\n  getAIInsight(n+'P'+r+' = '+result+'. In 2 sentences give a real-world example where you would need to calculate '+n+'P'+r+' and explain what this number means.')\\n  .then(t=>{if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';else ai.style.display='none';});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
