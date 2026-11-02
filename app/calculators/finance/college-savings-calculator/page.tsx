import Calculator from "@/components/calcs/finance/college-savings-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CollegeTuitionSavingsProjectionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/college-savings-calculator";
const TITLE = "College Savings Calculator – 529 Plan Tuition Projection | CalcDigi";
const DESCRIPTION =
  "Free college savings calculator: project 4-year tuition costs adjusted for higher education inflation. Calculate required monthly 529 plan contributions, tax-free growth, and SECURE 2.0 Roth IRA rollovers.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="College Savings Calculator"
      intro="Project future 4-year higher education costs adjusted for tuition inflation. Determine exact monthly savings needed in a 529 plan or educational investment vehicle to cover targeted expenses."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Cost_t = AnnualCost * (1 + inflation)^t"
      article={
        <>
          <h2>Direct Answer: How Does 529 College Tuition Forecasting &amp; Compounding Work?</h2>
          <p>
            Forecasting college savings requires a multi-stage actuarial calculation: first, current published annual college costs (tuition, mandatory fees, room and board, books, and supplies) are compounded forward across matriculation years using an <strong>education inflation rate</strong> (historically 4% to 6%, outpacing general CPI). Second, total four-year obligations are discounted to the child&rsquo;s matriculation age to account for ongoing investment growth during enrollment. Finally, subtracting current accumulated principal yields the net funding deficit, which is amortized across remaining pre-college months using sinking fund mathematics.
          </p>

          <Formula>Future Annual Cost = Current Annual Cost × (1 + r_inflation)^t</Formula>
          <Formula>Monthly 529 Deposit = [Deficit at Enrollment] × i ÷ [(1 + i)^n − 1]</Formula>
          <p>
            Where:
            <br />• <strong>Current Annual Cost:</strong> Total all-in cost of attendance today ($)
            <br />• <strong>r_inflation:</strong> Expected annual higher education cost inflation (typically 4.0%–5.5%)
            <br />• <strong>t:</strong> Years until student enrolls in college (18 − Current Age)
            <br />• <strong>i:</strong> Monthly investment return of the 529 portfolio ((1 + r_return)^(1/12) − 1)
            <br />• <strong>n:</strong> Total saving accumulation months (t × 12)
          </p>

          <CollegeTuitionSavingsProjectionChart />

          <h2>College Tuition Inflation Benchmarks: 4-Year Total Cost Projections</h2>
          <p>
            The table below projects total 4-year cost of attendance (tuition, fees, room &amp; board) across major college categories for a child born today (Age 0) enrolling at Age 18, assuming 4.5% annual higher education inflation:
          </p>

          <DataTable
            head={["Higher Education Tier", "Annual Cost Today", "Projected 4-Yr Total at 18", "Monthly 529 Savings (at 6.5% Return)", "Student Loan Cost (if Borrowed at 7%)"]}
            rows={[
              ["In-State Public (4-Year)", "$28,000 / yr", "$247,000", "$488 / mo", "$344,000 (10-yr repayment)"],
              ["Out-of-State Public (4-Year)", "$46,000 / yr", "$406,000", "$802 / mo", "$566,000 (10-yr repayment)"],
              ["Private Non-Profit University", "$62,000 / yr", "$547,000", "$1,081 / mo", "$762,000 (10-yr repayment)"],
              ["Elite Private / Ivy League", "$88,000 / yr", "$776,000", "$1,534 / mo", "$1,082,000 (10-yr repayment)"],
            ]}
          />

          <h2>Maximizing 529 College Savings Under SECURE Act 2.0</h2>
          <ul>
            <li>
              <strong>Federal Tax-Free Growth:</strong> All investment earnings inside a state-sponsored 529 Qualified Tuition Program compound 100% free of federal income tax and capital gains tax when withdrawn for Qualified Higher Education Expenses (QHEE).
            </li>
            <li>
              <strong>State Tax Deductions:</strong> Over 30 states provide state income tax deductions or credits for residents contributing to their home state&rsquo;s 529 savings plan.
            </li>
            <li>
              <strong>SECURE 2.0 Roth IRA Rollover:</strong> Beneficiaries of 529 plans maintained for at least 15 years can roll over up to a lifetime maximum of <strong>$35,000</strong> of leftover funds directly into their own Roth IRA, completely penalty-free and tax-free, eliminating fears of over-saving.
            </li>
            <li>
              <strong>Favorable Financial Aid (FAFSA) Treatment:</strong> Parent-owned 529 assets are assessed at a maximum rate of 5.64% of asset value under FAFSA formula calculations, compared to 20% for student-owned assets (like UGMA/UTMA custodial accounts).
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Education &amp; Wealth Accumulation Solvers</h3>
            <p>
              Funding higher education requires disciplined compounding to outpace aggressive tuition inflation. Model tax-advantaged 529 portfolio trajectories with our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, set automated monthly sinking fund deposits via the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, evaluate diversified asset allocations with the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, and model post-graduation repayment schedules with the <a href="/calculators/finance/loan-calculator">Loan Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What expenses qualify for tax-free 529 distributions?",
          a: "Qualified Higher Education Expenses (QHEE) include tuition, mandatory enrollment fees, books, computer hardware and software, internet access, and room and board (for students enrolled at least half-time). Up to $10,000 per year can also be used for K-12 private school tuition, and a $10,000 lifetime limit applies toward student loan repayments.",
        },
        {
          q: "What happens to 529 money if my child gets a scholarship?",
          a: "If your child earns a scholarship, you can withdraw an equivalent dollar amount from the 529 plan without paying the standard 10% IRS penalty (though earnings are subject to ordinary income tax). You can also transfer the account to a sibling or roll it into a Roth IRA under SECURE 2.0.",
        },
        {
          q: "Can grandparents open a 529 plan without hurting financial aid?",
          a: "Yes. Under the new simplified FAFSA rules, distributions from grandparent-owned 529 plans are no longer reported as student untaxed income, making grandparent-owned 529 plans completely invisible on federal financial aid applications.",
        },
        {
          q: "What investment allocation should I use inside a 529 plan?",
          a: "Most families utilize an Age-Based (Target Enrollment) Portfolio. When the child is young (ages 0–9), the fund allocates 80%–100% to equities for high compounding growth. As enrollment nears (ages 14–18), the allocation automatically shifts toward capital-preservation vehicles like short-term bonds and FDIC cash.",
        },
      ]}
      related={[
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/loan-calculator", icon: "💳", name: "Loan Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
