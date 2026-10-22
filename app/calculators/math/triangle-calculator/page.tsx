import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/triangle-calculator";
const TITLE = "Triangle Calculator – Area, Angles & Perimeter | CalcDigi";
const DESCRIPTION = "Calculate the area, perimeter, and all three angles of any triangle from its three side lengths using Heron's formula and the Law of Cosines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function TriangleCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Triangle Calculator"
      intro="Calculate the area, perimeter, and all three angles of any triangle from its three side lengths using Heron's formula and the Law of Cosines."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="s = (a + b + c) / 2"
      related={[
        {
                "href": "/calculators/math/quadratic-equation-calculator",
                "icon": "🔢",
                "name": "Quadratic Solver"
        },
        {
                "href": "/calculators/math/square-root-calculator",
                "icon": "√",
                "name": "Square Root Calculator"
        },
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        }
]}
      faq={[
        {
                "q": "How do you find the area of a triangle with 3 sides?",
                "a": "Use Heron's formula: calculate the semi-perimeter s = (a+b+c)/2, then Area = √(s(s-a)(s-b)(s-c)). This works for any triangle type without needing angle measurements."
        },
        {
                "q": "Can any three lengths form a triangle?",
                "a": "No. The triangle inequality requires that the sum of any two sides exceed the third side. If a+b ≤ c, the shape cannot close into a valid triangle."
        },
        {
                "q": "How are triangle angles calculated from sides?",
                "a": "The Law of Cosines is used: cos(C) = (a² + b² − c²) / (2ab), then solve for each angle using the inverse cosine function with the appropriate opposite side relationship."
        },
        {
                "q": "What is an isosceles vs equilateral triangle?",
                "a": "An equilateral triangle has all three sides equal (and all angles equal to 60°). An isosceles triangle has exactly two sides equal, with the two base angles also equal."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Heron's Formula</h2>\n<div class=\"formula-box\">s = (a + b + c) / 2</div>\n<div class=\"content-section\">\n<h2>Triangle Inequality Theorem</h2>\n<p>Three lengths can only form a valid triangle if the sum of any two sides is greater than the third side. If a + b ≤ c (or any similar combination), no triangle can be formed — the shape simply cannot close.</p>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Triangle Calculator</h2>\n<p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:14px;\">Enter the 3 side lengths:</p>\n<div class=\"form-group\"><label for=\"tr-a\">Side a</label><input id=\"tr-a\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"5\"/></div>\n<div class=\"form-group\"><label for=\"tr-b\">Side b</label><input id=\"tr-b\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"6\"/></div>\n<div class=\"form-group\"><label for=\"tr-c\">Side c</label><input id=\"tr-c\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"7\"/></div>\n<button class=\"calc-btn\" onclick=\"calcTriangle()\">Calculate</button>\n<div class=\"result-box\" id=\"tr-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"tr-ri\"></div>\n<div class=\"ai-box\" id=\"tr-ai\" style=\"display:none;\"></div>\n<div class=\"disclaimer\">⚠️ Results are rounded estimates. Verify critical calculations independently.</div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-tr-result\" onclick=\"printResult('tr-result','Triangle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Triangle Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-triangle-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcTriangle(){\\n  const a=parseFloat(document.getElementById('tr-a').value);\\n  const b=parseFloat(document.getElementById('tr-b').value);\\n  const c=parseFloat(document.getElementById('tr-c').value);\\n  if(isNaN(a)||isNaN(b)||isNaN(c)||a<=0||b<=0||c<=0){alert('Please enter valid positive side lengths for a, b, and c.');return;}\\n  if(a+b<=c||a+c<=b||b+c<=a){\\n    document.getElementById('tr-ri').innerHTML='<div style=\\\"padding:14px;background:var(--c-red-lt);border-radius:8px;color:#8a1a1a;font-size:13.5px;\\\">⚠️ These side lengths cannot form a valid triangle. The sum of any two sides must exceed the third side.</div>';\\n    showResult('tr-result');return;\\n  }\\n  const s=(a+b+c)/2;\\n  const area=Math.sqrt(s*(s-a)*(s-b)*(s-c));\\n  const perimeter=a+b+c;\\n  const angleA=Math.acos((b*b+c*c-a*a)/(2*b*c))*180/Math.PI;\\n  const angleB=Math.acos((a*a+c*c-b*b)/(2*a*c))*180/Math.PI;\\n  const angleC=180-angleA-angleB;\\n  let type='Scalene';\\n  if(Math.abs(a-b)<0.001&&Math.abs(b-c)<0.001)type='Equilateral';\\n  else if(Math.abs(a-b)<0.001||Math.abs(b-c)<0.001||Math.abs(a-c)<0.001)type='Isosceles';\\n  if(Math.abs(angleA-90)<0.5||Math.abs(angleB-90)<0.5||Math.abs(angleC-90)<0.5)type+=' (Right Triangle)';\\n  document.getElementById('tr-ri').innerHTML=\\n    ri('Area','<strong>'+area.toFixed(3)+' sq units</strong>',true)+\\n    ri('Perimeter',perimeter.toFixed(3)+' units')+\\n    ri('Angle A (opposite a)',angleA.toFixed(2)+'°')+\\n    ri('Angle B (opposite b)',angleB.toFixed(2)+'°')+\\n    ri('Angle C (opposite c)',angleC.toFixed(2)+'°')+\\n    ri('Triangle Type',type);\\n  showResult('tr-result');\\n  const aiBox=document.getElementById('tr-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing the triangle...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('Triangle with sides '+a+', '+b+', '+c+'. Area: '+area.toFixed(2)+', type: '+type+'. In 2-3 sentences briefly explain key properties of this specific triangle.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
