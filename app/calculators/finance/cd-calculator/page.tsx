import Calculator from "@/components/calcs/finance/cd-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CdLadderingMaturityYieldChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/cd-calculator";
const TITLE = "CD Calculator – Certificate of Deposit Interest, APY & Maturity Value | CalcDigi";
const DESCRIPTION =
  "Free CD calculator: calculate guaranteed interest earnings, maturity value, and after-tax returns across 3-month to 5-year certificates of deposit. Model early withdrawal penalties and CD laddering yield structures.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="CD Calculator"
      intro="Calculate exact maturity payouts, total earned interest, and net proceeds after taxes on bank and credit union certificates of deposit. Model early withdrawal penalties and custom CD ladders."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="MV = P * (1 + APY)^(m / 12)"
      article={
        <>
          <h2>Direct Answer: What Is a Certificate of Deposit &amp; How Is Maturity Value Calculated?</h2>
          <p>
            A <strong>Certificate of Deposit (CD)</strong> is a federally insured promissory time deposit issued by banks (FDIC-insured) and credit unions (NCUSIF-insured) that pays a contractual, fixed Annual Percentage Yield (APY) in exchange for locking up capital for an agreed maturity duration (typically ranging from 3 months to 5 years). Because APY incorporates the bank&rsquo;s internal compounding frequency (daily or monthly), maturity valuation follows an exponential term formula. Withdrawing funds prior to the maturity date triggers a statutory early withdrawal interest penalty.
          </p>

          <Formula>MV = P × (1 + APY)^(m ÷ 12)</Formula>
          <p>
            Where:
            <br />• <strong>MV</strong> = Total maturity value payout ($)
            <br />• <strong>P</strong> = Initial principal deposit amount ($)
            <br />• <strong>APY</strong> = Contractual Annual Percentage Yield (decimal, e.g. 0.05 for 5.00%)
            <br />• <strong>m</strong> = Certificate term duration in months
          </p>

          <CdLadderingMaturityYieldChart />

          <h2>Certificate of Deposit Term &amp; Yield Benchmarks: $25,000 Deposit</h2>
          <p>
            The table below illustrates maturity payouts, total interest, and early withdrawal penalty impacts across standard term durations on a $25,000 deposit:
          </p>

          <DataTable
            head={["CD Term Duration", "Sample APY (%)", "Total Interest at Maturity", "Maturity Payout Value", "Early Withdrawal Penalty (3–6 Mo Int.)"]}
            rows={[
              ["6 Months", "5.10%", "$630", "$25,630", "$315 (90 days interest)"],
              ["1 Year (12 Mo)", "4.85%", "$1,212", "$26,212", "$303 (90 days interest)"],
              ["2 Years (24 Mo)", "4.40%", "$2,248", "$27,248", "$550 (180 days interest)"],
              ["3 Years (36 Mo)", "4.15%", "$3,245", "$28,245", "$519 (180 days interest)"],
              ["5 Years (60 Mo)", "4.00%", "$5,416", "$30,416", "$1,000 (365 days interest)"],
            ]}
          />

          <h2>Core CD Strategies: The Laddering Architecture</h2>
          <p>
            Locking all available cash into a single long-term CD exposes depositors to two distinct risks: lack of intermediate liquidity, and opportunity cost if market interest rates rise. The <strong>CD Laddering Strategy</strong> overcomes both limitations:
          </p>
          <ul>
            <li>
              <strong>Tranche Division:</strong> Divide your target capital (e.g., $50,000) into five equal parts ($10,000 each) and purchase 1-year, 2-year, 3-year, 4-year, and 5-year CDs simultaneously.
            </li>
            <li>
              <strong>Perpetual Rollover:</strong> As the 1-year CD matures in 12 months, roll the principal and interest into a new 5-year CD at prevailing peak rates.
            </li>
            <li>
              <strong>Guaranteed Liquidity:</strong> After Year 1, exactly 20% of your total fixed-income portfolio matures every 12 months, ensuring ongoing cash access without incurring early redemption penalties.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Fixed-Income &amp; Capital Preservation Solvers</h3>
            <p>
              Certificates of Deposit provide guaranteed capital protection with zero volatility. Convert stated interest rates to true yields with our <a href="/calculators/finance/apy-calculator">APY Calculator</a>, model long-term compounding growth via the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, track liquid cash reserves using the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and audit real purchasing power erosion with the <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How are early withdrawal penalties calculated on a CD?",
          a: "Most financial institutions assess early withdrawal penalties as a forfeit of a set number of months of interest. For example, short-term CDs (under 12 months) typically penalize 90 days of interest, while multi-year CDs forfeit 180 to 365 days of interest. If you break the CD before earning sufficient interest, the difference is deducted from your original principal.",
        },
        {
          q: "Is CD interest taxed every year or only when the CD matures?",
          a: "Under IRS regulations, CD interest is taxed as ordinary income in the calendar year it is credited to your account, regardless of whether you withdraw the money or leave it locked inside the CD until maturity.",
        },
        {
          q: "Are brokered CDs different from bank CDs?",
          a: "Yes. Brokered CDs are purchased through an investment brokerage firm (such as Fidelity, Schwab, or Vanguard). They can be sold on a secondary market before maturity without paying a bank penalty, though their market value fluctuates inversely with interest rates.",
        },
        {
          q: "Are CDs safe from bank failures?",
          a: "Yes, up to the statutory limit. CDs issued by FDIC-insured commercial banks or NCUA-insured credit unions are protected up to $250,000 per depositor, per insured institution, for each account ownership category.",
        },
      ]}
      related={[
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/investment-calculator", icon: "📊", name: "Investment" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
