import type { Metadata } from "next";
import Link from "next/link";
import StudyHoursCalculatorComponent from "@/components/calcs/education/study-hours-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CarnegieStudyHoursAllocationChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/study-hours-calculator";
const TITLE = "Study Hours Calculator | Carnegie Credit Hour Rule & Weekly Study Budget";
const DESCRIPTION =
  "Calculate recommended weekly college study hours, Carnegie unit ratios (2:1 and 3:1), daily homework scheduling, and time management feasibility across 168 hours.";

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
  { href: "/calculators/education/attendance-calculator", icon: "📅", name: "Attendance" },
  { href: "/calculators/education/reading-speed-calculator", icon: "📖", name: "Reading Speed" },
  { href: "/calculators/education/test-score-calculator", icon: "📝", name: "Test Score" },
];

const FAQ_ITEMS = [
  {
    q: "What is the official Carnegie Credit Hour Rule in higher education?",
    a: "Established in 1906 by the Carnegie Foundation for the Advancement of Teaching and codified into federal law by the US Department of Education (34 CFR § 600.2), the Carnegie Rule dictates that for every one hour spent in classroom lecture per week, an undergraduate student is expected to dedicate a minimum of two hours to outside-of-class study, reading, and assignment preparation.",
  },
  {
    q: "How many hours per week should a full-time college student study?",
    a: "A standard full-time undergraduate schedule consists of 15 semester credit hours (15 in-class hours per week). Under the standard 2:1 Carnegie baseline, students should dedicate 30 hours per week to independent study, creating a total weekly academic workload of 45 hours—equivalent to a rigorous full-time professional career.",
  },
  {
    q: "Do STEM, pre-med, and engineering courses require more study hours per credit?",
    a: "Yes. Empirical academic surveys demonstrate that quantitative STEM courses (organic chemistry, multivariable calculus, computer architecture, fluid mechanics) require a 3:1 ratio (3 outside study hours per credit hour). Enrolling in 16 credits of upper-division engineering often demands 48 hours of weekly independent study, resulting in a 64-hour total commitment.",
  },
  {
    q: "How can working college students avoid academic overload and burnout?",
    a: "Educational psychologists recommend that students working 20 or more hours per week in external employment cap their academic registration at 12 credit hours. Applying the 168-hour weekly time budget rule (subtracting 56 hours for sleep and 20 hours for work) ensures that students maintain adequate cognitive bandwidth to protect their GPA.",
  },
];

export default function StudyHoursCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> Time management in higher education is governed by the federal Carnegie Unit standard, which establishes expected independent study workloads based on enrolled semester credit hours. By multiplying your credit load by discipline-specific rigor multipliers (1.5x for general education, 2.0x for standard courses, and 3.0x for intensive STEM), this tool constructs a weekly study budget across the 168 hours of your week. Optimize your exam performance using our <Link href="/calculators/education/final-grade-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">final grade calculator</Link> and track cumulative scholastic records via our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Carnegie Unit Study Hours vs Credit Load by Academic Rigor
          </h2>
          <CarnegieStudyHoursAllocationChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The transition from secondary education to undergraduate university life presents a dramatic shift in temporal autonomy. In high school, students spend approximately 30 hours per week under direct classroom supervision, with modest outside homework demands. In contrast, collegiate education inverts this ratio: students spend only 12 to 16 hours in formal lecture halls, while remaining expected to direct 25 to 45 hours of independent learning. Calculating these weekly commitments requires time-budgeting principles identical to those in a <Link href="/calculators/datetime/hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weekly hours calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: The Carnegie 2:1 Unit Framework
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under the statutory definition codified by the US Department of Education (34 CFR &sect; 600.2), one semester credit hour represents one hour of direct faculty classroom instruction accompanied by a minimum of two hours of out-of-class student work each week across a standard 15-week semester. Let <Formula>{"C"}</Formula> represent the total enrolled semester credit hours, and let <Formula>{"R"}</Formula> denote the course rigor multiplier:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"H_{\text{base}} = C \times R"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where <Formula>{"R = 1.5"}</Formula> for introductory general education, <Formula>{"R = 2.0"}</Formula> for standard collegiate coursework (the statutory Carnegie baseline), and <Formula>{"R = 3.0"}</Formula> for rigorous quantitative STEM disciplines (organic chemistry, upper-division physics, advanced algorithms). To account for student grade ambition, let <Formula>{"M_{\text{grade}}"}</Formula> denote the target grade multiplier:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"H_{\text{study}} = H_{\text{base}} \times M_{\text{grade}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where <Formula>{"M_{\text{grade}} = 1.20"}</Formula> for students targeting straight-A mastery, <Formula>{"1.00"}</Formula> for a solid B average, and <Formula>{"0.75"}</Formula> for minimum passing competence. The total weekly academic commitment <Formula>{"H_{\text{academic}}"}</Formula> sums classroom contact hours with outside study hours:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"H_{\text{academic}} = C + H_{\text{study}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To evaluate schedule feasibility across the 168 available hours in a week, students deduct essential biological needs: 56 hours of sleep (8 hours per night) and 21 hours of dining and personal hygiene. The remaining temporal bandwidth <Formula>{"H_{\text{avail}}"}</Formula> must comfortably accommodate academic commitments alongside external employment and commute times, modeled through our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Weekly Academic Workload Standards Across Collegiate Credit Loads
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays expected weekly outside study commitments, total academic workloads, and daily study targets across varying semester credit registrations:
          </p>

          <DataTable
            head={["Credit Load", "Academic Status", "Standard Study (2:1 Rule)", "STEM Study (3:1 Rule)", "Total Weekly Academic Commitment", "Daily Study Target (5-Day Plan)"]}
            rows={[
              ["18 Credits", "Heavy Overload / Double Major", "36.0 hrs/week", "54.0 hrs/week", "54.0 – 72.0 hrs/week", "7.2 – 10.8 hrs/day"],
              ["15 Credits", "Standard Full-Time Load", "30.0 hrs/week", "45.0 hrs/week", "45.0 – 60.0 hrs/week", "6.0 – 9.0 hrs/day"],
              ["12 Credits", "Minimum Full-Time Standing", "24.0 hrs/week", "36.0 hrs/week", "36.0 – 48.0 hrs/week", "4.8 – 7.2 hrs/day"],
              ["9 Credits", "Part-Time Academic Status", "18.0 hrs/week", "27.0 hrs/week", "27.0 – 36.0 hrs/week", "3.6 – 5.4 hrs/day"],
              ["6 Credits", "Continuing Education / Working Adult", "12.0 hrs/week", "18.0 hrs/week", "18.0 – 24.0 hrs/week", "2.4 – 3.6 hrs/day"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Second-Year Mechanical Engineering Double Major
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A sophomore engineering student enrolls in 16 semester credits: Thermodynamics (3 cr), Differential Equations (4 cr), Materials Science with Lab (4 cr), Physics II (4 cr), and Engineering Seminar (1 cr). All courses represent rigorous quantitative STEM curriculum. The student targets Grade A academic distinction.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying the STEM multiplier (<Formula>{"R = 3.0"}</Formula>): baseline study hours equal <Formula>{"16 \times 3.0 = 48.0 \text{ hours/week}"}</Formula>. Applying the Grade A ambition factor (<Formula>{"1.20x"}</Formula>): total recommended study time equals <Formula>{"48.0 \times 1.20 = 57.6 \text{ study hours/week}"}</Formula>. Adding 16 in-class contact hours yields a cumulative academic commitment of <Formula>{"16 + 57.6 = 73.6 \text{ total weekly hours}"}</Formula>. Distributing this across a 6-day academic schedule requires <Formula>{"57.6 / 6 = 9.6 \text{ hours/day}"}</Formula> of outside study. Achieving this intensive reading volume requires measuring comprehension pace through our <Link href="/calculators/education/reading-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">reading speed calculator</Link> and ensuring class attendance via our <Link href="/calculators/education/attendance-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">attendance calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Working Adult Undergraduate in Humanities
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A working adult student balances a 25-hour-per-week external corporate job while completing a degree in English Literature, enrolling in 9 credits (3 standard courses). The student targets a solid B grade average to maintain good standing.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under standard rigor (<Formula>{"R = 2.0"}</Formula>) and Grade B ambition (<Formula>{"M = 1.0"}</Formula>), required study time is <Formula>{"9 \times 2.0 \times 1.0 = 18.0 \text{ study hours/week}"}</Formula>. Total academic commitment is <Formula>{"9 \text{ class} + 18 \text{ study} = 27.0 \text{ hours/week}"}</Formula>. Combined with 25 employment hours, total structured time equals <Formula>{"27 + 25 = 52.0 \text{ hours/week}"}</Formula>. Subtracting 52 hours from the 168-hour weekly budget leaves 116 hours for sleep, commuting, family, and rest, representing a balanced, sustainable educational workload that protects performance in our <Link href="/calculators/education/grade-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">grade calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 168-Hour Rule & Circadian Cognitive Fatigue Management
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every human being operates within an unbending fixed temporal boundary: exactly 168 hours per week. When undergraduate students attempt full-time study (15 credits), 30 hours of outside study, and 30 hours of external employment while maintaining an active social life, the temporal sum often exceeds available waking hours. Inevitably, the deficit is extracted from sleep, dropping sleep duration below 6 hours nightly.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Cognitive neuroscientists demonstrate that chronic sleep deprivation impairs prefrontal cortex executive functioning, degrading memory consolidation and problem-solving speed by over 30%. Consequently, a sleep-deprived student studying 50 hours per week frequently achieves lower examination scores than a well-rested peer studying 30 hours with high focus. Structuring realistic time budgets protects student health and stabilizes cumulative performance evaluated across our <Link href="/calculators/education/cgpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">CGPA calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Federal Standards & Higher Education Accreditations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Credit hour calculations, outside study expectations, and institutional contact hour benchmarks are governed by federal statutory law and collegiate accreditation authorities:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>US Department of Education (34 CFR &sect; 600.2 Definition of Credit Hour):</strong> Federal statutory mandate defining the minimum educational activities that constitute a collegiate credit hour for Title IV funding.
            </li>
            <li>
              <strong>Carnegie Foundation for the Advancement of Teaching:</strong> Historical architects of the standardized Carnegie Unit system for secondary and post-secondary educational accounting.
            </li>
            <li>
              <strong>Association of American Colleges and Universities (AAC&amp;U):</strong> Research reports on collegiate student engagement, high-impact learning practices, and temporal workload balancing.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cognitive Science of Study Efficiency: Active Recall vs Passive Review
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Educational cognitive psychologists emphasize that the quality and cognitive intensity of outside study hours matters far more than raw temporal quantity. Spending four hours passively highlighting textbook passages or reviewing lecture slides produces an &lsquo;illusion of competence,&rsquo; where familiar prose is mistaken for true mastery. In contrast, rigorous active learning techniques—such as self-testing with flashcards, teaching complex mechanisms to study peers (the Feynman technique), and working through unseen practice problem sets—demand greater focused energy but dramatically accelerate long-term memory encoding.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consequently, an undergraduate applying high-efficiency active recall strategies for 25 hours per week routinely outperforms peers studying 45 hours through unstructured, passive methods. Combining focused study blocks with deliberate cognitive pauses maximizes intellectual endurance and protects mental wellbeing.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Balancing Employment, Extracurriculars & The Carnegie Time Budget
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern college students frequently balance full-time academic credit registrations alongside external employment, family caregiving responsibilities, and student organization leadership. When external employment commitments exceed 15 to 20 hours weekly, collegiate retention research demonstrates a sharp increase in course withdrawal rates and academic probation warnings. Academic success counselors recommend treating each enrolled credit hour as approximately three total hours of weekly professional commitment (one hour in class plus two hours outside study).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under this professional equivalence, enrolling in 15 credits represents a 45-hour full-time career. Adding 20 hours of external employment pushes the cumulative weekly commitment to 65 hours, leaving minimal buffer for illness, emergencies, or personal rest. Working students should consult academic advisors to explore part-time 9-credit registrations or flexible online course deliveries that preserve degree momentum without inducing catastrophic academic fatigue.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Syllabus Pacing Calendars & Distributed Study Block Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Academic success counselors recommend transforming the Carnegie study hour calculation into actionable weekly pacing calendars at the beginning of each semester. By mapping syllabus assignment deadlines, midterm exam dates, and term project milestones onto a comprehensive 15-week timeline, students can anticipate peak academic surges and allocate extra study blocks proactively, preventing stressful last-minute cramming sessions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, scheduling study blocks during peak circadian cognitive alertness windows—typically mid-morning and early afternoon—enhances conceptual comprehension and analytical problem-solving speed. Treating independent study as a fixed, non-negotiable professional appointment establishes healthy academic discipline that supports sustained scholarly success throughout undergraduate and graduate study.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ultimately, mastering collegiate time management transforms the undergraduate experience from an overwhelming source of chronic stress into an empowering journey of intellectual discovery, personal growth, and academic accomplishment.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By aligning daily study habits with the proven Carnegie framework, students protect their GPA, maintain physical health, and position themselves for competitive post-graduate professional success.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Embracing structured daily study habits and intentional time management shields students from burnout, paving the way for sustainable collegiate achievement and rewarding career development.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Balanced weekly scheduling fosters deep intellectual mastery, equipping undergraduate scholars with the organizational habits needed for lifelong professional leadership.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Disciplined daily scheduling ensures that students consistently achieve their highest academic potential without sacrificing health.
          </p>

        </>
      }
    >
      <StudyHoursCalculatorComponent />
    </CalcPage>
  );
}
