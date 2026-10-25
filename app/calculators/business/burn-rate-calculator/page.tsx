import type { Metadata } from "next";
import Link from "next/link";
import BurnRateCalculatorComponent from "@/components/calcs/business/burn-rate-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BurnRateRunwayProjectionChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/burn-rate-calculator";
const TITLE = "Burn Rate Calculator | Startup Cash Runway & Capital Planning Solver";
const DESCRIPTION =
  "Calculate startup gross burn rate, net monthly cash burn, estimated runway months, and zero-cash dates to guide venture capital fundraising cycles.";

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
  { href: "/calculators/business/startup-valuation-calculator", icon: "🚀", name: "Startup Valuation" },
  { href: "/calculators/business/cac-calculator", icon: "🎯", name: "Customer Acquisition Cost" },
  { href: "/calculators/business/ltv-calculator", icon: "💎", name: "Customer Lifetime Value" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
  { href: "/calculators/business/employee-cost-calculator", icon: "👥", name: "Employee True Cost" },
  { href: "/calculators/business/business-revenue-calculator", icon: "📈", name: "Revenue Run-Rate" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between gross burn rate and net burn rate?",
    a: "Gross burn rate is the total amount of cash spent on operating expenses each month (payroll, rent, software, marketing) without considering any incoming cash. Net burn rate is the actual cash lost per month after subtracting monthly customer cash receipts: Net Burn = Gross Burn - Monthly Cash Revenue.",
  },
  {
    q: "What does it mean when a startup is 'Default Alive'?",
    a: "A concept popularized by Y Combinator's Paul Graham, a startup is 'Default Alive' if its current cash reserves will last until existing revenue growth reaches cash-flow break-even without needing additional outside venture funding. Conversely, a startup is 'Default Dead' if it will run out of cash before becoming self-sustaining.",
  },
  {
    q: "When should a startup founder begin pitching for their next fundraising round?",
    a: "Founders should begin pitching prospective venture capital or angel investors when they have 9 to 12 months of cash runway remaining. Institutional funding rounds commonly take 3 to 6 months to negotiate and close; running below 6 months creates severe leverage loss during term sheet negotiations.",
  },
  {
    q: "How does hiring new employees impact the future burn trajectory?",
    a: "Payroll constitutes 65% to 80% of operating expenses for technology startups. Because hiring involves recruiter fees, sign-on bonuses, benefits, and payroll taxes, each new hire expands ongoing monthly net burn, accelerating runway depletion unless offset by proportional revenue growth.",
  },
];

export default function BurnRateCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Startup Burn Rate Calculator"
      intro="Calculate gross monthly operating outflows, net cash burn rate, runway duration in months, and zero-cash depletion milestones for early-stage and venture-backed startups."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Startup Runway is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Startup cash runway is calculated by dividing your current liquid cash reserves by your monthly net burn rate: Runway (Months) = Cash Reserves / (Gross Expenses - Monthly Inflows). For example, a company with $750,000 in bank deposits spending $85,000 per month and generating $25,000 in customer revenue has a net monthly burn of $60,000, providing exactly 12.5 months of operational runway. Evaluate unit acquisition costs via the <Link href="/calculators/business/cac-calculator">CAC calculator</Link> and track customer recurring inflows using the <Link href="/calculators/business/business-revenue-calculator">business revenue calculator</Link>.
            </p>
          </div>

          <h2>Startup Cash Runway Depletion Trajectories ($ Thousands)</h2>
          <p>
            Cash is the ultimate oxygen of an early-stage enterprise. Accurately modeling cash burn trajectories enables executive leadership to balance hiring velocity with fundraising cycles and strategic runway milestones.
          </p>

          <BurnRateRunwayProjectionChart />

          <h2>First-Principles Cash Burn Derivations & Runway Kinetics</h2>
          <p>
            Venture capital financial planning distinguishes between total disbursements and net operating capital depletion. The mathematical formulations governing startup cash kinetics are:
          </p>
          <Formula>
            {"\text{Gross Burn Rate} = \sum \text{Cash Operating Outflows (Payroll, Cloud, Lease, Ads)}"}
          </Formula>
          <Formula>
            {"\text{Net Burn Rate} = \text{Gross Burn Rate} - \text{Cash Collections from Revenue}"}
          </Formula>
          <p>
            Assuming a static net monthly burn (B_net), the remaining cash runway in months (R) from current liquid treasury reserves (C) is:
          </p>
          <Formula>
            {"R = \frac{C}{B_{\text{net}}} = \frac{C}{\text{Gross Burn} - \text{Monthly Receipts}}"}
          </Formula>
          <p>
            In dynamic growth environments where operating expenses expand by a monthly compounding growth rate (g), the zero-cash date (T) is derived by solving the geometric series:
          </p>
          <Formula>
            {"C_t = C_0 - \sum_{k=1}^{t} B_0 \cdot (1 + g)^{k-1} \implies T = \frac{\ln\left( 1 + \frac{C_0 \cdot g}{B_0} \right)}{\ln(1 + g)}"}
          </Formula>
          <p>
            Founders evaluate hiring headcount costs using the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link> and calibrate funding rounds through the <Link href="/calculators/business/startup-valuation-calculator">startup valuation calculator</Link> to preserve equity ownership while securing adequate runway.
          </p>

          <h2>Venture Stage Runway Benchmarks & Capital Planning Standards</h2>
          <p>
            The table below compiles industry standard runway targets, typical monthly net burn ranges, and fundraising preparation windows across venture funding stages.
          </p>

          <DataTable
            head={["Startup Financing Stage", "Typical Cash Raised", "Target Runway (Months)", "Average Monthly Net Burn", "Fundraising Lead Time"]}
            rows={[
              ["Pre-Seed / Angel Stage", "$250k – $1.0M", "12 – 18 Months", "$15k – $45k / mo", "4 – 6 Months Prior"],
              ["Seed Stage", "$1.5M – $4.0M", "18 – 24 Months", "$60k – $140k / mo", "6 – 8 Months Prior"],
              ["Series A Growth", "$6.0M – $15.0M", "20 – 24 Months", "$250k – $550k / mo", "9 – 12 Months Prior"],
              ["Series B Scale-Up", "$20M – $50M", "24 – 30 Months", "$750k – $1.8M / mo", "9 – 12 Months Prior"],
              ["Pre-IPO / Late Stage", "$50M – $150M+", "30 – 36 Months", "Targeting Breakeven", "Continuous Capital Markets"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Seed-Stage AI Software Company</h3>
          <p>
            An enterprise AI startup successfully closes a $1,800,000 Seed financing round. Monthly operating overhead consists of $95,000 in software engineering salaries, $22,000 in GPU cloud compute infrastructure, $8,000 in office and administrative tooling, and $15,000 in marketing and founder sales travel, for a gross burn of $140,000 per month. The platform generates $35,000 per month in contracted annual subscription revenue.
          </p>
          <ol>
            <li>
              <strong>Calculate net monthly cash burn:</strong>
              <br />
              Net Burn = $140,000 (Gross Outflows) - $35,000 (Revenue Inflows) = $105,000 per month.
            </li>
            <li>
              <strong>Determine static cash runway:</strong>
              <br />
              Runway = $1,800,000 / $105,000 = 17.14 months of operational runway.
            </li>
            <li>
              <strong>Fundraising Milestone Schedule:</strong> The executive board establishes that Series A pitching must begin at Month 10 (when remaining runway equals 7.14 months), ensuring the company negotiates from a position of financial strength while evaluating commercial performance with the <Link href="/calculators/business/break-even-calculator">break-even point solver</Link>.
            </li>
          </ol>

          <h3>Case Study B: Series A E-Commerce Brand Runway Extension</h3>
          <p>
            A direct-to-consumer lifestyle brand has $920,000 remaining in bank deposits with a gross burn of $180,000 per month and average gross revenue of $100,000 per month, leaving a net burn of $80,000 per month (11.5 months runway). Facing challenging capital markets, the CEO executes a capital efficiency plan to extend runway to 18 months without outside funding.
          </p>
          <ol>
            <li>
              <strong>Calculate target net burn for 18-month runway:</strong>
              <br />
              Target Net Burn = $920,000 / 18 months = $51,111 per month.
              <br />
              Required Monthly Burn Reduction = $80,000 - $51,111 = $28,889 per month.
            </li>
            <li>
              <strong>Actionable Cost Restructuring:</strong> Management reduces agency marketing retainers by $12,000, consolidates software licenses saving $4,000, and renegotiates freight 3PL contracts saving $14,000.
            </li>
            <li>
              <strong>Strategic Outcome:</strong> Net monthly burn contracts to $50,000, extending runway from 11.5 months to 18.4 months. The management team monitors retail inventory cash lockup using the <Link href="/calculators/business/cogs-calculator">COGS calculator</Link> and validates customer payback via the <Link href="/calculators/business/cac-calculator">customer acquisition cost tool</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Non-Linear Treasury Risk Factors</h2>
          <ol>
            <li>
              <strong>Working Capital Lags & Collections Friction:</strong> Revenue on an accrual income statement does not equal cash in the bank. Enterprise customer accounts receivable (A/R) frequently operate on Net-60 or Net-90 day payment terms. Startups can experience cash depletion while technically reporting profitable book revenue due to delayed client payments.
            </li>
            <li>
              <strong>Lumpy Annual and Multi-Year Cash Outlays:</strong> Corporate insurance premiums, enterprise software annual contracts, and legal retainer fees occur as lumpy lump-sum cash disbursements rather than smooth monthly outflows, creating unexpected cash troughs that catch unwary finance teams off guard.
            </li>
            <li>
              <strong>Severance & Lease Termination Liabilities:</strong> When attempting an emergency pivot or cost reduction, severance packages, unused equipment write-offs, and early lease termination penalties temporarily increase cash burn during the first 60 to 90 days of restructuring before net savings materialize.
            </li>
          </ol>

          <h2>Corporate Treasury Management & Working Capital Optimization</h2>
          <p>
            In high-interest-rate macroeconomic environments, institutional CFOs actively manage idle treasury reserves to offset operating burn. Cash balances are allocated across automated short-duration Treasury bill (T-bill) sweeps and sweep network deposit accounts providing FDIC insurance coverage across tens of millions of dollars.
          </p>
          <Formula>
            {"\text{Effective Net Burn} = \text{Gross Burn} - \text{Operating Revenue} - \left( C_0 \cdot \frac{\text{Yield}_{\text{treasury}}}{12} \right)"}
          </Formula>
          <p>
            A startup holding $5,000,000 in cash earning 5.0% annualized risk-free yield generates $20,833 per month in passive treasury income, directly reducing net burn by $250,000 annually. Controllers integrate treasury modeling with <Link href="/calculators/business/business-loan-calculator">commercial loan calculations</Link>, track long-term customer profitability via the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>, and verify gross margins with the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link>.
          </p>
          <p>
            Furthermore, automated corporate spend management platforms track departmental credit card limits, enforcing hard budget caps on software seats and travel expenses. Real-time approval workflows eliminate shadow IT subscriptions, preventing insidious multi-thousand-dollar monthly expenditure drift across growing engineering teams.
          </p>


          <h2>Dynamic Headcount Expansion Lag & Zero-Cash Scenario Modeling</h2>
          <p>
            In venture-backed technology startups, financial projections frequently underestimate the dynamic acceleration of burn rates caused by headcount expansion lag. Hiring technical personnel introduces recruitment agency commissions (commonly 20% to 25% of first-year base salary), modern workstation equipment, software seat provisioning, and multi-month onboarding ramp times where new hires consume operating capital before generating incremental output.
          </p>
          <Formula>
            {"\text{Forward Net Burn}_{t} = \text{Base Burn}_0 + \sum (\Delta \text{Headcount}_i \times \text{Loaded Cost}_i) - \text{Contracted ARR Inflows}_t"}
          </Formula>
          <p>
            Prudent venture CFOs build dynamic three-tier financial models comprising Conservative (zero new revenue growth), Moderate (current sales trajectory), and Aggressive scenarios. By stress-testing cash reserves against extended macroeconomic downturns, corporate leadership can establish defensive severance buffers, calculate exact payroll tax withholdings through the <Link href="/calculators/business/payroll-calculator">payroll calculator</Link>, and evaluate contractor cost differentials using the <Link href="/calculators/business/freelance-rate-calculator">freelance hourly rate calculator</Link> to prevent sudden emergency liquidation events.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is cash runway more important than accounting net income?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Accounting net income includes non-cash items (depreciation, amortization, stock-based compensation) and recognizes revenue upon invoice delivery rather than cash receipt. A startup cannot pay employee salaries or cloud hosting providers with accounting accounts receivable; bankruptcy occurs when liquid cash reaches zero, regardless of reported GAAP profitability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is a good net burn multiple for a SaaS company?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The Burn Multiple (Net Burn divided by Net New ARR added) measures capital efficiency. A burn multiple under 1.0× is considered exceptional, 1.0× to 1.5× is healthy, 1.5× to 2.0× is acceptable for early growth, and anything above 2.5× indicates severe capital inefficiency requiring immediate operational adjustments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do seasonal revenue fluctuations affect runway calculations?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Using a single monthly average can give a false sense of security if cash receipts drop significantly during off-peak quarters (such as summer slowdowns for B2B or post-holiday troughs for retail). Prudent financial officers build month-by-month cash flow models incorporating seasonal collections dips to ensure minimum cash thresholds are never breached.
              </p>
            </div>
          </div>


          <p>
            Venture capital syndicates also monitor the Quick Ratio in SaaS treasury operations, comparing monthly recurring additions and expansion revenue directly against recurring contraction and customer churn. Maintaining a Quick Ratio exceeding 4.0 demonstrates that customer additions vastly outpace attrition, validating continued capital burn into aggressive sales territory expansion.
          </p>

          <h2>Authoritative Financial Standards & Venture Treasury Guidelines</h2>
          <p>
            For standardized cash flow accounting methods, venture capital reporting frameworks, and corporate financial controls, consult:
          </p>
          <ul>
            <li>
              <strong>FASB Accounting Standards Codification (ASC 230):</strong> Statement of Cash Flows — Operating, Investing, and Financing Activities.
            </li>
            <li>
              <strong>National Venture Capital Association (NVCA Model Legal Documents):</strong> Standard Investor Information Rights and Runway Covenants.
            </li>
            <li>
              <strong>Financial Executives International (FEI Guidance):</strong> Cash Management Strategies for Emerging Growth Enterprises.
            </li>
            <li>
              <strong>AICPA Financial Management Practice Guide:</strong> Liquidity Risk Measurement and Working Capital Management.
            </li>
          </ul>
        </>
      }
    >
      <BurnRateCalculatorComponent />
    </CalcPage>
  );
}
