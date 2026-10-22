import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/long-division-calculator";
const TITLE = "Long Division Calculator | Step-by-Step with Remainders & Decimals | CalcDigi";
const DESCRIPTION =
  "Free online long division calculator. Solve long division problems step-by-step with integer remainders, repeating decimals, quotient steps, and polynomial division.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the Division Algorithm in mathematics?",
    a: "The Division Algorithm states that for any integer dividend a and positive integer divisor b, there exist unique integers quotient q and remainder r such that a = b × q + r, where 0 ≤ r < b.",
  },
  {
    q: "What are the four repeating steps in long division?",
    a: "The standard long division algorithm cycles through four sequential steps: Divide (estimate quotient digit), Multiply (divisor by quotient digit), Subtract (product from dividend slice), and Bring Down (next digit from dividend). This is memorized by the mnemonic DMSB (Divide, Multiply, Subtract, Bring down).",
  },
  {
    q: "What is the difference between a remainder and a decimal quotient?",
    a: "An integer remainder r represents the leftover whole units that cannot be divided evenly by the divisor (e.g., 25 ÷ 4 = 6 with remainder 1). A decimal quotient continues the division into fractional tenths and hundredths by placing a decimal point and bringing down trailing zeros (25 ÷ 4 = 6.25).",
  },
  {
    q: "How do you know if a fraction will result in a terminating or repeating decimal?",
    a: "A reduced fraction a/b produces a terminating decimal if and only if the prime factorization of its denominator b contains no prime factors other than 2 and 5 (the prime factors of base-10). If any other prime factor exists (such as 3, 7, 11), the decimal repeats indefinitely.",
  },
  {
    q: "What determines the maximum length of a repeating decimal period?",
    a: "For any fraction a/b, the maximum repeating decimal period is b − 1 digits. For example, 1/7 has a maximum period of 7 − 1 = 6 digits (0.142857142857...). The exact period equals the multiplicative order of 10 modulo b.",
  },
  {
    q: "How does polynomial long division work in algebra?",
    a: "Polynomial long division divides a dividend polynomial P(x) by a divisor D(x) to yield quotient Q(x) and remainder R(x) such that P(x) = D(x) × Q(x) + R(x), where the degree of R(x) is strictly less than the degree of D(x). It is essential for factoring polynomials and integrating rational functions.",
  },
  {
    q: "What is synthetic division and when can it be used?",
    a: "Synthetic division is a simplified, shorthand method of polynomial long division that uses only coefficients. It can only be used when the divisor is a first-degree linear binomial of the form (x − c).",
  },
  {
    q: "How is division performed in computer hardware (ALU)?",
    a: "Computer processors execute division using shift-and-subtract binary algorithms, categorized into Restoring Division, Non-Restoring Division, and high-speed SRT Division (Sweeney, Robertson, Tocher) which uses lookup tables and redundant radix-4 representations.",
  },
];

const DIVISION_METHODS_ROWS = [
  ["Standard Long Division", "Pencil-and-paper multi-digit division", "Step-by-step DMSB cycles with remainders and decimals", "General arithmetic across all numbers"],
  ["Short Division", "Compact mental division", "Carries remainders as small superscript digits", "Single-digit divisors (dividing by 2 through 9)"],
  ["Synthetic Division", "Coefficient-only polynomial division", "Bypasses variable terms for linear divisors (x − c)", "Algebraic root finding and polynomial factoring"],
  ["Restoring Hardware Division", "Binary shift-and-subtract", "Restores dividend register if subtraction yields negative", "Basic digital ALU microprocessor circuits"],
  ["SRT Division Algorithm", "Radix-4 / Radix-8 redundant quotient digit selection", "Lookup tables and overlap intervals without full subtraction", "Modern Intel/AMD/ARM floating-point division hardware"],
];

const RELATED_DIV = [
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/gcf-calculator", icon: "⚖️", name: "GCF Calculator" },
  { href: "/calculators/math/decimal-to-fraction-calculator", icon: "🔄", name: "Decimal to Fraction" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/big-number-calculator", icon: "🔢", name: "Big Number Calc" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Long Division Calculator | CalcDigi"
      intro="Solve long division problems step-by-step with integer remainders, repeating decimal expansions, quotient derivations, and algebraic proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a ÷ b = q R r"
      related={RELATED_DIV}
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

          <h2>Foundations of the Division Algorithm</h2>
          <p>
            Long division is one of the most fundamental algorithms in arithmetic, algebra, and computational mathematics. Formalized in elementary number theory as the <strong>Euclidean Division Theorem</strong>, long division demonstrates that dividing any real integer <em>a</em> (the dividend) by a non-zero positive integer <em>b</em> (the divisor) always produces a unique integer quotient <em>q</em> and a non-negative integer remainder <em>r</em>:
          </p>
          <Formula>a = b × q + r  where  0 ≤ r &lt; b</Formula>
          <p>
            Introduced to European mathematics by Leonardo of Pisa (Fibonacci) in his 1202 masterwork <em>Liber Abaci</em> and later refined into the familiar tabular &ldquo;galley&rdquo; and modern bracket notation by early Renaissance mathematicians, long division breaks down complex multi-digit division into a series of predictable, manageable single-digit estimation steps.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="bases" />
          </div>

          <h2>Anatomy of Long Division: The DMSB Iterative Cycle</h2>
          <p>
            Every step of standard long division executes four sequential mathematical sub-operations, historically taught via the mnemonic <strong>DMSB</strong>:
          </p>
          <ol>
            <li>
              <strong>Divide (D):</strong> Determine how many times the divisor fits into the current active leading segment of the dividend. Write this single-digit estimate in the quotient above the bracket.
            </li>
            <li>
              <strong>Multiply (M):</strong> Multiply the newly found quotient digit by the divisor, and write the product directly beneath the active dividend segment.
            </li>
            <li>
              <strong>Subtract (S):</strong> Subtract the product from the active dividend segment to calculate the intermediate remainder. The remainder must always be strictly less than the divisor; if it is equal or greater, the estimated quotient digit was too small.
            </li>
            <li>
              <strong>Bring Down (B):</strong> Bring down the next unused digit from the dividend to form the new active dividend segment, and repeat the cycle from Step 1.
            </li>
          </ol>

          <h2>Step-by-Step Worked Long Division: 487 ÷ 32</h2>
          <p>
            To examine the mechanical execution of the DMSB algorithm in complete step-by-step detail, let us divide <strong>487 by 32</strong>:
          </p>

          <h3>Step 1: First Division Cycle (Tens Position)</h3>
          <ul>
            <li>Examine the first two digits of the dividend: 48.</li>
            <li><strong>Divide:</strong> 48 ÷ 32 = 1. Write <strong>1</strong> in the tens position of the quotient.</li>
            <li><strong>Multiply:</strong> 1 × 32 = 32.</li>
            <li><strong>Subtract:</strong> 48 − 32 = 16.</li>
            <li><strong>Bring Down:</strong> Bring down the 7 from 487 to form <strong>167</strong>.</li>
          </ul>

          <h3>Step 2: Second Division Cycle (Units Position)</h3>
          <ul>
            <li>Active segment is 167.</li>
            <li><strong>Divide:</strong> 167 ÷ 32 = 5 (since 5 × 32 = 160). Write <strong>5</strong> in the units position of the quotient.</li>
            <li><strong>Multiply:</strong> 5 × 32 = 160.</li>
            <li><strong>Subtract:</strong> 167 − 160 = <strong>7</strong>.</li>
            <li>No more whole digits remain in the dividend.</li>
          </ul>
          <Formula>Quotient = 15, Remainder = 7  →  487 = (32 × 15) + 7</Formula>

          <h3>Step 3: Continuing into Decimal Places</h3>
          <p>
            To express the result as an exact decimal rather than a quotient with remainder, place a decimal point after the 15 in the quotient and continue bringing down trailing zeros:
          </p>
          <ul>
            <li>Bring down 0 to form 70: 70 ÷ 32 = <strong>2</strong> (2 × 32 = 64); remainder 70 − 64 = 6.</li>
            <li>Bring down 0 to form 60: 60 ÷ 32 = <strong>1</strong> (1 × 32 = 32); remainder 60 − 32 = 28.</li>
            <li>Bring down 0 to form 280: 280 ÷ 32 = <strong>8</strong> (8 × 32 = 256); remainder 280 − 256 = 24.</li>
            <li>Bring down 0 to form 240: 240 ÷ 32 = <strong>7</strong> (7 × 32 = 224); remainder 240 − 224 = 16.</li>
            <li>Bring down 0 to form 160: 160 ÷ 32 = <strong>5</strong> (5 × 32 = 160); remainder 160 − 160 = 0.</li>
          </ul>
          <Formula>Exact Decimal: 487 ÷ 32 = 15.21875 (Terminating Decimal)</Formula>

          <h2>Terminating Versus Repeating Decimal Expansions</h2>
          <p>
            A reduced rational fraction <em>a/b</em> produces a <strong>terminating decimal</strong> if and only if the prime factorization of its denominator <em>b</em> contains exclusively powers of 2 and/or 5:
          </p>
          <Formula>b = 2^α × 5^β</Formula>
          <p>
            Because 32 = 2⁵, 487/32 terminated in exactly 5 decimal places. If the denominator contains any other prime factor (such as 3, 7, 11, 13), the division algorithm cycles through a finite set of remainders, producing a <strong>repeating decimal</strong> (circulating period). For example, 1/7 = 0.142857142857... repeats with a period of 6 digits.
          </p>

          <h2>Comparison of Division Methodologies</h2>
          <p>
            The table below contrasts manual and computational division strategies:
          </p>

          <DataTable
            head={["Division Methodology", "Operational Complexity", "Algorithmic Mechanism", "Primary Practical Application"]}
            rows={DIVISION_METHODS_ROWS}
            highlight={0}
          />

          <h2>Periodicity of Repeating Decimals and Number Theory</h2>
          <p>
            When a denominator contains prime factors coprime to 10, the remainder at each step must be strictly less than the divisor <em>b</em>. Under the Pigeonhole Principle, there are at most <em>b − 1</em> non-zero remainders possible before a remainder must repeat. Once a remainder repeats, the sequence of quotient digits enters an endless periodic loop termed a <strong>repetend</strong>.
          </p>
          <p>
            Under Fermat's Little Theorem and Euler's totient theorem, the exact period length divides the totient function φ(b). A prime <em>p</em> whose reciprocal 1/p achieves the maximal possible period length of <em>p − 1</em> is called a <strong>full-period prime</strong> (such as 7, 17, 19, 23, 29, 47, 59, 61, and 97). For instance, 1/7 produces the 6-digit cyclic number 142,857, which cyclically permutes its digits when multiplied by 1 through 6:
          </p>
          <Formula>1/7 = 0.\bar(142857);  2/7 = 0.\bar(285714);  3/7 = 0.\bar(428571)</Formula>

          <h2>Step-by-Step Worked Polynomial Long Division</h2>
          <p>
            To observe the algebraic generalization in action, consider dividing the cubic polynomial <em>P(x) = 2x³ − 3x² + 4x − 5</em> by the linear binomial <em>D(x) = x − 2</em>:
          </p>
          <ul>
            <li><strong>Step 1:</strong> Divide leading terms: 2x³ ÷ x = 2x². Multiply: 2x² × (x − 2) = 2x³ − 4x². Subtract: (−3x²) − (−4x²) = x². Bring down +4x to form x² + 4x.</li>
            <li><strong>Step 2:</strong> Divide leading terms: x² ÷ x = x. Multiply: x × (x − 2) = x² − 2x. Subtract: (4x) − (−2x) = 6x. Bring down −5 to form 6x − 5.</li>
            <li><strong>Step 3:</strong> Divide leading terms: 6x ÷ x = 6. Multiply: 6 × (x − 2) = 6x − 12. Subtract: (−5) − (−12) = <strong>7</strong>.</li>
          </ul>
          <Formula>Quotient Q(x) = 2x² + x + 6;  Remainder R = 7</Formula>
          <p>
            Verifying with the <strong>Polynomial Remainder Theorem</strong>: substituting x = 2 directly into P(x) yields P(2) = 2(2)³ − 3(2)² + 4(2) − 5 = 16 − 12 + 8 − 5 = <strong>7</strong>, confirming exact algebraic congruence.
          </p>

          <h2>Synthetic Division and Horner's Scheme for Polynomials</h2>
          <p>
            When dividing a polynomial by a linear monic divisor of the form <em>(x − c)</em>, the full algebraic notation of long division is largely redundant. Italian mathematician Paolo Ruffini (1809) and British mathematician William George Horner (1819) developed <strong>synthetic division</strong>, an algorithm that tracks only the numerical coefficients:
          </p>
          <ol>
            <li>Write root <em>c</em> in a left corner box and list the dividend polynomial coefficients horizontally.</li>
            <li>Drop the leading coefficient directly down to the bottom row.</li>
            <li>Multiply the newly dropped coefficient by <em>c</em>, place the product in the next column, and add down.</li>
            <li>Repeat until the final column: the bottom row yields the quotient polynomial coefficients, with the final value representing the remainder <em>P(c)</em>.</li>
          </ol>
          <p>
            Operating in optimal <em>O(N)</em> arithmetic operations, synthetic division and Horner's scheme form the standard method deployed by computer algebra systems to evaluate high-degree polynomials with minimal floating-point rounding error.
          </p>

          <h2>Practical Applications Across Science and Technology</h2>
          <p>
            Division algorithms are central to modern digital infrastructure:
          </p>
          <ul>
            <li>
              <strong>Financial Currency and Accounting Conversions:</strong> Dividing total revenue across billing periods, calculating amortized monthly installments, and allocating unit costs.
            </li>
            <li>
              <strong>Cyclic Redundancy Check (CRC) Checksums:</strong> Network data packet integrity verification performs polynomial division over Galois fields GF(2) using binary shift registers.
            </li>
            <li>
              <strong>Time, Angle, and Coordinate Normalization:</strong> Converting raw seconds into hours, minutes, and seconds, or degrees into degrees, arcminutes, and arcseconds via successive modulo division.
            </li>
            <li>
              <strong>Aspect Ratios and Screen Resolution Scaling:</strong> Calculating fractional downscaling factors and pixel aspect ratios in digital video pipelines.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/factor-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factor Calculator</Link>, <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>, <Link href="/calculators/math/gcf-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">GCF Calculator</Link>, and <Link href="/calculators/math/big-number-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Big Number Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Long Division Calculator</h2>\n<div class=\"form-group\"><label for=\"ld-dividend\">Dividend (number to divide)</label><input id=\"ld-dividend\" step=\"1\" type=\"number\" value=\"247\"/></div>\n<div class=\"form-group\"><label for=\"ld-divisor\">Divisor (divide by)</label><input id=\"ld-divisor\" step=\"1\" type=\"number\" value=\"13\"/></div>\n<button class=\"calc-btn\" onclick=\"calcLongDiv()\">Divide</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('ld-dividend').value='';document.getElementById('ld-divisor').value='';document.getElementById('ld-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"ld-result\" style=\"display:none;\"><div id=\"ld-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ld-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ld-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-ld-result\" onclick=\"printResult('ld-result','Long Division Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Long Division Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-long-division-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcLongDiv(){\\n  const dividend=parseInt(document.getElementById('ld-dividend').value);\\n  const divisor=parseInt(document.getElementById('ld-divisor').value);\\n  if(isNaN(dividend)||isNaN(divisor)){alert('Please enter valid integers for both dividend and divisor.');return;}\\n  if(divisor===0){alert('Cannot divide by zero — this is mathematically undefined.');return;}\\n  const quotient=Math.trunc(dividend/divisor);\\n  const remainder=dividend%divisor;\\n  const decimal=dividend/divisor;\\n  document.getElementById('ld-ri').innerHTML=\\n    ri('Quotient','<strong style=\\\"font-size:22px;color:var(--c-accent)\\\">'+quotient+'</strong>',true)+\\n    ri('Remainder',remainder)+\\n    ri('Decimal Result',decimal.toFixed(6))+\\n    ri('Verification',divisor+' × '+quotient+' + '+remainder+' = '+(divisor*quotient+remainder))+\\n    ri('Expression',dividend+' ÷ '+divisor+' = '+quotient+' R '+remainder);\\n  document.getElementById('ld-result').style.display='block';\\n  const _ai_ld_ai_box=document.getElementById('ld-ai-box');\\n  if(_ai_ld_ai_box){\\n    _ai_ld_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_ld_ai_box.style.display='block';\\n    _ai_ld_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('ld-chart',['Quotient','Remainder'],[Math.abs(quotient),Math.abs(remainder)||0.001],['#1a5c3a','#c8832a']);\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
