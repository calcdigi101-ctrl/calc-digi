import Calculator from "@/components/calcs/finance/investment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InvestmentPortfolioHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/investment-calculator";
const TITLE = "Investment Calculator";
const DESCRIPTION =
  "Free investment calculator: project portfolio accumulation with recurring contributions, compound asset allocation returns, expense ratio fee erosion.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Investment Calculator"
      intro="Simulate long-term investment portfolio accumulation. Model starting capital, periodic contributions, expected asset class returns, expense ratio drag, and inflation-adjusted real wealth."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV = PV(1 + R)^t + PMT \times \left[ \frac{(1 + R)^t - 1}{R} \right]"
      article={
        <>
          <h2>Direct Answer: How Investment Portfolio Growth Compounding Works</h2>
          <p>
            An <strong>investment portfolio</strong> compounds wealth through two intertwined engines: <em>capital appreciation</em> (the rising market valuation of underlying equities, real estate, and bonds) and <em>reinvested distributions</em> (dividends and coupon interest). By reinvesting distributions and adding systematic monthly cash contributions, investors harness the power of exponential curve accumulation.
          </p>
          <p>
            However, long-term investment performance is severely impacted by two silent wealth destroyers: <strong>investment expense ratios / management fees</strong> and <strong>macroeconomic inflation</strong>. Modeling net real returns ensures realistic retirement and wealth planning.
          </p>

          <InvestmentPortfolioHorizonChart />

          <h2>Actuarial Mathematics of Portfolio Future Value &amp; Fee Drag</h2>
          <p>
            The future value <em>FV</em> of an investment portfolio combining starting capital <em>PV</em> and recurring contributions <em>PMT</em> is determined by the net annualized rate of return <em>R</em>:
          </p>

          <Formula>{"FV = PV \times (1 + R)^t + PMT \times 12 \times \left[ \frac{(1 + R)^t - 1}{R} \right]"}</Formula>
          <p>
            Where:
            <br />• <strong>FV</strong> = Future accumulated investment portfolio balance ($)
            <br />• <strong>PV</strong> = Present initial capital investment ($)
            <br />• <strong>R</strong> = Net effective annual rate of return, calculated as: <Formula>{"R = R_{\text{gross}} - E_{\text{fees}}"}</Formula>
            <br />• <strong>R_gross</strong> = Gross annual nominal return of underlying assets (e.g. 0.09 for 9.0%)
            <br />• <strong>E_fees</strong> = Total annual fund expense ratio and advisory fees (e.g. 0.0075 for 0.75%)
            <br />• <strong>t</strong> = Investment duration horizon in calendar years
            <br />• <strong>PMT</strong> = Monthly cash contribution ($), annualized as <Formula>{"PMT \times 12"}</Formula>
          </p>
          <p>
            To evaluate inflation-adjusted purchasing power, calculate real return <Formula>{"R_{\text{real}}"}</Formula> via the Fisher relationship:
          </p>
          <Formula>{"R_{\text{real}} = \frac{1 + R}{1 + i_{\text{inflation}}} - 1"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an investor starting with <strong>$25,000 initial portfolio capital</strong> who contributes <strong>$500 per month</strong> ($6,000 annually) over a <strong>25-year timeline</strong> in a diversified stock index fund producing a <strong>9.00% gross nominal return</strong> with a <strong>0.10% low-cost ETF expense ratio</strong> (<Formula>{"R = 0.090 - 0.001 = 0.089 \text{ (8.90\%)}, t = 25"}</Formula>):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute compound growth multiplier.</strong>
              <Formula>{"(1 + 0.089)^{25} = 8.35824"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate future value of starting principal ($25,000).</strong>
              <Formula>{"FV_{\text{principal}} = \$25{,}000 \times 8.35824 = \$208{,}956.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate future value of recurring monthly contributions.</strong>
              <Formula>{"\text{Annuity Factor} = \frac{8.35824 - 1}{0.089} = \frac{7.35824}{0.089} = 82.67685"}</Formula>
              <Formula>{"FV_{\text{contributions}} = \$6{,}000 \times 82.67685 = \$496{,}061.10"}</Formula>
            </li>
            <li>
              <strong>Step 4: Sum components to establish total terminal portfolio.</strong>
              <Formula>{"FV = \$208{,}956.00 + \$496{,}061.10 = \$705{,}017.10"}</Formula>
            </li>
            <li>
              <strong>Step 5: Contrast out-of-pocket cash vs compound market gains.</strong> Total out-of-pocket capital deposited equals <Formula>{"\$25{,}000 + (\$6{,}000 \times 25) = \$175{,}000.00"}</Formula>. Net investment compound growth equals <Formula>{"\$705{,}017.10 - \$175{,}000.00 = \$530{,}017.10"}</Formula> (representing 75.2% of terminal wealth).
            </li>
          </ol>

          <h2>Historical Asset Class Returns &amp; Volatility Spectrum (1926–Present)</h2>
          <p>
            Asset allocation determines over 90% of portfolio return variability. Historical long-term benchmark performance reveals the fundamental risk-versus-reward spectrum:
          </p>

          <DataTable
            head={["Asset Class", "Long-Term Nominal CAGR", "Long-Term Real CAGR (Post-CPI)", "Standard Deviation (Volatility)", "Best 1-Year / Worst 1-Year"]}
            rows={[
              ["Large-Cap Equities (S&P 500)", "10.20%", "7.10%", "19.8% (Moderate-High)", "+54.0% / -43.3%"],
              ["Small-Cap Equities (Russell 2000)", "11.60%", "8.40%", "24.5% (High)", "+142.9% / -58.0%"],
              ["International Equities (MSCI EAFE)", "8.30%", "5.20%", "21.4% (Moderate-High)", "+69.4% / -43.4%"],
              ["Intermediate Treasury Bonds (10-Yr)", "5.10%", "2.00%", "7.6% (Low-Moderate)", "+40.4% / -17.8%"],
              ["Cash Equivalents (3-Mo T-Bills)", "3.30%", "0.30%", "3.1% (Ultra-Low)", "+14.7% / -0.1%"],
            ]}
          />

          <h2>The Devastating Cost of Fees: 0.05% vs. 1.00% vs. 1.50% Drag Over 30 Years</h2>
          <p>
            Many retail investors underestimate the compounding penalty of advisory and fund management fees. On a $100,000 initial portfolio earning 8.00% gross nominal return over 30 years with no further contributions:
          </p>

          <DataTable
            head={["Fee Structure & Model", "Annual Expense Ratio", "30-Year Terminal Wealth", "Total Lost to Fees ($)", "% of Wealth Stripped by Fees"]}
            rows={[
              ["Ultra-Low Cost Index ETF", "0.05% Expense Ratio", "$992,300", "$13,965 lost", "1.4% wealth drag"],
              ["Standard Active Mutual Fund", "0.75% Expense Ratio", "$812,400", "$193,865 lost", "19.3% wealth drag"],
              ["Financial Advisor (AUM Fee)", "1.00% Advisory Fee", "$761,200", "$245,065 lost", "24.4% wealth drag"],
              ["Advisory Fee + Active Fund", "1.75% Combined Fees", "$624,800", "$381,465 lost", "37.9% wealth drag"],
            ]}
          />

          <h2>Dollar-Cost Averaging (DCA) vs. Lump-Sum Investing (LSI)</h2>
          <p>
            A common dilemma for investors deploying substantial capital is whether to invest a lump sum immediately or dollar-cost average over 6 to 12 months:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Lump-Sum Investing (Mathematical Advantage):</strong> Vanguard research shows lump-sum investing outperforms DCA roughly 68% of the time across global stock markets because equity markets trend upward over time, maximizing time in the market.</li>
            <li><strong>Dollar-Cost Averaging (Psychological Advantage):</strong> Committing equal dollar amounts at fixed monthly intervals lowers average purchase prices during market downturns and eliminates the regret of investing right before a correction.</li>
          </ul>

          <h2>Asset Location Architecture: Taxable vs. Tax-Advantaged Accounts</h2>
          <p>
            Asset location strategy dictates <em>where</em> you hold specific investments to shield portfolio compounding from ongoing IRS taxation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Taxable Brokerage Accounts:</strong> Optimal for broad-market equity index funds and ETFs that distribute minimal dividends, benefiting from long-term capital gains tax rates and step-up in basis rules upon inheritance.</li>
            <li><strong>Tax-Deferred Accounts (Traditional 401k &amp; IRA):</strong> Ideal for corporate bond funds, high-yield fixed income, and REITs that generate heavy ordinary income distributions.</li>
            <li><strong>Tax-Exempt Accounts (Roth IRA &amp; Roth 401k):</strong> Best suited for highest-expected-growth equities (small-cap value, emerging tech), allowing multi-decade compound growth to be withdrawn 100% tax-free in retirement.</li>
          </ul>

          <h2>4 Golden Rules of Institutional Portfolio Management</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Embrace Low-Cost Broad Market Indexing:</strong> Warren Buffett famously advised that for non-professional investors, low-cost broad index funds consistently outperform over 90% of actively managed mutual funds after fees and taxes.
            </li>
            <li>
              <strong>Automate Systematic Rebalancing:</strong> Rebalancing annually back to your target asset allocation (e.g. 80/20 stocks to bonds) systematically sells high-flying assets and purchases undervalued assets without emotional bias.
            </li>
            <li>
              <strong>Optimize Tax Location Architecture:</strong> Hold high-yield bonds and REITs inside tax-deferred retirement accounts, while placing tax-efficient broad stock market ETFs in taxable accounts.
            </li>
            <li>
              <strong>Never Attempt Market Timing:</strong> Missing the 10 best trading days of the S&P 500 over a 20-year period cuts total terminal portfolio wealth in half.
            </li>
          </ol>

          <h2>Essential Investment Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Compound Annual Growth Rate (CAGR):</strong> The geometric annualized progression rate that provides a smoothed annual return over multiple investment years.</li>
            <li><strong>Expense Ratio:</strong> The annual percentage of fund assets deducted by asset managers to cover administrative and operational fund overhead.</li>
            <li><strong>Asset Allocation:</strong> The strategic distribution of an investment portfolio across broad asset classes (equities, fixed income, real estate, cash).</li>
            <li><strong>Standard Deviation:</strong> A statistical metric quantifying investment volatility and price dispersion around its historical average return.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Wealth Accumulation &amp; Financial Solvers</h3>
            <p>
              Project retirement horizons with the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, evaluate compound interest curves via the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, track dividend compounding using the <a href="/calculators/finance/dividend-calculator">Dividend Calculator</a>, and model inflation decay via the <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is a realistic expected rate of return for a stock portfolio?",
          a: "For a diversified broad-market equity portfolio (such as the S&P 500 or total global stock market index), historical long-term returns have averaged 9.5% to 10.5% nominal before inflation, or approximately 6.5% to 7.0% real return after subtracting purchasing power decay.",
        },
        {
          q: "How does an expense ratio affect my investment returns?",
          a: "An expense ratio is deducted daily from your fund's net asset value. While a 1.00% fee may sound small, it compounds negatively over time, stripping away 20% to 35% of your final portfolio value over a 30-year investment horizon compared to a 0.05% low-cost index fund.",
        },
        {
          q: "What is the difference between active and passive investing?",
          a: "Active investing attempts to beat the market through individual stock picking and market timing, typically incurring higher fees and taxes. Passive investing tracks a market benchmark index (like the S&P 500) at near-zero cost, historically outperforming active managers over 15+ years.",
        },
        {
          q: "How should asset allocation change as I approach retirement?",
          a: "As retirement approaches, investors generally shift asset allocation from aggressive growth (80% to 90% equities) toward capital preservation and income (40% to 60% bonds and cash equivalents) to protect against sequence of returns risk.",
        },
        {
          q: "What is sequence of returns risk?",
          a: "Sequence of returns risk is the danger that severe market downturns occur in the first few years of retirement when you begin withdrawing living expenses. Selling declining assets permanently impairs portfolio longevity, making defensive asset allocation critical near retirement.",
        },
        {
          q: "Is dollar-cost averaging better than investing a lump sum?",
          a: "Historically, lump-sum investing outperforms dollar-cost averaging roughly two-thirds of the time because markets trend upward. However, dollar-cost averaging provides behavioral peace of mind, preventing the emotional paralysis of trying to time market entries.",
        },
        {
          q: "What are capital gains taxes and how do they impact investments?",
          a: "Profits realized from selling investments held over one year are taxed at preferential long-term capital gains rates (0%, 15%, or 20% federally). Assets held under one year are taxed at higher ordinary income rates up to 37%. Tax-sheltered accounts (IRAs/401ks) eliminate immediate capital gains taxes.",
        },
        {
          q: "How often should I rebalance my investment portfolio?",
          a: "Most institutional advisors recommend rebalancing once annually, or whenever an asset class deviates by more than 5% from its target allocation percentage, restoring risk balance without generating unnecessary trading costs.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/dividend-calculator", icon: "💵", name: "Dividend Calculator" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation Calculator" },
        { href: "/calculators/finance/roi-calculator", icon: "🎯", name: "ROI Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
