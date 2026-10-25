import type { Metadata } from "next";
import Link from "next/link";
import EcommerceProfitCalculatorComponent from "@/components/calcs/business/ecommerce-profit-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EcommerceCostWaterfallChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/ecommerce-profit-calculator";
const TITLE = "E-Commerce Profit Calculator | Store Margins & ROAS Unit Economics Solver";
const DESCRIPTION =
  "Calculate online store net profit, return on ad spend (ROAS), payment processing fees, 3PL fulfillment expenses, and true landed product margins.";

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
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "Cost of Goods Sold" },
  { href: "/calculators/business/cac-calculator", icon: "🎯", name: "Customer Acquisition Cost" },
  { href: "/calculators/business/ltv-calculator", icon: "💎", name: "Customer Lifetime Value" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount Calculator" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
];

const FAQ_ITEMS = [
  {
    q: "Why do many fast-growing e-commerce stores fail to generate net profit?",
    a: "E-commerce brands often focus exclusively on top-line revenue (GMV) or front-end Return on Ad Spend (ROAS) while ignoring hidden variable leakages: payment gateway processing fees, pick-and-pack warehouse surcharges, return shipping costs, damaged inventory, and customer service payroll, turning apparent marketing profits into net operating losses.",
  },
  {
    q: "What is a healthy net profit margin for a direct-to-consumer (DTC) brand?",
    a: "In modern direct-to-consumer retail, a net profit margin of 10% to 15% (after all COGS, ad spend, fulfillment, payment fees, and software overhead) is considered solid, while 15% to 20%+ represents elite operational efficiency. Stores operating below 8% net margin risk becoming unprofitable with minor shifts in ad costs.",
  },
  {
    q: "How does product return rate alter e-commerce unit economics?",
    a: "Returns are devastating to e-commerce profitability: the merchant pays for outbound shipping, inbound return freight, warehouse inspection labor, and repackaging fees, while the returned item often cannot be resold as new. In fashion apparel where return rates average 25% to 35%, accounting for return reverse logistics is critical.",
  },
  {
    q: "What is the difference between ROAS and Marketing Efficiency Ratio (MER)?",
    a: "Return on Ad Spend (ROAS) measures revenue attributed directly to specific ad campaigns (Attributed Revenue / Ad Spend), which is prone to pixel tracking errors. Marketing Efficiency Ratio (MER), also known as Blended ROAS, measures total store revenue divided by total marketing spend across all channels, providing an unskewed top-level efficiency metric.",
  },
];

export default function EcommerceProfitCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="E-Commerce Profit Calculator"
      intro="Compute net operating profit, return on ad spend (ROAS), blended marketing efficiency, and unit fulfillment margins across Shopify, Amazon, and DTC commerce platforms."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How E-Commerce Net Profit is Determined</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              E-commerce net profit equals gross store sales minus the sum of landed product COGS, paid digital ad spend, 3PL pick-pack and shipping fees, payment gateway transaction costs, and app software subscriptions: Net Profit = GMV - (COGS + Ads + Shipping + Payment Fees + Overhead). For example, generating $85,000 GMV with $23,800 COGS (28%), $24,000 ad spend, $8,250 fulfillment, and $3,050 gateway fees leaves $25,900 in net profit (30.47% net margin). Monitor manufacturing cost floors via the <Link href="/calculators/business/cogs-calculator">COGS calculator</Link> and track customer acquisition efficiency using the <Link href="/calculators/business/cac-calculator">customer acquisition cost calculator</Link>.
            </p>
          </div>

          <h2>E-Commerce $100 Order Value Net Profit Waterfall Decomposition</h2>
          <p>
            Examining a standardized $100 average order value (AOV) illustrates how revenue cascades through variable operating expenses before reaching true retained net profit.
          </p>

          <EcommerceCostWaterfallChart />

          <h2>First-Principles E-Commerce Unit Economics & Contribution Margins</h2>
          <p>
            In digital commerce, store profitability is governed by four distinct contribution margin tiers. Contribution Margin 1 (CM1) measures gross product profit after direct production:
          </p>
          <Formula>
            {"\text{CM1} = \text{Gross Merchandise Value (GMV)} - \text{Landed Product COGS}"}
          </Formula>
          <p>
            Contribution Margin 2 (CM2) subtracts direct pick, pack, and shipping fulfillment expenses:
          </p>
          <Formula>
            {"\text{CM2} = \text{CM1} - \sum (\text{Outbound Freight} + \text{3PL Pick \& Pack} + \text{Packaging Material})"}
          </Formula>
          <p>
            Contribution Margin 3 (CM3), or Order Contribution Margin, subtracts variable payment processing fees and direct performance advertising outlays:
          </p>
          <Formula>
            {"\text{CM3} = \text{CM2} - \text{Paid Ad Spend} - \text{Payment Gateway Fees (2.9\% + \$0.30/tx)}"}
          </Formula>
          <p>
            Finally, Operating Net Profit subtracts fixed operating overhead (Shopify apps, corporate salaries, warehouse storage, and returns processing):
          </p>
          <Formula>
            {"\text{Net Profit} = \text{CM3} - \text{Fixed Software Overhead} - \text{Net Return Losses}"}
          </Formula>
          <p>
            Store founders integrate contribution tiers with <Link href="/calculators/business/break-even-calculator">store break-even calculations</Link>, evaluate long-term repurchase value via the <Link href="/calculators/business/ltv-calculator">customer lifetime value tool</Link>, and model sales discounting strategies using the <Link href="/calculators/business/discount-calculator">discount calculator</Link>.
          </p>

          <h2>E-Commerce Operational Cost Benchmarks & Platform Standards</h2>
          <p>
            The table below compiles industry standard percentage allocations, average order values, and target profit margins across prominent online retail merchandise categories.
          </p>

          <DataTable
            head={["Merchandise Category", "Typical Landed COGS", "Ad Spend Ratio (% Sales)", "Fulfillment & Shipping", "Target Net Profit Margin"]}
            rows={[
              ["Health Supplements & Wellness", "15% – 25%", "30% – 45%", "8% – 12%", "15% – 25%"],
              ["Apparel & Footwear", "25% – 35%", "25% – 35%", "12% – 18% (High Returns)", "8% – 15%"],
              ["Beauty & Cosmetics", "12% – 20%", "35% – 50%", "6% – 10%", "15% – 22%"],
              ["Home Goods & Furniture", "35% – 48%", "20% – 30%", "18% – 28% (Heavy Freight)", "7% – 12%"],
              ["Consumer Electronics", "50% – 65%", "15% – 25%", "6% – 10%", "5% – 10%"],
              ["Specialty Gourmet Food", "30% – 42%", "22% – 32%", "14% – 22% (Cold Chain)", "8% – 14%"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Scaling Direct-to-Consumer Skincare Brand</h3>
          <p>
            A DTC skincare brand generates $120,000 in monthly Shopify gross sales across 2,000 completed customer orders (Average Order Value = $60.00). Landed product manufacturing and packaging costs are $15.00 per unit ($30,000 total COGS). The brand spends $36,000 per month on Meta and Google Ads. 3PL warehousing pick, pack, and postage costs $6.50 per order ($13,000 total). Payment gateway fees (Shopify Payments / Stripe) average 2.9% + $0.30 per transaction ($4,080 total). Monthly software app subscriptions (Klaviyo, Gorgias, Recharge) total $2,500.
          </p>
          <ol>
            <li>
              <strong>Calculate Contribution Margin 3 (Marketing Contribution):</strong>
              <br />
              Gross Revenue = $120,000.
              <br />
              Total Variable Costs = $30,000 (COGS) + $13,000 (Shipping) + $4,080 (Gateway) + $36,000 (Ads) = $83,080.
              <br />
              CM3 = $120,000 - $83,080 = $36,920 (30.77% margin).
            </li>
            <li>
              <strong>Determine final net operating profit:</strong>
              <br />
              Net Profit = $36,920 (CM3) - $2,500 (Software) = $34,420 per month.
              <br />
              Net Profit Margin = ($34,420 / $120,000) × 100% = 28.68%.
              <br />
              Return on Ad Spend (ROAS) = $120,000 / $36,000 = 3.33×. The CEO evaluates customer retention using the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: High-Volume Apparel Brand Returns Sensitivity</h3>
          <p>
            An online athleisure brand generates $250,000 monthly sales with an initial projected net margin of 14% ($35,000 net profit). However, due to sizing inconsistencies in a new leggings line, customer returns surge from a normal 12% to an unprecedented 28% of total orders.
          </p>
          <ol>
            <li>
              <strong>Evaluate revenue and refund impact:</strong>
              <br />
              Gross Sales = $250,000.
              <br />
              Refunded Sales (28%) = $70,000 lost revenue.
              <br />
              Net Retained Sales = $180,000.
            </li>
            <li>
              <strong>Quantify reverse logistics losses:</strong>
              <br />
              The brand incurs $8.50 in unrecoverable two-way shipping, inspection, and restocking fees on every returned order (800 returned orders × $8.50 = $6,800).
              <br />
              Additionally, 15% of returned garments are unsellable due to wear, causing a $3,600 inventory write-off.
            </li>
            <li>
              <strong>Operational Net Result:</strong> Monthly net operating income collapses from +$35,000 down to -$4,200 (a severe operating loss). Management re-engineers product sizing charts, evaluates wholesale vendor margins using the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>, and tracks inventory losses through the <Link href="/calculators/business/shrinkage-calculator">shrinkage calculator</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Digital Advertising Attribution Pitfalls</h2>
          <ol>
            <li>
              <strong>Post-iOS 14.5 Tracking Degradation:</strong> Browser cookie restrictions and mobile privacy frameworks (Apple ATT) have degraded pixel tracking accuracy. Ad platforms routinely over-report attributed sales by 25% to 50% through generous view-through attribution windows. Relying on platform-reported ROAS rather than bank-settled cash receipts leads to severe overspending.
            </li>
            <li>
              <strong>Customer Chargeback Ratios & Merchant Account Holds:</strong> If customer credit card chargebacks exceed 1.0% of total transaction volume, payment processors (Visa, Mastercard, Stripe) place merchants into excessive chargeback monitoring programs, imposing 10% to 20% rolling reserves on all gross sales or freezing funds entirely for 180 days.
            </li>
            <li>
              <strong>Dimensional Weight (DIM) Shipping Surcharges:</strong> Freight carriers (UPS, FedEx, USPS) bill package delivery based on Dimensional Weight (Length × Width × Height / 139) rather than actual weight. Bulky, lightweight products (pillows, outerwear) incur severe shipping surcharges that consume up to 30% of total product revenue.
            </li>
          </ol>

          <h2>First-Party Data Analytics & Automated Retention Funnels</h2>
          <p>
            To combat escalating customer acquisition costs, leading e-commerce operators focus on Owned Media retention channels: automated SMS and email lifecycle funnels that drive high-margin repeat purchases without incurring incremental ad spend. The mathematical formula for blended e-commerce equity is:
          </p>
          <Formula>
            {"\text{Net Store Cashflow} = (\text{New Customers} \times \text{First-Order Margin}) + (\text{Repeat Customers} \times \text{Organic Margin})"}
          </Formula>
          <p>
            Because repeat orders bypass paid search and social media bidding auctions, organic customer reorders frequently achieve net profit margins exceeding 45%. Merchandisers integrate email revenue metrics with <Link href="/calculators/business/business-revenue-calculator">annualized revenue models</Link>, calculate sales tax obligations through the <Link href="/calculators/business/sales-tax-calculator">sales tax calculator</Link>, and evaluate capital returns using the <Link href="/calculators/business/roi-calculator">ROI calculator</Link>.
          </p>
          <p>
            In automated fulfillment centers, computer vision algorithms scan incoming return parcels, classifying garments into immediate restock, garment steaming, or outlet liquidation streams. This automated triage compresses return cycle times from three weeks to 48 hours, preserving working capital velocity.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is a good break-even ROAS for an e-commerce store?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Break-even ROAS is calculated as 1 divided by your pre-marketing gross margin: Break-Even ROAS = 1 / (Gross Margin %). If your landed product COGS, shipping, and payment fees total 40% of revenue (leaving a 60% gross margin), your break-even ROAS is 1 / 0.60 = 1.67×. Any advertising campaign performing below 1.67× ROAS loses money on the first order.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do e-commerce brands improve their Average Order Value (AOV)?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Merchants expand AOV by implementing free shipping thresholds (e.g., &quot;Free Shipping on Orders Over $75&quot;), post-purchase one-click upsells, bundled product kits, and tiered volume discounts. Increasing AOV by 20% dramatically expands net margins because fixed shipping pick fees and payment per-transaction fees remain constant.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why are payment gateway fees higher for international cards?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Payment processors charge an extra cross-border surcharge (typically +1.0% to +1.5%) plus currency conversion fees (1.0% to 2.0%) for international transactions. For an international sale, standard 2.9% fees can surge to 4.9% to 5.5% of gross revenue, quietly eroding international profitability unless international prices are calibrated upward.
              </p>
            </div>
          </div>


          <p>
            In direct-to-consumer fulfillment networks, optimizing inventory split across regional fulfillment centers dramatically reduces shipping transit zones. Distributing fast-moving inventory across East Coast, Midwest, and West Coast 3PL nodes compresses carrier shipping expenses from Zone 7 ($12.50/package) down to Zone 2 ($6.20/package), immediately saving thousands of dollars per month in fulfillment overhead.
          </p>
          <p>
            Furthermore, e-commerce brand operators track package dimensional weight divisor optimizations. Custom-engineered corrugated shipping boxes that eliminate void space prevent carriers from billing lightweight goods at inflated dimensional rates, protecting unit contribution margins on every outbound shipment.
          </p>


          <p>
            Additionally, automated return management portals allow customers to initiate instant store credit exchanges with bonus incentives (e.g., &quot;Get a $10 bonus credit if you exchange for a new size instead of refunding&quot;). Retaining cash within the store ecosystem preserves working capital and minimizes unrecoverable merchant bank refund transaction fees.
          </p>

          <h2>Authoritative E-Commerce Standards & Retail Guidelines</h2>
          <p>
            For standardized retail accounting frameworks, digital merchant payment security rules, and direct-to-consumer trade metrics, consult:
          </p>
          <ul>
            <li>
              <strong>National Retail Federation (NRF Retail Financial Standards):</strong> Key Performance Indicators for Omni-Channel and Online Retail Operations.
            </li>
            <li>
              <strong>Payment Card Industry Security Standards Council (PCI DSS):</strong> Data Security Standards for Digital Merchant Payment Gateways.
            </li>
            <li>
              <strong>FASB ASC 606-10-55:</strong> Customer Return Rights and Refund Liabilities Accounting Treatment.
            </li>
            <li>
              <strong>Global Standards 1 (GS1 General Specifications):</strong> International Standards for Barcodes, GTINs, and Electronic Commerce Supply Chains.
            </li>
          </ul>
        </>
      }
    >
      <EcommerceProfitCalculatorComponent />
    </CalcPage>
  );
}
