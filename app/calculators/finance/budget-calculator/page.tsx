import Calculator from "@/components/calcs/finance/budget-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/budget-calculator";
const DESCRIPTION =
  "Free budget calculator: split your take-home pay with the 50/30/20 rule or another budget rule, and compare it with what you spend now.";

export const metadata = calcMetadata(PATH, "Budget Calculator – 50/30/20 Rule Monthly Budget | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Budget Calculator"
      intro="Split your monthly take-home pay into needs, wants and savings with a simple budget rule — and see how your current spending compares."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>The 50/30/20 rule</h2>
          <DataTable
            head={["Bucket", "Share", "Includes"]}
            rows={[
              ["Needs", "50%", "Rent or mortgage, utilities, groceries, insurance, transportation, minimum debt payments"],
              ["Wants", "30%", "Dining out, entertainment, travel, subscriptions, shopping"],
              ["Savings & debt", "20%", "Emergency fund, retirement, investing, extra debt payments"],
            ]}
          />
          <p>
            Popularized by Senator Elizabeth Warren in <em>All Your Worth</em>, the rule is a simple starting point. On $4,000
            a month of take-home pay it means $2,000 for needs, $1,200 for wants and <strong>$800 for savings</strong>.
          </p>
          <h2>Choosing a rule</h2>
          <ul>
            <li>
              <strong>60/20/20</strong> fits high-cost cities where housing alone takes a large share.
            </li>
            <li>
              <strong>70/20/10</strong> is a realistic floor when money is tight — focus on keeping needs from growing.
            </li>
            <li>
              <strong>50/20/30</strong> suits people chasing a goal like early retirement or a home down payment.
            </li>
          </ul>
          <h2>Making a budget stick</h2>
          <ul>
            <li>Automate savings on payday so it happens before spending.</li>
            <li>Track spending for a month to see where money actually goes.</li>
            <li>Review subscriptions and recurring bills every few months.</li>
            <li>Keep housing near 30% of take-home pay — it&rsquo;s the hardest cost to cut later.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Is the 50/30/20 rule based on gross or net income?",
          a: "Net — your take-home pay after taxes and payroll deductions. If you already save through a 401(k) at work, you can count that toward the 20%.",
        },
        {
          q: "Where does debt go?",
          a: "Minimum required payments are needs. Anything extra you pay to get out of debt faster counts toward the savings bucket.",
        },
        {
          q: "What if my needs are more than 50%?",
          a: "That's common, especially for renters in expensive areas. Use a rule like 60/20/20 for now and look for ways to bring fixed costs down over time.",
        },
      ]}
      related={[
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/housing/rent-calculator", icon: "🏢", name: "Rent Affordability" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
