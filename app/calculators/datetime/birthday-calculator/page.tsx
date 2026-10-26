import type { Metadata } from "next";
import Link from "next/link";
import BirthdayCalculatorComponent from "@/components/calcs/datetime/birthday-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BirthdayParadoxProbabilityCurveChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/birthday-calculator";
const TITLE = "Birthday Calculator | Day of Week, Milestones & Birthday Paradox";
const DESCRIPTION =
  "Determine the exact day of the week you were born, countdown to your next birthday milestone, and explore birthday paradox combinatorics and solar return astronomical cycles.";

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
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/date-to-day-calculator", icon: "📆", name: "Date to Day" },
  { href: "/calculators/datetime/days-until-calculator", icon: "⏳", name: "Days Until Event" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How does the calculator determine the day of the week you were born?",
    a: "The calculator applies algorithmic date-to-day formulations derived from Zeller's congruence and Gregorian modulo 7 arithmetic. By establishing a fixed anchor epoch and calculating cumulative elapsed days modulo 7, the algorithm determines with mathematical certainty whether a birth date fell on a Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday.",
  },
  {
    q: "What is the Birthday Paradox and why does it occur with just 23 people?",
    a: "The Birthday Paradox (or birthday problem) is a counterintuitive result in probability theory: in a randomly selected group of just 23 people, the probability that at least two individuals share the exact same birthday exceeds 50%. The paradox occurs because the human mind intuitively compares one person against everyone else (22 comparisons), whereas probability evaluates all pairwise combinations among the 23 people: C(23, 2) = (23 × 22) / 2 = 253 unique pairs.",
  },
  {
    q: "How does an astronomical Solar Return differ from a standard calendar birthday?",
    a: "A solar return is the precise astronomical instant when the Sun returns to the exact ecliptic celestial longitude it occupied at the moment of birth. Because Earth's orbital tropical year is roughly 365.24219 days rather than exactly 365 days, an astronomical solar return can diverge from your civil calendar birthday by up to 18 to 24 hours.",
  },
  {
    q: "How do leap year rules affect future milestone birthday countdowns?",
    a: "In a standard 365-day common year, your birthday advances by exactly one day of the week each year (365 mod 7 = 1). However, when a leap year intercalary day (February 29) intervenes between your previous and next birthday, your birthday milestone skips forward by two days of the week (366 mod 7 = 2), shifting weekend celebrations faster.",
  },
];

export default function BirthdayCalculatorPage() {
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
            <strong>Birthday Milestones &amp; Planning:</strong> Birthdays represent recurring solar orbital anniversaries governed by Gregorian calendar mechanics. When organizing landmark jubilee celebrations, calculate your exact chronological milestones in our <Link href="/calculators/datetime/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">age calculator</Link>, track countdown intervals with our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>, and verify historical weekday alignments using our <Link href="/calculators/datetime/date-to-day-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">date to day calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Combinatorial Probability: The Famous Birthday Paradox Formulations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The birthday problem is one of the classic pedagogical cornerstones of combinatorial probability. Intuition leads most people to assume that because a year contains 365 days, a cohort must approach half that number (roughly 183 people) before a 50% probability of a shared birthday is achieved. However, the mathematics evaluates the complement event: the probability P_bar(n) that all n individuals in a group have distinct birthdays.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As shown in the analytical probability curve below, the 50% statistical parity threshold is crossed at exactly n = 23 individuals, and by n = 70 people, the probability of a shared birthday surpasses 99.9%.
          </p>

          <BirthdayParadoxProbabilityCurveChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Derivation of Birthday Collision Probability
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Assuming an equiprobable distribution of birthdays across d = 365 days, the first person can have any birthday. The second person must avoid the first person&apos;s birthday (probability 364/365). The third person must avoid both preceding birthdays (probability 363/365). Continuing recursively for n individuals:
          </p>
          <Formula>{"\bar{P}(n) = 1 \times \left(1 - \frac{1}{365}\right) \times \left(1 - \frac{2}{365}\right) \times \cdots \times \left(1 - \frac{n-1}{365}\right) = \frac{365!}{365^n (365 - n)!}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The probability P(n) of at least one shared birthday is the logical complement:
          </p>
          <Formula>{"P(n) = 1 - \bar{P}(n) = 1 - \prod_{k=1}^{n-1} \left(1 - \frac{k}{365}\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying Taylor series expansion 1 - x approx e^(-x) for small x = k / 365 provides an asymptotic closed-form approximation:
          </p>
          <Formula>{"P(n) \approx 1 - \exp\left( -\sum_{k=1}^{n-1} \frac{k}{365} \right) = 1 - \exp\left( -\frac{n(n-1)}{2 \times 365} \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Setting P(n) = 0.50 yields n(n-1) approx 2 x 365 x ln(2) approx 505.99, solving to n approx 22.999 (exactly 23 people). In cryptographic security, this mathematical foundation underpins hash collision resistance (birthday attacks on SHA-256 and MD5 digital signatures). To verify statistical odds in percentages, cross-reference our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and calculate event ratios with our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Birthday Milestone Reference Benchmarks & Cultural Jubilees
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Across global legal traditions and cultural history, specific milestone birthdays establish major societal transitions, legal authorizations, and celebratory jubilees:
          </p>
          <DataTable
            head={["Milestone Anniversary", "Cultural / Legal Designation", "Statutory Entitlements & Traditional Customs", "Astronomical Solar Orbits", "Typical Celebration Traditions"]}
            rows={[
              ["1st Birthday", "Paper Milestone / Doljanchi", "Infant survival milestone; Korean Dol ceremony selecting fortune items", "1.00 Orbit", "Smash cake, family photographic portraits"],
              ["10th Birthday", "First Decade / Tin Milestone", "Transition into double-digit age; cognitive concrete formal operations", "10.00 Orbits", "Themed youth celebration, athletic parties"],
              ["13th Birthday", "Bar/Bat Mitzvah / Teen Era", "Jewish adult religious accountability; entry into adolescent teenage cohort", "13.00 Orbits", "Religious rite of passage, formal banquet"],
              ["15th Birthday", "Quinceanera", "Latin American rite of passage symbolizing entry into young adulthood", "15.00 Orbits", "Waltz ceremony, court of honor, formal ball"],
              ["16th Birthday", "Sweet Sixteen / Motor Licensure", "United States driving permit qualification; employment eligibility", "16.00 Orbits", "Semi-formal celebration, automotive milestone"],
              ["18th Birthday", "Age of Majority (Civil Legal)", "Full contractual capacity, voting franchise, civil jury service obligation", "18.00 Orbits", "Civic registration, independent legal rights"],
              ["21st Birthday", "Traditional Adulthood / Keys to Door", "Historic common law majority; statutory alcohol and gaming authorization", "21.00 Orbits", "Key-to-the-door celebration, university graduation"],
              ["30th Birthday", "Pearl Jubilee / Third Decade", "Culmination of early adulthood; stabilization of career professional track", "30.00 Orbits", "Milestone travel, reflective retreat gatherings"],
              ["50th Birthday", "Golden Jubilee / Half-Century", "Half-century landmark; AARP demographic bracket entry; career mastery", "50.00 Orbits", "Golden-themed gala, retrospective family reunions"],
              ["65th Birthday", "Statutory Retirement Milestone", "Historical benchmark for full Social Security OASDI and Medicare coverage", "65.00 Orbits", "Retirement transition gala, pension activation"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Milestone Jubilee Planning & Weekday Shifting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an individual born on Tuesday, July 14, 1987 who is planning their upcoming 40th birthday milestone celebration in 2027. The event planner must determine what day of the week July 14, 2027 will fall on, calculate exact days remaining from October 26, 2026, and project the date of their 50th golden jubilee:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Determine Day of Week for 40th Birthday in 2027):</strong> Evaluating Gregorian calendar shift from July 14, 1987 to July 14, 2027. Over 40 calendar years, there are exactly 10 leap years (1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024). Net weekday shift = (40 common days + 10 leap days) mod 7 = 50 mod 7 = 1 day shift. Since July 14, 1987 was a Tuesday, adding 1 shift day confirms July 14, 2027 will fall on a <strong>Wednesday</strong>.</li>
            <li><strong>Step 2 (Countdown from October 26, 2026 to July 14, 2027):</strong> Remaining days in 2026 = 31 (Oct) - 26 + 30 (Nov) + 31 (Dec) = 66 days. Days in 2027 = 31 (Jan) + 28 (Feb) + 31 (Mar) + 30 (Apr) + 31 (May) + 30 (Jun) + 14 (Jul) = 195 days. Total countdown = 66 + 195 = <strong>261 calendar days</strong>.</li>
            <li><strong>Step 3 (Weeks &amp; Residual Days Conversion):</strong> 261 days / 7 = 37 full calendar weeks and 2 residual days.</li>
            <li><strong>Step 4 (Solar Orbit Milestone Synthesis):</strong> By July 14, 2027, the individual will have completed exactly 40.00 terrestrial orbits around the sun, living approximately 14,610 days. Cross-reference upcoming holiday spans in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link> and calculate working schedules using our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 28-Year Solar Cycle & Weekday Repetition Patterns
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In Gregorian chronometry, calendar dates repeat on the identical day of the week according to the 28-year solar cycle. Because a standard year has 365 days (52 weeks + 1 day) and a leap year has 366 days (52 weeks + 2 days), the pattern of weekday offsets follows the least common multiple of the 7-day week and the 4-year leap cycle: LCM(7, 4) = 28 years.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Within any 28-year period that does not cross a non-leap century year (such as 1900 or 2100), your birthday falls on the exact same day of the week in a repeating sequence of 6, 11, 11, and 28 years. For instance, if your birthday fell on a Saturday in 2020 (a leap year), it will recur on a Saturday in 2048. To examine leap year mechanics in detail, consult our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Birth Frequency Seasonality & Demographic Delivery Clustering
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Demographic birth statistics collected by the National Center for Health Statistics (NCHS) reveal that human births are not uniformly distributed across the 365 days of the year. In the Northern Hemisphere, mid-September (particularly September 9 through September 20) exhibits the highest global birth frequencies, corresponding to winter holiday conception peaks nine months prior.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, major public holidays like Christmas Day (December 25), New Year&apos;s Day (January 1), and July 4 exhibit statistically significant drop-offs in births due to scheduled cesarean delivery and labor induction protocols avoiding hospital holiday staffing shortages. For obstetric timeline planning, explore our <Link href="/calculators/baby/due-date-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">due date calculator</Link> and calculate pregnancy weight curves in our <Link href="/calculators/baby/baby-weight-percentile-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">baby weight percentile calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Identity Verification, Legal Contracts & Astrological Cycles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern global commerce, your date of birth serves as a ubiquitous identifier in Know Your Customer (KYC) financial anti-fraud protocols, multi-factor authentication, and passport issuing systems. In astronomical and cultural domains, birthdays establish zodiac sun signs based on the Sun&apos;s apparent position along the ecliptic band against ancient Babylonian celestial constellations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Whether calculating historical milestone dates, planning surprise jubilee gatherings, or verifying calendar day alignments, precise chronometric tools streamline life planning. Explore our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time suite</Link> and calculate precise epoch timestamps with our <Link href="/calculators/datetime/unix-timestamp-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">UNIX timestamp converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Solar Return Mechanics vs. Civil Calendar Anniversaries
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In observational celestial mechanics, an individual&apos;s true astronomical birthday is defined as the Solar Return—the exact instant when the center of the Sun returns to the identical geocentric ecliptic longitude (down to arcseconds) that it occupied at the moment of birth. Because a mean tropical solar year is approximately 365.24219 ephemeris days rather than an integer 365 days, this orbital transit shifts forward by approximately 5 hours, 48 minutes, and 45 seconds each common calendar year.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consequently, an individual born at 08:15 UTC on July 14 may experience their astronomical solar return at 14:03 UTC the following year, and at 19:52 UTC two years later. On leap years, the insertion of February 29 pulls the solar return backward by roughly 18 hours and 11 minutes, creating a continuous four-year orbital hysteresis loop that realigns civil clocks with celestial mechanics.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Actuarial Mortality inflections & The &apos;Birthday Effect&apos; Phenomenon
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In epidemiological demographics and actuarial research, numerous international studies have documented a statistical anomaly known as the &apos;birthday effect&apos; (or birthday reaction). Actuarial mortality records in Switzerland, Japan, and the United States demonstrate a statistically significant elevation in all-cause mortality rates on or immediately adjacent to an individual&apos;s birthday.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Epidemiologists attribute this inflection to acute psychological stress, celebratory behavioral risks, cardiovascular spikes associated with heightened emotional arousal, and psychosomatic milestone postponement among terminally ill patients striving to attain a final landmark anniversary. Commercial life insurers incorporate these statistical variations when calculating short-term term life underwriting tables.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Demographic Cohort Analysis: Generations &amp; Astrological Cultural Systems
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Sociologists categorize populations into generational demographic cohorts based on birth year intervals: the Silent Generation (1928-1945), Baby Boomers (1946-1964), Generation X (1965-1980), Millennials / Gen Y (1981-1996), Generation Z (1997-2012), and Generation Alpha (2013-mid 2020s). Each generational cohort shares macro-historical technological, economic, and geopolitical formative experiences that shape consumer behaviors and retirement horizons.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In non-Western cultural traditions, birthdays govern cyclical astrological calendars. The Chinese Sexagenary cycle (Stem-Branch system) combines 10 heavenly stems with 12 earthly branches representing zodiac animals (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) and five elemental phases (Wood, Fire, Earth, Metal, Water), recurring in complete 60-year celebratory cycles.
          </p>

        </>
      }
    >
      <BirthdayCalculatorComponent />
    </CalcPage>
  );
}
