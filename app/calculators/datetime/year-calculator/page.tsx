import type { Metadata } from "next";
import Link from "next/link";
import YearCalculatorComponent from "@/components/calcs/datetime/year-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AstronomicalYearTypesComparisonChart } from "@/components/flagship/datetime/editorial-charts";

const PATH = "/calculators/datetime/year-calculator";
const TITLE = "Year Calculator | Calendar Year Span, Leap Cycles & Astronomical Years";
const DESCRIPTION =
  "Calculate years between dates, total leap vs common years across multi-decade spans, and explore astronomical tropical, sidereal, and anomalistic year definitions.";

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
  { href: "/calculators/datetime/leap-year-calculator", icon: "🗓️", name: "Leap Year Calculator" },
  { href: "/calculators/datetime/age-calculator", icon: "🎂", name: "Age Calculator" },
  { href: "/calculators/datetime/date-difference-calculator", icon: "📅", name: "Date Difference" },
  { href: "/calculators/datetime/month-calculator", icon: "📆", name: "Month Calculator" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/pages/datetime", icon: "⏰", name: "Date & Time Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between a Tropical Year, a Sidereal Year, and an Anomalistic Year?",
    a: "A Tropical Year (approx. 365.24219 days) measures the interval between successive vernal equinoxes, governing Earth's seasons. A Sidereal Year (approx. 365.25636 days) measures a full 360° orbital revolution relative to fixed background stars, lasting about 20 minutes longer than the tropical year due to axial precession. An Anomalistic Year (approx. 365.25964 days) measures the time between successive perihelion passages (closest approach to the Sun).",
  },
  {
    q: "How many days and hours are in a complete 100-year century span?",
    a: "A standard century span contains either 24 or 25 leap years depending on whether the century year is divisible by 400. In a typical century with 24 leap years (such as 1901 to 2000 excluding 1900), there are exactly 36,524 days (876,576 hours). In a quad-century span including a 400-year leap year (such as 2001 to 2100), there are 36,525 days (876,600 hours).",
  },
  {
    q: "Why do civil calendar years begin on January 1 instead of an astronomical solstice or equinox?",
    a: "The January 1 New Year origin dates to 153 BCE, when Roman consuls began taking office in January rather than the traditional military campaigning month of March. When Julius Caesar established the Julian calendar in 46 BCE, he formalized January 1 as the civil start of the year, honoring Janus, the two-faced Roman deity of gates, beginnings, and transitions.",
  },
  {
    q: "What is the Milankovitch cycle and how does it alter Earth's orbital year parameters over millennia?",
    a: "Milankovitch cycles are long-term gravitational variations in Earth's orbital eccentricity (100,000-year cycle), axial tilt or obliquity (41,000-year cycle), and orbital precession (26,000-year cycle). Over multi-millennial horizons, these gravitational oscillations modulate the timing and intensity of solar radiation reaching Earth, altering seasonal durations and pacing Quaternary ice ages.",
  },
];

export default function YearCalculatorPage() {
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
            <strong>Astronomical Year Span Guidance:</strong> Multi-year calculations quantify solar orbital revolutions across common 365-day and quadrennial 366-day leap years. In long-term demographic forecasting, actuarial planning, and historical chronometry, check quadrennial leap divisibility in our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>, calculate chronological age in our <Link href="/calculators/datetime/age-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">age calculator</Link>, or track calendar month intervals in our <Link href="/calculators/datetime/month-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">month calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Year Architecture: Tropical, Sidereal &amp; Anomalistic Periods
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In human chronometry, a &apos;year&apos; represents the fundamental celestial cadence of terrestrial life: the time required for planet Earth to complete one full orbital revolution around the Sun. However, in astrophysics and planetary geodesy, defining a year requires specifying the exact celestial reference frame against which that orbital revolution is measured.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because Earth&apos;s rotational axis wobbles slowly in space (axial precession), the vernal equinox shifts westward along the ecliptic by approximately 50.3 arcseconds per year. Consequently, a Tropical Year (which governs Earth&apos;s seasons and civil calendars) is approximately 20 minutes and 24 seconds shorter than a true Sidereal Year measured against distant fixed stars. The chart below illustrates the exact astronomical duration of major scientific year definitions.
          </p>

          <AstronomicalYearTypesComparisonChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulation of Multi-Year Calendar Spans
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Given a starting Gregorian year Y_start and an ending Gregorian year Y_end (where Y_end &gt; Y_start), the gross number of calendar years Delta Y is computed simply as:
          </p>
          <Formula>{"\Delta Y = Y_{\text{end}} - Y_{\text{start}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The total number of intervening intercalary leap years N_leap across the interval [Y_start, Y_end) is evaluated using floor arithmetic:
          </p>
          <Formula>{"N_{\text{leap}} = \sum_{y = Y_{\text{start}}}^{Y_{\text{end}} - 1} \mathbb{I}\left( (y \pmod 4 = 0 \land y \pmod{100} \neq 0) \lor y \pmod{400} = 0 \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The number of common 365-day years N_common is N_common = Delta Y − N_leap. The cumulative astronomical duration in calendar days D_total and solar hours H_total is:
          </p>
          <Formula>{"D_{\text{total}} = (N_{\text{common}} \times 365) + (N_{\text{leap}} \times 366), \quad H_{\text{total}} = D_{\text{total}} \times 24"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In financial mathematics, these multi-decade day counts drive long-term compound interest formulations and actuarial pension solvency projections; cross-reference compound investment growth in our <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">compound interest calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Year Definitions &amp; Chronological Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes the astronomical parameters, celestial reference points, exact durations in solar days, and physical applications of major scientific year definitions:
          </p>
          <DataTable
            head={["Astronomical Year Definition", "Celestial Reference Coordinate", "Exact Duration (Mean Solar Days)", "Duration in Solar Hours", "Primary Scientific Application"]}
            rows={[
              ["Tropical Solar Year", "Successive vernal equinox transits", "365.24219 Days", "8,765.81 Hours", "Governs seasons, agriculture, Gregorian calendar"],
              ["Gregorian Civil Mean Year", "400-year mathematical average", "365.24250 Days", "8,765.82 Hours", "Global legal, civil, and financial calendar"],
              ["Julian Civil Year", "Unconditional 4-year leap rule", "365.25000 Days", "8,766.00 Hours", "Historical astronomy, light-year distance standard"],
              ["Sidereal Year", "Fixed distant stars (Inertial frame)", "365.25636 Days", "8,766.15 Hours", "Planetary orbit tracking, astrometric mechanics"],
              ["Anomalistic Year", "Successive perihelion passages", "365.25964 Days", "8,766.23 Hours", "Orbital apsidal precession, Milankovitch cycles"],
              ["Eclipse (Draconic) Year", "Successive transits of Moon's ascending node", "346.62008 Days", "8,318.88 Hours", "Solar and lunar eclipse periodicity prediction"],
              ["Gaussian Year", "Keplerian orbit of theoretical massless particle", "365.25690 Days", "8,766.17 Hours", "Historical gravitational constant calculations"],
              ["Besselian Year", "Right ascension of mean Sun at 280°", "365.24220 Days", "8,765.81 Hours", "Historical star catalog coordinate equinoxes"],
              ["Lunar Year (12 Lunations)", "12 successive synodic lunar months", "354.36706 Days", "8,504.81 Hours", "Islamic Hijri civil and religious calendar"],
              ["Cosmic (Galactic) Year", "One orbit of Sun around Milky Way galactic center", "230,000,000 Years", "2.01 × 10^12 Hours", "Galactic astrophysics, geological epoch scaling"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Step-by-Step Case Study: Mid-Century Infrastructure Bond Span (2026 to 2050)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an institutional municipal financing authority issuing a 24-year capital infrastructure revenue bond maturing from January 1, 2026 to January 1, 2050. Actuaries and treasury bond analysts must calculate the exact number of leap years, common years, cumulative solar days, and elapsed hours:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Compute Gross Calendar Years):</strong> Delta Y = 2050 − 2026 = <strong>24 calendar years</strong>.</li>
            <li><strong>Step 2 (Enumerate Intercalary Leap Years):</strong> In the interval [2026, 2050), leap years occur every 4 years: 2028, 2032, 2036, 2040, 2044, 2048. Total leap years N_leap = <strong>6 leap years</strong> (6 x 366 days = 2,196 days).</li>
            <li><strong>Step 3 (Compute Common Years):</strong> N_common = 24 − 6 = <strong>18 common years</strong> (18 x 365 days = 6,570 days).</li>
            <li><strong>Step 4 (Sum Total Astronomical Duration):</strong> Total calendar days = 2,196 + 6,570 = <strong>8,766 calendar days</strong>. In solar hours: 8,766 x 24 = <strong>210,384 hours</strong>. Cross-reference multi-decade interest returns in our <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">compound interest calculator</Link> and calculate milestone countdowns in our <Link href="/calculators/datetime/days-until-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">days until calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Milankovitch Orbital Cycles &amp; Quaternary Climate Glaciations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Over multi-millennial horizons, Earth&apos;s orbital year parameters are not static. Gravitational tugs exerted primarily by Jupiter and Saturn induce slow, periodic oscillations in Earth&apos;s orbital geometry known as Milankovitch cycles. Earth&apos;s orbital eccentricity shifts from near-circular (0.0005) to mildly elliptical (0.0607) over 100,000 and 413,000-year cycles.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Simultaneously, the tilt of Earth&apos;s rotational axis (obliquity) oscillates between 22.1° and 24.5° every 41,000 years, while axial and apsidal precession alter the calendar date of perihelion every 21,000 to 26,000 years. These astronomical variations modulate the intensity of high-latitude summer sunlight, pacing the advance and retreat of massive continental ice sheets across the Northern Hemisphere. To inspect quadrennial leap variations, consult our <Link href="/calculators/datetime/leap-year-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">leap year calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Demographics, Climate Modeling &amp; Legal Succession
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In actuarial demographics and social security planning, multi-year calculations govern cohort life expectancy, pension dependency ratios, and sovereign debt amortization horizons. In climate science and atmospheric physics, multi-year rolling baselines (e.g., 30-year climate normal periods) filter interannual weather noise to evaluate long-term anthropogenic warming trends.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In estate planning and legal succession, multi-decade perpetuity periods establish the maximum allowable duration of family trust instruments under the common law Rule Against Perpetuities. Visit our centralized <Link href="/pages/datetime" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Date &amp; Time directory</Link>, evaluate working business days in our <Link href="/calculators/datetime/workdays-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">workdays calculator</Link>, and convert temporal measurements in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Axial Precession &amp; The 25,772-Year Great Platonic Year
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In observational astrometry, the difference between the tropical solar year and the sidereal year is caused by Earth&apos;s axial precession—a gravitational gyroscopic phenomenon first discovered by ancient Greek astronomer Hipparchus of Nicaea in 127 BCE. Because Earth is not a perfect sphere but an oblate spheroid bulging at the equator, gravitational tidal torques exerted by the Moon and Sun continuously attempt to pull Earth&apos;s equatorial bulge into the plane of the ecliptic.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Earth responds like a spinning gyroscope by precessing slowly westward, tracing out a conical circle in the heavens every 25,772 years (the Great Year or Platonic Year). This slow drift causes the celestial North Pole to migrate: while Polaris (Alpha Ursae Minoris) currently serves as Earth&apos;s north star, brilliant Vega (Alpha Lyrae) will become the northern pole star around the year 13,700 CE.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geological Deep Time &amp; Radiometric Isochron Dating of Earth
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While human civil history spans roughly 6,000 calendar years, geochronology evaluates Earth&apos;s history in mega-annum (Ma, millions of years) and giga-annum (Ga, billions of years) timescales. Geologists determine the absolute age of Earth (4.54 ± 0.05 billion years) using radiometric isochron dating of lead isotopes (Pb-Pb) in chondritic meteorites, developed by American geochemist Clair Patterson in 1953.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By measuring the radioactive decay of unstable parent isotopes (such as Uranium-238 decaying to Lead-206 with a half-life of 4.468 billion years, and Potassium-40 decaying to Argon-40), geochemists establish invariant chronometers immune to terrestrial weather and temperature, placing human civil calendar years into cosmic perspective.
          </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Milankovitch Orbital Cycles: Climatic Oscillations Across Astronomical Epochs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Over geological epochs spanning hundreds of thousands of years, the orbital geometry of planet Earth undergoes systematic periodic oscillations known as Milankovitch cycles, discovered by Serbian geophysicist and astronomer Milutin Milankovic. These astronomical variations alter the spatial and seasonal distribution of solar insolation hitting Earth&apos;s atmosphere, driving the advance and retreat of continental ice sheets during Quaternary glacial cycles.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The primary Milankovitch astronomical mechanisms comprise three distinct orbital cycles:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Orbital Eccentricity:</strong> The shape of Earth&apos;s elliptical orbit around the Sun fluctuates from near-circular (eccentricity of 0.000055) to moderately elliptical (eccentricity of 0.0679) over cycles spanning approximately 100,000 and 413,000 tropical years, modulating total solar irradiance variations between perihelion and aphelion.</li>
            <li><strong>Axial Obliquity:</strong> The tilt angle of Earth&apos;s rotational axis relative to its orbital plane oscillates between 22.1 degrees and 24.5 degrees over a 41,000-year cycle. Higher obliquity amplifies seasonal temperature contrasts between summer and winter in both polar hemispheres.</li>
            <li><strong>Axial Precession:</strong> The gyroscopic wobble of Earth&apos;s rotational axis (precession of the equinoxes) traces a complete circle against the background constellations every 25,772 tropical years, altering which hemisphere experiences summer during perihelion.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geological Chronostratigraphy &amp; Radiometric Deep Time Calibration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In sedimentary stratigraphy and paleoclimatology, geologists use astrochronology to synchronize rhythmic rock strata layers (cyclostratigraphy) directly with these calculated astronomical Milankovitch year cycles. By pairing orbital tuning with high-precision uranium-lead (U-Pb) and argon-argon (40Ar/39Ar) radiometric isotope decay dating, scientists establish absolute geochronological timescales with sub-millennial precision across hundreds of millions of years of Earth history.
          </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In historical astronomy and archeoastronomy, calculating year spans across BCE and CE epochs requires accounting for the astronomical year numbering convention, which introduces year zero (0) corresponding to 1 BCE. While traditional historians step directly from 1 BCE to 1 CE without a year zero, astronomical ephemeris models require continuous negative integers to maintain uninterrupted orbital integration equations and planetary ephemerides calculations spanning millennia. This continuous mathematical scale ensures eclipse retrodictions and cometary orbit recurrences match historical astronomical records with absolute celestial precision.
          </p>
        </>
      }
    >
      <YearCalculatorComponent />
    </CalcPage>
  );
}
