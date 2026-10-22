import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/pythagorean-theorem-calculator";
const TITLE = "Pythagorean Theorem Calculator – Find a, b, or c | CalcDigi";
const DESCRIPTION = "Enter any two sides of a right triangle and instantly find the third.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Pythagorean Theorem Calculator"
      intro="Enter any two sides of a right triangle — leave the one you want to solve for blank — and find the missing side instantly."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a² + b² = c²"
      related={[
        {
                "href": "/calculators/math/triangle-calculator",
                "icon": "🔺",
                "name": "Triangle Calculator"
        },
        {
                "href": "/calculators/math/distance-formula-calculator",
                "icon": "📍",
                "name": "Distance Formula"
        },
        {
                "href": "/calculators/math/slope-calculator",
                "icon": "📉",
                "name": "Slope Calculator"
        },
        {
                "href": "/calculators/math/square-root-calculator",
                "icon": "√",
                "name": "Square Root Calculator"
        }
]}
      faq={[
        {
                "q": "Which side is the hypotenuse?",
                "a": "The hypotenuse is always the longest side of a right triangle, and it's always opposite the 90° angle."
        },
        {
                "q": "Can this theorem be used on any triangle?",
                "a": "No — the Pythagorean theorem only applies to right triangles (triangles containing a 90° angle)."
        },
        {
                "q": "What if I enter a leg longer than the hypotenuse?",
                "a": "That's not a valid right triangle — the hypotenuse must always be the longest side, so the calculator will flag the input as invalid."
        },
        {
                "q": "Where is this formula used in real life?",
                "a": "Construction (checking square corners), navigation, TV/monitor screen size measurement, and any situation needing the straight-line distance between two perpendicular measurements."
        },
        {
                "q": "How is this used to check square corners?",
                "a": "Measure 3 feet along one wall and 4 feet along the perpendicular wall, then check the diagonal between those points — if it measures exactly 5 feet, the corner is a true 90°. This is called the \"3-4-5 method\" in construction."
        },
        {
                "q": "What if my triangle isn't a right triangle?",
                "a": "The Pythagorean theorem only holds for right triangles. For other triangles, use the Law of Cosines, or check the Triangle Calculator for general triangle solving."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">a² + b² = c²</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A right triangle has legs of 3 and 4. The hypotenuse = √(3² + 4²) = √25 = 5 — the classic \"3-4-5 triangle\" used to check square corners in construction. Leave any one side blank and this calculator solves for it the same way.</p></div>\n<div class=\"content-section\"><h2>Common Pythagorean Triples</h2><ul><li><strong>3, 4, 5</strong> — the simplest and most common</li><li><strong>5, 12, 13</strong></li><li><strong>8, 15, 17</strong></li><li><strong>7, 24, 25</strong></li></ul><p>These are whole-number combinations that satisfy a² + b² = c² exactly, useful for quick mental checks and construction layout.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Pythagorean Theorem Calculator</h2><p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:10px;\">Leave exactly one field blank — that's the side this calculator will solve for.</p><div class=\"form-group\"><label for=\"pt-a\">Leg a</label><input id=\"pt-a\" step=\"any\" type=\"number\" value=\"3\"/></div><div class=\"form-group\"><label for=\"pt-b\">Leg b</label><input id=\"pt-b\" step=\"any\" type=\"number\" value=\"4\"/></div><div class=\"form-group\"><label for=\"pt-c\">Hypotenuse c</label><input id=\"pt-c\" placeholder=\"Leave blank to solve\" step=\"any\" type=\"number\"/></div><button class=\"calc-btn\" onclick=\"calcPythagorean()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('pt-a').value='';document.getElementById('pt-b').value='';document.getElementById('pt-c').value='';document.getElementById('pt-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"pt-result\" style=\"display:none;\"><div id=\"pt-ri\"></div><div class=\"ai-box\" id=\"pt-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-pt-result\" onclick=\"printResult('pt-result','Pythagorean Theorem Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Pythagorean Theorem Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-pythagorean-theorem-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPythagorean(){\\n  const aVal=document.getElementById('pt-a').value.trim();\\n  const bVal=document.getElementById('pt-b').value.trim();\\n  const cVal=document.getElementById('pt-c').value.trim();\\n  const a=aVal===''?null:parseFloat(aVal);\\n  const b=bVal===''?null:parseFloat(bVal);\\n  const c=cVal===''?null:parseFloat(cVal);\\n  const blanks=[a,b,c].filter(function(v){return v===null;}).length;\\n  if(blanks!==1){alert('Leave exactly one side blank — the one you want to solve for.');return;}\\n  let result,label,fa=a,fb=b,fc=c;\\n  if(c===null){\\n    if(a<=0||b<=0){alert('Side lengths must be positive.');return;}\\n    fc=Math.sqrt(a*a+b*b); result=fc; label='Hypotenuse (c)';\\n  } else if(a===null){\\n    if(c<=0||b<=0||b>=c){alert('The hypotenuse must be greater than the known leg.');return;}\\n    fa=Math.sqrt(c*c-b*b); result=fa; label='Leg (a)';\\n  } else {\\n    if(c<=0||a<=0||a>=c){alert('The hypotenuse must be greater than the known leg.');return;}\\n    fb=Math.sqrt(c*c-a*a); result=fb; label='Leg (b)';\\n  }\\n  document.getElementById('pt-ri').innerHTML=\\n    ri(label,'<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+result.toFixed(4)+'</strong>',true)+\\n    ri('Side a',fa.toFixed(4))+ri('Side b',fb.toFixed(4))+ri('Hypotenuse c',fc.toFixed(4));\\n  document.getElementById('pt-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
