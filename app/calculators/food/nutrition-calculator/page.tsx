import type { Metadata } from "next";
import Link from "next/link";
import NutritionCalculatorComponent from "@/components/calcs/food/nutrition-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MacronutrientCaloricDensityChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/nutrition-calculator";
const TITLE = "Nutrition Calculator | Macronutrient Splits, Calories & Fiber Targets";
const DESCRIPTION =
  "Calculate daily calories, protein, carbohydrates, fats, and dietary fiber intake across meals based on USDA Acceptable Macronutrient Distribution Ranges.";

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
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn Calculator" },
  { href: "/calculators/food/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Unit Calculator" },
  { href: "/calculators/food/coffee-caffeine-calculator", icon: "☕", name: "Coffee Caffeine Calculator" },
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
];

export default function NutritionCalculatorPage() {
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
              Dietary Science Summary: Atwater Energy Factors & AMDR Guidelines
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              The human metabolic engine combusts macronutrients according to thermodynamic Atwater energy coefficients: 4.0 kcal/g for proteins and available carbohydrates, and 9.0 kcal/g for dietary lipids. The National Academy of Medicine recommends Acceptable Macronutrient Distribution Ranges (AMDR): 10%–35% protein, 45%–65% carbohydrate, and 20%–35% fat. Balance dietary energy with physical burn in our{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium underline hover:text-amber-900">
                calorie burn calculator
              </Link>{" "}
              and beverage intake in the{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium underline hover:text-amber-900">
                alcohol unit calculator
              </Link>.
            </p>
          </div>

          <h2>Macronutrient Thermodynamics & The Atwater Energy Factor System</h2>
          <MacronutrientCaloricDensityChart />
          <p>
            Nutritional bioenergetics measures chemical bond enthalpy released during cellular respiration. Established by Wilbur Olin Atwater in the late 19th century via bomb calorimetry, dietary energy factors account for incomplete gastrointestinal digestion and fecal/urinary losses.
          </p>
          <p>
            While pure carbohydrates release 4.15 kcal/g in a physical bomb calorimeter, human fecal loss reduces available physiological energy to 4.0 kcal/g. Similarly, protein oxidation produces urea, yielding an effective net energy yield of 4.0 kcal/g. Ingredient gram weights can be converted from kitchen volume using our{" "}
            <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking conversion calculator
            </Link>:
          </p>

          <Formula>
            {"\text{Total Energy (kcal)} = (4 \times \text{Protein (g)}) + (4 \times \text{Carbohydrate (g)}) + (9 \times \text{Fat (g)}) + (7 \times \text{Ethanol (g)})"}
          </Formula>

          <Formula>
            {"\text{Protein Target (g)} = \frac{\text{Daily Calories (kcal)} \times (\text{Protein \%} / 100)}{4.0\,\text{kcal/g}}"}
          </Formula>

          <Formula>
            {"\text{Dietary Fiber Requirement} = \frac{\text{Daily Calories}}{1{,}000\,\text{kcal}} \times 14.0\,\text{grams (USDA Standard)}"}
          </Formula>

          <Formula>
            {"\text{Per-Meal Allocation} = \frac{\text{Macronutrient Daily Mass}}{\text{Feeding Frequency (Meals per Day)}}"}
          </Formula>

          <h2>Dietary Reference Intakes & Macronutrient Target Matrix</h2>
          <p>
            The reference matrix below establishes standard macronutrient distribution splits across lifestyle, athletic, and metabolic health profiles:
          </p>

          <DataTable
            head={[
              "Dietary Profile / Objective",
              "Protein % (Share)",
              "Carbohydrate %",
              "Dietary Fat %",
              "Protein Density (g/kg)",
              "Primary Physiological Target",
            ]}
            rows={[
              ["Balanced Healthy Maintenance", "25.0%", "45.0%", "30.0%", "1.2 - 1.6 g/kg", "Cardiometabolic longevity"],
              ["Hypertrophy & Strength Training", "30.0%", "45.0%", "25.0%", "1.8 - 2.2 g/kg", "Muscle protein synthesis (MPS)"],
              ["Endurance Athlete (Marathon/Tri)", "20.0%", "55.0%", "25.0%", "1.4 - 1.8 g/kg", "Glycogen resynthesis & stamina"],
              ["Weight Loss / Calorie Deficit", "35.0%", "35.0%", "30.0%", "2.0 - 2.4 g/kg", "Lean mass retention & satiety"],
              ["Ketogenic / Very Low Carb", "25.0%", "5.0%", "70.0%", "1.4 - 1.8 g/kg", "Hepatic ketone production"],
              ["Clinical Mediterranean Diet", "20.0%", "50.0%", "30.0%", "1.2 - 1.5 g/kg", "Polyphenol & monounsaturated lipids"],
            ]}
          />

          <h2>Worked Nutritional Case Study: Active Strength Athlete Meal Plan</h2>
          <p>
            Consider a 75 kg recreational athlete aiming for a 2,400 kcal daily intake to support strength training while utilizing our{" "}
            <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              calorie burn calculator
            </Link>{" "}
            and managing recipe portions with the{" "}
            <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              recipe scaler
            </Link>. With a target macro split of 30% protein, 40% carbohydrate, and 30% fat divided across 4 meals:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Protein Allocation (30%):</strong>
              <Formula>
                {"\text{Protein} = \frac{2{,}400 \times 0.30}{4.0} = \frac{720\,\text{kcal}}{4.0} = 180\,\text{g/day} \quad (2.4\,\text{g/kg body weight})"}
              </Formula>
              Per meal = 180g / 4 meals = 45.0 grams protein per meal (sufficient to exceed the 3g leucine MPS threshold).
            </li>
            <li>
              <strong>Carbohydrate Allocation (40%):</strong>
              <Formula>
                {"\text{Carbohydrate} = \frac{2{,}400 \times 0.40}{4.0} = \frac{960\,\text{kcal}}{4.0} = 240\,\text{g/day}"}
              </Formula>
              Per meal = 240g / 4 meals = 60.0 grams carbohydrate per meal.
            </li>
            <li>
              <strong>Dietary Fat Allocation (30%):</strong>
              <Formula>
                {"\text{Lipids} = \frac{2{,}400 \times 0.30}{9.0} = \frac{720\,\text{kcal}}{9.0} = 80\,\text{g/day}"}
              </Formula>
              Per meal = 80g / 4 meals = 20.0 grams fat per meal.
            </li>
            <li>
              <strong>Mandatory Dietary Fiber Floor:</strong> At 2,400 kcal, USDA guidelines require:
              <Formula>
                {"\text{Fiber} = \frac{2{,}400}{1{,}000} \times 14 = 33.6\,\text{grams soluble/insoluble fiber}"}
              </Formula>
            </li>
            <li>
              <strong>Recipe Adaptation & Costs:</strong> The athlete prepares home-cooked high-protein dishes formulated with our{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                baking substitution calculator
              </Link>{" "}
              and checks grocery expenditures using the{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                food cost calculator
              </Link>.
            </li>
          </ul>

          <h2>The Thermic Effect of Food (TEF) & Leucine Trigger Mechanics</h2>
          <p>
            Dietary energy balance is modulated by the Thermic Effect of Food (TEF)—the metabolic cost of mastication, gastrointestinal motility, enzyme secretion, and active amino acid transport. Protein possesses the highest TEF by a wide margin: 20% to 30% of ingested protein energy is expended purely during metabolic assimilation. In contrast, carbohydrates exhibit a TEF of 5% to 10%, and dietary fats exhibit only 0% to 3%.
          </p>
          <p>
            For muscular adaptation, protein distribution across the day is superior to single-bolus feeding. Achieving the &quot;leucine trigger&quot; (approximately 2.7 to 3.5 grams of the essential branched-chain amino acid leucine per meal) activates intracellular mechanistic target of rapamycin complex 1 (mTORC1), driving muscle protein synthesis.

          <h2>Nitrogen Balance Dynamics & Short-Chain Fatty Acid Fermentation</h2>
          <p>
            Nutritional protein status is clinically quantified through whole-body nitrogen balance: Nitrogen Balance = N_intake - (N_urinary_urea + N_fecal + N_integumentary). Because pure dietary amino acids contain on average 16% elemental nitrogen by weight, multiplying dietary protein mass by 0.16 yields dietary nitrogen input. In positive nitrogen balance (characteristic of muscular hypertrophy or adolescent growth), nitrogen retention exceeds excretion, indicating net tissue accretion.
          </p>
          <p>
            Equally essential is the metabolic fate of non-digestible complex carbohydrates and soluble prebiotic fibers. Resisting enzymatic hydrolysis in the human stomach and upper small intestine, soluble polysaccharides reach the cecum and ascending colon intact. Anaerobic commensal gut microbiota ferment these oligosaccharides into short-chain fatty acids (SCFAs), predominantly acetate, propionate, and butyrate. Butyrate serves as the primary energetic fuel for colonic epithelial colonocytes, while propionate undergoes hepatic portal transport to regulate de novo lipogenesis and systemic insulin sensitivity.
          </p>
          </p>

          <h2>Operational Pitfalls, Micronutrient Neglect & Caloric Tracking</h2>
          <p>
            Vigilant nutrition planning avoids common metabolic pitfalls:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Raw vs Cooked Weight Distortion:</strong> Thermal roasting and searing cause significant evaporative water loss and lipid rendering, reducing raw muscle weight by 20% to 30%. Because macronutrient grams remain conserved while total moisture decreases, cooked proteins display much higher apparent nutrient density per 100 grams. Failure to distinguish raw from cooked weights creates substantial macro tracking distortion. Raw chicken breast loses 20% to 25% water during roasting timed with our{" "}
              <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking time calculator
              </Link>. Weighing cooked meat while applying raw USDA database entries overestimates protein intake by 30%.
            </li>
            <li>
              <strong>Hidden Liquid Cooking Fats:</strong> Adding just two tablespoons of unmeasured extra virgin olive oil to a saute pan adds 240 calories and 28 grams of fat, silently erasing an intended daily caloric deficit.
            </li>
            <li>
              <strong>Caffeine & Energy Hydration:</strong> Stimulants tracked in our{" "}
              <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                coffee caffeine calculator
              </Link>{" "}
              elevate resting metabolic rate but do not replace wholesome micronutrient intake.
            </li>
            <li>
              <strong>Hospitality Gratuity & Social Dining:</strong> When dining out, balancing social nutrition with guest check splits via our{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>{" "}
              preserves both dietary and financial wellness.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why do proteins and carbohydrates provide 4 kcal/g while fat provides 9 kcal/g?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Fatty acid triglyceride hydrocarbon chains are highly reduced and hydrophobic, containing very little oxygen. When oxidized, they yield significantly more ATP and metabolic energy per carbon atom than carbohydrates or proteins, which are already partially oxygenated.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How much protein can the human body utilize in a single meal?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                While the gastrointestinal tract can absorb virtually unlimited protein over time, the muscle protein synthesis response plateaus around 0.40 to 0.55 g/kg per meal (roughly 30 to 45 grams for a standard adult). Excess amino acids are oxidized for energy or converted to urea.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between total carbohydrates and net carbohydrates?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Net carbohydrates equal total carbohydrates minus dietary fiber and non-digestible sugar alcohols. Because dietary fiber passes through the small intestine without breaking down into monosaccharides, it exerts minimal impact on blood glucose and circulating insulin.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does alcohol intake distort daily macronutrient targets?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Alcohol provides 7.0 kcal per gram of pure ethanol, as modeled in our{" "}
                <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  alcohol unit calculator
                </Link>. Because ethanol cannot be stored, hepatic tissue prioritizes clearing ethanol, suppressing peripheral fat oxidation by up to 73%.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do commercial food manufacturers verify nutrition labels?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Commercial food companies calculate batch recipe nutrition using scaled ingredient densities with our{" "}
                <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  cooking conversion calculator
                </Link>{" "}
                and verify compliance with FDA Nutrition Facts panel regulations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do restaurant kitchen portion costs align with healthy macro planning?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                High-protein lean meats and fresh vegetables carry higher wholesale costs than refined starches. Chefs model these ingredient trade-offs with our{" "}
                food cost analysis protocols{" "}
                to offer nutritious meals while maintaining viable restaurant gross margins.
              </p>
            </div>
          </div>

          <h2>Authoritative Dietary Standards & Clinical Nutrition Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Academies of Sciences, Engineering, and Medicine (NAM):</strong> Dietary Reference Intakes (DRIs) for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, and Protein.
            </li>
            <li>
              <strong>USDA & Department of Health and Human Services (HHS):</strong> Dietary Guidelines for Americans 2020-2025.
            </li>
            <li>
              <strong>Food and Agriculture Organization (FAO / WHO):</strong> Food energy - methods of analysis and conversion factors (Atwater system guidelines).
            </li>
            <li>
              <strong>International Society of Sports Nutrition (ISSN):</strong> Protein and exercise position stand regarding dietary timing and anabolic thresholds.
            </li>
          </ul>
        </>
      }
    >
      <NutritionCalculatorComponent />
    </CalcPage>
  );
}
