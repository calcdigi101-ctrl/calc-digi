import Calculator from "@/components/calcs/finance/take-home-pay-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";
import { SS_WAGE_BASE, TAX_YEAR } from "@/lib/tax";

const PATH = "/calculators/finance/take-home-pay-calculator";
const DESCRIPTION = `Free ${TAX_YEAR} take-home pay calculator: see your net paycheck after federal and state income tax, Social Security, Medicare, 401(k) and benefits, per pay period.`;

export const metadata = calcMetadata(PATH, `Take-Home Pay Calculator ${TAX_YEAR} – Pay After Tax | CalcDigi`, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Take-Home Pay Calculator"
      intro="Estimate how much of your salary actually lands in your bank account each payday after taxes, retirement contributions and benefits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>What comes out of your paycheck</h2>
          <DataTable
            head={["Deduction", "How it's calculated"]}
            rows={[
              ["Federal income tax", "Progressive brackets on salary minus pre-tax deductions and the standard deduction"],
              ["Social Security", `6.2% of wages up to $${SS_WAGE_BASE.toLocaleString()} (${TAX_YEAR})`],
              ["Medicare", "1.45% of all wages, plus 0.9% above $200,000 (single)"],
              ["State income tax", "Varies by state; entered here as a flat rate"],
              ["401(k)", "Your chosen % of pay, before income tax"],
              ["Health insurance, HSA, FSA", "Pre-tax through a cafeteria plan — exempt from income tax and FICA"],
            ]}
          />
          <h3>Example</h3>
          <p>
            A single filer earning $65,000, paid biweekly, contributing 6% to a 401(k) with a 5% state tax, takes home about{" "}
            <strong>$1,843 per paycheck</strong> — roughly $47,900 a year. The $2,500 gross check loses about $198 to federal
            tax, $191 to Social Security and Medicare, $118 to state tax and $150 to the 401(k).
          </p>
          <h2>How to increase your take-home pay</h2>
          <ul>
            <li>Review your W-4: a big refund every year means too much is being withheld from each check.</li>
            <li>Use pre-tax benefits such as HSA and FSA accounts for expenses you&rsquo;d pay anyway.</li>
            <li>Remember that 401(k) contributions lower take-home pay by less than the amount saved, because they cut your tax.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Why is my actual paycheck different?",
          a: "Payroll withholding uses IRS tables and your W-4 settings, and may include local taxes, disability insurance, union dues or post-tax deductions. This calculator estimates your annual tax and spreads it evenly.",
        },
        {
          q: "Which states have no income tax?",
          a: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming don't tax wages. Enter 0% for those.",
        },
        {
          q: "What's the difference between biweekly and semi-monthly?",
          a: "Biweekly is every two weeks — 26 paychecks a year. Semi-monthly is twice a month, usually the 15th and last day — 24 paychecks, each slightly larger.",
        },
      ]}
      related={[
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary" },
        { href: "/calculators/finance/hourly-to-salary-calculator", icon: "⏱️", name: "Hourly to Salary" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/business/payroll-calculator", icon: "🏢", name: "Payroll" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
