import Calculator from "@/components/calcs/finance/auto-loan-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AutoLoanDepreciationEquityChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/auto-loan-calculator";
const TITLE = "Auto Loan Calculator";
const DESCRIPTION =
  "Free auto loan calculator: calculate exact monthly car payments with state sales tax, dealer doc fees, trade-in equity, and down payments.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Auto Loan Calculator"
      intro="Calculate exact monthly car payments, total financing costs, state sales tax liabilities, and amortization schedules. Model cash down payments and vehicle trade-in values to avoid negative equity."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="PMT = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}"
      article={
        <>
          <h2>Direct Answer: Calculating True Auto Loan Payments &amp; Total Debt Burden</h2>
          <p>
            An <strong>auto loan payment</strong> is calculated from the net &ldquo;out-the-door&rdquo; vehicle purchase price rather than the manufacturer window sticker MSRP. The total capital financed represents the negotiated vehicle price plus mandatory state and local sales taxes, dealer documentation fees, and title registration fees, diminished by any cash down payment and positive trade-in equity. That net principal balance is amortized over a term of 36 to 84 months at a fixed annual percentage rate (APR).
          </p>
          <p>
            Because vehicles represent rapidly depreciating assets—losing approximately <strong>20% of their market value in year one</strong> and 10% to 15% annually thereafter—the structure of an auto loan directly dictates whether a borrower builds positive vehicle equity or becomes trapped &ldquo;underwater&rdquo; with negative equity.
          </p>

          <AutoLoanDepreciationEquityChart />

          <h2>The Mathematical Derivation of Fixed Auto Loan Amortization</h2>
          <p>
            Automotive installment loans utilize ordinary annuity mathematics. The calculation requires determining the net financed principal <em>P</em>, the periodic monthly interest rate <em>r</em>, and the total duration in months <em>n</em>:
          </p>

          <Formula>{"\\text{Net Financed Principal } (P) = \\text{Negotiated Price} + \\text{Sales Tax} + \\text{Dealer Fees} - \\text{Down Payment} - (\\text{Trade Value} - \\text{Trade Debt})"}</Formula>
          <Formula>{"PMT = P \\times \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right]"}</Formula>
          <p>
            Where:
            <br />• <strong>PMT</strong> = Fixed monthly auto loan debt payment ($)
            <br />• <strong>P</strong> = Net amount financed after taxes, fees, and upfront capital deductions ($)
            <br />• <strong>r</strong> = Periodic monthly interest rate, derived as <Formula>{"r = \\frac{\\text{Annual Percentage Rate (APR)}}{12 \\times 100}"}</Formula>
            <br />• <strong>n</strong> = Loan duration in calendar months (e.g., 36, 48, 60, 72, or 84 months)
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            To examine the exact actuarial compounding, consider purchasing a new vehicle with a negotiated selling price of <strong>$35,000</strong> in a jurisdiction with a <strong>7.00% state sales tax</strong>, a <strong>$500 dealer documentation fee</strong>, a <strong>$5,000 cash down payment</strong>, and a trade-in vehicle appraised at <strong>$8,000</strong> that carries an outstanding <strong>$4,000 loan balance</strong>, financed over <strong>60 months at 6.00% APR</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute state sales tax and out-the-door price.</strong> In states offering trade-in tax credits, tax applies to the net trade difference: <Formula>{"(\\text{\\$35,000} - \\text{\\$8,000}) \\times 0.07 = \\$1{,}890"}</Formula>. Out-the-door vehicle cost is:
              <Formula>{"\\text{Total Cost} = \\$35{,}000 + \\$1{,}890 + \\$500 = \\$37{,}390"}</Formula>
            </li>
            <li>
              <strong>Step 2: Determine net capital deductions.</strong> Net trade equity equals trade value minus trade payoff: <Formula>{"\\$8{,}000 - \\$4{,}000 = \\$4{,}000"}</Formula>. Total upfront equity applied:
              <Formula>{"\\text{Total Deductions} = \\$5{,}000 \\text{ (Cash)} + \\$4{,}000 \\text{ (Net Trade)} = \\$9{,}000"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate net amount financed (P).</strong>
              <Formula>{"P = \\$37{,}390 - \\$9{,}000 = \\$28{,}390.00"}</Formula>
            </li>
            <li>
              <strong>Step 4: Compute monthly installment debt service (PMT).</strong> At 6.00% APR, <Formula>{"r = 0.06 / 12 = 0.005"}</Formula> over <Formula>{"n = 60"}</Formula> months:
              <Formula>{"PMT = 28{,}390 \\times \\left[ \\frac{0.005 \\times (1.005)^{60}}{(1.005)^{60} - 1} \\right] = 28{,}390 \\times 0.0193328 = \\$548.86 \\text{ / month}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Compute cumulative interest and total cash outflow.</strong> Over 60 payments, total cash remitted equals <Formula>{"\\$548.86 \\times 60 = \\$32{,}931.60"}</Formula>. Total interest charges equal <Formula>{"\\$32{,}931.60 - \\$28{,}390.00 = \\$4{,}541.60"}</Formula>.
            </li>
          </ol>

          <h2>Auto Loan Term Comparison: 36 vs 48 vs 60 vs 72 vs 84 Months</h2>
          <p>
            Lenders frequently market extended 72- and 84-month terms to advertise lower monthly payments. However, extended terms significantly inflate lifetime interest expenses and prolong negative equity risk:
          </p>

          <DataTable
            head={["Loan Term (Months)", "Monthly Payment ($30k at 6.5%)", "Total Interest Paid", "Cumulative Repayment", "Underwater Window", "Financial Recommendation"]}
            rows={[
              ["36 Months (3 Years)", "$919.54 / mo", "$3,103.44", "$33,103.44", "0 to 3 Months", "Fastest equity buildup; lowest interest cost"],
              ["48 Months (4 Years)", "$710.97 / mo", "$4,126.56", "$34,126.56", "3 to 8 Months", "Balanced debt service; moderate interest drag"],
              ["60 Months (5 Years)", "$586.98 / mo", "$5,218.80", "$35,218.80", "12 to 18 Months", "Recommended maximum limit for personal autos"],
              ["72 Months (6 Years)", "$504.66 / mo", "$6,335.52", "$36,335.52", "24 to 36 Months", "High risk of persistent negative equity"],
              ["84 Months (7 Years)", "$446.06 / mo", "$7,469.04", "$37,469.04", "36 to 48 Months", "Extreme interest penalty; strongly discouraged"],
            ]}
          />

          <h2>The 20/4/10 Financial Rule for Vehicle Purchases</h2>
          <p>
            Personal finance economists recommend the <strong>20/4/10 Rule</strong> to avoid overextending household cash flow on motorized assets:
          </p>

          <DataTable
            head={["Household Gross Income", "Max 10% Monthly Debt Budget", "Target 20% Cash Down", "Max 4-Year Vehicle Value"]}
            rows={[
              ["$50,000 / year", "$416 / month", "$3,600", "$18,000"],
              ["$75,000 / year", "$625 / month", "$5,800", "$29,000"],
              ["$100,000 / year", "$833 / month", "$7,800", "$39,000"],
              ["$150,000 / year", "$1,250 / month", "$12,400", "$62,000"],
            ]}
          />

          <h2>Vehicle Depreciation Curves &amp; Negative Equity Risk</h2>
          <p>
            New vehicles suffer an immediate <strong>9% to 11% depreciation hit</strong> upon leaving the dealership lot. By month 12, standard passenger vehicles retain only 78% to 82% of original valuation.
          </p>
          <p>
            When financing with zero down payment over 72 or 84 months, loan balances decline slower than vehicle depreciation, leaving borrowers carrying <strong>negative equity</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Total Loss Collision Exposure:</strong> Auto insurers pay only actual cash value (ACV). Without GAP insurance, the borrower must pay the unpaid loan shortfall out-of-pocket.</li>
            <li><strong>Trade-In Rolling Drag:</strong> Rolling negative equity into a new car loan compounds debt risk, increasing monthly payments and total interest burden.</li>
            <li><strong>Sale Inflexibility:</strong> An underwater owner cannot transfer title to a private party buyer without liquidating the loan shortfall in cash.</li>
          </ul>

          <h2>Proven Strategies to Secure the Lowest Auto Loan APR</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Obtain Outside Credit Union Pre-Approval:</strong> Secure binding pre-approval letters from credit unions or local banks before stepping onto dealership lots. Credit unions routinely offer auto loan rates 1.50% to 2.50% lower than captive dealer financing.
            </li>
            <li>
              <strong>De-Couple Purchase Price from Financing:</strong> Negotiate the vehicle purchase price first, evaluate trade-in value second, and negotiate financing arrangements third. Dealerships exploit &ldquo;monthly payment buyers&rdquo; by stretching loan terms to conceal inflated vehicle margins.
            </li>
            <li>
              <strong>Leverage State Sales Tax Trade-In Credits:</strong> In more than 40 U.S. states, the value of your trade-in vehicle is legally subtracted from the purchase price prior to calculating sales tax, saving hundreds of dollars in upfront cash.
            </li>
            <li>
              <strong>Resist Unnecessary Dealer Add-Ons:</strong> Reject backend dealer markups including paint sealant packages, fabric protection, VIN etching, and inflated GAP policies that can be procured through primary insurers at a fraction of the cost.
            </li>
          </ol>

          <h2>Essential Auto Financing Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Loan-to-Value (LTV) Ratio:</strong> The percentage ratio of the total borrowed debt divided by the vehicle market value. LTVs exceeding 100% indicate negative equity.</li>
            <li><strong>GAP Insurance:</strong> Guaranteed Asset Protection policy that covers the financial spread between actual cash value and the remaining loan principal in the event of theft or total loss.</li>
            <li><strong>Dealer Reserve:</strong> The markup percentage that automotive dealerships add onto the wholesale buy rate offered by lenders to generate commission revenue.</li>
            <li><strong>Doc Fee:</strong> An administrative documentation fee assessed by auto dealerships to prepare sales contracts and title transfers, varying from $75 in regulated states to over $800 in unregulated markets.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Transportation &amp; Borrowing Tools</h3>
            <p>
              Evaluate broader vehicular economics with our <a href="/calculators/transportation/fuel-cost-calculator">Fuel Cost Calculator</a>, plan commuting impact with the <a href="/calculators/transportation/commute-cost-calculator">Commute Cost Calculator</a>, calculate loan APR fees via the <a href="/calculators/finance/apr-calculator">APR Calculator</a>, and model general installment financing using the <a href="/calculators/finance/loan-calculator">Loan Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How does a trade-in affect vehicle sales tax?",
          a: "In over 40 U.S. states, trade-in credit reduces the taxable vehicle purchase price. For example, buying a $35,000 vehicle with an $8,000 trade-in in a 7% sales tax state assesses sales tax only on the $27,000 net difference, saving $560 in cash out-of-pocket taxes.",
        },
        {
          q: "Is a 72-month or 84-month auto loan advisable?",
          a: "While extended terms lower monthly payments, they drastically escalate cumulative interest expenses and keep borrowers trapped in negative equity for 2 to 4 years. A 60-month term or shorter is strongly recommended to protect financial resilience.",
        },
        {
          q: "What is GAP insurance and when is it necessary?",
          a: "Guaranteed Asset Protection (GAP) insurance pays the monetary shortfall between your auto insurer's actual cash value payout and your outstanding lender loan balance if the car is stolen or totaled. It is vital when financing with less than a 20% down payment.",
        },
        {
          q: "Do dealer documentation fees get rolled into the loan amount?",
          a: "Yes. Dealer documentation (doc) fees, delivery charges, and governmental registration expenses are routinely rolled into the financed principal unless the buyer explicitly requests to pay them in cash out-of-pocket at contract signing.",
        },
        {
          q: "Can I refinance an auto loan to a lower interest rate later?",
          a: "Yes. If your credit score has improved or macroeconomic interest rates have dropped, refinancing your auto loan through a credit union or bank can lower monthly payments and reduce remaining interest charges, provided your vehicle's LTV qualifies.",
        },
        {
          q: "What credit score is needed to qualify for top-tier auto loan rates?",
          a: "Lenders typically reserve prime and super-prime promotional interest rates (such as 0% to 3.9% dealer APR incentives) for borrowers with FICO credit scores of 740 or higher. Scores below 660 generally incur non-prime subprime APR surcharges.",
        },
        {
          q: "How does making bi-weekly auto loan payments save interest?",
          a: "By paying half of your monthly payment every two weeks, you execute 26 half-payments per calendar year, equaling 13 full monthly payments instead of 12. That extra payment reduces loan principal faster, shortening your loan term and slashing interest charges.",
        },
        {
          q: "What is the difference between simple interest and precomputed auto loans?",
          a: "Virtually all modern consumer auto loans utilize simple interest, where interest accrues daily based on remaining unpaid principal, rewarding early extra payments. Rare precomputed interest loans calculate all interest upfront, offering no interest savings for early payoff.",
        },
      ]}
      related={[
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost" },
        { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost" },
        { href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}