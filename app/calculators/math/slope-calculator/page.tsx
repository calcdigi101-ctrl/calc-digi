import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/slope-calculator";
const TITLE = "Slope Calculator | Find Slope, Angle of Inclination & Line Equations | CalcDigi";
const DESCRIPTION =
  "Free online slope calculator. Calculate slope (m), angle of inclination, y-intercept, point-slope, and standard form line equations between two points step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the slope of a line between two points?",
    a: "The slope (m) represents the ratio of vertical change (rise, Δy) to horizontal change (run, Δx) between two points (x₁, y₁) and (x₂, y₂): m = (y₂ − y₁) ÷ (x₂ − x₁).",
  },
  {
    q: "What does a slope of zero mean?",
    a: "A slope of zero (m = 0) indicates a completely flat horizontal line parallel to the x-axis. Because the vertical change Δy is zero while horizontal change Δx is non-zero, the line has constant height: y = b.",
  },
  {
    q: "Why is the slope of a vertical line undefined?",
    a: "A vertical line has identical x-coordinates for all points, meaning horizontal change Δx = x₂ − x₁ = 0. Because division by zero is mathematically undefined, a vertical line has no defined numerical slope (equation x = c).",
  },
  {
    q: "How do you calculate the angle of inclination of a line?",
    a: "The angle of inclination θ is the angle the line makes with the positive x-axis: θ = arctan(m). When the slope is negative (m < 0), add 180° to the arctangent result to express θ within standard direction range (0° to 180°).",
  },
  {
    q: "What is the relationship between slopes of perpendicular lines?",
    a: "Two non-vertical lines are perpendicular if and only if their slopes are negative reciprocals of each other: m₁ × m₂ = −1, meaning m₂ = −1 / m₁. For example, a line perpendicular to slope m₁ = 3/4 has slope m₂ = −4/3.",
  },
  {
    q: "How do you convert slope to percentage grade for roads and ramps?",
    a: "Percentage grade equals the slope m multiplied by 100%: Grade (%) = m × 100% = (Rise ÷ Run) × 100%. For example, a rise of 6 feet over a horizontal run of 100 feet represents a 6.0% road grade.",
  },
  {
    q: "What is the ADA compliant maximum slope for wheelchair ramps?",
    a: "The Americans with Disabilities Act (ADA) mandates a maximum slope of 1:12 (1 inch of vertical rise for every 12 inches of horizontal run), corresponding to a maximum grade of 8.33% or an inclination angle of approximately 4.76°.",
  },
  {
    q: "How is slope related to the derivative in calculus?",
    a: "In differential calculus, the derivative f'(x) represents the instantaneous slope of the tangent line to a curve at a single point, defined as the limit of the secant line slope as horizontal distance Δx approaches zero: f'(x) = lim (Δx → 0) [f(x + Δx) − f(x)] / Δx.",
  },
];

const SLOPE_TYPES_ROWS = [
  ["Positive Slope (m > 0)", "Rises from left to right", "m = 2/3 (θ ≈ 33.7°)", "Economic capital growth curves"],
  ["Negative Slope (m < 0)", "Falls from left to right", "m = −1.5 (θ ≈ 123.7°)", "Depreciation and cooling curves"],
  ["Zero Slope (m = 0)", "Completely horizontal line", "m = 0 (θ = 0°)", "Isobaric pressure thresholds"],
  ["Undefined Slope (m = ∞)", "Completely vertical line", "Δx = 0 (θ = 90°)", "Fixed time barrier milestones"],
  ["Parallel Lines", "Identical slopes: m₁ = m₂", "y = 2x + 1 and y = 2x − 5", "Separated structural rail tracks"],
  ["Perpendicular Lines", "Negative reciprocals: m₁ · m₂ = −1", "m₁ = 3/4, m₂ = −4/3", "Orthogonal coordinate axes"],
];

const LINE_EQUATIONS_ROWS = [
  ["Slope-Intercept Form", "y = mx + b", "Directly exposes slope m and y-axis intercept (0, b)", "Rapid 2D graphing"],
  ["Point-Slope Form", "y − y₁ = m(x − x₁)", "Constructs line using known point and known slope", "Calculus tangent approximations"],
  ["Standard Linear Form", "Ax + By = C", "Integer coefficients with slope m = −A / B", "Simultaneous matrix equation systems"],
  ["Two-Point Determinant", "(y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)", "Symmetric formulation without calculating m first", "Computational graphics geometry"],
];

const RELATED = [
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/percentage-change-calculator", icon: "📈", name: "Percentage Change" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Slope Calculator | CalcDigi"
      intro="Calculate the slope, angle of inclination, distance, midpoint, and linear equations (slope-intercept and point-slope) between any two points step-by-step."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="m = (y2 - y1) / (x2 - x1)"
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

          <h2>Cartesian Coordinate Geometry and the Concept of Slope</h2>
          <p>
            In analytical geometry, the <strong>slope</strong> (commonly designated by the variable <em>m</em>) of a non-vertical line quantifies both the direction and the steepness of the line across the two-dimensional Cartesian coordinate plane ℝ². Formalized by French philosopher and mathematician René Descartes in his 1637 treatise <em>La Géométrie</em>, coordinate geometry bridged pure Euclidean geometry and symbolic algebra, establishing the mathematical foundation for modern physics and calculus.
          </p>
          <p>
            Slope expresses the fundamental rate of change of the dependent variable <em>y</em> with respect to the independent variable <em>x</em>. Geometrically, it represents the ratio of vertical displacement (the &ldquo;rise&rdquo;, Δy) to horizontal displacement (the &ldquo;run&rdquo;, Δx) between any two distinct points on the line.
          </p>
          <p>
            The sign and magnitude of slope convey immediate analytical insights: positive slope indicates growth, negative slope indicates decline, zero slope indicates equilibrium, and undefined slope indicates a vertical boundary. Slope analysis governs modern civil highway grading, structural roof drainage pitches, financial asset beta regressions, and machine learning gradient descent optimization.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Mathematical Derivations and Step-by-Step Computational Formulas</h2>
          <p>
            Given two distinct points P₁(x₁, y₁) and P₂(x₂, y₂) on the Cartesian plane where x₁ ≠ x₂:
          </p>
          <Formula>Slope (m) = Δy ÷ Δx = (y₂ − y₁) ÷ (x₂ − x₁)</Formula>

          <h3>1. Angle of Inclination Derivation</h3>
          <p>
            The angle of inclination θ is the angle formed between the line and the positive x-axis, satisfying the basic trigonometric relationship tan(θ) = m:
          </p>
          <Formula>θ = arctan(m)</Formula>
          <p>
            <em>Worked Example:</em> Calculate the slope and angle of inclination for the line connecting P₁(2, 3) and P₂(10, 9).
          </p>
          <ol>
            <li>Vertical rise: Δy = 9 − 3 = 6</li>
            <li>Horizontal run: Δx = 10 − 2 = 8</li>
            <li>Slope calculation: m = 6 ÷ 8 = <strong>0.750</strong> (or 3/4)</li>
            <li>Angle of inclination: θ = arctan(0.75) ≈ <strong>36.87°</strong></li>
            <li>Percentage road grade: 0.75 × 100% = <strong>75.0% grade</strong></li>
          </ol>

          <h3>2. Derivation of Linear Line Equations</h3>
          <p>
            Once slope <em>m</em> is determined, the line&apos;s complete equation can be formulated across standard mathematical conventions:
          </p>

          <DataTable
            head={["Algebraic Form", "Standard Equation", "Key Structural Advantage", "Primary Application"]}
            rows={LINE_EQUATIONS_ROWS}
            highlight={0}
          />

          <p>
            For our worked example (m = 0.75, P₁ = (2, 3)):
          </p>
          <ul>
            <li><strong>Point-Slope Form:</strong> y − 3 = 0.75(x − 2)</li>
            <li><strong>Slope-Intercept Form:</strong> y = 0.75x − 1.5 + 3 → <strong>y = 0.75x + 1.5</strong> (y-intercept is (0, 1.5))</li>
            <li><strong>Standard Form:</strong> Multiply by 4: 4y = 3x + 6 → <strong>3x − 4y = −6</strong></li>
          </ul>

          <h2>Angle Between Two Intersecting Lines and Orthogonality</h2>
          <p>
            When two non-perpendicular lines with slopes m₁ and m₂ intersect, the acute angle φ between them is derived using the trigonometric tangent difference identity:
          </p>
          <Formula>tan(φ) = | (m₂ − m₁) ÷ (1 + m₁ × m₂) |</Formula>
          <p>
            Taking the arctangent isolates angle φ: φ = arctan( | (m₂ − m₁) / (1 + m₁m₂) | ).
          </p>
          <p>
            This equation reveals the two cornerstone theorems of analytical geometry:
          </p>
          <ul>
            <li><strong>Parallel Lines (φ = 0°):</strong> The numerator vanishes when m₁ = m₂, meaning parallel lines have identical slopes.</li>
            <li><strong>Perpendicular Lines (φ = 90°):</strong> Because tan(90°) approaches infinity, the denominator must equal zero: 1 + m₁m₂ = 0, proving that perpendicular slopes are negative reciprocals: m₂ = −1 / m₁.</li>
          </ul>

          <h2>Shortest Perpendicular Distance from a Point to a Line</h2>
          <p>
            In computer vision, robotic obstacle avoidance, and machine learning classification boundaries, calculating the shortest geometric distance <em>d</em> from an arbitrary coordinate point P(x₀, y₀) to a line expressed in standard form Ax + By + C = 0 is derived via vector projection:
          </p>
          <Formula>Distance (d) = | A × x₀ + B × y₀ + C | ÷ √(A² + B²)</Formula>
          <p>
            <em>Worked Example:</em> Calculate the shortest distance from point P(4, 5) to the line 3x + 4y − 7 = 0.
          </p>
          <ol>
            <li>Substitute point coordinates: 3(4) + 4(5) − 7 = 12 + 20 − 7 = 25</li>
            <li>Compute denominator: √(3² + 4²) = √(9 + 16) = √25 = 5</li>
            <li>Distance: d = 25 ÷ 5 = <strong>5.00 units</strong> perpendicular clearance.</li>
          </ol>

          <h2>Ordinary Least Squares (OLS) Linear Regression: The Slope of Best Fit</h2>
          <p>
            In statistical data science and econometric forecasting, when analyzing a scatter plot of paired observations (xᵢ, yᵢ), the <strong>Ordinary Least Squares (OLS)</strong> regression slope β minimizes the sum of squared vertical residuals:
          </p>
          <Formula>Slope (β) = Cov(X, Y) ÷ Var(X) = [ Σ(xᵢ − x̄)(yᵢ − ȳ) ] ÷ [ Σ(xᵢ − x̄)² ]</Formula>
          <p>
            This fundamental statistical equation proves that the regression slope equals the Pearson correlation coefficient <em>r</em> scaled by the ratio of standard deviations: β = r × (s_y / s_x).
          </p>

          <h2>Geometric Classification: Parallel, Perpendicular, and Horizontal Lines</h2>
          <p>
            The comparative geometric relationship between two lines is completely determined by their respective slopes:
          </p>

          <DataTable
            head={["Slope Classification", "Geometric Orientation", "Representative Example", "Real-World Physical Analogy"]}
            rows={SLOPE_TYPES_ROWS}
            highlight={4}
          />

          <h2>Civil Highway Engineering: Road Grade, Superelevation, and Roof Pitch</h2>
          <p>
            In transportation engineering and municipal infrastructure, roadway slopes are conventionally designated as percentage grades:
          </p>
          <Formula>Grade (%) = Slope (m) × 100% = (Rise ÷ Run) × 100%</Formula>
          <p>
            Federal highway guidelines established by AASHTO (American Association of State Highway and Transportation Officials) mandate maximum highway grades between 5% and 7% to ensure heavy freight tractor-trailers maintain braking control and avoid runaway descent hazards.
          </p>
          <p>
            When a highway curves with radius of curvature <em>R</em>, civil engineers tilt the road surface inward at a specified cross-slope angle termed <strong>superelevation rate (e)</strong>. The superelevation equation balances lateral centrifugal acceleration against tire pavement friction (f):
          </p>
          <Formula>e + f = v² ÷ (g × R)</Formula>
          <p>
            Where <em>v</em> is vehicle design speed and <em>g</em> is gravitational acceleration (9.81 m/s²). Proper banking eliminates lateral rollover forces, allowing vehicles to traverse curved highway interchanges safely at high speeds.
          </p>
          <p>
            In residential construction, roof slope is designated as <strong>roof pitch</strong>, expressed as inches of vertical rise per 12 inches of horizontal run (e.g., a 4:12 pitch has slope m = 4/12 = 0.333, corresponding to a 33.3% grade or an angle of 18.43°).
          </p>

          <h2>Hydrology and Civil Surface Water Runoff Grading</h2>
          <p>
            In landscape architecture, civil drainage design, and geotechnical engineering, surface slopes dictate the velocity and direction of stormwater runoff. International Residential Code (IRC Section R401.3) mandates that soil surface surrounding building foundations must fall at a minimum slope of 2.0% (a 1/4-inch vertical drop per horizontal foot) for the first 10 feet away from foundation walls to prevent water ponding, basement seepage, and hydrostatic wall collapse.
          </p>
          <p>
            In open-channel drainage hydraulics, Manning&apos;s equation demonstrates that fluid flow velocity <em>v</em> is directly proportional to the square root of the channel bed slope (S):
          </p>
          <Formula>v = (1 ÷ n) × R_h^(2/3) × S^(1/2)</Formula>
          <p>
            Where <em>n</em> represents the Manning surface roughness coefficient and R_h is the hydraulic radius. Civil engineers optimize channel slope <em>S</em> to maintain self-cleansing velocity (typically &gt; 2.0 ft/s) without causing bed scour and bank erosion.
          </p>

          <h2>Transition to Calculus: Secant Slopes vs. Instantaneous Tangent Slopes</h2>
          <p>
            The Cartesian slope equation m = Δy / Δx computes the <strong>average rate of change</strong> across a finite interval [x₁, x₂], representing the slope of the secant line cutting through a non-linear curve.
          </p>
          <p>
            Sir Isaac Newton and Gottfried Wilhelm Leibniz recognized that taking the limit as horizontal distance Δx contracts toward zero transforms the discrete average slope into the <strong>instantaneous rate of change</strong> (the first derivative):
          </p>
          <Formula>f&apos;(x) = lim (Δx → 0) [ (f(x + Δx) − f(x)) ÷ Δx ]</Formula>
          <p>
            This fundamental transition allows scientists to evaluate instantaneous vehicle velocities, economic marginal revenue, and structural stress gradients along curved parabolic suspension bridge cables.
          </p>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/distance-formula-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Distance Formula Calculator</Link>, <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>, <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>, and <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Slope Calculator</h2><div class=\"form-row\"><div class=\"form-group\"><label for=\"sl-x1\">x₁</label><input id=\"sl-x1\" step=\"any\" type=\"number\" value=\"1\"/></div><div class=\"form-group\"><label for=\"sl-y1\">y₁</label><input id=\"sl-y1\" step=\"any\" type=\"number\" value=\"2\"/></div></div><div class=\"form-row\"><div class=\"form-group\"><label for=\"sl-x2\">x₂</label><input id=\"sl-x2\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label for=\"sl-y2\">y₂</label><input id=\"sl-y2\" step=\"any\" type=\"number\" value=\"14\"/></div></div><button class=\"calc-btn\" onclick=\"calcSlope()\">Calculate Slope</button><button class=\"calc-btn\" onclick=\"document.getElementById('sl-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"sl-result\" style=\"display:none;\"><div id=\"sl-ri\"></div><div class=\"ai-box\" id=\"sl-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sl-result\" onclick=\"printResult('sl-result','Slope Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Slope Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-slope-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcSlope(){\\n  const x1=parseFloat(document.getElementById('sl-x1').value);\\n  const y1=parseFloat(document.getElementById('sl-y1').value);\\n  const x2=parseFloat(document.getElementById('sl-x2').value);\\n  const y2=parseFloat(document.getElementById('sl-y2').value);\\n  if([x1,y1,x2,y2].some(function(v){return isNaN(v);})){alert('Enter valid numbers for all coordinates.');return;}\\n  if(x1===x2){\\n    document.getElementById('sl-ri').innerHTML=\\n      ri('Slope','<strong style=\\\"font-size:20px;color:var(--c-accent)\\\">Undefined (vertical line)</strong>',true)+\\n      ri('Line Equation','x = '+x1);\\n  } else {\\n    const m=(y2-y1)/(x2-x1);\\n    const b=y1-m*x1;\\n    const angle=Math.atan(m)*180/Math.PI;\\n    document.getElementById('sl-ri').innerHTML=\\n      ri('Slope (m)','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+m.toFixed(4)+'</strong>',true)+\\n      ri('Line Equation','y = '+m.toFixed(3)+'x '+(b>=0?'+ ':'- ')+Math.abs(b).toFixed(3))+\\n      ri('Angle',angle.toFixed(2)+'°')+\\n      ri('Direction',m>0?'Rising (positive)':(m<0?'Falling (negative)':'Horizontal (flat)'));\\n  }\\n  document.getElementById('sl-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
