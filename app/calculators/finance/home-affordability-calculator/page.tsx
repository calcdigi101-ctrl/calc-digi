import Calculator from "@/components/calcs/finance/home-affordability-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HomeAffordabilityDtiSpectrumChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/home-affordability-calculator";
const TITLE = "Home Affordability Calculator – How Much House Can You Afford? | CalcDigi";
const DESCRIPTION =
  "Free home affordability calculator: calculate maximum home purchase price based on household gross income, monthly recurring debts, down payment, and lender 28/36 debt-to-income (DTI) underwriting ratios under Fannie Mae and CFPB rules.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Home Affordability Calculator"
      intro="Determine your maximum home purchasing budget based on gross annual household income, recurring monthly debt obligations, down payment savings, and underwriting debt-to-income (DTI) ratios."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="M_{\text{allowable}} = \min\left(I_{\text{gross}} \times 0.28, \; (I_{\text{gross}} \times 0.36) - D_{\text{recurring}}\right)"
      article={
        <>
          <h2>Direct Answer: How Mortgage Underwriters Determine Home Purchasing Limits</h2>
          <p>
            Mortgage underwriters evaluate maximum home purchasing capacity using strictly defined <strong>Debt-to-Income (DTI) ratios</strong> rather than discretionary household spending budgets. Under traditional conventional underwriting guidelines, eligibility is governed by the <strong>28/36 Rule</strong>: your total monthly housing obligation (Principal, Interest, Property Taxes, Homeowners Insurance, HOA dues, and PMI—known as PITI) should not exceed <strong>28% of gross monthly income</strong> (the Front-End DTI), while your total monthly debt payments (housing expense plus recurring auto loans, student debt, and credit card minimums) cannot exceed <strong>36% of gross monthly income</strong> (the Back-End DTI).
          </p>
          <p>
            When mortgage interest rates fluctuate, home purchasing power shifts dramatically. Because home loans amortize over a 30-year horizon, a 1.00% rise in mortgage rates diminishes buyer borrowing power by approximately <strong>9% to 11%</strong> for the exact same monthly payment.
          </p>

          <HomeAffordabilityDtiSpectrumChart />

          <h2>Actuarial Mathematics of Underwriting Affordability Limits</h2>
          <p>
            To compute the maximum qualified home price, underwriters evaluate gross monthly income <Formula>{"I_{\\text{gross}}"}</Formula> against existing recurring non-housing debt obligations <Formula>{"D_{\\text{recurring}}"}</Formula>:
          </p>

          <Formula>{"M_{\\text{front}} = I_{\\text{gross}} \\times 0.28"}</Formula>
          <Formula>{"M_{\\text{back}} = (I_{\\text{gross}} \\times 0.36) - D_{\\text{recurring}}"}</Formula>
          <Formula>{"M_{\\text{allowable}} = \\min(M_{\\text{front}}, M_{\\text{back}})"}</Formula>
          <p>
            Where:
            <br />• <strong>M_allowable</strong> = Maximum permissible total monthly housing expense (PITI) ($)
            <br />• <strong>I_gross</strong> = Gross monthly household income before income taxes ($)
            <br />• <strong>D_recurring</strong> = Total monthly non-mortgage debt payments (auto financing, student loans, card minimums) ($)
          </p>
          <p>
            Once <Formula>{"M_{\\text{allowable}}"}</Formula> is determined, subtracting monthly escrow reserves (property tax <Formula>{"T"}</Formula>, hazard insurance <Formula>{"I"}</Formula>, and HOA dues) leaves the maximum monthly principal and interest payment <Formula>{"PMT_{\\text{max}}"}</Formula>, which yields the maximum supported mortgage balance <em>P</em>:
          </p>
          <Formula>{"P = PMT_{\\text{max}} \\times \\left[ \\frac{(1 + r)^n - 1}{r(1 + r)^n} \\right]"}</Formula>
          <Formula>{"\\text{Max Home Purchase Price} = P + \\text{Cash Down Payment}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a household with a <strong>$120,000 gross annual income</strong> ($10,000 gross per month) and <strong>$600 per month in recurring non-housing debt</strong> ($400 auto loan + $200 student loan), with <strong>10% cash down payment saved</strong>, shopping for a 30-year fixed mortgage at <strong>6.50% APR</strong> with 1.20% annual property tax and $100/mo insurance:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Evaluate Front-End DTI (28%).</strong> Maximum permissible housing payment is:
              <Formula>{"M_{\\text{front}} = \\$10{,}000 \\times 0.28 = \\$2{,}800.00 \\text{ / month}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Evaluate Back-End DTI (36%).</strong> Total allowable debt minus existing obligations:
              <Formula>{"M_{\\text{back}} = (\\$10{,}000 \\times 0.36) - \\$600 = \\$3{,}600 - \\$600 = \\$3{,}000.00 \\text{ / month}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Establish binding constraint.</strong> Taking the minimum yields <Formula>{"M_{\\text{allowable}} = \\min(\\$2{,}800, \\$3{,}000) = \\$2{,}800.00 / \\text{mo}"}</Formula>. The 28% front-end cap is the binding limit.
            </li>
            <li>
              <strong>Step 4: Solve for maximum supported mortgage note (P).</strong> Subtracting insurance ($100/mo) leaves $2,700 for P&amp;I, property tax (1.2% / 12 = 0.10% monthly of price), and PMI (0.40% / 12 = 0.033% monthly of loan). With 10% down, the combined monthly payment factor per dollar of loan is 0.007765:
              <Formula>{"P = \\frac{\\$2{,}700}{0.007765} = \\$347{,}714 \\text{ maximum financed loan note}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Determine total purchase price with 10% down.</strong>
              <Formula>{"\\text{Max Purchase Price} = \\frac{\\$347{,}714}{0.90} = \\$386{,}349 \\quad (\\text{Down Payment} = \\$38{,}635)"}</Formula>
            </li>
          </ol>

          <h2>Household Income vs. Purchasing Power Across Interest Rate Tiers</h2>
          <p>
            The table below evaluates maximum home purchase capacity under the 28% front-end guideline (assuming 10% down, 1.2% property taxes, and $1,200/year homeowners insurance):
          </p>

          <DataTable
            head={["Household Gross Income", "Max Monthly PITI", "At 5.5% Interest Rate", "At 6.5% Interest Rate", "At 7.5% Interest Rate"]}
            rows={[
              ["$70,000 / year", "$1,633 / month", "$278,000", "$252,000", "$229,000"],
              ["$100,000 / year", "$2,333 / month", "$398,000", "$360,000", "$328,000"],
              ["$140,000 / year", "$3,267 / month", "$557,000", "$504,000", "$459,000"],
              ["$180,000 / year", "$4,200 / month", "$716,000", "$648,000", "$590,000"],
              ["$250,000 / year", "$5,833 / month", "$995,000", "$901,000", "$820,000"],
            ]}
          />

          <h2>DTI Limits &amp; Underwriting Criteria Across Major Loan Programs</h2>
          <p>
            Different mortgage loan programs establish distinct statutory DTI ceilings and compensating underwriting allowances:
          </p>

          <DataTable
            head={["Mortgage Program", "Standard Front/Back DTI", "Max DTI with AUS Approval", "Min FICO Required", "Down Payment Min", "Key Underwriting Advantage"]}
            rows={[
              ["Conventional (Fannie/Freddie)", "28% / 36%", "Up to 45% – 50%", "620 (740+ for prime)", "3.0% – 5.0%", "PMI cancels automatically at 78% LTV"],
              ["FHA Government Loan", "31% / 43%", "Up to 46.9% / 56.9%", "580 (500 with 10% down)", "3.5%", "Forgiving credit thresholds and high DTI caps"],
              ["VA Military Loan", "No Front Cap / 41%", "Up to 50% – 55%", "620 (typical lender)", "0.0% Down", "Zero down payment and zero ongoing monthly PMI"],
              ["Jumbo Non-Conforming", "30% / 38%", "Strict 43% Maximum", "700 – 740+", "10.0% – 20.0%", "Finances luxury homes above conforming loan limits"],
            ]}
          />

          <h2>The 30/30/3 Rule: Conservative Home Buying Guidelines</h2>
          <p>
            While bank mortgage approvals define what you <em>can</em> borrow, financial advisors recommend the <strong>30/30/3 Rule</strong> to determine what you <em>should</em> spend:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Rule 1 (Max 30% Housing Allocation):</strong> Total housing costs (PITI + utilities + maintenance) should not exceed 30% of gross household income.</li>
            <li><strong>Rule 2 (30% Cash Saved):</strong> Accumulate 30% of the target home price in liquid cash before purchasing: 20% for down payment, 5% for closing costs and moving expenses, and 5% for an emergency buffer.</li>
            <li><strong>Rule 3 (Max 3× Annual Income):</strong> The total home purchase price should ideally remain within 3.0 to 3.5 times your gross annual household income.</li>
          </ul>

          <h2>4 Core Strategies to Maximize Home Buying Capacity</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Eliminate High-Payment Revolving Debts:</strong> Paying off a car loan with a $500 monthly payment immediately unlocks roughly $65,000 to $75,000 in additional mortgage borrowing capacity under back-end DTI underwriting.
            </li>
            <li>
              <strong>Elevate Credit Score Above 740:</strong> Moving from a 680 to a 740+ FICO score lowers your mortgage APR by 0.35% to 0.60% and cuts monthly Private Mortgage Insurance (PMI) premiums in half.
            </li>
            <li>
              <strong>Shop Lower Property Tax Districts:</strong> In high-tax jurisdictions (2.2% annual property tax), a $400k home requires $733/mo in escrow taxes alone. Selecting an adjacent county with a 1.0% tax rate frees up $400/mo in cash flow, expanding buying power by $50,000.
            </li>
            <li>
              <strong>Add a Creditworthy Co-Borrower:</strong> Adding a spouse or family co-signer combines gross incomes, significantly expanding the front-end DTI qualification threshold.
            </li>
          </ol>

          <h2>Essential Home Affordability Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Front-End DTI:</strong> Percentage of monthly gross income committed strictly to housing expenses (principal, interest, taxes, insurance, HOA).</li>
            <li><strong>Back-End DTI:</strong> Percentage of monthly gross income dedicated to all recurring debt payments combined (housing plus auto, student loans, and credit cards).</li>
            <li><strong>Compensating Factors:</strong> Financial strengths—such as substantial cash reserves, long job stability, or high credit scores—that allow underwriters to approve higher DTI ratios.</li>
            <li><strong>Conforming Loan Limit:</strong> The maximum loan balance eligible for government-sponsored enterprise (Fannie Mae/Freddie Mac) financing without entering Jumbo loan status.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Real Estate Financing Solvers</h3>
            <p>
              Plan your 30-year amortization schedule with the <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, calculate upfront equity needs via the <a href="/calculators/finance/down-payment-calculator">Down Payment Calculator</a>, compare equity building against leasing with the <a href="/calculators/finance/rent-vs-buy-calculator">Rent vs Buy Calculator</a>, and model salary cash flows using the <a href="/calculators/finance/salary-calculator">Salary Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the maximum DTI lenders will accept for a mortgage?",
          a: "While 36% is standard for manual conventional underwriting, automated underwriting systems (Fannie Mae Desktop Underwriter) regularly approve back-end DTIs up to 45% or 50% with strong credit scores and cash reserves. FHA loans permit back-end DTIs up to 46.9% to 56.9% with automated approval.",
        },
        {
          q: "What costs are included in the PITI housing calculation?",
          a: "PITI stands for Principal, Interest, Property Taxes, and Homeowners Insurance. Underwriters also add mandatory HOA/condo dues and Private Mortgage Insurance (PMI) if putting down less than 20%.",
        },
        {
          q: "How does my down payment affect how much home I can afford?",
          a: "A larger down payment directly expands purchasing power dollar-for-dollar without increasing your monthly payment. Additionally, putting down 20% or more eliminates PMI, saving $100 to $300+ monthly that can support a higher loan amount.",
        },
        {
          q: "Should I buy at the absolute maximum of my approval limit?",
          a: "Generally no. Lenders approve loans based on gross pre-tax income without accounting for health insurance, daycare, groceries, vehicle maintenance, or retirement savings. Buying below your maximum approval ensures a sustainable lifestyle cushion.",
        },
        {
          q: "How do student loans affect mortgage affordability under DTI rules?",
          a: "Under conventional guidelines, if student loans are in income-driven repayment (IDR), lenders use your actual documented monthly payment. If loans are in deferment or forbearance, lenders typically calculate 0.5% to 1.0% of the loan balance as a monthly liability.",
        },
        {
          q: "Can I use bonus, overtime, or commission income to qualify?",
          a: "Yes, provided you demonstrate a documented 2-year consecutive history of receiving variable income with your current or previous employer, and your employer verifies the income is likely to continue.",
        },
        {
          q: "How does interest rate affect purchasing power on a 30-year loan?",
          a: "As a rule of thumb, every 1.00% increase in mortgage interest rates reduces your borrowing purchasing power by approximately 10%. On a $400,000 budget, a 1% rate hike reduces your buying power by roughly $40,000 for the identical monthly payment.",
        },
        {
          q: "What are liquid reserve requirements after closing?",
          a: "Lenders often require borrowers to maintain 2 to 6 months of complete PITI mortgage payments in liquid accounts (checking, savings, money market) after paying their down payment and closing costs, proving financial stability.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/finance/down-payment-calculator", icon: "💵", name: "Down Payment" },
        { href: "/calculators/finance/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary Calculator" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Personal Loan" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}