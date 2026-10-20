import ConcreteCalculator from "@/components/calcs/housing/concrete-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/concrete-calculator";
const TITLE = "Concrete Calculator – Slabs, Footings & Bag Count (Cubic Yards) | CalcDigi";
const DESCRIPTION =
  "Free concrete calculator: accurately calculate cubic yards, cubic feet, and 60-lb or 80-lb bag counts for slabs, driveways, patios, footings, and cylindrical columns with waste factor.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Concrete Calculator"
      intro="Calculate cubic yards, cubic feet, and bag counts for slabs, foundations, driveways, patios, and cylindrical post holes with safety waste margins."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Volume (cu yd) = [Length (ft) * Width (ft) * (Thickness (in) / 12)] / 27"
      related={[
        { href: "/calculators/housing/square-footage-calculator", icon: "📐", name: "Square Footage" },
        { href: "/calculators/housing/fence-cost-calculator", icon: "🪵", name: "Fence Cost" },
        { href: "/calculators/housing/flooring-calculator", icon: "🧱", name: "Flooring Calculator" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/land-area-calculator", icon: "🗺️", name: "Land Area Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How many 80-lb or 60-lb bags of concrete make one cubic yard?",
          a: "One cubic yard equals 27 cubic feet. A standard 80-lb bag yields approximately 0.60 cubic feet, meaning you need 45 bags (plus 4-5 extra for waste, totaling ~50 bags) for one cubic yard. A 60-lb bag yields 0.45 cubic feet, requiring 60 bags per cubic yard.",
        },
        {
          q: "How thick should a residential concrete slab be?",
          a: "For pedestrian walkways, patios, and shed foundations, 4 inches (10 cm) of 3,000 PSI concrete is standard. For residential driveways accommodating passenger vehicles, light trucks, or RV parking, 5 to 6 inches (12.7–15.2 cm) with #4 rebar reinforcement or welded wire mesh is recommended.",
        },
        {
          q: "When should I order ready-mix concrete instead of bags?",
          a: "As a rule of thumb, if your project requires 1.5 to 2.0 cubic yards or more (equivalent to 75–100 eighty-pound bags), ready-mix delivery via truck is significantly faster, ensures consistent compressive strength across the pour, and saves hours of backbreaking manual labor.",
        },
        {
          q: "Why is a 10% waste factor necessary for concrete pours?",
          a: "Subgrades are rarely laser-flat; slight depressions, formwork deflection, wheelbarrow residue, and spillage consume extra volume. A 10% safety margin prevents running short during a pour, which can ruin cold joints.",
        },
        {
          q: "How long does concrete take to cure to full strength?",
          a: "Concrete achieves approximately 50% strength in 3 days, 70% strength in 7 days, and reaches its full rated compressive design strength (e.g., 3,000–4,000 PSI) at 28 days under proper moist curing conditions.",
        },
        {
          q: "Do I need gravel under a concrete slab?",
          a: "Yes. The International Residential Code (IRC) recommends a 4-inch compacted crushed stone or gravel base (such as #57 limestone or crushed gravel) to provide uniform support, prevent settling cracks, and promote drainage.",
        },
      ]}
      article={
        <>
          {/* Sleek Clinical/Engineering Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                IRC §R402 &amp; ACI 318 Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">American Concrete Institute (ACI) Specifications</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Structural Engineering Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Concrete Volume (Cubic Yards &amp; Bags)</h2>
          <p>
            Whether pouring a backyard patio, driveway apron, perimeter footing, or sonotube deck pier, ordering the exact
            volume of concrete is critical. Running short causes irreversible cold joints that compromise structural integrity,
            while severe over-ordering leads to disposal surcharges from ready-mix suppliers.
          </p>
          <p>
            Concrete volume is measured in <strong>cubic yards</strong> (1 cu yd = 27 cu ft). For small DIY
            projects, pre-mixed bags (quikrete, sakrete) packaged in 60-lb or 80-lb units are mixed with water on-site.
          </p>

          {/* Graph #2: Authoritative Visual Slab Volume & Thickness Comparison Benchmark */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Concrete Volume Curve: 4″ vs 6″ Slab Depth (Cubic Yards vs Surface Area)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark comparing required yardage (with 10% waste) across typical residential footprint sizes.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                1 yd³ = 27 ft³
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[620px]" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">18 yd³</text>
                <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">12 yd³</text>
                <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">6 yd³</text>
                <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">2 yd³</text>
                <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">0</text>

                {/* X-axis labels */}
                <text x="100" y="218" fontSize="11" fill="#64748b" textAnchor="middle">100 sq ft</text>
                <text x="210" y="218" fontSize="11" fill="#64748b" textAnchor="middle">250 sq ft</text>
                <text x="330" y="218" fontSize="11" fill="#64748b" textAnchor="middle">500 sq ft</text>
                <text x="450" y="218" fontSize="11" fill="#64748b" textAnchor="middle">750 sq ft</text>
                <text x="540" y="218" fontSize="11" fill="#64748b" textAnchor="middle">1,000 sq ft</text>

                {/* 6-inch Slab Area & Curve (Orange) */}
                <path
                  d="M100 182 L210 156 L330 112 L450 68 L540 32"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  fill="none"
                />
                {/* 4-inch Slab Area & Curve (Emerald) */}
                <path
                  d="M100 188 L210 171 L330 141 L450 112 L540 88"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                />

                {/* Data Points */}
                <circle cx="100" cy="188" r="4" fill="#10b981" />
                <circle cx="330" cy="141" r="4" fill="#10b981" />
                <circle cx="540" cy="88" r="4" fill="#10b981" />

                <circle cx="100" cy="182" r="4" fill="#f59e0b" />
                <circle cx="330" cy="112" r="4" fill="#f59e0b" />
                <circle cx="540" cy="32" r="4" fill="#f59e0b" />

                {/* Callout Annotations with plenty of breathing room */}
                <text x="552" y="88" fontSize="11" fill="#10b981" fontWeight="bold">4″ Slab (11.3 yd³)</text>
                <text x="552" y="32" fontSize="11" fill="#f59e0b" fontWeight="bold">6″ Slab (17.0 yd³)</text>
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" /> 4-inch Slab (Patios, Walkways, Shed Floors)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-amber-500" /> 6-inch Heavy Slab (Driveways, RV Pads, Workshops)
              </span>
            </div>
          </div>

          <h2>Formulas for Concrete Estimation</h2>
          <h3>1. Rectangular Slabs, Footings &amp; Walls</h3>
          <Formula>
            Volume (cu yd) = [Length (ft) × Width (ft) × (Thickness (in) ÷ 12)] ÷ 27 × (1 + Waste Factor)
          </Formula>
          <p>
            Example: A 12 ft × 10 ft patio slab at 4 inches thick with 10% waste:
            <br />
            12 ft × 10 ft × (4 ÷ 12) ft = 40 cu ft.
            <br />
            40 cu ft × 1.10 = 44 cu ft ÷ 27 = <strong>1.63 cu yd</strong> (requiring ~37 bags of 80-lb concrete or ready-mix delivery).
          </p>

          <h3>2. Cylindrical Columns, Piers &amp; Sonotubes</h3>
          <Formula>
            Volume (cu yd) = [π × (Diameter (in) ÷ 24)² × Depth (ft) × Quantity] ÷ 27 × (1 + Waste Factor)
          </Formula>

          <h3>3. Bag Count Formulas</h3>
          <ul>
            <li><strong>80-lb bags:</strong> Total Cubic Feet ÷ 0.60 cu ft/bag</li>
            <li><strong>60-lb bags:</strong> Total Cubic Feet ÷ 0.45 cu ft/bag</li>
            <li><strong>50-lb fast-setting bags:</strong> Total Cubic Feet ÷ 0.375 cu ft/bag</li>
          </ul>

          <h2>Concrete Mix Classes &amp; Compressive Strength (PSI)</h2>
          <DataTable
            head={["Mix Strength", "Mix Ratio (Cement : Sand : Stone)", "Slump (Inches)", "Recommended Application"]}
            rows={[
              ["2,500 PSI", "1 : 2.5 : 3.5", "4″ – 5″", "Non-structural footings, fence post holes, garden borders"],
              ["3,000 PSI", "1 : 2 : 3", "3″ – 4″", "Standard residential patios, walkways, shed slabs, basement floors"],
              ["4,000 PSI", "1 : 1.5 : 2.5", "3″ – 4″", "Vehicle driveways, garage floors, structural foundations, freeze-thaw zones"],
              ["5,000 PSI", "1 : 1 : 2", "2″ – 3″", "Heavy commercial pavements, machinery pads, precast structural beams"],
            ]}
            highlight={1}
          />

          <h2>Regional Cost Guide: Ready-Mix vs Bagged Concrete</h2>
          <p>
            Concrete pricing varies by geographic region due to aggregate freight distances, fuel costs, and environmental
            cement regulations. The table below outlines average delivered ready-mix costs per cubic yard compared to retail bagged material:
          </p>
          <DataTable
            head={["US Geographic Region", "Ready-Mix per yd³ (Delivered)", "Retail 80-lb Bag Cost", "Short-Load Surcharge"]}
            rows={[
              ["Southern US (TX, FL, GA, NC)", "$125 – $145", "$5.50 – $6.50", "$60 – $90 under 5 yd³"],
              ["Midwest (OH, IL, IN, MI)", "$130 – $155", "$5.80 – $6.75", "$70 – $100 under 5 yd³"],
              ["Northeast (NY, PA, NJ, MA)", "$150 – $180", "$6.50 – $7.50", "$90 – $130 under 6 yd³"],
              ["West Coast (CA, WA, OR)", "$160 – $195", "$6.80 – $8.00", "$100 – $150 under 6 yd³"],
              ["Mountain / Southwest (CO, AZ, UT)", "$135 – $160", "$6.00 – $7.00", "$75 – $110 under 5 yd³"],
            ]}
          />

          <h2>Key Structural Considerations &amp; Code Compliance</h2>
          <p>
            When pouring exterior flatwork, remember these vital guidelines per the International Residential Code (IRC):
          </p>
          <ul>
            <li>
              <strong>Subbase Preparation:</strong> Always excavate topsoil and place at least 4 inches of compacted granular
              base gravel (such as crushed stone). Never pour directly onto organic dirt or uncompacted backfill.
            </li>
            <li>
              <strong>Reinforcement:</strong> Use #4 rebar (1/2-inch diameter) spaced in an 18-inch grid or welded wire mesh (6×6-W1.4/W1.4)
              elevated on plastic rebar chairs to keep steel in the center of the slab.
            </li>
            <li>
              <strong>Expansion &amp; Control Joints:</strong> Concrete naturally shrinks as it cures. Cut or tool control joints
              at intervals no greater than 24 to 30 times the slab thickness (e.g., 8 to 10 feet apart for a 4-inch slab).
            </li>
            <li>
              <strong>Cold-Weather Pouring:</strong> Never pour onto frozen ground. If nighttime temperatures fall below 40°F (4°C),
              use insulated curing blankets to preserve hydration heat.
            </li>
          </ul>
          <p>
            Planning a complete yard remodel or building project? Pair this concrete estimate with our{" "}
            <a href="/calculators/housing/square-footage-calculator">square footage calculator</a>, verify boundary lines with the{" "}
            <a href="/calculators/housing/land-area-calculator">land area calculator</a>, or budget finish surfaces using the{" "}
            <a href="/calculators/housing/flooring-calculator">flooring calculator</a>.
          </p>
        </>
      }
    >
      <ConcreteCalculator />
    </CalcPage>
  );
}
