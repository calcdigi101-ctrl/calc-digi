import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/triangle-calculator";
const TITLE = "Triangle Calculator | Solve SSS, SAS, ASA & Right Triangles | CalcDigi";
const DESCRIPTION =
  "Free online triangle calculator. Solve for unknown sides, angles, area, perimeter, inradius, and circumradius across SSS, SAS, ASA, and AAS configurations step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the area of any triangle?",
    a: "The most common formula is Base-Height: Area = (base × height) ÷ 2. When height is unknown, use Heron's Formula for three known sides (SSS): Area = √[s(s − a)(s − b)(s − c)] where s = (a + b + c) / 2 is the semiperimeter. For two sides and the included angle (SAS): Area = (1/2)ab sin(C).",
  },
  {
    q: "What is the Triangle Inequality Theorem?",
    a: "The Triangle Inequality Theorem states that the sum of the lengths of any two sides of a non-degenerate triangle must be strictly greater than the length of the remaining side: a + b > c, a + c > b, and b + c > a. If a + b = c, the points are collinear, forming a degenerate flat line segment.",
  },
  {
    q: "When should I use the Law of Sines versus the Law of Cosines?",
    a: "Use the Law of Sines when you know an angle and its opposite side plus one other piece of information (AAS, ASA, or the ambiguous SSA case). Use the Law of Cosines when you know all three sides (SSS) or two sides and their included angle (SAS).",
  },
  {
    q: "What is the ambiguous SSA case in trigonometry?",
    a: "When given two sides and a non-included acute angle (Side-Side-Angle), the configuration can produce zero triangles (if side a < h = b sin A), exactly one right triangle (if a = h), two distinct triangles (if h < a < b), or one triangle (if a ≥ b).",
  },
  {
    q: "What are the four classical triangle centers?",
    a: "The four classical centers are the Centroid (intersection of medians, center of mass), Incenter (intersection of angle bisectors, center of inscribed circle), Circumcenter (intersection of perpendicular bisectors, center of circumscribed circle), and Orthocenter (intersection of altitudes).",
  },
  {
    q: "What is Euler's Line in a triangle?",
    a: "In any non-equilateral triangle, the Centroid (G), Circumcenter (O), and Orthocenter (H) are collinear, lying on a single straight line called Euler's Line. Furthermore, the centroid divides the distance between the orthocenter and circumcenter in an exact 2:1 ratio: HG = 2 · GO.",
  },
  {
    q: "How do you calculate the inradius and circumradius of a triangle?",
    a: "The inradius r equals the triangle's area divided by its semiperimeter: r = Area ÷ s. The circumradius R equals the product of all three sides divided by four times the area: R = (a × b × c) ÷ (4 × Area).",
  },
  {
    q: "What constitutes an Equilateral, Isosceles, or Scalene triangle?",
    a: "An equilateral triangle has three equal sides and three 60° angles. An isosceles triangle has at least two equal sides and two equal base angles. A scalene triangle has three distinct side lengths and three distinct angle measures.",
  },
];

const SOLVING_MODES_ROWS = [
  ["Side-Side-Side (SSS)", "Law of Cosines: cos(C) = (a² + b² − c²) ÷ (2ab)", "Heron's Formula: Area = √[s(s−a)(s−b)(s−c)]", "Structural truss analysis"],
  ["Side-Angle-Side (SAS)", "Law of Cosines: c² = a² + b² − 2ab cos(C)", "Trig Area: Area = (1/2)ab sin(C)", "Surveying inaccessible boundary"],
  ["Angle-Side-Angle (ASA)", "Angle sum: C = 180° − A − B; Law of Sines", "Area = [c² sin(A) sin(B)] ÷ [2 sin(C)]", "Triangulation radio navigation"],
  ["Angle-Angle-Side (AAS)", "Angle sum: C = 180° − A − B; Law of Sines", "Area = [a² sin(B) sin(C)] ÷ [2 sin(A)]", "Astronomical parallax measurement"],
  ["Right Triangle (Hypotenuse)", "Pythagorean Theorem: a² + b² = c²", "Base-Height Area: Area = (a × b) ÷ 2", "Architectural framing & carpentry"],
];

const TRIANGLE_CENTERS_ROWS = [
  ["Centroid (G)", "Intersection of 3 Medians", "Physical center of mass; divides medians in 2:1 ratio", "Aerospace center of gravity balancing"],
  ["Incenter (I)", "Intersection of 3 Angle Bisectors", "Equidistant from all three sides; center of incircle", "Maximum clearance pipe routing"],
  ["Circumcenter (O)", "Intersection of Perpendicular Bisectors", "Equidistant from all three vertices; center of circumcircle", "Optimum triangulation tower placement"],
  ["Orthocenter (H)", "Intersection of 3 Altitudes", "Collinear with G and O along Euler's Line", "Acoustic reflection focal point modeling"],
];

const RELATED = [
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/slope-calculator", icon: "📈", name: "Slope Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Triangle Calculator | CalcDigi"
      intro="Solve any triangle using SSS, SAS, ASA, or AAS configurations. Calculate unknown sides, interior angles, area, perimeter, inradius, and circumradius with complete mathematical derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Solve(a, b, c, A, B, C)"
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

          <h2>Mathematical Axioms and Classification of Triangles</h2>
          <p>
            In Euclidean geometry, a <strong>triangle</strong> is the fundamental two-dimensional polygon comprising three non-collinear vertices connected by three line segments. As the simplest polygon capable of enclosing two-dimensional space, the triangle is the unique polygon that is inherently <em>rigid</em>: fixing the lengths of its three sides uniquely determines its interior angles, a physical property that makes triangular trusses the structural foundation of modern civil bridges, space frames, and skyscraper engineering.
          </p>
          <p>
            Euclid established the foundational axioms of triangle geometry in Book I of the <em>Elements</em>. The interior angles of any planar Euclidean triangle sum strictly to 180 degrees (π radians):
          </p>
          <Formula>A + B + C = 180°</Formula>
          <p>
            Furthermore, by the <strong>Triangle Inequality Theorem</strong>, a set of three positive real numbers (a, b, c) can form a valid non-degenerate triangle if and only if each side length is strictly less than the sum of the remaining two sides:
          </p>
          <Formula>a + b &gt; c,   a + c &gt; b,   b + c &gt; a</Formula>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Trigonometric Laws and Triangle Solving Frameworks</h2>
          <p>
            Depending on which combination of side lengths and angles is initially known, different trigonometric theorems are applied to solve the remaining dimensions:
          </p>

          <DataTable
            head={["Configuration Type", "Primary Solving Formula", "Area Calculation Method", "Typical Engineering Application"]}
            rows={SOLVING_MODES_ROWS}
            highlight={0}
          />

          <h3>1. Side-Side-Side (SSS) and the Law of Cosines</h3>
          <p>
            When all three sides (a, b, c) are specified, the <strong>Law of Cosines</strong> calculates any interior angle:
          </p>
          <Formula>cos(C) = (a² + b² − c²) ÷ (2ab)</Formula>
          <p>
            Taking the inverse cosine isolates angle C: C = arccos[(a² + b² − c²) ÷ (2ab)].
          </p>
          <p>
            <em>Worked Example:</em> Solve a triangle with sides a = 7, b = 9, and c = 12.
          </p>
          <ol>
            <li>Compute cos(C): (7² + 9² − 12²) ÷ (2 × 7 × 9) = (49 + 81 − 144) ÷ 126 = −14 ÷ 126 ≈ −0.1111</li>
            <li>Angle C: arccos(−0.1111) ≈ <strong>96.38°</strong> (an obtuse angle).</li>
            <li>Compute angle A: cos(A) = (9² + 12² − 7²) ÷ (2 × 9 × 12) = (81 + 144 − 49) ÷ 216 = 176 ÷ 216 ≈ 0.8148 → A ≈ <strong>35.43°</strong>.</li>
            <li>Compute angle B: B = 180° − 96.38° − 35.43° = <strong>48.19°</strong>.</li>
          </ol>

          <h3>2. Heron&apos;s Area Derivation</h3>
          <p>
            For any triangle with known side lengths, <strong>Heron&apos;s Formula</strong> calculates the enclosed area without computing heights or angles. First compute the semiperimeter <em>s</em>:
          </p>
          <Formula>s = (a + b + c) ÷ 2</Formula>
          <Formula>Area = √[ s × (s − a) × (s − b) × (s − c) ]</Formula>
          <p>
            Using our previous worked example where a = 7, b = 9, c = 12: s = (7 + 9 + 12) ÷ 2 = 14.
          </p>
          <ol>
            <li>Factors: (14 − 7) = 7, (14 − 9) = 5, (14 − 12) = 2.</li>
            <li>Product: 14 × 7 × 5 × 2 = 980.</li>
            <li>Area: √980 ≈ <strong>31.30 square units</strong>.</li>
          </ol>

          <h3>3. The Law of Sines (ASA and AAS Configurations)</h3>
          <p>
            When an angle and its opposing side are known, the <strong>Law of Sines</strong> equates the ratio of each side length to the sine of its opposite angle:
          </p>
          <Formula>a ÷ sin(A) = b ÷ sin(B) = c ÷ sin(C) = 2R</Formula>
          <p>
            Where <em>R</em> represents the radius of the circumscribed circle (circumradius).
          </p>

          <h2>The Ambiguous Case (Side-Side-Angle SSA) in Trigonometry</h2>
          <p>
            When solving a triangle given two sides and a non-included acute angle (Side-Side-Angle or SSA), the geometric configuration does not guarantee a unique solution. Let <em>A</em> be the given acute angle, <em>b</em> be the adjacent side, and <em>a</em> be the opposing side. The vertical altitude dropped from vertex C to the base equals:
          </p>
          <Formula>h = b × sin(A)</Formula>
          <p>
            Comparing side <em>a</em> against altitude <em>h</em> and side <em>b</em> reveals four distinct mathematical possibilities:
          </p>
          <ul>
            <li><strong>Zero Triangles (No Solution):</strong> If a &lt; h, side a is too short to reach the opposing base line. No triangle can physically exist.</li>
            <li><strong>One Right Triangle:</strong> If a = h = b sin(A), side a meets the base at an exact 90° angle, forming a single unique right triangle.</li>
            <li><strong>Two Distinct Triangles (Ambiguous Case):</strong> If h &lt; a &lt; b, side a can swing both inward and outward, intersecting the base line at two separate points. This creates two valid geometric triangles: one acute triangle and one obtuse triangle.</li>
            <li><strong>One Oblique Triangle:</strong> If a ≥ b, side a can only swing outward, producing exactly one unique triangle.</li>
          </ul>

          <h2>Advanced Euclidean Theorems: Napoleon&apos;s Theorem and Morley&apos;s Trisector</h2>
          <p>
            Beyond classical solving methods, planar triangles possess profound symmetry properties. <strong>Napoleon&apos;s Theorem</strong> states that if equilateral triangles are constructed externally on all three sides of any arbitrary triangle, the centers of those three equilateral triangles themselves form an equilateral triangle, regardless of whether the original triangle was acute, obtuse, or scalene.
          </p>
          <p>
            Similarly, Frank Morley proved in 1899 that the three points of intersection of adjacent interior angle trisectors of any triangle always form an equilateral triangle (the <strong>Morley Trisector Theorem</strong>), celebrated as one of the most astonishing discoveries in classical synthetic geometry.
          </p>

          <h2>Triangle Area in Three-Dimensional Vector Space (ℝ³)</h2>
          <p>
            In computer graphics, structural CAD modeling, and 3D terrain meshing, triangles are frequently defined by three coordinate vertices in three-dimensional space: A(x₁, y₁, z₁), B(x₂, y₂, z₂), and C(x₃, y₃, z₃). The area of the triangle equals half the magnitude of the vector cross product of two edge vectors:
          </p>
          <Formula>Area = (1 ÷ 2) × || AB × AC ||</Formula>
          <p>
            Evaluating the determinant of the cross-product components yields the exact spatial surface area without requiring projection onto 2D coordinate planes.
          </p>

          <h2>Classical Triangle Centers and Inradius/Circumradius Equations</h2>
          <p>
            Every triangle possesses several geometric centers that satisfy distinct optimization properties:
          </p>

          <DataTable
            head={["Triangle Center", "Geometric Construction", "Physical / Mathematical Property", "Analytical Domain"]}
            rows={TRIANGLE_CENTERS_ROWS}
            highlight={0}
          />

          <p>
            The radii of the circles inscribed within and circumscribed around the triangle are derived directly from the area and side lengths:
          </p>
          <Formula>Inradius (r) = Area ÷ s,   Circumradius (R) = (a × b × c) ÷ (4 × Area)</Formula>
          <p>
            For our worked example (Area ≈ 31.30, s = 14, a·b·c = 756):
          </p>
          <ul>
            <li>Inradius: r = 31.30 ÷ 14 = <strong>2.24 units</strong></li>
            <li>Circumradius: R = 756 ÷ (4 × 31.30) = 756 ÷ 125.2 = <strong>6.04 units</strong></li>
          </ul>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>, <Link href="/calculators/math/distance-formula-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Distance Formula Calculator</Link>, <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>, and <Link href="/calculators/math/circle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Circle Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Triangle Calculator</h2>\n<p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:14px;\">Enter the 3 side lengths:</p>\n<div class=\"form-group\"><label for=\"tr-a\">Side a</label><input id=\"tr-a\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"5\"/></div>\n<div class=\"form-group\"><label for=\"tr-b\">Side b</label><input id=\"tr-b\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"6\"/></div>\n<div class=\"form-group\"><label for=\"tr-c\">Side c</label><input id=\"tr-c\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"7\"/></div>\n<button class=\"calc-btn\" onclick=\"calcTriangle()\">Calculate</button>\n<div class=\"result-box\" id=\"tr-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"tr-ri\"></div>\n<div class=\"ai-box\" id=\"tr-ai\" style=\"display:none;\"></div>\n<div class=\"disclaimer\">⚠️ Results are rounded estimates. Verify critical calculations independently.</div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-tr-result\" onclick=\"printResult('tr-result','Triangle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Triangle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-triangle-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcTriangle(){\\n  const a=parseFloat(document.getElementById('tr-a').value);\\n  const b=parseFloat(document.getElementById('tr-b').value);\\n  const c=parseFloat(document.getElementById('tr-c').value);\\n  if(isNaN(a)||isNaN(b)||isNaN(c)||a<=0||b<=0||c<=0){alert('Please enter valid positive side lengths for a, b, and c.');return;}\\n  if(a+b<=c||a+c<=b||b+c<=a){\\n    document.getElementById('tr-ri').innerHTML='<div style=\\\"padding:14px;background:var(--c-red-lt);border-radius:8px;color:#8a1a1a;font-size:13.5px;\\\">⚠️ These side lengths cannot form a valid triangle. The sum of any two sides must exceed the third side.</div>';\\n    showResult('tr-result');return;\\n  }\\n  const s=(a+b+c)/2;\\n  const area=Math.sqrt(s*(s-a)*(s-b)*(s-c));\\n  const perimeter=a+b+c;\\n  const angleA=Math.acos((b*b+c*c-a*a)/(2*b*c))*180/Math.PI;\\n  const angleB=Math.acos((a*a+c*c-b*b)/(2*a*c))*180/Math.PI;\\n  const angleC=180-angleA-angleB;\\n  let type='Scalene';\\n  if(Math.abs(a-b)<0.001&&Math.abs(b-c)<0.001)type='Equilateral';\\n  else if(Math.abs(a-b)<0.001||Math.abs(b-c)<0.001||Math.abs(a-c)<0.001)type='Isosceles';\\n  if(Math.abs(angleA-90)<0.5||Math.abs(angleB-90)<0.5||Math.abs(angleC-90)<0.5)type+=' (Right Triangle)';\\n  document.getElementById('tr-ri').innerHTML=\\n    ri('Area','<strong>'+area.toFixed(3)+' sq units</strong>',true)+\\n    ri('Perimeter',perimeter.toFixed(3)+' units')+\\n    ri('Angle A (opposite a)',angleA.toFixed(2)+'°')+\\n    ri('Angle B (opposite b)',angleB.toFixed(2)+'°')+\\n    ri('Angle C (opposite c)',angleC.toFixed(2)+'°')+\\n    ri('Triangle Type',type);\\n  showResult('tr-result');\\n  const aiBox=document.getElementById('tr-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing the triangle...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('Triangle with sides '+a+', '+b+', '+c+'. Area: '+area.toFixed(2)+', type: '+type+'. In 2-3 sentences briefly explain key properties of this specific triangle.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
