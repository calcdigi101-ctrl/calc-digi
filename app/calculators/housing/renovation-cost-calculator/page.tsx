import RenovationCostCalculator from "@/components/calcs/housing/renovation-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RenovationRoiChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/renovation-cost-calculator";
const TITLE = "Renovation Cost Calculator – Remodel Estimator | CalcDigi";
const DESCRIPTION = "Free renovation cost calculator: estimate accurate budgets for kitchen remodels, bathroom renovations, basement finishes, and whole-home upgrades with labor.";

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
          

          <h2>Step-by-Step Practical Calculation: Midrange Kitchen Remodel (200 Sq Ft)</h2>

            <p>
              Suppose you are renovating a <strong>200 sq ft residential kitchen</strong> at a standard midrange finish tier ($150 per sq ft) with a licensed general contractor and 15% contingency reserve:
            </p>
            <ul>
              <li><strong>Step 1: Base Construction &amp; Material Cost</strong>: 200 sq ft × $150/sq ft = <strong>$30,000 base budget</strong>.</li>
              <li><strong>Step 2: Labor &amp; General Contractor Allocation (~40%)</strong>: ~$12,000 for trade labor (demolition, electrical rough-in, plumbing, cabinet setting).</li>
              <li><strong>Step 3: Materials Allocation (~60%)</strong>: ~$18,000 for semi-custom cabinets, quartz countertops, tile backsplash, and appliance package.</li>
              <li><strong>Step 4: Unforeseen Contingency Reserve (15%)</strong>: $30,000 × 0.15 = <strong>$4,500 contingency buffer</strong>.</li>
              <li><strong>Step 5: Total Project Capital Required</strong>: $30,000 + $4,500 = <strong>$34,500 total project budget</strong>.</li>
            </ul>


            <h2>Common Costly Mistakes in Home Renovations</h2>
            <p>Avoid these four budget-busting remodel traps:</p>
            <ul>
              <li><strong>Skipping a 15% to 20% Contingency Buffer:</strong> Opening walls in homes built prior to 1990 routinely uncovers unpermitted wiring, plumbing leaks, rotted subfloors, or asbestos. A renovation budget without an untouchable 15% contingency reserve leads to halted construction.</li>
              <li><strong>Changing Scope or Materials Mid-Project:</strong> "Change orders" during active construction are the single largest source of contractor cost overruns and schedule delays. Finalize all fixture, tile, and layout decisions before demolition begins.</li>
              <li><strong>Over-Improving for Your Neighborhood:</strong> Spending $120,000 on an ultra-luxury kitchen in a neighborhood of $350,000 median homes rarely recoups costs at resale. Align finishes with prevailing neighborhood standards.</li>
              <li><strong>Hiring Unlicensed or Uninsured Contractors:</strong> Choosing the lowest bidder without verifying active general liability insurance and worker's compensation exposes homeowners to severe financial liability if a worker is injured on site.</li>
            </ul>


            <h2>Regional Resale Value Recovery (Cost vs. Value)</h2>
            <p>
              Remodeling return on investment varies by geographic market demand:
            </p>
            <ul>
              <li><strong>Pacific Coast &amp; Mountain West:</strong> Siding replacement, minor kitchen remodels, and accessory dwelling unit (ADU) conversions recoup between 85% and 105% of costs due to acute housing density demands.</li>
              <li><strong>Sunbelt &amp; Midwest:</strong> Exterior curb appeal upgrades (garage door replacements, steel entry doors) yield top ROI (over 100% recouped), while luxury upscale master bath suites average 50% to 65% recovery.</li>
            </ul>
            <p>
              Finance your remodel with our <a href="/calculators/housing/home-equity-calculator">home equity calculator</a>, calculate room wall surface areas with the <a href="/calculators/housing/room-area-calculator">room area calculator</a>, and estimate flooring with the <a href="/calculators/housing/flooring-calculator">flooring calculator</a>.
            </p>
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

          <h2>General Contractor Markup, Subcontractor Tiering &amp; AIA Contracts</h2>
          <p>
            Understanding how residential construction projects are structured prevents financial surprises and disputes:
          </p>
          <ul>
            <li><strong>General Contractor Overhead &amp; Profit (O&amp;P):</strong> Standard general contractor fee structures add 15% to 25% on top of hard trade costs (labor and materials). This fee covers project management, scheduling licensed subcontractors, job site safety, building inspections, and structural warranties.</li>
            <li><strong>AIA Documented Draw Schedules:</strong> Reputable contractors utilize standardized draw schedules tied to verified milestone completions (e.g., 10% deposit, 25% post-demolition and rough-ins, 25% post-drywall, 25% finish carpentry, and 15% final walkthrough sign-off). Never pay more than 10% to 15% upfront before materials arrive on site.</li>
            <li><strong>Building Permit Compliance &amp; Resale Disclosure:</strong> Major electrical, plumbing, HVAC, and load-bearing structural alterations legally require municipal permits. Unpermitted remodeling projects must be formally disclosed at resale and can void homeowner insurance coverage in the event of an electrical fire or plumbing flood.</li>
            <li><strong>Change Order Protocol:</strong> Every scope alteration, whether upgrading tile or relocating a light fixture, must be signed in writing as a formal change order with exact material and labor fees before authorizing crews to proceed.</li>
          </ul>


          <h2>Lien Waivers &amp; Mechanics Lien Protections</h2>
          <p>
            Homeowners must protect property title from subcontractor disputes during major remodeling projects:
          </p>
          <ul>
            <li><strong>Conditional vs Unconditional Lien Waivers:</strong> With every milestone draw payment, require your general contractor to provide executed unconditional lien waivers for all prior disbursements and conditional waivers for the current check from all major subcontractors and lumber supply yards.</li>
            <li><strong>Mechanics Lien Liability:</strong> Under state property statutes, if an unscrupulous general contractor takes your progress payment but defaults on paying trade suppliers or drywall crews, those subcontractors can legally record a mechanics lien against your real estate title—forcing you into costly court arbitration or double payment to clear title.</li>
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
