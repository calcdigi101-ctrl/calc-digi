import type { Metadata } from "next";
import Link from "next/link";
import LeapYearCalculatorComponent from "@/components/calcs/datetime/leap-year-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TropicalYearVarianceDriftChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/leap-year-calculator";
const TITLE = "Leap Year Calculator | 400-Year Gregorian Divisibility Rules & Solar Drift";
const DESCRIPTION =
  "Determine whether any past or future year is a leap year using the complete Gregorian 400-year divisibility algorithm, astronomical tropical year drift calculations, and leap second standards.";

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
  { href: "/calculators/datetime/birthday-calculator", icon: "🎁", name: "Birthday Calculator" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/year-calculator", icon: "🗓️", name: "Year Calculator" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why is year 2000 a leap year, but year 1900 and 2100 are not?",
    a: "Under the Gregorian calendar reform of 1582, a year is a leap year if it is divisible by 4, UNLESS it is a century year (divisible by 100), in which case it must also be divisible by 400. Year 2000 is divisible by 400 (2000 / 400 = 5), making it a rare quad-century leap year. Years 1900 and 2100 are divisible by 100 but NOT by 400, so they are common 365-day years.",
  },
  {
    q: "What is the exact astronomical length of a tropical year compared to the calendar?",
    a: "An astronomical tropical solar year (vernal equinox to vernal equinox) is approximately 365.24219 mean solar days (365 days, 5 hours, 48 minutes, and 45 seconds). The Julian calendar assumed 365.25000 days (11m 14s too long). The Gregorian calendar averages exactly 365.24250 days across 400 years (365 + 97/400), creating an error of only 26 seconds per year.",
  },
  {
    q: "How many leap years occur in a complete 400-year Gregorian cycle?",
    a: "A 400-year Gregorian cycle contains exactly 97 leap years (100 divisible by 4, minus 3 century years not divisible by 400). This yields 97 x 366 + 303 x 365 = exactly 146,097 days, which divides evenly into 20,871 weeks.",
  },
  {
    q: "What is the difference between a calendar leap day and an atomic leap second?",
    a: "A leap day (February 29) corrects for the orbital period of Earth around the Sun (roughly 365.242 days). A leap second corrects for the variable rotational deceleration of Earth on its own axis (tidal friction caused by the Moon). Leap seconds are inserted into Coordinated Universal Time (UTC) by the International Earth Rotation and Reference Systems Service (IERS).",
  },
];

export default function LeapYearCalculatorPage() {
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
            <strong>Astronomical Calendar Precision:</strong> Leap years synchronize civil calendars with Earth&apos;s annual solar orbital period. When evaluating multi-year contracts, actuarial life expectancy, or historical dates, check your age in our <Link href="/calculators/datetime/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">age calculator</Link>, verify February 29 birthdays in our <Link href="/calculators/datetime/birthday-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">birthday calculator</Link>, or examine century spans in our <Link href="/calculators/datetime/year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">year calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Tropical Year Kinetics &amp; The 400-Year Calendar Balance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental challenge of solar calendar design is that Earth&apos;s tropical orbital period around the Sun is incommensurate with the diurnal rotation period of Earth on its axis. A tropical solar year (the interval between successive vernal equinoxes) measures approximately 365.24219 mean solar days (365 days, 5 hours, 48 minutes, and 45.2 seconds).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If civil society maintained a simple 365-day year without intercalary adjustments, the calendar would lose approximately one full day every four years. Over the span of a single century, the seasons would drift backward by roughly 24.2 days, causing summer to arrive in December within 750 years. The chart below illustrates the accumulated drift across Egyptian, Julian, Gregorian, and modern Revised Julian calendar systems over a 10,000-year epoch.
          </p>

          <TropicalYearVarianceDriftChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Derivation of the Gregorian Leap Algorithm
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To eliminate the Julian calendar&apos;s 11-minute annual drift, Pope Gregory XIII and Jesuit astronomer Christopher Clavius established the three-tier Gregorian divisibility rule in 1582. A year Y is a leap year if and only if the following Boolean condition evaluates to true:
          </p>
          <Formula>{"\text{IsLeapYear}(Y) = \left( (Y \pmod 4 = 0) \land (Y \pmod{100} \neq 0) \right) \lor (Y \pmod{400} = 0)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In any 400-year Gregorian cycle, the number of leap years N_leap is calculated as:
          </p>
          <Formula>{"N_{\text{leap}} = \left\lfloor \frac{400}{4} \right\rfloor - \left\lfloor \frac{400}{100} \right\rfloor + \left\lfloor \frac{400}{400} \right\rfloor = 100 - 4 + 1 = 97 \text{ leap years}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The average Gregorian year length L_greg is therefore:
          </p>
          <Formula>{"L_{\text{greg}} = 365 + \frac{97}{400} = 365 + 0.2425 = 365.24250 \text{ days}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Comparing L_greg (365.24250 days) with the true tropical year L_trop (365.24219 days) yields an error Delta L:
          </p>
          <Formula>{"\Delta L = 365.24250 - 365.24219 = +0.00031 \text{ days/year} \approx 26.8 \text{ seconds/year}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At 0.00031 days per year, the Gregorian calendar will accumulate only 1 full day of error every 3,226 years (around the year 4808 CE). To compare interval durations across historical periods, explore our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link> and calculate precise epoch timestamps in our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Calendar Systems &amp; Intercalary Precision Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles astronomical parameters, mathematical intercalary rules, and error accumulation rates across major civil and astronomical calendar systems throughout human history:
          </p>
          <DataTable
            head={["Calendar System", "Intercalary Leap Rule", "Mean Year Duration", "Annual Drift vs. Tropical Year", "Time to Accumulate 1 Day of Drift"]}
            rows={[
              ["Ancient Egyptian Civil", "None (365 fixed days; 12x30 + 5 epagomenal)", "365.00000 Days", "−5 hours 48 minutes", "Approximately 4.13 Years"],
              ["Julian Calendar (46 BCE)", "Every year divisible by 4 (Y % 4 == 0)", "365.25000 Days", "+11 minutes 14 seconds", "Approximately 128 Years"],
              ["Gregorian Calendar (1582)", "Divisible by 4, not 100, unless 400", "365.24250 Days", "+26.8 Seconds", "Approximately 3,226 Years"],
              ["Revised Julian (Milanković)", "Divisible by 4; century years mod 900 in {200, 600}", "365.24222 Days", "+2.2 Seconds", "Approximately 43,500 Years"],
              ["Jalali Persian Solar Calendar", "Complex 33-year and 2820-year astronomical cycles", "365.24242 Days", "+19.8 Seconds", "Approximately 5,000 Years"],
              ["Hebrew Lunisolar Calendar", "Metonic 19-year cycle with 7 leap months (Adar II)", "365.24682 Days", "+6 minutes 39 seconds", "Approximately 216 Years"],
              ["Islamic Lunar Hijri", "Pure lunar calendar (11 leap days per 30 years)", "354.36706 Days", "−10.875 Days (Lunar)", "Advances 1 solar year every 33 yrs"],
              ["Chinese Lunisolar Calendar", "Astronomical solstices & 24 solar terms (Jiéqì)", "365.24220 Days", "Synchronized via ephemeris", "Continuous astronomical realignment"],
              ["Mayan Haab' / Tzolk'in", "365-day Haab' + 260-day Tzolk'in Calendar Round", "365.00000 Days", "−5 hours 48 minutes", "Calendar Round repeats every 52 yrs"],
              ["International Atomic Time (TAI)", "Continuous SI second count (unadjusted)", "Variable vs. UT1", "Monotonically increasing", "Regulated via IERS leap seconds"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Testing Years 1900, 2000, 2024, and 2100
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To understand how software systems (and Microsoft Excel&apos;s famous historical 1900 leap year bug) evaluate leap years, consider testing four landmark years through the complete Gregorian algorithm:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Case A (Year 2024):</strong> 2024 mod 4 = 0 (Divisible). 2024 mod 100 = 24 (Not a century year). The first condition (Y % 4 == 0 &amp;&amp; Y % 100 != 0) is satisfied. 2024 is confirmed as a <strong>Leap Year (366 days, 29 days in February)</strong>.</li>
            <li><strong>Case B (Year 1900):</strong> 1900 mod 4 = 0 (Divisible). 1900 mod 100 = 0 (Century year). Testing the 400-year exception: 1900 mod 400 = 300 != 0. Because it fails the 400-year test, 1900 was a <strong>Common Year (365 days, 28 days in February)</strong>. Note: Lotus 1-2-3 and early Excel erroneously treated 1900 as a leap year, a bug preserved to this day for backward compatibility!</li>
            <li><strong>Case C (Year 2000):</strong> 2000 mod 4 = 0. 2000 mod 100 = 0 (Century year). Testing the 400-year exception: 2000 mod 400 = 0 (Exactly divisible: 2000 / 400 = 5). Year 2000 was a <strong>Leap Year (366 days, 29 days in February)</strong>.</li>
            <li><strong>Case D (Year 2100):</strong> 2100 mod 4 = 0. 2100 mod 100 = 0 (Century year). 2100 mod 400 = 100 != 0. Year 2100 will be a <strong>Common Year (365 days, 28 days in February)</strong>. Cross-reference century calculations in our <Link href="/calculators/datetime/year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">year calculator</Link> and calculate milestone intervals in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Software Engineering Bugs &amp; The Microsoft Excel 1900 Leap Glitch
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In computing history, date calculation algorithms have produced infamous software bugs. When Lotus 1-2-3 was developed in the early 1980s, programmers intentionally omitted the century divisibility check to save precious memory bytes on early 8086 microcomputers, falsely categorizing 1900 as a leap year with an artificial date of February 29, 1900.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When Microsoft created Excel, it deliberately replicated this bug to ensure complete backward compatibility with Lotus worksheets. As a result, in modern spreadsheet software, serial date 60 corresponds to the non-existent date of February 29, 1900. In distributed computing, leap seconds have similarly crashed server kernels across major cloud providers. To inspect server timestamps, explore our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Commercial Interest, Lease Contracts &amp; Payroll
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Leap years introduce economic anomalies across corporate accounting. In commercial annual salary contracts, salaried employees work one extra calendar day in a leap year without receiving additional base compensation, effectively reducing their daily compensation rate. Conversely, utility electricity bills and industrial equipment leases billed on daily rates experience a 0.27% revenue increase.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international athletics and politics, leap years host the Summer Olympic Games and United States Presidential elections. Explore our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working schedules with our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert temporal spans in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Milutin Milankovic &amp; The Revised Julian 900-Year Calendar Reform
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In May 1923, an Eastern Orthodox astronomical congress held in Constantinople approved a calendar reform proposed by Serbian scientist Milutin Milankovic: the Revised Julian calendar (also known as the Meletian calendar). While retaining the standard 4-year leap rule for non-century years, Milankovic introduced a significantly more precise century rule than Pope Gregory&apos;s 400-year cycle.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under the Revised Julian calendar, a century year is a leap year only if the year divided by 900 leaves a remainder of either 200 or 600. In a 900-year period, there are exactly 218 leap years (yielding an average year length of 365.24222 days). This matches the astronomical tropical year to within 2.2 seconds annually, meaning the Revised Julian calendar will not accumulate a single day of error for over 43,500 years. The Gregorian and Revised Julian calendars agree completely on leap years until the year 2800 (which is a leap year in the Gregorian calendar but a common year in the Revised Julian calendar).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tidal Friction &amp; The Historic Discontinuation of Leap Seconds in 2035
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While calendar leap days synchronize civil years with Earth&apos;s orbital period around the Sun, atomic timekeeping has historically relied on leap seconds to track Earth&apos;s slowing rotational velocity. Gravitational tidal friction exerted by the Moon transfers angular momentum from Earth&apos;s rotation to lunar orbital velocity, lengthening the mean solar day by roughly 1.7 milliseconds per century.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Between 1972 and 2026, 27 positive leap seconds were inserted into UTC by the International Earth Rotation and Reference Systems Service (IERS). However, because irregular leap seconds cannot be scheduled in advance and frequently crash financial trading platforms, telecommunications routing tables, and distributed database clocks, the General Conference on Weights and Measures (CGPM) voted in 2022 to discontinue leap seconds by 2035, allowing UTC and UT1 to drift until larger multi-minute adjustments are enacted.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ephemeris Time Standards: Barycentric Dynamical Time &amp; Pulsar Clocks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern deep-space navigation (such as NASA&apos;s Deep Space Network communicating with Voyager 1 and the James Webb Space Telescope), calendar leap day tracking is synchronized with Barycentric Coordinate Time (TCB) and Barycentric Dynamical Time (TDB). These relativistic coordinate time scales evaluate motion relative to the solar system&apos;s barycenter (the common center of mass of the Sun and all planets).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, astrophysicists utilize millisecond pulsar timing arrays (such as PSR J0437-4715)—rapidly rotating magnetized neutron stars whose periodic radio lighthouse pulses exhibit rotational stability rivaling terrestrial cesium atomic fountain clocks. By tracking microsecond arrival time deviations across decades, pulsar astronomers observe gravitational wave backgrounds and verify Earth&apos;s orbital position against theoretical leap year calendar models.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standardizing international astronomical time scales and civil intercalary rules ensures multi-century satellite ephemerides, interstellar communications, and financial transaction timestamps remain perfectly synchronized across global computer networks.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In astronomical software development, implementing robust modulo divisibility guards prevents date rollover crashes and safeguards multi-tier relational database integrity across century transitions.
          </p>

        </>
      }
    >
      <LeapYearCalculatorComponent />
    </CalcPage>
  );
}
