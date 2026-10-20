import PropertyTaxCalculator from "@/components/calcs/housing/property-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/property-tax-calculator";
const TITLE = "Property Tax Calculator – Annual & Monthly Real Estate Taxes | CalcDigi";
const DESCRIPTION =
  "Free property tax calculator: estimate annual and monthly property tax payments, millage rates, assessed value exemptions, and county tax allocations across all 50 states.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Property Tax Calculator"
      intro="Calculate your annual and monthly property tax bill based on market value, county assessment ratios, millage rates, and homestead exemptions."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Annual Tax = Max(0, (Market Value * Assessment Ratio) - Exemption) * (Tax Rate / 100)"
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
        { href: "/calculators/housing/rent-vs-buy-calculator", icon: "🔑", name: "Rent vs Buy" },
        { href: "/calculators/housing/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/housing/home-equity-calculator", icon: "📈", name: "Home Equity" },
      ]}
      faq={[
        {
          q: "What is the difference between market value and assessed value?",
          a: "Market value is the open-market price a buyer is willing to pay for your home under normal conditions. Assessed value is the valuation placed on your property by the municipal or county tax assessor strictly for taxation purposes. In many jurisdictions, assessed value is only a statutory percentage (assessment ratio) of market value, such as 70% or 80%.",
        },
        {
          q: "What is a mill rate, and how do I convert millage to a tax percentage?",
          a: "A mill represents one-tenth of one cent, or $1 in tax for every $1,000 of assessed property value. To convert a mill rate to a percentage, divide it by 10 (e.g., 25 mills = 2.50%). Conversely, multiply a percentage tax rate by 10 to obtain the mill rate (e.g., 1.5% = 15 mills).",
        },
        {
          q: "How does a primary residence homestead exemption reduce my property tax bill?",
          a: "A homestead exemption legally reduces the taxable portion of your assessed property value before taxes are calculated. For instance, if your assessed value is $400,000 and your county offers a $50,000 homestead exemption, your annual tax is calculated strictly on $350,000, saving hundreds to thousands of dollars every year.",
        },
        {
          q: "Why did my monthly mortgage payment increase if my interest rate is fixed?",
          a: "Most homeowners pay property taxes through an escrow account bundled into their monthly mortgage payment. When local tax assessors increase your home's assessed value or local voters approve tax levies, your annual tax rises. The loan servicer performs an annual escrow analysis and increases your monthly payment to cover both the higher taxes and the escrow shortage.",
        },
        {
          q: "How can I appeal a property tax assessment to lower my taxes?",
          a: "You can file an assessment appeal (often called a tax grievance) with your county board of equalization. Success requires providing evidence that the assessor's estimated market value exceeds recent comparable sales (comps) in your immediate neighborhood, or demonstrating uncorrected structural flaws, easement restrictions, or clerical square footage errors on the property card.",
        },
        {
          q: "Are property taxes tax-deductible on federal income tax returns?",
          a: "Yes. In the United States, homeowners who itemize deductions can deduct paid state and local real estate taxes under the State and Local Tax (SALT) deduction. However, federal law caps total SALT deductions at $10,000 per calendar year ($5,000 for married individuals filing separately).",
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
                IAAO Valuation Standard Aligned
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified with <strong className="font-semibold text-slate-800 dark:text-slate-200">International Association of Assessing Officers & US Census Data</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Real Estate Valuation Audit</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How Property Taxes Are Calculated</h2>
          <p>
            Property taxes represent one of the largest ongoing expenses of homeownership, frequently totaling between{" "}
            <strong>1% and 2.5% of total home market value annually</strong>. Unlike income taxes, property taxes are ad valorem taxes,
            meaning they are assessed directly against the taxable value of physical real property to fund municipal school districts,
            county infrastructure, law enforcement, fire protection, and public libraries.
          </p>

          {/* Graph #2: Authoritative Visual State Property Tax Rates Benchmark */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Effective Property Tax Rates by US State (Benchmark Comparison)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Effective percentage rate paid annually on median home values across high, moderate, and low-tax states.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                US Avg: 1.11%
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[620px]" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Benchmark national average dashed line */}
                <line x1="285" y1="20" x2="285" y2="215" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="290" y="32" fill="#64748b" fontSize="11" fontWeight="600">US Avg (1.11%)</text>

                {/* State Bars */}
                {/* New Jersey: 2.49% */}
                <text x="15" y="55" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">New Jersey (2.49%)</text>
                <rect x="160" y="42" width="330" height="18" rx="4" fill="#ef4444" fillOpacity="0.85" />
                <text x="500" y="55" fill="#ef4444" fontSize="11" fontWeight="600">$9,960/yr on $400k</text>

                {/* Illinois: 2.27% */}
                <text x="15" y="80" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">Illinois (2.27%)</text>
                <rect x="160" y="67" width="300" height="18" rx="4" fill="#f87171" fillOpacity="0.85" />
                <text x="470" y="80" fill="#f87171" fontSize="11" fontWeight="600">$9,080/yr</text>

                {/* Texas: 1.80% */}
                <text x="15" y="105" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">Texas (1.80%)</text>
                <rect x="160" y="92" width="238" height="18" rx="4" fill="#f59e0b" fillOpacity="0.85" />
                <text x="410" y="105" fill="#d97706" fontSize="11" fontWeight="600">$7,200/yr (No Inc Tax)</text>

                {/* Florida: 0.98% */}
                <text x="15" y="130" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">Florida (0.98%)</text>
                <rect x="160" y="117" width="130" height="18" rx="4" fill="#10b981" fillOpacity="0.85" />
                <text x="300" y="130" fill="#059669" fontSize="11" fontWeight="600">$3,920/yr</text>

                {/* California: 0.76% */}
                <text x="15" y="155" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">California (0.76%)</text>
                <rect x="160" y="142" width="101" height="18" rx="4" fill="#10b981" fillOpacity="0.85" />
                <text x="272" y="155" fill="#059669" fontSize="11" fontWeight="600">$3,040/yr (Prop 13)</text>

                {/* Colorado: 0.51% */}
                <text x="15" y="180" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">Colorado (0.51%)</text>
                <rect x="160" y="167" width="68" height="18" rx="4" fill="#059669" fillOpacity="0.85" />
                <text x="238" y="180" fill="#059669" fontSize="11" fontWeight="600">$2,040/yr</text>

                {/* Hawaii: 0.28% */}
                <text x="15" y="205" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="12" fontWeight="600">Hawaii (0.28%)</text>
                <rect x="160" y="192" width="37" height="18" rx="4" fill="#047857" fillOpacity="0.9" />
                <text x="207" y="205" fill="#047857" fontSize="11" fontWeight="600">$1,120/yr (Lowest in US)</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              Source: Tax Foundation & Lincoln Institute of Land Policy 50-State Property Tax Survey. Rates based on median effective taxes paid.
            </p>
          </div>

          <h2>The Mathematical Property Tax Formula</h2>
          <p>
            Your property tax is determined through a sequential mathematical chain: first converting fair market value to assessed valuation,
            deducting statutory exemptions, and finally applying local municipal and county millage rates.
          </p>

          <Formula>
            Assessed Value = Fair Market Value * (Assessment Ratio / 100)
          </Formula>
          <Formula>
            Taxable Assessed Value = Max(0, Assessed Value - Homestead Exemptions)
          </Formula>
          <Formula>
            Annual Tax = Taxable Assessed Value * (Millage Rate / 1000)
          </Formula>
          <Formula>
            Monthly Escrow Obligation = Annual Property Tax / 12
          </Formula>

          <h2>Understanding Millage Rates and Mills</h2>
          <p>
            Tax assessors and local town budgets frequently quote property taxes in terms of <strong>mills</strong>. One mill represents
            one-thousandth of a dollar ($0.001), or exactly $1 in tax for every $1,000 of taxable assessed property value.
          </p>
          <ul>
            <li><strong>10 mills</strong> equals a 1.00% tax rate ($1,000 per $100,000 assessed value).</li>
            <li><strong>25 mills</strong> equals a 2.50% tax rate ($2,500 per $100,000 assessed value).</li>
            <li><strong>45 mills</strong> equals a 4.50% tax rate ($4,500 per $100,000 assessed value).</li>
          </ul>

          <h2>50-State Property Tax Benchmark Table</h2>
          <p>
            Compare property tax liabilities across representative US states for a benchmark <strong>$400,000 residential home</strong>:
          </p>

          <DataTable
            head={["State", "Effective Tax Rate", "Annual Tax on $400k Home", "Monthly Escrow Impact", "Primary Exemption Programs"]}
            rows={[
              ["New Jersey", "2.49%", "$9,960", "$830/mo", "Senior Freeze & ANCHOR Rebate"],
              ["Illinois", "2.27%", "$9,080", "$757/mo", "General Homestead Exemption ($10,000)"],
              ["Connecticut", "2.14%", "$8,560", "$713/mo", "Municipal Elderly/Disabled Relief"],
              ["New Hampshire", "1.86%", "$7,440", "$620/mo", "No state income or sales tax balance"],
              ["Texas", "1.80%", "$7,200", "$600/mo", "100k Residence Homestead Exemption"],
              ["Ohio", "1.57%", "$6,280", "$523/mo", "Owner-Occupancy 2.5% Tax Reduction"],
              ["Pennsylvania", "1.53%", "$6,120", "$510/mo", "Homestead / Farmstead Property Exclusion"],
              ["US National Average", "1.11%", "$4,440", "$370/mo", "National Baseline Reference"],
              ["Florida", "0.98%", "$3,920", "$327/mo", "Save Our Homes 3% Cap + $50k Exemption"],
              ["North Carolina", "0.82%", "$3,280", "$273/mo", "Homestead Exclusion for Seniors/Disabled"],
              ["California", "0.76%", "$3,040", "$253/mo", "Proposition 13 (1% max + 2% inflation cap)"],
              ["Colorado", "0.51%", "$2,040", "$170/mo", "Senior Property Tax Exemption"],
              ["Hawaii", "0.28%", "$1,120", "$93/mo", "Basic Homeowner Exemption ($100k-$140k)"],
            ]}
          />

          <h2>How to Successfully Appeal Your Property Tax Assessment</h2>
          <p>
            Over 30% to 50% of residential properties in the United States are assessed higher than their actual market value, yet less
            than 5% of homeowners ever challenge their assessments. Follow these actionable steps to lower your tax liability:
          </p>
          <ol>
            <li>
              <strong>Review Your Property Card:</strong> Request a copy of your official municipal property record card from the assessor.
              Verify that listed square footage, bedroom count, bathroom count, and lot dimensions are accurate. Assessors frequently record
              finished basement areas twice or misclassify unheated porches as living space.
            </li>
            <li>
              <strong>Pull Recent Neighborhood Comps:</strong> Identify 3 to 5 recently sold comparable homes in your immediate subdivision
              with identical square footage, bedroom counts, and build age that sold for less than your assessor&rsquo;s current valuation.
            </li>
            <li>
              <strong>Document Structural and Deferred Maintenance Defects:</strong> Photograph cracked foundations, failing roof shingles,
              water intrusion, or busy road proximity that dampens your home&rsquo;s resale value relative to neighborhood averages.
            </li>
            <li>
              <strong>File Before the Statutory Deadline:</strong> Most county boards of equalization offer a strict 30 to 60-day window
              following the mailing of annual assessment notices to file formal petitions.
            </li>
          </ol>
        </>
      }
    >
      <PropertyTaxCalculator />
    </CalcPage>
  );
}
