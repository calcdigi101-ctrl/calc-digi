import type { Metadata } from "next";
import Link from "next/link";
import WholesalePriceCalculatorComponent from "@/components/calcs/business/wholesale-price-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WholesaleRetailKeystonePricingChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/wholesale-price-calculator";
const TITLE = "Wholesale Price Calculator | B2B & Retail Keystone Pricing Engine";
const DESCRIPTION =
  "Calculate B2B wholesale selling prices, retailer MSRP keystone markups, supply chain gross margins, and production batch volume profitability.";

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
  { href: "/calculators/business/markup-calculator", icon: "📈", name: "Markup Calculator" },
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS Solver" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount Engine" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard formula for calculating wholesale price from manufacturing cost?",
    a: "The standard wholesale pricing formula is: Wholesale Price = Cost of Goods Sold (COGS) * (1 + Wholesale Markup %). Alternatively, to target a specific wholesale gross margin: Wholesale Price = COGS / (1 - Wholesale Margin %).",
  },
  {
    q: "What is keystone pricing in wholesale-to-retail merchandising?",
    a: "Keystone pricing is a foundational retail merchandising standard where the retailer doubles their wholesale acquisition cost (a 100% markup over wholesale), resulting in an exact 50.0% retail gross margin. If a brand wholesales an item for $25.00, keystone pricing establishes an MSRP of $50.00.",
  },
  {
    q: "Why must wholesale pricing models accommodate both brand and retailer profit margins?",
    a: "If a manufacturer prices wholesale goods too high, retailers cannot achieve the 50% gross margin required to fund physical store rent, floor staff wages, and seasonal clearance markdowns. If priced too low, the manufacturer cannot cover production overhead and corporate R&D.",
  },
  {
    q: "How does landed cost differ from raw manufacturing cost?",
    a: "Landed cost represents the total direct expenditure required to manufacture, transport, and receive an item at the warehouse door: Landed Cost = Factory Production Cost + Inbound Ocean/Air Freight + Customs Duties + Port Handling + Transit Insurance.",
  },
  {
    q: "What is Minimum Order Quantity (MOQ) and why is it critical in wholesale?",
    a: "MOQ is the minimum unit volume a wholesale buyer must commit to purchase in a single order. Establishing MOQs protects the manufacturer's gross margin by ensuring production runs achieve economies of scale and administrative fulfillment costs remain economical.",
  },
  {
    q: "How do commercial invoice terms interact with wholesale volume pricing?",
    a: "Wholesale transactions are formally billed using structured trade credit terms such as Net 30 or 2/10 Net 30. Integrating line-item billing through our commercial invoice calculator ensures wholesale discounts and destination tax treatments remain strictly aligned.",
  },
];

export default function WholesalePriceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Wholesale & Retail Keystone Pricing Calculator"
      intro="Compute B2B wholesale prices, target retailer MSRP keystone tiers, multi-stage gross profit spreads, and production batch volume profitability."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Wholesale Pricing is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              To calculate wholesale price, mark up landed Cost of Goods Sold (COGS) to achieve brand margin: Wholesale Price = COGS &times; (1 + Wholesale Markup%). Recommended Retail Price (MSRP) is then calculated by applying retailer markup: Retail MSRP = Wholesale Price &times; (1 + Retail Markup%). Keystone pricing doubles wholesale cost to yield a 50% retail margin. Merchandisers calibrate cost markups with the <Link href="/calculators/business/markup-calculator">markup calculator</Link>, audit factory outlays via the <Link href="/calculators/business/cogs-calculator">COGS solver</Link>, and verify bottom-line operating returns in the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: Supply Chain Price Stacking & Margin Distribution</h2>
          <p>
            The chart below visualizes the compounding value stack as products transition from landed manufacturing cost to wholesale selling price and final retail keystone MSRP.
          </p>

          <WholesaleRetailKeystonePricingChart />

          <h2>First-Principles Wholesale & Retail Pricing Architecture</h2>
          <p>
            Establishing an economically viable multi-tier supply chain requires balancing manufacturing costs with brand operating margins and retail partner profitability:
          </p>
          <Formula>
            {"\\text{Wholesale Price} = \\text{Landed COGS} \\times (1 + M_{\\text{wholesale}}) = \\frac{\\text{Landed COGS}}{1 - G_{\\text{wholesale}}}"}
          </Formula>
          <p>
            Where M_wholesale is the brand markup over cost, and G_wholesale is the resulting wholesale gross profit margin:
          </p>
          <Formula>
            {"G_{\\text{wholesale}} = \\left( \\frac{\\text{Wholesale Price} - \\text{Landed COGS}}{\\text{Wholesale Price}} \\right) \\times 100\\%"}
          </Formula>
          <p>
            Next, downstream wholesale retail stockists apply retail markup to establish the Manufacturer&apos;s Suggested Retail Price (MSRP):
          </p>
          <Formula>
            {"\\text{MSRP} = \\text{Wholesale Price} \\times (1 + M_{\\text{retail}}) = \\frac{\\text{Wholesale Price}}{1 - G_{\\text{retail}}}"}
          </Formula>
          <p>
            Under traditional keystone merchandising where retail markup equals 100% (a 2.0x multiplier), retail margin evaluates to exactly:
          </p>
          <Formula>
            {"G_{\\text{keystone}} = \\left( \\frac{2 \\times \\text{Wholesale} - \\text{Wholesale}}{2 \\times \\text{Wholesale}} \\right) \\times 100\\% = 50.00\\%"}
          </Formula>
          <p>
            Brand managers model seasonal volume discounts using the <Link href="/calculators/business/discount-calculator">discount calculator</Link>, structure commercial billing via the <Link href="/calculators/business/invoice-calculator">invoice calculator</Link>, and track physical warehouse loss with the <Link href="/calculators/business/shrinkage-calculator">inventory shrinkage calculator</Link>.
          </p>

          <h2>Supply Chain Margin Allocation Benchmarks by Industry Sector</h2>
          <p>
            The table below contrasts standard brand wholesale margins, retail dealer margins, keystone multiples, and minimum order commitments across leading physical merchandise verticals.
          </p>

          <DataTable
            head={["Merchandising Vertical", "Brand Wholesale Margin", "Retail Dealer Margin", "MSRP Multiplier (Over COGS)", "Typical Wholesale MOQ Commit"]}
            rows={[
              ["Apparel & Specialty Fashion", "45% - 55%", "50% - 60% (Keystone+)", "4.0x - 5.5x Landed Cost", "50 - 250 units per style/color"],
              ["Packaged Specialty Food & Beverage", "30% - 40%", "35% - 45%", "2.5x - 3.2x Landed Cost", "Master case packs (500+ units)"],
              ["Consumer Electronics & Hardware", "22% - 32%", "30% - 40%", "2.0x - 2.8x Landed Cost", "Pallet tiers (100 - 500 units)"],
              ["Fine Jewelry & Luxury Accessories", "55% - 70%", "55% - 65% (Double Keystone)", "6.0x - 10.0x Landed Cost", "Low MOQ ($2,500 opening order)"],
              ["Home Goods & Furniture", "40% - 50%", "50% - 55% (Keystone)", "3.5x - 4.5x Landed Cost", "Container load / LTL pallet"],
              ["Cosmetics & Personal Skincare", "60% - 75%", "50% - 60%", "6.0x - 8.0x Landed Cost", "1,000+ units per SKU batch"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Premium Ceramic Cookware Brand Wholesale Launch</h3>
          <p>
            A direct-to-consumer kitchenware brand designs a non-stick ceramic skillet. Landed manufacturing cost from their overseas fabrication partner is $16.50 per unit (including raw casting, ceramic coating, custom packaging, ocean freight, and customs duty). The brand prepares to distribute through nationwide gourmet department stores that demand standard keystone pricing (50% retail margin). The brand targets a 45.0% wholesale gross margin:
          </p>
          <ol>
            <li>
              <strong>Compute required wholesale price to achieve 45% brand margin:</strong>
              <br />
              Wholesale Price = $16.50 / (1 - 0.45) = $16.50 / 0.55 = $30.00.
              <br />
              Brand Wholesale Profit = $30.00 - $16.50 = $13.50 per unit.
            </li>
            <li>
              <strong>Calculate retail MSRP using retailer keystone standard:</strong>
              <br />
              Keystone Retail MSRP = $30.00 &times; 2.0 = $60.00 (50.0% retailer gross margin).
              <br />
              Retailer Dollar Profit = $60.00 - $30.00 = $30.00 per unit sold.
            </li>
            <li>
              <strong>Evaluate production batch volume economics (5,000 units):</strong>
              <br />
              Total Production Capital = 5,000 &times; $16.50 = $82,500.00.
              <br />
              Gross Wholesale Revenue = 5,000 &times; $30.00 = $150,000.00.
              <br />
              Total Brand Gross Profit = $150,000.00 - $82,500.00 = $67,500.00.
            </li>
            <li>
              <strong>Commercial Distribution Integration:</strong> Management models e-commerce channel parity via the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link> and verifies operating break-even in the <Link href="/calculators/business/break-even-calculator">break-even point solver</Link>.
            </li>
          </ol>

          <h3>Case Study B: Specialty Craft Brewery Distributor Wholesale Stacking</h3>
          <p>
            A craft brewing company cans an imperial IPA. Brewing ingredients, aluminum cans, labels, and packaging labor yield a unit cost of $3.20 per 4-pack. The brewery operates in a three-tier alcoholic beverage distribution state (Brewery &rarr; Wholesale Distributor &rarr; Retail Store):
          </p>
          <ol>
            <li>
              <strong>Calculate Tier-1 Brewery to Distributor Wholesale Price:</strong>
              <br />
              Brewery targets 36.0% margin: Distributor Price = $3.20 / (1 - 0.36) = $5.00.
              <br />
              Brewery Profit = $1.80 per 4-pack.
            </li>
            <li>
              <strong>Compute Tier-2 Distributor to Retailer Wholesale Price:</strong>
              <br />
              Distributor applies a 25.0% margin: Retail Wholesale Price = $5.00 / (1 - 0.25) = $6.67.
              <br />
              Distributor Profit = $1.67 per 4-pack.
            </li>
            <li>
              <strong>Establish Tier-3 Final Shelf Price to Consumer:</strong>
              <br />
              Retail liquor store applies a 33.3% margin: Shelf Price = $6.67 / (1 - 0.333) = $9.99.
              <br />
              Retailer Profit = $3.32 per 4-pack.
            </li>
            <li>
              <strong>Treasury Management Alignment:</strong> The brewery monitors capital equipment debt in the <Link href="/calculators/business/business-loan-calculator">business loan calculator</Link> and tracks production labor with the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link>.
            </li>
          </ol>

          <h2>Minimum Advertised Price (MAP) Policies & Channel Conflict</h2>
          <p>
            When brands sell through both direct-to-consumer (DTC) websites and wholesale retail networks, severe channel conflict can arise if wholesale retailers discount products below the brand&apos;s published MSRP. To protect brand equity and preserve authorized dealer profitability, manufacturers institute strict Minimum Advertised Price (MAP) policies.
          </p>
          <p>
            Under US antitrust law (established in Leegin Creative Leather Products v. PSKS, Inc.), unilateral MAP policies are legally enforceable provided the manufacturer does not illegally collude on actual point-of-sale checkout prices. Enforcing MAP prevents rogue marketplace liquidators from cannibalizing brick-and-mortar showroom partners.
          </p>


          <p>
            In international consumer packaged goods (CPG) distribution, brand manufacturers structure tiered wholesale price schedules linked directly to annual purchasing volumes. Establishing formal Volume Incentive Rebates (VIR) rewards high-volume retail partners who exceed annual sales targets with retroactive 2% to 5% cash rebates. This incentivizes retail store buyers to allocate premium aisle placement and end-cap displays to the brand&apos;s product catalog without compromising baseline wholesale invoice pricing.
          </p>
          <p>
            Additionally, commercial wholesale contracts mandate clear freight delivery terms under international Incoterms 2020 rules. Specifying whether wholesale shipments are priced FOB Shipping Point (where the wholesale buyer assumes freight costs and transit liability upon carrier pickup) or FOB Destination (where the brand manufacturer pays freight and retains title until dock arrival) prevents contentious shipping damage disputes and preserves gross margin predictability across national distributor networks.
          </p>
          <p>
            Wholesale brand directors also establish strict return-to-vendor (RTV) policies, capping unsellable merchandise allowances at 1.0% to 2.0% of total wholesale shipments, preventing retail partners from treating wholesale inventory as risk-free consignment stock.
          </p>

          <h2>Operational Pitfalls in Wholesale Pricing Execution</h2>
          <ol>
            <li>
              <strong>Setting Wholesale Prices Based on Factory Quotes Without Freight:</strong> Calculating wholesale markups on raw FOB factory prices while omitting inbound freight, harbor maintenance fees, and customs duties severely compresses brand margins.
            </li>
            <li>
              <strong>Ignoring Retailer Margin Requirements:</strong> Offering retailers an inadequate 30% margin on apparel or giftware results in retail buyers rejecting the line, as brick-and-mortar stores require a 50% keystone spread to remain profitable.
            </li>
            <li>
              <strong>Failure to Structure Volume Tier Breaks:</strong> Offering large enterprise distributors the same wholesale price as small independent boutiques eliminates volume incentives and damages enterprise relationships.
            </li>
            <li>
              <strong>Underestimating Payment Term Cash Drag:</strong> Wholesaling on Net 60 terms without factoring in cost of capital or invoice factoring fees creates acute working capital shortfalls while waiting for retailer disbursements.
            </li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is the retail MSRP typically four times the manufacturing cost?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The traditional &quot;rule of four&quot; in physical product merchandising reflects two successive doubling stages: the manufacturer doubles landed COGS to establish the wholesale price (yielding a 50% brand gross margin), and the retailer doubles that wholesale price to establish retail MSRP (keystone pricing, yielding a 50% retail gross margin).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do wholesale trade discounts differ from retail markdowns?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A wholesale trade discount is a reduction off published MSRP granted to business stockists based on order volume or distribution tier. A retail markdown is a consumer price reduction initiated by the retailer to stimulate demand or liquidate slow-moving inventory.
              </p>
            </div>
          </div>


          <p>
            In consumer goods manufacturing, brand executives conduct annual price-yield reviews across all wholesale SKU lines. Adjusting baseline wholesale markups to reflect shifting raw material commodity costs protects brand gross margins from inflationary supplier cost increases.
          </p>


          <p>
            Furthermore, wholesale brand managers track retailer sell-through velocity to ensure reorder frequency remains healthy across seasonal catalog transitions and holiday promotional cycles.
          </p>

          <h2>Authoritative Trade Standards & Legal Regulatory Citations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>United States Supreme Court (Leegin Creative Leather Products, Inc. v. PSKS, Inc., 551 U.S. 877):</strong> Legal framework governing resale price maintenance and vertical price restrictions.
            </li>
            <li>
              <strong>Robinson-Patman Act (15 U.S.C. Section 13):</strong> Federal statutory prohibitions against unlawful price discrimination among competing wholesale purchasers.
            </li>
            <li>
              <strong>National Retail Federation (NRF Merchandising Best Practices):</strong> Standard definitions and formulas for keystone markup, inventory turnover, and open-to-buy planning.
            </li>
            <li>
              <strong>Uniform Commercial Code (UCC Article 2 - Sales):</strong> Statutory contract formation rules governing wholesale purchase orders, warranties, and passage of title.
            </li>
          </ul>
        </>
      }
    >
      <WholesalePriceCalculatorComponent />
    </CalcPage>
  );
}
