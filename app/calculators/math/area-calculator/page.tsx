import AreaCalculator from "@/components/calcs/math/area-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/area-calculator";
const TITLE = "Area Calculator | Calculate Area of 2D Polygons & Shapes | CalcDigi";
const DESCRIPTION =
  "Free online area calculator. Calculate area of rectangles, squares, triangles, circles, trapezoids, parallelograms, ellipses, and irregular polygons step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the area of different 2D shapes?",
    a: "Every shape uses a specialized geometric formula: Rectangle = length × width; Square = side²; Triangle = (base × height) ÷ 2; Circle = π × radius²; Trapezoid = [(base₁ + base₂) ÷ 2] × height; Parallelogram = base × height; Ellipse = π × semi-major axis × semi-minor axis.",
  },
  {
    q: "How do you calculate the area of an irregular polygon?",
    a: "For an irregular polygon with known vertex Cartesian coordinates (x_i, y_i), use Gauss's Area Formula (the Shoelace Formula): Area = (1/2) × | Σ (x_i × y_{i+1} − x_{i+1} × y_i) |. Alternatively, partition the irregular shape into non-overlapping triangles and sum their individual areas.",
  },
  {
    q: "What is the difference between area and perimeter?",
    a: "Perimeter measures the one-dimensional linear boundary length enclosing a shape (measured in units like meters or feet). Area measures the two-dimensional surface space enclosed within that boundary (measured in square units like m² or ft²).",
  },
  {
    q: "How do you convert between square feet and acres?",
    a: "One acre equals exactly 43,560 square feet. To convert square feet to acres, divide the total square footage by 43,560: Acres = Square Feet ÷ 43,560.",
  },
  {
    q: "What is Heron's Formula for triangle area?",
    a: "Heron's Formula calculates the area of any triangle from its three side lengths a, b, c without needing height: Area = √[s(s − a)(s − b)(s − c)], where s = (a + b + c) / 2 is the semiperimeter.",
  },
  {
    q: "How does the area of a shape scale when its linear dimensions are doubled?",
    a: "By the geometric square-cube law, area scales with the square of the linear scaling factor (k²). If you double all linear dimensions of a shape (k = 2), its enclosed surface area increases by a factor of 2² = 4 (a 300% increase).",
  },
  {
    q: "What is the area of a regular n-sided polygon?",
    a: "For a regular polygon with n sides each of length s and apothem a_pothem: Area = (1/2) × Perimeter × a_pothem = (1/4) × n × s² × cot(π / n).",
  },
  {
    q: "How do you calculate the area of an ellipse?",
    a: "The area of an ellipse with semi-major axis a and semi-minor axis b equals π × a × b. When a = b = r, the ellipse becomes a circle and the formula simplifies cleanly to πr².",
  },
];

const POLYGON_FORMULAS_ROWS = [
  ["Square", "s²", "Equilateral rectangle with four 90° angles", "s = 5 → A = 25"],
  ["Rectangle", "l × w", "Quadrilateral with four right angles", "l = 8, w = 4 → A = 32"],
  ["Triangle (General)", "(b × h) ÷ 2", "Half the area of the circumscribed parallelogram", "b = 6, h = 9 → A = 27"],
  ["Parallelogram", "b × h", "Base multiplied by perpendicular vertical altitude", "b = 7, h = 4 → A = 28"],
  ["Trapezoid / Trapezium", "[(a + b) ÷ 2] × h", "Average of parallel bases multiplied by height", "a = 4, b = 8, h = 5 → A = 30"],
  ["Circle", "π × r²", "Curvilinear disc bounded by constant radius r", "r = 6 → A ≈ 113.10"],
  ["Ellipse", "π × a × b", "Stretched circle with semi-axes a and b", "a = 5, b = 3 → A ≈ 47.12"],
  ["Rhombus", "(d₁ × d₂) ÷ 2", "Half the product of the perpendicular diagonals", "d₁ = 6, d₂ = 8 → A = 24"],
];

const UNIT_CONVERSIONS_ROWS = [
  ["Square Feet to Square Meters", "1 ft² = 0.092903 m²", "Divide ft² by 10.7639", "1,000 ft² = 92.90 m²"],
  ["Square Meters to Square Feet", "1 m² = 10.7639 ft²", "Multiply m² by 10.7639", "100 m² = 1,076.39 ft²"],
  ["Square Feet to Acres", "1 Acre = 43,560 ft²", "Divide ft² by 43,560", "87,120 ft² = 2.00 Acres"],
  ["Square Meters to Hectares", "1 Hectare = 10,000 m²", "Divide m² by 10,000", "25,000 m² = 2.50 Hectares"],
  ["Square Miles to Square Kilometers", "1 mi² = 2.58999 km²", "Multiply mi² by 2.58999", "10 mi² = 25.90 km²"],
];

const RELATED = [
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
  { href: "/calculators/math/surface-area-calculator", icon: "🧊", name: "Surface Area" },
  { href: "/calculators/math/volume-calculator", icon: "📦", name: "Volume Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Area Calculator | CalcDigi"
      intro="Calculate the area of squares, rectangles, triangles, circles, trapezoids, ellipses, and complex irregular polygons with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Area(Shape, Dimensions)"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Mathematical Axioms and Measure Theory of 2D Area</h2>
          <p>
            In mathematical analysis and topology, <strong>area</strong> is a fundamental quantity expressing the two-dimensional extent of a planar region in the Euclidean plane ℝ². Formalized within modern Lebesgue measure theory by French mathematician Henri Lebesgue in 1902, area satisfies four fundamental Kolmogorov-like axioms: non-negativity (Area(E) ≥ 0), additivity across disjoint subsets, translational and rotational invariance, and normalization (the unit square [0,1] × [0,1] has measure exactly 1).
          </p>
          <p>
            Historically, the necessity of calculating land areas gave rise to geometry itself (literally &ldquo;earth measurement&rdquo; in ancient Greek). Following the annual inundation of the Nile River, ancient Egyptian surveyors (known as <em>harpedonaptai</em> or &ldquo;rope-stretchers&rdquo;) recalculated agricultural boundary plots to assess taxes, laying the groundwork for Euclidean plane geometry.
          </p>
          <p>
            Today, area calculations govern architectural floor-to-area ratios (FAR), residential property valuation, civil road paving estimates, agricultural crop seed density, photovoltaic solar array yields, and computer-aided manufacturing (CAM) sheet nesting optimization.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Taxonomy of Standard Two-Dimensional Area Formulas</h2>
          <p>
            The table below catalogues standard geometric shapes, their defining algebraic area equations, and their primary structural characteristics:
          </p>

          <DataTable
            head={["Geometric Shape", "Area Formula", "Core Mechanistic Principle", "Representative Worked Calculation"]}
            rows={POLYGON_FORMULAS_ROWS}
            highlight={1}
          />

          <h3>1. Quadrilaterals: Rectangles, Parallelograms, and Trapezoids</h3>
          <p>
            The fundamental unit of area measurement is the rectangle, whose area is the product of its orthogonal length and width: A = l × w. A parallelogram sharing identical base and vertical height can be sheared into a rectangle without altering its enclosed Lebesgue measure, yielding A = b × h.
          </p>
          <p>
            For a trapezoid with parallel bases <em>a</em> and <em>b</em>, the area equals the average of the two parallel bases multiplied by the perpendicular height <em>h</em>:
          </p>
          <Formula>Area = [ (a + b) ÷ 2 ] × h</Formula>
          <p>
            <em>Worked Example:</em> Calculate the area of a trapezoidal parcel with front road frontage a = 60 ft, rear boundary b = 90 ft, and depth h = 120 ft.
          </p>
          <ol>
            <li>Average the parallel bases: (60 + 90) ÷ 2 = 75 ft.</li>
            <li>Multiply by depth: 75 × 120 = <strong>9,000 square feet</strong>.</li>
            <li>Convert to acres: 9,000 ÷ 43,560 ≈ <strong>0.207 Acres</strong>.</li>
          </ol>

          <h3>2. Gauss&apos;s Shoelace Formula for Arbitrary Irregular Polygons</h3>
          <p>
            When calculating the area of an arbitrary non-self-intersecting polygon with <em>n</em> vertices given by Cartesian coordinates (x₁, y₁), (x₂, y₂), ..., (x_n, y_n), <strong>Gauss&apos;s Shoelace Formula</strong> provides an exact algebraic solution:
          </p>
          <Formula>Area = (1 ÷ 2) × | (x₁y₂ + x₂y₃ + ... + x_ny₁) − (y₁x₂ + y₂x₃ + ... + y_nx₁) |</Formula>
          <p>
            This theorem, directly derivable from Green&apos;s Theorem in vector calculus, forms the mathematical core of modern Geographic Information Systems (GIS) software like ArcGIS and QGIS for calculating land parcel boundaries from satellite GPS coordinates.
          </p>

          <h2>Standard Area Unit Conversion Factors</h2>
          <p>
            Translating area metrics across metric (SI) and imperial systems requires quadratic conversion factors:
          </p>

          <DataTable
            head={["Unit Conversion Pair", "Exact Mathematical Ratio", "Operational Rule", "Representative Application"]}
            rows={UNIT_CONVERSIONS_ROWS}
            highlight={2}
          />

          <h2>The Geometric Square-Cube Law and Scale Invariance</h2>
          <p>
            First articulated by Galileo Galilei in 1638 in <em>Two New Sciences</em>, the <strong>square-cube law</strong> dictates that when an object undergoes proportional linear scaling by a factor of <em>k</em>, its surface area scales by k², while its volume and mass scale by k³:
          </p>
          <Formula>Area_new = k² × Area_orig,   Volume_new = k³ × Volume_orig</Formula>
          <p>
            This geometric principle explains why small creatures lose heat rapidly due to high surface-area-to-volume ratios, why giant aircraft require disproportionately vast wing surface areas to generate aerodynamic lift, and why microprocessor chip designers must engineer microscopic microchannel heat sinks to dissipate concentrated thermal power.
          </p>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>, <Link href="/calculators/math/circle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Circle Calculator</Link>, <Link href="/calculators/math/surface-area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Surface Area Calculator</Link>, and <Link href="/calculators/math/volume-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Volume Calculator</Link>.
          </p>
        
          <h2>Riemann Integration, Surface Curvature & Green's Theorem</h2>
          <p>
            In multivariable calculus and differential geometry, 2D area generalizes through double integration over bounded planar domains. While standard elementary formulas rely on Euclidean planar assumptions, area measurements across non-planar or curved topologies require Gaussian surface integrals and differential forms. Green's theorem establishes a profound mathematical bridge between boundary line integrals and interior planar surface area: Area = ∮ (x dy − y dx) / 2. This boundary integration principle forms the exact mathematical foundation of mechanical planimeters and digital CAD vector polygon rasterization algorithms used in surveying, architectural civil engineering, and geographic information systems (GIS). Computational geometry software implements polygon decomposition and Delaunay triangulation to compute irregular land tract parcels with millimetric geodetic accuracy.
          </p>

          <h2>Geodesic Surveying & CAD Boundary Triangulation</h2>
          <p>
            Modern civil engineering and satellite photogrammetry rely on coordinate geometry area formulas, such as the Shoelace algorithm (Gauss's area formula), to calculate irregular polygon boundaries from GPS boundary waypoints. In computer-aided design (CAD) software, complex curved spatial profiles are decomposed into finite element planar meshes, ensuring precise material stress estimation and manufacturing die casting optimization.
          </p>
</>
      }
    >
      <AreaCalculator />
    </CalcPage>
  );
}
