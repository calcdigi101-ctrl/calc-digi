import Calculator from "@/components/calcs/finance/child-support-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ChildSupportIncomeSharesCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/child-support-calculator";
const TITLE = "Child Support Calculator – Income Shares Model, Custody Overnights & Guidelines | CalcDigi";
const DESCRIPTION =
  "Free child support calculator: estimate monthly statutory child support payments under the Income Shares Model utilized by 41 US states. Calculate pro-rata parental income shares, health insurance add-ons, childcare costs, and shared parenting overnight credits.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Child Support Calculator"
      intro="Estimate statutory monthly child support obligations using the Income Shares Model. Calculate pro-rata parental income ratios, work-related childcare splits, healthcare insurance adjustments, and overnight parenting time credits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Support = (CombinedSupportObligation + AddOns) * PayerIncomeShare - CustodialCredit"
      article={
        <>
          <h2>Direct Answer: How Does the Statutory Income Shares Child Support Model Work?</h2>
          <p>
            The <strong>Income Shares Model</strong>—established in federal Title IV-D child support regulations and codified in <strong>41 US states</strong>—is based on the economic premise that children of divorced or separated parents should receive the same proportion of parental income that they would have enjoyed if the family had remained intact in a single household. The calculation pools both parents&rsquo; monthly gross or net incomes to establish a <strong>Combined Basic Support Obligation</strong> from statutory state economic tables. That total obligation is then allocated pro-rata according to each parent&rsquo;s proportional contribution to combined income. The non-custodial parent pays their share as a direct monthly cash transfer, while the custodial parent&rsquo;s share is absorbed directly into household child-rearing expenses.
          </p>

          <Formula>Payer Pro-Rata Income Share (%) = [Payer Net Income ÷ (Payer Net Income + Custodial Net Income)] × 100</Formula>
          <Formula>Total Child Support Need = Basic Table Obligation + Work-Related Childcare + Health Insurance Premiums</Formula>
          <Formula>Monthly Child Support Transfer = Total Support Need × Payer Income Share (%) − Payer Direct Out-of-Pocket Credits</Formula>

          <ChildSupportIncomeSharesCurveChart />

          <h2>Statutory Child Count Multipliers (Representative Economic Guidelines)</h2>
          <p>
            While each state maintains its own economic cost-of-raising-children schedule, standard guideline statutory percentages of combined parental income generally adhere to the following benchmarks (e.g., NY and CA judicial guidelines):
          </p>

          <DataTable
            head={["Number of Minor Children", "Guideline % of Combined Income", "Sample Combined $8,000/mo Total", "Payer Share at 60% Income", "Payer Share at 75% Income"]}
            rows={[
              ["1 Child", "17.0% of combined income", "$1,360 / month", "$816 / month", "$1,020 / month"],
              ["2 Children", "25.0% of combined income", "$2,000 / month", "$1,200 / month", "$1,500 / month"],
              ["3 Children", "29.0% of combined income", "$2,320 / month", "$1,392 / month", "$1,740 / month"],
              ["4 Children", "31.0% of combined income", "$2,480 / month", "$1,488 / month", "$1,860 / month"],
              ["5 or More Children", "35.0%+ of combined income", "$2,800+ / month", "$1,680 / month", "$2,100 / month"],
            ]}
          />

          <h2>Core Custody Adjustments &amp; Add-On Expenses</h2>
          <ul>
            <li>
              <strong>Shared Physical Custody &amp; Overnight Thresholds:</strong> In most states, if the paying non-custodial parent exercises significant overnight visitation (typically exceeding 90 to 128 overnights per calendar year, roughly 25%–35% of the year), a <em>Cross-Credit or Shared Parenting Formula</em> reduces the monthly transfer payment to reflect direct duplicate living expenses incurred in both homes.
            </li>
            <li>
              <strong>Mandatory Add-Ons:</strong> Work-related childcare (daycare, after-school care) and the children&rsquo;s portion of medical/dental/vision insurance premiums are strictly added on top of basic support, split in direct proportion to parental income shares.
            </li>
            <li>
              <strong>Federal Tax Status:</strong> Under federal tax law, child support payments are <strong>completely non-taxable to the recipient parent</strong> and <strong>non-deductible for the paying parent</strong>.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Family Planning &amp; Support Solvers</h3>
            <p>
              Statutory child support payments represent one critical pillar of ongoing family welfare. Model accompanying spousal maintenance using our <a href="/calculators/finance/alimony-calculator">Alimony Calculator</a>, plan for your child's future higher education via the <a href="/calculators/finance/college-savings-calculator">College Savings Calculator</a>, structure a balanced post-divorce spending plan with the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, and verify net cash flow using the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What states do NOT use the Income Shares child support model?",
          a: "Six states (Alaska, Mississippi, Nevada, North Dakota, Texas, and Wisconsin) utilize the 'Percentage of Obligor Income Model', which calculates support strictly as a flat percentage of the non-custodial parent's income without factoring in the custodial parent's earnings. Three states (Delaware, Hawaii, and Montana) use the 'Melson Formula', a complex hybrid that ensures parents retain basic self-support reserves before surplus is allocated to children.",
        },
        {
          q: "How long does the legal obligation to pay child support last?",
          a: "In most US jurisdictions, child support terminates upon the child reaching the age of majority (typically age 18) or graduating from high school (up to age 19). However, several states extend statutory support to age 21 or through college matriculation (e.g., New York, Massachusetts), or indefinitely if the adult child is disabled.",
        },
        {
          q: "Can child support orders be modified after the divorce decree?",
          a: "Yes. Courts permit child support modifications upon a showing of a 'substantial and material change in circumstances'—such as an involuntary 15%–20% change in either parent's income, severe job loss, significant changes in parenting time overnights, or substantial changes in recurring medical or daycare expenses.",
        },
        {
          q: "What happens if a parent intentionally quits their job to avoid paying child support?",
          a: "Family court judges will 'impute income' to a parent who is voluntarily unemployed or underemployed. The court assesses support based on what the parent could reasonably earn given their education, employment history, and prevailing local labor market conditions, rather than their artificial zero-dollar income.",
        },
      ]}
      related={[
        { href: "/calculators/finance/alimony-calculator", icon: "⚖️", name: "Alimony" },
        { href: "/calculators/baby/childcare-cost-calculator", icon: "🧸", name: "Childcare Cost" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/college-savings-calculator", icon: "🎓", name: "College Savings" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
