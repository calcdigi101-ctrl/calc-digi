import type { Metadata } from "next";
import Link from "next/link";
import CgpaCalculatorComponent from "@/components/calcs/education/cgpa-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CgpaCreditWeightingTrajectoryChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/cgpa-calculator";
const TITLE = "CGPA Calculator | Cumulative GPA & Percentage Converter (10.0 & 4.0 Scales)";
const DESCRIPTION =
  "Calculate cumulative grade point average (CGPA), semester SGPA weighting, credit bank conversions, and CBSE / AICTE percentage equivalents across 10.0 and 4.0 scales.";

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
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/grade-calculator", icon: "📊", name: "Grade Calculator" },
  { href: "/calculators/education/percentage-grade-calculator", icon: "📈", name: "Percentage Grade" },
  { href: "/calculators/education/final-grade-calculator", icon: "🎯", name: "Final Grade" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
  { href: "/calculators/education/attendance-calculator", icon: "📅", name: "Attendance" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between SGPA and CGPA?",
    a: "Semester Grade Point Average (SGPA) measures scholastic performance across a single academic term, calculated by dividing term quality points by term credit hours. Cumulative Grade Point Average (CGPA) represents the aggregate performance across all completed semesters from matriculation to graduation, weighting each semester's contribution by its earned credit volume.",
  },
  {
    q: "How do you convert a 10.0 scale CGPA into a percentage?",
    a: "Under the standard Central Board of Secondary Education (CBSE) and All India Council for Technical Education (AICTE) formula, percentage is calculated as: Percentage = CGPA * 9.5. For example, a CGPA of 8.4 translates into 8.4 * 9.5 = 79.80%. Certain autonomous universities utilize alternative multiplier scales (such as 10.0x or custom institutional offset formulas), but 9.5 remains the global benchmark.",
  },
  {
    q: "How does a 10.0 scale CGPA map to a US 4.0 GPA for graduate admissions?",
    a: "International credential evaluation services (such as WES - World Education Services) do not use a linear proportion (CGPA / 2.5). Instead, they map individual course letter grades into the US 4.0 scale based on institutional percentage distributions: Indian First Class with Distinction (75%+ or 8.0+ CGPA) typically equates to an unweighted US GPA between 3.60 and 4.00.",
  },
  {
    q: "Can a high final-year SGPA significantly lift a low historical CGPA?",
    a: "The degree of CGPA elevation depends on the proportion of completed credits. In a 160-credit engineering curriculum, undertaking 20 credits in the final semester represents only 12.5% of the total degree credit bank. Consequently, an exceptional 9.50 SGPA in the final term will raise an existing 7.50 cumulative CGPA by only 0.25 points to 7.75.",
  },
];

export default function CgpaCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Cumulative Grade Point Average (CGPA) measures aggregate scholastic achievement across multiple semesters, standardizing performance across university degree tracks. To compute your updated CGPA, weight each semester&apos;s SGPA by its completed credit hours, sum total quality points, and divide by cumulative credit hours. When modeling grade targets, check your <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">standard semester GPA</Link> and monitor conversion thresholds through our <Link href="/calculators/education/percentage-grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">percentage grade calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Cumulative CGPA Dampening & Term SGPA Sensitivity
          </h2>
          <CgpaCreditWeightingTrajectoryChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In universities across Europe, Asia, and North America, Cumulative Grade Point Average serves as the universal currency for degree classification, scholarship renewals, and graduate admissions. While semester evaluations—termed Semester Grade Point Average (SGPA) or Term GPA—capture transient academic performance, the cumulative CGPA metric captures sustained scholastic trajectory across an entire collegiate tenure. Because credit weights vary across semesters, calculating CGPA requires credit-weighted integration, mirroring the mathematical logic found in a <Link href="/calculators/math/weighted-average-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weighted average calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Credit-Weighted SGPA Integration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"N"}</Formula> represent the total number of completed semesters. For each semester <Formula>{"j"}</Formula>, let <Formula>{"\text{SGPA}_j"}</Formula> represent the semester grade point average and <Formula>{"C_j"}</Formula> denote the credit hours registered for that specific term. The cumulative index is defined as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{CGPA} = \frac{\sum_{j=1}^{N} (\text{SGPA}_j \times C_j)}{\sum_{j=1}^{N} C_j}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When projecting future cumulative standing across an upcoming academic year, students combine their existing cumulative metric with upcoming term projections. Let <Formula>{"\text{CGPA}_{\text{prior}}"}</Formula> represent historical performance across <Formula>{"C_{\text{prior}}"}</Formula> completed credits, while <Formula>{"\text{SGPA}_{\text{new}}"}</Formula> and <Formula>{"C_{\text{new}}"}</Formula> denote the upcoming term load. The updated cumulative index is expressed as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{CGPA}_{\text{updated}} = \frac{(\text{CGPA}_{\text{prior}} \times C_{\text{prior}}) + (\text{SGPA}_{\text{new}} \times C_{\text{new}})}{C_{\text{prior}} + C_{\text{new}}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For international universities operating on the 10.0 scale (such as technical universities across India, Southeast Asia, and the Middle East), converting CGPA into percentage marks requires statutory linear formulas established by educational oversight bodies. The official All India Council for Technical Education (AICTE) formula converts a 10-point CGPA into an equivalent percentage mark via:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{Equivalent Percentage (\%)} = \text{CGPA} \times 9.5"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The 9.5 multiplier reflects statistical standard deviation modeling: because a 10.0 CGPA represents perfection (100% boundary minus exam variance), multiplying by 9.5 maps a First Class benchmark (6.5 to 8.5 CGPA) into standard 60% to 80% collegiate marks. Students preparing for standardized entrance assessments can cross-reference their credentials against our <Link href="/calculators/education/act-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ACT score calculator</Link> and <Link href="/calculators/education/sat-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">SAT score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Statutory 10.0 CGPA to Percentage Conversion & Academic Classification Schedule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table outlines the standardized conversion matrix, percentage equivalencies, and Latin collegiate degree classifications across 10-point university scales:
          </p>

          <DataTable
            head={["CGPA Range (10.0 Scale)", "AICTE Percentage Equivalent", "US 4.0 Equivalent", "Degree Honors Classification", "Career Placement Benchmark"]}
            rows={[
              ["9.50 – 10.00", "90.25% – 95.00%", "3.90 – 4.00", "First Class with Distinction (Institute Gold Medal)", "Elite R&D / Global Consulting"],
              ["8.50 – 9.49", "80.75% – 90.15%", "3.70 – 3.89", "First Class with Distinction (Dean's List)", "Top Tier Tech / Investment Banking"],
              ["7.50 – 8.49", "71.25% – 80.65%", "3.30 – 3.69", "First Class Division (High Merit)", "Corporate Graduate Programs"],
              ["6.50 – 7.49", "61.75% – 71.15%", "2.70 – 3.29", "First Class Division", "Standard Professional Benchmark"],
              ["5.50 – 6.49", "52.25% – 61.65%", "2.00 – 2.69", "Second Class Division", "General Employment Minimum"],
              ["< 5.50", "< 52.25%", "< 2.00", "Pass Class / Academic Advisory", "Academic Remediation Required"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Four-Year Engineering Degree Cumulative Trajectory
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A mechanical engineering student completes their third year (6 semesters) having accumulated 120 credit hours with an existing cumulative CGPA of 7.92 on a 10.0 scale. In Semester 7, the student enrolls in 20 credits, undertaking Advanced Thermodynamics, Machine Design, and Robotics Lab, achieving an exceptional term SGPA of 9.20.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To determine the new CGPA: prior quality points equal <Formula>{"7.92 \times 120 = 950.40"}</Formula>. Semester 7 quality points equal <Formula>{"9.20 \times 20 = 184.00"}</Formula>. Total cumulative quality points reach <Formula>{"950.40 + 184.00 = 1134.40"}</Formula> over 140 credit hours (<Formula>{"120 + 20"}</Formula>). The updated cumulative CGPA is <Formula>{"1134.40 / 140 = 8.103"}</Formula>. Under the AICTE formula, the equivalent percentage increases from <Formula>{"7.92 \times 9.5 = 75.24\%"}</Formula> to <Formula>{"8.103 \times 9.5 = 76.98\%"}</Formula>, crossing the competitive 8.0 threshold required for multinational campus recruitment. Balancing rigorous course loads requires precise scheduling via our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Graduate School Transfer from 3-Year Degree
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A commerce student completing a 3-year bachelor&apos;s degree holds 90 credits with an 8.60 CGPA. The student plans an honors thesis semester (15 credits) targeting admission to a competitive European master&apos;s program that requires an equivalent 8.75 CGPA minimum.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"S"}</Formula> denote the required term SGPA. To reach 8.75 across 105 credits, total quality points must equal <Formula>{"8.75 \times 105 = 918.75"}</Formula>. Existing quality points equal <Formula>{"8.60 \times 90 = 774.00"}</Formula>. The student must secure <Formula>{"918.75 - 774.00 = 144.75"}</Formula> points in the 15-credit semester, requiring an SGPA of <Formula>{"144.75 / 15 = 9.65"}</Formula>. This high-precision target requires strategic exam planning using our <Link href="/calculators/education/final-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">final grade calculator</Link> and assessment tracking through our <Link href="/calculators/education/grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">course grade calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Institutional Credit Policies, Backlogs & Degree Classification Rules
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Academic standing across international universities enforces stringent credit accumulation benchmarks. When a student receives an F grade or &ldquo;backlog,&rdquo; zero quality points are added to the numerator while the course credit weight remains in the denominator until the course is formally cleared in supplementary examination cycles. This dynamic artificially suppresses cumulative CGPA, impacting competitive placement in the <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, students financing higher education through institutional aid or private lending must sustain minimum cumulative CGPA standards to prevent loan forfeiture or tuition penalty fees, dynamics explored across our <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link> and <Link href="/calculators/education/scholarship-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scholarship calculator</Link>. Academic departments also require verifying attendance compliance through our <Link href="/calculators/education/attendance-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">attendance calculator</Link> to ensure examination eligibility across all registered subjects.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Degree Equivalence: WES, ECTS & Transnational Graduate Admissions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When international engineering, science, and commerce graduates apply to North American or European universities, foreign credentials undergo rigorous foreign credential verification through agencies like World Education Services (WES) or Educational Credential Evaluators (ECE). These agencies do not perform naive linear transformations (such as dividing a 10.0 scale CGPA by 2.5). A linear division would penalize international students because universities in India, the United Kingdom, and Australia rarely award marks above 85%, whereas North American grading curves routinely award A marks to 20% to 30% of a collegiate cohort.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Instead, WES employs distribution-adjusted lookup algorithms that recognize a First Class with Distinction (75%+ or 8.2+ CGPA) as equivalent to an unweighted US GPA of 3.80 to 4.00. Similarly, European universities mapped under the European Credit Transfer and Accumulation System (ECTS) translate CGPA into relative cohort percentiles: the top 10% receive ECTS Grade A, the subsequent 25% receive Grade B, and the median 30% receive Grade C. Understanding these transnational conversion mechanics prevents applicants from underestimating their academic competitiveness in global admissions pools.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Academic Accreditation Standards & International Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            CGPA calculation rules, credit transfer protocols, and grading scales are governed by national statutory bodies and international educational accords:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>University Grants Commission (UGC) Choice Based Credit System (CBCS):</strong> Standardized guidelines for 10-point grading scales, credit transfer frameworks, and semester grade reporting.
            </li>
            <li>
              <strong>European Credit Transfer and Accumulation System (ECTS):</strong> European standard defining 60 ECTS credits per academic year and cross-border GPA conversion algorithms.
            </li>
            <li>
              <strong>Washington Accord (International Engineering Alliance):</strong> Mutual recognition framework establishing equivalent academic qualifications and accreditation standards across member nations.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Strategic CGPA Improvement Planning & Grade Replacement Policies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For students seeking to elevate their cumulative standing prior to final degree conferral, academic planning requires modeling course retake trajectories. Under institutional grade forgiveness frameworks, repeating a 4-credit course where a D grade (4 quality points on a 10-scale or 4 points on a 4-scale) was initially obtained and securing an A grade (36 to 40 quality points) yields an immediate net addition of 32 to 36 quality points without inflating the credit denominator. This targeted intervention provides fourfold the mathematical leverage of enrolling in a new elective course.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Additionally, professional engineering councils and medical admissions boards evaluate the trajectory and velocity of CGPA progression. A rising upward trajectory—where a student demonstrates progressive improvement from moderate freshman performance to Dean&apos;s List honors during upper-division senior coursework—is viewed with far greater institutional esteem than a deteriorating record, signaling intellectual maturity and mastery of specialized professional competencies.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Academic Transcript Auditing & Degree Nomenclature Frameworks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Official collegiate transcripts display both cumulative CGPA and chronological semester SGPA records to provide transparent documentation of academic trajectory. In many Commonwealth and Asian educational frameworks, final degree certificates explicitly print degree classifications (such as First Class with Distinction, First Class, or Second Class Honours) determined by final cumulative CGPA benchmarks. Securing a First Class standing serves as a statutory prerequisite for government examinations, public sector commissions, and fully funded doctoral research fellowships.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Moreover, multinational corporate hiring pipelines utilize automated applicant tracking systems (ATS) that parse cumulative CGPA thresholds as initial qualification filters. Maintaining consistent academic discipline safeguards long-term career momentum across international employment sectors.
          </p>

        </>
      }
    >
      <CgpaCalculatorComponent />
    </CalcPage>
  );
}
