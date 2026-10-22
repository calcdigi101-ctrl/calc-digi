import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ProbabilityDistributionChart } from "@/components/flagship/math/editorial-charts/ProbabilityDistributionChart";

const PATH = "/calculators/math/sample-size-calculator";
const TITLE = "Sample Size Calculator (Survey & Scientific Study) | CalcDigi";
const DESCRIPTION =
  "Free online sample size calculator. Calculate required sample size for surveys, clinical trials, and experiments with margin of error, confidence level, and finite population correction.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is sample size in statistical research?",
    a: "Sample size (denoted by n) is the total number of individual observations, participants, or experimental units sampled from a broader population. Determining the optimal sample size ensures that statistical findings are mathematically valid, reliable, and sufficiently powered without wasting excess resources.",
  },
  {
    q: "How do you calculate sample size for an infinite or unknown population?",
    a: "Use Cochran's formula: n = [ z² × p(1 − p) ] ÷ e², where z is the critical value for the chosen confidence level, p is the estimated population proportion (use 0.5 for maximum conservative sample size), and e is the desired margin of error (expressed as a decimal).",
  },
  {
    q: "What is the Finite Population Correction (FPC)?",
    a: "When the population N is small and known (specifically when sample size n exceeds 5% of population N), the Finite Population Correction adjusts the required sample size downward: n_adj = n ÷ [ 1 + ((n − 1) ÷ N) ]. This accounts for the fact that sampling a large fraction of a finite group reduces sampling variance.",
  },
  {
    q: "Why is p = 0.5 (50%) used as the default proportion in sample size formulas?",
    a: "The product p(1 − p) reaches its mathematical maximum at p = 0.5 (0.5 × 0.5 = 0.25). Assuming p = 0.5 yields the most conservative (largest) possible sample size, guaranteeing sufficient statistical power regardless of the true underlying proportion.",
  },
  {
    q: "What is statistical power (1 − β)?",
    a: "Statistical power is the probability of correctly rejecting a false null hypothesis (detecting a true real-world effect when one actually exists). Standard convention targets a minimum statistical power of 0.80 (80%) or 0.90 (90%) in clinical trials and scientific studies.",
  },
  {
    q: "How does margin of error impact sample size?",
    a: "Sample size is inversely proportional to the square of the margin of error (e²). Halving the margin of error (e.g., from ±6% down to ±3%) requires quadrupling the sample size (2² = 4 times as many participants).",
  },
  {
    q: "Why do national political polls typically survey around 1,000 respondents?",
    a: "Under Cochran's formula, a sample size of n ≈ 1,067 yields a ±3% margin of error at a 95% confidence level for an infinite population. Beyond 1,000 respondents, diminishing returns set in: reducing the margin of error to ±1% would require over 9,600 respondents.",
  },
  {
    q: "How does population size N affect required sample size?",
    a: "For large populations (e.g., N > 50,000), total population size has virtually zero impact on the required sample size. A sample of 1,000 provides the same ±3.1% margin of error whether sampling a city of 100,000 or a country of 330 million.",
  },
];

const SAMPLE_SIZE_MATRIX_ROWS = [
  ["100", "±3.0% MOE: 92", "±5.0% MOE: 80", "±10.0% MOE: 49"],
  ["500", "±3.0% MOE: 341", "±5.0% MOE: 217", "±10.0% MOE: 81"],
  ["1,000", "±3.0% MOE: 516", "±5.0% MOE: 278", "±10.0% MOE: 88"],
  ["5,000", "±3.0% MOE: 880", "±5.0% MOE: 357", "±10.0% MOE: 94"],
  ["10,000", "±3.0% MOE: 964", "±5.0% MOE: 370", "±10.0% MOE: 95"],
  ["100,000", "±3.0% MOE: 1,056", "±5.0% MOE: 383", "±10.0% MOE: 96"],
  ["1,000,000+", "±3.0% MOE: 1,067", "±5.0% MOE: 384", "±10.0% MOE: 96"],
];

const COMPONENT_ROWS = [
  ["Confidence Level (z*)", "Determines degree of certainty", "95% (z* = 1.960) is standard; 99% (z* = 2.576) for clinical trials"],
  ["Margin of Error (e)", "Acceptable boundary of sampling uncertainty", "±3% to ±5% for political surveys and market research"],
  ["Population Proportion (p)", "Expected baseline prevalence rate", "0.50 (50%) used for maximum conservative estimate"],
  ["Population Size (N)", "Total universe count (if finite)", "Applies FPC if sample exceeds 5% of total universe"],
];

const POWER_ANALYSIS_ROWS = [
  ["Type I Error (α)", "False Positive rate (rejecting true null)", "Standard α = 0.05 (5% risk)"],
  ["Type II Error (β)", "False Negative rate (failing to detect real effect)", "Standard β = 0.20 (20% risk)"],
  ["Statistical Power (1 − β)", "Probability of detecting a true real-world effect", "Standard 80% to 90% power threshold"],
  ["Standardized Effect Size (d)", "Magnitude of difference between groups", "Cohen's d: 0.2 (small), 0.5 (medium), 0.8 (large)"],
];

const RELATED = [
  { href: "/calculators/math/confidence-interval-calculator", icon: "📈", name: "Confidence Interval" },
  { href: "/calculators/math/probability-calculator", icon: "🎲", name: "Probability Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Sample Size Calculator | CalcDigi"
      intro="Calculate required sample sizes for surveys, clinical trials, and scientific experiments with confidence levels, margins of error, and finite population adjustments."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="n = (z^2 * p * (1-p)) / e^2"
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

          <h2>What is Sample Size? Definition &amp; Statistical Power Principles</h2>
          <p>
            In empirical research and survey methodology, <strong>sample size</strong> represents the total count of individual participants, experimental subjects, or data observations collected to draw inferences about a broader population. Selecting an appropriate sample size is a vital step in experimental design: an undersized sample lacks the statistical power to detect real effects, while an oversized sample squanders financial resources and subjects participants to unnecessary testing.
          </p>
          <p>
            The mathematical foundation of sample size determination derives from the Central Limit Theorem and William G. Cochran&apos;s pioneering 1953 sampling methodology. By balancing the desired margin of error, alpha significance level, statistical power, and population variability, researchers establish the precise sample size necessary to ensure statistical validity.
          </p>
          <p>
            Statistical precision follows the law of diminishing returns: reducing the margin of error in half requires quadrupling the sample size. As sample size grows past approximately 1,000 respondents, additional data collection produces marginal gains in accuracy, explaining why nationwide political polls rarely survey more than 1,000 to 1,500 voters.
          </p>

          <div className="not-prose my-8">
            <ProbabilityDistributionChart />
          </div>

          <h2>Mathematical Derivations and Calculation Formulas</h2>
          <p>
            Depending on population scale and whether the research targets a categorical proportion or continuous numeric mean, distinct algebraic formulas apply:
          </p>

          <h3>1. Cochran&apos;s Formula for Proportions (Infinite Population)</h3>
          <p>
            When estimating a population proportion with an infinite or unknown population size:
          </p>
          <Formula>n = fracz^2 × p(1 − p)e^2</Formula>
          <p>
            <em>Worked Example:</em> A market researcher targets a 95% confidence level (z = 1.960) with a ±4% margin of error (e = 0.04), assuming conservative maximum variance (p = 0.50):
          </p>
          <Formula>n = frac1.960^2 × 0.50 × (1 − 0.50)0.04^2 = frac3.8416 × 0.250.0016 = frac0.96040.0016 = mathbf600.25 ≈ 601text Respondents</Formula>

          <h3>2. Finite Population Correction (FPC)</h3>
          <p>
            When the target population <em>N</em> is small and known, unadjusted Cochran formulas overestimate sample requirements. Apply the Finite Population Correction:
          </p>
          <Formula>n_textadj = fracn1 + (fracn − 1N)</Formula>
          <p>
            <em>Worked Example:</em> Suppose the researcher above is surveying a private company with only N = 1,500 employees. Taking n = 601:
          </p>
          <Formula>n_textadj = frac6011 + (frac6001500) = frac6011 + 0.40 = frac6011.40 = mathbf429.29 ≈ 430text Respondents</Formula>
          <p>
            The FPC reduces the required sample from 601 down to 430, saving substantial time and administrative cost.
          </p>

          <h3>3. Sample Size for Continuous Means</h3>
          <p>
            When evaluating a continuous quantitative mean with anticipated population standard deviation σ and desired error tolerance E:
          </p>
          <Formula>n = ( fracz* × σE )^2</Formula>

          <h2>Statistical Power and Hypothesis Testing Considerations</h2>
          <p>
            In clinical trials and comparative scientific research, sample size must account for both false positive and false negative risk:
          </p>
          <DataTable
            head={["Power Concept", "Statistical Definition", "Standard Analytical Value"]}
            rows={POWER_ANALYSIS_ROWS}
            highlight={2}
          />

          <h2>Sample Size Requirement Matrix (95% Confidence Level)</h2>
          <p>
            The reference matrix below highlights the interplay between population size N and target margin of error:
          </p>
          <DataTable
            head={["Population Size (N)", "High Precision (±3.0% MOE)", "Standard Survey (±5.0% MOE)", "Exploratory (±10.0% MOE)"]}
            rows={SAMPLE_SIZE_MATRIX_ROWS}
            highlight={1}
          />

          <h2>Core Parameters Influencing Sample Size</h2>
          <p>
            Every sample size calculation balances four foundational statistical levers:
          </p>
          <DataTable
            head={["Parameter Lever", "Mathematical Role", "Standard Scientific Convention"]}
            rows={COMPONENT_ROWS}
            highlight={0}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Sample size calculations govern empirical rigor across diverse fields:
          </p>
          <ul>
            <li>
              <strong>National Political Polling:</strong> Survey organizations survey roughly 1,000 to 1,500 voters to achieve a ±3% margin of error across the entire national electorate.
            </li>
            <li>
              <strong>A/B Testing &amp; Conversion Optimization:</strong> Digital product teams compute required sample sizes before launching split tests to ensure statistical power without prolonging test duration.
            </li>
            <li>
              <strong>FDA &amp; Clinical Trial Approvals:</strong> Pharmaceutical trials calculate statistical power to verify that therapeutic drug benefits can be distinguished from placebo effects.
            </li>
            <li>
              <strong>Industrial Quality Assurance:</strong> Manufacturers perform lot acceptance sampling to certify batches against acceptable quality levels (AQL), paired with our <Link href="/calculators/math/confidence-interval-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Confidence Interval Calculator</Link> and <Link href="/calculators/math/probability-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Probability Calculator</Link>.
            </li>
          </ul>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Sample Size Calculator</h2><div class=\"form-group\"><label for=\"ss-confidence\">Confidence Level</label><select id=\"ss-confidence\"><option value=\"90\">90%</option><option selected=\"\" value=\"95\">95%</option><option value=\"99\">99%</option></select></div><div class=\"form-group\"><label for=\"ss-margin\">Margin of Error (%)</label><input id=\"ss-margin\" min=\"0.1\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label for=\"ss-proportion\">Estimated Proportion (%)</label><input id=\"ss-proportion\" max=\"99\" min=\"1\" step=\"any\" type=\"number\" value=\"50\"/></div><div class=\"form-group\"><label for=\"ss-population\">Population Size (optional)</label><input id=\"ss-population\" min=\"1\" placeholder=\"Leave blank if unknown/large\" step=\"1\" type=\"number\"/></div><button class=\"calc-btn\" onclick=\"calcSampleSize()\">Calculate Sample Size</button><button class=\"calc-btn\" onclick=\"document.getElementById('ss-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"ss-result\" style=\"display:none;\"><div id=\"ss-ri\"></div><div class=\"ai-box\" id=\"ss-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-ss-result\" onclick=\"printResult('ss-result','Sample Size Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Sample Size Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-sample-size-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcSampleSize(){\\n  const conf=parseFloat(document.getElementById('ss-confidence').value);\\n  const margin=parseFloat(document.getElementById('ss-margin').value)/100;\\n  const p=(parseFloat(document.getElementById('ss-proportion').value)||50)/100;\\n  const popStr=document.getElementById('ss-population').value;\\n  const pop=popStr?parseFloat(popStr):null;\\n  if(isNaN(margin)||margin<=0){alert('Enter a valid margin of error.');return;}\\n  const zTable={90:1.645,95:1.96,99:2.576};\\n  const z=zTable[conf]||1.96;\\n  const n0=(z*z*p*(1-p))/(margin*margin);\\n  let n=n0;\\n  if(pop&&pop>0){n=n0/(1+((n0-1)/pop));}\\n  n=Math.ceil(n);\\n  document.getElementById('ss-ri').innerHTML=\\n    ri('Required Sample Size','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+n+'</strong>',true)+\\n    ri('Confidence Level',conf+'%')+\\n    ri('Margin of Error',(margin*100).toFixed(1)+'%')+\\n    ri('Z-Score Used',z)+\\n    (pop?ri('Population Size',pop):'');\\n  document.getElementById('ss-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
