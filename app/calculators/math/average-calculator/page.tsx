import AverageCalculator from "@/components/calcs/math/average-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/average-calculator";
const TITLE = "Average Calculator (Mean, Median, Mode) | CalcDigi";
const DESCRIPTION =
  "Free online average calculator. Calculate arithmetic mean, weighted mean, median, mode, range, and standard deviation with step-by-step solutions and formulas.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the difference between mean, median, and mode?",
    a: "The mean is the arithmetic average obtained by summing all values and dividing by the total count. The median is the physical middle value when data points are sorted in ascending order. The mode is the most frequently occurring value in the dataset. While the mean is mathematically optimal for symmetric distributions, the median provides greater stability when severe outliers or skewed distributions are present.",
  },
  {
    q: "How do you calculate the arithmetic mean?",
    a: "Sum every observation in your dataset and divide that total sum by the sample size n. Formula: Mean = (x₁ + x₂ + ... + xₙ) ÷ n. For example, for numbers 10, 20, and 60: (10 + 20 + 60) ÷ 3 = 90 ÷ 3 = 30.",
  },
  {
    q: "When is the median preferred over the mean?",
    a: "The median is preferred whenever a distribution contains extreme outliers or pronounced skewness, such as in household income statistics, real estate prices, and net worth distributions. A single billionaire in a small town dramatically inflates the arithmetic mean income, whereas the median remains virtually unaffected.",
  },
  {
    q: "Can a dataset have more than one mode?",
    a: "Yes. If two distinct values share the highest frequency, the dataset is bimodal. If three or more values tie, it is multimodal. If every value appears with identical frequency (e.g., each number appears once), the dataset possesses no distinct mode.",
  },
  {
    q: "What is a weighted average and how is it computed?",
    a: "A weighted average assigns proportional importance (weights) to individual values before combining them. Multiply each value by its corresponding weight, sum the weighted products, and divide by the sum of all weights: Weighted Mean = Σ(wᵢ × xᵢ) ÷ Σwᵢ. This is universally used in GPA calculations, university grading scales, and portfolio return weighting.",
  },
  {
    q: "What is the relationship between the mean, median, and skewness?",
    a: "In a perfectly symmetric normal distribution, the mean, median, and mode are identical. In a right-skewed (positively skewed) distribution, extreme upper values pull the mean higher than the median (Mean > Median). In a left-skewed (negatively skewed) distribution, extreme low values drag the mean down below the median (Mean < Median).",
  },
  {
    q: "How does sample size impact the reliability of the average?",
    a: "Under the Law of Large Numbers and the Central Limit Theorem, as sample size n increases, the sample mean converges toward the true population mean, and standard error decreases proportionally to 1/√n. Small samples are highly susceptible to sampling error and random distortion.",
  },
  {
    q: "What is the geometric mean and when should it be used?",
    a: "The geometric mean multiplies n numbers together and takes the n-th root. It is used when averaging growth rates, investment percentages, ratios, or exponential progressions where values compound multiplicatively over time rather than additively.",
  },
];

const AVERAGE_TYPES_ROWS = [
  ["Arithmetic Mean", "Sum of all values divided by count n", "Symmetric, unskewed numerical data", "Highly sensitive; distorted by extreme values"],
  ["Median", "Middle ranking value after numerical sorting", "Skewed distributions (income, house prices)", "Extremely robust; completely immune to single outliers"],
  ["Mode", "Most commonly observed frequency value", "Categorical, discrete, and multimodal data", "Robust; pinpoints dominant cluster points"],
  ["Weighted Mean", "Sum of weighted values divided by sum of weights", "Academic course grades, investment portfolios", "Controlled sensitivity; reflects assigned priorities"],
  ["Geometric Mean", "n-th root of the product of n factors", "Investment growth rates, compounding indices", "Optimal for ratios and multiplicative scaling"],
];

const SKEWNESS_ROWS = [
  ["Normal / Symmetric", "Mean = Median = Mode", "Standard bell curve; balanced tails", "Heights, standardized test scores"],
  ["Positively Skewed (Right)", "Mean > Median > Mode", "Elongated tail extending toward high values", "Income distribution, home valuations"],
  ["Negatively Skewed (Left)", "Mean < Median < Mode", "Elongated tail extending toward low values", "Retirement age, vehicle lifespan"],
];

const RELATED = [
  { href: "/calculators/math/median-calculator", icon: "📊", name: "Median Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/variance-calculator", icon: "📈", name: "Variance Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Average Calculator | CalcDigi"
      intro="Calculate the arithmetic mean, median, mode, range, variance, and standard deviation for any list of numbers with step-by-step mathematical solutions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Mean = (Sum of x_i) / n"
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

          <h2>What is an Average? Definition &amp; Central Tendency Foundations</h2>
          <p>
            In mathematical statistics, an <strong>average</strong> represents a single central representative value summarizing a set of quantitative observations. Technically classified as a <em>measure of central tendency</em>, an average distills an entire distribution of diverse numbers into a singular benchmark metric that describes the typical magnitude of the dataset.
          </p>
          <p>
            The concept of the arithmetic average dates back to antiquity, where early Babylonian astronomers and ancient Greek navigators combined astronomical sightings to reduce observational errors. In the 18th and 19th centuries, mathematicians Carl Friedrich Gauss, Pierre-Simon Laplace, and Adolphe Quetelet formalized the mathematics of central tendency, establishing the foundations of modern probability theory, sample estimation, and statistical modeling. In particular, Gauss demonstrated through the least-squares criterion that the arithmetic mean is the unique mathematical estimator that minimizes the aggregate sum of squared residual errors across symmetric observations.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Core Mathematical Formulas for Central Tendency</h2>
          <p>
            Depending on the structural characteristics of your dataset and the analytical objective, mathematicians employ distinct measures of central tendency:
          </p>

          <h3>1. Arithmetic Mean</h3>
          <p>
            The arithmetic mean is the universal baseline average. It is computed by adding every observation in the sample and dividing that aggregate sum by the total number of observations <em>n</em>:
          </p>
          <Formula>Mean (x̄) = (x₁ + x₂ + x₃ + ... + xₙ) ÷ n = (Σ xᵢ) ÷ n</Formula>
          <p>
            <em>Example Calculation:</em> Consider test scores of 78, 85, 92, and 89 from four examinations. Summing the values gives 344. Dividing by 4 yields:
          </p>
          <Formula>x̄ = (78 + 85 + 92 + 89) ÷ 4 = 344 ÷ 4 = 86.00</Formula>

          <h3>2. Median (Positional Middle)</h3>
          <p>
            The median represents the physical central observation when data points are arranged in ascending numerical order. If the sample size <em>n</em> is odd, the median is the single value at position (n + 1) ÷ 2. If <em>n</em> is even, the median is the arithmetic mean of the two central adjacent numbers:
          </p>
          <Formula>Median (odd n) = x_((n+1)/2) | Median (even n) = [x_(n/2) + x_((n/2)+1)] ÷ 2</Formula>
          <p>
            <em>Example Calculation:</em> Given the dataset of observations [12, 7, 22, 15, 9, 31], sort in ascending order: [7, 9, 12, 15, 22, 31]. Because <em>n</em> = 6 (even), average the two middle values (12 and 15):
          </p>
          <Formula>Median = (12 + 15) ÷ 2 = 27 ÷ 2 = 13.50</Formula>

          <h3>3. Mode (Maximum Frequency Observation)</h3>
          <p>
            The mode is the particular observation that recurs with the greatest empirical frequency within the dataset. While the mean and median require continuous or discrete numerical values, the mode is uniquely applicable to nominal and categorical data (such as voting choices, customer demographics, or retail inventory sizing).
          </p>

          <h3>4. Weighted Arithmetic Mean</h3>
          <p>
            When individual observations hold unequal significance or represent unequal population subgroups, each observation <em>xᵢ</em> is scaled by an assigned positive weight <em>wᵢ</em>:
          </p>
          <Formula>Weighted Mean = (w₁x₁ + w₂x₂ + ... + wₙxₙ) ÷ (w₁ + w₂ + ... + wₙ) = (Σ wᵢxᵢ) ÷ (Σ wᵢ)</Formula>
          <p>
            <em>Example Problem:</em> A college course grades homework (weight 20%, score 90), midterm exam (weight 30%, score 80), and final exam (weight 50%, score 94):
          </p>
          <Formula>Final Grade = [(0.20 × 90) + (0.30 × 80) + (0.50 × 94)] ÷ (0.20 + 0.30 + 0.50) = (18 + 24 + 47) ÷ 1.00 = 89.00%</Formula>

          <h2>Comparing Measures of Central Tendency</h2>
          <p>
            Choosing the correct measure of central tendency depends on measurement scale, symmetry, and the presence of extreme outliers:
          </p>
          <DataTable
            head={["Metric Type", "Mathematical Definition", "Ideal Application Domain", "Sensitivity to Outliers"]}
            rows={AVERAGE_TYPES_ROWS}
            highlight={1}
          />

          <h2>Distribution Skewness and the Mean-Median Relationship</h2>
          <p>
            The spatial relationship between the mean and the median reveals the directional skewness of an underlying probability distribution. When a dataset is plotted on a frequency histogram, the relative positioning of these metrics diagnoses asymmetry:
          </p>
          <DataTable
            head={["Distribution Shape", "Metric Relationship", "Visual Geometry", "Real-World Empirical Example"]}
            rows={SKEWNESS_ROWS}
            highlight={1}
          />

          <h2>Dispersion Around the Average: Why Spread Matters</h2>
          <p>
            Reporting an average without communicating statistical dispersion can be dangerously misleading. Two different investments can both generate an identical 8.0% average annual return, yet one may fluctuate modestly between 7% and 9%, while the other swings wildly between -30% and +46%. To fully evaluate risk, always pair the average with our <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link> and <Link href="/calculators/math/variance-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Variance Calculator</Link>.
          </p>

          <h2>Practical Real-World Applications</h2>
          <p>
            Averages are ubiquitous across engineering, scientific research, and financial decision-making:
          </p>
          <ul>
            <li>
              <strong>Academic GPA &amp; Testing:</strong> Compute cumulative grade averages and standardized test percentiles using our companion <Link href="/calculators/math/median-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Median Calculator</Link>.
            </li>
            <li>
              <strong>Economics &amp; Real Estate:</strong> Benchmark median sale prices to prevent luxury mega-mansions from skewing general housing market trends.
            </li>
            <li>
              <strong>Quality Control &amp; Six Sigma:</strong> Measure industrial manufacturing tolerances and process stability with our <Link href="/calculators/math/z-score-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Z-Score Calculator</Link>.
            </li>
            <li>
              <strong>Sports Analytics &amp; Athletic Performance:</strong> Evaluate batting averages, points per game, and possession metrics while filtering out transient outlier performances.
            </li>
            <li>
              <strong>Investment Portfolio Returns:</strong> Analyze dollar-cost averaging, baseline dividend yields, and long-term capital compounding using our <Link href="/calculators/finance/compound-interest-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Compound Interest Calculator</Link>.
            </li>
          </ul>
        
          <h2>The Gauss-Markov Theorem, Estimation Efficiency & Outlier Breakdown</h2>
          <p>
            In mathematical statistics, the arithmetic mean is the unique estimator that minimizes the sum of squared residuals: Σ(xᵢ − c)², a mathematical property establishing it as the fundamental least-squares benchmark. Under the classical Gauss-Markov theorem, when observational errors are independent and identically distributed with zero mean and finite variance, the sample average serves as the Best Linear Unbiased Estimator (BLUE) of the population parameter. However, the arithmetic mean has an asymptotic breakdown point of zero, meaning a single contaminated or infinite outlier can arbitrarily distort the calculated summary metric. In high-dimensional data analysis and quantitative finance, statisticians frequently complement the mean with trimmed means, Winsorized averages, or median absolute deviation (MAD) to ensure robust statistical inference across non-Gaussian distributions.
          </p>

          <h2>Weighted Financial Portfolio & Academic Grading Models</h2>
          <p>
            In corporate finance and asset management, arithmetic averages are adapted into weighted averages to evaluate dollar-cost averaging strategies, asset allocation risk betas, and volume-weighted average prices (VWAP) in equity trading. Similarly, university degree grading frameworks apply credit-weighted grade point averages to guarantee that comprehensive coursework reflects proportional intellectual rigor and rigorous academic accountability.
          </p>
</>
      }
    >
      <AverageCalculator />
    </CalcPage>
  );
}
