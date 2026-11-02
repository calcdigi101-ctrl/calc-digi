import Calculator from "@/components/calcs/finance/apy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ApyCompoundingFrequencyImpactChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/apy-calculator";
const TITLE = "APY Calculator – Convert Interest Rate to Annual Percentage Yield | CalcDigi";
const DESCRIPTION =
  "Free APY calculator: convert nominal interest rate (APR) to Annual Percentage Yield (APY) across daily, monthly, quarterly, semi-annual, and continuous compounding. Calculate true annual dollar earnings and reverse APY to APR.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="APY Calculator"
      intro="Convert nominal interest rates into true Annual Percentage Yield (APY). Compare how compounding frequency changes real earnings and calculate reverse nominal rates from stated APY."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="APY = (1 + r / n)^n - 1"
      article={
        <>
          <h2>Direct Answer: What Is APY &amp; How Does Compounding Frequency Alter Effective Yield?</h2>
          <p>
            <strong>Annual Percentage Yield (APY)</strong> measures the real annualized rate of return earned on a deposit or investment, taking into account the effect of compounding interest throughout the year. Under the federal <em>Truth in Savings Act (TISA)</em>, all US financial institutions are legally mandated to disclose APY on consumer deposit accounts (including savings accounts, checking accounts, money market funds, and CDs) to prevent misleading rate comparisons. Because compounding generates interest on top of previously credited interest, the APY is always higher than or equal to the stated nominal interest rate (APR).
          </p>

          <Formula>APY = (1 + r ÷ n)^n − 1</Formula>
          <p>
            Where:
            <br />• <strong>APY</strong> = Effective Annual Percentage Yield (decimal format)
            <br />• <strong>r</strong> = Nominal annual stated interest rate (decimal format, e.g. 0.05 for 5.00%)
            <br />• <strong>n</strong> = Compounding frequency per calendar year (365 for daily, 12 for monthly, 4 for quarterly)
          </p>

          <p>
            In the theoretical limit of infinite compounding intervals, known as <strong>continuous compounding</strong>, the formula converges using Euler&rsquo;s mathematical constant <em>e</em>:
          </p>
          <Formula>APY_continuous = e^r − 1</Formula>

          <ApyCompoundingFrequencyImpactChart />

          <h2>Nominal APR to Effective APY Conversion Matrix</h2>
          <p>
            The table below illustrates the exact mathematical yield lift achieved as compounding frequency increases across typical consumer banking interest rate tiers:
          </p>

          <DataTable
            head={["Nominal Rate (APR)", "Annual (n=1)", "Quarterly (n=4)", "Monthly (n=12)", "Daily (n=365)", "Continuous (Limit)"]}
            rows={[
              ["3.00%", "3.000%", "3.034%", "3.042%", "3.045%", "3.045%"],
              ["4.00%", "4.000%", "4.060%", "4.074%", "4.081%", "4.081%"],
              ["5.00%", "5.000%", "5.095%", "5.116%", "5.127%", "5.127%"],
              ["6.00%", "6.000%", "6.136%", "6.168%", "6.183%", "6.184%"],
              ["7.00%", "7.000%", "7.186%", "7.229%", "7.250%", "7.251%"],
            ]}
          />

          <h2>Statutory Differences: APY vs. APR Explained</h2>
          <ul>
            <li>
              <strong>Truth in Savings Act (TISA) vs. Truth in Lending Act (TILA):</strong> TISA governs bank deposits and requires APY disclosure (so consumers see how much they <em>earn</em> with compounding). TILA governs debt and loans and requires APR disclosure (which includes upfront lender fees, points, and administrative costs).
            </li>
            <li>
              <strong>Asymmetry for Borrowers vs. Savers:</strong> When opening a deposit account, look for the <em>highest APY</em>. When borrowing a loan or carrying credit card balances, look for the <em>lowest APR</em>, because compounding on revolving debt accelerates total financial interest costs against the borrower.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Savings &amp; Yield Compounding Solvers</h3>
            <p>
              Maximizing effective yields is essential to capital preservation. Compare fixed-term deposit rates with our <a href="/calculators/finance/cd-calculator">CD Calculator</a>, model long-term portfolio accumulation via the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, track liquid cash milestones using the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and evaluate borrowing APR with the <a href="/calculators/finance/apr-calculator">APR Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How do I calculate nominal APR back from a stated APY?",
          a: "To solve for nominal rate r given APY, use the algebraic inversion formula: r = n * [(1 + APY)^(1/n) - 1]. For example, a 5.00% APY compounded monthly corresponds to an underlying nominal APR of 4.889%.",
        },
        {
          q: "Why do banks compound daily but pay interest monthly?",
          a: "Most US commercial institutions calculate accrued interest on your end-of-day ledger balance every 24 hours (daily compounding) to ensure fairness with mid-cycle deposits and withdrawals, but deposit the cumulative monthly total as a single statement credit at month-end.",
        },
        {
          q: "Does compounding frequency make a huge financial difference?",
          a: "While daily compounding is mathematically superior to annual compounding, the difference between monthly compounding (5.116% APY on 5%) and daily compounding (5.127% APY) is just 1.1 basis points ($1.10 per $10,000 per year). The base nominal interest rate is far more influential than the compounding interval.",
        },
        {
          q: "Can the APY on a savings account drop without notice?",
          a: "Yes. High-Yield Savings Accounts (HYSAs) and Money Market Accounts are variable-rate deposit products. Financial institutions can raise or lower the APY at any time based on benchmark Federal Reserve federal funds rate adjustments.",
        },
      ]}
      related={[
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/investment-calculator", icon: "💼", name: "Investment" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
