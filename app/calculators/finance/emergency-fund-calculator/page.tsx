import Calculator from "@/components/calcs/finance/emergency-fund-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/finance/emergency-fund-calculator";
const DESCRIPTION =
  "Free emergency fund calculator: find how much to keep for 3–12 months of essential expenses, how close you are, and how long it will take to fully fund it.";

export const metadata = calcMetadata(PATH, "Emergency Fund Calculator – How Much Should I Save? | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Emergency Fund Calculator"
      intro="Work out how big your emergency fund should be, how far along you are, and when you'll reach your target."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How much emergency savings do you need?</h2>
          <p>
            An emergency fund covers your <strong>essential</strong> expenses — housing, utilities, food, insurance,
            transportation and minimum debt payments — if your income stops or a large unexpected bill arrives. Leave out
            spending you could pause in a crisis, like dining out or vacations.
          </p>
          <ul>
            <li><strong>3 months</strong> if you have a stable job, a second household income and low fixed costs.</li>
            <li><strong>6 months</strong> is the standard recommendation for most households.</li>
            <li><strong>9–12 months</strong> if you&rsquo;re self-employed, work on commission, are the sole earner or work in a volatile industry.</li>
          </ul>
          <h3>Example</h3>
          <p>
            With $3,100 of monthly essentials, a 6-month fund is <strong>$18,600</strong>. Starting from $2,000 and adding $400
            a month, you&rsquo;d be fully funded in about 3½ years.
          </p>
          <h2>Where to keep it</h2>
          <ul>
            <li>A high-yield savings account — FDIC-insured, earns interest, and you can withdraw any time.</li>
            <li>A money market account or short-term Treasury bills for part of a larger fund.</li>
            <li>Not in stocks: an emergency often arrives when markets are down.</li>
          </ul>
          <h2>Build it in stages</h2>
          <p>
            Start with a $1,000–$2,000 starter fund, then pay off high-interest debt, then build the full fund. Refill it
            whenever you use it.
          </p>
        </>
      }
      faq={[
        {
          q: "Should I save an emergency fund or pay off debt first?",
          a: "Get a small starter fund first so surprises don't go back on a credit card, then focus on high-interest debt, then finish the full fund.",
        },
        {
          q: "Does my emergency fund count as savings for retirement?",
          a: "No. Keep them separate — the emergency fund must be safe and available, while retirement money is invested for the long term.",
        },
        {
          q: "What counts as an emergency?",
          a: "Job loss, urgent medical or dental bills, essential car or home repairs, and emergency travel. Planned expenses like holidays or a new phone should have their own savings goals.",
        },
      ]}
      related={[
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
