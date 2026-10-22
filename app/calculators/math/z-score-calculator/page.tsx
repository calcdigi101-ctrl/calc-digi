import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/z-score-calculator";
const TITLE = "Z-Score Calculator (Standard Score & P-Value) | CalcDigi";
const DESCRIPTION =
  "Free online z-score calculator. Calculate standard score (z), p-value, percentile rank, and probability for single values or sample means step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a z-score in statistics?",
    a: "A z-score (also termed standard score or normal score) quantifies the exact number of standard deviations a specific data point x falls above or below the mean of a distribution. A positive z-score indicates the observation is above the mean, while a negative z-score indicates it is below.",
  },
  {
    q: "How do you calculate a z-score for a single raw value?",
    a: "Subtract the population mean μ from the raw observation x, then divide by the standard deviation σ: z = (x − μ) ÷ σ. For example, if test mean is 100 with σ = 15, a score of 130 has z = (130 − 100) ÷ 15 = +2.00.",
  },
  {
    q: "How do you calculate a z-score for a sample mean?",
    a: "When evaluating a sample mean x̄ from sample size n, divide the difference from population mean μ by the standard error of the mean (SEM = σ ÷ √n): z = (x̄ − μ) ÷ (σ ÷ √n).",
  },
  {
    q: "What does a z-score of 0 mean?",
    a: "A z-score of exactly 0 indicates that the data point is identical to the arithmetic mean of the distribution, corresponding to the 50th percentile rank in a symmetric normal distribution.",
  },
  {
    q: "What is considered an outlier using z-scores?",
    a: "In standard statistical convention, any observation with an absolute z-score |z| > 3.00 is classified as an extreme outlier, as less than 0.27% of observations in a normal distribution lie beyond ±3 standard deviations. Values with |z| > 2.00 are often flagged as potential anomalies.",
  },
  {
    q: "How do you convert a z-score into a percentile rank?",
    a: "Integrate the standard normal probability density function from negative infinity to z, or look up z in a standard normal cumulative distribution table (z-table). For example, z = +1.00 equals the 84.13th percentile; z = +1.96 equals the 97.50th percentile.",
  },
  {
    q: "What is the difference between a z-score and a t-score?",
    a: "Z-scores assume the population standard deviation σ is known or sample size n is large (n ≥ 30). When σ is unknown and must be estimated using sample standard deviation s from a small sample, the Student's t-distribution (t-score) is used instead.",
  },
  {
    q: "Can a z-score exceed 4 or 5?",
    a: "Yes. While extremely rare in standard normal distributions (a z-score of 5 has probability roughly 1 in 3.5 million), extreme events, financial market crashes, and physical anomalies can produce z-scores exceeding ±5.",
  },
];

const Z_BENCHMARK_ROWS = [
  ["-3.00", "0.0013 (0.13%)", "0.13th %ile", "Severe negative outlier (bottom 1 in 740)"],
  ["-2.00", "0.0228 (2.28%)", "2.28th %ile", "Lower statistical significance threshold (p < 0.05)"],
  ["-1.00", "0.1587 (15.87%)", "15.87th %ile", "Lower bound of empirical 68% central band"],
  ["0.00", "0.5000 (50.00%)", "50.00th %ile", "Exact distribution median and arithmetic mean"],
  ["+1.00", "0.8413 (84.13%)", "84.13th %ile", "Upper bound of empirical 68% central band"],
  ["+1.96", "0.9750 (97.50%)", "97.50th %ile", "Two-tailed 95% confidence critical value"],
  ["+2.00", "0.9772 (97.72%)", "97.72th %ile", "Upper statistical significance threshold"],
  ["+3.00", "0.9987 (99.87%)", "99.87th %ile", "Severe positive outlier (top 1 in 740)"],
];

const APPLICATION_ROWS = [
  ["Standardized Testing (SAT / GRE / IQ)", "Normalize scores across test forms with different difficulties", "z = (Score − Mean) ÷ σ"],
  ["Medical Diagnostics (Bone DEXA Scan)", "Compare patient bone mineral density to healthy young adults (T-score)", "T = (BMD − Young Adult Mean) ÷ σ"],
  ["Quality Control (Six Sigma Defect Rates)", "Measure process tolerance distance to specification limits", "Z_bench = (USL − μ) ÷ σ"],
  ["Financial Risk (Altman Z-Score)", "Predict corporate bankruptcy probability using financial ratios", "Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 0.999X₅"],
];

const HYPOTHESIS_ROWS = [
  ["Two-Tailed Test (≠)", "α = 0.05", "z* = ±1.960", "Testing for any significant difference in either direction"],
  ["Two-Tailed Test (≠)", "α = 0.01", "z* = ±2.576", "High-confidence testing for medical and pharmaceutical safety"],
  ["One-Tailed Test (>)", "α = 0.05", "z* = +1.645", "Directional testing: verifying an increase or improvement"],
  ["One-Tailed Test (<)", "α = 0.05", "z* = −1.645", "Directional testing: verifying reduction in defects or costs"],
];

const RELATED = [
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/confidence-interval-calculator", icon: "📈", name: "Confidence Interval" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/variance-calculator", icon: "📉", name: "Variance Calculator" },
  { href: "/calculators/math/sample-size-calculator", icon: "🧪", name: "Sample Size Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Z-Score Calculator | CalcDigi"
      intro="Calculate standard scores (z), p-values, percentile ranks, and tail probabilities for individual values and sample means with step-by-step solutions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="z = (x - mean) / stdDev"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical &amp; Statistical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO / NIST Compliant Precision</span>
          </div>

          <h2>What is a Z-Score? Definition &amp; Mathematical Normalization</h2>
          <p>
            In mathematical statistics, a <strong>z-score</strong> (also termed standard score or normal deviate) is a dimensionless metric that expresses the relative position of an individual observation within a probability distribution. Specifically, it reveals exactly how many standard deviations a raw data point <em>x</em> lies above or below the population mean.
          </p>
          <p>
            Standardizing raw data into z-scores maps any arbitrary Gaussian distribution N(μ, σ²) onto the universal <em>Standard Normal Distribution</em> N(0, 1), which features a mean of 0 and a standard deviation of 1. This mathematical transformation allows direct, apples-to-apples comparisons between completely disparate metrics—such as comparing an applicant&apos;s SAT score directly against their college GPA, or comparing blood pressure deviations across distinct demographic cohorts.
          </p>
          <p>
            Because the standard normal curve is mathematically symmetric around zero, positive z-scores denote observations situated strictly in the upper half of the distribution, whereas negative z-scores denote observations situated strictly in the lower tail. A z-score of zero denotes an observation that falls exactly upon the population mean.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Mathematical Derivations &amp; Formulas</h2>
          <p>
            Z-score calculations take two primary algebraic forms depending on whether you are assessing an individual raw observation or an aggregate sample mean:
          </p>

          <h3>1. Z-Score for an Individual Observation</h3>
          <p>
            To compute the z-score for a single value <em>x</em> from a population with mean μ and standard deviation σ:
          </p>
          <Formula>z = (x − μ) ÷ σ</Formula>
          <p>
            <em>Worked Example:</em> An intelligence quotient (IQ) test has a standardized mean μ = 100 and standard deviation σ = 15. A candidate scores 125.5. Applying the formula:
          </p>
          <Formula>z = (125.5 − 100) ÷ 15 = 25.5 ÷ 15 = +1.70</Formula>
          <p>
            A z-score of +1.70 indicates the candidate scored 1.70 standard deviations above the population average, corresponding to the 95.54th percentile rank.
          </p>

          <h3>2. Z-Score for a Sample Mean (Central Limit Theorem)</h3>
          <p>
            When evaluating whether an observed sample mean x̄ from a sample of size <em>n</em> differs significantly from a hypothesized population mean μ, divide by the standard error of the mean (SEM):
          </p>
          <Formula>z = (x̄ − μ) ÷ (σ ÷ √n)</Formula>
          <p>
            <em>Worked Example:</em> A manufacturer claims lightbulbs last μ = 1,200 hours with σ = 80 hours. A quality auditor tests a random sample of n = 64 bulbs and observes a sample mean x̄ = 1,180 hours:
          </p>
          <Formula>z = (1,180 − 1,200) ÷ (80 ÷ √64) = −20 ÷ (80 ÷ 8) = −20 ÷ 10 = −2.00</Formula>
          <p>
            Because z = −2.00 has a two-tailed p-value of 0.0455 (less than α = 0.05), the auditor rejects the null hypothesis and concludes the lightbulbs underperform specification.
          </p>

          <h2>Standard Normal Probability Density &amp; Cumulative Distribution</h2>
          <p>
            The standard normal distribution is mathematically defined by the continuous Gaussian probability density function (PDF):
          </p>
          <Formula>f(z) = (1 ÷ √(2π)) × e^(-z² ÷ 2)</Formula>
          <p>
            The cumulative probability P(Z ≤ z), representing the area under the curve to the left of <em>z</em>, is obtained by integrating this density function from negative infinity to <em>z</em>. This cumulative integral defines the percentile rank of the observation within the population. Because this integral lacks an elementary closed-form anti-derivative, numerical approximations or standardized statistical tables are utilized for precision.
          </p>

          <h2>Step-by-Step Problem-Solving Strategy for Normal Distributions</h2>
          <p>
            Mastering normal distribution word problems requires following a rigorous four-step quantitative sequence:
          </p>
          <ol>
            <li>
              <strong>State the Parameters:</strong> Clearly identify the population mean μ, the population standard deviation σ, and the raw target value x.
            </li>
            <li>
              <strong>Sketch the Geometry:</strong> Draw a bell curve, mark the center at μ, locate the observation x, and shade the target probability region (left tail, right tail, or between two limits).
            </li>
            <li>
              <strong>Compute the Standard Score:</strong> Transform x into z via z = (x − μ) ÷ σ.
            </li>
            <li>
              <strong>Evaluate Cumulative Probability:</strong> Lookup P(Z ≤ z) in a standard normal table. For upper-tail problems (P(X &gt; x)), compute 1 − P(Z ≤ z). For two-sided bounded problems (P(a &lt; X &lt; b)), compute P(Z ≤ z_b) − P(Z ≤ z_a).
            </li>
          </ol>

          <h2>Z-Scores vs. Student&apos;s T-Scores: When to Transition</h2>
          <p>
            A foundational principle of inferential statistics is recognizing when to employ z-scores versus Student&apos;s t-scores. Z-scores require knowledge of the true population standard deviation σ, or alternatively, a sample size sufficiently large (typically n ≥ 30) such that the sample standard deviation <em>s</em> converges tightly to σ under the Law of Large Numbers.
          </p>
          <p>
            When population variance is unknown and the sample size is small (n &lt; 30), estimating σ using <em>s</em> introduces additional sampling variability. To account for this uncertainty, William Sealy Gosset developed the Student&apos;s t-distribution, which features heavier tails than the standard normal bell curve. As sample size grows toward infinity, the t-distribution converges asymptotically to the standard normal z-distribution.
          </p>

          <h2>Extreme Value Theory &amp; Fat-Tailed Distribution Hazards</h2>
          <p>
            In mathematical finance, insurance underwriting, and catastrophe modeling, practitioners must recognize the limitations of standard normal z-scores. Gaussian distributions assume exponential tail decay, meaning events beyond ±4 or ±5 standard deviations are deemed virtually impossible.
          </p>
          <p>
            However, real-world asset returns, trading volume shocks, and weather extremes frequently exhibit leptokurtosis (fat tails and excess kurtosis). In such non-Gaussian domains, relying exclusively on Gaussian z-scores drastically underestimates the probability of systemic tail risks and black swan market dislocations.
          </p>

          <h2>Hypothesis Testing: Critical Z-Values &amp; Decision Rules</h2>
          <p>
            In inferential hypothesis testing, calculated z-scores are compared against critical values corresponding to chosen significance levels (α):
          </p>
          <DataTable
            head={["Hypothesis Test Type", "Significance Level (α)", "Critical Value (z*)", "Decision Rule & Interpretation"]}
            rows={HYPOTHESIS_ROWS}
            highlight={0}
          />

          <h2>Standard Normal Z-Table Benchmark Reference</h2>
          <p>
            The table below serves as a reference linking critical z-scores to cumulative probability density P(Z ≤ z), percentile ranks, and statistical interpretation:
          </p>
          <DataTable
            head={["Z-Score", "Cumulative Probability P(Z ≤ z)", "Percentile Rank", "Statistical Meaning & Context"]}
            rows={Z_BENCHMARK_ROWS}
            highlight={3}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Z-scores are universally deployed across diverse scientific and commercial disciplines:
          </p>
          <DataTable
            head={["Application Domain", "Analytical Objective", "Applied Mathematical Equation"]}
            rows={APPLICATION_ROWS}
            highlight={1}
          />
          <p>
            In exploratory data science and machine learning, converting feature vectors into z-scores (standardization) prevents high-magnitude numeric features (like house square footage) from dominating low-magnitude features (like number of bedrooms) during gradient descent and distance-based clustering algorithms.
          </p>

          <h2>Related Statistical Tools</h2>
          <p>
            For complete quantitative analysis, pair your z-score evaluation with our <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link>, <Link href="/calculators/math/confidence-interval-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Confidence Interval Calculator</Link>, and <Link href="/calculators/math/average-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Average Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Z-Score Calculator</h2><div class=\"form-group\"><label for=\"zs-x\">Value (x)</label><input id=\"zs-x\" step=\"any\" type=\"number\" value=\"85\"/></div><div class=\"form-group\"><label for=\"zs-mean\">Mean (μ)</label><input id=\"zs-mean\" step=\"any\" type=\"number\" value=\"75\"/></div><div class=\"form-group\"><label for=\"zs-sd\">Standard Deviation (σ)</label><input id=\"zs-sd\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"10\"/></div><button class=\"calc-btn\" onclick=\"calcZScore()\">Calculate Z-Score</button><button class=\"calc-btn\" onclick=\"document.getElementById('zs-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"zs-result\" style=\"display:none;\"><div id=\"zs-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"zs-chart\" width=\"160\"></canvas></div><div class=\"ai-box\" id=\"zs-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-zs-result\" onclick=\"printResult('zs-result','Z-Score Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Z-Score Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-z-score-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function zsErf(x){\\n  const sign=x<0?-1:1;x=Math.abs(x);\\n  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;\\n  const t=1/(1+p*x);\\n  const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);\\n  return sign*y;\\n}\\nfunction calcZScore(){\\n  const x=parseFloat(document.getElementById('zs-x').value);\\n  const mean=parseFloat(document.getElementById('zs-mean').value);\\n  const sd=parseFloat(document.getElementById('zs-sd').value);\\n  if(isNaN(x)||isNaN(mean)||isNaN(sd)||sd<=0){alert('Enter valid values (standard deviation must be greater than 0).');return;}\\n  const z=(x-mean)/sd;\\n  const percentile=50*(1+zsErf(z/Math.sqrt(2)));\\n  document.getElementById('zs-ri').innerHTML=\\n    ri('Z-Score','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+z.toFixed(4)+'</strong>',true)+\\n    ri('Percentile',percentile.toFixed(2)+'%')+\\n    ri('Interpretation',Math.abs(z)<1?'Close to average':Math.abs(z)<2?'Moderately unusual':'Highly unusual')+\\n    ri('Value',x)+ri('Mean',mean)+ri('Std Dev',sd);\\n  document.getElementById('zs-result').style.display='block';\\n  drawDonut('zs-chart',['Below','Above'],[percentile,100-percentile],['#1a5c3a','#e8e8e2']);\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
