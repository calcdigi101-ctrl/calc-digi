import type { Metadata } from "next";
import Link from "next/link";
import SalesTaxCalculatorComponent from "@/components/calcs/business/sales-tax-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SalesTaxJurisdictionDecompositionChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/sales-tax-calculator";
const TITLE = "Sales Tax Calculator | State, County & Local Tax Rate Solver";
const DESCRIPTION =
  "Calculate state and local sales tax liabilities, inclusive versus exclusive gross totals, economic nexus compliance thresholds, and municipal surcharges.";

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

const RELATED_CALCULATORS = [
  { href: "/calculators/business/invoice-calculator", icon: "🧾", name: "Invoice Calculator" },
  { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount Engine" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/wholesale-price-calculator", icon: "🏷️", name: "Wholesale Pricing" },
  { href: "/calculators/business/payroll-calculator", icon: "👥", name: "Payroll Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the mathematical difference between tax-exclusive and tax-inclusive pricing?",
    a: "In tax-exclusive transactions (standard in the United States), sales tax is added onto the stated retail price: Gross Total = Pre-Tax Price * (1 + Tax Rate). In tax-inclusive transactions (common in European VAT), the advertised price already includes tax: Pre-Tax Base = Stated Price / (1 + Tax Rate).",
  },
  {
    q: "How does the Supreme Court South Dakota v. Wayfair ruling govern online economic nexus?",
    a: "The 2018 Wayfair ruling established that states can mandate out-of-state remote sellers and e-commerce merchants to collect state and local sales taxes once they breach economic nexus thresholds (most commonly $100,000 in gross annual sales or 200 separate transactions into the state).",
  },
  {
    q: "What items are typically exempt from retail sales tax in most US states?",
    a: "While statutory exemptions vary by state, common exempt items include unprepared grocery foods, prescription medications, medical devices, wholesale inventory acquired with valid resale certificates, and professional consulting services.",
  },
  {
    q: "What is a resale certificate and how does it prevent tax cascading?",
    a: "A resale exemption certificate permits wholesale distributors and retailers to purchase inventory and manufacturing inputs tax-free. Under sales tax jurisprudence, sales tax is designed to apply only once at the final retail consumer sale, avoiding compounding multiple tax layers.",
  },
  {
    q: "What is consumer use tax versus retail sales tax?",
    a: "Sales tax is collected by the vendor at point of purchase. Consumer use tax is a legally equivalent tax owed directly by the buyer to their state department of revenue when taxable items are purchased out-of-state without paying sales tax and subsequently stored or used within the buyer's home state.",
  },
  {
    q: "How does destination-based sourcing differ from origin-based sourcing?",
    a: "Under destination-based sourcing (enforced by the vast majority of US states), the applicable sales tax rate is determined by the buyer's shipping delivery address. Under origin-based sourcing (e.g., Texas, California local, Ohio), tax is assessed based on the seller's physical warehouse or retail location.",
  },
];

export default function SalesTaxCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Commercial Sales & Use Tax Calculator"
      intro="Compute combined state, county, and municipal sales taxes, reconcile tax-inclusive versus tax-exclusive amounts, and verify destination nexus compliance."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Sales Tax is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              For standard tax-exclusive sales, multiply the net taxable purchase price by the combined tax rate: Sales Tax = Pre-Tax Amount &times; (State Rate + County Rate + City Rate). For tax-inclusive pricing, calculate Pre-Tax Base = Gross Amount / (1 + Combined Rate). Corporate controllers reconcile line-item sales taxes with the <Link href="/calculators/business/invoice-calculator">commercial invoice calculator</Link>, verify consumer discounts via the <Link href="/calculators/business/discount-calculator">discount calculator</Link>, and model online cart economics in the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: State Base vs. Local Municipal Surcharge Stacking</h2>
          <p>
            The chart below contrasts statutory state base rates against average local municipal and county surcharges across prominent United States commercial jurisdictions.
          </p>

          <SalesTaxJurisdictionDecompositionChart />

          <h2>First-Principles Sales Tax Formulations & Jurisdiction Stacking</h2>
          <p>
            Under statutory US revenue codes, total transaction tax is computed by combining all overlying jurisdictional taxing authorities (State, County, City, and Special Transit Districts):
          </p>
          <Formula>
            {"\\tau_{\\text{combined}} = \\tau_{\\text{state}} + \\tau_{\\text{county}} + \\tau_{\\text{city}} + \\tau_{\\text{district}}"}
          </Formula>
          <p>
            Under tax-exclusive billing (standard US retail and commercial commerce), sales tax is assessed on the net taxable amount after trade discounts:
          </p>
          <Formula>
            {"\\text{Sales Tax Amount} = P_{\\text{net}} \\times \\tau_{\\text{combined}}, \\quad \\text{Gross Total} = P_{\\text{net}} + \\text{Sales Tax Amount}"}
          </Formula>
          <p>
            Conversely, under tax-inclusive pricing conventions (such as international VAT/GST or cash ticketing), the net pre-tax commercial base is derived via division:
          </p>
          <Formula>
            {"P_{\\text{net}} = \\frac{\\text{Gross Total}}{1 + \\tau_{\\text{combined}}}, \\quad \\text{Sales Tax Embedded} = \\text{Gross Total} - P_{\\text{net}}"}
          </Formula>
          <p>
            Corporate treasuries integrate sales tax compliance with enterprise billing systems, cross-referencing wholesale distribution terms with the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>, monitoring product markups via the <Link href="/calculators/business/markup-calculator">markup calculator</Link>, and balancing corporate payroll withholdings using the <Link href="/calculators/business/payroll-calculator">payroll calculator</Link>.
          </p>

          <h2>State Sales Tax Rates, Local Averages & Economic Nexus Thresholds</h2>
          <p>
            The table below outlines statutory state tax rates, average local piggyback surcharges, combined state averages, and remote economic nexus registration rules across key commercial states.
          </p>

          <DataTable
            head={["State Jurisdiction", "State Base Rate (%)", "Average Local Rate (%)", "Combined Average (%)", "Economic Nexus Threshold"]}
            rows={[
              ["California", "7.25%", "1.57%", "8.82%", "$500,000 in gross annual sales"],
              ["Texas", "6.25%", "1.95%", "8.20%", "$500,000 in gross annual sales"],
              ["New York", "4.00%", "4.52%", "8.52%", "$500,000 sales + 100 transactions"],
              ["Washington", "6.50%", "2.79%", "9.29%", "$100,000 in gross annual sales"],
              ["Florida", "6.00%", "1.05%", "7.05%", "$100,000 in taxable remote sales"],
              ["Tennessee", "7.00%", "2.55%", "9.55%", "$100,000 in gross annual sales"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Omnichannel E-Commerce Order Fulfillment Nexus Stacking</h3>
          <p>
            A multi-brand digital apparel merchant based in Delaware ships a $450.00 designer outerwear order to a customer in Austin, Texas. Texas enforces destination-based sales tax consisting of a 6.25% state rate, a 1.0% City of Austin municipal tax, and a 1.0% Capital Metro transit district surcharge (8.25% combined rate). The customer applies a 10.0% promotional discount coupon at checkout:
          </p>
          <ol>
            <li>
              <strong>Determine net taxable merchandise price after promotional discount:</strong>
              <br />
              Discount Amount = $450.00 &times; 10% = $45.00.
              <br />
              Net Taxable Subtotal = $450.00 - $45.00 = $405.00.
            </li>
            <li>
              <strong>Calculate combined statutory tax liability:</strong>
              <br />
              Combined Nexus Rate = 6.25% (State) + 1.00% (City) + 1.00% (Transit) = 8.25%.
              <br />
              Total Sales Tax = $405.00 &times; 8.25% = $33.41.
            </li>
            <li>
              <strong>Reconcile jurisdictional tax disbursement:</strong>
              <br />
              State of Texas Share = $405.00 &times; 6.25% = $25.31.
              <br />
              City of Austin Share = $405.00 &times; 1.00% = $4.05.
              <br />
              Transit Authority Share = $405.00 &times; 1.00% = $4.05.
            </li>
            <li>
              <strong>Final Invoice Settlement:</strong> Total Customer Remittance = $405.00 + $33.41 = $438.41. Management tracks unit margins via the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Commercial B2B IT Equipment Resale Exemption</h3>
          <p>
            An enterprise IT hardware reseller acquires $85,000.00 of commercial rack-mount servers from a computer manufacturer for resale to corporate data centers. The transaction occurs in California, where standard retail tax is 8.5%. The reseller provides a valid California Resale Certificate (Form CDTFA-230):
          </p>
          <ol>
            <li>
              <strong>Examine resale certificate tax exemption:</strong>
              <br />
              Because goods are purchased for resale in the ordinary course of business, the wholesale purchase is 100% tax-exempt.
              <br />
              Sales Tax Assessed at Wholesale = $0.00. Reseller pays exactly $85,000.00.
            </li>
            <li>
              <strong>Downstream Retail Tax Collection:</strong>
              <br />
              The reseller marks up the equipment and delivers it to an end-user corporate client for $115,000.00.
              <br />
              Retail Sales Tax Collected from End-User = $115,000.00 &times; 8.5% = $9,775.00.
            </li>
            <li>
              <strong>Remittance to State Board of Equalization:</strong>
              <br />
              The reseller remits the entire $9,775.00 to the state treasury on quarterly tax return Form CDTFA-401.
            </li>
            <li>
              <strong>Financial Controls:</strong> The reseller audits direct acquisition outlays in the <Link href="/calculators/business/cogs-calculator">COGS solver</Link> and evaluates capital break-even in the <Link href="/calculators/business/break-even-calculator">break-even point calculator</Link>.
            </li>
          </ol>

          <h2>Marketplace Facilitator Laws & Digital Goods Taxability</h2>
          <p>
            In modern electronic commerce, Marketplace Facilitator legislation across virtually all 45 states with sales tax shifts the legal collection and remittance burden from individual third-party merchants to platform operators (such as Amazon, eBay, Etsy, and Walmart). Under these statutes, the platform automatically calculates destination sales tax, charges the end customer at checkout, and remits funds directly to state revenue agencies.
          </p>
          <p>
            However, digital goods taxation introduces substantial complexity. While physical books are consistently taxable, digital eBooks, SaaS software subscriptions, downloaded audio files, and streaming services face radically divergent state tax laws. For example, New York treats SaaS as taxable pre-written software, whereas California classifies standard cloud SaaS as tax-exempt digital services.
          </p>


          <p>
            In corporate sales tax compliance, multi-state enterprises must continuously track tax holiday exemptions and seasonal rate adjustments. Many states enact annual back-to-school or severe weather preparedness sales tax holidays that temporarily exempt qualifying apparel, computers, or emergency generators from sales tax. Point-of-sale ERP systems must automatically implement these temporary statutory overrides to prevent improperly charging customers or violating state emergency orders.
          </p>
          <p>
            Additionally, commercial organizations establish dedicated sales tax escrow reserve accounts. Segregating collected sales tax funds from general corporate checking accounts prevents businesses from inadvertently spending government trust funds on operational payroll during lean cash flow cycles.
          </p>

          <h2>Operational Pitfalls in Sales & Use Tax Compliance</h2>
          <ol>
            <li>
              <strong>Treating Sales Tax as Corporate Revenue:</strong> Collected sales taxes represent fiduciary trust funds owed to government treasuries. Treating tax collections as operating cash flow triggers severe civil penalties and criminal prosecution under state revenue fraud statutes.
            </li>
            <li>
              <strong>Failing to Monitor Trailing Economic Nexus Thresholds:</strong> Inadvertently breaching a state&apos;s $100,000 sales threshold without registering creates retroactive tax liabilities where the merchant must pay years of uncollected sales taxes out of corporate profits.
            </li>
            <li>
              <strong>Improper Handling of Shipping and Freight Taxability:</strong> Misclassifying shipping as tax-exempt when local state rules mandate taxing delivery whenever handling or packaging labor is bundled.
            </li>
            <li>
              <strong>Inadequate Resale Certificate Exemption Records:</strong> Failing to retain valid, unexpired resale certificates from wholesale buyers results in auditors retroactively assessing sales tax plus statutory interest on wholesale transactions during audits.
            </li>
          </ol>

          <h2>Streamlined Sales Tax (SST) & Automated Audit Controls</h2>
          <p>
            To alleviate multi-state compliance friction, 24 member states formed the Streamlined Sales and Use Tax Agreement (SSUSA). The SST program standardizes tax definitions, establishes single electronic registration portals, and certifies automated tax engine software (Certified Service Providers / CSPs) that automatically calculate, file, and remit taxes with state-funded subsidies for qualifying remote sellers.
          </p>
          <p>
            Corporate finance teams integrate automated tax engines with ERP billing software, ensuring that address geocoding validates exact 9-digit ZIP code street boundaries, eliminating tax misallocations across overlapping municipal fire and transit districts.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between sales tax and consumer use tax?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Sales tax is collected directly by vendors on in-state sales. Use tax is an identical excise levy paid directly by consumers or businesses when purchasing taxable merchandise from out-of-state vendors that did not collect sales tax, preventing tax evasion through cross-border purchasing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Are services subject to commercial sales tax?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                In most states, pure professional services (legal, medical, accounting) remain tax-exempt. However, services involving tangible personal property (such as equipment repair, custom fabrication, commercial printing, or physical landscaping) are widely subject to state and local sales taxes.
              </p>
            </div>
          </div>


          <p>
            In specialized retail leasing, brick-and-mortar merchants must also review local Tax Increment Financing (TIF) district surcharges. Certain shopping centers assess incremental local district improvement taxes that require separate line-item accounting on sales receipts.
          </p>

          <h2>Authoritative Regulatory Citations & Statutory Tax Standards</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>United States Supreme Court (South Dakota v. Wayfair, Inc., 585 U.S. 2018):</strong> Landmark decision affirming state power to enforce remote economic nexus without physical presence.
            </li>
            <li>
              <strong>Streamlined Sales Tax Governing Board (SSUTA Standards):</strong> Multi-state uniform rules for sourcing, product taxability matrices, and certified tax administration.
            </li>
            <li>
              <strong>Multistate Tax Commission (MTC Nexus Guidelines):</strong> Model statutes and uniform allocation rules governing corporate sales and use tax liability.
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 583):</strong> Guidelines on state tax reconciliation and deductibility of non-reimbursed state excise taxes.
            </li>
          </ul>
        </>
      }
    >
      <SalesTaxCalculatorComponent />
    </CalcPage>
  );
}
