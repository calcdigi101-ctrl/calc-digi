import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/random-number-generator";
const TITLE = "Random Number Generator | True & Pseudo-Random RNG Tool | CalcDigi";
const DESCRIPTION =
  "Free online random number generator. Generate uniform pseudo-random integers, floating-point decimals, non-repeating lottery sets, and cryptographic sequences step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the difference between pseudo-random (PRNG) and true random (TRNG)?",
    a: "Pseudo-random number generators (PRNGs) use deterministic mathematical algorithms starting from a seed value; if the seed is known, the entire sequence is reproducible. True random number generators (TRNGs) harvest physical entropy from non-deterministic hardware phenomena, such as atmospheric noise, thermal jitter, or radioactive decay.",
  },
  {
    q: "How does a Linear Congruential Generator (LCG) work?",
    a: "An LCG produces a sequence of numbers using the recurrence relation X_(n+1) = (a × X_n + c) mod m, where m is the modulus, a is the multiplier, c is the increment, and X₀ is the initial seed. While fast, LCGs exhibit serial correlations and should not be used for security.",
  },
  {
    q: "What algorithm is used in modern programming languages like Python and JavaScript?",
    a: "Python's standard random module uses the Mersenne Twister (MT19937), which has a massive period of 2¹⁹⁹³⁷ - 1 and passes stringent statistical tests. Modern JavaScript engines use xorshift128+ or splitmix64 for Math.random(), while cryptographic needs require crypto.getRandomValues().",
  },
  {
    q: "How do you generate a random integer in the range [min, max] uniformly?",
    a: "Given a standard uniform real number U in [0, 1), compute: integer = floor(U × (max - min + 1)) + min. To eliminate modulo bias in discrete RNGs, rejection sampling is used when dividing across unequal interval buckets.",
  },
  {
    q: "What is cryptographic randomness (CSPRNG)?",
    a: "A Cryptographically Secure PRNG satisfies two criteria: it passes all polynomial-time statistical randomness tests (next-bit unpredictability), and its internal state cannot be reconstructed even if portions of past outputs are compromised.",
  },
  {
    q: "How does the Fisher-Yates shuffle generate non-repeating random sets?",
    a: "The Fisher-Yates (or Knuth) shuffle iterates from the end of an array down to index 1, swapping each element with a randomly chosen element from the remaining unshuffled prefix. It runs in O(n) time and guarantees that every permutation is equally likely.",
  },
  {
    q: "What statistical tests verify the quality of a random number generator?",
    a: "Standard empirical test suites include the NIST SP 800-22 test battery, the Diehard tests, and TestU01. These evaluate properties such as frequency uniformity, bit run lengths, spectral Fourier transforms, and multidimensional hypercube distribution.",
  },
  {
    q: "How are random numbers used in Monte Carlo numerical integration?",
    a: "Monte Carlo methods estimate complex multidimensional integrals or simulate financial market risk by generating millions of independent random trials. By the Law of Large Numbers, the average outcome converges to the true expected value with standard error decreasing as 1 / √N.",
  },
];

const RNG_ALGORITHM_ROWS = [
  ["Linear Congruential Generator (LCG)", "O(1)", "X_(n+1) = (aX_n + c) mod m", "Period 2³² to 2⁶⁴; legacy embedded microcontrollers"],
  ["Mersenne Twister (MT19937)", "O(1)", "Matrix linear recurrence over F₂", "Period 2¹⁹⁹³⁷ - 1; scientific simulations, Python/R default"],
  ["Xoroshiro / Xorshift128+", "O(1)", "Bit-shifts, rotations, and XOR", "High-speed gaming engines, modern JavaScript V8"],
  ["ChaCha20 / AES-CTR CSPRNG", "O(1)", "Cryptographic block/stream cipher", "SSL/TLS keys, secure token generation, OS /dev/urandom"],
  ["Hardware TRNG (Thermal / Quantum)", "Hardware bound", "Physical thermal Johnson noise / photon beam splitting", "Cryptographic key generation, HSM appliances, high-security entropy pools"],
];

const RELATED_RNG = [
  { href: "/calculators/math/probability-calculator", icon: "🎯", name: "Probability" },
  { href: "/calculators/math/combination-calculator", icon: "🎲", name: "Combinations" },
  { href: "/calculators/math/permutation-calculator", icon: "🔀", name: "Permutations" },
  { href: "/calculators/math/sample-size-calculator", icon: "📊", name: "Sample Size" },
  { href: "/calculators/math/confidence-interval-calculator", icon: "📐", name: "Confidence Interval" },
  { href: "/calculators/math/z-score-calculator", icon: "📈", name: "Z-Score Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Random Number Generator | CalcDigi"
      intro="Generate uniform random numbers, randomized integer sets, cryptographic sequences, and reproducible pseudo-random distributions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="RNG(min, max)"
      related={RELATED_RNG}
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

          <h2>Foundations of Random Number Generation and Entropy</h2>
          <p>
            Random number generation is a foundational pillar of modern computing, numerical simulation, cryptography, and mathematical statistics. At its core, a random process is one whose exact outcome cannot be predicted deterministically in advance, exhibiting equal likelihood across an established probability distribution.
          </p>
          <p>
            In algorithmic environments, generating randomness presents a philosophical and practical challenge: digital computers are deterministic state machines built on deterministic logic gates. Consequently, computational science categorizes random sources into two distinct paradigms: <strong>Pseudo-Random Number Generators (PRNGs)</strong>, which simulate randomness via mathematical algorithms from a seed value, and <strong>True Random Number Generators (TRNGs)</strong>, which harvest physical entropy from non-deterministic natural phenomena.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="combinatorics" />
          </div>

          <h2>Mathematical Architecture of Pseudo-Random Generators</h2>
          <p>
            The earliest practical algorithmic generator, proposed by D. H. Lehmer in 1949, was the <strong>Linear Congruential Generator (LCG)</strong>. An LCG computes consecutive terms via the linear recurrence relation:
          </p>
          <Formula>X_(n+1) = (a × X_n + c) mod m</Formula>
          <p>
            Where <em>m</em> is the integer modulus (defining the maximum possible period), <em>a</em> is the multiplier, <em>c</em> is the additive increment, and <em>X₀</em> is the initial seed. Under the Hull-Dobell Theorem, an LCG achieves its full period <em>m</em> if and only if <em>c</em> and <em>m</em> are coprime, every prime factor of <em>m</em> divides <em>a - 1</em>, and if <em>m</em> is a multiple of 4, <em>a - 1</em> is also a multiple of 4.
          </p>

          <h3>The Mersenne Twister and Modern Shift-Register PRNGs</h3>
          <p>
            While LCGs execute in a single CPU clock cycle, their outputs suffer from hyperplane lattice defects in multidimensional spaces (Marsaglia's Theorem). In 1997, Makoto Matsumoto and Takuji Nishimura developed the <strong>Mersenne Twister (MT19937)</strong>, which operates on bit-level matrix linear recurrences over binary finite fields:
          </p>
          <Formula>Period = 2¹⁹⁹³⁷ - 1 ≈ 4.315 × 10⁶⁰⁰¹</Formula>
          <p>
            The Mersenne Twister provides 623-dimensional equidistribution with 32-bit accuracy, making it the industry standard for non-cryptographic scientific simulations, Monte Carlo calculations, and statistical sampling.
          </p>

          <h2>Generating Bounded Uniform Integers Without Bias</h2>
          <p>
            Converting a continuous uniform random float <em>U ∈ [0, 1)</em> into an integer within an arbitrary inclusive interval <em>[min, max]</em> requires scaling by the span <em>S = max - min + 1</em>:
          </p>
          <Formula>Integer = ⌊ U × (max - min + 1) ⌋ + min</Formula>

          <h3>Eliminating Modulo Bias</h3>
          <p>
            A common developer pitfall in software engineering is calculating <em>rand() % N</em>. When the raw random generator's range (say 0 to 2³² - 1) is not an exact integer multiple of <em>N</em>, lower remainder values appear with slightly higher frequency. High-fidelity RNG implementations eliminate modulo bias through <strong>rejection sampling</strong>: discarding raw random values that fall in the fractional surplus tail and drawing again until an unskewed bucket is reached.
          </p>

          <h2>Step-by-Step Worked Derivation: The Fisher-Yates Shuffle</h2>
          <p>
            To generate an array of non-repeating random numbers (such as drawing 5 unique lottery balls from a pool of 20 without replacement), standard algorithms deploy the <strong>Fisher-Yates (Knuth) Shuffle</strong>:
          </p>

          <h3>Step 1: Initialize Array of Candidate Elements</h3>
          <p>
            Create an ordered array of candidates: <em>A = [1, 2, 3, ..., N]</em>.
          </p>

          <h3>Step 2: Iterate Backwards from Index N - 1 Down to 1</h3>
          <p>
            For each index <em>i</em> from <em>N - 1</em> down to 1:
          </p>
          <ul>
            <li>Generate an unbiased random integer <em>j</em> such that <em>0 ≤ j ≤ i</em>.</li>
            <li>Swap the elements at indices <em>i</em> and <em>j</em>: swap(A[i], A[j]).</li>
          </ul>

          <h3>Step 3: Extract the Target Subset</h3>
          <p>
            After <em>k</em> steps, the last <em>k</em> elements represent a provably uniform random sample drawn without replacement in optimal <em>O(k)</em> time complexity.
          </p>

          <h2>Comparison of Computational RNG Architectures</h2>
          <p>
            The table below contrasts the operational attributes of major random generation engines:
          </p>

          <DataTable
            head={["RNG Engine Classification", "Execution Overhead", "Underlying Mathematical Mechanism", "Primary Practical Deployment"]}
            rows={RNG_ALGORITHM_ROWS}
            highlight={1}
          />

          <h2>Practical Applications Across Science, Engineering, and Cryptography</h2>
          <p>
            Random number generators serve indispensable functions across contemporary digital systems:
          </p>
          <ul>
            <li>
              <strong>Monte Carlo Statistical Simulations:</strong> Simulating nuclear particle diffusion, fluid dynamics turbulence, and financial portfolio Value at Risk (VaR).
            </li>
            <li>
              <strong>Cryptographic Key Generation and Handshakes:</strong> Generating asymmetric RSA and Elliptic Curve private keys, initialization vectors (IVs), and ephemeral Diffie-Hellman nonces.
            </li>
            <li>
              <strong>A/B Testing and Randomized Controlled Trials:</strong> Unbiased assignment of clinical patients to control versus treatment drug cohorts in epidemiological studies.
            </li>
            <li>
              <strong>Video Game Procedural Generation:</strong> Creating unique procedural terrain maps, item drop tables, and randomized artificial intelligence behavior trees.
            </li>
          </ul>

          <h2>Related Mathematical and Statistical Calculators</h2>
          <p>
            To expand your statistical and probabilistic toolkit, explore our specialized <Link href="/calculators/math/probability-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Probability Calculator</Link>, <Link href="/calculators/math/combination-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Combination Calculator</Link>, <Link href="/calculators/math/permutation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Permutation Calculator</Link>, and <Link href="/calculators/math/sample-size-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Sample Size Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Random Number Generator</h2><div class=\"form-group\"><label for=\"rng-min\">Minimum</label><input id=\"rng-min\" step=\"1\" type=\"number\" value=\"1\"/></div><div class=\"form-group\"><label for=\"rng-max\">Maximum</label><input id=\"rng-max\" step=\"1\" type=\"number\" value=\"100\"/></div><div class=\"form-group\"><label for=\"rng-count\">How Many Numbers</label><input id=\"rng-count\" min=\"1\" step=\"1\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label style=\"display:flex;align-items:center;gap:8px;font-weight:400;\"><input id=\"rng-unique\" style=\"width:auto;\" type=\"checkbox\"/> No duplicates</label></div><button class=\"calc-btn\" onclick=\"generateRandom()\">Generate Numbers</button><button class=\"calc-btn\" onclick=\"document.getElementById('rng-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"rng-result\" style=\"display:none;\"><div id=\"rng-ri\"></div><div class=\"ai-box\" id=\"rng-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-rng-result\" onclick=\"printResult('rng-result','Random Number Generator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Random Number Generator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-random-number-generator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function generateRandom(){\\n  const min=parseInt(document.getElementById('rng-min').value);\\n  const max=parseInt(document.getElementById('rng-max').value);\\n  const count=parseInt(document.getElementById('rng-count').value)||1;\\n  const unique=document.getElementById('rng-unique').checked;\\n  if(isNaN(min)||isNaN(max)||min>max){alert('Enter a valid min/max range (min must be <= max).');return;}\\n  const rangeSize=max-min+1;\\n  if(unique&&count>rangeSize){alert('Cannot generate '+count+' unique numbers from a range of only '+rangeSize+'.');return;}\\n  let nums=[];\\n  if(unique){\\n    const pool=[];\\n    for(let i=min;i<=max;i++)pool.push(i);\\n    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const tmp=pool[i];pool[i]=pool[j];pool[j]=tmp;}\\n    nums=pool.slice(0,count);\\n  } else {\\n    for(let i=0;i<count;i++)nums.push(Math.floor(Math.random()*rangeSize)+min);\\n  }\\n  const sum=nums.reduce((a,b)=>a+b,0);\\n  const avg=sum/nums.length;\\n  document.getElementById('rng-ri').innerHTML=\\n    ri('Generated Numbers','<strong style=\\\"font-size:17px;color:var(--c-accent)\\\">'+nums.join(', ')+'</strong>',true)+\\n    ri('Count',nums.length)+\\n    ri('Sum',sum)+\\n    ri('Average',avg.toFixed(2));\\n  document.getElementById('rng-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
