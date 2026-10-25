import type { Metadata } from "next";
import ElevationGradeCalculator from "@/components/calcs/geography/elevation-grade-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SlopeGradeAngleElevationChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/elevation-grade-calculator";
const TITLE = "Elevation Grade Calculator – Slope Percent, Incline Angle & ADA Standards | CalcDigi";
const DESCRIPTION =
  "Calculate slope percent grade, angle in degrees, slope ratio, and actual travel hypotenuse distance from vertical rise and horizontal run. Features ADA Title III ramp compliance and FHWA road safety benchmarks.";

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
  { href: "/calculators/geography/map-scale-calculator", icon: "🗺️", name: "Map Scale & Ground Distance" },
  { href: "/calculators/geography/latitude-longitude-calculator", icon: "📍", name: "Latitude & Longitude Coordinates" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How is percent grade mathematically calculated from rise and run?",
    a: "Percent grade represents the vertical elevation change (Rise) divided by the horizontal ground distance (Run), multiplied by 100: Grade (%) = (Rise / Run) × 100. Both measurements must share identical units (meters or feet). For example, if a roadway climbs 6 meters over a horizontal distance of 100 meters, the grade is (6 / 100) × 100 = 6.0%.",
  },
  {
    q: "How do you convert slope percent grade into an angle in degrees?",
    a: "To convert percent grade into an angular degree measurement, divide the grade by 100 to obtain the tangent of the angle, and take the inverse tangent (arctangent): Angle (θ) = arctan(Grade / 100) × (180 / π). For a 10% grade, arctan(0.10) equals 5.71°. Note that a 100% grade corresponds to a 45° angle (where rise equals run), not a vertical 90° wall.",
  },
  {
    q: "What is the maximum legal slope for an ADA wheelchair accessible ramp?",
    a: "Under the Americans with Disabilities Act (ADA Title III regulations), the maximum allowable slope for commercial accessible pedestrian ramps is 1:12 (an 8.33% grade or roughly 4.76°). Furthermore, ADA regulations mandate that no individual ramp run exceed 30 inches (76 cm) of vertical rise without a level rest landing of at least 60 inches in length.",
  },
  {
    q: "What is the maximum allowable highway grade on the US Interstate System?",
    a: "Federal Highway Administration (FHWA) standards restrict Interstate highway gradients to a maximum of 6% in mountainous terrain (and 4% in non-mountainous rolling terrain) for design speeds of 70 mph. Gradients steeper than 6% over extended distances require dedicated crawler lanes for slow heavy trucks and runaway truck escape ramps.",
  },
  {
    q: "Why do railway systems have much lower grade limits than roadways?",
    a: "Steel train wheels resting on steel rails have extremely low rolling friction compared to rubber tires on asphalt. Standard heavy freight railroads are engineered with maximum grades between 1.5% and 2.2%. Any incline above 2.5% causes locomotive wheel slippage, requiring specialized rack-and-pinion (cog) railway mechanisms to ascend steeper alpine slopes.",
  },
  {
    q: "What is the minimum slope required for proper outdoor surface water drainage?",
    a: "For paved outdoor surfaces (concrete walkways, asphalt parking lots, and patios), civil engineering codes mandate a minimum cross-slope of 0.5% to 1.0% (roughly 1/8 inch to 1/4 inch per foot) to prevent rainwater ponding, freeze-thaw damage, and automotive hydroplaning.",
  },
];

export default function ElevationGradePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/geography", label: "Geography" }}
      title="Elevation Grade Calculator"
      intro="Calculate slope percent grade, angle in degrees, slope ratio, and actual surface travel distance from vertical elevation rise and horizontal run. Includes ADA accessibility compliance and highway engineering benchmarks."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-500/30">
                <svg className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Civil Engineering Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">AASHTO Geometric Design &amp; ADA Title III Specifications</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Topographic Slope Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Engineering Summary: How Elevation Grade and Slope Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Slope grade</strong> is calculated as the ratio of vertical rise to horizontal run expressed as a percentage: <strong>Grade (%) = (Rise ÷ Run) × 100</strong>. Slope angle in degrees is found using the inverse tangent: <strong>Angle (θ) = arctan(Rise ÷ Run)</strong>. In civil engineering, standard highway gradients max out at <strong>6% (Interstate limit)</strong>, commercial wheelchair ramps are legally capped at <strong>8.33% (1:12 ADA limit)</strong>, and steep mountain passes reach <strong>12% to 20%</strong>. Calculate precise proportional slope splits with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
            </p>
          </div>

          <h2>Topographic Slope Dynamics &amp; Civil Engineering Standards</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <SlopeGradeAngleElevationChart />
          </div>

          <p>
            Whether designing an accessible civic entrance ramp, grading a residential driveway, laying railway track, or hiking an alpine mountain trail, understanding slope grade is essential for structural stability, vehicular safety, and accessibility. In civil engineering, the incline of the terrain dictates drainage velocity, pavement friction requirements, and vehicle braking loads. Topographic maps represent elevation changes through contour lines; by combining map measurements with our <a href="/calculators/geography/map-scale-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">map scale calculator</a>, you can determine horizontal run distances directly from cartographic contour intervals.
          </p>
          <p>
            When traveling over an incline, the actual distance traveled along the pavement (the hypotenuse) is longer than the horizontal flat-map distance. This physical travel distance can be evaluated using right-triangle trigonometry and our <a href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</a>. On gentle grades under 5%, the hypotenuse is less than 0.1% longer than the run; however, on severe 25% inclines, actual driving distance is over 3% longer than flat map measurements.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Core Slope Grade, Angle, and Travel Hypotenuse Formulas</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Grade (\\%)} = \\left(\\frac{\\text{Rise}}{\\text{Run}}\\right) \\times 100 \\quad \\Big| \\quad \\theta = \\arctan\\left(\\frac{\\text{Rise}}{\\text{Run}}\\right) \\times \\frac{180}{\\pi} \\quad \\Big| \\quad d_{\\text{hyp}} = \\sqrt{\\text{Rise}^2 + \\text{Run}^2}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Calculates percent grade, incline angle in degrees, and actual travel surface distance. Both Rise and Run must use identical dimensional units (meters, feet, or inches).</div>
          </Formula>

          <h2>Slope Classification Standards: From Drainage to Mountain Passes</h2>
          <p>
            Civil engineers, transportation departments, and building code enforcement bodies classify land slopes into standardized operational categories based on vehicular traction and pedestrian safety:
          </p>

          <DataTable
            head={["Grade Range (%)", "Angle Range (Degrees)", "Slope Aspect Ratio", "Engineering Application", "Safety & Operational Guidance"]}
            rows={[
              ["0.0% – 1.0%", "0.00° – 0.57°", "1:100 or flatter", "Highway plains, sports fields, patios", "Minimum 0.5% required for rain drainage; water ponds on flatter paved surfaces."],
              ["1.0% – 5.0%", "0.57° – 2.86°", "1:100 to 1:20", "Suburban streets, cycling paths", "Gentle cruising grade; passenger vehicles and trucks maintain speed with ease."],
              ["6.0%", "3.43°", "1:16.7", "US Interstate Highway Maximum", "FHWA maximum limit for high-speed mountainous Interstates; requires truck crawler lanes."],
              ["8.33%", "4.76°", "1:12 exactly", "ADA Accessible Ramp Limit", "Legal ceiling for wheelchair ramps; 1 inch rise per 12 inches run; 30-inch rise max per run."],
              ["10.0% – 15.0%", "5.71° – 8.53°", "1:10 to 1:6.7", "Mountain highways, steep residential", "Downshifting required for commercial trucks; runaway vehicle arrestor beds common."],
              ["18.0%", "10.20°", "1:5.56", "Cat 1 Alpine Cycling Climbs", "Severe incline (e.g., Passo dello Stelvio); walking uphill doubles metabolic energy burn."],
              ["25.0% – 30.0%", "14.04° – 16.70°", "1:4 to 1:3.3", "Emergency access fire lanes, ski trails", "2WD vehicles slip in wet or icy conditions; specialized asphalt paving required."],
              ["35.0%", "19.29°", "1:2.86", "Baldwin Street (Dunedin, NZ)", "World's steepest residential street; grooved concrete required to prevent vehicle slides."],
              ["100.0%", "45.00°", "1:1 exactly", "Equal Rise and Run", "Not vertical! A 100% grade represents equal vertical climb and horizontal distance."],
            ]}
            highlight={3}
          />

          <h2>ADA Title III Ramp Compliance Specifications</h2>
          <p>
            The <em>Americans with Disabilities Act</em> establishes strict geometric constraints for accessible routes in commercial and public accommodations. When designing ramps:
          </p>
          <ol>
            <li><strong>Slope Ceiling (1:12):</strong> The maximum slope must not exceed 1 unit of rise for every 12 units of horizontal run (8.33% grade). Any steeper gradient makes manual wheelchair propulsion physically unsafe and increases tipping hazards. Calculate slope percentages using our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.</li>
            <li><strong>Maximum Rise Limit:</strong> A single ramp run can have a maximum vertical rise of 30 inches (76 cm) before requiring an intermediate level landing at least 60 inches (152 cm) in length.</li>
            <li><strong>Cross-Slope Drainage:</strong> The cross-slope (incline perpendicular to the direction of travel) must not exceed 1:48 (2.08%) to prevent wheelchairs from drifting sideways into handrails.</li>
            <li><strong>Handrails:</strong> Ramps with a vertical rise greater than 6 inches (15 cm) must feature continuous handrails on both sides.</li>
          </ol>

          <h2>Vehicle Mechanics on Mountain Descents: Braking Physics</h2>
          <p>
            Descending steep highway grades places extraordinary mechanical demands on vehicle braking systems. When an automobile or commercial semi-truck descends a 6% to 10% mountain grade, gravitational potential energy ($E_p = m \cdot g \cdot h$) is continuously converted into kinetic energy and thermal heat within the brake pads and rotors.
          </p>
          <p>
            If a driver relies solely on friction brakes without downshifting, brake pads can heat beyond 500°C (930°F), vaporizing hydraulic brake fluid and causing catastrophic <strong>brake fade</strong> (complete loss of stopping power). Transportation departments mandate engine compression braking (Jake brakes) on long descents. You can evaluate driving velocity and reaction stopping distances using our <a href="/calculators/datetime/time-duration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time duration calculator</a>. Connecting geographic points and surveying elevation change along routes is supported by our <a href="/calculators/geography/distance-between-cities-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">distance between cities calculator</a> and geodetic coordinate mapping on our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude and longitude calculator</a>.
          </p>

          <h2>Practical Checklist for Slope and Elevation Paving</h2>
          <p>
            Follow these verified steps when calculating elevation grade for residential driveways, drainage culverts, or trail construction:
          </p>
          <ul>
            <li><strong>Measure Run Horizontally:</strong> Never measure run along the sloping surface! Horizontal run must be measured flat (using a laser distance measurer or a carpenter&apos;s level with a plumb line) to avoid underestimating the actual percent grade.</li>
            <li><strong>Standardize Units:</strong> If your rise is measured in inches and your run is measured in feet, convert run to inches (multiply feet by 12) before dividing. For example, a 6-inch rise over a 10-foot run equals $6 \div 120 = 5.0\%$ grade. Check proportional fractions on our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.</li>
            <li><strong>Budgeting Construction Materials:</strong> Calculate raw aggregate and paving volume costs for sloping driveways using our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">household budget calculator</a>.</li>
            <li><strong>Hiking &amp; Trail Caloric Impact:</strong> Hiking up an 8% to 12% grade roughly doubles metabolic calorie expenditure compared to flat walking; calculate hiking energy demands on our <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>.</li>
          </ul>
        </>
      }
    >
      <ElevationGradeCalculator />
    </CalcPage>
  );
}
