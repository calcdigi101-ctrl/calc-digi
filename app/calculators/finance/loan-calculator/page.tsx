import type { Metadata } from "next";
import Calculator from "@/components/calcs/finance/loan-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LoanAmortizationScheduleChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/loan-calculator";
const CANONICAL_URL = "https://www.calcdigi.com/calculators/finance/loan-calculator";
const TITLE = "Loan Payment Calculator: Monthly Pay & Amortization Schedule";
const FULL_TITLE = "Loan Payment Calculator: Monthly Pay & Amortization Schedule | CalcDigi";
const DESCRIPTION =
  "Calculate your exact monthly loan payments, total interest, and full amortization payoff schedule. Fast, accurate, and free.";

export const metadata: Metadata = {
  title: { absolute: FULL_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: FULL_TITLE,
    description: DESCRIPTION,
    type: "website",
    url: CANONICAL_URL,
    siteName: "CalcDigi",
    images: [
      {
        url: "https://www.calcdigi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalcDigi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: DESCRIPTION,
    images: ["https://www.calcdigi.com/og-image.png"],
    creator: "@CalcDigi",
    site: "@CalcDigi",
  },
};

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Loan Calculator"
      intro="Calculate exact monthly payments, total lifetime interest, and year-by-year amortization schedules for fixed-rate installment loans. Model accelerated payoffs with custom extra monthly principal contributions."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="M = P \times \left[ \frac{r(1 + r)^n}{(1 + r)^n - 1} \right]"
      article={
        <>
          <h2>Direct Answer: How Fixed-Rate Installment Loan Amortization Works</h2>
          <p>
            An <strong>amortized fixed-rate installment loan</strong> requires equal monthly payments over a predetermined contractual term. In financial mathematics, each periodic payment covers that month&rsquo;s accrued interest first (calculated on the remaining outstanding principal balance), with the remaining portion directly reducing the loan principal. Because the principal balance steadily declines, subsequent interest charges shrink, causing a progressively greater share of each payment to build equity and retire the debt.
          </p>
          <p>
            Under federal <strong>Truth in Lending Act (TILA)</strong> disclosures, lenders must itemize the total finance charges and annual percentage rate (APR). Utilizing an installment loan calculator enables borrowers to model early extra payments, evaluate credit tier spreads, and avoid predatory front-loaded interest structures.
          </p>

          <LoanAmortizationScheduleChart />

          <h2>The Mathematical Derivation of Fixed Installment Amortization</h2>
          <p>
            The fixed monthly debt service on an amortized installment loan resolves through the present value ordinary annuity equation:
          </p>

          <Formula>{"M = P \\times \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right]"}</Formula>
          <p>
            Where:
            <br />• <strong>M</strong> = Fixed periodic monthly debt service payment ($)
            <br />• <strong>P</strong> = Total borrowed loan principal note ($)
            <br />• <strong>r</strong> = Periodic monthly interest rate, derived as <Formula>{"r = \\frac{\\text{Annual Percentage Rate (APR)}}{12 \\times 100}"}</Formula>
            <br />• <strong>n</strong> = Total number of monthly repayment periods (Loan Term in Years × 12)
          </p>
          <p>
            During any individual monthly statement cycle <em>t</em>, the internal payment allocation is governed by recursive amortization equations:
          </p>
          <Formula>{"\\text{Interest Charge } (I_t) = B_{t-1} \\times r"}</Formula>
          <Formula>{"\\text{Principal Reduction } (PR_t) = M - I_t"}</Formula>
          <Formula>{"\\text{Remaining Balance } (B_t) = B_{t-1} - PR_t"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a borrower securing a <strong>$20,000 personal loan</strong> financed over <strong>48 months</strong> at an interest rate of <strong>8.00% APR</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute periodic rate (r) and term (n).</strong>
              <Formula>{"r = \\frac{0.08}{12} = 0.0066667, \\quad n = 48"}</Formula>
            </li>
            <li>
              <strong>Step 2: Solve for scheduled monthly payment (M).</strong>
              <Formula>{"(1 + 0.0066667)^{48} = 1.374219"}</Formula>
              <Formula>{"M = 20{,}000 \\times \\left[ \\frac{0.0066667 \\times 1.374219}{1.374219 - 1} \\right] = 20{,}000 \\times 0.0244129 = \\$488.26 \\text{ / month}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Analyze Month 1 allocation.</strong> Interest charge equals <Formula>{"\\$20{,}000 \\times 0.0066667 = \\$133.33"}</Formula>. Principal reduction is <Formula>{"\\$488.26 - \\$133.33 = \\$354.93"}</Formula>. Unpaid principal balance declines to <Formula>{"\\$20{,}000 - \\$354.93 = \\$19{,}645.07"}</Formula>.
            </li>
            <li>
              <strong>Step 4: Analyze Month 2 allocation.</strong> Month 2 interest is assessed on the lower balance: <Formula>{"\\$19{,}645.07 \\times 0.0066667 = \\$130.97"}</Formula>. Principal reduction expands to <Formula>{"\\$488.26 - \\$130.97 = \\$357.29"}</Formula>.
            </li>
            <li>
              <strong>Step 5: Cumulative contract totals.</strong> Over 48 months, total payments equal <Formula>{"\\$488.26 \\times 48 = \\$23{,}436.48"}</Formula>. Total interest paid equals <Formula>{"\\$23{,}436.48 - \\$20{,}000 = \\$3{,}436.48"}</Formula>.
            </li>
          </ol>

          <h2>Installment Loan Payment Benchmarks by Credit Tier &amp; Term</h2>
          <p>
            Lenders price installment credit based on credit risk profiles and term duration. A shorter loan term demands higher monthly debt service but drastically reduces cumulative interest expenditure. The benchmark matrix below evaluates a standard <strong>$20,000 personal loan</strong> across standard credit tiers and repayment horizons:
          </p>

          <DataTable
            head={["Credit Score Tier", "Typical APR (%)", "3-Year Monthly / Interest", "5-Year Monthly / Interest", "7-Year Monthly / Interest"]}
            rows={[
              ["Excellent (750+)", "7.99%", "$626 / $2,536", "$405 / $4,300", "$311 / $6,124"],
              ["Good (700–749)", "11.49%", "$659 / $3,724", "$439 / $6,340", "$346 / $9,064"],
              ["Fair (640–699)", "16.99%", "$713 / $5,668", "$497 / $9,820", "$407 / $14,188"],
              ["Subprime (<640)", "24.99%", "$796 / $8,656", "$587 / $15,220", "$502 / $22,168"],
            ]}
          />

          <h2>Extra Principal Prepayment Acceleration Matrix ($20,000 Loan at 8% APR)</h2>
          <p>
            Because interest is calculated against the remaining principal balance, making extra monthly principal prepayments compresses early amortization schedules:
          </p>

          <DataTable
            head={["Repayment Strategy", "Monthly Cash Commitment", "Payoff Horizon", "Total Interest Paid", "Net Cash Savings"]}
            rows={[
              ["Standard Contract (Baseline)", "$488.26 / mo", "48 Months (4.0 Yrs)", "$3,436.48", "$0 (Baseline)"],
              ["+$50 / Month Extra Principal", "$538.26 / mo", "42.8 Months (3.6 Yrs)", "$3,040.80", "+$395.68 Interest Saved"],
              ["+$100 / Month Extra Principal", "$588.26 / mo", "38.6 Months (3.2 Yrs)", "$2,728.10", "+$708.38 Interest Saved"],
              ["+$200 / Month Extra Principal", "$688.26 / mo", "32.4 Months (2.7 Yrs)", "$2,268.40", "+$1,168.08 Interest Saved"],
              ["Bi-Weekly Payments (26x / yr)", "$244.13 every 2 weeks", "43.5 Months (3.6 Yrs)", "$3,090.20", "+$346.28 Interest Saved"],
            ]}
          />

          <h2>Simple Daily Interest vs. The Predatory Rule of 78s</h2>
          <p>
            When evaluating promissory loan contracts, borrowers must distinguish between simple interest and precomputed interest:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Simple Daily Interest (Standard):</strong> Interest accrues daily strictly on the unpaid balance. Prepaying principal immediately reduces the interest calculation base, guaranteeing full financial rewards for early payoff.
            </li>
            <li>
              <strong>Precomputed Rule of 78s (Outdated / Predatory):</strong> All future lifetime interest is calculated at contract inception and allocated disproportionately into early months using the sum-of-the-digits formula. Paying off early saves negligible interest. Federal law prohibits the Rule of 78s on loans exceeding 61 months, but subprime lenders occasionally utilize it on short-term contracts.
            </li>
          </ul>

          <h2>Core Strategies to Slash Total Borrowing Costs</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Enroll in Automated Payment (ACH) Discounts:</strong> Most major personal loan and auto loan lenders provide an automatic 0.25% to 0.50% APR interest rate reduction for enrolling in auto-pay.
            </li>
            <li>
              <strong>Make Targeted Principal Prepayments:</strong> Adding just $50 to $100 per month directly to the principal balance bypasses future interest accumulation, shaving months off the loan term.
            </li>
            <li>
              <strong>Execute Bi-Weekly Payment Transfers:</strong> Remitting half-payments every two weeks yields 26 half-payments per year—effectively 13 full payments instead of 12—accelerating payoff without budget disruption.
            </li>
            <li>
              <strong>Confirm Zero Prepayment Penalties:</strong> Ensure your loan agreement explicitly confirms no prepayment fees so extra payments yield 100% net interest savings.
            </li>
          </ol>

          <h2>Essential Loan Financing Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Principal:</strong> The gross capital amount borrowed from a lender before finance charges, interest, or fees accrue.</li>
            <li><strong>Amortization Schedule:</strong> A complete table detailing each periodic monthly payment, broken down into interest, principal reduction, and remaining loan balance.</li>
            <li><strong>Origination Fee:</strong> An upfront administrative fee (typically 1% to 6%) deducted from loan proceeds upon closing to cover lender underwriting costs.</li>
            <li><strong>Unsecured vs. Secured Loan:</strong> Secured loans require physical collateral (such as a vehicle or home), while unsecured personal loans rely solely on creditworthiness.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Debt &amp; Financing Solvers</h3>
            <p>
              Compare financing options across our specialized debt architecture. Uncover vehicle depreciation with the <a href="/calculators/finance/auto-loan-calculator">Auto Loan Calculator</a>, evaluate real borrowing costs via the <a href="/calculators/finance/apr-calculator">APR Calculator</a>, model residential debt with the <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, and eliminate multiple revolving balances with the <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between nominal interest rate and APR?",
          a: "The nominal interest rate reflects only the direct cost of borrowing the principal balance. The Annual Percentage Rate (APR) incorporates mandatory upfront lender fees, such as origination charges and administrative costs, annualized across the loan term. When evaluating multiple lenders, APR provides the true standard of comparison.",
        },
        {
          q: "How does making extra payments accelerate loan payoff?",
          a: "Because regular payments are structured to pay accrued interest first, additional principal payments directly shrink the underlying balance. Since subsequent interest is assessed on a smaller balance, future monthly payments allocate more dollars toward principal, creating a compounding debt-reduction flywheel.",
        },
        {
          q: "Are personal loans simple interest or precomputed interest?",
          a: "Virtually all reputable consumer personal loans utilize simple daily interest, where interest accrues daily based strictly on the remaining principal balance. Always verify with your lender that the loan does not use precomputed interest or the Rule of 78s.",
        },
        {
          q: "Can I pay off my personal loan early without penalties?",
          a: "Most modern personal loan lenders do not charge prepayment penalties. However, always review your loan agreement's promissory note to ensure there are no prepayment penalty clauses or minimum interest clauses before accelerating payments.",
        },
        {
          q: "How does my credit score affect personal loan interest rates?",
          a: "Credit scores are the primary determinant of personal loan APRs. Borrowers with excellent credit (750+) typically qualify for APRs between 7% and 10%, while fair or subprime scores (below 650) often incur rates of 18% to 32% or require collateral.",
        },
        {
          q: "What is an origination fee and how is it paid?",
          a: "An origination fee is an upfront processing charge (ranging from 1% to 8% of the loan amount) assessed by lenders. It is typically deducted directly from your loan payout: if you borrow $10,000 with a 5% ($500) origination fee, you receive $9,500 in cash but repay $10,000.",
        },
        {
          q: "What is the difference between fixed-rate and variable-rate loans?",
          a: "Fixed-rate loans guarantee identical monthly payments and interest rates for the entire duration of the loan. Variable-rate loans fluctuate with benchmark interest rates (like the SOFR or Prime Rate), meaning monthly payments can rise or fall over time.",
        },
        {
          q: "How does a debt consolidation personal loan save money?",
          a: "Consolidation replaces multiple high-interest revolving credit cards (averaging 24% APR) with a single personal installment loan at a lower fixed APR (e.g. 10% to 12%). This reduces monthly interest, simplifies budgeting, and locks in a guaranteed payoff date.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan Payment Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator (PITI & Amortization)" },
        { href: "https://www.calcdigi.com/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}