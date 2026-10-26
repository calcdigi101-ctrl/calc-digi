import type { Metadata } from "next";
import Link from "next/link";
import SatScoreCalculatorComponent from "@/components/calcs/education/sat-score-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SatScoreDistributionPercentilesChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/sat-score-calculator";
const TITLE = "SAT Score Calculator | Total Composite, Percentile Rank & ACT Concordance";
const DESCRIPTION =
  "Calculate total SAT scores across Reading and Writing (EBRW) and Math sections (400-1600), national percentile rankings, and official ACT concordance equivalents.";

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
  { href: "/calculators/education/act-score-calculator", icon: "📊", name: "ACT Score" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/test-score-calculator", icon: "📝", name: "Test Score" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
  { href: "/calculators/education/scholarship-calculator", icon: "💵", name: "Scholarship" },
  { href: "/calculators/education/college-cost-calculator", icon: "🏛️", name: "College Cost" },
];

const FAQ_ITEMS = [
  {
    q: "How is the total SAT composite score calculated?",
    a: "The total SAT score ranges from 400 to 1600, calculated as the direct sum of two equal section scores: Evidence-Based Reading and Writing (EBRW, 200-800) and Mathematics (200-800). Each section score is derived from raw correct questions converted via proprietary College Board psychometric equating tables.",
  },
  {
    q: "How does the Digital SAT multi-stage adaptive testing system work?",
    a: "The Digital SAT operates on a multi-stage adaptive testing model. Each subject consists of two timed modules: Module 1 contains a balanced mix of easy, medium, and hard questions. Depending on your accuracy in Module 1, the test engine routes you to either an easier or harder Module 2. Performing well on Module 1 unlocks the harder second module, which is mandatory to achieve scores above 650.",
  },
  {
    q: "Is there a penalty for guessing wrong answers on the SAT?",
    a: "No. The SAT eliminated the quarter-point guessing penalty in 2016. Your score is based solely on the total number of correct questions. Students should never leave any question unanswered; even a blind guess carries a 25% mathematical probability of securing additional raw credit.",
  },
  {
    q: "What SAT score is needed for top-tier competitive universities?",
    a: "For top-20 national universities and Ivy League institutions, competitive applicant profiles typically exhibit composite SAT scores between 1500 and 1560 (placing students in the 98th to 99th+ percentiles). Combining high standardized scores with strong academic decile placement from our class rank calculator optimizes admission prospects.",
  },
];

export default function SatScoreCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> The SAT composite score represents standardized evaluation of collegiate academic readiness, administered globally by the College Board. Consisting of two section components—Evidence-Based Reading and Writing (EBRW) and Mathematics, each scaled 200 to 800—your total score out of 1600 determines college admission selectivity and automatic merit scholarship brackets. Compare section metrics with our <Link href="/calculators/education/act-score-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">ACT score calculator</Link> and track course academic records in our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: College Board SAT Total Composite Score Percentile Curve
          </h2>
          <SatScoreDistributionPercentilesChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Scholastic Assessment Test (SAT) has served as the cornerstone of American collegiate admissions for nearly a century. With the transition to the Digital SAT format, the examination employs modern psychometric algorithms and multi-stage adaptive testing. The test assesses verbal comprehension, grammatical rhetoric, algebra, advanced mathematics, problem-solving, and data analysis. Because scores are reported on a discrete 400 to 1600 scale, understanding percentile distributions is essential for targeting competitive university admissions, mirroring analysis in a <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Digital SAT Composite Scoring & Scaling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The total SAT score <Formula>{"S_{\text{total}}"}</Formula> represents the simple additive combination of the scaled Evidence-Based Reading and Writing score (<Formula>{"S_{\text{EBRW}}"}</Formula>) and the scaled Mathematics score (<Formula>{"S_{\text{Math}}"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"S_{\text{total}} = S_{\text{EBRW}} + S_{\text{Math}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where each section score satisfies <Formula>{"200 \le S \le 800"}</Formula> in standard increments of 10 points. Under the Digital SAT architecture, raw scores are not mapped via simple linear proportions. Instead, the College Board utilizes Item Response Theory (IRT), where each question possesses three mathematical parameters: item difficulty (<Formula>{"b"}</Formula>), discrimination (<Formula>{"a"}</Formula>), and pseudo-guessing (<Formula>{"c"}</Formula>).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The probability <Formula>{"P(\theta)"}</Formula> of a student with latent ability <Formula>{"\theta"}</Formula> answering question <Formula>{"i"}</Formula> correctly is modeled by the three-parameter logistic (3PL) function:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"P_i(\theta) = c_i + \frac{1 - c_i}{1 + e^{-a_i(\theta - b_i)}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because harder questions award higher discriminative value toward <Formula>{"\theta"}</Formula>, answering complex multi-step math problems correctly yields greater scaled score elevation than answering introductory arithmetic items. Students seeking to evaluate question penalty impacts and raw accuracy rates can model performance through our <Link href="/calculators/education/test-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">test score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            College Board SAT Score to National Percentile & Selectivity Conversion Schedule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays official College Board nationally representative percentiles, ACT concordance equivalents, and institutional competitiveness benchmarks:
          </p>

          <DataTable
            head={["SAT Total Score", "National Percentile", "ACT Equivalent", "University Selectivity Classification", "Admissions Standing & Honors Profile"]}
            rows={[
              ["1550 – 1600", "99th+ Percentile", "35 – 36", "Ivy League & Elite (Harvard / Stanford / MIT)", "National Merit Finalist / Full Presidential Ride"],
              ["1450 – 1540", "96th – 99th Percentile", "33 – 34", "Highly Selective (Georgetown / Michigan / UVA)", "Dean's Honors Fellowship / Merit Scholarship"],
              ["1350 – 1440", "89th – 95th Percentile", "30 – 32", "Selective State Flagships (Wisconsin / Purdue)", "Automatic Out-of-State Tuition Waiver"],
              ["1250 – 1340", "79th – 88th Percentile", "26 – 29", "Competitive Regional Universities", "Standard University Merit Grant"],
              ["1150 – 1240", "66th – 78th Percentile", "23 – 25", "Above National Average", "Standard Collegiate Admission Track"],
              ["1050 – 1140", "50th – 65th Percentile", "20 – 22", "National Median Score", "State Residency Admissible"],
              ["950 – 1040", "33rd – 49th Percentile", "18 – 19", "Below National Median", "Academic Advisory Track"],
              ["< 950", "< 33rd Percentile", "< 18", "Academic Remediation Required", "Test-Optional Admission Route Advised"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: High-Scoring STEM Candidate Target Analysis
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An engineering candidate achieves a perfect 800 on the Mathematics section but scores 680 on Evidence-Based Reading and Writing, producing an aggregate total score of 1480 (97th national percentile). While the 800 Math score demonstrates flawless quantitative readiness, the student targets an elite university where the middle-50% composite range is 1510 to 1560.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To reach the 1520 benchmark without diminishing the perfect Math score, the candidate focuses exclusively on EBRW grammar and rhetorical structure questions. Because reading speed and retention directly dictate EBRW performance, the student utilizes our <Link href="/calculators/education/reading-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">reading speed calculator</Link> to optimize pacing. Raising the EBRW score from 680 to 730 elevates the composite to 1530 (99th percentile), significantly strengthening institutional scholarship awards modeled in our <Link href="/calculators/education/scholarship-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scholarship calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Digital SAT Superscoring Across Multiple Administrations
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high school senior takes the Digital SAT twice. In the October administration, the student scores 720 on EBRW and 640 on Math (Total = 1360). In the November administration, after intensive calculus review, the student scores 670 on EBRW and 730 on Math (Total = 1400).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under College Board Score Choice and institutional superscoring policies, admissions officers combine the highest section results: 720 EBRW (from October) + 730 Math (from November) = 1450 Official Superscore. This 1450 composite elevates the student from the 93rd percentile into the 96th percentile, qualifying the applicant for automatic state honors tuition waivers that reduce out-of-pocket tuition tracked in our <Link href="/calculators/education/college-cost-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">college cost calculator</Link> and long-term repayment modeled in our <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Digital SAT Adaptive Testing Mechanics & Section Routing Architecture
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Digital SAT architecture introduces multi-stage adaptive testing (MST) to shorten testing duration to 2 hours and 14 minutes. For both Reading/Writing and Math, students complete Module 1 (27 questions for Reading/Writing, 22 questions for Math). The testing software evaluates response accuracy in real time. If the student answers approximately two-thirds of Module 1 items correctly, the algorithm routes the test-taker to the higher-difficulty Module 2.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Unlocking the harder second module is essential: a student routed to the easier second module has their maximum section score capped at approximately 600 to 620, regardless of how many items they answer correctly in Module 2. Conversely, navigating the harder second module permits scores up to the maximum 800 ceiling. Students can optimize daily study hours and timed practice sessions through our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Testing Standards & International Educational Accords
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standardized testing integrity, validity metrics, and score concordance frameworks are maintained by leading educational associations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>The College Board:</strong> Official developer and administrator of the SAT, PSAT/NMSQT, and Advanced Placement programs.
            </li>
            <li>
              <strong>National Center for Fair & Open Testing (FairTest):</strong> Research organization monitoring test-optional admissions trends and equitable evaluation practices.
            </li>
            <li>
              <strong>National Association for College Admission Counseling (NACAC Code of Ethics):</strong> Statement of principles governing equitable standardized test score evaluation in collegiate admissions.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Digital SAT Module Difficulty Routing & Item Response Theory (IRT)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under the College Board&apos;s digital adaptive testing architecture, test-takers encounter dynamic branching between Module 1 and Module 2. In Module 1, questions represent an evenly stratified distribution of low, medium, and high difficulty parameters. The test software continuously estimates the student&apos;s latent ability score (<Formula>{"\theta"}</Formula>) using maximum likelihood psychometric functions. If performance surpasses the upper threshold, the student is routed to the advanced Module 2, which presents questions with higher discrimination indices.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Securing access to the advanced module is essential for achieving competitive scores above 650 points per section. If a candidate is routed to the lower-tier module, the highest mathematically achievable section score is capped at approximately 600, regardless of whether the student achieves 100% accuracy on the second module. Consequently, test-taking coaches emphasize intense concentration during the first 25 minutes of each section, treating Module 1 as a mandatory gateway to upper-percentile admissions tiers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            College Board Sub-Scores, Cross-Test Analysis & Superscore Verification
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In addition to reporting overall section scores, official Digital SAT score reports deliver granular analytical diagnostics across sub-score categories: Heart of Algebra, Problem Solving and Data Analysis, Passport to Advanced Math, Expression of Ideas, and Standard English Conventions. Admissions committees at technological institutes and competitive business schools review these sub-scores to verify specific mathematical fluencies before granting admission into rigorous degree tracks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, collegiate institutions utilizing official College Board electronic score delivery systems automate superscore generation across all verified test administrations, granting applicants the benefit of their composite best. Combining strong standardized testing scores with rigorous secondary coursework ensures that candidates build compelling admissions portfolios that withstand holistic admissions scrutiny.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Test Day Bluebook Application Architecture & Digital Proctoring Controls
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Digital SAT is administered via the College Board&apos;s custom Bluebook testing platform, downloadable on personal laptops, school-managed Chromebooks, or iPads. The Bluebook application integrates an embedded graphing calculator (Desmos), digital annotator, reference formula sheets, and a countdown timer that students can show or hide to manage test-induced anxiety. Because the testing platform functions asynchronously without continuous internet connectivity once exams are loaded, students are shielded against local Wi-Fi drops during examination sessions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, familiarizing oneself with built-in Desmos graphing shortcuts provides substantial tactical advantages in the Math section, allowing students to verify complex polynomial intercepts and systems of equations graphically in seconds. Adopting structured digital preparation protocols ensures candidates perform with maximum speed, confidence, and accuracy.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            International educational testing centers emphasize that comprehensive test preparation should balance conceptual algebra and grammar review with timed endurance practice. Simulating complete digital test administrations eliminates pacing surprises, helping students achieve peak scaled score results on official examination day.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, understanding how individual section scores interact with collegiate scholarship formulas empowers students to make data-driven decisions regarding test retakes, maximizing their overall higher education financing opportunities.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering test pacing through focused problem-solving strategies ensures that students convert their preparation into top-tier standardized percentile standing on official exam day.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consulting official College Board diagnostic scoring grids allows candidates to target specific analytical weaknesses, unlocking higher percentile admission tiers.
          </p>

        </>
      }
    >
      <SatScoreCalculatorComponent />
    </CalcPage>
  );
}
