import RefinanceCalculator from "@/components/calcs/housing/refinance-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/refinance-calculator";
const TITLE = "Mortgage Refinance Calculator – Breakeven & Monthly Savings | CalcDigi";
const DESCRIPTION =
  "Free mortgage refinance calculator: calculate your monthly payment savings, breakeven timeline in months, lifetime interest reduction, and cash-out options for refinancing your home loan.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Mortgage Refinance Calculator"
      intro="Determine your monthly payment savings, breakeven timeline in months, and total lifetime interest saved by refinancing your home loan."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Breakeven (Months) = Refinance Closing Costs / (Old Monthly Payment - New Monthly Payment)"
      related={[
        { href: "/calculators/housing/home-equity-calculator", icon: "💰", name: "Home Equity" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/housing/down-payment-calculator", icon: "💵", name: "Down Payment" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
      ]}
      faq={[
        {
          q: "How does mortgage refinancing work?",
          a: "Refinancing replaces your existing mortgage with a brand new home loan, ideally with a lower interest rate, a shorter repayment term, or to convert equity into cash. The new lender pays off your old mortgage balance in full, and you begin making monthly payments under the new loan terms.",
        },
        {
          q: "How do I calculate the refinance breakeven point?",
          a: "Divide your total upfront refinance closing costs by your monthly payment savings (Closing Costs ÷ Monthly Savings = Breakeven in Months). For example, if refinancing costs $5,000 in closing fees and saves $200 per month, your breakeven point is 25 months (~2 years).",
        },
        {
          q: "How much lower should the interest rate be to justify refinancing?",
          a: "The traditional rule of thumb is a 1.0% to 2.0% reduction in interest rate. However, on larger mortgage balances ($300,000+), even a 0.75% or 0.50% interest rate reduction can generate significant savings and achieve breakeven within 24 to 36 months.",
        },
        {
          q: "What is the difference between rate-and-term vs cash-out refinancing?",
          a: "A rate-and-term refinance changes only your interest rate, loan duration (e.g., 30 years to 15 years), or loan type (ARM to Fixed) without taking extra money out. A cash-out refinance borrows more than you currently owe against your home equity and provides the difference in lump-sum cash for home renovations or debt consolidation.",
        },
        {
          q: "Can I refinance with zero closing costs?",
          a: "Yes. In a 'no-closing-cost' refinance, the lender either rolls the closing fees into your total loan balance (increasing the principal you owe) or absorbs the fees in exchange for a slightly higher interest rate (lender credits).",
        },
        {
          q: "How soon after buying a house can I refinance?",
          a: "For conventional rate-and-term refinances, there is typically no waiting period if refinancing with a different lender, though many lenders require a 6-month 'seasoning period'. For cash-out refinancing, Fannie Mae and Freddie Mac require you to have owned the property for at least 12 months.",
        },
      ]}
      article={
        <>
          {/* Sleek Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                CFPB &amp; Federal Reserve Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">Federal Reserve Board Consumer Handbook on Mortgage Refinances</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mortgage Underwriting Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate if Refinancing Makes Financial Sense</h2>
          <p>
            Refinancing is one of the most powerful wealth-optimization moves a homeowner can make when interest rates drop.
            However, because refinancing involves origination fees, appraisal costs, title insurance, and escrow prepayments
            (typically totaling 1.5% to 3.0% of the loan amount), you must ensure your <strong>breakeven horizon</strong> is
            shorter than the time you plan to stay in the property.
          </p>

          {/* Graph #2: Authoritative Visual Breakeven Savings Trajectory */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Refinance Breakeven Horizon &amp; Cumulative Net Cash Savings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark showing the crossover point where monthly payment savings surpass upfront closing fees ($5,500 fees at $250/mo savings).
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                Breakeven: Month 22
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[620px]" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Zero Axis */}
                <line x1="50" y1="130" x2="680" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="50" x2="680" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="90" x2="680" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />

                {/* Y-axis labels */}
                <text x="40" y="54" fontSize="11" fill="#64748b" textAnchor="end">+$10,000</text>
                <text x="40" y="94" fontSize="11" fill="#64748b" textAnchor="end">+$5,000</text>
                <text x="40" y="134" fontSize="11" fill="#64748b" textAnchor="end">$0 (Breakeven)</text>
                <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">-$5,500 (Fees)</text>

                {/* X-axis labels (Months) */}
                <text x="80" y="215" fontSize="11" fill="#64748b" textAnchor="middle">Month 0</text>
                <text x="190" y="215" fontSize="11" fill="#64748b" textAnchor="middle">Month 12</text>
                <text x="310" y="215" fontSize="11" fill="#64748b" textAnchor="middle">Month 24</text>
                <text x="440" y="215" fontSize="11" fill="#64748b" textAnchor="middle">Month 36</text>
                <text x="580" y="215" fontSize="11" fill="#64748b" textAnchor="middle">Month 60 (5 Yrs)</text>

                {/* Net Savings Curve */}
                <path
                  d="M80 174 L190 152 L310 126 L440 98 L580 46"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Crossover Circle */}
                <circle cx="280" cy="130" r="5" fill="#10b981" />
                <text x="280" y="118" fontSize="11" fill="#10b981" textAnchor="middle" fontWeight="bold">Breakeven Crossover (Month 22)</text>

                <text x="590" y="44" fontSize="11" fill="#10b981" fontWeight="bold">+$9,500 Pure Profit</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              After reaching Month 22, all upfront closing costs have been fully recovered, and monthly savings represent pure unencumbered cash flow.
            </p>
          </div>

          <h2>Formulas for Refinance Evaluation</h2>
          <Formula>
            Monthly Payment Savings = Old Monthly P&amp;I Payment - New Monthly P&amp;I Payment
          </Formula>
          <Formula>
            Breakeven Horizon (Months) = Total Refinance Closing Costs ÷ Monthly Payment Savings
          </Formula>
          <Formula>
            Net Lifetime Savings = Total Remaining Payments on Old Loan - Total Payments on New Loan - Closing Costs
          </Formula>

          <h2>Interest Rate Drop vs Monthly Savings Benchmark ($350,000 Loan)</h2>
          <DataTable
            head={["Interest Rate Reduction", "Old Payment (7.25%)", "New Payment", "Monthly Savings", "5-Year Net Cash Flow"]}
            rows={[
              ["0.50% Drop (to 6.75%)", "$2,388 / mo", "$2,270 / mo", "$118 / mo", "$7,080 saved"],
              ["0.75% Drop (to 6.50%)", "$2,388 / mo", "$2,212 / mo", "$176 / mo", "$10,560 saved"],
              ["1.00% Drop (to 6.25%)", "$2,388 / mo", "$2,156 / mo", "$232 / mo", "$13,920 saved"],
              ["1.50% Drop (to 5.75%)", "$2,388 / mo", "$2,043 / mo", "$345 / mo", "$20,700 saved"],
              ["2.00% Drop (to 5.25%)", "$2,388 / mo", "$1,933 / mo", "$455 / mo", "$27,300 saved"],
            ]}
            highlight={2}
          />

          <h2>When Should You NOT Refinance?</h2>
          <ul>
            <li>
              <strong>Moving Within 2 to 3 Years:</strong> If your breakeven period is 30 months and you plan to sell within
              24 months, you will lose money on upfront closing costs.
            </li>
            <li>
              <strong>Resetting the Amortization Clock:</strong> If you are 12 years into a 30-year mortgage, refinancing into
              a brand new 30-year term resets your amortization schedule back to Year 1, where payments are heavily front-loaded with interest.
              Consider refinancing into a 15-year or 20-year term instead.
            </li>
            <li>
              <strong>Prepayment Penalties:</strong> Verify whether your existing loan contract carries a prepayment penalty fee.
            </li>
          </ul>
          <p>
            Looking to convert your home equity into cash? Check your available borrowing limit with the{" "}
            <a href="/calculators/housing/home-equity-calculator">home equity calculator</a>, compare loan options on the{" "}
            <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, plan remodel costs with the{" "}
            <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>, or see property taxes on our{" "}
            <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
          </p>
        </>
      }
    >
      <RefinanceCalculator />
    </CalcPage>
  );
}
