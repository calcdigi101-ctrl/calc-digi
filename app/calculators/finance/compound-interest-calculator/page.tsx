import Calculator from "@/components/calcs/finance/compound-interest-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/compound-interest-calculator";
const TITLE = "Compound Interest Calculator – Savings Growth | CalcDigi";
const DESCRIPTION =
  "Free compound interest calculator. See how an initial investment and monthly contributions grow over time with daily, monthly, quarterly or annual compounding, with a year-by-year table.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Compound Interest Calculator"
      intro="See how your savings grow when interest earns interest. Add a starting balance, regular monthly deposits and a rate to project your balance year by year."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>What is compound interest?</h2>
          <p>
            Compound interest is interest calculated on both your original deposit and on the interest already added to
            it. Simple interest only ever pays on the original amount. Over long periods the difference is dramatic: the
            interest you earn in later years can dwarf everything you contributed.
          </p>
          <h2>Compound interest formula</h2>
          <Formula>A = P(1 + r/n)^(n·t)</Formula>
          <p>
            <strong>A</strong> is the final amount, <strong>P</strong> the principal, <strong>r</strong> the annual rate
            as a decimal, <strong>n</strong> the number of compounding periods per year and <strong>t</strong> the number
            of years. Regular contributions add the future value of an annuity:
          </p>
          <Formula>FV = PMT × [(1 + i)^N − 1] ÷ i</Formula>
          <p>
            where <strong>PMT</strong> is the monthly deposit, <strong>i</strong> the effective monthly rate and{" "}
            <strong>N</strong> the number of months. Deposits made at the start of each month earn one extra month of
            interest, so multiply by (1 + i).
          </p>
          <h3>Example</h3>
          <p>
            $10,000 invested at 7% compounded monthly, plus $200 a month for 20 years, grows to about{" "}
            <strong>$144,600</strong>. You put in $58,000; the remaining $86,600 is interest.
          </p>
          <h2>How compounding frequency changes the result</h2>
          <p>More frequent compounding raises the effective annual yield (APY), but the effect is small next to rate and time.</p>
          <DataTable
            head={["Compounding", "Effective annual yield at 7%"]}
            rows={[
              ["Annually", "7.000%"],
              ["Quarterly", "7.186%"],
              ["Monthly", "7.229%"],
              ["Daily", "7.250%"],
            ]}
          />
          <h2>The Rule of 72</h2>
          <p>
            Divide 72 by your annual rate to estimate how many years it takes money to double. At 6% it doubles in about
            12 years; at 9%, about 8 years. It is a quick sanity check for the projections above.
          </p>
        </>
      }
      faq={[
        {
          q: "How often is interest compounded on a savings account?",
          a: "Most US savings accounts and CDs compound daily and credit interest monthly. Brokerage returns are not compounded on a schedule; use an average annual return as an approximation.",
        },
        {
          q: "What rate of return should I use?",
          a: "Use the APY for savings accounts and CDs. For a diversified stock portfolio, many planners use 5–7% after inflation, or 7–10% before inflation, based on long-run US market history. Returns are never guaranteed.",
        },
        {
          q: "Does this account for taxes and inflation?",
          a: "No. Results are nominal and pre-tax. To see today's purchasing power, lower the rate by expected inflation (around 2–3%), or use a tax-advantaged account such as a 401(k) or Roth IRA.",
        },
        {
          q: "Why do contributions at the start of the month grow faster?",
          a: "Money deposited at the start of a period earns interest for that whole period, so every deposit compounds one month longer than an end-of-month deposit.",
        },
      ]}
      related={[
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation Calculator" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
