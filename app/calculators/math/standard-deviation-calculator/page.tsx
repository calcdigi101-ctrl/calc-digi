import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/standard-deviation-calculator";
const TITLE = "Standard Deviation Calculator | CalcDigi";
const DESCRIPTION = "Calculate population and sample standard deviation, variance, and mean from any data set instantly.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Standard Deviation Calculator | CalcDigi"
      intro="Calculate population or sample standard deviation, variance, and mean instantly from any set of numbers. Essential for statistics homework and data analysis."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Population SD: σ = √(Σ(x − μ)² / N)"
      related={[
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/probability-calculator",
                "icon": "🎲",
                "name": "Probability Calculator"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio Calculator"
        },
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage Calculator"
        }
]}
      faq={[
        {
                "q": "When do I use sample vs population standard deviation?",
                "a": "Use population SD (divide by N) when you have data for the entire population. Use sample SD (divide by N-1) when your data is a sample used to estimate population variability — this is more common in research and most statistics courses."
        },
        {
                "q": "What is a \"good\" standard deviation?",
                "a": "There's no universal \"good\" value — it depends entirely on context and what's being measured. Compare standard deviation relative to the mean (coefficient of variation) for meaningful interpretation across different datasets."
        },
        {
                "q": "What does it mean if standard deviation is 0?",
                "a": "A standard deviation of 0 means all values in the dataset are identical — there is no variation at all from the mean."
        },
        {
                "q": "How many data points do I need for standard deviation?",
                "a": "Mathematically, you need at least 2 data points. However, for sample standard deviation to be a meaningful estimate of population variability, more data points (typically 30+) provide more reliable results."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Standard Deviation Formula</h2>\n<div class=\"formula-box\">Population SD: σ = √(Σ(x − μ)² / N)</div>\n<div class=\"content-section\">\n<h2>Step-by-Step Calculation</h2>\n<ol>\n<li>Calculate the mean (average) of all values</li>\n<li>Subtract the mean from each value, then square the result</li>\n<li>Sum all squared differences</li>\n<li>Divide by N (population) or N-1 (sample) to get variance</li>\n<li>Take the square root of variance to get standard deviation</li>\n</ol>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Standard Deviation Calculator</h2>\n<div class=\"form-group\">\n<label for=\"sd-data\">Enter Numbers (comma separated)</label>\n<textarea id=\"sd-data\" rows=\"4\" style=\"width:100%;padding:10px 14px;border:1.5px solid var(--c-rule);border-radius:8px;font-family:var(--font-sans);font-size:14px;background:var(--c-bg);color:var(--c-ink);\">10, 12, 23, 23, 16, 23, 21, 16</textarea>\n</div>\n<div class=\"form-group\">\n<label for=\"sd-type\">Calculation Type</label>\n<select id=\"sd-type\"><option selected=\"\" value=\"sample\">Sample (n-1)</option><option value=\"population\">Population (n)</option></select>\n</div>\n<button class=\"calc-btn\" onclick=\"calcStdDev()\">Calculate</button>\n<div class=\"result-box\" id=\"sd-result\">\n<div id=\"sd-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"sd-chart\" width=\"220\"></canvas></div>\n<div class=\"disclaimer\">⚠️ Results are rounded estimates. Verify critical calculations independently.</div>\n<div class=\"ai-box\" id=\"sd-ai-box\" style=\"display:none;\"></div>\n<div class=\"ai-box\" id=\"ai-sd-result\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-sd-result\" onclick=\"printResult('sd-result','Standard Deviation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Standard Deviation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-standard-deviation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcStdDev(){\\n  const raw=document.getElementById('sd-data').value;\\n  const nums=raw.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));\\n  if(nums.length<2){alert('Please enter at least 2 valid numbers separated by commas.');return;}\\n  const type=document.getElementById('sd-type').value;\\n  const n=nums.length;\\n  const mean=nums.reduce((a,b)=>a+b,0)/n;\\n  const sqDiffs=nums.map(x=>Math.pow(x-mean,2));\\n  const sumSqDiff=sqDiffs.reduce((a,b)=>a+b,0);\\n  const divisor=type==='sample'?n-1:n;\\n  const variance=sumSqDiff/divisor;\\n  const stdDev=Math.sqrt(variance);\\n  document.getElementById('sd-ri').innerHTML=\\n    ri('Standard Deviation','<strong>'+stdDev.toFixed(4)+'</strong>',true)+\\n    ri('Variance',variance.toFixed(4))+\\n    ri('Mean',mean.toFixed(4))+\\n    ri('Count (n)',n)+\\n    ri('Sum',nums.reduce((a,b)=>a+b,0).toFixed(2))+\\n    ri('Type',type==='sample'?'Sample (÷n-1)':'Population (÷n)');\\n  showResult('sd-result')\\n  var _ai_ai_sd_result=document.getElementById('ai-sd-result');\\n    _ai_ai_sd_result.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  drawBar('sd-chart',nums.map((_,i)=>'#'+(i+1)),nums,'#1a5c3a');\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
