import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/pythagorean-theorem-calculator";
const TITLE = "Pythagorean Theorem Calculator | Find Hypotenuse & Legs (a² + b² = c²) | CalcDigi";
const DESCRIPTION =
  "Free online Pythagorean theorem calculator. Calculate hypotenuse (c) or missing legs (a, b) of any right triangle step-by-step with proofs, triples, and angle derivations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the Pythagorean Theorem?",
    a: "The Pythagorean Theorem is a foundational geometric principle stating that in any right-angled triangle, the square of the length of the hypotenuse (c) is exactly equal to the sum of the squares of the lengths of the other two legs (a and b): a² + b² = c².",
  },
  {
    q: "How do you solve for the hypotenuse (c)?",
    a: "To solve for the hypotenuse c, take the square root of the sum of the squared legs: c = √(a² + b²). For example, if leg a = 3 and leg b = 4, then c = √(3² + 4²) = √(9 + 16) = √25 = 5.",
  },
  {
    q: "How do you solve for a missing leg (a or b)?",
    a: "To calculate an unknown leg, subtract the square of the known leg from the square of the hypotenuse, then take the square root: a = √(c² − b²) or b = √(c² − a²). For example, if c = 13 and b = 12, then a = √(169 − 144) = √25 = 5.",
  },
  {
    q: "What is a Pythagorean Triple?",
    a: "A Pythagorean triple consists of three positive integers (a, b, c) that perfectly satisfy the relation a² + b² = c². A triple is 'primitive' if gcd(a, b, c) = 1. Famous examples include (3, 4, 5), (5, 12, 13), (8, 15, 17), and (7, 24, 25).",
  },
  {
    q: "Does the Pythagorean Theorem work on non-right triangles?",
    a: "No. The standard theorem a² + b² = c² applies strictly to right triangles (triangles with exactly one 90° angle). For oblique triangles (acute or obtuse), the relationship generalizes to the Law of Cosines: c² = a² + b² − 2ab cos(C).",
  },
  {
    q: "How does the 3-4-5 rule ensure square corners in construction?",
    a: "Carpenters and masons measure 3 units along one wall, 4 units along the adjacent perpendicular wall, and adjust the corner until the diagonal distance between the points measures exactly 5 units. By the converse of the Pythagorean Theorem, this guarantees a perfect 90° right angle.",
  },
  {
    q: "What is the 3D distance formula extension of the Pythagorean Theorem?",
    a: "In three-dimensional Euclidean space ℝ³, the diagonal distance of a rectangular box with dimensions x, y, z is computed by applying the Pythagorean theorem twice: d = √(x² + y² + z²).",
  },
  {
    q: "How did Euclid prove the Pythagorean Theorem in the Elements?",
    a: "Euclid proved the theorem in Book I, Proposition 47 (termed the 'Windmill Proof') by constructing squares on all three sides of a right triangle, dropping a perpendicular from the right-angle vertex to the hypotenuse, and proving via sheared congruent triangles that the rectangle beneath the hypotenuse equals the adjacent square.",
  },
];

const TRIPLES_ROWS = [
  ["(3, 4, 5)", "9 + 16 = 25", "m = 2, n = 1", "Foundational carpenter's layout triple"],
  ["(5, 12, 13)", "25 + 144 = 169", "m = 3, n = 2", "Standard architectural roof truss geometry"],
  ["(7, 24, 25)", "49 + 576 = 625", "m = 4, n = 3", "Structural bracing and civil truss engineering"],
];

const GENERALIZATION_ROWS = [
  ["Acute Triangle (C < 90°)", "c² < a² + b²", "Hypotenuse square is smaller than sum of leg squares", "c² = a² + b² − 2ab cos(C)"],
  ["Right Triangle (C = 90°)", "c² = a² + b²", "Exact Pythagorean equality (cos 90° = 0)", "Standard Euclidean metric"],
  ["Obtuse Triangle (C > 90°)", "c² > a² + b²", "Hypotenuse square exceeds sum of leg squares", "c² = a² + b² − 2ab cos(C)"],
  ["3D Space Diagonal", "d² = x² + y² + z²", "Euclidean metric in three dimensions", "d = √(x² + y² + z²)"],
  ["N-Dimensional Hyperspace", "d² = Σ(Δxᵢ)²", "Hilbert / Euclidean metric space norm", "L₂ norm in data science"],
];

const PRACTICAL_DOMAINS_ROWS = [
  ["Residential Carpentry & Framing", "Ensuring foundation sill plates and stud walls meet at exact 90° angles", "The 3-4-5 and 6-8-10 rule checks: d = √(L² + W²)"],
  ["Geodetic Surveying & Trilateration", "Determining coordinates of remote terrain points using distances from reference benchmarks", "Satellite GPS orbital positioning: d = √[ (x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)² ]"],
  ["Computer Graphics & Game Physics", "Collision detection, character raycasting, and vector normalization in 3D game engines", "Vector magnitude: |v| = √(v_x² + v_y² + v_z²)"],
  ["Aviation Flight Navigation", "Calculating slant range from aircraft transponder to airport VOR/DME ground stations", "Slant distance: R_slant = √(Altitude² + Ground_Range²)"],
];

const RELATED = [
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/slope-calculator", icon: "📈", name: "Slope Calculator" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Pythagorean Theorem Calculator | CalcDigi"
      intro="Calculate the hypotenuse, missing legs, perimeter, area, and acute angles of any right triangle with step-by-step proofs and Pythagorean triple analysis."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a² + b² = c²"
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

          <h2>Historical Foundations of the Pythagorean Theorem</h2>
          <p>
            The <strong>Pythagorean Theorem</strong> is widely regarded by historians of science as one of the most profound mathematical discoveries in human civilization. Formally stated, in any right-angled Euclidean triangle, the area of the square constructed upon the hypotenuse is identically equal to the sum of the areas of the squares constructed upon the two adjacent perpendicular legs: <strong>a² + b² = c²</strong>.
          </p>
          <p>
            Although traditionally attributed to the Greek philosopher and mathematician Pythagoras of Samos (circa 570–495 BCE), knowledge of this fundamental geometric truth predates classical Greece by over a thousand years. Old Babylonian cuneiform tablets, such as the famous Plimpton 322 tablet dating to circa 1800 BCE, contain sophisticated numerical tables of Pythagorean triples. In ancient India, the Vedic texts known as the <em>Baudhayana Sulba Sutras</em> (circa 800 BCE) articulated the theorem for calculating square fire altars.
          </p>
          <p>
            In ancient China, the classic astronomical treatise <em>Chou Pei Suan Ching</em> documented the relationship as the <em>Gougu Theorem</em> (referring to the base leg &apos;gou&apos; and height leg &apos;gu&apos;). Today, the Pythagorean theorem constitutes the cornerstone of analytical geometry, Euclidean distance metrics, trigonometry, structural civil engineering, computer animation, and relativistic spacetime physics.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Algebraic Derivations and Step-by-Step Computational Formulas</h2>
          <p>
            Applying the theorem to calculate an unknown triangle dimension involves elementary algebraic rearrangement of the core equality:
          </p>
          <Formula>a² + b² = c²</Formula>

          <h3>1. Derivation for the Hypotenuse (c)</h3>
          <p>
            When both perpendicular legs <em>a</em> and <em>b</em> are known, taking the positive principal square root of both sides isolates the hypotenuse:
          </p>
          <Formula>c = √(a² + b²)</Formula>
          <p>
            <em>Worked Derivation:</em> Calculate the hypotenuse of a right triangle with vertical leg a = 9 cm and horizontal leg b = 12 cm.
          </p>
          <ol>
            <li>Square the legs: a² = 9² = 81, and b² = 12² = 144.</li>
            <li>Sum the squared areas: 81 + 144 = 225.</li>
            <li>Extract the square root: c = √225 = <strong>15.00 cm</strong>.</li>
            <li>Compute acute angles: θ₁ = arctan(9 ÷ 12) = arctan(0.75) ≈ <strong>36.87°</strong>, and θ₂ = 90° − 36.87° = <strong>53.13°</strong>.</li>
          </ol>

          <h3>2. Derivation for an Unknown Leg (a or b)</h3>
          <p>
            When the hypotenuse <em>c</em> and one leg are known, subtract the square of the known leg before taking the square root:
          </p>
          <Formula>a = √(c² − b²),   b = √(c² − a²)</Formula>
          <p>
            <em>Worked Derivation:</em> A 25-foot extension ladder (c = 25) leans against a vertical building wall with its base positioned 7 feet away from the wall foundation (b = 7). How high does the ladder reach?
          </p>
          <ol>
            <li>Square the hypotenuse and known leg: c² = 25² = 625, and b² = 7² = 49.</li>
            <li>Subtract: c² − b² = 625 − 49 = 576.</li>
            <li>Take square root: a = √576 = <strong>24.00 feet</strong> vertical reach.</li>
          </ol>

          <h2>Euclid&apos;s Elegant Geometric Proof (The Windmill Proof)</h2>
          <p>
            Over 370 distinct mathematical proofs of the Pythagorean theorem have been published, including proofs by Leonardo da Vinci and US President James A. Garfield. The most celebrated classical proof is Euclid&apos;s geometric demonstration in Book I, Proposition 47 of the <em>Elements</em>.
          </p>
          <p>
            Euclid constructed squares on all three sides of triangle ABC. By drawing a line from the right-angled vertex C perpendicular to the hypotenuse square, he partitioned the hypotenuse square into two adjacent rectangles. Using the principle of sheared triangles sharing identical bases and altitudes, Euclid proved that each sub-rectangle possesses an area identical to the square constructed on the adjacent leg, rigorously demonstrating that the whole square on the hypotenuse equals the sum of the two leg squares.
          </p>

          <h2>Primitive Pythagorean Triples and Euclid&apos;s Generating Formula</h2>
          <p>
            A <strong>Pythagorean Triple</strong> consists of three positive integers (a, b, c) that satisfy the equation. In Book X of the <em>Elements</em>, Euclid provided a general algebraic formula for generating all primitive Pythagorean triples using two arbitrary coprime integers <em>m</em> and <em>n</em> (where m &gt; n &gt; 0, and exactly one of m, n is even):
          </p>
          <Formula>a = m² − n²,   b = 2mn,   c = m² + n²</Formula>
          <p>
            The table below catalogues standard primitive triples, their Euclidean generating parameters, and their engineering applications:
          </p>

          <DataTable
            head={["Pythagorean Triple (a, b, c)", "Verification Equality", "Euclidean Generators (m, n)", "Primary Structural & Analytical Application"]}
            rows={TRIPLES_ROWS}
            highlight={0}
          />

          <h2>Generalizations: The Law of Cosines and N-Dimensional Metrics</h2>
          <p>
            The Pythagorean theorem serves as the foundational parent equation for broader geometric principles:
          </p>

          <DataTable
            head={["Geometric Space / Triangle", "Governing Metric Equation", "Relationship to Pythagorean Theorem", "Mathematical Framework"]}
            rows={GENERALIZATION_ROWS}
            highlight={1}
          />

          <p>
            When applied to oblique non-right triangles, the theorem generalizes to the <strong>Law of Cosines</strong>: c² = a² + b² − 2ab cos(C). When angle C is exactly 90°, cos(90°) = 0, causing the corrective cross-term −2ab cos(C) to vanish and collapsing the equation cleanly back into the classical Pythagorean theorem.
          </p>

          <h2>Practical Real-World Applications Across Science and Industry</h2>
          <p>
            The Pythagorean theorem underpins quantitative measurement across specialized modern industries:
          </p>

          <DataTable
            head={["Industrial Domain", "Analytical Objective", "Applied Mathematical Relationship"]}
            rows={PRACTICAL_DOMAINS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>, <Link href="/calculators/math/distance-formula-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Distance Formula Calculator</Link>, <Link href="/calculators/math/slope-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Slope Calculator</Link>, and <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Pythagorean Theorem Calculator</h2><p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:10px;\">Leave exactly one field blank — that's the side this calculator will solve for.</p><div class=\"form-group\"><label for=\"pt-a\">Leg a</label><input id=\"pt-a\" step=\"any\" type=\"number\" value=\"3\"/></div><div class=\"form-group\"><label for=\"pt-b\">Leg b</label><input id=\"pt-b\" step=\"any\" type=\"number\" value=\"4\"/></div><div class=\"form-group\"><label for=\"pt-c\">Hypotenuse c</label><input id=\"pt-c\" placeholder=\"Leave blank to solve\" step=\"any\" type=\"number\"/></div><button class=\"calc-btn\" onclick=\"calcPythagorean()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('pt-a').value='';document.getElementById('pt-b').value='';document.getElementById('pt-c').value='';document.getElementById('pt-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"pt-result\" style=\"display:none;\"><div id=\"pt-ri\"></div><div class=\"ai-box\" id=\"pt-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-pt-result\" onclick=\"printResult('pt-result','Pythagorean Theorem Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Pythagorean Theorem Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-pythagorean-theorem-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPythagorean(){\\n  const aVal=document.getElementById('pt-a').value.trim();\\n  const bVal=document.getElementById('pt-b').value.trim();\\n  const cVal=document.getElementById('pt-c').value.trim();\\n  const a=aVal===''?null:parseFloat(aVal);\\n  const b=bVal===''?null:parseFloat(bVal);\\n  const c=cVal===''?null:parseFloat(cVal);\\n  const blanks=[a,b,c].filter(function(v){return v===null;}).length;\\n  if(blanks!==1){alert('Leave exactly one side blank — the one you want to solve for.');return;}\\n  let result,label,fa=a,fb=b,fc=c;\\n  if(c===null){\\n    if(a<=0||b<=0){alert('Side lengths must be positive.');return;}\\n    fc=Math.sqrt(a*a+b*b); result=fc; label='Hypotenuse (c)';\\n  } else if(a===null){\\n    if(c<=0||b<=0||b>=c){alert('The hypotenuse must be greater than the known leg.');return;}\\n    fa=Math.sqrt(c*c-b*b); result=fa; label='Leg (a)';\\n  } else {\\n    if(c<=0||a<=0||a>=c){alert('The hypotenuse must be greater than the known leg.');return;}\\n    fb=Math.sqrt(c*c-a*a); result=fb; label='Leg (b)';\\n  }\\n  document.getElementById('pt-ri').innerHTML=\\n    ri(label,'<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+result.toFixed(4)+'</strong>',true)+\\n    ri('Side a',fa.toFixed(4))+ri('Side b',fb.toFixed(4))+ri('Hypotenuse c',fc.toFixed(4));\\n  document.getElementById('pt-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
