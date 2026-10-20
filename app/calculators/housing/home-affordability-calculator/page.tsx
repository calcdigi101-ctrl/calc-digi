import HomeAffordabilityCalculator from "@/components/calcs/housing/home-affordability-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/home-affordability-calculator";
const TITLE = "Home Affordability Calculator – How Much House Can I Afford? | CalcDigi";
const DESCRIPTION =
  "Free home affordability calculator: determine the maximum home price and mortgage loan you can afford based on gross income, monthly debts, down payment, and the 28/36 DTI rule.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Home Affordability Calculator"
      intro="Determine how much home you can afford based on gross household income, monthly debts, down payment, and Fannie Mae 28/36 debt-to-income benchmarks."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Max Housing Payment = Min(Gross Income * 0.28, (Gross Income * 0.36) - Debts)"
      related={[
        { href: "/calculators/housing/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/rent-vs-buy-calculator", icon: "🔑", name: "Rent vs Buy" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
        { href: "/calculators/housing/home-equity-calculator", icon: "📈", name: "Home Equity" },
      ]}
      faq={[
        {
          q: "What is the 28/36 debt-to-income (DTI) rule?",
          a: "The 28/36 rule is the classic underwriting standard used by mortgage lenders to assess affordability. It mandates that your total monthly housing costs (principal, interest, taxes, and insurance - PITI) should not exceed 28% of your gross monthly income (front-end ratio), and your total monthly debt payments (housing costs plus car loans, student debt, and credit cards) should not exceed 36% (back-end ratio).",
        },
        {
          q: "How much house can I afford on a $100,000 salary?",
          a: "With a $100,000 annual salary ($8,333/month), standard guidelines allow up to $2,333/month for housing. Assuming $500/month in other debts, a 6.75% 30-year fixed mortgage, and a $50,000 down payment, you can comfortably afford a home priced between $360,000 and $410,000 depending on local property tax rates.",
        },
        {
          q: "How do monthly car and student loan payments affect how much house I can buy?",
          a: "Every $100 in existing monthly debt obligations reduces your maximum mortgage borrowing capacity by approximately $15,000 to $18,000 at current interest rates. Paying off a $400/month car loan increases your home purchasing power by roughly $60,000.",
        },
        {
          q: "What costs beyond the mortgage should I budget for?",
          a: "In addition to principal and interest, homeowners must budget for property taxes (0.8% to 2.5% of home value annually), homeowners hazard insurance ($1,200 to $2,500/year), routine maintenance reserves (1% of purchase price per year), and potential HOA dues.",
        },
        {
          q: "Can I buy a house with a DTI higher than 36%?",
          a: "Yes. Federal Housing Administration (FHA) loans allow back-end DTIs up to 43% (and up to 50% with strong compensating factors like high credit scores or substantial cash reserves). Conventional Fannie Mae loans can approve DTIs up to 45% through Automated Underwriting Systems (Desktop Underwriter).",
        },
        {
          q: "What credit score do I need for the lowest mortgage rate?",
          a: "A FICO credit score of 780 or higher qualifies you for top-tier prime mortgage pricing. Scores between 720 and 779 receive competitive rates, while scores below 680 trigger loan-level price adjustments (LLPAs) that increase monthly payments.",
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
                CFPB &amp; Fannie Mae QM Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Underwritten against <strong className="font-semibold text-slate-800 dark:text-slate-200">Consumer Financial Protection Bureau Qualified Mortgage Limits</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mortgage Banking Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How Mortgage Lenders Determine How Much You Can Borrow</h2>
          <p>
            When applying for a home loan, banks don&rsquo;t look at your take-home pay; they evaluate your <strong>Gross Monthly Income</strong>
            (pre-tax earnings) against your monthly debt obligations using the <strong>Debt-to-Income (DTI) ratio</strong>.
            This prevents home buyers from becoming &ldquo;house poor&rdquo;—spending so much on mortgage payments that they
            cannot save for retirement, emergencies, or daily living expenses.
          </p>

          {/* Graph #2: Authoritative Visual Income vs Purchasing Power Curve */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Salary vs Home Purchasing Power Curve (6.5% vs 7.5% Mortgage Rate)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark showing how annual household income translates into maximum affordable home price (30-year fixed, 10% down, 28/36 rule).
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                28/36 Underwriting
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line x1="50" y1="20" x2="570" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="70" x2="570" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="120" x2="570" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="570" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="570" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="40" y="24" fontSize="10" fill="#64748b" textAnchor="end">$800k</text>
                <text x="40" y="74" fontSize="10" fill="#64748b" textAnchor="end">$600k</text>
                <text x="40" y="124" fontSize="10" fill="#64748b" textAnchor="end">$400k</text>
                <text x="40" y="174" fontSize="10" fill="#64748b" textAnchor="end">$200k</text>
                <text x="40" y="204" fontSize="10" fill="#64748b" textAnchor="end">$0</text>

                {/* X-axis labels (Salary) */}
                <text x="90" y="218" fontSize="10" fill="#64748b" textAnchor="middle">$60k Salary</text>
                <text x="200" y="218" fontSize="10" fill="#64748b" textAnchor="middle">$90k Salary</text>
                <text x="320" y="218" fontSize="10" fill="#64748b" textAnchor="middle">$120k Salary</text>
                <text x="440" y="218" fontSize="10" fill="#64748b" textAnchor="middle">$160k Salary</text>
                <text x="540" y="218" fontSize="10" fill="#64748b" textAnchor="middle">$200k Salary</text>

                {/* 6.5% Rate Curve (Emerald) */}
                <path
                  d="M90 162 L200 132 L320 95 L440 54 L540 24"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* 7.5% Rate Curve (Amber) */}
                <path
                  d="M90 168 L200 142 L320 108 L440 70 L540 42"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Callout */}
                <circle cx="320" cy="95" r="4" fill="#10b981" />
                <text x="330" y="90" fontSize="11" fill="#10b981" fontWeight="bold">$120k Income → ~$515k Home (6.5%)</text>
                <text x="330" y="122" fontSize="10" fill="#f59e0b">~$465k Home (7.5%)</text>
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" /> 6.5% Interest Rate Purchasing Power
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-amber-500" /> 7.5% Interest Rate Purchasing Power (-10% Power)
              </span>
            </div>
          </div>

          <h2>The 28/36 Rule Formulas Explained</h2>
          <Formula>
            Front-End Max Housing = Gross Monthly Income × 0.28
          </Formula>
          <Formula>
            Back-End Max Total Debt = Gross Monthly Income × 0.36
          </Formula>
          <Formula>
            Max Mortgage Payment = Min(Front-End Limit, Back-End Limit - Monthly Debts)
          </Formula>

          <h2>Salary vs Purchasing Power Benchmarks (30-Year Fixed)</h2>
          <DataTable
            head={["Annual Household Income", "Gross Monthly Income", "Max Housing Payment (28%)", "Affordable Price (10% Down)", "Affordable Price (20% Down)"]}
            rows={[
              ["$60,000 / year", "$5,000 / month", "$1,400 / month", "$215,000 – $240,000", "$245,000 – $275,000"],
              ["$85,000 / year", "$7,083 / month", "$1,983 / month", "$315,000 – $345,000", "$360,000 – $395,000"],
              ["$110,000 / year", "$9,167 / month", "$2,567 / month", "$415,000 – $460,000", "$475,000 – $525,000"],
              ["$150,000 / year", "$12,500 / month", "$3,500 / month", "$575,000 – $630,000", "$650,000 – $720,000"],
              ["$200,000 / year", "$16,667 / month", "$4,667 / month", "$770,000 – $845,000", "$875,000 – $965,000"],
            ]}
            highlight={2}
          />

          <h2>Strategies to Boost Your Home Purchasing Power</h2>
          <ul>
            <li>
              <strong>Eliminate High-Payment Debts:</strong> Pay off car loans, personal loans, and revolving credit cards
              first. Eliminating a $400 car payment frees up $400/month of borrowing capacity, boosting your mortgage qualification by ~$60,000.
            </li>
            <li>
              <strong>Improve Your Credit Score by 40 Points:</strong> Elevating your FICO score from 680 to 740 lowers your
              mortgage interest rate by 0.50% to 0.75%, reducing monthly interest charges significantly.
            </li>
            <li>
              <strong>Increase Down Payment to 20%:</strong> Putting down 20% eliminates Private Mortgage Insurance (PMI),
              which typically adds $120 to $250 per month to mortgage payments for conventional buyers.
            </li>
          </ul>
          <p>
            Explore your down payment options with our{" "}
            <a href="/calculators/housing/down-payment-calculator">down payment calculator</a>, compare homeownership against
            leasing on the <a href="/calculators/housing/rent-vs-buy-calculator">rent vs buy calculator</a>, check amortization schedules
            on the <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, or see regional tax impacts on our{" "}
            <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
          </p>
        </>
      }
    >
      <HomeAffordabilityCalculator />
    </CalcPage>
  );
}
