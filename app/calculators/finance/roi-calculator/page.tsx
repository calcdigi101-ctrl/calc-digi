import Calculator from "@/components/calcs/finance/roi-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RoiSensitivityHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/roi-calculator";
const TITLE = "ROI Calculator – Return on Investment, Annualized CAGR & Profit Multiple | CalcDigi";
const DESCRIPTION =
  "Free ROI calculator: calculate simple Return on Investment percentage, annualized CAGR (Compound Annual Growth Rate), total net dollar profit, investment return multiple, and capital doubling time across stocks, real estate, and business ventures.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="ROI Calculator"
      intro="Measure the financial profitability of any capital allocation—stocks, rental real estate, business acquisitions, or marketing campaigns—expressed as total percentage gain, net dollar profit, and annualized CAGR."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="ROI = ((FinalValue - InitialCost) / InitialCost) * 100"
      article={
        <>
          <h2>Direct Answer: What Is Return on Investment (ROI) &amp; How Does Annualized CAGR Differ?</h2>
          <p>
            <strong>Return on Investment (ROI)</strong> is the universal financial ratio used to evaluate the efficiency and profitability of an investment or to compare the relative returns of multiple distinct capital deployments. Calculated by dividing net financial gain (total gross return minus initial cost basis) by the total initial capital invested, ROI expresses profitability as a simple percentage. However, because simple ROI ignores the duration of the holding period, professional financial analysts convert total ROI into <strong>Annualized Compound Annual Growth Rate (CAGR)</strong> to normalize returns over time.
          </p>

          <Formula>Simple ROI (%) = [(Total Amount Returned − Total Amount Invested) ÷ Total Amount Invested] × 100</Formula>
          <Formula>Annualized CAGR (%) = [(Total Amount Returned ÷ Total Amount Invested)^(1 ÷ Years) − 1] × 100</Formula>
          <Formula>Return Multiple (MOIC) = Total Amount Returned ÷ Total Amount Invested</Formula>
          <p>
            Where:
            <br />• <strong>Total Amount Returned:</strong> Final liquidation sale proceeds plus all intermediate dividends, interest, and rental income distributions
            <br />• <strong>Total Amount Invested:</strong> Initial purchase price plus all brokerage transaction fees, capital expenditures, and closing costs
            <br />• <strong>Years:</strong> Total duration of the holding horizon in decimal years
          </p>

          <RoiSensitivityHorizonChart />

          <h2>Asset Class ROI &amp; Annualized CAGR Benchmarks (Long-Run Historicals)</h2>
          <p>
            The table below illustrates historical performance benchmarks across major investment classes over 10-year holding horizons:
          </p>

          <DataTable
            head={["Investment Asset Class", "10-Year Cumulative ROI", "Annualized CAGR", "10-Yr Return Multiple", "Typical Volatility Profile"]}
            rows={[
              ["US Broad Equities (S&P 500 Index)", "+160% to +185%", "10.0% to 10.8% CAGR", "2.6x to 2.8x Multiple", "Moderate / Public Market Fluctuations"],
              ["Residential Real Estate (Unlevered)", "+50% to +65%", "4.1% to 5.1% CAGR", "1.5x to 1.6x Multiple", "Low / Inflation-Tracking"],
              ["Residential Real Estate (4x Levered)", "+150% to +220%", "9.6% to 12.3% CAGR", "2.5x to 3.2x Multiple", "Moderate / Mortgage Debt Leverage"],
              ["High-Yield Cash / 1-Yr Treasury Bills", "+45% to +55%", "3.8% to 4.5% CAGR", "1.45x to 1.55x Multiple", "Zero Nominal Volatility (FDIC-Insured)"],
              ["Venture Capital / Early-Stage Startups", "+400% to +900%", "17.5% to 25.9% CAGR", "5.0x to 10.0x Multiple", "Extreme High Risk (80% Failure Rate)"],
            ]}
          />

          <h2>Core Methodological Guidelines for Accurate ROI Analysis</h2>
          <ul>
            <li>
              <strong>Factor in All Hidden Friction Costs:</strong> Failing to include recurring management fees, brokerage commissions, property insurance, legal closing fees, and maintenance repairs artificially inflates perceived ROI.
            </li>
            <li>
              <strong>Distinguish Pre-Tax vs. After-Tax Net ROI:</strong> An investment yielding a nominal 15% ROI may net only 10% after short-term capital gains taxes (up to 37% federal rate). Factoring tax drag is critical for taxable account comparisons.
            </li>
            <li>
              <strong>Internal Rate of Return (IRR) for Staggered Cash Flows:</strong> If an investment involves multiple sequential capital injections or periodic irregular dividend disbursements over years, an IRR model should supplement simple ROI.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Financial Return &amp; Valuation Solvers</h3>
            <p>
              Quantifying Return on Investment allows capital to be deployed where it generates the highest yield. Benchmark returns against equities and CAGR with our <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, identify unit sales thresholds using the <a href="/calculators/finance/break-even-calculator">Break Even Calculator</a>, monitor corporate operating margins via the <a href="/calculators/finance/business-profit-calculator">Business Profit Calculator</a>, and project multi-year compounding growth with our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What constitutes a 'good' ROI percentage?",
          a: "A 'good' ROI depends strictly on risk, inflation, and holding duration. Historically, broad stock market index funds average roughly 10% nominal return (7% real after inflation). For low-risk assets (HYSA, Treasury bills), 4%–5% is strong. For high-risk private business acquisitions or angel investing, investors demand 20% to 25%+ CAGR to compensate for liquidity risk.",
        },
        {
          q: "Can Return on Investment (ROI) be negative?",
          a: "Yes. If the total returned capital plus income is less than your initial cost basis, the ROI is negative. For instance, purchasing an asset for $10,000 and liquidating it for $7,500 produces a −$2,500 net loss, representing an ROI of −25.0%.",
        },
        {
          q: "How does ROI differ from ROE (Return on Equity) and ROA (Return on Assets)?",
          a: "ROI measures the gain generated on a specific discrete investment outlay. Return on Equity (ROE) measures how efficiently a corporation generates profits relative to its total shareholder equity base. Return on Assets (ROA) measures how effectively a company utilizes all its physical and capital resources to generate earnings.",
        },
        {
          q: "How do you calculate marketing ROI (MROI)?",
          a: "Marketing Return on Investment is calculated by subtracting total marketing campaign expenses from the incremental gross profit generated by those campaigns, then dividing by total marketing spend: [(Attributed Gross Profit − Campaign Cost) ÷ Campaign Cost] × 100.",
        },
      ]}
      related={[
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/business/roi-calculator", icon: "🏢", name: "Business ROI" },
        { href: "/calculators/finance/break-even-calculator", icon: "⚖️", name: "Break-Even" },
        { href: "/calculators/finance/crypto-profit-calculator", icon: "🪙", name: "Crypto Profit" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
