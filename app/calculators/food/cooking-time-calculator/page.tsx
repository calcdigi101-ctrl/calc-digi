import type { Metadata } from "next";
import Link from "next/link";
import CookingTimeCalculatorComponent from "@/components/calcs/food/cooking-time-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MeatThermalInternalTemperatureCurveChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/cooking-time-calculator";
const TITLE = "Cooking Time Calculator | Meat Roasting, Thermal Curves & Resting";
const DESCRIPTION =
  "Calculate roasting and braising duration by weight, safe USDA internal core temperatures, convection adjustments, and carryover thermal rest curves.";

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
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
];

export default function CookingTimeCalculatorPage() {
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
              Culinary Physics Summary: Core Lethality & Carryover Coasting
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Safe meat roasting requires achieving USDA microbiological pathogen lethality (such as a 7-log reduction in Salmonella or E. coli) at the innermost geometric core while managing post-oven carryover thermal rise. Removing a roast 5°F to 10°F below the target temperature allows heat trapped in the outer muscle mantle to conduct inward during resting. You can scale portion sizes with our{" "}
              <Link href="/calculators/food/recipe-scaler" className="font-medium underline hover:text-amber-900">
                recipe scaler
              </Link>{" "}
              and calculate prime dish margins using our{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium underline hover:text-amber-900">
                food cost calculator
              </Link>.
            </p>
          </div>

          <h2>Thermal Conduction Kinetics & The Fourier Heat Transfer Mechanism</h2>
          <MeatThermalInternalTemperatureCurveChart />
          <p>
            Culinary roasting is an applied problem in transient conductive heat transfer governed by Fourier&apos;s law of thermal conduction. In an oven environment, convective radiant energy heats the exterior surface of the protein cut. Because animal muscle tissue consists primarily of water (75%), myofibrillar protein (20%), and intramuscular lipids (5%), muscle meat possesses a relatively low thermal conductivity coefficient (k approx 0.48 W/m·K).
          </p>
          <p>
            Heat migrates inward along a steep thermal gradient from the hot outer boundary toward the cold center. The duration required for the geometric thermal core to reach target doneness is a function of muscle thickness, cut mass, bone structure, and ambient oven temperature. Volume conversions for marinades can be verified in our{" "}
            <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking conversion calculator
            </Link>:
          </p>

          <Formula>
            {"q = -k \nabla T = -k \left(\frac{\partial T}{\partial x}\right)"}
          </Formula>

          <Formula>
            {"\text{Estimated Roasting Time (min)} = \left(\text{Weight (lbs)} \times \text{Rate}_{\text{min/lb}} \times F_{\text{bone}} + \text{Buffer}_{\text{min}}\right) \times \left(\frac{350}{T_{\text{oven}}}\\right)^{0.85}"}
          </Formula>

          <Formula>
            {"T_{\text{pull}} = T_{\text{safe target}} - \Delta T_{\text{carryover}}"}
          </Formula>

          <Formula>
            {"\Delta T_{\text{carryover}} \approx \alpha \times (T_{\text{surface}} - T_{\text{core}}) \times \left(\frac{\text{Mass}}{\text{Surface Area}}\right)"}
          </Formula>

          <h2>Comprehensive USDA Core Temperature & Roasting Benchmark Matrix</h2>
          <p>
            The reference matrix below outlines empirical roasting durations per pound, mandatory USDA food safety core internal temperatures, and observed carryover temperature surges during post-oven resting:
          </p>

          <DataTable
            head={[
              "Protein Cut & Doneness Target",
              "Oven Temp (°F / °C)",
              "Roast Rate (min/lb)",
              "Pull Temp (°F)",
              "Target Safe Core (°F)",
              "Carryover Surge",
              "Mandatory Rest Duration",
            ]}
            rows={[
              ["Whole Chicken (Roaster)", "350°F / 175°C", "20 min/lb + 20m", "160°F (71°C)", "165°F (74°C)", "+5°F", "15 minutes"],
              ["Boneless Chicken Breast", "375°F / 190°C", "25 min/lb", "160°F (71°C)", "165°F (74°C)", "+5°F", "8 minutes"],
              ["Whole Turkey (Unstuffed)", "325°F / 165°C", "14 min/lb", "155°F (68°C)", "165°F (74°C)", "+10°F", "25 - 30 minutes"],
              ["Whole Turkey (Stuffed)", "325°F / 165°C", "17 min/lb + 30m", "155°F (68°C)", "165°F (74°C)", "+10°F", "30 minutes"],
              ["Beef Ribeye Roast (Medium-Rare)", "325°F / 165°C", "20 min/lb", "127°F (53°C)", "135°F (57°C)", "+8°F", "18 minutes"],
              ["Beef Tenderloin Roast (Medium)", "350°F / 175°C", "24 min/lb", "137°F (58°C)", "145°F (63°C)", "+8°F", "15 minutes"],
              ["Pork Loin Roast (Tender/Juicy)", "350°F / 175°C", "22 min/lb", "139°F (59°C)", "145°F (63°C)", "+6°F", "12 minutes"],
              ["Bone-In Leg of Lamb (Medium)", "325°F / 165°C", "22 min/lb + 10m", "138°F (59°C)", "145°F (63°C)", "+7°F", "15 minutes"],
            ]}
          />

          <h2>Worked Culinary Case Study: Roasting a 14-Pound Holiday Turkey</h2>
          <p>
            Consider a family feast or banquet service where the executive chef roasts a 14.0 lb unstuffed whole turkey in a calibrated 325°F (165°C) oven. Balancing the meal with pastry preparations from our{" "}
            <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              baking substitution calculator
            </Link>{" "}
            and service tip planning via the{" "}
            <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              tip calculator
            </Link>, we calculate active roasting time, pull temperature, and resting equilibration:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Active Roasting Calculation:</strong> At a standard rate of 14 minutes per pound plus a 15-minute thermal buffer:
              <Formula>
                {"\text{Active Time} = 14\,\text{lbs} \times 14\,\text{min/lb} + 15\,\text{min} = 196 + 15 = 211\,\text{minutes} = 3\,\text{hours } 31\,\text{minutes}"}
              </Formula>
            </li>
            <li>
              <strong>Oven Temperature Adjustment:</strong> The baseline standard assumes 350°F; roasting at 325°F applies a thermal adjustment factor:
              <Formula>
                {"\text{Adjustment} = \left(\frac{350}{325}\right)^{0.85} = (1.0769)^{0.85} = 1.065"}
              </Formula>
              Adjusted roasting duration = 211 min * 1.065 = 225 minutes (3 hours 45 minutes).
            </li>
            <li>
              <strong>Target Doneness & Pull Threshold:</strong> The final USDA safe endpoint in the innermost thigh muscle is 165°F (74°C). Because a 14 lb bird retains substantial residual thermal momentum, the chef removes the bird at 155°F (68°C).
            </li>
            <li>
              <strong>Carryover Resting Phase:</strong> Over 25 minutes of loose foil tenting, kinetic energy equilibrates throughout the carcass, driving core temperature up exactly +10°F to 165°F while collagen gelation allows intracellular juices to settle.
            </li>
            <li>
              <strong>Metabolic Energy Allocation:</strong> The kitchen team monitors the high protein content of the roasted bird with our{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                nutrition calculator
              </Link>{" "}
              and calculates athletic fuel recovery in the{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>.
            </li>
          </ul>

          <h2>Myofibrillar Protein Denaturation & Collagen Hydrolysis Dynamics</h2>
          <p>
            Understanding meat cooking requires examining the thermal denaturation profiles of muscle proteins. Myosin begins denaturing at 104°F (40°C), contracting cross-bridges and turning the meat translucent pink. At 140°F (60°C), myoglobin oxidizes to brown hemichrome, and actin filaments denature, squeezing intracellular water out of muscle fibers into interstitial voids.
          </p>
          <p>
            Tough connective tissue consists of triple-helix collagen fibers. While collagen remains rubbery at low temperatures, extended exposure above 160°F (71°C) hydrolyzes rigid collagen into gelatinous, moisture-retaining gelatin. In braising and smoking, holding meat between 180°F and 205°F for several hours transforms fibrous brisket and pork shoulder into tender delicacies.

          <p>
            Culinary safety does not depend solely on achieving an instantaneous peak temperature. Under USDA FSIS pasteurization standards (defined by thermal death time D-values and z-values), bacterial pathogen destruction is an integrated function of both core temperature and dwell duration. While poultry requires an instantaneous internal temperature of 165°F (74°C) for immediate 7-log Salmonella reduction, holding the core at 150°F (65.5°C) for exactly 2.8 minutes achieves the exact same microbiological safety margin while preserving up to 35% more intra-muscular moisture.
          </p>
          </p>

          <h2>Operational Pitfalls, Food Safety & Thermometer Insertion Protocol</h2>
          <p>
            Avoid these critical hazards when timing and executing meat cookery:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Thermometer Bone Proximity Error:</strong> Bone conducts heat up to 25% faster than water-dense muscle tissue. Resting a probe against a bone produces a falsely elevated reading, causing premature oven removal while the surrounding meat remains dangerously undercooked.
            </li>
            <li>
              <strong>Carving Immediately Without Resting:</strong> Slicing hot meat immediately causes muscle fibers to expel up to 40% of their retained juices across the cutting board. Resting allows gelatin and fluid viscosity to increase, redistributing moisture evenly throughout the cut.
            </li>
            <li>
              <strong>The Stuffed Poultry Thermal Trap:</strong> Dense bread stuffing insulates the cavity. In unstuffed poultry, hot air circulates through the interior cavity; in stuffed birds, heat must conduct through the entire volume of bread, requiring 30 to 45 additional minutes.
            </li>
            <li>
              <strong>Beverage & Pairing Integration:</strong> Wine and beverage pairing service is coordinated alongside resting times, with guest intake tracked in our{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>{" "}
              and post-meal espresso service in the{" "}
              <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                coffee caffeine calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does meat internal temperature continue to rise after removal from the oven?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                This physical phenomenon is called carryover cooking. The exterior layers of the roast are significantly hotter (often 250°F to 325°F) than the interior core. When removed from the heat source, thermal conduction continues moving heat from the scorching outer mantle into the cooler center until thermal equilibrium is established.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the minimum safe internal temperature for whole chicken and turkey?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The USDA Food Safety and Inspection Service (FSIS) mandates a minimum core internal temperature of 165°F (74°C) measured in the thickest part of the breast and the deepest part of the thigh, away from bone or gristle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Can pork be safely consumed at medium doneness (145°F)?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes. In 2011, the USDA officially lowered the recommended safe internal temperature for whole cuts of pork from 160°F to 145°F (63°C) with a mandatory 3-minute resting period, eliminating dry pork while ensuring complete eradication of Trichinella spiralis parasites.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does ground beef require a higher internal temperature than whole steak?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Pathogenic bacteria (such as E. coli) reside primarily on the exterior surface of muscle cuts. Searing a whole steak sterilizes the surface even if the center is rare (125°F). In ground meat, the grinding process disperses surface bacteria throughout the entire product, requiring an internal temperature of 160°F (71°C) throughout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do commercial banquet operations scale multi-roast production schedules?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Commercial catering kitchens calculate staggered oven loading times and total roast yields using our{" "}
                <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  recipe scaler
                </Link>{" "}
                to ensure proteins finish roasting precisely when service begins.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does meat yield loss during cooking affect restaurant plate margins?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Roasts experience 15% to 30% moisture and fat evaporative shrinkage during cooking. Professional chefs use our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>{" "}
                to factor cooking shrinkage into true edible portion (EP) plate pricing.
              </p>
            </div>
          </div>

          <h2>Authoritative Food Safety Standards & Culinary Science Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>USDA Food Safety and Inspection Service (FSIS):</strong> Safe Minimum Internal Temperature Chart and Thermal Death Time (D-value) guidelines.
            </li>
            <li>
              <strong>FDA Food Code 2022:</strong> Food processing specifications and time-temperature control for safety (TCS) foods.
            </li>
            <li>
              <strong>Culinary Institute of America (The Professional Chef Meat Fabrication):</strong> Thermal conductivity benchmarks for beef, poultry, pork, and game.
            </li>
            <li>
              <strong>American Meat Science Association (AMSA):</strong> Research guidelines for cookery, sensory evaluation, and instrumental tenderness analysis of meat.
            </li>
          </ul>
        </>
      }
    >
      <CookingTimeCalculatorComponent />
    </CalcPage>
  );
}
