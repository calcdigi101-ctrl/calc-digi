import Calculator from "@/components/calcs/finance/credit-card-payoff-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/credit-card-payoff-calculator";
const DESCRIPTION =
  "Free credit card payoff calculator: see how long it takes to pay off a card at a fixed monthly payment, or the payment needed to be debt-free by a target date, and the total interest.";

export const metadata = calcMetadata(PATH, "Credit Card Payoff Calculator – Debt-Free Date | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Credit Card Payoff Calculator"
      intro="Find out how long it will take to clear your credit card balance and how much interest you'll pay — or what you need to pay each month to be debt-free by a date you choose."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How credit card interest works</h2>
          <p>
            Card issuers quote an annual rate (APR) but charge interest daily on your balance, which works out to roughly
            APR ÷ 12 each month. At 23% APR that&rsquo;s about 1.9% of your balance every month. If your payment barely
            exceeds that interest, almost nothing goes toward the balance — which is why paying only the minimum can take
            decades.
          </p>
          <h2>Why the minimum payment is so expensive</h2>
          <p>A $5,000 balance at 22.99% APR, with no new purchases:</p>
          <DataTable
            head={["Monthly payment", "Time to pay off", "Total interest"]}
            rows={[
              ["$100", "13 yrs 11 mos", "$11,694"],
              ["$200", "2 yrs 11 mos", "$1,871"],
              ["$300", "1 yr 9 mos", "$1,081"],
              ["$500", "1 yr", "$604"],
            ]}
          />
          <p>Doubling the payment from $100 to $200 cuts the interest by more than 80%.</p>
          <h2>Strategies to pay off cards faster</h2>
          <ul>
            <li>
              <strong>Avalanche:</strong> pay minimums on every card and put extra money on the highest-APR card first. This
              saves the most interest.
            </li>
            <li>
              <strong>Snowball:</strong> put extra money on the smallest balance first. It costs a bit more but the quick
              wins keep many people motivated.
            </li>
            <li>
              <strong>Balance transfer:</strong> a 0% intro APR card can stop interest for 12–21 months; watch for a 3–5%
              transfer fee and the rate after the promo ends.
            </li>
            <li>
              <strong>Call your issuer:</strong> asking for a lower APR works more often than people expect, especially with
              a good payment history.
            </li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Why does the calculator say my payment is too low?",
          a: "If the payment is less than or equal to the monthly interest, the balance never goes down. You need to pay more than the interest charge for any money to reach the principal.",
        },
        {
          q: "How is the credit card minimum payment calculated?",
          a: "Most US issuers use 1% of the balance plus that month's interest and fees, with a floor of about $25–$35. The minimum shrinks as the balance falls, which stretches repayment out even further.",
        },
        {
          q: "Does paying off a card improve my credit score?",
          a: "Usually yes. Lower balances reduce your credit utilization ratio, one of the largest factors in FICO and VantageScore. Keeping utilization under 30% — ideally under 10% — helps most.",
        },
      ]}
      related={[
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/net-worth-calculator", icon: "📈", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
