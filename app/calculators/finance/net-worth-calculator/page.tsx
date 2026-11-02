import Calculator from "@/components/calcs/finance/net-worth-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NetWorthAssetLiabilityDecompositionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/net-worth-calculator";
const TITLE = "Net Worth Calculator – Personal Balance Sheet, Assets, Liabilities & Age Medians | CalcDigi";
const DESCRIPTION =
  "Free net worth calculator: calculate your true personal net worth by summing liquid, invested, and real estate assets minus outstanding debts. Compare your net worth against Federal Reserve Survey of Consumer Finances age medians.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Net Worth Calculator"
      intro="Calculate your true personal net worth by cataloging total asset holdings against all outstanding liabilities. Compare your financial balance sheet against official Federal Reserve demographic age benchmarks."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="NetWorth = TotalAssets - TotalLiabilities"
      article={
        <>
          <h2>Direct Answer: What Is Net Worth &amp; How Is Personal Balance Sheet Equity Calculated?</h2>
          <p>
            In personal financial accounting, your <strong>net worth</strong> is the fundamental metric of total accumulated wealth, representing what would remain in cash if you liquidated everything you owned today at fair market value and paid off all outstanding debts and credit obligations. It is governed by the classic corporate balance sheet accounting identity: <strong>Total Assets minus Total Liabilities equals Net Equity</strong>. Tracking net worth over time eliminates the optical illusions of high income; a household earning $250,000 with $300,000 in consumer debt has a lower financial solvency score than a household earning $65,000 with zero debt and $100,000 in invested index funds.
          </p>

          <Formula>Net Worth = Total Assets (Liquid + Invested + Real Estate) − Total Liabilities (Mortgages + Loans + Cards)</Formula>
          <p>
            Where:
            <br />• <strong>Liquid Assets:</strong> Cash checking accounts, high-yield savings (HYSA), money market funds, and Treasury bills
            <br />• <strong>Invested Assets:</strong> 401(k), Traditional IRA, Roth IRA, taxable brokerage shares, and business equity
            <br />• <strong>Real Assets:</strong> Primary residential real estate, investment property, and conservative vehicle resale value
            <br />• <strong>Liabilities:</strong> Mortgages, home equity lines of credit (HELOC), auto loans, student loans, medical debt, and revolving credit card balances
          </p>

          <NetWorthAssetLiabilityDecompositionChart />

          <h2>Federal Reserve Median vs. Average Net Worth by Age Tier</h2>
          <p>
            According to the Federal Reserve&rsquo;s official <em>Survey of Consumer Finances (SCF)</em>, wealth exhibits steep right-tail skewness (wealthy billionaires inflate the statistical average). The <strong>median</strong> reflects the true 50th percentile midpoint benchmark:
          </p>

          <DataTable
            head={["Age of Primary Earner", "Median Net Worth (50th %)", "Average Net Worth (Mean)", "Top 10% Wealth Tier (90th %)"]}
            rows={[
              ["Under 35 Years", "$39,000", "$183,500", "$445,000+"],
              ["Ages 35 to 44", "$135,600", "$549,600", "$1,270,000+"],
              ["Ages 45 to 54", "$247,200", "$975,800", "$2,450,000+"],
              ["Ages 55 to 64", "$364,500", "$1,566,900", "$3,780,000+"],
              ["Ages 65 to 74", "$409,900", "$1,794,600", "$4,100,000+"],
              ["Ages 75 and Older", "$335,600", "$1,624,100", "$3,550,000+"],
            ]}
          />

          <h2>Core Levers to Accelerate Net Worth Expansion</h2>
          <ul>
            <li>
              <strong>Liquid Net Worth vs. Total Net Worth:</strong> Many homeowners are &ldquo;house rich and cash poor&rdquo;. Calculating your <em>Liquid Net Worth</em> (excluding illiquid primary home equity) reveals your actual financial runway to survive emergencies without having to sell your house.
            </li>
            <li>
              <strong>Aggressive High-Interest Liability Payoff:</strong> Paying off an 18% APR credit card or 9% student loan delivers an immediate, 100% risk-free return on capital that expands your balance sheet equity dollar-for-dollar.
            </li>
            <li>
              <strong>Depreciating Asset Traps:</strong> Consumer vehicles, electronics, and boats depreciate 15%–20% annually. Financing depreciating assets with high-interest loans creates negative equity (&ldquo;underwater&rdquo; debt) that drags down net worth.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Balance Sheet &amp; Wealth Tracking Solvers</h3>
            <p>
              Your personal net worth is the ultimate scorecard of your overall financial health. Structure monthly cash-flow allocations with our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, track diversified capital growth via the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, accelerate liability reduction with the <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>, and target your golden years nest egg using our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What should I do if my net worth is currently negative?",
          a: "A negative net worth is extremely common for young adults and recent graduates who hold substantial student loan debt or early vehicle financing before accumulating significant home equity or retirement savings. Focus on establishing a $2,000 emergency fund, eliminating toxic debt, and capturing full employer 401(k) matches to reverse the trajectory.",
        },
        {
          q: "Should I include personal property like jewelry, furniture, and clothing in net worth?",
          a: "Generally no. Conservative personal financial accounting excludes used furniture, personal electronics, and clothing because their actual liquidation value on the secondary market is minimal and depreciates rapidly. Only include items with certified independent appraisal value (e.g., precious metals or rare art).",
        },
        {
          q: "How often should I recalculate my net worth?",
          a: "Calculating net worth once per quarter or twice per calendar year (e.g., January 1 and July 1) is ideal. Monthly calculations can create unnecessary anxiety from normal short-term stock market volatility; long-term multi-year directional momentum is what matters.",
        },
        {
          q: "How does paying down a mortgage increase net worth?",
          a: "Every monthly mortgage payment consists of interest (an expense) and principal repayment. The principal portion directly reduces your outstanding mortgage liability on the balance sheet, transferring debt into pure homeowner equity and increasing net worth.",
        },
      ]}
      related={[
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
