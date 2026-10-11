import Calculator from "@/components/calcs/finance/401k-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/401k-calculator";
const DESCRIPTION =
  "Free 401(k) calculator with 2026 IRS limits: project your balance at retirement from your contributions, employer match, salary growth and investment returns.";

export const metadata = calcMetadata(PATH, "401(k) Calculator – Balance with Employer Match | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="401(k) Calculator"
      intro="Estimate your 401(k) balance at retirement from your contribution rate, employer match, raises and investment returns — using the 2026 IRS contribution limits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>2026 401(k) contribution limits</h2>
          <DataTable
            head={["Limit", "2026 amount"]}
            rows={[
              ["Employee deferral (under 50)", "$24,500"],
              ["Catch-up, age 50+", "+$8,000 (total $32,500)"],
              ["Super catch-up, ages 60–63", "+$11,250 (total $35,750)"],
            ]}
          />
          <p>
            Employer matching contributions don&rsquo;t count toward the employee limit. The calculator caps your
            contribution at the limit for your age each year. Real limits rise with inflation, so this is conservative.
          </p>
          <h2>How employer matching works</h2>
          <p>
            A typical formula is &ldquo;50% of your contributions up to 6% of pay&rdquo;. If you earn $65,000 and contribute
            6% ($3,900), your employer adds $1,950. Contribute only 3% and you get just $975 — the rest of the match is
            lost. Always contribute at least enough to get the full match; it&rsquo;s an instant 50–100% return.
          </p>
          <h3>Example</h3>
          <p>
            A 30-year-old earning $65,000 with $20,000 saved, contributing 6% with that match, 3% raises and 7% returns,
            reaches about <strong>$1.4 million</strong> at 65 — around $499,000 in today&rsquo;s dollars. At 3% the balance
            is about $809,000.
          </p>
          <h2>Traditional vs. Roth 401(k)</h2>
          <ul>
            <li>
              <strong>Traditional:</strong> contributions reduce your taxable income now; withdrawals are taxed in retirement.
            </li>
            <li>
              <strong>Roth:</strong> contributions are made after tax; qualified withdrawals, including all growth, are
              tax-free.
            </li>
          </ul>
          <p>If you expect a higher tax rate in retirement, Roth usually wins; if lower, traditional does. Many people split between both.</p>
        </>
      }
      faq={[
        {
          q: "When can I withdraw from my 401(k) without penalty?",
          a: "Generally from age 59½. Earlier withdrawals usually owe income tax plus a 10% penalty, with exceptions such as leaving your employer in or after the year you turn 55.",
        },
        {
          q: "What happens to my 401(k) if I change jobs?",
          a: "Your own contributions are always yours. Employer contributions may vest over several years. You can leave the money in the old plan, roll it into your new employer's plan, or roll it into an IRA.",
        },
        {
          q: "Do I have to take required minimum distributions?",
          a: "Yes, from traditional 401(k)s starting at age 73 (75 for people born in 1960 or later). Roth 401(k)s no longer require distributions during the owner's lifetime.",
        },
      ]}
      related={[
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/social-security-calculator", icon: "🏛️", name: "Social Security" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
