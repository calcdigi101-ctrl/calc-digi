import Calculator from "@/components/calcs/finance/vat-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VatInputOutputTaxDecompositionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/vat-calculator";
const TITLE = "VAT Calculator";
const DESCRIPTION =
  "Free VAT calculator: calculate net prices, gross inclusive totals, input tax credits, and extract embedded VAT across UK, European Union, and international.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="VAT Calculator"
      intro="Calculate Value Added Tax (VAT) and Goods and Services Tax (GST). Add VAT to net prices, extract embedded tax from gross receipts, and model commercial input tax credit reclamation."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Gross} = \text{Net} \times (1 + \text{VAT Rate}), \quad \text{Embedded VAT} = \text{Gross} \times \left[ \frac{\text{VAT Rate}}{1 + \text{VAT Rate}} \right]"
      article={
        <>
          <h2>Direct Answer: What Is Value Added Tax (VAT) and How Does It Function?</h2>
          <p>
            A <strong>Value Added Tax (VAT)</strong>—also designated as <strong>Goods and Services Tax (GST)</strong> in Canada, Australia, and New Zealand—is an indirect consumption tax assessed on the value added at each sequential stage of the production, distribution, and commercial supply chain. Utilized by more than <strong>170 countries worldwide</strong>, VAT is ultimately borne exclusively by the final retail consumer, while registered businesses act as tax collectors on behalf of governmental revenue authorities.
          </p>
          <p>
            Unlike cumulative retail sales taxes that can cause &ldquo;tax cascading&rdquo; (charging tax on top of previously taxed components), registered commercial enterprises can claim <strong>Input Tax Credits (ITC)</strong>, reclaiming 100% of the VAT paid on raw materials and business overhead, remitting only the net difference between output tax collected on sales and input tax paid on purchases.
          </p>

          <VatInputOutputTaxDecompositionChart />

          <h2>Actuarial Mathematics of VAT Addition, Extraction &amp; Input Tax Credits</h2>
          <p>
            Calculating VAT involves two primary mathematical directions: <em>forward tax addition</em> (computing gross inclusive price from net pre-tax price) and <em>reverse tax extraction</em> (deconstructing a gross total receipt to isolate embedded VAT):
          </p>

          <Formula>{"\text{Forward VAT: } \quad \text{VAT Amount} = \text{Net Price} \times r_{\text{vat}}"}</Formula>
          <Formula>{"\text{Gross Inclusive Price} = \text{Net Price} \times (1 + r_{\text{vat}})"}</Formula>
          <p>
            Where <Formula>{"r_{\text{vat}}"}</Formula> is the statutory VAT rate in decimal format (e.g. 0.20 for a standard 20% UK rate).
          </p>
          <p>
            To extract embedded VAT backwards from a tax-inclusive gross receipt <em>G</em>:
          </p>
          <Formula>{"\text{Net Pre-Tax Base Price} = \frac{G}{1 + r_{\text{vat}}}"}</Formula>
          <Formula>{"\text{Embedded VAT Amount} = G - \text{Net Base} = G \times \left[ \frac{r_{\text{vat}}}{1 + r_{\text{vat}}} \right]"}</Formula>
          <p>
            For commercial VAT returns (e.g. HMRC or EU tax authorities), net VAT payable is:
          </p>
          <Formula>{"\text{Net VAT Remitted to Treasury} = \text{Output VAT (Collected on Sales)} - \text{Input VAT (Paid on Purchases)}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a commercial transaction in the United Kingdom or European Union with a standard <strong>20.0% statutory VAT rate</strong> (<Formula>{"r_{\text{vat}} = 0.20"}</Formula>):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Forward Calculation (Net to Gross):</strong> An enterprise sells enterprise consulting services with a net base fee of <strong>£2,400.00</strong>.
              <Formula>{"\text{VAT Amount} = £2{,}400.00 \times 0.20 = £480.00"}</Formula>
              <Formula>{"\text{Gross Invoice Billed} = £2{,}400.00 + £480.00 = £2{,}880.00"}</Formula>
            </li>
            <li>
              <strong>Reverse Extraction (Gross to Net):</strong> A business traveler receives a tax-inclusive hotel receipt totaling <strong>£720.00</strong> including 20% VAT.
              <Formula>{"\text{Net Base Cost} = \frac{£720.00}{1 + 0.20} = \frac{£720.00}{1.20} = £600.00"}</Formula>
              <Formula>{"\text{Embedded Recoverable VAT} = £720.00 - £600.00 = £120.00"}</Formula>
            </li>
            <li>
              <strong>Commercial VAT Return Remittance:</strong> If that business collected £480.00 in Output VAT on sales and incurred £120.00 in Input VAT on allowable expenses:
              <Formula>{"\text{Net Tax Remitted to Tax Authority} = £480.00 - £120.00 = £360.00"}</Formula>
            </li>
          </ol>

          <h2>Global VAT &amp; GST Standard Rates Benchmark Comparison</h2>
          <p>
            The table below itemizes standard rates, reduced rates, and VAT registration thresholds across leading global economies:
          </p>

          <DataTable
            head={["Economic Jurisdiction", "Standard VAT/GST Rate", "Reduced Rate Categories", "VAT Registration Threshold", "Reverse Charge Applicable?"]}
            rows={[
              ["United Kingdom (HMRC)", "20.00% Standard", "5.0% (Domestic Energy) / 0% (Food/Kids)", "£90,000 Gross Turnover", "Yes (B2B Cross-Border Services)"],
              ["European Union (Germany)", "19.00% Standard", "7.0% (Food, Cultural Books)", "€22,000 Kleinunternehmer", "Yes (EU Intra-Community Supply)"],
              ["European Union (France)", "20.00% Standard", "10.0% / 5.5% (Food, Transport)", "€36,800 Services / €91,900 Goods", "Yes (EU VAT Directive Compliant)"],
              ["European Union (Hungary)", "27.00% (Highest EU)", "18.0% / 5.0% (Dairy, Hotel)", "12,000,000 HUF Threshold", "Yes (Standard EU Protocol)"],
              ["Australia (ATO - GST)", "10.00% Standard", "0% GST-Free (Basic Groceries)", "AUD $75,000 Annual Turnover", "Yes (Cross-Border Digital Rules)"],
              ["United Arab Emirates (FTA)", "5.00% Standard", "0% (Exports, Healthcare, Education)", "AED 375,000 Mandatory Threshold", "Yes (GCC Framework Compliant)"],
            ]}
          />

          <h2>The Supply Chain Value-Added Mechanism: Preventing Tax Cascading</h2>
          <p>
            To understand how VAT eliminates tax cascading, trace a manufactured wood dining table across three stages of production at a 20% VAT rate:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Stage 1 (Timber Supplier):</strong> Sells raw timber to a furniture maker for £100 + £20 VAT (£120 total). Supplier remits <strong>£20 to Treasury</strong>.</li>
            <li><strong>Stage 2 (Manufacturer):</strong> Crafts the table and sells it to a retail showroom for £300 + £60 VAT (£360 total). Manufacturer collects £60 Output VAT, claims £20 Input VAT credit on timber, and remits <strong>£40 net to Treasury</strong>.</li>
            <li><strong>Stage 3 (Retailer):</strong> Sells the table to a consumer for £500 + £100 VAT (£600 total). Retailer collects £100 Output VAT, claims £60 Input VAT credit, and remits <strong>£40 net to Treasury</strong>.</li>
            <li><strong>Total Tax Collected:</strong> <Formula>{"£20 + £40 + £40 = £100.00"}</Formula>, which equals exactly 20% of the final £500 retail price paid by the consumer.</li>
          </ol>

          <h2>EU One Stop Shop (OSS) &amp; Digital Services Taxation</h2>
          <p>
            Under European Union digital single market reforms, cross-border e-commerce and electronic services follow centralized compliance:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The One Stop Shop (OSS) Portal:</strong> Businesses selling digital goods or distance merchandise to B2C consumers across multiple EU member states can register for VAT in a single home EU country rather than registering in each country individually.</li>
            <li><strong>Destination-Based Consumption:</strong> VAT is assessed at the standard rate of the customer&rsquo;s home member state, and the home tax authority distributes collected funds across European treasuries.</li>
            <li><strong>Import One Stop Shop (IOSS):</strong> Facilitates collection, declaration, and payment of VAT for non-EU distance sellers importing commercial consignments up to €150 into the European Union.</li>
          </ul>

          <h2>B2B Cross-Border Reverse Charge Mechanism</h2>
          <p>
            Under international and European Union VAT directives, cross-border business-to-business (B2B) trade in services and digital goods utilizes the <strong>Reverse Charge Mechanism</strong>.
          </p>
          <p>
            Rather than the foreign supplier charging foreign VAT, the overseas customer reports both the Output VAT on the purchase and the matching Input VAT deduction simultaneously on their domestic VAT return. This cash-neutral accounting mechanism eliminates the bureaucratic burden of cross-border VAT refunds between sovereign governments.
          </p>

          <h2>Essential VAT &amp; GST Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Output VAT:</strong> Value Added Tax charged and collected by a registered business on sales to customers.</li>
            <li><strong>Input VAT:</strong> Value Added Tax paid by a registered business on commercial purchases, raw materials, and overhead services.</li>
            <li><strong>Zero-Rated Supplies (0% VAT):</strong> Goods subject to 0% VAT where the business retains the legal right to reclaim input tax (e.g. food, books, exports).</li>
            <li><strong>Exempt Supplies:</strong> Goods completely outside the VAT scope (e.g. financial services, postal services); businesses cannot reclaim input tax on associated costs.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related International &amp; Tax Solvers</h3>
            <p>
              Compare domestic US point-of-sale retail taxes with our <a href="/calculators/business/sales-tax-calculator">Sales Tax Calculator</a>, model cross-border foreign exchange with the <a href="/calculators/finance/currency-converter">Currency Converter</a>, evaluate payment merchant processing via the <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>, and calculate net margins via the <a href="/calculators/business/profit-margin-calculator">Business Profit Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the mathematical difference between VAT and US Sales Tax?",
          a: "US Sales Tax is assessed only once at the final retail sale to the end consumer. VAT is collected incrementally at every step of the production and distribution chain, with registered businesses reclaiming input tax on purchases and remitting only tax on the value added.",
        },
        {
          q: "How do I calculate the net price before VAT from a receipt?",
          a: "To extract the pre-tax net price from a gross tax-inclusive receipt, divide the total receipt amount by 1 plus the VAT rate (expressed as a decimal). For a £120 receipt with 20% VAT, divide £120 by 1.20 to yield £100 net base price.",
        },
        {
          q: "What is the difference between zero-rated and exempt VAT?",
          a: "Zero-rated goods are taxable at 0%, meaning businesses charge zero tax on sales but CAN reclaim input VAT paid on expenses. Exempt goods are outside the VAT system entirely, meaning businesses charge no VAT and CANNOT reclaim any input VAT paid.",
        },
        {
          q: "What is the Reverse Charge mechanism in international VAT?",
          a: "The Reverse Charge shifts the responsibility for reporting VAT from the foreign seller to the domestic B2B buyer. The buyer accounts for both input and output VAT on their domestic return, eliminating cross-border tax invoicing between corporations.",
        },
        {
          q: "When must a business register for VAT in the UK and EU?",
          a: "In the UK, registration is mandatory once rolling 12-month taxable turnover exceeds £90,000 (2024 threshold). In the EU, thresholds vary by member state (e.g. €22,000 in Germany, €36,800 in France), with mandatory registration for any cross-border B2C distance sales.",
        },
        {
          q: "Can non-resident tourists claim VAT refunds on shopping?",
          a: "Yes. Many countries allow foreign international travelers to claim VAT refunds on physical merchandise purchased during visits, provided goods are exported in personal luggage within 3 months and stamped by customs upon departure.",
        },
        {
          q: "What is an Input Tax Credit (ITC)?",
          a: "An Input Tax Credit allows registered businesses to deduct the VAT paid on commercial purchases, raw materials, and business overhead from the Output VAT collected on customer sales, remitting only the net difference to the tax authority.",
        },
        {
          q: "Does the United States have a federal VAT?",
          a: "No. The United States is the only major industrialized OECD country without a national Value Added Tax or Goods and Services Tax, relying instead on state and municipal retail sales taxes.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/currency-converter", icon: "💱", name: "Currency Converter" },
        { href: "https://www.calcdigi.com/calculators/finance/paypal-fee-calculator", icon: "💳", name: "PayPal Fee Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/tax-calculator", icon: "📑", name: "Income Tax Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator (PITI & Amortization)" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
