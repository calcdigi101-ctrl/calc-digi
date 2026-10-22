import Calculator from "@/components/calcs/finance/investment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/investment-calculator";
const DESCRIPTION =
  "Free investment calculator: project how a lump sum and monthly contributions grow at an expected rate of return, in nominal and inflation-adjusted dollars, with a growth chart.";

export const metadata = calcMetadata(PATH, "Investment Calculator – Portfolio Growth | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Investment Calculator"
      intro="Project how your investments could grow from a starting amount and regular monthly contributions, and see the result in today's dollars."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How the projection works</h2>
          <p>
            Each month your balance grows by the monthly equivalent of the annual return, and your contribution is added.
            The annual return is treated as an effective yearly growth rate, the way fund and index returns are usually
            reported:
          </p>
          <Formula>Monthly rate = (1 + annual return)^(1/12) − 1</Formula>
          <p>
            &ldquo;In today&rsquo;s dollars&rdquo; divides the final balance by the cumulative inflation over the period,
            so you can compare it with prices now.
          </p>
          <h3>Example</h3>
          <p>
            $10,000 plus $300 a month for 20 years at 7% grows to about <strong>$190,958</strong>. You contribute $82,000,
            so investment growth makes up $108,958 — more than half the balance. With 3% inflation, that&rsquo;s worth
            about $105,700 in today&rsquo;s money.
          </p>
          <h2>Choosing a realistic rate of return</h2>
          <DataTable
            head={["Investment mix", "Long-run return (before inflation)"]}
            rows={[
              ["US stocks (S&P 500, 1926–2024 average)", "≈ 10% a year"],
              ["60% stocks / 40% bonds", "≈ 7–8% a year"],
              ["Investment-grade bonds", "≈ 4–5% a year"],
              ["Cash / Treasury bills", "≈ 3% a year"],
            ]}
          />
          <p>
            Past returns don&rsquo;t guarantee future ones, and real returns are lumpy — a portfolio can fall 20–40% in a
            bad year. Using a conservative rate (5–7%) and checking the inflation-adjusted figure gives a more cautious plan.
          </p>
          <h2>What matters most</h2>
          <ul>
            <li>
              <strong>Time:</strong> starting ten years earlier often matters more than doubling the contribution later.
            </li>
            <li>
              <strong>Costs:</strong> a 1% annual fee can consume roughly a quarter of the final balance over 30 years. Low-cost
              index funds help.
            </li>
            <li>
              <strong>Consistency:</strong> regular contributions through market dips buy more shares when prices are low.
            </li>
          </ul>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Portfolio & Wealth Building Tools</h3>
            <p>
              Disciplined long-term investing turns regular contributions into substantial capital. Model exponential growth schedules with our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, analyze equity returns and CAGR via the <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, determine safe post-career withdrawal horizons using the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, and harness dividend reinvestment with our <a href="/calculators/finance/dividend-calculator">Dividend Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "Is this the same as a compound interest calculator?",
          a: "Very similar. This one treats the rate as an annual investment return and adds inflation adjustment and growing contributions; the compound interest calculator focuses on a stated interest rate and compounding frequency.",
        },
        {
          q: "Does this include taxes?",
          a: "No. In a 401(k), IRA or Roth IRA, growth is tax-deferred or tax-free. In a taxable brokerage account, dividends and realized gains are taxed, which lowers your effective return somewhat.",
        },
        {
          q: "Should I contribute at the start or end of the month?",
          a: "Start-of-month contributions get one extra month of growth each time, which adds up over decades. In practice, investing as soon as you're paid has the same effect.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
