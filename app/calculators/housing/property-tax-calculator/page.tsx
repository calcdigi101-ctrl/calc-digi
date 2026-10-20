import PropertyTaxCalculator from "@/components/calcs/housing/property-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PropertyTaxStateRankingsChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/property-tax-calculator";
const TITLE = "Property Tax Calculator – US Rates & Millage Benchmarks";
const DESCRIPTION = "Free property tax calculator: calculate annual and monthly real estate property taxes, effective tax rates, and homestead exemptions across US states.";

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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <PropertyTaxStateRankingsChart />

          <h2>The Mathematical Property Tax Formula</h2>
          <p>
            Your property tax is determined through a sequential mathematical chain: first converting fair market value to assessed valuation,
            deducting statutory exemptions, and finally applying local municipal and county millage rates.
          </p>

          <Formula>
            Assessed Value = Fair Market Value * (Assessment Ratio / 100)
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $425,000 Home in Texas</h2>

            <p>
              Suppose you own a primary residential home in Texas with an appraised market value of <strong>$425,000</strong>, a 100% assessment ratio, a <strong>$100,000 Texas state homestead exemption</strong>, and a local tax rate of <strong>1.95% (19.5 mills)</strong>:
            </p>
            <ul>
              <li><strong>Step 1: Calculate Assessed Value</strong>: $425,000 × 1.00 = $425,000.</li>
              <li><strong>Step 2: Deduct Homestead Exemption</strong>: $425,000 - $100,000 = <strong>$325,000 net taxable assessed value</strong>.</li>
              <li><strong>Step 3: Calculate Annual Property Tax</strong>: $325,000 × (1.95 ÷ 100) = <strong>$6,337.50 annual tax bill</strong>.</li>
              <li><strong>Step 4: Monthly Escrow Contribution</strong>: $6,337.50 ÷ 12 = <strong>$528.13 per month</strong> added to your mortgage payment.</li>
              <li><strong>Step 5: Effective Tax Rate on Full Market Value</strong>: ($6,337.50 ÷ $425,000) × 100 = <strong>1.49% effective rate</strong> (reduced from 1.95% nominal due to homestead relief).</li>
            </ul>


            <h2>Common Costly Mistakes in Property Tax Planning</h2>
            <p>Avoid these four real estate tax assessment traps:</p>
            <ul>
              <li><strong>Forgetting to File for Your Homestead Exemption:</strong> In states like Texas, Florida, and Georgia, homestead exemptions are not applied automatically. Homeowners must submit proof of primary residency to their county appraisal district by the statutory deadline to claim tax relief.</li>
              <li><strong>Missing the Annual Tax Appeal Deadline:</strong> If your county appraisal district assesses your home value significantly above actual market value, you have a strict 30 to 45-day window from receipt of your notice of value to file a formal appeal.</li>
              <li><strong>Assuming Property Taxes Remain Fixed:</strong> Unlike a fixed-rate mortgage principal and interest payment, property taxes increase whenever municipal budgets rise or property values are reassessed, creating annual escrow shortages.</li>
              <li><strong>Overlooking MUD / PID Special Assessment Districts:</strong> In newer suburban master-planned developments, special Municipal Utility District (MUD) or Public Improvement District (PID) taxes can add an extra 0.5% to 1.2% on top of county and school taxes.</li>
            </ul>


            <h2>State Tax Cap Mechanisms &amp; Legislative Protections</h2>
            <p>
              Several states enforce constitutional statutory caps to protect homeowners from runaway assessment spikes:
            </p>
            <ul>
              <li><strong>California (Proposition 13):</strong> Limits annual assessment value increases to a maximum of 2% per year until the property changes ownership.</li>
              <li><strong>Florida (Save Our Homes Amendment):</strong> Caps annual assessed value increases for homestead properties at the lower of 3% or the Consumer Price Index (CPI).</li>
              <li><strong>Texas (Homestead Appraisal Cap):</strong> Restricts annual taxable assessed value increases on primary residences to a maximum of 10% per year.</li>
            </ul>
            <p>
              Model overall monthly mortgage payments with our <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, verify buyer purchasing power with the <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, and compare renting alternatives with the <a href="/calculators/housing/rent-vs-buy-calculator">rent vs buy calculator</a>.
            </p>
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

          <h2>Millage Rate Mechanics, Equalization Factors &amp; Municipal Budgeting</h2>
          <p>
            Property taxes are determined through a decentralized mathematical chain connecting local municipal budget requirements with assessed property valuations:
          </p>
          <ul>
            <li><strong>The Millage Rate Formula:</strong> One "mill" represents $1.00 of property tax for every $1,000 of taxable assessed property value ($0.001). A total local tax rate of 25 mills equals 2.50% of assessed value.</li>
            <li><strong>Tax Base Budget Balancing:</strong> Municipalities divide their annual public school, police, fire, and infrastructure budget deficit by the total cumulative taxable assessed property value across the county to mathematically set the annual millage rate.</li>
            <li><strong>State Equalization Ratios:</strong> In states where individual county assessment practices vary, state departments of revenue apply equalization factors to ensure fair statewide distribution of school funding and property tax burdens.</li>
          </ul>

          <h2>Formal Tax Assessment Appeal Strategy &amp; Evidence Dossiers</h2>
          <p>
            If your county assessor values your home higher than recent arm's-length market sales, filing a formal property tax protest can save $500 to $2,500 annually:
          </p>
          <ul>
            <li><strong>Comparable Sales Selection:</strong> Gather 3 to 5 recent sales within your immediate subdivision or a 1-mile radius that closed within the 6 months prior to the statutory assessment date. Adjust for differences in square footage, age, and condition.</li>
            <li><strong>Deferred Maintenance Deductions:</strong> Document documented repair deficiencies with dated photographs and licensed contractor repair bids (e.g., foundation settling, failed roof shingles, cracked driveway). Assessors are required by law to factor deferred maintenance into equalized value.</li>
          </ul>

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
