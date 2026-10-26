import type { Metadata } from "next";
import Link from "next/link";
import DateDifferenceCalculatorComponent from "@/components/calcs/datetime/date-difference-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CalendarDriftGregorianVsJulianChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/date-difference-calculator";
const TITLE = "Date Difference Calculator | Days Between Dates & Calendar Drift";
const DESCRIPTION =
  "Calculate exact days between two dates, elapsed weeks, months, business workdays, and explore astronomical Julian Day Number algorithms and Gregorian calendar drift.";

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
  { href: "/calculators/datetime/age-calculator", icon: "🎂", name: "Age Calculator" },
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration" },
  { href: "/calculators/measurements/time-converter", icon: "🕒", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the Julian Day Number (JDN) algorithm eliminate calendar irregularities?",
    a: "The Julian Day Number (JDN) is an integer assigned to a whole solar day in a continuous count starting from January 1, 4713 BCE (proleptic Julian calendar). By converting civil Gregorian calendar dates into continuous astronomical integers, calculating the difference between two dates simplifies to a single subtraction (JDN_end - JDN_start), completely bypassing irregular month day counts, variable leap years, and calendar reform shifts.",
  },
  {
    q: "What is the difference between inclusive and exclusive date counting?",
    a: "Exclusive counting (standard civil convention) computes the exact elapsed duration: if you start on Monday and end on Tuesday, the elapsed span is exactly 1 day (Tuesday minus Monday). Inclusive counting counts both the starting anchor day and the ending anchor day: Monday and Tuesday together equal 2 active calendar days. Inclusive counting is universally used in legal statutes, vacation booking nights, and project sprints.",
  },
  {
    q: "Why do financial bond markets use 30/360 or Actual/Actual day count conventions?",
    a: "In commercial fixed-income bond underwriting and interest rate swaps, financial institutions calculate interest accrual using standardized day-count conventions. The 30/360 European or US convention assumes every month has exactly 30 days and the year has 360 days to simplify coupon calculations. In contrast, sovereign Treasury bonds use Actual/Actual ICMA conventions, counting exact astronomical calendar days to reflect true capital opportunity cost.",
  },
  {
    q: "How did the 1582 Gregorian calendar transition affect date differences across European borders?",
    a: "When Pope Gregory XIII enacted the Gregorian calendar in October 1582, Catholic nations (Spain, Portugal, Italy, France) immediately skipped 10 days (October 4 was followed by October 15). However, Protestant Britain and its American colonies did not adopt the reform until September 1752 (dropping 11 days), and Russia adopted it in 1918 (dropping 13 days). Cross-border historical date calculations during those centuries require applying national adoption offset tables.",
  },
];

export default function DateDifferenceCalculatorPage() {
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
            <strong>Calendar Interval Guidance:</strong> Calculating exact calendar spans requires selecting between inclusive (+1 day) and exclusive date counting conventions. In project scheduling, contractual SLAs, and legal notices, evaluate business day subsets using our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, track upcoming event horizons in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>, or convert metric time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Calendar Drift: The Julian to Gregorian Chronological Gap
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Measuring the elapsed duration between two calendar dates seems straightforward until examined across multi-century historical horizons. The classical Julian calendar, instituted under Julius Caesar in 46 BCE, defined the average solar year as exactly 365.25 mean solar days. However, the true astronomical tropical year—governed by Earth&apos;s axial precession and elliptical orbit around the Sun—is approximately 365.24219 days, creating an annual discrepancy of roughly 11 minutes and 14 seconds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As shown in the historical drift curve below, this seemingly minor daily discrepancy accumulated into a massive 10-day calendar error by 1582, which has expanded to 13 days in the modern era and will reach 14 days by the year 2100.
          </p>

          <CalendarDriftGregorianVsJulianChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Julian Day Numbers (JDN)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To compute exact date differences without being corrupted by non-uniform month lengths (28, 29, 30, or 31 days) and irregular leap years, astronomical algorithms convert any Gregorian calendar date (Year Y, Month M, Day D) into a continuous astronomical Julian Day Number (JDN) using integer division:
          </p>
          <Formula>{"a = \left\lfloor \frac{14 - M}{12} \right\rfloor, \quad y = Y + 4800 - a, \quad m = M + 12a - 3"}</Formula>
          <Formula>{"\text{JDN} = D + \left\lfloor \frac{153m + 2}{5} \right\rfloor + 365y + \left\lfloor \frac{y}{4} \right\rfloor - \left\lfloor \frac{y}{100} \right\rfloor + \left\lfloor \frac{y}{400} \right\rfloor - 32045"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Once both the start date (Y_1, M_1, D_1) and end date (Y_2, M_2, D_2) are mapped to continuous integers JDN_1 and JDN_2, the exact elapsed calendar span Delta Days is computed directly:
          </p>
          <Formula>{"\Delta \text{Days}_{\text{exclusive}} = \text{JDN}_2 - \text{JDN}_1, \quad \Delta \text{Days}_{\text{inclusive}} = \text{JDN}_2 - \text{JDN}_1 + 1"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            From this continuous integer day count, elapsed calendar weeks W and residual days R are derived via Euclidean division: W = floor(Delta Days / 7) and R = Delta Days mod 7. In financial mathematics, these intervals drive compound interest accrual schedules; cross-reference compound returns in our <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">compound interest calculator</Link> and calculate percentage changes in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Day Count Conventions in Commercial Finance &amp; Law
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes the primary commercial and statutory day-count conventions utilized across international banking, bond markets, corporate lease contracts, and civil legal jurisdictions:
          </p>
          <DataTable
            head={["Day-Count Convention", "Market / Statutory Domain", "Numerator Calculation (Days)", "Denominator Basis (Year)", "Key Commercial Application"]}
            rows={[
              ["Actual/Actual ICMA", "Sovereign Government Bonds (US Treasuries)", "Exact astronomical days between dates", "Exact days in current leap/common year (365/366)", "Benchmark sovereign debt coupon pricing"],
              ["Actual/360 (Money Market)", "Commercial Paper, US T-Bills, SOFR swaps", "Exact astronomical calendar days", "Fixed 360-day commercial base", "Short-term corporate interbank borrowing"],
              ["Actual/365 Fixed", "UK Gilts, Commonwealth money markets", "Exact astronomical calendar days", "Fixed 365-day base (ignores leap year)", "Commercial bank lending in Sterling / AUD"],
              ["30/360 US (Bond Basis)", "US Corporate & Municipal Bonds", "Each full month treated as exactly 30 days", "Fixed 360-day base (12 x 30)", "Standard US corporate bond interest accrual"],
              ["30E/360 (ISMA / Eurobond)", "Eurodollar & European corporate bonds", "European 30-day month rule (Feb adjustment)", "Fixed 360-day base", "International syndicated bond contracts"],
              ["Actual/365 Japanese", "Japanese domestic government securities", "Exact calendar days elapsed", "Fixed 365-day base", "Tokyo interbank yen lending schedules"],
              ["Calendar Business Days", "Civil Litigation & Court Filing Deadlines", "Excludes Saturdays, Sundays, and court holidays", "Actual working days", "Statutory discovery & appeal deadlines"],
              ["Statutory Notice Span", "Commercial Real Estate Lease Terminations", "Full calendar days excluding receipt day", "Actual calendar days", "Tenant eviction and lease renewal notices"],
              ["Warranty Duration", "Consumer Protection & Automotive Guarantees", "Exact elapsed calendar anniversary span", "Standard 365-day years", "Lemon law and electronics warranty limits"],
              ["Medical Gestational Age", "Obstetrics & Clinical Perinatology", "Exact days from Last Menstrual Period (LMP)", "280-day biological cycle", "Obstetric fetal ultrasound staging percentiles"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Enterprise Cloud Software SLA Dispute
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a enterprise legal dispute involving a cloud infrastructure software service agreement running from March 1, 2024 (a leap year) through October 26, 2026. The contract stipulates a penalty of $4,500 per calendar day for late milestone delivery, with exclusive day counting. The corporate legal team must determine exact total calendar days, elapsed weeks, and gross contract penalty obligations:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Start Date to JDN):</strong> Start date: March 1, 2024. Using JDN formulation: JDN_1 = JDN(2024, 3, 1) = 2,460,371.</li>
            <li><strong>Step 2 (Convert End Date to JDN):</strong> End date: October 26, 2026. Using JDN formulation: JDN_2 = JDN(2026, 10, 26) = 2,461,340.</li>
            <li><strong>Step 3 (Calculate Elapsed Calendar Days):</strong> Delta Days = 2,461,340 - 2,460,371 = <strong>969 calendar days</strong>. This interval spans 306 days in 2024 (leap year), 365 days in 2025 (common year), and 298 days in 2026: 306 + 365 + 298 = 969 days.</li>
            <li><strong>Step 4 (Decompose into Weeks and Commercial Value):</strong> 969 days / 7 = 138 full weeks and 3 residual days. Total financial exposure = 969 days x $4,500/day = $4,360,500. Cross-reference project float in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate commercial invoice ratios in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ISO 8601 Time Interval Formats & Digital Interoperability
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern distributed software architecture and RESTful API engineering, date intervals must be serialized according to the International Organization for Standardization (ISO 8601) specification. Under ISO 8601-1:2019, time intervals are represented using a forward slash separator between start and end timestamps (e.g., 2024-03-01/2026-10-26) or via duration strings beginning with the designator &apos;P&apos; (Period).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For example, a duration of 2 years, 7 months, and 25 days is formally encoded as &apos;P2Y7M25D&apos;. Standardizing duration strings eliminates ambiguous cultural date parsing errors (such as the American MM/DD/YYYY versus European DD/MM/YYYY formatting conflicts) across relational databases and cloud billing systems. To convert timestamps into server epoch integers, explore our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Historical Gregorian Calendar Omissions & National Adoption Timelines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Historical date differences spanning the 16th through 20th centuries require rigorous consideration of national calendar transition dates. When Great Britain and the British Empire (including colonial America) transitioned from the Julian to Gregorian calendar in September 1752, Wednesday, September 2 was immediately followed by Thursday, September 14, omitting exactly 11 calendar days.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Riots reportedly occurred in English cities with citizens chanting &apos;Give us our eleven days!&apos; due to fears of losing wages or paying full monthly rent for an abbreviated month. Consequently, George Washington, born on February 11, 1731 (Old Style Julian), celebrated his birthday on February 22, 1732 (New Style Gregorian) after accounting for both the 11-day omission and the change of the legal New Year from March 25 to January 1. To track leap year rules, check our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Tenancy Leases, Travel Visas & Project Management
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international travel and immigration law, calculating date differences is a critical legal compliance task. Under European Schengen Area visa rules, third-country nationals are restricted to 90 days within any rolling 180-day period. Overstaying by even a single calendar day results in substantial civil fines, entry bans, and deportation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In corporate project management, date differences establish the Total Slack (float) along critical path project networks (CPM). Whether tracking subscription billing periods, residential tenancy lease expiries, or clinical medication washout intervals, precise temporal arithmetic ensures flawless execution. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Computus Algorithm: Ecclesiastical Lunar Cycles &amp; Easter Dating
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In medieval ecclesiastical chronometry, calculating calendar differences was inextricably linked to the Computus—the complex mathematical algorithm used to determine the date of Easter Sunday. Established at the First Council of Nicaea in 325 CE, Easter is defined as the first Sunday after the first full moon (the Paschal Full Moon) occurring on or after the vernal equinox (fixed ecclesiastically to March 21).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because the lunar synodic month (29.53059 days) does not divide evenly into the 365.2425-day solar year, ecclesiastical astronomers synthesized the 19-year Metonic cycle (incorporating 235 lunations), Golden Numbers, Epacts (the age of the moon on January 1), and Sunday letters. Discrepancies between true astronomical lunations and tabulated ecclesiastical tables were a primary catalyst compelling Pope Gregory XIII to commission the 1582 calendar reform.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Ephemeris Time vs. Coordinated Universal Time (UTC)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern celestial mechanics and satellite orbit determination, calculating elapsed intervals requires differentiating between uniform dynamical timescales and solar rotational time. Universal Time (UT1) is defined strictly by Earth&apos;s diurnal rotation angle relative to distant quasars, which decelerates unpredictably due to lunar tidal friction and core mantle interactions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To establish a strictly uniform temporal coordinate for planetary ephemerides and gravitational physics, the International Astronomical Union (IAU) utilizes Terrestrial Time (TT) and Barycentric Dynamical Time (TDB). Coordinated Universal Time (UTC) serves as the compromise civil standard, kept within 0.9 seconds of rotational UT1 via the periodic insertion of atomic leap seconds.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Relativistic Time Dilation &amp; Terrestrial Satellite Constellations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In ultra-precise modern geodetic measurements spanning multi-year baselines, physicists must account for Albert Einstein&apos;s special and general relativity. Global Positioning System (GPS) atomic clocks orbit Earth at an altitude of approximately 20,200 kilometers, traveling at velocities of 3.9 kilometers per second.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under special relativity, kinematic velocity causes satellite clocks to tick slower than terrestrial ground clocks by roughly 7 microseconds per day. Conversely, under general relativity, weaker gravitational potential at orbital altitude causes satellite clocks to tick faster by roughly 45 microseconds per day. The net relativistic acceleration is approximately +38 microseconds per day. Without continuous chronometric corrections, calculated GPS ground positions would accumulate an intolerable navigational error of roughly 11 kilometers every single day.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding relativistic time dilation and geodetic coordinate transformations guarantees absolute precision across civil engineering, long-baseline interferometry, and satellite telecommunications networks.
          </p>

        </>
      }
    >
      <DateDifferenceCalculatorComponent />
    </CalcPage>
  );
}
