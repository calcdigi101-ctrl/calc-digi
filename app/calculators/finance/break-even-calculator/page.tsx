import Calculator from "@/components/calcs/finance/break-even-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/break-even-calculator";
const DESCRIPTION =
  "Free break-even calculator: find how many units you must sell to cover fixed costs, your break-even revenue and contribution margin, with a cost-volume-profit chart.";

export const metadata = calcMetadata(PATH, "Break-Even Calculator – Units & Revenue Needed | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Break-Even Calculator"
      intro="Work out how many units you need to sell — and how much revenue you need — before your business starts making a profit."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Break-even formula</h2>
          <Formula>Break-even units = Fixed costs ÷ (Price − Variable cost per unit)</Formula>
          <p>
            The denominator is the <strong>contribution margin</strong> — what each sale contributes toward fixed costs. Once
            fixed costs are covered, each further unit adds its contribution margin to profit.
          </p>
          <Formula>Break-even revenue = Fixed costs ÷ Contribution margin ratio</Formula>
          <h3>Example</h3>
          <p>
            With $5,000 of monthly fixed costs, a $25 price and $10 of variable cost per unit, each sale contributes $15. You
            need <strong>334 units</strong> (5,000 ÷ 15, rounded up) — about $8,350 in sales — to break even.
          </p>
          <h2>Fixed vs. variable costs</h2>
          <ul>
            <li>
              <strong>Fixed costs</strong> don&rsquo;t change with volume in the short term: rent, salaries, insurance,
              software subscriptions, loan payments.
            </li>
            <li>
              <strong>Variable costs</strong> rise with each unit: materials, packaging, shipping, payment processing and
              sales commissions.
            </li>
          </ul>
          <h2>Ways to lower your break-even point</h2>
          <ul>
            <li>Raise prices — even small increases can cut break-even volume sharply.</li>
            <li>Negotiate supplier costs to lower variable cost per unit.</li>
            <li>Trim or defer fixed overhead.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What does it mean if price is below variable cost?",
          a: "Every sale loses money, so you can never break even no matter how much you sell. You need to raise the price or cut per-unit costs.",
        },
        {
          q: "How do I include a profit target?",
          a: "Enter the profit you want in the target field. The units needed become (fixed costs + target profit) ÷ contribution margin.",
        },
        {
          q: "Does break-even analysis work for service businesses?",
          a: "Yes — treat a billable hour, project or client as the unit, and use the costs directly tied to delivering it as the variable cost.",
        },
      ]}
      related={[
        { href: "/calculators/business/break-even-calculator", icon: "🏢", name: "Business Break-Even" },
        { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin" },
        { href: "/calculators/business/markup-calculator", icon: "📈", name: "Markup" },
        { href: "/calculators/finance/business-profit-calculator", icon: "💼", name: "Business Profit" },
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI" },
        { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
