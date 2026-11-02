import Calculator from "@/components/calcs/finance/retirement-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RetirementNestEggDrawdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/retirement-calculator";
const TITLE = "Retirement Calculator – Nest Egg Target, 4% Rule & Drawdown Runway | CalcDigi";
const DESCRIPTION =
  "Free retirement calculator: calculate how much you need to retire based on the 4% safe withdrawal rule, Social Security offsets, pre-retirement vs. post-retirement returns, and cumulative inflation projections.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Retirement Calculator"
      intro="Determine your target retirement nest egg, assess portfolio sustainability under the 4% Safe Withdrawal Rule, and model Social Security integration alongside pre- and post-retirement returns."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="NestEggNeeded = AnnualIncomeGap * 25"
      article={
        <>
          <h2>Direct Answer: How Does the 4% Safe Withdrawal Rule &amp; Retirement Nest Egg Formula Work?</h2>
          <p>
            Your target retirement nest egg is the total capital required at your planned retirement age so that periodic decumulation withdrawals—combined with Social Security and pensions—support your target lifestyle throughout retirement without portfolio exhaustion. Under the celebrated <strong>Trinity Study (the 4% Rule)</strong>, withdrawing <strong>4.0% of your starting portfolio value in Year 1 of retirement</strong>, followed by annual inflation adjustments in subsequent years, historically provides a <strong>95%+ probability of portfolio survival across a 30-year retirement horizon</strong> when invested in a diversified 50/50 to 75/25 stock/bond portfolio.
          </p>

          <Formula>Target Nest Egg = (Annual Desired Spending − Guaranteed Annual Income) × 25</Formula>
          <Formula>Present Value Decumulation Gap = W × [1 − ((1 + g) ÷ (1 + r))^n] ÷ (r − g)</Formula>
          <p>
            Where:
            <br />• <strong>Target Nest Egg:</strong> Total accumulated wealth needed on retirement Day 1 ($)
            <br />• <strong>W:</strong> Initial periodic monthly withdrawal gap ($)
            <br />• <strong>g:</strong> Monthly inflation rate
            <br />• <strong>r:</strong> Monthly portfolio return in retirement (conservative fixed-income and equity blend)
            <br />• <strong>n:</strong> Number of decumulation months (Retirement Longevity Horizon × 12)
          </p>

          <RetirementNestEggDrawdownChart />

          <h2>Retirement Nest Egg Milestones: Desired Spending vs. Target Capital</h2>
          <p>
            The table below illustrates required capital nest eggs across various annual post-career living expenditure targets (net of an estimated $24,000 annual Social Security benefit) under the 4% Safe Withdrawal Rule:
          </p>

          <DataTable
            head={["Desired Annual Spending", "Annual Social Security Offset", "Net Annual Portfolio Gap", "Target Nest Egg Required (25x Rule)", "Safe Monthly Drawdown"]}
            rows={[
              ["$50,000 / year", "$24,000 / yr", "$26,000 / yr", "$650,000", "$2,166 / mo"],
              ["$75,000 / year", "$24,000 / yr", "$51,000 / yr", "$1,275,000", "$4,250 / mo"],
              ["$100,000 / year", "$24,000 / yr", "$76,000 / yr", "$1,900,000", "$6,333 / mo"],
              ["$150,000 / year", "$24,000 / yr", "$126,000 / yr", "$3,150,000", "$10,500 / mo"],
              ["$200,000 / year", "$24,000 / yr", "$176,000 / yr", "$4,400,000", "$14,666 / mo"],
            ]}
          />

          <h2>Core Levers to Close a Projected Retirement Shortfall</h2>
          <ul>
            <li>
              <strong>Capture 100% of Employer 401(k) Match:</strong> An employer match provides an immediate 50% to 100% risk-free return on your money that compounds for decades.
            </li>
            <li>
              <strong>Delay Social Security to Age 70:</strong> For each year you delay claiming Social Security past your Full Retirement Age (67), your permanent monthly benefit increases by approximately <strong>8% per year</strong> (up to 124% of your base benefit at Age 70).
            </li>
            <li>
              <strong>Dynamic Spending Adjustments:</strong> Reducing annual withdrawals by 10%–15% during major bear market downturns eliminates sequence-of-returns risk and drastically enhances portfolio longevity.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement Planning &amp; Tax-Advantaged Solvers</h3>
            <p>
              Achieving lifelong financial independence requires structured tax optimization. Maximize company match contributions with our <a href="/calculators/finance/401k-calculator">401k Calculator</a>, model tax-free retirement growth using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, project government benefit entitlements with the <a href="/calculators/finance/social-security-calculator">Social Security Calculator</a>, and track multi-decade asset compounding using our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What percentage of pre-retirement income do I actually need in retirement?",
          a: "Most financial planners use a benchmark of 70% to 85% of your final gross working income. This assumes you will no longer have payroll FICA taxes (7.65%), retirement savings deductions (10%–15%), commuting costs, or mortgage payments if your home is paid off.",
        },
        {
          q: "Does the 4% rule still work in low-yield or high-inflation environments?",
          a: "Recent academic research (including updated Morningstar retirement studies) recommends a slightly more conservative initial withdrawal rate of 3.8% to 4.0% for traditional 30-year retirements, or 3.2% to 3.5% for early retirees (FIRE community) facing 40 to 50-year horizons.",
        },
        {
          q: "What is 'Sequence of Returns Risk' in retirement?",
          a: "Sequence of returns risk is the danger of experiencing steep stock market declines in the first 3 to 5 years after retiring while simultaneously liquidating shares to fund living expenses. This permanently depletes the capital base needed to participate in the eventual market recovery.",
        },
        {
          q: "Are 401(k) and IRA withdrawals taxed in retirement?",
          a: "Withdrawals from Traditional 401(k)s and Traditional IRAs are taxed as ordinary federal and state income in the year withdrawn. Conversely, qualified distributions from a Roth IRA or Roth 401(k) are 100% tax-free.",
        },
      ]}
      related={[
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/social-security-calculator", icon: "🏛️", name: "Social Security" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
