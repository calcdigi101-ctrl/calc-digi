import type { Metadata } from "next";
import Link from "next/link";
import WorkdaysCalculatorComponent from "@/components/calcs/datetime/workdays-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AnnualWorkingDaysVsHolidaysBreakdownChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/workdays-calculator";
const TITLE = "Workdays Calculator | Business Days Between Dates & Project Float";
const DESCRIPTION =
  "Calculate exact business working days between two dates, exclude weekends and statutory public holidays, and model critical path project scheduling and labor billable hours.";

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
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/week-number-calculator", icon: "🗓️", name: "Week Number" },
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/measurements/time-converter", icon: "🕒", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How many working business days are in an average Gregorian calendar year?",
    a: "A standard common year of 365 days contains exactly 52 weeks and 1 day, which translates to 104 weekend days (52 Saturdays and 52 Sundays). This leaves 261 potential Monday-through-Friday weekdays (or 262 in a leap year). After deducting standard statutory public holidays (typically 10 to 11 days in the United States and OECD economies), an average year contains approximately 250 to 251 net working days.",
  },
  {
    q: "How does the business day calculation handle holidays that fall on a weekend?",
    a: "Under statutory civil service rules in most nations, when an official public holiday falls on a Saturday, the preceding Friday is observed as a paid holiday ('Friday observance'). When a holiday falls on a Sunday, the following Monday is designated as the observed public holiday ('Monday observance'). Our calculator allows users to configure the exact number of observed holiday deductions.",
  },
  {
    q: "What is the difference between business days, working days, and calendar days in contracts?",
    a: "Calendar days count every continuous 24-hour period including weekends and holidays. Business days (or working days) strictly encompass Monday through Friday, excluding official public banking holidays. In commercial contract service level agreements (SLAs), a '5-business-day turnaround' provides a full calendar week, whereas '5 calendar days' includes the weekend.",
  },
  {
    q: "What are the Following and Modified Following business day conventions in banking?",
    a: "In interbank OTC derivative contracts (ISDA agreements), when a scheduled payment date falls on a non-business day, the 'Following' convention rolls payment to the next business day. The 'Modified Following' convention rolls payment to the next business day UNLESS that day falls into the next calendar month, in which case payment is rolled backward to the immediately preceding business day.",
  },
];

export default function WorkdaysCalculatorPage() {
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
            <strong>Business Day Scheduling Guidance:</strong> Accurate project sprint planning requires filtering weekend days and observed statutory public holidays from gross calendar spans. In project management and legal discovery, track gross calendar intervals with our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, convert shift durations to decimal billing hours in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link>, or monitor annual week cycles in our <Link href="/calculators/datetime/week-number-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">week number calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Working Days Architecture: Workdays vs. Statutory Public Holidays
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global economic productivity modeling, human labor capacity is bounded by the five-day workweek established during the early 20th century labor movement (notably popularized by Henry Ford in 1926). Across the 365 calendar days of a standard year, the interplay between weekend rest days, statutory public holidays, and mandatory annual leave defines a nation&apos;s productive operational capacity.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As illustrated in the OECD comparative benchmark chart below, gross business workdays remain relatively consistent at 250 to 253 days per year across major industrialized economies, while statutory holiday allocations vary significantly between 8 days in the United Kingdom up to 16 days in Japan.
          </p>

          <AnnualWorkingDaysVsHolidaysBreakdownChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Business Working Days
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To compute net business working days between a start date D_start and an end date D_end, the algorithm evaluates each continuous solar day using indicator functions filtering out non-business coordinates:
          </p>
          <Formula>{"D_{\text{gross}} = \text{JDN}(D_{\text{end}}) - \text{JDN}(D_{\text{start}}) + 1"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The full calendar weeks W and residual days R are derived via integer division: W = floor(D_gross / 7) and R = D_gross mod 7. The total number of weekend days N_weekend is computed as:
          </p>
          <Formula>{"N_{\text{weekend}} = 2W + \sum_{k=0}^{R-1} \mathbb{I}\left( (\text{DayOfWeek}(D_{\text{start}}) + k) \pmod 7 \in \{0, 6\} \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Deducting statutory public holidays H_public that fall strictly on Monday through Friday yields the net business working days:
          </p>
          <Formula>{"D_{\text{business}} = D_{\text{gross}} - N_{\text{weekend}} - H_{\text{public}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Multiplying net business days by the standard contractual workday duration (typically 8.0 hours) calculates total productive labor hours: H_labor = D_business x 8.0 hours. In project management, this metric governs Critical Path Method (CPM) resource leveling; cross-reference project completion percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and calculate financial billing ratios in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Labor Benchmarks &amp; Statutory Holiday Allowances
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes annual working day parameters, weekend distributions, statutory paid public holidays, and mandatory annual leave across representative OECD nations:
          </p>
          <DataTable
            head={["Sovereign Jurisdiction", "Gross Annual Workdays", "Weekend Days (Sat/Sun)", "Paid Public Holidays", "Statutory Annual Leave"]}
            rows={[
              ["United States", "260 Days", "104 Days", "11 Federal Holidays", "0 Days Statutory (15 Days Typical)"],
              ["United Kingdom", "260 Days", "104 Days", "08 Bank Holidays", "28 Days Mandatory (5.6 Weeks)"],
              ["Germany", "260 Days", "104 Days", "10 to 14 State Holidays", "20 to 30 Days Mandatory"],
              ["Japan", "260 Days", "104 Days", "16 National Holidays", "10 to 20 Days Mandatory"],
              ["France", "260 Days", "104 Days", "11 National Holidays", "25 to 30 Days Mandatory (RTT)"],
              ["Canada", "260 Days", "104 Days", "10 Statutory Holidays", "10 to 15 Days Mandatory"],
              ["Australia", "260 Days", "104 Days", "10 to 13 State Holidays", "20 Days Mandatory (4 Weeks)"],
              ["India", "260 Days", "104 Days", "14 to 18 Gazetted Holidays", "15 to 18 Days Mandatory"],
              ["Singapore", "260 Days", "104 Days", "11 Public Holidays", "07 to 14 Days Mandatory"],
              ["Switzerland", "260 Days", "104 Days", "09 to 15 Cantonal Holidays", "20 Days Mandatory (4 Weeks)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Software Agile Sprint Capacity Planning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an engineering scrum master scheduling a major software enterprise quarterly release spanning from Monday, November 2, 2026 through Thursday, December 31, 2026. The corporate engineering department observes 3 paid public holidays during this period (Veterans Day, Thanksgiving Day, and the Day After Thanksgiving). The engineering team must calculate total net working days and total billable engineering hours across 8 full-time developers:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Determine Gross Calendar Days):</strong> From November 2 to December 31, 2026 inclusive. Days in November = 29 days (Nov 2 to 30). Days in December = 31 days. Total gross calendar span = 29 + 31 = <strong>60 calendar days</strong>.</li>
            <li><strong>Step 2 (Enumerate Weekend Days):</strong> In 60 days, there are 8 full weeks and 4 residual days (Mon-Thu). Total weekend days = (8 x 2) + 0 = <strong>16 weekend days</strong> (8 Saturdays and 8 Sundays).</li>
            <li><strong>Step 3 (Deduct Observed Public Holidays):</strong> Gross weekdays (Mon-Fri) = 60 − 16 = 44 weekdays. Deducting the 3 observed corporate public holidays: Net business working days = 44 − 3 = <strong>41 business days</strong>.</li>
            <li><strong>Step 4 (Compute Total Engineering Labor Capacity):</strong> 41 business days x 8.0 hours/day = 328 individual working hours per developer. Across an 8-developer engineering pod: Total team labor capacity = 328 x 8 = <strong>2,624 engineering hours</strong>. Cross-reference shift allocations in our <Link href="/calculators/datetime/time-duration-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time duration calculator</Link> and convert times in our <Link href="/calculators/datetime/time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Critical Path Method (CPM) &amp; Total Float Scheduling Kinetics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In project management professional standards (PMI PMBOK), business working days constitute the core unit of task duration estimation. In the Critical Path Method (CPM), activities are mapped onto an acyclic directed graph of dependencies. Forward pass calculations determine Early Start (ES) and Early Finish (EF) dates, while backward pass calculations determine Late Start (LS) and Late Finish (LF) dates.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The difference between late finish and early finish defines Total Float: TF = LF − EF. Tasks with zero float dictate the critical path; any slip in business days along the critical path pushes the final project delivery date back by an identical duration. To track milestone countdowns, explore our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Civil Litigation, Banking Settlement &amp; Payroll
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil judicial procedure, court discovery rules and statutory filing periods universally stipulate business days rather than calendar days. If a litigant is granted 14 days to respond to an interrogatory, civil rules exclude Saturdays, Sundays, and legal holidays, providing an effective calendar buffer of nearly three full weeks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In corporate payroll management, workdays calculations determine bi-weekly and semi-monthly paycheck accruals and pro-rated salary deductions for new hires commencing employment mid-pay-period. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate calendar spans in our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, and convert time units in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 4-Day Workweek Global Pilots: Productivity Metrics &amp; Burnout Abatement
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In contemporary organizational design and labor economics, the traditional 5-day, 40-hour workweek is undergoing its most significant structural reassessment in a century. Coordinated by non-profit organization 4 Day Week Global alongside academic researchers at Boston College, Cambridge University, and Oxford University, large-scale trials across the UK, US, South Africa, and Ireland have evaluated the &apos;100-80-100&apos; model: 100% of baseline compensation for 80% of working time, provided 100% of baseline productive output is maintained.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Trial results demonstrated a 35% average increase in corporate revenues compared to historical periods, while employee burnout rates declined by 71%, sick leave fell by 65%, and employee voluntary turnover dropped by 57%. Over 92% of participating companies chose to make the 4-day (32-hour) workweek permanent, highlighting a macroeconomic evolution toward compressed working schedules.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Maritime Laytime &amp; Weather Working Days (WWD)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global maritime shipping and charterparty contracts (BIMCO standard contracts), calculating working days is governed by specialized legal definitions that directly impact millions of dollars in freight demurrage and despatch charges. A &apos;Weather Working Day&apos; (WWD) is defined as a standard working day during which atmospheric weather conditions (such as torrential rain, gale-force winds, or heavy swell) do not prevent safe vessel cargo loading or discharging operations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If severe weather interrupts cargo cranes for 4 hours during an 8-hour shift, half a working day is deducted from the charterer&apos;s contractual laytime allowance. Maritime arbitrations in London and Singapore adjudicate complex logbook entries to determine exact working hours and assign financial liability.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Project Scheduling: Critical Path Method (CPM) &amp; Working Day Buffer Float Analysis
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil engineering mega-projects, aerospace manufacturing, and EPC (Engineering, Procurement, Construction) infrastructure contracts, workday calculation forms the mathematical backbone of the Critical Path Method (CPM). Project management frameworks like Primavera P6 and Microsoft Project calculate the total duration of complex tasks by evaluating Early Start (ES), Early Finish (EF), Late Start (LS), and Late Finish (LF) milestone dates strictly in calendar working days.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When scheduling hundreds of sequential dependent activities, project engineers assign work calendars that account for 5-day or 6-day construction labor agreements, non-working seasonal weather shutdowns (such as concrete curing halts during sub-zero winter periods), and statutory public holidays. The difference between an activity&apos;s late finish and early finish dates represents Total Float:
          </p>
          <Formula>{"\\text{Total Float} = \\text{LF} - \\text{EF}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Activities possessing zero total float reside on the critical path, meaning any single working day delay on these tasks directly postpones overall project commissioning and triggers substantial liquidated damages contractual penalties. Accurate workday scheduling with calendar holiday overrides is therefore fundamental to contractual dispute mitigation and enterprise risk governance.
          </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international commercial banking and corporate mergers and acquisitions (M&amp;A), closing conditions and escrow funds release schedules are universally bound to strict business day definitions. Legal contracts specify that transactional escrow funds must clear within five business days following mutual board approvals, explicitly excluding banking holidays designated by the Federal Reserve Bank of New York or the European Central Bank to avert costly interest penalty claims.
          </p>
        </>
      }
    >
      <WorkdaysCalculatorComponent />
    </CalcPage>
  );
}
