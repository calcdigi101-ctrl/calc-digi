import Calculator from "@/components/calcs/finance/business-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BusinessOperatingMarginWaterfallChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/business-profit-calculator";
const TITLE = "Business Profit Calculator";
const DESCRIPTION =
  "Free business profit calculator: model complete corporate income statement margins, gross profit, EBITDA, operating EBIT, interest, corporate taxes, and net.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator (PITI & Amortization)" },
        { href: "https://www.calcdigi.com/calculators/finance/loan-calculator", icon: "💰", name: "Loan Payment Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan Payment Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff Calculator" },
      ]} title="Business Profit Calculator"
      intro="Model the complete corporate financial income statement waterfall. Deconstruct gross revenue into Gross Profit, Operating Income (EBIT), EBITDA, pre-tax earnings, and final net profit."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Income} = \text{Revenue} - \text{COGS} - \text{OPEX} - \text{D\&A} - \text{Interest} - \text{Taxes}"
      article={
        <>
          <h2>Direct Answer: How Does the Corporate Income Statement Profit Waterfall Work?</h2>
          <p>
            Enterprise profitability cannot be assessed by a single headline revenue figure. A company generating $10 million in top-line revenue can easily generate zero or negative net profit if cost of goods sold (COGS), operating overhead, and debt interest burdens consume all cash flow.
          </p>
          <p>
            Professional financial analysis evaluates corporate profitability across <strong>four standardized tier stages</strong>: <strong>Gross Profit</strong> (production unit efficiency), <strong>EBITDA</strong> (core cash operating performance before non-cash amortization and financing), <strong>Operating Profit / EBIT</strong> (operational viability after accounting for capital depreciation), and <strong>Net Income</strong> (bottom-line retained earnings belonging to equity owners after taxes and interest).
          </p>

          <BusinessOperatingMarginWaterfallChart />

          <h2>Actuarial Mathematics: The Multi-Stage Margin Waterfall Formulas</h2>
          <p>
            The standardized mathematical equations governing GAAP corporate income statements:
          </p>

          <Formula>{"\text{Gross Profit} = \text{Gross Revenue} - \text{Cost of Goods Sold (COGS)}"}</Formula>
          <Formula>{"\text{Gross Profit Margin \%} = \left( \frac{\text{Gross Profit}}{\text{Gross Revenue}} \right) \times 100\%"}</Formula>
          <p>
            Operating profitability after deducting selling, general, and administrative (SG&amp;A) overhead:
          </p>
          <Formula>{"\text{Operating Profit (EBIT)} = \text{Gross Profit} - \text{Operating Expenses (OPEX)}"}</Formula>
          <Formula>{"\text{Operating Margin \%} = \left( \frac{\text{EBIT}}{\text{Gross Revenue}} \right) \times 100\%"}</Formula>
          <p>
            <strong>EBITDA</strong> normalizes operational cash generation across capital-intensive firms with divergent debt capital structures:
          </p>
          <Formula>{"\text{EBITDA} = \text{EBIT} + \text{Depreciation} + \text{Amortization}"}</Formula>
          <p>
            Finally, bottom-line <strong>Net Income</strong> after debt financing service and statutory corporate taxes:
          </p>
          <Formula>{"\text{Earnings Before Taxes (EBT)} = \text{EBIT} - \text{Interest Expense}"}</Formula>
          <Formula>{"\text{Net Income} = \text{EBT} - \text{Corporate Income Taxes} = \text{EBT} \times (1 - t_{\text{effective}})"}</Formula>
          <Formula>{"\text{Net Profit Margin \%} = \left( \frac{\text{Net Income}}{\text{Gross Revenue}} \right) \times 100\%"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a growing mid-market business or commercial enterprise generating <strong>$1,200,000 in gross annual sales revenue</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate Gross Profit.</strong>
              <br />Direct Production COGS (Raw materials, warehouse labor, shipping): $480,000.
              <br />Gross Profit = $1,200,000 &minus; $480,000 = <strong>$720,000</strong>.
              <br /><em>Gross Margin = ($720,000 / $1,200,000) &times; 100% = <strong>60.00%</strong>.</em>
            </li>
            <li>
              <strong>Step 2: Calculate Operating Profit (EBIT).</strong>
              <br />Selling, General &amp; Administrative (SG&amp;A Payroll, Marketing, SaaS, Office): $420,000.
              <br />EBIT = $720,000 &minus; $420,000 = <strong>$300,000</strong>.
              <br /><em>Operating Margin = ($300,000 / $1,200,000) &times; 100% = <strong>25.00%</strong>.</em>
            </li>
            <li>
              <strong>Step 3: Derive EBITDA Cash Proxy.</strong>
              <br />Non-cash tangible equipment depreciation &amp; patent amortization: $45,000.
              <br />EBITDA = $300,000 EBIT + $45,000 D&amp;A = <strong>$345,000</strong> (EBITDA Margin: <strong>28.75%</strong>).
            </li>
            <li>
              <strong>Step 4: Deduct Debt Interest &amp; Taxes to Reach Net Income.</strong>
              <br />Commercial bank term loan interest expense: $25,000.
              <br />Earnings Before Taxes (EBT) = $300,000 &minus; $25,000 = $275,000.
              <br />Blended Corporate Tax Liability (21% Federal + 6% State = 27%): $74,250.
              <br /><em>Bottom-Line Net Income = $275,000 &minus; $74,250 = <strong>$200,750.00</strong>.</em>
              <br /><em>Net Profit Margin = ($200,750 / $1,200,000) &times; 100% = <strong>16.73%</strong>.</em>
            </li>
          </ol>

          <h2>Industry Profit Margin Benchmark Comparison Matrix</h2>
          <p>
            Healthy profit margins vary dramatically across industry business models due to differing capital intensities and inventory friction:
          </p>

          <DataTable
            head={["Industry Sector", "Typical Gross Margin", "Typical EBITDA Margin", "Typical Net Profit Margin", "Capital Intensity Profile"]}
            rows={[
              ["Software / Cloud SaaS", "75% – 85%", "25% – 35%", "18% – 28%", "Low capex; near-zero marginal cost of distribution."],
              ["Professional Services (Legal / Tech Consulting)", "50% – 65%", "20% – 30%", "15% – 22%", "Human capital intensive; minimal physical inventory."],
              ["Specialty Healthcare &amp; Medical Devices", "60% – 75%", "22% – 32%", "14% – 20%", "High regulatory compliance &amp; long R&amp;D cycles."],
              ["Consumer Packaged Goods (CPG)", "40% – 55%", "14% – 22%", "8% – 14%", "Moderate capex; retail distributor slotting fees."],
              ["Commercial Construction &amp; General Contracting", "18% – 28%", "8% – 14%", "4% – 7%", "High bond requirements; material price volatility."],
              ["Retail Grocery &amp; Supermarkets", "20% – 24%", "4% – 7%", "1.5% – 2.5%", "Extremely low net margin; relies on massive inventory velocity."]
            ]}
          />

          <h2>Profit Margin Sensitivity: The 5% Operational Levers Matrix</h2>
          <p>
            Evaluating how small percentage improvements in individual income statement components impact bottom-line net income on $1,200,000 revenue:
          </p>

          <DataTable
            head={["Operational Optimization Lever", "Baseline Amount", "Optimized (+5%)", "New Net Income", "Net Profit Expansion"]}
            rows={[
              ["Baseline Status Quo", "$1,200,000 Rev / $480k COGS", "N/A", "$200,750", "Baseline Reference Point"],
              ["5% Increase in Top-Line Price (No Volume Loss)", "$1,200,000 Revenue", "$1,260,000", "$244,550", "+$43,800 (+21.8% profit jump!)"],
              ["5% Reduction in Direct COGS (Supplier Terms)", "$480,000 COGS", "$456,000", "$218,270", "+$17,520 (+8.7% profit boost)"],
              ["5% Reduction in Operating Overhead (OPEX)", "$420,000 OPEX", "$399,000", "$216,080", "+$15,330 (+7.6% profit boost)"],
              ["Combined Triple 5% Execution (Price, COGS, OPEX)", "All Three Combined", "Simultaneous", "$277,350", "+$76,600 (+38.2% profit surge!)"]
            ]}
          />

          
          <h2>DuPont Analysis: Deconstructing Enterprise Return on Equity (ROE)</h2>
          <p>
            To understand how operational profit margins translate into shareholder value creation, corporate finance uses the <strong>DuPont Equation</strong>, decomposing Return on Equity (ROE) into three distinct corporate performance engines:
          </p>
          <Formula>{"\text{ROE} = \left( \frac{\text{Net Income}}{\text{Sales}} \right) \times \left( \frac{\text{Sales}}{\text{Assets}} \right) \times \left( \frac{\text{Assets}}{\text{Equity}} \right) = \text{Net Margin} \times \text{Asset Turnover} \times \text{Financial Leverage}"}</Formula>
          <p>
            This mathematical DuPont decomposition provides executive management with transparent visibility into the exact drivers of enterprise shareholder value and capital efficiency:
            <br />&bull; <strong>Operating Profitability (Net Margin):</strong> How much bottom-line cash the firm keeps from each dollar of revenue.
            <br />&bull; <strong>Asset Efficiency (Asset Turnover):</strong> How aggressively corporate physical and intangible assets generate top-line sales.
            <br />&bull; <strong>Financial Leverage (Equity Multiplier):</strong> The degree to which debt capital is deployed to magnify shareholder equity returns.
          </p>
<h2>Essential Corporate Profitability Terminology</h2>
          <p>
            Key financial terms required to conduct corporate income statement audits:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Cost of Goods Sold (COGS):</strong> The direct costs attributable to the production of goods sold or services delivered (raw inventory, direct assembly labor, merchant processing).</li>
            <li><strong>OPEX (Operating Expenses):</strong> Ongoing expenditures necessary to run daily business operations outside direct manufacturing (rent, marketing, payroll, legal, utilities).</li>
            <li><strong>EBITDA:</strong> Earnings Before Interest, Taxes, Depreciation, and Amortization; the primary metric used in corporate mergers and acquisitions (M&amp;A) valuations.</li>
            <li><strong>Free Cash Flow (FCF):</strong> Operating cash flow minus capital expenditures (CapEx); reflects discretionary cash distributable to shareholders.</li>
            <li><strong>Operating Leverage:</strong> The degree to which a firm can grow operating income by increasing revenue without expanding fixed costs.</li>
          </ul>

          <h3>Related Business Strategy &amp; Tax Solvers</h3>
          <p>
            Drive enterprise growth: model volume thresholds with the <a href="/calculators/business/break-even-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Break-Even Calculator</a>, calculate merchant processing friction using our <a href="/calculators/finance/paypal-fee-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">PayPal Fee Calculator</a>, analyze corporate capital investments via the <a href="/calculators/business/roi-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">ROI Calculator</a>, and audit self-employment business tax obligations with the <a href="/calculators/finance/freelancer-tax-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Freelancer Tax Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the critical difference between Gross Profit and Net Income?",
          a: "Gross Profit only subtracts the direct costs of producing goods or services (COGS) from revenue, reflecting manufacturing or delivery efficiency. Net Income subtracts all remaining enterprise expenses—including administrative overhead, marketing, office rent, loan interest, and statutory corporate taxes."
        },
        {
          q: "Why is EBITDA widely used by investors and private equity firms instead of Net Income?",
          a: "EBITDA strips out financing decisions (interest), non-cash accounting estimates (depreciation and amortization), and differing jurisdictional tax rates. This provides an unclouded view of core operating cash profitability, allowing clean comparisons across companies with different capital structures."
        },
        {
          q: "What is a healthy net profit margin for a small to medium-sized business?",
          a: "A net profit margin between 10% and 20% is generally considered healthy across most service and product industries. Margins above 20% indicate exceptional pricing power and operational efficiency, while margins under 5% indicate vulnerability to supply or wage inflation."
        },
        {
          q: "Why does a 5% increase in product price produce a disproportionately large jump in net profit?",
          a: "Because price increases flow 100% directly down to the bottom line without incurring additional COGS or fixed operating overhead. In an enterprise operating at a 10% net margin, a 5% price increase expands bottom-line net profit by 50%."
        },
        {
          q: "What is the difference between markup and margin?",
          a: "Margin is profit expressed as a percentage of the selling price: (Price - Cost) / Price. Markup is profit expressed as a percentage of the original cost: (Price - Cost) / Cost. A 50% markup on a $100 product results in a $150 price, which yields a 33.3% profit margin."
        },
        {
          q: "How do non-cash depreciation and amortization expenses impact cash flow?",
          a: "Depreciation and amortization reduce reported accounting net income and taxable earnings on the income statement, lowering corporate tax bills. However, because no physical cash leaves the bank account in that period, they are added back when calculating cash flow."
        },
        {
          q: "What are the primary levers to improve a company's operating margin?",
          a: "The three primary operational levers are: 1) Selective price increases on inelastic product lines; 2) Renegotiating supplier bulk discounts to reduce COGS; and 3) Automating redundant administrative processes to reduce SG&A overhead."
        },
        {
          q: "How does inflation affect corporate gross margins versus net margins?",
          a: "Inflation elevates raw material and labor costs, causing immediate gross margin compression if price increases lag behind. Furthermore, elevated central bank interest rates increase debt servicing costs, creating additional downward pressure on bottom-line net margins."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
