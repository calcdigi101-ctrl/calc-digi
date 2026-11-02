import Calculator from "@/components/calcs/finance/dividend-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DividendReinvestmentDripCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/dividend-calculator";
const TITLE = "Dividend Calculator – DRIP Reinvestment & Dividend Growth | CalcDigi";
const DESCRIPTION =
  "Free dividend calculator: calculate Dividend Reinvestment Plan (DRIP) growth, annual passive cash flow, dividend payout growth, and yield-on-cost under IRS dividend tax guidelines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Dividend Calculator"
      intro="Model passive income growth and compounding returns through Dividend Reinvestment Plans (DRIP). Project share accumulation, organic dividend increases, and yield-on-cost over multi-decade horizons."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="S_{t+1} = S_t + \frac{S_t \times \text{DPS}_t}{P_t}, \quad \text{Yield-on-Cost} = \frac{\text{Current DPS}}{\text{Original Cost Basis}}"
      article={
        <>
          <h2>Direct Answer: How Dividend Reinvestment Plans (DRIP) Multiply Wealth</h2>
          <p>
            A <strong>Dividend Reinvestment Plan (DRIP)</strong> is an automated investment strategy where corporate cash dividend distributions are immediately and automatically redeployed to purchase additional shares (or fractional shares) of the underlying equity or ETF. Rather than taking cash payouts, DRIP harnesses a compounding &ldquo;wealth flywheel&rdquo;: each reinvested dividend increases your total share count, which generates a larger dividend payment in the subsequent quarter, which in turn acquires even more shares.
          </p>
          <p>
            Over long multi-decade horizons, dividend reinvestment accounts for the vast majority of total equity market performance: according to historical Hartford Funds data, <strong>reinvested dividends accounted for 84% of the total cumulative return of the S&amp;P 500</strong> since 1960.
          </p>

          <DividendReinvestmentDripCurveChart />

          <h2>Actuarial Mathematics of DRIP Compounding &amp; Yield-on-Cost (YOC)</h2>
          <p>
            The mathematical model of quarterly dividend reinvestment incorporates organic share appreciation, dividend per share (DPS) growth rate <em>g</em>, and share accumulation:
          </p>

          <Formula>{"D_t = S_t \times \frac{\text{DPS}_t}{4}"}</Formula>
          <Formula>{"\Delta S_t = \frac{D_t}{P_t}"}</Formula>
          <Formula>{"S_{t+1} = S_t + \Delta S_t"}</Formula>
          <p>
            Where:
            <br />• <strong>S_t</strong> = Number of shares owned at quarter <em>t</em>
            <br />• <strong>DPS_t</strong> = Annualized dividend payout per share ($), expanding at annual dividend growth rate <em>g</em>
            <br />• <strong>D_t</strong> = Quarterly cash dividend distribution received ($)
            <br />• <strong>P_t</strong> = Market price per share at quarter <em>t</em>, expanding at annual capital appreciation rate <em>c</em>
            <br />• <strong>ΔS_t</strong> = Fractional new shares purchased by reinvesting the quarterly cash dividend
          </p>
          <p>
            To evaluate the true yield generated on your original capital investment over time, calculate <strong>Yield-on-Cost (YOC)</strong>:
          </p>
          <Formula>{"\text{Yield-on-Cost (YOC)} = \frac{\text{Current Annualized Dividend per Share (DPS)}}{\text{Original Average Purchase Cost per Share}} \times 100\%"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an investor purchasing <strong>500 shares</strong> of a dividend-growth equity at <strong>$50.00 per share</strong> ($25,000 initial capital), paying a starting dividend of <strong>$1.75 per share annually (3.50% initial yield)</strong>, assuming a <strong>6.0% annual dividend growth rate</strong> and <strong>5.0% annual stock price appreciation</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Year 1 Cash Dividend:</strong> The initial 500 shares generate <Formula>{"500 \times \$1.75 = \$875.00"}</Formula> in annual dividend income ($218.75 per quarter).
            </li>
            <li>
              <strong>Year 1 Reinvestment:</strong> Reinvesting $875 into shares averaging $51.25 buys <strong>17.07 new shares</strong>, increasing share count to <strong>517.07 shares</strong>.
            </li>
            <li>
              <strong>Year 5 Organic Expansion:</strong> By Year 5, compounding dividend growth raises DPS to <Formula>{"\$1.75 \times (1.06)^5 = \$2.34 / \text{share}"}</Formula>. Share count expands to <strong>575.4 shares</strong>. Annual passive dividend income rises to <Formula>{"575.4 \times \$2.34 = \$1{,}346.44 / \text{year}"}</Formula>.
            </li>
            <li>
              <strong>Year 10 Inflection &amp; Yield-on-Cost:</strong> By Year 10, DPS reaches $3.13. Share count reaches <strong>678.2 shares</strong>. Annual dividend income reaches <strong>$2,122.77 / year</strong>. The investor&rsquo;s Yield-on-Cost surges to:
              <Formula>{"\text{YOC} = \frac{\$3.13 \times (678.2 / 500)}{\$50.00} = \frac{\$4.24}{\$50.00} = 8.48\% \text{ Yield-on-Cost}"}</Formula>
            </li>
            <li>
              <strong>Year 20 Terminal Wealth:</strong> Over 20 years, total portfolio value expands to <strong>$148,650</strong>, producing <strong>$6,280 in annual passive cash flow</strong> from an initial $25,000 investment.
            </li>
          </ol>

          <h2>DRIP Reinvestment vs. Cash Payout Accumulation Matrix ($50k Initial)</h2>
          <p>
            The benchmark table below evaluates a $50,000 investment in a blue-chip dividend stock (3.5% initial yield, 6% dividend growth, 5% price appreciation) comparing reinvesting dividends versus cashing them out:
          </p>

          <DataTable
            head={["Timeline Horizon", "Strategy A: Cash Dividends Withdrawn", "Strategy B: DRIP Reinvested", "Passive Income Spread", "Total Net Wealth Advantage"]}
            rows={[
              ["Year 5", "$63,800 Value + $10,120 Cash", "$76,450 Portfolio Value", "+$480 / yr higher income", "+$2,530 net wealth gain"],
              ["Year 10", "$81,400 Value + $23,450 Cash", "$118,920 Portfolio Value", "+$1,420 / yr higher income", "+$14,070 net wealth gain"],
              ["Year 15", "$103,900 Value + $41,280 Cash", "$187,640 Portfolio Value", "+$3,210 / yr higher income", "+$42,460 net wealth gain"],
              ["Year 20", "$132,600 Value + $65,150 Cash", "$299,850 Portfolio Value", "+$6,840 / yr higher income", "+$102,100 net wealth gain"],
              ["Year 30", "$216,000 Value + $141,500 Cash", "$782,400 Portfolio Value", "+$26,200 / yr higher income", "+$424,900 net wealth gain"],
            ]}
          />

          <h2>Dividend Aristocrats vs. High-Yield Dividend Traps</h2>
          <p>
            When constructing a dividend portfolio, investors must evaluate fundamental payout sustainability:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Dividend Aristocrats (S&amp;P 500):</strong> Companies that have increased base dividend payouts for at least 25 consecutive years (e.g. Procter &amp; Gamble, Johnson &amp; Johnson, Coca-Cola). They feature robust free cash flow and conservative payout ratios.</li>
            <li><strong>The High-Yield Value Trap:</strong> Stocks offering extreme double-digit yields (10% to 18%) often indicate collapsing share prices rather than corporate generosity. When payout ratios exceed 90% of earnings, dividend cuts usually follow, destroying capital.</li>
          </ul>

          <h2>Cash Flow Harvesting: Living Off Dividends in Retirement</h2>
          <p>
            When transitioning from the wealth accumulation phase to retirement income distribution, investors can transition from DRIP reinvestment to cash dividend payouts:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Preserving Principal Capital:</strong> Taking cash distributions rather than selling shares protects the underlying equity asset base, eliminating sequence of returns risk during market downturns.</li>
            <li><strong>Organic Inflation Hedging:</strong> Blue-chip dividend growth companies routinely expand cash payouts by 5% to 8% annually, helping retirement income outpace CPI inflation.</li>
            <li><strong>Tax-Efficient Qualified Dividends:</strong> In retirement, qualified dividend income enjoys preferential federal tax brackets (0% for single filers up to $47,025 and married couples up to $94,050 in 2024), minimizing tax friction.</li>
          </ul>

          <h2>Taxation of Dividends: Qualified vs. Ordinary Income</h2>
          <p>
            Understanding dividend tax treatment ensures optimal after-tax portfolio yields:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Qualified Dividends:</strong> Paid by domestic corporations or qualifying foreign firms held for more than 60 days during the 121-day holding period surrounding the ex-dividend date. Taxed at preferential capital gains rates (0%, 15%, or 20%).</li>
            <li><strong>Non-Qualified (Ordinary) Dividends:</strong> Distributed by Real Estate Investment Trusts (REITs), business development companies (BDCs), and short-term holdings. Taxed at ordinary income tax brackets up to 37%.</li>
          </ul>

          <h2>Essential Dividend Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Ex-Dividend Date:</strong> The cutoff date established by stock exchanges. You must purchase shares before this date to receive the upcoming dividend payout.</li>
            <li><strong>Payout Ratio:</strong> Total cash dividends divided by net net income, indicating what percentage of earnings is distributed to shareholders versus retained for growth.</li>
            <li><strong>Yield-on-Cost (YOC):</strong> Annual dividend income divided by original purchase price basis, measuring income growth on original invested capital.</li>
            <li><strong>DRIP (Dividend Reinvestment Plan):</strong> Automated programmatic purchasing of shares using cash dividend distributions.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Passive Income &amp; Equity Solvers</h3>
            <p>
              Project full equity market compounding using our <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, analyze total asset accumulation with the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, model long-term retirement drawdown via the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, and audit compound interest curves via our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Are reinvested dividends taxed in a standard brokerage account?",
          a: "Yes. In a taxable brokerage account, dividends are taxable in the year they are distributed, even if automatically reinvested into new shares via DRIP. Brokers report reinvested dividends to the IRS on Form 1099-DIV. Holding dividend stocks inside a Roth IRA or 401(k) eliminates this annual tax drag.",
        },
        {
          q: "What is the difference between qualified and ordinary dividends?",
          a: "Qualified dividends meet specific IRS holding period requirements (held over 60 days) and are taxed at favorable long-term capital gains rates (0%, 15%, or 20%). Ordinary (non-qualified) dividends, such as those from REITs, are taxed at higher ordinary federal income tax rates up to 37%.",
        },
        {
          q: "What is an ex-dividend date and why does it matter?",
          a: "The ex-dividend date is the trading cutoff date. To receive an upcoming dividend payout, you must purchase the stock at least one business day before the ex-dividend date. If you buy on or after the ex-dividend date, the current dividend goes to the previous seller.",
        },
        {
          q: "What is a healthy dividend payout ratio?",
          a: "For traditional operating corporations, a payout ratio between 35% and 60% of earnings is considered healthy, leaving sufficient capital for reinvestment. Ratios exceeding 80% indicate potential vulnerability to dividend cuts during recessions, except for REITs which are legally required to distribute 90% of taxable income.",
        },
        {
          q: "Can I live off dividends in retirement without selling shares?",
          a: "Yes. By building a substantial dividend portfolio (e.g. $1,000,000 generating a 4% yield, producing $40,000/year), retirees can fund living expenses purely from ongoing dividend cash flow without selling underlying shares, protecting their capital base.",
        },
        {
          q: "What is Yield-on-Cost (YOC) and how does it grow?",
          a: "Yield-on-Cost is your current annual dividend income divided by your original purchase cost. As companies increase their dividend payouts year after year, your YOC expands, often reaching 10% to 20%+ on original capital after 15 to 20 years of continuous dividend growth.",
        },
        {
          q: "What is the difference between high dividend yield and dividend growth?",
          a: "High yield stocks offer high upfront payouts (5% to 8%) but slower dividend growth. Dividend growth stocks offer lower starting yields (1.5% to 3.0%) but increase payouts rapidly (7% to 12% annually), typically outperforming high-yield stocks in total return over 10+ years.",
        },
        {
          q: "Does reinvesting dividends create fractional shares?",
          a: "Yes. Most modern brokerage platforms (Fidelity, Schwab, Vanguard) automatically purchase fractional shares down to three or four decimal places when reinvesting dividend distributions, ensuring 100% of cash is put to work.",
        },
      ]}
      related={[
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/roi-calculator", icon: "🎯", name: "ROI Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
