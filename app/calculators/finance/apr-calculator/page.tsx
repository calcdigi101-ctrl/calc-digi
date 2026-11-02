import Calculator from "@/components/calcs/finance/apr-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AprVsInterestRateCostChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/apr-calculator";
const TITLE = "APR Calculator – Annual Percentage Rate vs. Interest Rate | CalcDigi";
const DESCRIPTION =
  "Free APR calculator: calculate true Annual Percentage Rate (APR) including upfront lender origination fees, discount points, closing costs, and finance charges under federal Truth in Lending Act (TILA) guidelines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="APR Calculator"
      intro="Determine the true Annual Percentage Rate (APR) on loans and mortgages by factoring upfront origination points, administration fees, and closing costs alongside nominal contract interest rates."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="P - \text{Prepaid Fees} = \sum_{t=1}^{n} \frac{PMT}{(1 + r_{\text{periodic}})^t}"
      article={
        <>
          <h2>Direct Answer: What Is Annual Percentage Rate (APR) and How Does It Work?</h2>
          <p>
            The <strong>Annual Percentage Rate (APR)</strong> represents the total annualized cost of borrowing credit, expressed as a single standardized percentage. While an advertised <em>nominal interest rate</em> reflects only the periodic interest charged on the loan balance, APR combines the contract interest rate with mandatory upfront lender finance charges—including origination fees, discount points, underwriting charges, and mortgage insurance.
          </p>
          <p>
            Governed by the federal <strong>Truth in Lending Act (TILA)</strong> and codified in <strong>Regulation Z (12 CFR Part 1026)</strong>, APR enables borrowers to compare different loan offers on a standardized basis. Whenever a lender assesses upfront fees, the effective legal APR will invariably exceed the nominal note rate.
          </p>

          <AprVsInterestRateCostChart />

          <h2>Actuarial Derivation &amp; Mathematical Calculation of APR</h2>
          <p>
            Under federal Regulation Z guidelines, the exact APR on an installment loan is defined actuarially as the internal rate of return (IRR) <em>r</em> that equates net cash proceeds disbursed to the borrower with the present discounted value of all scheduled repayments:
          </p>

          <Formula>{"P - F = \\sum_{t=1}^{n} \\frac{PMT}{(1 + r_{\\text{monthly}})^t} = PMT \\left[ \\frac{1 - (1 + r_{\\text{monthly}})^{-n}}{r_{\\text{monthly}}} \\right]"}</Formula>
          <p>
            Where:
            <br />• <strong>P</strong> = Total face amount of the loan principal ($)
            <br />• <strong>F</strong> = Mandatory prepaid finance charges and upfront origination fees ($)
            <br />• <strong>P − F</strong> = Net loan capital proceeds disbursed to the borrower ($)
            <br />• <strong>PMT</strong> = Scheduled monthly principal and interest payment ($)
            <br />• <strong>n</strong> = Total scheduled monthly payment periods (e.g. 48 for a 4-year loan, 360 for a 30-year mortgage)
            <br />• <strong>r_monthly</strong> = Actuarial periodic monthly rate. Effective annualized APR is: <Formula>{"\\text{APR} = r_{\\text{monthly}} \\times 12 \\times 100\\%"}</Formula>
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a borrower securing an unsecured <strong>$20,000 personal loan</strong> over <strong>48 months</strong> at an advertised contract rate of <strong>7.50% APR</strong> with a <strong>3.00% ($600) upfront origination fee</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Nominal Monthly Payment (PMT):</strong> At periodic interest <Formula>{"i = 0.075 / 12 = 0.00625"}</Formula>, the monthly debt service is:
              <Formula>{"PMT = 20{,}000 \\times \\left[ \\frac{0.00625 \\times (1 + 0.00625)^{48}}{(1 + 0.00625)^{48} - 1} \\right] = \\$483.58 \\text{ / month}"}</Formula>
            </li>
            <li>
              <strong>Net Proceeds Disbursed:</strong> Subtracting the $600 origination fee yields net capital:
              <Formula>{"\\text{Net Proceeds} = \\$20{,}000 - \\$600 = \\$19{,}400.00"}</Formula>
            </li>
            <li>
              <strong>Actuarial Monthly Rate:</strong> Solving <Formula>{"19{,}400 = 483.58 \\times [1 - (1 + r)^{-48}] / r"}</Formula> yields periodic rate <Formula>{"r_{\\text{monthly}} = 0.007554"}</Formula>.
            </li>
            <li>
              <strong>Annualized Effective APR:</strong> Multiplying by 12 periods gives:
              <Formula>{"\\text{Effective APR} = 0.007554 \\times 12 = 9.065\\% \\text{ APR}"}</Formula>
              The borrower pays an effective 9.07% APR despite the 7.50% headline rate.
            </li>
          </ol>

          <h2>Fee Sensitivity: How Upfront Charges Escalate True Borrowing Costs</h2>
          <p>
            Upfront fees create a substantial percentage increase on shorter loans because the fee burden is amortized across fewer months:
          </p>

          <DataTable
            head={["Loan Category & Amount", "Nominal Rate", "Term Duration", "With 1% Fees ($)", "With 3% Fees ($)", "Effective APR Jump"]}
            rows={[
              ["Personal Loan ($10,000)", "8.99%", "36 Months", "$100 fee → 9.68% APR", "$300 fee → 11.08% APR", "+2.09% true cost rise"],
              ["Auto Loan ($30,000)", "6.50%", "60 Months", "$300 fee → 6.91% APR", "$900 fee → 7.78% APR", "+1.28% true cost rise"],
              ["30-Yr Fixed Mortgage ($350k)", "6.75%", "360 Months", "$3,500 fee → 6.84% APR", "$10,500 fee → 7.05% APR", "+0.30% true cost rise"],
              ["Short-Term Bridge ($15,000)", "12.00%", "12 Months", "$150 fee → 13.91% APR", "$450 fee → 17.82% APR", "+5.82% true cost rise"],
            ]}
          />

          <h2>Mortgage Discount Points vs. APR: Break-Even Economics</h2>
          <p>
            In mortgage lending, one discount point costs 1% of the loan note ($4,000 on a $400,000 loan) and lowers the rate by approximately 0.25%. Evaluating points requires analyzing the break-even timeline:
          </p>

          <DataTable
            head={["Mortgage Structure ($400k / 30-Yr)", "Nominal Rate", "Upfront Points Cost", "Monthly Payment (P&I)", "Monthly Cash Savings", "Break-Even Horizon"]}
            rows={[
              ["Zero-Point Baseline", "6.750%", "$0 upfront", "$2,594.30 / mo", "$0 / mo baseline", "Immediate (0 months)"],
              ["1 Discount Point (0.25% Buy-down)", "6.500%", "$4,000 upfront", "$2,528.27 / mo", "$66.03 / mo saved", "60.6 Months (5.05 Years)"],
              ["2 Discount Points (0.50% Buy-down)", "6.250%", "$8,000 upfront", "$2,462.86 / mo", "$131.44 / mo saved", "60.9 Months (5.07 Years)"],
              ["3 Discount Points (0.75% Buy-down)", "6.000%", "$12,000 upfront", "$2,398.20 / mo", "$196.10 / mo saved", "61.2 Months (5.10 Years)"],
            ]}
          />

          <h2>Prepayment &amp; Early Payoff: Impact on Realized APR</h2>
          <p>
            When a borrower liquidates a loan ahead of schedule—whether through voluntary extra monthly principal contributions, refinancing into a lower market rate, or selling the mortgaged property—the effective APR realized over the actual holding period increases. Because upfront closing costs and origination points are disbursed at loan consummation, shortening the repayment timeline compresses those fixed upfront fees over significantly fewer calendar months:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Full Contract Maturity:</strong> Fixed upfront charges represent a minor annualized fractional percentage, allowing realized borrowing costs to closely track the published APR.</li>
            <li><strong>5-Year Early Liquidation:</strong> Upfront points and administrative fees are absorbed across only 60 billing statements, increasing realized annualized financing costs by 0.35% to 1.15% above the contract note rate.</li>
            <li><strong>Prepayment Verification:</strong> Always confirm whether loan documents contain statutory prepayment penalties or minimum interest commitments prior to executing early payoffs.</li>
          </ul>

          <h2>Nominal Rate vs. APR vs. APY: Core Operational Differences</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Nominal Contract Interest Rate:</strong> The pure percentage used to compute periodic interest on the unpaid principal balance, ignoring all closing fees and origination costs.
            </li>
            <li>
              <strong>Annual Percentage Rate (APR):</strong> The federally regulated annualized borrowing cost combining the nominal rate plus all prepaid finance charges amortized across the full term.
            </li>
            <li>
              <strong>Annual Percentage Yield (APY):</strong> The compound interest rate earned on deposit accounts (savings, CDs) reflecting the growth of wealth rather than the cost of debt.
            </li>
          </ul>

          <h2>4 Crucial Borrowing Guidelines When Comparing APRs</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Account for Expected Loan Horizon:</strong> APR assumes full 30-year maturity. If you relocate or refinance within 3 to 5 years, paying heavy upfront points to buy a lower APR causes net financial loss.
            </li>
            <li>
              <strong>Inspect Third-Party Closing Exclusions:</strong> Federal regulations exclude title insurance, property appraisals, attorney fees, and recording costs from APR calculations.
            </li>
            <li>
              <strong>Avoid Comparing Across Different Terms:</strong> A 15-year loan at 6.25% APR cannot be directly compared to a 30-year loan at 6.50% APR due to accelerated principal reduction.
            </li>
            <li>
              <strong>Credit Card Revolving Compounding:</strong> Credit card APRs apply daily periodic interest on revolving balances, causing interest to compound faster than standard fixed installment loans.
            </li>
          </ol>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Financing &amp; Lending Solvers</h3>
            <p>
              Model full repayment schedules with our <a href="/calculators/finance/loan-calculator">Loan Calculator</a>, calculate 30-year home debt via the <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, examine vehicle financing using the <a href="/calculators/finance/auto-loan-calculator">Auto Loan Calculator</a>, and evaluate compound deposit yields with the <a href="/calculators/finance/apy-calculator">APY Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between a zero-cost mortgage and a low-APR mortgage?",
          a: "In a zero-closing-cost mortgage, the lender absorbs upfront closing expenses by either charging a slightly higher contract interest rate or rolling the fees into the financed principal. This eliminates upfront out-of-pocket cash requirements but produces a higher ongoing monthly payment and higher lifetime interest compared to a low-APR loan where fees are settled in cash upfront.",
        },
        {
          q: "How does loan amortization affect the accuracy of an APR disclosure?",
          a: "Standard APR disclosures assume uniform scheduled monthly repayments until full contractual maturity. If a borrower makes accelerated bi-weekly payments, pays extra principal monthly, or pays off the loan balance early in a lump sum, upfront fees are amortized over fewer months, which mathematically elevates the realized effective APR.",
        },
        {
          q: "Why is the APR higher than the advertised interest rate on a loan?",
          a: "APR is higher than the nominal interest rate because it folds upfront lender fees, origination charges, discount points, processing fees, and mandatory mortgage insurance into the overall annualized cost over the loan term.",
        },
        {
          q: "What closing costs and fees are legally excluded from APR calculations?",
          a: "Under CFPB Regulation Z, genuine third-party service fees are excluded from APR calculations, including real estate appraisals, property inspections, title insurance premiums, attorney representation fees, and municipal deed recording charges.",
        },
        {
          q: "Should a borrower always select the loan offer with the lowest APR?",
          a: "Not necessarily. If you keep the loan for its full duration, the lowest APR yields the lowest total cost. However, if you plan to sell or refinance within 2 to 5 years, paying upfront points to lower APR creates a net loss.",
        },
        {
          q: "How do mortgage discount points affect the published APR?",
          a: "Discount points represent prepaid interest paid upfront at closing to secure a permanently lower note rate. Paying points raises upfront closing cash but reduces monthly payments, lowering lifetime APR over long loan tenures.",
        },
        {
          q: "How does APR differ between fixed-rate installment loans and revolving credit cards?",
          a: "On fixed installment loans, APR amortizes fixed upfront fees alongside the simple interest rate over a fixed payoff horizon. On credit cards, APR reflects the annualized nominal finance charge assessed daily on unpaid revolving balances.",
        },
        {
          q: "Can a lender change the APR after issuing a Loan Estimate?",
          a: "Under TRID rules, if the final APR on a fixed-rate loan increases by more than 0.125% compared to the initial Loan Estimate due to closing cost changes, the lender must issue a revised Closing Disclosure and provide a mandatory 3-day waiting period.",
        },
      ]}
      related={[
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/finance/apy-calculator", icon: "📈", name: "APY Calculator" },
        { href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}