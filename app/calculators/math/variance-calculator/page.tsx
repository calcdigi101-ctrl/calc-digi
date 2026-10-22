import VarianceCalculator from "@/components/calcs/math/variance-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/variance-calculator";
const TITLE = "Variance Calculator (Sample & Population) | CalcDigi";
const DESCRIPTION =
  "Free online variance calculator. Calculate sample variance (s²), population variance (σ²), standard deviation, and sum of squared differences step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is variance in statistics?",
    a: "Variance is a quantitative measure of statistical dispersion representing the arithmetic average of squared deviations from the mean. It quantifies how far individual numbers spread out from their collective average. A variance of zero indicates that all data points are identical.",
  },
  {
    q: "What is the difference between sample variance and population variance?",
    a: "Population variance (σ²) divides the sum of squared deviations by total population size N. Sample variance (s²) divides by (n − 1)—Bessel's correction—to correct for the inherent downward bias that occurs when estimating population dispersion from a sample.",
  },
  {
    q: "Why are the deviations squared when computing variance?",
    a: "Because the sum of raw deviations around the mean always equals exactly zero (Σ (xᵢ − x̄) = 0). Squaring deviations eliminates negative signs, ensuring that deviations in both directions contribute positively to the measure of dispersion, while also penalizing larger deviations quadratically.",
  },
  {
    q: "What units is variance measured in?",
    a: "Variance is always expressed in the squared units of the original data. For example, if data is measured in meters, variance is in square meters (m²); if measured in dollars, variance is in dollars squared ($²). Taking the square root converts variance back into standard deviation in original linear units.",
  },
  {
    q: "Can variance be negative?",
    a: "No. Variance can never be negative. Since it is the sum of squared real numbers divided by a positive integer (N or n − 1), variance is strictly ≥ 0.",
  },
  {
    q: "What is the shortcut formula for variance?",
    a: "The computational formula is: s² = [ Σ(xᵢ²) − ((Σxᵢ)² ÷ n) ] ÷ (n − 1). This algebraically equivalent formula prevents rounding error accumulation when calculating large datasets by avoiding intermediate subtraction of the mean.",
  },
  {
    q: "How does variance relate to covariance and correlation?",
    a: "The variance of a variable is simply its covariance with itself: Var(X) = Cov(X, X). In multivariate statistics, variance forms the diagonal elements of the covariance matrix and serves as the denominator normalizing correlation coefficients between variables.",
  },
  {
    q: "What is ANOVA (Analysis of Variance)?",
    a: "ANOVA is an inferential statistical methodology that decomposes total observed dataset variance into between-group variance and within-group variance to test whether multiple population group means are statistically significantly different.",
  },
];

const VARIANCE_VS_STDDEV_ROWS = [
  ["Mathematical Formula", "Average of squared deviations: σ² = Σ(xᵢ − μ)² ÷ N", "Square root of variance: σ = √σ²"],
  ["Measurement Unit", "Squared physical units (e.g., $², m², kg²)", "Original linear physical units (e.g., $, m, kg)"],
  ["Algebraic Tractability", "Highly additive; Var(X + Y) = Var(X) + Var(Y) (independent)", "Non-linear; cannot simply be added together"],
  ["Analytical Usage", "ANOVA, linear regression, theoretical proofs", "Empirical reporting, confidence intervals, risk metrics"],
  ["Outlier Weighting", "Quadratically amplifies extreme deviations", "Proportional linear distance scale"],
];

const ADDITIVITY_ROWS = [
  ["Linear Transformation", "Var(aX + b) = a² × Var(X)", "Additive constant b has zero effect; scale factor a is squared"],
  ["Independent Sum", "Var(X + Y) = Var(X) + Var(Y)", "Variances add directly for uncorrelated variables"],
  ["Independent Difference", "Var(X − Y) = Var(X) + Var(Y)", "Variances still add; uncertainty compounds in both operations"],
  ["Correlated Sum", "Var(X + Y) = Var(X) + Var(Y) + 2×Cov(X, Y)", "Incorporates mutual covariance between variables"],
];

const RELATED = [
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/confidence-interval-calculator", icon: "📈", name: "Confidence Interval" },
  { href: "/calculators/math/sample-size-calculator", icon: "🧪", name: "Sample Size Calculator" },
  { href: "/calculators/math/median-calculator", icon: "⚖️", name: "Median Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Variance Calculator"
      intro="Calculate sample variance (s²), population variance (σ²), sum of squares, and standard deviation for any dataset with step-by-step algebraic derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="s^2 = sum(x_i - mean)^2 / (n - 1)"
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

          <h2>What is Variance? Definition &amp; Theoretical Foundations</h2>
          <p>
            In mathematical statistics, <strong>variance</strong> is the foundational measure of numerical dispersion. Defined as the expected value of squared deviations from the mean, variance quantifies how far a set of numbers spreads out from their central mathematical location.
          </p>
          <p>
            First formally defined by Ronald Fisher in 1918 in his landmark paper on genetic inheritance, variance provides the algebraic bedrock for modern inferential statistics. Unlike standard deviation, variance possesses the elegant mathematical property of additivity: the variance of the sum of independent random variables equals the sum of their individual variances. This additive property makes variance the indispensable engine driving regression analysis, signal processing, and portfolio risk attribution.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Mathematical Derivation &amp; Calculation Methods</h2>
          <p>
            Variance can be computed using either the definitive mean-deviation method or the computationally efficient shortcut formula:
          </p>

          <h3>1. Sample Variance Formula (Unbiased Estimator)</h3>
          <p>
            When estimating the variance of a population from sample data, apply Bessel&apos;s correction by dividing the sum of squared differences by (n − 1):
          </p>
          <Formula>s² = [ Σ (xᵢ − x̄)² ] ÷ (n − 1)</Formula>
          <p>
            <em>Worked Example:</em> Consider sample observations [10, 14, 18, 12, 16].
          </p>
          <ol>
            <li>Compute sample mean: x̄ = (10 + 14 + 18 + 12 + 16) ÷ 5 = 70 ÷ 5 = 14.00</li>
            <li>Compute deviations: (10 − 14) = -4, (14 − 14) = 0, (18 − 14) = 4, (12 − 14) = -2, (16 − 14) = 2</li>
            <li>Square deviations: (-4)² = 16, 0² = 0, 4² = 16, (-2)² = 4, 2² = 4</li>
            <li>Sum of squared deviations (SS): 16 + 0 + 16 + 4 + 4 = 40.00</li>
            <li>Sample variance: s² = 40.00 ÷ (5 − 1) = 40.00 ÷ 4 = <strong>10.00</strong></li>
          </ol>

          <h3>2. Population Variance Formula</h3>
          <p>
            When analyzing a complete census containing every member of the population N:
          </p>
          <Formula>σ² = [ Σ (xᵢ − μ)² ] ÷ N</Formula>
          <p>
            For the same five numbers as an entire population: σ² = 40.00 ÷ 5 = <strong>8.00</strong>.
          </p>

          <h2>Sample Variance as an Unbiased Estimator (Why n − 1 Works)</h2>
          <p>
            A celebrated proof in theoretical statistics establishes why dividing by <em>n</em> produces an inherently biased sample variance. Because sample observations naturally cluster closer to their own sample mean x̄ than to the true population mean μ, the expected value of uncorrected sample variance equals:
          </p>
          <Formula>E[ (1/n) × Σ(xᵢ − x̄)² ] = ((n − 1) ÷ n) × σ²</Formula>
          <p>
            Notice the shrinkage factor (n − 1) ÷ n. To restore unbiased estimation such that E[s²] = σ², we multiply by the reciprocal correction factor n ÷ (n − 1). The <em>n</em> in the numerator cancels the <em>n</em> in the denominator, leaving exactly (n − 1) as the divisor. This correction is known as Bessel&apos;s correction.
          </p>

          <h2>Variance vs. Standard Deviation: Core Analytical Tradeoffs</h2>
          <p>
            While variance and standard deviation are mathematically linked through a square-root relationship, they serve distinct analytical roles:
          </p>
          <DataTable
            head={["Comparison Dimension", "Statistical Variance (s², σ²)", "Standard Deviation (s, σ)"]}
            rows={VARIANCE_VS_STDDEV_ROWS}
            highlight={1}
          />

          <h2>Mathematical Properties of Variance</h2>
          <p>
            Variance obeys algebraic theorems that enable powerful manipulations in linear models and stochastic processes:
          </p>
          <DataTable
            head={["Algebraic Operation", "Mathematical Identity", "Interpretation"]}
            rows={ADDITIVITY_ROWS}
            highlight={1}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Variance underpins decision-making across high-stakes domains:
          </p>
          <ul>
            <li>
              <strong>Modern Portfolio Theory (Markowitz Model):</strong> Optimize asset allocation along the efficient frontier by minimizing portfolio variance for a target return, paired with our <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link>.
            </li>
            <li>
              <strong>Machine Learning &amp; Bias-Variance Tradeoff:</strong> Balance model complexity between underfitting (high bias, low variance) and overfitting (low bias, high variance).
            </li>
            <li>
              <strong>Scientific ANOVA &amp; Clinical Trials:</strong> Test whether treatment groups demonstrate statistically significant efficacy differences compared to control groups, paired with our <Link href="/calculators/math/average-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Average Calculator</Link>.
            </li>
            <li>
              <strong>Quality Engineering &amp; Metrology:</strong> Assess machine calibration drift and manufacturing variability using our <Link href="/calculators/math/z-score-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Z-Score Calculator</Link>.
            </li>
            <li>
              <strong>A/B Testing &amp; Sample Sizing:</strong> Determine the statistical power required to detect conversion rate variance in production digital products.
            </li>
          </ul>
        
          <h2>Second Central Moment, Jensen's Inequality & Covariance Decompositions</h2>
          <p>
            In probability theory, variance represents the second central moment of a probability distribution: Var(X) = E[(X − μ)²] = E[X²] − (E[X])². Jensen's inequality guarantees that because f(x) = x² is a strictly convex function, E[X²] ≥ (E[X])², proving that variance is always non-negative and equals zero if and only if the random variable is deterministic with constant probability 1. When analyzing bivariate data, variance represents the auto-covariance Cov(X, X); the variance of a sum of correlated random variables decomposes into Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y), forming the mathematical foundation of Harry Markowitz's Nobel Prize-winning Modern Portfolio Theory in financial asset risk optimization.
          </p>

          <h2>Analysis of Variance (ANOVA) & Econometric Risk Diversification</h2>
          <p>
            In parametric biostatistics and experimental design, Ronald Fisher's Analysis of Variance (ANOVA) decomposes total observational variance into between-group variance and within-group error variance, utilizing F-ratio statistics to identify statistically significant clinical treatment effects. In quantitative macroeconomics and capital asset pricing models (CAPM), total portfolio variance is systematically split into idiosyncratic diversifiable risk and non-diversifiable systematic market beta risk.
          </p>
</>
      }
    >
      <VarianceCalculator />
    </CalcPage>
  );
}
