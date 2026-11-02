import Calculator from "@/components/calcs/finance/roth-ira-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RothVsTraditionalIraTaxHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/roth-ira-calculator";
const TITLE = "Roth IRA Calculator – Tax-Free Growth, Limits & Conversions | CalcDigi";
const DESCRIPTION =
  "Free Roth IRA calculator: calculate tax-free compounding growth, annual contribution limits, income phase-outs, backdoor Roth conversions, and Traditional vs. Roth wealth comparison.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Roth IRA Calculator"
      intro="Project your tax-free retirement wealth inside a Roth IRA. Compare tax-free Roth distributions against tax-deferred Traditional IRA withdrawals, and calculate Backdoor Roth conversion benefits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV_{\text{Roth}} = \sum_{t=1}^{N} PMT(1 + r)^t \quad \text{(100% Tax-Free Distributions)}"
      article={
        <>
          <h2>Direct Answer: What Is a Roth IRA &amp; How Does Tax-Free Growth Work?</h2>
          <p>
            A <strong>Roth IRA</strong> is an individual retirement arrangement established under Internal Revenue Code Section 408A. Unlike Traditional IRAs or pre-tax 401(k) plans where contributions reduce current-year taxable income, Roth IRA contributions are made with <strong>after-tax dollars</strong>. In exchange, all future investment returns, capital gains, and dividend distributions compound completely tax-sheltered, and all qualified withdrawals taken after age 59½ (and meeting the 5-year holding rule) are <strong>100% federal and state income tax-free</strong>.
          </p>
          <p>
            Additionally, Roth IRAs feature unmatched liquidity and estate planning flexibility: original principal contributions can be withdrawn at any time and for any reason with <strong>zero taxes and zero penalties</strong>, and Roth IRAs are exempt from mandatory Required Minimum Distributions (RMDs) during the owner&rsquo;s entire lifetime.
          </p>

          <RothVsTraditionalIraTaxHorizonChart />

          <h2>Actuarial Mathematics: Roth IRA vs. Traditional IRA Terminal Wealth</h2>
          <p>
            The mathematical decision between a Roth IRA and a Traditional IRA depends on the spread between your <strong>current marginal tax rate (<Formula>{"T_{\text{current}}"}</Formula>)</strong> and your <strong>expected future tax rate in retirement (<Formula>{"T_{\text{retirement}}"}</Formula>)</strong>:
          </p>

          <Formula>{"FV_{\text{Roth}} = \left[ C \times (1 - T_{\text{current}}) \right] \times (1 + r)^t"}</Formula>
          <Formula>{"FV_{\text{Traditional}} = \left[ C \times (1 + r)^t \right] \times (1 - T_{\text{retirement}})"}</Formula>
          <p>
            Where:
            <br />• <strong>C</strong> = Gross pre-tax income allocated to retirement savings ($)
            <br />• <strong>r</strong> = Annual portfolio investment return rate (in decimal format)
            <br />• <strong>t</strong> = Investment duration horizon in calendar years
            <br />• <strong>T_current</strong> = Current marginal income tax rate (e.g. 0.24 for 24%)
            <br />• <strong>T_retirement</strong> = Future effective income tax rate at the time of retirement withdrawal
          </p>
          <p>
            <em>Mathematical Equality Theorem:</em> If <Formula>{"T_{\text{current}} = T_{\text{retirement}}"}</Formula>, both accounts yield mathematically identical net after-tax wealth. However, whenever an investor expects higher tax rates in retirement—or wishes to eliminate future legislative tax risk—the <strong>Roth IRA is mathematically superior</strong>.
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an individual contributing <strong>$7,000 per year</strong> into a Roth IRA over a <strong>30-year horizon</strong> (<Formula>{"t = 30"}</Formula>) in a broad-market equity index fund compounding at an average return of <strong>8.00% annually</strong> (<Formula>{"r = 0.080"}</Formula>):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute future value multiplier.</strong> Over 30 years at 8%, the future value annuity factor is:
              <Formula>{"\text{Annuity Factor} = \frac{(1 + 0.080)^{30} - 1}{0.080} = \frac{10.062657 - 1}{0.080} = 113.2832"}</Formula>
            </li>
            <li>
              <strong>Step 2: Solve for terminal Roth IRA accumulated balance.</strong>
              <Formula>{"FV_{\text{Roth}} = \$7{,}000 \times 113.2832 = \$792{,}982.40"}</Formula>
            </li>
            <li>
              <strong>Step 3: Isolate principal deposits vs tax-free capital gains.</strong> Total out-of-pocket contributions equal <Formula>{"\$7{,}000 \times 30 = \$210{,}000.00"}</Formula>. Tax-free compound growth equals <Formula>{"\$792{,}982.40 - \$210{,}000.00 = \$582{,}982.40"}</Formula>.
            </li>
            <li>
              <strong>Step 4: Compare with Traditional IRA taxation.</strong> If that identical $792,982 balance were held in a Traditional pre-tax IRA and withdrawn at a 22% effective retirement tax bracket:
              <Formula>{"\text{Tax Paid to IRS} = \$792{,}982.40 \times 0.22 = \$174{,}456.13 \quad \rightarrow \text{Net After-Tax Wealth} = \$618{,}526.27"}</Formula>
            </li>
            <li>
              <strong>Step 5: Net Roth Wealth Advantage.</strong> The Roth IRA delivers <strong>$174,456 in tax savings</strong>, leaving the retiree with $792,982 in 100% spendable cash.
            </li>
          </ol>

          <h2>Roth vs. Traditional IRA: 30-Year Wealth Comparison Across Tax Brackets</h2>
          <p>
            The table below demonstrates net after-tax retirement spending capital generated from $7,000 annual contributions ($210k total deposited over 30 years at 8% annual return):
          </p>

          <DataTable
            head={["Account Vehicle", "Nominal Terminal Balance", "Assumed Retirement Tax Rate", "Taxes Paid at Withdrawal", "Spendable Net Retirement Cash"]}
            rows={[
              ["Roth IRA (Tax-Free)", "$792,982", "0% (Tax-Free Qualified)", "$0.00 paid to IRS", "$792,982 (100% Retained)"],
              ["Traditional IRA (Low Tax)", "$792,982", "12% Effective Bracket", "$95,158 paid to IRS", "$697,824 (-$95,158 vs Roth)"],
              ["Traditional IRA (Mid Tax)", "$792,982", "22% Effective Bracket", "$174,456 paid to IRS", "$618,526 (-$174,456 vs Roth)"],
              ["Traditional IRA (High Tax)", "$792,982", "32% Effective Bracket", "$253,754 paid to IRS", "$539,228 (-$253,754 vs Roth)"],
            ]}
          />

          <h2>IRS Income Eligibility Phase-Out Limits &amp; Contribution Caps</h2>
          <p>
            The IRS restricts direct Roth IRA contributions for higher-income earners based on Modified Adjusted Gross Income (MAGI):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Annual Contribution Limit:</strong> $7,000 for 2024 ($7,000 for 2025), plus a $1,000 catch-up contribution for savers age 50 and older ($8,000 total).</li>
            <li><strong>Single Filer Phase-Out Window:</strong> MAGI between $146,000 and $161,000 (2024). Direct contributions are prohibited once MAGI reaches $161,000.</li>
            <li><strong>Married Filing Jointly Window:</strong> MAGI between $230,000 and $240,000 (2024). Direct contributions phase out completely at $240,000.</li>
          </ul>

          <h2>The Backdoor Roth IRA Strategy for High Earners</h2>
          <p>
            High earners disqualified by income caps utilize the legally sanctioned <strong>Backdoor Roth IRA</strong> strategy:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Step 1:</strong> Contribute after-tax non-deductible cash to a Traditional IRA (there are no income limits on non-deductible contributions).</li>
            <li><strong>Step 2:</strong> Immediately execute a Roth conversion to transfer the cash into a Roth IRA before gains accumulate.</li>
            <li><strong>Step 3 (The Pro-Rata Rule Trap):</strong> Under IRS Section 408(d)(2), if you hold existing pre-tax IRA assets (SEP, SIMPLE, or rollover IRAs), the conversion is taxed proportionally across all IRA balances. To avoid taxes, roll pre-tax IRAs into an employer 401(k) before executing.</li>
          </ol>

          <h2>The 5-Year Rule for Penalty-Free Roth Withdrawals</h2>
          <p>
            To withdraw investment earnings 100% tax-free and penalty-free, the distribution must satisfy two criteria: the account owner must be age 59½ or older, and at least <strong>5 tax years must have elapsed</strong> since the first contribution to any Roth IRA.
          </p>

          <h2>Essential Roth IRA Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Qualified Distribution:</strong> A tax-free and penalty-free withdrawal meeting the age 59½ and 5-year holding requirements.</li>
            <li><strong>Modified Adjusted Gross Income (MAGI):</strong> Adjusted gross income with certain deductions added back, used to determine Roth IRA contribution eligibility.</li>
            <li><strong>Pro-Rata Rule:</strong> An IRS formula assessing taxes on Roth conversions when an investor holds both pre-tax and after-tax Traditional IRA balances.</li>
            <li><strong>Direct Transfer:</strong> Custodian-to-custodian movement of IRA assets that avoids mandatory tax withholding.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement &amp; Tax Solvers</h3>
            <p>
              Compare workplace retirement plans with our <a href="/calculators/finance/401k-calculator">401(k) Calculator</a>, evaluate lifetime drawdown via the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, model compound savings growth using the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, and audit federal marginal brackets using the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Can I withdraw money from my Roth IRA at any time without penalty?",
          a: "Yes, but only your original contributions. You can withdraw your direct contributions at any time, for any reason, with zero taxes and zero penalties. However, withdrawing investment earnings before age 59½ and before meeting the 5-year rule triggers income taxes plus a 10% IRS early withdrawal penalty.",
        },
        {
          q: "What is a Backdoor Roth IRA and is it legal?",
          a: "A Backdoor Roth IRA is a legal tax strategy for individuals whose income exceeds IRS limits. You make a non-deductible contribution to a Traditional IRA and immediately convert it to a Roth IRA. Congress formally codified and affirmed this strategy in federal tax law.",
        },
        {
          q: "What is the Pro-Rata Rule on Roth conversions?",
          a: "The Pro-Rata Rule states that if you hold pre-tax IRA money (such as from a former 401(k) rollover) in any Traditional, SEP, or SIMPLE IRA, the IRS treats your conversion as a proportional blend of pre-tax and post-tax funds, resulting in unexpected conversion taxes.",
        },
        {
          q: "Do Roth IRAs have Required Minimum Distributions (RMDs)?",
          a: "No. Unlike Traditional IRAs and 401(k) plans, original Roth IRA owners are never required to take distributions during their lifetime, allowing 100% of the funds to continue compounding tax-free and pass to heirs.",
        },
        {
          q: "What is the 5-year rule for Roth IRAs?",
          a: "The 5-year rule stipulates that at least five calendar tax years must have passed since January 1 of the tax year in which you made your first contribution to any Roth IRA before you can withdraw investment earnings completely tax-free.",
        },
        {
          q: "Can I contribute to both a 401(k) and a Roth IRA in the same year?",
          a: "Yes. You can max out both your employer's 401(k) ($23,000 in 2024) and your personal Roth IRA ($7,000 in 2024), assuming you have sufficient earned income and meet Roth income qualification limits.",
        },
        {
          q: "Can I contribute to a Roth IRA if I have no earned income?",
          a: "Direct Roth contributions require taxable compensation (W-2 wages or self-employment net earnings). However, a non-working spouse can fund a Spousal Roth IRA if the working spouse has sufficient earned income to cover both contributions.",
        },
        {
          q: "Can I use Roth IRA funds to buy a first home?",
          a: "Yes. In addition to withdrawing your original contributions penalty-free at any time, IRS rules permit first-time homebuyers to withdraw up to $10,000 of investment earnings completely penalty-free to purchase a primary residence after satisfying the 5-year rule.",
        },
      ]}
      related={[
        { href: "/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/investment-calculator", icon: "💹", name: "Investment Calculator" },
        { href: "/calculators/finance/tax-calculator", icon: "📑", name: "Tax Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
