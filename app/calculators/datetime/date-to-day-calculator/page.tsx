import type { Metadata } from "next";
import Link from "next/link";
import DateToDayCalculatorComponent from "@/components/calcs/datetime/date-to-day-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WeekdayFrequencyPerCenturyChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/date-to-day-calculator";
const TITLE = "Date to Day Calculator | Day of Week by Date & Zeller's Congruence";
const DESCRIPTION =
  "Find the exact day of the week for any past, present, or future calendar date using Zeller's congruence algorithm, John Conway's Doomsday rule, and Gregorian perpetual calendar mechanics.";

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
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/datetime/week-number-calculator", icon: "🗓️", name: "Week Number" },
  { href: "/calculators/datetime/workdays-calculator", icon: "💼", name: "Workdays Calculator" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does Zeller's Congruence calculate the day of the week for any date?",
    a: "Zeller's congruence is an algorithm developed by German mathematician Christian Zeller in 1882. It computes the day of the week by mapping calendar day, shifted month (March = 3 through February = 14), century code, and year in century into a single algebraic formula evaluated modulo 7. The result maps integers 0 through 6 directly to Saturday through Friday.",
  },
  {
    q: "What is John Conway's Doomsday Rule and how does mental day calculation work?",
    a: "The Doomsday rule is an algorithm devised by mathematician John Horton Conway. It relies on the fact that each year has a specific day of the week (its 'Doomsday') on which several easy-to-remember calendar dates always fall: 4/4, 6/6, 8/8, 10/10, 12/12, the last day of February, and July 11. By memorizing century anchor days, a mental calculator can find the weekday of any date within seconds.",
  },
  {
    q: "Why does the 13th of the month fall on a Friday more frequently than any other weekday?",
    a: "Because the Gregorian calendar repeats in an exact 400-year cycle of 146,097 days (which is exactly divisible by 7: 146,097 / 7 = 20,871 weeks), the distribution of days of the week across the 4,800 months in a cycle is not completely uniform. The 13th of the month falls on Friday exactly 688 times, compared to 687 for Sunday/Wednesday, 685 for Monday/Tuesday, and only 684 for Thursday/Saturday.",
  },
  {
    q: "Can this calculator determine weekdays for historical dates before the Gregorian reform?",
    a: "Civil dates prior to October 15, 1582 in Catholic nations (or September 14, 1752 in the British Empire) followed the Julian calendar. This calculator evaluates standard proleptic Gregorian coordinates. For dates prior to national Gregorian adoption, one must apply the Julian variant of Zeller's formula or add historical Julian-Gregorian discrepancy offsets.",
  },
];

export default function DateToDayCalculatorPage() {
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
            <strong>Calendar Day Algorithm Guidance:</strong> Calculating the day of the week for historical or future dates utilizes Gregorian modulo 7 arithmetic. When coordinating event dates, verify your birth day of the week with our <Link href="/calculators/datetime/birthday-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">birthday calculator</Link>, track elapsed calendar days in our <Link href="/calculators/datetime/date-difference-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date difference calculator</Link>, or look up ISO business weeks in our <Link href="/calculators/datetime/week-number-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">week number calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 400-Year Gregorian Weekday Distribution & Friday the 13th Phenomenon
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The continuous seven-day weekly cycle is one of humanity&apos;s oldest unbroken cultural traditions, persisting uninterrupted through astronomical calendar reforms, political revolutions, and religious shifts. A profound mathematical feature of the Gregorian calendar is that its intercalary leap-year cycle repeats exactly every 400 years, encompassing exactly 146,097 days (97 leap years x 366 days + 303 common years x 365 days).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because 146,097 is evenly divisible by 7 (146,097 / 7 = exactly 20,871.0 weeks), the Gregorian calendar is perfectly periodic with respect to the days of the week. However, across the 4,800 months in each 400-year cycle, the days of the week are not distributed with equal probability. As illustrated in the frequency chart below, Friday is the single most common day of the week for the 13th of any month.
          </p>

          <WeekdayFrequencyPerCenturyChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Derivation of Zeller&apos;s Congruence
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1882, German mathematician Christian Zeller published his eponymous congruence algorithm to calculate the day of the week for any Gregorian calendar date. In Zeller&apos;s formulation, January and February are treated as months 13 and 14 of the preceding year (so January 2026 is evaluated as month 13 of 2025). This shift ensures that the intercalary leap day of February 29 falls at the very end of the computational year:
          </p>
          <Formula>{"h = \left( q + \left\lfloor \frac{13(m + 1)}{5} \right\rfloor + K + \left\lfloor \frac{K}{4} \right\rfloor + \left\lfloor \frac{J}{4} \right\rfloor - 2J \right) \pmod{7}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where q is the day of the month (1 to 31), m is the shifted month (March = 3, April = 4, ..., December = 12, January = 13, February = 14), K is the year of the century (Y mod 100), and J is the zero-based century (floor(Y / 100)).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The resulting integer h maps directly to the day of the week: 0 = Saturday, 1 = Sunday, 2 = Monday, 3 = Tuesday, 4 = Wednesday, 5 = Thursday, and 6 = Friday. Note that in computer implementations, modulo operations with negative operands require adding 7 x J to ensure strictly non-negative residues:
          </p>
          <Formula>{"h = \left( q + \left\lfloor \frac{13(m + 1)}{5} \right\rfloor + K + \left\lfloor \frac{K}{4} \right\rfloor + \left\lfloor \frac{J}{4} \right\rfloor + 5J \right) \pmod{7}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This elegant arithmetic relation enables instantaneous date-to-day conversion across all contemporary computer operating systems and digital watches. For tracking business shifts on specific weekdays, explore our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Doomsday Rule Anchor Benchmarks for Mental Weekday Calculation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles John Conway&apos;s memorable Doomsday anchor dates across the calendar year, alongside century anchors for rapid mental day-of-week arithmetic:
          </p>
          <DataTable
            head={["Calendar Month", "Doomsday Anchor Date", "Mnemonic / Mental Association Rule", "Common Year Offset", "Leap Year Offset"]}
            rows={[
              ["January", "January 3 (Common) / Jan 4 (Leap)", "'3 in common, 4 in leap' base anchor", "Same as Doomsday", "Same as Doomsday"],
              ["February", "Last Day of Feb (Feb 28 / Feb 29)", "'Doomsday is always the last day of February'", "Same as Doomsday", "Same as Doomsday"],
              ["March", "March 14 (Pi Day, 3/14) / Mar 21", "Pi Day (3.14) or Spring equinox marker", "Same as Doomsday", "Same as Doomsday"],
              ["April", "April 4 (4/4)", "Even month double digits (4/4, 6/6, 8/8, 10/10, 12/12)", "Same as Doomsday", "Same as Doomsday"],
              ["May", "May 9 (9 to 5 mnemonic)", "'Working 9 to 5 at 7-Eleven' (5/9 and 9/5)", "Same as Doomsday", "Same as Doomsday"],
              ["June", "June 6 (6/6)", "Even month double digits (6/6)", "Same as Doomsday", "Same as Doomsday"],
              ["July", "July 11 (7-Eleven mnemonic)", "'7-Eleven store' (7/11 and 11/7)", "Same as Doomsday", "Same as Doomsday"],
              ["August", "August 8 (8/8)", "Even month double digits (8/8)", "Same as Doomsday", "Same as Doomsday"],
              ["September", "September 5 (9 to 5 mnemonic)", "'Working 9 to 5' (9/5 corresponds to 5/9)", "Same as Doomsday", "Same as Doomsday"],
              ["October", "October 10 (10/10)", "Even month double digits (10/10)", "Same as Doomsday", "Same as Doomsday"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Finding the Weekday of July 20, 1969
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a historian verifying the exact day of the week on which Apollo 11 astronaut Neil Armstrong first set foot on the lunar surface (July 20, 1969). We evaluate Zeller&apos;s Congruence step by step:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Extract &amp; Shift Calendar Parameters):</strong> Date = July 20, 1969. Day q = 20. Month is July, so m = 7 (no shift needed for March-December). Year Y = 1969. Century J = floor(1969 / 100) = 19. Year in century K = 1969 mod 100 = 69.</li>
            <li><strong>Step 2 (Compute Month Term):</strong> floor(13(m + 1) / 5) = floor(13(8) / 5) = floor(104 / 5) = 20.</li>
            <li><strong>Step 3 (Compute Year &amp; Century Leap Terms):</strong> floor(K / 4) = floor(69 / 4) = 17. floor(J / 4) = floor(19 / 4) = 4. 5J = 5 x 19 = 95.</li>
            <li><strong>Step 4 (Sum Terms &amp; Evaluate Modulo 7):</strong> Total sum = q + 20 + K + 17 + 4 + 95 = 20 + 20 + 69 + 17 + 4 + 95 = 225. Evaluating modulo 7: 225 / 7 = 32 with remainder 1 (225 = 32 x 7 + 1). h = 1, which corresponds to <strong>Sunday</strong>. Historical records confirm Apollo 11 landed on the Moon on Sunday evening, July 20, 1969.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Perpetual Calendars &amp; The 28-Year Solar Dominical Cycle
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Before digital computers, horologists, astronomers, and ecclesiastical authorities relied on mechanical perpetual calendars incorporating Dominical Letters (letters A through G assigned to days of the year starting on January 1). The weekday of January 1 indicates the Dominical Letter for the entire year, allowing users to look up the weekday of any date using circular brass slide rules.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Within the 28-year solar cycle, calendars repeat identically every 28 years (except across century years not divisible by 400). For example, the 2026 calendar is completely identical in weekday assignments to the calendars of 1998, 1970, and 1942. To explore how leap years punctuate this cycle, consult our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cultural Weekday Naming: Planetary Gods &amp; Linguistic Etymology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The seven days of the week derive their names from classical Hellenistic astrology and ancient Germanic mythology, reflecting the seven visible moving celestial bodies known to ancient astronomers: the Sun, the Moon, Mars, Mercury, Jupiter, Venus, and Saturn.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In English, Sunday (Sun) and Monday (Moon) preserve direct planetary names, while Tuesday (Tiw/Mars), Wednesday (Woden/Mercury), Thursday (Thor/Jupiter), and Friday (Frigg/Venus) honor Norse deities, and Saturday preserves Roman Saturn. In Romance languages (Spanish, French, Italian), the planetary roots remain transparent: Lunes / Lundi (Luna/Moon), Martes / Mardi (Mars), Miercoles / Mercredi (Mercury).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Legal Discovery, Retail Footwear &amp; Event Planning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil and criminal litigation, verifying the day of the week for historical alibis, forensic surveillance logs, and statutory court filing deadlines is fundamental. If a 30-day statutory appeal deadline expires on a Saturday, Sunday, or legal public holiday, civil procedure rules universally roll the deadline forward to the next business Monday.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial wedding and corporate conference planning, venues command peak pricing on Saturdays, making weekday verification essential for budget forecasting. Explore our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate business days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert timestamps in our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 7-Day Planetary Week in Ancient Babylon and Alexandria
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The seven-day weekly cycle is distinct among human chronological conventions because it possesses no direct integer relationship with the solar year (365.2425 days) or the lunar month (29.53 days). Historians trace the continuous seven-day sequence to the neo-Babylonian empire and Hellenistic Alexandria during the 1st century BCE.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Astrologers assigned each of the 24 hours of the day sequentially to the seven traditional moving celestial spheres ordered by apparent orbital velocity: Saturn, Jupiter, Mars, Sun, Venus, Mercury, and Moon. The ruling planet of the first hour of each day became the guardian deity of that entire day, generating the familiar planetary sequence: Sun&apos;s day (Sunday), Moon&apos;s day (Monday), Mars&apos; day (Tuesday), Mercury&apos;s day (Wednesday), Jupiter&apos;s day (Thursday), Venus&apos; day (Friday), and Saturn&apos;s day (Saturday).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Modulo 7 Group Theory &amp; Field Invariants in Calendar Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern abstract algebra, the seven days of the week form a cyclic group Z/7Z under addition modulo 7. Because 7 is a prime integer, every non-zero integer modulo 7 generates the entire weekly group, creating rich combinatorial invariants.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because a standard 365-day year contains 52 weeks and 1 day (365 = 52 x 7 + 1), each consecutive common year advances the weekday of any calendar date by exactly 1 mod 7. Leap years contain 366 days (52 x 7 + 2), advancing the weekday by 2 mod 7. This linear recurrence relation creates the famous 28-year solar cycle, ensuring that identical calendar layouts recur in a predictable 6-11-11-28 year cadence.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Banking Value Dating &amp; Target2 Payment Clearing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In cross-border interbank foreign exchange clearing (via SWIFT, Fedwire, and Eurosystem TARGET2 networks), verifying the exact day of the week for transaction settlement dates is fundamental. The financial convention known as &apos;Spot Next&apos; (S/N) and &apos;Tomorrow Next&apos; (T/N) establishes that standard spot transactions settle on T+2 business days.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If a trade executed on a Thursday specifies standard T+2 settlement, the two intervening business days skip Saturday and Sunday, shifting settlement to Monday. When either counterparty jurisdiction observes a banking holiday on Monday, value dating automatically advances to Tuesday under the Modified Following Business Day convention.
          </p>

        </>
      }
    >
      <DateToDayCalculatorComponent />
    </CalcPage>
  );
}
