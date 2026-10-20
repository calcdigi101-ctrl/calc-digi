import FlooringCalculator from "@/components/calcs/housing/flooring-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FlooringWastePatternChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/flooring-calculator";
const TITLE = "Flooring Calculator – Boxes, Sq Ft & Waste Buffer | CalcDigi";
const DESCRIPTION = "Free flooring calculator: calculate exactly how many boxes of luxury vinyl plank (LVP), hardwood, laminate, or tile you need with pattern waste allowances.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Flooring Calculator"
      intro="Calculate exact flooring square footage, required box counts, pattern waste allowances, underlayment rolls, and total material budget."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Total Boxes = Ceil([Length (ft) * Width (ft) * (1 + Waste %)] / Box Coverage)"
      related={[
        { href: "/calculators/housing/room-area-calculator", icon: "📐", name: "Room Area" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📏", name: "Square Footage" },
        { href: "/calculators/housing/paint-calculator", icon: "🎨", name: "Paint Calculator" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/concrete-calculator", icon: "🏗️", name: "Concrete Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How many boxes of flooring do I need to buy?",
          a: "Calculate the net room area (Length × Width in feet), add 10% to 15% for cutting waste and pattern matching, and divide by the square footage contained in one box. Always round up to the next whole box, because stores do not sell partial boxes.",
        },
        {
          q: "Why do I need extra flooring for waste?",
          a: "Every room has perimeter walls, door jams, closet corners, and transition thresholds that require trimming planks or tiles. When you cut the end of a board to finish a row, the off-cut piece is often too short to reuse elsewhere without compromising the staggered joint pattern.",
        },
        {
          q: "How much extra flooring should I order for herringbone or diagonal patterns?",
          a: "Standard straight horizontal or vertical plank layout requires 10% waste. Diagonal (45-degree) installations require 15% waste. Intricate herringbone, chevron, or basketweave layouts generate substantial angled triangle off-cuts, requiring a minimum 20% waste buffer.",
        },
        {
          q: "Do I need an underlayment for luxury vinyl plank (LVP)?",
          a: "Check whether your chosen LVP comes with an attached acoustic backing pad (such as IXPE or cork). If it already has an attached pad, manufacturer warranties strictly prohibit adding extra soft underlayment, as it can cause locking mechanism failure.",
        },
        {
          q: "What is acclimation and how long does it take?",
          a: "Acclimation allows flooring to reach moisture and temperature equilibrium with your home's indoor climate. Luxury vinyl plank requires 24 to 48 hours; engineered wood requires 48 to 72 hours; and solid hardwood requires 5 to 7 days before unboxing and nailing.",
        },
        {
          q: "What size expansion gap should I leave around the perimeter?",
          a: "For floating floors (LVP, laminate, engineered click-lock), leave a 1/4-inch to 3/8-inch (6–10 mm) gap along all perimeter walls, cabinets, and pipes. Baseboards and quarter-round shoe molding cover this expansion gap.",
        },
      ]}
      article={
        <>
          {/* Sleek Clinical/Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                FCIB &amp; NWFA Industry Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">National Wood Flooring Association &amp; TCNA Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Flooring Specialist Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Flooring Material and Boxes</h2>
          <p>
            Purchasing flooring materials requires translating square footage into <strong>cartons or boxes</strong>.
            Because manufacturers package flooring in standardized box bundles (typically 18 to 24 sq ft per box for planks,
            and 12 to 15 sq ft per box for ceramic tile), you must account for perimeter wall cuts and round up to whole cartons.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <FlooringWastePatternChart />

          <h2>Step-by-Step Flooring Formulas</h2>
          <Formula>
            Net Room Area (sq ft) = Length (ft) × Width (ft)
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: 16×20 ft Living Room with LVP</h2>

            <p>
              Suppose you are installing Luxury Vinyl Plank (LVP) flooring in a living room measuring <strong>16 feet wide by 20 feet long</strong>, with cartons containing <strong>24.0 sq ft per box</strong> and a 10% standard offset pattern buffer:
            </p>
            <ul>
              <li><strong>Step 1: Calculate Net Room Area</strong>: 16 ft × 20 ft = <strong>320.0 sq ft</strong>.</li>
              <li><strong>Step 2: Add 10% Staggered Pattern Waste</strong>: 320 sq ft × 0.10 = 32.0 sq ft of cut scrap.</li>
              <li><strong>Step 3: Total Required Coverage</strong>: 320.0 + 32.0 = <strong>352.0 sq ft</strong>.</li>
              <li><strong>Step 4: Calculate Boxes Needed</strong>: 352.0 sq ft ÷ 24.0 sq ft/box = 14.66 cartons.</li>
              <li><strong>Step 5: Round Up to Whole Cartons</strong>: Round up to <strong>15 whole boxes</strong>.</li>
              <li><strong>Step 6: Actual Material Purchased</strong>: 15 boxes × 24.0 sq ft = <strong>360.0 sq ft purchased</strong> (leaving 8.0 sq ft spare planks for future attic stock repairs).</li>
              <li><strong>Step 7: Material Budget</strong>: At $3.50/sq ft = <strong>$1,260.00 total material spend</strong>.</li>
            </ul>


            <h2>Common Costly Mistakes in Flooring Installation</h2>
            <p>Prevent buckling, hollow sounds, and voided manufacturer warranties by steering clear of these four errors:</p>
            <ul>
              <li><strong>Skipping Subfloor Moisture Testing:</strong> Installing hardwood or LVP over a moist concrete slab traps vapor, causing cupping, adhesive failure, and toxic mold growth. Always test concrete moisture emissions (calcium chloride test or relative humidity probe) and install a 6-mil poly vapor barrier.</li>
              <li><strong>Neglecting Perimeter Expansion Gaps:</strong> Floating floors expand and contract with seasonal humidity shifts. Failing to leave a 1/4" to 3/8" expansion gap around all baseboards, door frames, and transitions will cause the floor to buckle and peak in summer heat.</li>
              <li><strong>Failing to Acclimate Natural Hardwood:</strong> Solid and engineered hardwoods must sit flat inside the climate-controlled installation space for at least 72 hours (or until wood moisture is within 2% to 4% of subfloor moisture) prior to nailing.</li>
              <li><strong>Not Staggering End Joints Properly:</strong> Planks should be staggered with end joints separated by at least 6 to 8 inches in an alternating pattern. Grouping joints in an "H-pattern" or stair-step weakens the locking joints and looks amateurish.</li>
            </ul>


            <h2>Regional Humidity &amp; Subfloor Recommendations</h2>
            <p>
              Your local climate zone dictates the optimal flooring material choice and underlayment specifications:
            </p>
            <ul>
              <li><strong>High-Humidity Coastal &amp; Southern Regions:</strong> Luxury Vinyl Plank (SPC core) and porcelain tile are vastly superior to solid hardwood, as solid timber absorbs ambient atmospheric moisture and cups severely.</li>
              <li><strong>Dry Mountain &amp; Cold Northern Regions:</strong> During winter forced-air heating seasons, indoor relative humidity drops below 25%, causing solid oak planks to shrink and develop wide gaps between boards. Whole-home humidifiers are strongly advised.</li>
            </ul>
            <p>
              Verify room dimensions with our <a href="/calculators/housing/room-area-calculator">room area calculator</a>, plan wall paint with the <a href="/calculators/housing/paint-calculator">paint calculator</a>, and budget whole-home remodeling with the <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>.
            </p>
<Formula>
            Total Sq Ft with Waste = Net Area × (1 + Waste Factor)
          </Formula>
          <Formula>
            Boxes to Purchase = Ceil(Total Sq Ft with Waste ÷ Square Feet per Box)
          </Formula>
          <p>
            Example: A 16 ft × 12 ft living room (192 sq ft) using Luxury Vinyl Plank packaged in 20 sq ft cartons with 10% waste:
            <br />
            192 sq ft × 1.10 = <strong>211.2 sq ft</strong>.
            <br />
            211.2 ÷ 20 = 10.56 → <strong>11 whole boxes</strong> (220 sq ft total purchased).
          </p>

          <h2>Flooring Types: Cost, Durability &amp; Specifications</h2>
          <DataTable
            head={["Flooring Material", "Typical Lifespan", "Water Resistance", "Avg Material $/sq ft", "Avg Labor $/sq ft"]}
            rows={[
              ["Luxury Vinyl Plank (LVP / SPC)", "20 – 30 years", "100% Waterproof", "$2.50 – $5.50", "$2.00 – $3.50"],
              ["Engineered Hardwood", "30 – 50 years", "Moisture Resistant", "$4.50 – $10.00", "$3.50 – $7.00"],
              ["Solid Hardwood (Oak/Maple)", "70 – 100+ years", "Vulnerable to moisture", "$6.00 – $14.00", "$4.50 – $8.00"],
              ["Porcelain / Ceramic Tile", "50+ years", "100% Waterproof", "$3.00 – $8.00", "$5.00 – $12.00"],
              ["Laminate Flooring", "15 – 25 years", "Water resistant top only", "$1.80 – $4.00", "$1.75 – $3.00"],
            ]}
            highlight={0}
          />

          <h2>Essential Installation Checklist</h2>
          <ul>
            <li>
              <strong>Acclimation:</strong> Store boxes horizontally in the room where they will be installed for 48 hours
              under normal HVAC operating temperature (65°F to 75°F) and 35%–55% relative humidity.
            </li>
            <li>
              <strong>Subfloor Flatness:</strong> Ensure the subfloor is within 3/16 inch over 10 feet. High spots must be
              sanded; low spots require self-leveling underlayment compound.
            </li>
            <li>
              <strong>Stagger Joints:</strong> End joints between adjacent rows must be staggered by at least 6 to 8 inches
              to prevent stair-step patterns and structural joint weakness.
            </li>
          </ul>

          <h2>Subfloor Deflection Standards, Underlayment &amp; Acclimation Chemistry</h2>
          <p>
            Before opening cartons of flooring, the structural subfloor must satisfy rigid deflection criteria to prevent hollow clicking, seam separation, and adhesive sheer:
          </p>
          <ul>
            <li><strong>L/360 Deflection Standard (Ceramic &amp; Vinyl):</strong> Under standard residential live loads (40 lbs/sq ft), the subfloor framing joists must not deflect more than 1/360th of the span length (e.g., maximum 0.5 inches over a 15-foot span). Natural stone tiles require an even stricter L/720 deflection standard.</li>
            <li><strong>Subfloor Flatness Tolerances:</strong> Modern SPC rigid core luxury vinyl planks require subfloor flatness within 3/16 inch over a 10-foot radius (or 1/8 inch over 6 feet). High spots must be ground down with a diamond cup wheel, and low depressions filled with self-leveling cementitious underlayment.</li>
            <li><strong>Sound Transmission Class (STC) &amp; IIC Acoustic Mats:</strong> In multi-family condominiums and second-story residential bedrooms, building codes mandate high-density acoustic rubber or IXPE foam underlayments achieving minimum 50 STC and 50 IIC ratings to muffle footstep impact noise.</li>
          </ul>

          <h2>Expansion Gaps, Thermal Movement &amp; Radiant Heat Compatibility</h2>
          <p>
            Floating flooring products expand and contract with seasonal indoor temperature and relative humidity shifts:
          </p>
          <ul>
            <li><strong>Perimeter Expansion Clearance:</strong> Always maintain a continuous 1/4-inch to 3/8-inch expansion gap around the entire perimeter of the room, including around door jambs, cabinet bases, and heating pipes. Covering this gap with baseboards and quarter-round molding allows the floating floor to breathe without buckling.</li>
            <li><strong>Hydronic &amp; Electric Radiant Heating Integration:</strong> Luxury vinyl and engineered hardwoods can be installed over in-floor radiant heating systems, provided maximum floor surface temperatures do not exceed 85°F (29°C) and the heating elements are embedded in a minimum 1/2-inch self-leveling cementitious thermal mass.</li>
          </ul>

          <p>
            Budgeting other home remodel elements? Check room perimeter for baseboards with the{" "}
            <a href="/calculators/housing/room-area-calculator">room area calculator</a>, compute wall colors with the{" "}
            <a href="/calculators/housing/paint-calculator">paint calculator</a>, or evaluate full project budgets on our{" "}
            <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>.
          </p>
        </>
      }
    >
      <FlooringCalculator />
    </CalcPage>
  );
}
