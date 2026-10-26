import type { Metadata } from "next";
import Link from "next/link";
import TimeConverterComponent from "@/components/calcs/measurements/time-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TimeChronologicalEpochScaleChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/time-converter";
const TITLE = "Time Converter | Seconds, Minutes, Hours, Days, Weeks & Epochs";
const DESCRIPTION =
  "Convert seconds, minutes, hours, days, weeks, months, years, and Unix timestamps with exact atomic cesium definitions and chronological epoch modeling.";

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
  { href: "/calculators/measurements/speed-converter", icon: "🚀", name: "Speed Converter" },
  { href: "/calculators/internet/download-time-calculator", icon: "⏳", name: "Download Time" },
  { href: "/calculators/physics/velocity-calculator", icon: "🏎️", name: "Velocity Calculator" },
  { href: "/calculators/measurements/data-storage-converter", icon: "💾", name: "Data Storage" },
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/pages/measurements", icon: "⏱️", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical definition of the SI second in modern atomic metrology?",
    a: "Under the 13th CGPM in 1967, the SI base unit of time—the second (s)—is defined by taking the fixed numerical value of the unperturbed ground-state hyperfine transition frequency of the Cesium-133 atom (Δν_Cs) to be exactly 9,192,631,770 Hertz (cycles per second). This decoupled civil time from variable astronomical planetary rotation.",
  },
  {
    q: "Why is a solar day not exactly 86,400 SI seconds long?",
    a: "Earth's axial rotation is gradually decelerating due to lunar tidal friction (lengthening the mean solar day by approximately 1.7 milliseconds per century), while seasonal atmospheric wind patterns introduce millisecond fluctuations. To keep civil Coordinated Universal Time (UTC) synchronized with astronomical solar time (UT1), the International Earth Rotation and Reference Systems Service (IERS) inserts occasional leap seconds.",
  },
  {
    q: "What is the difference between a sidereal day and a solar day?",
    a: "A mean solar day (24 hours or 86,400 seconds) is the time required for the Sun to return to the same celestial meridian. A sidereal day is the time required for Earth to complete one 360-degree rotation relative to fixed distant stars, equaling approximately 23 hours, 56 minutes, and 4.0905 seconds (86,164.09 seconds). The ~4-minute discrepancy arises because Earth orbits the Sun simultaneously.",
  },
  {
    q: "What is Unix epoch time and why is the year 2038 significant in computer science?",
    a: "Unix epoch time counts the continuous elapsed seconds since 00:00:00 UTC on January 1, 1970. On legacy 32-bit signed integer operating systems, the maximum representable integer (2³¹ - 1 = 2,147,483,647 seconds) will overflow on January 19, 2038 at 03:14:07 UTC (the 'Year 2038 Problem'), causing clocks to wrap around to December 13, 1901 unless migrated to modern 64-bit timestamps.",
  },
];

export default function TimeConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Chronological Guidance:</strong> Time quantifies duration and chronological succession. In computer systems engineering, astrophysics, and logistics scheduling, cross-reference displacement velocities in our <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> and calculate transmission runtimes using our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Chronological Metrology: Astronomical Cycles & Atomic Frequency Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Time constitutes humanity&apos;s most pervasive coordinate dimension. In classical Newtonian physics, time was envisioned as an absolute, uniform, mathematical continuum flowing identically everywhere across the cosmos. Historically, early civil societies partitioned time through visible astronomical periodicities: the diurnal axial rotation of Earth (day), the synodic lunar orbital phase cycle (month, ~29.53 days), and the tropical orbital revolution around the Sun (solar year, ~365.2422 days).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, as telecommunications, global positioning satellites (GPS), and high-frequency financial trading required sub-nanosecond synchronization, astronomical rotation proved too irregular due to tidal friction and core mantle coupling. Today, international civil time is anchored to International Atomic Time (TAI), synthesized from over 400 primary laboratory cesium fountains worldwide, maintaining frequency stability exceeding 1 part in 10¹⁶ (less than one second of error every 300 million years).
          </p>

          <TimeChronologicalEpochScaleChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation & Exact Conversion Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All temporal units convert through the SI base unit of the second (s). The conversion from source time duration to target unit computes via scalar ratios:
          </p>
          <Formula>{"t_{\\text{target}} = t_{\\text{source}} \\times \\left( \\frac{\\tau_{\\text{source}}}{\\tau_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where τ represents the exact duration in SI seconds. The standardized chronological conversion factors are:
          </p>
          <Formula>{"1 \\text{ min} = 60 \\text{ s}, \\quad 1 \\text{ h} = 3,600 \\text{ s}, \\quad 1 \\text{ day} = 86,400 \\text{ s}"}</Formula>
          <Formula>{"1 \\text{ Julian Year} = 365.25 \\text{ days} = 31,557,600 \\text{ s}, \\quad 1 \\text{ Gregorian Year} = 365.2425 \\text{ days} = 31,556,952 \\text{ s}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In physical dynamics, elapsed time governs linear velocity and acceleration curves; explore motion parameters in our <Link href="/calculators/physics/velocity-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">velocity calculator</Link> and calculate network throughput in our <Link href="/calculators/measurements/data-storage-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">data storage converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Time Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles authoritative conversion coefficients across subatomic, computational, civil, and astronomical chronological regimes:
          </p>
          <DataTable
            head={["Time Interval", "Symbol", "Value in Seconds (s)", "Value in Civil Hours (h)"]}
            rows={[
              ["Nanosecond", "ns", "1.0 × 10⁻⁹ s", "2.77778 × 10⁻¹³ h"],
              ["Microsecond", "µs", "1.0 × 10⁻⁶ s", "2.77778 × 10⁻¹⁰ h"],
              ["Millisecond", "ms", "0.001 s", "2.77778 × 10⁻⁷ h"],
              ["Second (SI Base)", "s", "1.0 s", "0.000277778 h"],
              ["Minute", "min", "60.0 s", "0.0166667 h"],
              ["Civil Hour", "h / hr", "3,600.0 s", "1.0 h"],
              ["Civil Day (Solar Mean)", "d", "86,400.0 s", "24.0 h"],
              ["Sidereal Day", "d_sid", "86,164.09 s", "23.93447 h"],
              ["Standard Week", "wk", "604,800.0 s", "168.0 h"],
              ["Calendar Month (Average)", "mo", "2,629,746.0 s", "730.485 h"],
              ["Julian Year (Astronomy)", "yr / a", "31,557,600.0 s", "8,766.0 h"],
              ["Gregorian Civil Year", "yr", "31,556,952.0 s", "8,765.82 h"],
              ["Decade", "dec", "315,576,000.0 s", "87,660.0 h"],
              ["Century", "cent", "3,155,760,000.0 s", "876,600.0 h"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: High-Frequency Algorithmic Trade Latency
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a financial software engineer optimizing an algorithmic market-making trading server collocated in a New Jersey data center. The server executes order cancellations within 450 microseconds (µs) of detecting market book imbalance. The execution logs must convert this duration to nanoseconds, milliseconds, and fractional seconds to benchmark against hardware FPGA gateway cut-through latency:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Microseconds to Nanoseconds):</strong> 450 µs × 1,000 ns/µs = 450,000 nanoseconds.</li>
            <li><strong>Step 2 (Convert Microseconds to Milliseconds):</strong> 450 µs ÷ 1,000 = 0.450 milliseconds.</li>
            <li><strong>Step 3 (Convert to SI Seconds):</strong> 450 × 10⁻⁶ = 0.000450 seconds.</li>
            <li><strong>Step 4 (Speed of Light Propagation Comparison):</strong> Light in silica fiber optics travels at ~200,000 km/s (200 meters per microsecond). In 450 µs, optical signals travel: 450 µs × 200 m/µs = 90,000 meters (90 km). Fiber transmission distances can be verified in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and data throughput in the <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Relativistic Time Dilation in Global Positioning Satellites (GPS)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The GPS satellite constellation operates as the premier real-world demonstration of Einstein&apos;s theories of Special and General Relativity. Each GPS satellite orbits at an altitude of approximately 20,200 km, cruising at an orbital speed of ~3.87 km/s with atomic rubidium and cesium clocks on board.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Special Relativity, orbital velocity causes the satellite clock to tick slower than an Earth-bound clock by approximately 7 microseconds per day (kinematic time dilation). However, under General Relativity, because the satellite is higher in Earth&apos;s gravitational potential well, time runs faster by approximately 45 microseconds per day (gravitational time dilation). The net relativistic effect causes satellite clocks to gain +38 microseconds per day.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If GPS flight software did not pre-compensate atomic clock frequencies by tuning clock oscillators from 10.23 MHz down to 10.22999999543 MHz, positional navigational errors would accumulate at approximately 11.4 kilometers (7.1 miles) every single day.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Gregorian Calendar Intercalation & The 400-Year Leap Year Rule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The tropical solar year—the period from one vernal equinox to the next—spans approximately 365.24219 days (365 days, 5 hours, 48 minutes, and 45 seconds). The historical Julian calendar established by Julius Caesar in 45 BCE inserted a leap day every 4 years, assuming an average year of 365.25 days. Over 1,600 years, this 11-minute annual overestimation accumulated into a 10-day seasonal drift.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In October 1582, Pope Gregory XIII promulgated the Gregorian calendar reform. To refine the average calendar year to 365.2425 days, the Gregorian algorithm specifies: every year divisible by 4 is a leap year, except century years (ending in 00), which are only leap years if evenly divisible by 400. Thus, 1600 and 2000 were leap years, while 1700, 1800, and 1900 were regular years, leaving an error of merely 1 day every 3,236 years.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Precision Network Time Protocol (NTP) & Precision Time Protocol (PTP IEEE 1588)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In computer networks and cloud server infrastructure, system clocks drift due to crystal oscillator temperature instability. The Network Time Protocol (NTP) synchronizes client operating system clocks over the Internet to Stratum-1 atomic time servers within a few milliseconds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For industrial automation, 5G cellular base stations, and electrical substation synchrophasors, millisecond precision is inadequate. Engineers deploy the Precision Time Protocol (PTP, IEEE 1588-2019), which utilizes hardware network interface timestamping to achieve sub-microsecond and sub-nanosecond clock synchronization across local area networks.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Project Management, Shift Work & Global Jetlag
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In business project management and payroll accounting, converting work hours into billable fractions or total employee work weeks (40 hours = 2,400 minutes) determines project cost tracking. In human circadian chronobiology, traveling rapidly across time zones disrupts biological melatonin production, requiring travelers to calculate circadian phase shifts.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In energy consumption, continuous hourly power yields determine total electric bills; cross-reference energy kilowatt-hours in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link>. For academic and semester planning tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>, track variances in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the central <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Next-Generation Metrology: Optical Lattice Clocks & The 2030 SI Redefinition
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While the microwave transition frequency of cesium-133 (9.192 GHz) has anchored the SI second since 1967, quantum optics laboratories are pioneering optical lattice atomic clocks. Utilizing laser beams to trap tens of thousands of neutral strontium (87Sr) or ytterbium (171Yb) atoms within interference standing waves, optical clocks interrogate atomic transitions in the optical frequency domain (hundreds of terahertz, ~429 THz).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because optical frequencies oscillate roughly 50,000 times faster than microwave frequencies, optical lattice clocks achieve fractional systematic frequency uncertainties below 1 part in 10¹⁸. At this extraordinary precision level, an optical clock will neither gain nor lose a single second over the entire 13.8-billion-year age of the universe. The BIPM Consultative Committee for Time and Frequency (CCTF) has scheduled the formal redefinition of the SI second around 2030 based on these optical atomic standards.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geological Deep Time & Radiometric Isotope Decay Half-Lives
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In geochronology and evolutionary biology, human civil time scales are minuscule compared to the billions of years of planetary history. Geologists partition Earth&apos;s 4.54-billion-year lifespan into eons, eras, periods, and epochs, anchoring chronological boundary strata using radiometric decay dating governed by Rutherford&apos;s radioactive decay law: N(t) = N_0 × exp(-λ × t).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Isotope pairs with immense half-lives—such as Uranium-238 decaying to Lead-206 (half-life t_{1/2} = 4.468 billion years) and Potassium-40 decaying to Argon-40 (half-life t_{1/2} = 1.248 billion years)—allow geochemists to date primordial zircon crystals with sub-permille precision, converting radioactive parent-daughter atom ratios into chronological millions of years (Mega-annum, Ma).
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Computer Operating System Schedulers & High-Resolution Timers (HPET)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern multi-core operating systems (such as Linux, Windows, and macOS), the kernel process scheduler relies on High Precision Event Timers (HPET) and Time Stamp Counters (TSC) operating at gigahertz frequencies. Real-time audio digital signal processing (DSP) and high-frequency financial messaging require hardware interrupt timers calibrated with sub-microsecond jitter.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Timer drift between distributed cluster nodes can corrupt database distributed consensus algorithms (such as Google Spanner&apos;s TrueTime API, which utilizes synchronized GPS and atomic clocks). Converting between CPU clock tick cycles and nanosecond timestamps ensures robust thread synchronization and deterministic concurrency across enterprise distributed systems.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In aerospace telemetry and deep-space communications with interplanetary probes (such as NASA&apos;s Voyager 1 and Mars rovers), light-time delays range from several minutes to over twenty-two hours. Deep Space Network (DSN) tracking stations compensate for two-way radio wave propagation latency, synchronizing ephemeris timestamps with microsecond precision.
          </p>
        </>
      }
    >
      <TimeConverterComponent />
    </CalcPage>
  );
}
