import type { Metadata } from "next";
import LatitudeLongitudeCalculator from "@/components/calcs/geography/latitude-longitude-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LatitudeLongitudeConvergenceChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/latitude-longitude-calculator";
const TITLE = "Latitude and Longitude Calculator – DD to DMS Converter & Geodesy | CalcDigi";
const DESCRIPTION =
  "Convert coordinates between Decimal Degrees (DD) and Degrees-Minutes-Seconds (DMS). Calculate longitudinal meridian convergence, distance to the Equator, antipodal coordinates, and UTM grid zones.";

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
  { href: "/calculators/geography/time-zone-difference-calculator", icon: "🕐", name: "Time Zone Difference" },
  { href: "/calculators/geography/map-scale-calculator", icon: "🗺️", name: "Map Scale & Ground Distance" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "📐", name: "Elevation Grade Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How do you convert Decimal Degrees (DD) into Degrees-Minutes-Seconds (DMS)?",
    a: "To convert Decimal Degrees to DMS: 1) The integer part is the Degrees (°). 2) Multiply the remaining decimal fraction by 60; the integer part of that result is the Minutes ('). 3) Multiply the remaining decimal fraction by 60; that result is the Seconds (\"). For example, 40.7128°N: Degrees = 40°. 0.7128 × 60 = 42.768' (Minutes = 42'). 0.768 × 60 = 46.08\" (Seconds = 46.08\"). Output: 40° 42' 46.08\" N.",
  },
  {
    q: "How many kilometers or miles does 1 degree of latitude span?",
    a: "One degree of latitude spans approximately 111.13 kilometers (69.05 statute miles or 60.0 nautical miles) everywhere on Earth. Because latitude lines are concentric parallel rings spaced evenly between the Equator and the poles, this spacing remains virtually constant, varying by less than 1% from 110.57 km at the Equator to 111.69 km at the poles due to slight polar flattening.",
  },
  {
    q: "Why does the physical distance of 1 degree of longitude shrink toward the poles?",
    a: "Lines of longitude (meridians) are not parallel; they converge toward the North and South Geographic Poles. At the Equator (0° latitude), 1 degree of longitude spans 111.32 km (69.17 miles). At 45° latitude (Minneapolis or Milan), 1 degree of longitude narrows by the cosine of the latitude: 111.32 × cos(45°) ≈ 78.85 km. At 60° latitude, it shrinks by exactly 50% to 55.80 km, and at 90° (the poles), all meridians converge to a singular point of 0 km.",
  },
  {
    q: "What is an antipodal coordinate point and how is it calculated?",
    a: "An antipodal point is the exact geographic point on the diametrically opposite side of Earth. To calculate an antipode: invert the latitude sign (e.g., 40.71°N becomes 40.71°S) and adjust the longitude by 180 degrees (if longitude is positive, subtract 180°; if negative, add 180°). For example, the antipode of New York City (40.71°N, 74.01°W) is in the southern Indian Ocean off the coast of southwest Australia (40.71°S, 105.99°E).",
  },
  {
    q: "What is the physical ground accuracy of GPS decimal precision?",
    a: "In Decimal Degrees (DD): 1 decimal place (0.1°) represents ~11.1 km (city-wide scale); 2 decimal places (0.01°) represents ~1.11 km (neighborhood scale); 3 decimal places (0.001°) represents ~111 meters (large building or parcel); 4 decimal places (0.0001°) represents ~11.1 meters (typical consumer smartphone GPS accuracy); 5 decimal places (0.00001°) represents ~1.11 meters (individual tree or driveway); 6 decimal places (0.000001°) represents ~11.1 cm (survey-grade RTK precision).",
  },
  {
    q: "What is WGS84 and why is it used as the universal global standard?",
    a: "WGS84 (World Geodetic System 1984) is the standardized ellipsoidal reference model of Earth established by the US National Geospatial-Intelligence Agency. It defines Earth's semi-major equatorial radius as 6,378,137.0 meters with a flattening ratio of 1/298.257223563. WGS84 serves as the native coordinate reference frame for GPS satellites, Google Maps, aviation nav systems, and web mapping.",
  },
];

export default function LatitudeLongitudePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/geography", label: "Geography" }}
      title="Latitude and Longitude Calculator"
      intro="Convert geographical coordinates between Decimal Degrees (DD) and Degrees-Minutes-Seconds (DMS), evaluate longitudinal meridian convergence, and determine exact antipodal coordinates."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Scientific Geodetic Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-400 dark:ring-cyan-500/30">
                <svg className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                WGS84 Geodetic Reference Frame
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">IHO S-57 / NGA Standardization Protocols</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Geodetic Coordinate Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Geographic Summary: Understanding Latitude &amp; Longitude Systems
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The <strong>geographic coordinate system</strong> defines every location on Earth through two angular coordinates measured from Earth&apos;s center: <strong>Latitude</strong> (angles north or south of the Equator, 0° to ±90°) and <strong>Longitude</strong> (angles east or west of the Prime Meridian in Greenwich, 0° to ±180°). Decimal Degrees (DD, e.g. <code>40.7128, -74.0060</code>) are universally used in GPS hardware, while navigation charts use Degrees-Minutes-Seconds (DMS, e.g. <code>40° 42&apos; 46&quot; N</code>). Compute great-circle distances between coordinate pairs with our <a href="/calculators/geography/distance-between-cities-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">distance between cities calculator</a>.
            </p>
          </div>

          <h2>Meridian Convergence &amp; Geodetic Graticule Dynamics</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <LatitudeLongitudeConvergenceChart />
          </div>

          <p>
            The planetary coordinate grid (known historically as the <em>graticule</em>) is constructed from two fundamentally different families of circles: <strong>parallels of latitude</strong> and <strong>meridians of longitude</strong>. Parallels of latitude are concentric small circles stacked parallel to the Equator; because their separation is uniform across the globe, 1 degree of latitude consistently spans approximately 111.13 kilometers (60 nautical miles) regardless of whether you are in the tropics or polar circles.
          </p>
          <p>
            Conversely, meridians of longitude are great-circle halves that connect the North and South Poles. Because all 360 meridians converge at the poles, the physical ground distance of 1 degree of longitude is not constant—it is a mathematical function of the cosine of latitude. At the Equator, 1 degree spans 111.32 km; by the time you reach 45° latitude, it narrows to 78.85 km; at 60°, it is cut in half to 55.80 km; and at the geographic poles (90°), it reaches exactly zero. When printing or drafting maps across different parallels, calculate physical scale bar equivalents using our <a href="/calculators/geography/map-scale-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">map scale calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Decimal Degrees (DD) to Degrees-Minutes-Seconds (DMS) Mathematical Formulation</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Deg} = \\lfloor |\\text{DD}| \\rfloor, \\quad \\text{Min} = \\lfloor (|\\text{DD}| - \\text{Deg}) \\times 60 \\rfloor, \\quad \\text{Sec} = \\left((|\\text{DD}| - \\text{Deg}) \\times 60 - \\text{Min}\\right) \\times 60"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Converts continuous floating-point decimal coordinates into sexagesimal navigational notation. Signs determine hemisphere: positive values indicate North (+) or East (+); negative values indicate South (-) or West (-).</div>
          </Formula>

          <h2>Longitude Width Across Geographic Latitudes (WGS84 Reference)</h2>
          <p>
            The table below illustrates the cosine-driven contraction of longitudinal degree widths, nautical mile equivalents, and ground resolution per arc-second across major terrestrial parallels:
          </p>

          <DataTable
            head={["Latitude Parallel", "Geographic Zone / Landmark", "1° Longitude Width (km)", "1° Longitude Width (miles)", "1 Arc-Minute Width", "1 Arc-Second Ground Width"]}
            rows={[
              ["0° (Equator)", "Null Island / Amazon Basin / Kenya", "111.32 km", "69.17 miles", "1.855 km (1.00 NM)", "30.92 meters"],
              ["15° N/S", "Bangkok, Thailand / Guatemala City", "107.55 km", "66.83 miles", "1.792 km (0.97 NM)", "29.87 meters"],
              ["23.5° N/S", "Tropic of Cancer / Tropic of Capricorn", "102.11 km", "63.45 miles", "1.702 km (0.92 NM)", "28.36 meters"],
              ["30° N/S", "Houston, Texas / Cairo / New Delhi", "96.49 km", "59.96 miles", "1.608 km (0.87 NM)", "26.80 meters"],
              ["45° N/S", "Minneapolis / Bordeaux / Milan", "78.85 km", "48.99 miles", "1.314 km (0.71 NM)", "21.90 meters"],
              ["60° N/S", "Oslo / Helsinki / Anchorage, Alaska", "55.80 km", "34.67 miles", "0.930 km (0.50 NM)", "15.50 meters"],
              ["66.5° N/S", "Arctic Circle & Antarctic Circle", "44.42 km", "27.60 miles", "0.740 km (0.40 NM)", "12.34 meters"],
              ["75° N/S", "Svalbard / Queen Elizabeth Islands", "28.90 km", "17.96 miles", "0.482 km (0.26 NM)", "8.03 meters"],
              ["90° N/S", "Geographic North & South Poles", "0.00 km", "0.00 miles", "0.000 km (0.00 NM)", "0.00 meters (Convergence)"],
            ]}
            highlight={4}
          />

          <h2>GPS Decimal Precision: How Many Decimal Places Do You Need?</h2>
          <p>
            When recording GPS coordinates on mobile phones or spatial databases, software engineers and surveyors often wonder how many decimal places to store. In decimal degrees:
          </p>
          <ul>
            <li><strong>0 Decimal Places (1° ≈ 111 km):</strong> Distinguishes large metropolitan regions, states, or small countries.</li>
            <li><strong>1 Decimal Place (0.1° ≈ 11.1 km):</strong> Identifies a large city or municipal district.</li>
            <li><strong>2 Decimal Places (0.01° ≈ 1.11 km):</strong> Distinguishes individual neighborhoods or village towns.</li>
            <li><strong>3 Decimal Places (0.001° ≈ 111 m):</strong> Identifies a large commercial agricultural field or university campus.</li>
            <li><strong>4 Decimal Places (0.0001° ≈ 11.1 m):</strong> Standard consumer smartphone GPS accuracy; resolves a suburban parcel or street intersection.</li>
            <li><strong>5 Decimal Places (0.00001° ≈ 1.11 m):</strong> Identifies an individual parked car or building doorway; standard for municipal GIS mapping.</li>
            <li><strong>6 Decimal Places (0.000001° ≈ 11.1 cm):</strong> High-precision Real-Time Kinematic (RTK) surveying; distinguishes structural foundations and underground pipeline joints.</li>
          </ul>
          <p>
            Storing coordinates beyond 7 decimal places (~1.1 cm) or 8 decimal places (~1.1 mm) exceeds the physical stability of Earth&apos;s tectonic plates, which drift by 2 to 10 centimeters every year. You can analyze tectonic rates and proportional percentage splits with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
          </p>

          <h2>Antipodal Coordinates &amp; Global Geodesy</h2>
          <p>
            The mathematical opposite of any point on Earth is its <strong>antipode</strong>. Because human landmasses are heavily clustered in the Northern Hemisphere, over 95% of continental land has an antipode situated in the ocean. For example, the antipode of most of the United States lies in the desolate southern Indian Ocean, while the antipode of the United Kingdom lies in the Pacific Ocean southeast of New Zealand.
          </p>
          <p>
            Furthermore, each 15 degrees of longitude corresponds to exactly one hour of Earth&apos;s axial rotation (360° / 24 hours = 15° per hour). When scheduling international business meetings or managing solar day shifts between distant meridians, synchronize your timelines using our <a href="/calculators/geography/time-zone-difference-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time zone difference calculator</a>. Compare the population density of national territories with our <a href="/calculators/geography/country-area-population-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">country statistics calculator</a> and calculate vertical terrain slope using our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.
          </p>

          <h2>Step-by-Step Coordinate Conversion Checklist</h2>
          <p>
            When inputting coordinates into GPS charting software, marine plotters, or drone flight plans, verify these essential checks:
          </p>
          <ul>
            <li><strong>Check Hemisphere Notation:</strong> Ensure negative coordinates are not double-negated with cardinal letters. E.g., enter <code>-74.0060°</code> or <code>74.0060° W</code>, but never <code>-74.0060° W</code> (which can invert longitude to East).</li>
            <li><strong>Minutes &amp; Seconds Range:</strong> In DMS notation, minutes must range strictly from 0 to 59, and seconds from 0.00 to 59.99. A value of <code>40° 65&apos;</code> is invalid and indicates a decimal degree formatting error.</li>
            <li><strong>Verify Datum Standard:</strong> Modern GPS uses WGS84. Older topographical maps may use local historical datums (such as NAD27 in the US or OSGB36 in the UK), which can induce horizontal datum shifts of 100 to 300 meters if not reprojected.</li>
          </ul>
        </>
      }
    >
      <LatitudeLongitudeCalculator />
    </CalcPage>
  );
}
