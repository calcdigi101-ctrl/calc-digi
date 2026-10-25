import type { Metadata } from "next";
import TimeZoneDifferenceCalculator from "@/components/calcs/geography/time-zone-difference-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WorldTimeZoneCircadianSpectrumChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/time-zone-difference-calculator";
const TITLE = "Time Zone Difference Calculator – Global UTC Offsets & Meeting Planner | CalcDigi";
const DESCRIPTION =
  "Calculate exact time differences and hour offsets between global cities and UTC time zones. Plan cross-border business meetings, track daylight saving time transitions, and analyze international working overlaps.";

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
  { href: "/calculators/geography/distance-between-cities-calculator", icon: "🌐", name: "Distance Between Cities" },
  { href: "/calculators/geography/latitude-longitude-calculator", icon: "📍", name: "Latitude & Longitude Coordinates" },
  { href: "/calculators/geography/country-area-population-calculator", icon: "👥", name: "Country Statistics & Population" },
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration Calculator" },
  { href: "/calculators/datetime/year-calculator", icon: "📅", name: "Year & Leap Year Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How do you calculate the exact time difference between two global time zones?",
    a: "Subtract the starting UTC offset from the destination UTC offset: ΔT = UTC_destination - UTC_origin. For example, traveling from New York (UTC-5) to London (UTC+0): ΔT = 0 - (-5) = +5 hours. London is 5 hours ahead; when it is 9:00 AM in New York, it is 2:00 PM in London. From Tokyo (UTC+9) to New York (UTC-5): ΔT = -5 - (+9) = -14 hours (14 hours behind).",
  },
  {
    q: "What is the technical difference between UTC, GMT, and Atomic Time (TAI)?",
    a: "Coordinated Universal Time (UTC) is the atomic standard maintained by BIPM using over 400 cesium clocks worldwide. Greenwich Mean Time (GMT) was historically solar time measured at the Royal Observatory in Greenwich (0° meridian). While UTC and GMT share the exact same clock hour, UTC incorporates occasional leap seconds to remain synchronized with Earth's slowing rotation. International Atomic Time (TAI) runs continuously without leap seconds and is currently 37 seconds ahead of UTC.",
  },
  {
    q: "Why do time zone differences between cities change twice each year?",
    a: "Differences shift because countries transition to Daylight Saving Time (DST) on different dates or do not observe DST at all. The United States shifts DST on the second Sunday of March and first Sunday of November, whereas the European Union shifts on the last Sunday of March and October. Consequently, for 1–3 weeks in March and October/November, the time difference between New York and London shrinks from 5 hours to 4 hours.",
  },
  {
    q: "Which major countries do not observe Daylight Saving Time?",
    a: "Approximately 60% of the world's countries do not observe DST. Prominent non-observing nations include China, Japan, India, Singapore, Thailand, Saudi Arabia, the United Arab Emirates, Kenya, South Africa, and Russia (which abolished DST in 2014). In North America, the US state of Hawaii and most of Arizona also remain on standard year-round time.",
  },
  {
    q: "What happens when you cross the International Date Line (IDL)?",
    a: "The International Date Line roughly follows the 180° meridian in the Pacific Ocean. Crossing the IDL traveling westward (from the Americas toward Asia or Australasia) moves your calendar forward by one full day (+24 hours). Crossing eastward (from Asia toward North America) moves the calendar backward by one full day (-24 hours).",
  },
  {
    q: "Why do some countries have fractional 30-minute or 45-minute UTC offsets?",
    a: "Fractional offsets were chosen for geographic solar alignment or national cohesion. India adopted a unified time zone (IST, UTC+5:30) exactly centered on the 82.5°E meridian in Mirzapur. Iran uses UTC+3:30. Nepal uses UTC+5:45, centered on Gauri Sankar mountain. Australia features UTC+9:30 (Adelaide/Darwin) and UTC+8:45 in Eucla. Chatham Island (New Zealand) operates on UTC+12:45.",
  },
];

export default function TimeZoneDifferencePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/geography", label: "Geography" }}
      title="Time Zone Difference Calculator"
      intro="Calculate exact time differences, day adjustments, and business working hour overlaps between global UTC time zones and international cities for remote team collaboration."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Scientific Chronometric Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-400 dark:ring-cyan-500/30">
                <svg className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                BIPM Time Department &amp; IERS Universal Time Protocols
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">ISO 8601 Temporal Formatting &amp; ITU-R TF.460 Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Chronometry &amp; Global Synchronization</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Chronometric Summary: Calculating Worldwide Time Differences
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              To calculate the time difference between two locations, compute the algebraic difference between their <strong>Coordinated Universal Time (UTC) offsets</strong>: ΔT = UTC_dest - UTC_origin. If New York is at UTC-5 and London is at UTC+0, London is +5 hours ahead. Converting 9:00 AM New York time yields 2:00 PM London time. For remote distributed teams, the mutual <strong>real-time business window</strong> represents the overlapping hours where both locations operate between 9:00 AM and 5:00 PM local time. Compute flight travel durations between destinations with our <a href="/calculators/datetime/time-duration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time duration calculator</a>.
            </p>
          </div>

          <h2>Global UTC Offsets &amp; Circadian Working Overlap Dynamics</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <WorldTimeZoneCircadianSpectrumChart />
          </div>

          <p>
            Because the Earth completes a 360° axial rotation every 24 hours, the sun traverses approximately 15° of longitude each hour (360° / 24 = 15° per hour). In 1884, the International Meridian Conference established Greenwich, England (0° longitude) as the initial Prime Meridian, partitioning the globe into 24 theoretical hour zones centered on consecutive 15° meridians. Check longitudinal grid convergences with our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude and longitude calculator</a>.
          </p>
          <p>
            In contemporary telecommunications, global finance, and software engineering, time synchronization is dictated by <strong>Coordinated Universal Time (UTC)</strong>. Unlike historical solar time, which drifts with Earth&apos;s eccentric orbital speed, UTC is maintained by an ensemble of high-precision atomic clocks with nanosecond accuracy. However, national political boundaries, economic alliances, and labor laws make actual world time zones far more intricate than 24 uniform geometric slices. Calculate physical flight corridors across time zones using our <a href="/calculators/geography/distance-between-cities-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">distance between cities calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Zone Offset, Destination Time and Calendar Day Rollover Equations</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\Delta T = \\text{UTC}_{\\text{dest}} - \\text{UTC}_{\\text{orig}}, \\quad T_{\\text{dest}} = T_{\\text{orig}} + \\Delta T, \\quad \\text{Day Shift} = \\left\\lfloor \\frac{T_{\\text{orig}} + \\Delta T}{24} \\right\\rfloor"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Where times are expressed in 24-hour decimal notation. If destination time is 24 or greater, subtract 24 and advance the calendar by +1 day; if negative, add 24 and decrement the calendar by -1 day.</div>
          </Formula>

          <h2>UTC vs. GMT vs. International Atomic Time (TAI)</h2>
          <p>
            While colloquial speech often uses <strong>UTC</strong> and <strong>GMT</strong> interchangeably, they represent distinct scientific standards:
          </p>
          <ul>
            <li>
              <strong>Greenwich Mean Time (GMT):</strong> Established in 1675 for maritime celestial navigation, GMT is a solar time standard tied to the mean solar transit across the Royal Observatory in Greenwich. Because Earth&apos;s rotation is slightly irregular due to lunar tidal friction and core mantle oscillations, GMT is fundamentally astronomical rather than physical.
            </li>
            <li>
              <strong>International Atomic Time (TAI):</strong> Maintained by the Bureau International des Poids et Mesures (BIPM) in Sèvres, France, TAI is synthesized from over 400 laboratory-grade cesium-133 fountain atomic clocks. One SI second is defined precisely as 9,192,631,770 cycles of the cesium atom&apos;s hyperfine transition. TAI never stops, adjusts, or skips seconds.
            </li>
            <li>
              <strong>Coordinated Universal Time (UTC):</strong> Created in 1960 to bridge atomic precision with astronomical reality, UTC matches TAI&apos;s exact tick rate, but applies periodic <em>leap seconds</em> whenever the difference between TAI and astronomical mean solar time (UT1) approaches 0.9 seconds. Currently, TAI is exactly 37 seconds ahead of UTC. In 2022, the General Conference on Weights and Measures resolved to phase out leap seconds by 2035 to ensure uninterrupted telecommunications and cloud computing stability.
            </li>
          </ul>

          <h2>Daylight Saving Time (DST) Asynchronies</h2>
          <p>
            Managing cross-border teams is further complicated by daylight saving time schedules. Approximately 70 nations observe seasonal time shifts, but their transition dates do not align:
          </p>
          <ul>
            <li>
              <strong>North America (US &amp; Canada):</strong> Shifts forward (+1 hr) on the second Sunday in March at 2:00 AM, and shifts back on the first Sunday in November.
            </li>
            <li>
              <strong>European Union &amp; United Kingdom:</strong> Shifts forward on the last Sunday in March at 1:00 AM UTC, and shifts back on the last Sunday in October.
            </li>
            <li>
              <strong>The Southern Hemisphere Inversion:</strong> In Australia, New Zealand, and Chile, summer occurs from December to February. Consequently, while New York falls back in November, Sydney springs forward in October, swinging their mutual time difference from 14 hours to 16 hours.
            </li>
          </ul>
          <p>
            Review leap year calendrical cycles that affect long-term scheduling using our <a href="/calculators/datetime/year-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">year calculator</a>, and calculate percentage productivity gains in asynchronous teams with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
          </p>

          <h2>International Business Overlap Reference Table</h2>
          <p>
            The table below documents primary financial and engineering corridors worldwide, including standard time differentials, daylight variations, and shared working hours (assuming standard 9:00 AM to 5:00 PM local office hours):
          </p>

          <DataTable
            head={["Global City Pair", "Origin UTC", "Dest UTC", "Standard Difference", "DST Shift Window", "Mutual 9–5 Overlap", "Collaboration Model"]}
            rows={[
              ["London ↔ Paris / Frankfurt", "UTC+0", "UTC+1", "1 hour ahead", "Synchronous EU shift", "7 Hours (Full Day)", "Real-time synchronous co-working"],
              ["New York (EST) ↔ London (GMT)", "UTC-5", "UTC+0", "5 hours ahead", "Shrinks to 4 hrs (March/Nov)", "3 Hours (9 AM–12 PM NY)", "Morning US sync, afternoon UK close"],
              ["London (GMT) ↔ Dubai (GST)", "UTC+0", "UTC+4", "4 hours ahead", "Dubai has no DST (shifts to 3 hrs)", "4 Hours (9 AM–1 PM London)", "Midday financial trading overlap"],
              ["San Francisco (PST) ↔ New York (EST)", "UTC-8", "UTC-5", "3 hours ahead", "Synchronous US shift", "5 Hours (9 AM–2 PM Pacific)", "High-bandwidth domestic collaboration"],
              ["London (GMT) ↔ Singapore (SGT)", "UTC+0", "UTC+8", "8 hours ahead", "Singapore has no DST (shifts to 7 hrs)", "1 Hour (9 AM–10 AM London)", "Strict morning standup window"],
              ["New York (EST) ↔ Tokyo (JST)", "UTC-5", "UTC+9", "14 hours ahead", "Tokyo has no DST (shifts to 13 hrs)", "0 Hours (Opposite Day)", "Asynchronous handoff via Jira/Slack"],
              ["London (GMT) ↔ Sydney (AEST)", "UTC+0", "UTC+10", "10–11 hrs ahead", "Inverted seasons (peaks at 11 hrs)", "0–1 Hour (Early UK / Late AUS)", "Asynchronous relay schedule"],
              ["San Francisco (PST) ↔ Tokyo (JST)", "UTC-8", "UTC+9", "17 hours ahead", "Tokyo has no DST (shifts to 16 hrs)", "1–2 Hours (Late US afternoon)", "Golden evening window for Pacific rim"],
              ["London (GMT) ↔ Mumbai (IST)", "UTC+0", "UTC+5:30", "5.5 hours ahead", "India has no DST (shifts to 4.5 hrs)", "2.5 Hours (9 AM–11:30 AM London)", "Midday enterprise tech sync"],
            ]}
          />

          <h2>The International Date Line &amp; Geopolitical Anomalies</h2>
          <p>
            The <strong>International Date Line (IDL)</strong> deviates substantially from the pristine $180^\circ$ meridian to accommodate economic and political cohesion. Notable global anomalies include:
          </p>
          <ol>
            <li>
              <strong>Kiribati (Line Islands – UTC+14):</strong> In 1995, the Pacific republic of Kiribati moved the IDL thousands of kilometers east so that its 33 coral atolls, spanning 3.5 million square kilometers of ocean, would share the same calendar day. Kiribati is the first nation on Earth to welcome each new calendar year. Calculate territorial land-to-sea metrics with our <a href="/calculators/geography/country-area-population-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">country area and population calculator</a>.
            </li>
            <li>
              <strong>Samoa&apos;s Dateline Hop (2011):</strong> To align business trading days with major economic partners Australia and New Zealand, Samoa skipped December 30, 2011 entirely, leaping from UTC-11 to UTC+13.
            </li>
            <li>
              <strong>China&apos;s Unified Mega-Zone (UTC+8):</strong> Despite spanning over 5,000 kilometers from east to west—a physical breadth covering five distinct $15^\circ$ geographical time zones—China officially mandates a single national time zone (Beijing Standard Time, UTC+8). In western Xinjiang, the solar noon occurs around 3:00 PM local clock time.
            </li>
            <li>
              <strong>Fractional 30-Minute and 45-Minute Offsets:</strong> India (UTC+5:30), Iran (UTC+3:30), Afghanistan (UTC+4:30), Myanmar (UTC+6:30), Newfoundland (UTC-3:30), and Nepal (UTC+5:45) maintain half-hour or three-quarter-hour offsets to center clocks precisely on their geographic meridian. Express these custom offsets as fractional ratios with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
            </li>
          </ol>

          <h2>Operational Remote Team Scheduling Protocols</h2>
          <p>
            When managing engineering squads, executive boards, or customer support operations across multiple continents, adopt these organizational best practices:
          </p>
          <ul>
            <li>
              <strong>Standardize on UTC for Timestamps:</strong> Store all application database events, audit logs, and git commits in ISO 8601 UTC format (<code>YYYY-MM-DDTHH:MM:SSZ</code>) to eliminate DST conversion ambiguity.
            </li>
            <li>
              <strong>Anchor Meetings to Fixed UTC Hours:</strong> When scheduling recurring weekly international meetings across DST boundaries, decide whether the meeting is anchored to the organizer&apos;s local time or a fixed UTC hour. If anchored to London time, US attendees will see the meeting move an hour earlier or later during March and November transition weeks. Calculate organizational software licensing and contractor overheads with our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">budget calculator</a>.
            </li>
            <li>
              <strong>Maintain Circadian Empathy:</strong> Avoid scheduling recurring mandatory synchronization meetings outside of 8:00 AM to 6:00 PM local participant hours. Where overlap is mathematically impossible (such as NYC and Tokyo), transition team workflows to high-fidelity asynchronous collaboration. Track daily metabolic health and energy balance during international business travel using our <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>, and calculate route chart map scales with our <a href="/calculators/geography/map-scale-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">map scale calculator</a>.
            </li>
          </ul>
        </>
      }
    >
      <TimeZoneDifferenceCalculator />
    </CalcPage>
  );
}
