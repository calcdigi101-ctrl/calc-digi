import Calculator from "@/components/calcs/finance/roth-ira-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RothVsTraditionalIraTaxHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/roth-ira-calculator";
const TITLE = "Roth IRA Calculator – 2026 Contribution Limits, Tax-Free Growth & Comparison | CalcDigi";
const DESCRIPTION =
  "Free Roth IRA calculator: project tax-free retirement wealth using 2026 contribution limits ($7,500 under 50, $8,600 catch-up). Compare Roth vs. Traditional IRA tax drag and Backdoor Roth IRA strategies.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Roth IRA Calculator"
      intro="Project your tax-free retirement accumulation under 2026 IRS contribution limits. Compare after-tax net spendable wealth between a Roth IRA, Traditional IRA, and standard taxable brokerage account."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV_Roth = PV*(1 + r)^t + PMT * [((1 + r)^t - 1) / r]"
      article={
        <>
          <h2>Direct Answer: What Is a Roth IRA &amp; Why Does It Outperform Taxable Brokerage Accounts?</h2>
          <p>
            A <strong>Roth IRA</strong> (Individual Retirement Arrangement) is an individual retirement account established under Section 408A of the Internal Revenue Code. Unlike a Traditional IRA, contributions are made with <em>after-tax earned income</em>, meaning there is no upfront tax deduction. In exchange, <strong>100% of future investment gains, dividends, and capital growth compound completely tax-free</strong>, and qualified distributions after age 59½ are permanently exempt from federal and state income taxes. Furthermore, Roth IRAs have no lifetime Required Minimum Distributions (RMDs), making them the premier estate-planning wealth transfer vehicle.
          </p>

          <Formula>Roth Advantage = FV_TaxFree − [FV_Taxable − Cumulative Taxes on Growth]</Formula>
          <p>
            Where:
            <br />• <strong>FV_TaxFree:</strong> Full compounded terminal balance in the Roth wrapper
            <br />• <strong>FV_Taxable:</strong> Equivalent deposits invested in a taxable brokerage account subject to annual dividend drag and capital gains realizations
          </p>

          <RothVsTraditionalIraTaxHorizonChart />

          <h2>2026 Roth IRA Contribution Limits &amp; MAGI Phase-Out Brackets</h2>
          <p>
            The table below provides the official statutory contribution parameters and Modified Adjusted Gross Income (MAGI) phase-out ranges established by the IRS for the 2026 tax year:
          </p>

          <DataTable
            head={["Filing Status", "Full Contribution Allowed (MAGI)", "Partial Phase-Out Range (MAGI)", "Prohibited (Use Backdoor Roth)"]}
            rows={[
              ["Single / Head of Household", "Under $150,000", "$150,000 – $165,000", "$165,000 or greater"],
              ["Married Filing Jointly", "Under $236,000", "$236,000 – $246,000", "$246,000 or greater"],
              ["Married Filing Separately", "Not Applicable ($0)", "$0 – $10,000", "$10,000 or greater"],
              ["Annual Limit (Under 50)", "$7,500 maximum", "Prorated linearly", "$0 direct ($7,500 backdoor)"],
              ["Annual Limit (Age 50+ Catch-Up)", "$8,600 maximum", "Prorated linearly", "$0 direct ($8,600 backdoor)"],
            ]}
          />

          <h2>The Roth 5-Year Rule &amp; Backdoor Conversion Strategies</h2>
          <ul>
            <li>
              <strong>Withdrawal Liquidity of Contributions:</strong> You can withdraw your original Roth IRA contributions (the cash principal you deposited) at any time, for any reason, with <strong>zero taxes and zero penalties</strong>, because income tax was already paid.
            </li>
            <li>
              <strong>The 5-Year Aging Rule:</strong> To withdraw investment <em>earnings</em> tax-free, you must be at least age 59½ AND at least 5 tax years must have elapsed since January 1 of the tax year for which your first Roth IRA contribution was made.
            </li>
            <li>
              <strong>The Backdoor Roth IRA Strategy:</strong> High earners exceeding the MAGI income limits can make a non-deductible contribution to a Traditional IRA and immediately execute a conversion to a Roth IRA. (Note: The IRS <em>pro-rata rule</em> applies if you hold existing pre-tax IRA assets).
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Tax-Free Growth &amp; Retirement Solvers</h3>
            <p>
              Roth IRAs provide completely tax-free growth and tax-free qualified distributions in retirement. Compare pre-tax employer retirement accounts using our <a href="/calculators/finance/401k-calculator">401k Calculator</a>, calculate your overall post-career nest egg target with the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, model multi-asset portfolio compounding via the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, and simulate exponential returns using our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the deadline to make a Roth IRA contribution for 2026?",
          a: "You have until the federal income tax filing deadline (typically April 15, 2027) to make a designated 2026 tax year contribution, even if you file for a tax extension.",
        },
        {
          q: "Can I contribute to both a 401(k) and a Roth IRA in the same calendar year?",
          a: "Yes. 401(k) and IRA statutory limits are completely independent. You can contribute up to $24,500 in an employer 401(k) AND contribute up to $7,500 in a Roth IRA in the same tax year, provided your income qualifies.",
        },
        {
          q: "Can a non-working spouse have a Roth IRA?",
          a: "Yes. Under IRS rules, a 'Spousal IRA' permits a working spouse with sufficient earned income to fund a separate Roth IRA in the non-working spouse's name, up to the full annual statutory limit.",
        },
        {
          q: "What is the IRS Pro-Rata Rule for Backdoor Roth conversions?",
          a: "The pro-rata rule mandates that when converting non-deductible IRA funds to a Roth, the IRS views all your Traditional, SEP, and SIMPLE IRAs as a single combined pool. If you have pre-tax money in any Traditional IRA, your conversion will be partially taxed proportionally.",
        },
      ]}
      related={[
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
