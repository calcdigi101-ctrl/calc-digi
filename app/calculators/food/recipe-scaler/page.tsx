import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerComponent from "@/components/calcs/food/recipe-scaler";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RecipeBatchScalingFactorChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/recipe-scaler";
const TITLE = "Recipe Scaler | Baker's Percentages, Batch Multipliers & Pan Scaling";
const DESCRIPTION =
  "Scale recipes up or down using baker's percentages, surface area pan conversion, non-linear seasoning dampening, and gram weight accuracy.";

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
  { href: "/calculators/food/baking-substitution-calculator", icon: "🧁", name: "Baking Substitution" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-time-calculator", icon: "⏱️", name: "Cooking Time" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
];

export default function RecipeScalerPage() {
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
              Culinary Engineering Summary: Linear vs Non-Linear Batch Scaling
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Scaling a recipe from 4 servings to 40 servings is rarely a simple linear 10x multiplication. While bulk starches, proteins, and water scale proportionally, pan surface area, chemical leaveners, pungent spices, and liquid evaporation follow non-linear physical laws. You can verify weight-to-volume conversions with our{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium underline hover:text-amber-900">
                cooking conversion calculator
              </Link>{" "}
              and analyze recipe ingredient costs in the{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium underline hover:text-amber-900">
                food cost calculator
              </Link>.
            </p>
          </div>

          <h2>Culinary Physics of Batch Scaling & The Baker&apos;s Percentage Law</h2>
          <RecipeBatchScalingFactorChart />
          <p>
            In professional baking and commercial culinary operations, ingredient formulations are standardized using the Baker&apos;s Percentage system. Unlike conventional percentages where all components sum to 100%, the total flour (or primary bulk starch/protein) is defined as the immutable 100% baseline. Every other ingredient is mathematically expressed as a ratio of that flour mass.
          </p>
          <p>
            When recipes are scaled up or down, baker&apos;s percentages preserve the fundamental hydration ratio, lipid tenderness, and yeast fermentation kinetics regardless of whether the baker produces 500 grams or 50 kilograms of dough. Substitutions can be verified with our{" "}
            <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              baking substitution calculator
            </Link>:
          </p>

          <Formula>
            {"\text{Batch Multiplier Factor } (M) = \frac{\text{Desired Yield (Servings)}}{\text{Original Yield (Servings)}}"}
          </Formula>

          <Formula>
            {"\text{Baker's Percentage (\%)} = \left(\frac{\text{Ingredient Weight (g)}}{\text{Total Flour Weight (g)}}\right) \times 100"}
          </Formula>

          <Formula>
            {"\text{Pan Area Scaling Factor} = \frac{\text{Target Area } (\pi r_{\text{new}}^2)}{\text{Original Area } (\pi r_{\text{old}}^2)} = \frac{d_{\text{new}}^2}{d_{\text{old}}^2}"}
          </Formula>

          <Formula>
            {"\text{Non-Linear Seasoning Scaling } (M > 2.0) = M^{0.85} \approx M \times 0.88"}
          </Formula>

          <h2>Culinary Scaling Matrix & Component Adjustment Rules</h2>
          <p>
            The reference table below outlines how various culinary ingredient categories behave across small, moderate, and massive scaling multipliers:
          </p>

          <DataTable
            head={[
              "Ingredient Category",
              "Scaling Behavior",
              "Scaling Rule (2x - 4x Batch)",
              "Scaling Rule (>5x Large Batch)",
              "Key Confounding Variable",
            ]}
            rows={[
              ["Flour, Grains & Starches", "Strictly Linear (1.0x)", "Multiply exactly by M", "Multiply exactly by M", "Moisture absorption variability"],
              ["Water, Milk & Broths", "Sub-Linear (0.95x)", "Multiply by M", "Multiply by M * 0.90", "Surface evaporation stays constant"],
              ["Chemical Leaveners (Soda/Powder)", "Sub-Linear (0.80x)", "Use 85% of scaled leavener", "Use 75% of scaled leavener", "Excess gas collapses crumb structure"],
              ["Table Salt & Kosher Salt", "Sub-Linear (0.85x)", "Multiply by M * 0.90", "Multiply by M * 0.80", "Taste bud sensitivity non-linear"],
              ["Whole Chicken Eggs", "Discrete Linear Units", "Round to nearest whole egg", "Measure by gram weight (50g/egg)", "Fractional egg white/yolk ratio"],
              ["Pungent Spices (Cayenne/Cloves)", "Sub-Linear (0.75x)", "Multiply by M * 0.80", "Multiply by M * 0.65", "Volatile essential oil saturation"],
              ["Cooking Fats & Searing Oils", "Surface Area Proportional", "Scale with pan surface area", "Scale with pan surface area", "Pan footprint vs pot volume"],
            ]}
          />

          <h2>Worked Commercial Scaling Scenario: Scaling Artisan Focaccia 4x</h2>
          <p>
            Consider a bakery manager scaling a small 2-loaf home focaccia formula into an 8-loaf commercial batch for cafe sandwich service while tracking nutritional density with our{" "}
            <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              nutrition calculator
            </Link>{" "}
            and oven scheduling in the{" "}
            <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking time calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Baseline Formula (2 Loaves):</strong> Bread flour = 500g (100%), Water = 400g (80% hydration), Extra Virgin Olive Oil = 30g (6%), Salt = 10g (2%), Instant Dry Yeast = 4g (0.8%). Total dough mass = 944 grams.
            </li>
            <li>
              <strong>Batch Multiplier Calculation:</strong> Desired yield = 8 loaves. Original yield = 2 loaves.
              <Formula>
                {"M = \frac{8}{2} = 4.0\,\text{Multiplier Factor}"}
              </Formula>
            </li>
            <li>
              <strong>Bulk Ingredient Linear Scaling:</strong>
              <br />
              Flour = 500g * 4.0 = 2,000 grams (2.0 kg).
              <br />
              Olive Oil = 30g * 4.0 = 120 grams.
            </li>
            <li>
              <strong>Sub-Linear Liquid & Evaporation Compensation:</strong> Baking in a commercial deck oven with high steam retention reduces evaporation loss. We scale water to 78% baker&apos;s hydration: 2,000g * 0.78 = 1,560 grams water (instead of 1,600g).
            </li>
            <li>
              <strong>Yeast & Salt Non-Linear Adjustment:</strong> In large dough masses, friction from commercial spiral mixers elevates dough temperature, accelerating yeast metabolism. Yeast is scaled at 0.70% of flour: 2,000g * 0.007 = 14.0 grams (instead of 16g). Salt scales at 1.8%: 2,000g * 0.018 = 36.0 grams (instead of 40g).
            </li>
            <li>
              <strong>Total Commercial Yield:</strong> Final scaled dough = 2,000 + 1,560 + 120 + 36 + 14 = 3,730 grams, dividing into 8 uniform portions of 466 grams per sheet pan.
            </li>
            <li>
              <strong>Cost & Gratuity Reconciliation:</strong> The food enterprise evaluates margin targets using our{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                food cost calculator
              </Link>{" "}
              and dining check distributions via the{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>.
            </li>
          </ul>

          <h2>Geometric Pan Conversions & The Square-Cube Law</h2>
          <p>
            When scaling cake or bread formulas to different pan dimensions, cooks often mistakenly scale by diameter rather than surface area. Because the area of a circle scales with the square of its radius (A = pi * r^2), doubling a cake pan&apos;s diameter from 8 inches to 16 inches quadruples (4x) the surface area and batter capacity, not doubles it:
          </p>

          <Formula>
            {"\text{Area}_{8\text{-inch}} = \pi \times (4)^2 = 16\pi \approx 50.27\,\text{sq in}, \quad \text{Area}_{10\text{-inch}} = \pi \times (5)^2 = 25\pi \approx 78.54\,\text{sq in}"}
          </Formula>

          <p>
            Scaling from an 8-inch to a 10-inch round cake pan requires a multiplier factor of 78.54 / 50.27 = 1.56x, rather than the 1.25x suggested by linear diameter. Failing to account for geometric area causes batter overflow or shallow, dry cakes.

          <p>
            Moreover, vertical pan depth limits thermal conduction velocity. When bakers attempt to scale a batter into a pan with deeper side walls (exceeding 2.5 inches / 6.5 cm), heat conduction through the outer batter boundary layers takes significantly longer to reach the cool core. Consequently, the exterior crumb over-bakes and dries out before the moist center can set, necessitating a 25°F (14°C) reduction in oven temperature and an extended baking duration.
          </p>
          </p>

          <h2>Operational Pitfalls in Large-Scale Catering Production</h2>
          <p>
            Avoid these critical mistakes when scaling culinary production:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The Chemical Leavening Explosion:</strong> Multiplying baking powder linearly by 8x in large cake batches produces an overabundance of carbon dioxide gas during baking. The cell walls stretch beyond their tensile strength, causing the center of the cake to collapse into a sunken crater.
            </li>
            <li>
              <strong>Alcohol Evaporation Invariance:</strong> Wine in braises simmered in deep stockpots loses significantly less alcohol to evaporation than wine in wide shallow skillets. Monitor alcohol loads with our{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>.
            </li>
            <li>
              <strong>Physical Prep & Labor Fatigue:</strong> Hand-whipping or kneading scaled batches burns substantial energy, which can be monitored with our{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>{" "}
              alongside barista caffeine pacing in the{" "}
              <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                coffee caffeine calculator
              </Link>.
            </li>
            <li>
              <strong>Compounding Volumetric Errors:</strong> Measuring 20 individual cups of flour introduces up to 300 grams of cumulative error. Always weigh bulk ingredients in kilograms on commercial scales.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is a baker&apos;s percentage and why is it superior to standard percentages?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In baker&apos;s percentages, total flour weight is always designated as 100%. Every other ingredient is calculated as a direct percentage of that flour weight. This enables commercial bakers to scale batch sizes instantly by multiplying target flour weight by each ingredient&apos;s fixed percentage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why should spices and salt not be scaled linearly when multiplying a recipe by 4x or more?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Human sensory perception of piquancy and salinity is logarithmic rather than linear. In addition, large-batch cooking pots have lower surface-area-to-volume ratios, trapping volatile aromatic compounds that would otherwise escape during small-skillet cooking. Scale seasonings at 75% to 85% of linear multiplication.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do I scale a recipe that calls for 3 large eggs when halving the recipe?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Halving 3 large eggs requires 1.5 eggs. Because 1 large shelled egg weighs approximately 50 grams, crack and whisk 2 eggs together (100g total), then weigh out exactly 75 grams of beaten egg mixture, discarding or refrigerating the remainder.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does cooking time double when doubling a recipe?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                No. Cooking time depends on food thickness and geometry, not total batch mass. Two identical 8-inch cakes bake in roughly the same time as one cake, provided the oven has adequate airflow. Roasting larger cuts of meat requires verifying doneness via our{" "}
                <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  cooking time calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do I convert a 9x13 inch rectangular baking pan to round cake pans?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A 9x13 inch pan has an area of 117 square inches. Two 8-inch round pans have a combined area of approximately 100 square inches (50 sq in each), and two 9-inch round pans provide 127 square inches. A 9x13 batch divides cleanly across two 8-inch or 9-inch round pans with minimal baking time variation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does scaling recipes affect commercial food cost percentage?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Scaling up recipes allows food establishments to purchase wholesale bulk packaging at lower unit prices, reducing food cost percentages modeled in our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>{" "}
                by several percentage points.
              </p>
            </div>
          </div>

          <h2>Authoritative Culinary Arts Standards & Professional Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Culinary Institute of America (The Professional Chef 9th Edition):</strong> Baker&apos;s formulas, pan scaling ratios, and kitchen yields.
            </li>
            <li>
              <strong>American Association of Cereal Chemists (AACC International):</strong> Methods for laboratory dough hydration and flour testing standards.
            </li>
            <li>
              <strong>National Restaurant Association Educational Foundation (ManageFirst):</strong> Inventory and recipe management protocols.
            </li>
            <li>
              <strong>King Arthur Baking Company:</strong> Professional Baker&apos;s Percentage guide and test kitchen scaling principles.
            </li>
          </ul>
        </>
      }
    >
      <RecipeScalerComponent />
    </CalcPage>
  );
}
