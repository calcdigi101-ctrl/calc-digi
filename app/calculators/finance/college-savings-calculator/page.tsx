import Calculator from "@/components/calcs/finance/college-savings-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/finance/college-savings-calculator";
const DESCRIPTION =
  "Free college savings calculator: estimate future tuition with cost inflation and find the monthly amount to save in a 529 plan or other account to cover it.";

export const metadata = calcMetadata(PATH, "College Savings Calculator – 529 Savings Plan | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="College Savings Calculator"
      intro="Estimate what college will cost by the time your child enrolls and how much you need to save each month to pay for it."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How the calculation works</h2>
          <ol>
            <li>
              <strong>Future cost:</strong> today&rsquo;s annual cost is grown by college-cost inflation to each year your
              child will be enrolled, then multiplied by the share you plan to cover.
            </li>
            <li>
              <strong>Amount needed at enrollment:</strong> money for later college years can stay invested, so each
              year&rsquo;s cost is discounted back to the first day of college at your investment return.
            </li>
            <li>
              <strong>Monthly savings:</strong> after subtracting what your current savings will grow to, the remaining gap
              is spread over the months until college with the future-value-of-annuity formula.
            </li>
          </ol>
          <h3>Example</h3>
          <p>
            For a 3-year-old, with college at $30,000 a year today, 4% cost inflation, a 6% return and $5,000 already saved,
            four years of college are projected to cost about <strong>$229,000</strong>. Saving about{" "}
            <strong>$690 a month</strong> for 15 years covers it.
          </p>
          <h2>Ways to save for college</h2>
          <ul>
            <li>
              <strong>529 plans:</strong> growth is tax-free when used for qualified education expenses, and many states give a
              tax deduction for contributions. Unused money can, within limits, be rolled into the beneficiary&rsquo;s Roth
              IRA.
            </li>
            <li>
              <strong>Coverdell ESAs:</strong> tax-free growth with more investment choices, but a $2,000 yearly contribution
              limit and income restrictions.
            </li>
            <li>
              <strong>Roth IRA:</strong> contributions can be withdrawn any time, which gives flexibility if the money
              isn&rsquo;t needed for school.
            </li>
          </ul>
          <p>
            You don&rsquo;t have to cover 100%. Scholarships, grants, work-study and student earnings often fill part of the
            gap — use the &ldquo;share you plan to cover&rdquo; field to plan for that.
          </p>
        </>
      }
      faq={[
        {
          q: "How fast does college cost rise?",
          a: "Published tuition has historically grown faster than general inflation; many planners assume 3–5% a year. Net price after aid has risen more slowly in recent years.",
        },
        {
          q: "Does a 529 plan hurt financial aid?",
          a: "A parent-owned 529 is counted as a parent asset on the FAFSA, which is assessed at a maximum of about 5.64% — much less than student-owned assets.",
        },
        {
          q: "What if my child doesn't go to college?",
          a: "You can change the 529 beneficiary to another family member, use it for trade school or apprenticeships, roll up to $35,000 (lifetime) into the beneficiary's Roth IRA if the plan is 15+ years old, or withdraw it and pay tax plus a 10% penalty on the earnings.",
        },
      ]}
      related={[
        { href: "/calculators/education/student-loan-calculator", icon: "🎓", name: "Student Loan" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
