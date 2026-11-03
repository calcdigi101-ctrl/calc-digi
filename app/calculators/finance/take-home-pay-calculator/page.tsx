import Calculator from "@/components/calcs/finance/take-home-pay-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TakeHomePayWaterfallDeductionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/take-home-pay-calculator";
const TITLE = "Take-Home Pay Calculator";
const DESCRIPTION =
  "Free take-home pay calculator: calculate exact net paycheck amounts after federal income tax, FICA payroll withholdings, state taxes, and pre-tax benefit.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Take-Home Pay Calculator"
      intro="Determine your actual net take-home paycheck. Model pre-tax health insurance, 401(k) retirement contributions, federal income tax brackets, FICA taxes, and state withholding rates."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Pay} = \text{Gross Pay} - \text{Pre-Tax Deductions} - \text{Fed Tax} - \text{FICA} - \text{State Tax}"
      article={
        <>
          <h2>Direct Answer: Deconstructing Your Net Take-Home Paycheck</h2>
          <p>
            Your <strong>net take-home pay</strong> represents the actual spendable cash deposited into your checking account after all statutory and voluntary payroll withholdings are deducted from your gross compensation. In corporate payroll accounting, deductions follow a precise sequential &ldquo;waterfall&rdquo; framework: <strong>Gross Earnings → Pre-Tax Deductions (401k, HSA, Medical) → Federal Income Tax → FICA Payroll Taxes (Social Security and Medicare) → State &amp; Local Income Taxes → Post-Tax Deductions</strong>.
          </p>
          <p>
            Depending on your state of residence, tax filing status, and elective retirement contributions, total payroll deductions typically consume between <strong>22% and 38%</strong> of gross headline salary.
          </p>

          <TakeHomePayWaterfallDeductionChart />

          <h2>Actuarial Mathematics of the Payroll Deduction Waterfall</h2>
          <p>
            The mathematical sequence for computing net periodic take-home pay is defined by:
          </p>

          <Formula>{"\text{Gross Periodic Pay } (G) = \frac{\text{Annual Gross Salary}}{N_{\text{periods}}}"}</Formula>
          <Formula>{"\text{Adjusted FICA Base} = G - \text{Section 125 Pre-Tax Health/Dental/FSA}"}</Formula>
          <Formula>{"\text{Adjusted Federal Tax Base} = \text{Adjusted FICA Base} - \text{Pre-Tax 401(k) / Traditional Deferrals}"}</Formula>
          <Formula>{"\text{Net Take-Home Pay} = G - D_{\text{pre-tax}} - T_{\text{fed}} - T_{\text{fica}} - T_{\text{state}} - D_{\text{post-tax}}"}</Formula>
          <p>
            Where:
            <br />• <strong>T_fica</strong> = Mandatory FICA taxes: 6.2% Social Security (capped at $168,600 wage base in 2024) + 1.45% Medicare (uncapped)
            <br />• <strong>T_fed</strong> = Federal income tax withheld based on Form W-4 coordinates and IRS progressive brackets
            <br />• <strong>T_state</strong> = State and municipal local income taxes (ranging from 0% in TX/FL/WA to over 10% in CA/NY)
            <br />• <strong>D_pre-tax</strong> = Section 125 health insurance, HSA/FSA, and pre-tax 401(k) contributions
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a single employee in an average 5.0% state tax bracket earning an annual salary of <strong>$80,000 paid bi-weekly (26 pay periods)</strong>, contributing <strong>5% ($4,000/yr) to a pre-tax 401(k)</strong>, with <strong>$100/bi-weekly ($2,600/yr) in pre-tax health insurance</strong>, claiming the standard deduction ($14,600):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Gross Bi-Weekly Pay (G).</strong>
              <Formula>{"G = \frac{\$80{,}000}{26} = \$3{,}076.92 \text{ per bi-weekly paycheck}"}</Formula>
            </li>
            <li>
              <strong>Step 2: Subtract Pre-Tax Deductions.</strong> Pre-tax medical is $100.00. 401(k) at 5% is <Formula>{"\$3{,}076.92 \times 0.05 = \$153.85"}</Formula>. Total pre-tax deductions equal:
              <Formula>{"D_{\text{pre-tax}} = \$100.00 + \$153.85 = \$253.85"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate FICA Payroll Taxes.</strong> FICA applies to gross minus Section 125 medical: <Formula>{"(\$3{,}076.92 - \$100.00) = \$2{,}976.92"}</Formula>.
              <Formula>{"T_{\text{fica}} = \$2{,}976.92 \times 0.0765 = \$227.73 \text{ (\$184.57 Social Security + \$43.16 Medicare)}"}</Formula>
            </li>
            <li>
              <strong>Step 4: Compute Federal Income Tax Withholding.</strong> Annual taxable federal base equals <Formula>{"\$80{,}000 - \$2{,}600 - \$4{,}000 - \$14{,}600 = \$58{,}800"}</Formula>. Annual federal tax equals $7,989. Divide by 26:
              <Formula>{"T_{\text{fed}} = \frac{\$7{,}989}{26} = \$307.27 \text{ federal tax per paycheck}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Compute State Tax and Net Take-Home Pay.</strong> State tax at 5% effective equals roughly <Formula>{"\$128.50"}</Formula>. Total paycheck withholdings equal <Formula>{"\$253.85 + \$227.73 + \$307.27 + \$128.50 = \$917.35"}</Formula>. Net take-home pay is:
              <Formula>{"\text{Net Take-Home Pay} = \$3{,}076.92 - \$917.35 = \$2{,}159.57 \text{ per bi-weekly paycheck (\$56,148.82 / year)}"}</Formula>
            </li>
          </ol>

          <h2>Take-Home Pay Waterfall Comparison: High-Tax vs. Zero-Tax States ($100k Salary)</h2>
          <p>
            Where you live dramatically alters take-home cash flow. The benchmark table below contrasts a $100,000 W-2 salary across zero-tax states (Texas, Florida) against high-tax states (California, New York):
          </p>

          <DataTable
            head={["Payroll Component", "Zero-Tax State (Texas / Florida)", "Moderate-Tax State (Illinois / NC)", "High-Tax State (California / NY)", "Net Impact on Cash Flow"]}
            rows={[
              ["Gross Annual Salary", "$100,000", "$100,000", "$100,000", "Identical gross base"],
              ["Pre-Tax Deductions (401k/HSA)", "-$8,000 (8%)", "-$8,000 (8%)", "-$8,000 (8%)", "Identical pre-tax savings"],
              ["Federal Income Tax (Single)", "-$11,940", "-$11,940", "-$11,940", "Standard federal liability"],
              ["FICA Taxes (SS + Medicare)", "-$7,650", "-$7,650", "-$7,650", "Mandatory federal payroll tax"],
              ["State & Local Income Tax", "$0.00 (Zero State Tax)", "-$4,250 (Approx. 4.95%)", "-$6,850 (Approx. 7.5% - 9%)", "Zero-tax states save $4k to $7k"],
              ["Net Annual Take-Home Cash", "$72,410 / year ($6,034/mo)", "$68,160 / year ($5,680/mo)", "$65,560 / year ($5,463/mo)", "+$6,850 / yr higher take-home"],
            ]}
          />

          <h2>Local Municipal &amp; Commuter Taxes: NYC, Philadelphia, and Ohio Cities</h2>
          <p>
            Beyond state and federal taxes, numerous metropolitan jurisdictions assess mandatory local wage withholdings:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>New York City Resident Tax:</strong> NYC assesses a progressive local income tax ranging from 3.078% to 3.876% directly on top of New York State income taxes.</li>
            <li><strong>Philadelphia Wage Tax:</strong> Imposes a flat 3.75% wage tax on Philadelphia residents and 3.44% on non-residents commuting into the city for work.</li>
            <li><strong>Ohio &amp; Pennsylvania Municipal Taxes:</strong> Hundreds of townships and school districts levy 1% to 2.5% local earned income taxes (EIT) that appear as separate paycheck deduction line items.</li>
          </ul>

          <h2>Pre-Tax Deductions: The Legal Tax Reduction Multiplier</h2>
          <p>
            Electing pre-tax employee benefits lowers your taxable income across multiple tax categories:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Traditional 401(k) / 403(b):</strong> Exempt from federal and state income taxes. In the 22% federal bracket, a $100 contribution costs only $78 in reduced take-home pay.</li>
            <li><strong>Section 125 Premium Only Plans (POP):</strong> Employer health, vision, and dental insurance premiums are exempt from federal income tax, state income tax, AND FICA taxes, delivering instant 30%+ savings.</li>
            <li><strong>Health Savings Accounts (HSA):</strong> Triple-tax advantaged: contributions bypass FICA, federal, and state income taxes when made through payroll deduction.</li>
          </ul>

          <h2>Paycheck Optimization: Preventing IRS Underpayment Penalties</h2>
          <p>
            When calibrating Form W-4 allowances, employees must balance having sufficient monthly take-home liquidity with avoiding IRS underpayment penalties under IRC Section 6654:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The Safe Harbor Threshold:</strong> You avoid penalties if your total annual withholding equals at least 90% of your current tax liability or 100% of your prior year tax liability (110% for high earners with AGI over $150,000).</li>
            <li><strong>Quarterly Withholding Reviews:</strong> Review withholdings whenever life events occur (marriage, childbirth, home purchase, secondary freelance income) to maintain optimal cash flow.</li>
          </ul>

          <h2>Post-Tax Deductions vs. Pre-Tax Deductions</h2>
          <p>
            Unlike pre-tax deductions, post-tax deductions are withheld after all taxes have been computed:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Roth 401(k) Contributions:</strong> Funded with after-tax dollars, providing zero immediate tax reduction but guaranteeing 100% tax-free withdrawals in retirement.</li>
            <li><strong>Wage Garnishments &amp; Child Support:</strong> Legal mandates deducted from net disposable earnings under Consumer Credit Protection Act (CCPA) limits.</li>
          </ul>

          <h2>Essential Paycheck Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>FICA (Federal Insurance Contributions Act):</strong> Mandatory federal payroll deduction funding Social Security and Medicare.</li>
            <li><strong>Form W-4:</strong> IRS withholding certificate where employees claim dependents, additional income, and deductions to calibrate paycheck withholdings.</li>
            <li><strong>Disposable Earnings:</strong> Earnings remaining after deducting mandatory legally required taxes, used to calculate statutory garnishment caps.</li>
            <li><strong>Section 125 Cafeteria Plan:</strong> IRS provision permitting employees to receive certain qualified benefits on a pre-tax basis.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Payroll &amp; Budget Solvers</h3>
            <p>
              Convert salary across pay frequencies with our <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, structure monthly cash flow via the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, audit federal brackets using the <a href="/calculators/finance/tax-calculator">Income Tax Calculator</a>, and model retirement deferrals with the <a href="/calculators/finance/401k-calculator">401(k) Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why is my take-home pay lower than my gross salary divided by pay periods?",
          a: "Mandatory statutory taxes (federal income tax, state income tax, and 7.65% FICA) and voluntary pre-tax deductions (health insurance, 401k, HSA) are withheld before your check is disbursed, typically reducing take-home pay by 22% to 35% of gross.",
        },
        {
          q: "How does Form W-4 affect my take-home pay?",
          a: "Form W-4 instructs your employer's payroll system how much federal income tax to withhold. Claiming dependent credits or entering deductions increases your take-home pay, while entering extra withholding reduces your paycheck but prevents owing taxes at year-end.",
        },
        {
          q: "What states have zero state income tax on paychecks?",
          a: "There are eight states with zero personal earned income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming (New Hampshire taxes only dividend and interest income, fully phasing out in 2027).",
        },
        {
          q: "What is the difference between pre-tax and post-tax deductions?",
          a: "Pre-tax deductions (traditional 401k, health insurance, HSA) are subtracted before taxes are calculated, lowering your taxable income. Post-tax deductions (Roth 401k, disability insurance, charitable payroll gifts) are taken after taxes are computed.",
        },
        {
          q: "Does contributing to a 401(k) reduce FICA taxes?",
          a: "No. 401(k) contributions are exempt from federal and state income taxes, but they are still subject to FICA taxes (6.2% Social Security and 1.45% Medicare). In contrast, Section 125 health insurance and HSA contributions are exempt from FICA.",
        },
        {
          q: "What is the Additional Medicare Tax?",
          a: "The Affordable Care Act imposes an Additional Medicare Tax of 0.9% on wages exceeding $200,000 for single filers ($250,000 for married couples filing jointly), bringing the total employee Medicare tax to 2.35% on excess earnings.",
        },
        {
          q: "What should I do if my tax refund is very large every year?",
          a: "A large tax refund means you gave the federal government an interest-free loan throughout the year. Submitting a revised Form W-4 to your payroll department adjusting deductions will increase your monthly take-home paycheck immediately.",
        },
        {
          q: "How are bonuses taxed compared to regular paychecks?",
          a: "The IRS considers bonuses supplemental wages. Employers typically withhold federal tax at a flat statutory rate of 22% (37% for bonuses over $1 million), plus FICA and state taxes, often making bonus check withholding appear higher than regular checks.",
        },
      ]}
      related={[
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary Calculator" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Income Tax" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/hourly-to-salary-calculator", icon: "⏱️", name: "Hourly to Salary" },
        { href: "/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
        { href: "/calculators/finance/freelancer-tax-calculator", icon: "💻", name: "Freelancer Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
