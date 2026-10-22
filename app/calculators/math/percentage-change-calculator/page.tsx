import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/percentage-change-calculator";
const TITLE = "Percentage Change Calculator | CalcDigi";
const DESCRIPTION = "Calculate percentage increase or decrease between two values.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Percentage Change Calculator | CalcDigi"
      intro="Calculate the percentage increase or decrease between any two values. Also find the new value after applying a percentage change, or work backwards to find the original value."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="% Change = (New Value − Old Value) / |Old Value| × 100"
      related={[
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage Calculator"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/fraction-calculator",
                "icon": "½",
                "name": "Fraction Calculator"
        }
]}
      faq={[
        {
                "q": "How is percentage increase calculated?",
                "a": "% Increase = (New − Old) / Old × 100. If a price goes from $80 to $100, the increase is ($100-$80)/$80 × 100 = 25%."
        },
        {
                "q": "Is a 100% increase the same as doubling?",
                "a": "Yes. A 100% increase means the value increased by its entire original amount, resulting in twice the original value."
        },
        {
                "q": "Why doesn't -50% then +50% equal 0%?",
                "a": "Because the base changes. $100 → -50% → $50, then $50 → +50% → $75. You lose more on the way down than you gain on the way back up."
        },
        {
                "q": "What is a percentage point vs percentage change?",
                "a": "If interest rates rise from 2% to 3%, that is +1 percentage point. But as a percentage change: (3-2)/2 × 100 = 50% change. Both are valid — use the right one for context."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Percentage Change Formula</h2>\n<div class=\"formula-box\">% Change = (New Value − Old Value) / |Old Value| × 100</div>\n<div class=\"content-section\">\n<h2>Common Percentage Change Mistakes</h2>\n<ul>\n<li><strong>50% off then 50% back:</strong> A 50% decrease followed by a 50% increase does NOT return to the original value — you end up at 75% of the original</li>\n<li><strong>Using wrong base:</strong> Always divide by the <em>original</em> (old) value, not the new value</li>\n<li><strong>Confusing with percentage points:</strong> A rate changing from 5% to 6% is +1 percentage point, but a +20% percentage change</li>\n</ul>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Percentage Change Calculator</h2>\n<div class=\"form-group\"><label for=\"pc-old\">Old Value</label><input id=\"pc-old\" step=\"any\" type=\"number\" value=\"80\"/></div>\n<div class=\"form-group\"><label for=\"pc-new\">New Value</label><input id=\"pc-new\" step=\"any\" type=\"number\" value=\"100\"/></div>\n<button class=\"calc-btn\" onclick=\"calcPctChange()\">Calculate Change</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('pc-old').value='';document.getElementById('pc-new').value='';document.getElementById('pc-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"pc-result\" style=\"display:none;\"><div id=\"pc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"pc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"pcc-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-pc-result\" onclick=\"printResult('pc-result','Percentage Change Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Percentage Change Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-percentage-change-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPctChange(){\\n  const oldVal=parseFloat(document.getElementById('pc-old').value);\\n  const newVal=parseFloat(document.getElementById('pc-new').value);\\n  if(isNaN(oldVal)||isNaN(newVal)){alert('Please enter valid numbers for both values.');return;}\\n  if(oldVal===0){alert('Old value cannot be zero — division by zero is undefined.');return;}\\n  const change=((newVal-oldVal)/Math.abs(oldVal))*100;\\n  const inc=change>=0;\\n  const diff=newVal-oldVal;\\n  document.getElementById('pc-ri').innerHTML=\\n    ri('Percentage Change','<strong style=\\\"font-size:22px;color:'+(inc?'#1a5c3a':'#8a1a1a')+'\\\">'+(inc?'+':'')+change.toFixed(2)+'%</strong>',true)+\\n    ri('Direction',inc?'📈 Increase':'📉 Decrease')+\\n    ri('Absolute Difference',(inc?'+':'')+diff.toFixed(2))+\\n    ri('Old Value',oldVal)+\\n    ri('New Value',newVal);\\n  document.getElementById('pc-result').style.display='block';\\n  const _ai_pcc_ai_box=document.getElementById('pcc-ai-box');\\n  if(_ai_pcc_ai_box){\\n    _ai_pcc_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_pcc_ai_box.style.display='block';\\n    _ai_pcc_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('pc-chart',['Old Value','Difference'],[Math.abs(oldVal),Math.abs(diff)],[inc?'#1a5c3a':'#8a1a1a','#c8832a']);\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
