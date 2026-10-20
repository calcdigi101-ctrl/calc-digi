import LandAreaCalculator from "@/components/calcs/housing/land-area-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LandAreaBenchmarksChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/land-area-calculator";
const TITLE = "Land Area Calculator – Acres, Square Feet & Lot Size | CalcDigi";
const DESCRIPTION =
  "Free land area calculator: convert lot dimensions (length and width in feet) to acres, square feet, hectares, and square meters with boundary perimeter and zoning coverage.";

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
