import Calculator from "@/components/calcs/finance/401k-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FourOhOneKEmployerMatchGrowthChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/401k-calculator";
const TITLE = "401(k) Calculator";
const DESCRIPTION =
  "Free 401(k) calculator: calculate pre-tax employer match growth, employee contribution limits, vesting schedules, and retirement nest egg accumulation.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="401(k) Calculator"
      intro="Project your 401(k) retirement nest egg, employer matching contributions, tax-deferred compounding, and terminal distribution balances under current IRS contribution limits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Total 401k Contribution} = C_{\text{employee}} + \min(S \times m_{\text{cap}}, \; S \times C_{\text{rate}} \times m_{\text{match}})"
      article={
        <>
          <h2>Direct Answer: Maximizing Employer 401(k) Matches &amp; Pre-Tax Growth</h2>
          <p>
            A <strong>401(k) retirement plan</strong> is an employer-sponsored qualified defined-contribution account governed by the federal <strong>Employee Retirement Income Security Act (ERISA)</strong> and Internal Revenue Code Section 401(k). Eligible employees contribute pre-tax payroll dollars, lowering their current taxable income dollar-for-dollar while allowing investment earnings to compound completely tax-deferred until retirement distributions begin.
          </p>
          <p>
            The single most lucrative wealth catalyst inside a 401(k) is the <strong>employer matching contribution</strong>. A common corporate formula is 50% match up to 6% of salary—providing an <em>instant, risk-free 50% return on invested capital</em> before market compounding even begins.
          </p>

          <FourOhOneKEmployerMatchGrowthChart />

          <h2>Actuarial Mathematics of 401(k) Compounding with Employer Matching</h2>
          <p>
            The annual capital inflow into an employee&rsquo;s 401(k) combining salary deferrals and corporate matching formulas is governed by:
          </p>

          <Formula>{"C_{\text{annual}} = (S \times c_{\text{employee}}) + \min\left( S \times m_{\text{cap}}, \; S \times c_{\text{employee}} \times m_{\text{match}} \right)"}</Formula>
          <p>
            Where:
            <br />• <strong>S</strong> = Annual gross employee compensation ($)
            <br />• <strong>c_employee</strong> = Employee elective salary contribution rate (decimal, e.g. 0.08 for 8%)
            <br />• <strong>m_cap</strong> = Maximum percentage of salary eligible for employer matching (e.g. 0.06 for 6%)
            <br />• <strong>m_match</strong> = Employer match rate per dollar contributed (e.g. 0.50 for 50 cents per dollar, 1.00 for dollar-for-dollar)
          </p>
          <p>
            The future accumulated retirement balance <em>FV</em> after <em>t</em> working years with annual wage growth <em>g</em> and investment portfolio return <em>r</em> is:
          </p>
          <Formula>{"FV = PV_0(1 + r)^t + \sum_{k=1}^{t} C_{\text{annual}, k} \times (1 + r)^{t - k}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an employee earning an annual salary of <strong>$100,000</strong> who contributes <strong>6.0% of pay</strong> to their 401(k), whose employer provides a <strong>50% match up to 6.0% of salary</strong>, earning an expected <strong>8.00% annual portfolio return</strong> over <strong>30 years</strong> starting from zero:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute employee annual salary contribution.</strong>
              <Formula>{"C_{\text{employee}} = \$100{,}000 \times 0.06 = \$6{,}000.00 \text{ / year}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate corporate employer matching addition.</strong> The company matches 50% of the first 6%:
              <Formula>{"C_{\text{match}} = \$6{,}000 \times 0.50 = \$3{,}000.00 \text{ / year (an immediate +50\% instant return)}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Determine total combined annual 401(k) cash inflow.</strong>
              <Formula>{"C_{\text{annual}} = \$6{,}000 + \$3{,}000 = \$9{,}000.00 \text{ / year (\$750.00 / month)}"}</Formula>
            </li>
            <li>
              <strong>Step 4: Solve for terminal 30-year nest egg (FV).</strong> At 8.00% annual return over 30 years, the ordinary annuity future value factor is 113.283:
              <Formula>{"FV = \$9{,}000 \times 113.2832 = \$1{,}019{,}549.00"}</Formula>
            </li>
            <li>
              <strong>Step 5: Isolate employee contributions vs employer cash vs compound growth.</strong> Total employee out-of-pocket payroll contributions equal <Formula>{"\$6{,}000 \times 30 = \$180{,}000.00"}</Formula>. Employer match adds <Formula>{"\$3{,}000 \times 30 = \$90{,}000.00"}</Formula>. Compound investment growth generates <Formula>{"\$1{,}019{,}549 - \$270{,}000 = \$749{,}549.00"}</Formula>.
            </li>
          </ol>

          <h2>401(k) Employer Match Comparison: The 30-Year Compounding Multiplier</h2>
          <p>
            The table below demonstrates how capturing full company matching transforms an employee&rsquo;s 30-year retirement nest egg ($100k salary, 8% return):
          </p>

          <DataTable
            head={["Employee Contribution Rate", "Annual Employee Cash ($)", "Annual Employer Match ($)", "Total 30-Year Wealth ($)", "Net Lifetime Wealth Advantage"]}
            rows={[
              ["0% (No Participation)", "$0 / yr", "$0 match", "$0 nest egg", "Baseline (Forfeited $90k free cash)"],
              ["3% (Under-Contributing)", "$3,000 / yr", "$1,500 match", "$509,770", "+$509,770 accumulated"],
              ["6% (Full Match Captured)", "$6,000 / yr", "$3,000 match", "$1,019,550", "+$1,019,550 (+100% over 3% level)"],
              ["10% (Above Match Baseline)", "$10,000 / yr", "$3,000 match (capped)", "$1,472,680", "+$1,472,680 accelerated security"],
              ["Max IRS Limit ($23,000/yr)", "$23,000 / yr", "$3,000 match", "$2,945,360", "Nearly $3.0M tax-sheltered wealth"],
            ]}
          />

          <h2>IRS Contribution Limits &amp; SECURE 2.0 Act Enhancements</h2>
          <p>
            The IRS establishes annual statutory ceilings for 401(k), 403(b), and most 457 plans:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Elective Salary Deferral Cap:</strong> $23,000 for tax year 2024 ($23,500 for 2025) across pre-tax and Roth 401(k) employee contributions.</li>
            <li><strong>Standard Age 50+ Catch-Up:</strong> Individuals age 50 and older can contribute an additional $7,500 in catch-up contributions.</li>
            <li><strong>SECURE 2.0 Super Catch-Up (Ages 60 to 63):</strong> Starting in 2025, employees aged 60, 61, 62, and 63 can contribute a higher catch-up of up to $11,250 (or 150% of the standard catch-up).</li>
            <li><strong>Overall Defined Contribution Limit (IRC § 415(c)):</strong> Total additions combining employee deferrals, employer matching, and profit sharing cannot exceed $69,000 (2024) / $70,000 (2025).</li>
          </ul>

          <h2>Mega-Backdoor Roth: Maximizing After-Tax 401(k) Conversions</h2>
          <p>
            High-earning employees who max out their standard elective salary deferral ($23,000 in 2024) can supercharge wealth accumulation using the <strong>Mega-Backdoor Roth</strong> strategy if their employer's plan permits after-tax contributions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Reaching the IRC § 415(c) Limit:</strong> Employees can contribute up to the full $69,000 (2024) overall addition limit using voluntary after-tax payroll contributions.</li>
            <li><strong>In-Plan Roth Conversion:</strong> Immediately converting after-tax contributions to a designated Roth 401(k) or Roth IRA shields all subsequent decades of growth from future taxation.</li>
            <li><strong>Zero Annual Income Limits:</strong> Unlike traditional Roth IRAs which phase out for high earners, 401(k) after-tax contributions have zero income eligibility limits.</li>
          </ul>

          <h2>Vesting Schedules: Graded vs. Cliff Vesting Explained</h2>
          <p>
            While your own salary contributions are always <strong>100% immediately vested</strong>, employer matching dollars are often subject to contractual vesting schedules:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Cliff Vesting:</strong> The employee owns 0% of employer matching funds until completing a specific employment tenure (typically 2 or 3 years), upon which they immediately become 100% vested. Leaving before the cliff forfeits 100% of match dollars.</li>
            <li><strong>Graded Vesting:</strong> Ownership increases progressively over tenure (e.g. 20% after Year 2, 40% Year 3, 60% Year 4, 80% Year 5, 100% Year 6).</li>
            <li><strong>Safe Harbor 401(k):</strong> Employers utilizing IRS Safe Harbor plan provisions provide 100% immediate vesting on all matching contributions from day one.</li>
          </ul>

          <h2>Essential 401(k) Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Pre-Tax Deferral:</strong> Contributions deducted from gross pay prior to federal and state income tax assessment, lowering current year taxable income.</li>
            <li><strong>Roth 401(k):</strong> An option where contributions are made with after-tax dollars, allowing qualified distributions in retirement to be 100% tax-free.</li>
            <li><strong>Direct Rollover:</strong> Transferring an old 401(k) to an IRA or new employer plan without tax penalties or mandatory withholding.</li>
            <li><strong>Plan Administrator:</strong> The institutional custodian (Fidelity, Vanguard, Empower) managing investment recordkeeping and ERISA compliance.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement &amp; Tax Planning Solvers</h3>
            <p>
              Plan your total retirement runway with our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, compare tax-free growth using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, model paycheck deductions with the <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, and audit federal brackets via the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is an employer 401(k) match and why is it important?",
          a: "An employer match is additional money contributed by your employer to your 401(k) account based on your salary deferrals. Common formulas include a 50% match up to 6% of pay. Not contributing enough to capture the full match is essentially turning down free compensation.",
        },
        {
          q: "What is the difference between a Traditional 401(k) and a Roth 401(k)?",
          a: "Traditional 401(k) contributions are made with pre-tax dollars, lowering your taxable income today, but withdrawals in retirement are taxed as ordinary income. Roth 401(k) contributions use after-tax dollars, providing no immediate tax deduction, but qualified withdrawals in retirement are 100% tax-free.",
        },
        {
          q: "What happens to my 401(k) when I change employers?",
          a: "You have four primary options: roll over the balance into a Traditional or Roth IRA (often providing lower fees and wider investment options), roll it into your new employer's 401(k), leave it in the former employer's plan (if balance exceeds $5,000), or cash it out (which triggers taxes and a 10% penalty).",
        },
        {
          q: "Can I borrow money from my 401(k)?",
          a: "Most plans permit 401(k) loans allowing you to borrow up to 50% of your vested balance (maximum $50,000) repaid via payroll deductions over 5 years. However, if you leave your job with an outstanding loan, the unpaid balance may become taxable as a premature distribution with a 10% penalty.",
        },
        {
          q: "What is a 401(k) vesting schedule?",
          a: "A vesting schedule determines how much of the employer matching dollars you legally own based on your years of service. Your own personal contributions are always 100% vested immediately, while employer match dollars may require 1 to 6 years of service to become fully vested.",
        },
        {
          q: "What is the early withdrawal penalty for a 401(k)?",
          a: "Withdrawing funds from a 401(k) before age 59½ generally incurs ordinary federal and state income taxes plus a mandatory 10% IRS early withdrawal penalty, unless qualifying for specific IRS exceptions (such as the Rule of 55, total disability, or medical expenses).",
        },
        {
          q: "What are the 2024 and 2025 401(k) contribution limits?",
          a: "For 2024, the employee elective deferral limit is $23,000 ($23,500 in 2025). Workers age 50 and older can contribute an additional $7,500 catch-up. Total contributions from all sources (employee plus employer) are capped at $69,000 in 2024 ($70,000 in 2025).",
        },
        {
          q: "What is the Rule of 55 for 401(k) withdrawals?",
          a: "The Rule of 55 is an IRS provision allowing employees who separate from their employer during or after the calendar year in which they turn age 55 to take penalty-free distributions from that specific employer's 401(k) plan, avoiding the 10% early withdrawal tax.",
        },
      ]}
      related={[
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "💎", name: "Roth IRA" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment Calculator" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Tax Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
