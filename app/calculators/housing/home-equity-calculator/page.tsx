import HomeEquityCalculator from "@/components/calcs/housing/home-equity-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HomeEquityCapitalStackChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/home-equity-calculator";
const TITLE = "Home Equity Calculator – Borrowing Power & HELOC | CalcDigi";
const DESCRIPTION = "Free home equity calculator: determine total home equity, loan-to-value (LTV), combined LTV (CLTV), and usable borrowing capacity for HELOCs or loans.";

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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <HomeEquityCapitalStackChart />

          <h2>Formulas for Home Equity &amp; CLTV</h2>
          <Formula>
            Total Home Equity = Current Market Value - Total Outstanding Mortgage Debt
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $480,000 Property at 85% CLTV</h2>

            <p>
              Suppose your primary residence is currently appraised at <strong>$480,000</strong>, your remaining first mortgage balance is <strong>$280,000</strong>, and your credit union permits a maximum <strong>85% Combined Loan-to-Value (CLTV)</strong> cap:
            </p>
            <ul>
              <li><strong>Step 1: Calculate Total Accumulated Equity</strong>: $480,000 market value - $280,000 mortgage = <strong>$200,000 gross equity (41.7% equity stake)</strong>.</li>
              <li><strong>Step 2: Calculate Maximum Total Borrowing Ceiling</strong>: $480,000 × 0.85 = <strong>$408,000 total allowable lien debt</strong>.</li>
              <li><strong>Step 3: Deduct Existing First Mortgage</strong>: $408,000 - $280,000 = <strong>$128,000 maximum usable HELOC credit line</strong>.</li>
              <li><strong>Step 4: Mandatory Protective Equity Cushion</strong>: $480,000 × 0.15 = <strong>$72,000 protected equity buffer</strong> retained in your property.</li>
            </ul>


            <h2>Costly Traps in Home Equity Financing</h2>
            <p>Avoid these common hazards when leveraging home equity lines of credit (HELOCs) or second mortgages:</p>
            <ul>
              <li><strong>HELOC Payment Shock at End of Draw Period:</strong> Most HELOCs feature a 10-year interest-only draw period followed by a 20-year principal-and-interest repayment period. When the draw period expires, monthly payments can double or triple overnight.</li>
              <li><strong>Exposing Your Primary Residence to Foreclosure Risk:</strong> Unlike unsecured personal loans or credit cards, a home equity line is secured by your home. Defaulting on payments gives the lender the legal right to foreclose on your residence.</li>
              <li><strong>Using Long-Term Equity for Short-Term Depreciating Assets:</strong> Using home equity to finance luxury vacations, designer clothing, or depreciating sports cars drains home wealth for zero lasting return. Reserve equity for high-ROI home additions, high-interest debt consolidation, or emergency reserves.</li>
              <li><strong>Overlooking Variable Interest Rate Spikes:</strong> Most HELOCs carry variable rates pegged to the Wall Street Journal Prime Rate. In rising interest rate environments, borrowing costs can climb rapidly.</li>
            </ul>


            <h2>State Lending Limitations &amp; Homestead Exemptions</h2>
            <p>
              Certain states enforce unique legal constraints on home equity borrowing:
            </p>
            <ul>
              <li><strong>Texas (Section 50(a)(6)):</strong> The Texas Constitution strictly limits all combined mortgage debt (first lien + home equity) to a maximum of 80% CLTV, prohibiting lenders from offering 85% or 90% lines.</li>
              <li><strong>Florida &amp; Nevada:</strong> Maintain robust homestead exemption provisions protecting home equity against unsecured creditor judgments, making equity retention legally advantageous.</li>
            </ul>
            <p>
              Plan home improvements with our <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>, test refinancing alternatives with the <a href="/calculators/housing/refinance-calculator">refinance calculator</a>, and calculate property tax bills with the <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
            </p>
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

          <h2>Fixed-Rate Second Mortgages vs Variable HELOC Amortization Mechanics</h2>
          <p>
            Choosing between a fixed-rate closed-end home equity loan and an open-ended variable Home Equity Line of Credit (HELOC) involves key structural differences:
          </p>
          <ul>
            <li><strong>Fixed-Rate Home Equity Loan:</strong> Disbursed as a single lump-sum payout with a fixed interest rate and fixed monthly principal-and-interest payment across terms ranging from 5 to 30 years. Ideal for defined capital projects like a roof replacement or major kitchen remodel.</li>
            <li><strong>Variable-Rate HELOC (Draw vs Repayment):</strong> Operates like a revolving credit card secured by your home. During the 10-year draw period, borrowers can borrow, pay down, and re-borrow funds while paying interest only on the active balance. After Year 10, the line freezes into a 20-year fully amortizing repayment period.</li>
            <li><strong>Tax Deductibility of Equity Interest (TCJA Rules):</strong> Under current IRS tax regulations, interest paid on home equity borrowing is tax-deductible only if the funds are utilized to "buy, build, or substantially improve" the primary residence securing the loan. Using equity for vehicle purchases or credit card consolidation eliminates the federal tax deduction.</li>
          </ul>

          <h2>Cash-Out Refinancing vs Piggyback HELOAN Analysis</h2>
          <p>
            When tapping equity, homeowners holding a legacy first mortgage with an ultra-low interest rate (such as 3.0% locked during 2020–2021) should avoid a cash-out refinance:
          </p>
          <ul>
            <li><strong>Preserving First Mortgage Terms:</strong> Replacing an entire $350,000 first mortgage at 3.0% with a new 6.75% cash-out refinance adds hundreds of dollars in unnecessary interest every month. Taking a standalone second mortgage or HELOC for the incremental $50,000 keeps your rock-bottom primary rate intact.</li>
            <li><strong>Combined Loan-to-Value (CLTV) Underwriting Limits:</strong> Most commercial banks and credit unions cap borrowing at 80% to 85% CLTV. Borrowers with pristine credit and verifiable W-2 income can occasionally secure up to 90% CLTV, though rates and origination fees increase substantially on higher leverage tiers.</li>
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
