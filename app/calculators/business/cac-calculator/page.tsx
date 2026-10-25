import type { Metadata } from "next";
import Link from "next/link";
import CacCalculatorComponent from "@/components/calcs/business/cac-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CacPaybackCohortEfficiencyChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/cac-calculator";
const TITLE = "CAC Calculator | Customer Acquisition Cost & Payback Period Solver";
const DESCRIPTION =
  "Calculate fully loaded blended CAC, paid-only CAC, customer payback period in months, and sales efficiency ratios across commercial business models.";

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
  { href: "/calculators/business/ltv-calculator", icon: "💎", name: "Customer Lifetime Value" },
  { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Startup Burn Rate" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin Solver" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
  { href: "/calculators/business/employee-cost-calculator", icon: "👥", name: "Employee True Cost" },
];

const FAQ_ITEMS = [
  {
    q: "What costs must be included in a fully loaded CAC calculation?",
    a: "A fully loaded Customer Acquisition Cost (CAC) must include all direct and indirect expenses incurred to acquire new customers: direct paid advertising spend, sales and marketing team salaries, bonuses and commissions, marketing software tools (CRM, analytics, automation), creative production, agency retainers, and allocated overhead.",
  },
  {
    q: "Why is paid-only CAC misleading compared to blended CAC?",
    a: "Paid-only CAC (Ad Spend / New Customers) ignores the substantial payroll and software overhead required to execute marketing campaigns and close deals. Relying solely on paid CAC understates true customer acquisition costs by 40% to 70%, leading founders to overspend and deplete cash runway prematurely.",
  },
  {
    q: "What is an ideal CAC Payback Period for a healthy subscription business?",
    a: "For venture-backed B2B SaaS and high-growth subscription businesses, a CAC payback period under 12 months is considered best-in-class, 12 to 18 months is healthy, and over 18 months indicates poor capital efficiency that strains cash reserves unless backed by exceptionally high customer retention and enterprise contract sizes.",
  },
  {
    q: "What is the relationship between CAC and the LTV:CAC Ratio?",
    a: "The LTV:CAC ratio measures return on sales and marketing investment by comparing customer lifetime value to acquisition cost. A ratio of 3.0× is the standard benchmark for sustainable profitability, while ratios below 1.5× indicate unprofitable acquisition, and ratios above 5.0× suggest under-investment in growth.",
  },
];

export default function CacCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Customer Acquisition Cost Calculator"
      intro="Compute fully loaded blended CAC, paid media acquisition cost, CAC payback periods, and sales efficiency across digital marketing and enterprise sales funnels."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Customer Acquisition Cost is Determined</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Customer Acquisition Cost (CAC) is determined by dividing total sales and marketing expenditures by the number of new customers acquired during the same period: Fully Loaded CAC = (Ad Spend + Sales Salaries + Marketing Software) / New Customers. For example, spending $45,000 on ads, $65,000 on sales payroll, and $12,000 on software tools ($122,000 total) to acquire 320 new customers yields a fully loaded blended CAC of $381.25 per customer. Compare this acquisition outlay against long-term returns using the <Link href="/calculators/business/ltv-calculator">customer lifetime value calculator</Link> and track cash depletion via the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>.
            </p>
          </div>

          <h2>Customer Cohort Cumulative Gross Profit vs $380 Blended CAC</h2>
          <p>
            Customer acquisition is an upfront capital investment that yields cash returns over time. The CAC payback curve demonstrates the exact month where cumulative customer gross margin contributions offset initial acquisition costs.
          </p>

          <CacPaybackCohortEfficiencyChart />

          <h2>First-Principles CAC Derivations & Unit Economics</h2>
          <p>
            In managerial accounting and venture unit economics, Customer Acquisition Cost measures the full marginal capital outlay required to convert an uncommitted prospect into a paying customer. The mathematical formulation is:
          </p>
          <Formula>
            {"\text{Fully Loaded CAC} = \frac{\sum (\text{Paid Ads} + \text{Sales Payroll} + \text{Commissions} + \text{Tech Stack})}{\text{Total New Customers Acquired}}"}
          </Formula>
          <p>
            Paid-Only CAC isolates media buying efficiency from corporate headcount:
          </p>
          <Formula>
            {"\text{Paid CAC} = \frac{\text{Direct Ad Spend}}{\text{Paid Channel Customers Acquired}}"}
          </Formula>
          <p>
            The CAC Payback Period (in months) measures the time required for a customer to generate sufficient cumulative gross profit to repay their initial acquisition cost:
          </p>
          <Formula>
            {"\text{CAC Payback Period (Months)} = \frac{\text{Fully Loaded CAC}}{\text{Monthly ARPU} \times \text{Gross Margin (\%)}}"}
          </Formula>
          <p>
            Financial officers integrate CAC payback timelines with operating profitability using the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>, model sales compensation packages with the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link>, and calibrate digital marketing discounts through the discount calculator.
          </p>

          <h2>Industry CAC Benchmarks & Payback Efficiency Standards</h2>
          <p>
            The table below compiles documented acquisition cost ranges, typical payback periods, and target LTV-to-CAC ratios across prominent commercial sectors.
          </p>

          <DataTable
            head={["Industry Vertical", "Average Blended CAC", "Target Payback Period", "Target LTV : CAC Ratio", "Dominant Acquisition Channels"]}
            rows={[
              ["B2B Enterprise Software", "$3,500 – $15,000+", "12 – 18 Months", "3.5x – 5.0x", "Outbound Sales, Account-Based Marketing"],
              ["Mid-Market B2B SaaS", "$750 – $2,500", "9 – 14 Months", "3.0x – 4.5x", "Inbound Content, Paid Search, Webinars"],
              ["Self-Serve Product-Led SaaS", "$80 – $350", "4 – 8 Months", "3.0x – 4.0x", "Freemium Viral Loops, SEO, Self-Signup"],
              ["DTC E-Commerce Retail", "$35 – $95", "1 – 3 Months (Immediate)", "2.5x – 3.5x", "Meta Ads, TikTok, Google Shopping, Influencers"],
              ["B2C Mobile Subscription Apps", "$15 – $45", "3 – 6 Months", "3.0x – 4.0x", "Apple Search Ads, UAC, App Store Organic"],
              ["Fintech & Consumer Banking", "$120 – $300", "12 – 18 Months", "3.0x – 4.5x", "Affiliate Networks, Referral Rewards, Direct Mail"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: B2B Enterprise SaaS Sales Funnel Optimization</h3>
          <p>
            A cloud cybersecurity company employs a direct outbound sales model. Over a fiscal quarter, the company incurs $180,000 in Google and LinkedIn digital advertising, $240,000 in sales representative base salaries and commissions, $35,000 in marketing software tools (HubSpot, ZoomInfo, Salesforce), and $25,000 in industry conference sponsorships ($480,000 total outlay). During the quarter, the sales team closes 40 new enterprise accounts paying an average of $2,500 per month ($30,000 ARR) with an 80% gross profit margin.
          </p>
          <ol>
            <li>
              <strong>Compute fully loaded blended CAC:</strong>
              <br />
              Total S&M Spend = $180,000 + $240,000 + $35,000 + $25,000 = $480,000.
              <br />
              Blended CAC = $480,000 / 40 new customers = $12,000 per enterprise customer.
            </li>
            <li>
              <strong>Compute monthly gross profit per customer:</strong>
              <br />
              Monthly Gross Profit = $2,500 revenue × 80% gross margin = $2,000 per customer per month.
            </li>
            <li>
              <strong>Determine CAC payback period:</strong>
              <br />
              Payback Period = $12,000 CAC / $2,000 monthly gross profit = 6.0 months.
              <br />
              Financial Assessment: A 6-month payback on an enterprise contract represents elite capital efficiency, far outperforming the 12-month venture benchmark. The CFO models top-line run-rates using the <Link href="/calculators/business/business-revenue-calculator">business revenue calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Direct-to-Consumer E-Commerce Paid Media Acquisition</h3>
          <p>
            A DTC eco-friendly apparel brand spends $60,000 on Meta and TikTok ads over one month, supported by $15,000 in agency management fees and creative video production. The campaign generates 1,800 new paying customers. The average order value (AOV) is $75 with a 60% gross product margin ($45 gross profit per order).
          </p>
          <ol>
            <li>
              <strong>Calculate paid media CAC vs fully loaded CAC:</strong>
              <br />
              Paid Media Only CAC = $60,000 / 1,800 = $33.33 per customer.
              <br />
              Fully Loaded CAC = ($60,000 + $15,000) / 1,800 = $41.67 per customer.
            </li>
            <li>
              <strong>Calculate first-order payback efficiency:</strong>
              <br />
              First-Order Gross Profit = $45.00.
              <br />
              First-Order Contribution = $45.00 - $41.67 = +$3.33 per customer immediately on Day 1.
            </li>
            <li>
              <strong>Growth Conclusion:</strong> Because the brand recovers its fully loaded acquisition cost on the initial purchase, it can aggressively reinvest working capital to scale advertising volume without straining treasury reserves. The brand models customer repeat order values using the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link> and evaluates inventory costs via the <Link href="/calculators/business/cogs-calculator">COGS calculator</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Attribution Modeling Pitfalls</h2>
          <ol>
            <li>
              <strong>Multi-Touch Attribution Disconnects:</strong> Customers rarely convert upon seeing a single advertisement. Prospects may click an Instagram ad, read an organic blog post, receive three nurture emails, and finally convert via branded Google search. Relying on simplistic Last-Click attribution distorts CAC by over-crediting closing channels while underfunding awareness channels.
            </li>
            <li>
              <strong>Sales Cycle Time-Lag Distortion:</strong> In enterprise B2B sales with 6-month sales cycles, marketing dollars spent in January generate customer conversions in July. Calculating CAC using January spend divided by January conversions produces a mathematically distorted picture of current unit economics during periods of accelerating spend.
            </li>
            <li>
              <strong>Ad Fatigue & Channel Saturation Diminishing Returns:</strong> As ad spend scales within a specific audience segment, ad fatigue and bidding competition drive up Cost Per Thousand Impressions (CPM) and Cost Per Click (CPC), causing CAC to escalate non-linearly unless creative assets are continuously refreshed.
            </li>
          </ol>

          <h2>The Magic Number & Capital Efficiency Metrology</h2>
          <p>
            Venture capital growth equity investors benchmark sales productivity using the SaaS Magic Number, measuring how effectively go-to-market expenditures translate into annualized recurring revenue:
          </p>
          <Formula>
            {"\text{Magic Number} = \frac{(\text{Quarterly Net New ARR}) \times 4}{\text{Previous Quarter Total Sales \& Marketing Expense}}"}
          </Formula>
          <p>
            A Magic Number above 1.0 indicates high sales efficiency, signaling that the company should accelerate capital investment into marketing channels. Conversely, a score below 0.75 suggests friction in product-market fit or sales execution requiring operational refinement. Executives pair acquisition data with <Link href="/calculators/business/break-even-calculator">break-even models</Link>, calculate financing capacity using the <Link href="/calculators/business/business-loan-calculator">business loan calculator</Link>, and analyze inventory shrinkage through the inventory shrinkage calculator.
          </p>
          <p>
            In programmatic advertising desks, automated bid management software adjusts audience bidding caps in real time based on cohort LTV feedback loops. When customer cohorts from specific search intent keywords exhibit higher 90-day retention rates, automated algorithms increase bid allocations to maximize high-margin customer capture.
          </p>


          <h2>Incrementality Testing & Conversion Lift Attribution Metrology</h2>
          <p>
            In mature digital advertising operations, reported ad platform conversions frequently suffer from selection bias: platforms claim credit for users who would have converted organically through direct navigation or word of mouth. Growth marketing teams run randomized incrementality experiments—such as geo-matched market testing or ghost bidding—to measure true conversion lift:
          </p>
          <Formula>
            {"\text{Incremental CAC (iCAC)} = \frac{\text{Incremental Ad Spend}}{\text{Test Group Conversions} - \text{Control Group Conversions}}"}
          </Formula>
          <p>
            Isolating incremental conversions prevents marketing leaders from burning capital on branded search keywords that capture existing demand rather than generating net-new customer acquisition. E-commerce teams cross-reference incremental customer acquisition costs with the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link> and optimize seasonal sales discount promotions using the discount calculator.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does organic referral traffic affect blended CAC?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Organic traffic, word-of-mouth referrals, and viral loops dilute blended CAC downward because new customers are added to the denominator without incurring incremental media buying expense. For example, if $50,000 in spend acquires 500 paid customers plus 500 organic referral customers (1,000 total), blended CAC drops from $100 to $50, demonstrating the immense value of organic brand equity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why do CAC calculations often exclude existing customer marketing costs?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Customer Acquisition Cost is strictly designed to measure the efficiency of acquiring brand-new, first-time customers. Expenditures dedicated to retaining, upselling, or cross-selling existing accounts should be classified separately as Customer Retention Cost (CRC) or Cost of Goods Sold to maintain clean unit economic visibility.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is a good LTV to CAC ratio for an e-commerce brand?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A healthy direct-to-consumer e-commerce brand should target an LTV:CAC ratio of at least 3.0× over a 12-month customer lifespan. If the ratio drops below 2.0×, operational overhead, shipping fees, returns, and payment processing will consume remaining margins, resulting in net operating losses. Model retention with our <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>.
              </p>
            </div>
          </div>


          <p>
            Furthermore, leading performance marketing teams establish blended customer acquisition thresholds based on customer payback velocity rather than top-line cost per lead alone. Measuring time-to-first-purchase and 60-day repurchase frequency allows marketers to double down on high-intent channels that deliver superior lifetime value despite higher upfront media bids.
          </p>

          <h2>Authoritative Marketing Standards & Unit Economic Frameworks</h2>
          <p>
            For standardized marketing performance measurement, customer acquisition accounting principles, and venture capital economic guidelines, refer to:
          </p>
          <ul>
            <li>
              <strong>Marketing Accountability Standards Board (MASB):</strong> Standardized Metrics for Return on Marketing Investment (ROMI) and Customer Value.
            </li>
            <li>
              <strong>OpenView Venture Partners SaaS Benchmarks:</strong> Annual Research on CAC Payback Periods, Magic Numbers, and Expansion Dynamics.
            </li>
            <li>
              <strong>FASB ASC 340-40:</strong> Contracts with Customers — Accounting for Costs of Obtaining a Contract (Capitalization of Sales Commissions).
            </li>
            <li>
              <strong>Interactive Advertising Bureau (IAB):</strong> Standards for Digital Ad Measurement, Viewability, and Multi-Touch Attribution.
            </li>
          </ul>
        </>
      }
    >
      <CacCalculatorComponent />
    </CalcPage>
  );
}
