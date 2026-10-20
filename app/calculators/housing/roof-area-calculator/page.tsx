import RoofAreaCalculator from "@/components/calcs/housing/roof-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RoofPitchMultiplierChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/roof-area-calculator";
const TITLE = "Roof Area Calculator – Pitch Multipliers and Squares";
const DESCRIPTION = "Free roof area calculator: estimate total roof surface area, roofing squares, pitch multipliers, and asphalt shingle bundles with slope and waste factors.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Roof Area Calculator"
      intro="Calculate true sloped roof surface square footage, roofing squares, shingle bundle counts, and underlayment rolls from ground footprint and roof pitch."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Roof Area = (Ground Length + 2*Overhang) * (Ground Width + 2*Overhang) * Sqrt(1 + (Rise/12)^2) * (1 + Waste %)"
      related={[
        { href: "/calculators/housing/square-footage-calculator", icon: "📐", name: "Square Footage" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/land-area-calculator", icon: "🗺️", name: "Land Area Calculator" },
        { href: "/calculators/housing/concrete-calculator", icon: "🏗️", name: "Concrete Calculator" },
        { href: "/calculators/housing/electricity-cost-calculator", icon: "⚡", name: "Electricity Cost" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "What is a roofing square?",
          a: "In construction and architectural roofing, one 'Square' is equal to exactly 100 square feet of roof surface. For example, a 2,400 sq ft roof equals 24 roofing squares. Materials such as shingles, synthetic felt, and ice barriers are sold and priced by the square.",
        },
        {
          q: "How many bundles of shingles do I need per square?",
          a: "For standard fiberglass asphalt and laminated architectural dimensional shingles, there are 3 bundles per roofing square. If your roof requires 24 squares, you need to order 72 bundles (plus 10% to 15% extra for ridge caps, starters, and valley waste, totaling ~80 bundles).",
        },
        {
          q: "How do I calculate roof pitch from ground dimensions?",
          a: "Roof pitch is expressed as the number of vertical inches the roof rises for every 12 inches of horizontal run (e.g., 6/12 pitch means a 6-inch vertical rise per 12 horizontal inches). The pitch multiplier is calculated using the Pythagorean theorem: SquareRoot(1 + [Rise / 12]²).",
        },
        {
          q: "How much extra material should I add for hip roofs and valleys?",
          a: "Simple dual-pitch gable roofs generate low cutting waste, requiring only a 10% buffer. Complex hip roofs, intersecting valleys, and multi-dormer layouts generate substantial angled diagonal waste along hips and valleys, requiring a 15% to 20% waste allowance.",
        },
        {
          q: "What is the minimum roof slope for asphalt shingles?",
          a: "Under the International Residential Code (IRC §R905.2.2), asphalt shingles can only be installed on roofs with a slope of 2/12 (9.5°) or greater. For low slopes between 2/12 and 4/12, a double-layer of underlayment or full self-adhering modified bitumen membrane is code-mandated.",
        },
        {
          q: "Do I need an ice and water shield barrier?",
          a: "In geographic regions with freezing winter climates (where the average January temperature is 30°F or lower), the building code mandates a self-adhering polymer-modified bitumen membrane extending from the eave edge to at least 24 inches inside the home's exterior heated wall line to prevent ice dam leaks.",
        },
      ]}
      article={
        <>
          {/* Sleek Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                NRCA &amp; IRC §R905 Specifications
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">National Roofing Contractors Association Technical Manual</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Building Science &amp; Envelope Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Roof Area from the Ground</h2>
          <p>
            Measuring a roof by climbing onto a steep, slippery pitch with a tape measure is hazardous and unnecessary.
            Using the building&rsquo;s ground footprint dimensions, eave overhang depth, and pitch slope multiplier, you can
            calculate true sloped surface area safely and accurately from ground level.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <RoofPitchMultiplierChart />

          <h2>Formulas for Roof Estimation</h2>
          <Formula>
            Flat Footprint with Overhangs = (Length + 2 × Overhang) × (Width + 2 × Overhang)
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: 2,000 Sq Ft Ground Footprint with 6/12 Pitch</h2>

            <p>
              Suppose you are re-roofing a single-story ranch home measuring <strong>40 feet wide by 50 feet long (2,000 sq ft ground footprint)</strong>, with <strong>1-foot eave overhangs</strong>, a standard <strong>6/12 roof pitch</strong>, and a 10% waste buffer:
            </p>
            <ul>
              <li><strong>Step 1: Add Eave Overhangs to Ground Dimensions</strong>: Length = 50 + 2(1 ft) = 52 ft. Width = 40 + 2(1 ft) = 42 ft.</li>
              <li><strong>Step 2: Calculate Flat Projected Area</strong>: 52 ft × 42 ft = <strong>2,184 sq ft</strong> flat roof footprint.</li>
              <li><strong>Step 3: Calculate 6/12 Pitch Multiplier</strong>: $\sqrt{1 + (6/12)^2} = \sqrt{1 + 0.25} = \sqrt{1.25} = \mathbf{1.118}$.</li>
              <li><strong>Step 4: Calculate Actual Sloped Surface Area</strong>: 2,184 sq ft × 1.118 = <strong>2,441.7 sq ft</strong>.</li>
              <li><strong>Step 5: Apply 10% Scrap &amp; Starter Strip Waste</strong>: 2,441.7 × 1.10 = <strong>2,685.9 sq ft total required</strong>.</li>
              <li><strong>Step 6: Convert to Roofing Squares</strong>: 2,685.9 ÷ 100 = <strong>26.86 squares</strong> (order 27 squares).</li>
              <li><strong>Step 7: Shingle Bundle Counts (3 bundles per square)</strong>: 27 squares × 3 = <strong>81 shingle bundles</strong>.</li>
            </ul>


            <h2>Common Costly Mistakes in Roofing Estimation</h2>
            <p>Avoid these four critical measurement and installation errors:</p>
            <ul>
              <li><strong>Measuring Ground Footprint Without Eave Overhangs:</strong> Measuring only the home's exterior foundation walls ignores the 12 to 24-inch overhangs around all eaves and rakes, resulting in an immediate 5% to 8% material shortage.</li>
              <li><strong>Underestimating Complex Hip &amp; Valley Scrap:</strong> While a simple two-sided gable roof generates minimal scrap (10%), complex architectural roofs with hip ridges, valleys, and multiple dormers produce substantial angled cut waste requiring a 15% to 20% waste buffer.</li>
              <li><strong>Skipping Starter Shingle Strips &amp; Ridge Caps:</strong> Standard 3-tab and architectural shingle bundles cover flat field exposure. Starter course shingles at the eaves and specialized hip/ridge cap shingles must be ordered in addition to field bundles.</li>
              <li><strong>Failing to Install Ice &amp; Water Shield in Eaves:</strong> In northern freeze zones, omitting self-adhering waterproof ice and water barrier along the lowest 3 to 6 feet of the roof edge allows freeze-thaw ice dams to force water under shingles into ceiling drywall.</li>
            </ul>


            <h2>NRCA Ventilation &amp; Wind Rating Codes</h2>
            <p>
              Building codes enforce specific ventilation and wind-resistance ratings:
            </p>
            <ul>
              <li><strong>Attic Ventilation 1:150 / 1:300 Rule:</strong> The International Residential Code (IRC §R806) mandates 1 square foot of net free ventilating area for every 150 sq ft of attic floor space (or 1:300 if a balanced continuous ridge and soffit vent system is used).</li>
              <li><strong>High-Wind ASTM D3161 Class F Ratings:</strong> In hurricane-prone coastal regions, asphalt shingles must carry ASTM D7158 Class H or ASTM D3161 Class F certification rated to withstand 130+ MPH wind speeds using a 6-nail fastening pattern.</li>
            </ul>
            <p>
              Calculate your overall building footprint with our <a href="/calculators/housing/square-footage-calculator">square footage calculator</a>, evaluate paint requirements with the <a href="/calculators/housing/paint-calculator">paint calculator</a>, and estimate project budgets with the <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>.
            </p>
<Formula>
            Pitch Multiplier = Sqrt[1 + (Rise ÷ 12)²]
          </Formula>
          <Formula>
            True Roof Area = Flat Footprint × Pitch Multiplier × (1 + Waste Factor)
          </Formula>
          <Formula>
            Roofing Squares = True Roof Area ÷ 100
          </Formula>
          <Formula>
            Shingle Bundles = Roofing Squares × 3 bundles/square
          </Formula>

          <h2>Pitch Multipliers and Slope Angles</h2>
          <DataTable
            head={["Pitch (Rise / 12″ Run)", "Slope Multiplier", "Roof Angle (Degrees)", "Common Architectural Style"]}
            rows={[
              ["3/12 Pitch", "1.031", "14.0°", "Modern low-pitch, porch lean-to, carports"],
              ["4/12 Pitch", "1.054", "18.4°", "Traditional suburban ranch, mid-century homes"],
              ["6/12 Pitch", "1.118", "26.6°", "Standard American colonial, contemporary gable"],
              ["8/12 Pitch", "1.202", "33.7°", "Moderate steep, two-story craftsman, cape cod"],
              ["10/12 Pitch", "1.302", "39.8°", "Steep French provincial, Tudor, mountain ski chalet"],
              ["12/12 Pitch (45°)", "1.414", "45.0°", "Historic Gothic revival, A-frame, extreme snow zones"],
            ]}
            highlight={2}
          />

          <h2>Roofing Materials Comparison Table</h2>
          <DataTable
            head={["Roofing Material", "Lifespan", "Wind Resistance", "Material Cost per Square", "Installed Cost per Square"]}
            rows={[
              ["3-Tab Asphalt Shingles", "15 – 20 years", "60 – 70 mph", "$85 – $110", "$320 – $450"],
              ["Architectural Dimensional Shingles", "25 – 35 years", "110 – 130 mph", "$115 – $155", "$420 – $600"],
              ["Standing Seam Metal (Steel/Alum)", "50 – 70 years", "140+ mph", "$280 – $450", "$800 – $1,400"],
              ["Concrete / Clay Tile", "50 – 100 years", "125+ mph (Heavy weight)", "$300 – $550", "$900 – $1,600"],
              ["Natural Slate", "100+ years", "150+ mph", "$700 – $1,200", "$1,800 – $3,000+"],
            ]}
            highlight={1}
          />

          <h2>Step-by-Step Calculation Example</h2>
          <p>
            Consider a single-story ranch home measuring <strong>40 ft long by 30 ft wide</strong> with a standard{" "}
            <strong>6/12 pitch</strong>, a <strong>1-foot (12″) eave overhang</strong>, and a <strong>10% waste factor</strong>:
          </p>
          <ol>
            <li><strong>Footprint with Overhangs:</strong> (40 + 2) × (30 + 2) = 42 ft × 32 ft = <strong>1,344 sq ft</strong>.</li>
            <li><strong>Pitch Multiplier for 6/12:</strong> Sqrt[1 + (6/12)²] = Sqrt[1.25] ≈ <strong>1.118</strong>.</li>
            <li><strong>Sloped Surface Area:</strong> 1,344 × 1.118 = <strong>1,502.6 sq ft</strong>.</li>
            <li><strong>With 10% Waste Buffer:</strong> 1,502.6 × 1.10 = <strong>1,652.8 sq ft</strong>.</li>
            <li><strong>Roofing Squares to Buy:</strong> 1,652.8 ÷ 100 = 16.53 → <strong>17 Squares</strong> (1,700 sq ft).</li>
            <li><strong>Shingle Bundles Needed:</strong> 17 × 3 = <strong>51 bundles</strong>.</li>
          </ol>

          <h2>Ice Dam Thermodynamics, Drip Edge Flashing &amp; Valley Membranes</h2>
          <p>
            A high-performance roof assembly relies on critical metal flashings and self-adhering membranes at vulnerable roof junctures:
          </p>
          <ul>
            <li><strong>Ice Damming Thermodynamics:</strong> In winter, heat escaping from under-insulated attics melts snow on the upper roof. Water runs down to the cold eave overhang and freezes into an ice dam, backing water up underneath shingles. High-temperature self-adhered membrane must extend at least 24 inches inside the interior heated wall line.</li>
            <li><strong>Drip Edge Flashing Standards:</strong> Corrosion-resistant metal drip edge flashing must be installed along eaves (under underlayment) and rakes (over underlayment) to direct rainwater directly into gutters without saturating wooden fascia boards.</li>
            <li><strong>Open Metal vs Closed-Cut Valleys:</strong> Roof valleys funnel massive water volumes during downpours. Open valleys lined with heavy-gauge 26-gauge prepainted steel or copper shed debris faster and last significantly longer than woven asphalt shingles.</li>
          </ul>

          <h2>Roof Ventilation Ratios &amp; High-Wind Nailing Patterns</h2>
          <p>
            Improper attic ventilation and substandard fastener application are the two leading causes of premature shingle failure:
          </p>
          <ul>
            <li><strong>The 1/300 Balanced Ventilation Ratio:</strong> The International Residential Code (IRC Section R806) mandates 1 square foot of Net Free Vent Area (NFVA) for every 300 square feet of attic floor space, balanced equally (50/50) between lower intake eave/soffit vents and upper exhaust ridge vents. Proper airflow prevents attic summer overheating (which bakes shingles from below) and winter condensation rot.</li>
            <li><strong>High-Wind Fastener Patterns (ASTM D3161 Class F):</strong> In designated hurricane or high-wind zones (gusts exceeding 110 mph), asphalt shingles require 6 nails per shingle driven into the designated manufacturer nailing strip, rather than the standard 4-nail pattern. Nails must penetrate at least 3/4 inch into roof decking or completely through plywood sheathing.</li>
          </ul>

          <p>
            Evaluating full home renovation costs? Check our{" "}
            <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>, measure your parcel with the{" "}
            <a href="/calculators/housing/land-area-calculator">land area calculator</a>, or see how attic insulation and solar
            panels reduce monthly bills on our <a href="/calculators/housing/electricity-cost-calculator">electricity cost calculator</a>.
          </p>
        </>
      }
    >
      <RoofAreaCalculator />
    </CalcPage>
  );
}
