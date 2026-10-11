import Calculator from "@/components/calcs/finance/cd-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/cd-calculator";
const DESCRIPTION =
  "Free CD calculator: see how much a certificate of deposit earns by maturity from its APY or interest rate and term, plus after-tax interest and a typical early-withdrawal penalty.";

export const metadata = calcMetadata(PATH, "CD Calculator – Certificate of Deposit Interest | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="CD Calculator"
      intro="Find out how much interest a certificate of deposit will earn and what it will be worth when it matures."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How CD interest is calculated</h2>
          <p>
            Banks quote CDs by <strong>APY</strong>, which already includes compounding. To find the value at maturity,
            grow the deposit by the APY for the length of the term:
          </p>
          <Formula>Maturity value = Deposit × (1 + APY)^(months ÷ 12)</Formula>
          <p>If you only know the stated interest rate and how often it compounds, convert it first:</p>
          <Formula>APY = (1 + rate ÷ n)^n − 1</Formula>
          <h3>Example</h3>
          <p>
            $10,000 in a 12-month CD at 4.25% APY is worth <strong>$10,425</strong> at maturity — $425 of interest. If the
            CD were broken early with a typical three-month interest penalty, you&rsquo;d give up about $105.
          </p>
          <h2>Things to check before opening a CD</h2>
          <ul>
            <li>
              <strong>Early-withdrawal penalty:</strong> usually 3–12 months of interest depending on the term. No-penalty CDs
              exist but pay a little less.
            </li>
            <li>
              <strong>Insurance:</strong> CDs at FDIC banks and NCUA credit unions are insured up to $250,000 per depositor,
              per institution, per ownership category.
            </li>
            <li>
              <strong>Renewal:</strong> many CDs roll over automatically at maturity, often at a lower rate. Set a reminder for
              the grace period.
            </li>
            <li>
              <strong>Laddering:</strong> splitting money across 1-, 2-, 3-, 4- and 5-year CDs gives you a maturing CD every
              year while capturing longer-term rates.
            </li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Is CD interest taxable?",
          a: "Yes, as ordinary income in the year it's credited — even if you can't withdraw it until maturity. CDs inside an IRA are tax-deferred or tax-free.",
        },
        {
          q: "Are CDs better than a high-yield savings account?",
          a: "A CD locks in a rate, which helps if rates fall, but your money is tied up. High-yield savings is flexible but its rate can drop at any time. Many people use savings for emergencies and CDs for money with a known future date.",
        },
        {
          q: "What happens if rates rise after I open a CD?",
          a: "Your rate stays the same until maturity. Some banks offer bump-up CDs that let you raise the rate once, usually at a slightly lower starting rate.",
        },
      ]}
      related={[
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/investment-calculator", icon: "📊", name: "Investment" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
