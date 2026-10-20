import RentCalculator from "@/components/calcs/housing/rent-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/rent-calculator";
const TITLE = "Rent Affordability Calculator – How Much Rent Can I Afford? | CalcDigi";
const DESCRIPTION =
  "Free rent affordability calculator: determine the maximum rent you can afford based on gross income, debts, the 30% HUD rule, 40x landlord rule, and 50/30/20 budgeting.";

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

          {/* Graph #2: Authoritative Visual Rent Budget Trajectory */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Salary vs Maximum Rent Budget (30% Rule vs 40x Metro Rule)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark showing how gross salary translates into maximum approved monthly rent.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                HUD 30% Benchmark
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[620px]" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">$4,000</text>
                <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">$3,000</text>
                <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">$2,000</text>
                <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">$1,000</text>
                <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

                {/* X-axis labels (Salary) */}
                <text x="90" y="218" fontSize="11" fill="#64748b" textAnchor="middle">$45k Salary</text>
                <text x="210" y="218" fontSize="11" fill="#64748b" textAnchor="middle">$70k Salary</text>
                <text x="340" y="218" fontSize="11" fill="#64748b" textAnchor="middle">$100k Salary</text>
                <text x="470" y="218" fontSize="11" fill="#64748b" textAnchor="middle">$130k Salary</text>
                <text x="600" y="218" fontSize="11" fill="#64748b" textAnchor="middle">$160k Salary</text>

                {/* 30% HUD Curve (Emerald) */}
                <path
                  d="M90 174 L210 148 L340 112 L470 78 L600 44"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Data Points */}
                <circle cx="90" cy="174" r="4" fill="#10b981" />
                <circle cx="210" cy="148" r="4" fill="#10b981" />
                <circle cx="340" cy="112" r="4" fill="#10b981" />
                <circle cx="470" cy="78" r="4" fill="#10b981" />
                <circle cx="600" cy="44" r="4" fill="#10b981" />

                {/* Callout */}
                <text x="350" y="106" fontSize="11" fill="#10b981" fontWeight="bold">$100k Income = $2,500/mo Max Rent</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Both the 30% HUD rule and the 40x landlord rule align closely: a $100k salary supports an exact $2,500/month maximum rent.
            </p>
          </div>

          <h2>Formulas for Rent Affordability</h2>
          <Formula>
            Max Rent (30% HUD Rule) = (Annual Gross Income / 12) * 0.30
          </Formula>
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
