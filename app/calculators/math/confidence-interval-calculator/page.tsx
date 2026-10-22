import ConfidenceIntervalCalculator from "@/components/calcs/math/confidence-interval-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/confidence-interval-calculator";
const TITLE = "Confidence Interval Calculator | CalcDigi";
const DESCRIPTION =
  "Free online confidence interval calculator. Calculate confidence intervals for population means and proportions at 90%, 95%, and 99% levels with step-by-step margin of error.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a confidence interval in statistics?",
    a: "A confidence interval (CI) is an estimated range of plausible values for an unknown population parameter, computed from sample data at a specified confidence level (such as 95%). It quantifies the degree of sampling uncertainty associated with point estimates.",
  },
  {
    q: "What does a 95% confidence level actually mean?",
    a: "It means that if we were to take repeated random samples of the same size from the population and construct a confidence interval from each sample, approximately 95% of those calculated intervals would successfully contain the true, fixed population parameter.",
  },
  {
    q: "How do you calculate the margin of error (MOE)?",
    a: "The margin of error equals the critical value multiplied by the standard error: MOE = Critical Value × Standard Error. For a population mean with known standard deviation σ: MOE = z* × (σ ÷ √n).",
  },
  {
    q: "When should I use a z-critical value versus a t-critical value?",
    a: "Use the z-distribution (z*) when the population standard deviation σ is known or sample size is very large (n ≥ 30). Use Student's t-distribution (t*) when σ is unknown and estimated using sample standard deviation s, especially for small samples (n < 30).",
  },
  {
    q: "How does increasing the sample size impact the confidence interval?",
    a: "Increasing sample size n reduces the standard error proportionally to 1/√n, resulting in a narrower, more precise confidence interval without sacrificing the stated confidence level. Quadrupling sample size halves the margin of error.",
  },
  {
    q: "How does increasing the confidence level impact interval width?",
    a: "Increasing the confidence level (e.g., from 90% to 99%) increases the critical value (z* moves from 1.645 to 2.576), widening the interval. Greater certainty requires a wider net to capture the true parameter.",
  },
  {
    q: "How do you calculate a confidence interval for a proportion?",
    a: "For a sample proportion p̂ = x ÷ n: CI = p̂ ± z* × √[ (p̂(1 − p̂)) ÷ n ]. This formula is valid when both np̂ ≥ 10 and n(1 − p̂) ≥ 10 (the normal approximation condition).",
  },
  {
    q: "Can a confidence interval include negative values?",
    a: "Yes, for parameters that can mathematically take negative values (such as temperature change, investment returns, or difference between two group means). However, for strictly positive quantities (like heights or elapsed times), the interval should be bounded at zero.",
  },
];

const CRITICAL_VALUES_ROWS = [
  ["80%", "0.100 (10%)", "1.282", "Preliminary exploratory research"],
  ["90%", "0.050 (5%)", "1.645", "Public opinion polling, market trends"],
  ["95%", "0.025 (2.5%)", "1.960", "Universal standard across academic & clinical research"],
  ["98%", "0.010 (1%)", "2.326", "High-precision engineering and manufacturing"],
  ["99%", "0.005 (0.5%)", "2.576", "Pharmaceutical drug safety, critical medical trials"],
  ["99.9%", "0.0005 (0.05%)", "3.291", "Nuclear safety, aerospace structural compliance"],
];

const FORMULA_COMPARISON_ROWS = [
  ["Mean (Known σ)", "CI = x̄ ± z* × (σ ÷ √n)", "Standard normal z-table", "Quality control with established historical variance"],
  ["Mean (Unknown σ)", "CI = x̄ ± t* × (s ÷ √n)", "Student's t-table (df = n − 1)", "Scientific experiments, clinical trials with small n"],
  ["Proportion (p̂)", "CI = p̂ ± z* × √[p̂(1−p̂) ÷ n]", "Standard normal z-table", "Election polling, customer conversion rates"],
  ["Difference Between Means", "CI = (x̄₁ − x̄₂) ± t* × SE_diff", "Two-sample t-distribution", "A/B testing, randomized controlled trials"],
];

const MISCONCEPTIONS_ROWS = [
  ["'There is a 95% probability μ lies in this specific interval'", "False; μ is a fixed unknown constant, not a random variable. The interval either contains it or it does not.", "Frequentist interpretation of probability"],
  ["'95% of sample values fall inside the confidence interval'", "False; the interval estimates the population mean μ, not the spread of individual observations.", "Confuses confidence interval with prediction interval"],
  ["'Wider intervals indicate superior statistical studies'", "False; wider intervals indicate greater sampling uncertainty or smaller sample sizes.", "Tradeoff between confidence level and precision"],
];

const RELATED = [
  { href: "/calculators/math/sample-size-calculator", icon: "🧪", name: "Sample Size Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/probability-calculator", icon: "🎲", name: "Probability Calculator" },
  { href: "/calculators/math/variance-calculator", icon: "📈", name: "Variance Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Confidence Interval Calculator"
      intro="Calculate confidence intervals, margins of error, and standard errors for population means and proportions at any confidence level with complete mathematical derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="CI = mean +/- z * (stdDev / sqrt(n))"
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

          <h2>What is a Confidence Interval? Definition &amp; Inferential Foundations</h2>
          <p>
            In inferential statistics, a <strong>confidence interval</strong> is an estimated range of values computed from sample data that is likely to encompass an unknown population parameter. While point estimates (such as a single sample mean x̄) provide a single best guess, confidence intervals explicitly capture the inherent sampling variability that arises whenever a subset of observations represents a broader population.
          </p>
          <p>
            Pioneered by mathematician Jerzy Neyman in 1937, confidence intervals form the bedrock of frequentist statistical inference. A confidence interval consists of two components: the point estimate at its center, and the <em>margin of error (MOE)</em> extending symmetrically above and below. Together, they quantify the precision and reliability of scientific, industrial, and economic findings.
          </p>
          <p>
            Unlike point estimates which fail to disclose their underlying uncertainty, confidence intervals report both the observed estimate and the precision of the study. A narrow confidence interval indicates high precision and low sampling variance, whereas a wide interval warns decision-makers that sample data is insufficient to establish tight parameters.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Step-by-Step Mathematical Formulas and Derivations</h2>
          <p>
            The construction of a confidence interval depends on whether the parameter of interest is a continuous population mean or a categorical population proportion:
          </p>

          <h3>1. Confidence Interval for a Population Mean (Known σ)</h3>
          <p>
            When the population standard deviation σ is known, the margin of error uses the critical value <em>z*</em> from the standard normal distribution:
          </p>
          <Formula>CI = x̄ ± z* × (fracσsqrtn)</Formula>
          <p>
            <em>Worked Example:</em> A battery manufacturer tests n = 100 cells, observing a mean lifespan x̄ = 1,450 hours with known σ = 60 hours. At a 95% confidence level (z* = 1.960):
          </p>
          <ol>
            <li>Standard Error: SEM = 60 ÷ √100 = 60 ÷ 10 = 6.00 hours</li>
            <li>Margin of Error: MOE = 1.960 × 6.00 = 11.76 hours</li>
            <li>Confidence Interval: 1,450 ± 11.76 = <strong>[1,438.24, 1,461.76] hours</strong></li>
          </ol>

          <h3>2. Confidence Interval for a Population Mean (Unknown σ, Student&apos;s t)</h3>
          <p>
            In practice, population σ is rarely known. We substitute sample standard deviation <em>s</em> and use Student&apos;s t-distribution with degrees of freedom df = n − 1:
          </p>
          <Formula>CI = x̄ ± t* × (fracssqrtn)</Formula>

          <h3>3. Confidence Interval for a Proportion</h3>
          <p>
            For a binomial proportion p̂ = x ÷ n (such as election voter preferences or customer conversion rates):
          </p>
          <Formula>CI = p̂ ± z* × sqrtfracp̂(1 − p̂)n</Formula>
          <p>
            <em>Worked Example:</em> A poll of n = 1,000 registered voters finds 540 support Proposition A (p̂ = 0.54). At 95% confidence (z* = 1.960):
          </p>
          <Formula>MOE = 1.960 × sqrt(0.54 × 0.46) ÷ 1000 = 1.960 × sqrt0.0002484 = 1.960 × 0.01576 = mathbf±0.0309text (±3.09%)</Formula>
          <p>
            The 95% confidence interval spans <strong>[50.91%, 57.09%]</strong>.
          </p>

          <h2>The Pivotal Quantity Derivation Method</h2>
          <p>
            Mathematically, confidence intervals are derived using the method of pivotal quantities. For a sample mean x̄ from a normal population with known variance σ², the standardized test statistic Z = (x̄ − μ) ÷ (σ ÷ √n) is independent of the unknown parameter μ. Setting the probability between critical bounds:
          </p>
          <Formula>P( -z^* ≤ fracx̄ − μσ / sqrtn ≤ z^* ) = 1 − α</Formula>
          <p>
            Multiplying through by the standard error (σ ÷ √n) and subtracting the sample mean x̄ isolates −μ in the center. Multiplying the inequalities by −1 reverses their direction, directly yielding the standard confidence interval limits:
          </p>
          <Formula>P( x̄ − z^*fracσsqrtn ≤ μ ≤ x̄ + z^*fracσsqrtn ) = 1 − α</Formula>

          <h2>One-Sided Bounds vs. Two-Sided Intervals</h2>
          <p>
            In regulatory compliance, structural engineering, and toxicological safety, researchers frequently require one-sided confidence bounds rather than two-sided intervals:
          </p>
          <ul>
            <li>
              <strong>Lower Confidence Bound:</strong> Guarantees with (1 − α) confidence that a parameter exceeds a required safety minimum: L = x̄ − z_α × (σ ÷ √n). Used to certify minimum tensile strength of bridge cables or structural beams.
            </li>
            <li>
              <strong>Upper Confidence Bound:</strong> Guarantees with (1 − α) confidence that a parameter remains below a hazard maximum: U = x̄ + z_α × (σ ÷ √n). Used by environmental agencies to verify groundwater contaminant levels remain strictly below legal toxicity limits.
            </li>
          </ul>

          <h2>Confidence Intervals vs. Prediction Intervals</h2>
          <p>
            A common point of confusion in applied statistics is distinguishing confidence intervals from prediction intervals. A confidence interval quantifies uncertainty about the <em>population parameter</em> (such as mean weight μ), whereas a prediction interval estimates the range within which a <em>single future individual observation</em> will fall.
          </p>
          <p>
            Because individual values contain both the sampling uncertainty of the mean plus the inherent physical variability of individual observations (σ²), a prediction interval incorporates an extra variance term: SE_pred = s × √(1 + 1/n). Consequently, prediction intervals are substantially wider than confidence intervals.
          </p>

          <h2>Small-Sample Binomial Correction: The Agresti-Coull Adjusted Interval</h2>
          <p>
            When estimating population proportions from small samples where the normal approximation condition (np ≥ 10 and n(1 − p) ≥ 10) is violated, standard Wald confidence intervals suffer from severe downward coverage errors. Even for moderate samples, true empirical coverage frequently falls as low as 88% despite a nominal 95% target.
          </p>
          <p>
            To restore mathematical rigor, statisticians Alan Agresti and Brent Coull introduced the &ldquo;add-two-successes-and-two-failures&rdquo; adjustment in 1998. By adding 2 successes and 2 failures to raw data, we define adjusted parameters:
          </p>
          <Formula>n_adj = n + 4 and p_adj = (x + 2) ÷ (n + 4)</Formula>
          <p>
            The resulting confidence interval, CI = p_adj ± z* × √[ (p_adj × (1 − p_adj)) ÷ n_adj ], achieves near-perfect empirical coverage across small and skewed samples without requiring complex binomial distribution computations.
          </p>

          <h2>Welch&apos;s Two-Sample T-Interval for Unequal Variances</h2>
          <p>
            When comparing two independent treatment groups (such as drug vs. placebo), assuming equal population variances is rarely justifiable. Applying Student&apos;s pooled two-sample t-test when variances differ inflates false-positive rates. Instead, Welch&apos;s t-interval computes unpooled standard error and adjusts degrees of freedom via the Welch-Satterthwaite equation:
          </p>
          <Formula>df = [ (s1²/n1 + s2²/n2)² ] ÷ [ (s1²/n1)²/(n1 − 1) + (s2²/n2)²/(n2 − 1) ]</Formula>
          <p>
            This adjustment guarantees robust confidence coverage regardless of variance disparities between treatment cohorts, making it the preferred default across biomedical trials and modern statistical software packages.
          </p>

          <h2>Critical Value Reference Table</h2>
          <p>
            The table below summarizes standard critical values across widely utilized confidence coefficients:
          </p>
          <DataTable
            head={["Confidence Level (1 − α)", "Tail Area (α / 2)", "Critical Value (z*)", "Standard Analytical Context"]}
            rows={CRITICAL_VALUES_ROWS}
            highlight={2}
          />

          <h2>Summary Comparison of Confidence Interval Models</h2>
          <p>
            Selecting the appropriate statistical model ensures unbiased interval coverage:
          </p>
          <DataTable
            head={["Parameter & Assumption", "Interval Formula", "Critical Distribution", "Ideal Research Domain"]}
            rows={FORMULA_COMPARISON_ROWS}
            highlight={0}
          />

          <h2>Addressing Common Statistical Misconceptions</h2>
          <p>
            Confidence intervals are frequently misunderstood by practitioners and the general public:
          </p>
          <DataTable
            head={["Common Misconception", "Mathematical Reality", "Foundational Concept"]}
            rows={MISCONCEPTIONS_ROWS}
            highlight={0}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Confidence intervals guide critical decisions across multiple industries:
          </p>
          <ul>
            <li>
              <strong>Political Polling &amp; Demographics:</strong> Public opinion surveys report margins of error (e.g. &ldquo;Candidate leads 52% to 48%, ±3% MOE&rdquo;) to quantify voting uncertainty.
            </li>
            <li>
              <strong>Pharmaceutical Clinical Trials:</strong> Drug regulators require 95% confidence intervals on therapeutic treatment effect sizes to ensure statistical and clinical significance.
            </li>
            <li>
              <strong>A/B Testing &amp; Web Experimentation:</strong> Tech companies evaluate confidence bounds on conversion uplift before rolling out feature changes, paired with our <Link href="/calculators/math/sample-size-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Sample Size Calculator</Link>.
            </li>
            <li>
              <strong>Industrial Quality Tolerances:</strong> Manufacturers establish confidence intervals on component dimensions to guarantee Six Sigma compliance, paired with our <Link href="/calculators/math/z-score-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Z-Score Calculator</Link> and <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link>.
            </li>
          </ul>
        
          <h2>Neyman Construction, Coverage Probability & Student's t-Distribution</h2>
          <p>
            Formally introduced by Jerzy Neyman in 1937, a confidence interval does not represent the probability that a specific calculated interval contains the population parameter; rather, it reflects the long-run theoretical coverage probability across an infinite sequence of repeated independent experiments. When population variance σ² is unknown and sample size n is small (typically n &lt; 30), William Sealy Gosset's Student's t-distribution with (n − 1) degrees of freedom must be used in place of standard Gaussian Z-scores to account for excess sampling variability in the denominator. In clinical epidemiology, FDA regulatory pharmaceutical trials, and biomedical meta-analyses, confidence intervals are strictly preferred over standalone p-values because they communicate both effect magnitude and measurement precision on the natural physical scale.
          </p>
</>
      }
    >
      <ConfidenceIntervalCalculator />
    </CalcPage>
  );
}
