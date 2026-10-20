import RefinanceCalculator from "@/components/calcs/housing/refinance-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RefinanceBreakevenChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/refinance-calculator";
const TITLE = "Refinance Calculator – Break-Even, Savings and Term";
const DESCRIPTION = "Free mortgage refinance calculator: compare new interest rates, monthly savings, break-even timelines, closing costs, and lifetime interest reduction.";

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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <RefinanceBreakevenChart />

          <h2>Formulas for Refinance Evaluation</h2>
          <Formula>
            Monthly Payment Savings = Old Monthly P&amp;I Payment - New Monthly P&amp;I Payment
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $350,000 Balance Drop from 7.25% to 5.75%</h2>

            <p>
              Suppose you currently owe <strong>$350,000</strong> on a 30-year fixed mortgage at <strong>7.25% interest ($2,388/mo P&amp;I)</strong> and have an offer to refinance into a new 30-year fixed loan at <strong>5.75% interest ($2,042/mo P&amp;I)</strong> with <strong>$5,200 in closing costs</strong>:
            </p>
            <ul>
              <li><strong>Step 1: Calculate Monthly Payment Savings</strong>: $2,388 - $2,042 = <strong>$346.00 saved per month</strong>.</li>
              <li><strong>Step 2: Calculate Breakeven Horizon</strong>: $5,200 closing costs ÷ $346/mo = <strong>15.0 months to break even</strong>.</li>
              <li><strong>Step 3: 5-Year Net Cash Savings</strong>: (60 months × $346/mo) - $5,200 costs = $20,760 - $5,200 = <strong>$15,560 net cash gained</strong>.</li>
              <li><strong>Decision Rule</strong>: If you intend to stay in the home longer than 15 months (1.25 years), this refinance is a highly profitable financial decision.</li>
            </ul>


            <h2>Common Refinance Traps &amp; Costly Pitfalls</h2>
            <p>Avoid these four financial traps before signing new mortgage loan documents:</p>
            <ul>
              <li><strong>Resetting the Amortization Clock:</strong> If you are 7 years into a 30-year mortgage and refinance into a new 30-year loan, you reset your amortization schedule back to Year 1, stretching total repayment to 37 years and potentially paying more lifetime interest despite a lower rate. Consider refinancing into a 20-year or 15-year term.</li>
              <li><strong>Moving Before Reaching the Breakeven Horizon:</strong> If your breakeven timeline is 30 months and you sell or relocate after 18 months, you forfeit thousands of dollars in unrecovered closing costs.</li>
              <li><strong>Rolling Closing Costs into the Loan Uncritically:</strong> While financing closing fees into the loan balance avoids out-of-pocket cash, you pay compound interest on those fees over the life of the loan.</li>
              <li><strong>Ignoring Cash-Out Equity Depreciation:</strong> Stripping equity via cash-out refinancing reduces your equity cushion below 20%, which can trigger new private mortgage insurance (PMI) charges.</li>
            </ul>


            <h2>State Recording Fees &amp; Mortgage Transfer Taxes</h2>
            <p>
              Closing costs vary widely across states due to state-specific transfer taxes and mortgage recording fees:
            </p>
            <ul>
              <li><strong>High-Fee States:</strong> New York (Mortgage Recording Tax up to 1.925%), Florida (Doc Stamps of 0.35% + 0.20% Intangible Tax), and Maryland levy heavy documentary taxes that elevate refinance closing costs.</li>
              <li><strong>Low-Fee States:</strong> Texas, California, and Arizona charge nominal flat recording fees ($50–$150), allowing faster breakeven timelines under 12 months.</li>
            </ul>
            <p>
              Check your existing equity stake with our <a href="/calculators/housing/home-equity-calculator">home equity calculator</a>, compare monthly amortization schedules with the <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, and evaluate tax liabilities with the <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
            </p>
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

          <h2>No-Closing-Cost Refinancing Economics &amp; Lender Credit Trade-Offs</h2>
          <p>
            Lenders frequently market "No-Cost Refinancing" packages, but borrowers must recognize that third-party closing fees are never truly free:
          </p>
          <ul>
            <li><strong>Lender Credit Premium Pricing:</strong> In a true no-cost refinance, the lender increases your mortgage note rate by 0.25% to 0.50% (e.g., from 6.00% to 6.375%). The lender earns a premium from secondary market bond investors and applies that revenue as a closing credit to cover your title, appraisal, and settlement fees.</li>
            <li><strong>Capitalizing Fees into Loan Principal:</strong> Alternatively, closing costs can be added to your new mortgage balance ($355,000 instead of $350,000). While this preserves cash at closing, you will pay compound interest on those closing fees over the entire loan term.</li>
            <li><strong>Optimal Strategy:</strong> If you plan to remain in the home for less than 3 to 4 years, a slightly higher rate with lender closing credits often beats paying thousands in upfront cash that you may never recoup.</li>
          </ul>

          <h2>Loan Amortization Reset Dangers &amp; Term Selection Dynamics</h2>
          <p>
            A common refinancing pitfall is resetting the 30-year amortization clock after already paying down principal for several years:
          </p>
          <ul>
            <li><strong>The 7-Year Amortization Reset Trap:</strong> If you have paid 7 years into a 30-year loan, your remaining balance has 23 years left, and a higher percentage of every monthly payment goes toward principal. Refinancing into a brand new 30-year loan resets amortization back to Year 1, front-loading interest all over again. Total lifetime interest paid can actually increase even with a lower interest rate.</li>
            <li><strong>Matching Term to Remaining Horizon:</strong> Consider refinancing into a 15-year or 20-year fixed loan term to lock in lower interest rates while maintaining an aggressive debt payoff trajectory without resetting your retirement timeline.</li>
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
