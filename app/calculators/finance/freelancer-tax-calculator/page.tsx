import Calculator from "@/components/calcs/finance/freelancer-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SelfEmploymentTaxBreakdownChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/freelancer-tax-calculator";
const TITLE = "Freelancer Tax Calculator – Self-Employment Tax (1099) & Write-Offs | CalcDigi";
const DESCRIPTION =
  "Free freelancer tax calculator: calculate 15.3% Self-Employment (SE) tax, Schedule C business deductions, Section 199A QBI deductions, and quarterly estimated tax payments under IRS 1040-ES rules.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Freelancer Tax Calculator"
      intro="Calculate your exact self-employment tax liabilities, allowable business write-offs, federal income taxes, and quarterly estimated tax installments for 1099 independent contractors and small business owners."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{SE Tax} = (\text{Net Profit} \times 0.9235) \times 15.3\%"
      article={
        <>
          <h2>Direct Answer: How Self-Employment (1099) Taxes Are Calculated</h2>
          <p>
            Unlike W-2 corporate employees whose employers cover half of their Social Security and Medicare taxes, self-employed individuals (freelancers, sole proprietors, LLC owners, and 1099 gig workers) are legally responsible for paying the entire <strong>15.3% Self-Employment (SE) Tax</strong> under the <strong>Self-Employment Contributions Act (SECA)</strong>. This comprises <strong>12.4% for Social Security</strong> (up to the wage cap of $168,600 in 2024 / $176,100 in 2025) and <strong>2.9% for Medicare</strong> (uncapped).
          </p>
          <p>
            However, independent contractors benefit from powerful tax shelters: you can deduct legitimate ordinary business expenses on <strong>Schedule C</strong> to reduce net taxable profit, deduct <strong>50% of your SE tax</strong> above-the-line, and potentially claim the <strong>20% Qualified Business Income (QBI) deduction</strong> under Section 199A.
          </p>

          <SelfEmploymentTaxBreakdownChart />

          <h2>Actuarial Mathematics of 1099 Self-Employment &amp; Federal Income Taxes</h2>
          <p>
            The freelancer tax calculation involves a multi-tier statutory deduction workflow:
          </p>

          <Formula>{"\text{Net Business Profit } (N) = \text{Gross 1099 Revenues} - \text{Allowable Schedule C Expenses}"}</Formula>
          <Formula>{"\text{Net SE Earnings} = N \times 0.9235"}</Formula>
          <Formula>{"\text{SE Tax} = \text{Net SE Earnings} \times 15.3\%"}</Formula>
          <p>
            Where 0.9235 reflects the statutory IRS adjustment compensating for the employer-equivalent share.
          </p>
          <p>
            Next, compute Adjusted Gross Income (AGI) by deducting the 50% SE tax allowance:
          </p>
          <Formula>{"\text{AGI} = N - (0.50 \times \text{SE Tax}) - \text{Other Pre-Tax Deductions}"}</Formula>
          <Formula>{"\text{QBI Section 199A Deduction} = 0.20 \times \min(N, \text{Taxable Income before QBI})"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a single 1099 independent contractor generating <strong>$120,000 in gross client billings</strong> with <strong>$20,000 in documented Schedule C business write-offs</strong>, claiming the standard deduction ($14,600 in 2024):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Net Schedule C Profit (N).</strong>
              <Formula>{"N = \$120{,}000 - \$20{,}000 = \$100{,}000.00"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate Self-Employment Tax (SECA).</strong> Apply statutory 92.35% factor:
              <Formula>{"\text{Net SE Earnings} = \$100{,}000 \times 0.9235 = \$92{,}350.00"}</Formula>
              <Formula>{"\text{SE Tax} = \$92{,}350 \times 0.153 = \$14{,}129.55"}</Formula>
            </li>
            <li>
              <strong>Step 3: Deduct 50% SE Tax to Find AGI.</strong>
              <Formula>{"\text{SE Deduction} = \$14{,}129.55 \times 0.50 = \$7{,}064.78"}</Formula>
              <Formula>{"\text{AGI} = \$100{,}000 - \$7{,}064.78 = \$92{,}935.22"}</Formula>
            </li>
            <li>
              <strong>Step 4: Apply 20% Section 199A QBI Deduction &amp; Standard Deduction.</strong>
              <Formula>{"\text{QBI 20\% Deduction} = \$100{,}000 \times 0.20 = \$20{,}000.00"}</Formula>
              <Formula>{"\text{Taxable Income} = \$92{,}935.22 - \$20{,}000 - \$14{,}600 = \$58{,}335.22"}</Formula>
            </li>
            <li>
              <strong>Step 5: Compute Federal Income Tax &amp; Quarterly Installments.</strong> Using 2024 brackets, income tax on $58,335 equals <strong>$7,887.00</strong>. Total federal tax liability equals <Formula>{"\$14{,}129.55 \text{ (SE Tax)} + \$7{,}887.00 \text{ (Income Tax)} = \$22{,}016.55"}</Formula>. Required quarterly estimated tax voucher payment:
              <Formula>{"\text{Quarterly Estimated Payment (1040-ES)} = \frac{\$22{,}016.55}{4} = \$5{,}504.14 \text{ / quarter}"}</Formula>
            </li>
          </ol>

          <h2>1099 Self-Employed vs. W-2 Employee Tax Comparison ($100k Profit)</h2>
          <p>
            The table below contrasts the tax liability of an independent 1099 contractor against an identical W-2 earner ($100,000 income, single filer):
          </p>

          <DataTable
            head={["Tax Component", "W-2 Corporate Employee ($100k)", "1099 Self-Employed Freelancer ($100k Net)", "Key Structural Difference"]}
            rows={[
              ["Payroll Tax (FICA / SECA)", "$7,650 (6.2% SS + 1.45% Med)", "$14,130 (Full 15.3% SECA paid)", "Freelancer pays employer + employee shares"],
              ["Above-the-Line SE Deduction", "$0.00 (Not applicable)", "-$7,065 income deduction", "Deducts 50% of SE tax from AGI"],
              ["Section 199A QBI Deduction", "$0.00 (W-2 wages excluded)", "-$20,000 tax deduction (20% of net)", "Major tax shield exclusive to pass-throughs"],
              ["Federal Income Tax Paid", "$12,630", "$7,887", "Lower taxable base saves $4,743 in income tax"],
              ["Total Federal Tax Owed", "$20,280 total taxes", "$22,017 total taxes", "1099 pays only +$1,737 more despite 15.3% tax"],
            ]}
          />

          <h2>Top Schedule C Deductions to Legally Slash Freelancer Taxes</h2>
          <p>
            Every documented ordinary and necessary business expense reduces your net profit dollar-for-dollar:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Simplified Home Office Deduction:</strong> Deduct $5 per square foot of dedicated office space up to 300 sq ft ($1,500 maximum), or calculate actual percentage of rent, utilities, and internet.</li>
            <li><strong>Standard Mileage Deduction:</strong> Deduct 67 cents per business mile driven (2024 rate), or deduct actual vehicle depreciation, fuel, and insurance.</li>
            <li><strong>Self-Employed Health Insurance Deduction:</strong> Deduct 100% of health, dental, and qualified long-term care insurance premiums directly above-the-line.</li>
            <li><strong>Software, Equipment &amp; Section 179:</strong> Immediately expense 100% of computers, cameras, SaaS subscriptions, and office equipment in Year 1.</li>
          </ul>

          <h2>Self-Employed Retirement Tax Shields: Solo 401(k) vs. SEP IRA</h2>
          <p>
            Establishing an IRS-qualified retirement plan is the single largest above-the-line deduction available to 1099 contractors:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Solo 401(k) Plan:</strong> As both employee and employer, a sole proprietor can contribute up to $23,000 (2024) in employee elective deferrals PLUS an employer profit-sharing contribution up to 20% of net adjusted self-employment earnings, up to a $69,000 annual maximum.</li>
            <li><strong>SEP IRA (Simplified Employee Pension):</strong> Allows contributions up to 20% of net self-employment earnings (25% for incorporated businesses), capped at $69,000, with minimal administrative setup requirements.</li>
            <li><strong>Massive Income Tax Reduction:</strong> Siphoning $30,000 into a Solo 401(k) reduces net taxable income by a full $30,000, saving $6,600 to $9,600 in cash income taxes depending on tax bracket.</li>
          </ul>

          <h2>IRS Quarterly Estimated Tax Safe Harbor Rules (Form 1040-ES)</h2>
          <p>
            To avoid IRS underpayment penalties, freelancers must make quarterly tax payments by April 15, June 15, September 15, and January 15, meeting one of two <strong>Safe Harbor rules</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>100% of Prior Year Tax:</strong> Pay at least 100% of your total tax liability from the previous year (110% if prior year AGI exceeded $150,000).</li>
            <li><strong>90% of Current Year Tax:</strong> Pay at least 90% of your final tax liability for the current tax year.</li>
          </ul>

          <h2>Essential Freelancer Tax Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Form 1099-NEC:</strong> Nonemployee Compensation form sent by clients by January 31 reporting payments of $600 or more.</li>
            <li><strong>Schedule C:</strong> Form 1040 attachment used to report profit or loss from business activities.</li>
            <li><strong>Section 199A QBI:</strong> Tax Cuts and Jobs Act deduction allowing eligible pass-through entities to deduct up to 20% of qualified business income.</li>
            <li><strong>S-Corporation Election:</strong> Filing Form 2553 to treat an LLC as an S-Corp, paying a reasonable salary to avoid SE tax on remaining profit distributions.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Business &amp; Tax Solvers</h3>
            <p>
              Calculate net commercial margins with our <a href="/calculators/business/business-profit-calculator">Business Profit Calculator</a>, evaluate transaction processing with the <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>, analyze federal income tax brackets using the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, and model corporate break-even points via the <a href="/calculators/business/break-even-calculator">Break-Even Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why do freelancers pay 15.3% self-employment tax?",
          a: "For W-2 employees, employers pay half of FICA taxes (7.65%) while withholding the other half from employee wages. Because freelancers are both the employer and employee, federal law requires them to pay both shares, totaling 15.3% (12.4% Social Security and 2.9% Medicare).",
        },
        {
          q: "What is the Section 199A Qualified Business Income (QBI) deduction?",
          a: "The QBI deduction allows eligible self-employed individuals and pass-through business owners to deduct up to 20% of their net qualified business income from federal income taxes, lowering effective tax liabilities substantially.",
        },
        {
          q: "What happens if I miss a quarterly estimated tax deadline?",
          a: "Missing a quarterly deadline or underpaying triggers an IRS underpayment penalty calculated on Form 2210. Interest accrues on the unpaid balance from the due date until paid, currently assessed at 8% annualized interest.",
        },
        {
          q: "When should a freelancer consider forming an S-Corporation?",
          a: "Forming an LLC and electing S-Corp tax status typically becomes advantageous when net business profits exceed $70,000 to $80,000 per year. You pay yourself a 'reasonable salary' (subject to 15.3% FICA) while taking remaining profits as distributions (exempt from the 15.3% SE tax).",
        },
        {
          q: "Can I deduct my home internet and cell phone bills?",
          a: "Yes, but only the percentage used directly for business activities. If you use your personal cell phone 60% for client calls and business communication, you can deduct 60% of your monthly bill on Schedule C.",
        },
        {
          q: "What is the standard mileage deduction rate for business travel?",
          a: "For tax year 2024, the IRS standard business mileage rate is 67 cents per mile driven for business purposes. You must maintain a written contemporaneous mileage log noting dates, mileage, and business purpose.",
        },
        {
          q: "Are client meals and entertainment tax deductible for freelancers?",
          a: "Business meals with clients or while traveling for business are 50% tax-deductible, provided business was conducted and the meal was not lavish. Client entertainment expenses (concerts, sporting events) are non-deductible.",
        },
        {
          q: "How much money should a freelancer set aside for taxes from every check?",
          a: "A reliable rule of thumb is to deposit 25% to 30% of every client invoice payment into a dedicated business tax savings account. High earners in high-tax states (California, New York) should reserve 35% to 40%.",
        },
      ]}
      related={[
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Tax Calculator" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/paypal-fee-calculator", icon: "💳", name: "PayPal Fee" },
        { href: "/calculators/business/business-profit-calculator", icon: "💼", name: "Business Profit" },
        { href: "/calculators/finance/salary-calculator", icon: "📊", name: "Salary Calculator" },
        { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
