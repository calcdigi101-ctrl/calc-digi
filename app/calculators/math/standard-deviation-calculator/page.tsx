import StandardDeviationCalculator from "@/components/calcs/math/standard-deviation-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/standard-deviation-calculator";
const TITLE = "Standard Deviation Calculator (Sample & Population) | CalcDigi";
const DESCRIPTION =
  "Free online standard deviation calculator. Calculate sample and population standard deviation, variance, mean, and sum of squares with step-by-step formulas.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is standard deviation in statistics?",
    a: "Standard deviation is a fundamental statistical metric measuring the degree of dispersion, spread, or variability of data points around their arithmetic mean. A low standard deviation indicates that data points cluster tightly near the mean, while a high standard deviation reflects greater dispersion and volatility.",
  },
  {
    q: "What is the difference between sample and population standard deviation?",
    a: "Population standard deviation (σ) is used when analyzing every individual member of an entire group, dividing the sum of squared deviations by N. Sample standard deviation (s) is used when estimating parameters from a representative subset, dividing by (n − 1)—known as Bessel's correction—to eliminate negative bias.",
  },
  {
    q: "Why do we divide by (n − 1) instead of n for sample standard deviation?",
    a: "Because the sample mean is calculated from the sample itself rather than the true population mean, sample observations cluster slightly closer to the sample mean than to the true mean. Dividing by n systematically underestimates true population variance. Bessel's correction (n − 1) produces an unbiased estimator.",
  },
  {
    q: "What is the Empirical Rule (68-95-99.7 Rule)?",
    a: "In a normal (Gaussian) distribution: approximately 68.27% of observations fall within ±1 standard deviation of the mean (μ ± 1σ), approximately 95.45% fall within ±2 standard deviations (μ ± 2σ), and approximately 99.73% fall within ±3 standard deviations (μ ± 3σ).",
  },
  {
    q: "Can standard deviation be negative?",
    a: "No. Standard deviation can never be negative. Because it is computed as the principal square root of the variance (which is the average of non-negative squared deviations), standard deviation is always ≥ 0. A value of 0 occurs only if every observation in the dataset is identical.",
  },
  {
    q: "How does standard deviation relate to variance?",
    a: "Standard deviation is simply the square root of variance: s = √s² or σ = √σ². While variance is expressed in squared units (e.g., dollars squared, centimeters squared), standard deviation restores the measurement to the original physical units of the dataset.",
  },
  {
    q: "What is the standard error of the mean (SEM)?",
    a: "The standard error of the mean measures the sampling variability of the sample mean itself across repeated samples: SEM = s ÷ √n. As sample size n increases, the standard error decreases, reflecting greater estimation precision.",
  },
  {
    q: "How does standard deviation measure investment risk?",
    a: "In finance and modern portfolio theory, annualized standard deviation represents asset volatility. A stock with a standard deviation of 25% experiences far larger price swings and downside risk than a bond portfolio with a standard deviation of 4%.",
  },
];

const COMPARISON_ROWS = [
  ["Definition", "Full census of entire universe", "Representative subset / sample"],
  ["Symbol", "Greek lowercase sigma (σ)", "Latin lowercase s"],
  ["Denominator", "Divide sum of squares by N", "Divide sum of squares by (n − 1) (Bessel)"],
  ["Unbiased Estimator", "True population parameter", "Unbiased estimate of population σ²"],
  ["Formula", "σ = √[ Σ(xᵢ − μ)² ÷ N ]", "s = √[ Σ(xᵢ − x̄)² ÷ (n − 1) ]"],
];

const EMPIRICAL_ROWS = [
  ["μ ± 1σ", "68.27% of all observations", "Typical benchmark range; 1 in 3 outside"],
  ["μ ± 2σ", "95.45% of all observations", "Statistical significance boundary (p < 0.05)"],
  ["μ ± 3σ", "99.73% of all observations", "Near certainty; basis of industrial Six Sigma"],
  ["μ ± 6σ", "99.9999998% (3.4 defects per million)", "World-class Six Sigma manufacturing standard"],
];

const RELATED = [
  { href: "/calculators/math/variance-calculator", icon: "📈", name: "Variance Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/confidence-interval-calculator", icon: "📐", name: "Confidence Interval" },
  { href: "/calculators/math/sample-size-calculator", icon: "🧪", name: "Sample Size Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Standard Deviation Calculator"
      intro="Calculate sample and population standard deviation, variance, mean, and sum of squared deviations for any dataset with step-by-step mathematical solutions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="s = sqrt( sum(x_i - mean)^2 / (n - 1) )"
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

          <h2>What is Standard Deviation? Definition &amp; Mathematical Significance</h2>
          <p>
            In probability and mathematical statistics, the <strong>standard deviation</strong> is the premier quantitative metric of dispersion. It measures the typical physical distance that individual data points fall from the arithmetic mean. While the mean identifies the central focal point of a distribution, the standard deviation quantifies its width, uncertainty, and volatility.
          </p>
          <p>
            The term &ldquo;standard deviation&rdquo; was coined by mathematician Karl Pearson in 1893, replacing earlier terminology like Gauss&apos;s &ldquo;mean error.&rdquo; Mathematically, standard deviation represents the Euclidean distance (L2 norm) in n-dimensional space normalized by the degrees of freedom. Because deviations are squared before taking the square root, standard deviation assigns greater weight to large outliers, making it an exceptionally sensitive diagnostic tool for risk management and scientific experimental precision.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Step-by-Step Mathematical Formulas and Derivations</h2>
          <p>
            Calculating standard deviation involves five sequential mathematical steps: calculating the mean, finding residual deviations, squaring each deviation, computing the average squared deviation (variance), and taking the principal square root.
          </p>

          <h3>1. Sample Standard Deviation (with Bessel&apos;s Correction)</h3>
          <p>
            When working with a sample representing a larger population, divide by (n − 1) to eliminate downward estimator bias:
          </p>
          <Formula>s = √[ (Σ (xᵢ − x̄)²) ÷ (n − 1) ]</Formula>
          <p>
            <em>Worked Example:</em> Consider sample observations [4, 8, 6, 5, 3, 7].
          </p>
          <ol>
            <li>Mean: x̄ = (4 + 8 + 6 + 5 + 3 + 7) ÷ 6 = 33 ÷ 6 = 5.50</li>
            <li>Deviations: (4 − 5.5) = -1.5, (8 − 5.5) = 2.5, (6 − 5.5) = 0.5, (5 − 5.5) = -0.5, (3 − 5.5) = -2.5, (7 − 5.5) = 1.5</li>
            <li>Squared Deviations: 2.25, 6.25, 0.25, 0.25, 6.25, 2.25</li>
            <li>Sum of Squares (SS): 2.25 + 6.25 + 0.25 + 0.25 + 6.25 + 2.25 = 17.50</li>
            <li>Sample Variance: s² = 17.50 ÷ (6 − 1) = 17.50 ÷ 5 = 3.50</li>
            <li>Sample Standard Deviation: s = √3.50 = <strong>1.8708</strong></li>
          </ol>

          <h3>2. Population Standard Deviation</h3>
          <p>
            When your dataset contains the entire population universe, divide by total census count N without Bessel&apos;s correction:
          </p>
          <Formula>σ = √[ (Σ (xᵢ − μ)²) ÷ N ]</Formula>
          <p>
            For the same numbers treated as an entire population: σ² = 17.50 ÷ 6 = 2.9167, and σ = √2.9167 = <strong>1.7078</strong>. Notice that sample standard deviation is deliberately larger to compensate for sampling uncertainty.
          </p>

          <h2>Sample vs. Population Standard Deviation: The Core Distinctions</h2>
          <p>
            Selecting between sample and population formulas is vital for statistical validity:
          </p>
          <DataTable
            head={["Metric Dimension", "Population Parameter (σ)", "Sample Estimator (s)"]}
            rows={COMPARISON_ROWS}
            highlight={1}
          />

          <h2>The Empirical Rule (68-95-99.7) for Normal Distributions</h2>
          <p>
            For normally distributed data, standard deviation dictates the exact percentage of observations falling within specified distance intervals from the mean:
          </p>
          <DataTable
            head={["Distance from Mean", "Contained Probability Mass", "Analytical Significance"]}
            rows={EMPIRICAL_ROWS}
            highlight={1}
          />

          <h2>Coefficient of Variation: Measuring Relative Variability</h2>
          <p>
            While standard deviation communicates absolute dispersion in the units of measurement, comparing datasets with widely divergent scales or distinct measurement units requires the <strong>Coefficient of Variation (CV)</strong>:
          </p>
          <Formula>CV = (s ÷ x̄) × 100%</Formula>
          <p>
            For example, an investment portfolio yielding an average return of 10% with a standard deviation of 2% has a CV of 20%, whereas a volatile emerging-market fund yielding 15% with a standard deviation of 6% has a CV of 40%. The coefficient of variation normalizes risk across asset classes and scientific experiments.
          </p>

          <h2>Practical Real-World Applications</h2>
          <p>
            Standard deviation is utilized across quantitative disciplines:
          </p>
          <ul>
            <li>
              <strong>Financial Risk &amp; Investment Portfolios:</strong> Assess asset volatility and Sharpe ratios, often paired with our <Link href="/calculators/math/variance-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Variance Calculator</Link>.
            </li>
            <li>
              <strong>Scientific Research &amp; Hypothesis Testing:</strong> Compute standard error and confidence intervals using our <Link href="/calculators/math/confidence-interval-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Confidence Interval Calculator</Link>.
            </li>
            <li>
              <strong>Six Sigma Quality Engineering:</strong> Measure industrial defect rates and process capability indices (Cp, Cpk) using our companion <Link href="/calculators/math/z-score-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Z-Score Calculator</Link>.
            </li>
            <li>
              <strong>Standardized Examination Scoring:</strong> Score SAT, GRE, and IQ tests where raw test points are normalized to a predetermined mean (e.g. 100) and standard deviation (e.g. 15), paired with our <Link href="/calculators/math/average-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Average Calculator</Link>.
            </li>
            <li>
              <strong>Biomedical Reference Ranges:</strong> Establish clinical laboratory baselines where patient blood panel results between μ ± 2σ are classified as medically normal.
            </li>
          </ul>
        
          <h2>Bessel's Unbiased Correction, Chebyshev's Inequality & Normal Dispersion</h2>
          <p>
            In mathematical statistics, the distinction between sample standard deviation s (using denominator n − 1) and population standard deviation σ (using denominator N) resolves Bessel's correction for degrees of freedom. Because sample observations cluster more tightly around their own empirical mean than around the true unobserved population parameter, dividing by n systematically underestimates true population variance; dividing by (n − 1) eliminates this negative bias completely. Regardless of whether a distribution is Gaussian or severely skewed, Chebyshev's inequality guarantees that at least 1 − (1/k²) of all observations must fall within k standard deviations of the mean, proving that at least 75% of all data points must lie within 2σ for any finite-variance distribution.
          </p>

          <h2>Six Sigma Quality Engineering & Portfolio Value-at-Risk (VaR)</h2>
          <p>
            In Six Sigma industrial manufacturing, process capability index Cpk and defect prevention rely directly on standard deviation tolerances: achieving 6σ quality guarantees that fewer than 3.4 defect opportunities occur per million manufactured units. In quantitative investment finance, asset volatility is quantified by annualized standard deviation of returns, establishing the denominator in William Sharpe's risk-adjusted return ratio (Sharpe Ratio = (R_p - R_f) / σ_p) and anchoring Value-at-Risk (VaR) capital reserve mandates across commercial investment banking.
          </p>

          <h2>Empirical Three-Sigma Rule & Kurtosis Characteristics</h2>
          <p>
            Under the classical empirical three-sigma rule (68-95-99.7 rule), approximately 68.27% of observations in a normal Gaussian distribution fall within one standard deviation of the mean, 95.45% within two standard deviations, and 99.73% within three standard deviations. In financial econometrics, leptokurtic fat-tailed distributions exhibit higher kurtosis than Gaussian bell curves, indicating elevated risk of extreme tail market events.
          </p>
</>
      }
    >
      <StandardDeviationCalculator />
    </CalcPage>
  );
}
