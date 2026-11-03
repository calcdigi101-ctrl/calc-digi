import Calculator from "@/components/calcs/finance/down-payment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DownPaymentPmiComparisonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/down-payment-calculator";
const TITLE = "Down Payment Calculator";
const DESCRIPTION =
  "Free home down payment calculator: calculate down payment amounts across 3%, 3.5%, 5%, 10%, and 20% tiers. Analyze private mortgage insurance (PMI) costs.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Down Payment Calculator"
      intro="Calculate exact upfront cash required, monthly mortgage debt service, and lifetime Private Mortgage Insurance (PMI) costs across standard home purchase down payment tiers."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Down Payment} = \text{Price} \times d, \quad P = \text{Price} \times (1 - d)"
      article={
        <>
          <h2>Direct Answer: Down Payment Percentages &amp; Upfront Homebuyer Requirements</h2>
          <p>
            A <strong>real estate down payment</strong> is the upfront cash equity a homebuyer commits toward the purchase price of residential property, with a mortgage lender financing the remaining principal balance. While traditional guidelines recommended a 20% cash down payment, modern mortgage programs offer lower entry barriers: conventional loans start at <strong>3% to 5% down</strong>, federal FHA loans require <strong>3.5% down</strong>, and VA or USDA loans offer <strong>0% down</strong> for qualifying military veterans and rural homebuyers.
          </p>
          <p>
            However, putting down less than 20% on conventional financing triggers mandatory <strong>Private Mortgage Insurance (PMI)</strong>, which protects the lender against default. Evaluating down payment options requires balancing upfront liquidity preservation against monthly PMI premiums and lifetime borrowing interest.
          </p>

          <DownPaymentPmiComparisonChart />

          <h2>Actuarial Mathematics of Down Payments &amp; Loan-to-Value (LTV)</h2>
          <p>
            The down payment determines the borrowed loan principal <em>P</em> and the initial <strong>Loan-to-Value (LTV) ratio</strong>, which dictates statutory mortgage insurance pricing:
          </p>

          <Formula>{"\\text{Down Payment Cash } (D) = \\text{Purchase Price} \\times d"}</Formula>
          <Formula>{"\\text{Financed Principal } (P) = \\text{Purchase Price} - D = \\text{Purchase Price} \\times (1 - d)"}</Formula>
          <Formula>{"\\text{Loan-to-Value } (\\text{LTV}) = \\frac{P}{\\text{Appraised Valuation}} = 1 - d"}</Formula>
          <p>
            Where:
            <br />• <strong>d</strong> = Down payment percentage expressed as a decimal (e.g. 0.05 for 5%, 0.20 for 20%)
            <br />• <strong>P</strong> = Net mortgage loan note balance ($)
            <br />• <strong>PMI_monthly</strong> = Monthly mortgage insurance premium: <Formula>{"\\text{PMI}_{\\text{monthly}} = \\frac{P \\times \\text{Annual PMI Rate}}{12}"}</Formula>
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a buyer evaluating a <strong>$400,000 home purchase</strong> financed via a 30-year fixed mortgage at <strong>6.75% APR</strong>, comparing <strong>5% down ($20,000)</strong> against <strong>20% down ($80,000)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Scenario A (5% Down Payment):</strong> The buyer commits <Formula>{"\\$400{,}000 \\times 0.05 = \\$20{,}000"}</Formula> in cash, leaving a loan note balance of <Formula>{"P = \\$380{,}000"}</Formula> (95% LTV).
            </li>
            <li>
              <strong>Scenario A Monthly Debt &amp; PMI:</strong> At 6.75% APR, monthly principal and interest equals <Formula>{"\\$2{,}464.68 / \\text{mo}"}</Formula>. At an annual PMI rate of 0.58%, monthly PMI adds <Formula>{"\\$380{,}000 \\times 0.0058 / 12 = \\$183.67 / \\text{mo}"}</Formula>, producing a total monthly payment of <Formula>{"\\$2{,}648.35 / \\text{mo}"}</Formula>. Reaching 78% LTV requires approximately <strong>96 months</strong>, accumulating <strong>$17,632 in lifetime PMI fees</strong>.
            </li>
            <li>
              <strong>Scenario B (20% Down Payment):</strong> The buyer commits <Formula>{"\\$400{,}000 \\times 0.20 = \\$80{,}000"}</Formula> in cash. Loan note balance is <Formula>{"P = \\$320{,}000"}</Formula> (80% LTV).
            </li>
            <li>
              <strong>Scenario B Monthly Debt &amp; Savings:</strong> Monthly principal and interest equals <Formula>{"\\$2{,}075.52 / \\text{mo}"}</Formula> with <strong>$0 PMI</strong>.
            </li>
            <li>
              <strong>Comparative Summary:</strong> Putting 20% down lowers mandatory monthly housing payments by <Formula>{"\\$2{,}648.35 - \\$2{,}075.52 = \\$572.83 / \\text{month}"}</Formula> and saves <strong>$139,898 in lifetime interest</strong> plus $17,632 in eliminated PMI.
            </li>
          </ol>

          <h2>Down Payment Tier Matrix: $400,000 Home Purchase Analysis</h2>
          <p>
            The table below illustrates how different down payment percentages influence upfront liquidity requirements, monthly mortgage obligations, and lifetime mortgage insurance costs:
          </p>

          <DataTable
            head={["Loan Program & Tier", "Down Payment (%)", "Upfront Cash ($)", "Monthly PMI Rate", "Estimated Lifetime PMI"]}
            rows={[
              ["FHA Home Loan", "3.5%", "$14,000", "0.55% annual ($177/mo)", "$18,400+ (Life of Loan)"],
              ["Conventional First-Time", "3.0% – 5.0%", "$12,000 – $20,000", "0.40% – 0.90% annual", "$8,200 – $11,500"],
              ["Conventional Mid-Tier", "10.0%", "$40,000", "0.30% – 0.50% annual", "$4,800 – $6,200"],
              ["Conventional Standard", "20.0%", "$80,000", "$0.00 (No PMI Required)", "$0.00 (100% Exemption)"],
            ]}
          />

          <h2>Opportunity Cost Analysis: 5% Down + Investing the Spread vs. 20% Down</h2>
          <p>
            Rather than locking up $80,000 in home equity, aggressive wealth builders often put 5% down ($20,000) and invest the remaining $60,000 in diversified equity index funds. The model below compares both strategies over a 10-year holding horizon:
          </p>

          <DataTable
            head={["Financial Dimension", "Strategy A: 20% Down ($80k Equity)", "Strategy B: 5% Down ($20k Equity + $60k Stock Portfolio)", "Strategic Wealth Winner"]}
            rows={[
              ["Initial Upfront Cash", "$80,000 to home equity", "$20,000 home / $60,000 invested", "Strategy B retains liquid reserves"],
              ["Monthly Housing Cash Flow", "$2,075.52 / mo (lower debt)", "$2,648.35 / mo (+$572.83 higher)", "Strategy A saves $573/mo in cash flow"],
              ["10-Year Equity Portfolio Value", "$0 outside equity", "$129,535 (at 8% compound annual return)", "Strategy B compounds liquid market wealth"],
              ["10-Year Mortgage Interest + PMI Paid", "$205,340 total interest", "$243,840 interest + $17,632 PMI", "Strategy A saves $56,132 in borrowing drag"],
              ["Net 10-Year Financial Advantage", "+$56,132 lower borrowing costs", "+$73,403 net equity market gain", "Strategy B yields +$17,271 higher net worth"],
            ]}
          />

          <h2>Federal PMI Cancellation Rules Under the Homeowners Protection Act</h2>
          <p>
            Under the federal <em>Homeowners Protection Act of 1998 (HPA)</em>, borrowers paying PMI on conventional loans possess clear statutory rights to remove coverage:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Borrower-Requested Cancellation (80% LTV):</strong> You can request written PMI removal once the principal balance reaches 80% of original property value, provided payments are current and no subordinate liens exist.
            </li>
            <li>
              <strong>Automatic Lender Termination (78% LTV):</strong> Mortgage servicers must automatically terminate PMI once scheduled payments reach 78% LTV of the original purchase price.
            </li>
            <li>
              <strong>Appreciation-Based Removal:</strong> If local home prices rise, borrowers can request early cancellation by funding an independent appraisal showing current LTV below 75% (loans 2 to 5 years old) or 80% (loans over 5 years old).
            </li>
            <li>
              <strong>FHA Mortgage Insurance Premium (MIP) Trap:</strong> On FHA loans with less than 10% down, annual MIP persists for the entire 30-year term. Borrowers must refinance into a conventional loan to eliminate it.
            </li>
          </ul>

          <h2>4 Core Strategies for First-Time Homebuyer Down Payments</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Down Payment Assistance (DPA) Grants:</strong> State Housing Finance Agencies (HFAs) provide forgivable second mortgages or grants covering 3% to 5% of down payment and closing costs for qualifying buyers.
            </li>
            <li>
              <strong>Penalty-Free IRA Homebuyer Withdrawals:</strong> Under IRS Section 72(t), first-time buyers can withdraw up to $10,000 from traditional or Roth IRAs without incurring the 10% early withdrawal penalty.
            </li>
            <li>
              <strong>Family Gift Fund Documentation:</strong> Conventional and FHA loans permit family gift funds, provided donors complete a formal gift letter confirming the capital requires no repayment.
            </li>
            <li>
              <strong>Maintain Post-Closing Liquid Reserves:</strong> Lenders require 1 to 3 months of PITI reserves in savings after closing. Never deplete your entire bank balance on down payments.
            </li>
          </ol>

          <h2>Essential Down Payment Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Loan-to-Value (LTV):</strong> The mortgage debt balance divided by appraised property value. LTV above 80% triggers PMI requirements.</li>
            <li><strong>Private Mortgage Insurance (PMI):</strong> Default insurance policy paid by the borrower protecting the lender on conventional loans with less than 20% down.</li>
            <li><strong>FHA Upfront MIP (UFMIP):</strong> A mandatory 1.75% upfront fee assessed on all FHA mortgages, typically financed into the total loan balance.</li>
            <li><strong>Earnest Money Deposit (EMD):</strong> A good-faith deposit (typically 1% to 2% of price) submitted with a purchase offer that is credited toward your down payment at closing.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Real Estate &amp; Financing Solvers</h3>
            <p>
              Evaluate complete 30-year amortization using our <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, calculate household purchasing limits via the <a href="/calculators/finance/home-affordability-calculator">Home Affordability Calculator</a>, compare renting vs homeownership with the <a href="/calculators/finance/rent-vs-buy-calculator">Rent vs Buy Calculator</a>, and model monthly savings goals with the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Is it better to put 20% down or invest the cash?",
          a: "Putting 20% down eliminates PMI (saving $100 to $250/month) and lowers monthly debt payments. However, putting down 5% to 10% and investing the remaining cash in diversified index funds historically generates higher total net worth over long horizons due to compound stock market returns.",
        },
        {
          q: "What closing costs are required in addition to the down payment?",
          a: "In addition to your down payment, buyers must pay settlement closing costs typically totaling 2% to 5% of the purchase price. On a $400,000 home, expect $8,000 to $20,000 for loan origination, property appraisal, title insurance, escrow reserves, and transfer taxes.",
        },
        {
          q: "Can gift funds be used for a home down payment?",
          a: "Yes. Conventional, FHA, and VA loan programs permit gift funds from immediate family members, provided the donor signs an official lender gift letter confirming the funds do not require repayment.",
        },
        {
          q: "Does home value appreciation remove PMI automatically?",
          a: "Not automatically. If local market appreciation pushes your LTV below 80% earlier than scheduled, you must submit a written request to your loan servicer and pay for a lender-ordered appraisal to verify the home's increased valuation.",
        },
        {
          q: "What is the minimum down payment for a conventional mortgage?",
          a: "For qualified first-time homebuyers, Fannie Mae HomeReady and Freddie Mac Home Possible programs permit down payments as low as 3.0% of the purchase price. Repeat buyers generally need a minimum of 5.0% down.",
        },
        {
          q: "How does down payment size impact mortgage interest rates?",
          a: "Higher down payments reduce lender risk, which can qualify borrowers for slightly lower interest rates (typically 12.5 to 25 basis points lower) and lower loan-level price adjustments (LLPAs) established by Fannie Mae.",
        },
        {
          q: "Can I borrow money for a down payment?",
          a: "Underwriting rules strictly prohibit using unsecured debt (such as personal loans or credit card advances) for a down payment. Permissible sources include personal savings, investments, approved state DPA programs, 401(k) loans, or bona fide family gifts.",
        },
        {
          q: "What happens to my earnest money deposit if the deal falls through?",
          a: "If the transaction is canceled under a valid contractual contingency (such as financing, appraisal, or inspection contingencies), your earnest money deposit is fully refunded. Canceling without a contingency forfeits the deposit to the seller.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/finance/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Personal Loan" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}