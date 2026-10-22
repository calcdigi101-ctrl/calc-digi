import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/slope-calculator";
const TITLE = "Slope Calculator – Find Slope Between Two Points | CalcDigi";
const DESCRIPTION = "Find the slope, angle, and equation of the line through any two coordinate points.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Slope Calculator"
      intro="Find the slope, angle, and full line equation through any two points on a coordinate plane."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="m = (y₂ − y₁) ÷ (x₂ − x₁)"
      related={[
        {
                "href": "/calculators/math/distance-formula-calculator",
                "icon": "📍",
                "name": "Distance Formula"
        },
        {
                "href": "/calculators/math/triangle-calculator",
                "icon": "🔺",
                "name": "Triangle Calculator"
        },
        {
                "href": "/calculators/geography/elevation-grade-calculator",
                "icon": "⛰️",
                "name": "Elevation Grade"
        },
        {
                "href": "/calculators/math/pythagorean-theorem-calculator",
                "icon": "🔺",
                "name": "Pythagorean Theorem"
        }
]}
      faq={[
        {
                "q": "What does a negative slope mean?",
                "a": "A negative slope means the line falls as you move left to right — y decreases as x increases."
        },
        {
                "q": "Why is a vertical line's slope undefined?",
                "a": "The slope formula divides by (x₂ − x₁). For a vertical line, x₁ equals x₂, making the denominator zero — division by zero is undefined."
        },
        {
                "q": "How do I find the y-intercept?",
                "a": "Once you have the slope m and any point (x₁, y₁) on the line, the y-intercept b = y₁ − m × x₁. This calculator shows the full equation y = mx + b automatically."
        },
        {
                "q": "What's the difference between slope and grade/angle?",
                "a": "Slope is a ratio (rise/run), while the angle converts that ratio into degrees using the arctangent function — useful for road grades, ramps, and roof pitch."
        },
        {
                "q": "What does a slope of 0 mean?",
                "a": "A slope of exactly 0 means the line is perfectly horizontal — y stays constant no matter how x changes."
        },
        {
                "q": "How do I find a parallel or perpendicular line's slope?",
                "a": "A parallel line has the exact same slope. A perpendicular line has the negative reciprocal slope — if this line's slope is m, a perpendicular line's slope is −1/m."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">m = (y₂ − y₁) ÷ (x₂ − x₁)</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A line passes through (1, 2) and (5, 14). Slope m = (14−2)/(5−1) = 12/4 = 3. Using point-slope form with (1,2): y − 2 = 3(x − 1), which simplifies to y = 3x − 1. This calculator performs that full derivation automatically.</p></div>\n<div class=\"content-section\"><h2>Slope in Everyday Terms</h2><ul><li><strong>Road grades:</strong> A 6% grade means a slope of 0.06 — rise of 6 units per 100 units of horizontal distance</li><li><strong>Roof pitch:</strong> Often expressed as rise over a 12-unit run (e.g. \"6-in-12\" is a slope of 0.5)</li><li><strong>Wheelchair ramps:</strong> Building codes typically cap slope at 1:12 (about 0.083) for accessibility</li><li><strong>Stock charts:</strong> The slope of a trend line shows rate of change over time</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Slope Calculator</h2><div class=\"form-row\"><div class=\"form-group\"><label for=\"sl-x1\">x₁</label><input id=\"sl-x1\" step=\"any\" type=\"number\" value=\"1\"/></div><div class=\"form-group\"><label for=\"sl-y1\">y₁</label><input id=\"sl-y1\" step=\"any\" type=\"number\" value=\"2\"/></div></div><div class=\"form-row\"><div class=\"form-group\"><label for=\"sl-x2\">x₂</label><input id=\"sl-x2\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label for=\"sl-y2\">y₂</label><input id=\"sl-y2\" step=\"any\" type=\"number\" value=\"14\"/></div></div><button class=\"calc-btn\" onclick=\"calcSlope()\">Calculate Slope</button><button class=\"calc-btn\" onclick=\"document.getElementById('sl-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"sl-result\" style=\"display:none;\"><div id=\"sl-ri\"></div><div class=\"ai-box\" id=\"sl-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sl-result\" onclick=\"printResult('sl-result','Slope Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Slope Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-slope-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcSlope(){\\n  const x1=parseFloat(document.getElementById('sl-x1').value);\\n  const y1=parseFloat(document.getElementById('sl-y1').value);\\n  const x2=parseFloat(document.getElementById('sl-x2').value);\\n  const y2=parseFloat(document.getElementById('sl-y2').value);\\n  if([x1,y1,x2,y2].some(function(v){return isNaN(v);})){alert('Enter valid numbers for all coordinates.');return;}\\n  if(x1===x2){\\n    document.getElementById('sl-ri').innerHTML=\\n      ri('Slope','<strong style=\\\"font-size:20px;color:var(--c-accent)\\\">Undefined (vertical line)</strong>',true)+\\n      ri('Line Equation','x = '+x1);\\n  } else {\\n    const m=(y2-y1)/(x2-x1);\\n    const b=y1-m*x1;\\n    const angle=Math.atan(m)*180/Math.PI;\\n    document.getElementById('sl-ri').innerHTML=\\n      ri('Slope (m)','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+m.toFixed(4)+'</strong>',true)+\\n      ri('Line Equation','y = '+m.toFixed(3)+'x '+(b>=0?'+ ':'- ')+Math.abs(b).toFixed(3))+\\n      ri('Angle',angle.toFixed(2)+'°')+\\n      ri('Direction',m>0?'Rising (positive)':(m<0?'Falling (negative)':'Horizontal (flat)'));\\n  }\\n  document.getElementById('sl-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
