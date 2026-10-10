import Calculator from "@/components/calcs/finance/apy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/apy-calculator";
const DESCRIPTION =
  "Free APY calculator: convert an interest rate to annual percentage yield for any compounding frequency, including daily and continuous, and see the interest a deposit earns in a year.";

export const metadata = calcMetadata(PATH, "APY Calculator – Convert Interest Rate to Annual Percentage Yield | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="APY Calculator"
      intro="Convert a nominal interest rate into annual percentage yield (APY) and see how compounding frequency changes what you actually earn."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>APY formula</h2>
          <Formula>APY = (1 + r ÷ n)^n − 1</Formula>
          <p>
            <strong>r</strong> is the nominal annual rate as a decimal and <strong>n</strong> is the number of compounding
            periods per year. With continuous compounding the formula becomes:
          </p>
          <Formula>APY = e^r − 1</Formula>
          <h3>Example</h3>
          <p>
            A 5% rate compounded daily gives (1 + 0.05/365)^365 − 1 = <strong>5.1267%</strong> APY. On a $10,000 deposit
            that&rsquo;s $512.67 of interest in a year, instead of $500 with simple annual interest.
          </p>
          <h2>APY vs. APR</h2>
          <p>
            <strong>APR</strong> (or the &ldquo;interest rate&rdquo;) ignores compounding within the year;{" "}
            <strong>APY</strong> includes it. Under the Truth in Savings Act, US banks must show APY on deposit accounts, so
            you can compare savings accounts and CDs on equal terms. Loans are quoted in APR, which makes them look a little
            cheaper than their compounded cost.
          </p>
          <h2>Does compounding frequency matter much?</h2>
          <p>
            Less than you might think. Moving from monthly to daily compounding at 5% adds about 0.01 percentage points. The
            rate itself — and how long you leave the money — matters far more. Use the table above to compare frequencies.
          </p>
        </>
      }
      faq={[
        {
          q: "Is a higher APY always better?",
          a: "For deposits, yes, as long as the terms are comparable. Check for minimum balances, monthly fees and introductory rates that drop after a few months.",
        },
        {
          q: "Can APY change?",
          a: "On savings and money market accounts, yes — banks can change the rate at any time. A CD's APY is fixed for its term.",
        },
        {
          q: "How do I convert APY back to an interest rate?",
          a: "Rearrange the formula: r = n × [(1 + APY)^(1/n) − 1]. For example, a 5% APY compounded monthly corresponds to a 4.889% nominal rate.",
        },
      ]}
      related={[
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/investment-calculator", icon: "💼", name: "Investment" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
