import Calculator from "@/components/calcs/finance/sales-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SalesTaxRateJurisdictionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/sales-tax-calculator";
const TITLE = "Sales Tax Calculator – State, County, City Rates & Total Price | CalcDigi";
const DESCRIPTION =
  "Free sales tax calculator: calculate state, county, municipal, and special district sales taxes. Convert between pre-tax net prices and tax-inclusive gross totals under US economic nexus laws.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Sales Tax Calculator"
      intro="Calculate exact sales tax obligations, net pre-tax costs, and total out-the-door purchase prices across composite state, county, city, and special district sales tax jurisdictions."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Total Price} = \text{Net Price} \times (1 + t_{\text{combined}}), \quad \text{Tax Amount} = \text{Net Price} \times t_{\text{combined}}"
      article={
        <>
          <h2>Direct Answer: How US Multi-Tier Sales Taxes Are Calculated</h2>
          <p>
            Unlike national uniform tax systems like European VAT, the United States has <strong>no federal retail sales tax</strong>. Instead, retail sales tax is assessed at state and local municipal levels. A consumer&rsquo;s final &ldquo;out-the-door&rdquo; sales tax percentage represents a composite layer combining four distinct taxing authorities: <strong>state sales tax + county tax + city municipal tax + special transit/district assessments</strong>.
          </p>
          <p>
            Forty-five U.S. states plus the District of Columbia collect statewide retail sales taxes, while five states—commonly abbreviated as <strong>NOMAD</strong> (New Hampshire, Oregon, Montana, Alaska, and Delaware)—impose <strong>0.00% statewide sales tax</strong>.
          </p>

          <SalesTaxRateJurisdictionChart />

          <h2>Actuarial Mathematics of Forward &amp; Reverse Sales Tax Calculations</h2>
          <p>
            Calculating sales tax requires applying the composite jurisdictional tax rate <Formula>{"t_{\text{combined}}"}</Formula> to the pre-tax net transaction price:
          </p>

          <Formula>{"t_{\text{combined}} = t_{\text{state}} + t_{\text{county}} + t_{\text{city}} + t_{\text{district}}"}</Formula>
          <Formula>{"\text{Sales Tax Dollar Amount } (T) = \text{Net Pre-Tax Price} \times t_{\text{combined}}"}</Formula>
          <Formula>{"\text{Gross Out-the-Door Price } (G) = \text{Net Pre-Tax Price} \times (1 + t_{\text{combined}})"}</Formula>
          <p>
            Conversely, to calculate backwards (reverse sales tax) and extract the original net pre-tax price from a tax-inclusive receipt total <em>G</em>:
          </p>
          <Formula>{"\text{Net Pre-Tax Price} = \frac{G}{1 + t_{\text{combined}}}"}</Formula>
          <Formula>{"\text{Embedded Tax Amount} = G - \text{Net Pre-Tax Price} = G \times \left[ \frac{t_{\text{combined}}}{1 + t_{\text{combined}}} \right]"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a consumer purchasing an item with a ticket price of <strong>$1,250.00</strong> in a metropolitan area where <strong>state tax is 6.00%</strong>, <strong>county tax is 1.50%</strong>, <strong>city municipal tax is 1.25%</strong>, and a <strong>regional transportation authority assesses 0.50%</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute composite sales tax rate.</strong>
              <Formula>{"t_{\text{combined}} = 0.0600 + 0.0150 + 0.0125 + 0.0050 = 0.0925 \rightarrow 9.25\% \text{ composite rate}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate total sales tax dollar liability (T).</strong>
              <Formula>{"T = \$1{,}250.00 \times 0.0925 = \$115.625 \rightarrow \$115.63 \text{ (rounded to nearest cent)}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Solve for total gross out-the-door price (G).</strong>
              <Formula>{"G = \$1{,}250.00 + \$115.63 = \$1{,}365.63"}</Formula>
            </li>
            <li>
              <strong>Step 4: Reverse Calculation Check.</strong> Given a gross receipt of $1,365.63 at 9.25% tax:
              <Formula>{"\text{Net Price} = \frac{\$1{,}365.63}{1 + 0.0925} = \frac{\$1{,}365.63}{1.0925} = \$1{,}250.00"}</Formula>
              <Formula>{"\text{Embedded Tax} = \$1{,}365.63 - \$1{,}250.00 = \$115.63"}</Formula>
            </li>
          </ol>

          <h2>Composite Sales Tax Rates Across Major US States (Highest vs. Lowest)</h2>
          <p>
            The table below itemizes statewide base rates, maximum local option surcharges, and average combined rates across benchmark states:
          </p>

          <DataTable
            head={["Jurisdiction / State", "Base State Tax Rate", "Avg Local Surcharge", "Total Combined Rate", "Tax Profile / Classification"]}
            rows={[
              ["Tennessee", "7.00%", "2.55%", "9.55% Avg Combined", "High combined rate; no state personal income tax"],
              ["Louisiana", "4.45%", "5.10%", "9.55% Avg Combined", "Highest local option municipal tax burden in US"],
              ["Arkansas", "6.50%", "2.95%", "9.45% Avg Combined", "Heavy county and city municipal infrastructure taxes"],
              ["Washington State", "6.50%", "2.88%", "9.38% Avg Combined", "High retail sales tax; no personal income tax"],
              ["California", "7.25% (Base)", "1.60%", "8.85% Avg (up to 10.75%)", "Highest statewide base rate in the United States"],
              ["New York", "4.00%", "4.52%", "8.52% Avg (NYC 8.875%)", "Composite county and city MTA transit surcharges"],
              ["Oregon / Montana / NH / DE", "0.00%", "0.00%", "0.00% Combined", "NOMAD states (Zero state and local sales tax)"],
            ]}
          />

          <h2>Economic Nexus Laws: South Dakota v. Wayfair &amp; E-Commerce</h2>
          <p>
            Prior to 2018, out-of-state online retailers were not required to collect sales tax unless they possessed a physical presence (warehouse, office, or employees) in the buyer&rsquo;s state.
          </p>
          <p>
            In the landmark Supreme Court decision <em>South Dakota v. Wayfair, Inc. (2018)</em>, the Court established <strong>economic nexus</strong>: remote e-commerce merchants and digital service providers must collect and remit destination-based sales tax if they exceed state revenue thresholds (typically <strong>$100,000 in gross annual sales or 200 separate transactions</strong> in that state). Marketplace facilitator laws require platforms (Amazon, eBay, Etsy) to collect and remit tax on behalf of third-party sellers automatically.
          </p>

          <h2>Streamlined Sales Tax Agreement (SSUTA) &amp; Multi-State Compliance</h2>
          <p>
            To reduce the administrative complexity of managing over 11,000 distinct sales tax jurisdictions across the United States, 24 states established the <strong>Streamlined Sales and Use Tax Agreement (SSUTA)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Uniform Tax Base Definitions:</strong> Participating member states utilize standardized product definitions (food, digital goods, pharmaceuticals, clothing) to eliminate arbitrary interpretations.</li>
            <li><strong>Centralized Multi-State Registration:</strong> Remote merchants can register for sales tax permits across all 24 member states through a single online registration portal.</li>
            <li><strong>Certified Service Provider (CSP) Subsidies:</strong> Member states subsidize certified tax automation software (such as Avalara, TaxJar, or Vertex) for remote sellers meeting statutory economic nexus thresholds.</li>
          </ul>

          <h2>Sales Tax Exemptions: Necessities vs. Taxable Goods</h2>
          <p>
            State legislatures frequently exempt non-discretionary necessities from retail sales taxes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Unprepared Grocery Food:</strong> Over 30 states exempt basic supermarket groceries from sales tax, while others assess reduced preferential rates (e.g. 1% to 2%).</li>
            <li><strong>Prescription Medications:</strong> Virtually all 50 states exempt FDA-approved prescription pharmaceuticals from sales tax.</li>
            <li><strong>Apparel Exemptions:</strong> States like Pennsylvania, New Jersey, and Minnesota exempt standard clothing and footwear completely, while New York exempts clothing under $110 per item.</li>
          </ul>

          <h2>Sales Tax Audit Defenses &amp; Exemption Certificate Management</h2>
          <p>
            For commercial merchants and B2B wholesalers, state department of revenue audits present severe financial liability if sales tax exemptions are improperly documented:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Valid Resale Certificates:</strong> Sellers must collect and maintain digital copies of active state resale certificates for all tax-exempt B2B transactions prior to order fulfillment.</li>
            <li><strong>Audit Burden of Proof:</strong> State tax auditors legally presume all retail sales are taxable unless the seller can prove exemption with valid, unexpired documentation.</li>
          </ul>

          <h2>Essential Sales Tax Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Use Tax:</strong> A complementary tax assessed on out-of-state purchases brought into a state where sales tax was not collected at purchase.</li>
            <li><strong>Destination-Based Sourcing:</strong> Sales tax rate applied is determined by the geographic location where the buyer receives the product (standard in most US states).</li>
            <li><strong>Origin-Based Sourcing:</strong> Sales tax rate applied is determined by the physical location of the seller&rsquo;s business or warehouse (used in Texas, Ohio, Arizona).</li>
            <li><strong>Resale Certificate:</strong> A state tax authorization form allowing wholesalers and retailers to buy inventory without paying sales tax, as tax is collected at the final retail sale.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Transaction &amp; Tax Solvers</h3>
            <p>
              Examine international value-added consumption taxes with the <a href="/calculators/finance/vat-calculator">VAT Calculator</a>, model vehicle financing and trade-in sales tax credits via the <a href="/calculators/finance/auto-loan-calculator">Auto Loan Calculator</a>, evaluate transaction processing fees using the <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>, and calculate net income via our <a href="/calculators/finance/tax-calculator">Income Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What are the NOMAD states that have zero sales tax?",
          a: "The five NOMAD states are New Hampshire, Oregon, Montana, Alaska, and Delaware. None of these states levy a statewide sales tax, although Alaska permits individual local municipalities to assess local option sales taxes.",
        },
        {
          q: "What is the difference between sales tax and use tax?",
          a: "Sales tax is collected by the merchant at the point of sale. Use tax is assessed directly on the consumer for using, storing, or consuming taxable goods within their home state when sales tax was not collected at purchase (e.g. out-of-state online orders).",
        },
        {
          q: "How does the Supreme Court Wayfair ruling affect online shopping?",
          a: "The South Dakota v. Wayfair decision allows states to mandate that online sellers collect sales tax based on the delivery destination once they reach economic nexus thresholds (typically $100,000 in sales), ensuring online orders incur the same sales tax as local brick-and-mortar stores.",
        },
        {
          q: "Can sales taxes paid be deducted on federal income taxes?",
          a: "Yes. Taxpayers who itemize deductions on IRS Schedule A can choose to deduct either state income taxes OR state and local sales taxes, subject to the overall federal SALT deduction cap of $10,000 ($5,000 if married filing separately).",
        },
        {
          q: "Are digital downloads and SaaS software subject to sales tax?",
          a: "Tax treatment varies by state. Over 30 states now tax digital goods (e-books, streaming video, downloadable software, and Software-as-a-Service subscriptions), while others treat non-tangible digital assets as exempt services.",
        },
        {
          q: "How do trade-ins reduce vehicle sales tax liabilities?",
          a: "In over 40 states, the trade-in allowance for your existing vehicle is subtracted from the purchase price of the new car before sales tax is assessed, saving hundreds to thousands of dollars in out-of-pocket tax.",
        },
        {
          q: "What is an origin-based sales tax state vs a destination-based state?",
          a: "In destination-based states (the vast majority), sales tax is calculated based on the address where the product is delivered to the customer. In origin-based states (such as Texas and Ohio), sales tax is assessed at the location of the seller's office or warehouse.",
        },
        {
          q: "What is a sales tax holiday?",
          a: "A sales tax holiday is a temporary statutory window (typically 2 to 3 days in late summer) established by state governments during which sales tax is waived on qualifying categories, such as back-to-school clothing, computers, and hurricane preparedness supplies.",
        },
      ]}
      related={[
        { href: "/calculators/finance/vat-calculator", icon: "🌍", name: "VAT Calculator" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Income Tax" },
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/finance/paypal-fee-calculator", icon: "💳", name: "PayPal Fee" },
        { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
