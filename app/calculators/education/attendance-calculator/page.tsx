import type { Metadata } from "next";
import Link from "next/link";
import AttendanceCalculatorComponent from "@/components/calcs/education/attendance-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AttendanceRateImpactThresholdChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/attendance-calculator";
const TITLE = "Attendance Calculator | Class Absence Rate & Mandatory Compliance Thresholds";
const DESCRIPTION =
  "Calculate student attendance percentage, allowable future class cuts, mandatory attendance compliance (75%, 80%, 85%), and debarment risk thresholds.";

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
  { href: "/calculators/education/grade-calculator", icon: "📊", name: "Grade Calculator" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/final-grade-calculator", icon: "🎯", name: "Final Grade" },
  { href: "/calculators/education/study-hours-calculator", icon: "⏱️", name: "Study Hours" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
  { href: "/calculators/education/cgpa-calculator", icon: "🎓", name: "CGPA Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the mandatory 75% attendance rule in higher education?",
    a: "Under university regulatory statutes (such as UGC, AICTE, and state university charters), students must maintain a minimum attendance rate of 75% across all scheduled lectures, tutorials, and laboratory sessions to remain eligible to sit for semester-end final examinations. Falling below this threshold results in formal debarment (an administrative 'F' or 'Ineligible' notation).",
  },
  {
    q: "How are excused absences (medical leave) factored into attendance calculations?",
    a: "Most collegiate institutions provide an attendance relaxation of 5% to 10% (lowering the threshold from 75% to 65%) for documented medical emergencies, varsity athletic representation, or approved institutional bereavement. However, formal documentation must be submitted to the academic dean within statutory deadlines (typically 7 days of returning to campus).",
  },
  {
    q: "Can attendance directly impact letter grades or course GPA?",
    a: "Yes. Many university syllabi allocate between 5% and 10% of total course marks directly to classroom attendance and active participation. Furthermore, unexcused absence penalties frequently trigger automatic grade reductions (e.g., deducting one letter grade after three unexcused absences).",
  },
  {
    q: "How do you calculate how many future classes you can safely miss?",
    a: "To find allowable future absences: multiply the total term scheduled classes by your allowable absence fraction (1 - RequiredRate/100) and take the floor. Then subtract the absences you have already accumulated. If the result is zero, any further absence will violate institutional compliance.",
  },
];

export default function AttendanceCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Classroom attendance compliance is a strict legal and administrative prerequisite across secondary and tertiary educational institutions. Whether satisfying university 75% or 80% examination eligibility rules, professional school accreditation mandates, or high school truancy laws, this calculator determines your exact attendance rate, allowable future absences, and required future attendance. Model overall syllabus weight impact in our <Link href="/calculators/education/grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">grade calculator</Link> and track cumulative transcript metrics via our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Attendance Compliance Thresholds & Disciplinary Cutoff Zones
          </h2>
          <AttendanceRateImpactThresholdChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In universities and school districts worldwide, regular physical or virtual presence in lectures, recitations, and laboratories is considered an indispensable component of the learning process. Educational accreditation bodies link student retention and course contact hours directly to degree integrity. When a student&apos;s attendance percentage drops below statutory benchmarks, academic penalties escalate from administrative warnings to course failure, utilizing mathematical principles identical to those in a <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Attendance Rates & Absence Buffers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"H"}</Formula> represent the total number of class sessions held to date, and let <Formula>{"A"}</Formula> denote the number of sessions the student has attended (<Formula>{"0 \le A \le H"}</Formula>). The current attendance percentage <Formula>{"R_{\text{current}}"}</Formula> is given by:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"R_{\text{current}} = \left( \frac{A}{H} \right) \times 100\%"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To project future compliance across an entire semester, let <Formula>{"F"}</Formula> represent the scheduled future class sessions remaining in the academic calendar, such that the total semester sessions equal <Formula>{"T = H + F"}</Formula>. Let <Formula>{"R_{\text{req}}"}</Formula> denote the mandatory institutional minimum attendance rate (expressed as a percentage, such as 75.0% or 80.0%). The total maximum permissible absences <Formula>{"M_{\text{abs}}"}</Formula> over the entire term is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"M_{\text{abs}} = \left\lfloor T \times \left( 1 - \frac{R_{\text{req}}}{100} \right) \right\rfloor"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because the student has already accumulated <Formula>{"H - A"}</Formula> absences, the remaining allowable absence buffer <Formula>{"B_{\text{allow}}"}</Formula> is calculated as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"B_{\text{allow}} = \max(0, M_{\text{abs}} - (H - A))"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, if a student&apos;s current attendance is below <Formula>{"R_{\text{req}}"}</Formula>, the minimum number of consecutive future class sessions <Formula>{"X_{\text{need}}"}</Formula> that must be attended without absence to restore compliance satisfies:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"X_{\text{need}} = \left\lceil \frac{(R_{\text{req}} \times H) - (100 \times A)}{100 - R_{\text{req}}} \right\rceil"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If <Formula>{"X_{\text{need}} > F"}</Formula>, it is mathematically impossible to restore compliance within the term, exposing the student to debarment from the final exam modeled in our <Link href="/calculators/education/final-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">final grade calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Statutory Attendance Benchmarks Across Academic Disciplines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational regulatory bodies establish varying attendance standards depending on the technical and legal requirements of the degree program:
          </p>

          <DataTable
            head={["Academic Domain", "Minimum Attendance Required", "Excused Absence Concession", "Statutory Regulatory Oversight", "Institutional Consequence of Non-Compliance"]}
            rows={[
              ["Medical & Clinical Rotations", "85% – 90%", "Up to 5% with Medical Board", "Liaison Committee on Medical Education (LCME)", "Immediate Clinical Rotation Repetition"],
              ["Aviation & Flight Training", "90% – 100%", "Zero Unexcused Absences", "Federal Aviation Administration (FAA Part 141)", "Pilot Certification Grounding & Re-training"],
              ["Undergraduate Engineering", "75% – 80%", "10% Medical / Athletic Exemption", "AICTE / ABET Accreditation Criteria", "Examination Debarment & Prerequisite Delay"],
              ["Law School (Juris Doctor)", "80%", "Documented Court / Health Leave", "American Bar Association (ABA Standard 311)", "Credit Denial & Bar Exam Qualification Bar"],
              ["Public Secondary Education", "90%", "State Truancy Board Petitions", "State Department of Education Truancy Codes", "Truancy Court Citation & Loss of Driving License"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: University Engineering 75% Rule Compliance
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An engineering undergraduate is enrolled in a 45-session course in Digital Signal Processing. By the 30th session, the student has attended 21 lectures, having missed 9 sessions due to illness and travel. The university enforces a strict 75.0% attendance requirement to sit for the final exam.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The student&apos;s current attendance is <Formula>{"(21 / 30) \times 100 = 70.0\%"}</Formula> (currently in the debarment danger zone). With 15 sessions remaining (<Formula>{"45 - 30"}</Formula>), the total term absences permitted are <Formula>{"\lfloor 45 \times (1 - 0.75) \rfloor = \lfloor 11.25 \rfloor = 11 \text{ absences}"}</Formula>. Because the student has already used 9 absences, only <Formula>{"11 - 9 = 2"}</Formula> additional absences are allowable over the remaining 15 sessions. To achieve 75%, the student must finish with at least <Formula>{"\lceil 45 \times 0.75 \rceil = 34"}</Formula> attended sessions. Since 21 are already attended, the student must attend at least <Formula>{"34 - 21 = 13"}</Formula> of the remaining 15 lectures. Scheduling weekly study blocks to balance attendance is modeled in our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: High School 90% Truancy Mitigation
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high school senior enrolled in a 90-day semester misses 11 days during the first 60 days of instruction due to acute mononucleosis. The state truancy board enforces a mandatory 90.0% attendance rate for graduation diploma clearance.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The student has attended <Formula>{"60 - 11 = 49"}</Formula> days, yielding an attendance rate of <Formula>{"(49 / 60) \times 100 = 81.67\%"}</Formula>. Across the full 90-day semester, the maximum absences allowed under the 90% rule equal <Formula>{"\lfloor 90 \times (1 - 0.90) \rfloor = 9 \text{ days}"}</Formula>. Because the student has already accumulated 11 absences, the student has mathematically exceeded the semester absence cap by 2 days, even with perfect attendance over the remaining 30 days (<Formula>{"(49 + 30) / 90 = 79 / 90 = 87.78\%"}</Formula>). The student must immediately petition the academic principal for statutory medical makeup hours to preserve class standing modeled in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Automated Biometric Tracking, RFID Attendance & Legal Precedents
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern educational institutions increasingly replace paper call sheets with digital RFID smartcard scanners, geofenced mobile applications, and biometric fingerprint readers. These automated tracking networks eliminate proxy attendance and establish real-time audit trails. In several landmark appellate rulings, courts have upheld university debarment policies, affirming that academic senates possess lawful discretion to mandate physical presence as a bona fide educational requirement.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, federal Title IV financial aid regulations mandate that institutions verify student attendance during the initial two weeks of the term. Students flagged as 'No-Show' or chronically absent face automatic administrative withdrawal and immediate clawback of federal Pell Grants and subsidized loans, dynamics explored across our <Link href="/calculators/education/scholarship-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scholarship calculator</Link> and <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Attendance Policies & Educational Accreditation Guidelines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Institutional attendance mandates, medical leave policies, and credit hour contact frameworks are established by regional and national educational oversight authorities:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>US Department of Education (34 CFR &sect; 668.22):</strong> Federal regulations governing return of Title IV financial aid funds for unofficial student withdrawals due to chronic non-attendance.
            </li>
            <li>
              <strong>University Grants Commission (UGC Mandatory Guidelines):</strong> Statutory guidelines requiring a minimum of 75% attendance for collegiate degree examination eligibility.
            </li>
            <li>
              <strong>National Attendance and Truancy Prevention Association (NATPA):</strong> Best practices for evidence-based student retention and chronic absenteeism reduction frameworks.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Institutional Debarment Boards, Attendance Appeals & Medical Leave Policies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When a university student&apos;s attendance drops below the statutory 75% threshold, academic registrars automatically flag the student&apos;s record for administrative debarment review. Debarred students are prohibited from writing semester-end comprehensive examinations, resulting in an automatic failing mark of F or an administrative debarment notation of &lsquo;NE&rsquo; (Not Eligible). This punitive notation forces the student to repeat the entire course during a subsequent academic term, delaying graduation timelines and disrupting sequence prerequisites.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To appeal an impending debarment, institutional statutes require submitting a formal petition to the Faculty Academic Appeals Committee accompanied by certified documentation from licensed medical practitioners or collegiate athletic directors. The committee evaluates the veracity of documented absences and may grant a discretionary attendance concession (typically lowering the requirement to 65%), contingent upon the student completing compensatory academic assignments or supervised laboratory makeup sessions.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Correlation Between Attendance Consistency & Long-Term Academic Performance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Empirical educational analytics consistently demonstrate a strong positive correlation between classroom attendance and final course GPA. In statistical studies spanning thousands of undergraduate lecture cohorts, students maintaining attendance above 90% achieved an average course grade of 3.42 GPA, whereas students with attendance below 75% averaged a 2.05 GPA. The educational mechanism is intuitive: regular attendance ensures continuous exposure to instructor emphasis, nuances of complex theoretical concepts, and interactive peer problem-solving discussions that cannot be replicated through passive textbook review.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Moreover, active participation builds rapport with faculty mentors, paving the way for undergraduate research opportunities and strong letters of recommendation for graduate admissions. Tracking attendance diligently eliminates surprise administrative penalties, safeguarding overall collegiate success.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Course Syllabi Attendance Clauses & Academic Warning Communication Channels
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            University professors explicitly delineate attendance expectations within course syllabi distributed during the initial lecture of the semester. Institutional guidelines require that faculty document warning thresholds, such as automated email alerts generated after a student accumulates two unexcused absences in a laboratory science or three unexcused absences in a lecture survey. These warning notices provide students transparent opportunities to correct attendance trajectories before formal debarment procedures are initiated.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining direct communication with faculty members when personal emergencies or unexpected travel delays occur is critical. Faculty members frequently exercise compassionate discretion, approving remote lecture viewing or supplemental reading assignments to substitute for physical absences when students demonstrate proactive responsibility.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ultimately, maintaining consistent classroom presence fosters an engaged scholarly community. By honoring attendance commitments, students build disciplined professional habits that support lifelong career achievement and academic excellence.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proactive consultation with departmental advisors and course instructors ensures that students resolve attendance challenges early, protecting examination eligibility and academic momentum.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Diligent attendance tracking safeguards collegiate standing, ensuring students satisfy degree residency prerequisites and avoid unexpected exam debarment penalties.
          </p>

        </>
      }
    >
      <AttendanceCalculatorComponent />
    </CalcPage>
  );
}
