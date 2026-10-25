import type { Metadata } from "next";
import Link from "next/link";
import DiscountCalculatorComponent from "@/components/calcs/business/discount-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DiscountMarginErosionCurveChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/discount-calculator";
const TITLE = "Discount Calculator | Price Reduction, Stacked Coupons & Tax Solver";
const DESCRIPTION =
  "Calculate promotional retail discounts, stacked coupon reductions, effective percentage savings, and final post-tax prices across commercial commerce.";

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
  { href: "/calculators/business/markup-calculator", icon: "🏷️", name: "Markup Calculator" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/sales-tax-calculator", icon: "🧾", name: "Sales Tax Calculator" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "Cost of Goods Sold" },
];

const FAQ_ITEMS = [
  {
    q: "How does a stacked or double discount work mathematically?",
    a: "Stacked discounts do not simply add together. A 20% discount followed by an additional 10% coupon applies sequentially: the secondary 10% discount is calculated on the already-discounted price, not the original retail price. Mathematically: Final Price = Original Price × (1 - 0.20) × (1 - 0.10) = Original Price × 0.72 (a 28% net discount, not 30%).",
  },
  {
    q: "Why does price discounting severely erode commercial operating profit?",
    a: "Fixed overhead and direct product costs remain unchanged during a sale. If a product costs $60 to manufacture and sells for $100 ($40 profit), offering a 20% discount drops the price to $80, cutting profit in half to $20. The business must sell 100% more units just to maintain original dollar gross profit.",
  },
  {
    q: "Is sales tax applied before or after promotional discounts?",
    a: "In virtually all legal jurisdictions, sales tax is calculated on the final discounted purchase price rather than the original manufacturer's suggested retail price (MSRP). However, manufacturer rebates funded by a third party may still be taxed on the pre-rebate price in specific states.",
  },
  {
    q: "What is trade discounting versus consumer retail discounting?",
    a: "A consumer discount is a temporary promotional reduction offered to end shoppers. A trade discount is a permanent, negotiated price concession granted to wholesale distributors, commercial resellers, or volume B2B buyers based on order volume, payment velocity, or functional distribution roles.",
  },
];

export default function DiscountCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Commercial Discount Calculator"
      intro="Compute final promotional selling prices, multi-tiered stacked coupon savings, blended percentage reductions, and post-tax customer checkout totals."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Discounts are Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              To calculate a discounted price, multiply the original retail price by (1 minus the discount rate expressed as a decimal): Final Price = Original Price × (1 - Discount%). For example, a $150 item with a 25% discount costs $112.50 ($37.50 total savings). When applying an additional stacked 10% coupon, the secondary reduction applies to $112.50, yielding $101.25. Merchandisers evaluate baseline price markups with the <Link href="/calculators/business/markup-calculator">markup calculator</Link> and calculate state checkout taxes via the <Link href="/calculators/business/sales-tax-calculator">sales tax calculator</Link>.
            </p>
          </div>

          <h2>Discount Margin Erosion & Required Sales Volume Expansion</h2>
          <p>
            Discounting is a double-edged sword. While promotional price drops stimulate immediate transaction velocity, they disproportionately erode operating profitability unless offset by significant volume elasticity.
          </p>

          <DiscountMarginErosionCurveChart />

          <h2>First-Principles Discount Mathematics & Multi-Tier Compounding</h2>
          <p>
            Commercial discounting encompasses simple single-tier markdowns, promotional coupon stacking, and volume-based progressive tiers. For a single promotional markdown (d₁):
          </p>
          <Formula>
            {"P_{\text{discounted}} = P_0 \cdot (1 - d_1), \quad \text{Savings} = P_0 \cdot d_1"}
          </Formula>
          <p>
            When customers combine multiple sequential promotions (such as a 20% seasonal clearance sale combined with a 10% loyalty member coupon), discounts compound multiplicatively rather than additively:
          </p>
          <Formula>
            {"P_{\text{final}} = P_0 \cdot \prod_{i=1}^{n} (1 - d_i) = P_0 \cdot (1 - d_1) \cdot (1 - d_2) \dots (1 - d_n)"}
          </Formula>
          <p>
            The effective blended discount percentage (d_effective) across all sequential tiers is:
          </p>
          <Formula>
            {"d_{\text{effective}} = 1 - \prod_{i=1}^{n} (1 - d_i) = 1 - \left[ (1 - d_1) \cdot (1 - d_2) \dots (1 - d_n) \right]"}
          </Formula>
          <p>
            Retail merchandisers evaluate unit manufacturing floors using the <Link href="/calculators/business/cogs-calculator">COGS calculator</Link>, model e-commerce cart margins with the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link>, and balance volume shifts through the <Link href="/calculators/business/break-even-calculator">break-even point solver</Link>.
          </p>

          <h2>Retail Discounting Tiers & Margin Elasticity Reference</h2>
          <p>
            The table below demonstrates the relationship between initial gross margins, promotional discount depth, and the mandatory sales volume expansion required to maintain dollar gross profit parity.
          </p>

          <DataTable
            head={["Initial Gross Margin", "Promotional Discount", "New Gross Margin", "Unit Profit Loss (%)", "Required Sales Volume Surge"]}
            rows={[
              ["50% ($50 on $100)", "10% Off ($90)", "44.4% ($40 on $90)", "-20.0%", "+25.0% Volume"],
              ["50% ($50 on $100)", "20% Off ($80)", "37.5% ($30 on $80)", "-40.0%", "+66.7% Volume"],
              ["40% ($40 on $100)", "15% Off ($85)", "29.4% ($25 on $85)", "-37.5%", "+60.0% Volume"],
              ["40% ($40 on $100)", "25% Off ($75)", "20.0% ($15 on $75)", "-62.5%", "+166.7% Volume"],
              ["30% ($30 on $100)", "10% Off ($90)", "22.2% ($20 on $90)", "-33.3%", "+50.0% Volume"],
              ["30% ($30 on $100)", "20% Off ($80)", "12.5% ($10 on $80)", "-66.7%", "+200.0% Volume"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Black Friday Omni-Channel Retail Flash Sale</h3>
          <p>
            A high-end electronics retailer discounts a premium wireless noise-canceling headphone package from its original retail price of $349.99. During a Black Friday flash sale, the store offers a storewide 20% holiday discount. Premier rewards loyalty members receive an additional stacked 15% VIP promo code at online checkout. State and local sales tax is 8.25%.
          </p>
          <ol>
            <li>
              <strong>Calculate first-tier promotional markdown:</strong>
              <br />
              Price after 20% discount = $349.99 × (1 - 0.20) = $279.99.
              <br />
              Initial Savings = $70.00.
            </li>
            <li>
              <strong>Calculate stacked secondary VIP coupon reduction:</strong>
              <br />
              Final pre-tax price = $279.99 × (1 - 0.15) = $237.99.
              <br />
              Secondary Savings = $42.00.
              <br />
              Total Pre-Tax Savings = $349.99 - $237.99 = $112.00.
              <br />
              Effective Discount = 1 - [(1 - 0.20) × (1 - 0.15)] = 1 - 0.68 = 32.0% (not 35%).
            </li>
            <li>
              <strong>Add sales tax for final customer checkout:</strong>
              <br />
              Sales Tax = $237.99 × 8.25% = $19.63.
              <br />
              Total Customer Checkout = $237.99 + $19.63 = $257.62. Retailers confirm gross profitability using the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>.
            </li>
          </ol>

          <h3>Case Study B: B2B Early Payment Commercial Cash Discount (2/10 Net 30)</h3>
          <p>
            A wholesale industrial supplier delivers $85,000 in bulk electrical wiring to an electrical contractor on standard commercial trade credit terms of &quot;2/10 Net 30&quot;. The contractor evaluates whether to remit payment within 10 days to claim the 2% early settlement discount or retain cash until day 30.
          </p>
          <ol>
            <li>
              <strong>Compute cash savings from early discount:</strong>
              <br />
              Discount Amount = $85,000 × 2% = $1,700 cash savings.
              <br />
              Net Settlement Remittance = $85,000 - $1,700 = $83,300.
            </li>
            <li>
              <strong>Calculate annualized implied interest rate of forfeiting discount:</strong>
              <br />
              The contractor gives up $1,700 to hold $83,300 for an additional 20 days (Day 30 - Day 10).
              <br />
              Annualized Implied Rate = ($1,700 / $83,300) × (365 days / 20 days) = 2.04% × 18.25 = 37.23% APR!
            </li>
            <li>
              <strong>Commercial Finance Conclusion:</strong> Forfeiting a 2% early payment discount equates to taking an exorbitantly expensive short-term loan at 37.23% annualized interest. The contractor pays on Day 10, managing invoice billing cycles with the <Link href="/calculators/business/invoice-calculator">invoice terms calculator</Link> and financing working capital via the <Link href="/calculators/business/business-loan-calculator">business loan solver</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Brand Devaluation Risks</h2>
          <ol>
            <li>
              <strong>Customer Reference Price Anchoring:</strong> Running perpetual or hyper-frequent promotional discount campaigns permanently lowers customer perceived value. Shoppers become conditioned never to purchase at full retail price, destroying brand pricing power and forcing the merchant into permanent margin compression.
            </li>
            <li>
              <strong>Negative Channel Conflict with Wholesale Partners:</strong> Heavy direct-to-consumer discounting alienates wholesale retail partners who purchased inventory under Minimum Advertised Price (MAP) agreements. Breaching MAP agreements triggers partner returns and loss of key commercial shelf space.
            </li>
            <li>
              <strong>Coupon Leakage and Affiliate Hijacking:</strong> Promotional coupon codes intended for specific email segments or influencer audiences frequently leak onto public coupon browser extensions. When high-intent buyers ready to pay full price automatically receive coupons at checkout, the merchant suffers 100% margin leakage without gaining incremental conversions.
            </li>
          </ol>

          <h2>Price Elasticity of Demand & Promotional Yield Management</h2>
          <p>
            Economists and pricing strategists evaluate discount campaigns using the Price Elasticity of Demand (PED), measuring the responsiveness of sales unit volume to percentage changes in price:
          </p>
          <Formula>
            {"\text{PED} = \frac{\% \Delta Q}{\% \Delta P} = \frac{(Q_1 - Q_0) / Q_0}{(P_1 - P_0) / P_0}"}
          </Formula>
          <p>
            If demand is inelastic (|PED| &lt; 1.0), cutting price by 20% increases unit sales by less than 20%, resulting in a net decline in total gross revenue and catastrophic profit loss. Conversely, if demand is highly elastic (|PED| &gt; 2.5), discount promotions generate massive volume surges that expand gross operating profits. Merchandisers integrate elasticity modeling with the <Link href="/calculators/business/wholesale-price-calculator">wholesale pricing calculator</Link>, track customer lifetime value via the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>, and model total revenue streams with the <Link href="/calculators/business/business-revenue-calculator">business revenue calculator</Link>.
          </p>
          <p>
            In modern dynamic revenue management systems (such as airline seat yields and hotel booking engines), algorithmic pricing engines adjust discount depth dynamically based on booking lead times and real-time competitor scrapers, ensuring maximum load factor without triggering premature price wars.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is a 50% discount not the opposite of a 50% markup?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Markup and discount percentages are calculated on completely different bases. If an item costs $100 and you mark it up by 50%, the selling price is $150. However, if you then discount that $150 item by 50%, the price drops to $75 (a $25 loss below your original cost!). To return from $150 back to $100, you need a 33.3% discount, not 50%. Compare both metrics with our <Link href="/calculators/business/markup-calculator">markup calculator</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do Buy-One-Get-One (BOGO) promotions compare to percentage discounts?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A &quot;Buy One, Get One Free&quot; promotion is mathematically identical to a 50% discount on two items, but it forces the shopper to purchase double the unit volume, clearing inventory twice as fast. A &quot;Buy One, Get One 50% Off&quot; equates to an effective 25% discount across the two-unit cart bundle, protecting merchant gross margins while still delivering an attractive headline value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Can discounting ever be used strategically by a profitable business?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Yes. Strategic discounting is highly effective for clearing out slow-moving or obsolete seasonal inventory to liberate cash for fresh stock, acquiring high-LTV customers who repurchase repeatedly at full price, and generating initial customer reviews and social proof for newly launched products.
              </p>
            </div>
          </div>


          <p>
            In omnichannel retail distribution, managing minimum advertised price (MAP) policies requires automated price-monitoring crawlers. When unauthorized third-party resellers discount inventory below contractually agreed MAP thresholds, automated enforcement letters protect brand equity and preserve authorized dealer margins across major marketplace channels.
          </p>

          <h2>Authoritative Consumer Protection Standards & Trade Guidelines</h2>
          <p>
            For legal guidelines governing retail price representations, deceptive pricing prohibitions, and promotional discount disclosures, refer to:
          </p>
          <ul>
            <li>
              <strong>Federal Trade Commission (FTC Guides Against Deceptive Pricing, 16 CFR Part 233):</strong> Legal Standards for Former Price Comparisons and Manufacturer Retail Price Claims.
            </li>
            <li>
              <strong>National Retail Federation (NRF Pricing Best Practices):</strong> Industry Benchmarks for Clearance Markdown Schedules and Promotional Cadence.
            </li>
            <li>
              <strong>European Union Directive 98/6/EC (Price Indication Directive):</strong> Mandatory Display of Previous Lowest Price (30-Day Rule) on Discounted Goods.
            </li>
            <li>
              <strong>Uniform Commercial Code (UCC Article 2):</strong> Commercial Sales of Goods, Trade Discount Terms, and Contractual Price Concessions.
            </li>
          </ul>
        </>
      }
    >
      <DiscountCalculatorComponent />
    </CalcPage>
  );
}
