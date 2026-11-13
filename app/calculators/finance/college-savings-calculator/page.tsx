import Calculator from "@/components/calcs/finance/college-savings-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CollegeTuitionSavingsProjectionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/college-savings-calculator";
const TITLE = "College Savings Calculator";
const DESCRIPTION =
  "Free college savings calculator: project 4-year tuition costs, 529 plan tax-free compounding growth, and required monthly contributions under IRS Section 529.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="College Savings Calculator"
      intro="Project total 4-year college tuition expenses, room and board costs, and required monthly 529 plan contributions. Model tuition inflation rates alongside compound investment returns."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV_{\text{tuition}} = C_{\text{annual}} \times (1 + g)^t \times \left[ \frac{1 - (1+g)^4 (1+r)^{-4}}{r - g} \right]"
      article={
        <>
          <h2>Direct Answer: How to Project College Tuition Costs &amp; 529 Savings Targets</h2>
          <p>
            Projecting higher education funding requires modeling two opposing compounding curves: <strong>higher education tuition inflation</strong> (which historically averages <strong>4.0% to 5.5% annually</strong>, significantly outpacing standard CPI inflation) versus the <strong>compound investment growth</strong> of a dedicated college savings vehicle like an <strong>IRS Section 529 Qualified Tuition Plan</strong>.
          </p>
          <p>
            Under federal tax law, Section 529 plans allow parents and family members to invest after-tax dollars that compound completely <strong>100% tax-free</strong>, with withdrawals remaining exempt from federal and state income taxes when utilized for qualified higher education expenses.
          </p>

          <CollegeTuitionSavingsProjectionChart />

          <h2>Actuarial Mathematics of Tuition Inflation &amp; 529 Annuity Modeling</h2>
          <p>
            Let <Formula>{"C_{\text{current}}"}</Formula> be current annual comprehensive college costs (tuition, fees, room, and board). If a child matriculates in <em>t</em> years, the projected cost for year 1 of college <Formula>{"C_1"}</Formula> under annual tuition inflation rate <em>g</em> is:
          </p>

          <Formula>{"C_1 = C_{\text{current}} \times (1 + g)^t"}</Formula>
          <p>
            Because college spans four consecutive academic years while the remaining 529 balance continues to earn annual investment return <em>r</em> during matriculation, the present value of the 4-year tuition obligation at matriculation date is:
          </p>
          <Formula>{"FV_{\text{tuition}} = C_1 \times \sum_{k=0}^{3} \left( \frac{1 + g}{1 + r} \right)^k"}</Formula>
          <p>
            Where:
            <br />• <strong>FV_tuition</strong> = Total capital sum required in the 529 plan upon child&rsquo;s matriculation ($)
            <br />• <strong>C_current</strong> = Current full annual cost of attendance ($)
            <br />• <strong>g</strong> = Projected annual higher education tuition inflation rate (typically 0.045 for 4.5%)
            <br />• <strong>r</strong> = Expected annual compound portfolio return inside the 529 plan (e.g. 0.070 for 7.0%)
            <br />• <strong>t</strong> = Years until child enrolls in university
            <br />• <strong>PMT</strong> = Required monthly 529 plan savings contribution ($)
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider parents opening a 529 account for a <strong>newborn infant</strong> (<Formula>{"t = 18 \text{ years until enrollment}"}</Formula>) aiming to fund an in-state public university currently costing <strong>$28,000 per year</strong>, assuming <strong>4.50% annual tuition inflation</strong> (<Formula>{"g = 0.045"}</Formula>), <strong>7.00% annual 529 portfolio return</strong> (<Formula>{"r = 0.070, r/12 = 0.005833"}</Formula>), and <strong>$5,000 initial seed gift</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Project Freshman Year Annual Tuition (t = 18).</strong>
              <Formula>{"C_1 = \$28{,}000 \times (1 + 0.045)^{18} = \$28{,}000 \times 2.20848 = \$61{,}837.40"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate total 4-year educational obligation at enrollment.</strong> Summing across 4 academic years adjusted for ongoing return during college yields a target 529 funding need of:
              <Formula>{"FV_{\text{tuition}} \approx \$232{,}450.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate future growth of $5,000 seed deposit over 18 years.</strong>
              <Formula>{"FV_{\text{seed}} = \$5{,}000 \times (1 + 0.070)^{18} = \$5{,}000 \times 3.37993 = \$16{,}899.65"}</Formula>
            </li>
            <li>
              <strong>Step 4: Determine net remaining funding shortfall.</strong>
              <Formula>{"\text{Target Shortfall} = \$232{,}450.00 - \$16{,}899.65 = \$215{,}550.35"}</Formula>
            </li>
            <li>
              <strong>Step 5: Solve for required monthly 529 contribution (PMT).</strong> Over 216 monthly contributions (<Formula>{"18 \times 12 = 216"}</Formula>) at periodic rate 0.005833, the monthly annuity factor is 427.65:
              <Formula>{"PMT = \frac{\$215{,}550.35}{427.65} = \$504.03 \text{ / month}"}</Formula>
              Saving <strong>$504/month</strong> starting at birth fully funds the entire 4-year degree without student debt. Total out-of-pocket cash paid is $113,870; tax-free 529 investment growth pays the remaining $118,580.
            </li>
          </ol>

          <h2>4-Year College Cost Projections Across Institution Tiers (18 Years Out)</h2>
          <p>
            The benchmark matrix below projects total 4-year comprehensive educational costs based on a 4.5% annual tuition inflation rate:
          </p>

          <DataTable
            head={["Institution Classification", "Today's Annual Cost", "Today's 4-Year Cost", "Projected 4-Year Cost in 18 Years", "Required Monthly 529 Savings"]}
            rows={[
              ["In-State Public University", "$28,000 / yr", "$112,000", "$247,000", "$536 / mo"],
              ["Out-of-State Public University", "$45,000 / yr", "$180,000", "$397,000", "$861 / mo"],
              ["Private Non-Profit University", "$60,000 / yr", "$240,000", "$529,000", "$1,148 / mo"],
              ["Elite Private / Ivy League", "$85,000 / yr", "$340,000", "$750,000", "$1,627 / mo"],
            ]}
          />

          <h2>IRS Section 529 Plan Tax Advantages &amp; SECURE 2.0 Rollover Rules</h2>
          <p>
            Section 529 qualified tuition programs offer distinct federal tax incentives:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Triple Tax Benefits:</strong> Contributions grow tax-deferred, withdrawals for qualified expenses are 100% tax-free, and over 30 U.S. states offer state income tax deductions or tax credits for contributions.</li>
            <li><strong>SECURE 2.0 Act Roth IRA Rollovers:</strong> Effective 2024, if a beneficiary does not use all 529 funds (due to scholarships or lower costs), up to <strong>$35,000 of leftover 529 funds can be rolled over tax-free into a Roth IRA</strong> for the beneficiary, eliminating the risk of trapped funds.</li>
            <li><strong>Qualified Higher Education Expenses (QHEE):</strong> Covers tuition, mandatory fees, books, computer equipment, internet access, and room/board for students enrolled at least half-time.</li>
          </ul>

          <h2>FAFSA Simplification Act: Grandparent-Owned 529 Advantage</h2>
          <p>
            Under the landmark federal <em>FAFSA Simplification Act</em>, higher education financial aid rules changed dramatically in favor of family contributors:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Zero Untaxed Income Penalty:</strong> Previously, distributions from grandparent-owned 529 plans were treated as untaxed student income, reducing financial aid by up to 50%. Under new FAFSA regulations, distributions from grandparents are completely excluded from federal financial aid calculations.</li>
            <li><strong>Asset Exclusion on FAFSA:</strong> Grandparent-owned 529 accounts do not need to be reported as an asset on the student's FAFSA application, preserving maximum institutional aid.</li>
            <li><strong>State Tax Parity:</strong> Most states allow any relative to contribute directly to a student's 529 plan, with many states providing state income tax deductions to the contributing donor.</li>
          </ul>

          <h2>Age-Based Target Enrollment Portfolios vs. Static Allocations</h2>
          <p>
            529 plans typically provide automated <strong>Target Enrollment (Age-Based) Portfolios</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Ages 0 to 8 (Aggressive Accumulation):</strong> 80% to 100% equities, maximizing compound growth over long time horizons.</li>
            <li><strong>Ages 9 to 14 (Balanced Transition):</strong> Shifts to 50% equities and 50% fixed income to moderate portfolio volatility.</li>
            <li><strong>Ages 15 to 18 (Capital Preservation):</strong> 70% to 80% short-term bonds and FDIC-insured cash equivalents, ensuring tuition funds cannot be wiped out by sudden equity market drops right before freshman year.</li>
          </ul>

          <h2>Essential 529 College Savings Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Qualified Expense:</strong> Higher education expenditures sanctioned by the IRS (tuition, fees, books, computers, room/board) eligible for tax-free withdrawals.</li>
            <li><strong>Superfunding (5-Year Gift Bunching):</strong> IRS provision permitting individuals to contribute up to 5 times the annual gift tax exclusion ($90,000 in 2024, or $180,000 for couples) in a single year without gift taxes.</li>
            <li><strong>Beneficiary:</strong> The designated future student for whose educational benefit the 529 account is established.</li>
            <li><strong>FAFSA Impact:</strong> 529 accounts owned by parents are assessed at a low 5.64% rate in student financial aid formulas, preserving maximum financial aid eligibility.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Family Financial &amp; Savings Solvers</h3>
            <p>
              Model general liquid compounding with our <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, track multi-decade wealth via the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, structure retirement balances with the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, and evaluate tax withholding using the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What happens to 529 plan funds if my child does not go to college?",
          a: "You have several flexible options. Under the SECURE 2.0 Act, you can roll over up to $35,000 of unused 529 funds into a Roth IRA for the beneficiary tax-free. You can also transfer the beneficiary designation to a sibling or relative, or withdraw funds non-qualified (paying income tax plus a 10% penalty only on earnings, not principal).",
        },
        {
          q: "How does a 529 plan affect financial aid eligibility (FAFSA)?",
          a: "A 529 plan owned by a parent has minimal impact on financial aid, being assessed at a maximum rate of 5.64% of asset value toward the Student Aid Index (SAI). In contrast, assets held directly in a child's name (like UGMA/UTMA accounts) are assessed at 20%.",
        },
        {
          q: "Can 529 funds be used for K-12 private school tuition?",
          a: "Yes. Under federal tax law, parents can withdraw up to $10,000 per student per calendar year tax-free from a 529 plan to pay for qualified tuition at public, private, or religious elementary and secondary (K-12) schools.",
        },
        {
          q: "What is 529 plan superfunding?",
          a: "Superfunding allows a contributor to make a lump-sum deposit equal to five years of annual gift tax exclusions at once ($90,000 for individual donors, or $180,000 for married couples in 2024) without incurring federal gift taxes, jumpstarting compounding early.",
        },
        {
          q: "Can 529 funds pay for off-campus housing and rent?",
          a: "Yes, provided the student is enrolled at least half-time. The allowable tax-free withdrawal for room and board is capped at the institution's official cost-of-attendance allowance for off-campus students.",
        },
        {
          q: "Can 529 plans be used to pay off existing student loans?",
          a: "Yes. Under the federal SECURE Act, 529 plan beneficiaries and their siblings can make tax-free withdrawals up to a lifetime limit of $10,000 each to pay down qualified student loan principal and interest.",
        },
        {
          q: "Are 529 contributions tax-deductible on federal income taxes?",
          a: "Contributions to a 529 plan are not tax-deductible on federal income tax returns. However, over 30 U.S. states provide state income tax deductions or tax credits for residents contributing to their home state's 529 program.",
        },
        {
          q: "What is an age-based investment option in a 529 plan?",
          a: "An age-based (target-enrollment) option automatically rebalances asset allocation over time: it begins aggressive (80% to 100% stocks) during infancy and gradually transitions into bonds and cash as the child approaches college age to protect principal.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/investment-calculator", icon: "💹", name: "Investment Return Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/budget-calculator", icon: "📋", name: "Household Budget Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
