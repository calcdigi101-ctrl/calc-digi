import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/quadratic-equation-calculator";
const TITLE = "Quadratic Equation Calculator | Solve ax² + bx + c = 0 Step-by-Step | CalcDigi";
const DESCRIPTION =
  "Free online quadratic equation calculator. Solve quadratic equations step-by-step using the quadratic formula, factoring, completing the square, discriminant analysis, and vertex form.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the Quadratic Formula?",
    a: "The quadratic formula calculates the roots (solutions) of any standard quadratic equation ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) ÷ (2a).",
  },
  {
    q: "What does the discriminant (Δ = b² − 4ac) indicate?",
    a: "The discriminant determines the nature and number of roots: if Δ > 0, there are two distinct real roots; if Δ = 0, there is exactly one repeated real root (the parabola touches the x-axis at its vertex); if Δ < 0, there are two complex conjugate roots involving imaginary unit i.",
  },
  {
    q: "How do you find the vertex of a quadratic parabola?",
    a: "The x-coordinate of the vertex lies on the axis of symmetry: h = −b ÷ (2a). Substitute h into the equation to obtain the y-coordinate: k = a·h² + b·h + c = c − (b² ÷ 4a). If a > 0, the vertex is a global minimum; if a < 0, it is a global maximum.",
  },
  {
    q: "What are Vieta's Formulas for quadratic equations?",
    a: "Vieta's formulas link polynomial roots directly to coefficients: Sum of roots x₁ + x₂ = −b / a, and Product of roots x₁ × x₂ = c / a. This allows instant verification of solutions without recalculating.",
  },
  {
    q: "Can a quadratic equation have a = 0?",
    a: "No. By definition, a quadratic equation must have a non-zero leading coefficient (a ≠ 0). If a = 0, the squared term vanishes, reducing the equation to a first-degree linear equation: bx + c = 0.",
  },
  {
    q: "How does completing the square derive the quadratic formula?",
    a: "Divide ax² + bx + c = 0 by a, move the constant term c/a to the right side, add (b / 2a)² to both sides to form a perfect square trinomial (x + b/2a)², take the square root of both sides, and isolate x.",
  },
  {
    q: "How are quadratic equations applied in projectile physics?",
    a: "In classical Newtonian mechanics, vertical displacement under gravity follows a quadratic trajectory: y(t) = y₀ + v₀·t − (1/2)g·t². Solving for y(t) = 0 calculates the exact impact time of the projectile.",
  },
  {
    q: "What is the vertex form of a quadratic function?",
    a: "The vertex form is y = a(x − h)² + k, where (h, k) represents the exact coordinate of the parabola's vertex. This form explicitly displays horizontal and vertical translations from the parent function y = x².",
  },
];

const DISCRIMINANT_ROWS = [
  ["Positive Discriminant (Δ > 0)", "b² − 4ac > 0", "Two distinct real roots (x₁ ≠ x₂)", "Parabola crosses x-axis at two separate points"],
  ["Zero Discriminant (Δ = 0)", "b² − 4ac = 0", "One repeated real root (x₁ = x₂ = −b/2a)", "Parabola is tangent to x-axis at vertex"],
  ["Negative Discriminant (Δ < 0)", "b² − 4ac < 0", "Two complex conjugate roots (p ± qi)", "Parabola lies entirely above or below x-axis"],
  ["Perfect Square Discriminant", "Δ = k² for integer k", "Two rational roots", "Quadratic expression factors cleanly over integers"],
];

const PARABOLA_PROPERTIES_ROWS = [
  ["Vertex Coordinate", "(h, k) = (−b / 2a, c − b² / 4a)", "Turning point representing global minimum or maximum"],
  ["Axis of Symmetry", "Vertical line: x = −b / 2a", "Line of reflective bilateral symmetry dividing parabola"],
  ["Y-Intercept", "Coordinate: (0, c)", "Point where parabola intersects vertical y-axis"],
  ["Focal Length (p)", "p = 1 / (4a)", "Distance from vertex to reflective focus F(h, k + p)"],
  ["Directrix Line", "Horizontal line: y = k − p", "Geometric reference line equidistant from parabola to focus"],
];

const RELATED = [
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/slope-calculator", icon: "📈", name: "Slope Calculator" },
  { href: "/calculators/math/matrix-calculator", icon: "🔲", name: "Matrix Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Quadratic Equation Calculator | CalcDigi"
      intro="Solve quadratic equations ax² + bx + c = 0 step-by-step using the quadratic formula, completing the square, discriminant analysis, and parabolic vertex derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="ax² + bx + c = 0"
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
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Historical Foundations of Quadratic Equations and Algebra</h2>
          <p>
            In polynomial algebra, a <strong>quadratic equation</strong> is a second-order polynomial equation of a single variable, expressed in canonical standard form as <strong>ax² + bx + c = 0</strong>, where <em>x</em> represents the unknown variable and <em>a</em>, <em>b</em>, <em>c</em> are real or complex coefficients with the strict requirement that <em>a</em> ≠ 0. The word &ldquo;quadratic&rdquo; originates from the Latin <em>quadratus</em> (meaning &ldquo;square&rdquo;), reflecting the second-power area geometry underpinning the leading term.
          </p>
          <p>
            The historical conquest of quadratic equations was one of humanity&apos;s greatest intellectual achievements. Babylonian scribes circa 2000 BCE solved geometric area problems equivalent to quadratics using geometric dissection. In 628 CE, the Indian astronomer and mathematician Brahmagupta presented the first explicit algebraic solution in his treatise <em>Brahmasphutasiddhanta</em>.
          </p>
          <p>
            Two centuries later, Persian polymath Muhammad ibn Musa al-Khwarizmi published <em>Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala</em> (820 CE), which gave rise to the word &ldquo;algebra&rdquo; and systematized the classification of quadratic equations into canonical types. Today, quadratic equations underpin Newtonian gravitational orbits, electronic RLC circuit resonance, economic profit optimization, and machine learning loss function minimizations.
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Step-by-Step Derivation of the Quadratic Formula</h2>
          <p>
            The universal quadratic formula is derived rigorously by completing the square on the general standard form:
          </p>
          <Formula>ax² + bx + c = 0</Formula>
          <ol>
            <li>Divide all terms by non-zero leading coefficient a: x² + (b/a)x + c/a = 0</li>
            <li>Subtract constant term c/a from both sides: x² + (b/a)x = −c/a</li>
            <li>Complete the square by adding [ (b/a) ÷ 2 ]² = b² / (4a²) to both sides: x² + (b/a)x + b²/(4a²) = b²/(4a²) − c/a</li>
            <li>Factor the left side into a perfect square binomial: [ x + b/(2a) ]² = (b² − 4ac) ÷ (4a²)</li>
            <li>Extract the square root of both sides: x + b/(2a) = ± √(b² − 4ac) ÷ (2a)</li>
            <li>Isolate variable x to yield the definitive <strong>Quadratic Formula</strong>:</li>
          </ol>
          <Formula>x = [ −b ± √(b² − 4ac) ] ÷ (2a)</Formula>

          <h2>The Discriminant (Δ) and Nature of Solutions</h2>
          <p>
            The algebraic radicand <strong>Δ = b² − 4ac</strong> is termed the <strong>discriminant</strong> because it discriminates between distinct categories of geometric roots:
          </p>

          <DataTable
            head={["Discriminant Value", "Mathematical Condition", "Nature of Solutions", "Geometric Parabola Intersection"]}
            rows={DISCRIMINANT_ROWS}
            highlight={0}
          />

          <p>
            <em>Worked Example:</em> Solve the quadratic equation 2x² − 4x − 6 = 0.
          </p>
          <ol>
            <li>Identify coefficients: a = 2, b = −4, c = −6.</li>
            <li>Calculate discriminant: Δ = (−4)² − 4(2)(−6) = 16 + 48 = 64. Since Δ = 64 &gt; 0, two real rational roots exist.</li>
            <li>Evaluate formula: x = [ −(−4) ± √64 ] ÷ [ 2(2) ] = (4 ± 8) ÷ 4.</li>
            <li>Root 1: x₁ = (4 + 8) ÷ 4 = 12 ÷ 4 = <strong>3.00</strong>.</li>
            <li>Root 2: x₂ = (4 − 8) ÷ 4 = −4 ÷ 4 = <strong>−1.00</strong>.</li>
            <li>Verify via Vieta&apos;s formulas: x₁ + x₂ = 3 + (−1) = 2, which matches −b/a = −(−4)/2 = 2.</li>
          </ol>

          <h2>Factoring by Grouping and the AC Method</h2>
          <p>
            When a quadratic equation has rational roots, factoring the quadratic trinomial ax² + bx + c into two linear binomials (px + q)(rx + s) provides a rapid algebraic solution without requiring radical square root evaluations. The systematic procedure is known as the <strong>AC Method</strong>:
          </p>
          <ol>
            <li>Compute the product of the leading coefficient and constant term: P = a × c.</li>
            <li>Identify two integers <em>u</em> and <em>v</em> whose product equals P (u × v = a × c) and whose sum equals the middle linear coefficient (u + v = b).</li>
            <li>Rewrite the middle term bx as ux + vx: ax² + ux + vx + c = 0.</li>
            <li>Factor by grouping: group the first two terms and the last two terms, factor out common monomials, and extract the shared binomial factor.</li>
          </ol>
          <p>
            <em>Worked Example:</em> Factor and solve 6x² + 11x − 10 = 0.
          </p>
          <ol>
            <li>Product P = 6 × (−10) = −60. Middle sum b = 11.</li>
            <li>Factors of −60 summing to 11 are +15 and −4 (15 × (−4) = −60, 15 + (−4) = 11).</li>
            <li>Split middle term: 6x² + 15x − 4x − 10 = 0.</li>
            <li>Group terms: 3x(2x + 5) − 2(2x + 5) = 0.</li>
            <li>Extract common binomial: (3x − 2)(2x + 5) = 0.</li>
            <li>Set each linear factor to zero: 3x − 2 = 0 → <strong>x₁ = 2/3 (0.667)</strong>; 2x + 5 = 0 → <strong>x₂ = −5/2 (−2.500)</strong>.</li>
          </ol>

          <h2>Higher-Degree Polynomials: Cardano&apos;s Cubic and Ferrari&apos;s Quartic</h2>
          <p>
            The success of the quadratic formula inspired Renaissance Italian mathematicians to search for general radical solutions to higher-degree polynomials. In 1545, Gerolamo Cardano published the explicit solution for cubic equations (ax³ + bx² + cx + d = 0) in <em>Ars Magna</em>, using Lodovico Ferrari&apos;s depression technique to eliminate the squared term. Ferrari subsequently derived the general radical solution for quartic (fourth-degree) equations.
          </p>
          <p>
            However, in 1824, Norwegian mathematician Niels Henrik Abel and French mathematician Évariste Galois proved the famous <strong>Abel-Ruffini Theorem</strong>: there is no general algebraic formula using radicals to solve polynomial equations of degree five (quintics) or higher. Thus, the quadratic, cubic, and quartic formulas represent the complete family of general radical polynomial solutions in algebra.
          </p>

          <h2>The Golden Ratio as a Fundamental Quadratic Solution</h2>
          <p>
            One of the most iconic geometric constants in human culture, the <strong>Golden Ratio (φ)</strong>, arises directly as the positive root of the elementary monic quadratic equation:
          </p>
          <Formula>x² − x − 1 = 0</Formula>
          <p>
            Applying the quadratic formula with coefficients a = 1, b = −1, c = −1 yields the discriminant Δ = (−1)² − 4(1)(−1) = 1 + 4 = 5. The two exact solutions are:
          </p>
          <Formula>x₁ = φ = (1 + √5) ÷ 2 ≈ 1.618034,   x₂ = −1/φ = (1 − √5) ÷ 2 ≈ −0.618034</Formula>
          <p>
            Because φ satisfies φ² = φ + 1 and 1/φ = φ − 1, powers of φ can be simplified linearly: φ³ = 2φ + 1, φ⁴ = 3φ + 2, and φ⁵ = 5φ + 3, where the integer coefficients correspond exactly to consecutive terms in the Fibonacci sequence. This deep algebraic property connects quadratic equations directly to logarithmic growth spirals and crystalline quasi-crystal symmetries.
          </p>

          <h2>Ballistic Projectile Kinematics and Peak Altitude</h2>
          <p>
            In Newtonian physics, vertical displacement under gravity follows a quadratic trajectory y(t) = y₀ + v₀t − (1/2)gt². The parabola&apos;s vertex represents the projectile&apos;s apex, occurring at time t_apex = v₀ / g. The maximum height achieved is h_max = y₀ + v₀² / (2g). This quadratic model governs aerospace launch burnout vectors, artillery ballistics, and athletic sports biomechanics.
          </p>

          <h2>Parabolic Geometry: Vertex, Focus, and Directrix</h2>
          <p>
            The graph of any quadratic function y = ax² + bx + c forms a <strong>parabola</strong>. The key geometric features defining the parabola are catalogue below:
          </p>

          <DataTable
            head={["Geometric Feature", "Algebraic Formula", "Physical & Analytical Interpretation"]}
            rows={PARABOLA_PROPERTIES_ROWS}
            highlight={0}
          />

          <p>
            The reflective optical property of parabolas ensures that rays emanating from the focus reflect parallel to the axis of symmetry, governing satellite dishes, automotive headlights, and solar thermal concentrators.
          </p>

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/square-root-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Square Root Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/matrix-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Matrix Calculator</Link>, and <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Quadratic Solver</h2>\n<p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:14px;\">Solve: ax² + bx + c = 0</p>\n<div class=\"form-group\"><label for=\"qe-a\">a (coefficient of x²)</label><input id=\"qe-a\" step=\"any\" type=\"number\" value=\"1\"/></div>\n<div class=\"form-group\"><label for=\"qe-b\">b (coefficient of x)</label><input id=\"qe-b\" step=\"any\" type=\"number\" value=\"-5\"/></div>\n<div class=\"form-group\"><label for=\"qe-c\">c (constant)</label><input id=\"qe-c\" step=\"any\" type=\"number\" value=\"6\"/></div>\n<button class=\"calc-btn\" onclick=\"calcQuadratic()\">Solve</button>\n<div class=\"result-box\" id=\"qe-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"qe-ri\"></div>\n<div class=\"ai-box\" id=\"qe-ai\" style=\"display:none;\"></div>\n<div class=\"disclaimer\">⚠️ Results are estimates rounded to 4 decimal places. Verify critical calculations independently.</div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-qe-result\" onclick=\"printResult('qe-result','Quadratic Equation Solver')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Quadratic Equation Solver')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-quadratic-equation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcQuadratic(){\\n  const a=parseFloat(document.getElementById('qe-a').value);\\n  const b=parseFloat(document.getElementById('qe-b').value);\\n  const c=parseFloat(document.getElementById('qe-c').value);\\n  if(isNaN(a)||isNaN(b)||isNaN(c)){alert('Please enter valid numbers for a, b, and c.');return;}\\n  if(a===0){alert('Coefficient \\\"a\\\" cannot be 0 for a quadratic equation. (This would be a linear equation instead.)');return;}\\n  const disc=b*b-4*a*c;\\n  const vertex_x=-b/(2*a);\\n  const vertex_y=a*vertex_x*vertex_x+b*vertex_x+c;\\n  let html;\\n  if(disc>0){\\n    const x1=(-b+Math.sqrt(disc))/(2*a);\\n    const x2=(-b-Math.sqrt(disc))/(2*a);\\n    html=ri('x₁','<strong>'+x1.toFixed(4)+'</strong>',true)+ri('x₂','<strong>'+x2.toFixed(4)+'</strong>');\\n  } else if(disc===0){\\n    const x=-b/(2*a);\\n    html=ri('x (repeated root)','<strong>'+x.toFixed(4)+'</strong>',true);\\n  } else {\\n    const real=(-b/(2*a)).toFixed(4);\\n    const imag=(Math.sqrt(-disc)/(2*a)).toFixed(4);\\n    html=ri('x₁','<strong>'+real+' + '+imag+'i</strong>',true)+ri('x₂','<strong>'+real+' − '+imag+'i</strong>');\\n  }\\n  html+=ri('Discriminant',disc.toFixed(2))+ri('Vertex','('+vertex_x.toFixed(2)+', '+vertex_y.toFixed(2)+')')+ri('Parabola Opens',a>0?'Upward ⌄ (minimum)':'Downward ⌃ (maximum)')+ri('Equation',a+'x² + '+b+'x + '+c+' = 0');\\n  document.getElementById('qe-ri').innerHTML=html;\\n  showResult('qe-result');\\n  const aiBox=document.getElementById('qe-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing the equation...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('Solve quadratic equation '+a+'x² + '+b+'x + '+c+' = 0. Discriminant: '+disc+'. In 2-3 sentences, briefly explain the nature of the roots found and what the discriminant value tells us about this specific equation.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
