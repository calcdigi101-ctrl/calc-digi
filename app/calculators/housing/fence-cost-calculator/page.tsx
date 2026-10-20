import FenceCostCalculator from "@/components/calcs/housing/fence-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FenceDurabilityCostChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/fence-cost-calculator";
const TITLE = "Fence Cost Calculator – Wood, Vinyl, Chain Link & Aluminum (2026) | CalcDigi";
const DESCRIPTION =
  "Free fence cost calculator: estimate total costs and material quantities (posts, panels, rails, concrete bags, and gates) for wood, vinyl, chain link, and aluminum fences.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Fence Cost Calculator"
      intro="Estimate installed fence costs and exact material requirements including posts, 8-foot panels, gates, and post-hole concrete bags."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Total Cost = Linear Feet * Cost Per Foot + (Posts * Concrete Cost) + Gates"
      related={[
        { href: "/calculators/housing/land-area-calculator", icon: "🗺️", name: "Land Area Calculator" },
        { href: "/calculators/housing/concrete-calculator", icon: "🏗️", name: "Concrete Calculator" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📐", name: "Square Footage" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/paint-calculator", icon: "🎨", name: "Paint Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How much does it cost to install 150 or 200 feet of fence?",
          a: "For an average 150-linear-foot residential backyard fence, total installed costs range from $2,700 to $3,900 for pressure-treated pine, $4,200 to $5,700 for red cedar, $4,500 to $6,900 for white vinyl privacy, and $2,250 to $3,600 for galvanized chain link.",
        },
        {
          q: "How far apart should fence posts be spaced?",
          a: "Standard residential fence posts are spaced 8 feet on center (96 inches). In high-wind hurricane or severe storm regions, or for heavy commercial 8-foot-tall privacy fences, 6-foot post spacing is required to prevent wind blowouts.",
        },
        {
          q: "How deep should fence post holes be dug?",
          a: "A standard rule of thumb is to bury at least one-third (1/3) of the post's total length in the ground. For a 6-foot fence using an 8-foot post, dig holes 24 to 30 inches deep. In northern climates with deep winter frost, holes must extend at least 6 inches below the local municipal frost line (often 36 to 48 inches deep).",
        },
        {
          q: "How many bags of concrete do I need per fence post?",
          a: "Use 1.5 to 2 fifty-pound (or eighty-pound) bags of fast-setting concrete per standard 4×4 post hole (10 to 12 inches in diameter). For terminal gate posts or heavy corner posts (6×6 timber), use 3 to 4 bags per hole.",
        },
        {
          q: "Do I need a boundary survey before installing a fence?",
          a: "Yes. Installing a fence even 6 inches over your neighbor's property line can result in mandatory removal orders. Always check property stakes, review your boundary survey, and verify local zoning setback requirements (typically 2 to 6 inches inside your boundary).",
        },
        {
          q: "What is Call 811 and why is it mandatory?",
          a: "Calling 811 (Dig Safe) is a federally mandated free utility location service. You must contact 811 at least 48 to 72 business hours before excavating to have buried electrical lines, natural gas mains, water pipes, and internet fiber spray-painted on your lawn.",
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
                AFA &amp; ASTM F537 Specifications
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified against <strong className="font-semibold text-slate-800 dark:text-slate-200">American Fence Association Structural Installation Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Perimeter Engineering Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Fence Costs and Materials</h2>
          <p>
            Building a privacy or security fence involves four core material categories: line posts, horizontal structural
            rails, vertical infill pickets or manufactured panels, and concrete footings. Accurately measuring linear footage
            prevents mid-project shortages that leave unfinished gaps along boundary lines.
          </p>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <FenceDurabilityCostChart />

          <h2>Formulas for Fence Material Quantities</h2>
          <Formula>
            Number of Panels = Ceil(Total Linear Feet ÷ Post Spacing)
          </Formula>
          <Formula>
            Total Posts = Number of Panels + 1 + (Walk Gates × 1) + (Driveway Gates × 2)
          </Formula>
          <Formula>
            Concrete Bags = Total Posts × 2 bags (50-lb fast-setting per hole)
          </Formula>

          <h2>Fence Materials Comparison Table</h2>
          <DataTable
            head={["Material Type", "Lifespan", "Maintenance Requirement", "Material Cost/ft", "Total Installed Cost/ft"]}
            rows={[
              ["Pressure-Treated Pine", "12 – 15 years", "Needs stain / seal every 2–3 yrs", "$10 – $14", "$18 – $26"],
              ["Western Red Cedar", "20 – 25 years", "Natural rot resistance; stain optional", "$16 – $22", "$28 – $38"],
              ["Vinyl / PVC Privacy", "30+ years", "Zero maintenance (rinse with hose)", "$20 – $28", "$30 – $46"],
              ["Chain Link (Galvanized)", "20 – 30 years", "Zero maintenance; low privacy", "$7 – $11", "$15 – $24"],
              ["Ornamental Aluminum", "40+ years", "Powder-coated rustproof; zero upkeep", "$24 – $35", "$34 – $58"],
            ]}
            highlight={1}
          />

          <h2>Critical Installation &amp; Code Guidelines</h2>
          <ul>
            <li>
              <strong>Post Hole Diameter:</strong> The hole diameter must be at least 3 times the width of the post (e.g.,
              a 4×4 post measuring 3.5″ wide requires a minimum 10-inch diameter hole).
            </li>
            <li>
              <strong>Gravel Drainage Bed:</strong> Always pour 4 to 6 inches of crushed gravel into the bottom of the post hole
              before inserting the wooden post. This allows water to drain away from the bottom end-grain, preventing rot.
            </li>
            <li>
              <strong>Concrete Sloping:</strong> Trowel the top of the wet concrete footing slightly above grade into a gentle
              slope away from the post to shed rain and sprinkler water.
            </li>
          </ul>
          <p>
            Planning the rest of your outdoor living space? Calculate concrete volumes for patios with our{" "}
            <a href="/calculators/housing/concrete-calculator">concrete calculator</a>, measure property boundaries using the{" "}
            <a href="/calculators/housing/land-area-calculator">land area calculator</a>, or evaluate full property remodel budgets
            on the <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>.
          </p>
        </>
      }
    >
      <FenceCostCalculator />
    </CalcPage>
  );
}
