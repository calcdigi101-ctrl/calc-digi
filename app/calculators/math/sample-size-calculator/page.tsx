import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/sample-size-calculator";
const TITLE = "Sample Size Calculator – Survey & Research Sample | CalcDigi";
const DESCRIPTION = "Find the minimum survey or study sample size needed for your confidence level and margin of error.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Sample Size Calculator"
      intro="Find the minimum sample size needed for a survey or study, given your confidence level, margin of error, and (optionally) population size."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="n = z² × p × (1 − p) ÷ e²"
      related={[
        {
                "href": "/calculators/math/confidence-interval-calculator",
                "icon": "🎯",
                "name": "Confidence Interval"
        },
        {
                "href": "/calculators/math/z-score-calculator",
                "icon": "📈",
                "name": "Z-Score Calculator"
        },
        {
                "href": "/calculators/math/standard-deviation-calculator",
                "icon": "📉",
                "name": "Standard Deviation"
        },
        {
                "href": "/calculators/math/probability-calculator",
                "icon": "🎲",
                "name": "Probability Calculator"
        }
]}
      faq={[
        {
                "q": "Why does a 95% confidence level need a bigger sample than 90%?",
                "a": "Higher confidence means you want to be more certain your result reflects the true population, which requires a larger sample to narrow the range of uncertainty."
        },
        {
                "q": "What proportion should I use if I don't know it?",
                "a": "50% is the standard default — it produces the largest (most conservative) required sample size, which is safe when the true proportion is unknown."
        },
        {
                "q": "Do I need to enter population size?",
                "a": "Only if your population is small and finite (like \"all 500 employees at a company\"). Leave it blank for large or unknown populations — the correction only matters when your population is small relative to the sample."
        },
        {
                "q": "What margin of error should I use?",
                "a": "Most surveys use 3–5%. A smaller margin of error gives more precise results but requires a larger sample size."
        },
        {
                "q": "Why does 50% give the largest sample size?",
                "a": "The term p×(1−p) in the formula is maximized when p = 0.5, so using 50% as your estimate produces the most conservative (largest) sample size when you're unsure of the true proportion."
        },
        {
                "q": "Does a bigger population always need a bigger sample?",
                "a": "No — once your population is large relative to your required sample, further population growth barely affects the needed sample size. The finite population correction only matters meaningfully for smaller populations."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">n = z² × p × (1 − p) ÷ e²</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>Planning a survey with 95% confidence and a 5% margin of error, using the conservative 50% proportion estimate: n = 1.96² × 0.5 × 0.5 ÷ 0.05² ≈ 384 respondents needed. If your total population is only 1,000 people, the finite population correction reduces that requirement to roughly 278.</p></div>\n<div class=\"content-section\"><h2>Choosing Your Inputs</h2><ul><li><strong>Confidence level:</strong> How certain you want to be that your sample reflects the true population — 95% is the standard default</li><li><strong>Margin of error:</strong> How much sampling error you can tolerate — smaller margins need bigger samples</li><li><strong>Proportion estimate:</strong> If you have prior data on the expected split (e.g. 30% yes / 70% no), use it — it can meaningfully reduce the required sample size versus the conservative 50% default</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Sample Size Calculator</h2><div class=\"form-group\"><label for=\"ss-confidence\">Confidence Level</label><select id=\"ss-confidence\"><option value=\"90\">90%</option><option selected=\"\" value=\"95\">95%</option><option value=\"99\">99%</option></select></div><div class=\"form-group\"><label for=\"ss-margin\">Margin of Error (%)</label><input id=\"ss-margin\" min=\"0.1\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label for=\"ss-proportion\">Estimated Proportion (%)</label><input id=\"ss-proportion\" max=\"99\" min=\"1\" step=\"any\" type=\"number\" value=\"50\"/></div><div class=\"form-group\"><label for=\"ss-population\">Population Size (optional)</label><input id=\"ss-population\" min=\"1\" placeholder=\"Leave blank if unknown/large\" step=\"1\" type=\"number\"/></div><button class=\"calc-btn\" onclick=\"calcSampleSize()\">Calculate Sample Size</button><button class=\"calc-btn\" onclick=\"document.getElementById('ss-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"ss-result\" style=\"display:none;\"><div id=\"ss-ri\"></div><div class=\"ai-box\" id=\"ss-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-ss-result\" onclick=\"printResult('ss-result','Sample Size Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Sample Size Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-sample-size-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcSampleSize(){\\n  const conf=parseFloat(document.getElementById('ss-confidence').value);\\n  const margin=parseFloat(document.getElementById('ss-margin').value)/100;\\n  const p=(parseFloat(document.getElementById('ss-proportion').value)||50)/100;\\n  const popStr=document.getElementById('ss-population').value;\\n  const pop=popStr?parseFloat(popStr):null;\\n  if(isNaN(margin)||margin<=0){alert('Enter a valid margin of error.');return;}\\n  const zTable={90:1.645,95:1.96,99:2.576};\\n  const z=zTable[conf]||1.96;\\n  const n0=(z*z*p*(1-p))/(margin*margin);\\n  let n=n0;\\n  if(pop&&pop>0){n=n0/(1+((n0-1)/pop));}\\n  n=Math.ceil(n);\\n  document.getElementById('ss-ri').innerHTML=\\n    ri('Required Sample Size','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+n+'</strong>',true)+\\n    ri('Confidence Level',conf+'%')+\\n    ri('Margin of Error',(margin*100).toFixed(1)+'%')+\\n    ri('Z-Score Used',z)+\\n    (pop?ri('Population Size',pop):'');\\n  document.getElementById('ss-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
