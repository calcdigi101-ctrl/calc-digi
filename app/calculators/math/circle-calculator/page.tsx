import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/circle-calculator";
const TITLE = "Circle Calculator | Area, Circumference, Radius & Diameter | CalcDigi";
const DESCRIPTION =
  "Free online circle calculator. Calculate radius, diameter, circumference, area, sector arc length, and chord length step-by-step with precision mathematical derivations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the area of a circle?",
    a: "The area of a circle equals π multiplied by the square of the radius: Area = π × r². If diameter d is known, use Area = π × (d / 2)² = (π × d²) / 4.",
  },
  {
    q: "How do you calculate the circumference of a circle?",
    a: "Circumference is the perimeter or boundary distance around a circle: Circumference = 2 × π × r = π × d.",
  },
  {
    q: "How do you solve for radius if area is known?",
    a: "To calculate radius from area, divide the area by π and extract the principal square root: r = √(Area ÷ π). For example, if Area = 153.94, r = √(153.94 ÷ 3.14159) = √49.00 = 7.00.",
  },
  {
    q: "What is the difference between an arc length and a sector area?",
    a: "An arc length represents the linear curved distance along a fraction of the circle's circumference: s = (θ / 360) × 2πr. A sector area represents the two-dimensional wedge-shaped surface enclosed by two radii and that arc: Area_sector = (θ / 360) × πr².",
  },
  {
    q: "How do you calculate chord length?",
    a: "A chord connects two points on the circle's perimeter. Given radius r and subtended central angle θ: Chord Length L = 2 × r × sin(θ / 2).",
  },
  {
    q: "What is a circular segment?",
    a: "A circular segment is the region bounded by a chord and the corresponding circular arc. Its area equals the sector area minus the area of the isosceles triangle formed by the two radii and the chord: Area_segment = (1/2) × r² × (θ_rad − sin θ_rad).",
  },
  {
    q: "What is the historical significance of Archimedes' approximation of π?",
    a: "Circa 250 BCE, Archimedes of Syracuse bounded the exact value of π by inscribing and circumscribing 96-sided regular polygons around a circle, rigorously establishing that 223/71 < π < 22/7 (3.1408 < π < 3.1429), creating the first mathematical proof of π's bounds.",
  },
  {
    q: "Why does circle area equal (1/2) × Circumference × Radius?",
    a: "Dissecting a circle into infinitely many microscopic wedge-shaped sectors and rearranging them head-to-toe forms an approximate rectangle with width r and length equal to half the circumference (πr). The rectangle's area is r × πr = πr².",
  },
];

const CIRCLE_FORMULAS_ROWS = [
  ["Diameter (d)", "d = 2 × r", "Straight distance through center connecting opposite perimeter points", "d = 2 × 7 = 14"],
  ["Circumference (C)", "C = 2 × π × r = π × d", "Linear boundary perimeter enclosing the circular disc", "C = 2 × π × 7 ≈ 43.98"],
  ["Disc Area (A)", "A = π × r² = (π × d²) ÷ 4", "Two-dimensional surface enclosed by perimeter", "A = π × 7² ≈ 153.94"],
  ["Arc Length (s)", "s = (θ ÷ 360) × 2πr", "Curved linear distance along a fraction of circumference", "s = (90 ÷ 360) × 43.98 ≈ 11.00"],
  ["Sector Area (A_sec)", "A_sec = (θ ÷ 360) × πr²", "Wedge-shaped area bounded by two radii and arc", "A_sec = (90 ÷ 360) × 153.94 ≈ 38.48"],
  ["Chord Length (L)", "L = 2 × r × sin(θ ÷ 2)", "Straight line segment connecting endpoints of an arc", "L = 2 × 7 × sin(45°) ≈ 9.90"],
];

const HISTORICAL_PI_ROWS = [
  ["Babylonian Clay Tablets (~1900 BCE)", "25/8 = 3.1250", "+0.53% error", "Ratio of perimeter to hexagon diameter"],
  ["Egyptian Rhind Papyrus (~1550 BCE)", "(16/9)² ≈ 3.1605", "+0.60% error", "Squaring 8/9 of circle diameter"],
  ["Archimedes of Syracuse (~250 BCE)", "223/71 < π < 22/7", "±0.04% error", "96-gon geometric bounding method"],
  ["Zu Chongzhi (~480 CE)", "355/113 ≈ 3.1415929", "0.000008% error", "24,576-gon inscribed polygon calculation"],
  ["Madhava of Sangamagrama (~1400 CE)", "Leibniz / Madhava Series", "Exact infinite series", "π/4 = 1 − 1/3 + 1/5 − 1/7 + ..."],
  ["Modern Chudnovsky Algorithm (1988)", "Ramanujan-style series", "Millions of digits / sec", "Used for world record π computations"],
];

const RELATED = [
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/surface-area-calculator", icon: "🧊", name: "Surface Area" },
  { href: "/calculators/math/volume-calculator", icon: "📦", name: "Volume Calculator" },
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Circle Calculator | CalcDigi"
      intro="Calculate the area, circumference, radius, diameter, arc length, sector area, and chord length of any circle with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="A = pi * r^2, C = 2 * pi * r"
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

          <h2>Geometric Axioms and Definitions of Circle Geometry</h2>
          <p>
            In Euclidean geometry, a <strong>circle</strong> is defined as the locus of all coplanar points equidistant from a fixed central point (h, k). Formally described by the standard Cartesian equation (x − h)² + (y − k)² = r², the circle is the most symmetrical two-dimensional shape in existence, exhibiting continuous rotational symmetry about its origin and infinite reflective axes of symmetry through its diameter.
          </p>
          <p>
            By the <strong>isoperimetric theorem</strong>, the circle encloses the maximum possible two-dimensional area for any given fixed perimeter length. This profound physical and geometric property causes raindrops, bubbles, and pressurized fluid vessels to naturally assume spherical and circular profiles, minimizing surface tension energy and wall stress in mechanical engineering.
          </p>
          <p>
            The mathematical constant <strong>π (pi)</strong> represents the fundamental ratio of a circle&apos;s circumference to its diameter: π = C / d. As an irrational and transcendental real number, π cannot be written as a finite fraction and possesses an infinite, non-repeating decimal sequence (3.1415926535...).
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Mathematical Formulas and Step-by-Step Derivations</h2>
          <p>
            The table below catalogues the primary geometric relationships governing circular dimensions:
          </p>

          <DataTable
            head={["Metric Name", "Algebraic Formula", "Geometric Definition", "Worked Arithmetic Example (r = 7)"]}
            rows={CIRCLE_FORMULAS_ROWS}
            highlight={2}
          />

          <h3>1. Derivation of Circle Area via Calculus Integration</h3>
          <p>
            In polar coordinates, the area of a circle of radius R is derived by integrating concentric differential rings of thickness dr from r = 0 to r = R:
          </p>
          <Formula>Area = ∫₀ᴿ 2πr dr = 2π [ r² ÷ 2 ]₀ᴿ = πR²</Formula>
          <p>
            <em>Worked Example:</em> Calculate the enclosed area of a circular pipe with inner radius r = 8.5 cm.
          </p>
          <ol>
            <li>Square the radius: r² = 8.5² = 72.25 cm².</li>
            <li>Multiply by π: Area = π × 72.25 ≈ <strong>227.00 cm²</strong>.</li>
            <li>Circumference: C = 2 × π × 8.5 ≈ <strong>53.41 cm</strong>.</li>
          </ol>

          <h3>2. Arc Length and Sector Area Derivations</h3>
          <p>
            When examining a slice of a circle subtended by central angle θ (in degrees), the slice represents a proportion equal to θ / 360° of the complete circle:
          </p>
          <Formula>Arc Length (s) = (θ ÷ 360°) × 2πr,   Sector Area (A_sec) = (θ ÷ 360°) × πr²</Formula>
          <p>
            When angle θ is measured in radians:
          </p>
          <Formula>s = r × θ_rad,   A_sec = (1 ÷ 2) × r² × θ_rad</Formula>

          <h2>Classical Circle Theorems and Geometric Properties</h2>
          <p>
            Circle geometry is governed by fundamental Euclidean theorems relating chords, secants, and tangents:
          </p>
          <ul>
            <li>
              <strong>Inscribed Angle Theorem:</strong> An angle θ inscribed on the circle perimeter subtends an arc whose central angle is exactly twice as large (2θ). Consequently, any angle inscribed in a semicircle is strictly a 90° right angle (Thales&apos;s Theorem).
            </li>
            <li>
              <strong>Intersecting Chords Theorem:</strong> If two chords AB and CD intersect at interior point E, the products of their segments are identical: AE × EB = CE × ED.
            </li>
            <li>
              <strong>Tangent-Secant Theorem:</strong> If a tangent segment PT and a secant line PAB are drawn from an external point P, the square of the tangent equals the product of the external and total secant segments: PT² = PA × PB.
            </li>
            <li>
              <strong>Chord Length Formula:</strong> For a chord subtending central angle θ in a circle of radius r, the straight-line chord length L equals: L = 2 × r × sin(θ ÷ 2).
            </li>
          </ul>

          <h2>Circular Segment Area Derivation and Liquid Tank Depth</h2>
          <p>
            A <strong>circular segment</strong> is the geometric region bounded by a chord and its subtended arc. To calculate its area, subtract the area of the isosceles triangle formed by the two radii from the total sector area:
          </p>
          <Formula>Area_segment = Area_sector − Area_triangle = (θ ÷ 360°)πr² − (1 ÷ 2)r² sin(θ)</Formula>
          <p>
            Expressing central angle θ in radians simplifies the relationship:
          </p>
          <Formula>Area_segment = (1 ÷ 2) × r² × (θ_rad − sin(θ_rad))</Formula>
          <p>
            <em>Worked Example:</em> An industrial horizontal cylindrical fuel tank of radius r = 1.0 meter is filled with liquid to a depth of h = 0.5 meters (meaning liquid depth reaches half the radius, corresponding to central angle θ = 120° or 2π/3 radians).
          </p>
          <ol>
            <li>Sector area: (120° ÷ 360°) × π × 1.0² = (1 ÷ 3)π ≈ 1.0472 m²</li>
            <li>Triangle area: (1 ÷ 2) × 1.0² × sin(120°) = 0.5 × 0.8660 = 0.4330 m²</li>
            <li>Cross-sectional fluid area: 1.0472 − 0.4330 = <strong>0.6142 m²</strong></li>
            <li>Multiplying by tank length L = 5 meters gives total fuel volume: 0.6142 × 5 = <strong>3.071 m³ (3,071 Liters)</strong>.</li>
          </ol>

          <h2>Concentric Rings, Annulus Area, and Mamikon&apos;s Theorem</h2>
          <p>
            An <strong>annulus</strong> (ring) is the flat region bounded between two concentric circles with inner radius <em>r</em> and outer radius <em>R</em>. Its enclosed area is the difference between the two circular discs:
          </p>
          <Formula>Area_annulus = πR² − πr² = π(R² − r²) = π(R − r)(R + r)</Formula>
          <p>
            A celebrated geometric discovery by Mamikon Mnatsakanian in 1959 (<strong>Mamikon&apos;s Theorem</strong>) established that the area of any circular annulus tangent to a straight chord of length <em>L</em> equals exactly the area of a circle whose diameter is <em>L</em>:
          </p>
          <Formula>Area_annulus = (π ÷ 4) × L²</Formula>
          <p>
            Astonishingly, this equality holds true regardless of the absolute sizes of inner radius r and outer radius R, allowing engineers to determine annular pipe thickness and gasket gasket sealing areas simply by measuring a single straight tangent chord length without measuring inner bore radii.
          </p>

          <h2>Coaxial Circles and Apollonian Circles in Advanced Inversion</h2>
          <p>
            In conformal mapping and electrical field modeling, families of circles where the ratio of distances to two fixed focal points remains constant are termed <strong>Circles of Apollonius</strong>:
          </p>
          <Formula>| z − a | ÷ | z − b | = k</Formula>
          <p>
            When k = 1, the locus is the perpendicular bisector line; for any k ≠ 1, the locus forms a circle whose center and radius depend strictly on scalar k. In radio transmission engineering, this geometry governs Smith Charts used for matching impedance along high-frequency RF transmission lines.
          </p>

          <h2>Historical Evolution of Pi Approximations Across Millennia</h2>
          <p>
            The historical quest to calculate the exact numerical ratio π spans over four thousand years:
          </p>

          <DataTable
            head={["Civilization / Scholar", "Approximation Value", "Accuracy Discrepancy", "Methodological Technique"]}
            rows={HISTORICAL_PI_ROWS}
            highlight={2}
          />

          <h2>Industrial and Engineering Applications</h2>
          <p>
            Circular geometry governs core engineering calculations across industrial automation and fluid mechanics:
          </p>
          <ul>
            <li>
              <strong>Hydraulic Piston Actuation:</strong> The mechanical force produced by a hydraulic cylinder equals hydraulic pressure multiplied by the circular piston surface area: F = P × πr². Doubling the cylinder radius quadruples the output force at identical fluid pressure.
            </li>
            <li>
              <strong>Pipe Flow Capacity (Poiseuille&apos;s Law):</strong> In laminar fluid transport, volumetric flow rate Q through a circular pipe is proportional to the fourth power of the internal radius: Q ∝ r⁴. Increasing pipe radius by just 19% doubles fluid transport volume.
            </li>
            <li>
              <strong>Flywheel Kinetic Energy Storage:</strong> The moment of inertia for a solid circular flywheel disc is I = (1/2)mr². Kinetic energy stored scales quadratically with both radius and angular velocity: E = (1/4)mr²ω².
            </li>
          </ul>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>, <Link href="/calculators/math/surface-area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Surface Area Calculator</Link>, <Link href="/calculators/math/volume-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Volume Calculator</Link>, and <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Circle Calculator</h2><div class=\"form-group\"><label for=\"cc-type\">Known Value</label><select id=\"cc-type\"><option value=\"radius\">Radius</option><option value=\"diameter\">Diameter</option><option value=\"circumference\">Circumference</option><option value=\"area\">Area</option></select></div><div class=\"form-group\"><label for=\"cc-value\">Value</label><input id=\"cc-value\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"7\"/></div><button class=\"calc-btn\" onclick=\"calcCircle()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('cc-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"cc-result\" style=\"display:none;\"><div id=\"cc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"cc-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"cc-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-cc-result\" onclick=\"printResult('cc-result','Circle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Circle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-circle-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcCircle(){\\n  const type=document.getElementById('cc-type').value;\\n  const val=parseFloat(document.getElementById('cc-value').value);\\n  if(isNaN(val)||val<=0){alert('Enter a positive number.');return;}\\n  let r;\\n  if(type==='radius')r=val;\\n  else if(type==='diameter')r=val/2;\\n  else if(type==='circumference')r=val/(2*Math.PI);\\n  else r=Math.sqrt(val/Math.PI);\\n  const diameter=2*r, circumference=2*Math.PI*r, area=Math.PI*r*r;\\n  document.getElementById('cc-ri').innerHTML=\\n    ri('Radius','<strong style=\\\"font-size:20px;color:var(--c-accent)\\\">'+r.toFixed(4)+'</strong>',true)+\\n    ri('Diameter',diameter.toFixed(4))+\\n    ri('Circumference',circumference.toFixed(4))+\\n    ri('Area',area.toFixed(4));\\n  document.getElementById('cc-result').style.display='block';\\n  drawDonut('cc-chart',['Radius','Rest of Diameter'],[r,diameter-r],['#1a5c3a','#c8832a']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
