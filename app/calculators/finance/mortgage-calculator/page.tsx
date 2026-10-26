import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MortgageCalculator } from "@/components/flagship/mortgage/MortgageCalculator";
import { MortgageAmortizationPrincipalInterestCurveChart } from "@/components/flagship/finance/editorial-charts/MortgageAmortizationPrincipalInterestCurveChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/mortgage-calculator";
const TITLE = "Mortgage Calculator | Monthly Payment with Taxes, Insurance, PMI & Amortization";
const DESCRIPTION =
  "Calculate your exact monthly mortgage payment with principal, interest, property taxes, home insurance, and PMI. Compare 15 vs 30-year amortization schedules and accelerated bi-weekly savings.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const FAQ_ITEMS = [
  {
    q: "What components make up a standard monthly mortgage payment (PITI)?",
    a: "A standard residential mortgage payment is composed of four primary components abbreviated as PITI: Principal (the loan balance repayment), Interest (the lender finance charge calculated on remaining balance), Taxes (local municipal property taxes escrowed monthly), and Insurance (homeowners hazard insurance and optional flood coverage). When purchasing with less than a 20% down payment on conventional financing, Private Mortgage Insurance (PMI) or FHA Mortgage Insurance Premiums (MIP) are added to the monthly escrow disbursement.",
  },
  {
    q: "How does an accelerated bi-weekly payment schedule save thousands in interest?",
    a: "Under an accelerated bi-weekly mortgage program, you remit half of your standard monthly payment every two weeks. Because a calendar year contains 52 weeks, you make 26 half-payments, which equals 13 full monthly payments annually instead of 12. That single extra monthly payment is credited directly toward loan principal reduction, shortening a standard 30-year amortization schedule by 4 to 6 years and eliminating $30,000 to $80,000 in compounding interest expenses.",
  },
  {
    q: "When and how can Private Mortgage Insurance (PMI) be removed from a conventional loan?",
    a: "Under the federal Homeowners Protection Act of 1998 (HPA), mortgage servicers must automatically cancel PMI once the principal balance reaches 78% of the original purchase value (22% home equity), provided mortgage payments remain current. Alternatively, homeowners possess the legal right to request voluntary PMI cancellation in writing once their loan balance reaches 80% Loan-to-Value (LTV) through scheduled principal payments or home value appreciation confirmed via certified appraisal.",
  },
  {
    q: "Should home buyers choose a 15-year fixed or a 30-year fixed mortgage?",
    a: "A 15-year fixed loan provides lower interest rates (typically 50 to 75 basis points lower) and drastically reduces lifetime interest charges, but requires substantially higher monthly cash flow commitments (30% to 45% higher monthly payments). In contrast, a 30-year fixed loan lowers mandatory monthly debt obligations, offering budget flexibility, while allowing borrowers to execute voluntary extra principal prepayments when cash flow permits.",
  },
  {
    q: "How do extra principal prepayments affect mortgage amortization?",
    a: "Because residential mortgages utilize daily or monthly simple interest calculated against the outstanding balance, every extra dollar directed toward principal immediately reduces the base upon which subsequent interest is calculated. Prepaying an extra $100 to $200 per month from the first payment significantly compresses the early amortization curve where payments are overwhelmingly interest-heavy.",
  },
  {
    q: "What is the maximum recommended Debt-to-Income (DTI) ratio for mortgage qualification?",
    a: "Under standard Fannie Mae and Freddie Mac underwriting guidelines, lenders evaluate front-end DTI (housing expenses including PITI, PMI, and HOA fees divided by gross monthly income, capped at 28%) and back-end DTI (all recurring monthly debts including auto loans, student debt, and credit cards divided by gross income, capped at 36% to 43%). Certain automated underwriting systems permit back-end DTIs up to 45% or 50% with strong compensating credit scores and cash reserves.",
  },
  {
    q: "How do mortgage points and lender discount fees work?",
    a: "One mortgage discount point equals 1% of the total loan amount paid upfront at closing to permanently reduce the mortgage interest rate, typically lowering the APR by approximately 0.25 percentage points. Calculating the break-even period requires dividing upfront points cost by monthly payment savings: if paying $3,000 saves $60 per month, the break-even threshold is 50 months (4.16 years).",
  },
  {
    q: "How does inflation affect fixed-rate mortgage debt over time?",
    a: "A fixed-rate mortgage serves as an effective macroeconomic inflation hedge because your nominal monthly principal and interest payment remains strictly constant over 30 years, while inflation increases nominal wages, home replacement values, and rental rates. Over time, the real purchasing power cost of servicing the fixed debt payment diminishes substantially.",
  },
];

const TERM_COMPARISON_ROWS = [
  ["Monthly Principal & Interest", "$2,022.62 / mo", "$2,785.44 / mo", "+$762.82 (+37.7%) higher cash flow"],
  ["Benchmark Fixed APR", "6.50% APR", "5.85% APR", "0.65% (65 bps) lower interest rate"],
  ["Total Interest Paid (Life of Loan)", "$408,142.12", "$181,379.28", "$226,762.84 interest saved (-55.6%)"],
  ["Total Cash Outflow (P&I)", "$728,142.12", "$501,379.28", "$226,762.84 total wealth preservation"],
  ["Amortization Velocity", "Year 14 Crossover", "Year 4 Crossover", "Equity builds 3.5× faster early on"],
  ["Cash Flow Budget Risk", "Lowest mandatory payment", "Higher monthly debt load", "30-year offers higher payment flexibility"],
];

const DOWN_PAYMENT_ROWS = [
  ["Conventional 3% Down", "$12,000 (3.0%)", "$388,000", "$210 - $290 / mo", "Year 9 (at 78% LTV)", "First-time buyers with strong FICO"],
  ["Conventional 5% Down", "$20,000 (5.0%)", "$380,000", "$175 - $250 / mo", "Year 8 (at 78% LTV)", "Standard low down payment option"],
  ["Conventional 10% Down", "$40,000 (10.0%)", "$360,000", "$110 - $160 / mo", "Year 5 (at 78% LTV)", "Reduced PMI premium rates"],
  ["Conventional 20% Down", "$80,000 (20.0%)", "$320,000", "$0.00 (No PMI)", "N/A (Exempt from start)", "Maximum savings & lowest monthly cost"],
];

const RELATED = [
  { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
  { href: "/calculators/finance/home-affordability-calculator", icon: "🏡", name: "Affordability Tool" },
  { href: "/calculators/finance/down-payment-calculator", icon: "💵", name: "Down Payment" },
  { href: "/calculators/finance/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
  { href: "/calculators/finance/loan-calculator", icon: "💳", name: "Personal Loan" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
];

export default function MortgageCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/finance", label: "Finance" }}
      title={TITLE}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="M = P \frac{r(1+r)^n}{(1+r)^n - 1}"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              CFPB &amp; Fannie Mae Underwriting Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>Amortization &amp; Actuarial Precision</span>
          </div>

          <h2>What is a Mortgage? Definition &amp; Actuarial Amortization Mechanics</h2>
          <p>
            A <strong>mortgage</strong> is a secured debt instrument used by prospective real estate buyers to purchase residential or commercial property without providing the entire capital balance upfront. In exchange for the borrowed principal <em>P</em>, the borrower pledges the physical property as collateral and enters a legally binding contract to repay the balance alongside compounding interest <em>r</em> over a defined amortization term <em>n</em> (typically 15, 20, or 30 years).
          </p>
          <p>
            Unlike simple balloon loans or interest-only lines of credit, fixed-rate residential mortgages utilize <strong>fully amortizing payment schedules</strong>. Every monthly payment remains strictly uniform in nominal dollars, but the internal allocation shifts dynamically: early monthly payments are heavily weighted toward bank interest charges, while subsequent payments increasingly accelerate toward principal reduction as the outstanding debt balance declines.
          </p>

          <div className="not-prose my-8">
            <MortgageAmortizationPrincipalInterestCurveChart />
          </div>

          <h2>The Mathematical Derivation of Fixed-Rate Monthly Mortgage Payments</h2>
          <p>
            The mathematical foundation of a fixed-rate monthly mortgage payment resolves to an ordinary annuity present value formula. Given a borrowed loan principal <em>P</em>, an annual percentage rate (APR), and a total term of <em>Y</em> years:
          </p>
          <Formula>{"M = P \left[ \frac{r(1+r)^n}{(1+r)^n - 1} \right]"}</Formula>
          <p>
            Where:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>M</strong> = Scheduled monthly principal and interest payment</li>
            <li><strong>P</strong> = Net borrowed loan balance (Home Purchase Price minus Down Payment)</li>
            <li><strong>r</strong> = Periodic monthly interest rate, derived as: <Formula>{"r = \frac{\text{Annual Rate (APR)}}{12 \times 100}"}</Formula></li>
            <li><strong>n</strong> = Total number of scheduled monthly payment periods: <Formula>{"n = Y \times 12"}</Formula></li>
          </ul>

          <p>
            <em>Worked Example:</em> Consider purchasing a $400,000 home with a 20% down payment ($80,000), leaving a net borrowed principal of $320,000 financed over 30 years at 6.50% APR. Computing the periodic variables yields:
          </p>
          <Formula>{"r = \frac{0.065}{12} = 0.0054167, \quad n = 30 \times 12 = 360"}</Formula>
          <p>
            Evaluating the exponential factor: <Formula>{"(1 + 0.0054167)^{360} = 6.9531"}</Formula>. Substituting these coordinates into the annuity equation:
          </p>
          <Formula>{"M = 320{,}000 \times \left[ \frac{0.0054167 \times 6.9531}{6.9531 - 1} \right] = 320{,}000 \times 0.0063207 = \$2{,}022.62 \text{ / month}"}</Formula>
          <p>
            In month 1, interest charges alone consume <Formula>{"\$320{,}000 \times 0.0054167 = \$1{,}733.33"}</Formula>, leaving only $289.29 directed toward building genuine home equity. As modeled with our <Link href="/calculators/finance/compound-interest-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">compound interest calculator</Link>, compounding interest works against the borrower during early loan years.
          </p>

          <h2>Unpacking PITI: The Four Critical Pillars of Monthly Housing Costs</h2>
          <p>
            A common mistake made by first-time home buyers when evaluating affordability with our <Link href="/calculators/finance/home-affordability-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">home affordability calculator</Link> is budgeting solely for principal and interest. Mortgage lenders legally escrow four distinct expense components known as PITI:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Principal (P):</strong> Direct equity repayment that diminishes the remaining outstanding loan note balance.</li>
            <li><strong>Interest (I):</strong> The financial cost of borrowing capital charged by the lender, calculated strictly on the unpaid balance.</li>
            <li><strong>Taxes (T):</strong> Municipal real estate property taxes assessed by county authorities, collected monthly into an escrow reserve account. Property taxes typically range between 0.60% and 2.40% of assessed property value annually depending on jurisdiction, verifiable with our <Link href="/calculators/finance/sales-tax-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">tax tools</Link>.</li>
            <li><strong>Insurance (I):</strong> Homeowners hazard insurance protecting the structural integrity of the property against fire, windstorm, and casualty perils.</li>
          </ol>

          <h2>30-Year vs. 15-Year Mortgage Amortization: The Wealth Preservation Trade-Off</h2>
          <p>
            Choosing between a 15-year and a 30-year mortgage term is one of the most consequential personal finance decisions. A 15-year mortgage accelerates equity accumulation and curtails cumulative interest payouts, but necessitates substantially higher monthly cash flow commitments:
          </p>

          <DataTable
            head={["Metric Comparison ($320k Loan)", "30-Year Fixed Term (6.50% APR)", "15-Year Fixed Term (5.85% APR)", "Strategic Financial Advantage"]}
            rows={TERM_COMPARISON_ROWS}
            highlight={2}
          />

          <h2>Down Payment Tiers, Loan-to-Value (LTV) &amp; PMI Removal Mechanics</h2>
          <p>
            The size of your upfront cash investment calculated through our <Link href="/calculators/finance/down-payment-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">down payment calculator</Link> determines your Loan-to-Value ratio (LTV). Under conventional financing guidelines, putting down less than 20% triggers mandatory Private Mortgage Insurance (PMI):
          </p>

          <DataTable
            head={["Down Payment Tier ($400k Home)", "Initial Cash Required", "Financed Balance", "Estimated Monthly PMI", "Automated Cancellation", "Ideal Buyer Profile"]}
            rows={DOWN_PAYMENT_ROWS}
            highlight={3}
          />

          <h2>Accelerated Bi-Weekly Payment Strategy: Pay Off Debt 5 Years Sooner</h2>
          <p>
            Under an accelerated bi-weekly mortgage strategy, you divide your monthly P&amp;I payment by two and submit it every 14 days. Because the solar calendar consists of 52 weeks, you make 26 bi-weekly half-payments per year—equaling exactly 13 full payments rather than 12:
          </p>
          <Formula>{"\text{Annual Payments} = \frac{52 \text{ weeks}}{2} \times \left( \frac{M}{2} \right) = 26 \times \frac{M}{2} = 13 \times M"}</Formula>
          <p>
            That single extra payment each calendar year goes 100% toward principal debt elimination without increasing monthly lifestyle strain. On a $320,000 loan at 6.50% APR, this simple strategy shaves 5.2 years off the 30-year term and saves over $58,000 in compounding interest, yielding returns comparable to an aggressive diversified investment modeled in our <Link href="/calculators/finance/roi-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">ROI calculator</Link>.
          </p>

          <h2>Fixed-Rate vs. Adjustable-Rate Mortgages (ARM): Interest Rate Caps &amp; Index Volatility</h2>
          <p>
            While 30-year fixed mortgages provide complete interest rate certainty over decades, Adjustable-Rate Mortgages (ARMs, such as 5/1 ARM or 7/1 ARM) offer lower introductory teaser rates for an initial fixed period. After this initial window expires, the loan interest rate resets periodically based on benchmark financial indices, such as the 30-day Secured Overnight Financing Rate (SOFR) published by the Federal Reserve Bank of New York, plus a predetermined lender margin:
          </p>
          <Formula>{"\text{Fully Indexed Rate} = \text{SOFR Index Rate} + \text{Lender Margin (e.g. 2.75\%)}"}</Formula>
          <p>
            To protect borrowers against catastrophic interest rate spikes during monetary tightening cycles, ARMs incorporate statutory adjustment caps formatted as 2/2/5:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Initial Adjustment Cap (2%):</strong> The maximum percentage rate increase permitted during the very first adjustment cycle.</li>
            <li><strong>Periodic Cap (2%):</strong> The maximum allowable rate movement during any subsequent annual reset interval.</li>
            <li><strong>Lifetime Ceiling Cap (5%):</strong> The maximum total interest rate increase permissible over the entire life of the mortgage note above the initial start rate.</li>
          </ul>
          <p>
            When inflation escalates, as tracked in our <Link href="/calculators/finance/inflation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">inflation calculator</Link>, ARM borrowers face substantial payment shock upon entering reset windows. Fixed-rate financing remains the benchmark choice for long-term household balance sheet stability.
          </p>

          <h2>Closing Costs, Escrow Impounds &amp; Total Upfront Capital Requirements</h2>
          <p>
            In addition to the down payment, home buyers must assemble liquid reserves for lender closing costs, which typically range from 2.0% to 5.0% of the gross loan amount as calculated with our <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">percentage calculator</Link>. Closing fees comprise both non-recurring closing costs and recurring prepaid escrow items:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Lender Origination &amp; Underwriting:</strong> Processing fees, credit report checks, and mandatory certified real estate appraisals ($450 - $750).</li>
            <li><strong>Title Examination &amp; Lender Title Insurance:</strong> Guarantees legal ownership validity and protects against unrecorded liens, easements, or municipal encumbrances.</li>
            <li><strong>Prepaid Escrow Cushion:</strong> Lenders typically collect 2 months of property taxes and 14 months of homeowners insurance upfront to establish a compliant escrow reserve cushion under RESPA Section 10 guidelines.</li>
          </ul>
          <p>
            Evaluating net monthly income with our <Link href="/calculators/finance/take-home-pay-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">take-home pay calculator</Link> ensures that your post-closing cash liquidity remains adequate to weather unexpected home maintenance expenses.
          </p>

          <h2>Mortgage Recasting vs. Full Refinancing: Break-Even Horizon Analysis</h2>
          <p>
            Borrowers who accumulate a lump-sum windfall (such as an annual corporate bonus, inheritance, or capital gain) often face a strategic dilemma: should they refinance into a new mortgage note or request a <strong>mortgage recast</strong>? While refinancing replaces the existing promissory note with a new loan—incurring 2% to 4% in mandatory lender closing fees and resetting the amortization clock—a mortgage recast simply applies a lump-sum principal reduction (typically $5,000 or greater) while preserving the current interest rate and loan term.
          </p>
          <p>
            Upon recasting for a nominal administrative fee ($250 to $500), the lender re-amortizes the remaining diminished principal balance across the original remaining term, immediately lowering mandatory monthly P&amp;I payments without closing costs. If current market interest rates have risen significantly since origination, recasting represents an ideal strategy to curtail debt service while retaining an ultra-low historical interest rate.
          </p>

          <h2>Home Equity Accumulation &amp; Secondary Liquidity (HELOCs)</h2>
          <p>
            As scheduled amortization persistently diminishes your principal balance and market forces drive long-term property appreciation, your unencumbered home equity expands substantially. Homeowners frequently capitalize on accumulated equity via Home Equity Lines of Credit (HELOCs) or cash-out refinances to fund high-ROI residential renovations, consolidate higher-interest consumer debt, or establish emergency credit reserves without liquidating retirement assets.
          </p>

          <h2>Rent vs. Buy Analysis: Real Estate Equity vs. Sunk Capital Costs</h2>
          <p>
            When evaluating homeownership against long-term tenancy with our <Link href="/calculators/finance/rent-vs-buy-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">rent vs buy calculator</Link> and general <Link href="/calculators/finance/loan-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">loan calculator</Link>, prospective buyers must distinguish recoverable equity from irrecoverable transaction friction (title fees, lender origination points, mortgage interest, property taxes, maintenance reserves, and transfer stamps). Over a standard 7-year holding period, historical residential appreciation combined with predictable fixed-rate principal reduction systematically surpasses rental market cost escalation.
          </p>
        </>
      }
    >
      <MortgageCalculator />
    </CalcPage>
  );
}
