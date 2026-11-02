import Calculator from "@/components/calcs/finance/compound-interest-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CompoundInterestGrowthTrajectoryChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/compound-interest-calculator";
const TITLE = "Compound Interest Calculator – Exponential Savings & Investment Growth | CalcDigi";
const DESCRIPTION =
  "Free compound interest calculator: calculate exponential wealth growth with daily, monthly, quarterly, or annual compounding. Model regular deposits, APY, inflation decay, and the Rule of 72.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Compound Interest Calculator"
      intro="See how your savings multiply exponentially when interest earns interest. Project starting principal, recurring deposits, compounding frequencies, and real inflation-adjusted wealth."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="A = P(1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]"
      article={
        <>
          <h2>Direct Answer: What Is Compound Interest &amp; How Does It Accelerate Wealth?</h2>
          <p>
            <strong>Compound interest</strong> is the addition of interest to the principal sum of an investment or loan, meaning that interest earned in preceding intervals earns interest in subsequent cycles. Unlike linear <em>simple interest</em>, which only rewards the initial principal, compound interest generates <strong>exponential curve growth</strong> over time. In personal finance, the tipping point typically occurs between Year 10 and Year 15, where cumulative reinvested interest gains surpass the total out-of-pocket cash deposits made by the investor.
          </p>

          <Formula>A = P(1 + r/n)^(n·t) + PMT × [((1 + r/n)^(n·t) − 1) ÷ (r/n)]</Formula>
          <p>
            Where:
            <br />• <strong>A</strong> = Final future accumulated balance ($)
            <br />• <strong>P</strong> = Initial principal lump-sum deposit ($)
            <br />• <strong>r</strong> = Annual nominal interest rate (decimal format, e.g. 0.08 for 8%)
            <br />• <strong>n</strong> = Compounding frequency per calendar year (12 for monthly, 365 for daily)
            <br />• <strong>t</strong> = Investment duration horizon in years
            <br />• <strong>PMT</strong> = Periodic monthly deposit contribution ($)
          </p>

          <CompoundInterestGrowthTrajectoryChart />

          <h2>Exponential Compounding Matrix: $10,000 + $250/Month Across Horizons</h2>
          <p>
            The benchmark matrix below reveals the mathematical compounding multiplier across standard conservative, balanced, and broad-equity return environments over a 30-year accumulation horizon:
          </p>

          <DataTable
            head={["Return Rate Scenario", "10-Year Balance / Interest", "20-Year Balance / Interest", "30-Year Balance / Interest"]}
            rows={[
              ["4.5% (High-Yield Cash / CDs)", "$54,410 / $14,410", "$123,540 / $53,540", "$231,180 / $131,180"],
              ["7.0% (Balanced 60/40 Index)", "$63,890 / $23,890", "$169,820 / $99,820", "$378,050 / $278,050"],
              ["10.0% (S&P 500 Historical Avg)", "$78,570 / $38,570", "$258,450 / $188,450", "$729,560 / $629,560"],
              ["12.0% (Aggressive Growth Equities)", "$91,140 / $51,140", "$349,630 / $279,630", "$1,154,800 / $1,054,800"],
            ]}
          />

          <h2>Compounding Mechanics: Frequency &amp; The Rule of 72</h2>
          <p>
            While the underlying interest rate and duration timeline have the greatest impact on total return, statutory compounding frequency dictates the <strong>Effective Annual Yield (APY)</strong>:
          </p>
          <ul>
            <li>
              <strong>Daily Compounding (365x):</strong> Standard across premium High-Yield Savings Accounts (HYSA). An advertised 5.00% nominal rate produces an effective annual yield of <strong>5.127%</strong>.
            </li>
            <li>
              <strong>Monthly Compounding (12x):</strong> Standard across mortgages, installment loans, and many deposit certificates. A 5.00% nominal rate yields <strong>5.116%</strong> APY.
            </li>
            <li>
              <strong>The Rule of 72 Mental Shortcut:</strong> To quickly approximate the number of years required for your balance to double at a fixed rate, divide 72 by the annual return rate. At 7%, your money doubles every 10.3 years; at 10%, it doubles every 7.2 years.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Wealth Accumulation &amp; Investment Tools</h3>
            <p>
              Harnessing exponential compounding is the cornerstone of lifelong financial security. Structure balanced multi-asset allocations with the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, calculate target retirement nests via the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, model automated liquid emergency cushions using the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and audit statutory yields via our <a href="/calculators/finance/apy-calculator">APY Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How often is interest compounded on standard savings accounts?",
          a: "Most US commercial banks and credit unions compound interest daily and credit the accrued amount to your ledger balance once monthly on statement closing dates.",
        },
        {
          q: "What is the mathematical difference between APR and APY?",
          a: "APR (Annual Percentage Rate) reflects the simple nominal annualized interest rate without taking compounding into account. APY (Annual Percentage Yield) reflects the true total interest earned including the compounding effect over an entire calendar year.",
        },
        {
          q: "What realistic long-term rate of return should I assume?",
          a: "For cash reserves and CDs, use prevailing FDIC-insured APYs (currently 4.0%–5.2%). For long-term broad stock market portfolios (like total stock market or S&P 500 index funds), financial economists typically benchmark 9%–10% nominal return before inflation, or 6.5%–7% real return after subtracting purchasing power decay.",
        },
        {
          q: "Does compound interest account for inflation and capital gains taxes?",
          a: "Calculators provide nominal pre-tax projections. To evaluate real future purchasing power, subtract expected inflation (typically 2.5%–3.0%) from your nominal interest rate, or utilize tax-sheltered wrappers like a Roth IRA or 401(k) to eliminate ongoing tax drag.",
        },
      ]}
      related={[
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation Calculator" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
