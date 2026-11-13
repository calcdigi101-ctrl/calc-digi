import Calculator from "@/components/calcs/finance/emergency-fund-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EmergencyFundRunwayTiersChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/emergency-fund-calculator";
const TITLE = "Emergency Fund Calculator";
const DESCRIPTION =
  "Free emergency fund calculator: calculate exact liquid cash reserves needed for 3, 6, or 9 months of non-discretionary living expenses.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Emergency Fund Calculator"
      intro="Determine your target liquid emergency cash cushion based on monthly essential expenses, household income stability, and dependent obligations. Project monthly savings accumulation schedules."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Emergency Cushion} = M_{\text{runway}} \times \sum (\text{Essential Non-Discretionary Expenses})"
      article={
        <>
          <h2>Direct Answer: How to Size Your Emergency Fund &amp; Calculate Cash Runway</h2>
          <p>
            An <strong>emergency fund</strong> is a dedicated liquid cash cushion designed to protect individuals and households against unforeseen financial shocks—such as sudden job loss, major medical events, uninsured auto breakdowns, or urgent home repairs. Rather than calculating fund size based on gross income, financial planners size emergency reserves strictly on <strong>monthly non-discretionary essential expenses</strong>.
          </p>
          <p>
            Standard financial advisory consensus establishes three primary cash runway tiers: <strong>3 months</strong> for dual-income households with secure corporate positions, <strong>6 months</strong> for single-income breadwinners or families with children, and <strong>9 to 12 months</strong> for self-employed freelancers, 1099 contractors, or commission-based sales professionals.
          </p>

          <EmergencyFundRunwayTiersChart />

          <h2>Actuarial Mathematics of Emergency Fund Sizing &amp; Accumulation Timelines</h2>
          <p>
            To compute the target emergency cushion <Formula>{"E_{\text{target}}"}</Formula>, aggregate essential non-discretionary living expenses <Formula>{"B_{\text{essential}}"}</Formula> and multiply by target runway months <Formula>{"M_{\text{runway}}"}</Formula>:
          </p>

          <Formula>{"B_{\text{essential}} = \text{Housing} + \text{Utilities} + \text{Groceries} + \text{Insurance} + \text{Min Debt Service} + \text{Healthcare}"}</Formula>
          <Formula>{"E_{\text{target}} = B_{\text{essential}} \times M_{\text{runway}}"}</Formula>
          <p>
            Where:
            <br />• <strong>E_target</strong> = Total target liquid emergency fund balance ($)
            <br />• <strong>B_essential</strong> = Baseline monthly non-discretionary survival expenditures ($)
            <br />• <strong>M_runway</strong> = Target cash runway duration in months (typically 3, 6, or 9 months)
          </p>
          <p>
            If you have existing cash reserves <Formula>{"E_{\text{current}}"}</Formula> and commit a fixed monthly savings transfer <em>PMT</em> into a high-yield account earning interest <em>r</em>, the number of months <em>T</em> required to reach the target is:
          </p>
          <Formula>{"T = \frac{\ln\left[ 1 + \frac{(E_{\text{target}} - E_{\text{current}}) \times (r/12)}{PMT} \right]}{\ln(1 + r/12)}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a household with <strong>$4,500 in monthly essential non-discretionary expenses</strong> ($2,200 mortgage/rent, $400 utilities, $700 groceries, $400 health/auto insurance, $500 minimum debt payments, and $300 critical care), targeting a <strong>6-month emergency runway</strong> (<Formula>{"M_{\text{runway}} = 6"}</Formula>), with <strong>$3,000 in starting seed savings</strong> and a committed <strong>$600 per month savings transfer</strong> into a <strong>4.50% APY High-Yield Savings Account</strong> (<Formula>{"r = 0.045 / 12 = 0.00375"}</Formula>):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate target emergency fund balance.</strong>
              <Formula>{"E_{\text{target}} = \$4{,}500 \times 6 = \$27{,}000.00"}</Formula>
            </li>
            <li>
              <strong>Step 2: Determine net remaining savings shortfall.</strong>
              <Formula>{"\text{Savings Shortfall} = \$27{,}000 - \$3{,}000 = \$24{,}000.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Evaluate monthly compounding accumulation equation.</strong>
              <Formula>{"\frac{\text{Shortfall} \times r}{PMT} = \frac{\$24{,}000 \times 0.00375}{\$600} = \frac{\$90.00}{\$600} = 0.1500"}</Formula>
              <Formula>{"\ln(1 + 0.1500) = \ln(1.1500) = 0.139762, \quad \ln(1 + 0.00375) = 0.003743"}</Formula>
            </li>
            <li>
              <strong>Step 4: Solve for months required (T).</strong>
              <Formula>{"T = \frac{0.139762}{0.003743} = 37.34 \text{ months (approx. 3 years and 1 month)}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Compare out-of-pocket deposits vs earned interest.</strong> Over 37.3 months, out-of-pocket transfers equal <Formula>{"\$3{,}000 + (\$600 \times 37.34) = \$25{,}404.00"}</Formula>. The HYSA generates <strong>$1,596.00 in compound interest</strong>, shaving over 2.5 months off the funding journey.
            </li>
          </ol>

          <h2>Emergency Fund Sizing Matrix by Household Risk Profile</h2>
          <p>
            Emergency cushion requirements vary based on job volatility, income diversification, and household fixed debt obligations:
          </p>

          <DataTable
            head={["Household Professional Profile", "Recommended Runway", "Essential Budget ($4,000/mo)", "Essential Budget ($6,000/mo)", "Essential Budget ($8,000/mo)"]}
            rows={[
              ["Dual-Income / Tenured Corporate W-2", "3 Months Runway", "$12,000 Target", "$18,000 Target", "$24,000 Target"],
              ["Single-Income Breadwinner / Dependents", "6 Months Runway", "$24,000 Target", "$36,000 Target", "$48,000 Target"],
              ["Freelancer / 1099 Independent Contractor", "9 Months Runway", "$36,000 Target", "$54,000 Target", "$72,000 Target"],
              ["Commission-Only Sales / Cyclical Business Owner", "12 Months Runway", "$48,000 Target", "$72,000 Target", "$96,000 Target"],
            ]}
          />

          <h2>Where to Park Your Emergency Fund: Yield vs. Immediate Liquidity</h2>
          <p>
            An emergency fund must balance risk-free capital preservation with immediate accessibility:
          </p>

          <DataTable
            head={["Liquid Cash Vehicle", "Expected APY Yield", "Liquidity Access Speed", "FDIC / NCUA Backed?", "Strategic Recommendation"]}
            rows={[
              ["High-Yield Savings (HYSA)", "4.25% – 5.10% APY", "Instant electronic transfer (1–2 days)", "Yes ($250k FDIC per institution)", "Top choice for general emergency cash"],
              ["Money Market Account (MMA)", "3.75% – 4.75% APY", "Same-day debit card / check writing", "Yes ($250k FDIC insured)", "Excellent for instant offline access"],
              ["Short-Term Treasury Bills (T-Bills)", "4.50% – 5.25% Yield", "Requires secondary broker sale (1–2 days)", "Full Faith & Credit of US Govt", "Best for high earners (state tax exempt)"],
              ["Stock Brokerage Index Fund", "Variable (High Volatility)", "3-day settlement + market crash risk", "No (SIPC covers fraud only)", "Unacceptable for core emergency funds"],
            ]}
          />

          <h2>Essential vs. Non-Essential Expenses: The Emergency Audit</h2>
          <p>
            During a severe income disruption or job transition, households immediately slash non-essential discretionary costs to prolong cash runway:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Non-Negotiable Survival Expenses:</strong> Rent or mortgage payment, municipal utilities (water, power, heat), essential groceries, healthcare prescriptions, auto insurance, and minimum loan debt service.</li>
            <li><strong>Immediate Pauses (Discretionary):</strong> Restaurant dining, food delivery, streaming subscriptions, vacation travel, apparel shopping, gym memberships, and non-essential home upgrades.</li>
          </ul>

          <h2>Multi-Tier Liquidity Architecture: Sizing Liquid vs. Yield-Bearing Reserves</h2>
          <p>
            For larger emergency cushions exceeding 6 months ($30,000+), holding 100% of capital in a single savings account creates cash drag. Financial advisors recommend a tiered liquidity structure:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Tier 1 (Immediate Cash - Months 1 to 2):</strong> Held in a High-Yield Savings Account (HYSA) or checking account linked to a debit card for immediate same-day access.</li>
            <li><strong>Tier 2 (Secondary Buffer - Months 3 to 6):</strong> Placed in a Treasury Money Market Fund or short-term Certificates of Deposit (CDs) earning optimal fixed yields.</li>
            <li><strong>Tier 3 (Catastrophic Cushion - Months 7 to 12):</strong> Held in short-term rolling U.S. Treasury bills (4-week or 13-week T-Bills) to maximize state tax-exempt yields.</li>
          </ul>

          <h2>4 Golden Rules of Emergency Cash Management</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Never Invest Emergency Reserves in Stocks:</strong> The stock market and job market crash simultaneously during recessions. Forcing the sale of depressed equities to pay rent locks in devastating capital losses.
            </li>
            <li>
              <strong>Separate From Daily Checking Accounts:</strong> Maintain emergency cash at a separate banking institution to eliminate the visual temptation of spending the reserves on discretionary lifestyle items.
            </li>
            <li>
              <strong>Build a $1,000 Starter Cushion First:</strong> Before aggressively tackling high-interest debt, accumulate a $1,000 to $2,000 starter buffer to prevent unexpected minor car repairs from forcing you into new debt.
            </li>
            <li>
              <strong>Replenish Immediately After Drawdowns:</strong> If an emergency requires withdrawing cash, immediately freeze discretionary spending and redirect all surplus cash flow toward restoring the fund.
            </li>
          </ol>

          <h2>Essential Emergency Fund Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Cash Runway:</strong> The number of months a household can survive and meet all mandatory financial obligations with zero incoming revenue.</li>
            <li><strong>Liquid Asset:</strong> An asset that can be converted into physical cash within 24 to 48 hours without suffering loss of principal value.</li>
            <li><strong>Discretionary Spending:</strong> Lifestyle expenditures that can be instantly eliminated during financial hardship without impairing health or shelter.</li>
            <li><strong>Capital Preservation:</strong> An investment objective that prioritizes zero loss of nominal principal over chasing high investment yields.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Liquidity &amp; Budget Solvers</h3>
            <p>
              Plan complete household cash flow with our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, model compound savings growth using the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, calculate take-home pay via the <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, and eliminate high-interest liabilities using the <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How many months of expenses should I keep in an emergency fund?",
          a: "Most financial advisors recommend 3 to 6 months of essential living expenses. Dual-income households with stable corporate jobs typically need 3 months, while single-income families, freelancers, or commission-based workers should target 6 to 12 months.",
        },
        {
          q: "Should I pay off high-interest credit card debt or build an emergency fund first?",
          a: "Financial planners recommend establishing a starter emergency fund of $1,000 to $2,000 first. Once that buffer is in place to absorb minor shocks, direct all surplus cash toward high-interest debt before completing your full 3-to-6-month fund.",
        },
        {
          q: "Can I keep my emergency fund in a Certificate of Deposit (CD)?",
          a: "A CD ladder can house a portion of your emergency fund (e.g. months 4 to 6), but keeping months 1 to 3 in an immediately liquid High-Yield Savings Account is essential to avoid early withdrawal interest penalties during urgent emergencies.",
        },
        {
          q: "Is it bad to keep too much money in an emergency fund?",
          a: "Yes. Holding more than 12 months of expenses in cash creates inflation drag, where purchasing power declines relative to inflation. Excess capital beyond a 12-month runway is better deployed in long-term diversified investment index funds.",
        },
        {
          q: "Can I use a Home Equity Line of Credit (HELOC) or credit card as my emergency fund?",
          a: "Relying on credit lines is risky because banks frequently freeze or reduce credit limits during economic recessions when borrowers need them most. A true emergency fund must consist of liquid cash that you own outright.",
        },
        {
          q: "How should I replenish my emergency fund after using it?",
          a: "Immediately treat emergency fund replenishment as your top financial priority. Temporarily pause discretionary lifestyle spending and halt extra investing contributions until your liquid reserves return to their baseline target.",
        },
        {
          q: "Should emergency fund size be based on gross income or expenses?",
          a: "Always base your emergency fund on essential non-discretionary expenses rather than gross income. In an emergency, you will not pay payroll taxes or fund retirement accounts, so sizing to survival expenses provides accurate protection.",
        },
        {
          q: "Are high-yield savings account earnings on emergency funds taxable?",
          a: "Yes. The interest earned on high-yield savings accounts is subject to federal and state ordinary income tax and is reported annually on IRS Form 1099-INT.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/budget-calculator", icon: "📋", name: "Household Budget Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
