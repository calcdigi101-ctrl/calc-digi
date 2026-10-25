import type { Metadata } from "next";
import Link from "next/link";
import CogsCalculatorComponent from "@/components/calcs/business/cogs-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CogsManufacturingCostStructureChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/cogs-calculator";
const TITLE = "COGS Calculator | Cost of Goods Sold & Gross Margin Solver";
const DESCRIPTION =
  "Calculate Cost of Goods Sold (COGS), direct materials, direct labor, applied factory overhead, and gross margins across retail and manufacturing businesses.";

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
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/markup-calculator", icon: "🏷️", name: "Markup Calculator" },
  { href: "/calculators/business/wholesale-price-calculator", icon: "🏭", name: "Wholesale Pricing" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/shrinkage-calculator", icon: "📉", name: "Inventory Shrinkage" },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard formula for Cost of Goods Sold (COGS)?",
    a: "The standard periodic inventory COGS equation is: COGS = Beginning Inventory + Direct Purchases/Production - Ending Inventory. It measures the direct cost of inventory items sold during the accounting period, excluding administrative overhead, marketing, and corporate office costs.",
  },
  {
    q: "What expenses are included in COGS versus Operating Expenses (OpEx)?",
    a: "COGS includes only direct costs required to produce or acquire inventory: raw materials, direct factory labor, inbound freight, and allocated manufacturing overhead. Operating Expenses (OpEx) include general administrative payroll, office leases, marketing ads, software tools, and executive salaries.",
  },
  {
    q: "How does ending inventory valuation directly impact reported gross profit?",
    a: "Higher ending inventory values reduce reported COGS, which mathematically increases reported gross profit on the income statement. Conversely, writing down obsolete ending inventory increases COGS and reduces gross profit.",
  },
  {
    q: "What is the difference between FIFO and LIFO inventory costing methods?",
    a: "First-In, First-Out (FIFO) assumes the oldest inventory items are sold first. In inflationary environments, FIFO results in lower COGS and higher reported net income. Last-In, First-Out (LIFO) assumes the newest, more expensive items are sold first, resulting in higher COGS and lower corporate income taxes.",
  },
];

export default function CogsCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Cost of Goods Sold (COGS) Calculator"
      intro="Compute Cost of Goods Sold (COGS), prime manufacturing costs, inventory adjustments, and gross profit margins across retail merchandise and factory production lines."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How COGS is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Cost of Goods Sold (COGS) measures the direct costs attributable to the production of the goods sold by an enterprise: COGS = Beginning Inventory + New Production / Purchases - Ending Inventory. In manufacturing, new production blends Direct Raw Materials, Direct Labor, and Manufacturing Overhead. Subtracting COGS from total revenue yields Gross Profit. Businesses pair direct inventory costing with the <Link href="/calculators/business/markup-calculator">markup calculator</Link> and monitor overall operating returns via the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>.
            </p>
          </div>

          <h2>COGS Cost Component Distribution by Manufacturing Sector (%)</h2>
          <p>
            Understanding the internal composition of direct production costs reveals whether a company is raw-material intensive (like food production) or labor intensive (like custom machinery fabrication).
          </p>

          <CogsManufacturingCostStructureChart />

          <h2>First-Principles Inventory Costing Derivations & Formulations</h2>
          <p>
            Under International Accounting Standard 2 (IAS 2) and US GAAP (ASC 330), inventory costs encompass all purchase costs, conversion costs, and other costs incurred in bringing the inventories to their present location and condition. The fundamental periodic inventory formulation is:
          </p>
          <Formula>
            {"\text{COGS} = \text{Beginning Inventory} + \text{Cost of Goods Manufactured (COGM)} - \text{Ending Inventory}"}
          </Formula>
          <p>
            In a manufacturing environment, the Cost of Goods Manufactured represents the sum of Prime Costs (Direct Materials + Direct Labor) and Applied Factory Overhead:
          </p>
          <Formula>
            {"\text{COGM} = \text{Raw Materials Used} + \text{Direct Labor} + \text{Factory Overhead} + \Delta\text{Work-in-Process (WIP)}"}
          </Formula>
          <p>
            Gross profit margin reflects the percentage of revenue remaining after covering all direct manufacturing and merchandise acquisition expenses:
          </p>
          <Formula>
            {"\text{Gross Profit} = \text{Net Revenue} - \text{COGS}, \quad \text{Gross Margin (\%)} = \left( \frac{\text{Gross Profit}}{\text{Net Revenue}} \right) \times 100\%"}
          </Formula>
          <p>
            When financial controllers evaluate production thresholds, they link direct manufacturing outlays to the <Link href="/calculators/business/break-even-calculator">break-even point calculator</Link>, calibrate unit labor expenses with the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link>, and deduct physical stock losses using the <Link href="/calculators/business/shrinkage-calculator">inventory shrinkage calculator</Link>.
          </p>

          <h2>Manufacturing Sector COGS & Gross Margin Reference Standards</h2>
          <p>
            The table below compiles typical direct cost allocations, inventory turnover velocity, and standard gross margin benchmarks across prominent industrial and retail sectors.
          </p>

          <DataTable
            head={["Industry Sector", "Direct Materials Share", "Direct Labor Share", "Overhead Share", "Benchmark Gross Margin"]}
            rows={[
              ["Packaged Consumer Foods", "60% – 70%", "15% – 20%", "15% – 20%", "28% – 38%"],
              ["Automotive Parts Fabricators", "50% – 58%", "22% – 28%", "18% – 24%", "22% – 32%"],
              ["Precision Electronics Hardware", "55% – 65%", "18% – 25%", "15% – 22%", "35% – 48%"],
              ["Apparel & Footwear Brands", "40% – 50%", "30% – 40%", "15% – 25%", "50% – 62%"],
              ["Commercial Specialty Printing", "38% – 45%", "28% – 35%", "25% – 32%", "32% – 42%"],
              ["Wholesale Distribution", "85% – 92% (Finished)", "4% – 8% (Warehousing)", "4% – 8%", "12% – 20%"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Precision Metal Stamping Plant Production Run</h3>
          <p>
            A mid-sized automotive supplier stamps steel brackets for heavy commercial vehicles. At the beginning of the quarter, raw materials and finished bracket inventory on hand totaled $45,000. During the quarter, the plant purchased $125,000 in cold-rolled steel coils, incurred $68,000 in direct stamping press labor payroll, and absorbed $32,000 in plant electrical power, machine die maintenance, and lubricating fluids. Physical inventory auditing at quarter-end reveals $38,000 in unsold bracket stock. Gross invoiced sales revenue was $360,000.
          </p>
          <ol>
            <li>
              <strong>Calculate total current period production costs:</strong>
              <br />
              Total Production = $125,000 (Materials) + $68,000 (Labor) + $32,000 (Overhead) = $225,000.
            </li>
            <li>
              <strong>Calculate Cost of Goods Sold:</strong>
              <br />
              COGS = Beginning Inventory ($45,000) + Production ($225,000) - Ending Inventory ($38,000) = $232,000.
            </li>
            <li>
              <strong>Determine gross profit and gross margin:</strong>
              <br />
              Gross Profit = $360,000 - $232,000 = $128,000.
              <br />
              Gross Margin = ($128,000 / $360,000) × 100% = 35.56%.
              <br />
              Management sets commercial B2B contract terms using the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Direct-to-Consumer Skincare Brand Batch Sourcing</h3>
          <p>
            An organic skincare brand manufactures custom batches of facial serum. A single production run generates 10,000 bottled units. Bulk raw botanicals, glass dropper bottles, and outer cartons cost $3.80 per unit ($38,000 total). Contract manufacturing cleanroom filling labor costs $1.40 per unit ($14,000 total). Inbound ocean freight and customs brokerage fees average $0.80 per unit ($8,000 total). Each unit retails online for $36.00.
          </p>
          <ol>
            <li>
              <strong>Compute total landed unit COGS:</strong>
              <br />
              Unit COGS = $3.80 (Packaging & Ingredients) + $1.40 (Filling Labor) + $0.80 (Inbound Freight) = $6.00 per unit.
              <br />
              Total Batch COGS = 10,000 × $6.00 = $60,000.
            </li>
            <li>
              <strong>Evaluate unit gross margin and markup:</strong>
              <br />
              Unit Gross Profit = $36.00 - $6.00 = $30.00.
              <br />
              Gross Margin = ($30.00 / $36.00) × 100% = 83.33%.
              <br />
              Markup over COGS = ($30.00 / $6.00) × 100% = 500.0%.
            </li>
            <li>
              <strong>E-Commerce Bottom-Line Integration:</strong> The marketing director factors shipping and ad spend into downstream margins via the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link> and tracks customer acquisition payback with the <Link href="/calculators/business/cac-calculator">customer acquisition cost tool</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Inventory Cost Accounting Distortions</h2>
          <ol>
            <li>
              <strong>Under-Absorption vs. Over-Absorption of Fixed Overhead:</strong> Under standard absorption costing, fixed manufacturing overhead is allocated to units based on budgeted capacity. If factory production drops below expected capacity, unallocated overhead cannot be capitalized into inventory; it must be expensed immediately as a current-period volume variance, artificially depressing gross margins.
            </li>
            <li>
              <strong>Net Realizable Value (NRV) Impairment Write-Downs:</strong> If retail market prices fall or perishable goods degrade, GAAP requires inventory to be written down to Net Realizable Value (estimated selling price minus completion and disposal costs). The resulting write-down flows directly into COGS, spiking reported production costs without an increase in physical output.
            </li>
            <li>
              <strong>Landed Cost Omissions:</strong> Novice business operators frequently omit inbound freight, customs tariffs, port demurrage fees, and transit insurance from COGS calculations, improperly classifying them as operating expenses. This artificially inflates gross product margins while obscuring true manufacturing unit economics.
            </li>
          </ol>

          <h2>Activity-Based Costing (ABC) & Modern Inventory Metrology</h2>
          <p>
            Traditional volume-based overhead allocation assigns indirect costs using a single metric (such as direct labor hours or machine run-time). In modern multi-product facilities, this distorts product profitability by over-costing simple high-volume items and under-costing complex low-volume items. Activity-Based Costing (ABC) traces overhead to discrete cost pools:
          </p>
          <Formula>
            {"\text{Overhead Rate}_j = \frac{\text{Total Cost in Activity Pool}_j}{\text{Total Activity Driver Quantity}_j}"}
          </Formula>
          <p>
            By assigning machine setup costs per production batch, engineering change orders per SKU, and quality inspection costs per test cycle, ABC accounting reveals the true landed COGS of individual catalog items. Corporate controllers integrate ABC data with <Link href="/calculators/business/break-even-calculator">break-even models</Link>, project working capital demands via the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>, and model sales discounting strategies through the <Link href="/calculators/business/discount-calculator">commercial discount calculator</Link>.
          </p>
          <p>
            In automated warehouse management systems (WMS), radio-frequency identification (RFID) tags track raw materials consumption in real time. Automated cycle counts update enterprise resource planning (ERP) perpetual inventory ledgers continuously, eliminating massive year-end physical inventory adjustments.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Is shipping to customers included in Cost of Goods Sold?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Inbound shipping (freight-in required to transport raw materials or wholesale goods to your facility) is strictly included in COGS and capitalized into inventory value. Outbound shipping (freight-out to deliver finished goods to the end consumer) is typically classified as a fulfillment or operating selling expense, though some e-commerce businesses include it in direct fulfillment cost metrics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why do service companies typically have zero or minimal COGS?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Pure service companies (law firms, software platforms, consulting agencies) do not sell physical merchandise, so they carry zero raw material or physical inventory. Instead, their direct delivery costs (billable consultant salaries, client cloud hosting) are categorized as Cost of Services (COS) or Cost of Revenue rather than traditional inventory COGS.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does reducing COGS impact business valuation?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Every dollar cut from COGS flows 100% directly to gross profit and EBITDA. For a manufacturing business valued at an 8.0× EBITDA multiple, a $100,000 reduction in annual direct material purchasing costs immediately increases the enterprise value of the company by $800,000. Evaluate enterprise valuation metrics using the <Link href="/calculators/business/startup-valuation-calculator">startup valuation calculator</Link>.
              </p>
            </div>
          </div>


          <p>
            In modern ERP accounting suites, perpetual inventory systems continuously track moving-average unit costs. When raw material supplier purchase order prices fluctuate between batches, perpetual moving-average costing recalculates unit COGS after every shipment receipt. This prevents severe margin volatility and provides real-time gross margin visibility across changing commodity cycles.
          </p>
          <p>
            Furthermore, manufacturing controllers monitor scrap rates and scrap rework labor. Excessive scrap in fabrication runs creates unabsorbed material variances that must be expensed as period losses rather than capitalized into inventory, ensuring reported inventory on the corporate balance sheet remains strictly conservative.
          </p>

          <h2>Authoritative International Standards & Cost Accounting Guidelines</h2>
          <p>
            For standardized inventory costing rules, absorption accounting principles, and managerial financial reporting guidelines, consult:
          </p>
          <ul>
            <li>
              <strong>International Accounting Standard 2 (IAS 2):</strong> Inventories — Measurement, Inclusions, and Net Realizable Value.
            </li>
            <li>
              <strong>FASB Accounting Standards Codification (ASC 330):</strong> Inventory Costing, Lower of Cost or Market, and Cost Flow Assumptions.
            </li>
            <li>
              <strong>Institute of Management Accountants (IMA SMA 4J):</strong> Activity-Based Costing for Competitive Advantage.
            </li>
            <li>
              <strong>US Internal Revenue Code (IRC Section 471 & 263A):</strong> General Rule for Inventories and Uniform Capitalization Rules (UNICAP).
            </li>
          </ul>
        </>
      }
    >
      <CogsCalculatorComponent />
    </CalcPage>
  );
}
