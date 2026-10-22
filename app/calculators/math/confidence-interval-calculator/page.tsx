import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/confidence-interval-calculator";
const TITLE = "Confidence Interval Calculator – 90%, 95%, 99% | CalcDigi";
const DESCRIPTION = "Find the margin of error and confidence interval for a sample mean at 90%, 95%, or 99% confidence.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Confidence Interval Calculator"
      intro="Calculate the confidence interval and margin of error for a sample mean at your chosen confidence level."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="CI = x̄ ± z × (σ ÷ √n)"
      related={[
        {
                "href": "/calculators/math/sample-size-calculator",
                "icon": "📋",
                "name": "Sample Size Calculator"
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
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average Calculator"
        }
]}
      faq={[
        {
                "q": "What does a 95% confidence interval mean?",
                "a": "If you repeated the sampling process many times, about 95% of the resulting intervals would contain the true population mean."
        },
        {
                "q": "Why does a bigger sample size narrow the interval?",
                "a": "The margin of error shrinks as sample size grows because dividing by √n means larger samples give more precise estimates of the true mean."
        },
        {
                "q": "Should I use a 90%, 95%, or 99% confidence level?",
                "a": "95% is the most common default for general research. Use 99% when you need higher certainty (e.g. medical studies), or 90% when a wider margin is acceptable for faster/cheaper sampling."
        },
        {
                "q": "What's the difference between confidence interval and margin of error?",
                "a": "The margin of error is the \"± amount\" — the confidence interval is the full range (mean minus margin to mean plus margin)."
        },
        {
                "q": "Does this assume a normal distribution?",
                "a": "Yes — this calculator uses the z-distribution, which is appropriate for large samples (generally n ≥ 30) or when the population standard deviation is known. For small samples, a t-distribution is more accurate."
        },
        {
                "q": "What if my confidence interval is very wide?",
                "a": "A wide interval usually means your sample size is too small or your data has high variability — increasing sample size is the most direct way to narrow it."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">CI = x̄ ± z × (σ ÷ √n)</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A sample of 50 people has a mean score of 100 with a standard deviation of 15. At 95% confidence, the margin of error is 1.96 × (15/√50) ≈ 4.16, giving a confidence interval of roughly 95.84 to 104.16. You can be 95% confident the true population mean falls in that range.</p></div>\n<div class=\"content-section\"><h2>Interval Width and Sample Size</h2><p>Confidence intervals narrow as sample size grows (because you're dividing by √n) and widen as you demand higher confidence (because z grows). Doubling your sample size doesn't halve the interval — it shrinks it by a factor of √2, so getting a much tighter interval requires a disproportionately larger sample.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Confidence Interval Calculator</h2><div class=\"form-group\"><label for=\"ci-mean\">Sample Mean</label><input id=\"ci-mean\" step=\"any\" type=\"number\" value=\"100\"/></div><div class=\"form-group\"><label for=\"ci-sd\">Standard Deviation</label><input id=\"ci-sd\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"15\"/></div><div class=\"form-group\"><label for=\"ci-n\">Sample Size (n)</label><input id=\"ci-n\" min=\"1\" step=\"1\" type=\"number\" value=\"50\"/></div><div class=\"form-group\"><label for=\"ci-confidence\">Confidence Level</label><select id=\"ci-confidence\"><option value=\"90\">90%</option><option selected=\"\" value=\"95\">95%</option><option value=\"99\">99%</option></select></div><button class=\"calc-btn\" onclick=\"calcConfidenceInterval()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('ci-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"ci-result\" style=\"display:none;\"><div id=\"ci-ri\"></div><div class=\"ai-box\" id=\"ci-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-ci-result\" onclick=\"printResult('ci-result','Confidence Interval Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Confidence Interval Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-confidence-interval-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcConfidenceInterval(){\\n  const mean=parseFloat(document.getElementById('ci-mean').value);\\n  const sd=parseFloat(document.getElementById('ci-sd').value);\\n  const n=parseFloat(document.getElementById('ci-n').value);\\n  const conf=parseFloat(document.getElementById('ci-confidence').value);\\n  if(isNaN(mean)||isNaN(sd)||isNaN(n)||n<=0||sd<=0){alert('Enter valid values.');return;}\\n  const zTable={90:1.645,95:1.96,99:2.576};\\n  const z=zTable[conf]||1.96;\\n  const margin=z*(sd/Math.sqrt(n));\\n  const lower=mean-margin, upper=mean+margin;\\n  document.getElementById('ci-ri').innerHTML=\\n    ri('Confidence Interval','<strong style=\\\"font-size:17px;color:var(--c-accent)\\\">'+lower.toFixed(3)+' to '+upper.toFixed(3)+'</strong>',true)+\\n    ri('Margin of Error','±'+margin.toFixed(4))+\\n    ri('Confidence Level',conf+'%')+\\n    ri('Sample Mean',mean)+ri('Sample Size',n);\\n  document.getElementById('ci-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
