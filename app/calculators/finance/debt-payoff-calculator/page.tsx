import Calculator from "@/components/calcs/finance/debt-payoff-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/debt-payoff-calculator";
const DESCRIPTION =
  "Free debt payoff calculator: find your debt-free date, total interest, and how much time and money an extra monthly payment saves, with a payoff timeline chart.";

export const metadata = calcMetadata(PATH, "Debt Payoff Calculator – Debt-Free Date & Interest Saved | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Debt Payoff Calculator"
      intro="See when you'll be debt-free at your current payment, and how much sooner an extra monthly payment gets you there."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How the payoff date is calculated</h2>
          <p>
            Each month, interest is added at your APR ÷ 12, then your payment is subtracted. The calculator repeats this
            until the balance reaches zero. Because interest is charged on the remaining balance, every extra dollar paid
            early reduces all the interest that would have followed it.
          </p>
          <h2>What a bigger payment does</h2>
          <p>$8,000 of debt at 19.99% APR:</p>
          <DataTable
            head={["Monthly payment", "Months to pay off", "Total interest"]}
            rows={[
              ["$200", "67", "$5,288"],
              ["$300", "36", "$2,667"],
              ["$400", "25", "$1,812"],
              ["$500", "19", "$1,382"],
            ]}
          />
          <p>Going from $200 to $300 a month saves 31 months and more than $2,600.</p>
          <h2>Avalanche vs. snowball</h2>
          <p>If you have several debts, enter the total balance and a weighted average rate here, then choose an order:</p>
          <ul>
            <li>
              <strong>Debt avalanche</strong> — extra money to the highest interest rate first. Mathematically the cheapest.
            </li>
            <li>
              <strong>Debt snowball</strong> — extra money to the smallest balance first. Slightly more interest, but
              paying off whole accounts quickly helps many people stick with the plan.
            </li>
          </ul>
          <p>Either way, keep paying at least the minimum on every account so you avoid late fees and credit damage.</p>
        </>
      }
      faq={[
        {
          q: "Should I pay off debt or save first?",
          a: "Most planners suggest a small starter emergency fund (around $1,000–$2,000) first, so a surprise expense doesn't go back on a card, then aggressive payoff of high-interest debt, then a full 3–6 month emergency fund.",
        },
        {
          q: "Is debt consolidation worth it?",
          a: "It can be if the new loan's APR, including fees, is clearly lower than your current average rate and you don't run the old balances back up. Use this calculator twice — once with your current rate and once with the consolidation rate — to compare.",
        },
        {
          q: "How do I find my average interest rate?",
          a: "Multiply each balance by its APR, add the results, and divide by the total balance. For example, $5,000 at 24% and $3,000 at 12% average 19.5%.",
        },
      ]}
      related={[
        { href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff" },
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/net-worth-calculator", icon: "📈", name: "Net Worth" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
