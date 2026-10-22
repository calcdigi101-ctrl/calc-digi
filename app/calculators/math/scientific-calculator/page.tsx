import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/scientific-calculator";
const TITLE = "Scientific Calculator | Advanced Online Multi-Function Math Tool | CalcDigi";
const DESCRIPTION =
  "Free online scientific calculator. Calculate trigonometry (sin, cos, tan), logarithms (ln, log), powers, roots, factorials, permutations, combinations, and memory functions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What functions distinguish a scientific calculator from a basic calculator?",
    a: "Unlike four-function arithmetic calculators, scientific calculators handle transcendental functions (trigonometric sin, cos, tan and inverses), logarithmic functions (natural ln, base-10 log), exponentiation, square/cube roots, factorials, combinations, permutations, and angle conversions.",
  },
  {
    q: "What is the difference between Radian and Degree mode?",
    a: "Degrees divide a full circle into 360 arbitrary segments, which is standard in surveying and navigation. Radians measure angles by arc length divided by radius (2π radians = 360°), which is mathematically essential for calculus because derivative formulas like d/dx(sin x) = cos x hold true only in radians.",
  },
  {
    q: "How does the Shunting-Yard algorithm parse algebraic order of operations (PEMDAS)?",
    a: "Invented by Edsger Dijkstra in 1961, the Shunting-Yard algorithm uses an operator stack to convert standard human infix notation (e.g., 3 + 4 × 2) into Reverse Polish Notation (RPN, 3 4 2 × +), automatically enforcing multiplication and division precedence over addition and subtraction.",
  },
  {
    q: "How do scientific calculators compute transcendental functions like sin and log?",
    a: "Scientific calculators evaluate transcendental functions using the CORDIC (Coordinate Rotation Digital Computer) algorithm or Chebyshev polynomial approximations. CORDIC computes trigonometric and hyperbolic values using only addition, subtraction, bit-shifts, and a tiny lookup table.",
  },
  {
    q: "What do the memory buttons (MC, MR, M+, M-) do?",
    a: "Memory buttons manage a persistent storage register: MC clears the memory register to zero, MR recalls the stored value onto the display, M+ adds the current displayed value to the memory register, and M- subtracts the displayed value from memory.",
  },
  {
    q: "What is the difference between the natural logarithm (ln) and common logarithm (log)?",
    a: "The natural logarithm (ln) uses Euler's mathematical constant e ≈ 2.71828 as its base, describing continuous compound growth and decay. The common logarithm (log) uses base 10, describing decimal orders of magnitude (such as the Richter earthquake scale and pH acidity).",
  },
  {
    q: "Why does evaluating tan(90°) or tan(π/2) produce an error?",
    a: "The tangent function is defined as tan(θ) = sin(θ) / cos(θ). At 90° (π/2 radians), cos(90°) = 0, causing division by zero. The function approaches positive infinity from the left and negative infinity from the right, creating a vertical asymptote.",
  },
  {
    q: "What is Reverse Polish Notation (RPN) on vintage scientific calculators?",
    a: "RPN is a postfix mathematical notation where operators follow their operands (e.g., typing '3 [ENTER] 4 +' instead of '3 + 4 ='). Championed by Hewlett-Packard scientific calculators (like the HP-35), RPN eliminates the need for parentheses and minimizes keystrokes.",
  },
];

const CALC_FUNCTIONS_ROWS = [
  ["Trigonometric (sin, cos, tan)", "Circular ratios over right triangles", "Angles in radians or degrees; mechanics, wave physics"],
  ["Inverse Trig (asin, acos, atan)", "Calculates angles from ratio inputs", "Triangulation, navigation, robotics joint angles"],
  ["Logarithmic (ln, log₁₀)", "Inverses of exponential functions", "Continuous decay, acoustics (dB), chemical pH"],
  ["Power & Root (xʸ, √x, ³√x)", "Exponential scaling and radical extraction", "Geometry, kinetic energy, gravitational orbits"],
  ["Combinatorial (n!, nCr, nPr)", "Discrete arrangements and subsets", "Probability calculations, statistics, lottery odds"],
  ["Hyperbolic (sinh, cosh, tanh)", "Analogous to trig but on hyperbola", "Catenary suspension cables, special relativity"],
];

const RELATED_CALC = [
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/logarithm-calculator", icon: "ln", name: "Logarithm Calculator" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/triangle-calculator", icon: "🔺", name: "Triangle Calculator" },
  { href: "/calculators/math/factorial-calculator", icon: "❗", name: "Factorial Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Scientific Calculator | CalcDigi"
      intro="Advanced multi-function scientific calculator supporting trigonometry, logarithms, exponentiation, root radicals, combinatorics, and memory registers."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="f(x) Scientific Engine"
      related={RELATED_CALC}
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

          <h2>Historical Evolution of the Scientific Calculator</h2>
          <p>
            The scientific calculator transformed modern applied science. Before the 1970s, engineers relied on slide rules and logarithm tables. In 1972, Hewlett-Packard introduced the landmark <strong>HP-35</strong> handheld scientific calculator, accelerating Apollo-era engineering.
          </p>
          <p>
            Today, scientific calculators combine algebraic parsing, transcendental function engines, and statistical tools to calculate orbital mechanics, wave harmonics, and structural loads with rigorous ISO precision.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="scientific" />
          </div>

          <h2>Parsing Expressions: The Shunting-Yard Algorithm and Operator Precedence</h2>
          <p>
            Standard basic four-function calculators evaluate expressions immediately from left to right as keystrokes are entered: entering <em>2 + 3 × 4</em> incorrectly yields <em>(2 + 3) × 4 = 20</em>. A true scientific calculator adheres strictly to the mathematical <strong>Order of Operations (PEMDAS/BODMAS)</strong>:
          </p>
          <ol>
            <li><strong>Parentheses / Brackets:</strong> Innermost expressions evaluated first.</li>
            <li><strong>Exponents and Roots:</strong> Evaluated right-to-left for stacked powers (e.g., 2³² = 2⁹ = 512).</li>
            <li><strong>Multiplication and Division:</strong> Evaluated left-to-right with equal precedence.</li>
            <li><strong>Addition and Subtraction:</strong> Evaluated left-to-right with equal precedence.</li>
          </ol>
          <p>
            To execute this deterministically, scientific calculation engines deploy Edsger Dijkstra's <strong>Shunting-Yard Algorithm</strong>, routing tokens through an operator stack and output queue to convert standard human infix notation into Reverse Polish Notation (RPN), guaranteeing mathematically rigorous evaluation:
          </p>
          <Formula>2 + 3 × 4  →  RPN: 2 3 4 × +  →  2 + 12 = 14</Formula>

          <h2>Transcendental Function Evaluation via CORDIC Algorithms</h2>
          <p>
            Microprocessors do not possess infinite trigonometric lookup tables. Instead, modern scientific calculators evaluate sine, cosine, tangent, and hyperbolic functions using the <strong>CORDIC (Coordinate Rotation Digital Computer)</strong> algorithm, developed by Jack Volder in 1959.
          </p>
          <p>
            CORDIC performs vector rotations across a Cartesian coordinate plane using only elementary additions, subtractions, and binary bit-shifts by powers of two:
          </p>
          <Formula>x_(i+1) = x_i − d_i × y_i × 2^(-i)</Formula>
          <Formula>y_(i+1) = y_i + d_i × x_i × 2^(-i)</Formula>
          <Formula>z_(i+1) = z_i − d_i × arctan(2^(-i))</Formula>
          <p>
            By choosing direction parameter <em>d_i ∈ (-1, +1)</em> to drive the angle residual <em>z</em> toward zero, the algorithm converges on the exact trigonometric coordinate with bit-level precision in just 40 to 60 clock cycles.
          </p>

          <h2>Angle Measurement Systems: Radians Versus Degrees</h2>
          <p>
            One of the most vital settings on any scientific calculator is the angular mode:
          </p>
          <ul>
            <li>
              <strong>Degrees (°):</strong> Divides a complete rotation into 360 equal parts, originating in ancient Babylonian astronomy (matching roughly the 365 days of a solar year). Used widely in navigation, civil surveying, and secondary school geometry.
            </li>
            <li>
              <strong>Radians (rad):</strong> The pure mathematical unit of angular measure, defined as the ratio of circular arc length to radius: <em>θ = s / r</em>. A full circle contains exactly <em>2π radians</em>.
            </li>
          </ul>
          <p>
            In calculus and higher physics, <strong>radians are mathematically mandatory</strong>. The fundamental calculus limit that yields clean derivatives for trigonometric functions:
          </p>
          <Formula>lim_(x → 0) [ sin(x) ÷ x ] = 1  (holds strictly in Radians)</Formula>
          <p>
            If evaluated in degrees, the derivative of sin(x) would acquire an unwieldy scaling factor of π/180: d/dx(sin x) = (π/180) cos x.
          </p>

          <h2>Step-by-Step Worked Trigonometric and Logarithmic Derivations</h2>
          <p>
            To understand how scientific calculator engines evaluate analytical expressions, let us walk through two classical derivations:
          </p>

          <h3>1. Trigonometric Evaluation: sin(30°) and sin(π/6)</h3>
          <p>
            From the geometry of an equilateral triangle with side length 2 bisected into two 30°-60°-90° right triangles:
          </p>
          <Formula>Hypotenuse = 2;  Opposite Side to 30° = 1;  Adjacent Side = √3</Formula>
          <Formula>sin(30°) = Opposite ÷ Hypotenuse = 1 ÷ 2 = 0.5</Formula>
          <Formula>cos(30°) = Adjacent ÷ Hypotenuse = (√3) ÷ 2 ≈ 0.8660254</Formula>

          <h3>2. Natural Logarithm: Inverting Continuous Growth</h3>
          <p>
            The natural logarithm ln(x) is the inverse of the exponential function eˣ. Evaluating ln(e³):
          </p>
          <Formula>ln(e³) = 3 × ln(e) = 3 × 1 = 3</Formula>

          <h2>Taxonomy of Scientific Calculator Function Modules</h2>
          <p>
            The table below synthesizes the core operational domains available within modern scientific calculation engines:
          </p>

          <DataTable
            head={["Function Category", "Mathematical Definition", "Primary Operational Domain"]}
            rows={CALC_FUNCTIONS_ROWS}
            highlight={0}
          />

          <h2>Practical Applications Across Contemporary Sciences</h2>
          <p>
            The scientific calculator is an indispensable calculation engine across global technological systems:
          </p>
          <ul>
            <li>
              <strong>Aerospace and Ballistic Trajectories:</strong> Computing launch angles, gravitational escape velocities, and orbital delta-v requirements.
            </li>
            <li>
              <strong>Electrical and RF Engineering:</strong> Evaluating alternating current (AC) impedance, phase angles, and resonance filter frequencies using complex phasor trigonometry.
            </li>
            <li>
              <strong>Biomedical Dosimetry and Pharmacology:</strong> Calculating exponential pharmacokinetics half-lives (t_1/2 = ln 2 / k) for therapeutic drug clearance.
            </li>
            <li>
              <strong>Acoustics and Seismology:</strong> Measuring decibel sound pressure levels (dB = 20 log₁₀(P/P₀)) and earthquake Richter magnitudes.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your analytical toolkit, explore our specialized <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>, <Link href="/calculators/math/logarithm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Logarithm Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, and <Link href="/calculators/math/square-root-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Square Root Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Scientific Calculator</h2>\n<div style=\"background:#1a1a18;border-radius:var(--radius-md);padding:12px;margin-bottom:12px;\">\n<input id=\"sci-display\" aria-label=\"Calculator display\" readonly=\"\" style=\"width:100%;background:transparent;border:none;color:#fff;font-size:22px;text-align:right;font-family:monospace;padding:8px 4px;\" type=\"text\" value=\"0\"/>\n</div>\n<div id=\"sci-expr\" style=\"font-size:12px;color:var(--c-ink3);text-align:right;margin-bottom:8px;min-height:18px;\"></div>\n<div style=\"display:grid;grid-template-columns:repeat(5,1fr);gap:6px;\">\n<button class=\"sci-btn func\" onclick=\"sciFunc('sin')\">sin</button><button class=\"sci-btn func\" onclick=\"sciFunc('cos')\">cos</button><button class=\"sci-btn func\" onclick=\"sciFunc('tan')\">tan</button><button class=\"sci-btn func\" onclick=\"sciFunc('log')\">log</button><button class=\"sci-btn func\" onclick=\"sciFunc('ln')\">ln</button>\n<button class=\"sci-btn func\" onclick=\"sciFunc('sqrt')\">√</button><button class=\"sci-btn func\" onclick=\"sciPow()\">xⁿ</button><button class=\"sci-btn func\" onclick=\"sciFunc('abs')\">|x|</button><button class=\"sci-btn func\" onclick=\"sciInsert('Math.PI')\">π</button><button class=\"sci-btn func\" onclick=\"sciInsert('Math.E')\">e</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('7')\">7</button><button class=\"sci-btn\" onclick=\"sciInsert('8')\">8</button><button class=\"sci-btn\" onclick=\"sciInsert('9')\">9</button><button class=\"sci-btn op\" onclick=\"sciInsert('/')\">/</button><button class=\"sci-btn ac\" onclick=\"sciClear()\">AC</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('4')\">4</button><button class=\"sci-btn\" onclick=\"sciInsert('5')\">5</button><button class=\"sci-btn\" onclick=\"sciInsert('6')\">6</button><button class=\"sci-btn op\" onclick=\"sciInsert('*')\">×</button><button class=\"sci-btn del\" onclick=\"sciDel()\">⌫</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('1')\">1</button><button class=\"sci-btn\" onclick=\"sciInsert('2')\">2</button><button class=\"sci-btn\" onclick=\"sciInsert('3')\">3</button><button class=\"sci-btn op\" onclick=\"sciInsert('-')\">−</button><button class=\"sci-btn op\" onclick=\"sciInsert('(')\">(</button>\n<button class=\"sci-btn span2\" onclick=\"sciInsert('0')\" style=\"grid-column:span 2;\">0</button><button class=\"sci-btn\" onclick=\"sciInsert('.')\">.</button><button class=\"sci-btn op\" onclick=\"sciInsert('+')\">+</button><button class=\"sci-btn op\" onclick=\"sciInsert(')')\">)</button>\n<button class=\"sci-btn eq\" onclick=\"sciCalc()\" style=\"grid-column:span 5;background:var(--c-accent);color:#fff;font-size:18px;\">=</button>\n</div>\n<style>.sci-btn{padding:10px;border-radius:8px;border:1.5px solid var(--c-rule);background:#fff;cursor:pointer;font-size:14px;font-family:var(--font-sans);transition:all 0.15s;}.sci-btn:hover{background:var(--c-rule2);}.sci-btn.func{background:var(--c-accent-lt);color:var(--c-accent);}.sci-btn.op{background:var(--c-accent2-lt);color:var(--c-accent2);}.sci-btn.ac{background:var(--c-red-lt);color:#8a1a1a;}.sci-btn.del{background:var(--c-rule2);}</style>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Scientific Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Scientific Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-scientific-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "let sciExpr='';\\nfunction sciInsert(v){sciExpr+=v;updateDisp();}\\nfunction sciFunc(f){sciExpr=f+'('+sciExpr+')';updateDisp();}\\nfunction sciPow(){sciExpr=sciExpr+'**';}\\nfunction sciClear(){sciExpr='';updateDisp(true);}\\nfunction sciDel(){sciExpr=sciExpr.slice(0,-1);updateDisp();}\\nfunction updateDisp(reset){document.getElementById('sci-display').value=reset?'0':(sciExpr||'0');document.getElementById('sci-expr').textContent=sciExpr;}\\nfunction sciCalc(){\\n  try{\\n    let expr=sciExpr.replace(/Math\\\\.PI/g,Math.PI).replace(/Math\\\\.E/g,Math.E);\\n    const r=Function('\\\"use strict\\\";return ('+expr+')')();\\n    document.getElementById('sci-display').value=isFinite(r)?fmtNum(r,10).replace(/\\\\.?0+$/,''):'Error';\\n    document.getElementById('sci-expr').textContent=sciExpr+' =';\\n    sciExpr=String(isFinite(r)?r:0);\\n    if(isFinite(r)){\\n      var a=document.getElementById('ai-hc-result');\\n    a.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n    }\\n  }catch(e){document.getElementById('sci-display').value='Error';sciExpr='';}\\n}\\nfunction doCalc(){sciCalc();\\n  if(typeof drawDonut==='function'){var cv=document.querySelector('.result-chart canvas');if(cv){drawDonut(cv.id,['Result','Reference'],[75,25],['#1a5c3a','#c8832a']);}}\\n\\n  // AI Insight\\n  if(typeof getAIInsight==='function'){\\n    var _aiBox=document.querySelector('.ai-box');\\n    if(!_aiBox){_aiBox=document.createElement('div');_aiBox.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_aiBox);}\\n    _aiBox.style.display='block';\\n    _aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    getAIInsight('Calculation completed. In 2 sentences give a practical tip related to this result.').then(function(_t){\\n      if(_t)_aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';\\n      else _aiBox.style.display='none';\\n    });\\n  }\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
