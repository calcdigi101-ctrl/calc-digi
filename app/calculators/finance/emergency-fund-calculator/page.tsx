import Calculator from "@/components/calcs/finance/emergency-fund-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EmergencyFundRunwayTiersChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/emergency-fund-calculator";
const TITLE = "Emergency Fund Calculator – How Much Cash Reserve Do You Need? | CalcDigi";
const DESCRIPTION =
  "Free emergency fund calculator: determine exact 3 to 12-month liquid cash cushion requirements based on essential monthly expenses, household income stability, dependent count, and savings runways.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Emergency Fund Calculator"
      intro="Calculate your personalized emergency cash buffer based on non-discretionary monthly survival expenses. Assess savings gaps, months of financial runway, and target completion timelines."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="EmergencyFund = MonthlyEssentials * TargetMonths"
      article={
        <>
          <h2>Direct Answer: What Is an Emergency Fund &amp; How Much Liquid Cash Should You Hold?</h2>
          <p>
            An <strong>emergency fund</strong> is a dedicated reserve of immediately accessible, federally insured cash designated solely to absorb severe unexpected financial shocks—such as involuntary job termination, acute medical emergencies, major residential HVAC failures, or urgent vehicle repairs. Financial planning standards dictate funding <strong>3 to 6 months of non-discretionary baseline expenses</strong> for dual-income salaried households, and <strong>9 to 12 months</strong> for sole breadwinners, freelance contractors, commission salespeople, or business owners whose income exhibits high cyclical volatility.
          </p>

          <Formula>Target Emergency Fund = Monthly Non-Discretionary Expenses × Runway Months</Formula>
          <p>
            Where monthly essential baseline includes strictly survival outlays:
            <br />• <strong>Housing:</strong> Rent or mortgage principal, interest, property taxes, homeowners insurance, and mandatory HOA dues
            <br />• <strong>Utilities:</strong> Electricity, heating gas, water, municipal sewer, garbage, and essential cellular/broadband connection
            <br />• <strong>Nutrition:</strong> Basic groceries and home meal preparation (strictly excluding dining out, alcohol, and takeout)
            <br />• <strong>Healthcare:</strong> Health insurance premiums, essential prescription medications, and co-pays
            <br />• <strong>Transportation &amp; Debt:</strong> Auto loan payments, fuel, public transit passes, auto insurance, and statutory minimum debt payments
          </p>

          <EmergencyFundRunwayTiersChart />

          <h2>Emergency Fund Runway Benchmarks by Household Stability Profile</h2>
          <p>
            The table below illustrates required cash targets across varying household expense tiers and risk profiles:
          </p>

          <DataTable
            head={["Household Risk Profile", "Monthly Baseline Expenses", "Recommended Runway", "Total Cash Target", "Optimal Holding Vehicle"]}
            rows={[
              ["Dual-Income Salaried (W-2)", "$3,500 / mo", "3 to 4 Months", "$10,500 – $14,000", "High-Yield Savings Account (HYSA)"],
              ["Single Earner / Salaried", "$4,000 / mo", "6 Months", "$24,000", "HYSA + 4-Week Treasury Bills"],
              ["Freelancer / 1099 Contractor", "$4,500 / mo", "9 Months", "$40,500", "HYSA + Tiered T-Bill Ladder"],
              ["Sole Earner w/ Children / High Fixed Debt", "$5,500 / mo", "12 Months", "$66,000", "HYSA + Short-Term Money Market Funds"],
            ]}
          />

          <h2>The 3-Tier Liquidity Storage Framework</h2>
          <p>
            Holding $20,000 to $60,000 in cash does not mean settling for near-zero returns at traditional brick-and-mortar banks. Professional wealth advisors structure emergency reserves across three tiers:
          </p>
          <ul>
            <li>
              <strong>Tier 1: Immediate Checking Buffer (1 Month):</strong> Kept in your primary checking account to prevent overdraft fees and cover immediate same-day emergencies.
            </li>
            <li>
              <strong>Tier 2: High-Yield Savings Account (2 to 3 Months):</strong> Held in an FDIC-insured online HYSA earning competitive APY. Funds transfer to checking in 1 to 2 business days.
            </li>
            <li>
              <strong>Tier 3: 4-Week to 13-Week US Treasury Bills (Remaining Runway):</strong> State-tax exempt, backing of the federal government, and rolling weekly maturities ensure ongoing liquidity while locking in maximum money market yields.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Financial Safety Net &amp; Savings Solvers</h3>
            <p>
              A dedicated emergency fund provides an impenetrable buffer against high-interest debt accumulation. Automate monthly cash allocations with our <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, balance essential spending categories via the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, accelerate consumer debt elimination using the <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>, and optimize yield on liquid reserves with our <a href="/calculators/finance/cd-calculator">CD Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Should I build an emergency fund or pay off credit card debt first?",
          a: "Build a 'starter emergency fund' of $1,500 to $2,500 first. This prevents minor unexpected expenses from being charged to high-interest credit cards. Once the mini-fund is established, throw all available surplus cash flow toward paying off toxic high-interest revolving balances, then return to fund your full 3-to-6 month reserve.",
        },
        {
          q: "Should I invest my emergency fund in stocks or crypto for higher returns?",
          a: "No. The purpose of an emergency fund is insurance, not growth. Broad equity markets frequently crash during macroeconomic recessions—precisely when corporate layoffs peak. Storing emergency cash in volatile equities risks forcing you to sell at a 30% to 50% loss during a personal crisis.",
        },
        {
          q: "Can a Roth IRA serve as a backup emergency fund?",
          a: "While original Roth IRA contributions (not earnings) can be withdrawn tax-free and penalty-free at any time, once withdrawn, you cannot replace past years' contribution allowances. A separate cash reserve is always preferred.",
        },
        {
          q: "When is it appropriate to tap into your emergency fund?",
          a: "Use emergency funds exclusively for events that meet three criteria: unexpected, necessary, and urgent (e.g., job loss, emergency surgery, broken home furnace in winter). Planned expenses like holiday gifts, annual car insurance premiums, or vacations belong in sinking funds.",
        },
      ]}
      related={[
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
