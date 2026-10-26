import type { Metadata } from "next";
import Link from "next/link";
import MonthCalculatorComponent from "@/components/calcs/datetime/month-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SynodicVsSiderealLunarMonthPhasesChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/month-calculator";
const TITLE = "Month Calculator | Months Between Dates & Lunar Synodic Cycles";
const DESCRIPTION =
  "Add or subtract months, calculate month spans, and explore the astronomical origins of Roman calendar months, synodic lunar cycles, and corporate fiscal quarters.";

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
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/datetime/week-number-calculator", icon: "🗓️", name: "Week Number" },
  { href: "/calculators/datetime/year-calculator", icon: "📆", name: "Year Calculator" },
  { href: "/calculators/datetime/age-calculator", icon: "🎂", name: "Age Calculator" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why do calendar months have varying lengths of 28, 29, 30, and 31 days?",
    a: "Modern calendar month lengths derive from Roman calendar reforms. The early Roman 10-month calendar of Romulus was expanded by Numa Pompilius to 12 months with February as an end-of-year month. In 46 BCE, Julius Caesar established the alternating 30 and 31-day scheme with February retaining 28 days (and 29 in leap years), abandoning erratic lunar month synchronization in favor of an orderly solar cycle.",
  },
  {
    q: "What is the difference between a Synodic lunar month and a Sidereal lunar month?",
    a: "A sidereal month (approx. 27.32 days) measures the Moon's orbital period around Earth relative to distant fixed background stars. A synodic month (approx. 29.53 days) measures the Moon's orbital phase cycle from New Moon to the next New Moon. Because Earth orbits the Sun while the Moon orbits Earth, the Moon must travel an additional 2.2 days of orbital arc to realign between Earth and the Sun.",
  },
  {
    q: "How does end-of-month date arithmetic handle adding a month to January 31?",
    a: "In commercial date math, adding 1 month to January 31 creates an overflow paradox because February has only 28 (or 29) days. Standard software implementations either apply 'month-end clamping' (resolving to February 28/29) or 'carry-over overflow' (advancing into March 2 or 3). Clamping to the last valid day of the target month is the universal standard in corporate accounting.",
  },
  {
    q: "How are corporate fiscal quarters structured across the 12 calendar months?",
    a: "A standard calendar year divides into four equal quarters: Q1 (Jan-Mar, 90/91 days), Q2 (Apr-Jun, 91 days), Q3 (Jul-Sep, 92 days), and Q4 (Oct-Dec, 92 days). In corporate retail accounting, organizations frequently use the National Retail Federation (NRF) 4-4-5 calendar, grouping months into repeating 4-week, 4-week, and 5-week patterns so each quarter contains exactly 13 weeks.",
  },
];

export default function MonthCalculatorPage() {
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
            <strong>Calendar Month Arithmetic Guidance:</strong> Adding or subtracting months requires modulo 12 arithmetic and month-end date clamping. In commercial billing, financial forecasting, and gestational tracking, cross-reference calendar intervals in our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, track fiscal weeks in our <Link href="/calculators/datetime/week-number-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">week number calculator</Link>, or look up annual cycles in our <Link href="/calculators/datetime/year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">year calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Lunar Month Periods: Synodic, Sidereal &amp; Solar Months
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The word &apos;month&apos; shares deep linguistic cognates with &apos;moon&apos; across all Indo-European languages, tracing its heritage to ancient lunisolar calendars that tracked the visible waxing and waning phases of the Moon. In modern astrophysics, celestial mechanicians differentiate between several distinct definitions of a lunar month depending on the reference frame utilized.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As shown in the comparative chart below, an astronomical synodic lunar month averages 29.53059 days, whereas civil Gregorian solar months range from 28 to 31 days, averaging approximately 30.4375 days across a standard 365.2425-day year.
          </p>

          <SynodicVsSiderealLunarMonthPhasesChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Derivation of Month-Offset Arithmetic
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Given a starting date with year Y_1 and zero-based month M_1 in &#123;0, 1, ..., 11&#125;, adding an integer month offset Delta M requires evaluating both quotient and remainder modulo 12:
          </p>
          <Formula>{"M_{\text{target}} = (M_1 + \Delta M) \pmod{12}, \quad Y_{\text{target}} = Y_1 + \left\lfloor \frac{M_1 + \Delta M}{12} \right\rfloor"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When computing the target day D_target from initial day D_1, calendar boundary clamping must be enforced against the maximum allowable days L(Y_target, M_target) in the target month:
          </p>
          <Formula>{"D_{\text{target}} = \min\left( D_1, \; L(Y_{\text{target}}, M_{\text{target}}) \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For example, adding 1 month to August 31 yields: M_target = (7 + 1) mod 12 = 8 (September). Because September has only 30 days, clamping evaluates min(31, 30) = September 30. Conversely, calculating the gross month delta between two dates (Y_1, M_1) and (Y_2, M_2) follows the continuous affine relation:
          </p>
          <Formula>{"\Delta M_{\text{gross}} = (Y_2 - Y_1) \times 12 + (M_2 - M_1) - \mathbb{I}(D_2 < D_1)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This formulation underpins commercial subscription billing cycles, amortizing residential mortgages, and enterprise lease schedules. To verify financial ratios, explore our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link> and calculate compounding investment returns in our <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">compound interest calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Gregorian Month Benchmarks &amp; Roman Calendrical Evolution
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles the historical etymology, standard day count, seasonal quarterly classification, and synodic lunar relationships for all twelve Gregorian calendar months:
          </p>
          <DataTable
            head={["Month Name", "Days in Month", "Roman Etymological Origin", "Fiscal Quarter", "Synodic Moon Ratio"]}
            rows={[
              ["January (01)", "31 Days", "Janus (Roman god of beginnings, gates, transitions)", "Q1 (Winter)", "1.050 Lunar Months"],
              ["February (02)", "28 Days (29 in Leap)", "Februa (Roman purification festival)", "Q1 (Winter)", "0.948 Lunar Months"],
              ["March (03)", "31 Days", "Mars (Roman god of war; original Roman New Year)", "Q1 (Spring Equinox)", "1.050 Lunar Months"],
              ["April (04)", "30 Days", "Aperire (Latin 'to open', flowering blossoms)", "Q2 (Spring)", "1.016 Lunar Months"],
              ["May (05)", "31 Days", "Maia (Roman goddess of growth and vegetation)", "Q2 (Spring)", "1.050 Lunar Months"],
              ["June (06)", "30 Days", "Juno (Roman queen of gods, marriage protector)", "Q2 (Summer Solstice)", "1.016 Lunar Months"],
              ["July (07)", "31 Days", "Julius Caesar (renamed from Quintilis in 44 BCE)", "Q3 (Summer)", "1.050 Lunar Months"],
              ["August (08)", "31 Days", "Augustus Caesar (renamed from Sextilis in 8 BCE)", "Q3 (Summer)", "1.050 Lunar Months"],
              ["September (09)", "30 Days", "Septem (Latin for 'seven'; 7th Roman month)", "Q3 (Autumn Equinox)", "1.016 Lunar Months"],
              ["October (10)", "31 Days", "Octo (Latin for 'eight'; 8th Roman month)", "Q4 (Autumn)", "1.050 Lunar Months"],
              ["November (11)", "30 Days", "Novem (Latin for 'nine'; 9th Roman month)", "Q4 (Autumn)", "1.016 Lunar Months"],
              ["December (12)", "31 Days", "Decem (Latin for 'ten'; 10th Roman month)", "Q4 (Winter Solstice)", "1.050 Lunar Months"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Commercial Real Estate Lease Escalation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a commercial tenant executing a multi-year office lease beginning on October 31, 2026. The corporate lease agreement mandates an annual rent escalation every 18 months, with contractual notice required exactly 6 months prior to each escalation date. The corporate treasury must compute the exact first escalation date and notice deadline:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Add 18 Months to Starting Month):</strong> Start date: October 31, 2026. Start month M_1 = 9 (October, 0-based), start year Y_1 = 2026. Month delta = +18. Target month raw = 9 + 18 = 27.</li>
            <li><strong>Step 2 (Evaluate Modulo 12 Quotient and Remainder):</strong> Year increment = floor(27 / 12) = 2. Target year Y_target = 2026 + 2 = 2028 (a leap year!). Target month M_target = 27 mod 12 = 3 (April, 0-based).</li>
            <li><strong>Step 3 (Apply Day Clamping):</strong> Starting day was 31. April contains exactly 30 days. Applying boundary clamping: min(31, 30) = 30. The first rent escalation occurs on <strong>April 30, 2028</strong>.</li>
            <li><strong>Step 4 (Determine 6-Month Notice Deadline):</strong> Subtracting 6 months from April 30, 2028: M_notice = (3 - 6) = −3 mod 12 = 9 (October, preceding year 2027). October contains 31 days. Target notice deadline = <strong>October 30, 2027</strong>. Cross-reference business workdays in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Corporate Retail 4-4-5 Calendars &amp; Fiscal Quarter Optimization
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In retail sales analysis, standard Gregorian calendar months create operational distortion because month lengths vary and year-over-year months contain differing numbers of lucrative weekend shopping days (for example, March 2026 having four Saturdays versus March 2027 having five).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To eliminate this distortion, the National Retail Federation (NRF) standardizes corporate reporting using 4-4-5 accounting calendars. Each 13-week quarter contains two 4-week months (28 days) followed by one 5-week month (35 days). Every month ends on the same day of the week (typically Saturday), ensuring direct, unskewed year-over-year revenue comparisons. To analyze week numbers across corporate cycles, explore our <Link href="/calculators/datetime/week-number-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">week number calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Gestational Staging, Subscription Billing &amp; Banking
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In human obstetrics and midwifery, pregnancy gestation is universally modeled as 40 weeks or approximately 9 calendar months (consisting of three distinct clinical trimesters). In consumer subscription billing (software SaaS, gym memberships, mobile streaming), monthly billing cycles rely on automated billing date clamping to prevent failed charges on February 28 or 30-day months.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Whether managing tenant leases, tracking gestational milestones, or calculating fiscal quarterly earnings, month arithmetic is an indispensable mathematical skill. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate chronological milestones in our <Link href="/calculators/datetime/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">age calculator</Link>, and convert temporal measurements in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Metonic 19-Year Lunisolar Cycle &amp; Adar Intercalation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In astronomical history, lunisolar calendar systems solved the incommensurability between solar years and lunar months using the Metonic cycle discovered by Athenian astronomer Meton in 432 BCE. Meton observed that 19 solar tropical years correspond almost exactly to 235 synodic lunar months (differing by only about 2 hours).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To prevent lunar calendars from drifting out of phase with agricultural harvest seasons, lunisolar systems insert seven intercalary leap months (embolismic months) during years 3, 6, 8, 11, 14, 17, and 19 of every 19-year cycle. In the traditional Hebrew calendar, this intercalary month is designated as Adar II (Adar Sheni), expanding the year from 12 to 13 months and realigning Passover with the spring barley harvest.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Enterprise ERP Revenue Recognition &amp; ASC 606 Multi-Month Amortization
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern corporate accounting and Enterprise Resource Planning (ERP) software (SAP S/4HANA, Oracle NetSuite, Workday), multi-month calculations govern subscription revenue recognition under Financial Accounting Standards Board (FASB) ASC 606 and IFRS 15 rules.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When a multinational enterprise sells a 36-month software contract with upfront cash collection, revenue cannot be recognized immediately. Financial controllers amortize contract liabilities monthly using straight-line mid-month or daily pro-rata schedules. Accurate month counting ensures balance sheet deferred revenue schedules reconcile perfectly across quarterly audit reporting horizons.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Saros Eclipse Cycle &amp; Draconic Month Geometry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In ancient Chaldean and Babylonian astronomy, astronomers discovered that solar and lunar eclipses repeat in a grand harmonic cycle known as the Saros. A single Saros cycle spans exactly 223 synodic lunar months, which corresponds to 6,585.3211 days (approximately 18 years, 11 days, and 8 hours).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Remarkably, 223 synodic months almost perfectly equal 242 draconic months (the period for the Moon to return to the same orbital node where its tilted 5.14° orbit intersects the ecliptic plane) and 239 anomalistic months (the period from perigee to perigee). Because all three lunar month periodicities synchronize simultaneously, an eclipse recurring one Saros later exhibits nearly identical solar-lunar geometry, duration, and orbital distance.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hospitality &amp; Commercial Multi-Month Tenancy Legislation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In residential real estate law and short-term hospitality rentals, the exact duration of calendar month occupancy carries strict statutory legal consequences. In numerous jurisdictions (such as California and New York City), continuous occupancy exceeding 30 calendar days or one full calendar month automatically converts a transient hotel guest into a permanent legal tenant endowed with full statutory tenancy protections.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consequently, extended-stay hotels and corporate corporate housing operators enforce strict 28-day checkout and room rotation policies to prevent unwanted statutory tenancy rights from vesting during multi-month reservations.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering calendar month mechanics, corporate 4-4-5 retail accounting cycles, and astronomical lunar synodic phases empowers corporate financial planners, healthcare practitioners, and legal professionals to execute flawless multi-month timeline management.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, automated month-end date clamping guarantees seamless commercial subscription billing and regulatory accounting compliance across all major enterprise resource planning software systems. Cloud-based SaaS recurring revenue platforms utilize this deterministic logic to ensure annual and quarterly contract amortizations remain fully reconciled without invoice calendar discrepancies.
          </p>

        </>
      }
    >
      <MonthCalculatorComponent />
    </CalcPage>
  );
}
