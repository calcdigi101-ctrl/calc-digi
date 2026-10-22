import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/median-calculator";
const TITLE = "Median Calculator – Find Median of Any Data Set | CalcDigi";
const DESCRIPTION = "Find the median, mean, mode, and range of any data set instantly.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Median Calculator"
      intro="Find the median of any data set instantly along with mean, mode, and range. Includes sorted data display and step-by-step solution — essential for statistics coursework and data analysis."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Odd count: median = middle value of sorted data"
      related={[
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/standard-deviation-calculator",
                "icon": "📉",
                "name": "Standard Deviation"
        },
        {
                "href": "/calculators/math/variance-calculator",
                "icon": "📈",
                "name": "Variance Calculator"
        },
        {
                "href": "/calculators/math/probability-calculator",
                "icon": "🎲",
                "name": "Probability Calculator"
        }
]}
      faq={[
        {
                "q": "What is the median of an even number of values?",
                "a": "Sort the values, then average the two middle ones. For {2, 4, 6, 8}: middle values are 4 and 6, so median = (4+6)/2 = 5."
        },
        {
                "q": "Why is median better than mean for income data?",
                "a": "Income is right-skewed — a small number of very high earners can dramatically inflate the mean. The median is unaffected by extreme outliers, giving a more representative \"typical\" income."
        },
        {
                "q": "What is the median of a single number?",
                "a": "The median of a single-element dataset is that number itself, since there is only one value and it is both the smallest and largest."
        },
        {
                "q": "How does the median relate to quartiles?",
                "a": "The median is the second quartile (Q2) — it splits the sorted data into two equal halves. Q1 splits the lower half; Q3 splits the upper half. Together they define the interquartile range (IQR)."
        }
]}
      html={"<div class=\"content-section\">\n<h2>How to Find the Median</h2>\n<div class=\"formula-box\">Odd count: median = middle value of sorted data</div>\n<div class=\"content-section\">\n<h2>Mean vs Median — When to Use Each</h2>\n<ul>\n<li><strong>Use mean:</strong> Symmetric distributions, no extreme outliers, when total matters</li>\n<li><strong>Use median:</strong> Skewed data, income/wealth data, housing prices, any dataset with outliers</li>\n<li>Example: A group of 9 people earning $30k–$50k and 1 earning $10M — mean ≈ $1M (misleading), median ≈ $38k (representative)</li>\n</ul>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Median Calculator</h2>\n<div class=\"form-group\">\n<label for=\"md-data\">Enter Numbers (comma separated)</label>\n<textarea id=\"md-data\" rows=\"4\" style=\"width:100%;padding:10px 14px;border:1.5px solid var(--c-rule);border-radius:8px;font-family:var(--font-sans);font-size:14px;background:var(--c-bg);color:var(--c-ink);\">4, 8, 6, 5, 3, 2, 8, 9, 2, 5</textarea>\n</div>\n<button class=\"calc-btn\" onclick=\"calcMedian()\">Calculate</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('md-data').value='';document.getElementById('md-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"md-result\" style=\"display:none;\">\n<div id=\"md-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"md-chart\" width=\"220\"></canvas></div>\n<div class=\"ai-box\" id=\"md-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-md-result\" onclick=\"printResult('md-result','Median Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Median Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-median-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcMedian(){\\n  const nums=document.getElementById('md-data').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));\\n  if(nums.length<1){alert('Please enter at least one valid number.');return;}\\n  const sorted=[...nums].sort((a,b)=>a-b);\\n  const n=sorted.length;\\n  let median;\\n  if(n%2===1){median=sorted[Math.floor(n/2)];}\\n  else{median=(sorted[n/2-1]+sorted[n/2])/2;}\\n  const mean=nums.reduce((a,b)=>a+b,0)/n;\\n  const range=sorted[n-1]-sorted[0];\\n  const freq={};nums.forEach(x=>freq[x]=(freq[x]||0)+1);\\n  const maxFreq=Math.max(...Object.values(freq));\\n  const modes=Object.keys(freq).filter(k=>freq[k]===maxFreq).map(Number);\\n  document.getElementById('md-ri').innerHTML=\\n    ri('Median','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+median+'</strong>',true)+\\n    ri('Mean',mean.toFixed(4))+\\n    ri('Mode',maxFreq>1?modes.join(', '):'None (all values unique)')+\\n    ri('Range',range)+\\n    ri('Count (n)',n)+\\n    ri('Sorted Data',sorted.join(', '));\\n  document.getElementById('md-result').style.display='block';\\n  const _ai_md_ai_box=document.getElementById('md-ai-box');\\n  if(_ai_md_ai_box){\\n    _ai_md_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_md_ai_box.style.display='block';\\n    _ai_md_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawBar('md-chart',sorted.map(String),sorted,'#1a5c3a');\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
