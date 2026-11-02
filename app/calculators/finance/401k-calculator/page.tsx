import Calculator from "@/components/calcs/finance/401k-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FourOhOneKEmployerMatchGrowthChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/401k-calculator";
const TITLE = "401(k) Calculator – Employer Match, 2026 Limits & Retirement Balance | CalcDigi";
const DESCRIPTION =
  "Free 401(k) calculator: project retirement nest egg growth using 2026 IRS contribution limits ($24,500 deferral, catch-up, and SECURE 2.0 super catch-up). Model employer matching formulas, salary growth, and tax drag.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="401(k) Calculator"
      intro="Project your 401(k) retirement balance from salary deferrals, employer matching contributions, annual merit raises, and investment compounding under statutory 2026 IRS contribution limits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV = PV*(1 + r)^n + (EmployeePmt + EmployerMatch) * [((1 + r)^n - 1) / r]"
      article={
        <>
          <h2>Direct Answer: What Is a 401(k) &amp; How Does the Employer Match Accelerate Wealth?</h2>
          <p>
            A <strong>401(k) plan</strong> is an employer-sponsored defined-contribution retirement account defined under Section 401(k) of the Internal Revenue Code. It empowers employees to defer a portion of their gross salary on either a pre-tax basis (<strong>Traditional 401(k)</strong>, which lowers current-year taxable income) or an after-tax basis (<strong>Roth 401(k)</strong>, which allows completely tax-free withdrawals in retirement). The single most potent wealth-building feature of the 401(k) is the <strong>employer matching contribution</strong>, which delivers an immediate, risk-free 50% to 100% return on invested salary that compounds tax-sheltered for decades.
          </p>

          <Formula>Annual 401(k) Inflow = Salary × (Employee Deferral % + Employer Match %)</Formula>
          <Formula>FV_401k = PV(1 + r)^n + TotalAnnualDeposit × [((1 + r)^n − 1) ÷ r]</Formula>
          <p>
            Where:
            <br />• <strong>Employee Deferral:</strong> Voluntary salary reduction up to IRS statutory annual limit ($24,500 in 2026)
            <br />• <strong>Employer Match:</strong> Non-elective or matching company funds (does not count toward employee $24,500 limit)
            <br />• <strong>r:</strong> Annualized investment return of chosen index funds or target-date portfolios
            <br />• <strong>n:</strong> Number of working accumulation years until planned retirement
          </p>

          <FourOhOneKEmployerMatchGrowthChart />

          <h2>Statutory 2026 IRS 401(k) Contribution Limits &amp; Catch-Up Tiers</h2>
          <p>
            The table below outlines the official statutory contribution parameters established under the Internal Revenue Code and SECURE Act 2.0 for the 2026 tax year:
          </p>

          <DataTable
            head={["Contribution Category", "Eligible Age Bracket", "2026 Statutory Limit", "Key Tax Benefit"]}
            rows={[
              ["Standard Elective Deferral", "Under Age 50", "$24,500 / year", "Pre-tax salary reduction or Roth after-tax"],
              ["Standard Catch-Up Contribution", "Ages 50 to 59 & 64+", "$8,000 / year ($32,500 total)", "Accelerated pre-retirement tax shelter"],
              ["SECURE 2.0 Super Catch-Up", "Ages 60, 61, 62, and 63", "$11,250 / year ($35,750 total)", "Peak earning years maximum shelter"],
              ["Total Overall Plan Limit (Section 415c)", "All Participants", "$71,000 / year (or $79,000 with catch-up)", "Includes employee deferrals + match + profit-sharing"],
            ]}
          />

          <h2>Understanding Employer Match Formulas &amp; Vesting Schedules</h2>
          <ul>
            <li>
              <strong>Dollar-for-Dollar Match:</strong> Employer matches 100% of employee contributions up to a cap (e.g., 4% or 5% of gross pay). Contributing 5% yields an immediate 10% total savings rate.
            </li>
            <li>
              <strong>Fifty Cents on the Dollar:</strong> Employer matches 50% of employee contributions up to 6% of gross pay (a 3% maximum company contribution). Leaving this match unclaimed leaves guaranteed compensation on the table.
            </li>
            <li>
              <strong>Vesting Schedules:</strong> Employee contributions are always 100% vested immediately. However, employer matching funds may follow <em>cliff vesting</em> (0% vested until 3 years of tenure, then 100%) or <em>graded vesting</em> (20% per year over 5 or 6 years).
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement &amp; Wealth Planning Solvers</h3>
            <p>
              To construct a comprehensive retirement roadmap, model your total post-career spending needs with our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, evaluate tax-free distributions using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, forecast government safety net income via the <a href="/calculators/finance/social-security-calculator">Social Security Calculator</a>, and see how payroll contributions adjust your net income using the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the penalty for early 401(k) withdrawal before age 59½?",
          a: "Withdrawing funds from a Traditional 401(k) prior to age 59½ triggers ordinary income tax on the distributed sum plus a mandatory 10% early withdrawal penalty from the IRS, unless you qualify for an IRS exception (such as the Rule of 55 for workers leaving employment at age 55 or older).",
        },
        {
          q: "What should I do with my 401(k) when changing jobs?",
          a: "You have four primary options: 1) Roll over the balance directly into a Rollover Traditional IRA or Roth IRA (maintains tax shelter and unlocks lower-cost index funds); 2) Roll it into your new employer's 401(k) plan; 3) Leave it in your former employer's plan (if balance exceeds $5,000); or 4) Cash out (highly discouraged due to mandatory 20% withholding, income taxes, and 10% penalty).",
        },
        {
          q: "Do I have to take Required Minimum Distributions (RMDs) from a 401(k)?",
          a: "Yes. For Traditional 401(k) accounts, RMDs must begin at age 73 (rising to age 75 for individuals turning 74 after 2032 under SECURE 2.0). Notably, under SECURE 2.0, designated Roth 401(k) accounts are now exempt from RMD mandates during the participant's lifetime.",
        },
        {
          q: "Should I choose a Traditional 401(k) or Roth 401(k)?",
          a: "If you are currently in your peak earning years and expect to be in a lower tax bracket during retirement, a Traditional 401(k) provides superior tax savings today. If you are early in your career or expect taxes to increase substantially in the future, a Roth 401(k) locks in tax-free distributions.",
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
