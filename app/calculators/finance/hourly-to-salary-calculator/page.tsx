import Calculator from "@/components/calcs/finance/hourly-to-salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/hourly-to-salary-calculator";
const DESCRIPTION =
  "Free hourly to salary calculator: convert an hourly wage to annual, monthly and biweekly pay (with overtime), or a salary back to an hourly rate.";

export const metadata = calcMetadata(PATH, "Hourly to Salary Calculator – Wage to Annual Pay | CalcDigi", DESCRIPTION);

const ROWS = [15, 20, 25, 30, 40, 50].map((h) => [`$${h}/hr`, `$${(h * 2080).toLocaleString()}`, `$${((h * 2080) / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })}`]);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Hourly to Salary Calculator"
      intro="Turn an hourly wage into a yearly salary — including overtime — or work out the hourly rate behind a salary offer."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>The formula</h2>
          <Formula>Annual salary = Hourly wage × Hours per week × Weeks per year</Formula>
          <p>
            A quick shortcut for full-time work: multiply the hourly wage by about 2,000 (2,080 exactly). $25 an hour is
            roughly $50,000 a year; $52,000 exactly at 40 hours and 52 weeks.
          </p>
          <h2>Common hourly wages as salaries (40 hrs × 52 weeks)</h2>
          <DataTable head={["Hourly", "Annual", "Monthly"]} rows={ROWS} />
          <h2>Overtime</h2>
          <p>
            Under the federal Fair Labor Standards Act, non-exempt employees earn at least 1.5× their regular rate for hours
            over 40 in a workweek. Five overtime hours a week at $25/hr adds $9,750 a year.
          </p>
          <h2>Unpaid time off</h2>
          <p>
            If you don&rsquo;t get paid vacation or holidays, enter the weeks you actually work (for example 50) so the annual
            figure isn&rsquo;t overstated.
          </p>
        </>
      }
      faq={[
        {
          q: "How much is $20 an hour per year?",
          a: "$41,600 at 40 hours a week for 52 weeks, or about $3,467 a month before taxes.",
        },
        {
          q: "What hourly rate equals a $60,000 salary?",
          a: "About $28.85 an hour at 40 hours a week (60,000 ÷ 2,080).",
        },
        {
          q: "Should freelancers use this?",
          a: "Freelancers should charge more than an employee's hourly equivalent to cover self-employment tax, unpaid time, benefits and business costs. Try the freelance rate calculator.",
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
