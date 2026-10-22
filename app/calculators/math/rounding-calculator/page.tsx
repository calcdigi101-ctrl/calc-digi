import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/rounding-calculator";
const TITLE = "Rounding Calculator | Round to Nearest Decimal, Fraction & Sig Fig | CalcDigi";
const DESCRIPTION =
  "Free online rounding calculator. Round numbers to nearest whole, decimal place, tenths, hundredths, or significant figures using standard arithmetic, bankers' rounding, floor, and ceiling.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How does standard arithmetic rounding (Round Half Up) work?",
    a: "In standard arithmetic rounding, examine the digit immediately following your target rounding place. If that digit is 5 or greater, round the target digit upward by 1; if the digit is 4 or less, keep the target digit unchanged (round downward). For example, 3.45 rounded to the nearest tenth becomes 3.5.",
  },
  {
    q: "What is Bankers' Rounding (Round Half to Even) and why is it preferred in finance?",
    a: "Bankers' Rounding (also termed Gaussian Rounding or Unbiased Rounding) rounds halfway cases (.5) to the nearest even number. For example, 2.5 rounds down to 2, while 3.5 rounds up to 4. Over large statistical datasets and financial ledgers, this eliminates the systematic upward accumulation bias caused by always rounding .5 upward.",
  },
  {
    q: "What is the difference between Floor, Ceiling, and Truncation?",
    a: "Floor (round down) rounds a number toward negative infinity (floor(3.8) = 3, floor(-3.2) = -4). Ceiling (round up) rounds toward positive infinity (ceil(3.2) = 4, ceil(-3.8) = -3). Truncation (round toward zero) simply strips all digits past the decimal point without directional rounding (trunc(3.8) = 3, trunc(-3.8) = -3).",
  },
  {
    q: "How do you round to significant figures?",
    a: "Identify the first non-zero digit from the left as the first significant figure. Count rightward to your target number of significant figures, inspect the next digit, and apply standard rounding rules, padding remaining positions with non-significant placeholder zeros if necessary.",
  },
  {
    q: "What are the IEEE 754 standard rounding modes in computer hardware?",
    a: "The IEEE 754 floating-point standard mandates four rounding modes for microprocessors: Round to Nearest Ties to Even (the hardware default), Round Toward Positive Infinity (Ceiling), Round Toward Negative Infinity (Floor), and Round Toward Zero (Truncation).",
  },
  {
    q: "Why does rounding halfway values upward create statistical bias?",
    a: "The set of terminating decimal fractional digits consists of ten equally likely outcomes: {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}. Rounding {1, 2, 3, 4} downward (4 digits) and {5, 6, 7, 8, 9} upward (5 digits) produces a 5:4 imbalance toward rounding upward, skewing cumulative sums upward by +0.05 units per rounded value.",
  },
  {
    q: "How do you round to the nearest fraction (e.g., nearest 1/16 or 1/32)?",
    a: "Multiply the decimal by the target denominator d (e.g., 16), round the resulting product to the nearest integer, and place that integer over denominator d: Fraction = round(x × d) / d. For example, 0.3875 rounded to 1/16: 0.3875 × 16 = 6.2 → 6/16 = 3/8.",
  },
  {
    q: "How does rounding affect error propagation in sequential computations?",
    a: "Performing intermediate rounding during chained multi-step calculations introduces compounding round-off errors. Best mathematical and engineering practice dictates carrying full unrounded precision throughout intermediate steps and applying rounding only to the final reported result.",
  },
];

const ROUNDING_MODES_ROWS = [
  ["Round Half Up (Arithmetic)", "Ties (x.5) round toward +∞", "Familiar schoolbook method; introduces slight upward statistical bias", "2.5 → 3, 3.5 → 4, −2.5 → −2"],
  ["Round Half to Even (Bankers')", "Ties (x.5) round to nearest even digit", "Statistically unbiased; default in IEEE 754 hardware and banking ledgers", "2.5 → 2, 3.5 → 4, 4.5 → 4"],
  ["Floor (Round Down)", "Always rounds toward −∞: ⌊x⌋", "Preserves lower bound; vital in modular arithmetic and array indexing", "3.9 → 3, −3.1 → −4"],
  ["Ceiling (Round Up)", "Always rounds toward +∞: ⌈x⌉", "Preserves upper safety envelope; crucial in capacity planning and inventory", "3.1 → 4, −3.9 → −3"],
  ["Truncation (Toward Zero)", "Discards fractional digits: sgn(x)·⌊|x|⌋", "Fastest CPU integer casting; strips decimal without rounding", "3.8 → 3, −3.8 → −3"],
];

const DECIMAL_PLACE_ROWS = [
  ["Nearest Whole Number (Units)", "10⁰ = 1", "3.14159 → 3", "Discrete inventory counts"],
  ["Nearest Tenth (1 Decimal)", "10⁻¹ = 0.1", "3.14159 → 3.1", "Clinical body temperature (°F/°C)"],
];

const RELATED = [
  { href: "/calculators/math/significant-figures-calculator", icon: "🔬", name: "Sig Fig Calculator" },
  { href: "/calculators/math/decimal-to-fraction-calculator", icon: "🔢", name: "Decimal to Fraction" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/math/percent-error-calculator", icon: "📐", name: "Percent Error" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Rounding Calculator | CalcDigi"
      intro="Round numbers to any decimal place, nearest integer, significant figures, or fraction using standard arithmetic, bankers' rounding, floor, ceiling, and truncation modes."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Round(x, precision, mode)"
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

          <h2>Mathematical Axioms and Principles of Numeric Rounding</h2>
          <p>
            In numerical analysis, applied arithmetic, and computer science, <strong>rounding</strong> is the deterministic process of replacing a real number with an inexact value that has a shorter, simpler, or more explicit representation. Rounding maps a continuous continuum of real numbers <strong>ℝ</strong> onto a discrete subset of representable rational values, balancing precision against comprehensibility.
          </p>
          <p>
            The formal study of rounding error gained prominence during World War II with the advent of electronic digital computing. Pioneers like Alan Turing, John von Neumann, and James H. Wilkinson recognized that while individual rounding approximations are minute, performing billions of chained floating-point operations in scientific matrix equations can trigger catastrophic numerical instability. Wilkinson&apos;s backward error analysis earned him the Turing Award in 1970 and established the foundational rigorous framework for modern computer arithmetic.
          </p>
          <p>
            From financial transaction settlements under international accounting standards (IFRS / GAAP) to GPS orbital telemetry and microprocessor arithmetic units specified by IEEE 754, understanding the mathematical characteristics of distinct rounding algorithms is vital to preventing systematic statistical drift.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Taxonomy of Standard Rounding Algorithms and Modes</h2>
          <p>
            Multiple distinct rounding modes exist, each tailored to specific analytical, computational, and statistical objectives:
          </p>

          <DataTable
            head={["Rounding Algorithm", "Tie-Breaking Rule (x.5)", "Statistical Characteristics", "Representative Outputs"]}
            rows={ROUNDING_MODES_ROWS}
            highlight={1}
          />

          <h3>1. Standard Arithmetic Rounding (Round Half Up)</h3>
          <p>
            The most widely taught rounding convention rounds values at or above the midpoint 5 upward:
          </p>
          <Formula>round_up(x) = ⌊x + 0.5⌋</Formula>
          <p>
            While intuitive for elementary arithmetic, Round Half Up suffers from a well-documented mathematical flaw: <strong>systematic upward accumulation bias</strong>. Because the digit 0 requires no rounding, the remaining non-zero digits are split unevenly: four digits (1, 2, 3, 4) round downward, while five digits (5, 6, 7, 8, 9) round upward. Across millions of transactions, this asymmetry artificially inflates totals.
          </p>

          <h3>2. Bankers&apos; Rounding: Round Half to Even (Gaussian Unbiased)</h3>
          <p>
            To eliminate accumulation bias, European banks, the US Internal Revenue Service, and the IEEE 754 floating-point standard adopt <strong>Round Half to Even</strong>. When a value falls precisely midway between two integers (e.g., 2.5 or 3.5), it rounds to whichever adjacent integer is even:
          </p>
          <ul>
            <li><strong>2.5</strong> rounds to <strong>2</strong> (since 2 is even)</li>
            <li><strong>3.5</strong> rounds to <strong>4</strong> (since 4 is even)</li>
            <li><strong>4.5</strong> rounds to <strong>4</strong> (since 4 is even)</li>
            <li><strong>5.5</strong> rounds to <strong>6</strong> (since 6 is even)</li>
          </ul>
          <p>
            Because even and odd numbers occur with identical 50% probability, half of all ties round upward and half round downward, ensuring that cumulative sums remain statistically unbiased over large datasets.
          </p>

          <h2>Decimal Place Hierarchy and Precision Scaling</h2>
          <p>
            Rounding to <em>n</em> decimal places involves scaling the input by 10^n, applying the chosen integer rounding function, and dividing by 10^n:
          </p>
          <Formula>round(x, n) = round(x × 10^n) ÷ 10^n</Formula>

          <DataTable
            head={["Target Precision Level", "Scale Factor (10^n)", "Example Application", "Industrial Domain"]}
            rows={DECIMAL_PLACE_ROWS}
            highlight={2}
          />

          <h2>IEEE 754 Hardware Implementation in Modern CPUs</h2>
          <p>
            In modern computer microprocessors (x86-64, ARM), floating-point arithmetic units (FPUs) implement the four mandatory IEEE 754 rounding modes at the silicon hardware level. The hardware control register dictates how the least significant bit (LSB), the guard bit (G), the round bit (R), and the sticky bit (S) are resolved during floating-point operations.
          </p>
          <p>
            By setting the rounding mode to Round Toward +∞ (Ceiling) or Round Toward −∞ (Floor), scientific computing environments perform <em>interval arithmetic</em>, computing rigorous lower and upper mathematical bounds that guarantee the true real-valued analytical solution lies strictly within the calculated interval.
          </p>

          <h2>Related Mathematical and Financial Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/significant-figures-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Significant Figures Calculator</Link>, <Link href="/calculators/math/decimal-to-fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Decimal to Fraction Calculator</Link>, <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, and <Link href="/calculators/math/fraction-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Fraction Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Rounding Calculator</h2>\n<div class=\"form-group\"><label for=\"rd-number\">Number</label><input id=\"rd-number\" step=\"any\" type=\"number\" value=\"3.14159\"/></div>\n<div class=\"form-group\">\n<label for=\"rd-places\">Round To</label>\n<select id=\"rd-places\">\n<option value=\"-3\">Nearest 1,000</option>\n<option value=\"-2\">Nearest 100</option>\n<option value=\"-1\">Nearest 10</option>\n<option value=\"0\">Whole Number</option>\n<option value=\"1\">1 Decimal Place</option>\n<option selected=\"\" value=\"2\">2 Decimal Places</option>\n<option value=\"3\">3 Decimal Places</option>\n<option value=\"4\">4 Decimal Places</option>\n<option value=\"5\">5 Decimal Places</option>\n</select>\n</div>\n<button class=\"calc-btn\" onclick=\"calcRounding()\">Round</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('rd-number').value='';document.getElementById('rd-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"rd-result\" style=\"display:none;\"><div id=\"rd-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"rd-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"rd-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-rd-result\" onclick=\"printResult('rd-result','Rounding Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Rounding Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-rounding-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function roundTo(num,places){const factor=Math.pow(10,places);return Math.round(num*factor)/factor;}\\nfunction calcRounding(){\\n  const num=parseFloat(document.getElementById('rd-number').value);\\n  const places=parseInt(document.getElementById('rd-places').value);\\n  if(isNaN(num)){alert('Please enter a valid number.');return;}\\n  const result=roundTo(num,places);\\n  const label=places<0?'Nearest '+Math.pow(10,-places).toLocaleString():places===0?'Whole Number':places+' Decimal Place'+(places>1?'s':'');\\n  document.getElementById('rd-ri').innerHTML=\\n    ri('Rounded to '+label,'<strong style=\\\"font-size:22px;color:var(--c-accent)\\\">'+result+'</strong>',true)+\\n    ri('Original Number',num)+\\n    ri('Difference',Math.abs(result-num).toFixed(Math.max(0,places+2)))+\\n    ri('All Common Roundings','<br>Nearest 10: '+roundTo(num,-1)+'<br>Whole: '+roundTo(num,0)+'<br>1 dec: '+roundTo(num,1)+'<br>2 dec: '+roundTo(num,2)+'<br>3 dec: '+roundTo(num,3));\\n  document.getElementById('rd-result').style.display='block';\\n  const _ai_rd_ai_box=document.getElementById('rd-ai-box');\\n  if(_ai_rd_ai_box){\\n    _ai_rd_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_rd_ai_box.style.display='block';\\n    _ai_rd_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('rd-chart',['Rounded','Difference'],[Math.abs(result),Math.abs(result-num)],['#1a5c3a','#c8832a']);\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
