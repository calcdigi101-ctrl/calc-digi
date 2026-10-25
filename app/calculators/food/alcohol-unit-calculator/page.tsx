import type { Metadata } from "next";
import Link from "next/link";
import AlcoholUnitCalculatorComponent from "@/components/calcs/food/alcohol-unit-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlcoholMetabolismEliminationCurveChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/alcohol-unit-calculator";
const TITLE = "Alcohol Unit Calculator | Standard Drinks, Pure Ethanol & BAC Clearance";
const DESCRIPTION =
  "Calculate UK alcohol units, US standard drinks, pure ethanol grams, caloric load, and hepatic metabolism clearance time across beer, wine, and spirits.";

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
  { href: "/calculators/food/coffee-caffeine-calculator", icon: "☕", name: "Coffee Caffeine Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
];

export default function AlcoholUnitCalculatorPage() {
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
              Quick Summary & Alcohol Metrology Formula
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              One United Kingdom alcohol unit represents exactly 10 milliliters (or 7.89 grams) of pure ethyl alcohol. In contrast, one United States standard drink contains 14.0 grams (17.7 ml) of pure ethanol. For dietary energy budgeting, ethanol yields 7.0 kilocalories per gram, which you can track alongside your daily metabolic targets using our{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium underline hover:text-amber-900">
                nutrition calculator
              </Link>{" "}
              and physical exercise expenditure in the{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium underline hover:text-amber-900">
                calorie burn calculator
              </Link>.
            </p>
          </div>

          <h2>Pharmacokinetics of Ethanol Metabolism & Blood Elimination Kinetics</h2>
          <AlcoholMetabolismEliminationCurveChart />
          <p>
            Ethanol metabolism in the human organism follows zero-order elimination kinetics at blood alcohol concentrations (BAC) exceeding minimal physiological thresholds. Unlike the first-order clearance mechanics observed in our{" "}
            <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              coffee caffeine calculator
            </Link>{" "}
            where drug half-life dictates a constant percentage elimination rate, hepatic alcohol dehydrogenase (ADH) enzymes operate at near-total substrate saturation. Consequently, healthy adult human hepatic tissue metabolizes absolute alcohol at a fixed stoichiometric rate of approximately 0.015g% BAC per hour, equating to 7 to 10 grams of ethanol or roughly 1.0 UK unit per 60 minutes.
          </p>
          <p>
            The fundamental conversion between beverage liquid volume, nominal percentage concentration, and absolute ethanol mass depends upon the physical density of pure alcohol. Ethanol exhibits a specific gravity of 0.78924 g/cm3 at 20 degrees Celsius. In industrial and regulatory food science, drinks are measured by alcohol by volume (ABV), representing volume percentages of ethanol dissolved in aqueous solutions:
          </p>

          <Formula>
            {"\text{UK Units} = \frac{\text{Volume (ml)} \times \text{ABV (\%)}}{1{,}000}"}
          </Formula>

          <Formula>
            {"\text{Pure Ethanol Mass (g)} = \text{Volume (ml)} \times \left(\frac{\text{ABV}}{100}\right) \times 0.78924\,\text{g/ml}"}
          </Formula>

          <Formula>
            {"\text{US Standard Drinks} = \frac{\text{Pure Ethanol Mass (g)}}{14.0\,\text{g}}"}
          </Formula>

          <Formula>
            {"\text{Metabolic Energy Load (kcal)} = \text{Pure Ethanol Mass (g)} \times 7.0\,\text{kcal/g} + \text{Residual Carbohydrate Calories}"}
          </Formula>

          <h2>International Regulatory Thresholds & Beverage Unit Density Matrix</h2>
          <p>
            National public health authorities maintain divergent definitions of a standard alcoholic beverage unit. Understanding volumetric equivalencies is essential when converting serving sizes in commercial culinary recipes, brewing formulations, and bar operations:
          </p>

          <DataTable
            head={[
              "Beverage Classification",
              "Standard Serving (ml)",
              "Nominal ABV (%)",
              "UK Units",
              "US Standard Drinks",
              "Pure Ethanol (g)",
              "Alcoholic Energy (kcal)",
            ]}
            rows={[
              ["Standard Commercial Lager", "568 ml (1 Imperial Pint)", "4.5%", "2.56", "1.44", "20.18 g", "141 kcal"],
              ["Craft India Pale Ale (IPA)", "440 ml (Can)", "6.5%", "2.86", "1.61", "22.57 g", "158 kcal"],
              ["Double West Coast IPA", "473 ml (1 US Pint)", "8.2%", "3.88", "2.18", "30.61 g", "214 kcal"],
              ["Dry Red Table Wine (Cabernet)", "175 ml (Medium Glass)", "13.5%", "2.36", "1.33", "18.64 g", "131 kcal"],
              ["Full Bottle Table Wine", "750 ml (Standard Bottle)", "13.0%", "9.75", "5.49", "76.95 g", "539 kcal"],
              ["Fortified Port Wine", "100 ml (Dessert Snifter)", "20.0%", "2.00", "1.13", "15.78 g", "111 kcal"],
              ["Distilled Spirits (Vodka / Whiskey)", "50 ml (Double Pour)", "40.0%", "2.00", "1.13", "15.78 g", "111 kcal"],
              ["Cask-Strength Single Malt Scotch", "35 ml (Single Measure)", "58.0%", "2.03", "1.14", "16.02 g", "112 kcal"],
            ]}
          />

          <h2>Worked Analytical Case Study: Metabolic Clearance & Caloric Budgeting</h2>
          <p>
            Consider a social hospitality scenario where an individual consumes two pints of craft pale ale (568 ml each at 5.2% ABV) followed by a 175 ml glass of red wine (13.5% ABV) during a dinner meal. To budget operational energy alongside culinary planning with our{" "}
            <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              recipe scaler
            </Link>{" "}
            and{" "}
            <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              food cost calculator
            </Link>, we derive total units, ethanol grams, and biological clearance duration:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Pint 1 and Pint 2 Craft Ale:</strong> Volume = 1,136 ml total at 5.2% ABV.
              <br />
              <Formula>
                {"\text{Units}_{\text{beer}} = \frac{1{,}136 \times 5.2}{1{,}000} = 5.907\,\text{UK Units}"}
              </Formula>
              Pure Ethanol = 1,136 ml * 0.052 * 0.78924 g/ml = 46.62 grams.
            </li>
            <li>
              <strong>Glass of Table Wine:</strong> Volume = 175 ml at 13.5% ABV.
              <br />
              <Formula>
                {"\text{Units}_{\text{wine}} = \frac{175 \times 13.5}{1{,}000} = 2.363\,\text{UK Units}"}
              </Formula>
              Pure Ethanol = 175 ml * 0.135 * 0.78924 g/ml = 18.65 grams.
            </li>
            <li>
              <strong>Cumulative Ethanol Exposure:</strong> Total units = 5.907 + 2.363 = 8.27 UK units. Pure alcohol mass = 46.62 + 18.65 = 65.27 grams of absolute ethanol, representing 4.66 US standard drinks.
            </li>
            <li>
              <strong>Ethanol Caloric Load:</strong> Direct alcohol energy = 65.27 g * 7.0 kcal/g = 456.9 kcal (excluding unfermented wort carbohydrates).
            </li>
            <li>
              <strong>Hepatic Clearance Timeline:</strong> Based on the basal clearance rate of 1.0 unit per hour, complete systemic clearance requires approximately 8.3 hours from the cessation of gastrointestinal absorption.
            </li>
          </ul>

          <h2>Biochemical Pathways & The Energy Density Paradox</h2>
          <p>
            Unlike macronutrients like starches, complex carbohydrates, and dietary lipids analyzed in our{" "}
            <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking conversion calculator
            </Link>, ethanol cannot be sequestered into glycogen storage polymers or adipose triglycerides for gradual mobilization. The human biochemical apparatus treats circulating acetaldehyde as a toxic xenobiotic intermediate.
          </p>
          <p>
            In hepatic cytosol, the alcohol dehydrogenase enzyme family converts ethanol into acetaldehyde, reducing nicotinamide adenine dinucleotide (NAD+) to NADH. Subsequently, mitochondrial aldehyde dehydrogenase (ALDH2) metabolizes acetaldehyde into acetate. This metabolic cascade profoundly shifts the intracellular NADH/NAD+ ratio, suppressing gluconeogenesis, downregulating Krebs cycle beta-oxidation, and prioritizing ethanol oxidation over dietary carbohydrates and fatty acids.

          <p>
            When circulating blood alcohol concentrations surge during heavy single-session consumption, the secondary Microsomal Ethanol Oxidizing System (MEOS), mediated by cytochrome P450 2E1 (CYP2E1), becomes actively recruited. Unlike cytosolic ADH pathways that generate usable metabolic intermediates, the inducible CYP2E1 enzyme system consumes reduced nicotinamide adenine dinucleotide phosphate (NADPH) and molecular oxygen without synthesizing adenosine triphosphate. Consequently, a substantial fraction of ethanol chemical bond enthalpy is dissipated directly as futile metabolic heat, explaining the pronounced cutaneous flushing and thermogenic inefficiency characteristic of acute heavy alcohol consumption.
          </p>
          </p>

          <h2>Operational Pitfalls, Glassware Metrology & Gastric Emptying Dynamics</h2>
          <p>
            Precise calculation of alcoholic units frequently encounters real-world confounding variables that distort nominal consumption calculations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Glassware Geometry Bias:</strong> Fluted or curved pint glasses cause subjective over-pouring by up to 22% compared to calibrated straight-sided vessels.
            </li>
            <li>
              <strong>Post-Prandial Gastric Retention:</strong> Co-ingestion of high-lipid foods, such as balanced baked dishes scaled using our{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                baking substitution calculator
              </Link>, decelerates gastric emptying into the duodenum where 80% of alcohol uptake occurs, attenuating peak BAC amplitude by 30% to 50%.
            </li>
            <li>
              <strong>Thermal Evaporation in Culinary Flambes:</strong> Contrary to culinary myth, wine and spirits simmered in sauces retain 5% to 85% of their initial alcohol content depending on pan surface geometry and simmer duration.
            </li>
            <li>
              <strong>Gratuity & Hospitality Verification:</strong> In dining establishments, accurate accounting of drink counts helps manage hospitality bill totals calculated via our{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What constitutes one UK alcohol unit versus a standard drink in the United States?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A UK alcohol unit is defined as exactly 10 milliliters (7.89 grams) of 100% pure ethanol. In contrast, the US National Institute on Alcohol Abuse and Alcoholism (NIAAA) defines a standard drink as 14.0 grams (17.7 ml) of pure ethanol. Consequently, 1 US standard drink equals approximately 1.77 UK units.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does physical exertion or coffee consumption accelerate ethanol clearance?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                No. Because hepatic alcohol dehydrogenase operates under zero-order kinetic enzyme saturation, running, perspiration, cold showers, or caffeine intake verified with our{" "}
                <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  coffee caffeine calculator
                </Link>{" "}
                cannot accelerate enzymatic elimination. Only biological time allows liver tissue to clear circulating ethanol at roughly 0.015g% per hour.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How many calories does alcohol provide compared to protein, carbs, and fats?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Pure ethanol provides 7.0 kilocalories per gram, placing its energetic density second only to pure fat (9 kcal/g), and significantly higher than protein or carbohydrates (4 kcal/g each), as demonstrated in our{" "}
                <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  nutrition calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does body mass and total body water impact blood alcohol concentration?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Ethanol distributes water-solubly throughout total body water (TBW). Because adipose tissue has low water content, leaner individuals exhibit a larger volume of distribution (Vd), yielding a lower peak BAC for an identical gram dose of alcohol compared to individuals with higher body fat percentages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does cooking meat or stew with wine completely eliminate the alcohol content?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                No. Research conducted by the USDA Agricultural Research Service demonstrated that boiling or baking alcohol for 15 minutes retains 40% of the alcohol, and even after 2.5 hours of braising meat timed with our{" "}
                <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  cooking time calculator
                </Link>, approximately 5% of the initial ethanol remains bound within the culinary emulsion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does alcohol consumption affect resting metabolic rate and physical endurance?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Ethanol impairs muscle glycogen resynthesis and disrupts nocturnal growth hormone secretion by up to 70%. When tracking athletic training or energy burn with our{" "}
                <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  calorie burn calculator
                </Link>, acute alcohol consumption inhibits peripheral lipid oxidation, depressing net athletic training adaptation.
              </p>
            </div>
          </div>

          <h2>Authoritative Clinical Health Standards & Metrology Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>World Health Organization (WHO):</strong> Global Information System on Alcohol and Health (GISAH) international beverage metrology standards.
            </li>
            <li>
              <strong>UK National Health Service (NHS Digital):</strong> Guidelines for lower-risk alcohol consumption thresholds and hepatic clearance models.
            </li>
            <li>
              <strong>US National Institute on Alcohol Abuse and Alcoholism (NIAAA):</strong> Standard drink definition and Widmark pharmacokinetic blood alcohol concentration formulae.
            </li>
            <li>
              <strong>USDA Agricultural Research Service:</strong> Nutrient Data Laboratory retention tables for ethyl alcohol retention across cooking and culinary methods.
            </li>
          </ul>
        </>
      }
    >
      <AlcoholUnitCalculatorComponent />
    </CalcPage>
  );
}
