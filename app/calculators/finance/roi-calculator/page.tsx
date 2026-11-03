import Calculator from "@/components/calcs/finance/roi-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RoiSensitivityHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/roi-calculator";
const TITLE = "ROI Calculator";
const DESCRIPTION =
  "Free ROI calculator: calculate simple return on investment, annualized CAGR, net present value benchmarks, hurdle rate sensitivity, and real after-tax.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="ROI Calculator"
      intro="Calculate your exact Return on Investment (ROI). Compare simple total gain percentages against time-weighted annualized returns (CAGR), hurdle rates, and inflation-adjusted capital growth."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{ROI} = \frac{\text{Net Profit}}{\text{Cost of Investment}} \times 100\% \quad \mid \quad \text{CAGR} = \left( \frac{\text{Ending Value}}{\text{Initial Cost}} \right)^{1/n} - 1"
      article={
        <>
          <h2>Direct Answer: What Is Return on Investment (ROI) &amp; How Does Annualization Change It?</h2>
          <p>
            <strong>Return on Investment (ROI)</strong> is the universal financial ratio used to evaluate the profitability, efficiency, and capital allocation merit of an investment relative to its initial cost. Expressed as a percentage, simple ROI divides net financial gains by initial capital deployed.
          </p>
          <p>
            However, <strong>simple ROI ignores the time horizon</strong>. Generating a 50% simple return over 2 years represents an extraordinary annualized compound annual growth rate (CAGR) of 22.47%, whereas generating a 50% simple return over 15 years yields a lackluster 2.74% annualized return&mdash;trailing historical inflation. Professional capital allocators evaluate investments through <strong>Annualized ROI (CAGR)</strong> and compare yields against opportunity cost <strong>Hurdle Rates</strong>.
          </p>

          <RoiSensitivityHorizonChart />

          <h2>Actuarial Mathematics: Simple ROI, Compound Annualization &amp; Hurdle Rates</h2>
          <p>
            The fundamental equations governing investment returns:
          </p>

          <Formula>{"\text{Simple ROI} = \frac{\text{Final Value} - \text{Initial Cost} - \text{Ongoing Expenses}}{\text{Initial Cost}} \times 100\% = \frac{\text{Net Profit}}{\text{Cost of Investment}} \times 100\%"}</Formula>
          <p>
            To normalize performance across multi-year holding periods, calculate the <strong>Annualized ROI (CAGR)</strong>:
          </p>
          <Formula>{"\text{Annualized ROI (CAGR)} = \left( \frac{\text{Final Value}}{\text{Initial Cost}} \right)^{\frac{1}{n}} - 1"}</Formula>
          <p>
            Where:
            <br />&bull; <strong>Final Value (FV):</strong> Total gross liquidity received at liquidation or disposition ($)
            <br />&bull; <strong>Initial Cost (C):</strong> Total upfront capital deployed including acquisition fees and commissions ($)
            <br />&bull; <strong>n:</strong> Holding period duration measured in fractional or whole years (t_exit &minus; t_entry)
          </p>
          <p>
            To evaluate true economic purchasing power expansion, calculate <strong>Real After-Tax ROI</strong>:
          </p>
          <Formula>{"\text{Real ROI} = \frac{1 + \left[ \text{Nominal ROI} \times (1 - t_{\text{tax}}) \right]}{1 + i_{\text{inflation}}} - 1"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a private investor allocating <strong>$50,000 into a commercial business venture</strong> that liquidates for <strong>$95,000 after exactly 5 years</strong>, incurring $3,000 in legal and brokerage disposition fees:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate Net Realized Gain.</strong>
              <br />Net Proceeds = $95,000 &minus; $3,000 exit fees = $92,000.
              <br />Net Profit = $92,000 &minus; $50,000 initial cost = <strong>$42,000</strong>.
            </li>
            <li>
              <strong>Step 2: Calculate Simple ROI.</strong>
              <br />Simple ROI = ($42,000 / $50,000) &times; 100% = <strong>+84.00%</strong> total nominal return.
            </li>
            <li>
              <strong>Step 3: Compute Time-Weighted Annualized ROI (CAGR).</strong>
              <br />Growth Ratio = $92,000 / $50,000 = 1.84.
              <br />Annualization Exponent = 1 / 5 = 0.20.
              <br />Annualized CAGR = (1.84)^0.20 &minus; 1 = 1.1297 &minus; 1 = <strong>12.97% per year</strong>.
            </li>
            <li>
              <strong>Step 4: Factor in Taxes &amp; Inflation.</strong>
              <br />Assuming 20% long-term capital gains tax on profit ($8,400 tax), after-tax payout = $83,600 (CAGR = 10.83%).
              <br />With average annual inflation of 3.0%, the <strong>Real After-Tax Annualized ROI = 7.60%</strong>.
            </li>
          </ol>

          <h2>Holding Period Horizon vs. Annualized Compounding Matrix</h2>
          <p>
            A 100% simple return sounds identical, but holding period duration drastically alters underlying capital productivity:
          </p>

          <DataTable
            head={["Simple Total ROI", "Horizon: 1 Year", "Horizon: 3 Years", "Horizon: 5 Years", "Horizon: 10 Years", "Horizon: 20 Years"]}
            rows={[
              ["+25% Gain", "25.00%", "7.72%", "4.56%", "2.26% (Trails CPI)", "1.12%"],
              ["+50% Gain", "50.00%", "14.47%", "8.45%", "4.14%", "2.05%"],
              ["+100% (2x Capital)", "100.00%", "25.99%", "14.87%", "7.18%", "3.53%"],
              ["+200% (3x Capital)", "200.00%", "44.22%", "24.57%", "11.61%", "5.65%"],
              ["+400% (5x Capital)", "400.00%", "70.99%", "37.97%", "17.46%", "8.38%"],
              ["+900% (10x Capital)", "900.00%", "115.44%", "58.49%", "25.89%", "12.20%"]
            ]}
          />

          <h2>Hurdle Rates &amp; Risk-Adjusted Cost of Capital Benchmarks</h2>
          <p>
            A positive ROI does not automatically validate an investment. If an illiquid venture returns 6% while risk-free Treasury bills yield 5%, the venture failed to earn its <strong>equity risk premium</strong>:
          </p>

          <DataTable
            head={["Asset Class / Capital Venture", "Target Hurdle Rate", "Illiquidity Horizon", "Risk Profile", "Strategic Decision Benchmark"]}
            rows={[
              ["US Treasury Bills (Risk-Free Baseline)", "4.0% – 5.0%", "1 – 12 Months", "Zero Default Risk", "Baseline opportunity cost of cash; requires zero managerial effort."],
              ["Broad Index Equities (S&P 500)", "8.0% – 10.0%", "5+ Years", "Moderate Volatility", "Passive liquid hurdle; any active project must beat this post-tax."],
              ["Direct Commercial Real Estate", "10.0% – 14.0%", "7 – 10 Years", "Moderate / Illiquid", "Requires debt service coverage (DSCR > 1.25) and tenant stability."],
              ["Private Equity / Small Business Buyouts", "18.0% – 25.0%", "5 – 7 Years", "High Operational Risk", "Compensates for key-person risk, leverage, and zero secondary market."],
              ["Early-Stage Venture Capital", "> 30.0% Portfolio", "8 – 12 Years", "Very High / Binary", "Outsized winners must offset 70%+ portfolio failure rates."]
            ]}
          />

          <h2>Common ROI Analytical Pitfalls to Avoid</h2>
          <p>
            Inaccurate ROI projections frequently stem from four recurring computational errors:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Ignoring Cash Flow Timing:</strong> Simple ROI treats a dollar received in year 10 identically to a dollar received in year 1. For non-linear cash flow distributions, calculate <strong>Internal Rate of Return (IRR)</strong> and Net Present Value (NPV).
            </li>
            <li>
              <strong>Excluding Hidden Carrying Costs:</strong> Failing to tally ongoing property management fees, software maintenance, insurance premiums, and opportunity costs severely inflates apparent ROI.
            </li>
            <li>
              <strong>Confusing Gross Margin with Net ROI:</strong> Gross markups do not reflect bottom-line enterprise return once general and administrative (G&amp;A) overhead and sales tax are deducted.
            </li>
          </ul>

          
          <h2>Leveraged ROI vs. Unleveraged Return on Equity (ROE)</h2>
          <p>
            When debt financing is deployed (such as real estate mortgages or margin trading), leverage magnifies both positive gains and downside losses. The financial formula for <strong>Return on Equity (ROE)</strong> under leverage is expressed as:
          </p>
          <Formula>{"\text{ROE} = \text{ROA} + \left( \text{ROA} - r_{\text{borrow}} \right) \times \frac{\text{Debt}}{\text{Equity}}"}</Formula>
          <p>
            Where ROA represents return on gross assets, r_borrow is the borrowing interest rate, and Debt/Equity is the leverage ratio. If an asset produces an 8% yield financed by 5% debt, excess return accrues directly to equity holders. However, if the asset returns 4% while debt costs 5%, negative leverage rapidly erodes initial equity capital.
          </p>
<h2>Essential Return on Investment Terminology</h2>
          <p>
            Core concepts required for capital allocation analysis:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Compound Annual Growth Rate (CAGR):</strong> The geometric mean annual growth rate of an investment over a multi-year horizon assuming profits are fully reinvested.</li>
            <li><strong>Hurdle Rate:</strong> The minimum acceptable rate of return an investor or corporation requires before allocating capital to a specific project.</li>
            <li><strong>Net Present Value (NPV):</strong> The sum of all incoming future cash flows discounted back to present value minus initial cash outlay.</li>
            <li><strong>Payback Period:</strong> The time required for an investment to generate cash flows sufficient to recover its initial capital outlay.</li>
            <li><strong>Opportunity Cost:</strong> The return forgone by choosing one investment alternative over the next best available asset.</li>
          </ul>

          <h3>Related Investing, Business &amp; Growth Solvers</h3>
          <p>
            Master your portfolio mechanics: calculate multi-year equity returns using our <a href="/calculators/finance/stock-return-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Stock Return Calculator</a>, model compound savings with the <a href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Compound Interest Calculator</a>, determine unit volume milestones using the <a href="/calculators/finance/break-even-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Break-Even Calculator</a>, and evaluate enterprise margins via our <a href="/calculators/finance/business-profit-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Business Profit Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the key difference between Simple ROI and Annualized ROI (CAGR)?",
          a: "Simple ROI measures total cumulative percentage profit over the entire holding period regardless of duration. Annualized ROI (CAGR) computes the equivalent annual compound interest rate earned each year. For instance, a 100% simple return over 10 years equals an annualized return of 7.18% per year."
        },
        {
          q: "What is an investment hurdle rate and how is it determined?",
          a: "A hurdle rate is the minimum required rate of return an investor or corporation demands before committing capital. It is determined by summing the risk-free rate (Treasury yields), an inflation buffer, an illiquidity premium, and project-specific execution risk."
        },
        {
          q: "Why does simple ROI become misleading for investments held longer than one year?",
          a: "Because simple ROI ignores the exponential power of compounding and the time value of money. An investment showing an 80% simple return sounds superior to a 15% return, but if the 80% return took 7 years to achieve (8.7% CAGR), the 15% 1-year return is dramatically more productive capital."
        },
        {
          q: "How does inflation impact real return on investment?",
          a: "Inflation erodes the purchasing power of your initial capital and future profits. If an investment produces a 7% nominal annual return while CPI inflation averages 4%, your real purchasing power expansion is only approximately 3% before taxes."
        },
        {
          q: "What is the difference between ROI and IRR (Internal Rate of Return)?",
          a: "ROI is ideal for single-inflow, single-outflow investments. IRR models complex investments featuring multiple periodic cash injections and irregular dividend distributions over time, solving for the exact discount rate where Net Present Value (NPV) equals zero."
        },
        {
          q: "How are capital gains taxes accounted for when calculating net ROI?",
          a: "Taxes reduce net cash proceeds at liquidation. Under IRS rules, assets held longer than one year qualify for preferential long-term capital gains tax rates (0%, 15%, or 20%), whereas assets held under one year are taxed at ordinary income rates up to 37%."
        },
        {
          q: "Can ROI be negative and what does a -100% ROI mean?",
          a: "Yes. Any investment where proceeds at exit are lower than initial acquisition costs generates a negative ROI. A -100% ROI represents a complete total loss of all invested principal, common in uncollateralized venture failures or bankrupt penny stocks."
        },
        {
          q: "What is considered a 'good' annual ROI for retail investors?",
          a: "Historically, the broad US stock market (S&P 500) has generated approximately 10% nominal annual return (7% real after inflation). Any passive strategy generating 8% to 10% annualized CAGR over multi-decade horizons is considered strong performance."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
