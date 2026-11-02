import Calculator from "@/components/calcs/finance/sales-tax-calculator";
import { STATE_RATES } from "@/lib/salesTax";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SalesTaxRateJurisdictionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/sales-tax-calculator";
const TITLE = "Sales Tax Calculator – All 50 States, Combined Local Rates & Reverse Calculator | CalcDigi";
const DESCRIPTION =
  "Free sales tax calculator: calculate sales tax forward from pre-tax price or reverse-calculate pre-tax cost from receipt totals across all 50 US states, counties, and municipal districts. Explains Wayfair nexus and sourcing rules.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Sales Tax Calculator"
      intro="Calculate exact retail sales taxes, total checkout costs, or reverse-calculate pre-tax base prices from register totals across all 50 US states and municipal tax districts."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Total = Price * (1 + (StateRate + LocalRate))"
      article={
        <>
          <h2>Direct Answer: How Does US Retail Sales Tax &amp; Reverse Tax Mathematics Work?</h2>
          <p>
            Unlike national value-added taxes (VAT), the United States has no federal sales tax. Instead, <strong>retail sales taxes are levied at the sub-national level</strong> by 45 states, the District of Columbia, and thousands of local jurisdictions (counties, cities, transit authorities, and special school districts). Combined sales tax is a single-stage, point-of-sale consumption tax paid exclusively by the final retail consumer. When backing sales tax out of a gross receipt, you must divide by <em>(1 + tax rate)</em> rather than subtracting the tax percentage from the total.
          </p>

          <Formula>Sales Tax Amount = Pre-Tax Price × Combined Tax Rate</Formula>
          <Formula>Total Checkout Cost = Pre-Tax Price × (1 + Combined Tax Rate)</Formula>
          <Formula>Reverse Pre-Tax Base Price = Gross Receipt Total ÷ (1 + Combined Tax Rate)</Formula>

          <SalesTaxRateJurisdictionChart />

          <h2>The 'NOMAD' States: Jurisdictions With 0% Statewide Sales Tax</h2>
          <p>
            Five states do not levy a general statewide sales tax, frequently referred to in corporate finance by the acronym <strong>NOMAD</strong>:
          </p>
          <ul>
            <li><strong>New Hampshire (NH):</strong> 0% general sales tax (meals and rooms tax levied separately at 8.5%).</li>
            <li><strong>Oregon (OR):</strong> 0% sales tax (levies a corporate activity tax on gross commercial receipts).</li>
            <li><strong>Montana (MT):</strong> 0% statewide sales tax (certain resort towns levy local resort consumption taxes up to 3%).</li>
            <li><strong>Alaska (AK):</strong> 0% statewide rate (local municipalities are permitted to levy local sales taxes up to 7.85%).</li>
            <li><strong>Delaware (DE):</strong> 0% retail sales tax (imposes a gross receipts tax on business sellers).</li>
          </ul>

          <h2>Origin-Based vs. Destination-Based Sourcing &amp; Wayfair Nexus</h2>
          <ul>
            <li>
              <strong>Destination-Based Sourcing (Majority Rule):</strong> Sales tax is calculated based on the delivery location where the buyer takes possession of the product. If a merchant in rural Texas ships an item to Houston, Houston&rsquo;s combined rate applies.
            </li>
            <li>
              <strong>Origin-Based Sourcing (Minority Rule):</strong> Sales tax is collected based on the physical location of the seller or warehouse (governing intrastate sales in states like Texas, Ohio, and Pennsylvania).
            </li>
            <li>
              <strong>South Dakota v. Wayfair (2018) Supreme Court Ruling:</strong> States can mandate remote out-of-state e-commerce sellers and online platforms (Amazon, eBay, Etsy, Shopify) to collect local sales tax if they cross an <em>Economic Nexus threshold</em> (typically $100,000 in gross sales or 200 individual transactions into the state).
            </li>
          </ul>

          <h2>Statewide Base Sales Tax Rates ({STATE_RATES.length} Jurisdictions)</h2>
          <DataTable head={["State", "State Base Rate"]} rows={STATE_RATES.map(([, name, rate]) => [name, `${rate}%`])} />

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Consumer Taxation &amp; Pricing Solvers</h3>
            <p>
              Factoring retail sales taxes into purchase decisions ensures accurate household budget management. Calculate international value-added taxes with our <a href="/calculators/finance/vat-calculator">VAT Calculator</a>, account for vehicle sales tax on car financing using the <a href="/calculators/finance/auto-loan-calculator">Auto Loan Calculator</a>, evaluate federal income tax liabilities via the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, and manage overall monthly spending using our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why can't I just subtract the tax percentage to reverse sales tax?",
          a: "Because sales tax is calculated as a percentage of the original pre-tax price, not the total checkout price. For example, 10% tax on a $100 item equals $110 total. If you incorrectly subtract 10% from $110 ($11), you get $99 instead of the correct $100. Always divide by (1 + rate): $110 / 1.10 = $100.00.",
        },
        {
          q: "Are grocery foods and prescription medications subject to sales tax?",
          a: "In most states, unprepared grocery food items and prescription medications are completely exempt from sales tax or taxed at a drastically reduced preferential rate (e.g., 1%–2%), while prepared restaurant food and hot takeout are taxed at the full standard rate.",
        },
        {
          q: "What is the difference between Sales Tax and Use Tax?",
          a: "Sales tax is collected by the merchant at the time of purchase. If you buy goods out-of-state or online without paying sales tax and bring them into your home state for use, you are legally required to self-assess and remit 'Use Tax' on your state income tax return at your local sales tax rate.",
        },
        {
          q: "Which US state has the highest combined sales tax rate?",
          a: "While California has the highest statewide base rate at 7.25%, when combined with local municipal, county, and transit district taxes, cities in Louisiana, Alabama, Tennessee, and Washington reach the highest combined rates in the nation, frequently exceeding 10.0% to 10.5%.",
        },
      ]}
      related={[
        { href: "/calculators/finance/vat-calculator", icon: "🌍", name: "VAT Calculator" },
        { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount" },
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/business/sales-tax-calculator", icon: "🏢", name: "Business Sales Tax" },
        { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
