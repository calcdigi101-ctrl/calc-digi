import type { Metadata } from "next";
import Link from "next/link";
import AttendanceCalculatorComponent from "@/components/calcs/education/attendance-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AttendanceRateImpactThresholdChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/attendance-calculator";
const TITLE = "Attendance Calculator: Class Percentage and Bunk Planner | CalcDigi";
const DESCRIPTION =
  "Free attendance calculator. Calculate your current class attendance percentage, check how many classes you need for 75%, and see how many classes you can safely miss.";

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
    siteName: "CalcDigi",
    images: [{ url: "https://www.calcdigi.com/og-image.png", width: 1200, height: 630, alt: "Attendance Calculator - CalcDigi" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, creator: "@CalcDigi", site: "@CalcDigi" },
};

const BUNK_REFERENCE_ROWS = [
  ["30 Classes", "23 Classes", "7 Bunks", "24 Classes", "6 Bunks"],
  ["40 Classes", "30 Classes", "10 Bunks", "32 Classes", "8 Bunks"],
  ["50 Classes", "38 Classes", "12 Bunks", "40 Classes", "10 Bunks"],
  ["60 Classes", "45 Classes", "15 Bunks", "48 Classes", "12 Bunks"],
  ["75 Classes", "57 Classes", "18 Bunks", "60 Classes", "15 Bunks"],
  ["90 Classes", "68 Classes", "22 Bunks", "72 Classes", "18 Bunks"],
];

const RELATED_CALCULATORS = [
  { href: "/calculators/education/study-hours-calculator", icon: "⏱️", name: "Study Hours Calculator" },
  { href: "/calculators/education/gpa-calculator", icon: "🎓", name: "GPA Calculator" },
  { href: "/calculators/education/final-grade-calculator", icon: "🏁", name: "Final Grade Calculator" },
  { href: "/calculators/education/percentage-grade-calculator", icon: "📝", name: "Percentage Grade Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How do I calculate my current attendance percentage?",
    a: "Divide the number of classes you attended by the total number of classes held so far, then multiply by 100. For example, if your professor held 40 lectures and you showed up to 32, divide 32 by 40 to get 0.80, which is an 80% attendance rate.",
  },
  {
    q: "How many classes can I safely miss (bunk) to stay above 75%?",
    a: "Multiply your total scheduled classes for the semester by 0.25 and round down. That gives your maximum allowed absences for the whole semester. Subtract the classes you have already missed to find your remaining safe bunks. In a 40-class course, you can miss up to 10 classes in total.",
  },
  {
    q: "What happens if my attendance drops below 75 percent?",
    a: "Most colleges and universities issue an attendance warning or bar you from taking final semester examinations. Debarment typically leads to an incomplete mark or failing grade, requiring you to repeat the subject in a future term. Some schools allow appeals if you have valid medical certificates.",
  },
  {
    q: "How many consecutive classes must I attend to get back to 75%?",
    a: "Use this simple formula: 3 times Total Classes Held minus 4 times Classes Attended. For instance, if you attended 18 out of 30 classes (60%), 3 times 30 is 90, and 4 times 18 is 72. 90 minus 72 equals 18. You must attend the next 18 classes in a row without missing one to reach 75%.",
  },
  {
    q: "Do laboratory sessions and tutorials follow the same attendance rules?",
    a: "Yes. Practical lab sessions and weekly tutorials usually carry strict attendance thresholds, often requiring 80% or higher. Because labs meet less frequently, missing just two 3-hour practicals can push your attendance below the required passing mark.",
  },
  {
    q: "Can approved medical leave save me from being debarred?",
    a: "Many universities grant an attendance relaxation of 5% to 10% for documented illnesses or official university activities, lowering the threshold from 75% to 65% or 70%. You must submit official medical certificates to your department office within the designated deadline, usually within 7 days of returning to campus.",
  },
];

export default function AttendanceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/education", label: "Education and School" }}
      title="Online Attendance and Bunk Calculator (75% Rule Planner)"
      breadcrumbLabel="Attendance Calculator"
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      dateModifiedOverride="2026-11-23"
      exactFaq={true}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Student Advice:</strong> Keeping track of class attendance is essential to avoid exam debarment. Whether your college enforces a strict 75% or 80% attendance rule, this calculator helps you find your exact attendance rate, how many classes you can safely skip, and how many classes you need to attend to recover. Plan your study schedule with our <Link href="/calculators/education/study-hours-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">study hours calculator</Link> and calculate course targets with our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link>.
          </div>

          {/* Quick Answer Featured Box */}
          <div className="not-prose mb-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-5 dark:border-amber-900/40 dark:from-amber-950/20 dark:to-orange-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400">💡</span> Quick Answer: How to Calculate Attendance and Safe Bunks
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Your attendance percentage equals <strong>(Classes Attended ÷ Total Classes Held) × 100</strong>. Under the standard <strong>75% attendance rule</strong>, you must attend at least 3 out of every 4 classes. For example, if your professor has conducted 40 classes and you attended 34 of them (85%), you can safely miss 4 additional classes across a 60-class semester without falling below 75%.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            How to Use the Attendance Calculator in 4 Steps
          </h2>
          <ol className="mb-8 list-decimal space-y-2 pl-6 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Enter Classes Held:</strong> Type the total number of class sessions or lectures conducted so far.</li>
            <li><strong>Enter Classes Attended:</strong> Enter the exact number of class sessions you showed up to.</li>
            <li><strong>Set Your Target Percentage:</strong> Enter your college or university requirement (standard is 75% or 80%).</li>
            <li><strong>Add Remaining Classes (Optional):</strong> Enter upcoming classes left in the semester to forecast your final attendance status and safe bunks.</li>
          </ol>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            How Attendance Percentages Work: Safe Zone vs Warning Zone
          </h2>
          <AttendanceRateImpactThresholdChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Colleges and universities monitor student attendance throughout the term to ensure students receive adequate instructional time. Most academic departments categorize attendance into three main tiers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Safe Zone (80% and Above):</strong> You have a comfortable buffer. Missing an occasional class for personal reasons or club activities will not jeopardize your exam hall ticket.</li>
            <li><strong>Borderline Zone (75% to 79%):</strong> You meet the minimum cutoff, but you have zero margin for error. Skipping even one lecture can push you into the danger zone.</li>
            <li><strong>Warning Zone (Below 75%):</strong> You face administrative warnings and risk being barred from semester-end examinations unless you attend upcoming classes consecutively. You can track your math proportion calculations with our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Attendance Formula: How to Calculate Your Percentage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"H"}</Formula> represent the total number of class sessions held to date, and let <Formula>{"A"}</Formula> denote the number of sessions you attended. Your current attendance percentage <Formula>{"R_{\\text{current}}"}</Formula> is calculated as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"R_{\\text{current}} = \\left( \\frac{A}{H} \\right) \\times 100\\%"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To project your attendance over the entire semester, let <Formula>{"F"}</Formula> represent the scheduled future classes remaining, so that total semester classes equal <Formula>{"T = H + F"}</Formula>. If your college requires a minimum percentage <Formula>{"R_{\\text{req}}"}</Formula> (such as 75% or 80%), the maximum total absences <Formula>{"M_{\\text{abs}}"}</Formula> permitted across the full semester is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"M_{\\text{abs}} = \\left\\lfloor T \\times \\left( 1 - \\frac{R_{\\text{req}}}{100} \\right) \\right\\rfloor"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Since you have already missed <Formula>{"H - A"}</Formula> classes, your remaining allowable safe bunks <Formula>{"B_{\\text{allow}}"}</Formula> is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"B_{\\text{allow}} = \\max(0, M_{\\text{abs}} - (H - A))"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If your current percentage is below the target <Formula>{"R_{\\text{req}}"}</Formula>, the number of consecutive future classes <Formula>{"X_{\\text{need}}"}</Formula> you must attend without missing a single session to restore your eligibility is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"X_{\\text{need}} = \\left\\lceil \\frac{(R_{\\text{req}} \\times H) - (100 \\times A)}{100 - R_{\\text{req}}} \\right\\rceil"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If <Formula>{"X_{\\text{need}}"}</Formula> exceeds your remaining classes <Formula>{"F"}</Formula>, it is mathematically impossible to reach the required percentage through attendance alone. In that situation, you should immediately consult your academic advisor to explore makeup options or medical leave credit before final exams, which you can prepare for using our <Link href="/calculators/education/final-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">final grade calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Quick Bunk Guide: How Many Classes Can You Safely Miss?
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Use this reference table to check how many classes you must attend and how many lectures you can safely skip across standard course lengths:
          </p>
          <DataTable
            head={["Total Semester Classes", "Minimum Classes for 75%", "Max Safe Bunks (75%)", "Minimum Classes for 80%", "Max Safe Bunks (80%)"]}
            rows={BUNK_REFERENCE_ROWS}
            highlight={2}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2 mb-6">
            Note: Maximum safe bunks are calculated by rounding down to the nearest whole class session, ensuring your percentage never dips below the legal cutoff.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 75 Percent Attendance Rule: Why Most Colleges Enforce It
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Higher education regulatory bodies and university accreditation councils require students to attend a minimum percentage of class hours to earn academic credits. Here is why the 75% rule is standard practice:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Practical Contact Hours:</strong> Degree courses specify mandatory lecture and laboratory hours to ensure students master essential coursework.</li>
            <li><strong>Active Discussion and Collaboration:</strong> Technical and professional degrees depend on live problem solving, group presentations, and laboratory experiments that cannot be replicated at home.</li>
            <li><strong>Continuous Assessment Marks:</strong> Many college grading systems allocate 5% to 10% of total course marks directly to classroom attendance and participation, directly influencing your final grade calculated in our <Link href="/calculators/education/percentage-grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage grade calculator</Link>.</li>
            <li><strong>Financial Aid and Scholarship Requirements:</strong> Maintaining full-time student status and retaining institutional grants often requires verified attendance throughout the term.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Attendance Scenarios and Worked Examples
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Scenario 1: Engineering Student Aiming for 75% Attendance
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A student takes a 45-class course in Computer Networks. So far, the professor has conducted 30 lectures, and the student attended 21 classes, having missed 9 lectures.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The student current attendance is (21 / 30) * 100 = 70.0%, which is currently below the 75% threshold. With 15 classes remaining (45 - 30), the total allowed absences for the whole semester is floor(45 * 0.25) = 11 classes. Since the student already missed 9 classes, they can only afford to miss 2 more classes (11 - 9 = 2). To finish at or above 75%, the student must attend at least 34 total classes (ceil(45 * 0.75) = 34). With 21 classes already completed, the student must attend at least 13 of the final 15 lectures (34 - 21 = 13).
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Scenario 2: Planning Bunks Before a College Festival
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A sophomore has attended 35 out of 40 lectures in a 60-lecture semester (current attendance = 87.5%). The student wants to know how many classes they can skip during festival week without dropping below the 80% attendance mark.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For an 80% target across 60 total classes, the student must attend at least 48 classes (60 * 0.80 = 48). Total permitted absences for the semester is 12 (60 - 48 = 12). Having missed 5 classes so far (40 - 35 = 5), the student has 7 safe bunks remaining (12 - 5 = 7). The student can safely miss up to 7 more lectures across the remaining 20 classes.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            What to Do If Your Attendance Drops Below the Required Threshold
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If your attendance has slipped below 75%, take these actionable steps immediately to avoid debarment:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Calculate Your Exact Recovery Number:</strong> Use our calculator to see how many consecutive classes you must attend to cross 75%.</li>
            <li><strong>Meet with Your Professor Early:</strong> Explain your situation respectfully before the official cutoff date. Faculty appreciate proactive communication and can advise on extra credit or tutorial options.</li>
            <li><strong>Submit Official Medical Documentation:</strong> If your absences were due to illness, submit certified doctor notes or hospital discharge summaries to your academic office within institutional deadlines.</li>
            <li><strong>Do Not Miss Any Remaining Classes:</strong> Maintain 100% attendance in all future lectures, lab sessions, and tutorials. Consistent presence demonstrates commitment to academic recovery.</li>
            <li><strong>Balance Your Study Hours:</strong> Create a disciplined daily study plan using our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link> and monitor overall academic targets with our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>.</li>
          </ol>
        </>
      }
    >
      <AttendanceCalculatorComponent />
    </CalcPage>
  );
}
