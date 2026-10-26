import type { Metadata } from "next";
import Link from "next/link";
import WeekNumberCalculatorComponent from "@/components/calcs/datetime/week-number-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FiscalRetailCalendarVariationsChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/week-number-calculator";
const TITLE = "Week Number Calculator | ISO 8601 Week Date & Fiscal Retail 4-4-5 Calendar";
const DESCRIPTION =
  "Determine the current ISO 8601 week number, calculate weeks between dates, and explore National Retail Federation (NRF) 4-4-5 merchandise accounting calendars.";

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
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/calculators/datetime/month-calculator", icon: "🗓️", name: "Month Calculator" },
  { href: "/calculators/datetime/year-calculator", icon: "📆", name: "Year Calculator" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the ISO 8601 standard define Week 1 of any calendar year?",
    a: "Under the international standard ISO 8601, Week 1 of a year is formally defined as the week that contains the first Thursday of the new Gregorian calendar year (or equivalently, the week that contains January 4). Under ISO rules, Monday is always the first day of the week, and Sunday is the seventh. This definition guarantees that Week 1 always contains at least four days of the new calendar year.",
  },
  {
    q: "Why do some calendar years have 53 ISO weeks instead of 52?",
    a: "Because a standard common year contains 365 days (52 weeks + 1 day) and a leap year contains 366 days (52 weeks + 2 days), the residual days accumulate over time. Any common year that starts on a Thursday, or any leap year that starts on a Wednesday or Thursday, contains exactly 53 ISO weeks (known as a leap week year). On average, 53-week years occur roughly once every 5 to 6 years.",
  },
  {
    q: "What is the difference between the US traditional week and the ISO 8601 week?",
    a: "In traditional United States and Canadian civil practice, Sunday is considered the first day of the week, and Week 1 is often defined simply as the week containing January 1 (even if January 1 falls on a Saturday). In contrast, ISO 8601 (universally used in European commerce, manufacturing, and global supply chain logistics) designates Monday as Day 1 and requires the first week to contain at least four days of the new year.",
  },
  {
    q: "How do retail corporations utilize 4-4-5 accounting calendars for fiscal planning?",
    a: "In retail merchandise planning, the National Retail Federation (NRF) 4-4-5 calendar divides each 52-week year into four equal 13-week quarters. Each quarter consists of two 4-week months (28 days) followed by one 5-week month (35 days). This standard ensures that every retail month ends on a Saturday, eliminating distortions caused by varying numbers of weekend shopping days in Gregorian months.",
  },
];

export default function WeekNumberCalculatorPage() {
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
            <strong>Fiscal Week Scheduling Guidance:</strong> ISO 8601 week numbering synchronizes corporate enterprise manufacturing, logistics freight, and financial accounting. In supply chain operations, evaluate working business days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, add compounding calendar months in our <Link href="/calculators/datetime/month-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">month calculator</Link>, or track multi-year intervals in our <Link href="/calculators/datetime/year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">year calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Corporate Fiscal Calendar Pacing: ISO 8601 vs. Retail 4-4-5 Cycles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global corporate enterprise management and industrial supply chain logistics, measuring operational tempo by calendar months is notoriously problematic. Gregorian months vary in duration from 28 to 31 days and contain an irregular distribution of high-volume weekend trading days, distorting month-over-month inventory turnover and revenue metrics.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To establish an unvarying operational cadence, global commerce relies on standardized week date systems. The chart below contrasts standard Gregorian quarterly distribution against the National Retail Federation (NRF) 4-4-5 merchandise planning calendar, illustrating how 13-week operating cycles maintain perfect year-over-year comparable pacing.
          </p>

          <FiscalRetailCalendarVariationsChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of ISO 8601 Week Dates
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The International Organization for Standardization (ISO 8601-1:2019) specifies that an ISO week begins on Monday (Day 1) and ends on Sunday (Day 7). Week 01 of any Gregorian year is formally defined as the week that contains the first Thursday of that year.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To determine the ISO week number W for any calendar date D, the algorithm first identifies the calendar date of the Thursday belonging to the current week:
          </p>
          <Formula>{"\text{ThursdayDate}(D) = D + 4 - \text{DayOfWeekISO}(D)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where DayOfWeekISO maps Monday to 1 through Sunday to 7. The ISO year Y_iso is defined as the Gregorian year of this Thursday anchor. The week number W is then derived from the ordinal day of the year (DayOfYear) of the Thursday anchor:
          </p>
          <Formula>{"W = \left\lceil \frac{\text{DayOfYear}(\text{ThursdayDate}(D))}{7} \right\rceil = \left\lfloor \frac{10 + \text{DayOfYear}(D) - \text{DayOfWeekISO}(D)}{7} \right\rfloor"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If this formula yields W = 0, the date belongs to the final week (Week 52 or 53) of the preceding ISO year. If it yields W = 53 in a year that does not satisfy the 53-week criterion, it rolls into Week 01 of the subsequent ISO year. To evaluate project sprint allocations, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Week Numbering Conventions &amp; Retail Fiscal Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes the core technical parameters, starting days, and business domains of major international week numbering and fiscal retail calendar systems:
          </p>
          <DataTable
            head={["Calendar Framework", "First Day of Week", "Week 1 Defining Rule", "Total Weeks per Year", "Primary Global Domain"]}
            rows={[
              ["ISO 8601 International Standard", "Monday (Day 1)", "Week containing first Thursday (Jan 4)", "52 or 53 Weeks", "European business, global logistics, ISO APIs"],
              ["US Traditional Civil", "Sunday (Day 1)", "Week containing January 1", "52 to 54 Partial Weeks", "US desktop calendars, North American civil use"],
              ["Middle Eastern Standard", "Saturday (Day 1)", "Week containing first work day post-Friday", "52 Weeks", "Arab League, Gulf Cooperation Council (GCC)"],
              ["NRF 4-4-5 Retail Calendar", "Sunday (Day 1)", "First Sunday of February (Restock Cycle)", "52 Weeks (53 in Leap Year)", "US retail merchandise planning (Target, Walmart)"],
              ["NRF 4-5-4 Retail Calendar", "Sunday (Day 1)", "Peak promotional month in middle of quarter", "52 Weeks (53 in Leap Year)", "Fashion apparel, department store merchandising"],
              ["NRF 5-4-4 Retail Calendar", "Sunday (Day 1)", "First month expanded for seasonal promotions", "52 Weeks (53 in Leap Year)", "Commercial e-commerce supply chains"],
              ["Broadcast Calendar", "Monday (Day 1)", "Week containing first day of broadcast month", "52 Weeks", "Television & radio advertising billing cycles"],
              ["Fiscal 13x4 Calendar", "Monday (Day 1)", "13 equal 4-week operating periods (28 days)", "Exactly 13 Periods", "Food hospitality, restaurant chain management"],
              ["Academic Semester Calendar", "Monday (Day 1)", "First instructional week of autumn term", "15 Weeks per Semester", "Higher education university course scheduling"],
              ["Sprint Agile Framework", "Monday (Day 1)", "Bi-weekly recurring 10-business-day cycle", "26 Two-Week Sprints", "Software development Jira/Scrum engineering"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Calculating the ISO Week of October 26, 2026
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an automotive supply chain director in Stuttgart scheduling a containerized parts shipment departing on Monday, October 26, 2026. The European enterprise ERP system (SAP) requires the formal ISO 8601 week date string. We compute the exact ISO week parameters step by step:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Determine Day of Week):</strong> October 26, 2026 falls on a Monday. In ISO 8601 numbering: DayOfWeekISO = 1.</li>
            <li><strong>Step 2 (Locate Thursday Anchor of Current Week):</strong> ThursdayDate = October 26 + (4 − 1) = October 29, 2026. Since the Thursday anchor falls in 2026, the ISO year Y_iso = <strong>2026</strong>.</li>
            <li><strong>Step 3 (Compute Day of Year for Thursday Anchor):</strong> Cumulative days to October 29 in a common 365-day year = 31 (Jan) + 28 (Feb) + 31 (Mar) + 30 (Apr) + 31 (May) + 30 (Jun) + 31 (Jul) + 31 (Aug) + 30 (Sep) + 29 (Oct) = <strong>Day 302</strong>.</li>
            <li><strong>Step 4 (Evaluate Week Number Formula):</strong> W = ceil(302 / 7) = ceil(43.1428) = <strong>Week 44</strong>. The formal ISO 8601 week date string is <strong>2026-W44-1</strong>. Cross-reference project deadlines in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and convert time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 53-Week Leap Year Phenomenon in Retail Accounting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because a standard 52-week calendar contains exactly 364 days (52 x 7 = 364), each solar year leaves an uncounted remainder of 1.2422 days. Over a period of five to six years, this surplus accumulates into a full 7-day week.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In retail merchandising under NRF guidelines, retailers insert an extra 53rd week into the fourth fiscal quarter (transforming the 4-4-5 quarter into a 4-4-6 quarter). While the 53rd week generates a temporary surge in annual reported revenue, financial analysts must normalize financial models to evaluate authentic year-over-year identical store performance. To analyze quadrennial leap cycles, explore our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Manufacturing Batch Codes, Construction &amp; Aviation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global industrial manufacturing (pharmaceuticals, semiconductors, automotive tires), products are stamped with standardized date codes containing the two-digit year and two-digit week number (e.g., &apos;DOT 4426&apos; indicates a tire manufactured during Week 44 of 2026), streamlining quality recalls and inventory warranty audits.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial construction and civil architecture, multi-tier general contractors schedule milestone deliverables, concrete pours, and subcontractor handoffs by week numbers rather than specific calendar dates. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working business days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert timestamps in our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The French Republican Calendar &amp; The Failed 10-Day Decadic Week
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Throughout history, political and ideological regimes have attempted to replace the traditional 7-day weekly cycle with decimal alternatives. Following the French Revolution, the National Convention instituted the French Republican Calendar in 1793, abolishing the seven-day week in favor of the &apos;décade&apos;—a strictly decimal 10-day week where workers received only one rest day every ten days (decadi).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The decadic system was intensely unpopular among laborers due to increased work fatigue (working nine consecutive days instead of six). In 1929, the Soviet Union similarly attempted an &apos;uninterrupted workweek&apos; (neprerivka) featuring 5-day continuous rotating shifts with color-coded rest days to eliminate religious observances and maximize factory output. Both systems collapsed within a few years, demonstrating the profound cultural, physiological, and social resilience of the universal 7-day week.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Supply Chain Bullwhip Kinetics: Weekly Replenishment &amp; Safety Stock
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern supply chain logistics, inventory replenishment schedules are modeled on weekly batch cadences. When retail store managers observe slight weekly sales oscillations, upstream wholesalers, regional distributors, and manufacturing plants amplify those small variations into massive production swings—a systemic instability known as the &apos;bullwhip effect&apos;.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By standardizing inventory demand forecasts across synchronized ISO 8601 week buckets, enterprise demand planners utilize electronic data interchange (EDI) to share real-time point-of-sale data, stabilizing factory production schedules and minimizing unnecessary safety stock inventory holding costs.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Supply Chain S&amp;OP: ISO Week Cycles in Just-In-Time Lean Manufacturing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global supply chain management, sales and operations planning (S&amp;OP), and lean automotive manufacturing, calendar months are practically unusable for operational scheduling because months contain inconsistent numbers of working days, alternating weekends, and shifting month-end cutoffs. A production quota comparing a 28-day February to a 31-day March introduces severe statistical skew that misrepresents machine efficiency, inventory turnover, and worker productivity.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To establish stable operational cadences, manufacturing giants like Toyota, Airbus, and consumer packaged goods conglomerates structure all Master Production Schedules (MPS) and Material Requirements Planning (MRP) runs strictly around standard ISO weeks (W01 through W52/W53). Every ISO week contains exactly 168 hours and exactly 5 standard industrial workdays, enabling precise capacity utilization modeling. Automated enterprise resource planning (ERP) systems schedule supplier container arrivals, warehouse cross-docking slots, and quarterly inventory replenishments indexed to week codes (e.g., 2026-W42), ensuring frictionless coordination between transatlantic suppliers and domestic assembly lines.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Retail Markdown Cadence &amp; The 4-5-4 Merchandising Calendar Standard
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In omnichannel department store and apparel retail management, the National Retail Federation (NRF) 4-5-4 calendar divides each fiscal quarter into three structured monthly buckets containing four weeks, five weeks, and four weeks respectively. Because every month in this retail system starts on a Sunday and ends on a Saturday, year-over-year sales comparisons align identical trading days (e.g., comparing the third Saturday before Christmas year-over-year) without distorting same-store sales metrics with calendar drift.
          </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern academic timetabling and higher education administration across European universities, semesters and modular courses are systematically organized around sequential week numbers. Course syllabi, laboratory rotations, and final examination periods reference week integers (e.g., Week 14 to Week 16) rather than calendar dates, maintaining standardized teaching schedules regardless of when Easter or seasonal academic recesses fall.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, international shipping container freight lines and port terminals book vessel cargo berths according to week numbers, enabling global ocean carriers to maintain recurring weekly departure schedules across major trade routes between Asian export manufacturing hubs and Western import distribution terminals.
          </p>
        </>
      }
    >
      <WeekNumberCalculatorComponent />
    </CalcPage>
  );
}
