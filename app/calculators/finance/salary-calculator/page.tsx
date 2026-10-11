import Calculator from "@/components/calcs/finance/salary-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/salary-calculator";
const DESCRIPTION =
  "Free salary calculator: convert pay between hourly, daily, weekly, biweekly, semi-monthly, monthly, quarterly and annual amounts, with an option to exclude paid holidays and vacation.";

export const metadata = calcMetadata(PATH, "Salary Calculator – Hourly, Monthly & Annual Pay | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Salary Calculator"
      intro="Convert any pay amount into hourly, daily, weekly, biweekly, semi-monthly, monthly, quarterly and annual figures."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How pay periods convert</h2>
          <DataTable
            head={["Period", "Times per year", "Annual salary ÷"]}
            rows={[
              ["Hourly", "Hours per week × 52", "2,080 at 40 hrs/week"],
              ["Daily", "Days per week × 52", "260 at 5 days/week"],
              ["Weekly", "52", "52"],
              ["Biweekly", "26", "26"],
              ["Semi-monthly", "24", "24"],
              ["Monthly", "12", "12"],
              ["Quarterly", "4", "4"],
            ]}
          />
          <h3>Example</h3>
          <p>
            A $75,000 salary at 40 hours a week is <strong>$36.06 an hour</strong>, $1,442 a week, $2,885 every two weeks and
            $6,250 a month.
          </p>
          <h2>Unadjusted vs. adjusted pay</h2>
          <p>
            The standard conversion assumes you&rsquo;re paid for all 52 weeks, including holidays and vacation. If you want
            to know what each hour you <em>actually work</em> is worth, exclude paid time off: with 10 holidays and 15
            vacation days, that $75,000 salary works out to <strong>$39.89 per hour worked</strong>.
          </p>
          <h2>Comparing hourly and salaried jobs</h2>
          <ul>
            <li>Hourly jobs usually pay overtime (1.5×) above 40 hours a week; most salaried roles are exempt.</li>
            <li>Factor in benefits: employer health insurance, retirement match and paid leave can be worth 20–40% of salary.</li>
            <li>Commuting time and costs effectively lower your hourly rate.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "How many work hours are in a year?",
          a: "At 40 hours a week, 2,080 (40 × 52). Subtracting 10 holidays and two weeks of vacation leaves about 1,920 hours actually worked.",
        },
        {
          q: "Is $X a year good?",
          a: "It depends heavily on location, household size and cost of living. Compare against local median income and use a budget calculator to see what the take-home pay covers.",
        },
        {
          q: "Does this include taxes?",
          a: "No — these are gross figures. Use the take-home pay calculator to see your pay after federal, state and payroll taxes.",
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
