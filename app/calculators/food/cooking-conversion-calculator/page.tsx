import type { Metadata } from "next";
import Link from "next/link";
import CookingConversionCalculatorComponent from "@/components/calcs/food/cooking-conversion-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CulinaryDensityWeightVolumeChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/cooking-conversion-calculator";
const TITLE = "Cooking Conversion Calculator | Weight, Volume & Bulk Density";
const DESCRIPTION =
  "Convert recipe cups, grams, ounces, milliliters, and tablespoons using ingredient-specific bulk densities for flour, sugar, butter, and liquids.";

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
  { href: "/calculators/food/baking-substitution-calculator", icon: "🧁", name: "Baking Substitution" },
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-time-calculator", icon: "⏱️", name: "Cooking Time" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
];

export default function CookingConversionCalculatorPage() {
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
              Culinary Metrology Summary: Volumetric vs Gravimetric Accuracy
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              In professional culinary arts and baking science, measuring ingredients by weight (gravimetric) eliminates the 20% to 35% volumetric error caused by aerated settling. One United States legal cup represents exactly 240 milliliters, but its gram mass ranges from 120 grams for all-purpose flour to 340 grams for raw honey. Cross-reference conversions with our{" "}
              <Link href="/calculators/food/recipe-scaler" className="font-medium underline hover:text-amber-900">
                recipe scaler
              </Link>{" "}
              and formulate pastry replacements in the{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium underline hover:text-amber-900">
                baking substitution calculator
              </Link>.
            </p>
          </div>

          <h2>Culinary Bulk Density Mechanics & Gravimetric Metrology</h2>
          <CulinaryDensityWeightVolumeChart />
          <p>
            The physical density of culinary commodities is governed by particulate morphology, moisture content, and interstitial aeration. When a home cook dips a measuring cup directly into a bag of wheat flour, the powder compresses, packing up to 150 grams into a single cup. Conversely, aerating or sifting flour produces a cup weighing as little as 110 grams.
          </p>
          <p>
            Professional commercial gastronomy standardizes ingredient measurement through bulk density constants (rho = mass / volume). Liquids like water, vinegar, and low-fat milk exhibit specific gravities close to 1.00 g/ml, whereas viscous syrups, lipid emulsions, and crystalline sugars possess distinct gravimetric factors:
          </p>

          <Formula>
            {"\text{Mass (grams)} = \text{Volume (ml)} \times \rho\,(\text{Bulk Density in g/ml})"}
          </Formula>

          <Formula>
            {"\text{US Cups to Grams} = \text{Cups} \times 236.588\,\text{ml/cup} \times \rho\,(\text{g/ml})"}
          </Formula>

          <Formula>
            {"1\,\text{US Fluid Ounce (fl oz)} = 29.5735\,\text{ml} \approx 2\,\text{Tablespoons}"}
          </Formula>

          <Formula>
            {"1\,\text{Imperial Cup} = 284.13\,\text{ml}, \quad 1\,\text{Metric Cup} = 250.0\,\text{ml}, \quad 1\,\text{US Legal Cup} = 240.0\,\text{ml}"}
          </Formula>

          <h2>Comprehensive Culinary Density & Volumetric Conversion Table</h2>
          <p>
            The reference table below establishes verified bulk density metrics across common culinary staples, allowing seamless translation between Imperial, Metric, and US customary units:
          </p>

          <DataTable
            head={[
              "Ingredient Specification",
              "Bulk Density (g/ml)",
              "Weight per 1 US Cup (240 ml)",
              "Weight per 1 Metric Cup (250 ml)",
              "Grams per 1 Tablespoon (15 ml)",
              "Ounces per US Cup (oz)",
            ]}
            rows={[
              ["All-Purpose Flour (Dip & Sweep)", "0.507 g/ml", "120 g", "127 g", "7.6 g", "4.23 oz"],
              ["All-Purpose Flour (Packed)", "0.633 g/ml", "150 g", "158 g", "9.5 g", "5.29 oz"],
              ["Granulated White Cane Sugar", "0.845 g/ml", "200 g", "211 g", "12.7 g", "7.05 oz"],
              ["Packed Dark Brown Sugar", "0.930 g/ml", "220 g", "233 g", "14.0 g", "7.76 oz"],
              ["Confectioners' Powdered Sugar", "0.507 g/ml", "120 g", "127 g", "7.6 g", "4.23 oz"],
              ["Unsalted Butter (Room Temp)", "0.959 g/ml", "227 g (2 Sticks)", "240 g", "14.2 g", "8.00 oz"],
              ["Pure Vegetable / Olive Oil", "0.920 g/ml", "218 g", "230 g", "13.8 g", "7.69 oz"],
              ["Raw Clover Honey / Corn Syrup", "1.420 g/ml", "340 g", "355 g", "21.3 g", "11.99 oz"],
              ["Table Salt (Fine Sodium Chloride)", "1.200 g/ml", "288 g", "300 g", "18.0 g", "10.16 oz"],
              ["Diamond Crystal Kosher Salt", "0.575 g/ml", "138 g", "144 g", "8.6 g", "4.87 oz"],
            ]}
          />

          <h2>Worked Analytical Scenario: Converting European Pastry Formulas</h2>
          <p>
            Consider a professional pastry chef adapting a classical French brioche recipe originally documented in European metric grams into US customary bakery volume measures for kitchen prep. The chef also tracks nutritional yield with our{" "}
            <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              nutrition calculator
            </Link>{" "}
            and ingredient cost with the{" "}
            <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              food cost calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Flour Formulation:</strong> 500 grams French T45 flour (bulk density 0.507 g/ml).
              <Formula>
                {"\text{Volume (ml)} = \frac{500\,\text{g}}{0.507\,\text{g/ml}} = 986.2\,\text{ml} \div 236.59\,\text{ml/cup} = 4.17\,\text{US Cups}"}
              </Formula>
              Target volume: 4 cups plus 2.7 tablespoons of sifted flour.
            </li>
            <li>
              <strong>Butter Component:</strong> 250 grams European unsalted butter (82% butterfat).
              <Formula>
                {"\text{US Butter Sticks} = \frac{250\,\text{g}}{113.4\,\text{g/stick}} = 2.20\,\text{sticks} \approx 1.10\,\text{US Cups}"}
              </Formula>
            </li>
            <li>
              <strong>Liquid Hydration (Whole Milk):</strong> 125 ml milk at density 1.032 g/ml.
              <Formula>
                {"\text{Mass} = 125\,\text{ml} \times 1.032\,\text{g/ml} = 129.0\,\text{g} = 0.528\,\text{US Cups}"}
              </Formula>
            </li>
            <li>
              <strong>Kosher Salt Density Discrepancy:</strong> The recipe calls for 10 grams of salt. Using fine table salt (density 1.20 g/ml) requires 0.56 tablespoons (1.7 tsp), whereas Diamond Crystal kosher salt (density 0.575 g/ml) requires 1.16 tablespoons (3.5 tsp). Failing to adjust for salt crystal density would ruin the flavor balance.
            </li>
            <li>
              <strong>Baking & Energy Balancing:</strong> The pastry chef coordinates oven temperature and duration with our{" "}
              <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking time calculator
              </Link>{" "}
              and evaluates energy burn from intensive dough kneading in the{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>.
            </li>
          </ul>

          <h2>The Meniscus Error & Temperature Volumetric Expansion</h2>
          <p>
            When utilizing transparent liquid measuring cylinders, parallax error and surface tension can alter volume readings by up to 5%. In aqueous solutions, surface wetting creates a concave meniscus where the bottom of the curve represents the true volumetric level.
          </p>
          <p>
            Furthermore, thermal expansion modifies culinary liquid density. Boiling water at 100°C possesses a density of 0.958 g/ml compared to 0.998 g/ml at 20°C room temperature. While negligible in single-portion cooking, this 4% volumetric expansion causes significant yield errors in commercial soup and broth production.

          <h2>Powder Compaction Mechanics: The Carr Index & Hausner Ratio</h2>
          <p>
            In culinary bulk material science and industrial food engineering, the disparity between loose aerated powder volume and compressed settled mass is evaluated using the Carr Compressibility Index and the Hausner Ratio. Fine particulate starches like wheat flour and cornstarch exhibit cohesive inter-particle friction driven by electrostatic surface forces and van der Waals attractions:
          </p>
          <p>
            When a culinary vessel or bulk hopper is subjected to ambient vibration or mechanical tapping during shipping, loose particle bridges collapse, expelling interstitial void air. The Carr Index quantifies this transition: Carr Index = 100 * (1 - rho_loose / rho_tapped). Highly compressible powders exhibit Carr indices exceeding 25%, meaning their effective density increases by over a quarter simply through storage compaction.
          </p>
          <p>
            Relative atmospheric humidity further exacerbates volumetric inaccuracy. Because wheat flour is naturally hygroscopic, storing flour at 80% relative ambient humidity allows grain starches to adsorb up to 14% water vapor by mass. A measuring cup dipped into humid, compacted flour can weigh up to 160 grams—introducing massive structural failure into delicate cake batters if not corrected via gravimetric digital scales.
          </p>
          </p>

          <h2>Operational Pitfalls in Culinary Metrology & Scale Calibration</h2>
          <p>
            Preventing culinary errors requires vigilant measurement hygiene:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The Kosher Salt Trap:</strong> The physical geometry of sodium chloride crystals dictates volumetric density. Diamond Crystal kosher salt is manufactured via open-pan evaporation, producing hollow, brittle pyramidal flakes that crush easily. Morton kosher salt is produced via mechanical roll pressing, yielding dense, compact flakes that pack nearly twice as much sodium chloride into a single measuring tablespoon. Morton Kosher salt is nearly twice as dense as Diamond Crystal Kosher salt. Swapping brands on a 1:1 volumetric basis makes savory food unpalatably salty.
            </li>
            <li>
              <strong>Ounce Ambiguity (Mass vs Fluid):</strong> A fluid ounce (fl oz) measures volume (29.57 ml), whereas an avoirdupois ounce (oz) measures gravitational mass (28.35 g). Only pure water at 4°C shares exact numerical equivalence between fluid and mass ounces.
            </li>
            <li>
              <strong>Brown Sugar Compaction:</strong> Recipes specifying &quot;packed brown sugar&quot; require compressing out air pockets to achieve 220g per cup. Unpacked brown sugar weighs only 170g per cup.
            </li>
            <li>
              <strong>Beverage & Alcohol Volume Standardization:</strong> In beverage programs, accurate milliliter conversions ensure compliance with alcohol unit tracking via our{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>{" "}
              and caffeine concentration in the{" "}
              <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                coffee caffeine calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why do professional pastry chefs refuse to use volumetric cup measures?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Measuring cups exhibit a 20% to 30% margin of error due to flour compaction, humidity, and scooping force. Electronic digital scales provide gravimetric accuracy to within 1 gram, ensuring identical cake crumb texture, oven rise, and consistency across every production batch.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How many tablespoons are in one-quarter cup of liquid or dry ingredients?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                There are exactly 4 tablespoons in 1/4 US cup (60 ml or 2 fluid ounces). For smaller fractional amounts, 1 tablespoon equals 3 teaspoons.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between a US legal cup and a Metric cup?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A United States customary cup equals 236.59 ml, an FDA legal nutrition cup equals exactly 240 ml, and a Commonwealth Metric cup (used in Australia, New Zealand, and Canada) equals 250 ml. Using a Metric cup in an American recipe introduces a 5% excess liquid bias.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do I convert stick butter into tablespoons, ounces, and grams?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In the United States, 1 stick of butter equals 8 tablespoons, 1/2 cup, 4 avoirdupois ounces, or 113.4 grams. Two full sticks equal 1 cup (227 grams).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does ingredient density affect large-scale recipe batch multipliers?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                When scaling catering batches up to 50 portions with our{" "}
                <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  recipe scaler
                </Link>, volumetric errors compound rapidly. Converting to gram weight avoids ruined emulsions and dough hydration imbalances.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do restaurant kitchen conversions protect prime food margins?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In hospitality cost accounting, standardizing portion yields through bulk density conversion allows chefs using our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>{" "}
                to calculate true portion costs and prevent ingredient over-portioning.
              </p>
            </div>
          </div>

          <h2>Authoritative Culinary Metrology Standards & National Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Institute of Standards and Technology (NIST Handbook 44):</strong> Specifications and tolerances for commercial kitchen weighing and volumetric devices.
            </li>
            <li>
              <strong>United States Department of Agriculture (USDA FoodData Central):</strong> Standard reference nutrient and food density databases.
            </li>
            <li>
              <strong>International Organization for Standardization (ISO 31-3):</strong> Quantities and units of mechanics, volume, and density.
            </li>
            <li>
              <strong>The Culinary Institute of America (The Professional Chef 9th Edition):</strong> Standard kitchen ratios and gravimetric conversion rules.
            </li>
          </ul>
        </>
      }
    >
      <CookingConversionCalculatorComponent />
    </CalcPage>
  );
}
