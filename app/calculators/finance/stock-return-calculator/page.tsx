import Calculator from "@/components/calcs/finance/stock-return-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { StockTotalReturnVsCpiChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/stock-return-calculator";
const TITLE = "Stock Return Calculator – Total Return, Annualized CAGR, Dividends & Capital Gains Tax | CalcDigi";
const DESCRIPTION =
  "Free stock return calculator: calculate total investment return, annualized CAGR, capital gains, cash dividends received, transaction commissions, and net profit after federal capital gains taxes.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Stock Return Calculator"
      intro="Calculate your true total equity performance, annualized Compound Annual Growth Rate (CAGR), cash dividend income, and net after-tax return accounting for trading commissions and capital gains tax brackets."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="TotalReturn = ((EndingValue - StartingCost + Dividends - Fees - Tax) / StartingCost) * 100"
      article={
        <>
          <h2>Direct Answer: What Is Total Stock Return &amp; Why Must Dividends Be Included?</h2>
          <p>
            An equity holding&rsquo;s <strong>Total Return</strong> reflects the comprehensive financial return realized by an investor, encompassing both <strong>capital appreciation</strong> (the change in market share price between purchase and sale) and <strong>dividend cash distributions</strong> paid out during the holding period, minus transaction commissions and applicable capital gains taxes. Evaluating equity performance strictly by share price appreciation significantly understates performance; over long multi-decade holding periods, reinvested corporate dividends historically account for approximately <strong>40% to 50% of the total cumulative return of the S&amp;P 500</strong>.
          </p>

          <Formula>Total Return (%) = [(Sale Value − Cost Basis + Cash Dividends − Fees − Tax) ÷ Cost Basis] × 100</Formula>
          <Formula>Annualized CAGR (%) = [(Ending Gross Portfolio Value ÷ Initial Purchase Cost)^(1 ÷ Years) − 1] × 100</Formula>
          <p>
            Where:
            <br />• <strong>Cost Basis:</strong> Total initial capital spent (Share Count × Purchase Price + Buy Commissions)
            <br />• <strong>Sale Value:</strong> Total liquidation gross proceeds (Share Count × Sale Price − Sell Commissions)
            <br />• <strong>Dividends:</strong> Total un-reinvested cash dividend distributions received over the holding tenure
            <br />• <strong>CAGR:</strong> The steady geometric annual return rate required to grow initial cost basis to terminal value
          </p>

          <StockTotalReturnVsCpiChart />

          <h2>Federal Capital Gains Tax Rate Thresholds &amp; Holding Periods</h2>
          <p>
            The table below reflects current federal tax treatment on realized capital gains derived from public equity sales:
          </p>

          <DataTable
            head={["Holding Period Horizon", "Tax Classification", "Statutory Federal Tax Rate", "Applicable Income Thresholds (Single / Married)"]}
            rows={[
              ["1 Year or Less (≤ 365 Days)", "Short-Term Capital Gain", "Ordinary Income Tax (10% to 37%)", "Taxed at your top marginal income tax bracket"],
              ["More Than 1 Year (> 365 Days)", "Long-Term Capital Gain (0% Tier)", "0.0% Federal Tax", "Single: Up to $48,350 / Married: Up to $96,700"],
              ["More Than 1 Year (> 365 Days)", "Long-Term Capital Gain (15% Tier)", "15.0% Federal Tax", "Single: $48,351–$533,400 / Married: $96,701–$600,050"],
              ["More Than 1 Year (> 365 Days)", "Long-Term Capital Gain (20% Tier)", "20.0% Federal Tax", "Single: Over $533,400 / Married: Over $600,050"],
              ["High-Earner Net Investment Income", "NIIT Surtax (Section 1411)", "+3.8% Surtax on Net Investment Income", "Single MAGI > $200,000 / Married MAGI > $250,000"],
            ]}
          />

          <h2>Core Equity Performance Principles &amp; Accounting Adjustments</h2>
          <ul>
            <li>
              <strong>Stock Splits &amp; Corporate Spinoffs:</strong> Always utilize split-adjusted share counts. If a stock undergoes a 3-for-1 forward split, your share count triples while your per-share purchase cost basis divides by 3; your total invested dollars remain unchanged.
            </li>
            <li>
              <strong>Wash-Sale Rule (IRC Section 1091):</strong> If you sell an equity at a loss and repurchase substantially identical stock within 30 days before or after the sale, the IRS disallows the tax loss deduction, rolling the loss into the cost basis of the newly acquired shares.
            </li>
            <li>
              <strong>Tax-Loss Harvesting:</strong> Realized capital losses can fully offset realized capital gains dollar-for-dollar, and up to $3,000 of net excess losses per calendar year can offset ordinary earned salary income on Form 1040.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Equities &amp; Total Return Solvers</h3>
            <p>
              Measuring total stock returns requires factoring in both capital appreciation and dividend yields. Model passive dividend reinvestment growth with our <a href="/calculators/finance/dividend-calculator">Dividend Calculator</a>, simulate multi-decade portfolio growth using the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, analyze capital ROI benchmarks via the <a href="/calculators/finance/roi-calculator">ROI Calculator</a>, and structure long-term wealth targets with our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between Return on Investment (ROI) and Compound Annual Growth Rate (CAGR)?",
          a: "ROI represents the cumulative total percentage increase over the entire life of the investment regardless of time. CAGR converts that cumulative total into a standardized, smoothed annualized geometric return rate, allowing direct apples-to-apples comparison between investments held for different numbers of years.",
        },
        {
          q: "How do I account for reinvested dividends in a stock return calculation?",
          a: "If your dividends were enrolled in an automated Dividend Reinvestment Plan (DRIP), the dividend payouts were already used to purchase additional shares. Those additional shares are already included in your final ending share count; entering those dividends again as cash would double-count them. Only enter cash dividends distributed directly to your brokerage settlement account.",
        },
        {
          q: "What is a stock's 'Cost Basis'?",
          a: "Cost basis is the original purchase price paid for an asset plus all allowable transaction fees and brokerage commissions. When calculating capital gains taxes upon selling, your cost basis is subtracted from gross sale proceeds to determine net taxable profit.",
        },
        {
          q: "Does holding an equity in a Roth IRA eliminate capital gains taxes?",
          a: "Yes. In a Roth IRA, all realized capital gains, stock trading profits, and dividend distributions are 100% exempt from federal and state capital gains taxes. When you take qualified distributions in retirement (after age 59½ and 5 years), all withdrawals are completely tax-free.",
        },
      ]}
      related={[
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI Calculator" },
        { href: "/calculators/finance/dividend-calculator", icon: "💵", name: "Dividend" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/crypto-profit-calculator", icon: "🪙", name: "Crypto Profit" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
