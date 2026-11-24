import type { Metadata } from "next";
import SalesTaxCalculatorComponent from "@/components/calcs/business/sales-tax-calculator";
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
    a: "Sales tax is collected directly by sellers at the point of purchase within their home jurisdiction. Use tax applies when taxable items are purchased from out-of-state vendors without paying local sales tax (such as online purchases where no tax was charged). Buyers are legally required to report and pay use tax directly to their state tax agency.",
  },
  {
    q: "Why does my receipt show a higher tax rate than the state rate?",
    a: "Most US states permit cities, counties, and special transit or fire districts to levy additional municipal surcharges on top of the base state tax rate. The rate printed on your receipt represents the combined total of all applicable state and local taxing authorities.",
  },
  {
    q: "How do I reverse calculate pre-tax cost from a credit card receipt?",
    a: "Divide the final charge by 1 plus the tax rate expressed as a decimal. For example, if you paid $108.00 at an 8% tax rate, divide $108.00 by 1.08 to find the original pre-tax cost of $100.00.",
  },
  {
    q: "Are groceries and clothing subject to sales tax?",
    a: "State rules vary widely. Many US states exempt essential groceries, prescription drugs, and basic clothing items from statewide sales tax. Prepared restaurant meals, candy, soda, and luxury apparel are typically taxed at standard rates.",
  },
  {
    q: "What states have no sales tax in the US?",
    a: "There are five states with no statewide general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska allows local municipalities to impose municipal sales taxes, while Delaware, Montana, New Hampshire, and Oregon are completely tax-free at all levels.",
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
              "name": "Sales Tax Calculator (Add or Reverse Tax)",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "url": "https://www.calcdigi.com/calculators/business/sales-tax-calculator",
              "description": DESCRIPTION,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
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
        faqTitle="Frequently Asked Questions About Sales Tax"
        faq={FAQ_ITEMS}
        related={RELATED_CALCULATORS}
        article={
          <>
            <h2>How to Calculate Sales Tax on Purchases in 3 Steps</h2>
            <p>
              Calculating sales tax on retail purchases, online orders, or business invoices requires three simple numbers: the pre-tax price, the tax rate percentage, and basic multiplication.
            </p>
            <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-700 dark:text-slate-300">
              <li>Convert your sales tax percentage into a decimal by dividing by 100 (for example, 7.25% becomes 0.0725).</li>
              <li>Multiply the item price by the decimal tax rate to find the exact tax amount.</li>
              <li>Add the tax amount to the original price to get the final total checkout cost.</li>
            </ol>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Example: If an item costs $120.00 in a city with an 8.25% sales tax rate:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Decimal rate: 8.25 / 100 = 0.0825</li>
              <li>Sales tax: $120.00 x 0.0825 = $9.90</li>
              <li>Total price: $120.00 + $9.90 = $129.90</li>
            </ul>

            <h2>Sales Tax Formulas: Adding Tax vs Reverse Tax (Pre-Tax Cost)</h2>
            <p>
              Depending on whether you are shopping or balancing business books, you will use one of two core formulas:
            </p>

            <h3>Formula 1: Adding Sales Tax (Forward Calculation)</h3>
            <p>Use this when you know the item price and want to find the final total:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Sales Tax Amount = Item Price x (Tax Rate / 100)</li>
              <li>Total Price = Item Price + Sales Tax Amount</li>
            </ul>

            <h3>Formula 2: Reverse Sales Tax (Backing Out Tax from a Receipt)</h3>
            <p>Use this when you have a gross receipt total and need to know the original price before tax was added:</p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Pre-Tax Price = Total Price / (1 + (Tax Rate / 100))</li>
              <li>Sales Tax Paid = Total Price - Pre-Tax Price</li>
            </ul>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Reverse Example: If your total restaurant receipt is $162.38 with a 7% sales tax rate:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-slate-300">
              <li>Pre-tax cost: $162.38 / 1.07 = $151.76</li>
              <li>Tax amount: $162.38 - $151.76 = $10.62</li>
            </ul>

            <h2>US State Sales Tax Rates: Quick Reference Table</h2>
            <p>
              Sales tax in the United States is determined at state, county, and municipal levels. Five states (often called NOMAD states) charge zero statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon.
            </p>
            <p>
              Below are current statewide base rates and typical combined local averages for major US shopping states:
            </p>

            <div className="my-6">
              <DataTable
                head={["State", "Statewide Base Tax Rate", "Average Local Tax Surcharge", "Typical Combined Rate Range"]}
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
                  ["Alaska", "0.00% (No state tax)", "1.82% (Local only)", "0.00% to 7.50%"],
                  ["Delaware", "0.00%", "0.00%", "0.00% (Tax-Free)"],
                  ["Montana", "0.00%", "0.00%", "0.00% (Tax-Free)"],
                  ["New Hampshire", "0.00%", "0.00%", "0.00% (Tax-Free)"],
                  ["Oregon", "0.00%", "0.00%", "0.00% (Tax-Free)"],
                ]}
              />
            </div>

            <h2>Everyday Sales Tax Scenarios and Worked Examples</h2>

            <h3>Scenario 1: Retail Purchase with Mixed Discounts</h3>
            <p>
              A buyer purchases a jacket priced at $80.00 with a 20% store discount coupon in an area with 6.5% sales tax:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3 text-slate-700 dark:text-slate-300">
              <li>Discounted price: $80.00 - ($80.00 x 0.20) = $64.00</li>
              <li>Sales tax on discounted price: $64.00 x 0.065 = $4.16</li>
              <li>Final total payable: $64.00 + $4.16 = $68.16</li>
            </ul>

            <h3>Scenario 2: Contractor Invoice Breakdown</h3>
            <p>
              A freelance web designer bills $2,500 for hardware installation where taxable equipment represents $1,000 and labor is non-taxable at a 6% local rate:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3 text-slate-700 dark:text-slate-300">
              <li>Equipment tax: $1,000 x 0.06 = $60.00</li>
              <li>Non-taxable service labor: $1,500.00</li>
              <li>Total invoice amount: $2,560.00</li>
            </ul>
          </>
        }
      >
        <SalesTaxCalculatorComponent />
      </CalcPage>
    </>
  );
}
