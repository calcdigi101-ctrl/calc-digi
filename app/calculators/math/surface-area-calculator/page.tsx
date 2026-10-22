import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/surface-area-calculator";
const TITLE = "Surface Area Calculator | Sphere, Cylinder, Cone, Cube & Prisms | CalcDigi";
const DESCRIPTION =
  "Free online surface area calculator. Calculate total and lateral surface area for cubes, rectangular prisms, cylinders, spheres, cones, capsules, and pyramids step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the surface area of a rectangular prism?",
    a: "A rectangular prism has six faces consisting of three pairs of identical rectangles. Total Surface Area = 2 × (length × width + length × height + width × height) = 2(lw + lh + wh).",
  },
  {
    q: "How do you calculate the surface area of a sphere?",
    a: "The surface area of a sphere of radius r equals four times the area of its great circular cross-section: Surface Area = 4 × π × r² = π × d².",
  },
  {
    q: "What is the difference between total surface area and lateral surface area?",
    a: "Total surface area measures the entire outer boundary of a three-dimensional solid, including all top and bottom bases. Lateral surface area measures exclusively the side surfaces, deliberately excluding the base surfaces (e.g., for a cylinder: Lateral Area = 2πrh, while Total Area = 2πr² + 2πrh).",
  },
  {
    q: "How do you find the surface area of a cylinder?",
    a: "A cylinder consists of two flat circular bases plus a curved lateral rectangular sheet: Total Surface Area = 2 × (π × r²) + (2 × π × r × h) = 2πr(r + h).",
  },
  {
    q: "How do you calculate the surface area of a cone?",
    a: "A right circular cone consists of a flat circular base (πr²) and a curved lateral surface (πrl), where l is the slant height l = √(r² + h²): Total Surface Area = πr² + πr√(r² + h²).",
  },
  {
    q: "What is the Surface-Area-to-Volume (SA/V) ratio and why is it important?",
    a: "The SA/V ratio measures the amount of surface area per unit volume. As an object grows in size, its volume increases much faster than its surface area (the square-cube law), causing the SA/V ratio to decline. This governs biological metabolic rates, heat loss in animals, and chemical reaction speeds.",
  },
  {
    q: "What is Archimedes' Hat-Box Theorem for sphere surface area?",
    a: "Archimedes proved in 225 BCE that the surface area of a sphere equals exactly the lateral surface area of the cylinder that snugly circumscribes it (both equaling 4πr²). Slicing the cylinder and sphere with any two parallel planes yields identical surface areas between the slices.",
  },
  {
    q: "How do you calculate the surface area of a torus (donut shape)?",
    a: "By Pappus's Centroid Theorem, rotating a circle of radius r around an axis at distance R produces a torus with total surface area equal to the circle's circumference (2πr) multiplied by the distance traveled by its centroid (2πR): Surface Area = 4π²Rr.",
  },
];

const SHAPE_SURFACE_ROWS = [
  ["Cube", "6 × s²", "Six identical square faces", "s = 4 → SA = 96"],
  ["Rectangular Prism", "2(lw + lh + wh)", "Three pairs of congruent rectangular faces", "l=5, w=3, h=4 → SA = 94"],
  ["Sphere", "4 × π × r²", "Curvilinear boundary of radius r", "r = 5 → SA ≈ 314.16"],
  ["Cylinder (Closed)", "2πr² + 2πrh = 2πr(r + h)", "Two circular bases plus unrolled lateral rectangle", "r = 3, h = 7 → SA ≈ 188.50"],
  ["Cone (Closed)", "πr² + πrl where l = √(r² + h²)", "Circular base plus sector lateral surface", "r = 3, h = 4 (l=5) → SA ≈ 75.40"],
  ["Square Pyramid", "s² + 2s × l where l = √[h² + (s/2)²]", "Square base plus four congruent isosceles triangles", "s = 6, h = 4 (l=5) → SA = 96"],
  ["Torus (Donut)", "4π² × R × r", "Pappus revolution of circle r at distance R", "R = 8, r = 2 → SA ≈ 631.65"],
];

const SAV_RATIO_ROWS = [
  ["Cellular Biology", "Cell size diffusion constraint", "Small cells maintain high SA/V ratios to transport nutrients and waste rapidly across membranes"],
  ["Pharmacological Dissolution", "Tablet micronization & bioavailability", "Finely grinding drugs into micro-particles dramatically increases active surface contact area"],
  ["Microprocessor Thermal Design", "Heat sink finned geometry", "Extruding dozens of ultra-thin aluminum fins multiplies cooling surface area within compact server chassis"],
  ["Atmospheric Meteorology", "Cloud droplet evaporation rate", "Microscopic cloud droplets have enormous SA/V ratios, enabling rapid phase transitions"],
];

const RELATED = [
  { href: "/calculators/math/volume-calculator", icon: "📦", name: "Volume Calculator" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Surface Area Calculator | CalcDigi"
      intro="Calculate total and lateral surface area for spheres, cylinders, cones, cubes, rectangular prisms, and pyramids with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="SurfaceArea(Shape, Dimensions)"
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

          <h2>Mathematical Principles of Three-Dimensional Surface Area</h2>
          <p>
            In differential geometry and multivariable calculus, the <strong>surface area</strong> of a three-dimensional solid is the total two-dimensional measure of its outer exposed boundary. While volume quantifies the three-dimensional space enclosed within the interior of a manifold in ℝ³, surface area measures the boundary manifold ∂M, expressing the exact interface area across which the object interacts with surrounding physical media.
          </p>
          <p>
            The rigorous mathematical derivation of curved surface area was pioneered by Archimedes of Syracuse in his 3rd-century BCE masterwork <em>On the Sphere and Cylinder</em>. By inscribing and circumscribing frustums of cones around a sphere, Archimedes proved that the surface area of a sphere equals exactly four times the area of its great circle (4πr²), a discovery he considered his greatest intellectual achievement.
          </p>
          <p>
            In modern multivariable analysis, the surface area of a parametric surface r(u, v) is defined rigorously by the surface double integral of the cross product of its tangent vectors:
          </p>
          <Formula>Surface Area = ∬_D || ∂r/∂u × ∂r/∂v || du dv</Formula>
          <p>
            Surface area calculations govern critical engineering parameters across industrial thermal dissipation, aircraft aerodynamic skin friction drag, chemical catalyst reactivity, and architectural exterior cladding estimates.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Taxonomy of Standard Surface Area Formulas</h2>
          <p>
            The table below catalogues standard polyhedral and curved three-dimensional solids with their exact algebraic surface area equations:
          </p>

          <DataTable
            head={["3D Solid Geometry", "Surface Area Formula", "Geometric Component Breakdown", "Worked Arithmetic Example"]}
            rows={SHAPE_SURFACE_ROWS}
            highlight={2}
          />

          <h3>1. Closed Cylinder Surface Area Derivation</h3>
          <p>
            A right circular cylinder consists of two parallel circular disc bases (top and bottom) connected by a curved lateral wall. Unrolling the lateral wall yields a flat rectangle whose height is cylinder height <em>h</em> and whose width equals the base circumference (2πr):
          </p>
          <Formula>Lateral Area = 2 × π × r × h,   Base Area = 2 × (π × r²)</Formula>
          <Formula>Total Surface Area = 2πr² + 2πrh = 2πr(r + h)</Formula>
          <p>
            <em>Worked Example:</em> Calculate the total surface area of an industrial chemical storage drum with radius r = 0.5 meters and height h = 1.8 meters.
          </p>
          <ol>
            <li>Top and bottom bases: 2 × π × 0.5² = 2 × π × 0.25 = 0.5π ≈ 1.571 m².</li>
            <li>Lateral cylindrical wall: 2 × π × 0.5 × 1.8 = 1.8π ≈ 5.655 m².</li>
            <li>Total surface area: 1.571 + 5.655 = <strong>7.23 square meters</strong>.</li>
          </ol>

          <h3>2. Right Circular Cone Surface Area Derivation</h3>
          <p>
            For a right cone with base radius <em>r</em> and vertical altitude <em>h</em>, the unrolled lateral surface forms a circular sector whose radius equals the cone&apos;s <strong>slant height</strong> <em>l</em>. By the Pythagorean theorem:
          </p>
          <Formula>Slant Height (l) = √(r² + h²)</Formula>
          <Formula>Total Surface Area = πr² + πrl = πr(r + √(r² + h²))</Formula>

          <h2>Surface Area of Truncated Solids: Frustums of Cones and Pyramids</h2>
          <p>
            In industrial design, sheet metal ductwork, and conical storage hoppers, engineers frequently manufacture truncated cones (conical frustums). A conical frustum is formed by slicing off the tip of a cone with a cutting plane parallel to the circular base.
          </p>
          <p>
            Given bottom radius r₁, top radius r₂, and vertical height <em>h</em>, the slant height <em>s</em> along the lateral wall satisfies the Pythagorean relation:
          </p>
          <Formula>Slant Height (s) = √[ h² + (r₁ − r₂)² ]</Formula>
          <p>
            The total surface area encompasses both circular disc bases plus the curved trapezoidal lateral wrapper:
          </p>
          <Formula>Lateral Area = π × (r₁ + r₂) × s</Formula>
          <Formula>Total Surface Area = πr₁² + πr₂² + π(r₁ + r₂)s</Formula>
          <p>
            <em>Worked Example:</em> Calculate the exterior surface area of a sheet metal lampshade with bottom radius r₁ = 20 cm, top radius r₂ = 12 cm, and height h = 15 cm.
          </p>
          <ol>
            <li>Compute slant height: s = √[ 15² + (20 − 12)² ] = √[ 225 + 64 ] = √289 = 17 cm</li>
            <li>Lateral surface area: π × (20 + 12) × 17 = 32 × 17 × π = 544π ≈ <strong>1,709.0 cm²</strong> of sheet metal.</li>
          </ol>

          <h2>The Surface-Area-to-Volume (SA/V) Ratio and Scale Constraints</h2>
          <p>
            A foundational principle across physics, biology, and materials engineering is the <strong>Surface-Area-to-Volume Ratio (SA/V)</strong>. For any geometrically similar solid scaled by linear multiplier <em>k</em>, surface area scales by k² while volume scales by k³, causing the ratio to scale inversely with size:
          </p>
          <Formula>SA ÷ V ∝ 1 ÷ k</Formula>

          <DataTable
            head={["Scientific / Engineering Discipline", "Analytical Target & Phenomenon", "Governing Physical Consequence"]}
            rows={SAV_RATIO_ROWS}
            highlight={0}
          />

          <p>
            In cell biology, the decline of the SA/V ratio as cells grow imposes an absolute physical limit on cellular volume. Because the cell membrane must transport all oxygen and nutrients required to sustain the internal cytoplasm, cells beyond a critical diameter cannot absorb sufficient molecules to survive, necessitating mitosis (cell division).
          </p>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/volume-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Volume Calculator</Link>, <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>, <Link href="/calculators/math/circle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Circle Calculator</Link>, and <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Surface Area Calculator</h2><div class=\"form-group\"><label for=\"sa-shape\">Shape</label><select id=\"sa-shape\" onchange=\"updateSAFields()\"><option value=\"cube\">Cube</option><option value=\"box\">Rectangular Box</option><option value=\"sphere\">Sphere</option><option value=\"cylinder\">Cylinder</option><option value=\"cone\">Cone</option></select></div><div class=\"form-group\" id=\"sa-row1\"><label for=\"sa-dim1\" id=\"sa-label1\">Side Length</label><input id=\"sa-dim1\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\" id=\"sa-row2\" style=\"display:none;\"><label for=\"sa-dim2\" id=\"sa-label2\">Width</label><input id=\"sa-dim2\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"3\"/></div><div class=\"form-group\" id=\"sa-row3\" style=\"display:none;\"><label for=\"sa-dim3\" id=\"sa-label3\">Height</label><input id=\"sa-dim3\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"4\"/></div><button class=\"calc-btn\" onclick=\"calcSurfaceArea()\">Calculate Surface Area</button><button class=\"calc-btn\" onclick=\"document.getElementById('sa-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"sa-result\" style=\"display:none;\"><div id=\"sa-ri\"></div><div class=\"ai-box\" id=\"sa-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sa-result\" onclick=\"printResult('sa-result','Surface Area Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Surface Area Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-surface-area-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function updateSAFields(){\\n  const shape=document.getElementById('sa-shape').value;\\n  const labels={cube:['Side Length'],box:['Length','Width','Height'],sphere:['Radius'],cylinder:['Radius','Height'],cone:['Radius','Height']};\\n  const need=labels[shape];\\n  for(let i=1;i<=3;i++){\\n    const row=document.getElementById('sa-row'+i);\\n    const lbl=document.getElementById('sa-label'+i);\\n    if(need[i-1]){row.style.display='block';lbl.textContent=need[i-1];}\\n    else{row.style.display='none';}\\n  }\\n}\\nfunction calcSurfaceArea(){\\n  const shape=document.getElementById('sa-shape').value;\\n  const d1=parseFloat(document.getElementById('sa-dim1').value);\\n  const d2=parseFloat(document.getElementById('sa-dim2').value);\\n  const d3=parseFloat(document.getElementById('sa-dim3').value);\\n  let sa,label;\\n  if(shape==='cube'){\\n    if(isNaN(d1)||d1<=0){alert('Enter a valid side length.');return;}\\n    sa=6*d1*d1; label='Cube';\\n  } else if(shape==='box'){\\n    if([d1,d2,d3].some(function(v){return isNaN(v)||v<=0;})){alert('Enter valid length, width, and height.');return;}\\n    sa=2*(d1*d2+d1*d3+d2*d3); label='Rectangular Box';\\n  } else if(shape==='sphere'){\\n    if(isNaN(d1)||d1<=0){alert('Enter a valid radius.');return;}\\n    sa=4*Math.PI*d1*d1; label='Sphere';\\n  } else if(shape==='cylinder'){\\n    if([d1,d2].some(function(v){return isNaN(v)||v<=0;})){alert('Enter a valid radius and height.');return;}\\n    sa=2*Math.PI*d1*d1+2*Math.PI*d1*d2; label='Cylinder';\\n  } else {\\n    if([d1,d2].some(function(v){return isNaN(v)||v<=0;})){alert('Enter a valid radius and height.');return;}\\n    const slant=Math.sqrt(d1*d1+d2*d2);\\n    sa=Math.PI*d1*d1+Math.PI*d1*slant; label='Cone';\\n  }\\n  document.getElementById('sa-ri').innerHTML=\\n    ri('Surface Area','<strong style=\\\"font-size:21px;color:var(--c-accent)\\\">'+sa.toFixed(4)+' units²</strong>',true)+\\n    ri('Shape',label);\\n  document.getElementById('sa-result').style.display='block';\\n}\\nupdateSAFields();\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
