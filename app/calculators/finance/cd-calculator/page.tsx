import Calculator from "@/components/calcs/finance/cd-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CdLadderingMaturityYieldChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/cd-calculator";
const TITLE = "CD Calculator";
const DESCRIPTION =
  "Free Certificate of Deposit (CD) calculator: calculate fixed maturity value, compounding yields, early withdrawal penalties, and CD laddering strategies.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="CD Calculator"
      intro="Calculate exact maturity payouts, earned compound interest, and effective APY on Certificates of Deposit. Model multi-year CD laddering strategies and early withdrawal penalty costs."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="A = P\left(1 + \frac{r}{n}\right)^{nt}, \quad \text{Penalty} = P \times \frac{r}{365} \times \text{Penalty Days}"
      article={
        <>
          <h2>Direct Answer: How Certificate of Deposit (CD) Interest and Maturity Work</h2>
          <p>
            A <strong>Certificate of Deposit (CD)</strong> is a federally insured time-deposit promissory agreement offered by commercial banks and credit unions. In exchange for committing cash principal <em>P</em> for a fixed contractual term (typically 3 months to 5 years), the issuing institution guarantees a locked, non-fluctuating <strong>Annual Percentage Yield (APY)</strong> backed by FDIC insurance up to $250,000.
          </p>
          <p>
            Unlike variable-rate high-yield savings accounts whose yields can decline when central banks cut benchmark interest rates, a fixed-rate CD protects investors against interest rate risk by locking in guaranteed yield for the full duration of the term.
          </p>

          <CdLadderingMaturityYieldChart />

          <h2>Actuarial Mathematics of CD Compounding &amp; Early Withdrawal Penalties</h2>
          <p>
            The future maturity value <em>A</em> of a Certificate of Deposit with initial deposit principal <em>P</em>, nominal contract interest rate <em>r</em>, compounding frequency <em>n</em>, and term duration in years <em>t</em> is:
          </p>

          <Formula>{"A = P \left(1 + \frac{r}{n}\right)^{nt}"}</Formula>
          <p>
            Where:
            <br />• <strong>A</strong> = Total guaranteed maturity balance ($)
            <br />• <strong>P</strong> = Opening deposit principal ($)
            <br />• <strong>r</strong> = Contract nominal interest rate (in decimal format)
            <br />• <strong>n</strong> = Compounding frequency per year (365 for daily, 12 for monthly)
            <br />• <strong>t</strong> = Term length in years (e.g. 0.5 for 6 months, 3.0 for 36 months)
          </p>
          <p>
            If cash is withdrawn prior to scheduled contract maturity, banks assess an <strong>Early Withdrawal Penalty (EWP)</strong> calculated in days of simple interest:
          </p>
          <Formula>{"\text{Early Withdrawal Penalty } (EWP) = P \times \left( \frac{r}{365} \right) \times \text{Penalty Days}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an investor depositing <strong>$25,000</strong> into a <strong>3-Year CD</strong> paying an advertised <strong>4.75% APY</strong> (nominal rate <Formula>{"r = 0.0464"}</Formula> compounded daily, <Formula>{"n = 365, t = 3.0"}</Formula>), with a standard <strong>180-day simple interest early withdrawal penalty</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute daily periodic compounding rate.</strong>
              <Formula>{"\frac{r}{n} = \frac{0.0464}{365} = 0.000127123"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate compound growth multiplier over 3 years (1,095 days).</strong>
              <Formula>{"(1 + 0.000127123)^{1095} = 1.149364"}</Formula>
            </li>
            <li>
              <strong>Step 3: Solve for full maturity balance (A).</strong>
              <Formula>{"A = \$25{,}000 \times 1.149364 = \$28{,}734.10"}</Formula>
              Total guaranteed interest earned equals <Formula>{"\$28{,}734.10 - \$25{,}000.00 = \$3{,}734.10"}</Formula>.
            </li>
            <li>
              <strong>Step 4: Model Early Withdrawal at Month 18.</strong> If the depositor liquidates the CD after 18 months (548 days), accrued interest before penalty equals:
              <Formula>{"A_{\text{18mo}} = \$25{,}000 \times (1 + 0.000127123)^{548} = \$26{,}795.50 \quad (\text{Accrued Interest} = \$1{,}795.50)"}</Formula>
            </li>
            <li>
              <strong>Step 5: Compute 180-Day Penalty Deduction.</strong>
              <Formula>{"\text{EWP} = \$25{,}000 \times \left( \frac{0.0464}{365} \right) \times 180 = \$25{,}000 \times 0.000127123 \times 180 = \$572.05"}</Formula>
              Net payout disbursed to investor equals <Formula>{"\$26{,}795.50 - \$572.05 = \$26{,}223.45"}</Formula>. Net interest retained equals <Formula>{"\$1{,}223.45"}</Formula> (an effective realized APY of 3.24%).
            </li>
          </ol>

          <h2>CD Maturity Payout Matrix: $10,000 Deposit Across Term Spectrum</h2>
          <p>
            The benchmark table below evaluates guaranteed maturity proceeds for a $10,000 principal investment across typical term lengths:
          </p>

          <DataTable
            head={["CD Term Duration", "Typical Benchmark APY", "Total Interest Earned", "Maturity Payout ($)", "Typical Early Withdrawal Penalty"]}
            rows={[
              ["6-Month CD", "4.85% APY", "$239.50", "$10,239.50", "90 Days of Simple Interest"],
              ["1-Year CD", "4.65% APY", "$465.00", "$10,465.00", "90 to 180 Days of Interest"],
              ["2-Year CD", "4.30% APY", "$878.50", "$10,878.50", "180 Days of Simple Interest"],
              ["3-Year CD", "4.15% APY", "$1,298.20", "$11,298.20", "180 to 270 Days of Interest"],
              ["5-Year CD", "4.00% APY", "$2,166.50", "$12,166.50", "365 Days of Simple Interest"],
            ]}
          />

          <h2>CD Laddering Architecture: Balancing High Yield with Predictable Liquidity</h2>
          <p>
            To avoid locking up all cash into a single long-term CD or suffering early withdrawal penalties, institutional wealth managers utilize a <strong>CD Laddering Strategy</strong>. For example, dividing a $50,000 allocation across 5 staggered CDs ($10,000 each into 1-year, 2-year, 3-year, 4-year, and 5-year CDs):
          </p>

          <DataTable
            head={["Ladder Rung ($10,000 Each)", "Contract Term", "Initial APY", "First Maturity Date", "Rollover Reinvestment Action"]}
            rows={[
              ["Rung 1: Shortest CD", "1-Year Term", "4.65% APY", "Month 12", "Reinvest into new 5-Year CD"],
              ["Rung 2: Mid-Short CD", "2-Year Term", "4.30% APY", "Month 24", "Reinvest into new 5-Year CD"],
              ["Rung 3: Mid-Term CD", "3-Year Term", "4.15% APY", "Month 36", "Reinvest into new 5-Year CD"],
              ["Rung 4: Mid-Long CD", "4-Year Term", "4.05% APY", "Month 48", "Reinvest into new 5-Year CD"],
              ["Rung 5: Longest CD", "5-Year Term", "4.00% APY", "Month 60", "Reinvest into new 5-Year CD"],
            ]}
          />

          <h2>Key Structural Types of Certificates of Deposit</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Traditional Fixed-Rate CD:</strong> Locks in a guaranteed interest rate for the entire duration. Early withdrawals incur statutory interest penalties.</li>
            <li><strong>No-Penalty (Liquid) CD:</strong> Allows depositors to withdraw the full balance and earned interest after the initial 7-day holding period without penalties, offering slightly lower yields than fixed CDs.</li>
            <li><strong>Bump-Up (Step-Up) CD:</strong> Permits the depositor to request a one-time interest rate increase if prevailing market rates rise during the contract term.</li>
            <li><strong>Brokered CD:</strong> Purchased through brokerage accounts (Schwab, Fidelity). Traded on secondary markets, allowing investors to sell before maturity without bank early withdrawal penalties.</li>
          </ul>

          <h2>4 Crucial CD Rules to Protect Depositor Yields</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Beware of Auto-Rollover Default Traps:</strong> Most banks provide a narrow 7 to 10-day &ldquo;grace period&rdquo; upon maturity. If you do not provide instructions, the bank automatically rolls your capital into a new CD at prevailing default rates.
            </li>
            <li>
              <strong>Verify FDIC / NCUA Insurance Caps:</strong> Ensure total deposit balances per institution remain under $250,000 ($500,000 for joint accounts) to maintain 100% federal guarantee.
            </li>
            <li>
              <strong>Account for Annual Tax Liabilities:</strong> The IRS taxes CD interest as ordinary income annually as it accrues on Form 1099-INT, even if interest is retained inside the CD until maturity.
            </li>
            <li>
              <strong>Evaluate Brokered CDs for Large Portfolios:</strong> Brokered CDs allow high-net-worth investors to hold CDs from dozens of banks within a single brokerage account, easily scaling past $1 million in total FDIC insurance.
            </li>
          </ol>

          <h2>Essential CD Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Maturity Date:</strong> The precise calendar date when a CD term expires and principal plus accumulated interest is available for withdrawal without penalties.</li>
            <li><strong>Early Withdrawal Penalty (EWP):</strong> A contractual forfeiture of accrued interest assessed by banking institutions if funds are liquidated prior to maturity.</li>
            <li><strong>Grace Period:</strong> A 7 to 14-day window immediately following CD maturity during which depositors can withdraw funds or alter terms without penalty.</li>
            <li><strong>NCUA Insurance:</strong> National Credit Union Administration backing that insures credit union share certificates up to $250,000, equivalent to bank FDIC coverage.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Fixed-Income &amp; Savings Solvers</h3>
            <p>
              Compare deposit account compounding using our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, evaluate statutory yields via the <a href="/calculators/finance/apy-calculator">APY Calculator</a>, model liquid savings goals with the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and audit inflation purchasing power decay via the <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What happens when a CD reaches its maturity date?",
          a: "Upon maturity, banks enter a 7 to 10-day grace period where you can withdraw principal and interest in cash, transfer funds to another account, or roll the balance into a new CD. If you take no action, banks automatically renew the CD for the same term at prevailing rates.",
        },
        {
          q: "Can an early withdrawal penalty eat into my initial principal deposit?",
          a: "Yes. If you withdraw funds very early in the CD term before accumulating enough interest to satisfy the contractual penalty (e.g., a 180-day penalty on a CD held for only 30 days), the bank deducts the penalty difference directly from your original principal.",
        },
        {
          q: "What is a CD ladder and why is it beneficial?",
          a: "A CD ladder divides investment capital across multiple CDs with staggered maturity dates (e.g., 1, 2, 3, 4, and 5 years). This structure guarantees regular access to cash liquidity every 12 months while capturing higher long-term fixed interest rates.",
        },
        {
          q: "Are Certificates of Deposit completely risk-free?",
          a: "CDs held at FDIC-insured banks or NCUA-insured credit unions have zero credit default risk up to $250,000. However, they carry inflation risk (if inflation exceeds your locked APY) and liquidity risk (early withdrawal penalties if you need cash unexpectedly).",
        },
        {
          q: "How is CD interest taxed by the IRS?",
          a: "CD interest is taxed as ordinary income at your marginal federal and state tax rates. Under IRS regulations, you must pay taxes annually on the interest credited to your CD, reported on Form 1099-INT, even if you cannot access the funds until maturity.",
        },
        {
          q: "What is the difference between a bank CD and a brokered CD?",
          a: "Bank CDs are purchased directly from a retail bank and incur early withdrawal penalties for early liquidation. Brokered CDs are purchased through a brokerage firm (Fidelity, Vanguard) and can be sold on the secondary market at market value without bank penalties.",
        },
        {
          q: "Is a CD better than a High-Yield Savings Account (HYSA)?",
          a: "A CD is superior when interest rates are expected to fall, because it locks in a guaranteed rate for years. An HYSA is preferable when rates are rising or when you require immediate liquidity without early withdrawal penalties.",
        },
        {
          q: "What is a No-Penalty (Liquid) CD?",
          a: "A No-Penalty CD allows you to withdraw your full principal and accrued interest with zero penalties after the first 7 days following opening. In exchange for this liquidity, No-Penalty CDs typically offer slightly lower APYs than traditional fixed CDs.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/emergency-fund-calculator", icon: "🛡️", name: "Emergency Fund Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
