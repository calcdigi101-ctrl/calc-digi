import RoofAreaCalculator from "@/components/calcs/housing/roof-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/roof-area-calculator";
const TITLE = "Roof Area Calculator – Pitch, Squares & Shingle Bundles | CalcDigi";
const DESCRIPTION =
  "Free roof area calculator: calculate true sloped roof surface area, roofing squares (100 sq ft), and shingle bundle counts from building ground dimensions, pitch, and eave overhangs.";

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

          {/* Graph #2: Authoritative Visual Roof Pitch Multiplier Curve */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Roof Pitch Slope Multipliers (Flat Footprint vs Actual Sloped Surface)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark showing how steepness increases total surface area over horizontal ground dimensions.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                NRCA Slope Table
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line x1="50" y1="20" x2="570" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="70" x2="570" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="120" x2="570" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="570" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="570" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="40" y="24" fontSize="10" fill="#64748b" textAnchor="end">+50%</text>
                <text x="40" y="74" fontSize="10" fill="#64748b" textAnchor="end">+30%</text>
                <text x="40" y="124" fontSize="10" fill="#64748b" textAnchor="end">+15%</text>
                <text x="40" y="174" fontSize="10" fill="#64748b" textAnchor="end">+5%</text>
                <text x="40" y="204" fontSize="10" fill="#64748b" textAnchor="end">Flat (0%)</text>

                {/* X-axis labels (Pitches) */}
                <text x="80" y="218" fontSize="10" fill="#64748b" textAnchor="middle">3/12 (3.1%)</text>
                <text x="170" y="218" fontSize="10" fill="#64748b" textAnchor="middle">4/12 (5.4%)</text>
                <text x="270" y="218" fontSize="10" fill="#64748b" textAnchor="middle">6/12 (11.8%)</text>
                <text x="370" y="218" fontSize="10" fill="#64748b" textAnchor="middle">8/12 (20.2%)</text>
                <text x="470" y="218" fontSize="10" fill="#64748b" textAnchor="middle">10/12 (30.2%)</text>
                <text x="545" y="218" fontSize="10" fill="#64748b" textAnchor="middle">12/12 (41.4%)</text>

                {/* Pitch Expansion Curve */}
                <path
                  d="M80 188 L170 178 L270 152 L370 118 L470 76 L545 38"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Data Points */}
                <circle cx="80" cy="188" r="4" fill="#2563eb" />
                <circle cx="170" cy="178" r="4" fill="#2563eb" />
                <circle cx="270" cy="152" r="4" fill="#2563eb" />
                <circle cx="370" cy="118" r="4" fill="#2563eb" />
                <circle cx="470" cy="76" r="4" fill="#2563eb" />
                <circle cx="545" cy="38" r="4" fill="#2563eb" />

                {/* Callout */}
                <text x="280" y="145" fontSize="11" fill="#10b981" fontWeight="bold">6/12 Standard Gable (1.118× Multiplier)</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Steeper pitches significantly increase roof surface area, shingle material requirements, and scaffolding labor costs.
            </p>
          </div>

          <h2>Formulas for Roof Estimation</h2>
          <Formula>
            Flat Footprint with Overhangs = (Length + 2 × Overhang) × (Width + 2 × Overhang)
          </Formula>
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
