import Calculator from "@/components/calcs/finance/social-security-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SocialSecurityClaimingAgeBenefitChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/social-security-calculator";
const TITLE = "Social Security Calculator – Claiming Age Benefits, PIA & Break-Even Analysis | CalcDigi";
const DESCRIPTION =
  "Free Social Security calculator: calculate exact monthly payouts across claiming ages 62 to 70 based on Primary Insurance Amount (PIA), Full Retirement Age (FRA), delayed retirement credits, and actuarial break-even ages.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Social Security Calculator"
      intro="Calculate your monthly Social Security retirement benefit across every claiming age from 62 to 70. Model actuarial reductions, delayed retirement credits (8%/yr), and lifetime break-even horizons."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Benefit = PIA * (1 + DelayedCredits - EarlyReductions)"
      article={
        <>
          <h2>Direct Answer: How Does the Social Security Retirement Benefit Formula Work?</h2>
          <p>
            Your baseline Social Security retirement benefit—called the <strong>Primary Insurance Amount (PIA)</strong>—is calculated from your highest 35 years of wage-indexed earnings. The actual monthly cash check you receive depends on the exact calendar month you elect to begin claiming relative to your statutory <strong>Full Retirement Age (FRA)</strong> (age 67 for all workers born in 1960 or later). Claiming as early as possible at age 62 imposes a permanent <strong>30% lifetime reduction</strong>; delaying claiming until age 70 earns <strong>Delayed Retirement Credits of 8% per year</strong>, yielding a permanent <strong>24% bonus above your baseline PIA</strong> (a 77% higher monthly check than claiming at 62).
          </p>

          <Formula>Early Claiming Reduction: (5/9 of 1% × First 36 Mo) + (5/12 of 1% × Remaining Mo)</Formula>
          <Formula>Delayed Retirement Bonus: 2/3 of 1% per Month (8.0% per Year) from FRA to Age 70</Formula>

          <SocialSecurityClaimingAgeBenefitChart />

          <h2>Social Security Claiming Age Payout Matrix: $2,500 Base PIA</h2>
          <p>
            The table below illustrates monthly benefit amounts, percentage of base PIA, and cumulative lifetime payouts across varying longevity horizons for a worker born in 1960 or later with a $2,500 Full Retirement Age benefit:
          </p>

          <DataTable
            head={["Claiming Age", "% of Base PIA", "Monthly Payout ($)", "Cumulative Total at Age 80", "Cumulative Total at Age 85", "Break-Even Horizon"]}
            rows={[
              ["Age 62 (Earliest)", "70.0%", "$1,750 / mo", "$378,000", "$483,000", "Baseline"],
              ["Age 64", "80.0%", "$2,000 / mo", "$384,000", "$504,000", "Age 78 vs 62"],
              ["Age 66", "93.3%", "$2,333 / mo", "$392,000", "$532,000", "Age 79 vs 62"],
              ["Age 67 (Full Retirement Age)", "100.0%", "$2,500 / mo", "$390,000", "$540,000", "Age 80.5 vs 62"],
              ["Age 70 (Maximum Delayed)", "124.0%", "$3,100 / mo", "$372,000", "$558,000", "Age 82.5 vs 62"],
            ]}
          />

          <h2>Core Claiming Decision Rules: Longevity &amp; Spousal Protection</h2>
          <ul>
            <li>
              <strong>The Actuarial Break-Even Age (~81–83 Years):</strong> If you live past age 82.5, delaying to age 70 produces significantly more total lifetime wealth than taking smaller checks starting at 62.
            </li>
            <li>
              <strong>Spousal &amp; Survivor Benefit Shield:</strong> For married couples, the higher-earning spouse delaying to age 70 locks in the highest possible survivor benefit for the surviving spouse for the rest of their natural life.
            </li>
            <li>
              <strong>Social Security Earnings Test (Prior to FRA):</strong> If you claim benefits before reaching Full Retirement Age and continue to work, $1 in benefits is temporarily withheld for every $2 earned above the annual earnings limit ($23,400 in 2026). Once you reach FRA, the earnings test vanishes completely.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement Income &amp; Longevity Solvers</h3>
            <p>
              Deciding when to claim Social Security between ages 62 and 70 significantly alters lifetime retirement income. Integrate your benefits into a complete nest egg model with our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, optimize employer-sponsored retirement savings using the <a href="/calculators/finance/401k-calculator">401k Calculator</a>, build tax-free private reserves via the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, and adjust future income for purchasing power loss with our <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Are Social Security retirement benefits subject to federal income tax?",
          a: "Yes, depending on your 'Combined Income' (Adjusted Gross Income + Non-taxable interest + 50% of your Social Security benefits). For single filers with combined income between $25,000 and $34,000, up to 50% of benefits are taxable; above $34,000, up to 85% of benefits become taxable.",
        },
        {
          q: "What is an annual Cost of Living Adjustment (COLA)?",
          a: "Social Security benefits are protected against inflation through an annual statutory COLA based on the percentage increase in the Consumer Price Index for Urban Wage Earners and Clerical Workers (CPI-W) from the third quarter of the prior year.",
        },
        {
          q: "Can I collect benefits based on an ex-spouse's work record?",
          a: "Yes, provided the marriage lasted at least 10 consecutive years, you are currently unmarried, and you are age 62 or older. Claiming on an ex-spouse's record does not impact their benefit or their current spouse's benefit in any way.",
        },
        {
          q: "Does delaying past age 70 provide additional delayed retirement credits?",
          a: "No. Delayed retirement credits cease completely upon reaching your 70th birthday. There is zero financial benefit to delaying claiming past age 70.",
        },
      ]}
      related={[
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
