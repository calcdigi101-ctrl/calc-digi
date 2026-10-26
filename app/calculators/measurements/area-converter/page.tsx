import type { Metadata } from "next";
import Link from "next/link";
import AreaConverterComponent from "@/components/calcs/measurements/area-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AreaSpatialFootprintComparisonChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/area-converter";
const TITLE = "Area Converter | Square Meters, Acres, Hectares & Square Feet";
const DESCRIPTION =
  "Convert square meters, square feet, acres, hectares, square kilometers, and square miles with exact cadastral geometry constants and interactive footprint modeling.";

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
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/physics/density-calculator", icon: "🧱", name: "Density Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/pages/measurements", icon: "📐", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How many square feet are in one international acre?",
    a: "One international acre contains exactly 43,560 square feet (approximately 4,046.85642 square meters, or ~0.404686 hectares). Historically, this originated in medieval England as the land area an ox team could plow in one day (one furlong of 660 feet by one chain of 66 feet).",
  },
  {
    q: "What is the exact mathematical definition of a hectare?",
    a: "A hectare (ha) is officially accepted for use with the SI system and is defined as a square measuring 100 meters on each side, yielding an area of exactly 10,000 square meters (1 hm²). One hectare equals approximately 2.47105 acres, and 100 hectares comprise exactly 1 square kilometer.",
  },
  {
    q: "Why do area unit conversions scale quadratically with length factors?",
    a: "Area represents two-dimensional spatial extension (length × width). When converting between linear units with conversion factor k (such as 1 ft = 0.3048 m), the corresponding area conversion factor scales as k²: 1 ft² = (0.3048 m)² = 0.09290304 m². Doubling linear dimensions quadruples total surface area.",
  },
  {
    q: "What is a 'square' in American and Australian roofing and construction?",
    a: "In North American and Australian building construction, a 'square' is an empirical trade unit of roof or siding area equal to exactly 100 square feet (9.2903 square meters). Shingles and underlayment rolls are packaged and priced commercially per roofing square.",
  },
];

export default function AreaConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Cadastral Guidance:</strong> Area quantifies two-dimensional surface extension. In civil engineering, real estate surveying, and architectural design, cross-reference linear dimensions in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and calculate three-dimensional material displacement using our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Foundations of Cadastral Geometry: Terrestrial Surface Extension
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Area measurement forms the cornerstone of property rights, agricultural stewardship, urban zoning, and structural architectural design. In Euclidean two-dimensional space, area quantifies the extent of a planar region bounded by closed boundaries, with the square meter (m²) designated as the SI coherent derived unit. However, land surveying history across divergent civilizations produced specialized area units reflecting agricultural labor capacity and ancient taxation customs.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In the Anglo-American tradition, the acre, square yard, and square foot became deeply entrenched in municipal deeds and cadastral maps. Conversely, continental Europe and global forestry management adopted the decimal hectare (ha) and square kilometer (km²). In modern cross-border property transactions, civil infrastructure planning, and environmental carbon offset accounting, exact area conversion prevents substantial financial miscalculations.
          </p>

          <AreaSpatialFootprintComparisonChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Quadratic Scaling Laws
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because area is a derived physical quantity proportional to the square of linear distance (L²), dimensional transformations require squaring the underlying linear conversion coefficients:
          </p>
          <Formula>{"A_{\\text{target}} = A_{\\text{source}} \\times \\left( \\frac{\\lambda_{\\text{source}}}{\\lambda_{\\text{target}}} \\right)^2"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where λ represents the underlying linear scalar in meters. For example, because 1 international foot is legally fixed at exactly 0.3048 meters per the 1959 international accord:
          </p>
          <Formula>{"1 \\text{ ft}^2 = (0.3048 \\text{ m})^2 = 0.09290304 \\text{ m}^2"}</Formula>
          <Formula>{"1 \\text{ acre} = 43,560 \\text{ ft}^2 \\times 0.09290304 \\text{ m}^2/\\text{ft}^2 = 4046.8564224 \\text{ m}^2"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating agricultural crop yields or soil fertilization mass requirements, surface area directly determines material distribution density; cross-reference soil amendment masses in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link> and calculate bulk density ratios using our <Link href="/calculators/physics/density-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">density calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Area Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across microscopic, architectural, agricultural, and geographic territorial scales:
          </p>
          <DataTable
            head={["Area Unit", "Symbol", "Square Meters Equivalent (m²)", "Square Feet Equivalent (ft²)"]}
            rows={[
              ["Square Millimeter", "mm²", "1.0 × 10⁻⁶ m²", "1.07639 × 10⁻⁵ ft²"],
              ["Square Centimeter", "cm²", "0.0001 m²", "0.00107639 ft²"],
              ["Square Meter (SI Coherent)", "m²", "1.0 m²", "10.7639104 ft²"],
              ["Are", "a", "100.0 m²", "1,076.391 ft²"],
              ["Hectare (SI Accepted)", "ha", "10,000.0 m²", "107,639.104 ft²"],
              ["Square Kilometer", "km²", "1,000,000.0 m²", "10,763,910.4 ft²"],
              ["Square Inch", "in²", "0.00064516 m²", "0.00694444 ft²"],
              ["Square Foot", "ft²", "0.09290304 m²", "1.0 ft²"],
              ["Square Yard", "yd²", "0.83612736 m²", "9.0 ft²"],
              ["Acre (International)", "ac", "4,046.856422 m²", "43,560.0 ft²"],
              ["Square Mile (Section)", "mi²", "2,589,988.11 m²", "27,878,400.0 ft²"],
              ["Barn (Nuclear Physics)", "b", "1.0 × 10⁻²⁸ m²", "1.07639 × 10⁻²⁷ ft²"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Solar Farm Land Acquisition
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a renewable energy developer acquiring rural agricultural land for a 50-megawatt (MW) photovoltaic solar generation facility in Texas. The preliminary engineering layout indicates a required panel footprint of 485,000 square meters. The real estate broker quotes lease terms in international acres, while environmental impact reports require reporting in metric hectares:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Square Meters to Hectares):</strong> Divide by 10,000 m²/ha: 485,000 m² ÷ 10,000 = 48.50 hectares.</li>
            <li><strong>Step 2 (Convert Square Meters to International Acres):</strong> 485,000 m² ÷ 4,046.8564224 m²/acre = 119.846 acres.</li>
            <li><strong>Step 3 (Square Feet Cross-Verification):</strong> 119.846 acres × 43,560 ft²/acre = 5,220,492 sq ft. In square meters: 5,220,492 × 0.09290304 = 485,000 m², confirming mathematical consistency.</li>
            <li><strong>Step 4 (Electrical Generation Modeling):</strong> Annual solar power yield can be cross-verified in our <Link href="/calculators/measurements/power-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power converter</Link> and electrical current capacity modeled in the <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geographic Information Systems (GIS) & Map Projection Distortion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating extensive land surface areas from cartographic GIS layers, cartographers must account for map projection distortion. Because Earth is an oblate ellipsoid (approximated by WGS 84 or GRS 80 geodetic datums), projecting a curved spherical surface onto a two-dimensional planar sheet introduces area distortion.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conformal projections like the Mercator projection preserve local angular shapes at the expense of severe poleward area exaggeration (e.g., Greenland appears larger than South America, despite South America being nearly eight times larger in reality). In property tax assessment and environmental habitat monitoring, surveyors employ equal-area projections (such as the Albers Equal-Area Conic or Lambert Azimuthal Equal-Area) to ensure calculated polygon acreage matches ground reality.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Sub-Atomic Cross Sections: The Nuclear Physics &apos;Barn&apos;
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the opposite end of the dimensional spectrum, nuclear and particle physicists measure reaction probability cross-sections using a specialized area unit termed the &apos;barn&apos; (symbol b), defined as exactly 1.0 × 10⁻²⁸ square meters (100 square femtometers). Coined during the Manhattan Project in 1942, American physicists noted that a uranium-235 nucleus presented an effective target for neutron capture as large as &apos;a barn door&apos;.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Today, collision cross-sections in high-energy particle accelerators like the Large Hadron Collider are routinely reported in millibarns (mb), microbarns (µb), and picobarns (pb), governing the statistical discovery rates of subatomic particles like the Higgs boson.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Architectural Building Codes: Gross Floor Area & Floor Area Ratios
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In municipal urban zoning and structural architecture, real estate developers evaluate the Floor Area Ratio (FAR), defined as the ratio of a building&apos;s total Gross Floor Area (GFA) to the gross land area of the zoning plot: FAR = GFA / A_lot. Municipal planning commissions enforce strict FAR limits (e.g., FAR = 2.5 on a 1-acre plot limits total usable building floor space across all storeys to 2.5 × 43,560 = 108,900 square feet).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurately reconciling rentable square footage (RSF) versus gross interior building area under BOMA (Building Owners and Managers Association) standards ensures leasing transparency. You can analyze mathematical area proportions using our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link> and calculate leasing variance in the <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Residential Landscaping & Global Agriculture
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In domestic landscaping and turf management, property owners routinely calculate lawn area in square feet to purchase grass seed, sod, and turf fertilizer bags packaged to cover 5,000 or 10,000 sq ft. In international agricultural grain commodity trading, wheat and corn yields are quoted in metric tonnes per hectare (t/ha) across Europe and South America, but reported as bushels per acre (bu/ac) across the United States.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Bridging these units ensures farmers, commodity brokers, and agricultural food processors maintain parity in global trade agreements. For related tools across physical sciences and education, explore our centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link> or evaluate student coursework in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cadastral Traverse Surveying & The Gauss Shoelace Area Algorithm
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In geodetic land surveying and boundary determination, irregular land parcels are rarely perfect rectangles or circles. Licensed land surveyors record closed boundary polygon traverses using total station electronic theodolites, measuring boundary azimuth bearings and horizontal leg distances to establish coordinate points (x_i, y_i) in state plane grid systems.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To calculate the enclosed area of an arbitrary n-sided non-self-intersecting polygon, cadastral software executes Gauss&apos;s celebrated shoelace algorithm (surveyor&apos;s formula): 2A = |∑ (x_i × y_(i+1) - x_(i+1) × y_i)|. The resulting area is computed in square survey meters or square survey feet and subsequently converted to legal property deed acreage. A closing traverse error of even a few centimeters across property perimeter lines can shift high-value commercial boundary acreage by several hundred square feet.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Civil Hydrology: Watershed Basin Runoff & The Rational Method
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil stormwater drainage engineering and municipal flood prevention, civil engineers evaluate peak stormwater discharge Q resulting from rainfall storms using the empirical Rational Method equation: Q = C × I × A. In this formulation, C is the dimensionless catchment runoff coefficient (ranging from 0.15 for permeable turf parks to 0.95 for asphalt parking lots), I is the storm rainfall intensity in inches or millimeters per hour, and A is the tributary drainage basin surface area.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In US customary stormwater design, when area A is expressed in acres and rainfall intensity I in inches per hour, the numerical constant conveniently cancels (1 acre-inch per hour equals 1.008 cubic feet per second, CFS), allowing direct runoff flow estimation. In metric Eurocode drainage standards, basin area is measured in hectares or square kilometers, requiring precise area conversion to size retention ponds and concrete culvert diameters.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Heat Transfer Boundary Layers: Extended Fin Convective Surface Areas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical thermal management and CPU heat sink engineering, Newton&apos;s law of cooling establishes that convective heat transfer rate Q scales directly with total exposed surface area A: Q = h × A × (T_surface - T_ambient), where h is the convective heat transfer coefficient. Because the microchip silicon die area is minuscule (often &lt; 2 cm²), thermal engineers bond aluminum and copper extruded pin-fin heatsinks to multiply effective surface area by over fiftyfold.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Calculating fin efficiency and total wetted surface area in square centimeters and square inches allows electronic hardware designers to maintain microprocessor junction temperatures below 85°C during maximum computational workloads, preventing semiconductor thermal throttling.
          </p>
        </>
      }
    >
      <AreaConverterComponent />
    </CalcPage>
  );
}
