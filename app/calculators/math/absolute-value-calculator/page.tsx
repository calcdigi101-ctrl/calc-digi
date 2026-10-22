import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/absolute-value-calculator";
const TITLE = "Absolute Value Calculator – |x| Instantly | CalcDigi";
const DESCRIPTION = "Calculate |x| instantly for any number. Includes distance between two values and absolute value expressions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Absolute Value Calculator"
      intro="Calculate the absolute value of any number instantly — the distance from zero on the number line, always non-negative. Also find the distance between two values."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="|x| = x if x ≥ 0;   |x| = −x if x < 0"
      related={[
        {
                "href": "/calculators/math/rounding-calculator",
                "icon": "🔢",
                "name": "Rounding Calculator"
        },
        {
                "href": "/calculators/math/percentage-change-calculator",
                "icon": "%",
                "name": "Percentage Change"
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
        }
]}
      faq={[
        {
                "q": "What is absolute value used for?",
                "a": "It measures magnitude without direction — used in error measurement, distance, deviation from target, and any situation where you only care about \"how much\" not \"which way.\""
        },
        {
                "q": "Can absolute value be negative?",
                "a": "No, absolute value is always ≥ 0. It represents distance, which cannot be negative."
        },
        {
                "q": "What is |0|?",
                "a": "|0| = 0. Zero is exactly 0 units from itself on the number line."
        },
        {
                "q": "How do you solve absolute value equations?",
                "a": "|x| = 5 has two solutions: x = 5 and x = −5, since both are distance 5 from zero. In general, |x| = a gives x = a or x = −a (when a ≥ 0)."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Absolute Value Definition</h2>\n<div class=\"formula-box\">|x| = x if x ≥ 0;   |x| = −x if x &lt; 0</div>\n<div class=\"content-section\">\n<h2>Real-World Uses of Absolute Value</h2>\n<ul>\n<li><strong>Temperature deviation:</strong> How far from target temp, regardless of above/below</li>\n<li><strong>Financial errors:</strong> Measuring variance without caring if it's over or under</li>\n<li><strong>Engineering tolerance:</strong> Part can be ±0.5mm from spec — absolute error must be ≤ 0.5</li>\n<li><strong>Distance on number line:</strong> Distance between points a and b = |a − b|</li>\n</ul>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Absolute Value Calculator</h2>\n<div class=\"form-group\"><label for=\"av-number\">Number (x)</label><input id=\"av-number\" step=\"any\" type=\"number\" value=\"-15.5\"/></div>\n<button class=\"calc-btn\" onclick=\"calcAbsValue()\">Calculate |x|</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('av-number').value='';document.getElementById('av-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"av-result\" style=\"display:none;\"><div id=\"av-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"av-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"av-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-av-result\" onclick=\"printResult('av-result','Absolute Value Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Absolute Value Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>\n<div style=\"margin-top:20px;padding-top:16px;border-top:1px solid var(--c-rule);\">\n<p style=\"font-size:13px;font-weight:600;margin-bottom:10px;\">Distance Between Two Values</p>\n<div class=\"form-group\"><label for=\"av-a\">Value A</label><input id=\"av-a\" step=\"any\" type=\"number\" value=\"-3\"/></div>\n<div class=\"form-group\"><label for=\"av-b\">Value B</label><input id=\"av-b\" step=\"any\" type=\"number\" value=\"7\"/></div>\n<button class=\"calc-btn\" onclick=\"calcDist()\">Calculate Distance</button>\n<div class=\"result-box\" id=\"av-dist\" style=\"display:none;\"><div id=\"av-dist-ri\">\n</div>" }} />
        <Script id="calc-script-absolute-value-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcAbsValue(){\\n  const num=parseFloat(document.getElementById('av-number').value);\\n  if(isNaN(num)){alert('Please enter a valid number.');return;}\\n  const result=Math.abs(num);\\n  document.getElementById('av-ri').innerHTML=\\n    ri('|'+num+'|','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+result+'</strong>',true)+\\n    ri('Original Number',num)+\\n    ri('Sign',num<0?'Negative (made positive)':num===0?'Zero':'Already positive')+\\n    ri('Distance from 0',result+' units');\\n  document.getElementById('av-result').style.display='block';\\n  const _ai_av_ai_box=document.getElementById('av-ai-box');\\n  if(_ai_av_ai_box){\\n    _ai_av_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_av_ai_box.style.display='block';\\n    _ai_av_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('av-chart',['Absolute Value','Sign Removed'],[result,num<0?Math.abs(num):0],['#1a5c3a','#c8832a']);\\n}\\nfunction calcDist(){\\n  const a=parseFloat(document.getElementById('av-a').value);\\n  const b=parseFloat(document.getElementById('av-b').value);\\n  if(isNaN(a)||isNaN(b)){alert('Please enter valid numbers for both values.');return;}\\n  const dist=Math.abs(a-b);\\n  document.getElementById('av-dist-ri').innerHTML=\\n    ri('Distance |A − B|','<strong style=\\\"font-size:22px;color:var(--c-accent)\\\">'+dist+'</strong>',true)+\\n    ri('A',a)+ri('B',b);\\n  document.getElementById('av-dist').style.display='block';\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
