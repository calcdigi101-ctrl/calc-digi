import type { Metadata } from "next";
import Link from "next/link";
import ScholarshipCalculatorComponent from "@/components/calcs/education/scholarship-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ScholarshipCoverageFourYearHorizonChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/scholarship-calculator";
const TITLE = "Scholarship Calculator | 4-Year Merit Aid & Renewal Valuation";
const DESCRIPTION =
  "Calculate multi-year scholarship values, institutional merit awards, tuition coverage percentages, renewal GPA thresholds, and scholarship tax implications.";

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
  { href: "/calculators/education/college-cost-calculator", icon: "🏛️", name: "College Cost" },
  { href: "/calculators/education/student-loan-calculator", icon: "💳", name: "Student Loan" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/act-score-calculator", icon: "📊", name: "ACT Score" },
  { href: "/calculators/education/sat-score-calculator", icon: "📐", name: "SAT Score" },
  { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Tax Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between renewable scholarships and one-time awards?",
    a: "One-time awards provide financial funding for a single academic term or the freshman year only. In contrast, multi-year renewable scholarships disburse funds across all four undergraduate years (typically up to 8 continuous semesters), contingent upon the recipient maintaining a specified minimum cumulative GPA (usually 3.0 to 3.5) and completing at least 12 to 15 credit hours per semester.",
  },
  {
    q: "Are scholarships and academic grants subject to federal income tax?",
    a: "Under Internal Revenue Code (IRC) Section 117, scholarships are tax-free only when used for 'qualified education expenses' (tuition, mandatory enrollment fees, and required course textbooks/supplies) by a degree-seeking student. Any scholarship portion used for non-qualified expenses—such as room, board, travel, or living stipends—is considered taxable gross income.",
  },
  {
    q: "What is institutional scholarship displacement?",
    a: "Scholarship displacement occurs when a university reduces its own need-based or merit-based institutional grant funding after a student wins an outside, private scholarship from an external foundation or community organization. This practice leaves the student's net out-of-pocket cost unchanged rather than reducing their financial obligation.",
  },
  {
    q: "What academic metrics have the largest impact on winning merit scholarships?",
    a: "Collegiate institutional merit scholarship matrices primarily evaluate unweighted/weighted high school cumulative GPA and standardized test scores (SAT or ACT). Higher GPA percentiles and top-quartile test performance qualify applicants for automatic, guaranteed institutional tuition discounts ranging from $5,000 per year to full-tuition waivers.",
  },
];

export default function ScholarshipCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/education", label: "Education & School" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Quick Academic Guidance:</strong> Scholarships and collegiate grants represent non-repayable gift aid that directly offsets the total Cost of Attendance. By analyzing one-time private grants against multi-year institutional merit matrices alongside strict renewal GPA covenants, this calculator determines your 4-year aggregate scholarship valuation and remaining tuition gap. Compare total expenses using our <Link href="/calculators/education/college-cost-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">college cost calculator</Link> and evaluate borrowing options with our <Link href="/calculators/education/student-loan-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">student loan calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: 4-Year Cumulative Scholarship Valuation vs Tuition Coverage Horizon
          </h2>
          <ScholarshipCoverageFourYearHorizonChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Securing scholarship assistance is the single most effective strategy for mitigating higher education debt burdens. Unlike student loans, scholarships do not accrue interest or require principal amortization. However, navigating multi-tiered merit grids, renewal contingencies, and private foundation grants requires rigorous financial evaluation. Academic distinction tracked in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> directly drives merit scholarship eligibility.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: 4-Year Aggregate Valuation & Net Coverage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"S_{\\text{annual}}"}</Formula> denote the recurring annual institutional merit award, and let <Formula>{"S_{\\text{one-time}}"}</Formula> represent one-time private foundation grants disbursed during Year 1. For a standard 4-year degree (<Formula>{"N = 4"}</Formula>), the nominal aggregate scholarship value (<Formula>{"V_{\\text{nominal}}"}</Formula>) is formulated as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"V_{\\text{nominal}} = S_{\\text{one-time}} + \\sum_{t=1}^{N} S_{\\text{annual}, t}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, multi-year renewable scholarships carry a risk of forfeiture if the student fails to satisfy the institutional retention covenant (typically requiring a cumulative GPA <Formula>{"\\ge \\text{GPA}_{\\text{min}}"}</Formula>). Let <Formula>{"P_{\\text{renew}}"}</Formula> denote the empirical probability of maintaining renewal academic standing across all four years (<Formula>{"0 < P_{\\text{renew}} \\le 1.0"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"E[V_{\\text{scholarship}}] = S_{\\text{one-time}} + S_{\\text{annual}, 1} + \\sum_{t=2}^{4} \\left( S_{\\text{annual}, t} \\times P_{\\text{renew}}^{t-1} \\right)"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Tuition Coverage Percentage (<Formula>{"\\text{TCP}"}</Formula>) relative to the college&apos;s annual tuition and mandatory fees (<Formula>{"T"}</Formula>) is defined as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\\text{TCP} = \\left( \\frac{S_{\\text{annual}}}{T} \\right) \\times 100"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Protecting multi-year renewal eligibility requires continuous monitoring of term grades in our <Link href="/calculators/education/cgpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">CGPA calculator</Link>. High school applicants can benchmark their eligibility against university matrices through our <Link href="/calculators/education/act-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ACT score calculator</Link> and <Link href="/calculators/education/sat-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">SAT score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Institutional Merit Matrix Tiers & Standardized Benchmark Grids
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Many public and private universities publish transparent merit grids that award automatic annual grants based on high school GPA and standardized test scores:
          </p>

          <DataTable
            head={["Merit Award Tier", "High School GPA (Unweighted)", "SAT Score Range", "ACT Composite", "Annual Scholarship Value", "4-Year Total Value"]}
            rows={[
              ["Presidential / Trustee Distinction", "3.90 – 4.00", "1480 – 1600", "33 – 36", "$20,000 – Full Tuition", "$80,000 – $220,000 (Full Ride)"],
              ["Provost / Dean's Honor Award", "3.75 – 3.89", "1380 – 1470", "30 – 32", "$12,000 – $18,000 / yr", "$48,000 – $72,000 (4-Year Sum)"],
              ["Collegiate Academic Achievement", "3.50 – 3.74", "1260 – 1370", "26 – 29", "$8,000 – $12,000 / yr", "$32,000 – $48,000 (4-Year Sum)"],
              ["University Incentive Grant", "3.20 – 3.49", "1150 – 1250", "23 – 25", "$4,000 – $7,000 / yr", "$16,000 – $28,000 (4-Year Sum)"],
              ["Opportunity / Transfer Grant", "3.00 – 3.19", "Test Optional", "Test Optional", "$2,000 – $4,000 / yr", "$8,000 – $16,000 (4-Year Sum)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Renewable 4-Year Merit Award vs One-Time Cash Grant
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high school senior with a 3.85 GPA and 1420 SAT compares two scholarship scenarios: College A offers a renewable $12,000/year Provost Merit Award (requiring a 3.20 college GPA), while College B offers a $15,000 one-time freshman award plus an external $5,000 rotary club grant.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At College A, the 4-year cumulative valuation equals <Formula>{"\\$12,000 \\times 4 = \\$48,000"}</Formula>. At College B, total aid equals <Formula>{"\\$15,000 + \\$5,000 = \\$20,000"}</Formula>, leaving Years 2 through 4 completely unassisted. College A delivers $28,000 more in cumulative tuition assistance. However, preserving College A&apos;s award requires maintaining a high standing evaluated in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link> and dedicating adequate preparation time via our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: The Hidden Cost of Scholarship GPA Forfeiture
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A sophomore engineering student holds a $16,000/year institutional STEM scholarship requiring a 3.25 cumulative GPA. After struggling through sophomore organic chemistry and thermodynamics, the student&apos;s GPA drops to 3.12 at the end of the spring term. The university financial aid office places the student on a one-semester scholarship probation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If the GPA is not restored to 3.25 by the conclusion of the subsequent term, the scholarship is permanently revoked, forcing the student to borrow an unexpected $32,000 across their junior and senior years. By conducting predictive GPA modeling and adjusting exam study priorities, the student can evaluate remedial targets and avoid tens of thousands of dollars in high-interest debt obligations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tax Implications of Academic Scholarships: IRS IRC Section 117 Rules
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Internal Revenue Code (IRC) Section 117, scholarship and fellowship funds are exempt from federal gross income tax only to the extent they are utilized for &lsquo;qualified education expenses&rsquo;. Qualified expenses are strictly limited to tuition, mandatory student activity fees, and course-required textbooks, equipment, and lab supplies.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When a full-ride scholarship covers room, board, campus dining, and travel stipends, the university will issue a Form 1098-T with Box 5 (Scholarships) exceeding Box 1 (Payments Received for Qualified Tuition). The excess amount is treated as taxable unearned income, potentially triggering federal tax liabilities that should be analyzed in our <Link href="/calculators/finance/tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">tax calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative National Scholarship Bodies & Best-Practice Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Scholarship governance, ethical financial aid packaging, and private award displacement policies are guided by leading national educational associations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>National Scholarship Providers Association (NSPA):</strong> National alliance establishing standards for scholarship administration, equitable donor criteria, and institutional displacement reduction policies.
            </li>
            <li>
              <strong>National Association of Student Financial Aid Administrators (NASFAA):</strong> Professional ethics governing institutional merit packaging and federal Title IV matching protocols.
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 970 - Tax Benefits for Education):</strong> Federal regulatory authority defining qualified vs non-qualified scholarship allocations.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Institutional Scholarship Displacement & Outside Award Advocacy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Scholarship displacement remains one of the most frustrating hurdles facing diligent undergraduate scholarship seekers. Under federal packaging regulations, a student&apos;s total financial aid cannot exceed the institution&apos;s published Cost of Attendance (COA). If an ambitious student wins $5,000 in private community scholarships, some universities respond by reducing their own institutional need-based grants by $5,000, entirely negating the student&apos;s fundraising effort.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To prevent displacement, students should consult their university&apos;s financial aid office early, requesting that outside scholarship proceeds be applied first to reduce self-help obligations (such as student loans or Federal Work-Study) before displacing institutional grants. Several states, including Maryland, Washington, and California, have enacted legislation restricting public universities from displacing institutional aid when external awards are won.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Building a Comprehensive Multi-Tiered Scholarship Portfolio
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Successful scholarship strategies treat funding acquisition like a diversified investment portfolio. Rather than applying exclusively to massive national competitions with tens of thousands of applicants (such as the Coca-Cola or Gates Millennium scholarships), successful candidates build a balanced portfolio comprising institutional automatic merit aid, regional civic awards (Rotary, Kiwanis, local credit unions), and specialized academic departmental grants.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Departmental scholarships offered to upperclassmen within specific academic majors—such as engineering design awards, endowed medical research grants, and accounting society fellowships—frequently experience significantly lower applicant density, offering high conversion probabilities for high-performing scholars who maintain rigorous academic records.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proactive scholarship research and strategic academic planning enable university scholars to maximize non-repayable gift aid and graduate free of unmanageable debt.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By understanding 4-year cumulative valuation models, renewal GPA covenants, and tax regulations, students can confidently chart an affordable path to university completion.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Strategic Scholarship Application Timelines & High-Yield Search Funnels
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maximizing collegiate scholarship acquisition requires structured calendar planning beginning during the junior year of high school. High-yield scholarship search funnels prioritize localized and regional opportunities over saturated national lotteries. Local chamber of commerce awards, community foundations, labor union scholarships, and regional corporate sponsorships routinely receive fewer than twenty qualified applications, offering significantly higher statistical win probabilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, establishing a reusable personal scholarship repository containing verified letters of recommendation, leadership activity resumes, and polished personal statements enables candidates to submit high volumes of applications with minimal repetitive friction during critical autumn application cycles.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Maintaining Academic Eligibility & Satisfactory Academic Progress (SAP)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Retaining institutional merit scholarships requires satisfying federal and university Satisfactory Academic Progress (SAP) covenants. SAP mandates two core standards: a qualitative metric (maintaining the contractual minimum cumulative GPA, typically 3.00 to 3.50) and a quantitative pace metric (successfully completing at least 67% to 75% of all attempted cumulative credit hours).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Dropping courses after institutional add/drop deadlines results in &lsquo;W&rsquo; withdrawal marks on academic transcripts, which count against completion pace metrics and can trigger financial aid suspension. Diligent scholars maintain regular communication with academic advisors and utilize campus tutoring centers to protect their scholarship covenants.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Private Foundation Grants vs Corporate Sponsorship Opportunities
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Expanding your collegiate funding search beyond campus financial aid offices reveals extensive corporate sponsorship and private philanthropy opportunities. Many multinational corporations and professional trade associations sponsor annual educational grants for undergraduates pursuing degrees in computer science, mechanical engineering, environmental science, and healthcare.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            These corporate fellowship awards frequently include summer internship placements alongside direct tuition assistance, providing invaluable industry mentorship and early career networking that accelerates post-graduate employment.
          </p>

        </>
      }
    >
      <ScholarshipCalculatorComponent />
    </CalcPage>
  );
}
