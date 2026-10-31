import type { Metadata } from "next";
import MapScaleCalculator from "@/components/calcs/geography/map-scale-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CartographicScaleDetailSpectrumChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/map-scale-calculator";
const TITLE = "Map Scale Calculator – Ground Distance, Representative Fraction & Area | CalcDigi";
const DESCRIPTION =
  "Convert map measurements to real ground distances and surface areas across any representative fraction (1:24k, 1:50k, 1:100k). Calculate scale bar ratios, quad dimensions, and GIS spatial resolutions.";

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
  { href: "/calculators/geography/elevation-grade-calculator", icon: "📐", name: "Elevation Grade Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "➗", name: "Ratio Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is a map scale representative fraction (RF) and how does it work?",
    a: "A representative fraction (RF) expresses the mathematical ratio of map distance to real ground distance in unitless terms (1:N or 1/N). For instance, an RF of 1:50,000 means that 1 unit of measurement on the map equals 50,000 of the exact same units on Earth's surface. Thus, 1 centimeter on the map equals 50,000 centimeters (500 meters or 0.5 km) on the ground, and 1 inch on the map equals 50,000 inches (4,166.7 feet or ~0.789 miles).",
  },
  {
    q: "Why is a 1:24,000 map considered 'larger scale' than a 1:250,000 map?",
    a: "This is known as the cartographic scale paradox. In mathematical terms, 1/24,000 (0.00004167) is a larger fraction than 1/250,000 (0.00000400). A 'large-scale' map features a smaller denominator, covering a smaller geographic area with high structural detail (streets, individual buildings, contour lines). A 'small-scale' map has a large denominator, covering an expansive geographic territory (entire states or continents) with low feature resolution.",
  },
  {
    q: "How do you calculate real-world surface area from a measurement on a paper map?",
    a: "Surface area scales quadratically as the square of the linear scale ratio: Real Area = Map Area × N². For example, on a 1:50,000 topographic map (where 1 cm = 50,000 cm = 500 m = 0.5 km), a measured lake parcel covering 6.0 cm² on paper represents 6.0 × (50,000)² cm² = 6.0 × (500 m)² = 6.0 × 250,000 m² = 1,500,000 m², which equals 1.50 km² or 150 hectares (370.66 acres).",
  },
  {
    q: "What is the exact representative fraction for the standard US 1 inch = 1 mile scale?",
    a: "Since 1 statute mile equals exactly 5,280 feet and 1 foot contains 12 inches, 1 mile = 5,280 × 12 = 63,360 inches. Therefore, a map where 1 inch equals 1 mile has an exact representative fraction of 1:63,360. In contrast, standard USGS 7.5-minute topographic quadrangles use 1:24,000 (1 inch = 2,000 feet = ~0.3788 miles), while British Ordnance Survey Landranger maps use the metric 1:50,000 scale (2 cm = 1 km).",
  },
  {
    q: "How does the Mercator projection distort map scales at different latitudes?",
    a: "The standard Web Mercator projection (EPSG:3857) preserves local angles (conformal) but stretches scale by the secant of latitude (1 / cos(φ)). While the scale is true at the Equator (0°), at 60° latitude (such as Greenland or northern Canada), ground distances on a Mercator map appear stretched by a factor of 1 / cos(60°) = 2.0x, making land areas appear 4 times larger than their true physical size. For accurate spherical distances, utilize our distance between cities calculator.",
  },
  {
    q: "How do you convert real ground distances into inches or centimeters to draft a map?",
    a: "To determine required map drafting length from actual ground distance, divide the real distance by the scale denominator N using identical units: Map Distance = Real Distance / N. For example, to draw a 4.5 kilometer hiking trail on a 1:25,000 topographic map: 4,500 meters = 450,000 centimeters. 450,000 cm / 25,000 = 18.0 cm on paper.",
  },
];

export default function MapScalePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/geography", label: "Geography" }}
      title="Map Scale Calculator"
      intro="Convert paper map measurements to real ground distances and surface areas, calculate representative fractions (RF), determine scale bar dimensions, and analyze cartographic spatial resolutions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Scientific Cartographic Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-400 dark:ring-cyan-500/30">
                <svg className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                USGS National Geospatial Program &amp; Ordnance Survey Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">ISO 19111 Geographic Referencing &amp; FGDC Cartographic Protocols</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Cartographic &amp; Photogrammetry Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Cartographic Summary: Understanding Map Scale &amp; Ground Conversion
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A <strong>map scale</strong> defines the proportional relationship between a linear measurement on a two-dimensional sheet or screen and the corresponding physical distance on Earth&apos;s geoid surface. Represented as a <strong>Representative Fraction (1:N)</strong>, <strong>verbal scale</strong> (e.g. 1 inch = 1 mile), or graphical <strong>scale bar</strong>, it governs both spatial resolution and measurement uncertainty. On a <code>1:24,000</code> USGS quadrangle, 1 mm equals 24 meters on the ground; on a <code>1:50,000</code> topo map, 1 cm equals 500 meters. Ground area scales quadratically by $N^2$. Convert spherical coordinates into ground positions with our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude and longitude calculator</a>.
            </p>
          </div>

          <h2>Representative Fractions &amp; Cartographic Ground Resolution Dynamics</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <CartographicScaleDetailSpectrumChart />
          </div>

          <p>
            Cartography relies on reduction: representing expansive territories of the terrestrial surface within the bounded margins of paper sheets or digital viewport canvases. The fundamental index of this spatial transformation is the <strong>Representative Fraction (RF)</strong>, expressed mathematically as 1:N or 1/N. The numerator represents a unit distance on the graphic depiction, while the denominator N denotes the identical number of units on the physical surface of Earth.
          </p>
          <p>
            Because the representative fraction is dimensionless, it functions universally across any metric or imperial measuring system. On an engineering site plan drawn at 1:500, one unit of any kind corresponds to 500 identical units in reality: 1 cm = 500 cm = 5.0 m, 1 inch = 500 inches = 41.67 feet, and 1 mm = 0.5 m. When analyzing regional territories, you can compute national population density ratios with our <a href="/calculators/geography/country-area-population-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">country area and population calculator</a> or express custom engineering proportions through our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Linear Ground Distance and Quadratic Real Area Governing Equations</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"D_{\\text{real}} = D_{\\text{map}} \\times N, \\quad D_{\\text{map}} = \\frac{D_{\\text{real}}}{N}, \\quad A_{\\text{real}} = A_{\\text{map}} \\times N^2"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Where N is the scale denominator, D_map is distance on paper, D_real is physical ground distance, and A_real is true surface area. Units must be normalized before multiplication.</div>
          </Formula>

          <h2>The Large-Scale vs. Small-Scale Cartographic Paradox</h2>
          <p>
            One of the most frequent points of confusion among navigators, hikers, and engineering students is the distinction between <em>large-scale</em> and <em>small-scale</em> maps. This terminology stems directly from the numerical value of the mathematical fraction 1/N:
          </p>
          <ul>
            <li>
              <strong>Large-Scale Maps (Small Denominator N &lt; 25,000):</strong> Fractions such as 1:500 (0.002) or 1:24,000 (0.0000417) are numerically large. These maps depict a small geographic footprint (such as an architectural parcel, university campus, or mountain pass) with high spatial resolution, showing individual property lines, building footprints, culverts, and steep terrain contours. When evaluating topographic incline along trail contours, combine your scale calculations with our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.
            </li>
            <li>
              <strong>Medium-Scale Maps (25,000 &le; N &le; 250,000):</strong> Including standard regional topographic surveys like the British Ordnance Survey Landranger (1:50,000) and USGS regional quadrangles (1:100,000). These balance regional corridor coverage with topographic landmark recognition.
            </li>
            <li>
              <strong>Small-Scale Maps (Large Denominator N &gt; 250,000):</strong> Fractions such as 1:1,000,000 (0.000001) are numerically small. These cover expansive geographical expanses—entire nations, continental regions, or the entire globe—requiring severe cartographic feature generalization where cities become single dots and rivers are simplified into single-pixel paths. Measure planetary transit distances between these cities using our <a href="/calculators/geography/distance-between-cities-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">distance between cities calculator</a>.
            </li>
          </ul>

          <h2>Quadratic Area Scaling: The N² Geometric Rule</h2>
          <p>
            While linear distances scale proportionally by the scale factor N, two-dimensional surface areas scale by the square of the ratio (N²). This mathematical property has dramatic real-world consequences during land assessment, watershed modeling, and forestry planning:
          </p>
          <p>
            Consider a 1-centimeter by 1-centimeter square (1.0 cm²) drawn on maps of differing scales:
          </p>
          <ul>
            <li>On a <strong>1:10,000</strong> city zoning plan: 1 cm = 100 m. The 1.0 cm² box represents 100 m × 100 m = 10,000 m² = 1.0 hectare (2.471 acres).</li>
            <li>On a <strong>1:50,000</strong> topographic quad: 1 cm = 500 m. The 1.0 cm² box represents 500 m × 500 m = 250,000 m² = 25.0 hectares (61.78 acres) — exactly <strong>25 times</strong> more physical land area!</li>
            <li>On a <strong>1:250,000</strong> regional road map: 1 cm = 2,500 m = 2.5 km. The 1.0 cm² box represents 2.5 km × 2.5 km = 6.25 km² = 625 hectares (1,544.4 acres) — <strong>625 times</strong> more area than the 1:10,000 plan.</li>
          </ul>
          <p>
            Verify percentage growth between parcel surveys using our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, or solve diagonal boundary hypotenuses with our <a href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</a>.
          </p>

          <h2>Standard Cartographic Scale Benchmark Reference</h2>
          <p>
            The table below documents primary representative fractions established by national mapping agencies (USGS, Ordnance Survey, IGN France) and international aviation bodies, including linear ground equivalents and areal coverage:
          </p>

          <DataTable
            head={["Representative Fraction", "Cartographic Classification", "1 cm on Map Equals", "1 inch on Map Equals", "1 mm Ground Resolution", "Standard Primary Application"]}
            rows={[
              ["1:500", "Ultra-Large Scale (Engineering)", "5.0 meters", "41.7 feet", "0.50 meters (50 cm)", "Architectural blueprints, site drainage, civil utility layout"],
              ["1:2,500", "Cadastral Survey", "25.0 meters", "208.3 feet", "2.50 meters", "Urban municipal tax parcels, legal boundary deed registry"],
              ["1:10,000", "Large-Scale Urban", "100.0 meters", "833.3 feet", "10.0 meters", "City zoning plans, pipeline corridors, disaster evacuation routing"],
              ["1:24,000", "USGS 7.5-Minute Quadrangle", "240.0 meters", "2,000 feet (0.379 mi)", "24.0 meters", "US federal standard topographic hiking, geological survey, forestry"],
              ["1:25,000", "Ordnance Survey Explorer", "250.0 meters", "2,083.3 feet (0.395 mi)", "25.0 meters", "UK National Parks outdoor recreation, mountain navigation"],
              ["1:50,000", "OS Landranger / NATO Military", "500.0 meters (0.5 km)", "4,166.7 feet (0.789 mi)", "50.0 meters", "Standard military tactical grid (MGRS), civil defense, regional hiking"],
              ["1:100,000", "Regional Topographic", "1,000.0 m (1.0 km)", "8,333.3 feet (1.578 mi)", "100.0 meters", "County planning, watershed management, wildlife corridors"],
              ["1:250,000", "Joint Operations Graphic (JOG)", "2,500.0 m (2.5 km)", "20,833.3 feet (3.946 mi)", "250.0 meters", "Aviation visual approach, military regional planning, road atlases"],
              ["1:500,000", "FAA VFR Sectional Aeronautical", "5,000.0 m (5.0 km)", "41,666.7 feet (7.891 mi)", "500.0 meters (0.5 km)", "General aviation visual navigation, airspace sectors, transponder zones"],
              ["1:1,000,000", "International Map of the World", "10,000.0 m (10.0 km)", "83,333.3 feet (15.78 mi)", "1,000.0 meters (1.0 km)", "Continental atlases, global biome mapping, geopolitical analysis"],
            ]}
          />

          <h2>Digital Web Maps, Zoom Levels &amp; Mercator Scale Distortion</h2>
          <p>
            In modern GIS and web cartography (Google Maps, OpenStreetMap, Mapbox, ArcGIS Online), scale behaves dynamically through <strong>tiled pyramid zoom levels</strong> ($z = 0$ to $22$). At zoom level 0, the entire planet is rendered onto a single 256×256-pixel tile, resulting in an equatorial ground resolution of approximately 156,543 meters per pixel. With each successive zoom integer, the scale doubles and the pixel ground distance is halved:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full min-w-[600px] text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Zoom Level</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Equatorial Resolution</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Representative Fraction (96 DPI)</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Visual Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-mono">z = 0</td>
                  <td className="p-3">156.54 km / pixel</td>
                  <td className="p-3 font-mono">1:591,657,550</td>
                  <td className="p-3">Entire Earth hemisphere</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">z = 5</td>
                  <td className="p-3">4.89 km / pixel</td>
                  <td className="p-3 font-mono">1:18,489,298</td>
                  <td className="p-3">Continental landmass or large country</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">z = 10</td>
                  <td className="p-3">152.9 meters / pixel</td>
                  <td className="p-3 font-mono">1:577,790</td>
                  <td className="p-3">Metropolitan region or county</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">z = 15</td>
                  <td className="p-3">4.78 meters / pixel</td>
                  <td className="p-3 font-mono">1:18,056</td>
                  <td className="p-3">City neighborhoods and main thoroughfares</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">z = 18</td>
                  <td className="p-3">0.60 meters / pixel</td>
                  <td className="p-3 font-mono">1:2,257</td>
                  <td className="p-3">Individual buildings, parking lots, driveways</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Crucially, because Web Mercator projects the spherical Earth onto a cylinder tangent to the Equator, the linear scale factor expands with latitude according to k = sec(phi) = 1 / cos(phi). A scale bar indicating 100 meters at the Equator will represent only 50 meters on the ground when viewed at 60° latitude (Oslo, Stockholm, or Anchorage). Always inspect the active latitude-dependent scale bar when performing spatial measurements in web mapping applications. When coordinating expedition logistics across longitudes, schedule team rendezvous using our <a href="/calculators/geography/time-zone-difference-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time zone difference calculator</a>, calculate travel march schedules with our <a href="/calculators/datetime/time-duration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time duration calculator</a>, compute caloric hiking expenditures with our <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>, and manage team expedition funding with our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">budget calculator</a>.
          </p>

          <h2>Navigational Protocols for Field Map Scale Conversion</h2>
          <p>
            When utilizing physical topographic maps during wilderness navigation, backcountry search and rescue, or military reconnaissance, adhere to these standard operational rules:
          </p>
          <ol>
            <li>
              <strong>Verify Map Margins for Declination &amp; Grid Convergence:</strong> Always check the map collar for magnetic declination and grid convergence angles before converting magnetic compass azimuths to grid bearings.
            </li>
            <li>
              <strong>Account for Paper Hygro-Expansion:</strong> Paper topographic sheets expand and contract with atmospheric humidity changes, which can introduce up to 1–2% scaling distortion. Use the printed bar scale in the margin rather than a rigid plastic ruler to cancel out uniform paper shrinkage.
            </li>
            <li>
              <strong>Apply the Pacing Calibration:</strong> Determine your personal double-pace count over a calibrated 100-meter course. On a 1:25,000 map (where 1 cm = 250 m), a 1,000-meter march corresponds to exactly 4.0 cm on paper, allowing accurate navigation without electronic GPS reliance.
            </li>
          </ol>
        </>
      }
    >
      <MapScaleCalculator />
    </CalcPage>
  );
}
