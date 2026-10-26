import type { Metadata } from "next";
import Link from "next/link";
import TimeZoneConverterComponent from "@/components/calcs/datetime/time-zone-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GlobalUtcOffsetLongitudinalSpanChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/time-zone-converter";
const TITLE = "Time Zone Converter | Global UTC Offsets, DST & World Meeting Planner";
const DESCRIPTION =
  "Convert time across world time zones with Coordinated Universal Time (UTC) offsets, Daylight Saving Time (DST) transitions, and international business meeting coordination.";

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
  { href: "/calculators/datetime/time-duration-calculator", icon: "🕒", name: "Time Duration" },
  { href: "/calculators/datetime/unix-timestamp-converter", icon: "💻", name: "UNIX Timestamp" },
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/measurements/time-converter", icon: "⌛", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why do some global time zones have half-hour or 45-minute fractional offsets?",
    a: "While theoretical standard time zones span 15° of longitude corresponding to integer 1-hour offsets, sovereign nations establish time boundaries based on domestic geography and political consensus. India (IST, UTC+5:30) and Sri Lanka chose a central 82.5°E meridian to unify a massive subcontinent under a single time zone. Similarly, Nepal chose UTC+5:45 based on the meridian passing through Gauri Sankar mountain, and parts of Australia use UTC+9:30.",
  },
  {
    q: "What is the historical origin of Greenwich Mean Time (GMT) and UTC?",
    a: "Greenwich Mean Time (GMT) was adopted in 1884 at the International Meridian Conference in Washington, D.C., establishing the Royal Observatory in Greenwich, London as the Prime Meridian (0° longitude). In 1960, Coordinated Universal Time (UTC) was formulated to replace GMT as the international atomic time standard, keeping civil time synchronized with Earth's rotation via atomic clocks and leap seconds.",
  },
  {
    q: "How does crossing the International Date Line (180° meridian) affect calendar dates?",
    a: "The International Date Line (IDL) runs roughly along the 180° meridian in the Pacific Ocean. Crossing the line westward (e.g., from Hawaii to New Zealand) advances the calendar by one full day (+24 hours). Crossing eastward (e.g., from Tokyo to San Francisco) shifts the calendar backward by one full day (−24 hours), causing travelers to 'repeat' a calendar day.",
  },
  {
    q: "Why is Daylight Saving Time (DST) becoming increasingly controversial globally?",
    a: "DST was introduced during WWI to conserve coal by shifting evening daylight hours. However, modern economic and public health studies demonstrate that the semiannual clock shift disrupts human circadian biology, causing measurable spikes in acute myocardial infarctions (heart attacks), vehicular traffic accidents, and workplace injuries in the week immediately following the spring transition.",
  },
];

export default function TimeZoneConverterPage() {
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
            <strong>Global Timezone Coordination Guidance:</strong> International time conversion maps local civil times through Coordinated Universal Time (UTC). In cross-border enterprise operations and travel scheduling, compute elapsed shift spans in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link>, add sexagesimal offsets in our <Link href="/calculators/datetime/time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time calculator</Link>, or inspect system server timestamps in our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Terrestrial Longitude &amp; Global Timezone Geometric Span
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because Earth rotates 360° on its polar axis once every 24 hours, the surface of the globe naturally divides into 24 theoretical longitudinal hourly zones, each spanning exactly 15° of geographic longitude (360° / 24 = 15° per hour, or 1° every 4 minutes). At solar noon, the Sun culminates at its highest apparent elevation along the local celestial meridian.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Prior to the expansion of 19th-century railway networks, every city maintained its own local solar time based on town sundials, creating thousands of conflicting local times across North America and Europe. Canadian railway engineer Sir Sandford Fleming championed the standard worldwide timezone framework adopted at the 1884 International Meridian Conference. The chart below visualizes the theoretical and civil longitudinal offsets across representative global commercial centers.
          </p>

          <GlobalUtcOffsetLongitudinalSpanChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Timezone Conversion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Converting a local civil timestamp T_src = (H_src, M_src) in a source timezone with offset O_src to a target timezone with offset O_dst requires converting to Coordinated Universal Time (UTC) as an invariant pivot coordinate:
          </p>
          <Formula>{"t_{\text{utc}} = \left( (H_{\text{src}} \times 60) + M_{\text{src}} - (O_{\text{src}} \times 60) + 1440 \right) \pmod{1440}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Once normalized to UTC minutes of the day, the target time in minutes t_dst is computed by applying the target timezone offset O_dst:
          </p>
          <Formula>{"t_{\text{dst}} = t_{\text{utc}} + (O_{\text{dst}} \times 60) = (H_{\text{src}} \times 60) + M_{\text{src}} + \left( O_{\text{dst}} - O_{\text{src}} \right) \times 60"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The net day shift Delta Day across midnight or the International Date Line is derived via integer floor division:
          </p>
          <Formula>{"\Delta \text{Day} = \left\lfloor \frac{(H_{\text{src}} \times 60) + M_{\text{src}} + (O_{\text{dst}} - O_{\text{src}}) \times 60}{1440} \right\rfloor"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where Delta Day = +1 indicates the target time falls on the following calendar day, and Delta Day = −1 indicates the previous calendar day. In software systems, this transformation is managed via the IANA Time Zone Database (tzdb). To examine working schedules across distributed teams, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Timezone Benchmarks &amp; Major Financial Capital Offsets
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes standard civil timezones, representative metropolitan hubs, UTC offsets, Daylight Saving Time observance, and key financial exchange trading windows:
          </p>
          <DataTable
            head={["Timezone Identifier", "Standard UTC Offset", "Representative Financial Capitals", "DST Observance Status", "Major Financial Exchange Hours"]}
            rows={[
              ["UTC / GMT", "UTC ± 00:00", "London, Dublin, Lisbon, Reykjavik", "Observes BST (UTC+1) in summer", "London Stock Exchange (08:00 - 16:30 GMT)"],
              ["CET / CEST", "UTC + 01:00", "Frankfurt, Paris, Zurich, Milan, Madrid", "Observes CEST (UTC+2) in summer", "Deutsche Boerse, Euronext (09:00 - 17:30 CET)"],
              ["EST / EDT", "UTC − 05:00", "New York, Toronto, Boston, Miami", "Observes EDT (UTC-4) in summer", "New York Stock Exchange (09:30 - 16:00 EST)"],
              ["CST / CDT", "UTC − 06:00", "Chicago, Houston, Mexico City, Dallas", "Observes CDT (UTC-5) in summer", "Chicago Mercantile Exchange (CME Group)"],
              ["PST / PDT", "UTC − 08:00", "Los Angeles, San Francisco, Seattle", "Observes PDT (UTC-7) in summer", "Silicon Valley tech HQ operational baseline"],
              ["JST", "UTC + 09:00", "Tokyo, Osaka, Kyoto", "No DST observed (Permanent)", "Tokyo Stock Exchange (09:00 - 15:30 JST)"],
              ["CST (China)", "UTC + 08:00", "Beijing, Shanghai, Hong Kong, Singapore", "No DST observed (Permanent)", "Hong Kong Stock Exchange (09:30 - 16:00 HKT)"],
              ["IST (India)", "UTC + 05:30", "Mumbai, New Delhi, Bengaluru", "No DST observed (Permanent)", "National Stock Exchange of India (NSE)"],
              ["AEST / AEDT", "UTC + 10:00", "Sydney, Melbourne, Brisbane, Canberra", "Observes AEDT (UTC+11) in summer", "Australian Securities Exchange (ASX)"],
              ["NZST / NZDT", "UTC + 12:00", "Auckland, Wellington, Christchurch", "Observes NZDT (UTC+13) in summer", "New Zealand Exchange (NZX)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Scheduling a Tri-Continental Executive Meeting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an executive coordinator scheduling a global board meeting involving participants in San Francisco (PST, UTC-8), London (GMT, UTC±0), and Tokyo (JST, UTC+9). The executive team seeks a 1-hour conference window during standard waking hours (between 07:00 and 22:00 local time for all participants):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Test 16:00 PST in San Francisco):</strong> San Francisco = 16:00 (4:00 PM PST, Day 1). In UTC: 16:00 − (−8h) = 24:00 UTC = 00:00 UTC (Midnight, Day 2).</li>
            <li><strong>Step 2 (Map to London and Tokyo Coordinates):</strong> London (UTC±0) = 00:00 (Midnight, Day 2). Tokyo (UTC+9) = 00:00 + 9h = 09:00 AM (Day 2). Result: London participant is asleep at midnight. Fails feasibility test.</li>
            <li><strong>Step 3 (Test Alternative: 14:00 GMT in London):</strong> London = 14:00 (2:00 PM GMT, Day 1). UTC = 14:00. San Francisco = 14:00 + (−8h) = 06:00 AM (Early morning, Day 1). Tokyo = 14:00 + 9h = 23:00 (11:00 PM night, Day 1). Result: Extremely tight for all parties.</li>
            <li><strong>Step 4 (Optimal Working Horizon: 21:00 UTC):</strong> London = 21:00 (Evening, Day 1). San Francisco = 13:00 (1:00 PM Afternoon, Day 1). Tokyo = 06:00 AM (Morning, Day 2). All participants fall within acceptable waking bounds. Cross-reference work shift lengths in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link> and calculate business schedules in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The IANA Time Zone Database (tzdb) &amp; Olson Architectural Rules
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern computer software engineering, timezones are never modeled as simple fixed numerical offsets because geopolitical governments change Daylight Saving Time rules, abolish clock shifts, or alter standard offsets on short notice. The definitive reference standard is the IANA Time Zone Database (originally created by Arthur David Olson), also known as &apos;tzdb&apos; or &apos;zoneinfo&apos;.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The database assigns unique geographic identifiers based on &apos;Area/Location&apos; (e.g., America/New_York, Europe/London, Asia/Tokyo) rather than ambiguous 3-letter abbreviations (e.g., &apos;CST&apos; can denote US Central Standard Time, China Standard Time, or Cuba Standard Time). The database preserves historical timezone transition rules dating back to the year 1970, enabling operating systems to parse historical timestamps without temporal ambiguity. To inspect epoch seconds, explore our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Commercial Aviation, Cloud Computing &amp; Live Broadcasting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international commercial aviation, air traffic controllers, pilots, and flight dispatchers communicate exclusively in &apos;Z&apos; (Zulu time, equivalent to UTC) to prevent mid-air collisions and runway scheduling errors across sovereign airspace boundaries.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global live sports broadcasting (FIFA World Cup, Olympic Games), timezone conversions govern satellite transmission windows and prime-time advertising pricing. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert metric durations in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Geopolitics of Time: Kiribati Line Islands &amp; China&apos;s Single-Zone Policy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While theoretical timezones reflect purely astronomical longitude, civil time zones are frequently defined by sovereign geopolitical and macroeconomic considerations. The Pacific island republic of Kiribati famously straddled the International Date Line prior to 1995, causing its eastern Line Islands to be 22 hours behind its western capital in Tarawa, resulting in only four shared business days per week.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On January 1, 1995, Kiribati unilaterally shifted the International Date Line more than 1,000 kilometers eastward, creating time zones UTC+13 and UTC+14 (Line Islands), ensuring the entire nation shared the identical calendar day and becoming the first inhabited territory to welcome the new millennium on January 1, 2000. Conversely, China—which geographically spans five astronomical hourly time zones—mandates a single nationwide time standard (Beijing Time, UTC+8) to foster national unity, causing solar noon in western Xinjiang to occur as late as 15:00 (3:00 PM).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Satellite Navigation Time Synchronization: GPS vs. Galileo vs. GLONASS
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Global Navigation Satellite Systems (GNSS) operate their own independent, highly stable internal atomic timescales. United States GPS Time began at midnight on January 6, 1980; because GPS time does not incorporate leap seconds, it is currently ahead of UTC by exactly 18 seconds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The European Union&apos;s Galileo System Time (GST) is synchronized with International Atomic Time (TAI) and maintains a steering offset within 50 nanoseconds of GPS. In contrast, the Russian GLONASS constellation incorporates leap seconds directly into its satellite time broadcasts, causing occasional receiver resets during intercalary second insertions. Multi-constellation GNSS receivers continuously resolve these nano-second inter-system hardware biases.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Microsecond Financial Horology: PTP IEEE 1588 &amp; High-Frequency Trading Arbitrage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global algorithmic equity and derivatives exchanges—such as the Chicago Mercantile Exchange (CME), Nasdaq, and the London Stock Exchange—time zone synchronization extends far beyond human convenience into the nanosecond regime governed by financial market regulations. Under the European Union&apos;s MiFID II (Markets in Financial Instruments Directive II) RTS 25 regulatory mandate, algorithmic trading platforms must timestamp financial order messages with an absolute time accuracy of 100 microseconds relative to UTC, with a timestamp resolution of 1 microsecond.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To achieve this level of cross-continental synchronization across disparate colocation data centers in New Jersey, London, Frankfurt, and Tokyo, modern fintech infrastructures bypass standard Network Time Protocol (NTP), which suffers from millisecond-level network packet jitter across wide area networks. Instead, financial networks deploy the Precision Time Protocol (PTP, IEEE 1588-2008) alongside hardware-based GPS and Galileo grandmaster atomic clock receivers installed directly in server racks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            PTP utilizes hardware timestamping at the physical network interface layer (PHY) to measure round-trip packet transmission asymmetries, allowing distributed trading servers across global time zones to synchronize their internal transaction clocks within sub-microsecond margins, ensuring fair execution and eliminating order book latency arbitrage.
          </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, cross-border interbank wires governed by the SWIFT banking messaging network mandate ISO 8601 UTC timestamping on all payment execution confirmations, eliminating daylight settlement disputes across Tokyo, Frankfurt, London, and New York currency corridors. Automated foreign exchange spot rate fixings similarly rely on synchronized UTC snapshots to lock multi-currency clearing values without market timing distortions.
          </p>
        </>
      }
    >
      <TimeZoneConverterComponent />
    </CalcPage>
  );
}
