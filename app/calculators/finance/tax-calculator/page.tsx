import Calculator from "@/components/calcs/finance/tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FederalTaxBracketProgressiveCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/tax-calculator";
const TITLE = "Income Tax Calculator";
const DESCRIPTION =
  "Free federal income tax calculator: calculate marginal tax brackets, effective tax rates, standard deductions, FICA payroll withholdings, and take-home pay.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Income Tax Calculator"
      intro="Calculate your exact federal income tax liability, marginal tax bracket, effective tax rate, and mandatory FICA payroll deductions under current IRS progressive tax schedules."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="T_{\text{fed}} = \sum_{j=1}^{m} \tau_j \times \max\left(0, \; \min(Y_{\text{taxable}}, U_j) - L_j\right)"
      article={
        <>
          <h2>Direct Answer: How the US Progressive Income Tax System Works</h2>
          <p>
            The United States utilizes a <strong>graduated progressive income tax system</strong>. Rather than taxing your entire income at a single flat rate, the Internal Revenue Service (IRS) divides taxable income into seven distinct marginal tax brackets: <strong>10%, 12%, 22%, 24%, 32%, 35%, and 37%</strong>. Each tax percentage applies strictly to dollars earned within that specific statutory threshold band.
          </p>
          <p>
            A common misconception is that entering a higher tax bracket reduces net take-home pay. Because brackets are marginal, entering a higher bracket means <em>only the dollars above that threshold are taxed at the higher rate</em>. Your <strong>Effective Tax Rate (ETR)</strong>—the actual percentage of total income paid in taxes—is always significantly lower than your top marginal bracket.
          </p>

          <FederalTaxBracketProgressiveCurveChart />

          <h2>Actuarial Mathematics of Federal Progressive Tax &amp; FICA Withholdings</h2>
          <p>
            Federal income tax is calculated on <strong>Taxable Income (<Formula>{"Y_{\text{taxable}}"}</Formula>)</strong>, which equals Gross Income minus either the Standard Deduction or Itemized Deductions (Schedule A) and pre-tax adjustments (401k, HSA, health insurance):
          </p>

          <Formula>{"Y_{\text{taxable}} = \max\left(0, \; Y_{\text{gross}} - \text{Pre-Tax Adjustments} - \max(\text{Standard Deduction}, \text{Itemized Deductions})\right)"}</Formula>
          <p>
            Total federal tax liability <Formula>{"T_{\text{fed}}"}</Formula> across <em>m</em> statutory brackets with lower limits <Formula>{"L_j"}</Formula>, upper limits <Formula>{"U_j"}</Formula>, and marginal rates <Formula>{"\tau_j"}</Formula> is:
          </p>
          <Formula>{"T_{\text{fed}} = \sum_{j=1}^{m} \tau_j \times \max\left(0, \; \min(Y_{\text{taxable}}, U_j) - L_j\right)"}</Formula>
          <p>
            In addition to federal income taxes, W-2 employees pay mandatory <strong>FICA payroll taxes</strong>:
            <br />• <strong>Social Security (OASDI):</strong> 6.2% on wages up to the wage base cap ($168,600 in 2024 / $176,100 in 2025)
            <br />• <strong>Medicare (HI):</strong> 1.45% on all wages without cap, plus an Additional Medicare Tax of 0.9% on earnings exceeding $200,000 (single) or $250,000 (married)
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a <strong>Single W-2 filer earning an annual salary of $95,000</strong> claiming the 2024 standard deduction of <strong>$14,600</strong>, contributing <strong>$5,000 pre-tax to a 401(k)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Taxable Income.</strong>
              <Formula>{"Y_{\text{taxable}} = \$95{,}000 - \$5{,}000 \text{ (401k)} - \$14{,}600 \text{ (Standard Deduction)} = \$75{,}400.00"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate Bracket 1 Tax (10% on $0 to $11,600).</strong>
              <Formula>{"T_1 = \$11{,}600 \times 0.10 = \$1{,}160.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate Bracket 2 Tax (12% on $11,600 to $47,150).</strong>
              <Formula>{"T_2 = (\$47{,}150 - \$11{,}600) \times 0.12 = \$35{,}550 \times 0.12 = \$4{,}266.00"}</Formula>
            </li>
            <li>
              <strong>Step 4: Calculate Bracket 3 Tax (22% on remaining $47,150 to $75,400).</strong>
              <Formula>{"T_3 = (\$75{,}400 - \$47{,}150) \times 0.22 = \$28{,}250 \times 0.22 = \$6{,}215.00"}</Formula>
            </li>
            <li>
              <strong>Step 5: Sum Federal Tax &amp; Effective Tax Rate.</strong> Total federal income tax is:
              <Formula>{"T_{\text{fed}} = \$1{,}160 + \$4{,}266 + \$6{,}215 = \$11{,}641.00"}</Formula>
              While in the 22% marginal bracket, the <strong>Effective Federal Tax Rate is only 12.25%</strong> (<Formula>{"\$11{,}641 / \$95{,}000"}</Formula>). Adding FICA (<Formula>{"\$95{,}000 \times 0.0765 = \$7{,}267.50"}</Formula>) brings total federal withholdings to <strong>$18,908.50</strong>.
            </li>
          </ol>

          <h2>2024 Federal Marginal Tax Brackets &amp; Thresholds (Single vs. Married)</h2>
          <p>
            The table below itemizes the 2024 marginal tax brackets and cumulative tax thresholds under current IRS schedules:
          </p>

          <DataTable
            head={["Marginal Tax Rate", "Single Filer Taxable Bracket", "Married Filing Jointly Bracket", "Base Tax for Bracket"]}
            rows={[
              ["10% Bracket", "$0 to $11,600", "$0 to $23,200", "$0.00"],
              ["12% Bracket", "$11,600 to $47,150", "$23,200 to $94,300", "$1,160.00 (Single) / $2,320.00 (MFJ)"],
              ["22% Bracket", "$47,150 to $100,525", "$94,300 to $201,050", "$5,426.00 (Single) / $10,852.00 (MFJ)"],
              ["24% Bracket", "$100,525 to $191,950", "$201,050 to $383,900", "$17,168.50 (Single) / $34,337.00 (MFJ)"],
              ["32% Bracket", "$191,950 to $243,725", "$383,900 to $487,450", "$39,110.50 (Single) / $78,221.00 (MFJ)"],
              ["35% Bracket", "$243,725 to $609,350", "$487,450 to $731,200", "$55,678.50 (Single) / $111,357.00 (MFJ)"],
              ["37% Top Bracket", "Over $609,350", "Over $731,200", "$183,647.25 (Single) / $196,669.50 (MFJ)"],
            ]}
          />

          <h2>Year-End Tax Planning Strategies: Harvesting &amp; Bunching</h2>
          <p>
            Proactive year-end financial management legally curtails federal tax liabilities:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Tax-Loss Harvesting:</strong> Realizing capital losses on depreciated investments offsets 100% of capital gains plus up to $3,000 of ordinary income annually, with unused losses carrying forward indefinitely.</li>
            <li><strong>Charitable Bunching Strategy:</strong> Concentrating two or three years of charitable giving into a single tax year (utilizing a Donor-Advised Fund) pushes deductions above the standard deduction threshold, enabling itemization.</li>
            <li><strong>Maximizing HSA Triple-Tax Advantage:</strong> Health Savings Account contributions are 100% tax-deductible going in, grow tax-free, and withdraw tax-free for qualified medical expenses.</li>
          </ul>

          <h2>Standard Deduction vs. Itemized Deductions (Schedule A)</h2>
          <p>
            Taxpayers must choose between claiming the standard deduction or itemizing eligible deductions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>2024 Standard Deductions:</strong> $14,600 for Single filers, $29,200 for Married Filing Jointly, and $21,900 for Head of Household.</li>
            <li><strong>When to Itemize:</strong> Itemizing is only advantageous when qualifying expenses—including mortgage interest on up to $750,000 of debt, state and local taxes (SALT capped at $10,000), and charitable gifts—exceed your standard deduction. Over 90% of U.S. taxpayers claim the standard deduction.</li>
          </ul>

          <h2>Tax Credits vs. Tax Deductions: The Mathematical Multiplier</h2>
          <p>
            Understanding the distinction between deductions and credits is vital for effective tax planning:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Tax Deductions:</strong> Reduce your taxable income by a dollar amount. In the 22% bracket, a $1,000 deduction saves you $220 in cash taxes.</li>
            <li><strong>Tax Credits:</strong> Reduce your tax bill dollar-for-dollar. A $1,000 tax credit (e.g. Child Tax Credit or EV Clean Vehicle Credit) saves you a full $1,000 in cash taxes, making credits far more valuable than deductions.</li>
          </ul>

          <h2>Essential Tax Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Adjusted Gross Income (AGI):</strong> Total gross income minus specific above-the-line adjustments (student loan interest, educator expenses, HSA contributions).</li>
            <li><strong>Marginal Tax Rate:</strong> The tax rate assessed on the very last dollar of income earned.</li>
            <li><strong>Effective Tax Rate:</strong> Total tax paid divided by total gross income, representing the true average tax burden.</li>
            <li><strong>W-4 Form:</strong> The IRS employee withholding certificate telling employers how much federal tax to deduct from each paycheck.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Payroll &amp; Income Solvers</h3>
            <p>
              Calculate your net paycheck via the <a href="/calculators/finance/take-home-pay-calculator">Take-Home Pay Calculator</a>, evaluate gross earnings using the <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, model self-employment taxes with the <a href="/calculators/finance/freelancer-tax-calculator">Freelancer Tax Calculator</a>, and audit sales tax liabilities using our <a href="/calculators/business/sales-tax-calculator">Sales Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Does getting a raise ever result in less take-home pay due to a higher tax bracket?",
          a: "No, never. In the US progressive tax system, only the dollars above the new bracket threshold are taxed at the higher marginal percentage. Every additional dollar you earn always increases your net take-home pay.",
        },
        {
          q: "What is the difference between marginal tax rate and effective tax rate?",
          a: "Your marginal tax rate is the highest bracket applied to your last dollar of income (e.g. 22%). Your effective tax rate is your total tax paid divided by your total income (e.g. 12.25%), reflecting your true overall tax burden.",
        },
        {
          q: "What is FICA tax and who pays it?",
          a: "FICA stands for Federal Insurance Contributions Act. It consists of Social Security tax (6.2% up to $168,600) and Medicare tax (1.45% uncapped). W-2 employees pay 7.65% from their paychecks, while employers pay a matching 7.65%.",
        },
        {
          q: "What are above-the-line tax deductions?",
          a: "Above-the-line deductions reduce your gross income to arrive at Adjusted Gross Income (AGI). They can be claimed even if you take the standard deduction, and include HSA contributions, student loan interest (up to $2,500), and traditional IRA contributions.",
        },
        {
          q: "What is the Alternative Minimum Tax (AMT)?",
          a: "The AMT is a parallel tax system designed to ensure high-income taxpayers do not eliminate their tax liabilities through excessive deductions. It recalculates tax liability by disallowing certain deductions (like state taxes) and applies flat rates of 26% or 28%.",
        },
        {
          q: "How can I lower my taxable income legally?",
          a: "Max out pre-tax retirement contributions (Traditional 401(k) up to $23,000), fund a Health Savings Account (HSA up to $4,150 single / $8,300 family), utilize Flexible Spending Accounts (FSA), and claim all qualifying tax credits.",
        },
        {
          q: "What happens if I under-withhold taxes during the year?",
          a: "If you owe more than $1,000 at tax time and did not pay at least 90% of your current year tax or 100% of your prior year tax (110% for high earners), the IRS assesses an underpayment penalty under Form 2210.",
        },
        {
          q: "Are state income taxes deductible on federal tax returns?",
          a: "If you itemize deductions on Schedule A, you can deduct state income taxes (or sales taxes) and local property taxes up to the federal SALT cap of $10,000 per year ($5,000 if married filing separately).",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/salary-calculator", icon: "💼", name: "Salary & Take-Home Pay Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/freelancer-tax-calculator", icon: "💻", name: "Freelancer Tax Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
