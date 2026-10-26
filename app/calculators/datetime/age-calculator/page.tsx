import type { Metadata } from "next";
import Link from "next/link";
import AgeCalculatorComponent from "@/components/calcs/datetime/age-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LifeStageChronologicalDistributionChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/age-calculator";
const TITLE = "Exact Age Calculator | Chronological Lifespan & Leap Year Precision";
const DESCRIPTION =
  "Calculate your exact chronological age in years, months, days, hours, and minutes with leap-year compensation, actuarial life expectancy tables, and generational demographic milestones.";

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
  { href: "/calculators/datetime/birthday-calculator", icon: "🎂", name: "Birthday Calculator" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/datetime/leap-year-calculator", icon: "🗓️", name: "Leap Year Calculator" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the algorithm calculate exact age across varying month lengths and leap years?",
    a: "The algorithm computes chronological age by decomposing the temporal delta between your birth date and the observation date into full calendar years, residual months, and residual days. When the observation day of the month is smaller than the birth day, the algorithm borrows the exact number of days from the immediately preceding calendar month (which may be 28, 29, 30, or 31 days depending on whether it is a leap year), ensuring 100% mathematical precision without naive 30-day rounding errors.",
  },
  {
    q: "How are leap day birthdays (February 29) handled in common non-leap years?",
    a: "Under common law and civil registration conventions in the United States and the United Kingdom, individuals born on February 29 legally attain their next age threshold on March 1 in non-leap years, while several European and Asian jurisdictions designate February 28. Our calculator evaluates exact calendar anniversaries and allows users to model both astronomical solar orbital returns and statutory administrative definitions.",
  },
  {
    q: "What is the mathematical difference between chronological age and biological age?",
    a: "Chronological age measures the absolute elapsed solar orbital time since birth based on standard Gregorian calendar coordinates. In contrast, biological age (phenotypic age) evaluates cellular senescence, DNA methylation epigenetic clocks (such as the Horvath multi-tissue clock), telomere attrition, and cardiovascular biomarkers, often diverging from chronological age by 5 to 15 years depending on metabolic lifestyle factors.",
  },
  {
    q: "Why do actuarial life expectancy calculations change as an individual gets older?",
    a: "Actuarial tables published by the Social Security Administration (SSA OASDI) evaluate conditional survival probability P(T > t + s | T > t). Because an individual who reaches age 65 has already survived the mortal hazards of infancy, adolescence, and mid-life diseases, their projected total lifespan is systematically higher than the statistical life expectancy assigned at birth, adding roughly 18 to 21 additional projected years.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/datetime", label: "Date & Time" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Chronological Precision Guidance:</strong> Exact chronological age measures elapsed calendar intervals across non-uniform month lengths and quadrennial leap days. For legal contracts, insurance underwriting, and medical pediatric staging, cross-reference upcoming anniversaries in our <Link href="/calculators/datetime/birthday-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">birthday calculator</Link>, track elapsed calendar intervals with our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, or evaluate metric durations in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Chronological Lifespan Architecture: Calendar Mechanics & Human Development
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Chronological age is the foundational temporal coordinate of human civilization, governing legal emancipation, compulsory education enrollment, contractual competence, driving licensure, voting eligibility, and statutory retirement entitlements. While human intuition perceives time as a continuous homogeneous flow, civil timekeeping relies on the Gregorian solar calendar, an astronomical compromise featuring irregular month spans (28 to 31 days) and quadrennial intercalary leap days designed to track Earth&apos;s tropical orbital period of 365.24219 mean solar days.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In developmental pediatrics and gerontology, human life divides into distinct sociological and biological epochs. The chart below illustrates the actuarial span of modern demographic milestones across educational formation, career peak mastery, and post-employment retirement horizons based on OECD cohort statistics.
          </p>

          <LifeStageChronologicalDistributionChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Derivation of Exact Calendar Age
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Computing exact age between a birth date B = (Y_b, M_b, D_b) and an observation date A = (Y_a, M_a, D_a) requires borrow-and-carry modulo arithmetic across non-uniform calendar bases. The naive subtraction of calendar years (Y_a - Y_b) produces an error whenever the observation date precedes the individual&apos;s annual birth anniversary.
          </p>
          <Formula>{"\text{Age}_{\text{years}} = Y_a - Y_b - \mathbb{I}\left( (M_a < M_b) \lor (M_a = M_b \land D_a < D_b) \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where indicator function I evaluates to 1 if the annual anniversary has not yet occurred in the current observation year, and 0 otherwise. When decomposing residual days, if D_a &lt; D_b, the algorithm borrows the day count L_prev of the month immediately preceding M_a:
          </p>
          <Formula>{"D_{\text{residual}} = D_a - D_b + L_{\text{prev}}(Y_a, M_a - 1), \quad M_{\text{residual}} = (M_a - M_b - 1) \pmod{12}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For total continuous solar days elapsed, astronomical algorithms convert both calendar dates into continuous Julian Day Numbers (JDN), eliminating calendar irregularities entirely:
          </p>
          <Formula>{"\Delta \text{Days} = \text{JDN}(Y_a, M_a, D_a) - \text{JDN}(Y_b, M_b, D_b)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This continuous day count forms the empirical basis for actuarial mortality tables, neonatal developmental screening percentiles, and commercial insurance risk scoring. To analyze how individual day totals impact long-term financial milestones, explore our <Link href="/calculators/finance/retirement-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">retirement calculator</Link> and calculate compounding health metrics in our <Link href="/calculators/health/bmi-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">BMI calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Actuarial Demographics & Biological Life Stage Reference Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes demographic cohort definitions, physiological developmental milestones, and median statistical life expectancy benchmarks based on World Health Organization (WHO) and United Nations Population Division data:
          </p>
          <DataTable
            head={["Life Stage Classification", "Age Bracket (Years)", "Primary Biological & Social Milestones", "Median Remaining Life Expectancy", "Standard Legal Milestones"]}
            rows={[
              ["Infancy & Toddlerhood", "0 to 2 Years", "Rapid neurodevelopment, sensorimotor maturation", "79.4 Years", "Birth registration, pediatric vaccine schedule"],
              ["Early Childhood", "3 to 5 Years", "Language acquisition, primary socialization", "76.5 Years", "Preschool / Kindergarten eligibility"],
              ["Middle Childhood", "6 to 11 Years", "Concrete operational cognition, motor mastery", "71.6 Years", "Compulsory elementary primary education"],
              ["Adolescence", "12 to 17 Years", "Pubertal endocrine surge, formal reasoning", "65.8 Years", "Secondary education, youth athletic brackets"],
              ["Emerging Adulthood", "18 to 25 Years", "Prefrontal cortex myelination, tertiary schooling", "60.0 Years", "Full contractual capacity, voting rights, driving"],
              ["Early Career Prime", "26 to 39 Years", "Peak metabolic capacity, reproductive prime", "50.4 Years", "Independent underwriting, mortgage qualification"],
              ["Middle Adulthood", "40 to 59 Years", "Presbyopia onset, peak cognitive crystalization", "37.2 Years", "Statutory pension accrual, preventive screenings"],
              ["Mature Seniority", "60 to 74 Years", "Cellular senescence, cardiovascular changes", "23.5 Years", "Social Security / Medicare qualification"],
              ["Advanced Longevity", "75 to 89 Years", "Decreased physiological reserve, frailty risks", "12.1 Years", "Long-term elder care benefits, asset succession"],
              ["Centenarian Horizon", "90+ Years", "Extreme genetic resilience, DNA repair efficiency", "4.6 Years", "Actuarial super-longevity cohort threshold"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Pediatric Clinical Milestone Calculation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a pediatric endocrinologist evaluating an infant born on March 29, 2024 (a leap year) during a clinical consultation on October 15, 2026. The clinician must establish exact chronological age down to days to verify growth chart percentiles against WHO standard deviation score (Z-score) tables:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Year Component Evaluation):</strong> Birth year Y_b = 2024, observation year Y_a = 2026. Gross delta = 2026 - 2024 = 2 years. Since the observation date (October 15) occurs after the annual birth anniversary (March 29), the full 2 years have elapsed: Age_years = 2.</li>
            <li><strong>Step 2 (Month Component Evaluation):</strong> Observation month M_a = 10 (October), birth month M_b = 3 (March). Gross month delta = 10 - 3 = 7 months. However, because observation day (15) is less than birth day (29), one month must be borrowed: Net months = 7 - 1 = 6 months.</li>
            <li><strong>Step 3 (Day Component Evaluation with Calendar Borrowing):</strong> The preceding month is September (M = 9), which contains exactly 30 days. Borrowing 30 days yields: Net days = (15 - 29) + 30 = 16 days.</li>
            <li><strong>Step 4 (Total Exact Age Synthesis):</strong> The infant is precisely <strong>2 years, 6 months, and 16 days old</strong>. In continuous days, computing JDN yields 930 total elapsed solar days, encompassing the intercalary day of February 29, 2024. Cross-reference pediatric feeding guidelines in our <Link href="/calculators/baby/baby-feeding-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">baby feeding calculator</Link> and track nutritional ratios in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Intercalary Leap Days & Legal Status of February 29 Birthdays
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Individuals born on an intercalary leap day (February 29, known as &apos;leaplings&apos; or &apos;leapers&apos;) face unique statutory legal conditions during common 365-day years. Statistically, the probability of being born on February 29 is 1 in 1,461 (approximately 0.0684%), reflecting the 97 leap years present in every 400-year Gregorian cycle.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In British statutory law under the Calendar (New Style) Act 1750 and subsequent judicial rulings, a person born on February 29 attains legal majority (such as turning 18 or 21) on March 1 of a non-leap year. Conversely, in New Zealand and Taiwan, civil legislation explicitly provides that the anniversary of February 29 falls on February 28. To analyze quadrennial divisibility rules and astronomical solar drift, consult our dedicated <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Biological Cellular Senescence vs. Chronological Solar Time
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While chronological age advances monotonically at exactly 1.0 solar years per terrestrial orbit, modern biogerontology distinguishes chronological age from biological vitality. Cellular senescence is governed by the Hayflick limit—the finite capacity of differentiated human somatic cells to divide approximately 40 to 60 times before telomeric exhaustion induces permanent cell-cycle arrest.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Epigenetic clocks developed by Steve Horvath quantify biological age by measuring DNA methylation cytosine-phosphate-guanine (CpG) dinucleotide profiles across human tissues. Chronic metabolic inflammation, oxidative stress, and sedentary lifestyle accelerate epigenetic age acceleration (EAA), causing 45-year-old individuals to exhibit biological tissue profiles equivalent to 55-year-old cohorts. Maintaining caloric balance via our <Link href="/calculators/health/calorie-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">calorie calculator</Link> and tracking metabolic heart rate thresholds optimizes biological longevity.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Actuarial Gompertz-Makeham Mortality Law & Hazard Rate Kinetics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In quantitative actuarial science and demographic life insurance underwriting, human mortality hazard rates obey the Gompertz-Makeham law of mortality. The mathematical formulation defines the force of mortality mu(x) at chronological age x as the sum of an age-independent extrinsic hazard component alpha and an age-dependent intrinsic senescent component that scales exponentially with chronological age:
          </p>
          <Formula>{"\mu(x) = \alpha + \beta \cdot e^{\gamma x}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where alpha accounts for accidental deaths and extrinsic environmental hazards, beta represents basal vulnerability, and gamma characterizes the biological rate of exponential aging (typically corresponding to a mortality doubling time of roughly 8.0 years in modern industrialized nations). By incorporating Gompertzian hazard dynamics into institutional pension risk management, life insurance actuaries price defined-benefit annuities and forecast aggregate pension solvency over multi-decade horizons.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Historical Calendrical Epoch Reforms: The Papal Intercalary Shift of 1582
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Calculating historical ages across ancient, medieval, and early modern epochs mandates adjustment for calendar transitions. Under the classical Julian calendar introduced by Julius Caesar in 46 BCE, a leap day was inserted unconditionally every four years, assuming an average tropical year length of exactly 365.25 mean solar days.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because the true astronomical tropical year is approximately 365.24219 days, the Julian calendar accumulated an error of roughly 11 minutes and 14 seconds annually, drifting out of phase with the vernal equinox by approximately 3 days every four centuries. By October 1582, when Pope Gregory XIII issued the papal bull Inter gravissimas, the astronomical calendar had drifted by 10 full days. Ten days were dropped from the civil calendar—October 4, 1582 was immediately followed by October 15, 1582. Historians calculating exact historical lifespans for individuals living across this transition (such as William Shakespeare or Isaac Newton) apply Old Style (OS) and New Style (NS) coordinate shifts.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Insurance Underwriting, Legal Jurisprudence & Sports Bracketing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Precise age calculation is indispensable across commercial insurance underwriting. Life insurance policies calculate actuarial premiums based on &apos;age nearest birthday&apos; (ANB), where an individual who is 44 years, 6 months, and 1 day old is underwritten at age 45 rates, creating substantial rate inflection points. In judicial courts, chronological age establishes age of consent, juvenile court versus adult court jurisdiction, and the exact eligibility date for social security retirement drawdowns.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international athletics and youth sports development, the Relative Age Effect (RAE) demonstrates that children born immediately after eligibility cutoff dates (e.g., January 1 for FIFA youth soccer) possess systematic physical advantages over children born eleven months later in the same cohort. For scheduling project tasks and business sprints, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and convert shift hours in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link>, or visit the comprehensive <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>.
          </p>
        </>
      }
    >
      <AgeCalculatorComponent />
    </CalcPage>
  );
}
