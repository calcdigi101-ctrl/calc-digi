import Calculator from "@/components/calcs/finance/freelancer-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SS_WAGE_BASE, TAX_YEAR } from "@/lib/tax";
import { SelfEmploymentTaxBreakdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/freelancer-tax-calculator";
const TITLE = `Freelancer Tax Calculator ${TAX_YEAR} – 1099 Self-Employment, QBI & Quarterly Estimates | CalcDigi`;
const DESCRIPTION =
  `Free ${TAX_YEAR} self-employment tax calculator for freelancers, independent contractors, and sole proprietors. Estimate 15.3% SECA tax, 20% Section 199A QBI deduction, federal and state income tax, and quarterly Form 1040-ES payments.`;

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Freelancer Tax Calculator"
      intro={`Calculate your estimated ${TAX_YEAR} self-employment tax (SECA), federal and state income taxes, Section 199A Qualified Business Income (QBI) deductions, and exact quarterly Form 1040-ES estimated tax voucher payments.`}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="SETax = NetProfit * 0.9235 * 0.153"
      article={
        <>
          <h2>Direct Answer: How Does the 15.3% Self-Employment Tax (SECA) Work?</h2>
          <p>
            When you earn 1099 independent contractor, freelance, or sole proprietor income, no employer withholds payroll taxes from your client payments. Under the <strong>Self-Employment Contributions Act (SECA)</strong>, self-employed professionals must pay both the employee and employer portions of FICA taxes, totaling <strong>15.3%</strong>. This consists of <strong>12.4% for Social Security</strong> (assessed on net self-employment earnings up to the statutory annual wage base limit of ${SS_WAGE_BASE.toLocaleString()} for {TAX_YEAR}) and <strong>2.9% for Medicare</strong> (uncapped, with an additional 0.9% surtax for high earners). SECA tax applies to <strong>92.35% of your net business profit</strong>.
          </p>

          <Formula>SE Tax = Net Profit × 92.35% × 15.3%</Formula>
          <Formula>Taxable Income = Net Profit − (50% of SE Tax) − QBI Deduction (20%) − Standard Deduction</Formula>
          <p>
            Where:
            <br />• <strong>Net Profit:</strong> Gross 1099 Revenue minus ordinary and necessary business expenses (Schedule C)
            <br />• <strong>92.35% Factor:</strong> Simulates the employer tax deduction allowed to W-2 employers
            <br />• <strong>Above-the-Line Deduction:</strong> You can deduct 50% of your calculated SE tax directly from your Adjusted Gross Income (AGI) on Form 1040
          </p>

          <SelfEmploymentTaxBreakdownChart />

          <h2>1099 Freelance Tax &amp; Quarterly Voucher Matrix ({TAX_YEAR} Single Filer)</h2>
          <p>
            The benchmark table below demonstrates total estimated federal tax obligations (SE tax + federal income tax after the 20% QBI deduction and standard deduction) across net annual profit tiers:
          </p>

          <DataTable
            head={["Net Profit (Rev − Exp)", "15.3% SECA Tax", "Federal Income Tax (approx)", "Total Federal Tax", "Quarterly Estimated Payment (1040-ES)"]}
            rows={[
              ["$40,000", "$5,652", "$1,410", "$7,062", "$1,765 / quarter"],
              ["$75,000", "$10,598", "$5,240", "$15,838", "$3,959 / quarter"],
              ["$110,000", "$15,543", "$10,950", "$26,493", "$6,623 / quarter"],
              ["$160,000", "$22,608", "$21,410", "$44,018", "$11,004 / quarter"],
              ["$220,000", "$26,820", "$36,920", "$63,740", "$15,935 / quarter"],
            ]}
          />

          <h2>IRS Safe Harbor Rules &amp; Quarterly Deadlines</h2>
          <p>
            The US tax system is strictly &ldquo;pay-as-you-go&rdquo;. Failing to remit sufficient estimated taxes across the year triggers IRS underpayment penalties under IRC Section 6654. To maintain <strong>Safe Harbor protection</strong>, you must pay either:
          </p>
          <ul>
            <li><strong>90% of your current tax year&rsquo;s total tax liability</strong>, OR</li>
            <li><strong>100% of your prior year&rsquo;s total tax liability</strong> (raised to <strong>110%</strong> if your prior year Adjusted Gross Income exceeded $150,000).</li>
          </ul>
          <p>
            Statutory IRS quarterly voucher deadlines occur on: <strong>April 15 (Q1)</strong>, <strong>June 15 (Q2)</strong>, <strong>September 15 (Q3)</strong>, and <strong>January 15 of the following year (Q4)</strong>.
          </p>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Self-Employment &amp; Income Solvers</h3>
            <p>
              Navigating 1099 self-employment taxes requires budgeting for federal income and 15.3% SE tax. Calculate exact net after-tax income using our <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, evaluate progressive tax tiers with the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, track business operating margins via the <a href="/calculators/finance/business-profit-calculator">Business Profit Calculator</a>, and explore pre-tax Solo 401(k) deductions using our <a href="/calculators/finance/401k-calculator">401k Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the Section 199A Qualified Business Income (QBI) deduction?",
          a: "The QBI deduction allows eligible self-employed individuals, sole proprietors, partners, and S-corporation shareholders to deduct up to 20% of their net qualified business income from their federal income taxes, subject to taxable income limitations and specified service trade or business (SSTB) phase-out rules.",
        },
        {
          q: "Can I deduct health insurance premiums as a self-employed individual?",
          a: "Yes. Self-employed health insurance premiums (medical, dental, and qualified long-term care) for yourself, your spouse, and dependents are 100% deductible as an 'above-the-line' adjustment to income on Schedule 1 of Form 1040, provided you were not eligible to participate in an employer-subsidized health plan.",
        },
        {
          q: "Do I owe self-employment tax if I also hold a full-time W-2 job?",
          a: "Yes, you must pay SE tax on your freelance net profit. However, Social Security taxes are capped at the annual wage base ($176,100 in 2025/2026). If your W-2 job already withholds Social Security up to the wage base, your freelance earnings are completely exempt from the 12.4% Social Security portion, owing only the 2.9% Medicare tax.",
        },
        {
          q: "What expenses can I legitimately write off on Schedule C?",
          a: "Ordinary and necessary business expenses are fully deductible: computer equipment, software subscriptions, cell phone and home internet allocation, advertising, professional legal/accounting fees, business travel, 50% of business meals, commercial insurance, and the home office deduction (simplified $5/sq ft up to 300 sq ft).",
        },
      ]}
      related={[
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/business-profit-calculator", icon: "📊", name: "Business Profit" },
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
