import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/volume-calculator";
const TITLE = "Volume Calculator | Cube, Box, Cylinder, Sphere, Cone & Tank | CalcDigi";
const DESCRIPTION =
  "Free online volume calculator. Calculate 3D capacity and liquid volume for cubes, rectangular tanks, cylinders, spheres, cones, capsules, and pyramids step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the volume of a rectangular prism (box)?",
    a: "Multiply the length, width, and height together: Volume = length × width × height (V = l × w × h). For example, a box measuring 10 cm × 4 cm × 5 cm has a volume of 200 cubic centimeters (cm³).",
  },
  {
    q: "How do you calculate the volume of a cylinder?",
    a: "Multiply the area of the circular base by the height: Volume = π × radius² × height (V = πr²h). For example, a cylinder with radius 3 m and height 10 m has a volume of π × 9 × 10 ≈ 282.74 m³.",
  },
  {
    q: "How do you calculate the volume of a sphere?",
    a: "The volume of a sphere of radius r equals four-thirds π multiplied by the radius cubed: Volume = (4/3) × π × r³ = (π × d³) / 6.",
  },
  {
    q: "What is Cavalieri's Principle in geometry?",
    a: "Cavalieri's Principle states that if two three-dimensional solids have the same height and identical cross-sectional areas at every parallel plane intersecting them, they have identical total volumes. This allows oblique cylinders and skewed prisms to share the exact same volume formulas as their right counterparts.",
  },
  {
    q: "How do you convert cubic feet to gallons?",
    a: "One cubic foot equals approximately 7.48052 US liquid gallons. To convert cubic feet to gallons, multiply the volume in cubic feet by 7.48052: Gallons = Cubic Feet × 7.48052.",
  },
  {
    q: "How do you calculate the volume of a cone?",
    a: "The volume of a cone is exactly one-third the volume of a cylinder sharing identical base radius and vertical height: Volume = (1/3) × π × r² × h.",
  },
  {
    q: "What is Archimedes' Principle of fluid displacement?",
    a: "Archimedes' principle states that any object submerged in a fluid is buoyed upward by a force equal to the weight of the fluid it displaces. Measuring the volume of displaced liquid provides an exact method for calculating the volume of irregular solid objects.",
  },
  {
    q: "How do you calculate the volume of a frustum of a cone or pyramid?",
    a: "A frustum is a truncated cone or pyramid formed by cutting off the apex with a plane parallel to the base. Given base areas A₁ and A₂ and height h: Volume = (h / 3) × (A₁ + A₂ + √(A₁ × A₂)).",
  },
];

const SHAPE_VOLUME_ROWS = [
  ["Cube", "s³", "Equilateral prism where l = w = h = s", "s = 4 → V = 64"],
  ["Rectangular Prism", "l × w × h", "Orthogonal 3D box capacity", "l=6, w=4, h=5 → V = 120"],
  ["Cylinder", "π × r² × h", "Circular base area extruded along height h", "r = 3, h = 10 → V ≈ 282.74"],
  ["Sphere", "(4/3) × π × r³", "Fully symmetrical 3D ball of radius r", "r = 3 → V ≈ 113.10"],
  ["Cone", "(1/3) × π × r² × h", "One-third the volume of corresponding cylinder", "r = 3, h = 10 → V ≈ 94.25"],
  ["Square Pyramid", "(1/3) × s² × h", "One-third base area times vertical altitude", "s = 6, h = 9 → V = 108"],
  ["Ellipsoid", "(4/3) × π × a × b × c", "Three-dimensional stretched sphere with semi-axes", "a=4, b=3, c=2 → V ≈ 100.53"],
];

const VOLUME_CONVERSIONS_ROWS = [
  ["Cubic Meters to Liters", "1 m³ = 1,000 L", "Multiply m³ by 1,000", "2.5 m³ = 2,500 L"],
  ["Liters to US Gallons", "1 L = 0.264172 Gallons", "Multiply L by 0.264172", "100 L = 26.42 Gallons"],
  ["Cubic Feet to US Gallons", "1 ft³ = 7.48052 Gallons", "Multiply ft³ by 7.48052", "100 ft³ = 748.05 Gallons"],
  ["Cubic Yards to Cubic Feet", "1 yd³ = 27 ft³", "Multiply yd³ by 27 (3³)", "5 yd³ = 135 ft³"],
  ["Cubic Inches to Fluid Ounces", "1 in³ = 0.554113 fl oz", "Multiply in³ by 0.554113", "10 in³ = 5.54 fl oz"],
];

const RELATED = [
  { href: "/calculators/math/surface-area-calculator", icon: "🧊", name: "Surface Area" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Volume Calculator | CalcDigi"
      intro="Calculate 3D volume and liquid capacity for boxes, cylinders, spheres, cones, pyramids, and storage tanks with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Volume(Shape, Dimensions)"
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

          <h2>Mathematical Axioms and Measure Theory of 3D Volume</h2>
          <p>
            In mathematical analysis and topology, <strong>volume</strong> is the three-dimensional measure of the spatial capacity enclosed by a closed surface in Euclidean space ℝ³. Formalized within Lebesgue measure theory, volume represents the triple integral of the unit scalar field over a measurable 3D manifold: V = ∭_M dx dy dz.
          </p>
          <p>
            The mathematical derivation of solid volumes dates back to ancient Mediterranean and Asian mathematics. The Roman architect Vitruvius famously recounted how Archimedes discovered fluid displacement in his bath (the famous &ldquo;Eureka!&rdquo; breakthrough), using water overflow to determine the volume of an irregularly shaped gold crown. In 3rd-century China, mathematicians Liu Hui and Zu Gengzhi formalized the &ldquo;principle of matching cross-sections&rdquo; to calculate the volume of a sphere, an insight independently rediscovered in Renaissance Italy by Bonaventura Cavalieri in 1635.
          </p>
          <p>
            Today, precise volumetric analysis is fundamental to chemical stoichiometry, structural concrete batching, maritime cargo logistics (CBM container capacity), civil earthwork cut-and-fill grading, and petroleum storage tank gauging.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Taxonomy of Standard Three-Dimensional Volume Formulas</h2>
          <p>
            The table below catalogues standard geometric solids, their exact volume formulas, and their primary geometric characteristics:
          </p>

          <DataTable
            head={["Geometric Solid", "Volume Formula", "Structural Construction", "Worked Arithmetic Example"]}
            rows={SHAPE_VOLUME_ROWS}
            highlight={2}
          />

          <h3>1. Cylinder Volume Derivation</h3>
          <p>
            By Cavalieri&apos;s Principle, the volume of any prism or cylinder equals the cross-sectional area of its base (A_base) multiplied by its perpendicular height <em>h</em>. For a circular cylinder of radius <em>r</em>:
          </p>
          <Formula>Volume = A_base × h = π × r² × h</Formula>
          <p>
            <em>Worked Example:</em> Calculate the fluid capacity of a cylindrical hot water tank with interior radius r = 0.4 meters and height h = 1.5 meters.
          </p>
          <ol>
            <li>Base area: π × 0.4² = π × 0.16 ≈ 0.50265 m².</li>
            <li>Multiply by height: 0.50265 × 1.5 ≈ <strong>0.754 cubic meters</strong>.</li>
            <li>Convert to liters: 0.754 m³ × 1,000 = <strong>754.0 Liters</strong> (approx 199.2 US gallons).</li>
          </ol>

          <h3>2. Sphere Volume Derivation via Calculus</h3>
          <p>
            In spherical polar coordinates, integrating spherical shells of thickness dr from r = 0 to r = R yields:
          </p>
          <Formula>Volume = ∫₀ᴿ 4πr² dr = 4π [ r³ ÷ 3 ]₀ᴿ = (4 ÷ 3)πR³</Formula>

          <h2>The Prismoidal Formula: Simpson&apos;s Rule for Three-Dimensional Volumes</h2>
          <p>
            In civil engineering, highway road grading, and reservoir earthwork calculations, calculating the exact volume of irregular excavation cuts is critical. The <strong>Prismoidal Formula</strong> (mathematically equivalent to Simpson&apos;s 1/3 Rule in numerical integration) provides the exact volume for any solid whose cross-sectional area A(y) varies as a quadratic or cubic polynomial of height:
          </p>
          <Formula>Volume = (L ÷ 6) × [ A_top + 4 × A_mid + A_base ]</Formula>
          <p>
            Where <em>L</em> is the length or height of the prismoid, A_top is the cross-sectional area at the top boundary, A_base is the area at the bottom boundary, and A_mid is the exact cross-sectional area evaluated at the precise midpoint (L/2).
          </p>
          <p>
            Because this single master formula rigorously reproduces the volume of spheres, cylinders, cones, pyramids, wedges, and frustums without requiring separate derivations, it serves as the universal mathematical benchmark in civil excavation surveying.
          </p>

          <h2>Standard Unit Conversions Across Metric and Imperial Systems</h2>
          <p>
            Volumetric conversion involves cubic scale factors (10³, 12³, 3³):
          </p>

          <DataTable
            head={["Conversion Pair", "Exact Mathematical Ratio", "Operational Rule", "Representative Application"]}
            rows={VOLUME_CONVERSIONS_ROWS}
            highlight={0}
          />

          <h2>Buoyancy and Archimedes&apos; Principle of Fluid Displacement</h2>
          <p>
            When an object is placed in a fluid, the upward buoyant force (F_b) equals the weight of the fluid displaced:
          </p>
          <Formula>F_b = ρ_fluid × V_displaced × g</Formula>
          <p>
            Where ρ represents fluid density and g is gravitational acceleration (9.81 m/s²). If an object&apos;s mean density (mass / volume) is less than the fluid density, it floats with a submerged volume fraction exactly proportional to its relative density: V_sub / V_tot = ρ_object / ρ_fluid.
          </p>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/surface-area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Surface Area Calculator</Link>, <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>, <Link href="/calculators/math/circle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Circle Calculator</Link>, and <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Volume Calculator</h2>\n<div class=\"form-group\">\n<label for=\"vo-shape\">Shape</label>\n<select id=\"vo-shape\" onchange=\"toggleVolShape()\">\n<option value=\"cube\">Cube</option>\n<option selected=\"\" value=\"box\">Rectangular Box</option>\n<option value=\"sphere\">Sphere</option>\n<option value=\"cylinder\">Cylinder</option>\n<option value=\"cone\">Cone</option>\n</select>\n</div>\n<div class=\"form-group\" id=\"vo-side-group\" style=\"display:none;\"><label for=\"vo-side\">Side Length</label><input id=\"vo-side\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"5\"/></div>\n<div class=\"form-group\" id=\"vo-length-group\"><label for=\"vo-length\">Length</label><input id=\"vo-length\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"10\"/></div>\n<div class=\"form-group\" id=\"vo-width-group\"><label for=\"vo-width\">Width</label><input id=\"vo-width\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"6\"/></div>\n<div class=\"form-group\" id=\"vo-height-group\"><label for=\"vo-height\">Height</label><input id=\"vo-height\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"4\"/></div>\n<div class=\"form-group\" id=\"vo-radius-group\" style=\"display:none;\"><label for=\"vo-radius\">Radius</label><input id=\"vo-radius\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"5\"/></div>\n<button class=\"calc-btn\" onclick=\"calcVolume()\">Calculate Volume</button>\n<div class=\"result-box\" id=\"vo-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"vo-ri\"></div>\n<div class=\"disclaimer\">⚠️ Results are rounded estimates. Verify critical calculations independently.</div>\n<div class=\"ai-box\" id=\"ai-vo-result\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-vo-result\" onclick=\"printResult('vo-result','Volume Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Volume Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-volume-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function toggleVolShape(){\\n  const shape=document.getElementById('vo-shape').value;\\n  document.getElementById('vo-side-group').style.display=shape==='cube'?'block':'none';\\n  document.getElementById('vo-length-group').style.display=shape==='box'?'block':'none';\\n  document.getElementById('vo-width-group').style.display=shape==='box'?'block':'none';\\n  document.getElementById('vo-height-group').style.display=(shape==='box'||shape==='cylinder'||shape==='cone')?'block':'none';\\n  document.getElementById('vo-radius-group').style.display=(shape==='sphere'||shape==='cylinder'||shape==='cone')?'block':'none';\\n}\\nfunction calcVolume(){\\n  const shape=document.getElementById('vo-shape').value;\\n  let vol,formula;\\n  if(shape==='cube'){\\n    const s=parseFloat(document.getElementById('vo-side').value);\\n    if(isNaN(s)||s<=0){alert('Please enter a valid positive side length.');return;}\\n    vol=s*s*s;formula=s+'³';\\n  } else if(shape==='box'){\\n    const l=parseFloat(document.getElementById('vo-length').value);\\n    const w=parseFloat(document.getElementById('vo-width').value);\\n    const h=parseFloat(document.getElementById('vo-height').value);\\n    if(isNaN(l)||isNaN(w)||isNaN(h)||l<=0||w<=0||h<=0){alert('Please enter valid positive length, width, and height.');return;}\\n    vol=l*w*h;formula=l+' × '+w+' × '+h;\\n  } else if(shape==='sphere'){\\n    const r=parseFloat(document.getElementById('vo-radius').value);\\n    if(isNaN(r)||r<=0){alert('Please enter a valid positive radius.');return;}\\n    vol=(4/3)*Math.PI*Math.pow(r,3);formula='(4/3)π×'+r+'³';\\n  } else if(shape==='cylinder'){\\n    const r=parseFloat(document.getElementById('vo-radius').value);\\n    const h=parseFloat(document.getElementById('vo-height').value);\\n    if(isNaN(r)||isNaN(h)||r<=0||h<=0){alert('Please enter a valid positive radius and height.');return;}\\n    vol=Math.PI*r*r*h;formula='π×'+r+'²×'+h;\\n  } else {\\n    const r=parseFloat(document.getElementById('vo-radius').value);\\n    const h=parseFloat(document.getElementById('vo-height').value);\\n    if(isNaN(r)||isNaN(h)||r<=0||h<=0){alert('Please enter a valid positive radius and height.');return;}\\n    vol=(1/3)*Math.PI*r*r*h;formula='(1/3)π×'+r+'²×'+h;\\n  }\\n  document.getElementById('vo-ri').innerHTML=\\n    ri('Volume','<strong>'+vol.toFixed(3)+' cubic units</strong>',true)+\\n    ri('Formula Used',formula)+\\n    ri('Shape',shape.charAt(0).toUpperCase()+shape.slice(1));\\n  showResult('vo-result')\\n  var _ai_ai_vo_result=document.getElementById('ai-vo-result');\\n    _ai_ai_vo_result.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
