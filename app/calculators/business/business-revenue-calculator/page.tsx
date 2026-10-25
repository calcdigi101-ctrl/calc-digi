import type { Metadata } from "next";
import Link from "next/link";
import BusinessRevenueCalculatorComponent from "@/components/calcs/business/business-revenue-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RecurringVsTransactionalRevenueChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/business-revenue-calculator";
const TITLE = "Business Revenue Calculator | MRR, ARR & Blended Run-Rate Solver";
const DESCRIPTION =
  "Calculate total business revenue, monthly recurring revenue (MRR), annual recurring revenue (ARR), average order values, and blended commercial run-rates.";

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
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin Solver" },
  { href: "/calculators/business/ltv-calculator", icon: "💎", name: "Customer Lifetime Value" },
  { href: "/calculators/business/cac-calculator", icon: "🎯", name: "Customer Acquisition Cost" },
  { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Startup Burn Rate" },
  { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛒", name: "E-Commerce Profit" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between Monthly Recurring Revenue (MRR) and Annual Run-Rate (ARR)?",
    a: "Monthly Recurring Revenue (MRR) measures the predictable, normalized subscription revenue generated in a single month. Annual Recurring Revenue (ARR) annualizes this monthly metric (MRR × 12) to reflect the forward-looking yearly subscription baseline, excluding one-time professional service fees or non-recurring transaction spikes.",
  },
  {
    q: "How do one-off transactions differ from recurring subscriptions in business valuation?",
    a: "Investors and acquirers value recurring subscription revenue significantly higher than one-off transactional sales (often 3× to 10× revenue multiples for SaaS versus 1× to 2× for transactional commerce). Recurring contracts provide predictable cash flow and compounding growth without requiring re-acquisition of the customer base each billing cycle.",
  },
  {
    q: "What is Average Revenue Per User (ARPU) and how does it drive revenue growth?",
    a: "ARPU is total recurring revenue divided by total active customers. Increasing ARPU through value-based tiered pricing, feature add-ons, or seat expansion accelerates top-line expansion without needing to scale customer acquisition volume proportionally.",
  },
  {
    q: "What is net revenue retention (NRR) and why is it a critical benchmark?",
    a: "Net Revenue Retention (NRR) measures the percentage of recurring revenue retained from an existing customer cohort over 12 months, factoring in contract expansion, upgrades, downgrades, and churn. An NRR above 100% means the business expands even if it adds zero new customers.",
  },
];

export default function BusinessRevenueCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Business Revenue Calculator"
      intro="Compute total commercial revenue streams, monthly recurring subscriptions (MRR), annualized run-rate (ARR), and one-off transactional sales volume."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Total Business Revenue is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Total business revenue combines predictable recurring subscription income and variable one-off direct sales: Total Monthly Revenue = (Subscribers × ARPU) + (Transactional Units × Average Order Value). For example, 1,250 subscribers paying $89/month generates $111,250 in MRR ($1,335,000 ARR), which combines with 450 one-off orders at $150 ($67,500) to yield $178,750 in monthly revenue ($2,145,000 annual run-rate). Check product pricing via the <Link href="/calculators/business/markup-calculator">markup calculator</Link> and monitor operating profits using the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link>.
            </p>
          </div>

          <h2>Quarterly Blended Revenue Expansion: Compounding MRR vs Transactional</h2>
          <p>
            Diversifying between compounding contract subscriptions and direct transaction channels creates commercial resilience. While direct sales provide upfront liquidity, recurring subscription layers build long-term enterprise valuation.
          </p>

          <RecurringVsTransactionalRevenueChart />

          <h2>First-Principles Revenue Modeling & Run-Rate Formulations</h2>
          <p>
            In modern commercial accounting and financial planning, total revenue represents the aggregate economic consideration received or receivable from delivering goods and services. The core mathematical formulation is:
          </p>
          <Formula>
            {"\text{Total Revenue} = \sum_{i=1}^{n} (P_i \cdot Q_i) = \text{Recurring Revenue} + \text{Transactional Revenue}"}
          </Formula>
          <p>
            For subscription and SaaS business models, Monthly Recurring Revenue (MRR) reflects contracted normalized revenue:
          </p>
          <Formula>
            {"\text{MRR} = \sum (\text{Active Subscription Seats} \times \text{Monthly ARPU}), \quad \text{ARR} = \text{MRR} \times 12"}
          </Formula>
          <p>
            Net New MRR generated each billing period incorporates four distinct components:
          </p>
          <Formula>
            {"\Delta \text{MRR} = \text{New MRR} + \text{Expansion MRR} - \text{Contraction MRR} - \text{Churned MRR}"}
          </Formula>
          <p>
            When financial analysts forecast enterprise cash inflows, they cross-reference unit economics with the <Link href="/calculators/business/cac-calculator">customer acquisition cost tool</Link>, evaluate customer lifetime value using the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>, and model inventory manufacturing outflows through the <Link href="/calculators/business/cogs-calculator">Cost of Goods Sold calculator</Link>.
          </p>

          <h2>Business Model Revenue Dynamics & Valuation Multiples</h2>
          <p>
            The table below illustrates characteristic revenue models, typical recurring shares, gross profit margins, and public market enterprise valuation multiples across prominent corporate business sectors.
          </p>

          <DataTable
            head={["Business Model Archetype", "Primary Revenue Engine", "Recurring Share (%)", "Gross Margin Range", "Typical EV / Revenue Multiple"]}
            rows={[
              ["Subscription Software (SaaS)", "Monthly / Annual User Seats", "85% – 100%", "75% – 85%", "6.0x – 14.0x"],
              ["Marketplace / Platform", "Take Rate Transaction Fee (2-15%)", "15% – 30%", "65% – 80%", "3.0x – 7.0x"],
              ["Direct-to-Consumer (DTC)", "One-Off Orders & Reorders", "10% – 25%", "45% – 60%", "0.8x – 2.0x"],
              ["Managed Services / Agency", "Monthly Retainers + Hourly Scope", "50% – 75%", "40% – 55%", "1.2x – 2.5x"],
              ["Industrial Manufacturing", "Direct Purchase Orders & Parts", "5% – 15%", "25% – 40%", "0.6x – 1.5x"],
              ["Healthcare & Clinical Services", "Patient Visits & Insurance Payouts", "20% – 40%", "50% – 65%", "1.5x – 3.5x"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Hybrid B2B Software & Professional Services Firm</h3>
          <p>
            A B2B enterprise software provider offers a cloud workflow platform alongside specialized implementation consulting. The company currently has 450 active corporate clients subscribing at an average rate of $650 per month. Additionally, the professional services team completes 18 custom onboarding and systems integration packages per month at a fixed project price of $7,500 each.
          </p>
          <ol>
            <li>
              <strong>Compute monthly recurring subscription revenue:</strong>
              <br />
              MRR = 450 subscribers × $650 = $292,500 per month.
              <br />
              ARR = $292,500 × 12 = $3,510,000 per year.
            </li>
            <li>
              <strong>Compute monthly transactional professional services revenue:</strong>
              <br />
              One-off Revenue = 18 projects × $7,500 = $135,000 per month.
            </li>
            <li>
              <strong>Calculate blended monthly revenue and annual run-rate:</strong>
              <br />
              Total Monthly Revenue = $292,500 + $135,000 = $427,500 per month.
              <br />
              Annualized Blended Run-Rate = $427,500 × 12 = $5,130,000.
              <br />
              Recurring revenue represents 68.4% of total revenue. Corporate leadership tracks profitability using the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>.
            </li>
          </ol>

          <h3>Case Study B: High-Volume E-Commerce Brand Multi-Channel Expansion</h3>
          <p>
            A direct-to-consumer health supplement brand sells products via one-time store purchases and a monthly subscription club. In a standard month, the brand processes 4,200 one-time cart transactions with an Average Order Value (AOV) of $68. Concurrently, 3,100 club subscribers receive automated recurring monthly deliveries at $45 per order.
          </p>
          <ol>
            <li>
              <strong>Calculate transactional channel revenue:</strong>
              <br />
              One-Time Sales = 4,200 orders × $68 = $285,600.
            </li>
            <li>
              <strong>Calculate subscription channel revenue:</strong>
              <br />
              Subscription MRR = 3,100 subscribers × $45 = $139,500.
            </li>
            <li>
              <strong>Evaluate total monthly revenue:</strong>
              <br />
              Total Monthly Revenue = $285,600 + $139,500 = $425,100 ($5,101,200 annual run-rate).
              <br />
              Strategic Optimization: Converting 500 one-time buyers into recurring club members stabilizes monthly baseline cash flow, evaluated using the <Link href="/calculators/business/ecommerce-profit-calculator">e-commerce profit calculator</Link> and discount calculator.
            </li>
          </ol>

          <h2>Operational Constraints & Revenue Recognition Governance</h2>
          <ol>
            <li>
              <strong>ASC 606 & IFRS 15 Five-Step Revenue Recognition:</strong> Under modern accounting standards, revenue cannot be recognized when cash is collected or when an invoice is sent. Revenue must be recognized only as performance obligations are satisfied over time. Collecting an annual $120,000 upfront enterprise contract creates Deferred Revenue on the balance sheet, releasing exactly $10,000 to the income statement each month.
            </li>
            <li>
              <strong>Gross vs. Net Revenue Reporting (Principal vs. Agent):</strong> E-commerce platforms and marketplace brokers must determine whether they act as the principal (reporting gross merchandise value) or as an agent (reporting only net commission take-rates). Reporting gross transaction flow when acting as a broker violates GAAP and inflates apparent scale.
            </li>
            <li>
              <strong>Customer Concentration Risk:</strong> Having more than 20% of total revenue derived from a single anchor customer poses extreme commercial vulnerability. The loss of that single account can collapse operating margins and trigger commercial debt covenant breaches.
            </li>
          </ol>

          <h2>Revenue Optimization Analytics & Unit Expansion Metrics</h2>
          <p>
            High-performance commercial enterprises continuously optimize Average Order Value (AOV) and customer expansion vectors. The mathematical relationship governing top-line growth acceleration is:
          </p>
          <Formula>
            {"\text{Revenue Growth Rate} = (\text{Customer Acquisition Velocity} \times \text{Initial AOV}) + (\text{Cohort Expansion} \times \text{Base})"}
          </Formula>
          <p>
            Dynamic pricing engines deploy machine learning algorithms to adjust prices based on supply elasticity and inventory turnover. Corporate controllers integrate live revenue dashboards with <Link href="/calculators/business/break-even-calculator">break-even models</Link>, project corporate tax obligations via the sales tax calculator, and plan inventory purchasing through the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>.
          </p>
          <p>
            In international software exports, multi-currency billing engines monitor foreign exchange (FX) hedging corridors. When invoicing European clients in Euros, automated currency forward contracts lock in dollar conversion rates, shielding gross revenue run-rates from foreign currency devaluation.
          </p>


          <h2>The Rule of 40 & Enterprise Growth Efficiency Dynamics</h2>
          <p>
            In institutional venture capital and private equity valuation, software and subscription businesses are evaluated against the Rule of 40—a capital efficiency benchmark stating that a software company &apos;s annualized revenue growth rate plus its free cash flow profit margin should equal or exceed 40%:
          </p>
          <Formula>
            {"\text{Rule of 40 Score} = \text{Year-over-Year Revenue Growth (\%)} + \text{Free Cash Flow Margin (\%)} \ge 40\%"}
          </Formula>
          <p>
            A high-growth startup expanding top-line revenue at 60% annually can sustain a -20% cash burn margin while remaining attractive to growth equity investors. Conversely, a mature company growing at 10% must generate a 30% free cash flow margin to satisfy the threshold. Companies balance these operational parameters by calculating contractor billing margins through the <Link href="/calculators/business/freelance-rate-calculator">freelance rate calculator</Link> and calibrating gross markup spreads with the <Link href="/calculators/business/markup-calculator">markup calculator</Link>.
          </p>
          <p>
            Enterprise software providers also monitor Gross Revenue Retention (GRR), measuring recurring revenue retained from existing clients excluding all expansion upsells. Maintaining GRR above 88% prevents cohort revenue erosion, ensuring acquired subscriber cohorts continue generating stable baseline cash inflows.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is ARR calculated as MRR × 12 rather than trailing 12-month revenue?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Annual Recurring Revenue (ARR) is a forward-looking run-rate metric reflecting the contracted annual value of your current subscription base. Trailing twelve-month (TTM) revenue looks backwards at historical performance. For a rapidly growing company, current ARR will be substantially higher than TTM revenue because it reflects the current scaled customer baseline.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between bookings, billings, and revenue?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Bookings represent the total contracted value of customer agreements signed (a forward commitment). Billings represent the dollar amount actually invoiced to customers during the period. Revenue is the earned portion of billings recognized on the income statement as services are delivered in compliance with ASC 606.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does customer churn impact long-term revenue run-rate?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Customer churn acts as a leaky bucket. If a business generates $100,000 MRR but loses 5% of its revenue to monthly churn ($5,000), it must acquire $5,000 in new MRR every month just to remain flat. Minimizing churn is mathematically more powerful than scaling new sales acquisition. Evaluate retention with our <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>.
              </p>
            </div>
          </div>


          <p>
            In multi-product commercial enterprises, managing the sales mix between legacy high-volume products and emerging high-growth software tiers requires disciplined cohort analytics. Modern financial FP&A teams track customer concentration ratios, ensuring that no single enterprise account represents more than 15% of annual revenue, thereby mitigating credit default risks and protecting baseline cash flow predictability.
          </p>

          <h2>Authoritative Revenue Standards & International Metrology</h2>
          <p>
            For standardized revenue accounting frameworks, recurring revenue metrics, and international financial reporting rules, consult:
          </p>
          <ul>
            <li>
              <strong>FASB / IASB Joint Standard (ASC 606 / IFRS 15):</strong> Revenue from Contracts with Customers — Comprehensive Five-Step Recognition Framework.
            </li>
            <li>
              <strong>SaaS Capital Industry Metrics Index:</strong> Standard Benchmarks for B2B SaaS ARR Multiples and Growth Trajectories.
            </li>
            <li>
              <strong>Securities and Exchange Commission (SEC Regulation S-K):</strong> Non-GAAP Financial Measures and Key Performance Indicators Disclosures.
            </li>
            <li>
              <strong>AICPA Audit and Accounting Guide:</strong> Revenue Recognition in Software and High-Technology Industries.
            </li>
          </ul>
        </>
      }
    >
      <BusinessRevenueCalculatorComponent />
    </CalcPage>
  );
}
