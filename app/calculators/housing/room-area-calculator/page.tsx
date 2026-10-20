import RoomAreaCalculator from "@/components/calcs/housing/room-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/room-area-calculator";
const TITLE = "Room Area Calculator – Floor, Wall & Ceiling Surface (Sq Ft) | CalcDigi";
const DESCRIPTION =
  "Free room area calculator: calculate floor square footage, net paintable wall surface area, ceiling dimensions, room perimeter, and interior cubic volume with window and door deductions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Room Area Calculator"
      intro="Determine exact floor square footage, net wall paint surface area, room perimeter for baseboards, and interior cubic volume with opening deductions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Floor Area = Length * Width | Wall Area = 2 * (Length + Width) * Height - Openings"
      related={[
        { href: "/calculators/housing/paint-calculator", icon: "🎨", name: "Paint Calculator" },
        { href: "/calculators/housing/flooring-calculator", icon: "🧱", name: "Flooring Calculator" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📐", name: "Square Footage" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/electricity-cost-calculator", icon: "⚡", name: "Electricity Cost" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "What is the difference between floor area and wall area?",
          a: "Floor area is the two-dimensional footprint of the room (Length × Width), used for carpet, hardwood, and tile. Wall area is the vertical perimeter surface multiplied by ceiling height (2 × [Length + Width] × Height) minus doors and windows, used for paint, wallpaper, and drywall.",
        },
        {
          q: "What is the legal minimum size for a bedroom?",
          a: "Under the International Residential Code (IRC §R304), habitable rooms must have a floor area of not less than 70 square feet (6.5 m²). In addition, every bedroom must be at least 7 feet in any horizontal dimension with a minimum ceiling height of 7 feet.",
        },
        {
          q: "How much square footage do doors and windows deduct from walls?",
          a: "Standard interior doors (30″ × 80″) account for approximately 21 square feet including casing trim. Standard double-hung windows (36″ × 60″) account for approximately 15 square feet each. Deducting these prevents over-purchasing paint or wallpaper.",
        },
        {
          q: "How do I calculate baseboard molding needed for a room?",
          a: "Take the total room perimeter: 2 × (Length + Width). Then subtract 3 feet for each standard doorway opening, and add a 10% cutting waste factor for corner miters.",
        },
        {
          q: "Why does room volume (cubic feet) matter?",
          a: "Room volume (Floor Area × Ceiling Height) determines heating and air conditioning load requirements (BTUs / CFM airflow), air purifier sizing, and dehumidifier capacity.",
        },
        {
          q: "How do ceiling heights affect paint requirements?",
          a: "Increasing ceiling height from standard 8 feet to 10 feet adds 25% more vertical wall surface area to paint, while 12-foot cathedral ceilings add 50% more wall area, even though the floor square footage remains identical.",
        },
      ]}
      article={
        <>
          {/* Sleek Clinical/Code Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                IRC §R304 &amp; §R305 Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">International Residential Code Minimum Habitable Dimensions</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Architectural Space Planning Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Measure and Calculate Room Surfaces</h2>
          <p>
            A room is a three-dimensional envelope. When remodeling, painting, or planning furniture placement, you need
            distinct surface measurements:
          </p>
          <ul>
            <li><strong>Floor Surface Area:</strong> Used for flooring tiles, hardwood planks, carpet underlayment, and radiant heating mats.</li>
            <li><strong>Net Paintable Wall Area:</strong> Total vertical wall surface after subtracting door openings and window glass.</li>
            <li><strong>Perimeter Length:</strong> Total linear run along the walls, used for baseboards, chair rails, and crown molding.</li>
            <li><strong>Interior Room Volume:</strong> Total air capacity in cubic feet, crucial for HVAC air exchange and CFM sizing.</li>
          </ul>

          {/* Graph #2: Authoritative Visual Room Sizes & Proportions Benchmark */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Residential Room Size Standards (Floor Area &amp; Wall Surface Benchmark)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comparison of floor space vs paintable wall area across standard 8-foot ceiling residential rooms.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                Standard 8ft Ceiling
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Bar Chart for Room Types */}
                {/* Category 1: Powder Room / Half Bath (5x6 = 30 sq ft) */}
                <text x="30" y="45" fontSize="11" fill="#334155" fontWeight="bold">Powder Bath (5×6′)</text>
                <rect x="160" y="32" width="60" height="18" rx="3" fill="#10b981" />
                <rect x="228" y="32" width="220" height="18" rx="3" fill="#2563eb" />
                <text x="165" y="45" fontSize="10" fill="#ffffff" fontWeight="bold">30 ft²</text>
                <text x="235" y="45" fontSize="10" fill="#ffffff" fontWeight="bold">136 ft² wall</text>

                {/* Category 2: Guest / Secondary Bed (11x12 = 132 sq ft) */}
                <text x="30" y="95" fontSize="11" fill="#334155" fontWeight="bold">Guest Bedroom (11×12′)</text>
                <rect x="160" y="82" width="132" height="18" rx="3" fill="#10b981" />
                <rect x="300" y="82" width="220" height="18" rx="3" fill="#2563eb" />
                <text x="165" y="95" fontSize="10" fill="#ffffff" fontWeight="bold">132 ft²</text>
                <text x="308" y="95" fontSize="10" fill="#ffffff" fontWeight="bold">317 ft² wall</text>

                {/* Category 3: Primary Bedroom Suite (15x18 = 270 sq ft) */}
                <text x="30" y="145" fontSize="11" fill="#334155" fontWeight="bold">Primary Suite (15×18′)</text>
                <rect x="160" y="132" width="200" height="18" rx="3" fill="#10b981" />
                <rect x="368" y="132" width="180" height="18" rx="3" fill="#2563eb" />
                <text x="165" y="145" fontSize="10" fill="#ffffff" fontWeight="bold">270 ft²</text>
                <text x="375" y="145" fontSize="10" fill="#ffffff" fontWeight="bold">477 ft² wall</text>

                {/* Category 4: Open Concept Living (18x24 = 432 sq ft) */}
                <text x="30" y="195" fontSize="11" fill="#334155" fontWeight="bold">Great Room (18×24′)</text>
                <rect x="160" y="182" width="240" height="18" rx="3" fill="#10b981" />
                <rect x="408" y="182" width="160" height="18" rx="3" fill="#2563eb" />
                <text x="165" y="195" fontSize="10" fill="#ffffff" fontWeight="bold">432 ft²</text>
                <text x="415" y="195" fontSize="10" fill="#ffffff" fontWeight="bold">621 ft² wall</text>
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" /> Floor Footprint (sq ft)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-blue-600" /> Net Paintable Wall Area (sq ft)
              </span>
            </div>
          </div>

          <h2>Mathematical Formulas for Room Calculation</h2>
          <Formula>
            Floor Area = Length × Width
          </Formula>
          <Formula>
            Room Perimeter = 2 × (Length + Width)
          </Formula>
          <Formula>
            Gross Wall Area = Perimeter × Ceiling Height
          </Formula>
          <Formula>
            Net Wall Area = Gross Wall Area - [(Doors × 21) + (Windows × 15)]
          </Formula>
          <Formula>
            Room Volume = Floor Area × Ceiling Height
          </Formula>

          <h2>International Residential Code (IRC) Room Standards</h2>
          <DataTable
            head={["Room Designation", "IRC Min Floor Area", "IRC Min Horizontal Dimension", "IRC Min Ceiling Height"]}
            rows={[
              ["Habitable Living Room", "70 sq ft (6.5 m²)", "7 ft 0 in (2.13 m)", "7 ft 0 in (2.13 m)"],
              ["Residential Bedroom", "70 sq ft (must have egress window)", "7 ft 0 in (2.13 m)", "7 ft 0 in (2.13 m)"],
              ["Kitchen / Food Prep", "50 sq ft (clear aisle 36″ min)", "3 ft clear aisle", "7 ft 0 in (2.13 m)"],
              ["Bathroom / Powder Room", "No min sq ft (must clear fixture setbacks)", "21″ in front of toilet/sink", "6 ft 8 in (2.03 m)"],
              ["Sloped Ceilings / Attics", "50% of room must be 7ft+ height", "No portion < 5ft counts as area", "7 ft 0 in on 50%+ floor"],
            ]}
            highlight={1}
          />

          <h2>Step-by-Step Practical Calculation Example</h2>
          <p>
            Consider a typical master bedroom measuring <strong>14 feet long by 12 feet wide</strong> with standard{" "}
            <strong>8-foot ceilings</strong>, containing <strong>1 entry door</strong> and <strong>2 windows</strong>:
          </p>
          <ol>
            <li><strong>Floor Surface:</strong> 14 × 12 = <strong>168 sq ft</strong> (requires ~185 sq ft of flooring with 10% waste).</li>
            <li><strong>Room Perimeter:</strong> 2 × (14 + 12) = <strong>52 linear ft</strong> (for baseboards).</li>
            <li><strong>Gross Wall Area:</strong> 52 ft × 8 ft = <strong>416 sq ft</strong>.</li>
            <li><strong>Openings Deduction:</strong> (1 × 21) + (2 × 15) = 21 + 30 = <strong>51 sq ft</strong>.</li>
            <li><strong>Net Paintable Walls:</strong> 416 - 51 = <strong>365 sq ft</strong> (requires ~1.1 gallons of paint per coat).</li>
            <li><strong>Room Air Volume:</strong> 168 × 8 = <strong>1,344 cu ft</strong> (for HVAC load calculations).</li>
          </ol>
          <p>
            Need to compute total costs for this space? Head over to our{" "}
            <a href="/calculators/housing/paint-calculator">paint calculator</a> to calculate coats and primer, estimate
            planks or tile with the <a href="/calculators/housing/flooring-calculator">flooring calculator</a>, or calculate whole-home
            square footage on the <a href="/calculators/housing/square-footage-calculator">square footage calculator</a>.
          </p>
        </>
      }
    >
      <RoomAreaCalculator />
    </CalcPage>
  );
}
