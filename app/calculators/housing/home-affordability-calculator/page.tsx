import HomeAffordabilityCalculator from "@/components/calcs/housing/home-affordability-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HomeAffordabilityCurveChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/home-affordability-calculator";
const TITLE = "Home Affordability Calculator – How Much House? | CalcDigi";
const DESCRIPTION = "Free home affordability calculator: estimate how much house you can afford based on household income, down payment, monthly debts, and interest rates.";

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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <HomeAffordabilityCurveChart />

          <h2>The 28/36 Rule Formulas Explained</h2>
          <Formula>
            Front-End Max Housing = Gross Monthly Income × 0.28
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $120,000 Household Income</h2>

            <p>
              Suppose a household earns <strong>$120,000 annually ($10,000 gross monthly income)</strong>, has <strong>$500 in monthly recurring debt payments</strong> (student loans + auto financing), and possesses a 10% cash down payment with mortgage rates at 6.5%:
            </p>
            <ul>
              <li><strong>Front-End Ratio (28% Housing Cap)</strong>: $10,000 × 0.28 = <strong>$2,800 maximum monthly housing budget</strong> (PITI: Principal, Interest, Taxes, Insurance).</li>
              <li><strong>Back-End Ratio (36% Total Debt Cap)</strong>: ($10,000 × 0.36) - $500 debt = $3,600 - $500 = <strong>$3,100 allowable housing budget</strong>.</li>
              <li><strong>Binding Qualified Limit</strong>: The lower of the two governs: <strong>$2,800/month maximum PITI payment</strong>.</li>
              <li><strong>Escrow Deductions</strong>: Property taxes (~$400/mo), homeowners insurance (~$125/mo), and PMI (~$150/mo) consume $675/mo, leaving <strong>$2,125/month for Principal &amp; Interest</strong>.</li>
              <li><strong>Maximum Affordable Loan Balance</strong>: At 6.5% 30-year fixed, $2,125/mo supports a loan of <strong>$336,200</strong>.</li>
              <li><strong>Maximum Home Purchase Price (with 10% down)</strong>: $336,200 ÷ 0.90 = <strong>$373,500 maximum home purchase price</strong>.</li>
            </ul>


            <h2>Common Costly Traps in Home Affordability Planning</h2>
            <p>Steer clear of these four errors that lead to becoming "house poor":</p>
            <ul>
              <li><strong>Maxing Out Your Pre-Approval Limit:</strong> Lenders pre-approve you based on gross income before income taxes, healthcare premiums, and retirement 401(k) contributions are deducted. Purchasing at the maximum pre-approved ceiling frequently leaves zero discretionary savings for vacations, hobbies, or emergency repairs.</li>
              <li><strong>Overlooking Escalating Property Taxes &amp; Insurance:</strong> When a property is reassessed after purchase at the new higher sales price, your escrow payment can jump $200–$400/month in Year 2. Additionally, homeowners insurance premiums have surged by 20% to 50% in storm-prone states.</li>
              <li><strong>Failing to Budget 1% to 2% Annual Maintenance:</strong> A $400,000 home requires approximately $4,000 to $8,000 annually for routine maintenance, HVAC servicing, appliance replacements, tree trimming, and roof repairs.</li>
              <li><strong>Taking on New Debt Before Closing:</strong> Financing a new car or opening furniture credit cards between mortgage approval and closing changes your Debt-to-Income (DTI) ratio, triggering loan cancellations at the closing table.</li>
            </ul>


            <h2>Regional Geographic Cost Variations</h2>
            <p>
              Purchasing power varies dramatically depending on regional property tax structures and insurance markets:
            </p>
            <ul>
              <li><strong>Low-Tax Sunbelt &amp; Coastal States:</strong> Lower property tax rates in states like Nevada, Arizona, and Florida allow buyers to allocate more of their monthly payment toward loan principal.</li>
              <li><strong>High-Tax Northeast &amp; Midwest States:</strong> In New Jersey, Illinois, and New York, high property taxes (2.0% to 2.5%+) consume up to 30% of the buyer's monthly housing budget, reducing total borrowing power by $50,000 to $90,000 for the identical salary.</li>
            </ul>
            <p>
              Compare your upfront savings with our <a href="/calculators/housing/down-payment-calculator">down payment calculator</a>, evaluate property taxes with the <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>, and test rent alternatives with the <a href="/calculators/housing/rent-vs-buy-calculator">rent vs buy calculator</a>.
            </p>
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

          <h2>Underwriting Stress-Testing, Reserves &amp; Property Escrow Realities</h2>
          <p>
            When mortgage underwriters evaluate a home loan file, they apply rigorous debt-stress algorithms beyond simple base salary multiplication:
          </p>
          <ul>
            <li><strong>Verifiable Qualifying Income vs Gross Income:</strong> Overtime pay, quarterly bonuses, and commission earnings cannot be included in qualifying income unless documented across a continuous 24-month history on IRS W-2 forms with an employer letter certifying likelihood of continuation.</li>
            <li><strong>Post-Closing Asset Reserve Requirements:</strong> High-balance and jumbo conforming mortgages mandate that borrowers retain 6 to 12 months of total principal, interest, taxes, and insurance (PITI) in verified liquid bank or brokerage accounts after all down payment and closing fees have cleared.</li>
            <li><strong>Escrow Buffer Cushion &amp; Reassessment Shocks:</strong> Mortgage servicers routinely maintain a 2-month reserve cushion in property tax and homeowners insurance escrow accounts. When your home is reassessed at the purchase price, monthly mortgage bills frequently increase by 5% to 15% in Year 2.</li>
          </ul>

          <h2>Automated Underwriting Systems (AUS) &amp; Compensating Factors</h2>
          <p>
            Modern loan applications are processed through Fannie Mae Desktop Underwriter (DU) or Freddie Mac Loan Product Advisor (LPA). Understanding how AUS engines evaluate risk helps buyers qualify for maximum loan limits:
          </p>
          <ul>
            <li><strong>Front-End vs Back-End Debt-to-Income (DTI):</strong> Traditional mortgage guidelines recommend a maximum 28% front-end ratio (housing costs divided by gross income) and 36% back-end ratio (all recurring debt payments including auto loans, student loans, and credit cards). However, strong credit scores (740+) and substantial liquid reserves frequently unlock AUS approvals up to 45% or even 50% back-end DTI.</li>
            <li><strong>Credit Utilization Scoring Thresholds:</strong> FICO scores penalize revolving credit card utilization above 30%, and severely above 50%. Paying down credit card balances 45 days prior to mortgage application can boost credit scores by 20 to 45 points, saving up to 0.50% on your note interest rate.</li>
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
