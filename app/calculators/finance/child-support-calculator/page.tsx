import Calculator from "@/components/calcs/finance/child-support-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ChildSupportIncomeSharesCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/child-support-calculator";
const TITLE = "Child Support Calculator";
const DESCRIPTION =
  "Free child support calculator: model state statutory income shares formulas, parental income allocation ratios, overnight custody time credits, and mandatory.";

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
      ]} title="Child Support Calculator"
      intro="Estimate statutory child support obligations using the Income Shares Model. Calculate proportional parental net income splits, overnight parenting time adjustments, and childcare add-ons."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Parent Obligation} = \text{BCSO} \times \left( \frac{I_1}{I_1 + I_2} \right) \times \left[ 1 - \left( \frac{\text{Overnights}}{365} \right) \right] + \Delta \text{AddOns}"
      article={
        <>
          <h2>Direct Answer: How Does the Income Shares Model Determine Child Support?</h2>
          <p>
            In the United States, 41 states and territories utilize the <strong>Income Shares Model</strong> to calculate statutory child support obligations. This model is built on the economic principle that children should receive the <strong>exact same proportion of parental income</strong> they would have enjoyed had the parents remained living together in an intact household.
          </p>
          <p>
            The court first calculates the <strong>Combined Parental Adjusted Net Income</strong> and looks up the state-mandated <strong>Basic Child Support Obligation (BCSO)</strong> from statutory economic schedule tables. Each parent is assigned a proportional share of this obligation matching their share of total income. Finally, the paying parent (the obligor) receives credit for <strong>overnight parenting time</strong> and direct payments for mandatory add-ons (health insurance, work-related daycare, and unreimbursed medical expenses).
          </p>

          <ChildSupportIncomeSharesCurveChart />

          <h2>Actuarial Mathematics: Statutory Economic Schedules &amp; Overnight Adjustments</h2>
          <p>
            The mathematical formulas governing statutory child support determination:
          </p>

          <Formula>{"\text{Combined Parental Income } (I_{\text{combined}}) = I_{\text{obligor}} + I_{\text{obligee}}"}</Formula>
          <p>
            Each parent&rsquo;s proportional financial responsibility is their <strong>Income Share Ratio (&alpha;)</strong>:
          </p>
          <Formula>{"\alpha_{\text{obligor}} = \frac{I_{\text{obligor}}}{I_{\text{combined}}} \quad \mid \quad \alpha_{\text{obligee}} = \frac{I_{\text{obligee}}}{I_{\text{combined}}}"}</Formula>
          <p>
            The state schedule table determines the <strong>Basic Child Support Obligation (BCSO)</strong> based on combined income and the number of qualifying minor children:
          </p>
          <Formula>{"\text{Base Parent Share} = \text{BCSO} \times \alpha_{\text{obligor}}"}</Formula>
          <p>
            Mandatory extraordinary child rearing add-ons (work-related childcare, health insurance premiums, mandatory education fees) are allocated proportionally:
          </p>
          <Formula>{"\text{Total Obligation} = \text{Base Parent Share} + \left( \text{Total Add-Ons} \times \alpha_{\text{obligor}} \right) - \text{Direct Add-On Paid by Obligor}"}</Formula>
          <p>
            When the non-custodial parent exercises substantial overnight parenting time (typically exceeding 73 to 110 overnights annually, or 20%&ndash;30%), an <strong>Overnight Parenting Time Adjustment Credit</strong> is applied:
          </p>
          <Formula>{"\text{Adjusted Transfer Payment} = \text{Total Obligation} \times \left[ 1 - \left( \frac{\text{Obligor Overnights}}{365} \right)^{1.5} \right]"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a case involving <strong>two minor children</strong> where the <strong>Father (Obligor) earns $6,000/month net</strong> and the <strong>Mother (Obligee) earns $4,000/month net</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Determine Combined Income &amp; Proportional Shares.</strong>
              <br />Combined Net Income = $6,000 + $4,000 = $10,000/month.
              <br />Father&rsquo;s Income Share = $6,000 / $10,000 = <strong>60.0%</strong>.
              <br />Mother&rsquo;s Income Share = $4,000 / $10,000 = <strong>40.0%</strong>.
            </li>
            <li>
              <strong>Step 2: Lookup Basic Child Support Obligation (BCSO).</strong>
              <br />Under standard state statutory economic schedule tables for two children at $10,000 combined net income:
              <br /><em>BCSO Table Guideline = <strong>$1,800.00 / month</strong>.</em>
              <br />Father&rsquo;s Base Share = $1,800 &times; 60% = $1,080.00/month.
            </li>
            <li>
              <strong>Step 3: Factor in Mandatory Healthcare &amp; Childcare Add-Ons.</strong>
              <br />Mother pays $600/month in mandatory work-related daycare directly to provider.
              <br />Father pays $200/month in health and dental insurance premiums for the children directly to his employer payroll.
              <br />Total Child Add-Ons = $600 + $200 = $800/month.
              <br />Father&rsquo;s proportional share of add-ons = $800 &times; 60% = $480.00.
              <br />Father receives credit for the $200 insurance he pays directly: Net Add-On = $480 &minus; $200 = <strong>+$280.00</strong>.
            </li>
            <li>
              <strong>Step 4: Apply Parenting Time Overnight Credit.</strong>
              <br />Father exercises <strong>110 overnights annually</strong> (30.1% parenting time, qualifying for shared custody credit).
              <br />Applying state cross-credit formula reduces obligation by $210.00.
              <br /><em>Final Monthly Child Support Payment = $1,080 (base) + $280 (add-on) &minus; $210 (custody credit) = <strong>$1,150.00 / month</strong> paid by Father to Mother.</em>
            </li>
          </ol>

          <h2>Child Support Calculation Models Across US Jurisdictions</h2>
          <p>
            State family law courts utilize three distinct statutory frameworks to determine baseline child support awards:
          </p>

          <DataTable
            head={["Support Model Framework", "States Utilizing", "Core Operational Philosophy", "Impact of Custodial Parent Income"]}
            rows={[
              ["Income Shares Model (Standard)", "41 States (CA, NY, FL, IL, PA, OH)", "Children receive same expenditure share as in intact home.", "High custodial income directly lowers paying parent's obligation."],
              ["Percentage of Obligor Income", "6 States (TX, NV, MS, ND, WI, AK)", "Support is a flat statutory percentage of obligor's net income.", "Custodial parent's earnings are completely ignored in baseline formula."],
              ["Melson Formula (Hybrid Model)", "3 States (DE, HI, MT)", "Allocates parental basic self-support reserves first, then shares surplus.", "Ensures parents maintain minimum subsistence standard of living first."]
            ]}
          />

          <h2>Parenting Time Overnight Schedules &amp; Custody Thresholds</h2>
          <p>
            How annual overnight visitation affects child support obligations across standard custody tiers:
          </p>

          <DataTable
            head={["Custody Arrangement Tier", "Annual Overnights Range", "Parenting Time Credit Applied", "Financial Implication"]}
            rows={[
              ["Sole / Primary Custody", "< 73 Overnights (< 20%)", "No credit applied (0% reduction)", "Full statutory guideline obligation paid by obligor."],
              ["Substantial Visitation Tier", "73 – 109 Overnights (20% – 29%)", "Standard sliding-scale adjustment", "Modest 10% – 20% discount to offset duplicate household food and housing."],
              ["Shared Physical Custody", "110 – 182 Overnights (30% – 49%)", "Cross-credit formula applied", "Significant reduction (30% – 50% discount) reflecting dual-household expenses."],
              ["Equal 50/50 Joint Custody", "Exactly 182.5 Overnights (50%)", "Full 50/50 cross-credit offset", "Parent with higher income pays only the net mathematical income differential."]
            ]}
          />

          
          <h2>Extraordinary Medical, Private Tuition &amp; Extracurricular Activity Add-Ons</h2>
          <p>
            Beyond baseline food and shelter, family courts establish specific allocation rules for extraordinary expenses:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Unreimbursed Medical &amp; Orthodontic Costs:</strong> Most state statutes mandate that out-of-pocket medical, dental, prescription, and psychological counseling expenses exceeding a $250 annual baseline deductible are split between parents according to their respective income share ratios.
            </li>
            <li>
              <strong>Private School Tuition:</strong> While public education is free, courts may order proportional contributions to private schooling if the child attended private school during the intact marriage or has documented special educational needs.
            </li>
            <li>
              <strong>Competitive Extracurricular Activities:</strong> High-cost athletics, dance academies, or musical instruments require mutual parental written consent or specific judicial approval before mandatory cost-sharing applies.
            </li>
          </ul>
<h2>Essential Child Support Legal Terminology</h2>
          <p>
            Key family law concepts required to navigate statutory support orders:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Obligor:</strong> The parent legally ordered by court decree to remit child support payments (typically the non-custodial or higher-earning parent).</li>
            <li><strong>Obligee:</strong> The parent legally designated to receive child support payments on behalf of the minor children.</li>
            <li><strong>Imputed Income:</strong> Potential income assigned to an underemployed or voluntarily unemployed parent based on work history and prevailing local wages.</li>
            <li><strong>Mandatory Add-Ons:</strong> Child-related expenses required by statute to be split proportionally (childcare, healthcare insurance, extraordinary medical costs).</li>
            <li><strong>Age of Majority:</strong> The legal age (typically 18 or high school graduation) at which statutory child support automatically terminates.</li>
          </ul>

          <h3>Related Family, Tax &amp; Income Solvers</h3>
          <p>
            Manage household transitions and legal obligations: model divorce spousal maintenance with our <a href="/calculators/finance/alimony-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Alimony Calculator</a>, calculate post-tax family take-home pay using the <a href="/calculators/finance/take-home-pay-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Take-Home Pay Calculator</a>, plan college funding with the <a href="/calculators/finance/college-savings-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">College Savings Calculator</a>, and recalibrate family finances via our <a href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Budget Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "How does the Income Shares Model differ from a flat percentage model?",
          a: "The Income Shares Model pools both parents' incomes to determine the total financial expenditure needed for the children, then divides that responsibility proportionally according to each parent's share of income. In contrast, flat percentage states (like Texas) calculate support based entirely on the obligor's income, ignoring what the custodial parent earns."
        },
        {
          q: "Is child support taxable for the recipient or tax-deductible for the payer?",
          a: "No. Under federal IRS tax law, child support payments are 100% tax-free to the recipient and cannot be deducted by the paying parent. Child support transfers are treated as personal post-tax familial financial duties."
        },
        {
          q: "How do overnight custody schedules reduce child support payments?",
          a: "When a non-custodial parent has substantial overnight visitation (typically over 73 to 110 nights per year), states apply a shared-custody cross-credit formula. This acknowledges that the paying parent directly incurs duplicate housing, utility, and grocery expenses while caring for the children."
        },
        {
          q: "What happens if a parent voluntarily quits their job or accepts a low-paying job?",
          a: "Courts can 'impute' income. If the judge determines a parent is voluntarily underemployed or unemployed to avoid child support, the court calculates support based on their historical earning capacity, educational credentials, and prevailing regional job market wages."
        },
        {
          q: "Can child support be modified after the divorce decree is finalized?",
          a: "Yes. Either parent can petition the court for a modification upon demonstrating a 'substantial and material change in circumstances,' such as a 15% to 20% shift in parental income, involuntary job loss, changes in overnight custody schedules, or medical disability."
        },
        {
          q: "Are college tuition and adult higher education expenses included in child support?",
          a: "In most states, child support terminates at age 18 or high school graduation. However, in states like New York, New Jersey, and Illinois, family courts possess statutory authority to order divorced parents to contribute proportionally toward post-secondary college tuition."
        },
        {
          q: "How are child health insurance premiums and daycare costs handled?",
          a: "They are classified as mandatory statutory add-ons. The total monthly cost is split between both parents according to their respective income share ratios. The parent who pays the insurance premium directly to their employer receives a dollar-for-dollar credit against their monthly support transfer."
        },
        {
          q: "Does remarrying affect a parent's child support obligation?",
          a: "Generally, no. A new spouse has no legal obligation to support children from a prior relationship. The new spouse's income is excluded from child support calculations, though it may indirectly alter tax filing brackets or household shared expenses."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
