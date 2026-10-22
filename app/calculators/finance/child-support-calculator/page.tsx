import Calculator from "@/components/calcs/finance/child-support-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/child-support-calculator";
const DESCRIPTION =
  "Free child support calculator: estimate monthly child support with the income-shares method, based on both parents' incomes, number of children and childcare costs.";

export const metadata = calcMetadata(PATH, "Child Support Calculator – Income Shares Estimate | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Child Support Calculator"
      intro="Estimate monthly child support using the income-shares approach that most US states follow."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How the income-shares model works</h2>
          <p>
            Most states assume children should receive the same share of parental income they would have if the parents lived
            together. The steps are:
          </p>
          <ol>
            <li>Add both parents&rsquo; incomes.</li>
            <li>Apply a guideline percentage for the number of children to get the total support obligation.</li>
            <li>Split that obligation in proportion to each parent&rsquo;s share of income. The non-custodial parent pays their share; the custodial parent&rsquo;s share is spent directly on the children.</li>
          </ol>
          <DataTable
            head={["Children", "Share of combined income"]}
            rows={[
              ["1", "17%"],
              ["2", "25%"],
              ["3", "29%"],
              ["4", "31%"],
              ["5+", "35% or more"],
            ]}
          />
          <p>These are New York&rsquo;s guideline percentages, used here as a representative example.</p>
          <h3>Example</h3>
          <p>
            Parents earning $60,000 and $36,000 have a combined $96,000. For one child, 17% is $16,320 a year. The paying
            parent earns 62.5% of the total, so their share is about <strong>$850 a month</strong>.
          </p>
          <h2>Other things that change the amount</h2>
          <ul>
            <li>Parenting time — many states reduce support when the paying parent has the children a significant share of nights.</li>
            <li>Childcare, health insurance and extraordinary medical or education costs, usually split by income share.</li>
            <li>Income caps above which courts use discretion, and minimum orders for low incomes.</li>
            <li>Deductions such as taxes, other child support paid, or support for other children.</li>
          </ul>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Family Planning & Support Tools</h3>
            <p>
              Statutory child support payments represent one critical pillar of ongoing family welfare. Model accompanying spousal maintenance using our <a href="/calculators/finance/alimony-calculator">Alimony Calculator</a>, plan for your child's future higher education via the <a href="/calculators/finance/college-savings-calculator">College Savings Calculator</a>, structure a balanced post-divorce spending plan with the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, and verify net cash flow using the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "Which states don't use income shares?",
          a: "A handful use the percentage-of-income model (based only on the paying parent's income) or the Melson formula. Your state's child support agency publishes the exact worksheet.",
        },
        {
          q: "Is child support taxable?",
          a: "No. Child support isn't taxable income for the recipient and isn't deductible for the payer.",
        },
        {
          q: "How long does child support last?",
          a: "Usually until the child turns 18 or finishes high school; some states extend it to 21 or for college or a disability.",
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
