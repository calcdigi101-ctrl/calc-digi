import Calculator from "@/components/calcs/finance/retirement-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RetirementNestEggDrawdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/retirement-calculator";
const TITLE = "Retirement Calculator";
const DESCRIPTION =
  "Free retirement calculator: calculate target nest egg requirements, annual drawdown longevity, Social Security integration, and the 4% safe withdrawal rule.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Retirement Calculator"
      intro="Determine your target retirement nest egg, required monthly savings, and portfolio drawdown longevity. Model Social Security benefits, pension cash flows, inflation decay, and safe withdrawal rates."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Target Nest Egg} = \frac{\text{Annual Retirement Spending} - \text{Social Security} - \text{Pension}}{\text{Safe Withdrawal Rate (SWR)}}"
      article={
        <>
          <h2>Direct Answer: How to Calculate Your Target Retirement Nest Egg</h2>
          <p>
            Your <strong>target retirement nest egg</strong> is the total accumulated investment capital required to fund your lifestyle for 30 or more years without exhausting your money. Grounded in the landmark <strong>Trinity Study (1998)</strong> and updated by retirement researchers, financial planners rely on the <strong>4% Safe Withdrawal Rule</strong>: an investor who withdraws 4.0% of their initial portfolio in Year 1, adjusted annually for CPI inflation thereafter, maintains a 95%+ probability of portfolio survival across all historical 30-year market cycles.
          </p>
          <p>
            To calculate your target nest egg, determine your annual retirement spending deficit—gross living expenses minus guaranteed fixed income sources (Social Security and corporate pensions)—and divide by your chosen safe withdrawal rate.
          </p>

          <RetirementNestEggDrawdownChart />

          <h2>Actuarial Mathematics of Retirement Accumulation &amp; Drawdown Longevity</h2>
          <p>
            The retirement financial model resolves through two distinct phases: <strong>wealth accumulation</strong> during working years, followed by <strong>systematic portfolio decumulation</strong> in retirement:
          </p>

          <Formula>{"\text{Target Nest Egg } (PV_{\text{ret}}) = \frac{\text{Annual Living Expenses} - \text{Social Security} - \text{Pensions}}{\text{Safe Withdrawal Rate (SWR)}}"}</Formula>
          <p>
            Where SWR is expressed as a decimal (e.g. 0.04 for 4.0%, or 0.035 for a conservative 3.5% early retirement rate).
          </p>
          <p>
            To compute the required monthly savings <em>PMT</em> during the accumulation phase of <em>t</em> years starting with current savings <Formula>{"PV_0"}</Formula> at expected return <em>r</em>:
          </p>
          <Formula>{"PMT = \frac{PV_{\text{ret}} - PV_0(1 + r)^t}{\left[ \frac{(1 + r)^t - 1}{r} \right] \times 12}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a <strong>35-year-old worker planning to retire at age 65</strong> (<Formula>{"t = 30 \text{ years}"}</Formula>) who anticipates <strong>$80,000 per year in retirement spending</strong>, expects <strong>$25,000 per year from Social Security</strong>, has <strong>$100,000 in starting retirement savings</strong>, and benchmarks a <strong>7.50% annual portfolio growth rate</strong> (<Formula>{"r = 0.075"}</Formula>) and a <strong>4.00% safe withdrawal rate</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate annual retirement portfolio deficit.</strong>
              <Formula>{"\text{Portfolio Funding Need} = \$80{,}000 - \$25{,}000 = \$55{,}000.00 \text{ / year}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Solve for target retirement nest egg at 4% SWR.</strong>
              <Formula>{"PV_{\text{ret}} = \frac{\$55{,}000}{0.040} = \$1{,}375{,}000.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Project growth of existing $100,000 savings over 30 years.</strong>
              <Formula>{"(1 + 0.075)^{30} = 8.754955"}</Formula>
              <Formula>{"FV_{\text{existing}} = \$100{,}000 \times 8.754955 = \$875{,}495.50"}</Formula>
            </li>
            <li>
              <strong>Step 4: Determine net remaining capital shortfall at age 65.</strong>
              <Formula>{"\text{Remaining Shortfall} = \$1{,}375{,}000.00 - \$875{,}495.50 = \$499{,}504.50"}</Formula>
            </li>
            <li>
              <strong>Step 5: Solve for required monthly savings contribution (PMT).</strong>
              <Formula>{"\text{Annuity Factor} = \frac{8.754955 - 1}{0.075} = \frac{7.754955}{0.075} = 103.3994"}</Formula>
              <Formula>{"\text{Annual Contribution} = \frac{\$499{,}504.50}{103.3994} = \$4{,}830.83 / \text{year} \rightarrow PMT = \frac{\$4{,}830.83}{12} = \$402.57 \text{ / month}"}</Formula>
              Contributing <strong>$403 per month</strong> across working years guarantees reaching the full $1,375,000 retirement nest egg.
            </li>
          </ol>

          <h2>Retirement Nest Egg Sizing Matrix Across Safe Withdrawal Rates</h2>
          <p>
            The matrix below calculates required nest egg capital across spending deficits and withdrawal rates:
          </p>

          <DataTable
            head={["Annual Spending Deficit", "3.0% SWR (Ultra-Safe)", "3.5% SWR (Early Retiree)", "4.0% SWR (Trinity Standard)", "4.5% SWR (Aggressive)"]}
            rows={[
              ["$40,000 / year ($3,333/mo)", "$1,333,333", "$1,142,857", "$1,000,000", "$888,889"],
              ["$60,000 / year ($5,000/mo)", "$2,000,000", "$1,714,286", "$1,500,000", "$1,333,333"],
              ["$80,000 / year ($6,667/mo)", "$2,666,667", "$2,285,714", "$2,000,000", "$1,777,778"],
              ["$100,000 / year ($8,333/mo)", "$3,333,333", "$2,857,143", "$2,500,000", "$2,222,222"],
              ["$150,000 / year ($12,500/mo)", "$5,000,000", "$4,285,714", "$3,750,000", "$3,333,333"],
            ]}
          />

          <h2>Sequence of Returns Risk: The Hidden Retirement Portfolio Killer</h2>
          <p>
            The greatest threat to retirement solvency is not average long-term returns, but the <strong>timing and sequence of returns</strong> during the first 5 to 7 years of retirement:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The Downside Spiral:</strong> If an investor suffers a severe market crash (-20% to -35%) immediately upon retiring while liquidating $50,000+ annually for living expenses, they sell heavily depressed equities, permanently destroying capital recovery capacity.</li>
            <li><strong>The Cash Buffer Defense:</strong> Maintaining a 2- to 3-year cash and short-term bond bucket prevents the need to sell equities during market corrections, allowing equity holdings time to recover.</li>
            <li><strong>Dynamic Withdrawal Strategies (Guyton-Klinger Rules):</strong> Temporarily foregoing annual inflation increases during negative market years dramatically boosts 30-year portfolio survival rates.</li>
          </ul>

          <h2>Healthcare &amp; Medicare Considerations (IRMAA Surcharges)</h2>
          <p>
            Retirees must account for healthcare costs, which average over $315,000 for a retired 65-year-old couple according to Fidelity research:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Medicare Part B and Part D Premiums:</strong> Deducted directly from Social Security benefit checks.</li>
            <li><strong>IRMAA Surcharges:</strong> If Modified Adjusted Gross Income (MAGI) exceeds statutory thresholds ($103,000 single, $206,000 married in 2024), retirees incur income-related monthly adjustment surcharges on Medicare premiums.</li>
            <li><strong>HSA Rollover Advantages:</strong> Health Savings Accounts (HSAs) can be spent 100% tax-free on qualified medical expenses, Medicare premiums, and long-term care insurance.</li>
          </ul>

          <h2>4 Crucial Steps for Long-Term Retirement Solvency</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Delay Social Security to Age 70:</strong> Claiming benefits at age 70 rather than age 62 increases guaranteed monthly payout checks by 76% to 77%, creating a permanent inflation-adjusted annuity floor.
            </li>
            <li>
              <strong>Execute Roth Conversions in Low-Income Years:</strong> Convert traditional 401(k) assets to Roth accounts between retirement and age 73 (before Required Minimum Distributions begin) to minimize lifetime taxes.
            </li>
            <li>
              <strong>Adopt a Rising Equity Glidepath:</strong> Modern actuarial studies show that starting retirement with a conservative allocation (50/50 stocks/bonds) and gradually increasing equity exposure over retirement minimizes sequence risk.
            </li>
            <li>
              <strong>Eliminate Mortgage Debt Prior to Retirement:</strong> Entering retirement mortgage-free slashes mandatory baseline living costs, lowering the required safe withdrawal rate.
            </li>
          </ol>

          <h2>Essential Retirement Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Safe Withdrawal Rate (SWR):</strong> The percentage of retirement portfolio value that can be withdrawn in year one and adjusted for inflation annually without depleting capital.</li>
            <li><strong>Required Minimum Distribution (RMD):</strong> Mandatory annual withdrawals from traditional pre-tax retirement accounts required by the IRS starting at age 73.</li>
            <li><strong>Glidepath:</strong> The scheduled asset allocation trajectory adjusting the stock-to-bond ratio before and during retirement.</li>
            <li><strong>Annuity Floor:</strong> Guaranteed lifetime monthly income from Social Security, pensions, and fixed annuities covering baseline living expenses.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement &amp; Tax Solvers</h3>
            <p>
              Maximize employer match benefits via our <a href="/calculators/finance/401k-calculator">401(k) Calculator</a>, evaluate tax-free retirement growth with the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, project claiming age benefits using the <a href="/calculators/finance/social-security-calculator">Social Security Calculator</a>, and model multi-decade compounding using the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the 4% rule in retirement planning?",
          a: "The 4% rule originated from the 1998 Trinity Study. It states that an investor who withdraws 4% of their retirement portfolio in their first year of retirement, and adjusts that dollar amount annually for inflation, has a 95%+ probability of having capital left after 30 years.",
        },
        {
          q: "How much money do I need to retire comfortably?",
          a: "Most financial planners suggest replacing 70% to 80% of your pre-retirement annual income. Under the 4% rule, if you need $60,000 per year from your portfolio (beyond Social Security), you will need a target nest egg of $1,500,000 ($60,000 ÷ 0.04).",
        },
        {
          q: "What is sequence of returns risk?",
          a: "Sequence of returns risk is the danger of experiencing a major market downturn in the first few years of retirement. Liquidating depressed stocks to fund living expenses permanently impairs portfolio capital, drastically increasing the odds of running out of money.",
        },
        {
          q: "When must I start taking Required Minimum Distributions (RMDs)?",
          a: "Under the federal SECURE 2.0 Act, RMDs must begin by April 1 of the year following the year you turn age 73 (rising to age 75 in 2033). Failing to withdraw your full RMD triggers a 25% IRS excise tax penalty on the shortfall.",
        },
        {
          q: "Should early retirees (FIRE) use a 4% withdrawal rate?",
          a: "No. The 4% rule was modeled for traditional 30-year retirements. Individuals retiring early at age 40 or 50 facing 40 to 50-year retirement horizons should utilize a more conservative safe withdrawal rate between 3.25% and 3.50% to prevent capital exhaustion.",
        },
        {
          q: "How does inflation affect my retirement portfolio?",
          a: "Inflation erodes the purchasing power of fixed income and cash. Over a 25-year retirement at 3% annual inflation, consumer prices double, meaning an initial $60,000 budget requires $125,000 in nominal dollars, making equity exposure necessary.",
        },
        {
          q: "Can I work part-time in retirement without losing Social Security?",
          a: "If you have reached Full Retirement Age (FRA, currently age 67), you can earn unlimited income without any reduction in Social Security benefits. If you claim before FRA, earning above statutory annual limits reduces current benefits by $1 for every $2 earned.",
        },
        {
          q: "What is a bucket strategy for retirement withdrawals?",
          a: "The bucket strategy divides wealth into three pools: Bucket 1 holds 1 to 2 years of living expenses in cash/HYSA; Bucket 2 holds 3 to 7 years in fixed-income bonds; Bucket 3 holds long-term equities for growth, preventing forced selling during bear markets.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/roth-ira-calculator", icon: "💎", name: "Roth IRA Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/social-security-calculator", icon: "👵", name: "Social Security Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/investment-calculator", icon: "📈", name: "Investment Return Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
