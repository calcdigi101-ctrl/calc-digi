import Calculator from "@/components/calcs/finance/break-even-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BreakEvenContributionMarginChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/break-even-calculator";
const TITLE = "Break-Even Calculator";
const DESCRIPTION =
  "Free break-even calculator: calculate unit volume break-even points, required gross revenue, contribution margin ratios, margin of safety buffer, and target.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Break-Even Calculator"
      intro="Determine the exact sales volume and dollar revenue required to cover all fixed and variable operating costs. Calculate contribution margins, margin of safety, and target profit unit volumes."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Q_{\text{BE}} = \frac{\text{Fixed Costs}}{P - V} \quad \mid \quad R_{\text{BE}} = \frac{\text{Fixed Costs}}{\text{CMR}} \quad \mid \quad \text{Margin of Safety} = \frac{S - S_{\text{BE}}}{S}"
      article={
        <>
          <h2>Direct Answer: What Is the Break-Even Point &amp; How Does It Guarantee Solvency?</h2>
          <p>
            The <strong>Break-Even Point (BEP)</strong> is the foundational milestone in commercial business economics where <strong>total sales revenue exactly equals total operating expenses</strong> (Fixed Costs + Variable Costs). At the break-even volume, your enterprise earns zero economic profit and suffers zero financial loss ($EBIT = $0$).
          </p>
          <p>
            Every unit sold beyond the break-even threshold contributes 100% of its <strong>Contribution Margin</strong> directly to enterprise net operating profit. Understanding your break-even volume enables entrepreneurs and financial controllers to establish accurate product pricing, evaluate capital expenditure risk, calibrate sales commissions, and measure their downside <strong>Margin of Safety</strong> during economic downturns.
          </p>

          <BreakEvenContributionMarginChart />

          <h2>Actuarial Mathematics: Contribution Margins, Revenue Solvers &amp; Target Profits</h2>
          <p>
            The fundamental mathematical formulas governing cost-volume-profit (CVP) analysis:
          </p>

          <Formula>{"\text{Contribution Margin per Unit } (CM) = P - V"}</Formula>
          <p>
            The <strong>Contribution Margin Ratio (CMR)</strong> expresses unit profitability as a percentage of gross selling price:
          </p>
          <Formula>{"\text{Contribution Margin Ratio } (CMR) = \frac{P - V}{P} = 1 - \frac{V}{P}"}</Formula>
          <p>
            The <strong>Break-Even Sales Volume in Units (Q_BE)</strong> required to extinguish fixed overhead:
          </p>
          <Formula>{"Q_{\text{BE}} = \frac{\text{Total Fixed Overhead Costs}}{P - V} = \frac{F}{CM}"}</Formula>
          <p>
            The <strong>Break-Even Revenue in Dollars (R_BE)</strong> required across diversified or non-unit product lines:
          </p>
          <Formula>{"R_{\text{BE}} = \frac{\text{Total Fixed Overhead Costs}}{\text{CMR}} = \frac{F}{1 - (V / P)}"}</Formula>
          <p>
            When business owners need to cover overhead while securing a specific <strong>Target Net Operating Profit (&Pi;)</strong>:
          </p>
          <Formula>{"Q_{\text{Target}} = \frac{\text{Fixed Overhead Costs} + \text{Target Profit}}{P - V} = \frac{F + \Pi}{CM}"}</Formula>
          <p>
            The <strong>Margin of Safety (MoS)</strong> quantifies the percentage buffer sales can drop before the business incurs net losses:
          </p>
          <Formula>{"\text{Margin of Safety \%} = \frac{\text{Current Projected Sales} - \text{Break-Even Sales}}{\text{Current Projected Sales}} \times 100\%"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a specialized equipment manufacturer or subscription software firm operating with <strong>$120,000 in annual fixed overhead</strong> (commercial rent, base executive salaries, software licenses, property insurance). The product retails for <strong>$100.00 per unit</strong> with direct variable production costs of <strong>$40.00 per unit</strong> (materials, packaging, merchant processing fees):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Unit Contribution Margin &amp; Ratio.</strong>
              <br />Unit CM = $100.00 &minus; $40.00 = <strong>$60.00 per unit</strong>.
              <br />CMR = $60.00 / $100.00 = <strong>0.60 (60.0% contribution margin ratio)</strong>.
            </li>
            <li>
              <strong>Step 2: Calculate Break-Even Unit Volume (Q_BE).</strong>
              <br />Q_BE = $120,000 fixed overhead / $60.00 unit CM = <strong>2,000 units per year</strong> (or ~167 units/month).
            </li>
            <li>
              <strong>Step 3: Calculate Break-Even Dollar Revenue (R_BE).</strong>
              <br />R_BE = 2,000 units &times; $100.00 = $120,000 / 0.60 = <strong>$200,000.00 in gross annual sales</strong>.
            </li>
            <li>
              <strong>Step 4: Solve for Target Operating Profit of $60,000.</strong>
              <br />Required Units = ($120,000 fixed overhead + $60,000 profit) / $60.00 = $180,000 / $60 = <strong>3,000 units</strong> ($300,000 sales).
            </li>
            <li>
              <strong>Step 5: Calculate Margin of Safety at 2,800 Current Units.</strong>
              <br />Current Revenue = 2,800 &times; $100 = $280,000.
              <br />MoS = ($280,000 &minus; $200,000) / $280,000 = $80,000 / $280,000 = <strong>28.57% buffer</strong>.
              <br /><em>The company can withstand a 28.57% decline in gross sales volume before entering negative cash flow territory.</em>
            </li>
          </ol>

          <h2>Break-Even Sensitivity Matrix: Price vs. Variable Cost Levers</h2>
          <p>
            Modeling how adjusting unit retail pricing and variable cost control alters required annual break-even sales volume on $120,000 fixed overhead:
          </p>

          <DataTable
            head={["Unit Selling Price", "Variable Cost / Unit", "Unit Contribution Margin", "CMR %", "Required Break-Even Units", "Break-Even Revenue"]}
            rows={[
              ["$80.00 (Discounted)", "$40.00", "$40.00", "50.0%", "3,000 units", "$240,000"],
              ["$90.00", "$40.00", "$50.00", "55.6%", "2,400 units", "$216,000"],
              ["$100.00 (Baseline)", "$40.00", "$60.00", "60.0%", "2,000 units", "$200,000"],
              ["$100.00 (Supply Optimization)", "$30.00 (-25% COGS)", "$70.00", "70.0%", "1,715 units", "$171,500"],
              ["$120.00 (Premium Pricing)", "$40.00", "$80.00", "66.7%", "1,500 units", "$180,000"],
              ["$150.00 (High-End Tier)", "$45.00", "$105.00", "70.0%", "1,143 units", "$171,450"]
            ]}
          />

          <h2>Margin of Safety &amp; Operating Risk Health Checks</h2>
          <p>
            Monitoring your downside cushion prevents catastrophic cash flow crises during recessionary demand shocks:
          </p>

          <DataTable
            head={["Margin of Safety Tier", "MoS Range", "Enterprise Solvency Risk", "Actionable Corporate Strategy"]}
            rows={[
              ["Critical Danger Zone", "< 10%", "Extremely High / Vulnerable", "Immediate fixed cost reduction; renegotiate supplier terms and commercial leases."],
              ["Moderate Vulnerability", "10% – 24%", "Elevated Cyclical Risk", "Common in early-stage startups; build 3-month cash reserves and focus on retention."],
              ["Healthy Operations", "25% – 49%", "Strong Commercial Health", "Robust cash flow resilience; invest in marketing and inventory expansion."],
              ["Fortress Capital Position", "≥ 50%", "Minimal Downside Risk", "Dominant pricing power; explore accretive M&amp;A or dividend recapitalizations."]
            ]}
          />

          <h2>Degree of Operating Leverage (DOL) Dynamics</h2>
          <p>
            <strong>Operating Leverage</strong> measures how sensitive an enterprise&rsquo;s operating income is to percentage changes in unit sales volume. Companies with heavy fixed costs and low variable costs (such as software developers and pharmaceutical manufacturers) exhibit high operating leverage: once fixed overhead is cleared, operating profits surge exponentially. Conversely, businesses with low fixed overhead and high variable costs (consulting agencies, retail groceries) experience steadier but less dramatic profit expansion.
          </p>

          
          <h2>Multi-Product Break-Even Analysis: Sales Mix &amp; Weighted Contribution Margins</h2>
          <p>
            Most commercial enterprises sell multiple product lines with divergent profit margins rather than a single standardized unit. To calculate break-even volume across a multi-product portfolio, corporate controllers calculate the <strong>Weighted Average Contribution Margin (WACM)</strong> based on historical sales mix ratios:
          </p>
          <Formula>{"\text{WACM} = \sum_{i=1}^{k} \left( \text{Unit CM}_i \times w_i \right) \quad \text{where } \sum w_i = 1.0"}</Formula>
          <p>
            Where w_i represents each product line&rsquo;s percentage share of total unit sales volume. If a company sells 70% standard units ($40 CM) and 30% premium units ($100 CM), the WACM is (0.70 &times; $40) + (0.30 &times; $100) = $58.00. Total break-even unit volume is then derived by dividing fixed overhead by this composite weighted margin. Shifting the sales mix toward higher-margin offerings directly lowers required enterprise break-even unit thresholds.
          </p>
<h2>Essential Break-Even &amp; Cost Accounting Terminology</h2>
          <p>
            Key financial terms required to master cost-volume-profit modeling:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Fixed Costs:</strong> Overhead expenses that remain invariant regardless of production volume (rent, administrative payroll, property taxes, insurance).</li>
            <li><strong>Variable Costs:</strong> Direct production costs that scale linearly with output volume (raw materials, direct labor, freight, credit card swipe fees).</li>
            <li><strong>Contribution Margin:</strong> The portion of sales revenue remaining after paying variable costs, dedicated to covering fixed overhead.</li>
            <li><strong>Sunk Cost:</strong> Historical expenditures that have already been incurred and cannot be recovered, which must be ignored in forward pricing decisions.</li>
            <li><strong>Step-Fixed Costs:</strong> Overhead expenses that remain constant over a specific capacity range but step up abruptly once production thresholds are exceeded (e.g., leasing a second warehouse).</li>
          </ul>

          <h3>Related Business, Profit &amp; Operations Solvers</h3>
          <p>
            Optimize your enterprise operations: evaluate multi-tier margin waterfalls with our <a href="/calculators/finance/business-profit-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Business Profit Calculator</a>, calculate merchant processing deductions via the <a href="/calculators/finance/paypal-fee-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">PayPal Fee Calculator</a>, analyze project hurdle rates using the <a href="/calculators/finance/roi-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">ROI Calculator</a>, and model corporate cash flow with our <a href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Budget Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the mathematical definition of the break-even point?",
          a: "The break-even point occurs when total gross revenue exactly equals total operating expenses (Fixed Costs + Variable Costs), resulting in zero net operating profit ($EBIT = 0). Beyond this sales volume, every additional unit sold generates net profit equal to its contribution margin."
        },
        {
          q: "How does raising prices affect the break-even unit volume?",
          a: "Raising your unit selling price increases your unit contribution margin (Price minus Variable Cost). Because the denominator in the break-even formula grows larger, you need to sell significantly fewer units to cover your total fixed overhead."
        },
        {
          q: "What is the difference between Fixed Costs and Variable Costs?",
          a: "Fixed costs remain constant regardless of production or sales volume (commercial rent, full-time administrative salaries, software subscriptions). Variable costs scale directly with output volume (raw materials, packaging, direct assembly labor, shipping, payment processing fees)."
        },
        {
          q: "What is the Contribution Margin Ratio (CMR) and how is it used?",
          a: "The Contribution Margin Ratio is the unit contribution margin divided by the unit selling price (or total contribution margin divided by total sales). It indicates what percentage of each dollar in sales is available to cover fixed overhead and produce profit."
        },
        {
          q: "What is the Margin of Safety and why is it crucial for risk management?",
          a: "The Margin of Safety measures the percentage difference between actual (or projected) sales and the break-even point. It represents the maximum percentage revenue can decline during an economic recession before the enterprise begins suffering operating losses."
        },
        {
          q: "Can a business have multiple break-even points?",
          a: "Yes. When businesses encounter non-linear pricing, tiered bulk volume discounts, overtime wage penalties, or step-fixed capacity expansions (such as opening a second production facility), multiple localized break-even points emerge across output tiers."
        },
        {
          q: "How does the break-even formula factor in statutory corporate income taxes?",
          a: "Because break-even represents exactly zero taxable net income, income taxes do not affect the baseline break-even volume. However, when calculating required volume for an After-Tax Target Profit, you must gross up the target profit by dividing by (1 - Corporate Tax Rate)."
        },
        {
          q: "What is high operating leverage and what are its risks?",
          a: "High operating leverage occurs when a business has high fixed overhead but very low variable costs per unit (such as software SaaS). While profits expand exponentially once the break-even threshold is surpassed, operating losses compound equally fast if sales dip below break-even."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
