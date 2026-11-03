import Calculator from "@/components/calcs/finance/salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SalaryPaycheckFrequencyBreakdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/salary-calculator";
const TITLE = "Salary Calculator";
const DESCRIPTION =
  "Free salary calculator: convert annual salary to hourly, weekly, bi-weekly, semi-monthly, and monthly pay rates. Calculate unadjusted gross earnings.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Salary Calculator"
      intro="Convert annual salary to hourly, weekly, bi-weekly, semi-monthly, and monthly paychecks. Model standard work weeks, paid time off, and payroll distribution frequencies."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Hourly} = \frac{\text{Annual Salary}}{2{,}080}, \quad \text{Bi-Weekly} = \frac{\text{Annual Salary}}{26}"
      article={
        <>
          <h2>Direct Answer: Converting Annual Compensation Across Payroll Frequencies</h2>
          <p>
            A <strong>salary conversion calculation</strong> translates an annual compensation figure into equivalent payroll billing cycles: hourly wage, daily earnings, weekly pay, bi-weekly (26 paychecks), semi-monthly (24 paychecks), and monthly gross income. Under institutional human resources standards established by the U.S. Office of Personnel Management (OPM) and Department of Labor (DOL), a standard full-time work year is defined as <strong>2,080 working hours</strong> (40 hours per week × 52 weeks).
          </p>
          <p>
            Understanding the distinction between <strong>bi-weekly</strong> (every two weeks) and <strong>semi-monthly</strong> (twice per month) is essential for personal budgeting: bi-weekly schedules yield 26 paychecks per calendar year, producing two &ldquo;three-paycheck months&rdquo; each year that provide surplus budget cash flow.
          </p>

          <SalaryPaycheckFrequencyBreakdownChart />

          <h2>Actuarial Mathematics of Payroll Distribution Cycles</h2>
          <p>
            The mathematical formulas to convert an annual base salary <em>S</em> across statutory payroll frequencies are:
          </p>

          <Formula>{"\text{Hourly Rate} = \frac{S}{\text{Hours per Week} \times 52} = \frac{S}{2{,}080 \text{ (standard)}}"}</Formula>
          <Formula>{"\text{Daily Pay (8-hr day)} = \frac{S}{260 \text{ working days}}"}</Formula>
          <Formula>{"\text{Weekly Pay} = \frac{S}{52}"}</Formula>
          <Formula>{"\text{Bi-Weekly Pay} = \frac{S}{26}"}</Formula>
          <Formula>{"\text{Semi-Monthly Pay} = \frac{S}{24}"}</Formula>
          <Formula>{"\text{Monthly Pay} = \frac{S}{12}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an employee earning an annual base salary of <strong>$85,000</strong> working a standard full-time schedule of <strong>40 hours per week</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Calculate Standard Hourly Wage.</strong> Divide annual salary by 2,080 full-time hours:
              <Formula>{"\text{Hourly Wage} = \frac{\$85{,}000}{2{,}080} = \$40.8654 \rightarrow \$40.87 \text{ / hour}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate Weekly Gross Earnings (52 periods).</strong>
              <Formula>{"\text{Weekly Pay} = \frac{\$85{,}000}{52} = \$1{,}634.615 \rightarrow \$1{,}634.62 \text{ / week}"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate Bi-Weekly Paycheck (26 periods).</strong>
              <Formula>{"\text{Bi-Weekly Pay} = \frac{\$85{,}000}{26} = \$3{,}269.2308 \rightarrow \$3{,}269.23 \text{ every two weeks}"}</Formula>
            </li>
            <li>
              <strong>Step 4: Calculate Semi-Monthly Paycheck (24 periods).</strong>
              <Formula>{"\text{Semi-Monthly Pay} = \frac{\$85{,}000}{24} = \$3{,}541.6667 \rightarrow \$3{,}541.67 \text{ twice per month (e.g. 15th and 30th)}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Calculate Monthly Gross Earnings (12 periods).</strong>
              <Formula>{"\text{Monthly Pay} = \frac{\$85{,}000}{12} = \$7{,}083.3333 \rightarrow \$7{,}083.33 \text{ / month}"}</Formula>
            </li>
          </ol>

          <h2>Salary Conversion Benchmark Matrix ($40k to $200k) Across Frequencies</h2>
          <p>
            The table below itemizes gross earnings across all standard payroll distribution frequencies based on a standard 40-hour work week:
          </p>

          <DataTable
            head={["Annual Base Salary", "Equivalent Hourly Wage", "Weekly Pay (52x)", "Bi-Weekly Pay (26x)", "Semi-Monthly Pay (24x)", "Monthly Pay (12x)"]}
            rows={[
              ["$40,000 / year", "$19.23 / hr", "$769.23 / wk", "$1,538.46 (26x)", "$1,666.67 (24x)", "$3,333.33 / mo"],
              ["$60,000 / year", "$28.85 / hr", "$1,153.85 / wk", "$2,307.69 (26x)", "$2,500.00 (24x)", "$5,000.00 / mo"],
              ["$80,000 / year", "$38.46 / hr", "$1,538.46 / wk", "$3,076.92 (26x)", "$3,333.33 (24x)", "$6,666.67 / mo"],
              ["$100,000 / year", "$48.08 / hr", "$1,923.08 / wk", "$3,846.15 (26x)", "$4,166.67 (24x)", "$8,333.33 / mo"],
              ["$125,000 / year", "$60.10 / hr", "$2,403.85 / wk", "$4,807.69 (26x)", "$5,208.33 (24x)", "$10,416.67 / mo"],
              ["$150,000 / year", "$72.12 / hr", "$2,884.62 / wk", "$5,769.23 (26x)", "$6,250.00 (24x)", "$12,500.00 / mo"],
              ["$200,000 / year", "$96.15 / hr", "$3,846.15 / wk", "$7,692.31 (26x)", "$8,333.33 (24x)", "$16,666.67 / mo"],
            ]}
          />

          <h2>Bi-Weekly vs. Semi-Monthly: The &ldquo;Three-Paycheck Month&rdquo; Phenomenon</h2>
          <p>
            Employees frequently confuse bi-weekly and semi-monthly pay structures, which operate on fundamentally different calendars:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Semi-Monthly (24 Paychecks):</strong> Payments occur on fixed calendar dates (such as the 1st and 15th, or 15th and last day of the month). Every single month contains exactly two paychecks, perfectly matching monthly rent or mortgage billing cycles.</li>
            <li><strong>Bi-Weekly (26 Paychecks):</strong> Payments occur every two weeks on a set day of the week (typically every other Friday). Because a year contains 52 weeks (365 days ÷ 7 = 52.14 weeks), there are 26 pay periods rather than 24.</li>
            <li><strong>The Three-Paycheck Bonus:</strong> Ten months of the year contain exactly two paychecks, while two months of the year contain <strong>three paychecks</strong>. Budgeting based on two paychecks per month leaves those two extra paychecks as 100% surplus to allocate toward debt payoff or investments.</li>
          </ul>

          <h2>Total Compensation Architecture: Valuing Beyond Base Salary</h2>
          <p>
            When evaluating job offers, base annual salary represents only a portion of true institutional compensation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Employer Retirement Match:</strong> A 6% dollar-for-dollar 401(k) company match on a $100,000 salary provides $6,000 in immediate, guaranteed non-taxed wealth accumulation annually.</li>
            <li><strong>Healthcare Premium Subsidies:</strong> Employer-subsidized health, dental, and vision insurance premiums save the average American family between $12,000 and $18,000 per year compared to private individual market plans.</li>
            <li><strong>Equity Compensation (RSUs &amp; Stock Options):</strong> Restricted Stock Units (RSUs) vest over multi-year schedules, adding tens of thousands of dollars to annual total realized compensation.</li>
            <li><strong>Bonus Structures:</strong> Differentiate between guaranteed contractual bonuses and performance-discretionary bonuses when calculating baseline living expense budgets.</li>
          </ul>

          <h2>FLSA Overtime Exempt vs. Non-Exempt Classifications</h2>
          <p>
            Under the federal <strong>Fair Labor Standards Act (FLSA)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Non-Exempt Employees:</strong> Entitled to overtime pay at <strong>1.5 times regular hourly wage</strong> for all hours worked exceeding 40 hours in a single workweek.</li>
            <li><strong>Exempt Salaried Employees:</strong> Paid a fixed salary regardless of hours worked, with zero overtime eligibility, provided they meet the statutory salary threshold ($43,888 in 2024, rising to $58,656 in 2025) and execute executive, professional, or administrative duties.</li>
          </ul>

          <h2>Salary Negotiation Framework: Converting Offers to Hourly True Worth</h2>
          <p>
            When comparing competitive corporate compensation packages, calculating your true hourly rate uncovers critical lifestyle trade-offs:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The 60-Hour Salaried Trap:</strong> A $120,000 salary requiring 60 hours per week yields an effective hourly rate of only <Formula>{"\\$120{,}000 / (60 \\times 52) = \\$38.46 / \\text{hr}"}</Formula>—lower than a $90,000 job strictly capped at 40 hours per week (<Formula>{"\\$43.27 / \\text{hr}"}</Formula>).</li>
            <li><strong>Commute Time Discounting:</strong> Factor unpaid daily commuting hours into your hourly compensation equation to evaluate hybrid or remote work offers accurately.</li>
          </ul>

          <h2>Essential Payroll &amp; Compensation Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Gross Pay:</strong> Total compensation earned before any income taxes, FICA withholdings, or benefit deductions are subtracted.</li>
            <li><strong>Net Pay:</strong> Take-home cash deposited into the employee&rsquo;s bank account after all mandatory and voluntary deductions.</li>
            <li><strong>Fringe Benefits:</strong> Non-wage compensations provided by employers, such as 401(k) matches, health insurance subsidies, and tuition assistance.</li>
            <li><strong>Base Compensation:</strong> The fixed guaranteed salary or hourly rate excluding variable bonuses, overtime, or sales commissions.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Payroll &amp; Income Solvers</h3>
            <p>
              Calculate net cash take-home pay with our <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, evaluate overtime premiums with the <a href="/calculators/finance/hourly-to-salary-calculator">Hourly to Salary Calculator</a>, organize household cash flow using the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, and audit federal marginal brackets via the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the standard number of working hours in a year?",
          a: "The standard full-time work year is 2,080 hours, derived by multiplying 40 hours per week by 52 calendar weeks. For leap years or exact calendar day computations, work hours range between 2,088 and 2,096 hours.",
        },
        {
          q: "What is the difference between bi-weekly and semi-monthly pay?",
          a: "Bi-weekly pay occurs every two weeks on a specific weekday (26 paychecks per year). Semi-monthly pay occurs twice per month on specific dates, such as the 1st and 15th (24 paychecks per year). Bi-weekly paychecks are slightly smaller but include two 'extra' checks each year.",
        },
        {
          q: "How do I calculate my hourly rate from my annual salary?",
          a: "Divide your annual salary by 2,080 hours (assuming a 40-hour work week). For example, a $75,000 salary divided by 2,080 equals $36.06 per hour.",
        },
        {
          q: "Does a salaried employee get paid for overtime?",
          a: "Only if the employee is classified as non-exempt under the Fair Labor Standards Act (FLSA). Employees who are classified as exempt (meeting duties and salary tests) receive their fixed salary regardless of how many hours they work.",
        },
        {
          q: "How do paid time off (PTO) and holidays affect salary calculations?",
          a: "For salaried employees, paid time off, sick leave, and federal holidays are included in your base annual salary, meaning your paycheck remains identical whether you take approved PTO or work the full week.",
        },
        {
          q: "How much does a $1 per hour raise equal per year?",
          a: "A $1.00 per hour raise for a standard 40-hour full-time worker equals exactly $2,080 in additional gross pre-tax income per year ($1.00 × 40 hours × 52 weeks).",
        },
        {
          q: "What percentage of gross salary is taken out for taxes?",
          a: "Total deductions typically consume 20% to 35% of gross salary, combining 7.65% mandatory FICA payroll taxes, 10% to 22% federal income tax, and 0% to 9% state income tax, plus health insurance and 401(k) contributions.",
        },
        {
          q: "How should I budget for a bi-weekly paycheck schedule?",
          a: "Base your monthly spending and recurring bill budget strictly on two paychecks per month (24 checks per year). Treat the two 'three-paycheck months' as unallocated surplus bonuses to direct 100% toward savings, emergency funds, or debt elimination.",
        },
      ]}
      related={[
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/hourly-to-salary-calculator", icon: "⏱️", name: "Hourly to Salary" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Income Tax" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
        { href: "/calculators/finance/freelancer-tax-calculator", icon: "💻", name: "Freelancer Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
