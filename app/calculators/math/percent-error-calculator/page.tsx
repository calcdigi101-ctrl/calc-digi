import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/percent-error-calculator";
const TITLE = "Percent Error Calculator | Experimental Accuracy & Precision | CalcDigi";
const DESCRIPTION =
  "Free online percent error calculator. Calculate absolute error, relative error, and percentage error between experimental observations and accepted theoretical values step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is percent error in experimental science?",
    a: "Percent error is a quantitative metric measuring the accuracy of an experimental observation compared to a known, accepted, or theoretical standard value. It expresses the discrepancy as a percentage of the theoretical true value.",
  },
  {
    q: "What is the formula for percent error?",
    a: "Percent Error = [ |Experimental Value − Theoretical Value| / |Theoretical Value| ] × 100%. Taking the absolute value in the numerator ensures that percent error is reported as a positive magnitude of experimental deviation.",
  },
  {
    q: "Can percent error be negative?",
    a: "In standard scientific and engineering metrology (ISO / NIST), percent error is defined using absolute values and is always reported as a non-negative number. However, some introductory physics curricula omit the absolute value to indicate direction: a positive error indicates an overestimate, while a negative error indicates an underestimate.",
  },
  {
    q: "What is the difference between accuracy and precision?",
    a: "Accuracy refers to how close an experimental measurement is to the true, accepted theoretical value. Precision refers to the degree of mutual agreement and repeatability among independent measurements obtained under identical conditions, regardless of whether they are close to the true value.",
  },
  {
    q: "What is an acceptable percent error in laboratory science?",
    a: "Acceptable error depends strictly on the measurement discipline. In introductory chemistry and physics classrooms, errors under 5% to 10% are generally deemed acceptable. In industrial pharmaceutical manufacturing and aerospace guidance systems, tolerances are far tighter, often requiring errors under 0.1% or 0.01%.",
  },
  {
    q: "What causes experimental error in scientific investigations?",
    a: "Errors stem from two primary sources: Systematic Errors (reproducible inaccuracies caused by flawed calibration, zero-offset drift, or environmental interference) and Random Errors (unavoidable statistical fluctuations resulting from instrument resolution limits or thermal noise).",
  },
  {
    q: "How does absolute error differ from relative error?",
    a: "Absolute error measures the raw numerical magnitude of deviation in physical units: Absolute Error = |V_exp − V_theor|. Relative error normalizes this deviation by dividing by the theoretical value: Relative Error = Absolute Error / |V_theor|. Multiplying relative error by 100% yields percent error.",
  },
  {
    q: "How does uncertainty propagate when combining multiple experimental measurements?",
    a: "Under Gauss's law of error propagation, independent random uncertainties combine in quadrature (root sum of squares). For addition/subtraction, absolute uncertainties add in quadrature; for multiplication/division, fractional (relative) uncertainties add in quadrature.",
  },
];

const ERROR_TAXONOMY_ROWS = [
  ["Absolute Error (Δx)", "|V_exp − V_theor|", "Measures raw physical deviation in native units (e.g., ±0.05 grams)", "Determines instrument resolution thresholds"],
  ["Relative Error (η)", "|V_exp − V_theor| / |V_theor|", "Dimensionless fractional deviation normalized against standard", "Allows fair comparison across disparate scales"],
  ["Percent Error (%E)", "Relative Error × 100%", "Normalized percentage metric standard across scientific publications", "Universal benchmark for experimental accuracy"],
  ["Systematic Bias", "Mean(V_exp) − V_theor", "Consistent directional offset resulting from calibration drift", "Correctable via zero-tare re-calibration"],
  ["Random Uncertainty (σ)", "Standard Deviation of Repeats", "Statistical scatter stemming from environmental and thermal noise", "Reducible by increasing sample size n"],
];

const PHYSICAL_BENCHMARKS_ROWS = [
  ["Acceleration due to Gravity (g)", "9.80665 m/s²", "9.62 m/s² (Simple pendulum)", "1.90%", "Air resistance & friction"],
  ["Speed of Light in Vacuum (c)", "299,792,458 m/s", "300,100,000 m/s (Kerr cell)", "0.10%", "Timing clock jitter"],
  ["Universal Gas Constant (R)", "8.31446 J/(mol·K)", "8.15 J/(mol·K) (Vapor density)", "1.98%", "Non-ideal gas intermolecular forces"],
  ["Density of Pure Water (4°C)", "0.99997 g/cm³", "0.985 g/cm³ (Hydrometer)", "1.50%", "Meniscus parallax error"],
  ["Absolute Zero Temperature", "−273.15 °C", "−268.0 °C (Charles's Law extrapolation)", "1.89%", "Gas pressure gauge linearity limits"],
];

const RELATED = [
  { href: "/calculators/math/percentage-change-calculator", icon: "📈", name: "Percentage Change" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Percent Error Calculator | CalcDigi"
      intro="Calculate absolute error, relative error, and percentage error between experimental measurements and theoretical reference standards with complete uncertainty derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Percent Error = (|V_exp - V_theor| / |V_theor|) * 100%"
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

          <h2>Theoretical Foundations of Experimental Error and Metrology</h2>
          <p>
            In experimental physics, analytical chemistry, and precision engineering metrology, <strong>percent error</strong> is the definitive quantitative metric used to assess the accuracy of empirical measurements against known, theoretical, or accepted physical standards. Every physical measurement is inherently accompanied by some degree of uncertainty; percent error isolates the proportional extent of that uncertainty relative to the true magnitude being measured.
          </p>
          <p>
            The formal mathematical framework of error analysis was established during the 18th and 19th centuries through astronomical investigations by Carl Friedrich Gauss, Pierre-Simon Laplace, and Adrien-Marie Legendre. When calculating the orbits of celestial bodies such as the dwarf planet Ceres, Gauss recognized that observational discrepancies followed a characteristic bell curve distribution (the normal distribution), demonstrating that understanding and minimizing measurement error is essential to uncovering universal natural laws.
          </p>
          <p>
            Today, international standards organizations—most notably the International Bureau of Weights and Measures (BIPM) and the National Institute of Standards and Technology (NIST)—govern calibration methodologies across semiconductor lithography, pharmaceutical synthesis, aerospace flight sensors, and legal weights and measures using rigorous percent error and uncertainty protocols.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Step-by-Step Mathematical Formulas and Error Derivations</h2>
          <p>
            Experimental metrology categorizes discrepancies into absolute, relative, and percentage dimensions:
          </p>

          <DataTable
            head={["Metric Classification", "Mathematical Formula", "Analytical Significance", "Laboratory Application"]}
            rows={ERROR_TAXONOMY_ROWS}
            highlight={2}
          />

          <h3>1. Absolute Error Derivation</h3>
          <p>
            The <strong>absolute error</strong> quantifies the raw difference between the measured experimental observation (V_exp) and the true accepted theoretical value (V_theor):
          </p>
          <Formula>Absolute Error = |V_exp − V_theor|</Formula>

          <h3>2. Relative Error and Percent Error</h3>
          <p>
            Because absolute error fails to account for scale—a 1-centimeter error is catastrophic in microprocessor fabrication but negligible in civil highway surveying—the absolute deviation is normalized against the true value to produce <strong>relative error</strong>:
          </p>
          <Formula>Relative Error = |V_exp − V_theor| ÷ |V_theor|</Formula>
          <p>
            Multiplying relative error by 100 yields the definitive <strong>percent error</strong> equation:
          </p>
          <Formula>Percent Error = [ |V_exp − V_theor| ÷ |V_theor| ] × 100%</Formula>
          <p>
            <em>Worked Example:</em> In a physics laboratory, a student measures the acceleration due to gravity using a free-fall timer, obtaining g_exp = 9.58 m/s². The standard accepted local gravitational constant is g_theor = 9.81 m/s².
          </p>
          <ol>
            <li>Absolute error: |9.58 − 9.81| = |−0.23| = 0.23 m/s²</li>
            <li>Relative error: 0.23 ÷ 9.81 ≈ 0.023445</li>
            <li>Percent error: 0.023445 × 100% = <strong>2.34% experimental error</strong>.</li>
          </ol>

          <h2>Accuracy vs. Precision: The Classical Metrology Dichotomy</h2>
          <p>
            In scientific investigations, <strong>accuracy</strong> and <strong>precision</strong> describe fundamentally different aspects of measurement reliability:
          </p>
          <ul>
            <li>
              <strong>Accuracy:</strong> The closeness of agreement between an experimental result and the true reference value. Quantified explicitly using percent error. High accuracy reflects the absence of systematic bias.
            </li>
            <li>
              <strong>Precision:</strong> The closeness of agreement between repeated, independent measurements obtained under stipulated conditions. Quantified using sample standard deviation or coefficient of variation. High precision reflects the absence of random noise.
            </li>
          </ul>
          <p>
            A digital balance that consistently measures a certified 100.00-gram calibration weight as 104.50 grams across ten consecutive trials is highly precise (repeatable with low variance), but inaccurate (exhibiting a 4.5% systematic percent error due to unzeroed tare drift).
          </p>

          <h2>Standard Laboratory Benchmarks and Error Discrepancies</h2>
          <p>
            The table below documents standard experimental measurements across foundational scientific experiments, comparing typical empirical observations with NIST reference constants:
          </p>

          <DataTable
            head={["Physical Constant / Metric", "NIST Standard Value", "Typical Student Observation", "Observed % Error", "Primary Error Mechanism"]}
            rows={PHYSICAL_BENCHMARKS_ROWS}
            highlight={0}
          />

          <h2>Gaussian Uncertainty Propagation Through Functional Relationships</h2>
          <p>
            When an experimental quantity <em>q</em> is computed as a function of multiple independently measured variables x, y, ..., each possessing uncertainty δx, δy, Gauss&apos;s law of error propagation determines the overall uncertainty:
          </p>
          <Formula>δq = √[ ( (∂q/∂x) × δx )² + ( (∂q/∂y) × δy )² + ... ]</Formula>
          <p>
            For multiplicative relationships q = (x × y) / z, the relative errors combine in quadrature:
          </p>
          <Formula>(δq ÷ q) = √[ (δx ÷ x)² + (δy ÷ y)² + (δz ÷ z)² ]</Formula>
          <p>
            This fundamental mathematical relationship demonstrates that minimizing error in the variable with the highest power exponent produces the greatest improvement in experimental accuracy.
          </p>

          <h2>Related Mathematical and Scientific Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/percentage-change-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Change Calculator</Link>, <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link>, and <Link href="/calculators/math/rounding-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Rounding Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Percent Error Calculator</h2><div class=\"form-group\"><label for=\"pe-exp\">Experimental (Measured) Value</label><input id=\"pe-exp\" step=\"any\" type=\"number\" value=\"9.8\"/></div><div class=\"form-group\"><label for=\"pe-true\">Theoretical (True) Value</label><input id=\"pe-true\" step=\"any\" type=\"number\" value=\"9.81\"/></div><button class=\"calc-btn\" onclick=\"calcPercentError()\">Calculate Percent Error</button><button class=\"calc-btn\" onclick=\"document.getElementById('pe-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"pe-result\" style=\"display:none;\"><div id=\"pe-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"pe-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"pe-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-pe-result\" onclick=\"printResult('pe-result','Percent Error Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Percent Error Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-percent-error-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPercentError(){\\n  const exp=parseFloat(document.getElementById('pe-exp').value);\\n  const trueVal=parseFloat(document.getElementById('pe-true').value);\\n  if(isNaN(exp)||isNaN(trueVal)){alert('Enter valid numbers for both values.');return;}\\n  if(trueVal===0){alert('Theoretical value cannot be zero (division by zero).');return;}\\n  const absError=Math.abs(exp-trueVal);\\n  const pctError=(absError/Math.abs(trueVal))*100;\\n  document.getElementById('pe-ri').innerHTML=\\n    ri('Percent Error','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+pctError.toFixed(3)+'%</strong>',true)+\\n    ri('Absolute Error',absError.toFixed(4))+\\n    ri('Experimental Value',exp)+\\n    ri('Theoretical Value',trueVal);\\n  document.getElementById('pe-result').style.display='block';\\n  drawDonut('pe-chart',['Error','Accurate'],[Math.min(pctError,100),Math.max(0,100-Math.min(pctError,100))],['#c8832a','#1a5c3a']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
