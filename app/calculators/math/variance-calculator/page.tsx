import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/variance-calculator";
const TITLE = "Variance Calculator – Population & Sample | CalcDigi";
const DESCRIPTION = "Calculate population and sample variance and standard deviation for any data set. Shows step-by-step solution.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Variance Calculator"
      intro="Calculate population or sample variance and standard deviation from any data set instantly. Includes step-by-step breakdown, mean, sum of squared differences, and a data distribution chart."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Population Variance: σ² = Σ(x − μ)² / N"
      related={[
        {
                "href": "/calculators/math/standard-deviation-calculator",
                "icon": "📉",
                "name": "Standard Deviation"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/median-calculator",
                "icon": "📈",
                "name": "Median Calculator"
        },
        {
                "href": "/calculators/math/probability-calculator",
                "icon": "🎲",
                "name": "Probability Calculator"
        }
]}
      faq={[
        {
                "q": "What is the difference between variance and standard deviation?",
                "a": "Variance is in squared units (hard to interpret directly). Standard deviation (√variance) is in the same units as the data, making it more intuitive. Both measure data spread."
        },
        {
                "q": "When do I use population vs sample variance?",
                "a": "Use population variance (÷N) when you have data for the entire population. Use sample variance (÷N-1) when your data is a subset used to estimate population parameters — this is the more common research scenario."
        },
        {
                "q": "Why does sample variance divide by N-1 instead of N?",
                "a": "Dividing by N-1 (Bessel's correction) gives an unbiased estimate of population variance. Dividing by N tends to underestimate the true population variance when using a sample."
        },
        {
                "q": "Can variance be negative?",
                "a": "No. Variance is calculated from squared differences, which are always ≥ 0. The sum of non-negative values divided by a positive number is always ≥ 0. Variance equals zero only when all data values are identical."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Variance Formulas</h2>\n<div class=\"formula-box\">Population Variance: σ² = Σ(x − μ)² / N</div>\n<div class=\"content-section\">\n<h2>Worked Example</h2>\n<p>Data: {2, 4, 4, 4, 5, 5, 7, 9}. Mean = 5. Squared differences: 9, 1, 1, 1, 0, 0, 4, 16. Sum = 32. Population variance = 32/8 = <strong>4</strong>. Population SD = √4 = <strong>2</strong>.</p>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Variance Calculator</h2>\n<div class=\"form-group\">\n<label for=\"vr-data\">Enter Numbers (comma separated)</label>\n<textarea id=\"vr-data\" rows=\"4\" style=\"width:100%;padding:10px 14px;border:1.5px solid var(--c-rule);border-radius:8px;font-family:var(--font-sans);font-size:14px;background:var(--c-bg);color:var(--c-ink);\">2, 4, 4, 4, 5, 5, 7, 9</textarea>\n</div>\n<div class=\"form-group\">\n<label for=\"vr-type\">Type</label>\n<select id=\"vr-type\"><option selected=\"\" value=\"sample\">Sample (÷n-1)</option><option value=\"population\">Population (÷n)</option></select>\n</div>\n<button class=\"calc-btn\" onclick=\"calcVariance()\">Calculate Variance</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('vr-data').value='';document.getElementById('vr-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"vr-result\" style=\"display:none;\">\n<div id=\"vr-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"vr-chart\" width=\"220\"></canvas></div>\n<div class=\"ai-box\" id=\"vr-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-vr-result\" onclick=\"printResult('vr-result','Variance Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Variance Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-variance-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcVariance(){\\n  const nums=document.getElementById('vr-data').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));\\n  if(nums.length<2){alert('Please enter at least 2 valid numbers separated by commas.');return;}\\n  const type=document.getElementById('vr-type').value;\\n  const n=nums.length;\\n  const mean=nums.reduce((a,b)=>a+b,0)/n;\\n  const sqDiffs=nums.map(x=>Math.pow(x-mean,2));\\n  const sumSqDiff=sqDiffs.reduce((a,b)=>a+b,0);\\n  const divisor=type==='sample'?n-1:n;\\n  const variance=sumSqDiff/divisor;\\n  const sd=Math.sqrt(variance);\\n  document.getElementById('vr-ri').innerHTML=\\n    ri('Variance','<strong style=\\\"font-size:22px;color:var(--c-accent)\\\">'+variance.toFixed(4)+'</strong>',true)+\\n    ri('Standard Deviation',sd.toFixed(4))+\\n    ri('Mean',mean.toFixed(4))+\\n    ri('Sum of Squared Diffs',sumSqDiff.toFixed(4))+\\n    ri('Count (n)',n)+\\n    ri('Type',type==='sample'?'Sample (÷n-1)':'Population (÷n)');\\n  document.getElementById('vr-result').style.display='block';\\n  const _ai_vr_ai_box=document.getElementById('vr-ai-box');\\n  if(_ai_vr_ai_box){\\n    _ai_vr_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_vr_ai_box.style.display='block';\\n    _ai_vr_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawBar('vr-chart',nums.map((_,i)=>'x'+(i+1)),sqDiffs,'#c8832a');\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
