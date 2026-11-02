import Calculator from "@/components/calcs/finance/business-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BusinessOperatingMarginWaterfallChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/business-profit-calculator";
const TITLE = "Business Profit Calculator – Gross, Operating (EBITDA) & Net Profit Margins | CalcDigi";
const DESCRIPTION =
  "Free business profit calculator: calculate Gross Profit, EBITDA, Operating Income (EBIT), Pre-Tax Income (EBT), and Net Bottom-Line Profit with corresponding percentage profit margins. Model COGS, OpEx overhead, depreciation, and corporate taxes.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Business Profit Calculator"
      intro="Deconstruct commercial revenue into multi-tier profitability: Gross Profit, EBITDA, Operating Income (EBIT), and Net Profit. Analyze cost of goods sold (COGS), operating overhead, and after-tax margins."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="NetProfit = GrossRevenue - COGS - OpEx - Depreciation - Interest - CorporateTax"
      article={
        <>
          <h2>Direct Answer: How Does the Multi-Tier Corporate Income Statement (P&amp;L) Waterfall Work?</h2>
          <p>
            In corporate finance and Generally Accepted Accounting Principles (GAAP), a business&rsquo;s profitability is evaluated across a <strong>multi-tier income statement hierarchy</strong> rather than a single number. Profit cascades downward through specific cost hurdles: first, direct manufacturing and labor expenses (<strong>Cost of Goods Sold / COGS</strong>) are subtracted to reveal <strong>Gross Profit</strong>. Second, indirect overhead (marketing, administrative rent, utilities, and payroll) is subtracted to reveal <strong>EBITDA / Operating Income</strong>. Finally, non-cash depreciation, debt interest, and income taxes are deducted to determine the <strong>Bottom-Line Net Profit</strong> available for reinvestment or owner dividends.
          </p>

          <Formula>Gross Profit = Gross Revenue − Cost of Goods Sold (COGS)</Formula>
          <Formula>Gross Margin (%) = (Gross Profit ÷ Gross Revenue) × 100</Formula>
          <Formula>Operating Income (EBIT) = Gross Profit − Operating Expenses (OpEx) − Depreciation</Formula>
          <Formula>Net Profit = Operating Income (EBIT) − Net Interest Expense − Corporate Income Taxes</Formula>
          <Formula>Net Profit Margin (%) = (Net Profit ÷ Gross Revenue) × 100</Formula>

          <BusinessOperatingMarginWaterfallChart />

          <h2>Industry Benchmark Profit Margins: Cross-Sector Comparison</h2>
          <p>
            Healthy profit margins vary dramatically across commercial industries depending on capital intensity and inventory turnover:
          </p>

          <DataTable
            head={["Industry Sector", "Typical Gross Margin", "Typical Operating Margin (EBIT)", "Typical Net Profit Margin", "Capital Intensity"]}
            rows={[
              ["SaaS & Enterprise Software", "75% to 85%", "25% to 35%", "20% to 28%", "Low Physical CapEx / High R&D"],
              ["Retail Grocery & Supermarkets", "20% to 25%", "2% to 4%", "1.5% to 2.5%", "High Volume / Ultra-Low Margin"],
              ["Full-Service Restaurants", "60% to 70%", "6% to 10%", "3% to 6%", "High Labor & Food Spoilage Costs"],
              ["Commercial Construction", "15% to 22%", "4% to 8%", "2% to 5%", "High Subcontractor & Bonding Costs"],
              ["Medical & Healthcare Practices", "65% to 75%", "20% to 30%", "15% to 22%", "High Regulatory & Insurance Overhead"],
            ]}
          />

          <h2>Gross Margin vs. Markup: The Critical Mathematical Distinction</h2>
          <ul>
            <li>
              <strong>Margin is Based on Revenue:</strong> Margin expresses profit as a percentage of the final selling price:
              <br />
              <strong>Margin (%) = (Selling Price − Cost) ÷ Selling Price</strong>. A product costing $60 and sold for $100 has a <strong>40% profit margin</strong>.
            </li>
            <li>
              <strong>Markup is Based on Cost:</strong> Markup expresses profit as a percentage above the underlying cost:
              <br />
              <strong>Markup (%) = (Selling Price − Cost) ÷ Cost</strong>. The same $60 item marked up to $100 has a <strong>66.7% markup</strong>. Confusing the two causes catastrophic under-pricing.
            </li>
            <li>
              <strong>EBITDA in Business Valuation:</strong> Private equity firms and corporate acquirers value mid-market companies primarily as a multiple of <em>EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)</em>, which normalizes for varied capital structures and tax jurisdictions.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Business Accounting &amp; Tax Solvers</h3>
            <p>
              Analyzing gross, operating, and net profit margins ensures commercial solvency. Determine minimum sales volumes needed with our <a href="/calculators/finance/break-even-calculator">Break Even Calculator</a>, measure marketing and capital returns using the <a href="/calculators/finance/roi-calculator">ROI Calculator</a>, estimate quarterly self-employment taxes via the <a href="/calculators/finance/freelancer-tax-calculator">Freelancer Tax Calculator</a>, and account for merchant transaction fees with our <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between COGS and Operating Expenses (OpEx)?",
          a: "Cost of Goods Sold (COGS) comprises expenses directly tied to the production or acquisition of the goods sold (raw materials, factory labor, shipping freight). Operating Expenses (OpEx) represent the ongoing overhead required to operate the business regardless of production volume (office rent, sales salaries, marketing advertising, legal fees, and accounting software).",
        },
        {
          q: "What corporate tax rate applies to US business profit?",
          a: "US C-corporations pay a flat 21% federal corporate income tax rate plus applicable state corporate income taxes (typically 4% to 9%). For pass-through entities (sole proprietorships, partnerships, S-corporations, and LLCs), business profits are not taxed at the entity level but pass through to the owners' personal tax returns, taxed at individual income tax rates.",
        },
        {
          q: "Why is EBITDA widely preferred over Net Income when evaluating companies?",
          a: "EBITDA strips away non-operational variables: financing structure (interest expense), government jurisdiction (corporate taxes), and non-cash accounting conventions (depreciation and amortization schedules). This provides a cleaner representation of core operating cash-generation capability.",
        },
        {
          q: "Can a business be profitable on an accrual basis but run out of cash?",
          a: "Yes. In accrual accounting, revenue is recognized when invoiced, not when payment is received. If a company generates $100,000 in monthly sales on 60-day payment terms but must pay suppliers and payroll weekly in cash, it can experience severe insolvency despite showing high accounting profits.",
        },
      ]}
      related={[
        { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin" },
        { href: "/calculators/finance/break-even-calculator", icon: "⚖️", name: "Break-Even" },
        { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS" },
        { href: "/calculators/business/business-revenue-calculator", icon: "💵", name: "Business Revenue" },
        { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Burn Rate" },
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
