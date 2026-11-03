import Calculator from "@/components/calcs/finance/hourly-to-salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HourlyToSalaryOvertimeImpactChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/hourly-to-salary-calculator";
const TITLE = "Hourly to Salary Calculator";
const DESCRIPTION =
  "Free hourly to salary calculator: convert hourly wage to annual, monthly, and bi-weekly salary. Calculate overtime premiums (1.5x time-and-a-half), paid time.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Hourly to Salary Calculator"
      intro="Convert hourly wages into equivalent annual, monthly, and bi-weekly salaries. Model regular 40-hour workweeks, overtime time-and-a-half multipliers, unpaid breaks, and statutory holiday allowances."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Annual Salary} = (\text{Wage} \times H_{\text{reg}} \times 52) + (\text{Wage} \times 1.5 \times H_{\text{ot}} \times 52)"
      article={
        <>
          <h2>Direct Answer: Converting Hourly Wage to Annual Compensation &amp; Overtime</h2>
          <p>
            An <strong>hourly wage conversion</strong> calculates equivalent annual, monthly, bi-weekly, and weekly gross income from a base hourly pay rate. Institutional human resource standards define a standard full-time work year as <strong>2,080 working hours</strong> (40 regular hours per week × 52 calendar weeks).
          </p>
          <p>
            Under the federal <strong>Fair Labor Standards Act (FLSA)</strong>, non-exempt hourly employees are legally entitled to <strong>overtime pay at 1.5 times their regular hourly rate</strong> (&ldquo;time-and-a-half&rdquo;) for all hours worked in excess of 40 hours during a single workweek. Incorporating consistent weekly overtime drastically expands total annual compensation.
          </p>

          <HourlyToSalaryOvertimeImpactChart />

          <h2>Actuarial Mathematics of Wage Conversion with FLSA Overtime</h2>
          <p>
            The mathematical formulation to determine total annual gross earnings <Formula>{"S_{\text{annual}}"}</Formula> combining regular base hours and overtime premium hours is:
          </p>

          <Formula>{"S_{\text{annual}} = (W \times H_{\text{reg}} \times 52) + (W \times 1.5 \times H_{\text{ot}} \times 52) + \text{Annual Bonuses}"}</Formula>
          <p>
            Where:
            <br />• <strong>W</strong> = Contractual regular hourly pay rate ($/hr)
            <br />• <strong>H_reg</strong> = Standard regular weekly work hours (capped at 40 under FLSA)
            <br />• <strong>H_ot</strong> = Weekly overtime hours worked beyond 40 hours
            <br />• <strong>1.5</strong> = Statutory statutory time-and-a-half overtime multiplier
            <br />• <strong>52</strong> = Number of workweeks in a calendar year
          </p>
          <p>
            To compute equivalent periodic paychecks:
          </p>
          <Formula>{"\text{Bi-Weekly Pay} = \frac{S_{\text{annual}}}{26}, \quad \text{Monthly Pay} = \frac{S_{\text{annual}}}{12}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an employee earning a base wage of <strong>$35.00 per hour</strong> who works an average of <strong>45 hours per week</strong> (40 regular hours + 5 overtime hours) across <strong>52 weeks per year</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Annual Regular Base Compensation.</strong>
              <Formula>{"S_{\text{base}} = \$35.00 \times 40 \text{ hrs/wk} \times 52 \text{ wks} = \$72{,}800.00 \text{ / year}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Determine Overtime Hourly Rate.</strong> Multiply base rate by 1.5:
              <Formula>{"W_{\text{ot}} = \$35.00 \times 1.5 = \$52.50 \text{ per overtime hour}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate Annual Overtime Premium Compensation.</strong>
              <Formula>{"S_{\text{overtime}} = \$52.50 \times 5 \text{ hrs/wk} \times 52 \text{ wks} = \$13{,}650.00 \text{ / year}"}</Formula>
            </li>
            <li>
              <strong>Step 4: Sum Components for Total Gross Annual Earnings.</strong>
              <Formula>{"S_{\text{total}} = \$72{,}800.00 + \$13{,}650.00 = \$86{,}450.00 \text{ / year}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Derive Periodic Paycheck Figures.</strong>
              <br />• <strong>Weekly Pay:</strong> <Formula>{"\$86{,}450 / 52 = \$1{,}662.50 / \text{week}"}</Formula>
              <br />• <strong>Bi-Weekly Pay (26x):</strong> <Formula>{"\$86{,}450 / 26 = \$3{,}325.00 \text{ every two weeks}"}</Formula>
              <br />• <strong>Monthly Pay (12x):</strong> <Formula>{"\$86{,}450 / 12 = \$7{,}204.17 / \text{month}"}</Formula>
              Working just 5 overtime hours weekly boosts total earnings by <strong>+$13,650 (+18.75%)</strong> per year.
            </li>
          </ol>

          <h2>Hourly Wage to Annual Salary Matrix with Overtime Multipliers</h2>
          <p>
            The table below itemizes annual gross compensation across baseline hourly rates with 0, 5, and 10 hours of weekly overtime:
          </p>

          <DataTable
            head={["Hourly Wage Rate", "Zero Overtime (40 Hrs/Wk)", "+5 Hours Overtime (45 Hrs/Wk)", "+10 Hours Overtime (50 Hrs/Wk)", "Monthly Equivalent (40 Hrs)"]}
            rows={[
              ["$20.00 / hour", "$41,600 / year", "$49,400 / year (+$7,800)", "$57,200 / year (+$15,600)", "$3,466.67 / mo"],
              ["$25.00 / hour", "$52,000 / year", "$61,750 / year (+$9,750)", "$71,500 / year (+$19,500)", "$4,333.33 / mo"],
              ["$30.00 / hour", "$62,400 / year", "$74,100 / year (+$11,700)", "$85,800 / year (+$23,400)", "$5,200.00 / mo"],
              ["$40.00 / hour", "$83,200 / year", "$98,800 / year (+$15,600)", "$114,400 / year (+$31,200)", "$6,933.33 / mo"],
              ["$50.00 / hour", "$104,000 / year", "$123,500 / year (+$19,500)", "$143,000 / year (+$39,000)", "$8,666.67 / mo"],
              ["$65.00 / hour", "$135,200 / year", "$160,550 / year (+$25,350)", "$185,900 / year (+$50,700)", "$11,266.67 / mo"],
              ["$80.00 / hour", "$166,400 / year", "$197,600 / year (+$31,200)", "$228,800 / year (+$62,400)", "$13,866.67 / mo"],
            ]}
          />

          <h2>Unpaid Breaks, Paid Time Off (PTO) &amp; Effective Hourly Wages</h2>
          <p>
            When transitioning between hourly and salaried employment, workers must account for non-working hours:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Unpaid Meal Breaks:</strong> An 8.5-hour scheduled workday with a 30-minute unpaid lunch results in 8.0 billable hours per day (40 paid hours per week).</li>
            <li><strong>Paid Time Off (PTO) Value:</strong> A salaried job offering 3 weeks of paid vacation and 10 paid holidays provides 25 paid non-working days (200 hours). An hourly worker without PTO must subtract 200 hours (<Formula>{"2{,}080 - 200 = 1{,}880 \text{ paid hours}"}</Formula>) to establish equivalent earnings.</li>
          </ul>

          <h2>1099 Independent Contractor Hourly Rate vs. W-2 Salary (The 1.35x Rule)</h2>
          <p>
            When transitioning from a corporate W-2 salaried role to independent 1099 contracting, your hourly billing rate must be significantly higher to offset lost benefits and added tax burdens:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Self-Employment Tax Surcharge (+7.65%):</strong> Freelancers pay both the employer and employee share of FICA payroll taxes (15.3% total), adding an immediate 7.65% tax penalty.</li>
            <li><strong>Unsubsidized Health &amp; Retirement Benefits (+15% to +20%):</strong> Covering private health insurance, funding your own Solo 401(k), and accounting for lost employer matches requires substantial fee markup.</li>
            <li><strong>Unpaid Vacation &amp; Sick Days (+8%):</strong> Contract workers are paid only for billable hours worked; taking 3 weeks of time off per year represents unbilled downtime.</li>
            <li><strong>The 1.35× to 1.50× Rule:</strong> To match a $100,000 W-2 salary ($48.08/hr), an independent contractor must bill between <strong>$65.00 and $72.00 per hour</strong> to achieve identical net lifestyle compensation.</li>
          </ul>

          <h2>FLSA Overtime Protections &amp; State Specific Mandates</h2>
          <p>
            State employment laws often exceed federal FLSA minimum overtime standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>California Daily Overtime:</strong> California mandates 1.5x overtime for any hours worked exceeding <strong>8 hours in a single workday</strong>, and <strong>double time (2.0x)</strong> for hours exceeding 12 hours in a workday or 8 hours on the 7th consecutive day of work.</li>
            <li><strong>Compensatory Time Restrictions:</strong> Private sector employers are legally prohibited from offering &ldquo;comp time&rdquo; in lieu of cash overtime wages to non-exempt employees.</li>
          </ul>

          <h2>Essential Wage &amp; Overtime Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Time-and-a-Half:</strong> An overtime wage rate equal to 150% of the employee&rsquo;s standard hourly pay rate.</li>
            <li><strong>Non-Exempt Employee:</strong> A worker protected by FLSA regulations who must receive overtime pay for all hours worked over 40 per week.</li>
            <li><strong>2,080 Work Hours:</strong> The standard annual benchmark full-time working hours basis utilized by employers and government agencies.</li>
            <li><strong>Shift Differential:</strong> Additional hourly compensation paid to employees working night, weekend, or holiday shifts.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Payroll &amp; Compensation Solvers</h3>
            <p>
              Convert compensation across pay periods with our <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, calculate take-home paycheck cash via the <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, evaluate federal tax withholdings using the <a href="/calculators/finance/tax-calculator">Income Tax Calculator</a>, and model self-employed earnings via the <a href="/calculators/finance/freelancer-tax-calculator">Freelancer Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How many working hours are in a standard full-time year?",
          a: "A standard full-time working year consists of exactly 2,080 hours, calculated as 40 hours per week multiplied by 52 calendar weeks. This benchmark is used across payroll systems to convert between hourly wages and annual salaries.",
        },
        {
          q: "How is overtime pay calculated under federal law?",
          a: "Under the Fair Labor Standards Act (FLSA), overtime is paid at 1.5 times your regular hourly rate for every hour worked exceeding 40 hours in a single 7-day workweek. If your regular rate is $30/hr, your overtime rate is $45/hr.",
        },
        {
          q: "How much is $25 an hour annually?",
          a: "At 40 hours per week across 52 weeks (2,080 hours), $25 per hour equals an annual gross salary of $52,000 before taxes ($4,333.33 per month or $2,000 every two weeks).",
        },
        {
          q: "Can my employer require me to take comp time instead of overtime pay?",
          a: "No, not in the private sector. The FLSA strictly mandates that private employers pay non-exempt employees cash overtime at 1.5 times their regular rate. Only public government agencies are permitted to offer compensatory time off in lieu of overtime.",
        },
        {
          q: "What states have daily overtime laws?",
          a: "California, Alaska, and Nevada have statutory daily overtime laws requiring employers to pay overtime for hours worked exceeding 8 hours in a single calendar day, regardless of whether total weekly hours exceed 40.",
        },
        {
          q: "How does unpaid vacation affect annual hourly earnings?",
          a: "If you take two weeks of unpaid vacation per year, you work 50 weeks instead of 52 (2,000 hours instead of 2,080). Multiply your hourly wage by 2,000 to find your actual annual gross earnings.",
        },
        {
          q: "What is the difference between exempt and non-exempt hourly workers?",
          a: "Non-exempt employees must be paid minimum wage and overtime for all hours over 40 per week. Exempt employees are paid a set salary to perform specific executive, administrative, or professional duties and are exempt from overtime pay.",
        },
        {
          q: "What is double time pay and when does it apply?",
          a: "Double time pays twice your regular hourly rate (2.0x). While federal law does not mandate double time, some states (like California) require double time for work exceeding 12 hours in a single workday or exceeding 8 hours on the 7th consecutive day of a workweek.",
        },
      ]}
      related={[
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary Calculator" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Income Tax" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/freelancer-tax-calculator", icon: "💻", name: "Freelancer Tax" },
        { href: "/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
