import type { Metadata } from "next";
import Link from "next/link";
import PercentageGradeCalculatorComponent from "@/components/calcs/education/percentage-grade-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PercentageToGpaCurveMatrixChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/percentage-grade-calculator";
const TITLE = "Percentage Grade Calculator | Percentage to Letter Grade & 4.0 GPA Converter";
const DESCRIPTION =
  "Convert raw test percentages into standardized letter grades, 4.0 scale GPA quality points, and curved scores across standard plus/minus and straight scales.";

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
  { href: "/calculators/education/final-grade-calculator", icon: "🎯", name: "Final Grade" },
  { href: "/calculators/education/cgpa-calculator", icon: "🎓", name: "CGPA Calculator" },
  { href: "/calculators/education/test-score-calculator", icon: "📝", name: "Test Score" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
];

const FAQ_ITEMS = [
  {
    q: "Why do different universities use different percentage-to-letter grade conversion scales?",
    a: "Under institutional autonomy in higher education, universities and individual academic departments establish their own grading policies. For instance, in many STEM curriculums, an 88% represents an A due to examination difficulty, whereas in standard liberal arts departments, an A strictly requires 93% or higher. Understanding your specific course syllabus grading rubric is essential for accurate academic tracking.",
  },
  {
    q: "What is the difference between a plus/minus scale and a straight letter scale?",
    a: "A straight scale assigns whole letter grades without pluses or minuses: any score from 90% to 100% receives an A (4.0 GPA), 80% to 89% receives a B (3.0 GPA), and so forth. A plus/minus scale subdivides each decile into granular tiers: an 88% earns a B+ (3.3 GPA), while an 81% earns a B- (2.7 GPA), providing more precise differentiation of student achievement.",
  },
  {
    q: "How does rounding affect percentage grades near letter boundaries?",
    a: "Standard mathematical rounding rounds up to the next integer if the decimal portion is 0.50 or higher (e.g., an 89.50% rounds to 90.0%, achieving an A-). However, institutional policies vary: some professors enforce strict unrounded truncations where an 89.99% remains a B+, while others round up only if attendance and participation benchmarks are satisfied.",
  },
  {
    q: "How do curved grading adjustments alter percentage scores?",
    a: "Curving modifies raw percentage scores to align with target grade distributions. Flat curves add a uniform percentage bonus (e.g., +5% to all students), while square-root curves (10 * sqrt(Raw)) compress the upper boundary while providing substantial recovery to lower scores (e.g., a 64% transforms into 80%).",
  },
];

export default function PercentageGradeCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Percentage grade conversion translates raw academic marks into standardized letter designations and 4.0 scale quality points. Whether evaluating high school report cards, collegiate transcripts, or standardized test score reports, this tool standardizes performance across both plus/minus and straight grading systems with optional curve adjustments. Calculate your cumulative record using our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link> and track course syllabus weights in our <Link href="/calculators/education/grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">grade calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Percentage to 4.0 Scale GPA Transformation Function
          </h2>
          <PercentageToGpaCurveMatrixChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international and North American education, percentages provide the continuous raw measure of assessment accuracy, while letter grades and quality points provide the discrete currency for transcript notation and degree honors. Because collegiate registrars require discrete quality points (0.0 to 4.0) to calculate cumulative indices, converting percentages into quality points is the foundational mathematical step in educational record keeping. Calculating these conversions is statistically linked to percentage analysis in a <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Grade Cutoffs & Step-Wise Mapping
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"P_{\text{raw}}"}</Formula> denote the raw percentage score earned by a student (<Formula>{"0 \le P_{\text{raw}} \le 100"}</Formula>), and let <Formula>{"C_{\text{curve}}"}</Formula> represent an instructor-granted flat curve offset. The adjusted percentage score <Formula>{"P_{\text{final}}"}</Formula> is defined as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"P_{\text{final}} = \min(100, P_{\text{raw}} + C_{\text{curve}})"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under a standardized plus/minus grading schedule, the continuous variable <Formula>{"P_{\text{final}}"}</Formula> is mapped onto a discrete set of letter grades <Formula>{"L"}</Formula> and 4.0 quality points <Formula>{"Q"}</Formula> using a step function:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"Q(P) = \begin{cases} 4.00 & \text{if } P \ge 93.0 \\ 3.70 & \text{if } 90.0 \le P < 93.0 \\ 3.30 & \text{if } 87.0 \le P < 90.0 \\ 3.00 & \text{if } 83.0 \le P < 87.0 \\ 2.70 & \text{if } 80.0 \le P < 83.0 \\ 2.30 & \text{if } 77.0 \le P < 80.0 \\ 2.00 & \text{if } 73.0 \le P < 77.0 \\ 1.70 & \text{if } 70.0 \le P < 73.0 \\ 1.00 & \text{if } 60.0 \le P < 70.0 \\ 0.00 & \text{if } P < 60.0 \end{cases}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under a non-linear curving model—such as the square-root curve used in high-difficulty mathematics and engineering exams—the adjusted percentage <Formula>{"P_{\text{curved}}"}</Formula> compresses upper-tier ceiling effects while lifting the bottom quartile:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"P_{\text{curved}} = 10 \times \sqrt{P_{\text{raw}}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under this formula, a raw score of 64% transforms into <Formula>{"10 \times \sqrt{64} = 80\%"}</Formula> (a B- grade), whereas a raw score of 81% transforms into <Formula>{"10 \times \sqrt{81} = 90\%"}</Formula> (an A- grade). Students evaluating target final marks can project needed scores through our <Link href="/calculators/education/final-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">final grade calculator</Link> and test accuracy distributions with our <Link href="/calculators/education/test-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">test score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Collegiate Percentage to Letter Grade Conversion Schedule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays the authoritative percentage cutoffs, letter designations, 4.0 quality points, and performance descriptions recognized across North American higher education:
          </p>

          <DataTable
            head={["Percentage Range", "Plus/Minus Letter", "Straight Scale Letter", "4.0 GPA Quality Points", "Academic Standing & Performance Classification"]}
            rows={[
              ["97.0% – 100%", "A+", "A", "4.00", "Exceptional Academic Distinction / Perfect Mastery"],
              ["93.0% – 96.9%", "A", "A", "4.00", "Superior Mastery of Course Subject Matter"],
              ["90.0% – 92.9%", "A-", "A", "3.70", "Excellent Competence / Dean's Honors Level"],
              ["87.0% – 89.9%", "B+", "B", "3.30", "Very Good Performance / Above Average"],
              ["83.0% – 86.9%", "B", "B", "3.00", "Good Solid Understanding of Principles"],
              ["80.0% – 82.9%", "B-", "B", "2.70", "Adequate Collegiate Level Performance"],
              ["77.0% – 79.9%", "C+", "C", "2.30", "Average Competency / Satisfactory Progress"],
              ["73.0% – 76.9%", "C", "C", "2.00", "Minimum Standard for Major Course Credit"],
              ["70.0% – 72.9%", "C-", "C", "1.70", "Marginal Pass / Prerequisite Review Required"],
              ["60.0% – 69.9%", "D", "D", "1.00", "Poor / Conditional Credit Only"],
              ["< 60.0%", "F", "F", "0.00", "Failing / Zero Credit Awarded"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Boundary Rounding Near High Honors Threshold
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A student in College Physics completes all exams, laboratory writeups, and homework sets, securing a raw cumulative weighted average of 89.65%. The university utilizes a standard plus/minus grading framework where an A- cut occurs at 90.00% and a B+ cut occurs at 87.00%.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under standard mathematical rounding rules, 89.65% rounds to 90.00%, elevating the student into the A- bracket and awarding 3.70 quality points per credit hour. Over a 4-credit physics course, this yields <Formula>{"4 \times 3.70 = 14.80"}</Formula> quality points. If the university enforced strict truncations without rounding, the 89.65% would remain a B+, yielding <Formula>{"4 \times 3.30 = 13.20"}</Formula> quality points. The 1.6 quality point difference meaningfully influences the student&apos;s cumulative index in our <Link href="/calculators/education/cgpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">CGPA calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Curved Examination Scaling in Undergraduate Statistics
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An entire cohort of 120 students sits for a rigorous mid-semester statistics examination where the class raw mean is 58.0% with a standard deviation of 12.0%. The professor applies a flat curve of +8.0% across all scores to bring the cohort median to 66.0%.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A student with a raw score of 72.0% sees their grade adjust to <Formula>{"72.0\% + 8.0\% = 80.0\%"}</Formula>. On the plus/minus scale, this moves the student from a C- (1.7 quality points) directly into a B- (2.7 quality points), producing a full 1.0 GPA quality point gain for that assessment component. These score elevations directly enhance class cohort rankings analyzed in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Institutional Pass/Fail Policies & Grade Transmutation Guidelines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Many collegiate institutions permit undergraduate scholars to elect Pass/Fail (or Credit/No-Credit) grading options for a limited roster of elective courses. Under standard Pass/Fail guidelines, any percentage score equal to or exceeding 70.0% (a C grade) transmutates into a Pass (P) notation on official transcripts. Passing marks confer degree credit hours toward graduation but are completely excluded from GPA quality point calculations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, receiving a Fail (F) grade in a Pass/Fail course frequently impacts transcripts punitively, adding zero quality points while counting in credit denominators at certain institutions. Students must also maintain satisfactory course attendance compliance via our <Link href="/calculators/education/attendance-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">attendance calculator</Link> and optimize daily study rhythms through our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Academic Accreditation Standards & Educational Policy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Statutory percentage grading conversions, transcript standardization protocols, and academic transfer equivalencies are governed by national and international accreditation standards:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>AACRAO Transfer Credit Practices:</strong> National guidelines defining grading conversion schedules, plus/minus weighting standards, and transcript evaluation.
            </li>
            <li>
              <strong>National Center for Education Statistics (NCES Integrated Postsecondary Education Data System):</strong> Federal benchmarks for retention rates, grading metrics, and degree completions.
            </li>
            <li>
              <strong>Bologna Process European Higher Education Area (EHEA):</strong> Cross-border framework governing grading transparency, percentage distributions, and international credit mobility.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychometric Scaling: Raw Scores, Percentile Ranks & Standardized Grading Curves
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In standardized psychometric testing and large-cohort collegiate courses, raw percentage marks are rarely evaluated in isolation. When professors administer an examination where the highest achieved mark across 300 students is 84%, treating 93% as the absolute threshold for an A grade fails to capture relative scholastic mastery. Psychometricians address this challenge through standardized scaling, converting raw scores into z-scores that quantify exactly how many standard deviations an individual score lies above or below the cohort mean.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under standardized Gaussian distributions, an individual z-score of +1.5 places a student in the top 7% of their class, earning an A grade regardless of whether their raw numerical percentage was 78% or 95%. This relative grading methodology aligns with high-stakes standardized testing frameworks utilized across national college admissions and professional licensing examinations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Academic Transmutation Tables & Criterion-Referenced vs Norm-Referenced Evaluation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational institutions fundamentally divide grading philosophy into criterion-referenced assessment and norm-referenced assessment. Criterion-referenced grading evaluates student work against fixed, unyielding rubrics and predetermined absolute percentage cutoffs: if every student demonstrates complete mastery of curriculum objectives, every student can mathematically earn an A grade. This framework is universally mandated in medical, nursing, and civil engineering programs where absolute safety competencies must be demonstrated without compromise.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, norm-referenced grading (grading on a curve) enforces competitive rationing of top marks, restricting A grades to a predetermined top percentage of the class. While norm-referenced evaluation protects against grade inflation across multi-section introductory courses, it can introduce competitive student friction. Understanding which evaluation philosophy governs your syllabus enables strategic academic planning and optimal study allocation.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Error of Measurement & Grade Boundary Fairness in Educational Testing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational psychometricians emphasize that every assessment tool inherently possesses a Standard Error of Measurement (SEM). A student who earns an 89.4% on an examination might have scored a 91.2% or an 87.6% under slightly different testing conditions or alternate question sampling. Because observed percentage scores represent a sample estimate of true student ability rather than an immutable truth, progressive academic senates encourage holistic grading rubrics and faculty discretion near critical letter boundaries.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Recognizing the statistical variance inherent in raw percentage scores helps students approach academic grading with objective resilience. Tracking overall course trajectory rather than fixating on minor tenth-of-a-percent variances enables sustainable intellectual focus and long-term scholastic achievement across complex undergraduate degree pathways.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            International student advising offices frequently assist transfer applicants with standardized conversion petitions. Translating foreign percentage marks into equivalent North American letter grades ensures equitable admissions consideration, facilitating seamless academic mobility across international higher education systems.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Undergraduate academic advising committees encourage scholars to consult departmental grading policies early in their degree trajectory. Understanding specific cutoff standards empowers proactive study habits and eliminates surprises during formal end-of-term transcript degree audits.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In competitive admissions environments, admissions committees review official grading keys printed on transcript reverses to calibrate raw GPA metrics against institutional course rigor and percentage grade distributions.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ultimately, mastering the mathematical conversion between raw assessment percentages and collegiate quality points demystifies transcript mechanics, enabling scholars to pursue academic honors with intentional focus and measured precision.
          </p>

        </>
      }
    >
      <PercentageGradeCalculatorComponent />
    </CalcPage>
  );
}
