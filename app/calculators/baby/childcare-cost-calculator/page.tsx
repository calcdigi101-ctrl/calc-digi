import type { Metadata } from "next";
import { Suspense } from "react";
import ChildcareCostCalculator from "@/components/calcs/baby/childcare-cost-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ChildcareCareModelComparisonChart } from "@/components/flagship/baby/editorial-charts";

const PATH = "/calculators/baby/childcare-cost-calculator";
const TITLE = "Childcare Cost Calculator – Daycare, Nanny & Tax Savings | CalcDigi";
const DESCRIPTION =
  "Calculate and compare childcare expenses across daycare centers, in-home licensed daycares, and private nannies. Factor in pre-tax Dependent Care FSA ($5,000 limit) and Child and Dependent Care Tax Credits (CDCTC).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/baby/diaper-cost-calculator", icon: "🧷", name: "Diaper Lifetime Cost Calculator" },
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
  { href: "/calculators/finance/budget-calculator", icon: "💰", name: "Family Household Budget Calculator" },
  { href: "/calculators/finance/salary-calculator", icon: "💵", name: "Take-Home Pay & Salary Calculator" },
  { href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", name: "Family Emergency Fund Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How much does infant daycare cost per month on average in the United States?",
    a: "According to data from the Department of Labor and Child Care Aware of America, center-based infant care averages between $1,050 and $1,850 per month ($12,600 to $22,200 annually) nationally. In high-cost-of-living metropolitan areas (such as New York City, San Francisco, Boston, or Seattle), infant center daycare frequently exceeds $2,400 to $3,000 per month.",
  },
  {
    q: "How does a Dependent Care FSA (Flexible Spending Account) save parents money?",
    a: "Under IRS Code Section 129, a Dependent Care FSA allows working parents to contribute up to $5,000 per household per year in pre-tax payroll dollars for eligible childcare services. Because these funds bypass federal income taxes (22%–35% bracket), state income taxes (3%–9%), and FICA taxes (7.65%), contributing the full $5,000 typically saves parents between $1,500 and $2,200 in net tax liability each year.",
  },
  {
    q: "Can I claim both the Dependent Care FSA and the Child & Dependent Care Tax Credit (CDCTC)?",
    a: "You cannot double-dip the same expense. However, if you have two or more qualifying children, the maximum expense limit for the CDCTC is $6,000. If you contribute the maximum $5,000 to an employer Dependent Care FSA, you can claim the remaining $1,000 in qualifying childcare expenses on IRS Form 2441 for the tax credit.",
  },
  {
    q: "Why is infant care dramatically more expensive than toddler or preschool care?",
    a: "Staffing ratios mandated by state licensing boards drive infant care costs. State regulations require a strict 1:3 or 1:4 caregiver-to-child ratio for infants under 12 to 18 months, compared to 1:6 to 1:10 for toddlers and 1:10 to 1:15 for preschoolers. Because labor accounts for roughly 75% to 80% of a daycare center's operating overhead, infant classrooms require more professional staff per revenue-generating seat.",
  },
  {
    q: "What legal taxes are required when hiring a private household nanny?",
    a: "If you pay an in-home nanny $2,700 or more in a calendar year (IRS 2026 threshold), you are legally classified as a household employer. You must pay employer FICA taxes (7.65%), Federal Unemployment Tax (FUTA, 0.6% on the first $7,000), State Unemployment Insurance (SUI), and provide a Form W-2 at year-end, which typically adds 10% to 15% on top of the nanny's gross hourly wage.",
  },
  {
    q: "What is a 'nanny share' and how does the cost compare?",
    a: "A nanny share occurs when two families employ a single nanny to care for both infants simultaneously, typically alternating between houses. The nanny receives a premium rate (typically 125% to 135% of their normal single-child rate), which is divided equally between both families. This results in roughly a 30% to 35% savings for each family compared to hiring a solo private nanny.",
  },
];

export default function ChildcareCostPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Childcare Cost Calculator"
      intro="Estimate and compare annual expenses across daycare centers, licensed family in-home programs, and private nannies. Factor in pre-tax Dependent Care FSA ($5,000 cap) and Child and Dependent Care Tax Credits."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Financial Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Economic Policy Verified
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Benchmarked against <strong className="font-semibold text-slate-800 dark:text-slate-200">U.S. Bureau of Labor Statistics &amp; IRS Publication 503</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Household Financial Strategy Reference</span>
              <span>•</span>
              <time dateTime="2026-10-24">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Financial Summary: Childcare Costs &amp; Tax Reduction Strategies
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Childcare represents the single largest household expense for working parents with children under age 5, frequently exceeding average mortgage payments or college tuition. Center-based infant daycare averages <strong>$14,000 to $22,000 annually</strong>, licensed in-home care averages <strong>$10,000 to $13,000</strong>, and private dedicated nannies range from <strong>$35,000 to $48,000</strong>. Parents can legally mitigate this expense through the <strong>Dependent Care FSA (IRC § 129)</strong>, which shelters up to $5,000 in pre-tax earnings to deliver <strong>$1,500 to $2,100 in direct tax relief</strong> (measurable on our <a href="/calculators/finance/tax-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">tax calculator</a>).
            </p>
          </div>

          <h2>The Structural Economics &amp; Care Modality Cost Comparison</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <ChildcareCareModelComparisonChart />
          </div>

          <p>
            The fundamental economic driver of childcare pricing is labor intensity. While secondary schools operate with student-to-teacher ratios of 20:1 or 30:1, state early-childhood licensing bodies mandate strict caregiver-to-infant ratios—typically <strong>1:3 or 1:4</strong>—to guarantee neonatal safety, feeding responsiveness, and infant airway supervision.
          </p>
          <p>
            Because human labor represents over 75% of a center&apos;s cost structure, tuition fees must reflect prevailing adult regional wages, payroll taxes, background clearances, and mandatory professional development hours. As children reach 24 to 36 months, permissible ratios expand to 1:6 or 1:8, resulting in a predictable 20% to 30% reduction in annual tuition. Join competitive daycare waitlists early during pregnancy based on your estimated <a href="/calculators/baby/due-date-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">due date</a> to secure enrollment slots.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Net Out-of-Pocket Childcare Cost Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Net Cost} = \\text{Gross Tuition} - (\\text{FSA Contribution} \\times \\text{Marginal Tax Rate}) - \\text{Applicable CDCTC Credit}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Deducts income, state, and payroll tax shields provided by IRS Section 129 Dependent Care FSAs and Form 2441 Child Care Tax Credits from gross annual childcare outlay. Track exact percentages on our percentage calculator.</div>
          </Formula>

          <h2>Comparative Childcare Modality Analysis</h2>
          <p>
            Selecting the ideal care model involves balancing gross tuition fees against schedule flexibility, socialization goals, and annual work schedules calculated on our <a href="/calculators/datetime/workdays-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">workdays calculator</a>:
          </p>

          <DataTable
            head={["Care Modality", "National Average Monthly Cost", "Staff-to-Child Ratio", "Primary Operational Advantages", "Potential Limitations"]}
            rows={[
              ["Commercial Daycare Center", "$1,250 – $2,100", "1:3 to 1:4 (infants)", "Licensed facility, structured early curriculum, reliable operational hours, substitute teachers.", "Strict sickness exclusion policies (fever/vomiting), fixed drop-off/pickup penalties."],
              ["Licensed Family In-Home Care", "$800 – $1,300", "1:4 to 1:6 (mixed ages)", "Homelike setting, lower monthly tuition, multi-age peer modeling, strong single-caregiver bond.", "Centers close when the individual home provider falls ill or schedules personal vacation."],
              ["Nanny Share (2 Families)", "$1,600 – $2,400 per family", "1:2 (infants)", "30% cheaper than solo private nanny, individualized attention, companionship for child.", "Requires alignment between two families regarding parenting philosophies and sick-day policies."],
              ["Private Dedicated Nanny", "$3,000 – $4,500+", "1:1 dedicated", "Maximum parental schedule control, customized infant routines, in-home care without commute.", "Highest gross expense, household employer tax compliance (Schedule H), worker comp."],
            ]}
            highlight={0}
          />

          <h2>Federal Tax Optimization: Dependent Care FSA vs. CDCTC</h2>
          <p>
            The Internal Revenue Code provides two primary tax instruments designed to assist working families with qualifying work-related childcare expenses:
          </p>

          <h3>1. Dependent Care Flexible Spending Account (FSA) — IRC § 129</h3>
          <p>
            Administered through employer benefit plans, the Dependent Care FSA allows an employee (or married couple filing jointly) to allocate up to <strong>$5,000 per year</strong> in pre-tax payroll deductions. Funds are exempted from:
          </p>
          <ul>
            <li><strong>Federal Income Tax:</strong> 22%, 24%, 32%, or 35% bracket savings.</li>
            <li><strong>State &amp; Local Income Tax:</strong> Average 3% to 9% savings.</li>
            <li><strong>FICA Taxes:</strong> 6.2% Social Security + 1.45% Medicare (7.65% total).</li>
          </ul>
          <p>
            For a family in the 24% federal tax bracket residing in a 5% state tax bracket, participating in a Dependent Care FSA yields an immediate cash tax savings of:
            <code className="mt-2 block rounded-lg bg-slate-100 p-2 text-center font-mono text-sm dark:bg-slate-800">
              $5,000 &times; (0.24 + 0.05 + 0.0765) = $1,832.50 in annual cash tax savings
            </code>
          </p>

          <h3>2. Child and Dependent Care Tax Credit (CDCTC) — IRS Form 2441</h3>
          <p>
            The CDCTC provides a non-refundable tax credit ranging from 20% to 35% of up to $3,000 in qualifying expenses for one child, or up to $6,000 for two or more children. Higher-earning households ($43,000+ AGI) receive a 20% credit ($600 for one child; $1,200 for two). Child support agreements can also factor in these allowances via our <a href="/calculators/finance/child-support-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">child support calculator</a>.
          </p>
          <p>
            <strong>The Stacking Strategy:</strong> If you have two or more children in paid care and cap your Dependent Care FSA at $5,000, you can apply the remaining $1,000 of the $6,000 CDCTC cap to claim an additional <strong>$200 credit</strong> on Form 2441.
          </p>

          <h2>The Dual-Income Return-to-Work Financial Breakeven Calculus</h2>
          <p>
            When evaluating whether a parent should return to work or pause a career to provide stay-at-home care, parents often make the mistake of comparing gross wages directly against childcare bills. Evaluate your net paycheck with our <a href="/calculators/finance/take-home-pay-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">take-home pay calculator</a> and <a href="/calculators/finance/salary-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">salary calculator</a> to assess:
          </p>
          <ul>
            <li><strong>Marginal Net Take-Home Pay:</strong> Second-earner wages are taxed at the household&apos;s highest marginal tax bracket. Subtract federal taxes, state taxes, and FICA first.</li>
            <li><strong>Ancillary Baby Supplies:</strong> Factor in recurring diapering outlays with our <a href="/calculators/baby/diaper-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">diaper cost calculator</a> and daily bottle supplies using our <a href="/calculators/baby/baby-feeding-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby feeding calculator</a>.</li>
            <li><strong>Household Budget Realignment:</strong> Integrate care costs into your <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">household budget calculator</a> and maintain 3 to 6 months of living expenses in an <a href="/calculators/finance/emergency-fund-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">emergency fund calculator</a> to safeguard against daycare provider closures.</li>
            <li><strong>Future Education Compounding:</strong> Once children transition to public kindergarten at age 5, redirecting that former childcare budget into a dedicated 529 plan via our <a href="/calculators/finance/college-savings-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">college savings calculator</a> can fully fund higher education.</li>
          </ul>
        </>
      }
    >
      <ChildcareCostCalculator />
    </CalcPage>
  );
}
