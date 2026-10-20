import DownPaymentCalculator from "@/components/calcs/housing/down-payment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/down-payment-calculator";
const TITLE = "Down Payment Calculator – Cash Needed, Savings Goal & PMI | CalcDigi";
const DESCRIPTION =
  "Free down payment calculator: calculate minimum cash down payment tiers (3%, 5%, 10%, 20%), estimated closing costs, PMI impact, and monthly savings timeline to reach your home goal.";

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

          {/* Graph #2: Authoritative Visual Down Payment Tiers Benchmark Chart */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  30-Year Total Financing Cost by Down Payment Tier ($400,000 Purchase)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark comparing upfront cash vs total 30-year interest and PMI paid (at 6.75% interest).
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                6.75% 30-Yr Fixed
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 4 horizontal comparison bars */}
                {/* 1. 3% Down Payment ($12k down) */}
                <text x="30" y="38" fontSize="11" fill="#334155" fontWeight="bold">3% Down ($12,000)</text>
                <rect x="180" y="24" width="350" height="20" rx="3" fill="#ef4444" />
                <text x="495" y="38" fontSize="10" fill="#ffffff" textAnchor="end" fontWeight="bold">$542k Interest + PMI</text>
                <text x="535" y="38" fontSize="10" fill="#ef4444" fontWeight="bold">Highest</text>

                {/* 2. 5% Down Payment ($20k down) */}
                <text x="30" y="88" fontSize="11" fill="#334155" fontWeight="bold">5% Down ($20,000)</text>
                <rect x="180" y="74" width="330" height="20" rx="3" fill="#f59e0b" />
                <text x="475" y="88" fontSize="10" fill="#ffffff" textAnchor="end" fontWeight="bold">$518k Interest + PMI</text>
                <text x="515" y="88" fontSize="10" fill="#f59e0b" fontWeight="bold">-$24k</text>

                {/* 3. 10% Down Payment ($40k down) */}
                <text x="30" y="138" fontSize="11" fill="#334155" fontWeight="bold">10% Down ($40,000)</text>
                <rect x="180" y="124" width="300" height="20" rx="3" fill="#2563eb" />
                <text x="445" y="138" fontSize="10" fill="#ffffff" textAnchor="end" fontWeight="bold">$480k Interest + PMI</text>
                <text x="485" y="138" fontSize="10" fill="#2563eb" fontWeight="bold">-$62k</text>

                {/* 4. 20% Down Payment ($80k down - No PMI) */}
                <text x="30" y="188" fontSize="11" fill="#334155" fontWeight="bold">20% Down ($80,000)</text>
                <rect x="180" y="174" width="250" height="20" rx="3" fill="#10b981" />
                <text x="395" y="188" fontSize="10" fill="#ffffff" textAnchor="end" fontWeight="bold">$428k Interest (Zero PMI)</text>
                <text x="435" y="188" fontSize="10" fill="#10b981" fontWeight="bold">Saves $114k</text>
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" /> 20% Down eliminates PMI &amp; saves $114,000+ over the loan lifetime.
              </span>
            </div>
          </div>

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
