import type { Metadata } from "next";
import Link from "next/link";
import BakingSubstitutionCalculatorComponent from "@/components/calcs/food/baking-substitution-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BakingIngredientHydrationRatioChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/baking-substitution-calculator";
const TITLE = "Baking Substitution Calculator | Ratio, Hydration & Chemistry Balance";
const DESCRIPTION =
  "Calculate exact culinary ingredient substitutions for buttermilk, butter, eggs, sugar, and cake flour while preserving pastry hydration and moisture.";

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
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-time-calculator", icon: "⏱️", name: "Cooking Time" },
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
];

export default function BakingSubstitutionCalculatorPage() {
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
              Culinary Chemistry Summary: Hydration & Lipid Equilibrium
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Baking is precise food chemistry rather than intuitive seasoning. Substituting culinary staples like whole butter, buttermilk, chicken eggs, or granulated sucrose requires exact compensation for moisture percentage, solid lipid fractions, and pH acidity. To scale substituted formulas accurately, cross-verify with our{" "}
              <Link href="/calculators/food/recipe-scaler" className="font-medium underline hover:text-amber-900">
                recipe scaler
              </Link>{" "}
              and convert weight to volume with our{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium underline hover:text-amber-900">
                cooking conversion calculator
              </Link>.
            </p>
          </div>

          <h2>Physical Chemistry of Baking Substitutions & Moisture Balance</h2>
          <BakingIngredientHydrationRatioChart />
          <p>
            Pastry formulations rely on an intricate equilibrium between structural firmers (gluten proteins and egg albumins) and tenderizers (lipids, sugars, and starch inhibitors). When an ingredient is substituted, pastry chefs must preserve total recipe moisture percentage, fat content, and acid-base stoichiometry.
          </p>
          <p>
            For example, commercial salted or unsalted butter consists of approximately 80% to 82% milk fat, 16% to 18% water, and 1% to 2% milk solids. Substituting vegetable oil (100% lipid, 0% water) for butter on a 1:1 volumetric basis increases fat density while depriving gluten matrices of hydration. Chemical leavening reactions also depend critically on balancing sodium bicarbonate with organic dietary acids:
          </p>

          <Formula>
            {"\text{NaHCO}_3 + \text{HA (Acid)} \longrightarrow \text{NaA} + \text{H}_2\text{O} + \text{CO}_2\,(\text{gas}) "}
          </Formula>

          <Formula>
            {"\text{Hydration Ratio (\%)} = \frac{\text{Total Water Mass (g)}}{\text{Total Flour Weight (g)}} \times 100"}
          </Formula>

          <Formula>
            {"\text{Butter to Oil Conversion: } \text{Oil Mass} = \text{Butter Mass} \times 0.80, \quad \text{Liquid Compensated} = \text{Butter Mass} \times 0.20"}
          </Formula>

          <Formula>
            {"\text{Cake Flour Formulation} = 85\,\text{g All-Purpose Flour} + 15\,\text{g Cornstarch per } 100\,\text{g Target}"}
          </Formula>

          <h2>Authoritative Baking Substitution Matrix & Hydration Equivalencies</h2>
          <p>
            The following reference matrix outlines precise culinary substitutions across essential baking categories, detailing compensating liquids and structural adjustments required:
          </p>

          <DataTable
            head={[
              "Original Ingredient",
              "Primary Substitution Option",
              "Exact Formulation Ratio",
              "Hydration Adjustment",
              "Fat & Acidity Compensation",
              "Best Culinary Application",
            ]}
            rows={[
              ["1 Cup Buttermilk (242g)", "Whole Milk + Lemon Juice / Vinegar", "227g Milk + 15g Acid (1 tbsp)", "Neutral (+0g)", "Restores pH to 4.5 for leavening", "Pancakes, Scones, Biscuits"],
              ["1 Cup Buttermilk (242g)", "Plain Greek Yogurt + Water", "180g Yogurt + 60g Water", "Neutral (+0g)", "Rich lactic acidity & protein", "Layer Cakes, Quick Breads"],
              ["1 Cup Butter (227g)", "Neutral Vegetable / Canola Oil", "182g Oil (3/4 Cup)", "Add 45g Liquid / Milk", "Increases lipid tenderness", "Carrot Cake, Muffins"],
              ["1 Cup Butter (227g)", "Unsweetened Applesauce", "114g Applesauce + 114g Fat", "Reduce other liquid by 20g", "Adds pectin, lowers calories", "Chewy Cookies, Brownies"],
              ["1 Large Whole Egg (50g)", "Ground Flaxseed Meal + Warm Water", "7g Flax (1 tbsp) + 45g Water (3 tbsp)", "Allow 5 min gelation", "Mucilage mimics albumin binding", "Rustic Artisan Breads, Oats"],
              ["1 Large Whole Egg (50g)", "Silken Tofu (Whipped Smooth)", "50g Pureed Silken Tofu", "Neutral (+0g)", "High protein structural matrix", "Pound Cakes, Dense Loaves"],
              ["1 Cup Granulated Sugar (200g)", "Pure Maple Syrup or Raw Honey", "150g Liquid Sweetener (3/4 Cup)", "Reduce recipe liquid by 60ml", "Lowers oven temp by 25°F", "Banana Breads, Glazes"],
              ["1 Cup Cake Flour (120g)", "All-Purpose Flour + Cornstarch", "102g AP Flour + 18g Cornstarch", "Sift 4 times for dispersal", "Dilutes protein from 11.5% to 8.5%", "Angel Food, Chiffon Cake"],
            ]}
          />

          <h2>Worked Recipe Formulation: Vegan Lemon Sponge Substitution</h2>
          <p>
            Suppose a commercial baker wishes to convert a standard 8-portion butter-and-egg lemon cake into a plant-based dairy-free formulation while monitoring ingredient expenditures with our{" "}
            <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              food cost calculator
            </Link>{" "}
            and nutritional profile with our{" "}
            <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              nutrition calculator
            </Link>.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Original Egg Component:</strong> 3 large whole eggs = 150 grams raw mass (30g protein, 15g lipids, 105g water).
            </li>
            <li>
              <strong>Egg Alternative Selection:</strong> Aquafaba (chickpea cooking brine) whipped to soft peaks. Using 45g aquafaba per egg requires 135g aquafaba. To compensate for missing yolk lecithin emulsifiers, the baker incorporates 0.5g sunflower lecithin.
            </li>
            <li>
              <strong>Original Butter Component:</strong> 227 grams unsalted butter (182g milk fat, 41g water, 4g solids).
            </li>
            <li>
              <strong>Butter Alternative Selection:</strong> Refined coconut oil (80%) blended with oat milk (20%). We combine 182g coconut oil with 45g barista-grade oat milk.
            </li>
            <li>
              <strong>Leavening Adjustment:</strong> Adding 5 ml lemon juice activates the sodium bicarbonate leavener without requiring chemical buttermilk, ensuring total crumb volume matches traditional benchmarks.
            </li>
            <li>
              <strong>Thermal Roasting Window:</strong> The baker calibrates oven roasting time and core temperature using our{" "}
              <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking time calculator
              </Link>{" "}
              to prevent premature surface caramelization caused by alternative sugars.
            </li>
          </ul>

          <h2>Gluten Protein Dilution & Starch Gelatinization Dynamics</h2>
          <p>
            When synthesizing cake flour from all-purpose flour, the primary objective is attenuating the formation of glutenin and gliadin peptide complexes. All-purpose flour typically contains 10.5% to 12.0% protein by weight, yielding excessive elasticity in tender sponge cakes.
          </p>
          <p>
            By replacing 15% of the flour mass with refined cornstarch (derived from pure zein-free maize endosperm), the overall protein concentration drops to approximately 8.5% to 9.0%. Cornstarch gelatinizes at approximately 62°C to 72°C, absorbing free ambient moisture and creating a tender crumb structure without tough gluten elongation.

          <p>
            Equally fundamental to pastry stability is water activity (denoted as aw), representing the ratio of vapor pressure of water in food matrices relative to pure distilled water at identical temperatures. Granulated sucrose acts not merely as a gustatory flavoring agent, but as a critical humectant and plasticizing solute. Sucrose molecules form hydrogen bonds with ambient free water dipoles, lowering chemical water activity and delaying wheat starch granule swelling during the initial baking phase.
          </p>
          <p>
            When bakers substitute liquid sweeteners like agave nectar or honey, the increased proportion of monosaccharides (fructose and glucose) accelerates Maillard non-enzymatic browning via reactive carbonyl condensation. In addition, the enhanced hygroscopic affinity of fructose binds ambient moisture persistently after baking, preventing starch retrogradation and staling while yielding an exceptionally moist, dense crumb that requires careful structural oven timing.
          </p>
          </p>

          <h2>Operational Pitfalls in Culinary Chemistry & Baking Practice</h2>
          <p>
            Avoid these critical errors when substituting essential baking components:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Over-Leavening with Baking Soda:</strong> Baking soda has an alkaline buffering capacity four times greater than standard double-acting baking powder. Without an acidic counter-ion, unreacted sodium carbonate persists in the crumb, raising the batter pH above 7.5. This elevates Maillard browning prematurely while breaking down delicate vanilla and chocolate aroma molecules, producing a bitter chemical palate. Baking soda is 4 times stronger than baking powder. Substituting baking soda without sufficient dietary acid leaves an unreacted soapy, alkaline aftertaste and yellow discoloration.
            </li>
            <li>
              <strong>Liquid Sweetener Hygroscopic Shifts:</strong> Honey and maple syrup contain fructose and glucose, which are significantly more hygroscopic than sucrose. Batches brown much faster due to lower Maillard reaction temperatures; reduce oven temperature by 25°F (14°C).
            </li>
            <li>
              <strong>Neglecting Volume-to-Weight Discrepancies:</strong> Measuring substituted powders by volume introduces up to 30% error due to compaction. Always weigh ingredients in grams using our{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking conversion calculator
              </Link>.
            </li>
            <li>
              <strong>Caloric & Burn Considerations:</strong> Substituting fruit purees for fats dramatically lowers lipid calories, which can be monitored in our{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>{" "}
              and beverage energy accounting in the{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Can I replace butter with olive oil in cookie dough formulas?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                You can replace butter with olive oil, but the cookie texture will alter significantly. Butter is solid at room temperature (saturated fat), contributing to air entrapment during creaming and yielding a crisp edge. Olive oil (monounsaturated liquid lipid) creates a denser, softer, cake-like crumb. Use 3/4 the volume of butter.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does acidic buttermilk tenderize baked goods compared to regular sweet milk?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Buttermilk contains lactic acid (pH ~4.5), which hydrolyzes wheat proteins, weakening strong gluten strands and yielding an exceptionally delicate crumb. In addition, lactic acid reacts instantly with baking soda to release carbon dioxide micro-bubbles before oven entry.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the best egg substitute for structural binding in rich brownies?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                For dense, fudgy brownies, pureed silken tofu (50g per egg) or commercial powdered egg replacer provides the optimal emulsifying protein structure without introducing unwanted fruit flavors like banana or applesauce.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why must liquid sweetener recipes reduce overall water volume?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Honey contains approximately 17% water, and maple syrup contains roughly 33% water. If you replace granulated dry sugar without reducing milk, water, or egg volume by roughly 3 to 4 tablespoons per cup of syrup, your batter will become oversaturated and collapse during baking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do commercial bakeries scale alternative ingredient formulas?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Commercial facilities express every ingredient as a baker&apos;s percentage relative to flour weight (100%). When scaling large production runs, bakers utilize our{" "}
                <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  recipe scaler
                </Link>{" "}
                to ensure hydration ratios remain chemically identical across multi-kilogram batches.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does ingredient substitution impact commercial restaurant food margins?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Specialty ingredients such as almond flour, pure maple syrup, and egg alternatives can cost 3 to 5 times more than standard wheat flour and eggs. Chefs model these shifts using our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>{" "}
                to ensure menu pricing maintains hospitality profitability standards.
              </p>
            </div>
          </div>

          <h2>Authoritative Culinary Science Standards & Regulatory Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>American Association of Cereal Chemists (AACC International):</strong> Approved methods for measuring wheat flour protein content, sedimentation, and starch gelatinization.
            </li>
            <li>
              <strong>United States Department of Agriculture (USDA ARS):</strong> Food composition databases for moisture, lipid, and protein ratios in commercial baking ingredients.
            </li>
            <li>
              <strong>Food and Drug Administration (FDA 21 CFR Part 137):</strong> Standards of identity for cereal flours, whole wheat products, and cornstarch additives.
            </li>
            <li>
              <strong>Culinary Institute of America (The Professional Chef Baking Metrology):</strong> Textural classifications and formula balance in classical pastry arts.
            </li>
          </ul>
        </>
      }
    >
      <BakingSubstitutionCalculatorComponent />
    </CalcPage>
  );
}
