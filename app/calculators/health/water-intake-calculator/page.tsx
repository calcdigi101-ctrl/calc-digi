import WaterIntakeCalculator from "@/components/calcs/health/water-intake-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HydrationElectrolyteCurveChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/water-intake-calculator";
const TITLE = "Water Intake Calculator – Daily Hydration by Weight & Workout | CalcDigi";
const DESCRIPTION =
  "Free water intake calculator: determine your optimal daily hydration in liters and ounces based on body weight, workout sweat loss, ambient climate, and maternal state.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Water Intake Calculator"
      intro="Calculate your personalized daily fluid intake requirement based on body weight, exercise sweat loss, ambient climate, and metabolic hydration needs according to National Academies of Sciences standards."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Daily Water (oz) = (Weight_lbs * 0.55) + (Workout_min / 30 * 12) * Climate_factor"
      related={[
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🏃", name: "Calorie Burn" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
      ]}
      faq={[
        {
          q: "How much water should I drink per day on average?",
          a: "The National Academies of Sciences, Engineering, and Medicine (NASEM) recommends a total daily fluid intake of approximately 3.7 liters (125 fl oz or ~15.5 cups) for healthy adult men, and 2.7 liters (91 fl oz or ~11.5 cups) for healthy adult women. This includes all drinking water, beverages, and moisture derived from dietary food.",
        },
        {
          q: "Does coffee, tea, and food count toward my daily water intake?",
          a: "Yes. Approximately 20% of your daily fluid intake naturally comes from whole foods—particularly water-rich fruits and vegetables like cucumbers (96% water), watermelon (92%), and apples (85%). Moderate consumption of coffee and tea also contributes positively to hydration; their mild diuretic caffeine effect does not offset the total fluid volume consumed.",
        },
        {
          q: "How much extra water do I need when working out?",
          a: "The American College of Sports Medicine (ACSM) recommends drinking 16 to 20 fl oz (500–600 ml) of water 2 to 3 hours before exercise, and consuming 7 to 10 fl oz (200–300 ml) every 10 to 20 minutes during vigorous exercise. For general planning, adding 12 fl oz per 30 minutes of moderate-to-high intensity sweating is an effective baseline.",
        },
        {
          q: "What is hyponatremia (water intoxication)?",
          a: "Hyponatremia is a potentially life-threatening medical emergency caused by drinking excessive amounts of plain water without adequate sodium electrolytes. This dilutes the blood's sodium concentration below 135 mmol/L, causing cellular swelling, brain edema, nausea, seizures, and confusion. Never force fluid consumption beyond thirst and renal excretion capacity (roughly 0.8 to 1.0 liter per hour).",
        },
        {
          q: "How can I tell if I am adequately hydrated?",
          a: "The most reliable daily clinical indicator is your urine color. Pale straw or light lemonade-colored urine indicates optimal cellular hydration. Dark yellow or amber indicates acute dehydration. Completely clear, water-like urine signifies that you may be overhydrating and flushing electrolytes.",
        },
        {
          q: "Do I need electrolyte drinks or sports powders?",
          a: "For workouts lasting under 60 minutes in temperate weather, plain water is completely sufficient. For endurance exercise exceeding 60 to 90 minutes, intense outdoor training in extreme heat, or heavy sweater profiles, supplementing with 300 to 600 mg of sodium and potassium prevents cramping and maintains plasma volume.",
        },
      ]}
      article={
        <>
          {/* Clinical Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                National Academies of Sciences (NASEM) Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                ACSM Exercise Hydration &amp; Fluid Replacement Protocol
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Clinical Nephrology &amp; Sports Energetics</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>The Physiology of Human Cellular Hydration</h2>
          <p>
            Water constitutes approximately <strong>60% of adult human body weight</strong> (roughly 75% in infants and 55% in older adults).
            It acts as the universal solvent, facilitating virtually every biochemical reaction necessary for life:
          </p>
          <ul>
            <li><strong>Cardiovascular Hemodynamics:</strong> Water maintains blood plasma volume. A deficit of just 2% of body mass in water thickens blood, elevates heart rate by 4 to 8 bpm, and reduces cardiac output.</li>
            <li><strong>Thermoregulation &amp; Heat Dissipation:</strong> Evaporative sweating is the human body's primary cooling mechanism. Sweating transfers internal metabolic heat to the environment, preventing heat exhaustion and hyperthermia.</li>
            <li><strong>Renal Toxin Clearance:</strong> The kidneys filter approximately 180 liters of blood plasma daily, excreting metabolic byproducts such as urea, creatinine, and uric acid. Chronic low fluid intake is the leading cause of nephrolithiasis (kidney stones).</li>
            <li><strong>Joint &amp; Spinal Cushioning:</strong> Synovial fluid in knees, hips, and intervertebral discs is composed of 80% water. Dehydration reduces shock absorption, increasing joint wear and back stiffness.</li>
          </ul>

          <h2>The Daily Hydration Mathematical Model</h2>
          <p>
            Clinical sports dietitians calculate total daily fluid requirements by integrating basal body mass, physical training
            sweat rates, and environmental climate evaporative multipliers:
          </p>
          <Formula>
            Baseline Hydration (oz) = Body Weight (lbs) × 0.55
            {"\n"}Exercise Sweat Buffer (oz) = (Workout Minutes ÷ 30) × 12 oz
            {"\n"}Total Fluid Requirement = (Baseline + Sweat Buffer) × Climate Multiplier (1.0 to 1.25)
          </Formula>

          <h2>Step-by-Step Practical Calculation: 165-lb Active Adult</h2>
          <p>
            Consider a <strong>165-lb (75 kg) individual</strong> who performs a <strong>45-minute gym workout</strong> in warm summer weather (1.15x multiplier):
          </p>
          <ul>
            <li><strong>Step 1: Calculate Mass Baseline</strong>: 165 lbs × 0.55 = <strong>90.75 fl oz baseline</strong>.</li>
            <li><strong>Step 2: Calculate Exercise Sweat Allowance</strong>: (45 min ÷ 30) × 12 = 1.5 × 12 = <strong>18.0 fl oz</strong>.</li>
            <li><strong>Step 3: Combine and Apply Warm Climate Multiplier</strong>: (90.75 + 18.0) × 1.15 = 108.75 × 1.15 = <strong>125.0 fl oz (3.70 Liters)</strong>.</li>
            <li><strong>Step 4: Distribute into Drinking Water vs Food Moisture</strong>: 80% direct liquids = <strong>100 fl oz (3.0 L)</strong>; 20% food moisture = <strong>25 fl oz</strong>.</li>
            <li><strong>Step 5: Determine Pacing Cups &amp; Bottles</strong>: 100 fl oz direct liquids = <strong>12.5 cups (8 oz)</strong> or <strong>6 standard 500ml water bottles</strong> across 16 waking hours (~6.25 fl oz per waking hour).</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <HydrationElectrolyteCurveChart />

          <h2>Hydration Guidelines Table: Body Weight vs Activity</h2>
          <p>
            The table below outlines recommended daily fluid targets (including food moisture and drinking water) across different body weights and daily exercise routines:
          </p>

          <DataTable
            head={["Body Weight", "Sedentary Desk Job", "30-Min Workout", "60-Min Workout", "90-Min Endurance Training"]}
            rows={[
              ["120 lbs (54 kg)", "66 fl oz (2.0 L)", "78 fl oz (2.3 L)", "90 fl oz (2.7 L)", "102 fl oz (3.0 L)"],
              ["140 lbs (64 kg)", "77 fl oz (2.3 L)", "89 fl oz (2.6 L)", "101 fl oz (3.0 L)", "113 fl oz (3.3 L)"],
              ["160 lbs (73 kg)", "88 fl oz (2.6 L)", "100 fl oz (3.0 L)", "112 fl oz (3.3 L)", "124 fl oz (3.7 L)"],
              ["180 lbs (82 kg)", "99 fl oz (2.9 L)", "111 fl oz (3.3 L)", "123 fl oz (3.6 L)", "135 fl oz (4.0 L)"],
              ["200 lbs (91 kg)", "110 fl oz (3.3 L)", "122 fl oz (3.6 L)", "134 fl oz (4.0 L)", "146 fl oz (4.3 L)"],
              ["220 lbs (100 kg)", "121 fl oz (3.6 L)", "133 fl oz (3.9 L)", "145 fl oz (4.3 L)", "157 fl oz (4.6 L)"],
            ]}
            highlight={2}
          />

          <h2>Signs of Dehydration vs Overhydration (Hyponatremia)</h2>
          <p>
            Maintaining optimal osmotic equilibrium requires understanding the physiological boundaries of both fluid deficit and fluid excess:
          </p>
          <ul>
            <li><strong>Mild Dehydration (1% to 2% body mass loss):</strong> Thirst sensation, dry mouth, mild afternoon headache, reduced cognitive focus, and dark yellow urine.</li>
            <li><strong>Moderate Dehydration (3% to 5% body mass loss):</strong> Dizziness on standing, rapid resting pulse, muscle cramps, sunken eyes, and marked decline in aerobic endurance.</li>
            <li><strong>Severe Dehydration (&gt; 6% body mass loss):</strong> Medical emergency requiring intravenous saline; risk of heat stroke, delirium, and acute renal failure.</li>
            <li><strong>Hyponatremia (Excessive Water Dilution):</strong> Nausea, throbbing headache, swollen fingers/ankles, confusion, and seizures resulting from blood sodium concentration dropping below 135 mmol/L.</li>
          </ul>

          <h2>Practical Tips for Consistent Daily Hydration</h2>
          <ol>
            <li><strong>Drink 16 oz Immediately Upon Waking:</strong> During 7 to 8 hours of sleep, you lose roughly 500 to 800 ml of fluid through respiration and transdermal perspiration. Rehydrate your cells before your morning coffee.</li>
            <li><strong>Pre-Hydrate Before Workouts:</strong> Drink 16 oz roughly 2 hours before exercise to ensure optimal blood plasma volume and sweat gland sensitivity.</li>
            <li><strong>Eat High-Water Whole Foods:</strong> Incorporate cucumbers, celery, bell peppers, berries, oranges, and broths to provide continuous slow-release cellular hydration with natural trace minerals.</li>
          </ol>
        </>
      }
    >
      <WaterIntakeCalculator />
    </CalcPage>
  );
}
