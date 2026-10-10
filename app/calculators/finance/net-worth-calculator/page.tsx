import Calculator from "@/components/calcs/finance/net-worth-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/net-worth-calculator";
const DESCRIPTION =
  "Free net worth calculator: add up your assets and debts to find your net worth and compare it with the US median for your age from the Federal Reserve.";

export const metadata = calcMetadata(PATH, "Net Worth Calculator – Assets, Debts & Median by Age | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Net Worth Calculator"
      intro="Add up what you own and what you owe to find your net worth, and see how it compares with other US households your age."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Net worth formula</h2>
          <Formula>Net worth = Total assets − Total liabilities</Formula>
          <p>
            Use current market values for assets (what your home or car would sell for today, your account balances) and
            current payoff amounts for debts.
          </p>
          <h2>Median net worth by age</h2>
          <DataTable
            head={["Age of household head", "Median net worth"]}
            rows={[
              ["Under 35", "$39,000"],
              ["35–44", "$135,600"],
              ["45–54", "$247,200"],
              ["55–64", "$364,500"],
              ["65–74", "$409,900"],
              ["75+", "$335,600"],
            ]}
          />
          <p>Source: Federal Reserve Survey of Consumer Finances, 2022 (the most recent survey). Averages are much higher because a few very wealthy households pull them up, so the median is the better benchmark.</p>
          <h2>How to grow your net worth</h2>
          <ul>
            <li>Pay down high-interest debt — every dollar repaid raises net worth by a dollar.</li>
            <li>Invest consistently in retirement accounts, especially with an employer match.</li>
            <li>Spend less than you earn and automate the difference into savings.</li>
            <li>Remember that cars lose value; homes and investments usually gain it over long periods.</li>
          </ul>
          <p>Track it once or twice a year — the trend matters more than any single number.</p>
        </>
      }
      faq={[
        {
          q: "Is a negative net worth bad?",
          a: "It's common early in adulthood, especially with student loans. What matters is that it's moving up. Focus on paying down debt and building savings.",
        },
        {
          q: "Should I include my home?",
          a: "Yes — include the home's market value as an asset and the mortgage as a liability. Some people also track net worth excluding the home to see their liquid wealth.",
        },
        {
          q: "Should I include retirement accounts?",
          a: "Yes. Remember that traditional 401(k) and IRA balances will be taxed when withdrawn, so their after-tax value is somewhat lower.",
        },
      ]}
      related={[
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
