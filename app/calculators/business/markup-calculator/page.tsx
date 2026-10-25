import type { Metadata } from "next";
import Link from "next/link";
import MarkupCalculatorComponent from "@/components/calcs/business/markup-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MarkupVsMarginSpreadChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/markup-calculator";
const TITLE = "Markup Calculator | Cost Markup vs Gross Margin Pricing Engine";
const DESCRIPTION =
  "Calculate cost markup percentages, selling price points, gross margin spreads, and dollar profit yields across retail and manufacturing inventory.";

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
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/wholesale-price-calculator", icon: "🏷️", name: "Wholesale Pricing" },
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS Solver" },
  { href: "/calculators/business/discount-calculator", icon: "✂️", name: "Discount Engine" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
];

const FAQ_ITEMS = [
  {
    q: "What is the critical mathematical distinction between markup and gross margin?",
    a: "Markup expresses profit as a percentage of the original cost: Markup % = (Profit / Cost) * 100. Gross Margin expresses profit as a percentage of the final selling price: Margin % = (Profit / Selling Price) * 100. While dollar profit is identical, markup is always mathematically larger than margin for any profitable item.",
  },
  {
    q: "How do you calculate selling price from cost and desired gross margin?",
    a: "To achieve a specific gross margin, the selling price formula is: Selling Price = Cost / (1 - Desired Margin %). For example, if an item costs $60.00 and you require a 40% margin, Selling Price = $60.00 / (1 - 0.40) = $100.00. Multiplying cost by 1.40 yields only $84.00, resulting in an inadequate 28.57% margin.",
  },
  {
    q: "What is keystone pricing in retail merchandising?",
    a: "Keystone pricing is a traditional retail pricing standard where goods are marked up by exactly 100% of their wholesale cost, resulting in an exact 50.0% gross margin. If a merchant acquires apparel for $25.00, keystone pricing dictates an MSRP of $50.00.",
  },
  {
    q: "Can gross margin ever exceed 100% in commercial accounting?",
    a: "No. Gross margin can never reach or exceed 100% unless cost of goods sold is zero or negative. Conversely, markup percentage can rise infinitely: a 300% markup on a $10.00 cost yields a $40.00 price and a 75.0% gross margin.",
  },
  {
    q: "How does price elasticity affect sustainable markup thresholds?",
    a: "In highly commoditized retail sectors with high price elasticity, excessive markups trigger sharp volume declines as shoppers migrate to competing alternatives. In contrast, proprietary luxury goods or patented medical devices maintain inelastic demand, supporting markups in excess of 400% to 1,000%.",
  },
  {
    q: "How does inventory shrinkage erode realized product markup?",
    a: "The initial markup represents target profitability. However, warehouse theft, damage, and administrative discrepancies reduce realized gross margin below the theoretical plan, requiring calibration with an inventory shrinkage model.",
  },
];

export default function MarkupCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Markup vs. Margin Pricing Calculator"
      intro="Compute cost markup percentages, target selling prices, gross margin conversions, and dollar profit spreads across retail merchandise and wholesale catalogs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Markup & Margin are Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Markup calculates profit as a percentage of cost: Markup % = (Profit / Cost) &times; 100. Gross Margin calculates profit as a percentage of selling price: Margin % = (Profit / Price) &times; 100. To achieve a target margin from a given cost, calculate: Selling Price = Cost / (1 - Margin%). Merchandisers pair markup models with the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link> and establish supply chain pricing via the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: The Exponential Divergence Between Markup and Margin</h2>
          <p>
            The chart below reveals the mathematical spread between markup percentage and resulting gross margin percentage, demonstrating why high margin targets require disproportionately larger cost markups.
          </p>

          <MarkupVsMarginSpreadChart />

          <h2>First-Principles Pricing Formulations & Algebraic Conversions</h2>
          <p>
            The fundamental accounting relationship connecting unit cost \(C\), selling price \(P\), and gross profit \(\Pi\) is governed by standard linear balance equations:
          </p>
          <Formula>
            {"\\Pi = P - C, \\quad \\text{Markup (\\%)} = \\left( \\frac{\\Pi}{C} \\right) \\times 100\\%, \\quad \\text{Margin (\\%)} = \\left( \\frac{\\Pi}{P} \\right) \\times 100\\%"}
          </Formula>
          <p>
            To convert algebraically between cost Markup (\(M\)) and Gross Margin (\(G\)) expressed in decimal form:
          </p>
          <Formula>
            {"G = \\frac{M}{1 + M}, \\quad M = \\frac{G}{1 - G}"}
          </Formula>
          <p>
            To determine the mandatory retail selling price \(P\) required to achieve target gross margin \(G\) from unit cost \(C\):
          </p>
          <Formula>
            {"P = \\frac{C}{1 - G}"}
          </Formula>
          <p>
            When merchants mistakenly calculate price by multiplying cost by \((1 + G)\) instead of dividing by \((1 - G)\), an immediate gross margin shortfall occurs:
          </p>
          <Formula>
            {"\\Delta G = G - \\left( \\frac{G}{1 + G} \\right) = \\frac{G^2}{1 + G}"}
          </Formula>
          <p>
            For a business targeting a 40% gross margin, this error generates a 11.43% margin gap. Commercial controllers mitigate inventory leakage by tracking factory inputs in the <Link href="/calculators/business/cogs-calculator">COGS solver</Link>, evaluating volume markdowns with the <Link href="/calculators/business/discount-calculator">discount calculator</Link>, and balancing enterprise fixed overhead in the <Link href="/calculators/business/break-even-calculator">break-even point solver</Link>.
          </p>

          <h2>Retail Merchandising Markup & Margin Conversion Matrix</h2>
          <p>
            The table below demonstrates exact mathematical conversions between cost markups, realized gross margins, unit prices on a $100 baseline, and industry applications.
          </p>

          <DataTable
            head={["Cost Markup (%)", "Equivalent Gross Margin (%)", "Selling Price on $100 Cost", "Dollar Profit Yield", "Standard Industry Application"]}
            rows={[
              ["15.0% Markup", "13.04% Margin", "$115.00", "$15.00", "High-volume wholesale grocery & commodity bulk grain"],
              ["25.0% Markup", "20.00% Margin", "$125.00", "$25.00", "Consumer electronics, home appliances & commercial fleet"],
              ["33.33% Markup", "25.00% Margin", "$133.33", "$33.33", "Hardware supplies, building materials & industrial tools"],
              ["50.0% Markup", "33.33% Margin", "$150.00", "$50.00", "Sporting goods, automotive aftermarket & office products"],
              ["100.0% Markup (Keystone)", "50.00% Margin", "$200.00", "$100.00", "Apparel, footwear, department store retail & giftware"],
              ["300.0% Markup", "75.00% Margin", "$400.00", "$300.00", "Cosmetics, fine jewelry, luxury accessories & eyewear"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Specialty Outdoor Gear Retailer Pricing Optimization</h3>
          <p>
            A specialty outdoor retailer purchases technical waterproof mountaineering backpacks from an overseas manufacturer at a landed wholesale cost of $72.00 per unit. The executive board mandates a 45.0% minimum gross margin across technical gear to absorb physical retail leases and seasonal promotional clearances:
          </p>
          <ol>
            <li>
              <strong>Calculate target selling price using margin formula:</strong>
              <br />
              Selling Price = $72.00 / (1 - 0.45) = $72.00 / 0.55 = $130.91.
              <br />
              Applying psychological retail rounding sets the MSRP at $129.99.
            </li>
            <li>
              <strong>Evaluate the corresponding cost markup percentage:</strong>
              <br />
              Dollar Profit = $129.99 - $72.00 = $57.99.
              <br />
              Required Markup = ($57.99 / $72.00) &times; 100% = 80.54%.
            </li>
            <li>
              <strong>Examine the error of naive additive markup:</strong>
              <br />
              If the buyer had naively applied a 45% markup: Price = $72.00 &times; 1.45 = $104.40.
              <br />
              Resulting Realized Margin = ($32.40 / $104.40) &times; 100% = 31.03% (A disastrous 13.97% margin erosion).
            </li>
            <li>
              <strong>Downstream Commerce Integration:</strong> Retail leadership models outbound shipping and marketplace commissions via the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link> and verifies state checkout taxes with the <Link href="/calculators/business/sales-tax-calculator">sales tax calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Custom Architectural Cabinetry Contractor Bid Formulation</h3>
          <p>
            A high-end architectural millwork contractor bids on a custom residential cabinetry package. Direct hardwood lumber, Blum hardware, and finishing supplies total $14,500.00. Dedicated shop fabrication labor totals $9,200.00 (Total Direct Cost = $23,700.00). The contractor requires a 35.0% gross profit margin to fund commercial shop overhead and generate net income:
          </p>
          <ol>
            <li>
              <strong>Compute total contract bid price:</strong>
              <br />
              Contract Bid = $23,700.00 / (1 - 0.35) = $23,700.00 / 0.65 = $36,461.54.
            </li>
            <li>
              <strong>Determine gross profit and markup on direct costs:</strong>
              <br />
              Gross Dollar Margin = $36,461.54 - $23,700.00 = $12,761.54.
              <br />
              Cost Markup = ($12,761.54 / $23,700.00) &times; 100% = 53.85%.
            </li>
            <li>
              <strong>Review labor burden and subcontractor wages:</strong>
              <br />
              Contractor cross-references shop wages using the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link> and structures progressive billing with the <Link href="/calculators/business/invoice-calculator">commercial invoice calculator</Link>.
            </li>
            <li>
              <strong>Operational Risk Verification:</strong> The contractor audits physical stock damage and cut scrap with the <Link href="/calculators/business/shrinkage-calculator">inventory shrinkage calculator</Link>.
            </li>
          </ol>

          <h2>Dynamic Channel Pricing & Promotional Margin Protection</h2>
          <p>
            In multi-channel retail distribution, brand manufacturers must maintain pricing parity between direct-to-consumer (DTC) e-commerce sites and wholesale dealer networks. When establishing Manufacturer&apos;s Suggested Retail Price (MSRP), brands build in multi-tier wholesale margin cushions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 my-4">
            <li><strong>Wholesale Discount Allowance:</strong> Wholesale dealers require a 40% to 50% discount from MSRP (keystone pricing) to cover retail store leases and sales commissions.</li>
            <li><strong>Promotional Clearance Cushion:</strong> Building a 15% promotional margin buffer into initial MSRP allows brands to run seasonal 20% off sales without pushing product gross margins below operating breakeven.</li>
            <li><strong>Marketplace Platform Deductions:</strong> Selling on enterprise marketplaces (such as Amazon or Walmart) incurs referral fees of 15% and fulfillment fees of 10% to 18%, requiring higher initial markups than direct wholesale.</li>
          </ul>
          <p>
            Strategic merchandisers also monitor inventory velocity when setting product markups. Fast-moving consumables with 10 inventory turns per year generate superior annualized return on invested capital at a 25% markup compared to slow-moving luxury hardware marked up by 150% that turns only once annually.
          </p>


          <p>
            In omnichannel wholesale and retail merchandising, Category Managers track Initial Markup (IMU) versus Maintained Markup (MMU). While IMU establishes the opening list price on the retail floor, seasonal markdowns, promotional clearances, employee discounts, and point-of-sale coupons inevitably erode the realized selling price. Maintained markup captures the actual gross margin dollars collected across the entire product lifecycle after accounting for all promotional price reductions.
          </p>
          <p>
            Additionally, enterprise ERP inventory systems deploy dynamic algorithmic repricing rules. By monitoring competitor catalog pricing, warehouse inventory aging velocity, and regional demand elasticity, automated pricing engines adjust cost markups in real time. This ensures slow-moving SKUs are cleared before obsolescence while high-demand items capture premium markups without dampening sales velocity.
          </p>

          <h2>Operational Pitfalls in Markup Execution & Pricing Governance</h2>
          <ol>
            <li>
              <strong>Treating Markup as Margin in Budget Projections:</strong> Budgeting operating expenses against an anticipated 40% gross margin while applying a 40% markup to inventory purchases creates a structural budget deficit of 11.4% of total revenue, leading to acute cash shortages.
            </li>
            <li>
              <strong>Failing to Include Inbound Freight in Base Cost:</strong> Calculating markup exclusively on invoice merchandise cost while expensing ocean freight and customs duties separately understates true landed unit cost, artificially inflating perceived margins.
            </li>
            <li>
              <strong>Ignoring Price Elasticity of Demand:</strong> Aggressively escalating markups without assessing competitor price points induces severe demand destruction in commodity categories, reducing total dollar gross profit despite higher unit margins.
            </li>
            <li>
              <strong>Slow Inventory Velocity Traps:</strong> High markups on slow-moving inventory tie up working capital. A 100% markup on an item that turns once a year generates lower annualized return on investment than a 30% markup on an item turning six times annually.
            </li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is cost markup always larger than gross margin?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Markup divides dollar profit by cost, whereas gross margin divides that same dollar profit by selling price. Because selling price is always larger than cost for profitable goods, the denominator in the margin equation is larger, making the resulting margin percentage mathematically smaller than the markup percentage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does keystone pricing protect retail profitability?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Keystone pricing (100% markup / 50% gross margin) provides a generous margin buffer that absorbs retail store leases, employee wages, inventory shrinkage, and end-of-season promotional clearance markdowns while still leaving a healthy net operating profit.
              </p>
            </div>
          </div>


          <p>
            In specialized industrial contracting, estimators incorporate tiered contingency markups on labor and materials to protect against unexpected job-site delays, volatile commodity price spikes, and subcontractor scheduling friction. Maintaining dedicated contingency markup reserves ensures contracted projects achieve target profitability even when unexpected operational challenges arise in field execution.
          </p>

          <h2>Authoritative Merchandising Standards & Regulatory Citations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Federal Trade Commission (FTC Guides Against Deceptive Pricing - 16 CFR Part 233):</strong> Regulations governing former price comparisons, list prices, and retail markup advertising.
            </li>
            <li>
              <strong>National Retail Federation (NRF Pricing & Merchandising Standards):</strong> Industry benchmarks for retail keystone markup, inventory turnover, and markdown cadence.
            </li>
            <li>
              <strong>Financial Accounting Standards Board (FASB ASC 330):</strong> Retail inventory accounting methods and gross margin realization rules.
            </li>
            <li>
              <strong>Sherman Antitrust Act (15 U.S.C. Section 1):</strong> Legal parameters governing Minimum Advertised Price (MAP) policies and resale price maintenance.
            </li>
          </ul>
        </>
      }
    >
      <MarkupCalculatorComponent />
    </CalcPage>
  );
}
