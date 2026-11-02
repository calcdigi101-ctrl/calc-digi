import Calculator from "@/components/calcs/finance/investment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InvestmentPortfolioHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/investment-calculator";
const TITLE = "Investment Calculator – Portfolio Growth, Real Returns & Asset Allocation | CalcDigi";
const DESCRIPTION =
  "Free investment calculator: project portfolio growth from initial capital and monthly contributions across stocks, bonds, and index funds. Model nominal vs. inflation-adjusted real returns and asset allocation tiers.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Investment Calculator"
      intro="Project long-term portfolio accumulation across custom asset allocations. Model starting principal, monthly dollar-cost averaging, nominal annual returns, and real inflation-adjusted purchasing power."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV = PV*(1 + r)^t + PMT * [((1 + r)^t - 1) / r]"
      article={
        <>
          <h2>Direct Answer: How Does Portfolio Compounding &amp; Dollar-Cost Averaging Work?</h2>
          <p>
            An <strong>investment portfolio growth projection</strong> models the simultaneous expansion of an initial lump-sum seed capital and ongoing periodic contributions (dollar-cost averaging). Unlike fixed-interest bank accounts, market investments fluctuate; however, over multi-decade horizons, diversified capital markets (such as the S&amp;P 500 or global equity indexes) have historically compounded at real returns significantly above inflation. Real purchasing power is derived by discounting projected nominal future value by expected cumulative inflation.
          </p>

          <Formula>FV = PV × (1 + r_eff)^t + PMT × [((1 + r_eff)^t − 1) ÷ r_eff]</Formula>
          <p>
            Where:
            <br />• <strong>FV</strong> = Future portfolio balance ($)
            <br />• <strong>PV</strong> = Initial starting seed principal ($)
            <br />• <strong>r_eff</strong> = Effective annual rate of return converted to monthly compounding: (1 + r)^(1/12) − 1
            <br />• <strong>t</strong> = Investment duration in periods (Months = Years × 12)
            <br />• <strong>PMT</strong> = Monthly recurring contribution deposit ($)
          </p>

          <InvestmentPortfolioHorizonChart />

          <h2>Asset Class Historical Return Benchmarks &amp; Real Purchasing Power</h2>
          <p>
            The table below reflects historical annualized return benchmarks (1926–2025 long-run data) across diversified asset allocations, illustrating how aggressive equity exposure outperforms inflation over a 25-year accumulation timeframe ($10,000 start + $500/mo):
          </p>

          <DataTable
            head={["Asset Allocation Strategy", "Historical Nominal Return", "Real Return (Net of 2.8% Infl.)", "25-Year Nominal Value", "25-Year Real Purchasing Power"]}
            rows={[
              ["Aggressive Equities (100% S&P 500 / Total Stock)", "10.2%", "7.4%", "$722,000", "$364,500"],
              ["Balanced Growth (80% Equity / 20% Fixed Income)", "8.6%", "5.8%", "$565,400", "$285,500"],
              ["Classic Balanced (60% Equity / 40% Bonds)", "7.2%", "4.4%", "$452,600", "$228,600"],
              ["Conservative Income (30% Equity / 70% Bonds)", "5.5%", "2.7%", "$347,800", "$175,700"],
              ["Cash Equivalents & Short T-Bills", "3.4%", "0.6%", "$249,100", "$125,800"],
            ]}
          />

          <h2>Core Principles of Prudent Portfolio Accumulation</h2>
          <ul>
            <li>
              <strong>Eliminate Management Fee Drag:</strong> An expense ratio difference of just 1.00% (typical of actively managed mutual funds vs. 0.03% low-cost index funds) can erode upwards of 25% to 30% of your terminal portfolio value over a 30-year investing lifecycle.
            </li>
            <li>
              <strong>Maintain Uninterrupted Dollar-Cost Averaging:</strong> Investing a fixed sum monthly regardless of market headlines forces you to acquire more index units during temporary market downturns, mathematically driving down your average cost per share.
            </li>
            <li>
              <strong>Prioritize Tax-Sheltered Accounts First:</strong> Maximize tax-advantaged accounts (401(k), Roth IRA, HSA) before funding taxable brokerage accounts to protect dividends and long-term capital gains from ongoing annual tax friction.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Wealth &amp; Capital Market Solvers</h3>
            <p>
              Disciplined long-term investing turns steady monthly surplus into financial independence. Model exponential interest schedules with the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, evaluate individual stock gains via the <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, model workplace retirement matches using the <a href="/calculators/finance/401k-calculator">401(k) Calculator</a>, and model tax-free retirement compounding with the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between nominal returns and real returns?",
          a: "Nominal return is the raw percentage gain generated by your investments on paper before considering changes in purchasing power. Real return subtracts inflation from nominal return, representing the true increase in goods and services your money can buy.",
        },
        {
          q: "How does this differ from the compound interest calculator?",
          a: "While both employ exponential growth formulas, the Investment Calculator accounts for asset allocation return variations, continuous dollar-cost averaging, and inflation-discounted terminal values, whereas the compound interest calculator focuses on nominal fixed interest and bank compounding frequency.",
        },
        {
          q: "What is 'Sequence of Returns Risk'?",
          a: "Sequence of returns risk refers to the danger that market downturns occur in the early years of withdrawing funds during retirement. In the wealth accumulation phase, market drops actually help investors by allowing them to buy index shares at discount prices.",
        },
        {
          q: "Does this calculation include taxes on dividends and capital gains?",
          a: "The calculations represent gross returns. In tax-sheltered accounts (401(k), Traditional IRA, Roth IRA, 529), growth compounds without annual tax drag. In standard taxable accounts, capital gains and dividends are subject to federal and state capital gains tax rates upon realization.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
