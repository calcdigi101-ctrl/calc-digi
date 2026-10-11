import Calculator from "@/components/calcs/finance/roth-ira-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/finance/roth-ira-calculator";
const DESCRIPTION =
  "Free Roth IRA calculator with 2026 limits: project your tax-free balance at retirement and compare it with the same savings in a taxable account.";

export const metadata = calcMetadata(PATH, "Roth IRA Calculator – Tax-Free Retirement Growth | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Roth IRA Calculator"
      intro="Project how much your Roth IRA could hold at retirement — all of it tax-free — and how much more that is than saving the same money in a taxable account."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Why a Roth IRA is powerful</h2>
          <p>
            You contribute money you&rsquo;ve already paid tax on. After that, the account grows tax-free, and qualified
            withdrawals in retirement — contributions <em>and</em> decades of growth — are never taxed. In a regular brokerage
            account, dividends and gains are taxed along the way, which slows compounding.
          </p>
          <h3>Example</h3>
          <p>
            A 28-year-old with $5,000 who contributes the $7,500 maximum every year at a 7% return would have about{" "}
            <strong>$1.35 million</strong> tax-free at 65, from $282,500 of contributions. The same deposits in an account
            whose growth is taxed at 22% each year would reach about $927,000 — the Roth is worth over $420,000 more.
          </p>
          <h2>2026 Roth IRA rules</h2>
          <ul>
            <li>
              <strong>Contribution limit:</strong> $7,500, or $8,600 if you&rsquo;re 50 or older. The limit is shared across
              all your traditional and Roth IRAs.
            </li>
            <li>
              <strong>Earned income:</strong> you can only contribute up to your earned income for the year (a spouse with
              income can contribute for a non-working spouse).
            </li>
            <li>
              <strong>Income limits:</strong> eligibility phases out at higher incomes. Above the limit, many people use a
              &ldquo;backdoor&rdquo; Roth conversion instead.
            </li>
            <li>
              <strong>Withdrawals:</strong> contributions can be taken out any time. Earnings are tax- and penalty-free after
              age 59½ once the account has been open five years.
            </li>
            <li>
              <strong>No RMDs:</strong> you&rsquo;re never forced to withdraw during your lifetime.
            </li>
          </ul>
          <h2>Roth or traditional IRA?</h2>
          <p>
            Roth is usually better if your tax rate today is lower than you expect it to be in retirement — common early in
            a career. A traditional IRA gives a deduction now and is taxed later, which suits people in their peak earning
            years who expect lower income in retirement.
          </p>
        </>
      }
      faq={[
        {
          q: "When is the deadline to contribute for 2026?",
          a: "You can make 2026 contributions until the federal tax filing deadline in April 2027.",
        },
        {
          q: "Can I have a Roth IRA and a 401(k)?",
          a: "Yes. The IRA and 401(k) limits are separate, so you can contribute to both in the same year, subject to the Roth IRA income limits.",
        },
        {
          q: "What return should I assume?",
          a: "A Roth IRA can hold almost any investment. Many long-term savers use a diversified stock index fund and assume 6–7% a year; use a lower rate for a more conservative mix.",
        },
      ]}
      related={[
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
