import Calculator from "@/components/calcs/finance/net-worth-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NetWorthAssetLiabilityDecompositionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/net-worth-calculator";
const TITLE = "Net Worth Calculator";
const DESCRIPTION =
  "Free net worth calculator: calculate personal balance sheet net worth, liquid vs. fixed assets, debt-to-asset ratios, and Stanley-Danko wealth accumulation.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator (PITI & Amortization)" },
        { href: "https://www.calcdigi.com/calculators/finance/loan-calculator", icon: "💰", name: "Loan Payment Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan Payment Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff Calculator" },
      ]} title="Net Worth Calculator"
      intro="Calculate your exact financial net worth. Inventory liquid investments, retirement accounts, physical real estate, and subtract mortgages, auto loans, and revolving liabilities."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Worth} = \sum (\text{Assets}) - \sum (\text{Liabilities})"
      article={
        <>
          <h2>Direct Answer: What Is Net Worth &amp; Why Is It the Ultimate Financial Scorecard?</h2>
          <p>
            Your <strong>financial net worth</strong> is the definitive metric of personal balance sheet wealth. Calculated as the total fair market value of everything you own (<strong>Assets</strong>) minus everything you owe to creditors (<strong>Liabilities</strong>), net worth measures accumulated solvency rather than cosmetic gross income.
          </p>
          <p>
            A high-income earner who spends 100% of their earnings on luxury consumption can carry a negative net worth, while a modest earner with disciplined savings and compounding investments can amass multi-millionaire status. Tracking net worth over time ensures that career earnings are successfully converted into enduring family assets.
          </p>

          <NetWorthAssetLiabilityDecompositionChart />

          <h2>Actuarial Mathematics: Personal Balance Sheet &amp; Wealth Expected Value</h2>
          <p>
            Net worth is derived by categorizing and summing all financial assets and deducting total outstanding liabilities:
          </p>

          <Formula>{"\text{Net Worth } (NW) = \left( A_{\text{liquid}} + A_{\text{invested}} + A_{\text{fixed}} \right) - \left( L_{\text{revolving}} + L_{\text{installment}} + L_{\text{mortgage}} \right)"}</Formula>
          <p>
            Where:
            <br />&bull; <strong>Liquid Assets:</strong> Cash, checking accounts, high-yield savings (HYSA), money market funds
            <br />&bull; <strong>Invested Assets:</strong> Taxable brokerage accounts, 401(k), Roth IRAs, HSAs, mutual funds, crypto
            <br />&bull; <strong>Fixed/Physical Assets:</strong> Primary residence real estate value, rental properties, vehicles (fair market value)
            <br />&bull; <strong>Liabilities:</strong> Credit card balances, personal installment loans, auto loan notes, student debt, home mortgages
          </p>
          <p>
            In their seminal wealth research published in <em>The Millionaire Next Door</em>, Dr. Thomas Stanley and Dr. William Danko established the <strong>Expected Net Worth Benchmark</strong>:
          </p>
          <Formula>{"\text{Expected Net Worth} = \frac{\text{Current Age} \times \text{Gross Realized Annual Household Income}}{10}"}</Formula>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>PAW (Prodigious Accumulator of Wealth):</strong> Net worth is at least <strong>twice (2.0x)</strong> the expected benchmark.</li>
            <li><strong>AAW (Average Accumulator of Wealth):</strong> Net worth approximately matches (1.0x) the expected benchmark.</li>
            <li><strong>UAW (Under Accumulator of Wealth):</strong> Net worth is less than <strong>half (0.5x)</strong> the expected benchmark.</li>
          </ul>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a <strong>40-year-old individual earning $120,000 annually</strong> compiling their comprehensive personal balance sheet:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Inventory Total Assets.</strong>
              <br />Liquid Cash (Checking + Emergency HYSA): $30,000
              <br />Invested Retirement Accounts (401k + Roth IRA): $220,000
              <br />Taxable Brokerage Portfolio: $50,000
              <br />Primary Residence Market Value: $450,000
              <br />Automobiles (Current Resale Value): $25,000
              <br /><em>Total Gross Assets = $30,000 + $220,000 + $50,000 + $450,000 + $25,000 = $775,000.</em>
            </li>
            <li>
              <strong>Step 2: Inventory Total Liabilities.</strong>
              <br />Mortgage Principal Balance: $320,000
              <br />Auto Loan Balance: $12,000
              <br />Student Loan Debt: $15,000
              <br />Credit Card Monthly Revolving Statement Balance: $3,000
              <br /><em>Total Liabilities = $320,000 + $12,000 + $15,000 + $3,000 = $350,000.</em>
            </li>
            <li>
              <strong>Step 3: Derive Personal Net Worth.</strong>
              <br />Net Worth = Total Assets ($775,000) &minus; Total Liabilities ($350,000) = <strong>$425,000</strong>.
            </li>
            <li>
              <strong>Step 4: Compute Stanley-Danko Benchmark.</strong>
              <br />Expected Net Worth = (40 &times; $120,000) / 10 = $480,000.
              <br />Wealth Accumulation Ratio = $425,000 / $480,000 = <strong>0.885 (Solid AAW status approaching parity)</strong>.
            </li>
          </ol>

          <h2>Net Worth Percentiles by Age Bracket in the United States</h2>
          <p>
            Federal Reserve Survey of Consumer Finances (SCF) data illustrates the distribution of household net worth across age cohorts. Because ultra-high-net-worth outliers skew average net worth dramatically upward, <strong>median net worth</strong> represents the true middle benchmark:
          </p>

          <DataTable
            head={["Age Bracket", "Median Net Worth", "75th Percentile", "90th Percentile (Top 10%)", "Average Net Worth"]}
            rows={[
              ["Under 35", "$39,000", "$140,000", "$320,000", "$183,000"],
              ["35 – 44", "$135,000", "$410,000", "$890,000", "$549,000"],
              ["45 – 54", "$247,000", "$750,000", "$1,780,000", "$975,000"],
              ["55 – 64", "$364,000", "$1,120,000", "$2,640,000", "$1,566,000"],
              ["65 – 74", "$409,000", "$1,350,000", "$3,200,000", "$1,794,000"],
              ["75 and Older", "$335,000", "$1,080,000", "$2,700,000", "$1,624,000"]
            ]}
          />

          <h2>Liquid Net Worth vs. Total Net Worth</h2>
          <p>
            A critical analytical distinction in private wealth management is between <strong>Total Net Worth</strong> and <strong>Liquid Net Worth</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Total Net Worth:</strong> Encompasses all illiquid physical property including personal residence equity, private partnership shares, jewelry, and vehicles. While legally solvency-positive, these assets cannot be quickly deployed to cover medical crises or invest during market crashes without significant transaction friction (such as 6% real estate realtor commissions).
            </li>
            <li>
              <strong>Liquid Net Worth:</strong> Calculated as Cash + Checking + Savings + Taxable Brokerage + Readily Liquidated Equities minus all short-term liabilities. Liquid net worth reflects your financial runway and true risk absorption capacity during economic downturns.
            </li>
          </ul>

          <h2>Debt-to-Asset Ratio &amp; Solvency Health Checks</h2>
          <p>
            Monitoring structural balance sheet leverage prevents catastrophic insolvency. The <strong>Debt-to-Asset (D/A) Ratio</strong> is calculated as:
          </p>
          <Formula>{"\text{Debt-to-Asset Ratio} = \frac{\text{Total Liabilities}}{\text{Total Assets}} \times 100\%"}</Formula>

          <DataTable
            head={["Debt-to-Asset Tier", "Ratio Range", "Solvency Risk", "Strategic Balance Sheet Action"]}
            rows={[
              ["Overleveraged", "> 80%", "High / Vulnerable", "Aggressively halt borrowing; attack high-interest unsecured credit lines."],
              ["Moderate Leverage", "40% – 79%", "Acceptable / Typical", "Common during early homeownership; pay down amortizing principal steadily."],
              ["Strong Solvency", "20% – 39%", "Low Risk", "Robust financial stability; optimize tax-advantaged investment allocations."],
              ["Fortress Balance Sheet", "< 20%", "Negligible Risk", "High liquid independence; focus on estate planning and capital preservation."]
            ]}
          />

          <h2>Essential Net Worth Terminology</h2>
          <p>
            Mastering core personal balance sheet accounting terms:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Fair Market Value (FMV):</strong> The realistic cash price an asset would sell for in an arm&rsquo;s-length transaction on the open market.</li>
            <li><strong>Depreciating Asset:</strong> An asset that declines in economic value over time due to wear, tear, or obsolescence, such as motor vehicles and consumer electronics.</li>
            <li><strong>Appreciating Asset:</strong> Productive capital that increases in monetary value over long horizons, such as diversified public equities, index funds, and prime real estate.</li>
            <li><strong>Unsecured Liability:</strong> Debt not backed by collateral, including credit card balances and medical debt, carrying higher default interest penalties.</li>
            <li><strong>Secured Liability:</strong> Debt tied directly to pledged property, such as a mortgage or auto loan, permitting creditor repossession upon default.</li>
          </ul>

          <h3>Related Wealth Accumulation &amp; Debt Solvers</h3>
          <p>
            Complement your net worth audit with our specialized solvers: model retirement accumulation with the <a href="/calculators/finance/retirement-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Retirement Calculator</a>, plan debt elimination using the <a href="/calculators/finance/debt-payoff-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Debt Payoff Calculator</a>, track compound growth via the <a href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Compound Interest Calculator</a>, and calibrate monthly cash flow allocations with our <a href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Budget Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the exact mathematical difference between net worth and liquid net worth?",
          a: "Total net worth includes all balance sheet assets (real estate, motor vehicles, privately held business equity, jewelry) minus all liabilities. Liquid net worth strictly counts readily convertible cash and tradeable paper securities (checking, high-yield savings, money market funds, brokerage stocks, ETFs) minus short-term debt, completely excluding illiquid physical real estate equity, automobiles, and restricted private holdings."
        },
        {
          q: "Should I include my primary residence home equity in my personal net worth calculation?",
          a: "For a comprehensive solvency balance sheet, yes: include the conservative fair market value of your residence minus your remaining mortgage balance. However, for retirement drawdown planning, financial planners frequently exclude primary residence equity because you cannot spend house bricks to buy groceries without executing a reverse mortgage or downsizing."
        },
        {
          q: "How often should I inventory my balance sheet and update my net worth?",
          a: "A quarterly or semi-annual cadence is ideal for most households. Updating monthly creates unnecessary stress due to normal stock market price volatility, whereas an annual or quarterly review provides clean trend lines to verify that debt is declining and invested assets are compounding sustainably."
        },
        {
          q: "What is the Stanley-Danko Expected Net Worth formula?",
          a: "In The Millionaire Next Door, researchers Dr. Thomas Stanley and Dr. William Danko defined expected wealth as: Expected Net Worth = (Age x Realized Annual Gross Household Income) / 10. Accumulating double this target makes you a Prodigious Accumulator of Wealth (PAW), while holding under half designates an Under Accumulator of Wealth (UAW)."
        },
        {
          q: "Is having a negative net worth normal in your twenties or early thirties?",
          a: "Yes. Recent college graduates, medical residents, and young professionals frequently carry student loan obligations and entry-level vehicle financing before their income-producing assets have had time to compound. A negative net worth becomes problematic only if revolving consumer credit card debt expands rather than amortizing downward."
        },
        {
          q: "Does paying down low-interest debt increase net worth faster than stock investing?",
          a: "Paying down debt and investing in equities both increase net worth. Paying off debt provides a guaranteed, after-tax return equal to the loan interest rate. If your expected diversified index investment return exceeds your after-tax debt interest rate, allocating surplus cash to equity index funds mathematically yields higher terminal net worth over long horizons."
        },
        {
          q: "How do pensions and anticipated Social Security benefits factor into personal net worth?",
          a: "Traditional defined-benefit pensions and Social Security are future cash flow income annuities rather than marketable capital assets. While they reduce the lump sum nest egg required to fund retirement, standard accounting excludes them from personal balance sheet net worth because they cannot be liquidated, pledged as collateral, or inherited."
        },
        {
          q: "What constitutes a healthy debt-to-asset ratio across different life stages?",
          a: "In your twenties and thirties, a debt-to-asset ratio between 40% and 60% is common due to new mortgages and student loans. By ages forty to fifty, prudent financial guidelines recommend reducing this ratio below 30%. Entering retirement, a target debt-to-asset ratio below 10% (or zero debt) dramatically minimizes sequence of returns risk."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
