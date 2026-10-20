import RentCalculator from "@/components/calcs/housing/rent-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RentBudgetCurveChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/rent-calculator";
const TITLE = "Rent Calculator – Max Affordable Rent and Income Rule";
const DESCRIPTION = "Free rent calculator: calculate maximum affordable rent using the 30% gross income rule and 50/30/20 budget framework with utility and tax estimates.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Rent Affordability Calculator"
      intro="Determine your maximum sustainable monthly rent budget based on salary, existing debt payments, utilities, and landlord 40x qualification criteria."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Max Rent = Min((Gross Monthly Income * 0.30), Annual Income / 40)"
      related={[
        { href: "/calculators/housing/rent-vs-buy-calculator", icon: "🔑", name: "Rent vs Buy" },
        { href: "/calculators/housing/electricity-cost-calculator", icon: "⚡", name: "Electricity Cost" },
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/housing/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/housing/room-area-calculator", icon: "📐", name: "Room Area" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "What is the 30% rule for rent?",
          a: "The 30% rule is a standard guideline established by the US Department of Housing and Urban Development (HUD), which states that you should spend no more than 30% of your gross monthly income on housing rent. Spending more than 30% classifies a household as 'rent-burdened', while spending over 50% is 'severely rent-burdened'.",
        },
        {
          q: "What is the 40x rent rule used by landlords in New York and major cities?",
          a: "In competitive rental markets like New York City, Boston, and San Francisco, property management companies require prospective tenants to earn an annual gross income of at least 40 times the monthly rent. For example, to qualify for a $2,500/month apartment, your household must earn at least $100,000 annually ($2,500 × 40).",
        },
        {
          q: "Should rent be based on gross income or take-home net pay?",
          a: "Landlords and tenant screening algorithms always calculate eligibility using pre-tax gross income. However, for personal budgeting, financial planners recommend capping rent at 25% to 30% of your take-home net pay so that taxes, healthcare, and 401(k) contributions don't squeeze your living budget.",
        },
        {
          q: "How much cash do I need saved upfront before renting an apartment?",
          a: "You typically need 3 to 4 months of rent saved in liquid cash before signing a lease: first month's rent, one full month security deposit, last month's rent (in some jurisdictions), and a 10% to 15% broker fee if renting through a licensed agent in high-demand metros.",
        },
        {
          q: "What if I don't meet the 40x income requirement?",
          a: "If your income falls below landlord requirements, you can apply with a qualified guarantor or co-signer (who typically must earn 80x the monthly rent), purchase an institutional lease guarantee through services like Insurent or Rhino, or offer an increased security deposit where state law allows.",
        },
        {
          q: "How does the 50/30/20 budget framework apply to renting?",
          a: "Under the popular 50/30/20 budget, 50% of your take-home pay is allocated to all 'Needs' combined—which includes rent, utilities, groceries, transportation, and minimum debt payments. If rent consumes 40% of your income, you are left with only 10% for food and bills.",
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
                HUD Housing Affordability Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Aligned with <strong className="font-semibold text-slate-800 dark:text-slate-200">US Department of Housing and Urban Development Rent Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Rental Housing Advisory Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How Much Rent Can You Really Afford?</h2>
          <p>
            Securing an apartment requires balancing two perspectives: what <strong>landlords require to approve your application</strong>,
            and what <strong>your personal cash flow can comfortably support</strong> without creating financial anxiety.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <RentBudgetCurveChart />

          <h2>Formulas for Rent Affordability</h2>
          <Formula>
            Max Rent (30% HUD Rule) = (Annual Gross Income / 12) * 0.30
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $72,000 Annual Salary</h2>

            <p>
              Suppose an individual earns an annual salary of <strong>$72,000 ($6,000 gross monthly income)</strong> and carries <strong>$400 in monthly student loan debt</strong>:
            </p>
            <ul>
              <li><strong>Rule 1: HUD 30% Gross Income Standard</strong>: $6,000 × 0.30 = <strong>$1,800.00 maximum monthly rent ceiling</strong>.</li>
              <li><strong>Rule 2: Metro 40x Annual Landlord Standard</strong>: $72,000 ÷ 40 = <strong>$1,800.00 maximum approved rent</strong>.</li>
              <li><strong>Rule 3: Debt-Adjusted Net Cash Flow Rule</strong>: Assuming 25% taxes, net take-home pay is ~$4,500/mo. Subtracting $400 student debt leaves $4,100. Renting at $1,800 consumes 43.9% of take-home pay, leaving $2,300 for utilities, food, healthcare, and savings.</li>
              <li><strong>Recommended Target Budget</strong>: Aiming for <strong>$1,500 to $1,650/month</strong> provides a comfortable financial safety margin.</li>
            </ul>


            <h2>Common Costly Mistakes in Rent Budgeting</h2>
            <p>Avoid these four rental budget traps before signing a 12-month lease agreement:</p>
            <ul>
              <li><strong>Neglecting Tenant Utilities &amp; Ancillary Fees:</strong> Rent is rarely your only housing invoice. Heating, cooling, high-speed internet, water, trash, building amenities fees, and parking permits routinely add $200 to $350/month to baseline lease obligations.</li>
              <li><strong>Underestimating Upfront Move-In Capital Requirements:</strong> Securing an apartment typically requires first month's rent, a security deposit equal to 1 to 2 months' rent, application fees, and moving truck expenses—totaling 2.5x to 3.5x the monthly rent in liquid cash upfront.</li>
              <li><strong>Ignoring Commute &amp; Transportation Costs:</strong> Saving $200/month by moving farther away from employment can easily cost $350/month in extra gasoline, vehicle depreciation, transit passes, and highway tolls.</li>
              <li><strong>Skipping Renters Insurance:</strong> A landlord's master policy covers only the physical building structure—not your personal belongings, furniture, electronics, or personal liability if a guest is injured. Renters insurance costs only $15–$25/month and is legally mandatory at most managed communities.</li>
            </ul>


            <h2>Metro Landlord Screening &amp; Rent Regulation Rules</h2>
            <p>
              Landlord approval criteria differ significantly across US metropolitan rental markets:
            </p>
            <ul>
              <li><strong>High-Cost Metros (NYC, Boston, San Francisco):</strong> Landlords strictly enforce the 40x gross income rule and require minimum credit scores of 700+. Applicants failing this threshold must provide a guarantor earning 80x the monthly rent.</li>
              <li><strong>Midwest &amp; Sunbelt Metros (Dallas, Atlanta, Columbus):</strong> Landlords typically evaluate applicants on a 3x monthly rent-to-income ratio (33% front-end gross income) with more flexible credit minimums.</li>
            </ul>
            <p>
              Compare the long-term wealth impact of renting vs buying with our <a href="/calculators/housing/rent-vs-buy-calculator">rent vs buy calculator</a>, estimate electric bills with the <a href="/calculators/housing/electricity-cost-calculator">electricity cost calculator</a>, and calculate mortgage affordability with the <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>.
            </p>
<Formula>
            Max Rent (40x Metro Rule) = Annual Gross Income / 40
          </Formula>
          <Formula>
            Required Annual Income to Qualify = Monthly Rent * 40
          </Formula>

          <h2>Salary vs Maximum Affordable Rent Benchmarks</h2>
          <DataTable
            head={["Annual Gross Salary", "Monthly Gross Earnings", "30% Rule Max Rent", "40x Rule Max Rent", "Est. Upfront Move-In Cash"]}
            rows={[
              ["$45,000 / year", "$3,750 / month", "$1,125 / month", "$1,125 / month", "$3,375 (3x rent)"],
              ["$65,000 / year", "$5,417 / month", "$1,625 / month", "$1,625 / month", "$4,875 (3x rent)"],
              ["$85,000 / year", "$7,083 / month", "$2,125 / month", "$2,125 / month", "$6,375 (3x rent)"],
              ["$110,000 / year", "$9,167 / month", "$2,750 / month", "$2,750 / month", "$8,250 (3x rent)"],
              ["$150,000 / year", "$12,500 / month", "$3,750 / month", "$3,750 / month", "$11,250 (3x rent)"],
            ]}
            highlight={2}
          />

          <h2>Important Hidden Costs of Renting</h2>
          <ul>
            <li>
              <strong>Utility Bills:</strong> In most rentals, water, trash, electricity, and gas are metered separately.
              Budget $150 to $300 per month for heating, air conditioning, and high-speed Wi-Fi.
            </li>
            <li>
              <strong>Renters Insurance:</strong> Almost all institutional landlords require a minimum of $100,000 in personal
              liability coverage, which costs roughly $12 to $22 per month.
            </li>
            <li>
              <strong>Pet Rent &amp; Parking Fees:</strong> Urban buildings frequently charge $35 to $75/mo in pet rent plus
              $150 to $350/mo for reserved garage parking spots.
            </li>
          </ul>

          <h2>The 50/30/20 Budgeting Matrix &amp; Rent-to-Net Take-Home Reality</h2>
          <p>
            While commercial landlords evaluate applicants based on gross top-line earnings, personal financial security requires evaluating rent against actual take-home cash:
          </p>
          <ul>
            <li><strong>50% Needs Allocation:</strong> Under Senator Elizabeth Warren's classic 50/30/20 budget framework, all non-negotiable living essentials (rent, electricity, heating, water, groceries, auto insurance, and minimum debt payments) should consume no more than 50% of your net post-tax income.</li>
            <li><strong>30% Wants Allocation:</strong> Discretionary spending (dining out, entertainment, vacations, gym memberships) is capped at 30% of take-home earnings.</li>
            <li><strong>20% Financial Foundation:</strong> Emergency liquid savings, Roth IRA / 401(k) retirement contributions, and accelerated debt payoff require at least 20% of net pay. If rent consumes 40% of gross salary, personal savings are almost completely wiped out.</li>
          </ul>

          <h2>Ancillary Rental Overhead &amp; Lease Qualification Protocols</h2>
          <p>
            First-time renters frequently underestimate the true monthly cash flow needed to support an apartment:
          </p>
          <ul>
            <li><strong>Ancillary Monthly Surcharges:</strong> In addition to base contract rent, modern apartment communities frequently mandate recurring fees: renter's insurance ($15–$25/mo), reserved garage parking ($75–$250/mo), pet rent ($35–$75/mo per animal), and valet trash/sewage services ($30–$50/mo). These surcharges can add $150 to $400 monthly to living costs.</li>
            <li><strong>Institutional Landlord Qualification Rules:</strong> Large property management REITs typically require applicants to demonstrate gross monthly earnings equal to at least 3.0x monthly rent (or 40x annual salary rule). Applicants falling below this threshold must provide a verified guarantor or co-signer earning at least 80x monthly rent.</li>
          </ul>


          <h2>Credit Score Tiers, Security Deposits &amp; Lease Break Liabilities</h2>
          <p>
            Rental property underwriting balances monthly income against creditworthiness and lease contract covenants:
          </p>
          <ul>
            <li><strong>Credit Score Security Tiers:</strong> Tier 1 applicants (credit score 720+) typically qualify with standard one month's rent security deposit. Tier 2 applicants (650–719) are frequently asked for 1.5 months deposit. Applicants with scores below 650 often face mandatory 2-month security deposits or require institutional co-signers.</li>
            <li><strong>Liquidated Damages Lease Buyout Clauses:</strong> Breaking a 12-month residential lease prematurely typically triggers a liquidated damages clause requiring 60 days advance written notice plus an early termination fee equivalent to 2 months of contract rent.</li>
            <li><strong>Security Deposit Return Statutes:</strong> Most states enforce statutory timelines (14 to 30 days) by which landlords must return security deposits along with itemized receipts for any legitimate repair deductions beyond normal wear and tear.</li>
          </ul>

          <p>
            Considering whether to stop renting and buy a home? Compare your wealth trajectory with our{" "}
            <a href="/calculators/housing/rent-vs-buy-calculator">rent vs buy calculator</a>, estimate your potential mortgage on
            the <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, or budget seasonal AC
            and heating bills with our <a href="/calculators/housing/electricity-cost-calculator">electricity cost calculator</a>.
          </p>
        </>
      }
    >
      <RentCalculator />
    </CalcPage>
  );
}
