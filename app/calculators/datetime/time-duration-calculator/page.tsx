import type { Metadata } from "next";
import Link from "next/link";
import TimeDurationCalculatorComponent from "@/components/calcs/datetime/time-duration-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WorkshiftBreakdownDurationCurveChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/time-duration-calculator";
const TITLE = "Time Duration Calculator | Elapsed Hours, Workshift & Billing Timesheet";
const DESCRIPTION =
  "Calculate elapsed time between start and end timestamps, deduct unpaid lunch breaks, convert hours to commercial decimal timesheet billing, and model industrial work shifts.";

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
  { href: "/calculators/datetime/time-calculator", icon: "⏱️", name: "Time Calculator" },
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/datetime/time-zone-converter", icon: "🌐", name: "Time Zone Converter" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/measurements/time-converter", icon: "🕒", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the duration calculator handle overnight graveyard shifts that cross midnight?",
    a: "When a work shift crosses midnight (such as starting at 22:00 and ending at 06:30 the following morning), the end time value is numerically smaller than the start time. The algorithm detects this negative delta and automatically applies modulo 24-hour addition (+1,440 minutes), correctly calculating the continuous overnight elapsed span without requiring manual date input.",
  },
  {
    q: "Why do payroll systems require decimal hours instead of hours and minutes?",
    a: "Payroll enterprise software calculates gross wages by multiplying hours worked by an hourly wage rate (e.g., $32.50/hour). Because base-60 minutes cannot be directly multiplied by base-10 currency, minutes must be converted into decimal hours (e.g., 8 hours 45 minutes becomes 8.75 hours). Multiplying $32.50 by 8.75 yields an exact, legally auditable wage of $284.38.",
  },
  {
    q: "What are statutory requirements for mandatory unpaid meal and rest breaks?",
    a: "Under United States Fair Labor Standards Act (FLSA) regulations and state labor codes (such as California Labor Code Section 512), non-exempt employees working shifts exceeding 5.0 hours are entitled to a mandatory 30-minute unpaid meal break. Shifts exceeding 10.0 hours mandate a second 30-minute meal break, while short 10-to-15 minute rest breaks must be compensated as paid working time.",
  },
  {
    q: "How does ISO 8601 represent temporal durations in modern APIs?",
    a: "Under the ISO 8601 standard, a time duration is represented as a string beginning with 'P' (Period), with a 'T' designator preceding time components. For example, a duration of 8 hours, 30 minutes, and 15 seconds is formally serialized as 'PT8H30M15S'. This standardized format ensures seamless cross-platform interoperability across enterprise ERP APIs.",
  },
];

export default function TimeDurationCalculatorPage() {
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
            <strong>Timesheet &amp; Payroll Duration Guidance:</strong> Accurately measuring elapsed duration requires deducting unpaid meal breaks and converting sexagesimal minutes to decimal payroll hours. In workforce management and freelance billing, evaluate total business working days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, add compounding shift hours with our <Link href="/calculators/datetime/time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time calculator</Link>, or track calendar day intervals in our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Workforce Shift Dynamics: Productive Time vs. Mandatory Statutory Breaks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern labor economics and corporate human resource management, calculating elapsed shift duration is the foundational metric of commercial payroll, project job costing, and labor law compliance. In both industrial manufacturing facilities and professional service corporations, gross elapsed shift span divides between productive billable labor and statutory unpaid meal breaks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The stacked bar chart below illustrates the structural allocation between net productive hours and mandatory break periods across standard commercial shifts ranging from short 4-hour half-day assignments up to demanding 12-hour industrial emergency rotations.
          </p>

          <WorkshiftBreakdownDurationCurveChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Elapsed Time Duration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Given a starting timestamp T_start = (H_start, M_start) and an ending timestamp T_end = (H_end, M_end), the timestamps are first converted into scalar minutes of the diurnal cycle:
          </p>
          <Formula>{"m_{\text{start}} = (H_{\text{start}} \times 60) + M_{\text{start}}, \quad m_{\text{end}} = (H_{\text{end}} \times 60) + M_{\text{end}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The gross elapsed duration Delta m_gross accounts for overnight midnight rollovers via modulo 1,440 arithmetic:
          </p>
          <Formula>{"\Delta m_{\text{gross}} = (m_{\text{end}} - m_{\text{start}} + 1440) \pmod{1440}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Deducting the unpaid break period B_mins yields the net productive duration Delta m_net:
          </p>
          <Formula>{"\Delta m_{\text{net}} = \max\left( 0, \; \Delta m_{\text{gross}} - B_{\text{mins}} \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Finally, the commercial payroll decimal hours H_decimal is derived by dividing net minutes by 60:
          </p>
          <Formula>{"H_{\text{decimal}} = \frac{\Delta m_{\text{net}}}{60} = H_{\text{net}} + \frac{M_{\text{net}}}{60}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This continuous decimal hour formulation forms the mathematical basis for automated enterprise timesheet software (Kronos, ADP, Workday). To evaluate financial wage ratios and billing margins, explore our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link> and calculate overtime compensation percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Shift Models &amp; Statutory Meal Break Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes standard commercial workshift models, typical gross spans, mandatory break allocations, and resulting net billable payroll hours:
          </p>
          <DataTable
            head={["Workshift Classification", "Gross Clock Span", "Mandatory Unpaid Break", "Net Billable Decimal Hours", "Typical Commercial Industry"]}
            rows={[
              ["Part-Time Half Shift", "4 Hours 00 Mins (08:00 - 12:00)", "0 Minutes (None required)", "4.00 Decimal Hours", "Retail hospitality, campus work-study"],
              ["Standard Corporate Day", "8 Hours 30 Mins (09:00 - 17:30)", "30 Minutes (Lunch break)", "8.00 Decimal Hours", "Commercial corporate offices, banking"],
              ["Compressed 4x10 Shift", "10 Hours 45 Mins (07:00 - 17:45)", "45 Minutes (Lunch break)", "10.00 Decimal Hours", "Government administration, manufacturing"],
              ["Hospital Nursing Rotation", "12 Hours 30 Mins (07:00 - 19:30)", "30 Minutes (Meal) + 2x15m paid", "12.00 Decimal Hours", "Intensive care units, emergency healthcare"],
              ["Overnight Graveyard Shift", "8 Hours 30 Mins (23:00 - 07:30)", "30 Minutes (Overnight meal)", "8.00 Decimal Hours", "Logistics sorting hubs, 24/7 security"],
              ["Split Shift (Hospitality)", "2x 4h Spans (11-15:00 & 18-22:00)", "3 Hours Unpaid Intermission", "8.00 Decimal Hours", "Restaurant culinary, municipal transit bus"],
              ["Freelance Consulting Block", "3 Hours 45 Mins (Focused Sprint)", "0 Minutes (Continuous)", "3.75 Decimal Hours", "Software engineering, legal document review"],
              ["Emergency Fire / EMS 24h", "24 Hours 00 Mins (On-Call Shift)", "Variable Structured Sleep Time", "16.00 to 24.00 Hours", "Municipal fire protection, paramedic squads"],
              ["Production Line Maintenance", "6 Hours 00 Mins (Saturday Overtime)", "15 Minutes (Paid break only)", "6.00 Decimal Hours", "Automotive manufacturing tooling audits"],
              ["Executive Strategy Offsite", "9 Hours 15 Mins (08:30 - 17:45)", "75 Minutes (Catered luncheon)", "8.00 Decimal Hours", "Corporate annual board strategic planning"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Overnight Logistics Shift with Break Deduction
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a logistics fulfillment warehouse supervisor auditing a night shift employee timesheet. The employee clocked in on Monday evening at 21:45 (9:45 PM) and clocked out on Tuesday morning at 06:15 (6:15 AM). The electronic badge reader recorded a 45-minute unpaid meal break at 02:00 AM. The payroll manager must compute gross duration, net billable hours, and gross wage compensation at $24.50/hour:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Timestamps to Diurnal Minutes):</strong> Start time: 21:45 = (21 x 60) + 45 = 1,305 minutes. End time: 06:15 = (6 x 60) + 15 = 375 minutes.</li>
            <li><strong>Step 2 (Apply Modulo 1,440 Midnight Normalization):</strong> Since end time (375) is less than start time (1,305), the shift crossed midnight: Gross minutes = (375 − 1305 + 1440) mod 1440 = <strong>510 gross minutes</strong>. In sexagesimal hours: 510 / 60 = 8 hours and 30 minutes.</li>
            <li><strong>Step 3 (Deduct 45-Minute Unpaid Meal Break):</strong> Net productive minutes = 510 − 45 = <strong>465 net minutes</strong>. In hours and minutes: 465 / 60 = 7 hours and 45 minutes.</li>
            <li><strong>Step 4 (Convert to Decimal Hours and Compute Gross Pay):</strong> Decimal hours = 7 + (45 / 60) = <strong>7.75 decimal hours</strong>. Gross earnings = 7.75 hours x $24.50/hour = <strong>$189.88</strong>. Cross-reference multi-day payrolls in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and convert time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Industrial Time-and-Motion Studies: Taylorism &amp; Gilbreth Therbligs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The systematic scientific analysis of work duration originated during the late 19th-century Industrial Revolution under Frederick Winslow Taylor&apos;s &apos;scientific management&apos; principles and Frank and Lillian Gilbreth&apos;s time-and-motion studies. The Gilbreths decomposed complex manual factory assembly workflows into 17 fundamental elemental motions known as &apos;therbligs&apos; (an anagram of Gilbreth), including Search, Select, Grasp, Transport Loaded, Hold, and Inspect.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By measuring the precise microsecond duration of each elemental motion using chronocyclegraph photography, industrial engineers eliminated redundant physical motions, reducing worker fatigue while elevating assembly line throughput. In modern Lean Manufacturing and Six Sigma disciplines, cycle time analysis remains the cornerstone of reducing non-value-added waste (Muda). To analyze project sprints, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Digital Chronometry &amp; High-Resolution Precision Timers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern computer operating systems and web browsers, duration tracking is measured via monotonic hardware clocks (such as the High Precision Event Timer, HPET, and CPU Time Stamp Counter, TSC). Unlike civil wall-clock time (which can be stepped backward or forward by Network Time Protocol, NTP, adjustments), monotonic timers guarantee strictly positive, linear time progression.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In JavaScript and Node.js environments, developers utilize performance.now() to measure sub-millisecond execution durations with microsecond precision, preventing timing attacks while auditing distributed microservice latencies. To convert epoch timestamps, explore our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Freelance Billing, Legal Consulting &amp; Athletic Pacing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In freelance contract work, software development, and graphic design, professionals use automated timesheet trackers (Toggl, Harvest, Clockify) to measure task duration across multiple concurrent client accounts. Accurate duration tracking ensures clients receive transparent, auditable invoices backed by minute-level timesheet records.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In endurance athletics (triathlons, marathons, cycling time trials), duration measurement defines pace kinetics, aerobic threshold maintenance, and split interval execution. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working business days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Workplace Fatigue Risk Management &amp; Circadian Sleep Architecture
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In high-reliability industrial operations—such as commercial aviation, nuclear power plant control rooms, and petrochemical refining—managing work shift duration is a vital safety prerequisite. Chronobiological research demonstrates that continuous cognitive alertness declines precipitously after 8 to 10 hours of sustained wakefulness, with human error rates multiplying three-fold during extended 12-hour shifts.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Fatigue Risk Management Systems (FRMS) regulated by the International Civil Aviation Organization (ICAO) and OSHA, continuous work periods must incorporate biomathematical fatigue modeling. Circadian troughs occurring between 02:00 AM and 06:00 AM (the Window of Circadian Low, WOCL) induce acute microsleep episodes unless balanced by mandatory restorative rest periods.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aviation Pilot Flight Duty Period (FDP) &amp; FAA Part 117 Rest Mandates
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial passenger aviation, the United States Federal Aviation Administration enforces Federal Aviation Regulations (FAR) Part 117, strictly governing Flight Duty Periods (FDP) for commercial airline pilots. Unlike ordinary corporate office hours, FDP begins when a pilot reports for duty and ends when the aircraft is parked at the gate following its final flight leg.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maximum allowable flight duty duration scales dynamically based on the pilot&apos;s report time and the number of flight sectors flown: a pilot reporting at 07:00 AM for a single flight leg is permitted up to 14 hours of duty, whereas a crew reporting at 23:00 for multiple legs is capped at 9.0 hours. Airlines that violate cumulative weekly duty limits face heavy regulatory enforcement and grounded flights.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Spaceflight Orbital Chronometry &amp; Relativistic Time Dilation In High-G Trajectories
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In orbital spaceflight and deep-space interplanetary navigation, calculating time duration departs significantly from simple terrestrial clock subtraction due to relativistic spacetime effects predicted by Albert Einstein&apos;s theories of Special and General Relativity. For spacecraft in low Earth orbit (such as the International Space Station traveling at approximately 7.66 kilometers per second at an altitude of 420 kilometers), two opposing relativistic time dilation phenomena operate simultaneously.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            First, Special Relativity dictates that an object moving at velocity relative to an inertial observer experiences kinematic time dilation: clocks on the space station tick slower relative to ground clocks by approximately 28 microseconds per day. Conversely, General Relativity dictates gravitational time dilation: because the space station resides higher in Earth&apos;s gravitational potential well (where spacetime curvature is weaker), its clocks tick faster by roughly 3 microseconds per day compared to clocks at sea level.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The net result is that ISS astronauts age approximately 25 microseconds less per day than ground control staff on Earth. When mission controllers compute precise delta-v burn durations for orbital rendezvous, trajectory correction maneuvers must account for these nanosecond time discrepancies to prevent orbital insertion misalignments.
          </p>
        </>
      }
    >
      <TimeDurationCalculatorComponent />
    </CalcPage>
  );
}
