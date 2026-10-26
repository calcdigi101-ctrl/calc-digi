import type { Metadata } from "next";
import Link from "next/link";
import TimeCalculatorComponent from "@/components/calcs/datetime/time-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SexagesimalTimeSubdivisionHierarchyChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/time-calculator";
const TITLE = "Time Calculator | Sexagesimal Addition, Subtraction & Modulo Arithmetic";
const DESCRIPTION =
  "Add, subtract, and multiply hours, minutes, and seconds with sexagesimal base-60 modulo arithmetic, decimal hour conversions, and astronomical sidereal day mechanics.";

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
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration" },
  { href: "/calculators/datetime/time-zone-converter", icon: "🌐", name: "Time Zone Converter" },
  { href: "/calculators/measurements/time-converter", icon: "🕒", name: "Time Converter" },
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why does timekeeping use the Sumerian sexagesimal (base-60) numbering system?",
    a: "Sexagesimal (base-60) was developed by Sumerian and Babylonian astronomers around 3000 BCE. The number 60 is a superior highly composite number with twelve distinct divisors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60). This superior divisibility allows effortless division into halves, thirds, quarters, fifths, and tenths without producing infinite repeating fractions, making it ideal for temporal subdivision.",
  },
  {
    q: "How do you convert sexagesimal hours and minutes into decimal hours for payroll?",
    a: "To convert sexagesimal time into decimal hours, divide the minutes by 60 and the seconds by 3,600, then add the result to the integer hours: Decimal Hours = Hours + (Minutes / 60) + (Seconds / 3600). For example, 8 hours and 45 minutes equals 8 + (45 / 60) = 8.75 decimal hours.",
  },
  {
    q: "What is the difference between a mean solar day and an astronomical sidereal day?",
    a: "A mean solar day (exactly 24 hours or 86,400 seconds) measures Earth's rotation relative to the Sun. A sidereal day measures rotation relative to distant fixed stars and lasts approximately 23 hours, 56 minutes, and 4.09 seconds. Because Earth orbits the Sun while rotating, it must rotate roughly 1° further each day to realign with the Sun, creating a 3 minute 56 second daily difference.",
  },
  {
    q: "How does modulo arithmetic handle time subtraction across midnight?",
    a: "When subtracting a larger time value from a smaller one across the midnight boundary (such as 01:15 minus 03:45), the calculation applies modulo 24 arithmetic (or modulo 1,440 minutes). Adding 24 hours (1,440 minutes) to the negative minute residue normalizes the calculation to the previous day: (75 − 225 + 1440) mod 1440 = 1290 minutes = 21:30 (9:30 PM).",
  },
];

export default function TimeCalculatorPage() {
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
            <strong>Sexagesimal Arithmetic Guidance:</strong> Adding and subtracting time requires base-60 borrow and carry arithmetic. In industrial payroll, flight flight dispatch, and audio editing, convert time spans to commercial decimal hours in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link>, coordinate global offsets in our <Link href="/calculators/datetime/time-zone-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time zone converter</Link>, or convert metric time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Sexagesimal Timekeeping Architecture: The Sumerian Base-60 Hierarchy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While human civilization adopted base-10 decimal systems for general commerce—inspired by the ten digits of human hands—civil chronometry preserves the ancient sexagesimal (base-60) mathematical structure devised by Sumerian and Babylonian astronomers in Mesopotamia over five thousand years ago.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The base-60 radix represents a mathematical masterpiece of divisibility. The integer 60 possesses twelve distinct factors, enabling clean fractional division across civil society without messy repeating fractions. The chart below illustrates the exponential logarithmic scaling of time units from base SI seconds through minutes, hours, days, weeks, and annual astronomical cycles.
          </p>

          <SexagesimalTimeSubdivisionHierarchyChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Sexagesimal Arithmetic
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Performing arithmetic operations on compound temporal quantities T_1 = (H_1, M_1, S_1) and T_2 = (H_2, M_2, S_2) requires mapping sexagesimal components into a linear scalar base in total seconds S_total:
          </p>
          <Formula>{"S_{\text{total}} = (H \times 3600) + (M \times 60) + S"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For addition (T_1 + T_2) or subtraction (T_1 − T_2), the net seconds S_net is evaluated algebraically:
          </p>
          <Formula>{"S_{\text{net}} = S_{\text{total}, 1} \pm S_{\text{total}, 2}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Decomposing S_net back into normalized sexagesimal hours, minutes, and seconds relies on Euclidean quotient and remainder operations:
          </p>
          <Formula>{"H_{\text{res}} = \left\lfloor \frac{S_{\text{net}}}{3600} \right\rfloor, \quad M_{\text{res}} = \left\lfloor \frac{S_{\text{net}} \pmod{3600}}{60} \right\rfloor, \quad S_{\text{res}} = S_{\text{net}} \pmod{60}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial accounting, decimal hours H_decimal is derived by dividing total minutes by 60: H_decimal = H_res + (M_res / 60) + (S_res / 3600). To analyze how work hours impact weekly payroll ratios, cross-reference our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link> and calculate overtime wage percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Time Unit Conversions &amp; Fractional Sexagesimal Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes the exact mathematical conversions between sexagesimal minutes, decimal hours, SI seconds, and standard commercial payroll fractions:
          </p>
          <DataTable
            head={["Sexagesimal Minutes", "Decimal Equivalent (Hours)", "Commercial Payroll Fraction", "Total SI Seconds", "Standard Industrial Usage"]}
            rows={[
              ["05 Minutes", "0.0833 Hours", "1/12 Hour (Tenth Tier)", "300 Seconds", "Brief rest break increment, micro-billing"],
              ["06 Minutes", "0.1000 Hours", "1/10 Hour (Tenth Standard)", "360 Seconds", "Standard legal billing minimum increment"],
              ["10 Minutes", "0.1667 Hours", "1/6 Hour", "600 Seconds", "Standard corporate standup meeting span"],
              ["15 Minutes", "0.2500 Hours", "1/4 Hour (Quarter Hour)", "900 Seconds", "Quarter-hour payroll timesheet increment"],
              ["20 Minutes", "0.3333 Hours", "1/3 Hour", "1,200 Seconds", "Pomodoro sprint focus session duration"],
              ["30 Minutes", "0.5000 Hours", "1/2 Hour (Half Hour)", "1,800 Seconds", "Standard statutory lunch meal break"],
              ["45 Minutes", "0.7500 Hours", "3/4 Hour (Three Quarters)", "2,700 Seconds", "Academic university lecture block period"],
              ["50 Minutes", "0.8333 Hours", "5/6 Hour", "3,000 Seconds", "Clinical psychotherapy session hour"],
              ["60 Minutes", "1.0000 Hours", "1 Full Hour (Base)", "3,600 Seconds", "Standard labor hourly billing rate base"],
              ["90 Minutes", "1.5000 Hours", "1.5 Hours", "5,400 Seconds", "Feature film running time / sports match"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Multi-Leg Commercial Airline Flight Dispatch
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a commercial airline flight operations dispatcher computing total crew duty time for a transatlantic flight with two operational legs and a ground turn-around layover:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Decompose Temporal Components into Base Minutes):</strong> Flight Leg 1 duration = 7 hours, 48 minutes. Pre-flight briefing = 1 hour, 15 minutes. Ground layover = 2 hours, 35 minutes. Flight Leg 2 duration = 3 hours, 42 minutes.</li>
            <li><strong>Step 2 (Convert Components to Cumulative Minutes):</strong> Leg 1 = (7 x 60) + 48 = 468 mins. Briefing = (1 x 60) + 15 = 75 mins. Layover = (2 x 60) + 35 = 155 mins. Leg 2 = (3 x 60) + 42 = 222 mins.</li>
            <li><strong>Step 3 (Sum Total Mission Minutes):</strong> Total Minutes = 468 + 75 + 155 + 222 = <strong>920 minutes</strong>.</li>
            <li><strong>Step 4 (Sexagesimal Re-composition &amp; Decimal Conversion):</strong> 920 / 60 = 15 hours with a remainder of 20 minutes (15h 20m). Decimal billing conversion = 15 + (20 / 60) = <strong>15.33 decimal hours</strong>. Since maximum FAA pilot duty limits specify a 16.0-hour ceiling, the flight plan complies with federal aviation safety regulations. Cross-reference shift breaks in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link> and convert time zones in our <Link href="/calculators/datetime/time-zone-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time zone converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Diurnal Cycles: Solar Day vs. Sidereal Day Mechanics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In astrometry and space navigation, celestial mechanics differentiates between mean solar time and sidereal time. A solar day (exactly 24 hours or 86,400 SI seconds) measures the time required for the Sun to return to the observer&apos;s local celestial meridian.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, because Earth advances along its orbit around the Sun by roughly 0.9856° per day (360° / 365.25 days), Earth must rotate approximately 360.9856° to complete one full solar day. A sidereal day—the time required to complete a true 360.0000° rotation relative to fixed distant stars—lasts only 23 hours, 56 minutes, and 4.0905 seconds. This 3 minute 56 second daily discrepancy causes constellations to rise roughly 4 minutes earlier each calendar evening. To track seasonal solar movements, check our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Relativistic Time Dilation &amp; Atomic Cesium Frequency Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern fundamental metrology, the International System of Units (SI) defines the second not by planetary rotation, but by quantum atomic resonances. Since 1967, one SI second is formally defined as the duration of 9,192,631,770 periods of the radiation corresponding to the transition between the two hyperfine ground states of the Cesium-133 atom at absolute zero.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Albert Einstein&apos;s General Theory of Relativity, time does not pass at a uniform rate throughout the universe; clocks situated in stronger gravitational potentials tick slower than clocks in weaker gravitational fields. High-precision atomic optical lattice clocks can detect gravitational time dilation across vertical height differences of less than one millimeter, demonstrating that time arithmetic is fundamentally linked to relativistic space-time geometry. To convert timestamps into server integers, explore our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Media Production, Athletic Pacing &amp; Legal Billing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In professional audiovisual production, video editors utilize Society of Motion Picture and Television Engineers (SMPTE) timecode (formatted as HH:MM:SS:FF) to synchronize multi-camera footage and audio tracks down to individual frame increments (such as 24, 29.97, or 60 frames per second).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In corporate law firms and management consultancies, billable attorney hours are tracked in strict 6-minute (0.1 hour) increments, making rapid sexagesimal-to-decimal conversion essential for billing accuracy. Whether planning athletic marathon splits, calculating transit durations, or managing corporate timesheets, precise time arithmetic guarantees operational efficiency. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link> and calculate working business hours in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Babylonian Astronomy: Planetary Hours &amp; Variable Diurnal Clepsydrae
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Before the invention of weight-driven mechanical clocks in 14th-century European monasteries, ancient Egyptian, Greek, and Roman civilizations divided the day and night into twelve &apos;seasonal hours&apos; (also known as temporal or unequal hours). Because the Sun remains above the horizon longer during summer than winter, a daytime seasonal hour in Mediterranean latitudes spanned approximately 75 modern minutes at the summer solstice, contracting to roughly 45 minutes at the winter solstice.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To measure these variable hours, ancient engineers constructed sophisticated water clocks (clepsydrae) featuring inflow floats and geared cylindrical dials calibrated for seasonal variations. It was not until Hellenistic astronomers like Hipparchus required uniform time units for eclipse computations that the equinoctial hour (equal hour based on the vernal equinox) became the standard unit of celestial mechanics.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Isochronism &amp; The Huygens Pendulum Escapement Revolution
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mechanical time calculation achieved scientific rigor in 1656 when Dutch polymath Christiaan Huygens invented the pendulum clock, capitalizing on Galileo Galilei&apos;s discovery of isochronism: a pendulum of fixed length L swings with a period T approximately independent of its amplitude (for small oscillation angles):
          </p>
          <Formula>{"T = 2\pi \sqrt{\frac{L}{g}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Huygens&apos; anchor escapement and cycloidal cheek guides reduced daily clock errors from roughly 15 minutes down to less than 10 seconds per day. A century later, English horologist John Harrison perfected the marine chronometer (H4), solving the legendary longitude problem and enabling British maritime dominance through precise celestial timekeeping.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Atomic Fountain Clocks &amp; The Epistemic Shift of Time Definition
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1967, the 13th General Conference on Weights and Measures (CGPM) abandoned astronomical ephemeris time in favor of quantum resonance, redefining the International System (SI) second as exactly 9,192,631,770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium-133 atom. Modern primary frequency standards, such as NIST-F2 and SYRTE FO2, utilize laser cooling and magnetic magneto-optical traps to create atomic fountains where laser-cooled cesium clouds are launched vertically into an optical cavity.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By observing microwave Ramsey fringes during ballistic flight, atomic fountain clocks achieve fractional frequency systematic uncertainties below one part in 10 to the 16th power, meaning they drift less than one second in over 300 million years. Furthermore, emerging optical lattice clocks utilizing strontium and ytterbium atoms trapped in laser standing waves operate in the petahertz optical regime, pushing measurement precision down into the 10 to the minus 18th range, where general relativistic gravitational redshift can detect altitude changes of a single millimeter on Earth&apos;s surface.
          </p>
        </>
      }
    >
      <TimeCalculatorComponent />
    </CalcPage>
  );
}
