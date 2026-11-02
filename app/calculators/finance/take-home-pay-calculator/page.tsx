import Calculator from "@/components/calcs/finance/take-home-pay-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SS_WAGE_BASE, TAX_YEAR } from "@/lib/tax";
import { TakeHomePayWaterfallDeductionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/take-home-pay-calculator";
const TITLE = `Take-Home Pay Calculator ${TAX_YEAR} – Net Paycheck & Tax Withholding | CalcDigi`;
const DESCRIPTION =
  `Free ${TAX_YEAR} take-home pay calculator: calculate exact net paycheck deposits after federal income tax, state tax, Social Security (6.2%), Medicare (1.45%), 401(k), and pre-tax health deductions across weekly, biweekly, and monthly payrolls.`;

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Take-Home Pay Calculator"
      intro={`Calculate your net spendable paycheck after federal and state income taxes, FICA payroll withholdings, pre-tax 401(k) contributions, and health insurance deductions for the ${TAX_YEAR} tax year.`}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="NetPay = GrossSalary - PreTaxDeductions - FederalTax - FICA - StateTax - PostTaxDeductions"
      article={
        <>
          <h2>Direct Answer: How Does Gross-to-Net Paycheck Withholding Mathematics Work?</h2>
          <p>
            Your <strong>net take-home pay</strong> represents the actual liquid deposit delivered to your bank account on payday after all statutory taxes and voluntary deductions are subtracted from your gross compensation. Under standard US payroll processing, withholdings follow a strict sequential hierarchy: first, <strong>pre-tax deductions</strong> (traditional 401(k), Section 125 health insurance, and HSA/FSA contributions) are subtracted from gross earnings. Then, <strong>FICA payroll taxes (7.65%)</strong> and <strong>federal and state income taxes</strong> are calculated on the remaining taxable balance. For the average American employee, net take-home pay equals approximately <strong>68% to 75% of gross salary</strong>.
          </p>

          <Formula>FICA Withholding = (Gross × 6.2% Social Security) + (Gross × 1.45% Medicare)</Formula>
          <Formula>Net Paycheck = [Gross Salary − Pre-Tax Deductions − Federal Tax − FICA − State Tax] ÷ Pay Periods</Formula>
          <p>
            Where:
            <br />• <strong>Social Security (OASDI):</strong> 6.2% levied on wages up to the ${SS_WAGE_BASE.toLocaleString()} wage base for {TAX_YEAR}
            <br />• <strong>Medicare (HI):</strong> 1.45% levied on all wages without cap (+0.9% Additional Medicare Tax on wages exceeding $200,000 for single filers)
            <br />• <strong>Pre-Tax Deductions:</strong> Exempt from federal income tax and, for Section 125 health insurance, exempt from FICA taxes as well
          </p>

          <TakeHomePayWaterfallDeductionChart />

          <h2>Gross Salary vs. Net Take-Home Pay Benchmark Matrix ({TAX_YEAR} Single Filer)</h2>
          <p>
            The table below illustrates estimated annual net take-home pay and bi-weekly paycheck deposits for a single filer claiming the standard deduction and contributing 5% to a pre-tax 401(k) (modeled with an average 4.5% state income tax):
          </p>

          <DataTable
            head={["Gross Annual Salary", "Annual Federal Tax", "Annual FICA Tax", "State Tax (4.5%)", "Annual Net Take-Home", "Bi-Weekly Paycheck (26x)"]}
            rows={[
              ["$45,000 / year", "$3,110", "$3,443", "$1,900", "$34,297 (76.2%)", "$1,319 / pay period"],
              ["$65,000 / year", "$6,050", "$4,973", "$2,780", "$47,947 (73.8%)", "$1,844 / pay period"],
              ["$85,000 / year", "$9,450", "$6,502", "$3,650", "$61,148 (71.9%)", "$2,352 / pay period"],
              ["$115,000 / year", "$15,280", "$8,798", "$4,960", "$80,212 (69.7%)", "$3,085 / pay period"],
              ["$160,000 / year", "$25,480", "$12,240", "$6,900", "$107,380 (67.1%)", "$4,130 / pay period"],
            ]}
          />

          <h2>Strategies to Legally Maximize Net Spendable Cash Flow</h2>
          <ul>
            <li>
              <strong>Recalibrate IRS Form W-4:</strong> If you consistently receive a $3,000+ tax refund every spring, you are giving the IRS an interest-free loan. Submitting an updated Form W-4 to your employer reduces monthly withholdings, boosting immediate monthly cash flow by $250+.
            </li>
            <li>
              <strong>Utilize Health Savings Accounts (HSAs):</strong> HSAs offer a <em>triple tax advantage</em>: contributions are pre-tax (exempt from income tax AND 7.65% FICA), growth compounds tax-free, and withdrawals for qualified medical expenses are permanently tax-free.
            </li>
            <li>
              <strong>Pre-Tax Transit and FSA Sheltering:</strong> Funding commuter benefits and Flexible Spending Accounts for dependent childcare saves an average of 25%–35% on necessary living costs.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Paycheck &amp; Tax Withholding Solvers</h3>
            <p>
              Knowing your exact net take-home pay enables precise monthly budget and savings allocations. Convert hourly or salaried earnings using our <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, evaluate progressive federal tax brackets with the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, examine the tax-saving power of pre-tax deductions via the <a href="/calculators/finance/401k-calculator">401k Calculator</a>, and organize your monthly cash flow with our <a href="/calculators/finance/budget-calculator">Budget Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why does my actual paycheck differ slightly from this calculation?",
          a: "Payroll processing software utilizes IRS Publication 15-T percentage method tables and specific employer payroll intervals. Additionally, your company may withhold post-tax deductions (e.g., Roth 401(k), voluntary life insurance, charitable giving) or local city/county income taxes.",
        },
        {
          q: "Which US states have 0% state income tax on wage income?",
          a: "Nine states impose zero state income tax on earned wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Residents in these states keep substantially more of their gross earnings.",
        },
        {
          q: "Why do high earners see their take-home pay increase late in the year?",
          a: "Because the 6.2% Social Security payroll tax is capped at the annual wage base limit ($176,100 in 2025/2026). Once your cumulative year-to-date gross salary crosses this threshold, Social Security tax withholding stops entirely for the remainder of that calendar year, providing an immediate 6.2% boost to net pay.",
        },
        {
          q: "What is the difference between pre-tax and post-tax deductions?",
          a: "Pre-tax deductions (traditional 401(k), health insurance, HSA) are subtracted before income taxes are computed, lowering your taxable income. Post-tax deductions (Roth 401(k), disability insurance, wage garnishments) are deducted after all taxes have been assessed.",
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
