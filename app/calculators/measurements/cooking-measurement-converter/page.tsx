import type { Metadata } from "next";
import Link from "next/link";
import CookingMeasurementConverterComponent from "@/components/calcs/measurements/cooking-measurement-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CookingVolumeCulinaryProportionsChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/cooking-measurement-converter";
const TITLE = "Cooking Measurement Converter | Cups, Tablespoons, Teaspoons & Ounces";
const DESCRIPTION =
  "Convert culinary cups, tablespoons, teaspoons, fluid ounces, grams, and milliliters with culinary density scaling and interactive recipe ratio charts.";

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
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/measurements/temperature-converter", icon: "🌡️", name: "Temperature Converter" },
  { href: "/calculators/physics/density-calculator", icon: "🧱", name: "Density Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/pages/measurements", icon: "🍳", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "How many teaspoons are in one standard tablespoon?",
    a: "There are exactly 3 level teaspoons in 1 standard tablespoon across US, British, and Canadian culinary traditions. In the US customary system, 1 tablespoon equals 0.5 fluid ounces (~14.79 mL), while an Australian tablespoon uniquely equals 4 teaspoons (20 mL).",
  },
  {
    q: "Why does a cup of all-purpose flour weigh differently than a cup of granulated sugar?",
    a: "Volume measures spatial capacity, while culinary weight depends on ingredient bulk density. Granulated white sugar has a crystalline density of ~0.85 g/mL, causing a level US cup (236.6 mL) to weigh approximately 200 grams. All-purpose flour is porous and aerated with a bulk density of ~0.53 g/mL, causing a standard cup to weigh only ~120 to 125 grams.",
  },
  {
    q: "What is the difference between a liquid measuring cup and a dry measuring cup?",
    a: "Liquid measuring cups feature a pour spout and headspace graduation markings above the top measurement line, allowing cooks to transport liquids without spilling. Dry measuring cups are designed to be filled to the brim and leveled off flat with a straight edge. Using dry cups for liquids or scooping packed flour directly with dry cups introduces 15% to 25% recipe errors.",
  },
  {
    q: "How many tablespoons are in one stick of American butter?",
    a: "In the United States, commercial butter is packaged in standard half-pound or one-pound cartons containing individually wrapped 4-ounce (1/4 pound) sticks. One standard stick of butter equals exactly 8 tablespoons (1/2 cup, 4 fluid ounces, or approximately 113.4 grams).",
  },
];

export default function CookingMeasurementConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Culinary Guidance:</strong> Recipe conversions translate between domestic volumetric kitchen units and scientific metric mass. In commercial gastronomy and home baking, cross-reference liquid measures in our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> and calculate exact ingredient masses in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Culinary Metrology: Domestic Volumes & Precision Baking Chemistry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Cooking and pastry baking represent practical applied biochemistry. While savory cooking often tolerates heuristic approximations (a pinch of salt, a dash of olive oil), pastry baking relies on exact chemical stoichiometries between flour proteins, fats, leavening agents (sodium bicarbonate), and moisture. In domestic kitchens, volumetric spoons and cups historically provided rapid convenience without requiring expensive mechanical balances.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, international recipe sharing across the modern digital web introduces severe culinary confusion. American recipes call for cups and sticks of butter, British recipes list Imperial fluid ounces and grams, European recipes utilize metric deciliters (dL) and grams, and Australian recipes employ a unique 20 mL tablespoon. Understanding these regional variations is essential for consistent culinary success.
          </p>

          <CookingVolumeCulinaryProportionsChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation: Volume-to-Mass Ingredient Density
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Converting a volumetric kitchen measure (cups, tablespoons) to physical mass (grams, ounces) requires incorporating the specific bulk ingredient packing density ρ_bulk:
          </p>
          <Formula>{"m_{\\text{grams}} = V_{\\text{mL}} \\times \\rho_{\\text{bulk}} = (V_{\\text{cups}} \\times 236.588) \\times \\rho_{\\text{bulk}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where 1 standard US customary cup equals 236.588 milliliters. The standardized bulk densities for common baking ingredients are:
          </p>
          <Formula>{"\\rho_{\\text{water}} = 1.00 \\text{ g/mL}, \\quad \\rho_{\\text{sugar}} \\approx 0.85 \\text{ g/mL}, \\quad \\rho_{\\text{flour (sifted)}} \\approx 0.53 \\text{ g/mL}"}</Formula>
          <Formula>{"\\rho_{\\text{butter}} \\approx 0.911 \\text{ g/mL}, \\quad \\rho_{\\text{honey}} \\approx 1.42 \\text{ g/mL}, \\quad \\rho_{\\text{olive oil}} \\approx 0.92 \\text{ g/mL}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To evaluate temperature scaling for oven baking between Fahrenheit and Celsius, cross-reference our <Link href="/calculators/measurements/temperature-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">temperature converter</Link> and calculate ingredient packing ratios in our <Link href="/calculators/physics/density-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">density calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Culinary Measurement Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact volume conversions across domestic spoons, cups, fluid ounces, and metric milliliters:
          </p>
          <DataTable
            head={["Culinary Measure", "Standard Teaspoons", "Standard Tablespoons", "Fluid Ounces (fl oz)", "Milliliters (mL)"]}
            rows={[
              ["Pinch / Dash", "1/8 to 1/16 tsp", "1/24 to 1/48 tbsp", "0.01 to 0.02 fl oz", "~0.3 to 0.6 mL"],
              ["Teaspoon (US tsp)", "1 tsp", "1/3 tbsp", "0.1667 fl oz", "4.929 mL"],
              ["Dessertspoon (UK)", "2 tsp", "2/3 tbsp", "0.3333 fl oz", "9.858 mL"],
              ["Tablespoon (US tbsp)", "3 tsp", "1 tbsp", "0.5000 fl oz", "14.787 mL"],
              ["Tablespoon (Australian)", "4 tsp", "1.333 tbsp", "0.6763 fl oz", "20.000 mL"],
              ["Fluid Ounce (US fl oz)", "6 tsp", "2 tbsp", "1.0000 fl oz", "29.574 mL"],
              ["Quarter Cup (1/4 cup)", "12 tsp", "4 tbsp", "2.0000 fl oz", "59.147 mL"],
              ["Third Cup (1/3 cup)", "16 tsp", "5.333 tbsp", "2.6667 fl oz", "78.863 mL"],
              ["Half Cup (1/2 cup)", "24 tsp", "8 tbsp (1 stick butter)", "4.0000 fl oz", "118.294 mL"],
              ["Full Cup (US Customary)", "48 tsp", "16 tbsp", "8.0000 fl oz", "236.588 mL"],
              ["Metric Cup (AU / NZ)", "50.7 tsp", "16.9 tbsp", "8.4535 fl oz", "250.000 mL"],
              ["Pint (US Liquid)", "96 tsp", "32 tbsp", "16.0000 fl oz", "473.176 mL"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Bakery Scaling & Baker&apos;s Percentages
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a commercial artisan sourdough bakery scaling an artisanal bread recipe from an individual 1-loaf home recipe calling for 3 cups of bread flour, 1.25 cups of water, 1.5 teaspoons of fine salt, and 1 teaspoon of active dry yeast into an industrial 250-loaf commercial batch:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Home Recipe to Metric Mass):</strong> 3 cups bread flour (125 g/cup) = 375 grams. 1.25 cups water (236.6 mL/cup × 1.0 g/mL) = 295.7 grams. 1.5 tsp salt (~5.7 g/tsp) = 8.55 grams. 1 tsp dry yeast = 3.15 grams. Total flour base = 375 g.</li>
            <li><strong>Step 2 (Calculate Professional Baker&apos;s Percentages):</strong> Flour = 100%. Water hydration = (295.7 ÷ 375) × 100 = 78.85%. Salt = (8.55 ÷ 375) × 100 = 2.28%. Yeast = (3.15 ÷ 375) × 100 = 0.84%.</li>
            <li><strong>Step 3 (Scale to 250 Loaves):</strong> Target dough mass for 250 loaves at 682.4 g dough per loaf = 170.6 kg of dough. Total flour needed = 170.6 kg ÷ 1.8197 = 93.75 kg. Water needed = 93.75 × 0.7885 = 73.92 kg. Salt = 93.75 × 0.0228 = 2.14 kg. Yeast = 93.75 × 0.0084 = 0.79 kg.</li>
            <li><strong>Step 4 (Verify Production Ingredients):</strong> Flour mass can be converted to commercial sacks in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link> and ingredient ratios verified in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Science of Leavening Agents: Chemical Baking Powder vs Soda
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In culinary chemistry, chemical leaveners release gaseous carbon dioxide (CO2) micro-bubbles during mixing and baking, creating light, porous crumb structures. Baking soda (pure sodium bicarbonate, NaHCO3) requires an acidic ingredient (buttermilk, yogurt, lemon juice, or brown sugar) to react: NaHCO3 + H⁺ → Na⁺ + H2O + CO2.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Baking powder, conversely, is a complete leavening system containing sodium bicarbonate blended with dry acidifying salts (such as monocalcium phosphate and sodium aluminum sulfate) and cornstarch buffer. Most commercial brands are &apos;double-acting&apos;: releasing an initial burst of CO2 upon liquid hydration at room temperature, followed by a second major gas release when heated above 60°C (140°F) in the oven. Because baking soda is roughly three to four times more potent than baking powder, substituting them requires precise volumetric recalculation.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Sugar Syrups & Confectionery Temperature Stages
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In candy making and sugar confectionery, sugar syrup concentration is monitored via precise temperature boiling points rather than volumetric measures. As water boils off from a sucrose solution, dissolved sugar concentration increases, elevating the boiling point:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Thread Stage (110°C to 112°C / 230°F to 235°F):</strong> 80% sugar; forms loose threads in cold water, used for glazes and fruit liqueurs.</li>
            <li><strong>Soft Ball Stage (116°C to 120°C / 240°F to 248°F):</strong> 85% sugar; forms a soft, malleable ball in cold water, essential for fudge and Italian meringue.</li>
            <li><strong>Firm Ball Stage (121°C to 129°C / 250°F to 265°F):</strong> 87% sugar; used for caramels and nougats.</li>
            <li><strong>Hard Crack Stage (149°C to 154°C / 300°F to 310°F):</strong> 99% sugar; separates into hard, brittle threads, essential for toffee and lollipops.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Home Recipe Halving, Doubling & International Cooking
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In domestic cooking, scaling recipes up or down is one of the most frequent kitchen tasks. Halving a recipe calling for 1/3 cup requires measuring 2 tablespoons plus 2 teaspoons (or exactly 39.4 mL). When following European cookbook recipes that list butter in grams or milk in deciliters, converting directly to cups and tablespoons prevents recipe failures.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For academic coursework and general mathematical analysis, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and track nutritional ratios in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit our comprehensive <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <CookingMeasurementConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Colloid Food Chemistry: Emulsion Phase Volume Fractions (Oil-in-Water)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In molecular gastronomy and professional culinary sauce preparation, emulsions represent thermodynamic mixtures of two immiscible liquids (such as vegetable oil and water-based vinegar or egg yolk) where one liquid is dispersed as microscopic droplets throughout the continuous phase. Classic culinary emulsions include mayonnaise, hollandaise, and vinaigrettes.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The rheological viscosity and structural stability of an emulsion depend strictly on the dispersed phase volume fraction ϕ = V_dispersed / V_total. When oil volume fraction ϕ is below 0.50, the sauce flows as a Newtonian liquid. As oil is gradually whisked into the mixture and droplet packing exceeds the dense random packing threshold (ϕ ≈ 0.64) toward the maximum close packing limit of spheres (ϕ_max = 0.74), droplet crowding creates immense plastic yield stress, transforming liquid oil and vinegar into a stiff, spreadable mayonnaise. Exceeding ϕ_max without sufficient continuous water causes catastrophic phase inversion, &apos;breaking&apos; the sauce into an oily separation.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Starch Gelatinization & Amylose Retrogradation Dynamics in Pastry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In pastry creams, custard puddings, and bread doughs, texture is governed by starch gelatinization. Cereal starches consist of two glucose polymers: linear amylose and branched amylopectin organized into semicrystalline microscopic granules. When starch granules are suspended in water and heated past their characteristic gelatinization temperature range (typically 60°C to 75°C / 140°F to 167°F), water molecules penetrate the granules, breaking intermolecular hydrogen bonds and causing granules to swell irreversibly to over thirty times their initial dry volume.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Solubilized amylose chains leach out into the surrounding liquid, forming a continuous three-dimensional viscoelastic gel network that thickens pastry creams. Upon cooling and storage, these amylose molecules slowly realign into rigid crystalline matrices—a process termed retrogradation—which causes bread staling and syneresis (weeping of liquid) in improperly balanced starch puddings.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermal Conduction & Heat Penetration in Sous-Vide Culinary Cooking
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern culinary science and precision sous-vide cooking, foods are vacuum-sealed in food-grade plastic pouches and immersed in circulating water baths maintained at exact temperatures within ±0.1°C. Heat penetration into proteins is governed by Fourier&apos;s second law of transient thermal conduction: ∂T/∂t = α × ∇²T, where α is the food&apos;s thermal diffusivity (typically ~1.4 × 10⁻⁷ m²/s for meat).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because heat conduction time scales with the square of meat thickness (t ∝ d²), doubling the thickness of a steak from 2.5 cm to 5.0 cm quadruples required cooking immersion time from 1 hour to 4 hours. Precise core temperature conversion between Fahrenheit and Celsius ensures complete food-safe pasteurization against Salmonella and Listeria according to USDA pathogen lethality tables without overcooking delicate myofibrillar proteins.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In artisanal chocolate confectionery and tempering, cocoa butter polymorphism dictates snap and gloss. Pastry chefs carefully temper melted chocolate through precise cooling and re-heating cycles to crystallize stable Form V beta crystals, preventing fat bloom and dull surface finishes.
          </p>

    </CalcPage>
  );
}
