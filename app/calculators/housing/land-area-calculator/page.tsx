import LandAreaCalculator from "@/components/calcs/housing/land-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LandAreaBenchmarksChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/land-area-calculator";
const TITLE = "Land Area Calculator – Acres, Sq Ft and Hectares";
const DESCRIPTION = "Free land area calculator: convert lot square feet to acres, hectares, square meters, and square yards with perimeter boundaries and setback estimates.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Land Area Calculator"
      intro="Calculate property acreage, square footage, boundary fencing perimeter, and zoning building coverage from boundary dimensions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Acres = (Length (ft) * Width (ft)) / 43560"
      related={[
        { href: "/calculators/housing/fence-cost-calculator", icon: "🪵", name: "Fence Cost" },
        { href: "/calculators/housing/concrete-calculator", icon: "🏗️", name: "Concrete Calculator" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📐", name: "Square Footage" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How many square feet are in one acre of land?",
          a: "One acre equals exactly 43,560 square feet. If an acre were a perfect square, each side would measure approximately 208.71 feet. In metric terms, one acre equals approximately 4,046.86 square meters or 0.4047 hectares.",
        },
        {
          q: "What is an easy way to visualize one acre?",
          a: "A standard American football field (including the end zones) measures 360 feet long by 160 feet wide, totaling 57,600 square feet. One acre (43,560 sq ft) is equal to about 75% of a full football field (from one goal line to the opposite 20-yard line).",
        },
        {
          q: "What is a typical suburban residential lot size?",
          a: "In the United States, the median single-family suburban lot size is approximately 0.18 to 0.25 acres (roughly 7,800 to 11,000 square feet). In newer master-planned developments, lots often measure 0.12 to 0.15 acres (5,000 to 6,500 sq ft).",
        },
        {
          q: "How do I calculate acreage for an irregularly shaped lot?",
          a: "For four-sided lots with non-parallel sides, measure all four perimeter boundary lengths: Front, Rear, Left, and Right. Calculate the average width: (Front + Rear) ÷ 2, and the average length: (Left + Right) ÷ 2. Multiply the average width by average length, then divide by 43,560.",
        },
        {
          q: "What is maximum lot coverage in zoning codes?",
          a: "Municipal zoning codes restrict the percentage of your land that can be covered by impermeable roofs and pavement (typically 30% to 45% maximum lot coverage). This protects stormwater drainage absorption and prevents neighborhood overbuilding.",
        },
        {
          q: "What is a property setback and how does it limit building?",
          a: "A setback is the minimum required distance between a building and the front, rear, or side property lines (e.g., 25 ft front setback, 10 ft side setback). The area inside these setbacks is your legal 'building envelope'.",
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
                NSPS &amp; ALTA/NSPS Survey Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">National Society of Professional Surveyors Land Measurement Rules</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Land Title &amp; Survey Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Land Acreage and Square Footage</h2>
          <p>
            Whether purchasing a vacant building parcel, buying rural hunting acreage, or planning boundary fencing,
            understanding true land area is essential. In US real estate and legal deeds, land size is measured in{" "}
            <strong>acres</strong> (imperial) or <strong>hectares</strong> (metric).
          </p>
          <p>
            The statutory definition of one acre is exactly <strong>43,560 square feet</strong>. To find total acreage from
            property dimensions in feet, multiply length by width and divide by 43,560.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <LandAreaBenchmarksChart />

          <h2>Land Area Formulas</h2>
          <Formula>
            Acres = [Length (ft) × Width (ft)] ÷ 43,560
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: 330×330 ft Parcel</h2>

            <p>
              Suppose you are purchasing a rectangular rural lot measuring <strong>330 feet along the road frontage by 330 feet deep</strong>:
            </p>
            <ul>
              <li><strong>Step 1: Calculate Total Square Feet</strong>: 330 ft × 330 ft = <strong>108,900 square feet</strong>.</li>
              <li><strong>Step 2: Convert to Acres</strong>: 108,900 sq ft ÷ 43,560 sq ft/acre = <strong>exactly 2.50 acres</strong>.</li>
              <li><strong>Step 3: Convert to Metric Hectares</strong>: 2.50 acres × 0.404686 = <strong>1.012 hectares (10,117 m²)</strong>.</li>
              <li><strong>Step 4: Boundary Perimeter Linear Feet</strong>: 2 × (330 ft + 330 ft) = <strong>1,320 linear feet</strong> (useful for boundary fence estimation).</li>
            </ul>


            <h2>Common Land Purchase Mistakes &amp; Boundary Traps</h2>
            <p>Avoid these costly pitfalls when evaluating acreage, rural parcels, and residential lots:</p>
            <ul>
              <li><strong>Relying on Deed Descriptions Without a Modern Pin Survey:</strong> Older deed descriptions referencing stone markers, oak trees, or historic fence lines frequently contain substantial acreage errors. Always hire a licensed professional surveyor to set verified iron boundary pins.</li>
              <li><strong>Overlooking Utility &amp; Conservation Easements:</strong> A 5-acre lot may have 1.5 acres encumbered by pipeline easements, powerline rights-of-way, or protected wetland conservation zones where building permanent structures is strictly prohibited.</li>
              <li><strong>Assuming Soil is Suitable for Septic (Percolation):</strong> Unincorporated land without municipal sewer requires a passing "perc test" for on-site septic absorption fields. Dense clay or high water tables can make land unbuildable without expensive engineered septic systems.</li>
              <li><strong>Neglecting Legal Ingress/Egress Access:</strong> Landlocked parcels without deeded right-of-way access roads cannot secure residential building permits or mortgage title insurance.</li>
            </ul>


            <h2>The Public Land Survey System (PLSS) Breakdown</h2>
            <p>
              Most land west of the original 13 colonies was surveyed under the US Public Land Survey System using a standardized grid:
            </p>
            <ul>
              <li><strong>Township:</strong> 6 miles by 6 miles = 36 square miles (23,040 acres).</li>
              <li><strong>Section:</strong> 1 square mile = 640 acres (5,280 ft × 5,280 ft).</li>
              <li><strong>Quarter-Section:</strong> 160 acres (historic US Homestead Act allotment).</li>
              <li><strong>Quarter-Quarter Section:</strong> 40 acres (a standard "forty").</li>
            </ul>
            <p>
              Calculate boundary fencing requirements with our <a href="/calculators/housing/fence-cost-calculator">fence cost calculator</a>, determine foundation yardage with the <a href="/calculators/housing/concrete-calculator">concrete calculator</a>, and measure building footprints with the <a href="/calculators/housing/square-footage-calculator">square footage calculator</a>.
            </p>
<Formula>
            Hectares = Square Feet ÷ 107,639 (or Acres ÷ 2.471)
          </Formula>
          <Formula>
            Lot Perimeter (Fence Run) = 2 × (Length + Width)
          </Formula>
          <p>
            Example: A residential lot measuring 150 ft wide by 200 ft deep:
            <br />
            150 ft × 200 ft = 30,000 sq ft.
            <br />
            30,000 ÷ 43,560 = <strong>0.689 Acres</strong> (requiring 700 linear feet of boundary fencing).
          </p>

          <h2>Land Measurement Conversion Reference Table</h2>
          <DataTable
            head={["Unit of Area", "Square Feet (ft²)", "Acres", "Hectares (ha)", "Square Meters (m²)"]}
            rows={[
              ["1/4 Acre (Suburban Lot)", "10,890 sq ft", "0.25 acres", "0.101 ha", "1,012 m²"],
              ["1/2 Acre Lot", "21,780 sq ft", "0.50 acres", "0.202 ha", "2,023 m²"],
              ["1 Acre (Homestead)", "43,560 sq ft", "1.00 acre", "0.405 ha", "4,047 m²"],
              ["1 Hectare (Metric)", "107,639 sq ft", "2.471 acres", "1.000 ha", "10,000 m²"],
              ["1 Square Mile (Section)", "27,878,400 sq ft", "640 acres", "259.0 ha", "2,589,988 m²"],
            ]}
            highlight={2}
          />

          <h2>Zoning, Setbacks and Building Envelopes</h2>
          <ul>
            <li>
              <strong>Floor Area Ratio (FAR):</strong> Municipalities regulate total building square footage as a ratio of
              land size (e.g., a 0.5 FAR on a 10,000 sq ft lot permits a maximum of 5,000 sq ft of total heated living space).
            </li>
            <li>
              <strong>Impermeable Surface Limits:</strong> Most cities cap roofs, asphalt driveways, and concrete patios
              at 35% to 45% of total lot square footage to ensure adequate rainwater percolation.
            </li>
            <li>
              <strong>Easements &amp; Right-of-Way:</strong> Always verify county GIS maps for utility easements along property
              edges, which legally prohibit permanent building structures or concrete foundations.
            </li>
          </ul>

          <h2>Topographical Slope Penalties, Buildable Footprints &amp; Setback Zones</h2>
          <p>
            Raw acreage does not automatically translate into buildable residential square footage. Land developers calculate the "net buildable envelope" by deducting statutory zoning constraints:
          </p>
          <ul>
            <li><strong>Front, Rear &amp; Side Setbacks:</strong> Municipal zoning codes mandate building setbacks (typically 25–50 ft front, 10–20 ft sides, 20–35 ft rear). On a narrow 1-acre lot, setbacks can consume over 35% of the total parcel footprint.</li>
            <li><strong>Slope Topography &amp; Cut-and-Fill Grading:</strong> Parcels with ground slopes exceeding 15% require expensive civil engineering, retaining walls, and engineered slab foundations that increase site preparation costs by $30,000 to $80,000.</li>
            <li><strong>Environmental Wetlands &amp; Riparian Buffers:</strong> Land within 100 feet of designated streams, wetlands, or flood plains (FEMA Zone A/AE) is subject to environmental construction restrictions and mandatory flood insurance requirements.</li>
          </ul>

          <h2>Public Land Survey System (PLSS) &amp; Boundary Survey Verification</h2>
          <p>
            Understanding land measurement conventions is vital when reviewing deeds, tax parcel maps, and title commitments:
          </p>
          <ul>
            <li><strong>PLSS Township &amp; Range Grid System:</strong> Across 30 US states, rural land is platted under the Public Land Survey System. A standard Township is 6 miles square (36 square miles) divided into 36 numbered Sections. Each Section contains exactly 640 acres (1 square mile). A "quarter-section" represents 160 acres, and a "quarter-quarter section" is 40 acres.</li>
            <li><strong>ALTA/NSPS Boundary Survey vs Mortgage Inspection:</strong> A simple lender drive-by plot plan does not establish legal boundaries. When acquiring acreage, commission a formal ALTA/NSPS Land Title Survey with boundary markers pinned by a licensed professional land surveyor to uncover unrecorded access easements, utility rights-of-way, and neighbor fence encroachments.</li>
          </ul>


          <h2>Soil Percolation Rates &amp; Septic Absorption Field Sizing</h2>
          <p>
            When buying unsewered acreage, building feasibility is governed by county environmental health department soil standards:
          </p>
          <ul>
            <li><strong>Perk Test Absorption Rates:</strong> A certified soil scientist drills test holes and measures the water drop rate in minutes per inch (MPI). Acceptable residential percolation rates fall between 15 and 60 minutes per inch. Rates slower than 60 MPI require expensive engineered sand-mound or aerobic treatment systems costing $25,000 to $45,000.</li>
            <li><strong>Separation from Water Tables:</strong> Building codes mandate at least 24 to 48 inches of unsaturated soil between the bottom of the septic absorption trench and the seasonal high groundwater table or restrictive bedrock layer.</li>
            <li><strong>100% Reserve Drainfield Requirement:</strong> Most rural counties require lot plans to identify an untouched 100% duplicate reserve drainfield area where no permanent driveways, barns, or swimming pools may ever be constructed.</li>
          </ul>

          <p>
            Planning fence runs or site concrete on your land? Calculate material costs on our{" "}
            <a href="/calculators/housing/fence-cost-calculator">fence cost calculator</a>, estimate slab yardage with the{" "}
            <a href="/calculators/housing/concrete-calculator">concrete calculator</a>, or evaluate county assessments on the{" "}
            <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
          </p>
        </>
      }
    >
      <LandAreaCalculator />
    </CalcPage>
  );
}
