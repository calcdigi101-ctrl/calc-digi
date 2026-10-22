import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/average-calculator";
const TITLE = "Average Calculator | CalcDigi";
const DESCRIPTION = "Calculate mean, median, mode, range, and standard deviation for any set of numbers.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Average Calculator | CalcDigi"
      intro="Calculate the mean, median, mode, range, and standard deviation for any list of numbers. Perfect for students, teachers, and analysts."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage"
        },
        {
                "href": "/calculators/math/fraction-calculator",
                "icon": "½",
                "name": "Fraction"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio"
        }
]}
      faq={[
        {
                "q": "When should I use the median instead of the mean?",
                "a": "Use the median when the data has outliers or is skewed, such as incomes or house prices. One very large value pulls the mean up but barely moves the median."
        },
        {
                "q": "What is a weighted average?",
                "a": "Each value is multiplied by a weight before summing, and the total is divided by the sum of the weights. Course grades where exams count more than homework are a common example."
        }
]}
      html={"<div class=\"content-section\"><h2>Mean, median and mode</h2>\n<div class=\"formula-box\">Mean = (x₁ + x₂ + … + xₙ) ÷ n<br/>Median = middle value of the sorted list (average of the two middle values if n is even)<br/>Mode = the most frequent value</div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Average Calculator</h2>\n<div class=\"form-group\"><label for=\"avg-nums\">Enter Numbers (comma-separated)</label><textarea id=\"avg-nums\" placeholder=\"e.g. 5, 12, 8, 20, 3, 15\" style=\"width:100%;padding:10px 14px;border:1.5px solid var(--c-rule);border-radius:var(--radius-sm);font-family:var(--font-sans);font-size:15px;min-height:80px;resize:vertical;outline:none;\">85, 92, 78, 95, 88, 72, 90</textarea></div>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Average Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Average Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-average-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function doCalc(){\\n  const raw=document.getElementById('avg-nums').value;\\n  const nums=raw.split(/[,\\\\s]+/).map(Number).filter(n=>!isNaN(n));\\n  if(nums.length===0){document.getElementById('hc-ri').innerHTML=ri('Error','Please enter valid numbers.',true);showResult('hc-result');return;}\\n  const sorted=[...nums].sort((a,b)=>a-b);\\n  const n=nums.length;\\n  const mean=nums.reduce((a,b)=>a+b,0)/n;\\n  const mid=Math.floor(n/2);\\n  const median=n%2===0?(sorted[mid-1]+sorted[mid])/2:sorted[mid];\\n  const freq={};nums.forEach(x=>freq[x]=(freq[x]||0)+1);const maxF=Math.max(...Object.values(freq));\\n  const modes=Object.keys(freq).filter(k=>freq[k]===maxF).map(Number);\\n  const range=sorted[n-1]-sorted[0];\\n  const variance=nums.reduce((a,b)=>a+Math.pow(b-mean,2),0)/n;const stddev=Math.sqrt(variance);\\n  document.getElementById('hc-ri').innerHTML=ri('Count',n)+ri('Sum',fmtNum(nums.reduce((a,b)=>a+b,0),4))+ri('Mean (Average)',fmtNum(mean,4),true)+ri('Median',fmtNum(median,4))+ri('Mode',modes.join(', '))+ri('Range',fmtNum(range,4))+ri('Std Deviation',fmtNum(stddev,4));\\n  showResult('hc-result');\\n  drawDonut('hc-chart',['Mean','Std Dev'],[Math.round(mean)||1,Math.round(stddev)||1],['#1a5c3a','#c8832a']);\\n  var ai=document.querySelector('.ai-box');\\n  if(ai&&typeof getAIInsight==='function'){ai.style.display='block';ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Statistics: mean='+mean.toFixed(2)+', median='+median.toFixed(2)+', n='+n+'. Give a practical data analysis tip.').then(function(t){if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';else ai.style.display='none';});}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
