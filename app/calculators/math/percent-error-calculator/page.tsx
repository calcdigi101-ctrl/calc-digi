import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/percent-error-calculator";
const TITLE = "Percent Error Calculator – Free Online Tool | CalcDigi";
const DESCRIPTION = "Compare an experimental (measured) value against a theoretical (true) value and get the percent error instantly.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Percent Error Calculator"
      intro="Calculate how far an experimental or measured value is from the true or theoretical value, expressed as a percentage."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Percent Error = |Experimental − Theoretical| ÷ |Theoretical| × 100"
      related={[
        {
                "href": "/calculators/math/percentage-change-calculator",
                "icon": "📈",
                "name": "Percentage Change"
        },
        {
                "href": "/calculators/math/standard-deviation-calculator",
                "icon": "📉",
                "name": "Standard Deviation"
        },
        {
                "href": "/calculators/math/z-score-calculator",
                "icon": "📈",
                "name": "Z-Score Calculator"
        },
        {
                "href": "/calculators/math/rounding-calculator",
                "icon": "🔢",
                "name": "Rounding Calculator"
        }
]}
      faq={[
        {
                "q": "What counts as a \"good\" percent error?",
                "a": "It depends on the field — under 5% is often considered acceptable for high-school lab work, while precision engineering or analytical chemistry may require under 1%."
        },
        {
                "q": "Can percent error be negative?",
                "a": "The standard formula uses absolute value, so percent error is always reported as a non-negative number. Some fields report signed error to show direction (over vs. under)."
        },
        {
                "q": "What if the theoretical value is zero?",
                "a": "Percent error is undefined when the theoretical value is zero, since that would require dividing by zero. Use absolute error instead in that case."
        },
        {
                "q": "How is this different from percentage change?",
                "a": "Percent error specifically compares a measurement to a known true value to judge accuracy, while percentage change simply compares any two values over time."
        },
        {
                "q": "Is percent error the same as percent difference?",
                "a": "No — percent difference compares two measured values with no assumed \"correct\" answer, dividing by their average. Percent error assumes one value (theoretical) is the known truth."
        },
        {
                "q": "Can percent error exceed 100%?",
                "a": "Yes, if the experimental value is more than double the theoretical value (or vice versa relative to a small true value), percent error can exceed 100%."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">Percent Error = |Experimental − Theoretical| ÷ |Theoretical| × 100</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A student measures the boiling point of water at sea level as 99.1°C, but the accepted (theoretical) value is 100°C. Percent error = |99.1 − 100| ÷ |100| × 100 = 0.9%. That small error suggests good experimental technique, possibly with minor calibration drift in the thermometer.</p></div>\n<div class=\"content-section\"><h2>Common Mistakes to Avoid</h2><ul><li><strong>Swapping the values:</strong> Always subtract theoretical from experimental (or vice versa) — the direction inside the absolute value doesn't matter, but dividing by the wrong denominator does</li><li><strong>Dividing by the experimental value:</strong> The formula always divides by the theoretical (true) value, not the measured one</li><li><strong>Forgetting units:</strong> Both values must be in the same units before comparing</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Percent Error Calculator</h2><div class=\"form-group\"><label for=\"pe-exp\">Experimental (Measured) Value</label><input id=\"pe-exp\" step=\"any\" type=\"number\" value=\"9.8\"/></div><div class=\"form-group\"><label for=\"pe-true\">Theoretical (True) Value</label><input id=\"pe-true\" step=\"any\" type=\"number\" value=\"9.81\"/></div><button class=\"calc-btn\" onclick=\"calcPercentError()\">Calculate Percent Error</button><button class=\"calc-btn\" onclick=\"document.getElementById('pe-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"pe-result\" style=\"display:none;\"><div id=\"pe-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"pe-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"pe-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-pe-result\" onclick=\"printResult('pe-result','Percent Error Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Percent Error Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-percent-error-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPercentError(){\\n  const exp=parseFloat(document.getElementById('pe-exp').value);\\n  const trueVal=parseFloat(document.getElementById('pe-true').value);\\n  if(isNaN(exp)||isNaN(trueVal)){alert('Enter valid numbers for both values.');return;}\\n  if(trueVal===0){alert('Theoretical value cannot be zero (division by zero).');return;}\\n  const absError=Math.abs(exp-trueVal);\\n  const pctError=(absError/Math.abs(trueVal))*100;\\n  document.getElementById('pe-ri').innerHTML=\\n    ri('Percent Error','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+pctError.toFixed(3)+'%</strong>',true)+\\n    ri('Absolute Error',absError.toFixed(4))+\\n    ri('Experimental Value',exp)+\\n    ri('Theoretical Value',trueVal);\\n  document.getElementById('pe-result').style.display='block';\\n  drawDonut('pe-chart',['Error','Accurate'],[Math.min(pctError,100),Math.max(0,100-Math.min(pctError,100))],['#c8832a','#1a5c3a']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
