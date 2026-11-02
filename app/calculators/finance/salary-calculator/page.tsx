import Calculator from "@/components/calcs/finance/salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SalaryPaycheckFrequencyBreakdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/salary-calculator";
const TITLE = "Salary Calculator – Convert Annual Salary to Hourly, Biweekly & Monthly Pay | CalcDigi";
const DESCRIPTION =
  "Free salary calculator: convert gross pay between annual salary, monthly, semi-monthly (24), bi-weekly (26), weekly (52), and hourly wage rates. Model paid time off (PTO), statutory holidays, and unadjusted vs. adjusted work hours.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Salary Calculator"
      intro="Convert gross compensation across annual, monthly, semi-monthly, bi-weekly, weekly, and hourly pay periods. Account for standard 2,080 working hours, paid time off (PTO), and unadjusted vs. adjusted working days."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="HourlyRate = AnnualSalary / 2080"
      article={
        <>
          <h2>Direct Answer: How Does Salary-to-Hourly Conversion Mathematics Work?</h2>
          <p>
            Under standard commercial payroll accounting in the United States, an annual base salary assumes a full-time workload of <strong>40 hours per week across 52 weeks per calendar year</strong>, establishing the statutory baseline of <strong>2,080 total paid work hours</strong> (or 260 eight-hour working days). Converting annual compensation into hourly, weekly, bi-weekly, or monthly intervals requires dividing by the exact number of pay periods per year. Crucially, a <strong>bi-weekly payroll schedule (26 pay periods)</strong> results in two calendar months every year containing three paychecks, unlike a <strong>semi-monthly schedule (24 pay periods)</strong> which divides pay equally twice per month.
          </p>

          <Formula>Hourly Base Rate = Annual Salary ÷ 2,080 Hours (40 hrs/wk × 52 wks)</Formula>
          <Formula>Bi-Weekly Paycheck = Annual Salary ÷ 26 Pay Periods</Formula>
          <Formula>Semi-Monthly Paycheck = Annual Salary ÷ 24 Pay Periods</Formula>
          <Formula>Adjusted Hourly Rate (Excluding PTO) = Annual Salary ÷ [2,080 − (Holidays + Vacation Days) × 8]</Formula>

          <SalaryPaycheckFrequencyBreakdownChart />

          <h2>Annual Salary to Paycheck Frequency Conversion Matrix</h2>
          <p>
            The table below translates common gross annual compensation levels into standard US employer payroll frequencies:
          </p>

          <DataTable
            head={["Annual Salary", "Hourly Rate (2,080 Hrs)", "Weekly (52x)", "Bi-Weekly (26x)", "Semi-Monthly (24x)", "Monthly (12x)"]}
            rows={[
              ["$45,000 / year", "$21.63 / hr", "$865.38", "$1,730.77", "$1,875.00", "$3,750.00"],
              ["$65,000 / year", "$31.25 / hr", "$1,250.00", "$2,500.00", "$2,708.33", "$5,416.67"],
              ["$85,000 / year", "$40.87 / hr", "$1,634.62", "$3,269.23", "$3,541.67", "$7,083.33"],
              ["$110,000 / year", "$52.88 / hr", "$2,115.38", "$4,230.77", "$4,583.33", "$9,166.67"],
              ["$150,000 / year", "$72.12 / hr", "$2,884.62", "$5,769.23", "$6,250.00", "$12,500.00"],
              ["$200,000 / year", "$96.15 / hr", "$3,846.15", "$7,692.31", "$8,333.33", "$16,666.67"],
            ]}
          />

          <h2>Unadjusted vs. Adjusted Hourly Wage: Valuing Paid Time Off</h2>
          <ul>
            <li>
              <strong>Unadjusted Nominal Rate:</strong> Reflects gross contractual salary spread across all 2,080 calendar hours.
            </li>
            <li>
              <strong>Adjusted Productive Rate:</strong> Subtracts paid company holidays (typically 10–11 days) and paid vacation (typically 10–15 days). On an $85,000 salary with 25 total PTO days (200 hours), the employee actually works 1,880 hours, making each productive working hour worth <strong>$45.21 per hour</strong>.
            </li>
            <li>
              <strong>Exempt vs. Non-Exempt Status:</strong> Under the Fair Labor Standards Act (FLSA), salaried exempt employees are not entitled to overtime pay regardless of hours worked, while non-exempt hourly employees must receive 1.5× time-and-a-half for all hours exceeding 40 per week.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Income &amp; Compensation Solvers</h3>
            <p>
              Evaluating full compensation packages requires converting between annual salary and hourly earnings. Convert billable rates with our <a href="/calculators/finance/hourly-to-salary-calculator">Hourly to Salary Calculator</a>, calculate after-tax paycheck earnings using the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, evaluate federal tax liability via the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, and build a monthly spending plan using our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between bi-weekly and semi-monthly pay?",
          a: "Bi-weekly pay occurs every two weeks (typically alternating Fridays), resulting in 26 paychecks per year. Semi-monthly pay occurs twice per calendar month (typically the 1st and 15th, or 15th and last day), resulting in exactly 24 paychecks per year. Semi-monthly paychecks are slightly larger than bi-weekly paychecks for the same annual salary.",
        },
        {
          q: "How do 'three-paycheck months' work on a bi-weekly schedule?",
          a: "Because there are 52 weeks in a year, a bi-weekly schedule produces 26 paychecks rather than 24. Ten calendar months contain exactly two paychecks, while two calendar months contain three paychecks. Many financial planners treat those two 'extra' paychecks as bonus cash to accelerate debt payoff or fund investments.",
        },
        {
          q: "How many working days are in a leap year?",
          a: "A standard non-leap year contains 260 working days (Monday–Friday) plus one day. A leap year contains 262 working days if the leap year starts on a Thursday or Friday, which can add 8 to 16 extra working hours to salaried corporate accounting.",
        },
        {
          q: "Does this calculation include taxes and insurance withholdings?",
          a: "No. The salary calculator converts gross pre-tax compensation. To see your actual take-home deposit after federal income taxes, state taxes, FICA (Social Security & Medicare), and health insurance deductions, use the Take Home Pay Calculator.",
        },
      ]}
      related={[
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/hourly-to-salary-calculator", icon: "⏱️", name: "Hourly to Salary" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/business/freelance-rate-calculator", icon: "🧑‍💻", name: "Freelance Rate" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
