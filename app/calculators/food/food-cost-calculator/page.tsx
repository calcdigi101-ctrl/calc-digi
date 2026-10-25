import type { Metadata } from "next";
import Link from "next/link";
import FoodCostCalculatorComponent from "@/components/calcs/food/food-cost-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RestaurantFoodCostMarginWaterfallChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/food-cost-calculator";
const TITLE = "Food Cost Calculator | Recipe Portion Cost, Menu Pricing & Margins";
const DESCRIPTION =
  "Calculate commercial recipe portion cost, target food cost percentages, gross contribution margins, prime costs, and retail menu pricing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-time-calculator", icon: "⏱️", name: "Cooking Time" },
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
];

export default function FoodCostCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/food", label: "Food & Cooking" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Hospitality Accounting Summary: Target Food Cost & Prime Cost Formula
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              In commercial foodservice operations, the target food cost percentage typically ranges between 28% and 35% of menu price. Prime cost—the combination of ingredient cost of goods sold (COGS) and culinary labor—should never exceed 60% to 65% for viable profitability. You can scale catering quantities with our{" "}
              <Link href="/calculators/food/recipe-scaler" className="font-medium underline hover:text-amber-900">
                recipe scaler
              </Link>{" "}
              and evaluate server gratuity distribution in the{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium underline hover:text-amber-900">
                tip calculator
              </Link>.
            </p>
          </div>

          <h2>Hospitality Unit Economics & Contribution Margin Waterfall</h2>
          <RestaurantFoodCostMarginWaterfallChart />
          <p>
            Culinary financial engineering is built upon cost-volume-profit (CVP) analysis and portion-level accounting. Every dollar of gross restaurant revenue must absorb food inventory expenditures, culinary preparation wages, front-of-house service labor, commercial kitchen occupancy overhead, utility gas/electricity, and credit card processing charges before yielding net operating profit.
          </p>
          <p>
            Because food commodities are perishable and subject to trimming waste (the difference between As-Purchased [AP] and Edible Portion [EP] weight), precision costing requires standardizing ingredient unit prices in grams and milliliters using our{" "}
            <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking conversion calculator
            </Link>:
          </p>

          <Formula>
            {"\text{Food Cost Per Portion} = \frac{\sum (\text{Ingredient AP Price} \times \text{Quantity Used})}{\text{Total Servings Yielded}}"}
          </Formula>

          <Formula>
            {"\text{Suggested Menu Price} = \frac{\text{Food Cost Per Portion}}{\text{Target Food Cost \% / 100}}"}
          </Formula>

          <Formula>
            {"\text{Gross Contribution Margin} = \text{Menu Price} - \text{Food Cost Per Portion}"}
          </Formula>

          <Formula>
            {"\text{Prime Cost} = \text{Food Cost} + \text{Direct Labor Cost} \quad (\text{Benchmark: } \le 60\%\text{ of Revenue})"}
          </Formula>

          <h2>Commercial Foodservice Segment Food Cost & Margin Benchmarks</h2>
          <p>
            Target food cost percentages vary significantly across culinary operating models due to varying labor intensities, seating velocity, and inventory perishability:
          </p>

          <DataTable
            head={[
              "Operating Segment",
              "Target Food Cost %",
              "Labor Burden %",
              "Prime Cost %",
              "Gross Margin %",
              "Average Net Profit %",
            ]}
            rows={[
              ["Fast-Casual / Quick Service (QSR)", "28.0%", "30.0%", "58.0%", "72.0%", "14.0% - 18.0%"],
              ["Casual Dining & Brewpubs", "32.0%", "34.0%", "66.0%", "68.0%", "8.0% - 12.0%"],
              ["Fine Dining & Tasting Menus", "36.0%", "40.0%", "76.0%", "64.0%", "5.0% - 9.0%"],
              ["Artisan Pizzeria & Pasta Bars", "22.0%", "32.0%", "54.0%", "78.0%", "15.0% - 22.0%"],
              ["Specialty Coffee & Espresso Bars", "18.0%", "38.0%", "56.0%", "82.0%", "16.0% - 24.0%"],
              ["Commercial Catering & Events", "26.0%", "28.0%", "54.0%", "74.0%", "18.0% - 25.0%"],
              ["Hospitality Bakery & Patisserie", "20.0%", "42.0%", "62.0%", "80.0%", "10.0% - 16.0%"],
            ]}
          />

          <h2>Worked Financial Scenario: Menu Pricing a Pan-Seared Salmon Entree</h2>
          <p>
            Consider an executive chef developing an 8-portion pan-seared Atlantic salmon entree served with garlic mashed potatoes, roasted asparagus, and lemon-dill buerre blanc. To balance kitchen production with roasting durations in our{" "}
            <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking time calculator
            </Link>{" "}
            and baking components via the{" "}
            <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              baking substitution calculator
            </Link>, we calculate batch costs, plate costs, and menu pricing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Fresh Salmon Fillet (AP):</strong> 3.0 lbs pin-boned salmon at $11.50/lb = $34.50. Yield after portioning = 8 six-ounce portions ($4.31/plate).
            </li>
            <li>
              <strong>Starch & Vegetable Accompaniments:</strong> 2.5 lbs russet potatoes ($2.00), 1 lb fresh asparagus ($3.50), heavy cream and whole butter ($2.80) = $8.30 total ($1.04/plate).
            </li>
            <li>
              <strong>Sauce, Seasoning & Garnish:</strong> White wine, fresh dill, lemon, shallots, and kosher salt = $3.20 total ($0.40/plate).
            </li>
            <li>
              <strong>Total Batch Ingredient Cost:</strong> $34.50 + $8.30 + $3.20 = $46.00 total batch cost.
              <Formula>
                {"\text{Food Cost Per Portion} = \frac{\$46.00}{8} = \$5.75\,\text{per serving}"}
              </Formula>
            </li>
            <li>
              <strong>Retail Menu Pricing at 28% Food Cost:</strong>
              <Formula>
                {"\text{Menu Price} = \frac{\$5.75}{0.28} = \$20.54 \longrightarrow \text{Menu Price Point: } \$21.00"}
              </Formula>
            </li>
            <li>
              <strong>Contribution Margin Analysis:</strong> At $21.00 menu price, gross contribution margin = $21.00 - $5.75 = $15.25 per plate to cover labor, lease, and profit.
            </li>
            <li>
              <strong>Nutritional & Caloric Density:</strong> The culinary team documents protein and lipid macros using our{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                nutrition calculator
              </Link>{" "}
              and physical staff stamina in the{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>.
            </li>
          </ul>

          <h2>The Menu Engineering Matrix: Stars, Plowhorses, Puzzles & Dogs</h2>
          <p>
            Modern hospitality operators combine food costing with the Boston Consulting Group menu engineering framework developed by Kasavana and Smith. Menu items are categorized across two orthogonal dimensions: popularity (sales volume share) and profitability (gross contribution margin):
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Stars (High Margin, High Popularity):</strong> The core profit drivers of the restaurant. Maintain strict recipe consistency and prominent visual placement on the menu.
            </li>
            <li>
              <strong>Plowhorses (Low Margin, High Popularity):</strong> Fan favorites that generate substantial cash flow but exhibit high ingredient cost. Re-engineer portion sizes or subtly increase menu pricing.
            </li>
            <li>
              <strong>Puzzles (High Margin, Low Popularity):</strong> Highly profitable items that struggle to sell. Retrain service staff to highlight these dishes, or reposition them on the guest check.
            </li>
            <li>
              <strong>Dogs (Low Margin, Low Popularity):</strong> Unprofitable, slow-moving inventory items. Eliminate them from the menu to reduce culinary waste.
            </li>
          </ul>

          <h2>Inventory Shrinkage, Theoretical vs Actual COGS & Waste Ledger Protocols</h2>
          <p>
            In commercial hospitality accounting, a critical variance exists between theoretical food cost (what the recipe cards mathematically dictate should have been spent based on register sales volume) and actual Cost of Goods Sold (derived from periodic physical storeroom inventory audits). Actual COGS is calculated using the standard inventory equation: Beginning Inventory + Purchases - Ending Inventory = Actual COGS.
          </p>
          <p>
            The difference between actual and theoretical food cost represents operational inventory variance or &quot;shrink.&quot; Common drivers of excessive variance include unrecorded kitchen prep scrap, line burn, employee shift meals, over-portioning, spillage, and storeroom theft. In well-controlled commercial restaurants, inventory variance is rigorously constrained to within 1.0% to 2.0% of gross food sales. Implementing mandatory digital waste logs where culinary staff record every dropped, burned, or expired ingredient transforms invisible margin erosion into actionable management intelligence.
          </p>
          <p>
            Furthermore, butcher yield tests must be performed periodically on whole primal cuts. When kitchen staff break down a whole beef strip loin or fresh salmon, documenting the precise weight of usable center-cut steaks, stew meat trim, fat cap trimmings, and rendering bones allows the chef to allocate cost across multiple menu categories rather than burdening the primary center-of-plate entree with the entire invoice wholesale cost.
          </p>
          

          <h2>Operational Pitfalls in Culinary Inventory & Portion Drift</h2>
          <p>
            Food cost percentages frequently inflate due to subtle operational failures:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Portion Creep:</strong> A line cook over-portioning protein by just 0.5 oz on a $12/lb steak inflates food cost by $0.38 per dish, eroding thousands of dollars in annual net profit.
            </li>
            <li>
              <strong>Ignoring Yield Factors (AP vs EP):</strong> Purchasing 10 lbs of raw whole onions yields only 8.8 lbs of peeled diced product (88% yield). Costing recipes on AP weight underestimates true portion cost.
            </li>
            <li>
              <strong>Beverage Program Integration:</strong> Beverage and alcohol margins (typically running 15% to 20% beverage cost) offset higher kitchen food costs, with beverage volumes tracked in our{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>{" "}
              and specialty coffee margins modeled in the{" "}
              <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                coffee caffeine calculator
              </Link>.
            </li>
            <li>
              <strong>Gratuity & Front-of-House Labor:</strong> Front-of-house service staff rely on customer tips calculated in our{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>, directly influencing dining room retention and operational harmony.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is an ideal food cost percentage for a full-service restaurant?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                For a standard full-service restaurant, the target food cost percentage typically sits between 28% and 35%. Lower-cost concepts like pizzerias often operate at 20% to 25%, while high-end steakhouses and seafood restaurants can operate profitably at 35% to 38% due to high dollar contribution margins.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between food cost percentage and gross contribution margin?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Food cost percentage measures ingredient cost relative to selling price (Cost / Price). Contribution margin measures the actual cash dollars remaining after deducting food cost (Price - Cost). High contribution dollars pay the rent, not percentages alone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What does prime cost represent in hospitality operations?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Prime cost is the sum of total Cost of Goods Sold (food and beverage inventory) plus total labor (culinary, service, management, taxes, and benefits). Prime cost should remain at or below 60% of total revenue in full-service operations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does scaling recipe batches impact unit portion cost?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                When scaling production using our{" "}
                <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  recipe scaler
                </Link>, bulk commercial purchasing reduces unit ingredient costs, improving net dish margins by 3% to 8%.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why must kitchen staff account for As-Purchased vs Edible Portion weight?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Produce, meats, and seafood lose mass during peeling, trimming, and butchery. If an ingredient costs $10/lb and yields 80% usable product, the true Edible Portion cost is $10 / 0.80 = $12.50 per pound.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do guest check tips relate to overall restaurant operational health?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Gratuities calculated in our{" "}
                <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  tip calculator
                </Link>{" "}
                provide the primary compensation for dining room staff. High guest tips reflect service excellence, correlating directly with repeat customer volume.
              </p>
            </div>
          </div>

          <h2>Authoritative Hospitality Accounting Standards & Industry Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Restaurant Association (NRA):</strong> Uniform System of Accounts for Restaurants (USAR), 8th Edition.
            </li>
            <li>
              <strong>Hospitality Financial and Technology Professionals (HFTP):</strong> Financial management and prime cost benchmarking standards.
            </li>
            <li>
              <strong>Culinary Institute of America (The Professional Chef Culinary Math):</strong> Recipe costing, butcher yield tests, and portion control protocols.
            </li>
            <li>
              <strong>Cornell School of Hotel Administration:</strong> Menu engineering and contribution margin optimization research publications.
            </li>
          </ul>
        </>
      }
    >
      <FoodCostCalculatorComponent />
    </CalcPage>
  );
}
