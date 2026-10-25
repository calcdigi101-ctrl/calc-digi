import type { Metadata } from "next";
import Link from "next/link";
import CalorieBurnCalculatorComponent from "@/components/calcs/food/calorie-burn-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ActivityMetCalorieExpenditureChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/calorie-burn-calculator";
const TITLE = "Calorie Burn Calculator | MET Energy Expenditure & Exercise Physiology";
const DESCRIPTION =
  "Calculate physical exercise calorie expenditure, MET intensity, substrate fat oxidation, and basal metabolic displacement across sports and culinary work.";

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
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/coffee-caffeine-calculator", icon: "☕", name: "Coffee Caffeine Calculator" },
  { href: "/calculators/food/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Unit Calculator" },
  { href: "/calculators/food/cooking-time-calculator", icon: "⏱️", name: "Cooking Time" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost" },
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
];

export default function CalorieBurnCalculatorPage() {
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
              Physiological Summary: Metabolic Equivalent of Task (MET) Formula
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              One Metabolic Equivalent of Task (1.0 MET) is defined as the oxygen consumption rate of an adult human at quiet rest: exactly 3.5 milliliters of oxygen per kilogram of body weight per minute (3.5 ml O2/kg/min), equivalent to approximately 1.0 kcal per kg of body mass per hour. Physical expenditure balances dietary macronutrient intake modeled in our{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium underline hover:text-amber-900">
                nutrition calculator
              </Link>{" "}
              and beverage energy tracked in the{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium underline hover:text-amber-900">
                alcohol unit calculator
              </Link>.
            </p>
          </div>

          <h2>Exercise Thermodynamics & Metabolic Equivalent Intensity Mechanics</h2>
          <ActivityMetCalorieExpenditureChart />
          <p>
            Human bioenergetics translates chemical bond energy into mechanical locomotion and metabolic heat via adenosine triphosphate (ATP) hydrolysis. In exercise science, total energy expenditure is quantified using the Metabolic Equivalent of Task (MET) framework established by the American College of Sports Medicine (ACSM).
          </p>
          <p>
            Because the thermodynamic oxidation of mixed dietary substrates yields approximately 4.86 to 5.05 kilocalories per liter of oxygen consumed, multiplying an individual&apos;s body mass by task MET intensity and exercise duration yields gross energy expenditure. Ergogenic aids analyzed in our{" "}
            <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              coffee caffeine calculator
            </Link>{" "}
            can augment free fatty acid mobilization during aerobic states:
          </p>

          <Formula>
            {"\text{Gross Energy Expenditure (kcal)} = \text{Duration (hours)} \times \text{MET} \times \text{Weight (kg)}"}
          </Formula>

          <Formula>
            {"\text{Net Exercise Expenditure} = \text{Duration (hours)} \times (\text{MET} - 1.0) \times \text{Weight (kg)}"}
          </Formula>

          <Formula>
            {"\dot{V}\text{O}_2\,(\text{ml/min}) = \text{MET} \times 3.5\,\frac{\text{ml}}{\text{kg}\cdot\text{min}} \times \text{Weight (kg)}"}
          </Formula>

          <Formula>
            {"\text{Fat Substrate Split (g)} = \frac{\text{Energy (kcal)} \times \text{Fat Oxidation Fraction}}{9.0\,\text{kcal/g}}"}
          </Formula>

          <h2>Standardized Physical Activity MET Intensity Matrix</h2>
          <p>
            The Compendium of Physical Activities categorizes exercise modalities, athletic pursuits, and occupational culinary tasks by validated empirical MET ratings:
          </p>

          <DataTable
            head={[
              "Activity / Occupational Task",
              "Standard MET Intensity",
              "O2 Uptake (ml/kg/min)",
              "Kcal/hr (70 kg Person)",
              "Kcal/hr (85 kg Person)",
              "Dominant Substrate",
            ]}
            rows={[
              ["Sleeping / Supine Rest", "0.9 MET", "3.15", "63 kcal", "77 kcal", "Free Fatty Acids (85%)"],
              ["Sedentary Desk Work / Reading", "1.3 MET", "4.55", "91 kcal", "111 kcal", "Lipids (70%)"],
              ["Commercial Kitchen Prep / Chopping", "2.5 MET", "8.75", "175 kcal", "213 kcal", "Mixed Substrates"],
              ["Brisk Walking (3.5 mph / 5.6 km/h)", "3.8 MET", "13.30", "266 kcal", "323 kcal", "Lipids / Glycogen 50/50"],
              ["Culinary Line Cook / Constant Moving", "3.5 MET", "12.25", "245 kcal", "298 kcal", "Lipids / Glycogen 50/50"],
              ["Moderate Cycling (12-14 mph)", "6.8 MET", "23.80", "476 kcal", "578 kcal", "Muscle Glycogen (65%)"],
              ["Vigorous Swimming (Freestyle Laps)", "8.3 MET", "29.05", "581 kcal", "706 kcal", "Muscle Glycogen (75%)"],
              ["Vigorous Running (7.5 mph / 8 min/mi)", "11.5 MET", "40.25", "805 kcal", "978 kcal", "Blood Glucose / Glycogen (85%)"],
            ]}
          />

          <h2>Worked Analytical Scenario: 10K Running Energy Expenditure</h2>
          <p>
            Consider a female runner weighing 65 kg who completes a 10-kilometer road training run in 50 minutes (speed = 12.0 km/h or 7.5 mph, corresponding to a MET rating of 11.5). To balance her training expenditure with nutrient recovery using our{" "}
            <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              nutrition calculator
            </Link>{" "}
            and recipe planning via the{" "}
            <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              recipe scaler
            </Link>, we calculate gross caloric burn, net burn, and oxygen uptake:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Duration Conversion:</strong> 50 minutes = 50 / 60 = 0.8333 hours.
            </li>
            <li>
              <strong>Gross Calorie Expenditure:</strong>
              <Formula>
                {"\text{Gross Kcal} = 0.8333\,\text{hr} \times 11.5\,\text{MET} \times 65\,\text{kg} = 622.9\,\text{kcal}"}
              </Formula>
            </li>
            <li>
              <strong>Net Exercise-Induced Calorie Expenditure:</strong> Subtracting the baseline 1.0 MET resting expenditure she would have expended sitting quietly:
              <Formula>
                {"\text{Net Kcal} = 0.8333 \times (11.5 - 1.0) \times 65 = 568.7\,\text{kcal}"}
              </Formula>
            </li>
            <li>
              <strong>Total Volume of Oxygen Utilized:</strong>
              <Formula>
                {"\dot{V}\text{O}_2 = 11.5 \times 3.5\,\text{ml/kg/min} \times 65\,\text{kg} = 2{,}616.25\,\text{ml/min} = 2.616\,\text{L/min}"}
              </Formula>
              Over 50 minutes, cumulative oxygen consumed = 2.616 L/min * 50 min = 130.8 liters of O2.
            </li>
            <li>
              <strong>Post-Exercise Recovery Meal:</strong> To restock glycogen depleted during this session, the athlete plans high-protein baked recovery snacks with our{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                baking substitution calculator
              </Link>{" "}
              and ensures hydration ingredients are converted accurately in the{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking conversion calculator
              </Link>.
            </li>
          </ul>

          <h2>Respiratory Exchange Ratio & Fuel Substrate Partitioning</h2>
          <p>
            During physical exertion, the body utilizes a blend of circulating free fatty acids and intramuscular glycogen stores. The proportion of each fuel source is determined by the Respiratory Exchange Ratio (RER), defined as the ratio of metabolic carbon dioxide produced to oxygen consumed:
          </p>

          <Formula>
            {"\text{RER} = \frac{\dot{V}\text{CO}_2}{\dot{V}\text{O}_2}"}
          </Formula>

          <p>
            An RER of 0.70 reflects 100% lipid oxidation (fat burning), characteristic of low-intensity walking or basal resting conditions. Conversely, an RER of 1.00 indicates 100% carbohydrate oxidation, typical of anaerobic threshold running or intense cycling intervals. At moderate MET intensities (4.0 to 6.0 METs), the crossover point occurs, where carbohydrate oxidation becomes the predominant ATP generator.

          <h2>Excess Post-Exercise Oxygen Consumption (EPOC) & The Metabolic Afterburn</h2>
          <p>
            The metabolic cost of high-intensity physical training does not cease upon termination of muscular mechanical work. Following strenuous athletic bouts exceeding 75% of maximal aerobic capacity (VO2max), human bioenergetics experiences Excess Post-Exercise Oxygen Consumption (EPOC), popularly termed the metabolic afterburn. During the initial rapid phase of EPOC (lasting 30 to 90 minutes), pulmonary oxygen uptake remains significantly elevated above basal resting rates to re-synthesize depleted intramuscular phosphocreatine (PCr) stores and restore dissolved venous oxygen tension.
          </p>
          <p>
            During the prolonged secondary phase of EPOC (which can persist from 6 to 14 hours depending on training volume), the liver accelerates gluconeogenic lactate clearance via the hepatic Cori cycle, consuming 6 ATP equivalents for every glucose molecule synthesized from circulating exercise lactate. Concurrently, elevated circulating catecholamines, accelerated thermoregulatory ventilation, and heightened mitochondrial membrane proton leak elevate resting metabolic rate, burning an additional 6% to 15% of the total exercise caloric expenditure while the body resides in a passive recovery state.
          </p>
          </p>

          <h2>Biomechanical Confounders & Wearable Accelerometer Discrepancies</h2>
          <p>
            When estimating exercise caloric expenditure, practical biometric variables introduce potential estimation variance:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Smartwatch & Wrist Photoplethysmography Error:</strong> Consumer fitness trackers rely on wrist optical heart rate sensors that overestimate calorie burn by 15% to 28% during resistance training and HIIT.
            </li>
            <li>
              <strong>Locomotor Efficiency Adaptation:</strong> Highly trained athletes demonstrate superior mechanical efficiency and elastic recoil storage in Achilles and patellar tendon complexes. As neuromuscular coordination refines over years of athletic conditioning, oxygen uptake per kilometer traveled decreases by 8% to 14%, resulting in lower net metabolic calorie burn compared to an untrained individual performing the same displacement at identical velocity. Well-conditioned marathon runners display superior biomechanical economy, burning up to 10% fewer calories per kilometer than novice runners at equivalent MET speeds.
            </li>
            <li>
              <strong>Culinary & Thermal Cost:</strong> Kitchen tasks like standing at high-temperature roast ovens timed with our{" "}
              <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking time calculator
              </Link>{" "}
              elevate heart rate due to thermoregulatory cutaneous vasodilation rather than direct muscular work.
            </li>
            <li>
              <strong>Hospitality Operations Budgeting:</strong> Professional catering teams estimate staff caloric fatigue alongside menu pricing calculated via our{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                food cost calculator
              </Link>{" "}
              and guest gratuity splits modeled in the{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between gross calories burned and net exercise calories?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Gross calories represent the total energy expended during the exercise window, including your baseline resting metabolism. Net calories represent only the additional energy burned above what you would have expended by simply resting quietly on the sofa.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does body weight directly influence the number of calories burned?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Caloric burn is directly proportional to mass. Moving an 85 kg body over 5 kilometers requires substantially more mechanical force and ATP cleavage than moving a 55 kg body over the exact same distance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does caffeine increase caloric expenditure during cardiovascular training?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes. Pre-exercise caffeine intake stimulates catecholamine release, elevating resting metabolic rate by 3% to 7% and increasing free fatty acid mobilization for aerobic fuel oxidation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does calorie burn decline over time during long-term endurance training?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                This phenomenon, known as the constrained total energy expenditure model (Pontzer), occurs when the human body compensates for chronic high exercise expenditure by downregulating immune function, reproductive hormones, and non-exercise physical activity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How many calories are burned during an 8-hour commercial culinary kitchen shift?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A professional line cook moving continuously (averaging 3.2 METs) burns approximately 1,600 to 2,100 gross calories over an 8-hour shift, requiring careful macro replenishment modeled in our{" "}
                <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  nutrition calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does alcohol intake impact post-exercise glycogen replenishment?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Ethanol units calculated in our{" "}
                <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  alcohol unit calculator
                </Link>{" "}
                impair muscle protein synthesis by up to 37% and inhibit hepatic gluconeogenesis, significantly delaying muscular recovery after strenuous training.
              </p>
            </div>
          </div>

          <h2>Authoritative Exercise Physiology Standards & Clinical Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Ainsworth BE, et al.:</strong> Compendium of Physical Activities: a second update of codes and MET intensities (Medicine & Science in Sports & Exercise).
            </li>
            <li>
              <strong>American College of Sports Medicine (ACSM):</strong> Guidelines for Exercise Testing and Prescription, 11th Edition.
            </li>
            <li>
              <strong>National Institutes of Health (NIH):</strong> Energy balance, macronutrient intake, and body weight dynamics clinical models.
            </li>
            <li>
              <strong>World Health Organization (WHO):</strong> Global recommendations on physical activity for health and disease prevention.
            </li>
          </ul>
        </>
      }
    >
      <CalorieBurnCalculatorComponent />
    </CalcPage>
  );
}
