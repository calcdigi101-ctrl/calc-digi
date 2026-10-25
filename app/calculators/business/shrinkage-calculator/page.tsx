import type { Metadata } from "next";
import Link from "next/link";
import ShrinkageCalculatorComponent from "@/components/calcs/business/shrinkage-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InventoryShrinkageLossBreakdownChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/shrinkage-calculator";
const TITLE = "Shrinkage Calculator | Retail Inventory Loss & Theft Audit Solver";
const DESCRIPTION =
  "Calculate retail inventory shrinkage rates, dollar loss discrepancies between book and physical audits, shoplifting splits, and loss prevention benchmarks.";

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
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS Solver" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
  { href: "/calculators/business/markup-calculator", icon: "📈", name: "Markup Calculator" },
  { href: "/calculators/business/wholesale-price-calculator", icon: "🏷️", name: "Wholesale Pricing" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard retail accounting formula for inventory shrinkage?",
    a: "The standard shrinkage formula is: Shrinkage ($) = Recorded Book Inventory Value - Physical Audit Count Value. Shrinkage Rate as a percentage of sales is calculated as: Shrinkage Rate (%) = (Shrinkage $ / Total Net Retail Sales) * 100.",
  },
  {
    q: "What are the primary root causes of inventory shrinkage in modern retail?",
    a: "According to National Retail Federation (NRF) annual benchmarks, shrinkage breaks down into four primary categories: External Theft / Shoplifting (~36% - 38%), Internal Employee Theft (~28% - 30%), Administrative & Scanning Paperwork Errors (~20% - 22%), and Vendor Fraud / In-Transit Spoilage (~12% - 14%).",
  },
  {
    q: "What is an average or healthy inventory shrinkage rate across US retail?",
    a: "The US national average retail shrinkage rate typically hovers between 1.4% and 1.6% of total retail sales. Rates below 1.0% reflect world-class loss prevention controls, while rates exceeding 2.5% indicate severe inventory leakage that threatens business solvency.",
  },
  {
    q: "How does inventory shrinkage directly impact Cost of Goods Sold (COGS)?",
    a: "Shrinkage represents physical inventory that vanishes without generating sales revenue. When a physical audit reveals missing stock, the book inventory must be written down, directly increasing reported COGS and dollar-for-dollar eroding gross profit margins.",
  },
  {
    q: "How do automated cycle counts mitigate annual physical inventory shrinkage surprises?",
    a: "Rather than conducting a disruptive once-a-year full store audit, automated cycle counting continuously audits high-risk, high-value SKUs on daily or weekly schedules, catching theft patterns and scanning errors before losses compound across fiscal quarters.",
  },
  {
    q: "How does loss prevention investment ROI compare against shrinkage reduction?",
    a: "Investing in electronic article surveillance (EAS), computer vision security, and RFID tags generates positive ROI if the reduction in shrinkage dollars exceeds the annualized capital cost of security equipment and security staffing.",
  },
];

export default function ShrinkageCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Inventory Shrinkage & Loss Prevention Calculator"
      intro="Compute physical audit inventory variances, dollar shrinkage losses, retail shrinkage rates as a percentage of sales, and loss category allocations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Inventory Shrinkage is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Inventory shrinkage measures the discrepancy between recorded accounting stock and physical on-hand inventory: Shrinkage ($) = Book Inventory Value - Physical Audit Count. The shrinkage rate is expressed as a percentage of sales: Shrinkage Rate (%) = (Shrinkage $ / Total Retail Sales) &times; 100. Retail operators factor inventory losses into landing margins via the <Link href="/calculators/business/cogs-calculator">COGS calculator</Link>, calibrate catalog price buffers with the <Link href="/calculators/business/markup-calculator">markup calculator</Link>, and evaluate net earnings in the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>.
            </p>
          </div>

          <h2>Visual Analysis: Retail Inventory Shrinkage Cause Distribution Across Sectors</h2>
          <p>
            The chart below visualizes the allocation of inventory shrinkage losses across external theft, employee dishonesty, administrative scanning errors, and vendor fraud across major merchandising verticals.
          </p>

          <InventoryShrinkageLossBreakdownChart />

          <h2>First-Principles Inventory Reconciliation & Shrinkage Mathematics</h2>
          <p>
            Under standard retail inventory method (RIM) accounting and US GAAP (FASB ASC 330), perpetual inventory balances track cumulative additions and subtractions across the fiscal cycle:
          </p>
          <Formula>
            {"\\text{Book Inventory Value} = \\text{Beginning Inventory} + \\text{Purchases / Transfers} - \\text{Sales} - \\text{Documented Markdowns}"}
          </Formula>
          <p>
            When an end-of-period physical count or automated RFID scan determines actual physical inventory, shrinkage dollar loss evaluates to:
          </p>
          <Formula>
            {"\\text{Shrinkage Dollar Loss} = \\max(0, \\text{Book Inventory} - \\text{Physical Audit Value})"}
          </Formula>
          <p>
            To evaluate shrinkage severity across divergent retail store formats, loss prevention directors compute the Shrinkage Percentage of Sales and Percentage of Book Inventory:
          </p>
          <Formula>
            {"\\text{Shrinkage Rate (Sales \\%)} = \\left( \\frac{\\text{Shrinkage } \\$}{\\text{Total Net Sales}} \\right) \\times 100\\%"}
          </Formula>
          <Formula>
            {"\\text{Shrinkage Rate (Inventory \\%)} = \\left( \\frac{\\text{Shrinkage } \\$}{\\text{Book Inventory}} \\right) \\times 100\\%"}
          </Formula>
          <p>
            Store controllers balance shrinkage buffers by testing retail volume elasticity in the <Link href="/calculators/business/break-even-calculator">break-even calculator</Link>, calibrating wholesale price tiers with the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>, and monitoring e-commerce return fraud through the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link>.
          </p>

          <h2>NRF Industry Shrinkage Benchmarks & Loss Allocation by Vertical</h2>
          <p>
            The table below contrasts standard retail shrinkage percentages, median loss rates as a percentage of sales, top loss drivers, and primary loss prevention countermeasures across commercial sectors.
          </p>

          <DataTable
            head={["Retail Merchandising Sector", "Median Shrinkage Rate (% of Sales)", "Primary Loss Driver", "Physical Audit Frequency", "Standard Security Control"]}
            rows={[
              ["Supermarkets & Grocery", "2.10% - 2.80%", "Perishability & cashier scanning error", "Monthly cycle counts", "Automated POS weight scale sensors"],
              ["Apparel & Specialty Fashion", "1.80% - 2.40%", "Organized retail crime & fitting room theft", "Quarterly audits", "RFID item-level hard tags & EAS gates"],
              ["Consumer Electronics", "1.20% - 1.80%", "External grab-and-run theft", "Weekly high-value cycle", "Locked display glass & alarmed tether cables"],
              ["Big-Box Home Improvement", "1.60% - 2.20%", "Bulk pallet fraud & external theft", "Bi-annual audits", "Overhead smart computer vision cameras"],
              ["Pharmacies & Drugstores", "2.30% - 3.10%", "Small high-value OTC medicine theft", "Continuous cycle counts", "Anti-sweep locking hooks & facial analysis"],
              ["Department Store Retail", "1.40% - 1.90%", "Employee dishonesty & markdown fraud", "Annual comprehensive", "Undercover asset protection & receipt check"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Regional Sporting Goods Chain Physical Audit Reconciliation</h3>
          <p>
            A regional sporting goods retailer operates 12 retail stores generating $36,000,000.00 in annual net sales. At year-end fiscal reconciliation, the perpetual ERP ledger records ending book inventory at $8,450,000.00 at cost. A comprehensive physical inventory audit conducted by an independent third-party inventory auditing firm reveals actual on-hand stock valued at $7,820,000.00:
          </p>
          <ol>
            <li>
              <strong>Calculate absolute shrinkage dollar loss:</strong>
              <br />
              Total Shrinkage Loss = $8,450,000.00 (Book) - $7,820,000.00 (Actual) = $630,000.00.
            </li>
            <li>
              <strong>Determine shrinkage percentages across inventory and revenue:</strong>
              <br />
              Shrinkage % of Book Inventory = ($630,000.00 / $8,450,000.00) &times; 100% = 7.46%.
              <br />
              Shrinkage % of Annual Sales = ($630,000.00 / $36,000,000.00) &times; 100% = 1.75%.
            </li>
            <li>
              <strong>Decompose root causes based on NRF retail survey benchmarks:</strong>
              <br />
              External Shoplifting (37%) = $630,000.00 &times; 0.37 = $233,100.00.
              <br />
              Internal Employee Theft (29%) = $630,000.00 &times; 0.29 = $182,700.00.
              <br />
              Administrative Scanning Errors (21%) = $630,000.00 &times; 0.21 = $132,300.00.
              <br />
              Vendor Spoilage & Receiving Fraud (13%) = $630,000.00 &times; 0.13 = $81,900.00.
            </li>
            <li>
              <strong>Income Statement Impairment Adjustment:</strong> The controller writes down ending inventory by $630,000.00, immediately increasing COGS and reducing operating margins. Management evaluates staffing supervision via the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: High-End Consumer Electronics Retailer EAS ROI Model</h3>
          <p>
            A high-traffic electronics retail store doing $5,000,000.00 in annual revenue suffers from a severe 2.80% shrinkage rate ($140,000.00 in annual losses). The loss prevention director proposes installing automated RFID smart overhead portals and smart alarmed display cases costing $45,000.00 in upfront hardware with $5,000.00 in annual maintenance, projected to compress shrinkage to 1.30%:
          </p>
          <ol>
            <li>
              <strong>Calculate projected post-implementation shrinkage:</strong>
              <br />
              Target Shrinkage at 1.30% = $5,000,000.00 &times; 1.30% = $65,000.00.
            </li>
            <li>
              <strong>Determine annual gross dollar savings:</strong>
              <br />
              Annual Shrinkage Reduction = $140,000.00 - $65,000.00 = $75,000.00 annual savings.
            </li>
            <li>
              <strong>Compute first-year net financial return and capital payback:</strong>
              <br />
              First-Year Total Cost = $45,000.00 + $5,000.00 = $50,000.00.
              <br />
              Net First-Year Profit = $75,000.00 - $50,000.00 = $25,000.00.
              <br />
              Capital Payback Period = $45,000.00 / ($75,000 - $5,000) = 0.64 years (7.7 months).
            </li>
            <li>
              <strong>Capital Allocation Integration:</strong> Leadership verifies security investment yield using the <Link href="/calculators/business/roi-calculator">ROI calculator</Link> and models working capital velocity via the <Link href="/calculators/business/burn-rate-calculator">burn rate calculator</Link>.
            </li>
          </ol>

          <h2>Asset Protection Technologies: RFID & Computer Vision Metrology</h2>
          <p>
            Modern inventory loss prevention has evolved far beyond traditional magnetic EAS stickers. Retail leaders deploy item-level Radio Frequency Identification (RFID) microchips embedded directly into product hangtags and packaging. Overhead RFID ceiling readers continuously scan retail sales floors, updating inventory position coordinates in real time. This automated visibility enables stores to detect exactly when, where, and which specific SKUs were concealed or exited through emergency side doors.
          </p>
          <p>
            Furthermore, artificial intelligence computer vision platforms analyze POS checkout video feeds to detect &quot;sweethearting&quot;—the practice where dishonest cashiers simulate barcode scanning without registering the transaction—and &quot;misscans&quot; where self-checkout shoppers substitute expensive organic produce barcodes for cheaper bulk items.
          </p>


          <p>
            In modern supply chain and omni-channel retail distribution, logistics directors deploy automated smart cycle counts utilizing automated inventory scanning drones and autonomous mobile robots (AMRs). These autonomous systems traverse warehouse distribution aisles during overnight off-hours, performing optical barcode and RFID verification across thousands of pallet racks per hour. Automated robotic auditing detects misplaced inventory pallets, packaging damage, and transit spoilage within 24 hours of arrival rather than at year-end physical counts.
          </p>
          <p>
            Furthermore, enterprise retail chains implement rigorous vendor compliance chargeback programs. When direct-store-delivery (DSD) vendors deliver short shipments, damaged outer cartons, or un-scannable barcodes, automated receiving software flags the discrepancies immediately on the receiving dock bill of lading. Generating automated invoice chargebacks transfers the financial loss back to the negligent vendor, safeguarding the retailer&apos;s baseline gross profit margins from supplier-side inventory shrinkage.
          </p>
          <p>
            Loss prevention executives also conduct predictive exception-based reporting (EBR) on point-of-sale cash registers. By monitoring cashier transaction anomalies—such as excessive post-void transactions, manual price overrides, and cash drawer openings without sales—audit teams swiftly identify internal employee theft patterns before cumulative losses compound across fiscal quarters.
          </p>

          <h2>Operational Pitfalls in Inventory Shrinkage Management</h2>
          <ol>
            <li>
              <strong>Delaying Physical Inventory Audits to Annual Intervals:</strong> Relying exclusively on once-a-year physical inventory counts allows theft rings and systematic warehouse scanning bugs to operate undetected for 11 months, compounding financial damage.
            </li>
            <li>
              <strong>Failing to Isolate Administrative Scanning Errors from Real Theft:</strong> Misdiagnosing barcode data entry errors as physical shoplifting misallocates security capital into expensive security guards when staff training and barcode audit scans are what is required.
            </li>
            <li>
              <strong>Ignoring Receiving Dock Discrepancies:</strong> Blindly signing bills of lading without validating piece counts allows supplier short-shipments to enter perpetual inventory records, creating phantom shrinkage before items even reach store shelves.
            </li>
            <li>
              <strong>Over-Securing Merchandise and Inducing Demand Destruction:</strong> Locking everyday merchandise behind plexiglass display cases reduces theft but causes a catastrophic 20% to 35% decline in sales volume as frustrated shoppers abandon purchases.
            </li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is phantom inventory and how does it relate to shrinkage?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Phantom inventory (or ghost inventory) refers to items that exist on perpetual computer ledgers but are physically missing due to unrecorded theft, damage, or misplacement. Phantom inventory prevents automated ERP systems from triggering replenishment purchase orders, resulting in out-of-stock shelves and lost customer sales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does organized retail crime (ORC) differ from opportunistic shoplifting?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Opportunistic shoplifting involves individuals stealing items for personal consumption. Organized Retail Crime (ORC) involves professional criminal syndicates that systematically steal large volumes of high-value merchandise (infant formula, designer apparel, power tools) to fence online through digital marketplace storefronts.
              </p>
            </div>
          </div>


          <p>
            In omnichannel warehouse fulfillment hubs, inventory controllers also monitor damage write-offs incurred during conveyor sortation and forklift transport. Documenting transit carton damage immediately upon receipt separates supplier logistics liabilities from internal warehouse handling shrinkage.
          </p>

          <h2>Authoritative Loss Prevention Standards & Retail Citations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Retail Federation (NRF National Retail Security Survey):</strong> Annual empirical benchmarks for shrinkage percentages, theft causation, and loss prevention budgets.
            </li>
            <li>
              <strong>Retail Industry Leaders Association (RILA Loss Prevention Standards):</strong> Industry guidance on mitigating organized retail crime, supply chain integrity, and asset protection.
            </li>
            <li>
              <strong>Financial Accounting Standards Board (FASB ASC 330 - Inventory):</strong> Accounting criteria for inventory lower of cost and net realizable value write-downs.
            </li>
            <li>
              <strong>Loss Prevention Research Council (LPRC Metrology):</strong> Scientific evidence-based research on situational crime prevention and electronic surveillance effectiveness.
            </li>
          </ul>
        </>
      }
    >
      <ShrinkageCalculatorComponent />
    </CalcPage>
  );
}
