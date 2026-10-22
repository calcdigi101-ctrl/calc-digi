import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/quadratic-equation-calculator";
const TITLE = "Quadratic Equation Solver – ax²+bx+c=0 | CalcDigi";
const DESCRIPTION = "Solve ax² + bx + c = 0 instantly using the quadratic formula. Shows both real and complex roots with steps.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Quadratic Equation Solver"
      intro="Solve any quadratic equation in the form ax² + bx + c = 0 instantly. Shows real or complex roots, the discriminant, and the vertex of the parabola."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="x = (-b ± √(b² − 4ac)) / 2a"
      related={[
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage Calculator"
        },
        {
                "href": "/calculators/math/scientific-calculator",
                "icon": "🔬",
                "name": "Scientific Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio Calculator"
        }
]}
      faq={[
        {
                "q": "What is the quadratic formula used for?",
                "a": "It solves any quadratic equation (degree 2 polynomial) for its roots — the x-values where the equation equals zero. Used in physics (projectile motion), engineering, and optimization problems."
        },
        {
                "q": "What if a equals 0?",
                "a": "If a=0, the equation is no longer quadratic — it becomes linear (bx+c=0), with a single solution x = -c/b, solvable without the quadratic formula."
        },
        {
                "q": "What are complex roots?",
                "a": "When the discriminant is negative, roots involve the imaginary unit i (where i²=-1). These are written as a ± bi and represent valid mathematical solutions, just not real-number x-intercepts."
        },
        {
                "q": "What is the vertex of a parabola?",
                "a": "The vertex is the highest or lowest point of the parabola, found at x = -b/2a. It represents the minimum value (if a>0) or maximum value (if a<0) of the quadratic function."
        }
]}
      html={"<div class=\"content-section\">\n<h2>The Quadratic Formula</h2>\n<div class=\"formula-box\">x = (-b ± √(b² − 4ac)) / 2a</div>\n<div class=\"content-section\">\n<h2>Worked Example</h2>\n<p>Solve x² − 5x + 6 = 0: here a=1, b=−5, c=6. Discriminant = (−5)² − 4(1)(6) = 25 − 24 = 1.</p>\n<p>x = (5 ± √1) / 2 = (5 ± 1) / 2, giving x₁ = 3 and x₂ = 2.</p>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Quadratic Solver</h2>\n<p style=\"font-size:13px;color:var(--c-ink2);margin-bottom:14px;\">Solve: ax² + bx + c = 0</p>\n<div class=\"form-group\"><label for=\"qe-a\">a (coefficient of x²)</label><input id=\"qe-a\" step=\"any\" type=\"number\" value=\"1\"/></div>\n<div class=\"form-group\"><label for=\"qe-b\">b (coefficient of x)</label><input id=\"qe-b\" step=\"any\" type=\"number\" value=\"-5\"/></div>\n<div class=\"form-group\"><label for=\"qe-c\">c (constant)</label><input id=\"qe-c\" step=\"any\" type=\"number\" value=\"6\"/></div>\n<button class=\"calc-btn\" onclick=\"calcQuadratic()\">Solve</button>\n<div class=\"result-box\" id=\"qe-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"qe-ri\"></div>\n<div class=\"ai-box\" id=\"qe-ai\" style=\"display:none;\"></div>\n<div class=\"disclaimer\">⚠️ Results are estimates rounded to 4 decimal places. Verify critical calculations independently.</div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-qe-result\" onclick=\"printResult('qe-result','Quadratic Equation Solver')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Quadratic Equation Solver')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-quadratic-equation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcQuadratic(){\\n  const a=parseFloat(document.getElementById('qe-a').value);\\n  const b=parseFloat(document.getElementById('qe-b').value);\\n  const c=parseFloat(document.getElementById('qe-c').value);\\n  if(isNaN(a)||isNaN(b)||isNaN(c)){alert('Please enter valid numbers for a, b, and c.');return;}\\n  if(a===0){alert('Coefficient \\\"a\\\" cannot be 0 for a quadratic equation. (This would be a linear equation instead.)');return;}\\n  const disc=b*b-4*a*c;\\n  const vertex_x=-b/(2*a);\\n  const vertex_y=a*vertex_x*vertex_x+b*vertex_x+c;\\n  let html;\\n  if(disc>0){\\n    const x1=(-b+Math.sqrt(disc))/(2*a);\\n    const x2=(-b-Math.sqrt(disc))/(2*a);\\n    html=ri('x₁','<strong>'+x1.toFixed(4)+'</strong>',true)+ri('x₂','<strong>'+x2.toFixed(4)+'</strong>');\\n  } else if(disc===0){\\n    const x=-b/(2*a);\\n    html=ri('x (repeated root)','<strong>'+x.toFixed(4)+'</strong>',true);\\n  } else {\\n    const real=(-b/(2*a)).toFixed(4);\\n    const imag=(Math.sqrt(-disc)/(2*a)).toFixed(4);\\n    html=ri('x₁','<strong>'+real+' + '+imag+'i</strong>',true)+ri('x₂','<strong>'+real+' − '+imag+'i</strong>');\\n  }\\n  html+=ri('Discriminant',disc.toFixed(2))+ri('Vertex','('+vertex_x.toFixed(2)+', '+vertex_y.toFixed(2)+')')+ri('Parabola Opens',a>0?'Upward ⌄ (minimum)':'Downward ⌃ (maximum)')+ri('Equation',a+'x² + '+b+'x + '+c+' = 0');\\n  document.getElementById('qe-ri').innerHTML=html;\\n  showResult('qe-result');\\n  const aiBox=document.getElementById('qe-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing the equation...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('Solve quadratic equation '+a+'x² + '+b+'x + '+c+' = 0. Discriminant: '+disc+'. In 2-3 sentences, briefly explain the nature of the roots found and what the discriminant value tells us about this specific equation.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
