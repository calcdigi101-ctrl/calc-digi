import Calculator from "@/components/calcs/finance/savings-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SavingsGoalMilestoneTimelineChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/savings-calculator";
const TITLE = "Savings Calculator – Monthly Goal Planner & Compound Interest Growth | CalcDigi";
const DESCRIPTION =
  "Free savings calculator: determine exact monthly contributions needed to reach your savings target, or model future balance growth with high-yield APY, compound interest, and automated deposit timelines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Savings Calculator"
      intro="Determine exactly how much you must deposit each month to hit your financial milestone—or project how fast your regular cash contributions multiply with high-yield interest."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="PMT = (FV - PV*(1 + i)^n) * i / ((1 + i)^n - 1)"
      article={
        <>
          <h2>Direct Answer: How Does the Sinking Fund Savings Formula Work?</h2>
          <p>
            To reach a specific future financial goal, savings calculations utilize the <strong>Sinking Fund Formula</strong> (the inverse of an ordinary annuity future value). The calculation first projects your current existing principal balance forward to the target maturity date under the account&rsquo;s Annual Percentage Yield (APY). The remaining gap must be fulfilled through periodic monthly cash deposits, which earn monthly interest from the moment of deposit until the target date.
          </p>

          <Formula>PMT = [FV − PV(1 + i)^n] × i ÷ [(1 + i)^n − 1]</Formula>
          <p>
            Where:
            <br />• <strong>PMT</strong> = Required monthly contribution deposit ($)
            <br />• <strong>FV</strong> = Target future savings goal ($)
            <br />• <strong>PV</strong> = Current initial starting balance ($)
            <br />• <strong>i</strong> = Effective monthly interest rate (Annual Percentage Yield converted to monthly equivalent: (1 + APY)^(1/12) − 1)
            <br />• <strong>n</strong> = Total number of monthly savings cycles (Target Years × 12)
          </p>

          <SavingsGoalMilestoneTimelineChart />

          <h2>Savings Milestone Matrix: Time Required to Hit Goals at 4.50% APY</h2>
          <p>
            The table below demonstrates how increasing your recurring monthly savings contribution significantly accelerates the calendar timeline required to achieve major liquid milestones (assuming an initial $1,000 balance):
          </p>

          <DataTable
            head={["Milestone Goal", "At $250 / Month", "At $500 / Month", "At $1,000 / Month", "Total Interest Earned ($1k/mo)"]}
            rows={[
              ["$10,000 Emergency Buffer", "35 Months (2.9 yrs)", "18 Months (1.5 yrs)", "9 Months (0.75 yrs)", "$225 Interest"],
              ["$25,000 Auto / Down Payment", "80 Months (6.7 yrs)", "43 Months (3.6 yrs)", "23 Months (1.9 yrs)", "$1,120 Interest"],
              ["$50,000 House Deposit", "144 Months (12.0 yrs)", "81 Months (6.8 yrs)", "43 Months (3.6 yrs)", "$4,180 Interest"],
              ["$100,000 Wealth Anchor", "242 Months (20.2 yrs)", "143 Months (11.9 yrs)", "80 Months (6.7 yrs)", "$16,400 Interest"],
            ]}
          />

          <h2>Optimizing Cash Yield: High-Yield Savings vs. CDs vs. Treasury Bills</h2>
          <ul>
            <li>
              <strong>High-Yield Savings Accounts (HYSA):</strong> Liquid, federally insured by FDIC or NCUA up to $250,000 per depositor. Yields fluctuate based on Federal Reserve benchmark adjustments. Ideal for emergency cash.
            </li>
            <li>
              <strong>Certificates of Deposit (CDs):</strong> Lock in a guaranteed fixed APY for a contracted term (3 months to 5 years). Yield is immune to rate cuts, but withdrawing early incurs penalty forfeitures of 3–6 months of interest.
            </li>
            <li>
              <strong>Treasury Bills (T-Bills):</strong> Backed by the full faith and credit of the US Government. Income is exempt from state and local income taxes, providing higher net after-tax yields for residents in high-tax states.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Cash Growth &amp; Compounding Solvers</h3>
            <p>
              Automated systematic deposits transform monthly cash flow into lasting wealth. Model long-term multi-decade growth curves with the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, evaluate emergency cushions using the <a href="/calculators/finance/emergency-fund-calculator">Emergency Fund Calculator</a>, structure fixed maturity tranches with the <a href="/calculators/finance/cd-calculator">CD Calculator</a>, and audit effective bank yields via our <a href="/calculators/finance/apy-calculator">APY Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between APY and nominal interest rate?",
          a: "The nominal interest rate does not factor in compounding within the calendar year. Annual Percentage Yield (APY) reflects the true annualized rate of return including compound interest. Under the federal Truth in Savings Act (TISA), banks must disclose APY on deposit accounts.",
        },
        {
          q: "Is interest earned on high-yield savings accounts taxable?",
          a: "Yes. In the United States, bank interest is classified as ordinary income and taxed at your top marginal federal and state tax rates. Financial institutions issue IRS Form 1099-INT for accounts earning $10 or more annually.",
        },
        {
          q: "How many months of living expenses should be kept in liquid savings?",
          a: "Certified Financial Planners (CFPs) recommend keeping 3 to 6 months of non-discretionary essential expenses in liquid, FDIC-insured cash for salaried dual-income households, and 6 to 12 months for single earners, freelancers, and commission-based professionals.",
        },
        {
          q: "What is the 'Pay Yourself First' rule in savings strategy?",
          a: "Rather than saving whatever money is leftover at the end of the month, the 'Pay Yourself First' methodology automates a direct transfer to savings or investments immediately upon receiving each paycheck.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/down-payment-calculator", icon: "🏡", name: "Down Payment" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
