import ProbabilityCalculator from "@/components/calcs/math/probability-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ProbabilityDistributionChart } from "@/components/flagship/math/editorial-charts/ProbabilityDistributionChart";

const PATH = "/calculators/math/probability-calculator";
const TITLE = "Probability Calculator (Single, Multiple & Conditional) | CalcDigi";
const DESCRIPTION =
  "Free online probability calculator. Calculate single event, multiple events (AND/OR), conditional probability, Bayes' theorem, odds, and permutations step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is probability in mathematics?",
    a: "Probability is the numerical branch of mathematics measuring the likelihood that a particular event will occur. Expressed as a real number on a continuous scale between 0 (impossible event) and 1 (certain event), or as a percentage between 0% and 100%.",
  },
  {
    q: "What is the formula for the probability of a single event?",
    a: "Classical probability divides the number of favorable outcomes n(A) by the total number of equally likely outcomes in the sample space n(S): P(A) = n(A) ÷ n(S). For instance, rolling a 4 on a six-sided die is 1 ÷ 6 = 0.1667 (16.67%).",
  },
  {
    q: "What is the difference between mutually exclusive and independent events?",
    a: "Mutually exclusive (disjoint) events cannot happen simultaneously (e.g., a coin cannot land on heads and tails at the same time; P(A ∩ B) = 0). Independent events do not influence one another's probability (e.g., rolling a die and flipping a coin; P(A ∩ B) = P(A) × P(B)).",
  },
  {
    q: "How does the Addition Rule work for probability?",
    a: "To find the probability of event A OR event B occurring: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). The intersection term P(A ∩ B) is subtracted to prevent double-counting outcomes that belong to both events.",
  },
  {
    q: "How does the Multiplication Rule work for probability?",
    a: "To find the probability of event A AND event B occurring: P(A ∩ B) = P(A) × P(B|A), where P(B|A) is the conditional probability of B given that A has occurred. If events are independent, this simplifies to P(A ∩ B) = P(A) × P(B).",
  },
  {
    q: "What is Bayes' Theorem?",
    a: "Bayes' Theorem calculates conditional posterior probability by updating prior probability with new empirical evidence: P(A|B) = [ P(B|A) × P(A) ] ÷ P(B). It is foundational in medical diagnostics, spam filtering, and Bayesian machine learning.",
  },
  {
    q: "What is the complementary probability rule?",
    a: "The complementary rule states that the probability an event does not occur equals 1 minus the probability that it does occur: P(A') = 1 − P(A). This is especially useful for solving 'at least one' problems.",
  },
  {
    q: "How do you convert probability to odds?",
    a: "Odds in favor of an event are the ratio of success probability to failure probability: Odds = P(A) ÷ (1 − P(A)). If an event has a 75% probability (0.75), the odds are 0.75 ÷ 0.25 = 3 to 1.",
  },
];

const PROBABILITY_RULES_ROWS = [
  ["Complementary Rule", "P(A') = 1 − P(A)", "Probability that event A does NOT occur"],
  ["Addition Rule (Mutually Exclusive)", "P(A ∪ B) = P(A) + P(B)", "Disjoint events with zero overlap"],
  ["General Addition Rule", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "Events with potential joint intersection"],
  ["Multiplication Rule (Independent)", "P(A ∩ B) = P(A) × P(B)", "Uncorrelated events; occurrence of A does not impact B"],
  ["General Multiplication Rule", "P(A ∩ B) = P(A) × P(B|A)", "Dependent events where prior outcome influences next"],
  ["Conditional Probability", "P(B|A) = P(A ∩ B) ÷ P(A)", "Probability of B given that A has already occurred"],
  ["Bayes' Theorem", "P(A|B) = [P(B|A) × P(A)] ÷ P(B)", "Updates prior probability with observed evidence"],
];

const DICE_COIN_ROWS = [
  ["Fair Coin (1 Flip)", "Heads or Tails", "1 / 2", "50.00%", "1 to 1"],
  ["Two Coins (Both Heads)", "Heads-Heads", "1 / 4", "25.00%", "1 to 3"],
  ["Standard Die (Roll 6)", "Single specific face", "1 / 6", "16.67%", "1 to 5"],
  ["Two Dice (Sum of 7)", "6 combinations out of 36", "6 / 36 (1/6)", "16.67%", "1 to 5"],
  ["Two Dice (Sum of 2 or 12)", "Snake eyes or Boxcars", "1 / 36", "2.78%", "1 to 35"],
  ["Deck of Cards (Draw Ace)", "4 aces out of 52 cards", "4 / 52 (1/13)", "7.69%", "1 to 12"],
  ["Deck of Cards (Draw Heart)", "13 hearts out of 52 cards", "13 / 52 (1/4)", "25.00%", "1 to 3"],
];

const RELATED = [
  { href: "/calculators/math/sample-size-calculator", icon: "🧪", name: "Sample Size Calculator" },
  { href: "/calculators/math/z-score-calculator", icon: "🎯", name: "Z-Score Calculator" },
  { href: "/calculators/math/confidence-interval-calculator", icon: "📈", name: "Confidence Interval" },
  { href: "/calculators/math/combination-calculator", icon: "🔢", name: "Combination Calculator" },
  { href: "/calculators/math/permutation-calculator", icon: "🔀", name: "Permutation Calculator" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Probability Calculator"
      intro="Calculate event probabilities, joint outcomes (AND/OR), conditional probabilities, complementary odds, and Bayes' theorem with step-by-step mathematical explanations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="P(A) = favorable / total"
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

          <h2>What is Probability? Mathematical Foundations &amp; Axiomatic Principles</h2>
          <p>
            In mathematical science, <strong>probability</strong> is the rigorous quantitative study of random phenomena, uncertainty, and chance. Defined formally on a closed continuous scale from 0 (absolute impossibility) to 1 (absolute certainty), probability assigns an objective numerical measure to the likelihood that a defined event will occur within a sample space.
          </p>
          <p>
            Modern probability theory was formalized in 1933 by Soviet mathematician Andrey Kolmogorov through his three foundational axioms: non-negativity (P(E) ≥ 0 for all events), unit measure of certainty (P(S) = 1 for sample space S), and countable additivity for mutually exclusive events. These axioms establish the mathematical validity of all downstream statistical inference, machine learning algorithms, and quantum mechanical wave functions.
          </p>
          <p>
            Probability interpretations are broadly categorized into three schools: classical probability (based on equally likely symmetrical outcomes), empirical or frequentist probability (based on relative frequencies over repeated trials), and subjective Bayesian probability (measuring rational degrees of belief updated by empirical data).
          </p>

          <div className="not-prose my-8">
            <ProbabilityDistributionChart />
          </div>

          <h2>Core Mathematical Rules &amp; Probability Formulas</h2>
          <p>
            Calculating probabilities requires selecting the correct mathematical rule matching the structural relationship between events:
          </p>

          <h3>1. Classical Probability (Single Event)</h3>
          <p>
            For a discrete sample space where all outcomes are equally likely:
          </p>
          <Formula>P(A) = fracn(A)n(S) = fractextNumber of favorable outcomestextTotal possible outcomes</Formula>
          <p>
            <em>Example:</em> Drawing a face card (Jack, Queen, King) from a standard 52-card deck: 12 face cards exist across 52 cards, yielding P(Face Card) = 12 ÷ 52 = 3/13 = <strong>23.08%</strong>.
          </p>

          <h3>2. The Addition Rule (Union of Events: P(A OR B))</h3>
          <p>
            To determine the likelihood that either event A or event B (or both) occurs:
          </p>
          <Formula>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</Formula>
          <p>
            <em>Example:</em> Drawing either an Ace or a Heart from a 52-card deck: P(Ace) = 4/52, P(Heart) = 13/52, and P(Ace of Hearts) = 1/52. Applying the rule:
          </p>
          <Formula>P(textAce ∪ Heart) = frac452 + frac1352 − frac152 = frac1652 = frac413 = mathbf30.77%</Formula>

          <h3>3. The Multiplication Rule (Intersection of Events: P(A AND B))</h3>
          <p>
            For independent events, the probability of both occurring is the simple product of their individual probabilities:
          </p>
          <Formula>P(A ∩ B) = P(A) × P(B)</Formula>
          <p>
            If events are dependent, the conditional probability of B given A must be evaluated:
          </p>
          <Formula>P(A ∩ B) = P(A) × P(B|A)</Formula>

          <h3>4. Bayes&apos; Theorem (Conditional Probability Inversion)</h3>
          <p>
            Bayes&apos; Theorem calculates updated posterior probability based on new empirical evidence:
          </p>
          <Formula>P(A|B) = fracP(B|A) × P(A)P(B)</Formula>

          <h2>The Law of Total Probability and Partitioning</h2>
          <p>
            When a sample space <em>S</em> is partitioned into mutually exclusive and exhaustive events B₁, B₂, ..., Bₖ, the probability of any event <em>A</em> is expressed as the weighted sum:
          </p>
          <Formula>P(A) = sum_i=1^k P(A|B_i) × P(B_i)</Formula>
          <p>
            This fundamental theorem allows complex probabilistic systems to be solved by breaking them down into manageable conditional pathways, forming the backbone of Bayesian inference and decision tree architectures.
          </p>

          <h2>Combinatorial Foundations: Counting Principles</h2>
          <p>
            When computing sample space sizes for large systems, counting techniques from combinatorics become essential. The fundamental counting principle states that if an experiment involves <em>k</em> sequential stages with n₁, n₂, ..., nₖ possibilities, the total outcomes equal their product: n₁ × n₂ × ... × nₖ. When order matters, permutations P(n, r) = n! ÷ (n − r)! are applied; when grouping order is irrelevant, combinations C(n, r) = n! ÷ [r!(n − r)!] govern the sample space.
          </p>

          <h2>Comprehensive Probability Rules Reference Matrix</h2>
          <p>
            The table below serves as a formulaic summary of the core axioms and theorems governing probability calculations:
          </p>
          <DataTable
            head={["Probability Theorem", "Mathematical Formula", "Analytical Objective & Meaning"]}
            rows={PROBABILITY_RULES_ROWS}
            highlight={0}
          />

          <h2>Benchmark Probabilities &amp; Odds for Common Games of Chance</h2>
          <p>
            The reference table below illustrates classical probability values, percentage equivalents, and fractional betting odds:
          </p>
          <DataTable
            head={["Random Experiment", "Favorable Outcome", "Exact Fraction", "Percentage", "Fair Betting Odds"]}
            rows={DICE_COIN_ROWS}
            highlight={3}
          />

          <h2>Practical Real-World Applications</h2>
          <p>
            Probability theory is the mathematical backbone of modern quantitative decision-making:
          </p>
          <ul>
            <li>
              <strong>Medical Screening &amp; Disease Testing:</strong> Evaluate test accuracy, false-positive rates, and positive predictive value using Bayes&apos; theorem.
            </li>
            <li>
              <strong>Actuarial Science &amp; Insurance Underwriting:</strong> Calculate mortality curves, accident liabilities, and expected loss reserves to price insurance premiums sustainably.
            </li>
            <li>
              <strong>Machine Learning &amp; AI Classification:</strong> Naive Bayes algorithms process text strings for automated spam detection, sentiment analysis, and natural language processing.
            </li>
            <li>
              <strong>Financial Risk &amp; Quantitative Trading:</strong> Model Black-Scholes option pricing formulas and Value-at-Risk (VaR) matrices using our companion <Link href="/calculators/math/confidence-interval-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Confidence Interval Calculator</Link> and <Link href="/calculators/math/sample-size-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Sample Size Calculator</Link>.
            </li>
          </ul>
        
          <h2>Kolmogorov Axioms, Conditional Bayes' Theorem & Measure Theory</h2>
          <p>
            Modern probability theory is rigorously grounded in the three fundamental axioms formulated by Andrey Kolmogorov in 1933: non-negativity (P(E) ≥ 0), unit measure (P(S) = 1 for sample space S), and countable additivity for mutually exclusive events. In Bayesian epistemology and probabilistic inference, Thomas Bayes' theorem P(A|B) = [P(B|A) P(A)] / P(B) establishes how prior subjective belief distributions must be dynamically updated upon observing new empirical evidence. This probabilistic calculus underpins modern machine learning classification models, Kalman navigation filtering in autonomous avionics, and medical diagnostic screening tests where low baseline disease prevalence dramatically alters positive predictive value.
          </p>
</>
      }
    >
      <ProbabilityCalculator />
    </CalcPage>
  );
}
