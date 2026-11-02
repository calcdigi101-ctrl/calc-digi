import Calculator from "@/components/calcs/finance/budget-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FiftyThirtyTwentyBudgetRuleChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/budget-calculator";
const TITLE = "Budget Calculator – 50/30/20 Rule, Monthly Cash Flow & Expense Tracker | CalcDigi";
const DESCRIPTION =
  "Free monthly budget calculator: divide your take-home pay using the 50/30/20 budget rule (Needs, Wants, Savings/Debt Payoff). Compare custom budget frameworks (60/20/20, 70/20/10, zero-based budgeting) and track expense gaps.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Budget Calculator"
      intro="Structure your monthly take-home pay into essential needs, discretionary lifestyle wants, and wealth-building savings using the gold-standard 50/30/20 budget framework or custom financial rules."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="TakeHomePay = (Needs_0.50) + (Wants_0.30) + (SavingsDebt_0.20)"
      article={
        <>
          <h2>Direct Answer: What Is the 50/30/20 Budget Rule &amp; How Does It Balance Cash Flow?</h2>
          <p>
            The <strong>50/30/20 budget rule</strong> is an intuitive personal cash flow framework popularized by Harvard bankruptcy scholar and US Senator Elizabeth Warren in <em>All Your Worth: The Ultimate Lifetime Money Plan</em>. The model divides total after-tax, net take-home pay into three strict percentage categories: <strong>50% for Non-Negotiable Essential Needs</strong>, <strong>30% for Discretionary Lifestyle Wants</strong>, and <strong>20% for Wealth Accumulation &amp; Accelerated Debt Retirement</strong>. By capping fixed living costs at 50%, households maintain the financial resilience required to weather involuntary income loss without defaulting on essential obligations.
          </p>

          <Formula>50% Essential Needs = Net Take-Home Pay × 0.50</Formula>
          <Formula>30% Discretionary Wants = Net Take-Home Pay × 0.30</Formula>
          <Formula>20% Savings &amp; Debt Paydown = Net Take-Home Pay × 0.20</Formula>

          <FiftyThirtyTwentyBudgetRuleChart />

          <h2>50/30/20 Monthly Cash Flow Allocation Matrix</h2>
          <p>
            The table below breaks down exact monthly dollar allocations across common US household take-home pay tiers:
          </p>

          <DataTable
            head={["Monthly Net Take-Home Pay", "50% Needs (Max Cap)", "30% Wants (Flexible)", "20% Savings & Debt Paydown", "Annual Savings Generated"]}
            rows={[
              ["$3,500 / month", "$1,750 / mo", "$1,050 / mo", "$700 / mo", "$8,400 / year"],
              ["$5,000 / month", "$2,500 / mo", "$1,500 / mo", "$1,000 / mo", "$12,000 / year"],
              ["$7,000 / month", "$3,500 / mo", "$2,100 / mo", "$1,400 / mo", "$16,800 / year"],
              ["$9,500 / month", "$4,750 / mo", "$2,850 / mo", "$1,900 / mo", "$22,800 / year"],
              ["$12,000 / month", "$6,000 / mo", "$3,600 / mo", "$2,400 / mo", "$28,800 / year"],
            ]}
          />

          <h2>Categorization Rules &amp; Alternative Budgeting Frameworks</h2>
          <ul>
            <li>
              <strong>Needs vs. Wants Litmus Test:</strong> If losing your job tomorrow would mean you still have to pay the bill to avoid eviction, starvation, or legal default, it is a <em>Need</em> (mortgage/rent, basic groceries, utilities, term life/auto insurance, statutory minimum debt payments). If pausing or canceling the service causes discomfort without catastrophe, it is a <em>Want</em> (streaming media, restaurant meals, boutique gym memberships, vacation travel).
            </li>
            <li>
              <strong>The 60/20/20 High-Cost-of-Living Rule:</strong> In expensive metropolitan areas (New York, San Francisco, London) where rent/mortgage consumes 40%+ of income, expanding Needs to 60% while reducing Wants to 20% preserves the non-negotiable 20% savings engine.
            </li>
            <li>
              <strong>The 50/20/30 Aggressive FIRE Rule:</strong> Popular among Financial Independence, Retire Early (FIRE) practitioners, this variation allocates 30% to investments and high-yield index funds while restricting personal lifestyle wants to 20%.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Personal Cash Flow &amp; Savings Solvers</h3>
            <p>
              Maintaining a balanced 50/30/20 budget provides the foundation for financial freedom. Calculate your exact net paycheck earnings using our <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, establish a liquid 3-to-6 month safety reserve with the <a href="/calculators/finance/emergency-fund-calculator">Emergency Fund Calculator</a>, automate recurring deposit targets via the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and aggressively retire liabilities using our <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Is the 50/30/20 budget based on gross income or net take-home pay?",
          a: "The 50/30/20 rule is strictly calculated using net take-home pay (your actual paycheck deposit after federal, state, and FICA payroll taxes). However, if you already have automated pre-tax 401(k) contributions withheld from your gross pay at work, you can add those contributions into the 20% savings category.",
        },
        {
          q: "Where do minimum credit card payments belong in the 50/30/20 rule?",
          a: "Statutory minimum monthly debt payments (credit cards, student loans, auto loans) are classified under the 50% Needs category because failing to pay them damages your credit score and invites legal collection. Any additional principal prepayments above the minimum belong in the 20% Savings/Debt Paydown category.",
        },
        {
          q: "What should I do if my essential needs exceed 50% of my income?",
          a: "This is common in high-cost housing markets. First, adjust temporarily to a 60/20/20 or 70/20/10 budget while keeping savings alive. Second, actively work on the biggest fixed levers: refinance debt, renegotiate auto insurance rates, or consider relocating when your lease expires to bring housing under 30% of take-home pay.",
        },
        {
          q: "What is Zero-Based Budgeting (ZBB) compared to 50/30/20?",
          a: "The 50/30/20 rule is a high-level percentage guideline that gives you freedom within categories. Zero-Based Budgeting (such as YNAB or the envelope system) assigns every single dollar earned a specific job before the month begins until Income minus Expenses equals exactly zero.",
        },
      ]}
      related={[
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/housing/rent-calculator", icon: "🏢", name: "Rent Affordability" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
