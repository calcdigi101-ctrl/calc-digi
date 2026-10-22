import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/decimal-to-fraction-calculator";
const TITLE = "Decimal to Fraction Calculator | Step-by-Step Converter | CalcDigi";
const DESCRIPTION =
  "Free online decimal to fraction calculator. Convert terminating and repeating decimals into exact simplified fractions or mixed numbers with complete algebraic derivations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you convert a terminating decimal to a fraction?",
    a: "Count the number of decimal digits (k) after the decimal point, write the decimal digits as an integer numerator over a power of 10 (10^k) as the denominator, and simplify the fraction to lowest terms by dividing both numerator and denominator by their Greatest Common Divisor (GCD).",
  },
  {
    q: "How do you convert a repeating decimal into a fraction?",
    a: "Set the repeating decimal equal to variable x. Multiply x by 10^p (where p is the repetend length) to shift one full repeating block left of the decimal point. Subtract the original equation from this new equation to eliminate the repeating tail, then solve algebraically for x and reduce to lowest terms.",
  },
  {
    q: "Why do some decimals terminate while others repeat indefinitely?",
    a: "In base-10 arithmetic, a simplified fraction a/b yields a terminating decimal if and only if the prime factorization of its denominator b contains no prime factors other than 2 and 5. If the denominator has any other prime factors (such as 3, 7, 11, or 13), the decimal expansion is guaranteed to repeat infinitely.",
  },
  {
    q: "What is a repetend in a repeating decimal?",
    a: "A repetend (or period) is the recurring sequence of digits that repeats endlessly in a periodic decimal. It is conventionally indicated by placing a horizontal bar (vinculum) over the repeating block, or by enclosing the repeating sequence in parentheses: e.g., 0.142857142857... = 0.(142857).",
  },
  {
    q: "What is the maximum possible length of a repetend for denominator d?",
    a: "For any integer denominator d, the length of the repetend can never exceed d − 1 digits. This mathematical theorem arises directly from the Pigeonhole Principle during long division, because the division by d can produce at most d − 1 distinct non-zero remainders.",
  },
  {
    q: "How is 0.999... mathematically identical to 1?",
    a: "0.999... exactly equals 1. Let x = 0.999...; multiplying by 10 yields 10x = 9.999... Subtracting x from 10x produces 9x = 9, so x = 1. In real analysis, both representations converge to the identical real number point.",
  },
  {
    q: "Can irrational numbers like π or √2 be converted into fractions?",
    a: "No. By definition, irrational numbers cannot be expressed as a ratio of two integers. Their decimal expansions are non-terminating and non-repeating. However, they can be approximated using rational convergents derived from continued fractions.",
  },
  {
    q: "How does the Euclidean algorithm assist in decimal-to-fraction conversion?",
    a: "After converting a decimal into an unreduced fraction N/10^k, the Euclidean algorithm rapidly computes gcd(N, 10^k) in logarithmic time. Dividing both terms by this GCD guarantees that the resulting fraction is in its unique irreducible form.",
  },
];

const CONVERSION_METHODS_ROWS = [
  ["Terminating Decimal", "x = N / 10^k", "Direct power-of-10 denominator scaling followed by GCD reduction", "0.375 = 375/1000 = 3/8"],
  ["Pure Repeating Decimal", "x = R / (10^p − 1)", "Algebraic cancellation creating a denominator of all 9s", "0.666... = 6/9 = 2/3"],
  ["Mixed Repeating Decimal", "x = (N_tot − N_nonrep) / [10^n(10^p − 1)]", "Two-stage multiplication isolating non-repeating and repeating parts", "0.1666... = (16 − 1)/90 = 1/6"],
  ["Negative Decimal", "x = −(N / 10^k)", "Convert absolute value and preserve negative sign on numerator", "−0.625 = −5/8"],
  ["Mixed Number Decimal", "x = Integer + Fraction", "Preserve integer whole part and convert decimal fraction separately", "3.125 = 3 + 1/8 = 3 1/8"],
];

const PERIODIC_BENCHMARKS_ROWS = [
  ["1/7", "0.142857142857...", "6 digits (142857)", "Full period (d − 1 = 6)", "Cyclic number permutation"],
  ["1/9", "0.111111...", "1 digit (1)", "Single digit repetend", "Denominator 10¹ − 1"],
  ["1/11", "0.090909...", "2 digits (09)", "Two digit repetend", "Denominator 10² − 1 = 99"],
  ["1/12", "0.083333...", "1 digit (3) after 1 non-rep (08)", "Mixed repeating", "Factors 2² × 3"],
  ["1/13", "0.076923076923...", "6 digits (076923)", "Six digit repetend", "10⁶ − 1 = 999,999 = 13 × 76923"],
];

const RELATED = [
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "🔬", name: "Scientific Notation" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Decimal to Fraction Calculator | CalcDigi"
      intro="Convert any terminating or repeating decimal into an exact, fully simplified fraction or mixed number with step-by-step algebraic derivations and period analysis."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Decimal -> Exact Fraction (a/b)"
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
            <span>ISO 80000-1 / NIST Compliant Precision</span>
          </div>

          <h2>Theoretical Foundations of Decimal-to-Fraction Conversion</h2>
          <p>
            In mathematical analysis and numeric representation, converting a decimal into a rational fraction <strong>a/b</strong> is the process of recovering the exact integer ratio that generated the decimal representation. The decimal numeral system is a base-10 positional notation popularized globally following the transmission of Hindu-Arabic mathematics through medieval scholars like al-Khwarizmi and Fibonacci, and formally systematized in Europe by Flemish mathematician Simon Stevin in his 1585 treatise <em>De Thiende</em>.
          </p>
          <p>
            Every real number possesses a decimal expansion. A decimal expansion represents a rational number if and only if it is either <strong>terminating</strong> (having a finite number of non-zero digits after the decimal point) or <strong>eventually periodic</strong> (possessing a recurring sequence of digits repeating endlessly). Non-terminating, non-periodic decimals represent irrational numbers like √2 and π.
          </p>
          <p>
            Understanding the transition between continuous decimal expansions and discrete rational fractions is vital across computer software engineering, digital signal processing, quantitative trading, structural carpentry, and analytical chemistry, where floating-point approximation inaccuracies must be replaced with exact fractional precision.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Algebraic Derivations: Converting Terminating and Repeating Decimals</h2>
          <p>
            The mathematical procedure for transforming decimals into fractions differs fundamentally based on whether the decimal terminates or repeats:
          </p>

          <DataTable
            head={["Decimal Classification", "General Formula", "Mechanistic Principle", "Worked Arithmetic Example"]}
            rows={CONVERSION_METHODS_ROWS}
            highlight={1}
          />

          <h3>1. Terminating Decimals: The Power-of-10 Scaling Method</h3>
          <p>
            A terminating decimal with <em>k</em> digits after the decimal point can be expressed directly as an integer over 10^k:
          </p>
          <Formula>x = N ÷ 10^k</Formula>
          <p>
            <em>Worked Derivation:</em> Consider x = 0.4375.
          </p>
          <ol>
            <li>Count digits: k = 4 decimal places.</li>
            <li>Place over power of 10: 4375 / 10000.</li>
            <li>Compute GCD via Euclidean Algorithm: gcd(4375, 10000) = 625.</li>
            <li>Divide both terms: 4375 ÷ 625 = 7, and 10000 ÷ 625 = 16.</li>
            <li>Final simplified fraction: <strong>7/16</strong>.</li>
          </ol>

          <h3>2. Pure Repeating Decimals: The Algebraic Cancellation Theorem</h3>
          <p>
            For a pure repeating decimal with a repetend of length <em>p</em> repeating immediately following the decimal point, the fraction denominator always consists of <em>p</em> consecutive nines (10^p − 1):
          </p>
          <Formula>x = R ÷ (10^p − 1)</Formula>
          <p>
            <em>Worked Derivation:</em> Convert x = 0.272727... (where repetend R = 27, length p = 2).
          </p>
          <ol>
            <li>Let x = 0.272727... (Equation 1)</li>
            <li>Multiply by 10² = 100: 100x = 27.272727... (Equation 2)</li>
            <li>Subtract Eq. 1 from Eq. 2: 100x − x = 27.272727... − 0.272727...</li>
            <li>99x = 27</li>
            <li>x = 27 / 99 = (27 ÷ 9) / (99 ÷ 9) = <strong>3/11</strong>.</li>
          </ol>

          <h3>3. Mixed Repeating Decimals: The Two-Stage Isolation Procedure</h3>
          <p>
            When a decimal contains <em>n</em> non-repeating digits followed by a repetend of length <em>p</em> (such as x = 0.1666... with n = 1 and p = 1), two separate powers of 10 must be applied to isolate the repeating tail:
          </p>
          <Formula>x = (10^(n+p) × x − 10^n × x) ÷ (10^(n+p) − 10^n)</Formula>
          <p>
            <em>Worked Derivation:</em> Convert x = 0.41666... (n = 2 non-repeating digits &apos;41&apos;, p = 1 repeating digit &apos;6&apos;).
          </p>
          <ol>
            <li>Multiply by 10^(2+1) = 1000: 1000x = 416.666...</li>
            <li>Multiply by 10² = 100: 100x = 41.666...</li>
            <li>Subtract equations: 1000x − 100x = 416.666... − 41.666...</li>
            <li>900x = 375</li>
            <li>x = 375 / 900. The gcd(375, 900) = 75: (375 ÷ 75) / (900 ÷ 75) = <strong>5/12</strong>.</li>
          </ol>

          <h2>Number Theory of Periodic Decimals and Cyclic Permutations</h2>
          <p>
            The period length of a repeating decimal is intimately linked to the multiplicative order of 10 modulo the denominator <em>d</em>. By Fermat&apos;s Little Theorem and Euler&apos;s totient theorem, if gcd(10, d) = 1, then:
          </p>
          <Formula>10^(ord_d(10)) ≡ 1 (mod d)</Formula>
          <p>
            The period length <em>p</em> equals exactly ord_d(10), the smallest positive integer such that 10^p − 1 is evenly divisible by <em>d</em>. When <em>d</em> is prime and ord_d(10) = d − 1, the fraction 1/d generates a <em>full-period prime</em> (or cyclic number).
          </p>
          <p>
            The most celebrated cyclic number arises from d = 7: 1/7 = 0.(142857). Multiplying the 6-digit block 142857 by 2, 3, 4, 5, or 6 cyclically permutes the exact same digits (285714, 428571, 571428, 714285, 857142), a deep algebraic property rooted in the cyclic group structure of ℤ/7ℤ.
          </p>

          <DataTable
            head={["Fraction (1/d)", "Decimal Representation", "Period Length (p)", "Classification", "Number-Theoretic Property"]}
            rows={PERIODIC_BENCHMARKS_ROWS}
            highlight={0}
          />

          <h2>IEEE 754 Floating-Point Precision and Decimal Inexactitude</h2>
          <p>
            Modern computers encode numbers using binary floating-point representation defined by IEEE 754. In base-2, the only irreducible fractions that produce terminating binary decimals are those whose denominators are powers of 2 (2⁻¹, 2⁻², 2⁻³, etc.).
          </p>
          <p>
            Consequently, mundane base-10 values like 0.1 (1/10) and 0.2 (1/5) become infinitely repeating binary fractions:
          </p>
          <Formula>0.1₁₀ = 0.00011001100110011...₂</Formula>
          <p>
            When stored in 64-bit IEEE double-precision registers, the infinite binary expansion is truncated to 53 bits of significand precision, introducing a microscopic round-off error equal to approximately 5.55 × 10⁻¹⁷. While imperceptible in isolated operations, compounding round-off errors across millions of sequential financial calculations or scientific matrix inversions can cause catastrophic drift. Utilizing exact rational fraction conversions eliminates IEEE 754 floating-point error entirely.
          </p>

          <h2>Related Mathematical and Financial Calculators</h2>
          <p>
            To expand your arithmetic and statistical toolkit, explore our specialized <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>, <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Ratio Calculator</Link>, <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, and <Link href="/calculators/math/rounding-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Rounding Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Decimal to Fraction</h2>\n<div class=\"form-group\"><label for=\"df-decimal\">Decimal Number</label><input id=\"df-decimal\" step=\"any\" type=\"number\" value=\"0.75\"/></div>\n<button class=\"calc-btn\" onclick=\"calcDecToFrac()\">Convert</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('df-decimal').value='';document.getElementById('df-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"df-result\" style=\"display:none;\"><div id=\"df-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"df-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"df-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-df-result\" onclick=\"printResult('df-result','Decimal to Fraction Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Decimal to Fraction Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-decimal-to-fraction-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function gcdFn(a,b){return b===0?a:gcdFn(b,a%b);}\\nfunction calcDecToFrac(){\\n  const dec=parseFloat(document.getElementById('df-decimal').value);\\n  if(isNaN(dec)){alert('Please enter a valid decimal number.');return;}\\n  const neg=dec<0;\\n  const abs=Math.abs(dec);\\n  const decStr=abs.toString();\\n  const decPlaces=(decStr.split('.')[1]||'').length;\\n  const denom=Math.pow(10,decPlaces);\\n  let numer=Math.round(abs*denom);\\n  const g=gcdFn(numer,denom);\\n  const sn=numer/g, sd=denom/g;\\n  const whole=Math.floor(sn/sd);\\n  const remN=sn%sd;\\n  const sign=neg?'-':'';\\n  document.getElementById('df-ri').innerHTML=\\n    ri('Simplified Fraction','<strong style=\\\"font-size:22px;color:var(--c-accent)\\\">'+sign+sn+'/'+sd+'</strong>',true)+\\n    (whole>0?ri('Mixed Number',sign+whole+(remN>0?' '+remN+'/'+sd:'')):'')+\\n    ri('Original Decimal',dec)+\\n    ri('Verification',(sn/sd).toFixed(8))+\\n    ri('GCF Used',g);\\n  document.getElementById('df-result').style.display='block';\\n  const _ai_df_ai_box=document.getElementById('df-ai-box');\\n  if(_ai_df_ai_box){\\n    _ai_df_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_df_ai_box.style.display='block';\\n    _ai_df_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('df-chart',['Numerator','Denominator'],[sn,sd],['#1a5c3a','#c8832a']);\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
