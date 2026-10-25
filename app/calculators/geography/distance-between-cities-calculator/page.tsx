import type { Metadata } from "next";
import DistanceBetweenCitiesCalculator from "@/components/calcs/geography/distance-between-cities-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GreatCircleDistanceRouteChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/distance-between-cities-calculator";
const TITLE = "Distance Between Cities Calculator – Great-Circle Flight Distance & Geodesic Bearing | CalcDigi";
const DESCRIPTION =
  "Calculate orthodromic great-circle distance between any two global cities or geographic coordinates in kilometers, statute miles, and nautical miles. Features Haversine geodesic navigation, flight time estimates, and initial true bearings.";

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
  { href: "/calculators/geography/latitude-longitude-calculator", icon: "📍", name: "Latitude & Longitude Coordinates" },
  { href: "/calculators/geography/time-zone-difference-calculator", icon: "🕐", name: "Time Zone Difference" },
  { href: "/calculators/geography/map-scale-calculator", icon: "🗺️", name: "Map Scale & Ground Distance" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "📐", name: "Elevation Grade Calculator" },
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How does the Haversine formula calculate the distance between two cities?",
    a: "The Haversine formula calculates the great-circle (orthodromic) distance between two points on the surface of a sphere using their latitude and longitude coordinates. By converting angles to radians and computing the central angle c via the haversine of coordinate differences (Δlat and Δlon), it multiplies the angular separation by Earth's mean volumetric radius (R = 6,371.0088 km). The result yields the shortest physical surface path an aircraft or satellite can trace.",
  },
  {
    q: "Why do airplane flight routes curve on standard flat world maps?",
    a: "Standard flat maps (such as the Mercator projection used by Google Maps) distort spherical geometry by stretching longitudinal lines parallel toward the poles. On a globe, the shortest path between two points is a straight circle passing through Earth's center (a Great Circle). When projected onto a flat rectangular grid, this straight 3D arc appears as a pronounced northward curve. For example, a flight from New York to London arcs over Newfoundland and Ireland rather than following a straight horizontal line.",
  },
  {
    q: "What is the mathematical difference between straight-line distance and driving distance?",
    a: "Great-circle distance represents the absolute shortest theoretical 'as-the-crow-flies' path along Earth's curvature. Driving distance must follow terrestrial road networks, navigate around mountains, cross designated bridges, and traverse urban street grids. In flat prairie regions, driving distance is typically 10% to 20% longer than straight-line distance; in mountainous, coastal, or island regions, winding bypasses can make driving distances 50% to 150% longer.",
  },
  {
    q: "How accurate is the Haversine formula compared to the Vincenty ellipsoid formula?",
    a: "The Haversine formula assumes Earth is a perfect sphere with an average radius of 6,371 km, which delivers an accuracy of approximately 99.5% (an error margin under 0.5% or roughly 5 km across a 1,000 km journey). For precision geodesy and international boundary surveying, geodesists utilize Vincenty's formulae or Karney's geodesic algorithm, which model Earth as an oblate spheroid (WGS84 ellipsoid) with millimeter-level precision.",
  },
  {
    q: "What is an initial true bearing and why does it change during flight?",
    a: "An initial bearing (forward azimuth) is the starting compass direction an aircraft must face when departing an origin along a great circle. Because meridians of longitude converge toward the geographic poles, a great circle intersects each meridian at a progressively changing angle. A flight from New York to London departs with an initial heading of ~51° (Northeast), but arrives in London heading ~103° (East-Southeast).",
  },
  {
    q: "What is the maximum possible surface distance between any two locations on Earth?",
    a: "The maximum surface distance separates two exact antipodal points (points located on precisely opposite sides of Earth). This distance equals half of Earth's meridional circumference: π × R ≈ 3.14159 × 6,371.0088 km ≈ 20,015.1 kilometers (12,436.8 statute miles). No two cities on Earth can be further apart than this antipodal ceiling.",
  },
];

export default function DistanceBetweenCitiesPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/geography", label: "Geography" }}
      title="Distance Between Cities Calculator"
      intro="Determine the shortest great-circle orthodromic distance, estimated commercial jet flight times, and initial forward navigation bearings between any two cities or geographic coordinates on Earth."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Scientific Geodetic Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-500/30">
                <svg className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                IUGG &amp; ICAO Navigation Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Calculated via <strong className="font-semibold text-slate-800 dark:text-slate-200">WGS84 Geodetic Datum &amp; Haversine Spherical Trigonometry</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Spherical Geodesy Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Geographic Summary: How Great-Circle City Distance is Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The shortest physical surface distance between any two cities on Earth is the <strong>great-circle (orthodromic) distance</strong>, computed using spherical trigonometry and the <strong>Haversine formula</strong>. Because Earth is spherical rather than flat, the shortest path between distant cities curves toward the poles rather than following a straight horizontal compass line. For example, <strong>New York to London</strong> spans <strong>5,570 km (3,461 miles)</strong> with a nonstop commercial flight duration of approximately <strong>6.8 hours</strong>. Precise coordinates can be verified on our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude and longitude calculator</a>.
            </p>
          </div>

          <h2>The Geodesic Principles of Great-Circle Air Navigation</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <GreatCircleDistanceRouteChart />
          </div>

          <p>
            When navigators and airline dispatchers plan transcontinental flight corridors, they do not measure distances using flat paper maps. In spherical geometry, the intersection of a sphere with a plane passing directly through its center point forms a <strong>Great Circle</strong>. Any segment of a great circle represents the absolute geodesic minimum distance between two points on the surface. On traditional flat map projections, such as the Web Mercator projection commonly used on smartphones, great circles appear paradoxically curved because cylindrical projections stretch polar latitudes horizontally. You can explore map sheet distortions using our <a href="/calculators/geography/map-scale-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">map scale calculator</a>.
          </p>
          <p>
            In international commercial aviation, flying the great circle saves thousands of kilograms of jet fuel and reduces flight duration by hours. For example, a flight from London to Tokyo does not cross Central Asia horizontally; instead, the great-circle route arcs northward over Scandinavia, Siberia, and the Arctic tundra, trimming over 3,500 kilometers off the journey. You can calculate total travel time in hours and minutes with our <a href="/calculators/datetime/time-duration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time duration calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">The Haversine Great-Circle Distance Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"a = \\sin^2\\left(\\frac{\\Delta\\phi}{2}\\right) + \\cos(\\phi_1)\\cos(\\phi_2)\\sin^2\\left(\\frac{\\Delta\\lambda}{2}\\right) \\quad \\Big| \\quad d = 2R \\cdot \\text{atan2}\\left(\\sqrt{a}, \\sqrt{1-a}\\right)"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Where φ represents latitude in radians, λ represents longitude in radians, and R is Earth's mean volumetric radius (6,371.0088 km). Yields the exact arc length of the geodesic segment across Earth's spherical mantle.</div>
          </Formula>

          <h2>Global Intercontinental Flight Distance Benchmarks</h2>
          <p>
            The table below compiles verified great-circle distances, standard statute mile equivalents, initial true departure headings, and commercial flight durations across world-leading metropolitan transit corridors:
          </p>

          <DataTable
            head={["Flight Corridor", "Great-Circle Distance (km)", "Statute Distance (miles)", "Nautical Miles (NM)", "Initial Heading (Bearing)", "Est. Jet Flight Time (900 km/h)"]}
            rows={[
              ["London to Paris", "343 km", "213 miles", "185 NM", "148° (SSE)", "1 hr 05 min (short hop)"],
              ["New York to Los Angeles", "3,940 km", "2,448 miles", "2,127 NM", "264° (West)", "5 hrs 15 min (transcontinental)"],
              ["Paris to Dubai", "5,245 km", "3,259 miles", "2,832 NM", "118° (ESE)", "6 hrs 30 min (Euro-Gulf)"],
              ["New York to London", "5,570 km", "3,461 miles", "3,007 NM", "51° (Northeast)", "6 hrs 50 min (North Atlantic)"],
              ["London to Tokyo", "9,560 km", "5,940 miles", "5,162 NM", "33° (NNE Polar)", "11 hrs 30 min (Polar track)"],
              ["Dubai to New York", "11,025 km", "6,851 miles", "5,953 NM", "332° (NNW Polar)", "13 hrs 15 min (Ultra-long haul)"],
              ["Los Angeles to Sydney", "12,050 km", "7,488 miles", "6,506 NM", "232° (Southwest)", "14 hrs 30 min (Transpacific)"],
              ["London to Sydney", "16,993 km", "10,559 miles", "9,175 NM", "62° (East-NE)", "20 hrs 30 min (Kangaroo Route)"],
              ["Singapore to New York", "15,350 km", "9,538 miles", "8,288 NM", "23° (NNE Polar)", "18 hrs 15 min (Longest nonstop)"],
              ["Earth Antipodal Maximum", "20,015 km", "12,437 miles", "10,807 NM", "180° (True South)", "23 hrs 10 min (Half-circumference)"],
            ]}
            highlight={3}
          />

          <h2>Navigational Bearings: Forward Azimuth vs. Rhumb Lines</h2>
          <p>
            A common misconception in marine and aerial navigation is assuming that an aircraft flying along a great circle maintains a constant compass heading. In reality, because meridians of longitude converge toward the poles, a great circle crosses every meridian at a slightly different angle. The starting compass angle is called the <strong>initial bearing (forward azimuth)</strong>, calculated via the four-quadrant arctangent function:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Forward Azimuth (Initial Bearing) Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\theta = \\text{atan2}\\left(\\sin(\\Delta\\lambda)\\cos(\\phi_2), \\; \\cos(\\phi_1)\\sin(\\phi_2) - \\sin(\\phi_1)\\cos(\\phi_2)\\cos(\\Delta\\lambda)\\right)"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Computes the true compass heading in degrees (0° to 360°) relative to True North at the point of origin. To maintain the great circle, autopilot systems continuously update heading.</div>
          </Formula>
          <p>
            In contrast, a path of constant compass heading is known as a <strong>rhumb line (loxodrome)</strong>. While convenient for early 16th-century sailors using magnetic compasses, rhumb lines are physically longer than great circles, spiraling gradually toward the poles. You can analyze geometric angle deviations and right-triangle equivalents using our <a href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</a>.
          </p>

          <h2>Flight Duration Physics &amp; International Time Travel</h2>
          <p>
            Estimating flight duration involves calculating ground speed against atmospheric jet streams. At high cruise altitudes (32,000 to 41,000 feet), modern jetliners cruise at a true airspeed of approximately 480 to 510 knots (roughly 890 to 945 km/h). Flights traveling eastward across the North Atlantic or Pacific frequently catch the <strong>polar jet stream</strong>, picking up 100 to 200 km/h in tailwinds, whereas westbound return flights battle corresponding headwinds.
          </p>
          <p>
            Furthermore, because long-distance flights cross multiple longitudinal meridians, passengers experience rapid shifts in local solar time and circadian rhythm. When crossing the International Date Line (such as flying from California to Australia or Japan), an entire calendar day is added or lost. Plan international meeting arrivals and manage time zone shifts using our <a href="/calculators/geography/time-zone-difference-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time zone difference calculator</a>. Compare the population density of your departure and destination cities with our <a href="/calculators/geography/country-area-population-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">country statistics calculator</a>.
          </p>

          <h2>Step-by-Step Distance Calculation Guide</h2>
          <p>
            To compute distance manually or verify GPS flight tracking data between any two global points, follow this structured navigation protocol:
          </p>
          <ul>
            <li><strong>Step 1: Obtain Decimal Degree Coordinates:</strong> Convert traditional Degrees-Minutes-Seconds (DMS) coordinates into Decimal Degrees (DD). Positive values represent North latitude and East longitude, while negative values represent South latitude and West longitude. Use our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude-longitude converter</a> for instant conversions.</li>
            <li><strong>Step 2: Convert to Radians:</strong> Multiply decimal degrees by $\pi / 180$ to perform trigonometric sine and cosine operations.</li>
            <li><strong>Step 3: Execute the Haversine Function:</strong> Compute $\Delta\phi$ (latitude difference) and $\Delta\lambda$ (longitude difference), evaluate the haversine parameter $a$, and extract the central angle $c$.</li>
            <li><strong>Step 4: Scale by Radius:</strong> Multiply central angle $c$ by 6,371 km for kilometers, 3,958.8 miles for statute miles, or 3,440.1 NM for nautical miles. Calculate the proportion of total Earth circumference using our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.</li>
            <li><strong>Step 5: Account for Terrain &amp; Airport Elevation:</strong> When calculating approach glideslopes or mountainous terrain clearance, check vertical ascent angles with our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.</li>
          </ul>
        </>
      }
    >
      <DistanceBetweenCitiesCalculator />
    </CalcPage>
  );
}
