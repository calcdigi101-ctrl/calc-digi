import type { Metadata } from "next";
import Link from "next/link";
import ActScoreCalculatorComponent from "@/components/calcs/education/act-score-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ActScorePercentileDistributionChart } from "@/components/flagship/education/editorial-charts";

const PATH = "/calculators/education/act-score-calculator";
const TITLE = "ACT Score Calculator | Composite Score, STEM Benchmark & Percentile Rank";
const DESCRIPTION =
  "Calculate official ACT composite scores, STEM and ELA benchmarks, section point averages, and national percentile ranks across English, Math, Reading, and Science.";

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
  { href: "/calculators/education/sat-score-calculator", icon: "📐", name: "SAT Score" },
  { href: "/calculators/education/gpa-calculator", icon: "📚", name: "GPA Calculator" },
  { href: "/calculators/education/test-score-calculator", icon: "📝", name: "Test Score" },
  { href: "/calculators/education/class-rank-calculator", icon: "🏆", name: "Class Rank" },
  { href: "/calculators/education/scholarship-calculator", icon: "💵", name: "Scholarship" },
  { href: "/calculators/education/college-cost-calculator", icon: "🏛️", name: "College Cost" },
];

const FAQ_ITEMS = [
  {
    q: "How is the official ACT composite score calculated?",
    a: "The ACT composite score is the unweighted arithmetic mean of four section scores: English, Mathematics, Reading, and Science, each scored on a scale from 1 to 36. The average of these four sections is rounded to the nearest whole integer: decimals of 0.50 or higher round up to the next integer, while decimals below 0.50 round down.",
  },
  {
    q: "What is the difference between an ACT composite score and an ACT superscore?",
    a: "An individual composite score reflects performance on a single test administration. An ACT superscore recalculates your composite by taking your highest individual section scores across all test dates you have completed and computing a new arithmetic mean. Over 80% of competitive US colleges accept official ACT superscoring.",
  },
  {
    q: "Is there a penalty for incorrect guesses on the ACT?",
    a: "No. The ACT enforces rights-only scoring: your raw score equals the total number of correctly answered questions with zero deductions for incorrect answers or blank responses. Consequently, students should never leave any bubble blank on test day, as random guessing preserves a 20% to 25% statistical probability of gaining extra raw points.",
  },
  {
    q: "What ACT score is considered competitive for Ivy League and top-20 universities?",
    a: "For top-20 national universities and Ivy League institutions, competitive applicant profiles typically fall within the middle 50% composite band of 33 to 35, placing candidates in the 98th to 99th national percentiles. Combining strong test scores with high weighted standing from our GPA calculator maximizes admission competitiveness.",
  },
];

export default function ActScoreCalculatorPage() {
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
            <strong>Quick Academic Guidance:</strong> The ACT composite score provides standardized evaluation of college readiness across secondary school graduates. Calculated as the arithmetic average of English, Mathematics, Reading, and Science sections (each scaled 1 to 36), your composite score determines national percentile ranking and automatic merit aid qualifications. Compare your standardized performance against our <Link href="/calculators/education/sat-score-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">SAT score calculator</Link> and track course academic standing in our <Link href="/calculators/education/gpa-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">GPA calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Official ACT Composite Score to US National Percentile Distribution
          </h2>
          <ActScorePercentileDistributionChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Across secondary education in the United States and international international schools, the ACT examination serves as a premier standardized college entrance assessment. Administered by ACT, Inc., the test evaluates core academic proficiencies across four foundational subject batteries: English (75 questions, 45 minutes), Mathematics (60 questions, 60 minutes), Reading (40 questions, 35 minutes), and Science Reasoning (40 questions, 35 minutes). Because section scores are averaged into an integer composite, small individual section improvements can produce significant shifts in national percentile standing, utilizing principles found in a <Link href="/calculators/math/weighted-average-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weighted average calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Composite Rounding & Specialized Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"E"}</Formula>, <Formula>{"M"}</Formula>, <Formula>{"R"}</Formula>, and <Formula>{"S"}</Formula> represent the scaled section scores earned on the English, Mathematics, Reading, and Science sections respectively, where each score satisfies <Formula>{"1 \le \text{Score} \le 36"}</Formula>. The raw unrounded composite mean <Formula>{"\mu_{\text{ACT}}"}</Formula> is given by:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\mu_{\text{ACT}} = \frac{E + M + R + S}{4}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The official composite score <Formula>{"C_{\text{ACT}}"}</Formula> is determined by standard half-up arithmetic rounding to the nearest whole integer:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"C_{\text{ACT}} = \left\lfloor \mu_{\text{ACT}} + 0.5 \right\rfloor"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This discrete rounding threshold produces crucial tactical implications: an unrounded mean of 31.50 rounds upward to a 32 composite score, whereas a mean of 31.25 rounds downward to a 31. Gaining a single additional point on any one section raises the four-section sum by 1, elevating the unrounded mean by <Formula>{"1/4 = 0.25"}</Formula>, which can instantly trigger the upward rounding threshold.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Beyond the composite score, ACT reports specialized sub-indices utilized by university admissions committees. The official ACT STEM Score evaluates readiness for collegiate calculus and physics:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\text{STEM Score} = \frac{M + S}{2}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, the official ACT ELA Score (English Language Arts) averages English and Reading scores with optional Writing sub-scores. Tracking question accuracy across timed sections can be modeled using our <Link href="/calculators/education/test-score-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">test score calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Official ACT Composite Score to US National Percentile Conversion Schedule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays official College Board and ACT concordance percentiles, showing applicant competitiveness across selective higher education institutions:
          </p>

          <DataTable
            head={["ACT Composite", "National Percentile", "SAT Concordance Equivalent", "Collegiate Competitiveness Tier", "Automatic Merit Scholarship Alignment"]}
            rows={[
              ["36", "100th (Top 0.1%)", "1570 – 1600", "Top 1% Elite (Ivy League / Caltech / MIT)", "Full Presidential Ride (Tier 1)"],
              ["35", "99th Percentile", "1530 – 1560", "Highly Competitive (Stanford / Duke / Chicago)", "Full Tuition Fellowship"],
              ["34", "99th Percentile", "1490 – 1520", "Very Competitive (Northwestern / Johns Hopkins)", "Major Institutional Honors"],
              ["32", "97th Percentile", "1420 – 1440", "Competitive (Top Public Flagships / UC Berkeley)", "Dean's Merit Scholarship"],
              ["30", "93rd Percentile", "1360 – 1380", "Selective State Universities", "High State Grant Eligibility"],
              ["28", "88th Percentile", "1300 – 1320", "Above Average College Ready", "Standard Merit Subsidy"],
              ["24", "74th Percentile", "1160 – 1190", "National Average Benchmark", "General Admission Qualified"],
              ["20", "53rd Percentile", "1030 – 1050", "National Median Score", "State Residency Admissible"],
              ["< 18", "< 41st Percentile", "< 980", "Academic Remediation Recommended", "Test-Optional Pathway Advised"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Academic Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: STEM Applicant Targeting Engineering Admissions
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A high school junior targeting top-tier mechanical engineering programs takes the ACT in April, scoring: English 27, Mathematics 35, Reading 29, and Science 34. The student wishes to determine their composite score and STEM benchmark standing.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The sum of the four section scores is <Formula>{"27 + 35 + 29 + 34 = 125"}</Formula>. The unrounded arithmetic mean equals <Formula>{"125 / 4 = 31.25"}</Formula>. Because the decimal portion (0.25) is strictly less than 0.50, standard half-up rounding yields an official composite score of 31 (95th national percentile). However, the student&apos;s STEM score equals <Formula>{"(35 + 34) / 2 = 34.5"}</Formula>, which places the student in the top 1% nationally for quantitative reasoning. Retaking the test and raising English from 27 to 28 would push the four-test sum to 126 (<Formula>{"126 / 4 = 31.50"}</Formula>), triggering an upward round to a 32 composite. Managing preparation hours for this targeted retest can be planned through our <Link href="/calculators/education/study-hours-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">study hours calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Humanities Pre-Law Scholar Composite Superscoring
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A senior targeting competitive liberal arts honors colleges sits for two separate ACT administrations. In the first sitting (October), the student scores: English 35, Math 24, Reading 36, and Science 25 (Composite = <Formula>{"120 / 4 = 30"}</Formula>). In the second sitting (December), the student scores: English 33, Math 28, Reading 34, and Science 29 (Composite = <Formula>{"124 / 4 = 31"}</Formula>).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under official ACT superscoring policies, university admissions committees extract the student&apos;s highest performance across each individual section: English 35 (from October), Math 28 (from December), Reading 36 (from October), and Science 29 (from December). The superscored section sum equals <Formula>{"35 + 28 + 36 + 29 = 128"}</Formula>. The resulting superscore composite is <Formula>{"128 / 4 = 32.00"}</Formula>, vaulting the applicant into the 97th national percentile. This elevates the candidate&apos;s class competitiveness in our <Link href="/calculators/education/class-rank-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">class rank calculator</Link> and qualifies the student for higher institutional awards modeled in our <Link href="/calculators/education/scholarship-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scholarship calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            College Board & ACT Official Concordance & Holistic Admissions Policies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 2018, the College Board and ACT, Inc. released official mutual concordance tables based on a sample of hundreds of thousands of students who completed both assessments. Admissions committees use these concordance formulas to evaluate ACT scores alongside SAT equivalents on a standardized curve. For example, an ACT composite of 34 correlates directly with an SAT score of 1500, while an ACT of 30 correlates with an SAT of 1370.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While test-optional admissions policies have expanded across post-pandemic higher education, submitting a strong standardized test score (above a college&apos;s 50th percentile) provides decisive leverage for non-need-based merit scholarships and honors program placement. Students can evaluate comprehensive degree budgets and repayment forecasts through our <Link href="/calculators/education/college-cost-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">college cost calculator</Link> and <Link href="/calculators/education/student-loan-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">student loan calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Testing Standards & National Regulatory Bodies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            ACT administration, score validity, and accommodation standards are regulated by statutory testing guidelines and collegiate organizations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>National Association for College Admission Counseling (NACAC):</strong> Best practices for standardized testing use in holistic undergraduate admissions.
            </li>
            <li>
              <strong>American Psychological Association (APA Standards for Educational Testing):</strong> Technical criteria for test reliability, validity, and freedom from cultural bias.
            </li>
            <li>
              <strong>ACT College and Career Readiness Benchmarks:</strong> Empirical empirical indicators establishing score cutoffs that predict a 75% probability of earning a grade of C or higher in first-year collegiate courses.
            </li>
          </ul>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychometric Equating, Raw-to-Scale Concordance & Test Security Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because individual ACT test administrations vary subtly in difficulty, ACT psychometricians employ advanced Item Response Theory (IRT) and equating methodologies to ensure that a scaled score of 30 represents identical academic mastery regardless of whether a student tested in September, December, or April. Equating adjusts raw score conversion tables across testing dates: on an unusually challenging Mathematics battery, answering 54 out of 60 questions correctly might yield a scaled 33, whereas on a standard administration, 54 correct items might convert to a scaled 31.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This rigorous statistical equating neutralizes testing date variance, ensuring admissions committees treat scores across distinct cohorts equitably. Furthermore, ACT implements stringent security and biometric proctoring verification to prevent testing fraud, maintaining the absolute integrity of official score reporting sent to collegiate clearinghouses.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Test Day Tactical Time Management & Section-by-Section Pacing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The defining cognitive challenge of the ACT is pacing: with 215 questions packed into 175 minutes of total testing time, candidates have an average of less than 50 seconds per question. In the English section (75 items in 45 minutes), students must sustain a rapid rhythm of 36 seconds per item. In the Science Reasoning section (40 items in 35 minutes), candidates must interpret complex data graphs and conflicting research hypotheses within 52 seconds per question.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Expert test strategists emphasize the 'triage pass' technique: completing straightforward data interpretation and grammar items on the first pass while deferring complex multi-step physics calculations to the final minutes. Adhering to structured pacing ensures that candidates never run out of time before reviewing answer bubbles, maximizing raw score conversion.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Longitudinal College Readiness Benchmarks & Post-Secondary Predictive Validity
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            ACT research establishes empirical College Readiness Benchmarks corresponding to specific section scores: 18 in English (predicting success in introductory composition), 22 in Mathematics (college algebra), 22 in Reading (social sciences), and 23 in Science (college biology). According to longitudinal validity studies tracking hundreds of thousands of undergraduate freshmen, students who achieve these benchmark thresholds possess a 50% probability of earning a grade of B or higher, and an approximate 75% probability of earning a grade of C or higher in corresponding first-year courses.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, students scoring below empirical readiness benchmarks frequently encounter prerequisite credit remediation requirements, requiring non-credit development coursework during their freshman year. Understanding these benchmark cutoffs empowers high school seniors to strategically target specific section improvements rather than pursuing unfocused retests, optimizing their college entrance trajectory.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Counseling professionals advise students to consult with secondary school test coordinators regarding fee waiver programs and official accommodation requests, ensuring that every applicant accesses necessary resources for fair, standardized testing representation.
          </p>

        </>
      }
    >
      <ActScoreCalculatorComponent />
    </CalcPage>
  );
}
