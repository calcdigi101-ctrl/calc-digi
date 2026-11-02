import Calculator from "@/components/calcs/finance/hourly-to-salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HourlyToSalaryOvertimeImpactChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/hourly-to-salary-calculator";
const TITLE = "Hourly to Salary Calculator – Convert Hourly Wage to Annual Income with Overtime | CalcDigi";
const DESCRIPTION =
  "Free hourly to salary calculator: convert your hourly pay rate into annual, monthly, and biweekly gross salary. Calculate 1.5x FLSA overtime premiums, unpaid weeks off, and reverse annual salary to hourly wages.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ROWS = [15, 20, 25, 30, 35, 40, 50, 65].map((h) => [
  `$${h.toFixed(2)} / hr`,
  `$${(h * 2080).toLocaleString()} / yr`,
  `$${((h * 2080) / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })} / mo`,
  `$${((h * 2080) / 26).toLocaleString("en-US", { maximumFractionDigits: 0 })} / check`,
  `$${(h * 2080 + h * 1.5 * 5 * 52).toLocaleString()} / yr`,
]);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Hourly to Salary Calculator"
      intro="Convert hourly wages into annualized gross salary, monthly income, and bi-weekly paychecks. Model overtime hours at 1.5x Fair Labor Standards Act (FLSA) premium rates and adjust for unpaid weeks off."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="AnnualSalary = (BaseRate * RegularHours + BaseRate * 1.5 * OvertimeHours) * WeeksWorked"
      article={
        <>
          <h2>Direct Answer: How Do You Calculate Annual Salary from an Hourly Wage?</h2>
          <p>
            To convert an hourly wage into an equivalent annual salary for a standard full-time employee, multiply your base hourly rate by the number of hours worked per week (typically 40 hours) and by the number of weeks worked per calendar year (52 weeks), establishing the statutory benchmark of <strong>2,080 working hours</strong>. Under the federal <strong>Fair Labor Standards Act (FLSA)</strong>, non-exempt hourly employees who work in excess of 40 hours in a given workweek must receive overtime compensation at a rate of <strong>not less than one and one-half times (1.5×) their regular rate of pay</strong>.
          </p>

          <Formula>Base Annual Salary = Hourly Wage × Weekly Regular Hours (40) × Annual Weeks (52)</Formula>
          <Formula>Overtime Earnings = Hourly Wage × 1.5 × Weekly Overtime Hours × 52</Formula>
          <Formula>Total Annual Gross = Base Salary + Overtime Earnings</Formula>
          <p>
            Mental Math Shortcut (The &ldquo;Rule of 2,000&rdquo;):
            <br />
            To quickly approximate annual income in your head, double your hourly wage and add three zeros. For example, $35/hr × 2,000 ≈ <strong>$70,000 per year</strong> ($72,800 exact at 2,080 hours).
          </p>

          <HourlyToSalaryOvertimeImpactChart />

          <h2>Hourly Wage to Annual Salary Benchmark Matrix (40 Hrs/Wk Base)</h2>
          <p>
            The table below translates common US hourly wage tiers into equivalent annual, monthly, and bi-weekly earnings, including the impact of 5 hours of weekly 1.5× overtime:
          </p>

          <DataTable
            head={["Hourly Base Rate", "Base Annual Salary (40 Hrs)", "Monthly Gross (12x)", "Bi-Weekly Paycheck (26x)", "With 5 Hrs/Wk Overtime (1.5x)"]}
            rows={ROWS}
          />

          <h2>Key Employment Distinctions: FLSA Exempt vs. Non-Exempt</h2>
          <ul>
            <li>
              <strong>Non-Exempt Hourly Workers:</strong> Protected by federal and state wage laws. Must be paid for every minute worked, guaranteed statutory rest breaks, and legally entitled to 1.5× overtime for hours worked over 40 per week.
            </li>
            <li>
              <strong>Exempt Salaried Employees:</strong> Paid a fixed pre-determined salary regardless of whether they work 35 hours or 60 hours in a given week. Exempt from FLSA overtime rules (provided salary meets federal minimum salary thresholds).
            </li>
            <li>
              <strong>Contractor / 1099 Billable Multiplier:</strong> If transitioning from W-2 employment to 1099 independent consulting, your hourly rate should be at least <strong>1.4× to 1.6× higher</strong> than a salaried hourly equivalent to offset 15.3% self-employment taxes, health insurance, and unbillable administrative overhead.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Wage &amp; Compensation Solvers</h3>
            <p>
              Converting hourly pay rates into annualized income clarifies full-time earning potential. Compare salaried pay structures using our <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, calculate net earnings after payroll taxes with the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, evaluate annual tax liability via the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, and structure a monthly living plan using our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How much is $25 an hour per year?",
          a: "At 40 hours per week for 52 weeks (2,080 hours), $25.00 an hour equals exactly $52,000 per year before taxes, which breaks down to $4,333.33 per month or $2,000.00 every two weeks.",
        },
        {
          q: "What hourly wage is needed to earn $100,000 per year?",
          a: "To make $100,000 a year working a standard 40-hour workweek without overtime, you need an hourly wage of $48.08 per hour ($100,000 / 2,080 hours).",
        },
        {
          q: "What if I work 50 weeks per year due to unpaid time off?",
          a: "If your employer does not provide paid vacation and you take 2 weeks of unpaid leave (working 50 weeks at 40 hours = 2,000 hours), multiply your hourly rate by 2,000. For example, $30/hr equals $60,000 per year instead of $62,400.",
        },
        {
          q: "How is overtime calculated when hours vary week to week?",
          a: "Under federal FLSA rules, overtime is calculated on a single workweek basis (7 consecutive 24-hour periods). Hours cannot be averaged across two weeks. Working 30 hours one week and 50 hours the next results in 10 hours of overtime in week two, even though the two-week total equals 80 hours.",
        },
      ]}
      related={[
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/business/freelance-rate-calculator", icon: "🧑‍💻", name: "Freelance Rate" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/business/payroll-calculator", icon: "🏢", name: "Payroll" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
