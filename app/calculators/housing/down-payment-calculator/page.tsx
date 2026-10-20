import DownPaymentCalculator from "@/components/calcs/housing/down-payment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DownPaymentTierChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/down-payment-calculator";
const TITLE = "Down Payment Calculator – Cash, Savings and PMI | CalcDigi";
const DESCRIPTION = "Free down payment calculator: calculate minimum cash down payment tiers (3%, 5%, 10%, 20%), closing costs, PMI impact, and monthly savings timeline.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Down Payment Calculator"
      intro="Determine your required cash to close, compare down payment percentage tiers (3% to 20%), evaluate PMI costs, and project your savings timeline."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Total Cash To Close = (Purchase Price * Down Payment %) + Closing Costs"
      related={[
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/rent-vs-buy-calculator", icon: "🔑", name: "Rent vs Buy" },
        { href: "/calculators/housing/home-equity-calculator", icon: "📈", name: "Home Equity" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
      ]}
      faq={[
        {
          q: "Do I really need a 20% down payment to buy a home?",
          a: "No. The 20% down payment is a popular myth. First-time buyers can purchase a home with as little as 3% down using Fannie Mae HomeReady or Freddie Mac Home Possible loans. FHA loans require 3.5% down, and VA/USDA loans offer 0% down financing for eligible borrowers.",
        },
        {
          q: "What is Private Mortgage Insurance (PMI)?",
          a: "PMI is an insurance policy that protects the mortgage lender if you default on your loan. Lenders mandate PMI on conventional mortgages whenever your down payment is less than 20% (Loan-to-Value greater than 80%). It typically costs $30 to $70 per month for every $100,000 borrowed.",
        },
        {
          q: "How and when does PMI get removed?",
          a: "Under the federal Homeowners Protection Act of 1998, you can request PMI cancellation once your loan principal balance reaches 80% of the home's original appraised value. Lenders are legally required to automatically terminate PMI when your balance drops to 78% of original value.",
        },
        {
          q: "What are closing costs and how much cash do they require?",
          a: "Closing costs are lender and third-party fees required to finalize your mortgage, including appraisal, loan origination, title insurance, attorney fees, transfer taxes, and initial escrow deposits. They typically range from 2% to 5% of the total purchase price.",
        },
        {
          q: "Can I use gift funds for my down payment?",
          a: "Yes. Most conventional and FHA loan programs permit 100% of your down payment and closing costs to come from a verified gift from an immediate family member, provided the donor signs a formal gift letter certifying that no repayment is expected.",
        },
        {
          q: "Where should I keep my down payment savings?",
          a: "Keep your down payment in a liquid, FDIC-insured High-Yield Savings Account (HYSA), Certificate of Deposit (CD), or Treasury bills. Avoid keeping short-term down payment funds in volatile stock market equities if you plan to purchase within 1 to 3 years.",
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
                Fannie Mae &amp; Freddie Mac Guidelines
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">Single-Family Selling Guide &amp; Homeowners Protection Act</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mortgage Advisory Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>Understanding Your Total Cash to Close</h2>
          <p>
            When preparing to buy a home, many buyers mistakenly budget only for the down payment. On closing day, however,
            you must bring the <strong>Total Cash to Close</strong>, which consists of:
          </p>
          <Formula>
            Total Cash to Close = Down Payment + Lender Closing Costs + Prepaid Taxes &amp; Insurance Escrow
          </Formula>
          <p>
            Lender closing costs typically add another <strong>2% to 4%</strong> of the purchase price on top of your down payment.
          </p>

          <h2>Step-by-Step Practical Calculation: $400,000 Purchase</h2>

            <p>
              Suppose you are purchasing a median US home priced at <strong>$400,000</strong> and evaluating whether to put down <strong>5% Conventional</strong> vs <strong>20% No PMI</strong>:
            </p>
            <ul>
              <li><strong>Scenario A: 5% Down ($20,000 Cash)</strong>: Loan balance is $380,000. At 6.75% fixed interest, monthly Principal &amp; Interest is $2,467/mo. Private Mortgage Insurance (PMI) adds ~$238/mo, totaling <strong>$2,705/mo</strong>. Total 30-year interest paid equals $508,120.</li>
              <li><strong>Scenario B: 20% Down ($80,000 Cash)</strong>: Loan balance is $320,000. At 6.75% fixed interest, monthly Principal &amp; Interest is $2,077/mo. PMI is completely eliminated ($0/mo), totaling <strong>$2,077/mo</strong>. Total 30-year interest paid equals $427,720.</li>
              <li><strong>Comparison Insight</strong>: Putting an extra $60,000 down upfront saves <strong>$628/month</strong> in payment cash flow and reduces lifetime interest charges by <strong>$80,400</strong>.</li>
            </ul>


            <h2>Common Down Payment Mistakes &amp; Homebuyer Traps</h2>
            <p>Navigating upfront home purchase financing requires balancing liquidity with equity buildup. Watch out for these four costly mistakes:</p>
            <ul>
              <li><strong>Draining 100% of Liquid Cash Reserves:</strong> Committing every dollar of savings toward your down payment leaves you vulnerable to emergency home repairs, moving costs, or sudden job disruptions. Mortgage underwriters typically require 2 to 6 months of post-closing principal, interest, taxes, and insurance (PITI) reserves in your bank account.</li>
              <li><strong>Forgetting Lender Closing Costs (2%–5%):</strong> A down payment is not the only cash required at the closing table. Title insurance, loan origination fees, appraisal charges, transfer taxes, and escrow reserves require an additional 2% to 4% of the loan value in cash.</li>
              <li><strong>Assuming 20% Down is Legally Mandatory:</strong> Many first-time buyers postpone homeownership for years mistakenly believing 20% down is required. Conventional Fannie Mae loans require as little as 3% down, FHA loans require 3.5%, and VA/USDA loans offer 0% down for eligible borrowers.</li>
              <li><strong>Unverified Gift Funds:</strong> If family members are gifting funds toward your down payment, lenders require a formal gift letter and 60-day bank paper trail proving the money is not a disguised loan.</li>
            </ul>


            <h2>State &amp; Local Down Payment Assistance (DPA) Programs</h2>
            <p>
              Nearly every US state housing finance agency (HFA) operates down payment assistance programs offering forgivable second loans, 0% deferred mortgages, or grant funding covering 3% to 5% of your purchase price. For example:
            </p>
            <ul>
              <li><strong>California (CalHFA):</strong> Offers shared appreciation loans covering up to 20% of down payments for first-generation buyers.</li>
              <li><strong>Texas (TDHCA):</strong> Provides down payment grants up to 5% of loan amounts with no repayment obligation if you remain in the home for 3 years.</li>
              <li><strong>Florida (Florida Housing):</strong> Grants up to $10,000 in 0% interest second mortgages deferred until sale or refinance.</li>
            </ul>
            <p>
              Pair your down payment planning with our <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, determine property tax liabilities with the <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>, and compare total financing with the <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>.
            </p>


          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <DownPaymentTierChart />

          <h2>Down Payment Requirements by Loan Program</h2>
          <DataTable
            head={["Mortgage Loan Type", "Min Down Payment", "Credit Score Required", "PMI / Mortgage Insurance Rules"]}
            rows={[
              ["Conventional (Fannie/Freddie)", "3.0% (First-Time Buyers)", "620+ (Best rate at 780+)", "PMI required until 80% LTV; cancels at 78% LTV"],
              ["FHA Government Loan", "3.5% (With 580+ Credit)", "580+ (500–579 requires 10%)", "MIP required for life of loan if down < 10%"],
              ["VA Loan (Veterans & Military)", "0.0% Down Payment", "580 – 620 typical", "Zero monthly PMI; one-time VA funding fee"],
              ["USDA Rural Housing Loan", "0.0% Down Payment", "640+ standard", "Low annual guarantee fee (0.35% / year)"],
              ["Jumbo Mortgage (> $766,550)", "10.0% – 20.0% Down", "700 – 720+", "Strict reserve requirements (6–12 months PITI)"],
            ]}
            highlight={0}
          />

          <h2>Formulas for Down Payment Planning</h2>
          <Formula>
            Down Payment Amount = Home Purchase Price × Down Payment Percentage
          </Formula>
          <Formula>
            Loan-to-Value (LTV) = (Home Purchase Price - Down Payment) ÷ Home Purchase Price
          </Formula>
          <Formula>
            Monthly PMI Estimate = (Loan Amount × 0.0075) ÷ 12
          </Formula>

          <h2>Smart Down Payment Strategies</h2>
          <ul>
            <li>
              <strong>Don&rsquo;t Drain Every Penny of Cash:</strong> Never deplete your emergency savings to reach a higher
              down payment tier. Mortgage lenders require 2 to 3 months of PITI reserves in the bank post-closing.
            </li>
            <li>
              <strong>Down Payment Assistance (DPA) Programs:</strong> Every state housing finance agency (HFA) offers DPA
              grants or forgivable second liens covering 3% to 5% of purchase prices for eligible first-time buyers.
            </li>
            <li>
              <strong>Seller Concessions:</strong> Negotiate for the seller to pay 2% to 3% in seller closing cost concessions,
              reducing the out-of-pocket cash you need on closing day.
            </li>
          </ul>

          <h2>Private Mortgage Insurance (PMI) Removal Mechanics &amp; HPA Regulations</h2>
          <p>
            When purchasing a primary home with less than 20% down payment on a conventional loan, federal regulations under the <strong>Homeowners Protection Act of 1998 (HPA)</strong> establish strict statutory mechanisms for automatic PMI cancellation:
          </p>
          <ul>
            <li><strong>Automatic Termination at 78% LTV:</strong> Lenders are legally mandated to cancel PMI automatically once your principal mortgage balance is scheduled to reach 78% of the original purchase value, provided your loan payments are current.</li>
            <li><strong>Borrower-Requested Cancellation at 80% LTV:</strong> Homeowners can formally request in writing that their mortgage servicer cancel PMI once their principal balance reaches 80% of original value, saving $1,500 to $3,000 annually.</li>
            <li><strong>Early Cancellation via Substantial Home Improvements:</strong> If rapid market appreciation or major remodeling additions (kitchen renovations, room additions) push your equity over 20% to 25%, you can petition your lender for a new broker price opinion (BPO) or professional appraisal to cancel PMI years ahead of schedule.</li>
          </ul>

          <h2>Conventional 97% LTV vs FHA 3.5% Down Mortgage Economics</h2>
          <p>
            First-time homebuyers evaluating minimum down payment options must weigh long-term financing costs between GSE conventional and government-insured loan products:
          </p>
          <ul>
            <li><strong>Conventional 97% / HomeReady / Home Possible:</strong> Requires just 3.0% down for qualifying buyers with credit scores above 660. The primary advantage over FHA is that private mortgage insurance automatically drops off once equity reaches 20%, whereas FHA mortgage insurance persists for the lifetime of the mortgage.</li>
            <li><strong>FHA 3.5% Down Loan Program:</strong> Features more forgiving credit score thresholds (down to 580) and debt-to-income allowances (up to 50%). However, FHA charges both a 1.75% Upfront Mortgage Insurance Premium (UFMIP) added to your principal balance and a mandatory monthly MIP (typically 0.55% annually) for the entire 30-year duration.</li>
            <li><strong>Opportunity Cost &amp; Yield Arbitrage:</strong> Putting down 20% eliminates PMI, but deploying an extra $60,000 in upfront cash has significant opportunity cost. If you can invest that liquidity in an index portfolio earning an average 7% to 10% annual return while borrowing mortgage capital at 6%, keeping liquid reserves can outperform a massive down payment.</li>
          </ul>

          <p>
            Evaluate your total borrowing power with our{" "}
            <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, compare mortgage
            amortization schedules on the <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, or see how equity
            accumulates over time on our <a href="/calculators/housing/home-equity-calculator">home equity calculator</a>.
          </p>
        </>
      }
    >
      <DownPaymentCalculator />
    </CalcPage>
  );
}
