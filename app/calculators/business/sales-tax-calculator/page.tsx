import type { Metadata } from "next";
import SalesTaxCalculatorComponent from "@/components/calcs/business/sales-tax-calculator";
import { LiveTaxComparisonGraph } from "@/components/calcs/business/LiveTaxComparisonGraph";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/business/sales-tax-calculator";
const TITLE = "Sales Tax Calculator: Add or Reverse Tax (US) | CalcDigi";
const DESCRIPTION =
  "Free sales tax calculator. Calculate total sales tax, final checkout price, or reverse pre-tax cost from receipts using current US state and local tax rates.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.calcdigi.com/calculators/business/sales-tax-calculator",
  },
  openGraph: {
    title: TITLE,
    description: "Calculate sales tax, total price, or pre-tax amount from receipt totals instantly with US state and local rates.",
    url: "https://www.calcdigi.com/calculators/business/sales-tax-calculator",
    type: "website",
  },
};

const RELATED_CALCULATORS = [
  { href: "https://www.calcdigi.com/calculators/business/invoice-calculator", icon: "🧾", name: "Invoice Calculator" },
  { href: "https://www.calcdigi.com/calculators/business/discount-calculator", icon: "🏷️", name: "Discount Calculator" },
  { href: "https://www.calcdigi.com/calculators/business/profit-margin-calculator", icon: "💹", name: "Profit Margin Calculator" },
  { href: "https://www.calcdigi.com/calculators/business/markup-calculator", icon: "📊", name: "Markup Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between sales tax and use tax?",
    a: "Sales tax is collected directly by licensed retail sellers at the point of sale within their home jurisdiction. Consumer use tax applies when taxable items are purchased from out-of-state or untaxed vendors without local sales tax being charged. In that situation, the purchaser owes use tax directly to their state revenue agency.",
  },
  {
    q: "How do I reverse calculate the pre-tax price from a total receipt?",
    a: "To extract the original price from a receipt total, divide the gross total charge by 1 plus the tax rate as a decimal. For instance, if you paid $107.00 in an area with a 7% sales tax rate, divide $107.00 by 1.07 to reveal the pre-tax item cost of $100.00, with $7.00 representing the exact sales tax paid.",
  },
  {
    q: "Why does my receipt display a higher percentage than the published state tax rate?",
    a: "Most US states permit counties, cities, school districts, and municipal transportation authorities to levy local surcharges on top of the statewide baseline tax rate. The percentage printed on your customer receipt represents the combined aggregate of all applicable state and local taxing authorities.",
  },
  {
    q: "What US states have zero statewide sales tax?",
    a: "Five US states enforce zero statewide general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska allows municipal boroughs to assess local taxes, while Delaware, Montana, New Hampshire, and Oregon maintain zero general sales tax across both state and local levels.",
  },
  {
    q: "Are food and grocery purchases subject to sales tax?",
    a: "Most US states exempt essential, unprepared groceries from sales tax to reduce costs on household living staples. However, prepared hot meals, restaurant dining, candy, and carbonated beverages are classified as taxable luxury consumption across almost all jurisdictions.",
  },
  {
    q: "How do store coupons affect sales tax calculations?",
    a: "Retailer store coupons and promotional markdowns lower the taxable base price, meaning tax is assessed only on the net amount paid by the customer. In contrast, manufacturer coupons do not lower the tax base in most states because the manufacturer reimburses the retailer for the face value of the coupon.",
  },
  {
    q: "Is sales tax charged on shipping and handling fees?",
    a: "Shipping taxability depends on individual state statutes and whether delivery fees are separated on the customer invoice. In states like California, delivery by common carrier is generally non-taxable if stated separately, whereas states like New York consider shipping and handling taxable whenever the underlying product being shipped is taxable.",
  },
  {
    q: "What is economic nexus and how does it affect small online businesses?",
    a: "Following the 2018 Wayfair Supreme Court decision, out-of-state merchants must collect and remit sales tax once their sales into a state exceed statutory economic thresholds, typically $100,000 in gross sales or 200 individual shipments annually.",
  },
];

export default function SalesTaxCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Sales Tax Calculator",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "url": "https://www.calcdigi.com/calculators/business/sales-tax-calculator",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "description": "Calculate forward sales tax totals, state surcharge rates, and reverse pre-tax costs instantly.",
              "dateModified": "2026-11-25",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a,
                },
              })),
            },
          ]),
        }}
      />
      <CalcPage
        path={PATH}
        category={{ href: "/pages/business", label: "Business and Entrepreneurship" }}
        title="Online Sales Tax Calculator (Add or Reverse Tax)"
        breadcrumbLabel="Sales Tax Calculator"
        intro={DESCRIPTION}
        description={DESCRIPTION}
        appCategory="BusinessApplication"
        dateModifiedOverride="2026-11-25"
        exactFaq={true}
        faqTitle="Frequently Asked Questions About Sales Tax Calculations"
        faq={FAQ_ITEMS}
        related={RELATED_CALCULATORS}
        article={
          <>
            <h2>Understanding How Sales Tax Works: Retail, Online, and Business Transactions</h2>
            <p>
              Sales tax is a consumption tax imposed by state and municipal governments on the sale of retail goods and select commercial services. When a consumer completes a purchase, the merchant acts as an authorized collection agent for the state department of revenue, assessing the statutory percentage at checkout and remitting those funds periodically. Because the United States does not enforce a unified national value added tax (VAT), sales tax regulations remain decentralized across fifty distinct state codes, thousands of county governments, and tens of thousands of individual municipal taxing districts.
            </p>
            <p>
              Mastering the mechanics of both forward sales tax calculations and reverse pre-tax extraction is essential for retail shoppers, freelance contractors, small business bookkeepers, and corporate accounting departments. Applying an outdated rate or mistyping a local district percentage can trigger compliance audits, statutory penalties, or inaccurate invoice totals.
            </p>

            <LiveTaxComparisonGraph />

            <h2>How to Calculate Sales Tax on Retail Purchases in 3 Steps</h2>
            <p>
              Calculating sales tax on forward purchases requires three core values: the pre-tax sticker price of the merchandise, the combined statutory tax rate, and basic decimal multiplication.
            </p>
            <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Step 1:</strong> Convert the sales tax percentage into a standard decimal by dividing the percentage by 100. For example, a combined tax rate of 8.25% converts to 0.0825 (8.25 / 100 = 0.0825).
              </li>
              <li>
                <strong>Step 2:</strong> Multiply the pre-tax price of the product by the decimal tax rate to calculate the exact dollar amount of sales tax owed on that specific item.
              </li>
              <li>
                <strong>Step 3:</strong> Add the calculated sales tax amount to the original pre-tax price to determine the final total checkout cost.
              </li>
            </ol>

            <h3>Detailed Forward Calculation Example:</h3>
            <p>
              Consider purchasing an office desk priced at $350.00 in a retail district with an 8.5% combined sales tax rate:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3 text-slate-700 dark:text-slate-300">
              <li>Decimal conversion: 8.5 / 100 = 0.085</li>
              <li>Sales tax dollar amount: $350.00 x 0.085 = $29.75</li>
              <li>Total checkout price: $350.00 + $29.75 = $379.75</li>
            </ul>

            <h2>The Core Mathematical Formulas: Forward Calculation vs Reverse Tax Extraction</h2>
            <p>
              Depending on whether you are budgeting for an upcoming retail expense or reviewing a past credit card receipt for corporate expense reporting, you will employ one of two fundamental formulas:
            </p>

            <h3>Formula 1: Forward Calculation (Adding Sales Tax to an Item)</h3>
            <p>When you know the base item cost and need to find the final receipt total:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Sales Tax Amount = Item Price x (Tax Rate / 100)</li>
              <li>Total Checkout Price = Item Price + Sales Tax Amount</li>
              <li>Combined Shortcut: Total Checkout Price = Item Price x (1 + (Tax Rate / 100))</li>
            </ul>

            <h3>Formula 2: Reverse Sales Tax Calculation (Backing Out Pre-Tax Cost from Receipts)</h3>
            <p>When you have an all-inclusive receipt or a gross credit card charge and need to separate the original merchandise cost from the sales tax paid:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Pre-Tax Price = Total Receipt Price / (1 + (Tax Rate / 100))</li>
              <li>Sales Tax Paid = Total Receipt Price - Pre-Tax Price</li>
            </ul>

            <h3>Detailed Reverse Calculation Example:</h3>
            <p>
              Suppose a catering company issues a total invoice of $1,250.00 in a jurisdiction where the local tax rate is 7.50%. The accountant must separate food costs from state tax:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3 text-slate-700 dark:text-slate-300">
              <li>Pre-tax food cost: $1,250.00 / (1 + 0.075) = $1,250.00 / 1.075 = $1,162.79</li>
              <li>Sales tax collected: $1,250.00 - $1,162.79 = $87.21</li>
              <li>Verification: $1,162.79 x 0.075 = $87.21, and $1,162.79 + $87.21 = $1,250.00.</li>
            </ul>

            <h2>US State Sales Tax Rates: Statutory Reference for Major Commercial States</h2>
            <p>
              State tax codes across America reflect differing legislative priorities. Five states levy zero statewide general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon (frequently recognized as the NOMAD states). Among states that do collect sales tax, California features the highest statewide base rate at 7.25%, while states like Colorado feature base rates as low as 2.90%, but allow local municipalities significant leeway in stacking municipal surcharges.
            </p>
            <p>
              Statewide Base Tax Rates and Combined Local Surcharge Averages:
            </p>

            <div className="my-6">
              <DataTable
                head={["US State", "Base Statewide Rate", "Average Local Surcharge", "Typical Combined Tax Range"]}
                rows={[
                  ["California", "7.25%", "1.63%", "7.25% to 10.75%"],
                  ["Texas", "6.25%", "1.95%", "6.25% to 8.25%"],
                  ["Florida", "6.00%", "1.02%", "6.00% to 7.50%"],
                  ["New York", "4.00%", "4.52%", "4.00% to 8.875%"],
                  ["Illinois", "6.25%", "2.61%", "6.25% to 10.25%"],
                  ["Pennsylvania", "6.00%", "0.34%", "6.00% to 8.00%"],
                  ["Ohio", "5.75%", "1.49%", "5.75% to 8.00%"],
                  ["Georgia", "4.00%", "3.38%", "4.00% to 9.00%"],
                  ["North Carolina", "4.75%", "2.25%", "4.75% to 7.50%"],
                  ["Missouri", "4.225%", "4.14%", "4.225% to 10.10%"],
                  ["Washington", "6.50%", "2.88%", "6.50% to 10.60%"],
                  ["Arizona", "5.60%", "2.80%", "5.60% to 11.20%"],
                  ["Colorado", "2.90%", "4.91%", "2.90% to 11.20%"],
                  ["Tennessee", "7.00%", "2.55%", "7.00% to 9.75%"],
                  ["Indiana", "7.00%", "0.00%", "7.00% (Uniform Statewide)"],
                  ["Michigan", "6.00%", "0.00%", "6.00% (Uniform Statewide)"],
                  ["Virginia", "5.30%", "0.47%", "5.30% to 7.00%"],
                  ["Massachusetts", "6.25%", "0.00%", "6.25% (Uniform Statewide)"],
                  ["Alaska", "0.00%", "1.82%", "0.00% to 7.50% (Municipal Only)"],
                  ["Delaware", "0.00%", "0.00%", "0.00% (Completely Tax-Free)"],
                  ["Montana", "0.00%", "0.00%", "0.00% (Completely Tax-Free)"],
                  ["New Hampshire", "0.00%", "0.00%", "0.00% (Completely Tax-Free)"],
                  ["Oregon", "0.00%", "0.00%", "0.00% (Completely Tax-Free)"],
                ]}
              />
            </div>

            <h2>The Five Tax-Free States: Understanding the NOMAD Exception</h2>
            <p>
              Consumers frequently travel or establish operations in states with zero general sales tax to optimize procurement costs. However, each of the five NOMAD states enforces specific statutory rules:
            </p>
            <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Alaska:</strong> Alaska imposes no statewide sales tax, but local municipalities, boroughs, and cities possess statutory authority to levy municipal sales taxes up to 7.50%. Major population centers like Juneau charge local sales tax, whereas Anchorage enforces zero sales tax.
              </li>
              <li>
                <strong>Delaware:</strong> Delaware charges zero state or local sales tax on retail goods, making it a prominent hub for corporate logistics and consumer retail shopping.
              </li>
              <li>
                <strong>Montana:</strong> Montana maintains zero general sales tax, though designated resort communities like Whitefish or Big Sky may assess a local resort tax of 3% to 4% on luxury goods, dining, and lodging.
              </li>
              <li>
                <strong>New Hampshire:</strong> New Hampshire assesses no sales tax on consumer retail merchandise, though it levies targeted consumption taxes on prepared restaurant meals and short-term hotel accommodations.
              </li>
              <li>
                <strong>Oregon:</strong> Oregon assesses zero sales tax on consumer purchases, but levies an excise corporate activity tax on commercial receipts and a flat fee on new bicycle purchases.
              </li>
            </ol>

            <h2>Origin-Based vs Destination-Based Sales Tax for Businesses</h2>
            <p>
              For e-commerce merchants, retail shippers, and remote service providers, determining which tax rate applies to a transaction depends on whether a state follows origin-based or destination-based sourcing guidelines:
            </p>

            <h3>Destination-Based Sourcing (Majority of States):</h3>
            <p>
              In destination-based states, the applicable sales tax rate is determined by the delivery address where the customer receives the product. If a warehouse in rural Pennsylvania ships an item to Philadelphia, the higher Philadelphia municipal rate applies to the transaction.
            </p>

            <h3>Origin-Based Sourcing (Minority of States):</h3>
            <p>
              In origin-based states (including Texas, Ohio, Arizona, Illinois, Pennsylvania, and Virginia for intra-state sales), tax is collected based on where the seller or warehouse is located rather than where the buyer lives.
            </p>

            <h2>Economic Nexus Guidelines for Online Sellers</h2>
            <p>
              Following the landmark 2018 United States Supreme Court ruling in South Dakota v. Wayfair, states possess constitutional authority to require remote, out-of-state merchants to collect and remit sales tax once their sales surpass designated economic thresholds.
            </p>
            <p>
              The standard economic nexus threshold adopted by most states is $100,000 in gross annual sales or 200 separate commercial transactions shipped into that specific state during a calendar year. High-volume e-commerce platforms like Amazon, eBay, and Shopify automatically function as marketplace facilitators, collecting and remitting sales tax on behalf of independent third-party sellers across participating jurisdictions.
            </p>

            <h2>Taxable Merchandise vs Product Tax Exemptions</h2>
            <p>
              Not all retail goods carry equal tax liability. State legislatures routinely establish statutory exemptions to relieve tax burdens on essential living necessities:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Essential Groceries:</strong> Over thirty states exempt unprepared grocery food items from general sales tax, while states like Alabama and Mississippi tax groceries at full or slightly reduced rates.
              </li>
              <li>
                <strong>Prescription and Over-the-Counter Medications:</strong> Prescription drugs are fully exempt from sales tax in almost every US state. Over-the-counter medications like pain relievers and allergy tablets are taxable in most states, but exempt in Florida, Maryland, Minnesota, New Jersey, New York, Pennsylvania, Texas, and Vermont.
              </li>
              <li>
                <strong>Apparel and Footwear:</strong> Clothing is subject to standard sales tax in most states, but completely exempt in Pennsylvania, Minnesota, New Jersey, and Vermont, while New York exempts clothing and footwear items priced under $110.00.
              </li>
              <li>
                <strong>Digital Products and SaaS:</strong> Digital downloads, audio streaming subscriptions, and software-as-a-service platforms face varying tax rules. States like Washington and Pennsylvania tax digital downloads and cloud subscriptions, while California generally considers pure digital information and hosted software non-taxable if no tangible storage medium is transferred.
              </li>
            </ul>

            <h2>Real-World Calculation Scenarios: Discounts, Trade-Ins, and Service Labor</h2>

            <h3>Scenario 1: Retail Store Discounts and Manufacturer Coupons</h3>
            <p>When purchasing discounted items, the calculation method depends on the coupon type:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Store Discounts (Instant Markdowns): Sales tax is calculated on the net discounted price paid by the customer. If a $100.00 jacket is discounted 30% to $70.00, sales tax at 8% is applied to $70.00 ($5.60 tax, total $75.60).</li>
              <li>Manufacturer Coupons: Because the manufacturer reimburses the retailer for the coupon value, sales tax is assessed on the full retail price before the manufacturer discount in most states.</li>
            </ul>

            <h3>Scenario 2: Automobile Trade-Ins and Tax Credits</h3>
            <p>When purchasing a vehicle with an eligible trade-in vehicle, most states allow a sales tax trade-in credit:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Total new car price: $32,000.00</li>
              <li>Accepted trade-in allowance: $10,000.00</li>
              <li>Net taxable purchase price: $22,000.00</li>
              <li>Sales tax at 6%: $22,000.00 x 0.06 = $1,320.00 (saving $600.00 in tax).</li>
            </ul>

            <h3>Scenario 3: Mixed Contractor Invoices (Labor vs Tangible Materials)</h3>
            <p>Contractors and repair professionals regularly issue invoices containing both physical materials and hourly service labor:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Tangible plumbing parts: $450.00 (Taxable at 7% = $31.50)</li>
              <li>Master labor installation: $600.00 (Non-taxable in most jurisdictions)</li>
              <li>Total invoice amount: $1,081.50</li>
            </ul>

            <h2>Sales Tax vs Consumer Use Tax: Compliance and Differences</h2>
            <p>Sales tax and use tax are mutually exclusive, complementary taxes designed to ensure equitable revenue collection:</p>
            <ul className="list-disc pl-5 space-y-2 my-4 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Sales Tax:</strong> Paid by the purchaser to an authorized vendor during a local transaction within the state border.
              </li>
              <li>
                <strong>Use Tax:</strong> Owed by the purchaser when taxable goods are acquired from an out-of-state vendor without paying local sales tax (such as ordering merchandise from an untaxed overseas website or across state lines). The consumer is legally obligated to report and remit use tax on their annual state personal income tax filing.
              </li>
            </ul>
          </>
        }
      >
        <SalesTaxCalculatorComponent />
      </CalcPage>
    </>
  );
}
