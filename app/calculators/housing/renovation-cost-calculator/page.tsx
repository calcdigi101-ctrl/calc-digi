import RenovationCostCalculator from "@/components/calcs/housing/renovation-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RenovationRoiChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/renovation-cost-calculator";
const TITLE = "Renovation Cost Calculator – Home Remodel Estimator (2026) | CalcDigi";
const DESCRIPTION =
  "Free renovation cost calculator: estimate accurate budgets for kitchen remodels, bathroom renovations, basement finishes, and whole-home upgrades with labor, materials, and contingency reserves.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Renovation Cost Calculator"
      intro="Estimate realistic home remodeling budgets across kitchens, bathrooms, basements, and full houses with material and labor breakdowns."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Total Budget = (Square Footage * Cost Per Sq Ft) * (1 + Contingency %)"
      related={[
        { href: "/calculators/housing/home-equity-calculator", icon: "💰", name: "Home Equity" },
        { href: "/calculators/housing/flooring-calculator", icon: "🧱", name: "Flooring Calculator" },
        { href: "/calculators/housing/paint-calculator", icon: "🎨", name: "Paint Calculator" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📏", name: "Square Footage" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How much does a full home renovation cost per square foot?",
          a: "In 2026, whole-home interior renovations average $60 to $125 per square foot for basic updates, $125 to $225 per square foot for mid-range quality with reconfigured floor plans, and $250 to $450+ per square foot for luxury custom finishes with high-end mechanicals.",
        },
        {
          q: "What is the average cost to remodel a kitchen?",
          a: "A minor cosmetic kitchen refresh averages $12,000 to $25,000. A standard mid-range remodel (semi-custom cabinets, quartz countertops, new appliances, and tile backsplash) costs $30,000 to $65,000. A luxury gut renovation with structural wall removal and professional chef ranges ranges from $80,000 to $150,000+.",
        },
        {
          q: "Why should I include a 15% to 20% contingency fund in my remodel budget?",
          a: "Once demolition begins, concealed problems frequently emerge: outdated knob-and-tube electrical wiring, galvanized plumbing leaks, termite damage, uneven framing, or asbestos. A 15% contingency reserve ensures you can resolve unforeseen code violations without halting the build.",
        },
        {
          q: "Which home renovations offer the highest return on investment (ROI)?",
          a: "According to the annual Cost vs. Value Report, exterior replacements and minor kitchen refreshes yield the highest ROI. Garage door replacement (102% ROI), manufactured stone veneer (100% ROI), and minor kitchen remodels (85% ROI) recoup the highest percentage at resale.",
        },
        {
          q: "How should I finance a major $50,000+ renovation?",
          a: "Homeowners typically use a Home Equity Line of Credit (HELOC), Home Equity Loan, Cash-Out Refinance, or Fannie Mae HomeStyle Renovation loan. HELOCs offer revolving lines with interest-only draw periods, making them ideal for staged construction disbursements.",
        },
        {
          q: "Do I need permits for interior renovations?",
          a: "Cosmetic work like painting, replacing flooring, or swapping plumbing fixtures in existing locations usually does not require permits. However, opening walls, moving structural load-bearing studs, running new electrical circuits, or altering plumbing drains requires municipal building permits and inspections.",
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
                NAHB &amp; Cost vs Value Benchmark
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">National Association of Home Builders Remodeling Indexes</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Construction Economics Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Plan and Estimate a Home Remodeling Budget</h2>
          <p>
            Home renovations transform lifestyle comfort and build long-term home equity, but without structured financial
            discipline, unexpected scope creep and change orders can inflate costs by 30% to 50%. A successful remodel
            requires establishing an airtight budget broken into materials, trade labor, design fees, and an untouchable contingency reserve.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <RenovationRoiChart />

          <h2>Budget Allocation Rule of Thumb</h2>
          <Formula>
            Total Project Budget = Base Construction Estimate × (1 + Contingency Factor)
          </Formula>
          <ul>
            <li><strong>Materials &amp; Fixtures (40% – 50%):</strong> Cabinets, countertops, tile, flooring, appliances, lighting, and plumbing valves.</li>
            <li><strong>Skilled Trade Labor (35% – 45%):</strong> Licensed carpenters, electricians, plumbers, drywall tapers, and tile setters.</li>
            <li><strong>Permits &amp; Design (5% – 10%):</strong> Architectural blueprints, municipal permit fees, and dumpster/disposal fees.</li>
            <li><strong>Contingency Reserve (10% – 20%):</strong> Mandatory buffer for unforeseen subfloor rot, plumbing re-routing, or code upgrades.</li>
          </ul>

          <h2>Average Cost by Room Type &amp; Scope</h2>
          <DataTable
            head={["Renovation Project", "Average Square Footage", "Budget / Refresh Tier", "Mid-Range Quality", "Luxury Custom"]}
            rows={[
              ["Kitchen Remodel", "150 – 200 sq ft", "$15,000 – $28,000", "$32,000 – $65,000", "$80,000 – $150,000+"],
              ["Primary / Master Bathroom", "75 – 120 sq ft", "$10,000 – $18,000", "$22,000 – $40,000", "$45,000 – $90,000+"],
              ["Guest / Half Bathroom", "35 – 50 sq ft", "$5,000 – $9,000", "$10,000 – $18,000", "$20,000 – $35,000"],
              ["Basement Finishing", "600 – 1,000 sq ft", "$25,000 – $45,000", "$48,000 – $80,000", "$85,000 – $160,000"],
              ["Whole Home (2,000 sq ft)", "2,000 sq ft", "$60,000 – $120,000", "$140,000 – $250,000", "$300,000 – $600,000+"],
            ]}
            highlight={1}
          />

          <h2>Regional Remodeling Cost Variations</h2>
          <p>
            Labor rates for licensed union carpenters, plumbers, and electricians vary sharply across the country:
          </p>
          <DataTable
            head={["Geographic Region", "Labor Cost Multiplier", "Typical General Contractor Markup", "Permit Wait Time"]}
            rows={[
              ["Midwest (OH, IN, MI, MO)", "0.88 – 0.95 (Below National Avg)", "15% – 20%", "2 – 4 weeks"],
              ["Southeast (NC, GA, FL, TN)", "0.90 – 1.02 (At National Avg)", "15% – 20%", "2 – 5 weeks"],
              ["Northeast (NY, NJ, MA, PA)", "1.18 – 1.35 (High Metro Premium)", "20% – 25%", "6 – 12 weeks"],
              ["West Coast (CA, WA, OR)", "1.25 – 1.45 (Highest in Nation)", "20% – 28%", "8 – 16 weeks"],
              ["Mountain West (CO, UT, AZ)", "1.02 – 1.15 (Slightly Above Avg)", "18% – 22%", "3 – 6 weeks"],
            ]}
          />

          <h2>Essential Remodeling Commandments</h2>
          <ul>
            <li>
              <strong>Lock the Floor Plan:</strong> Moving plumbing stacks (toilets and main drains) or relocating gas lines
              instantly adds $2,500 to $6,000 to trade costs. Keeping fixture locations in place saves thousands.
            </li>
            <li>
              <strong>Order Long-Lead Materials Early:</strong> Custom cabinets and European tile require 8 to 14 weeks of lead
              time. Never begin demolition until all primary fixtures are physically sitting in your garage or staging warehouse.
            </li>
            <li>
              <strong>Itemize Change Orders:</strong> Require any contractor deviation or unforeseen fix to be signed in writing
              with exact labor and material costs before authorizing the crew to proceed.
            </li>
          </ul>
          <p>
            Planning your financing? Check your available borrowing equity with the{" "}
            <a href="/calculators/housing/home-equity-calculator">home equity calculator</a>, compare monthly terms on the{" "}
            <a href="/calculators/housing/refinance-calculator">refinance calculator</a>, or calculate surface finish quantities
            using our <a href="/calculators/housing/flooring-calculator">flooring calculator</a> and{" "}
            <a href="/calculators/housing/paint-calculator">paint calculator</a>.
          </p>
        </>
      }
    >
      <RenovationCostCalculator />
    </CalcPage>
  );
}
