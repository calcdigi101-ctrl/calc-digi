import type { Metadata } from "next";
import Link from "next/link";
import TestScoreCalculatorComponent from "@/components/calcs/education/test-score-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TestScoreRawGradingCurveChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/test-score-calculator";
const TITLE = "Test Score Calculator | Raw Percentage, Grading Curves & Scaled Scores";
const DESCRIPTION =
  "Calculate test percentage scores, negative marking penalty deductions, square root curves, standard deviation curves, and letter grade distributions.";

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
  { href: "/calculators/education/grade-calculator", icon: "📈", name: "Grade Calculator" },
  { href: "/calculators/education/final-grade-calculator", icon: "🎯", name: "Final Grade" },
  { href: "/calculators/education/percentage-grade-calculator", icon: "💯", name: "Percentage Grade" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/act-score-calculator", icon: "📊", name: "ACT Score" },
  { href: "/calculators/education/sat-score-calculator", icon: "📐", name: "SAT Score" },
];

const FAQ_ITEMS = [
  {
    q: "How does the Square Root curve formula work for difficult examinations?",
    a: "The square root grading curve is formulated as Curved Score = 10 * sqrt(Raw Score). It is widely favored by STEM educators because it disproportionately aids lower passing scores while preserving upper distinction. For instance, a raw score of 64% curves to 10 * 8 = 80% (a 16-point boost), whereas a raw score of 81% curves to 10 * 9 = 90% (a 9-point boost), and 100% remains exactly 100%.",
  },
  {
    q: "What is negative marking and how does it penalize blind guessing?",
    a: "Negative marking deducts fractional points for incorrect answers to discourage random guessing on multiple-choice examinations. The classical mathematical penalty formula is Penalty = 1 / (k - 1), where k is the number of response options. On a 4-option test, an incorrect answer loses 1/3 of a point, making the mathematical expected value of blind guessing exactly zero.",
  },
  {
    q: "What is a standard deviation (Z-score) normal distribution curve?",
    a: "A Z-score curve re-scales raw student scores based on the class mean (mu) and standard deviation (sigma). The instructor sets the class mean to a target grade (typically 75% or 80%) and distributes letter grades based on standard deviation intervals (e.g., scores > 1 sigma above mean receive an A, within +/- 1 sigma receive a B or C, and < 1 sigma below receive lower marks).",
  },
  {
    q: "How do raw test points translate into weighted course grades?",
    a: "A test score contributes to your overall course grade proportionally to its syllabus weight category. For example, scoring 85% on a midterm worth 25% of the total course adds 0.85 * 25 = 21.25 weighted percentage points toward your final semester average.",
  },
];

export default function TestScoreCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Evaluating test performance requires translating raw question counts into standardized percentage marks, analyzing negative marking penalties, and applying statistical grading curves (square root, linear flat boost, or standard deviation normalization). By calculating exact earned points across varying test lengths, this calculator reveals your true standing. Integrate your test scores into term averages using our <Link href="/calculators/education/grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">grade calculator</Link> and determine required final exam scores with our <Link href="/calculators/education/final-grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">final grade calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Raw Test Scores vs Curving Mathematical Models (Square Root & Flat Shift)
          </h2>
          <TestScoreRawGradingCurveChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standardized testing, collegiate midterms, and professional licensing examinations utilize sophisticated statistical psychometrics to calibrate raw assessment scores. Whether calculating the baseline accuracy percentage on a 50-question quiz or evaluating curved distributions on a multi-variable calculus midterm, understanding scoring formulations provides essential clarity. Convert your overall scores into official letter marks using our <Link href="/calculators/education/percentage-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage grade calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Raw Accuracy, Penalties & Curves
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"T"}</Formula> represent the total number of scored items on an examination (<Formula>{"T > 0"}</Formula>), let <Formula>{"C"}</Formula> denote the number of correct responses, let <Formula>{"W"}</Formula> represent incorrect answers, and let <Formula>{"U"}</Formula> represent unattempted questions (<Formula>{"T = C + W + U"}</Formula>). On standard linear tests without penalty, the raw score percentage (<Formula>{"S_{\\text{raw}}"}</Formula>) is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"S_{\\text{raw}} = \\left( \\frac{C}{T} \\right) \\times 100"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On competitive standardized examinations employing negative marking (e.g. historical SAT, IIT-JEE, or AMC mathematics competitions), an incorrect answer incurs a fractional deduction penalty <Formula>{"p = \\frac{1}{k - 1}"}</Formula>, where <Formula>{"k"}</Formula> is the number of answer choices per question. The net penalized raw points (<Formula>{"R_{\\text{net}}"}</Formula>) and penalized percentage (<Formula>{"S_{\\text{penalized}}"}</Formula>) are formulated as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"R_{\\text{net}} = C - \\left( W \\times \\frac{1}{k - 1} \\right)"}</Formula>
          </div>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"S_{\\text{penalized}} = \\max\\left(0, \\left( \\frac{R_{\\text{net}}}{T} \\right) \\times 100\\right)"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When academic faculty apply statistical curves to normalize difficult examination outcomes, two primary models are implemented:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Square Root Curve:</strong> <Formula>{"S_{\\text{curved}} = 10 \\times \\sqrt{S_{\\text{raw}}}"}</Formula>
            </li>
            <li>
              <strong>Linear Shift to High Score:</strong> <Formula>{"S_{\\text{curved}} = S_{\\text{raw}} + (100 - S_{\\text{max}})"}</Formula>
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Protecting your academic transcript evaluated in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> requires tracking test outcomes against standardized benchmarks. Cross-reference your results with our <Link href="/calculators/education/act-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ACT score calculator</Link> and <Link href="/calculators/education/sat-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">SAT score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Raw Percentage to Letter Grade Conversion Matrix
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays standard raw percentage thresholds, standard letter grades, 4.0 scale quality points, and performance classifications:
          </p>

          <DataTable
            head={["Percentage Range", "Letter Grade", "4.0 Scale Quality Points", "Square Root Curved Equivalent", "Academic Performance Classification"]}
            rows={[
              ["93.0% – 100.0%", "A", "4.00", "96.4% – 100.0%", "Exemplary Scholastic Mastery"],
              ["90.0% – 92.9%", "A-", "3.70", "94.9% – 96.3%", "Superior Academic Achievement"],
              ["87.0% – 89.9%", "B+", "3.30", "93.3% – 94.8%", "Above Average Competence"],
              ["83.0% – 86.9%", "B", "3.00", "91.1% – 93.2%", "Solid Core Understanding"],
              ["80.0% – 82.9%", "B-", "2.70", "89.4% – 91.0%", "Adequate Concept Grasp"],
              ["77.0% – 79.9%", "C+", "2.30", "87.7% – 89.3%", "Marginal Passing Competence"],
              ["70.0% – 76.9%", "C / C-", "2.00 / 1.70", "83.7% – 87.6%", "Minimum Prerequisite Standard"],
              ["Below 60.0%", "F", "0.00", "< 77.5%", "Course Prerequisite Failure"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: 80-Question Science Midterm With Guessing Deductions
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An organic chemistry midterm contains 80 multiple-choice questions with 4 options each (<Formula>{"k = 4"}</Formula>). The penalty for a wrong answer is <Formula>{"1 / (4 - 1) = 0.333"}</Formula> raw points. A student answers 58 questions correctly, gets 18 wrong, and leaves 4 blank.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            First, calculate raw net score: <Formula>{"R_{\\text{net}} = 58 - (18 \\times 0.333) = 58 - 6.0 = 52.0 \\text{ points}"}</Formula>. The penalized percentage is <Formula>{"52.0 / 80 = 65.0\\%"}</Formula> (a grade of D). Without negative marking, the student&apos;s raw accuracy would have been <Formula>{"58 / 80 = 72.5\\%"}</Formula> (a solid C). The student&apos;s blind guessing on 18 uncertain questions destroyed 7.5 percentage points of net standing, underscoring the critical rule of negative marking: never guess blindly when penalty parameters are active. Schedule targeted revision via our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: The Square Root Curve in Advanced Engineering Calculus
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On a notoriously difficult multi-variable calculus midterm, the class raw average is 49%, and the top raw score achieved is 81%. The professor announces a Square Root Curve will be applied to protect student progression and class standing evaluated in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Student 1 scored a raw 49%. Applying the formula: <Formula>{"10 \\times \\sqrt{49} = 10 \\times 7 = 70.0\\%"}</Formula>—a massive +21 percentage point boost that elevates the student from a failing grade into a passing C. Student 2 scored a raw 81%. Applying the formula: <Formula>{"10 \\times \\sqrt{81} = 10 \\times 9 = 90.0\\%"}</Formula>—a +9 percentage point increase that rewards mastery with a solid A-. The non-linear square root function acts as a mathematical shock absorber for rigorous academic departments.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Item Response Theory (IRT) & Psychometric Standard Error of Measurement (SEM)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern high-stakes examinations—such as the computer-adaptive Digital SAT, GRE, and USMLE medical licensing exams—no longer rely on simplistic raw percentage calculations. Instead, psychometricians implement Item Response Theory (IRT). Under IRT, each test item is assigned specific statistical parameters: difficulty level (<Formula>{"b"}</Formula>), discrimination power (<Formula>{"a"}</Formula>), and pseudo-guessing probability (<Formula>{"c"}</Formula>).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Additionally, all testing instruments carry a Standard Error of Measurement (SEM), which quantifies test score confidence bands (typically +/- 2 to 3 percentage points). Understanding these psychometric principles prevents students from over-interpreting minor single-point fluctuations between practice tests. Optimize your reading pace for long test passages with our <Link href="/calculators/education/reading-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">reading speed calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Assessment Standards & Educational Testing Authorities
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational assessment guidelines, psychometric validation standards, and ethical testing protocols are defined by national psychometric bodies:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>American Educational Research Association (AERA):</strong> Co-author of the Standards for Educational and Psychological Testing governing test validity, reliability, and fairness.
            </li>
            <li>
              <strong>National Council on Measurement in Education (NCME):</strong> Professional association dedicated to the science of assessment, psychometric modeling, and scoring ethics.
            </li>
            <li>
              <strong>Educational Testing Service (ETS Research Division):</strong> Technical publisher of landmark research on standardized test scaling, equating, and adaptive scoring algorithms.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychometric Reliability, Validity & Test-Retest Variance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When analyzing test scores, psychometricians evaluate two foundational criteria: reliability and validity. Test reliability measures score consistency across repeated administrations. A test with high internal consistency (measured via Cronbach&apos;s alpha exceeding 0.85) ensures that student scores reflect genuine subject mastery rather than momentary chance or test question idiosyncrasies.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Validity, conversely, assesses whether an examination accurately measures the specific intellectual competency it claims to evaluate. Construct validity ensures that exam items test deep conceptual comprehension rather than mere rote memorization or surface-level test-taking tricks, preserving assessment integrity across educational curricula.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Exam Room Strategy: Time Allocation & Elimination Heuristics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Translating mathematical test scoring models into optimal exam performance requires tactical time management during testing sessions. When taking timed exams without negative marking, students should apply the two-pass heuristic: answering all immediate, high-confidence questions during the initial pass, while flagging complex analytical problems for a second pass.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On examinations featuring penalty deductions for incorrect answers, students should only guess when they can confidently eliminate at least two plausible distractors. Eliminating two choices on a four-option question shifts the mathematical expected value from zero to a positive +0.167 points per question, converting probabilistic risk into a strategic advantage.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering the mathematical principles behind test scoring, negative marking, and statistical curves equips scholars with the analytical insights needed to optimize exam strategy.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By understanding how raw points convert into standardized marks, students approach exams with tactical confidence and achieve their highest potential academic distinction.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Test Anxiety Mitigation & Cognitive Performance Under Pressure
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            High-stakes examinations frequently induce acute physiological and psychological stress responses, colloquially known as test anxiety. Cognitive science research demonstrates that high acute anxiety triggers working memory overload, impairing executive problem-solving speed and causing students to commit unforced computational errors on problems they easily solve during untimed practice.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To mitigate test anxiety, educational psychologists recommend systematic desensitization through full-length timed diagnostic simulations that replicate real examination environments. Implementing tactical physiological breathing exercises (such as cyclic physiological sighing) reduces sympathetic nervous system arousal, restoring prefrontal cognitive clarity during challenging test sections.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Diagnostic Post-Test Analysis & Error Categorization Rubrics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The most significant academic gains occur after test completion through structured post-test diagnostic debriefing. Rather than simply viewing raw percentage scores, diligent students categorize every missed question into one of three distinct error classes: conceptual deficits (not understanding underlying principles), tactical execution errors (misreading questions or rushing calculations), or temporal constraints (running out of allotted time).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining an error log that documents root causes and corrective takeaways transforms past mistakes into actionable study targets, ensuring exponential score improvement across future collegiate examinations.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Formative Assessment vs Summative Examination Mastery
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational researchers distinguish between formative assessments—low-stakes quizzes and diagnostic problem sets designed to monitor learning and provide ongoing feedback—and summative assessments, which evaluate cumulative competence at the end of an instructional unit. Incorporating regular formative self-testing into weekly study routines builds robust cognitive retrieval pathways that dramatically elevate performance on high-stakes summative exams.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Viewing every practice test as a diagnostic feedback mechanism rather than an absolute judgment of capability fosters a resilient academic growth mindset that fuels sustained collegiate excellence.
          </p>

        </>
      }
    >
      <TestScoreCalculatorComponent />
    </CalcPage>
  );
}
