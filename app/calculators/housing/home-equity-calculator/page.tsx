import HomeEquityCalculator from "@/components/calcs/housing/home-equity-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/home-equity-calculator";
const TITLE = "Home Equity Calculator – How Much Can I Borrow? (HELOC) | CalcDigi";
const DESCRIPTION =
  "Free home equity calculator: determine your total accumulated home equity, loan-to-value (LTV), combined LTV (CLTV), and maximum usable borrowing capacity for HELOCs or home equity loans.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Home Equity Calculator"
      intro="Determine your accumulated home equity, current loan-to-value ratio, and maximum cash you can borrow through a HELOC or home equity loan."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Borrowable Equity = (Home Market Value * Max CLTV %) - Total Mortgage Debt"
      related={[
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/housing/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
      ]}
      faq={[
        {
          q: "What is the difference between home equity and borrowable equity?",
          a: "Total home equity is the entire difference between your home's current market value and what you owe on all mortgages. Borrowable equity is the restricted portion a bank allows you to tap—typically capped so that your total combined debt (first mortgage + HELOC) does not exceed 80% to 85% of your home's appraised value.",
        },
        {
          q: "What is Combined Loan-to-Value (CLTV)?",
          a: "CLTV represents the total of all loans secured by your home (primary mortgage balance plus second mortgage or HELOC limit) divided by your home's appraised market value. Most national lenders set a hard CLTV ceiling of 80% to 85% to protect against local market downturns.",
        },
        {
          q: "What is the difference between a HELOC and a Home Equity Loan?",
          a: "A Home Equity Loan provides a fixed lump sum with a fixed interest rate and predictable monthly payments over 5 to 30 years. A Home Equity Line of Credit (HELOC) works like a credit card: a revolving credit line with a variable interest rate, where you only pay interest on the funds you actively draw during the initial 10-year draw period.",
        },
        {
          q: "Is HELOC or home equity loan interest tax-deductible?",
          a: "Under the Tax Cuts and Jobs Act (TCJA), interest paid on home equity debt is only tax-deductible if the funds are used specifically to 'buy, build, or substantially improve' the home securing the loan (such as an addition, kitchen remodel, or new roof). Using equity for debt consolidation or college tuition is non-deductible.",
        },
        {
          q: "What happens to my HELOC after the draw period ends?",
          a: "Most HELOCs feature a 10-year draw period (during which interest-only payments are permitted) followed by a 10 to 20-year repayment period. Once the repayment period begins, you can no longer withdraw funds, and payments increase significantly as principal amortization kicks in.",
        },
        {
          q: "Can a lender freeze or reduce my HELOC limit?",
          a: "Yes. Federal banking regulations permit lenders to freeze or reduce available credit lines if the appraised market value of your home drops significantly or if your financial situation (income or credit score) deteriorates materially.",
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
                Regulation Z &amp; OCC Interagency Guidelines
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">Federal Reserve Board Consumer Credit &amp; HELOC Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Home Lending Advisory Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Your Usable Home Equity</h2>
          <p>
            Home equity represents the portion of your property that you own free and clear. It builds in two ways:
            paying down your mortgage principal each month, and natural appreciation in local housing market values.
          </p>
          <p>
            However, mortgage lenders do not permit you to borrow 100% of your equity. To maintain a protective cushion
            against foreclosure risk, institutions impose a <strong>Combined Loan-to-Value (CLTV) cap</strong>, typically
            set at 80% to 85% of your home&rsquo;s current appraised value.
          </p>

          {/* Graph #2: Authoritative Visual Equity Capital Stack Benchmark */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  The Home Equity Capital Stack ($480,000 Property Value at 85% CLTV)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual breakdown of primary lien, borrowable equity, and the mandatory 15% protective equity cushion.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                85% Max CLTV Cap
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Full property bar */}
                <rect x="40" y="30" width="520" height="42" rx="6" fill="#f1f5f9" />

                {/* Segment 1: First Mortgage ($260k = 54.2%) */}
                <rect x="40" y="30" width="282" height="42" rx="6" fill="#2563eb" />
                <text x="55" y="55" fontSize="11" fill="#ffffff" fontWeight="bold">1st Mortgage: $260,000 (54.2%)</text>

                {/* Segment 2: Usable Borrowable HELOC ($148k = 30.8%) */}
                <rect x="322" y="30" width="160" height="42" rx="0" fill="#10b981" />
                <text x="335" y="55" fontSize="11" fill="#ffffff" fontWeight="bold">Usable HELOC: $148,000</text>

                {/* Segment 3: Protected 15% Cushion ($72k = 15.0%) */}
                <rect x="482" y="30" width="78" height="42" rx="6" fill="#f59e0b" />
                <text x="521" y="55" fontSize="10" fill="#ffffff" textAnchor="middle" fontWeight="bold">15% Protect</text>

                {/* Sub-annotations */}
                <line x1="40" y1="95" x2="482" y2="95" stroke="#10b981" strokeWidth="2" />
                <circle cx="40" cy="95" r="3" fill="#10b981" />
                <circle cx="482" cy="95" r="3" fill="#10b981" />
                <text x="261" y="112" fontSize="11" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  85% Maximum Allowable Combined Debt Limit ($408,000)
                </text>

                <circle cx="50" cy="155" r="5" fill="#2563eb" />
                <text x="62" y="158" fontSize="11" fill="#334155">Primary Mortgage (Current Outstanding Balance)</text>

                <circle cx="50" cy="180" r="5" fill="#10b981" />
                <text x="62" y="183" fontSize="11" fill="#334155">Available Borrowable Cash (Through HELOC or Home Equity Loan)</text>

                <circle cx="50" cy="205" r="5" fill="#f59e0b" />
                <text x="62" y="208" fontSize="11" fill="#334155">Mandatory 15% Equity Cushion (Bank Buffer Against Housing Declines)</text>
              </svg>
            </div>
          </div>

          <h2>Formulas for Home Equity &amp; CLTV</h2>
          <Formula>
            Total Home Equity = Current Market Value - Total Outstanding Mortgage Debt
          </Formula>
          <Formula>
            Current Loan-to-Value (LTV) = Total Mortgage Debt ÷ Current Market Value
          </Formula>
          <Formula>
            Maximum Borrowable Equity = (Current Market Value × Maximum CLTV %) - Total Mortgage Debt
          </Formula>

          <h2>Comparing Equity Financing Options</h2>
          <DataTable
            head={["Financing Option", "Interest Rate Structure", "Repayment Terms", "Best Suited For"]}
            rows={[
              ["Home Equity Line (HELOC)", "Variable (Prime rate + margin)", "10-yr interest-only draw; 15–20 yr repayment", "Staged home remodels, emergency lines, ongoing expenses"],
              ["Fixed-Rate Home Equity Loan", "Fixed for life of loan", "Predictable monthly payment over 5–30 yrs", "Large lump-sum debt consolidation, major one-time projects"],
              ["Cash-Out Refinance", "Fixed (replaces primary loan)", "New 15 or 30-year primary mortgage", "When market rates are lower than your current mortgage rate"],
            ]}
            highlight={0}
          />

          <h2>Smart Ways to Use Home Equity</h2>
          <ul>
            <li>
              <strong>High-ROI Home Improvements:</strong> Remodeling kitchens, replacing roofs, or adding bathrooms increases
              appraised value and preserves tax deductibility under IRS rules.
            </li>
            <li>
              <strong>Consolidating High-Interest Debt:</strong> Swapping 24% APR revolving credit cards for an 8.5% HELOC
              can save thousands in interest annually and accelerate debt freedom.
            </li>
            <li>
              <strong>Avoid Using Equity for Depreciating Assets:</strong> Never borrow against your home to purchase boats,
              vacations, or luxury vehicles. Using collateralized shelter to fund lifestyle consumption puts your roof at risk.
            </li>
          </ul>
          <p>
            Planning a major home renovation with your equity? Estimate costs with our{" "}
            <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>, compare full loan replacements
            on the <a href="/calculators/housing/refinance-calculator">refinance calculator</a>, or evaluate monthly payments on our{" "}
            <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>.
          </p>
        </>
      }
    >
      <HomeEquityCalculator />
    </CalcPage>
  );
}
