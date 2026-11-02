import Calculator from "@/components/calcs/finance/dividend-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DividendReinvestmentDripCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/dividend-calculator";
const TITLE = "Dividend Calculator – DRIP Reinvestment, Yield on Cost & Growth | CalcDigi";
const DESCRIPTION =
  "Free dividend calculator: calculate passive dividend income, portfolio growth with DRIP (dividend reinvestment plans), annual dividend growth rate, and qualified dividend tax drag over 1 to 30 years.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Dividend Calculator"
      intro="Project your passive dividend cash flows and total portfolio valuation over time. Model the compounding power of automated dividend reinvestment (DRIP), annual dividend dividend hikes, and tax liabilities."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="DY = (DPS / SharePrice) * 100"
      article={
        <>
          <h2>Direct Answer: What Is a Dividend Reinvestment Plan (DRIP) &amp; How Does It Compound?</h2>
          <p>
            A <strong>Dividend Reinvestment Plan (DRIP)</strong> automatically converts corporate cash distributions into additional full and fractional shares of the underlying stock or exchange-traded fund (ETF) rather than paying cash out to your brokerage balance. This establishes a dual-compounding engine: in each successive quarter, dividend payments are distributed across an ever-larger base of acquired shares, while underlying companies concurrently increase their per-share dividend payout rate. Over extended multi-decade horizons, reinvested dividends have accounted for approximately <strong>84% of the total cumulative return</strong> of the S&amp;P 500.
          </p>

          <Formula>Dividend Yield = (Annual Dividends per Share ÷ Current Share Price) × 100</Formula>
          <Formula>Yield on Cost (YoC) = (Current Annual Dividend per Share ÷ Original Purchase Price) × 100</Formula>
          <p>
            Where:
            <br />• <strong>Dividend Yield:</strong> Instantaneous cash flow return based on current market pricing
            <br />• <strong>Payout Ratio:</strong> Annual Dividends per Share ÷ Earnings per Share (EPS) — ratios under 60% indicate sustainable distribution safety
            <br />• <strong>Yield on Cost:</strong> The effective cash yield on your initial out-of-pocket investment dollars, which can easily surpass 10%–20% after years of corporate dividend hikes
          </p>

          <DividendReinvestmentDripCurveChart />

          <h2>DRIP Compounding vs. Cash Payout Horizon Benchmark: $25,000 Portfolio</h2>
          <p>
            The table below contrasts terminal wealth between reinvesting dividends (DRIP) versus taking cash distributions, modeled on an initial $25,000 portfolio with a 3.5% initial yield, 6.0% annual dividend growth, and 4.0% share price appreciation:
          </p>

          <DataTable
            head={["Horizon Duration", "Cash Payouts Taken (Portfolio / Total Cash)", "DRIP Reinvested Portfolio Value", "DRIP Annual Income Produced", "Yield on Cost (YoC)"]}
            rows={[
              ["5 Years", "$33,400 / $5,200 Cash", "$39,500", "$1,410 / yr", "5.6% YoC"],
              ["10 Years", "$44,800 / $12,200 Cash", "$65,100", "$2,480 / yr", "9.9% YoC"],
              ["15 Years", "$60,100 / $21,600 Cash", "$111,400", "$4,530 / yr", "18.1% YoC"],
              ["20 Years", "$80,600 / $34,300 Cash", "$196,800", "$8,540 / yr", "34.1% YoC"],
              ["25 Years", "$108,100 / $51,200 Cash", "$358,200", "$16,560 / yr", "66.2% YoC"],
            ]}
          />

          <h2>Dividend Taxation: Qualified vs. Non-Qualified Ordinary Dividends</h2>
          <ul>
            <li>
              <strong>Qualified Dividends:</strong> Distributed by US corporations or qualified foreign firms where shares are held unhedged for more than 60 days during the 121-day window surrounding the ex-dividend date. Taxed at favorable federal long-term capital gains rates (0%, 15%, or 20% depending on taxable income).
            </li>
            <li>
              <strong>Ordinary (Non-Qualified) Dividends:</strong> Distributed by Real Estate Investment Trusts (REITs), Master Limited Partnerships (MLPs), employee stock option plans, and short-term holdings. Taxed as ordinary income at your top marginal federal tax bracket (up to 37%).
            </li>
            <li>
              <strong>Tax-Advantaged Sheltering:</strong> In Traditional and Roth IRAs or 401(k) accounts, dividend distributions are 100% shielded from annual dividend taxes, maximizing the mathematical efficiency of DRIP.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Passive Income &amp; Equities Solvers</h3>
            <p>
              Reinvesting dividend cash flows unlocks compounding returns without requiring capital liquidation. Track total equity performance and CAGR with our <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, project exponential portfolio growth via the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, model tax-free retirement distributions using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, and plan long-term asset growth with our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is an 'Ex-Dividend Date' and why does it matter?",
          a: "The ex-dividend date is the cutoff date established by stock exchanges. You must purchase shares at least one business day prior to the ex-dividend date to be entitled to receive the upcoming declared dividend payment.",
        },
        {
          q: "What constitutes a 'Dividend Aristocrat'?",
          a: "A Dividend Aristocrat is an S&P 500 company that has successfully increased its base dividend payout every consecutive year for at least 25 consecutive calendar years (e.g., Procter & Gamble, Johnson & Johnson, Coca-Cola).",
        },
        {
          q: "Why is a dividend yield over 10% often dangerous?",
          a: "Extremely high dividend yields often indicate a 'dividend trap'—a company whose share price has collapsed due to declining earnings, impending bankruptcy, or structural obsolescence, foreshadowing an imminent dividend reduction or elimination.",
        },
        {
          q: "Do I pay taxes on reinvested dividends even if I didn't receive cash?",
          a: "Yes. In taxable accounts, the IRS considers reinvested dividends as constructively received cash income in the year distributed, regardless of whether you received a check or automatically bought more shares.",
        },
      ]}
      related={[
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
