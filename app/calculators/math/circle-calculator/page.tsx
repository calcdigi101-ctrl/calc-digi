import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/circle-calculator";
const TITLE = "Circle Calculator – Radius, Diameter, Area | CalcDigi";
const DESCRIPTION = "Enter any one value — radius, diameter, circumference, or area — and instantly get all the others.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Circle Calculator"
      intro="Enter any one known value — radius, diameter, circumference, or area — and get all four measurements instantly."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Circumference = 2πr  |  Area = πr²  |  Diameter = 2r"
      related={[
        {
                "href": "/calculators/math/area-calculator",
                "icon": "📐",
                "name": "Area Calculator"
        },
        {
                "href": "/calculators/math/volume-calculator",
                "icon": "🧊",
                "name": "Volume Calculator"
        },
        {
                "href": "/calculators/math/surface-area-calculator",
                "icon": "📦",
                "name": "Surface Area Calculator"
        },
        {
                "href": "/calculators/math/triangle-calculator",
                "icon": "🔺",
                "name": "Triangle Calculator"
        }
]}
      faq={[
        {
                "q": "What's the difference between radius and diameter?",
                "a": "The radius is the distance from the center to the edge; the diameter is the full width across the circle through the center — exactly double the radius."
        },
        {
                "q": "How accurate is π in this calculator?",
                "a": "It uses JavaScript's built-in Math.PI, accurate to about 15 decimal digits — far more precise than the common 3.14159 approximation."
        },
        {
                "q": "Can I calculate a circle from its area?",
                "a": "Yes — select \"Area\" as the known value, and the calculator works backward: r = √(Area ÷ π), then derives diameter and circumference from that radius."
        },
        {
                "q": "What units does the result use?",
                "a": "Whatever units you enter — if you enter radius in centimeters, area comes out in square centimeters automatically."
        },
        {
                "q": "Why is π irrational, and does that affect accuracy?",
                "a": "π has infinite non-repeating decimal digits, so it can never be written exactly. This calculator uses JavaScript's built-in π constant, accurate to about 15 decimal places — far more precise than needed for virtually any practical use."
        },
        {
                "q": "How do I find the area of a semicircle?",
                "a": "Calculate the full circle's area here, then divide by 2 for a semicircle, or by 4 for a quarter circle."
        }
]}
      html={"<div class=\"content-section\"><h2>Formulas</h2><div class=\"formula-box\">Circumference = 2πr  |  Area = πr²  |  Diameter = 2r</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A circle with a 7-unit radius has a diameter of 14, a circumference of 2π×7 ≈ 43.98, and an area of π×7² ≈ 153.94 square units. Enter any one of these four values and the calculator works backward to find the others.</p></div>\n<div class=\"content-section\"><h2>Circle Measurements at a Glance</h2><ul><li><strong>Radius:</strong> Center to edge</li><li><strong>Diameter:</strong> Edge to edge through the center (2× radius)</li><li><strong>Circumference:</strong> The distance around the circle</li><li><strong>Area:</strong> The space enclosed inside the circle</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Circle Calculator</h2><div class=\"form-group\"><label for=\"cc-type\">Known Value</label><select id=\"cc-type\"><option value=\"radius\">Radius</option><option value=\"diameter\">Diameter</option><option value=\"circumference\">Circumference</option><option value=\"area\">Area</option></select></div><div class=\"form-group\"><label for=\"cc-value\">Value</label><input id=\"cc-value\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"7\"/></div><button class=\"calc-btn\" onclick=\"calcCircle()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('cc-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"cc-result\" style=\"display:none;\"><div id=\"cc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"cc-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"cc-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-cc-result\" onclick=\"printResult('cc-result','Circle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Circle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-circle-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcCircle(){\\n  const type=document.getElementById('cc-type').value;\\n  const val=parseFloat(document.getElementById('cc-value').value);\\n  if(isNaN(val)||val<=0){alert('Enter a positive number.');return;}\\n  let r;\\n  if(type==='radius')r=val;\\n  else if(type==='diameter')r=val/2;\\n  else if(type==='circumference')r=val/(2*Math.PI);\\n  else r=Math.sqrt(val/Math.PI);\\n  const diameter=2*r, circumference=2*Math.PI*r, area=Math.PI*r*r;\\n  document.getElementById('cc-ri').innerHTML=\\n    ri('Radius','<strong style=\\\"font-size:20px;color:var(--c-accent)\\\">'+r.toFixed(4)+'</strong>',true)+\\n    ri('Diameter',diameter.toFixed(4))+\\n    ri('Circumference',circumference.toFixed(4))+\\n    ri('Area',area.toFixed(4));\\n  document.getElementById('cc-result').style.display='block';\\n  drawDonut('cc-chart',['Radius','Rest of Diameter'],[r,diameter-r],['#1a5c3a','#c8832a']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
