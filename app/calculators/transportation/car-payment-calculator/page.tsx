import type { Metadata } from "next";
import Link from "next/link";
import CarPaymentCalculatorComponent from "@/components/calcs/transportation/car-payment-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AutoLoanAmortizationBalanceChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/car-payment-calculator";
const TITLE = "Car Payment Calculator | Auto Loan Amortization & Monthly Cost";
const DESCRIPTION =
  "Calculate monthly auto loan payments, financing interest charges, sales tax liabilities, and amortization schedules across 36 to 84-month terms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/ev-savings-calculator", icon: "⚡", name: "EV Savings Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/moving-cost-calculator", icon: "📦", name: "Moving Cost Calculator" },
];

export default function CarPaymentCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/transportation", label: "Transportation & Travel" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Auto Financing Summary: The Classical Amortization Equation
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              An auto loan is a fully amortizing secured installment contract. Because monthly payments remain fixed throughout the loan tenure, interest charges are front-loaded during the early payment cycles when the unpaid principal balance is largest. Financing charges interact directly with vehicular equity loss modeled in our{" "}
              <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium underline hover:text-amber-900">
                car depreciation calculator
              </Link>{" "}
              and monthly commuting budgets in the{" "}
              <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium underline hover:text-amber-900">
                commute cost calculator
              </Link>.
            </p>
          </div>

          <h2>Auto Loan Financing Mathematics & Amortization Mechanics</h2>
          <AutoLoanAmortizationBalanceChart />
          <p>
            In consumer finance and commercial credit underwriting, the monthly installment payment on a fixed-rate automotive loan is governed by the standard annuity amortization formula. The total financed principal represents the vehicle negotiated sale price plus state sales taxes, dealer documentation fees, and licensing charges, reduced by cash down payments and net trade-in equity allowances.
          </p>
          <p>
            The lender charges an Annual Percentage Rate (APR), which is converted to an effective monthly periodic interest rate (r = APR / 12). Each monthly payment is partitioned into two distinct components: an interest charge representing the cost of borrowed capital, and a principal reduction that amortizes the debt balance. Operating budgets can be verified in our{" "}
            <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              fuel cost calculator
            </Link>:
          </p>

          <Formula>
            {"M = P \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}"}
          </Formula>

          <Formula>
            {"I_k = B_{k-1} \cdot r, \quad \Delta P_k = M - I_k"}
          </Formula>

          <Formula>
            {"B_k = B_{k-1} - \Delta P_k = P \cdot \frac{(1 + r)^n - (1 + r)^k}{(1 + r)^n - 1}"}
          </Formula>

          <Formula>
            {"\text{Total Interest Paid} = (M \times n) - P"}
          </Formula>

          <h2>Automotive Financing Amortization Matrix: $35,000 Financed at 6.5% APR</h2>
          <p>
            The reference schedule below models how extending loan duration lowers monthly cash flow requirements while substantially compounding total interest charges and delaying principal equity payoff:
          </p>

          <DataTable
            head={[
              "Loan Term Duration",
              "Monthly Payment ($)",
              "Total Financed Interest ($)",
              "Grand Total Out-of-Pocket",
              "Interest Share of Total",
              "Months Underwater (Risk)",
            ]}
            rows={[
              ["36 Months (3.0 Years)", "$1,072.54", "$3,611", "$38,611", "9.4%", "0 - 6 months (Minimal)"],
              ["48 Months (4.0 Years)", "$829.83", "$4,832", "$39,832", "12.1%", "6 - 14 months (Low)"],
              ["60 Months (5.0 Years)", "$684.85", "$6,091", "$41,091", "14.8%", "18 - 28 months (Moderate)"],
              ["72 Months (6.0 Years)", "$588.62", "$7,381", "$42,381", "17.4%", "30 - 42 months (High Risk)"],
              ["84 Months (7.0 Years)", "$520.30", "$8,705", "$43,705", "19.9%", "42 - 58 months (Severe Risk)"],
              ["96 Months (8.0 Years)", "$469.45", "$10,067", "$45,067", "22.3%", "54 - 72 months (Critical Underwater)"],
            ]}
          />

          <h2>Worked Financial Scenario: Financing a $40,000 Family Crossover</h2>
          <p>
            Consider a family purchasing a new midsize crossover with a negotiated sale price of $40,000 in a municipality with a 7.5% sales tax rate. The buyer provides a $5,000 cash down payment and trades in an older vehicle with $3,000 in net equity. We analyze a 60-month loan at 5.9% APR alongside long-distance travel planning in our{" "}
            <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              distance calculator
            </Link>{" "}
            and relocation scenarios in the{" "}
            <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              moving cost calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Taxable Amount & Trade-In Credit:</strong> In most states, sales tax applies only to the net difference after trade-in equity:
              <Formula>
                {"\text{Taxable Basis} = \$40{,}000 - \$3{,}000 = \$37{,}000"}
              </Formula>
              Sales Tax (7.5%) = $37,000 * 0.075 = $2,775.
            </li>
            <li>
              <strong>Total Financed Principal (P):</strong>
              <Formula>
                {"P = (\$40{,}000 + \$2{,}775) - (\$5{,}000 \text{ Down} + \$3{,}000 \text{ Trade}) = \$34{,}775"}
              </Formula>
            </li>
            <li>
              <strong>Monthly Periodic Rate & Term:</strong> Annual APR of 5.9% yields a monthly periodic interest rate r = 0.059 / 12 = 0.0049167. Term n = 60 months.
            </li>
            <li>
              <strong>Monthly Payment Calculation:</strong>
              <Formula>
                {"M = \$34{,}775 \times \frac{0.0049167(1 + 0.0049167)^{60}}{(1 + 0.0049167)^{60} - 1} = \$34{,}775 \times 0.019289 = \$670.78\,/\text{month}"}
              </Formula>
            </li>
            <li>
              <strong>Cumulative Financing Expense:</strong> Over 60 months, total loan payments equal $670.78 * 60 = $40,246.80. Deducting the principal of $34,775 leaves $5,471.80 in total interest paid to the lender.
            </li>
            <li>
              <strong>Total Capital Outlay:</strong> Adding the initial $5,000 cash down payment and $3,000 trade-in equity brings the grand out-of-pocket acquisition cost to $48,246.80.
            </li>
          
            <li>
              <strong>GAP Protection:</strong> Early loan depreciation outpaces principal amortization. If total loss occurs, GAP insurance covers the negative equity shortfall between market value and remaining balance.
            </li>
          </ul>

          <h2>The 20/4/10 Rule of Prudent Automotive Budgeting</h2>
          <p>
            Certified Financial Planners (CFP) and consumer economists widely recommend the "20/4/10 rule" as the gold standard for automotive debt sustainability:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>20% Down Payment:</strong> Putting down at least 20% in upfront cash or trade-in equity absorbs the immediate 15% to 20% first-year drive-off depreciation, ensuring the loan never becomes underwater.
            </li>
            <li>
              <strong>4-Year Maximum Term (48 Months):</strong> Financing for no longer than 48 months prevents interest compounding and aligns principal amortization with the vehicle&apos;s real-world residual market value decay.
            </li>
            <li>
              <strong>10% Income Ceiling:</strong> Total monthly vehicular transportation costs—including monthly loan payment, collision insurance, fuel, and routine maintenance analyzed in our{" "}
              <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                commute cost calculator
              </Link>—should never exceed 10% of the household&apos;s gross monthly income.
            </li>
          
            <li>
              <strong>GAP Protection:</strong> Early loan depreciation outpaces principal amortization. If total loss occurs, GAP insurance covers the negative equity shortfall between market value and remaining balance.
            </li>
          </ul>

          <h2>Operational Pitfalls, Extended Loan Terms & Gap Insurance Necessity</h2>
          <p>
            Navigating dealership financing offices requires strict consumer vigilance:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The 72- and 84-Month Trap:</strong> Dealership finance managers frequently steer buyers toward 72- or 84-month terms to mask high vehicle purchase prices with artificial $400/month affordability. In an 84-month loan, the consumer pays over double the financing interest.
            </li>
            <li>
              <strong>Guaranteed Asset Protection (GAP) Insurance:</strong> If financing with less than 15% down on an extended term, carrying GAP insurance is essential. If the vehicle is totaled in a collision during year two, regular auto insurance pays only fair market value ($26,000), leaving the driver personally liable for the remaining $31,000 loan balance.
            </li>
            <li>
              <strong>Dealer Interest Rate Markup (Reserve):</strong> Lenders often approve a borrower at a "buy rate" of 5.0%, but the dealership legally marks up the loan to 6.5% APR, pocketing the financing difference as backend dealer reserve profit.
            </li>
            <li>
              <strong>Total Cost of Ownership Synergy:</strong> Monthly financing costs must be modeled in harmony with electric operational savings calculated in our{" "}
              <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                ev savings calculator
              </Link>{" "}
              and fuel costs via the{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                fuel cost calculator
              </Link>.
            </li>
          
            <li>
              <strong>GAP Protection:</strong> Early loan depreciation outpaces principal amortization. If total loss occurs, GAP insurance covers the negative equity shortfall between market value and remaining balance.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does my credit score directly affect the interest rate (APR) I receive?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Auto financing rates are tiered based on credit scores (FICO Auto Score). Super-prime borrowers (780+) typically receive APRs between 4.5% and 6.0%, whereas subprime borrowers (below 600) frequently face APRs exceeding 14% to 20%, adding $8,000 to $14,000 in unnecessary interest charges over a 5-year loan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Is it better to take dealer 0% financing or a cash-back rebate?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Calculate both options. Often, taking a $3,500 cash rebate and financing through an external credit union at 5.0% APR yields a lower total financed cost than paying full MSRP at 0% APR, especially on loans under 48 months.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Can I pay off my auto loan early to save on financing interest?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes. The vast majority of standard auto installment loans utilize simple interest calculation without prepayment penalties. Making additional principal-only payments directly reduces the remaining loan balance, cutting total interest paid and shortening loan duration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does trade-in equity reduce my overall sales tax burden?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In 42 of 50 US states, trade-in tax credits are legally recognized. If you buy a $40,000 car and trade in a vehicle worth $10,000, you pay state sales tax only on the $30,000 difference. At an 8% tax rate, this trade-in credit saves you $800 in cash sales taxes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does vehicle depreciation correlate with auto loan financing health?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                If your vehicle depreciates faster than you pay down principal (common in 72+ month loans with low down payments modeled in our{" "}
                <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car depreciation calculator
                </Link>), you become trapped in negative equity, preventing you from trading or selling the vehicle without paying cash out-of-pocket.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What upfront fees should I expect when finalizing an auto loan purchase?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Standard out-of-pocket acquisition costs include state sales taxes, state department of motor vehicles (DMV) title and registration fees, and dealer documentation fees (typically capped by state law between $150 and $899).
              </p>
            </div>
          </div>

          <h2>Authoritative Consumer Credit Standards & Financing Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Consumer Financial Protection Bureau (CFPB):</strong> Auto Loan Basics, Truth in Lending Act (TILA Regulation Z) disclosure guidelines.
            </li>
            <li>
              <strong>Federal Trade Commission (FTC):</strong> Auto Buyer&apos;s Guide, Financing Rules and Combating Auto Retail Junk Fees (CARS Rule).
            </li>
            <li>
              <strong>Federal Reserve Board (Consumer Credit Statistical Release G.19):</strong> Commercial bank and captive automotive finance interest rates.
            </li>
            <li>
              <strong>National Consumer Law Center (NCLC):</strong> Automobile Lending and Credit Sales Consumer Rights Manual.
            </li>
          
            <li>
              <strong>GAP Protection:</strong> Early loan depreciation outpaces principal amortization. If total loss occurs, GAP insurance covers the negative equity shortfall between market value and remaining balance.
            </li>
          </ul>
        </>
      }
    >
      <CarPaymentCalculatorComponent />
    </CalcPage>
  );
}
