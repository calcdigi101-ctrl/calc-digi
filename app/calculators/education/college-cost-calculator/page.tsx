import type { Metadata } from "next";
import Link from "next/link";
import CollegeCostCalculatorComponent from "@/components/calcs/education/college-cost-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CollegeCostOfAttendanceBreakdownChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/college-cost-calculator";
const TITLE = "College Cost Calculator | Cost of Attendance (COA) & 4-Year Tuition Budget";
const DESCRIPTION =
  "Calculate full college Cost of Attendance (COA), direct vs indirect expenses, net price after scholarships, and 4-year cumulative tuition projections with inflation.";

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
  { href: "/calculators/education/scholarship-calculator", icon: "🏆", name: "Scholarship Calc" },
  { href: "/calculators/education/student-loan-calculator", icon: "💳", name: "Student Loan" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
  { href: "/calculators/finance/budget-calculator", icon: "💰", name: "Budget Calculator" },
  { href: "/calculators/education/study-hours-calculator", icon: "⏱️", name: "Study Hours" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between Sticker Price and Net Price in higher education?",
    a: "Sticker Price is the published total Cost of Attendance (COA) set by the university, encompassing tuition, mandatory fees, on-campus housing, and meal plans. In contrast, Net Price is the actual out-of-pocket amount a family pays after deducting non-repayable gift aid (federal Pell grants, state grants, and institutional merit scholarships). Most undergraduate families pay significantly less than the sticker price.",
  },
  {
    q: "What components constitute the official Cost of Attendance (COA)?",
    a: "Under the Higher Education Act, federal Cost of Attendance (COA) includes Direct Costs billed directly by the institution (tuition, fees, room, and board) plus Indirect Costs managed by the student (textbooks, course supplies, personal hygiene, health insurance, and local/regional transportation).",
  },
  {
    q: "How fast is college tuition inflating compared to standard consumer prices?",
    a: "Historically, higher education tuition inflation has averaged between 3.5% and 5.0% annually, routinely outpacing standard Consumer Price Index (CPI) inflation by 1.5% to 2.0%. Over a 4-year degree program, compounding tuition increases can add $4,000 to $18,000 in additional cumulative educational expenses.",
  },
  {
    q: "How does the Student Aid Index (SAI) affect financial aid packages?",
    a: "The Student Aid Index (SAI), which replaced the Expected Family Contribution (EFC) on the modernized FAFSA, is an eligibility index number calculated from family adjusted gross income, taxed assets, and household size. Financial need is determined by subtracting your SAI from the college's published COA (Financial Need = COA - SAI).",
  },
];

export default function CollegeCostCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Planning undergraduate higher education financing requires calculating the comprehensive Cost of Attendance (COA), which encompasses direct billed expenses (tuition, fees, room, board) alongside indirect living expenses (books, transportation, personal items). Subtracting non-repayable gift aid reveals your true net price and borrowing requirements. Evaluate institutional merit aid using our <Link href="/calculators/education/scholarship-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">scholarship calculator</Link> and project monthly repayment obligations with our <Link href="/calculators/education/student-loan-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">student loan calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Cost of Attendance (COA) Component Breakdown & Direct vs Indirect Costs
          </h2>
          <CollegeCostOfAttendanceBreakdownChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Undergraduate collegiate investment constitutes one of the largest capital expenditures a family undertakes. The published sticker price frequently deters prospective applicants, yet the majority of matriculating undergraduates receive need-based or merit-based gift aid that dramatically lowers actual net expenses. Evaluating long-term educational investments requires mathematical modeling similar to the compounding algorithms used in a <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">compound interest calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Cost of Attendance & 4-Year Inflation Trajectory
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The annual Cost of Attendance (<Formula>{"\\text{COA}"}</Formula>) is the sum of direct institutional charges (<Formula>{"D"}</Formula>) and indirect personal living allowances (<Formula>{"I"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\\text{COA} = (T_{\\text{base}} + F_{\\text{mand}} + H_{\\text{dorm}} + M_{\\text{meal}}) + (B_{\\text{books}} + T_{\\text{trans}} + P_{\\text{misc}})"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where <Formula>{"T_{\\text{base}}"}</Formula> is annual tuition, <Formula>{"F_{\\text{mand}}"}</Formula> is mandatory health and campus facilities fees, <Formula>{"H_{\\text{dorm}}"}</Formula> is housing, <Formula>{"M_{\\text{meal}}"}</Formula> is dining plans, <Formula>{"B_{\\text{books}}"}</Formula> is academic supplies, <Formula>{"T_{\\text{trans}}"}</Formula> is travel expenses, and <Formula>{"P_{\\text{misc}}"}</Formula> represents personal allowances. The true Net Price (<Formula>{"\\text{NP}"}</Formula>) reflects the out-of-pocket obligation after subtracting gift aid (<Formula>{"G"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\\text{NP} = \\text{COA} - (S_{\\text{merit}} + G_{\\text{need}} + G_{\\text{state}})"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because universities increase tuition rates annually, projecting a 4-year undergraduate completion cost requires compounding tuition by the historical higher education inflation rate <Formula>{"i"}</Formula> (typically 3.0% to 5.0% annually). The total 4-year cumulative cost (<Formula>{"\\text{COA}_{4\\text{yr}}"}</Formula>) is expressed as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\\text{COA}_{4\\text{yr}} = \\sum_{t=1}^{4} \\left[ \\text{Direct}_t \\times (1 + i)^{t-1} + \\text{Indirect}_t \\times (1 + i_{\\text{cpi}})^{t-1} \\right]"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining a top academic profile evaluated in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> unlocks higher tiers of renewable merit aid that significantly dampen this inflationary surge. Families should structure personal spending through our <Link href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">budget calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Higher Education Sector Benchmarks: Public In-State vs Private Non-Profit COA
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The College Board Trends in College Pricing report tracks annual undergraduate cost benchmarks across major higher education sectors:
          </p>

          <DataTable
            head={["Higher Education Sector", "Tuition & Mandatory Fees", "Room & Board (Campus Housing)", "Books, Travel & Indirects", "Total Annual COA (Sticker)", "Average Net Price Paid"]}
            rows={[
              ["Public 2-Year (Community In-District)", "$3,990 / year", "$9,970 (Off-Campus Living)", "$4,120 / year", "$18,080 / year", "$8,200 / year (Pell Eligible)"],
              ["Public 4-Year (In-State Resident)", "$11,260 / year", "$13,120 / year", "$4,850 / year", "$29,230 / year", "$15,400 / year (With Aid)"],
              ["Public 4-Year (Out-of-State Non-Resident)", "$29,150 / year", "$13,120 / year", "$5,240 / year", "$47,510 / year", "$28,900 / year (Partial Merit)"],
              ["Private Non-Profit 4-Year University", "$41,540 / year", "$14,650 / year", "$4,680 / year", "$60,870 / year", "$32,800 / year (Institutional Grants)"],
              ["Elite Selective Private (Ivy / Tier-1)", "$66,800 / year", "$19,400 / year", "$5,300 / year", "$91,500 / year", "$24,500 / year (Need-Blind Policy)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Public Flagship University In-State vs Out-of-State Gap
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An engineering freshman considers two offers: In-State Public Flagship (Tuition $12,000, Room & Board $13,500, Books & Misc $4,500, Total COA $30,000/year) vs Out-of-State Public University (Tuition $32,000, Room & Board $14,000, Travel & Misc $5,500, Total COA $51,500/year). The out-of-state institution offers an $8,000 annual merit award, reducing out-of-state net price to $43,500.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Over a 4-year degree assuming 4.0% annual tuition inflation, the in-state total expenditure sums to <Formula>{"\\$30,000 \\times 4.246 = \\$127,380"}</Formula>. The out-of-state program with net $43,500 sums to <Formula>{"\\$43,500 \\times 4.246 = \\$184,701"}</Formula>—a four-year differential of $57,321. To service this gap through loans, the student must model amortization schedules in our <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link> and account for study requirements using our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Private Non-Profit Discount Rate & Tuition Inflation Drag
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high-achieving biology student receives admission to an elite private university with a $62,000 annual tuition sticker price and $18,000 room and board (Total COA $80,000). The college awards a $35,000 annual Dean&apos;s Merit Scholarship. However, the institutional award is a flat, non-indexed dollar grant.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In Year 1, Net Price is <Formula>{"\\$80,000 - \\$35,000 = \\$45,000"}</Formula>. By Year 4, assuming 4.5% annual tuition increases, the base COA rises to <Formula>{"\\$80,000 \\times (1.045)^3 = \\$91,293"}</Formula>. Because the $35,000 scholarship remains flat, Year 4 Net Price expands to <Formula>{"\\$91,293 - \\$35,000 = \\$56,293"}</Formula>—an annual out-of-pocket increase of $11,293. Modeling this inflation drag through our <Link href="/calculators/finance/inflation-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inflation calculator</Link> reveals the critical importance of maintaining a high standing in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link> to qualify for additional departmental awards.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hidden Collegiate Cost Drivers: Course Fees, Technology Levies & Commuter Expenses
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Undergraduate families routinely underestimate ancillary educational expenses that are not included in base tuition. Laboratory science materials fees, specialized engineering computing licenses, art studio supplies, and clinical nursing uniforms can add $800 to $2,500 per academic year. Additionally, campus parking permits, mandatory university student health insurance plans ($2,000 to $4,000 annually if not waived with family policy proof), and return flights during academic recesses substantially alter the real cost ledger.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Developing a comprehensive multi-year college financial blueprint requires modeling both direct institutional billing statements and indirect living expenditures. Establishing an education savings fund using our <Link href="/calculators/finance/savings-goal-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">savings goal calculator</Link> ensures prospective scholars avoid sudden mid-degree funding deficits.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Higher Education Financial Bodies & Regulatory Frameworks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            College pricing disclosures, financial aid compliance, and institutional cost transparency are governed by federal statutes and national educational oversight organizations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>US Department of Education (Higher Education Opportunity Act):</strong> Requires all Title IV participating postsecondary institutions to post a public Net Price Calculator on their institutional websites.
            </li>
            <li>
              <strong>The College Board (Annual Trends in College Pricing & Student Aid):</strong> National benchmark statistical repository tracking multi-decade tuition trends, published sticker prices, and average net prices paid.
            </li>
            <li>
              <strong>National Association of Student Financial Aid Administrators (NASFAA):</strong> Professional ethics and administrative guidelines governing cost of attendance construction and financial aid packaging policies.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            FAFSA Simplification Act & The Transition to Student Aid Index (SAI)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The federal implementation of the FAFSA Simplification Act overhauled the fundamental methodology used to calculate need-based student financial assistance. The long-standing Expected Family Contribution (EFC) was replaced by the Student Aid Index (SAI), an eligibility index that can drop as low as negative $1,500 (-$1,500) to identify students with the most critical economic need. Unlike the prior EFC, the SAI formula no longer provides an automatic discount for families with multiple children enrolled in college simultaneously.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding your calculated SAI enables prospective students to anticipate federal Pell Grant eligibility and state need-based funding. Families should review their tax filings carefully and complete the Free Application for Federal Student Aid (FAFSA) on opening day to maximize institutional campus-based aid allocations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Evaluating Degree Return on Investment (ROI) & Career Earnings Trajectories
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Viewing college costs through an investment lens requires comparing total four-year out-of-pocket expenditures against expected career earnings differentials. The US Department of Education College Scorecard provides field-of-study median earnings data one and four years post-graduation. STEM, computer science, nursing, and finance disciplines historically demonstrate rapid payback periods of three to five years, whereas liberal arts and human services degrees require more disciplined loan management.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Prudent higher education financial planning balances institutional prestige with pragmatic cost realities, ensuring that graduates enter the workforce with manageable debt ratios that support homeownership, retirement saving, and personal financial freedom.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Carefully evaluating all components of higher education expenses ensures that students and families make informed decisions that protect long-term financial stability.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By modeling comprehensive Cost of Attendance alongside multi-year tuition inflation and gift aid horizons, undergraduates position themselves for academic success without crippling debt burdens.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Navigating Financial Aid Appeals & Special Circumstance Reviews
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Section 479A of the Higher Education Act, university financial aid administrators possess legal statutory authority known as &lsquo;Professional Judgment&rsquo; to adjust a student&apos;s Cost of Attendance or the data elements utilized in calculating the Student Aid Index (SAI). Families experiencing significant financial changes—such as unexpected job loss, catastrophic family medical expenses, or sudden business closures—can submit a formal Special Circumstances Appeal to request an aid recalculation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, students receiving competing financial aid offers from peer institutions can submit a Merit Aid Reconsideration request. Preparing documented evidence of higher competing institutional merit awards alongside updated academic transcripts frequently results in an enhanced institutional tuition discount of $2,000 to $6,000 annually.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Off-Campus Living Budgets vs Mandatory Dormitory Housing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            During sophomore through senior years, undergraduates frequently transition from on-campus residence halls to off-campus apartments. While off-campus housing can yield significant financial savings—particularly when sharing leased apartments with roommates and cooking independent meals—students must budget for utility costs, monthly internet connectivity, security deposits, and extended 12-month lease commitments that run through summer recess.
          </p>

        </>
      }
    >
      <CollegeCostCalculatorComponent />
    </CalcPage>
  );
}
