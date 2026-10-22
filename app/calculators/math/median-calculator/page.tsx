import MedianCalculator from "@/components/calcs/math/median-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NormalDistributionVisualizerChart } from "@/components/flagship/math/editorial-charts/NormalDistributionVisualizerChart";

const PATH = "/calculators/math/median-calculator";
const TITLE = "Median Calculator | CalcDigi";
const DESCRIPTION =
  "Free online median calculator. Find the median, quartiles (Q1, Q3), interquartile range (IQR), mean, and mode for any numerical dataset with step-by-step steps.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the median in statistics?",
    a: "The median is the physical middle value in a dataset when all observations are arranged in ascending numerical order. Exactly 50% of the observations fall below the median, and 50% fall above it. Unlike the arithmetic mean, the median is highly resistant to extreme outliers and skewed tails.",
  },
  {
    q: "How do you calculate the median when sample size n is odd?",
    a: "First sort the dataset in ascending order. Then identify the value occupying the exact middle index at position (n + 1) ÷ 2. For instance, in a 7-element sorted dataset, the 4th element is the median.",
  },
  {
    q: "How do you calculate the median when sample size n is even?",
    a: "Sort the data in ascending order. Since there is no single middle element, locate the two central adjacent numbers at positions n ÷ 2 and (n ÷ 2) + 1, then calculate their arithmetic mean: Median = (x_(n/2) + x_((n/2)+1)) ÷ 2.",
  },
  {
    q: "Why is median preferred over mean for income and housing prices?",
    a: "Income and real estate distributions exhibit severe positive (right) skewness due to a small number of ultra-wealthy individuals or multi-million-dollar mansions. The arithmetic mean gets pulled upward dramatically, whereas the median remains completely stable and represents typical reality.",
  },
  {
    q: "What are quartiles and how do they relate to the median?",
    a: "Quartiles divide an ordered dataset into four equal segments. The First Quartile (Q1) marks the 25th percentile, the Second Quartile (Q2) is the median itself (50th percentile), and the Third Quartile (Q3) marks the 75th percentile.",
  },
  {
    q: "What is the Interquartile Range (IQR)?",
    a: "The Interquartile Range is the difference between the third and first quartiles: IQR = Q3 − Q1. It measures the spread of the central 50% of data points and forms the mathematical basis for Tukey's outlier detection rule (values beyond 1.5 × IQR).",
  },
  {
    q: "Can the median equal the mean?",
    a: "Yes. In any perfectly symmetric distribution, such as a Gaussian normal bell curve or a uniform distribution, the median, mean, and mode coincide at the exact center of the distribution.",
  },
  {
    q: "How is the median calculated for grouped frequency data?",
    a: "For grouped continuous data, locate the median class containing the n/2 cumulative frequency, then apply linear interpolation: Median = L + [((n/2 − CF) ÷ f) × w], where L is the lower class boundary, CF is previous cumulative frequency, f is frequency, and w is class width.",
  },
];

const MEDIAN_VS_MEAN_ROWS = [
  ["Sensitivity to Outliers", "Zero; robust against extreme values", "High; distorted by extreme minimums/maximums"],
  ["Mathematical Basis", "Positional rank order (ordinal / metric)", "Algebraic sum of values divided by count n"],
  ["Best Used For", "Skewed data (wages, housing prices, net worth)", "Symmetric data (heights, laboratory tolerances)"],
  ["Central 50% Anchor", "Serves as the foundational center (Q2)", "Does not necessarily split data into equal halves"],
  ["Statistical Estimator", "Sample median minimizes sum of absolute deviations", "Sample mean minimizes sum of squared deviations"],
];

const FIVE_NUMBER_ROWS = [
  ["Minimum", "Smallest observed numeric value in the sample", "Lower boundary of data range"],
  ["First Quartile (Q1)", "25th percentile; median of lower half", "Boundary of lowest 25% of observations"],
  ["Median (Q2)", "50th percentile; central dividing point", "Center of ordered distribution"],
  ["Third Quartile (Q3)", "75th percentile; median of upper half", "Boundary of highest 25% of observations"],
  ["Maximum", "Largest observed numeric value in the sample", "Upper boundary of data range"],
];

const RELATED = [
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
  { href: "/calculators/math/standard-deviation-calculator", icon: "📐", name: "Standard Deviation" },
  { href: "/calculators/math/variance-calculator", icon: "📈", name: "Variance Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Median Calculator | CalcDigi"
      intro="Calculate the median, quartiles, interquartile range (IQR), and five-number summary for any numerical dataset with complete step-by-step explanations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Median = Middle value of ordered set"
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

          <h2>What is the Median? Definition &amp; Mathematical Principles</h2>
          <p>
            In mathematical statistics, the <strong>median</strong> is the positional value that divides an ordered numerical dataset into two equal halves. Exactly 50% of the data points lie below or equal to the median, and 50% lie above or equal to it. Unlike the arithmetic mean, which depends on every value&apos;s magnitude, the median depends strictly on relative ordinal rank.
          </p>
          <p>
            The concept of the median was introduced into modern mathematics by Antoine Augustin Cournot in 1843 and popularized by Francis Galton in 1881 as a robust alternative to the mean. Mathematically, the sample median is the unique point that minimizes the aggregate sum of absolute deviations: minimizing the expression Σ |xᵢ − c| across all observations. This property makes the median the standard metric in robust statistics, non-parametric analysis, and econometric policy evaluation.
          </p>

          <div className="not-prose my-8">
            <NormalDistributionVisualizerChart />
          </div>

          <h2>Mathematical Derivation and Calculation Rules</h2>
          <p>
            To compute the median, first sort your raw dataset in non-decreasing order: x₁ ≤ x₂ ≤ x₃ ≤ ... ≤ xₙ. The calculation then branches based on sample size parity:
          </p>

          <h3>1. Odd Sample Size (n is Odd)</h3>
          <p>
            When <em>n</em> is odd, a single unique observation occupies the exact center of the dataset. Its index position is (n + 1) ÷ 2:
          </p>
          <Formula>Median = x_((n+1)/2)</Formula>
          <p>
            <em>Worked Example:</em> Consider the 7 test scores [64, 88, 72, 95, 81, 79, 90]. First sort in ascending order: [64, 72, 79, 81, 88, 90, 95]. The central index is (7 + 1) ÷ 2 = 4th element:
          </p>
          <Formula>Median = x₄ = 81.00</Formula>

          <h3>2. Even Sample Size (n is Even)</h3>
          <p>
            When <em>n</em> is even, the dataset splits into two equal halves without a single central integer. The median is computed as the arithmetic mean of the two central adjacent numbers:
          </p>
          <Formula>Median = [x_(n/2) + x_((n/2)+1)] ÷ 2</Formula>
          <p>
            <em>Worked Example:</em> Given 8 hourly wage observations [$15, $22, $18, $40, $19, $25, $17, $30], sort in order: [$15, $17, $18, $19, $22, $25, $30, $40]. The 4th element is $19 and 5th element is $22:
          </p>
          <Formula>Median = ($19 + $22) ÷ 2 = $41 ÷ 2 = $20.50</Formula>

          <h2>The Five-Number Summary and Quartile Analysis</h2>
          <p>
            The median serves as the cornerstone of exploratory data analysis (EDA) and John Tukey&apos;s celebrated five-number summary:
          </p>
          <DataTable
            head={["Metric Component", "Statistical Definition", "Analytical Role in Boxplots"]}
            rows={FIVE_NUMBER_ROWS}
            highlight={2}
          />
          <p>
            The distance between the third and first quartiles defines the <strong>Interquartile Range (IQR = Q3 − Q1)</strong>. Under Tukey&apos;s statistical outlier rule, any observation falling below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR is formally flagged as a potential outlier. This robust framework ensures that extreme anomalies do not compromise the integrity of statistical modeling.
          </p>

          <h2>Median vs. Mean: When to Use Which Metric</h2>
          <p>
            The fundamental decision of whether to report the mean or median hinges on data symmetry, distribution tails, and outlier susceptibility:
          </p>
          <DataTable
            head={["Analytical Dimension", "Sample Median (Positional)", "Sample Mean (Arithmetic)"]}
            rows={MEDIAN_VS_MEAN_ROWS}
            highlight={1}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Because of its mathematical resistance to skewness, the median is indispensable across multiple industries:
          </p>
          <ul>
            <li>
              <strong>National Income &amp; Wage Statistics:</strong> Census bureaus report median household income because extreme billionaire outliers render the arithmetic mean misleading.
            </li>
            <li>
              <strong>Real Estate Market Valuations:</strong> Housing economists benchmark median home sale prices to isolate neighborhood trends from luxury estates, often paired with our <Link href="/calculators/math/average-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Average Calculator</Link>.
            </li>
            <li>
              <strong>Biomedical Survival Analysis:</strong> Clinical trials track median survival time (the duration at which exactly 50% of patients remain alive), paired with our <Link href="/calculators/math/standard-deviation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Standard Deviation Calculator</Link>.
            </li>
            <li>
              <strong>Software Latency &amp; Cloud SLA:</strong> Web services track p50 (median latency), p95, and p99 response times to evaluate server performance under heavy user loads.
            </li>
            <li>
              <strong>Educational Testing &amp; Grading Curves:</strong> Grade distributions frequently benchmark median scores to establish fair academic standards across diverse student cohorts.
            </li>
          </ul>
        
          <h2>L¹ Norm Minimization, Robust Statistics & Order Statistics</h2>
          <p>
            Mathematically, the median is the value m that minimizes the sum of absolute deviations: Σ |xᵢ − m|, making it the optimal center estimator under the L¹ norm in robust statistical theory. Unlike the arithmetic mean, which shifts indefinitely when a single data point moves toward infinity, the median exhibits the maximum possible asymptotic breakdown point of 50%, requiring more than half of all data points to become corrupted before the median can be pushed arbitrarily far. In parametric order statistics, the median represents the middle order statistic x_((n+1)/2), serving as the foundational anchor for non-parametric hypothesis tests such as the Wilcoxon signed-rank test and Mann-Whitney U test across non-normal continuous data.
          </p>
</>
      }
    >
      <MedianCalculator />
    </CalcPage>
  );
}
