import type { Metadata } from "next";
import Link from "next/link";
import DaysUntilCalculatorComponent from "@/components/calcs/datetime/days-until-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SolarSolsticeEquinoxDeclinationChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/days-until-calculator";
const TITLE = "Days Until Calculator | Event Countdown & Seasonal Solar Milestones";
const DESCRIPTION =
  "Count down the exact days, weeks, hours, and minutes remaining until any future event, holiday, wedding, or astronomical solar solstice and equinox.";

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
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/datetime/week-number-calculator", icon: "🗓️", name: "Week Number" },
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the countdown algorithm calculate remaining calendar days across timezones?",
    a: "The algorithm computes countdowns by converting both the current local timestamp and the target date horizon into continuous Coordinated Universal Time (UTC) millisecond values. By taking the floor or ceiling of the millisecond delta divided by 86,400,000 (milliseconds per day), the calculation remains robust across Daylight Saving Time (DST) clock changes and local timezone boundaries.",
  },
  {
    q: "How do astronomical solar equinoxes and solstices define recurring annual countdown milestones?",
    a: "Astronomical seasons are governed by Earth's 23.44° axial tilt relative to its orbital plane around the Sun. The vernal equinox (approx. March 20) and autumnal equinox (approx. September 22) occur when solar declination is exactly 0°, while the summer solstice (approx. June 21) and winter solstice (approx. December 21) mark peak northern (+23.44°) and southern (−23.44°) solar declination extremes.",
  },
  {
    q: "What is the difference between working business days remaining and total calendar days?",
    a: "Total calendar days measure the continuous elapsed astronomical days (including all Saturdays, Sundays, and public holidays). In commercial project management, business working days exclude weekends (roughly 2 out of every 7 days) and statutory public holidays, typically reducing the effective productive operational span by 28% to 32%.",
  },
  {
    q: "Why does psychological time perception accelerate as target countdown horizons approach?",
    a: "In cognitive chronobiology and behavioral economics, the 'goal gradient effect' (identified by psychologist Clark Hull) demonstrates that human motivation, temporal focus, and perceived time velocity accelerate as individuals approach a salient deadline or celebratory horizon, accompanied by heightened cortisol arousal and hyper-focused milestone planning.",
  },
];

export default function DaysUntilCalculatorPage() {
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
            <strong>Event Countdown Guidance:</strong> Precise countdown calculations measure temporal intervals between current observation coordinates and future target milestones. In event logistics, corporate fiscal closes, and holiday planning, cross-reference business working days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, track elapsed calendar intervals with our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, or monitor annual week cycles in our <Link href="/calculators/datetime/week-number-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">week number calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Solar Declination Sine Waves &amp; Seasonal Milestones
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Counting down the days to seasonal holidays, solstices, and equinoxes reflects humanity&apos;s oldest astronomical practice. Earth orbits the Sun along an elliptical trajectory with an obliquity (axial tilt) of approximately 23.44° relative to the ecliptic plane. This geometric tilt causes the apparent declination of the Sun to oscillate sinusoidally between +23.44° (summer solstice in the Northern Hemisphere) and −23.44° (winter solstice).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The chart below visualizes the annual harmonic declination curve of the Sun across the 365 days of the year, establishing the natural cosmic cadence for traditional seasonal celebrations, agricultural harvest festivals, and astronomical countdowns.
          </p>

          <SolarSolsticeEquinoxDeclinationChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Temporal Countdowns
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A countdown between the current continuous timestamp t_now and a target future event horizon t_target is computed in Coordinated Universal Time (UTC) to eliminate Daylight Saving Time (DST) transition artifacts:
          </p>
          <Formula>{"\Delta t = t_{\text{target}} - t_{\text{now}} = (T_{\text{target}} - T_{\text{now}}) \times 1000 \text{ ms}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The integer calendar days D remaining is obtained via Euclidean integer division:
          </p>
          <Formula>{"D = \left\lceil \frac{\Delta t}{86{,}400{,}000 \text{ ms}} \right\rceil, \quad W = \left\lfloor \frac{D}{7} \right\rfloor, \quad R = D \pmod{7}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where W represents full elapsed weeks and R represents residual days. In project scheduling and critical path management (CPM), the effective working business days D_business is derived by filtering out weekend coordinates:
          </p>
          <Formula>{"D_{\text{business}} = \sum_{k=0}^{D-1} \mathbb{I}\left( \text{DayOfWeek}(t_{\text{now}} + k \cdot 86400) \notin \{0, 6\} \right) - H_{\text{public}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where H_public is the number of statutory public holidays falling within the countdown window. To evaluate project labor float and team sprint capacity, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate task completion percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Annual Holiday &amp; Seasonal Countdown Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles representative annual target milestone benchmarks, cultural observances, astronomical markers, and typical planning lead times across civil society:
          </p>
          <DataTable
            head={["Event Milestone Designation", "Calendar Date / Cadence", "Astronomical / Cultural Significance", "Typical Planning Lead Time", "Key Operational Preparation"]}
            rows={[
              ["New Year's Eve / Day", "December 31 / January 1", "Civil Gregorian calendar year rollover", "2 to 3 Months", "Hospitality reservations, corporate fiscal close"],
              ["Spring (Vernal) Equinox", "March 19 - 21", "Astronomical spring; equal 12h day and night", "1 to 2 Months", "Agricultural planting schedules, Persian Nowruz"],
              ["Easter Sunday", "First Sun after first full moon post-equinox", "Ecclesiastical lunar computus cycle", "2 to 3 Months", "Liturgical schedules, school spring breaks"],
              ["Summer Solstice", "June 20 - 22", "Longest daylight hours in Northern Hemisphere", "1 to 2 Months", "Summer festival permits, solar energy audits"],
              ["Independence Day (US)", "July 4", "Commemoration of 1776 Declaration of Independence", "1 to 2 Months", "Municipal fireworks pyrotechnics, travel logistics"],
              ["Autumnal Equinox", "September 21 - 24", "Astronomical autumn; solar declination crosses 0°", "1 to 2 Months", "Harvest festivals, autumn retail stocking"],
              ["Halloween / Samhain", "October 31", "Ancient Celtic cross-quarter festival", "1 to 2 Months", "Costume manufacturing, confectionery retail"],
              ["Thanksgiving Day (US)", "Fourth Thursday of November", "Harvest thanksgiving and gratitude observance", "2 to 3 Months", "Aviation transit booking, commercial retail logistics"],
              ["Winter Solstice", "December 20 - 23", "Shortest daylight hours; solar declination −23.44°", "1 to 2 Months", "Astronomical observations, seasonal lighting"],
              ["Christmas Day", "December 25", "Christian celebration of Nativity; global civil holiday", "3 to 6 Months", "Retail inventory procurement, international freight"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Corporate Product Launch Countdown
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a enterprise consumer technology firm planning a global hardware product reveal event scheduled for Friday, September 17, 2027. On Monday, October 26, 2026, the marketing and supply chain executive committee must establish the exact countdown timeline across calendar days, calendar weeks, and net business manufacturing days:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Compute Gross Calendar Days Remaining):</strong> From October 26, 2026 to September 17, 2027. Remaining days in 2026 = 66 days. Days in 2027 = 31 (Jan) + 28 (Feb) + 31 (Mar) + 30 (Apr) + 31 (May) + 30 (Jun) + 31 (Jul) + 31 (Aug) + 17 (Sep) = 260 days. Gross calendar countdown = 66 + 260 = <strong>326 calendar days</strong>.</li>
            <li><strong>Step 2 (Decompose into Full Weeks and Residual Days):</strong> 326 / 7 = 46 full weeks and 4 residual days (46w 4d).</li>
            <li><strong>Step 3 (Derive Business Working Days):</strong> Across 46 weeks, there are 46 x 2 = 92 weekend days. The 4 residual days (Monday through Thursday) add 4 working days. Total weekend days = 92 + 0 = 92 days. Deducting 8 observed corporate public holidays: Net working days = 326 - 92 - 8 = <strong>226 business manufacturing days</strong>.</li>
            <li><strong>Step 4 (Manufacturing Shift Allocation):</strong> At 8 production hours per business day, the engineering team has exactly 1,808 productive factory hours to finalize manufacturing tooling. Cross-reference work shift allocations in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link> and calculate milestone financial ratios with our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychological Time Perception &amp; Goal Gradient Kinetics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Human perception of temporal countdowns is deeply non-linear. In cognitive psychology, the &apos;goal gradient hypothesis&apos; demonstrates that as individuals approach an anticipated milestone (such as a wedding, retirement date, or marathon competition), subjective time appears to accelerate while motivation and task completion rates intensify.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Visual countdown trackers provide continuous psychological feedback, reducing cognitive load and helping individuals break daunting long-term objectives into discrete, actionable weekly sprints. To track wedding anniversary milestones, explore our <Link href="/calculators/datetime/birthday-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">birthday calculator</Link> and evaluate lifelong chronological age in our <Link href="/calculators/datetime/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">age calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Wedding Planning, Fiscal Year Closes &amp; Vacation Travel
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In wedding and luxury event management, countdown trackers govern vendor contract deposit deadlines, dress fitting schedules, and guest RSVP cutoffs. In corporate financial accounting, corporate treasurers track days until quarterly fiscal closes (Q1 through Q4) to orchestrate inventory audits and regulatory SEC filings.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international vacation travel, countdown tools establish passport renewal horizons (many nations require passports to be valid for at least 6 months beyond travel dates) and airline check-in windows. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working day intervals with our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert server timestamps in our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Milankovitch Astronomical Cycles &amp; Planetary Orbital Precession
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When counting down the days to seasonal solar events, astronomers evaluate long-term orbital perturbations modeled by Serbian geophysicist Milutin Milankovitch. Earth&apos;s orbital eccentricity (the degree to which the orbit departs from a perfect circle) oscillates between 0.000055 and 0.0679 over a quasi-periodic cycle of roughly 100,000 and 413,000 years.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Simultaneously, Earth&apos;s axial tilt (obliquity) varies between 22.1° and 24.5° over a 41,000-year cycle, while axial precession (the wobbling of the rotational axis like a spinning top) completes a full circuit every 25,772 years. These multi-millennial gravitational resonances modulate solar insolation intensity across high latitudes, driving Quaternary glacial-interglacial climate transitions and shifting the calendar dates of perihelion and aphelion over multi-century countdown horizons.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychological Time Compression: Temporal Discounting &amp; Hyperbolic Horizons
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In behavioral economics and neurofinance, human cognitive evaluation of future countdown milestones is governed by hyperbolic discounting. Rather than discounting future utility exponentially at a constant interest rate, humans exhibit a strong present bias: rewards delayed by 365 days are discounted dramatically, but adding one additional day to a 365-day horizon produces negligible subjective change.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            George Ainslie&apos;s hyperbolic discount function demonstrates that as the event horizon approaches (moving from 30 days to 7 days, 3 days, and 24 hours), the subjective value and psychological salience of the upcoming milestone spikes exponentially. Digital countdown clocks capitalize on this cognitive neurobiology, sustaining dopamine arousal and driving prompt consumer engagement.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Critical Path Method (CPM) Float Allocation in Mega-Infrastructure Projects
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In large-scale engineering, procurement, and construction (EPC) projects, such as civil transit tunnels, semiconductor fabrication plants, or offshore wind farms, countdown schedules are modeled through the Critical Path Method (CPM). Developed by DuPont and Remington Rand in the late 1950s, CPM identifies the deterministic sequence of dependent activities that dictates the absolute minimum duration required to complete the total project.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Activities situated directly along the critical path possess exactly zero Total Float (slack); any calendar day of slippage or supply chain delay along a critical task pushes the final project handover countdown back on a 1-to-1 basis. Non-critical parallel tasks possess positive float, enabling project executives to strategically reallocate heavy machinery and specialized labor crews to protect the overarching project countdown.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Biological Circannual Clocks &amp; Seasonal Affective Kinetics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Beyond conscious cognitive tracking, the human endocrine system maintains innate biological circannual rhythms that anticipate seasonal solar transitions. In high-latitude populations, the shortening countdown of daily photoperiod hours leading to the winter solstice alters retinal signaling through the retinohypothalamic tract to the suprachiasmatic nucleus (SCN).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Prolonged nocturnal melatonin synthesis and reduced serotonin transcription trigger Seasonal Affective Disorder (SAD) and metabolic conservation shifts. As the countdown passes the winter solstice and solar daylight expands, morning photon exposure suppresses melatonin and elevates diurnal alertness, demonstrating the profound evolutionary synchronization between human physiology and Earth&apos;s astronomical calendar milestones.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Solar Orbit Velocity &amp; Perihelion Countdowns
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Johannes Kepler&apos;s second law of planetary motion (equal areas in equal times), Earth moves fastest along its orbital trajectory during early January when it reaches perihelion (closest approach to the Sun at roughly 147.1 million kilometers), traveling at approximately 30.29 km/s.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, during early July at aphelion (furthest distance at roughly 152.1 million kilometers), orbital velocity decelerates to 29.29 km/s. This orbital eccentricity causes the astronomical seasons in the Northern Hemisphere to vary in duration: spring and summer span approximately 92.8 and 93.6 days respectively, whereas autumn and winter span only 89.8 and 89.0 days, subtly altering countdown rhythms.
          </p>

        </>
      }
    >
      <DaysUntilCalculatorComponent />
    </CalcPage>
  );
}
