import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/z-score-calculator";
const TITLE = "Z-Score Calculator – Standard Score & Percentile | CalcDigi";
const DESCRIPTION = "Find the z-score and percentile for any value given the mean and standard deviation of a normal distribution.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Z-Score Calculator"
      intro="Find how many standard deviations a value is from the mean, and its approximate percentile, assuming a normal distribution."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="z = (x − μ) ÷ σ"
      related={[
        {
                "href": "/calculators/math/standard-deviation-calculator",
                "icon": "📉",
                "name": "Standard Deviation"
        },
        {
                "href": "/calculators/math/confidence-interval-calculator",
                "icon": "🎯",
                "name": "Confidence Interval"
        },
        {
                "href": "/calculators/math/sample-size-calculator",
                "icon": "📋",
                "name": "Sample Size Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average Calculator"
        }
]}
      faq={[
        {
                "q": "What does a z-score of 2 mean?",
                "a": "It means the value is 2 standard deviations above the mean — in a normal distribution, only about 2.3% of values are higher."
        },
        {
                "q": "What's considered an \"unusual\" z-score?",
                "a": "Z-scores beyond ±2 are generally considered unusual, and beyond ±3 are considered rare or extreme, since over 99.7% of normally distributed data falls within 3 standard deviations of the mean."
        },
        {
                "q": "How is percentile calculated from a z-score?",
                "a": "This calculator uses the standard normal cumulative distribution function (an error-function approximation) to convert the z-score into the percentage of values that fall below it."
        },
        {
                "q": "Does this work for any distribution?",
                "a": "The z-score formula itself works for any distribution, but the percentile shown assumes the data is approximately normally distributed (bell-curve shaped)."
        },
        {
                "q": "What's a z-score used for besides test scores?",
                "a": "Z-scores standardize any normally distributed data for comparison — heights, weights, exam results, quality-control measurements, and financial returns are all commonly analyzed this way."
        },
        {
                "q": "Can the percentile be over 100% or under 0%?",
                "a": "No — percentile is bounded between 0% and 100% by definition, approaching (but never quite reaching) those limits for extreme z-scores."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">z = (x − μ) ÷ σ</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A student scores 85 on a test with a class mean of 75 and standard deviation of 10. Their z-score is (85−75)/10 = 1.0, meaning they scored exactly one standard deviation above average — roughly in the 84th percentile, better than about 84% of the class.</p></div>\n<div class=\"content-section\"><h2>Reading the Z-Table</h2><ul><li><strong>z = 0:</strong> Exactly average (50th percentile)</li><li><strong>z = 1:</strong> ~84th percentile (better than 84% of values)</li><li><strong>z = 2:</strong> ~97.7th percentile</li><li><strong>z = −1:</strong> ~16th percentile (below average)</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Z-Score Calculator</h2><div class=\"form-group\"><label for=\"zs-x\">Value (x)</label><input id=\"zs-x\" step=\"any\" type=\"number\" value=\"85\"/></div><div class=\"form-group\"><label for=\"zs-mean\">Mean (μ)</label><input id=\"zs-mean\" step=\"any\" type=\"number\" value=\"75\"/></div><div class=\"form-group\"><label for=\"zs-sd\">Standard Deviation (σ)</label><input id=\"zs-sd\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"10\"/></div><button class=\"calc-btn\" onclick=\"calcZScore()\">Calculate Z-Score</button><button class=\"calc-btn\" onclick=\"document.getElementById('zs-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"zs-result\" style=\"display:none;\"><div id=\"zs-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"zs-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"zs-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-zs-result\" onclick=\"printResult('zs-result','Z-Score Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Z-Score Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-z-score-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function zsErf(x){\\n  const sign=x<0?-1:1;x=Math.abs(x);\\n  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;\\n  const t=1/(1+p*x);\\n  const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);\\n  return sign*y;\\n}\\nfunction calcZScore(){\\n  const x=parseFloat(document.getElementById('zs-x').value);\\n  const mean=parseFloat(document.getElementById('zs-mean').value);\\n  const sd=parseFloat(document.getElementById('zs-sd').value);\\n  if(isNaN(x)||isNaN(mean)||isNaN(sd)||sd<=0){alert('Enter valid values (standard deviation must be greater than 0).');return;}\\n  const z=(x-mean)/sd;\\n  const percentile=50*(1+zsErf(z/Math.sqrt(2)));\\n  document.getElementById('zs-ri').innerHTML=\\n    ri('Z-Score','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+z.toFixed(4)+'</strong>',true)+\\n    ri('Percentile',percentile.toFixed(2)+'%')+\\n    ri('Interpretation',Math.abs(z)<1?'Close to average':Math.abs(z)<2?'Moderately unusual':'Highly unusual')+\\n    ri('Value',x)+ri('Mean',mean)+ri('Std Dev',sd);\\n  document.getElementById('zs-result').style.display='block';\\n  drawDonut('zs-chart',['Below','Above'],[percentile,100-percentile],['#1a5c3a','#e8e8e2']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
