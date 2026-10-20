import RoomAreaCalculator from "@/components/calcs/housing/room-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RoomSizeStandardsChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/room-area-calculator";
const TITLE = "Room Area Calculator – Floor, Wall and Ceiling | CalcDigi";
const DESCRIPTION = "Free room area calculator: calculate floor square footage, net paintable wall surface area, ceiling dimensions, and room perimeter with window deductions.";

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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">Architectural Graphic Standards & IRC Residential Specifications</strong>
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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <RoomSizeStandardsChart />

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

          <h2>HVAC Airflow Balancing, CFM Calculation &amp; Heat Loss Sizing</h2>
          <p>
            Room square footage and interior cubic volume directly determine heating, ventilation, and air conditioning equipment sizing:
          </p>
          <ul>
            <li><strong>Manual J Heating &amp; Cooling Load Calculations:</strong> Certified HVAC contractors use room surface areas, ceiling heights, window orientations, and insulation R-values to calculate BTU heating and cooling loads per room rather than relying on crude square-foot rules of thumb.</li>
            <li><strong>Airflow CFM Requirements:</strong> A standard rule of thumb allocates roughly 1 CFM (Cubic Feet per Minute) of conditioned air for every 1 to 1.25 sq ft of residential floor space, adjusted for sun exposure and exterior wall exposure.</li>
            <li><strong>Interior Door Undercut for Return Air:</strong> To maintain balanced room pressure when interior bedroom doors are closed, doors must have a 3/4-inch to 1-inch undercut above finished flooring to allow air to return freely to central HVAC return grilles.</li>
          </ul>

          <h2>Common Costly Measurement Mistakes in Room Sizing</h2>
          <p>Avoid these four common spatial calculation errors when ordering materials:</p>
          <ul>
            <li><strong>Omitting Closet &amp; Entryway Alcoves:</strong> Measuring only the main rectangular body of a room leaves out reach-in closets and doorway vestibules, leaving you short on flooring planks and underlayment.</li>
            <li><strong>Ignoring Sloped Ceilings &amp; Knee Walls:</strong> In attic bedrooms or bonus rooms with cathedral ceilings, wall surface calculations must use triangular and trapezoidal area formulas rather than simple height multiplication.</li>
            <li><strong>Confusing Wall Surface with Floor Footprint:</strong> Purchasing wall paint based on floor square footage is a frequent novice mistake—a 150 sq ft room typically has over 400 sq ft of vertical wall surface to cover.</li>
            <li><strong>Neglecting Architectural Waste Allowances:</strong> Diagonal flooring installations or herringbone tile patterns require 15% to 20% waste allowance due to excessive corner cuts, compared to 10% for straight layouts.</li>
          </ul>

          <h2>Architectural Illuminance &amp; Lighting Lux Standards</h2>
          <p>
            Proper interior lighting design uses room area to determine lumen requirements per Illuminating Engineering Society (IES) standards:
          </p>
          <ul>
            <li><strong>Living Rooms &amp; Bedrooms (150–200 Lux):</strong> Require 15 to 20 lumens per square foot for ambient relaxation. A 180 sq ft bedroom requires roughly 2,700 to 3,600 total lumens from all fixtures combined.</li>
            <li><strong>Kitchens &amp; Home Workspaces (300–500 Lux):</strong> Task-heavy zones require 30 to 50 lumens per square foot for clear visibility and food preparation safety.</li>
          </ul>


          <h2>IRC Minimum Room Dimension Enactments &amp; Egress Regulations</h2>
          <p>
            When adding a bedroom or converting a basement, residential building codes enforce strict spatial safety minimums:
          </p>
          <ul>
            <li><strong>IRC Section R304 Habitable Room Minimums:</strong> Every residential dwelling unit must have at least one habitable room of at least 120 square feet. Other habitable rooms (such as secondary bedrooms) must have a floor area of not less than 70 square feet, with no horizontal dimension less than 7 feet.</li>
            <li><strong>Ceiling Height Clearances (IRC R305):</strong> Habitable spaces, hallways, and bathrooms must have a minimum ceiling height of 7 feet 0 inches. In rooms with sloped ceilings (such as finished attics), at least 50% of the required floor area must have a 7-foot ceiling height, and floor space with ceiling height below 5 feet cannot count toward minimum room area.</li>
            <li><strong>Emergency Egress Openings (IRC R310):</strong> Every sleeping room must contain at least one operable emergency escape and rescue opening. The net clear opening must be at least 5.7 square feet (5.0 sq ft at ground floor), with a minimum height of 24 inches, minimum width of 20 inches, and sill height no higher than 44 inches above the floor.</li>
            <li><strong>Acoustic Reverberation (RT60):</strong> In home theaters and open-plan living rooms, larger room volumes increase acoustic flutter echo. For a 2,000 cu ft room, achieving an optimal 0.4 to 0.6 second reverberation time requires pairing hard flooring with high-density area rugs, perimeter acoustic foam panels, bass traps, and plush upholstered furnishings to eliminate slap-back flutter.</li>
          </ul>

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
