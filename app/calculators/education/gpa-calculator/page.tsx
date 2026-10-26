import type { Metadata } from "next";
import Link from "next/link";
import GpaCalculatorComponent from "@/components/calcs/education/gpa-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GpaScaleWeightingComparisonChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/gpa-calculator";
const TITLE = "GPA Calculator | Weighted, Unweighted & Cumulative Grade Point Average";
const DESCRIPTION =
  "Calculate semester and cumulative high school and college GPA across 4.0, 4.5, and 5.0 weighted scales with honors, AP, IB, and quality points conversion.";

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
  { href: "/calculators/education/cgpa-calculator", icon: "🎓", name: "CGPA Calculator" },
  { href: "/calculators/education/grade-calculator", icon: "📊", name: "Grade Calculator" },
  { href: "/calculators/education/final-grade-calculator", icon: "🎯", name: "Final Grade" },
  { href: "/calculators/education/percentage-grade-calculator", icon: "📈", name: "Percentage Grade" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
  { href: "/calculators/education/study-hours-calculator", icon: "⏱️", name: "Study Hours" },
];

const FAQ_ITEMS = [
  {
    q: "What is the mathematical difference between unweighted and weighted GPA?",
    a: "An unweighted GPA measures academic achievement on a strict 4.0 scale regardless of course rigor, treating an A in standard physical education identically to an A in Advanced Placement (AP) Chemistry. Conversely, a weighted GPA awards an extra 0.5 quality points for Honors classes (4.5 max) and an extra 1.0 quality point for AP, International Baccalaureate (IB), or dual-enrollment college coursework (5.0 max), compensating students for undertaking rigorous collegiate-level curriculums.",
  },
  {
    q: "How does a single failing or low grade impact cumulative GPA over time?",
    a: "Cumulative GPA operates as a credit-weighted moving average. In a student's freshman year with only 30 completed credits, a single 3-credit F pulls down a 3.80 GPA to 3.42 (a 0.38-point drop). However, by senior year with 105 accumulated credits, that identical failing mark pulls the cumulative index down by only 0.10 points, illustrating how credit volume dampens marginal grade sensitivity.",
  },
  {
    q: "Can a cumulative college GPA ever exceed 4.0?",
    a: "In undergraduate collegiate institutions, official transcripts almost universally cap cumulative GPA at 4.00, meaning honors or graduate-level courses do not award bonus quality points toward the degree index. However, in secondary education (high schools), weighted GPAs frequently reach 4.60 or higher when students take exhaustive rosters of AP and IB coursework.",
  },
  {
    q: "How are grades for repeated or retaken courses factored into GPA?",
    a: "Institutional policies vary: under grade replacement policies, the university completely substitutes the new attempt's quality points into the cumulative calculation while recording the original attempt as an administrative note. Under grade averaging policies, both course attempts remain active in the denominator, requiring students to compute both credit blocks within the weighted credit summation.",
  },
];

export default function GpaCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Grade Point Average (GPA) represents the standardized credit-weighted index of scholastic achievement across secondary and tertiary education. To calculate your semester term average, multiply the numeric quality point value of each assigned letter grade by the course&apos;s assigned credit hours, sum these products, and divide by the total term credits attempted. When planning academic targets, track your <Link href="/calculators/education/final-grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">final grade requirements</Link> and monitor cumulative shifts via our <Link href="/calculators/education/cgpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">CGPA calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: GPA Scale Weighting Dynamics Across Academic Course Levels
          </h2>
          <GpaScaleWeightingComparisonChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The collegiate Grade Point Average system distills multidimensional course rigor and academic achievement into a singular, highly legible decimal metric. Standard unweighted scaling assigns a strict integer-anchored range: an earned grade of A equals 4.0 quality points, B equals 3.0 points, C equals 2.0 points, D equals 1.0 point, and F yields 0.0 points. Because academic departments assign variable credit loads (such as 4 credits for intensive laboratory sciences versus 1 credit for seminar electives), a simple arithmetic mean provides an erroneous measure of overall competence. Instead, academic registrars employ credit weighting, mathematically identical to the statistical formulations found in a <Link href="/calculators/math/weighted-average-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weighted average calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Quality Points & Cumulative Weighting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To evaluate scholastic standing across multiple semesters, registrars compute the total Quality Points (QP) accumulated by multiplying the credit weight of course <Formula>{"i"}</Formula> (<Formula>{"c_i"}</Formula>) by the numerical grade point equivalent (<Formula>{"g_i"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{Semester GPA} = \frac{\sum_{i=1}^{n} (c_i \times g_i)}{\sum_{i=1}^{n} c_i}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When projecting future graduation targets, students must compute cumulative grade points by integrating prior completed credit hours with prospective term loads. Let <Formula>{"\text{GPA}_{\text{prior}}"}</Formula> denote the historical cumulative index, <Formula>{"C_{\text{prior}}"}</Formula> represent the total completed credit hours, <Formula>{"\text{QP}_{\text{term}}"}</Formula> denote new quality points earned, and <Formula>{"C_{\text{term}}"}</Formula> signify the term credits. The updated cumulative index is expressed as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{GPA}_{\text{cumulative}} = \frac{(\text{GPA}_{\text{prior}} \times C_{\text{prior}}) + \text{QP}_{\text{term}}}{C_{\text{prior}} + C_{\text{term}}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In secondary schools utilizing weighted systems, courses classified as Honors award an additional <Formula>{"+0.50"}</Formula> quality points, whereas Advanced Placement (AP), International Baccalaureate (IB), and dual-enrollment college coursework award <Formula>{"+1.00"}</Formula> quality points. An A earned in an AP calculus course yields 5.0 quality points, allowing high-achieving scholars to graduate with weighted GPAs surpassing the theoretical 4.0 ceiling. For students converting between percentage grades and quality points, our <Link href="/calculators/education/percentage-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage grade calculator</Link> maps granular exam scores into standardized brackets.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Collegiate 4.0 Letter Grade & Quality Point Conversion Schedule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following authoritative schedule reflects the standard plus/minus grading framework adopted by the vast majority of accredited North American colleges and secondary institutions:
          </p>

          <DataTable
            head={["Letter Grade", "Percentage Range", "Standard 4.0 Scale", "Honors Scale (+0.5)", "AP / IB Scale (+1.0)"]}
            rows={[
              ["A+", "97.0% – 100%", "4.00", "4.50", "5.00"],
              ["A", "93.0% – 96.9%", "4.00", "4.50", "5.00"],
              ["A-", "90.0% – 92.9%", "3.70", "4.20", "4.70"],
              ["B+", "87.0% – 89.9%", "3.30", "3.80", "4.30"],
              ["B", "83.0% – 86.9%", "3.00", "3.50", "4.00"],
              ["B-", "80.0% – 82.9%", "2.70", "3.20", "3.70"],
              ["C+", "77.0% – 79.9%", "2.30", "2.80", "3.30"],
              ["C", "73.0% – 76.9%", "2.00", "2.50", "3.00"],
              ["C-", "70.0% – 72.9%", "1.70", "2.20", "2.70"],
              ["D", "60.0% – 69.9%", "1.00", "1.50", "2.00"],
              ["F", "< 60.0%", "0.00", "0.00", "0.00"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Undergraduate Pre-Med Sophomore Semester Load
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A sophomore undergraduate enters the spring term with a cumulative GPA of 3.52 across 48 completed credit hours. During the semester, the student undertakes Organic Chemistry (4 credits, grade A- = 3.7 pts), Cell Biology Laboratory (2 credits, grade A = 4.0 pts), Multivariable Calculus (4 credits, grade B+ = 3.3 pts), and Medical Sociology (3 credits, grade A = 4.0 pts). The student attempts 13 semester credits.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            First, calculate semester quality points: <Formula>{"(4 \times 3.7) + (2 \times 4.0) + (4 \times 3.3) + (3 \times 4.0) = 14.8 + 8.0 + 13.2 + 12.0 = 48.0 \text{ quality points}"}</Formula>. The semester term GPA equals <Formula>{"48.0 / 13 = 3.692"}</Formula>. Next, combine this with prior completed work: historical points equal <Formula>{"3.52 \times 48 = 168.96"}</Formula>. Total cumulative points become <Formula>{"168.96 + 48.0 = 216.96"}</Formula> over 61 total credits (<Formula>{"48 + 13"}</Formula>), yielding an updated cumulative GPA of <Formula>{"216.96 / 61 = 3.557"}</Formula>. Maintaining this trajectory requires rigorous weekly time budgeting via our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: High School Junior AP Capstone Strategy
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high school junior holds an unweighted cumulative GPA of 3.82 and a weighted GPA of 4.15 across 40 completed Carnegie units. In the junior year, the student enrolls in AP English Literature (1 credit, grade A = 5.0 weighted), AP Physics C (1 credit, grade B+ = 4.3 weighted), Honors US History (1 credit, grade A = 4.5 weighted), and Varsity Orchestra (1 credit, grade A = 4.0 unweighted).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The junior term weighted quality points equal <Formula>{"5.0 + 4.3 + 4.5 + 4.0 = 17.8"}</Formula> points across 4 credits, generating a term weighted GPA of <Formula>{"17.8 / 4 = 4.450"}</Formula>. Prior weighted points equal <Formula>{"4.15 \times 40 = 166.0"}</Formula>. New cumulative weighted points equal <Formula>{"166.0 + 17.8 = 183.8"}</Formula> across 44 units, elevating the student&apos;s cumulative weighted GPA to <Formula>{"183.8 / 44 = 4.177"}</Formula>. This high index significantly strengthens competitive admission profiles for selective state universities and elevates the candidate&apos;s decile standing in the <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Graduate & Professional Admissions: AMCAS, LSAC & Engineering GPA Recalculations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When undergraduate scholars transition toward post-graduate professional programs, centralized application clearinghouses systematically recalculate transcripts using specialized standardized algorithms. For aspiring physicians applying through the American Medical College Application Service (AMCAS), GPA is bifurcated into a cumulative overall index and an intensive BCPM index (Biology, Chemistry, Physics, and Mathematics). Under AMCAS rules, institutional grade forgiveness is neutralized: every single course attempt across all post-secondary institutions is computed into the denominator, eliminating institutional retake expungements.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, the Law School Admission Council (LSAC) standardizes grading curves across disparate colleges by converting grades into an unbending numerical scale where an earned A+ receives 4.33 quality points, while an A receives 4.00, creating distinct advantages for alumni of universities that award honors plus-marks. Meanwhile, competitive engineering and computer science graduate committees emphasize upper-division core major GPA over general education electives. Aspiring candidates can evaluate their standardized entrance testing metrics using our <Link href="/calculators/education/act-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ACT score calculator</Link> and <Link href="/calculators/education/sat-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">SAT score calculator</Link> to build comprehensive academic portfolios.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Academic Honors, Latin Distinctions & Institutional Retention Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Collegiate degree conferrals celebrate peak scholastic excellence through traditional Latin honors: Cum Laude (&ldquo;with praise&rdquo;), Magna Cum Laude (&ldquo;with great praise&rdquo;), and Summa Cum Laude (&ldquo;with highest praise&rdquo;). Across modern universities, these honors are determined either by static decimal benchmarks (typically 3.50, 3.75, and 3.90 respectively) or by flexible percentile distributions (awarded to the top 20%, 10%, and 5% of each graduating class cohort). Maintaining top-tier academic standing also directly safeguards competitive institutional endowment awards, which can be modeled through our <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link> and <Link href="/calculators/education/scholarship-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scholarship calculator</Link> to evaluate long-term debt-mitigation outcomes.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Undergraduate Academic Standing Policies: Probation, Warning & Dean&apos;s List Criteria
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every university establishes minimum threshold standards governing student standing, categorized into Academic Good Standing, Academic Warning, and Formal Academic Probation. Good standing universally requires sustaining a minimum cumulative 2.00 GPA on a 4.00 scale. If a student&apos;s cumulative average drops below 2.00 at the conclusion of any fall or spring term, the registrar places the student on academic probation, capping term registration loads at 12 or 13 credit hours and requiring mandatory consultation with academic success advisors.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, exceptional academic performance is recognized each semester through Dean&apos;s Honor Lists, typically requiring completion of at least 12 graded credit hours with a term GPA of 3.50 or higher and zero failing or incomplete marks. Achieving sustained placement on Dean&apos;s honor rolls provides critical competitive differentiation when seeking selective summer internships, corporate fellowships, and post-baccalaureate research grants. Academic counselors also advise tracking total attendance compliance using our <Link href="/calculators/education/attendance-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">attendance calculator</Link> to avoid unexcused course failure penalties.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Educational References & Accreditation Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Academic record-keeping, quality point assignment schedules, and satisfactory academic progress (SAP) benchmarks are regulated across higher education by governing statutory bodies and professional registrar associations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>American Association of Collegiate Registrars and Admissions Officers (AACRAO):</strong> Standard guidelines for transcript notation, credit hour transfer equivalents, and grading systems.
            </li>
            <li>
              <strong>US Department of Education (Title IV Satisfactory Academic Progress):</strong> Federal financial aid eligibility standards requiring students to sustain a minimum cumulative 2.0 GPA and a 67% credit completion pace.
            </li>
            <li>
              <strong>The College Board AP Program:</strong> Standardized curriculum frameworks for secondary schools awarding weighted academic credit.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Pedagogical Grade Recovery Strategies & Academic Advising Frameworks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When undergraduate students encounter an academic setback, university counseling departments implement structured recovery roadmaps centered on qualitative grade replacement and strategic syllabus balancing. Rather than repeating failed courses in concurrent succession with advanced upper-division seminars, academic advisors mandate pairing high-rigor analytical requirements with accessible general education electives. This pacing stabilizes term quality points while preventing cumulative GPA erosion below crucial institutional thresholds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, students participating in competitive collegiate athletics or university work-study programs must satisfy National Collegiate Athletic Association (NCAA) Division I/II continuing eligibility benchmarks, which enforce escalating credit milestones and GPA minimums (1.80 at 24 credits, 1.90 at 48 credits, and 2.00 at 72 credits) to maintain active roster eligibility.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            University registrars also conduct comprehensive graduation clearance audits to verify that cumulative quality points satisfy both general university residency requirements and specific departmental major prerequisites before conferring formal Latin degree diplomas.
          </p>

        </>
      }
    >
      <GpaCalculatorComponent />
    </CalcPage>
  );
}
