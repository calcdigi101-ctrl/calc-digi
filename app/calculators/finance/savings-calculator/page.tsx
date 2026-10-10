import Calculator from "@/components/calcs/finance/savings-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/savings-calculator";
const DESCRIPTION =
  "Free savings calculator: find how much to save each month to reach a goal, or how much your savings will grow with monthly deposits and interest, with a year-by-year balance chart.";

export const metadata = calcMetadata(PATH, "Savings Calculator – Monthly Savings for a Goal & Interest Earned | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Savings Calculator"
      intro="Find out how much you need to set aside each month to reach a savings goal — or how much your regular deposits will grow to with interest."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How much do I need to save each month?</h2>
          <p>
            The calculator first grows your current savings at the account&rsquo;s APY until the target date. Whatever is
            still missing must come from monthly deposits, which are solved with the future-value-of-an-annuity formula:
          </p>
          <Formula>Monthly deposit = (Goal − Current × (1 + i)^n) × i ÷ [(1 + i)^n − 1]</Formula>
          <p>
            Here <strong>i</strong> is the monthly rate equivalent to the APY and <strong>n</strong> is the number of
            months. Deposits are assumed at the end of each month.
          </p>
          <h3>Example</h3>
          <p>
            To turn $2,000 into $20,000 in 3 years in a 4.5% APY high-yield account you need to save about{" "}
            <strong>$461 a month</strong>. You deposit $18,604 in total and the account pays roughly $1,396 of interest.
          </p>
          <h2>Where to keep short-term savings</h2>
          <ul>
            <li>
              <strong>High-yield savings accounts</strong> — FDIC-insured, withdraw any time, rates change with the market.
            </li>
            <li>
              <strong>Certificates of deposit (CDs)</strong> — a fixed rate for a fixed term; early withdrawal costs a penalty.
            </li>
            <li>
              <strong>Money market accounts and Treasury bills</strong> — competitive yields with high safety.
            </li>
          </ul>
          <p>
            For goals more than about five years away, a diversified investment portfolio has historically grown faster
            than savings accounts, at the cost of short-term ups and downs. Use the{" "}
            <a href="/calculators/finance/investment-calculator">investment calculator</a> for those.
          </p>
          <h2>Tips to reach a savings goal faster</h2>
          <ul>
            <li>Automate a transfer on payday so the money is saved before you can spend it.</li>
            <li>Name the account after the goal — people save more when the purpose is visible.</li>
            <li>Send windfalls such as tax refunds and bonuses straight to the goal.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What's the difference between APY and interest rate?",
          a: "The interest rate (APR) doesn't include compounding; APY does. A 4.40% rate compounded daily is about a 4.50% APY. Banks advertise APY for savings, and that's what this calculator expects.",
        },
        {
          q: "Is interest on savings taxable?",
          a: "Yes. Interest from savings accounts, CDs and money market accounts is taxed as ordinary income in the year it's paid. Your bank sends Form 1099-INT if you earn $10 or more.",
        },
        {
          q: "How much should I keep in savings?",
          a: "A common target is 3–6 months of essential expenses as an emergency fund, plus separate savings for known goals such as a car, home down payment or vacation.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/down-payment-calculator", icon: "🏡", name: "Down Payment" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
