import Calculator from "@/components/calcs/finance/budget-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FiftyThirtyTwentyBudgetRuleChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/budget-calculator";
const TITLE = "Budget Calculator";
const DESCRIPTION =
  "Free household budget calculator: allocate take-home income across the 50/30/20 budget rule (Needs, Wants, Savings), Zero-Based Budgeting (ZBB), and debt.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Budget Calculator"
      intro="Structure your household cash flow using the 50/30/20 budget rule and zero-based budgeting. Balance essential needs, lifestyle wants, emergency savings, and accelerated debt payoff."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Income} = (0.50 \times \text{Needs}) + (0.30 \times \text{Wants}) + (0.20 \times \text{Savings / Debt})"
      article={
        <>
          <h2>Direct Answer: How the 50/30/20 Budget Rule Organizes Cash Flow</h2>
          <p>
            The <strong>50/30/20 budget framework</strong>—popularized by Harvard bankruptcy expert Senator Elizabeth Warren—is an intuitive, proportional budgeting model designed to ensure lifelong household financial health. Rather than micro-managing hundreds of individual expense line items, the rule divides your net after-tax take-home pay into three macro buckets: <strong>50% for Essential Needs</strong>, <strong>30% for Lifestyle Wants</strong>, and <strong>20% for Savings and Accelerated Debt Elimination</strong>.
          </p>
          <p>
            By strictly capping mandatory baseline survival expenses at 50% of take-home income, households establish strong financial resilience, preventing lifestyle inflation from undermining emergency liquidity or retirement security.
          </p>

          <FiftyThirtyTwentyBudgetRuleChart />

          <h2>Actuarial Mathematics of the 50/30/20 &amp; Zero-Based Budgeting (ZBB) Models</h2>
          <p>
            Let <Formula>{"I_{\text{net}}"}</Formula> be total monthly net take-home cash income. The statutory category spending caps are:
          </p>

          <Formula>{"\text{Essential Needs Cap } (N) \le 0.50 \times I_{\text{net}}"}</Formula>
          <Formula>{"\text{Lifestyle Wants Cap } (W) \le 0.30 \times I_{\text{net}}"}</Formula>
          <Formula>{"\text{Savings & Debt Floor } (S) \ge 0.20 \times I_{\text{net}}"}</Formula>
          <p>
            Where:
            <br />• <strong>Needs (50%):</strong> Non-negotiable survival obligations: rent/mortgage, utilities, essential groceries, healthcare, minimum debt service, and basic transportation
            <br />• <strong>Wants (30%):</strong> Discretionary lifestyle upgrades: restaurant dining, entertainment, streaming subscriptions, vacations, and premium apparel
            <br />• <strong>Savings &amp; Debt (20%):</strong> Emergency cushion funding, high-yield savings, Roth IRA/brokerage contributions, and extra principal prepayments
          </p>
          <p>
            Under <strong>Zero-Based Budgeting (ZBB)</strong>, every single dollar of incoming cash is assigned a specific functional job before the month begins:
          </p>
          <Formula>{"I_{\text{net}} - \sum_{k=1}^{m} \text{Allocated Category Cash}_k = \$0.00"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a household with a <strong>net monthly take-home income of $6,000</strong> ($72,000 annual net pay) implementing the 50/30/20 allocation:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate Essential Needs Ceiling (50%).</strong>
              <Formula>{"\text{Needs Budget} = \$6{,}000 \times 0.50 = \$3{,}000.00 \text{ / month}"}</Formula>
              Allocated as: $1,800 rent/mortgage, $350 utilities, $500 groceries, and $350 health/auto insurance.
            </li>
            <li>
              <strong>Step 2: Calculate Discretionary Lifestyle Wants Ceiling (30%).</strong>
              <Formula>{"\text{Wants Budget} = \$6{,}000 \times 0.30 = \$1{,}800.00 \text{ / month}"}</Formula>
              Allocated as: $500 dining/takeout, $300 entertainment, $400 travel fund, and $600 hobbies and shopping.
            </li>
            <li>
              <strong>Step 3: Calculate Savings and Debt Payoff Floor (20%).</strong>
              <Formula>{"\text{Savings & Debt Floor} = \$6{,}000 \times 0.20 = \$1{,}200.00 \text{ / month}"}</Formula>
              Allocated as: $583.33 to max out a Roth IRA ($7,000/yr), $300 to high-yield emergency savings, and $316.67 extra principal toward student loans.
            </li>
            <li>
              <strong>Step 4: Audit Cash Balance Under Zero-Based Principles.</strong>
              <Formula>{"\$6{,}000 - \$3{,}000 \text{ (Needs)} - \$1{,}800 \text{ (Wants)} - \$1{,}200 \text{ (Savings)} = \$0.00"}</Formula>
              Zero unassigned cash remains, eliminating unintentional lifestyle leakage.
            </li>
          </ol>

          <h2>50/30/20 Budget Allocation Matrix Across Monthly Income Tiers</h2>
          <p>
            The table below itemizes dollar allocations across standard take-home income levels under the 50/30/20 model:
          </p>

          <DataTable
            head={["Monthly Net Take-Home", "50% Essential Needs Cap", "30% Lifestyle Wants Cap", "20% Savings & Debt Floor", "Annual Wealth Accumulated (20%)"]}
            rows={[
              ["$3,000 / month", "$1,500 / month", "$900 / month", "$600 / month", "$7,200 / year saved"],
              ["$4,500 / month", "$2,250 / month", "$1,350 / month", "$900 / month", "$10,800 / year saved"],
              ["$6,000 / month", "$3,000 / month", "$1,800 / month", "$1,200 / month", "$14,400 / year saved"],
              ["$8,000 / month", "$4,000 / month", "$2,400 / month", "$1,600 / month", "$19,200 / year saved"],
              ["$10,000 / month", "$5,000 / month", "$3,000 / month", "$2,000 / month", "$24,000 / year saved"],
              ["$15,000 / month", "$7,500 / month", "$4,500 / month", "$3,000 / month", "$36,000 / year saved"],
            ]}
          />

          <h2>The Anti-Budget: Automated &ldquo;Pay Yourself First&rdquo; Protocol</h2>
          <p>
            For individuals who experience &ldquo;budget fatigue&rdquo; when tracking every receipt, the <strong>Anti-Budget</strong> (also known as Reverse Budgeting) offers a frictionless behavioral alternative:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Automate Savings on Payday:</strong> The moment direct deposit clears, automated transfers immediately route 20% into investments, Roth IRAs, and emergency savings buckets before you see the cash.</li>
            <li><strong>Cover Fixed Needs Automatically:</strong> Set recurring bill auto-pay for mortgage/rent, utilities, and debt minimums from a dedicated bills checking account.</li>
            <li><strong>Guilt-Free Spending of the Remainder:</strong> Whatever cash remains in your primary spending account can be spent 100% guilt-free on lifestyle wants with zero category tracking, because your wealth goals were already funded first.</li>
          </ul>

          <h2>High-Cost-of-Living (HCOL) Adjustments: The 60/20/20 Inversion</h2>
          <p>
            In major metropolitan cities (San Francisco, New York, Seattle) where housing consumes 40%+ of net pay, strictly meeting the 50% Needs cap can be difficult.
          </p>
          <p>
            Financial advisors recommend the <strong>60/20/20 Budget Inversion</strong>: expand Needs to 60%, compress discretionary Wants to 20%, and maintain the non-negotiable <strong>20% Savings/Debt floor</strong> intact. Sacrificing the savings floor permanently impairs long-term compounding.
          </p>

          <h2>Combating Lifestyle Inflation: The Diderot Effect in Personal Finance</h2>
          <p>
            As career earnings rise, households routinely fall victim to <strong>lifestyle inflation</strong>—the unconscious escalation of spending to match incoming salary raises:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The 50% Raise Allocation Rule:</strong> Whenever receiving a career salary promotion, immediately commit at least 50% of the net raise toward savings and investments, allocating the remaining 50% toward lifestyle upgrades.</li>
            <li><strong>The 48-Hour Discretionary Pause:</strong> Enforce a mandatory 48-hour cooling-off delay on any non-essential purchase exceeding $100 to eliminate impulse emotional buying.</li>
          </ul>

          <h2>Envelope Cash Stuffing vs. Digital Banking Buckets</h2>
          <p>
            Behavioral execution determines budgeting success:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The Cash Envelope System:</strong> Physically withdrawing cash on payday and placing specific amounts into labeled envelopes (groceries, dining, entertainment). Once the envelope is empty, spending in that category ceases until next month.</li>
            <li><strong>Digital Sub-Accounts:</strong> Modern online banking allows setting up automated virtual checking and savings buckets that automatically separate fixed bill money from discretionary spending money on direct deposit day.</li>
          </ul>

          <h2>Essential Budgeting Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Zero-Based Budgeting (ZBB):</strong> A method where every dollar of income is assigned to a specific category so income minus expenses equals exactly zero.</li>
            <li><strong>Fixed Expenses:</strong> Recurring bills with identical amounts each month (rent, car payment, term life insurance).</li>
            <li><strong>Variable Expenses:</strong> Operational costs that fluctuate monthly based on consumption (utilities, groceries, vehicle gasoline).</li>
            <li><strong>Sinking Fund:</strong> A dedicated savings bucket funded monthly to pay for predictable future irregular expenses (annual car insurance premiums, holiday gifts, property taxes).</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Household Financial Solvers</h3>
            <p>
              Calculate exact net paycheck cash via the <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, model emergency runway with our <a href="/calculators/finance/emergency-fund-calculator">Emergency Fund Calculator</a>, eliminate high-interest liabilities using the <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>, and track total net assets via the <a href="/calculators/finance/net-worth-calculator">Net Worth Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the 50/30/20 budget rule?",
          a: "The 50/30/20 rule is a proportional budgeting framework that allocates net after-tax take-home pay into three categories: 50% for essential needs (housing, utilities, food), 30% for lifestyle wants (dining out, entertainment), and 20% for savings and accelerated debt repayment.",
        },
        {
          q: "Is the 50/30/20 rule calculated on gross income or take-home pay?",
          a: "The 50/30/20 rule is strictly calculated on net after-tax take-home pay (the cash deposited into your bank account). However, if your employer automatically deducts retirement contributions (401k) from your paycheck, add that dollar amount back into your 20% savings category.",
        },
        {
          q: "What counts as a 'Need' vs. a 'Want' in a budget?",
          a: "Needs are non-negotiable survival obligations: basic shelter, water, electricity, basic groceries, essential healthcare, and minimum loan payments. Wants include restaurant meals, streaming services, vacations, gym memberships, and brand-name clothing.",
        },
        {
          q: "What should I do if my essential needs exceed 50% of my income?",
          a: "In high-cost-of-living areas, adopt the 60/20/20 budget: allow essential needs to take up to 60% of take-home pay, compress lifestyle wants to 20%, and maintain the non-negotiable 20% savings and debt reduction target intact.",
        },
        {
          q: "What is zero-based budgeting (ZBB)?",
          a: "Zero-based budgeting is a method where your income minus all allocated expenses, savings, and debt payments equals exactly zero. Every dollar is given a designated purpose before the month begins, preventing unintentional spending.",
        },
        {
          q: "What is a sinking fund and why is it important?",
          a: "A sinking fund is a savings category where you set aside money monthly for predictable irregular expenses (e.g. $100/mo for car maintenance or $150/mo for holiday gifts). Sinking funds prevent irregular bills from disrupting your monthly budget.",
        },
        {
          q: "How often should I review and update my budget?",
          a: "Review your budget weekly to track ongoing spending, and conduct a thorough formal review once a month to adjust category allocations for the upcoming month based on life events and seasonal spending shifts.",
        },
        {
          q: "Should debt payments be categorized as Needs or Savings?",
          a: "Contractual minimum monthly debt payments (credit cards, auto loans, student debt) are categorized as Needs because missing them damages credit scores. Extra debt prepayments beyond minimums are counted within the 20% Savings and Debt payoff category.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/emergency-fund-calculator", icon: "🛡️", name: "Emergency Fund Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/net-worth-calculator", icon: "💎", name: "Net Worth Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
