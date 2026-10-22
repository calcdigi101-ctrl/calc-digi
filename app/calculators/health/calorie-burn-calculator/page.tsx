import CalorieBurnCalculator from "@/components/calcs/health/calorie-burn-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MetActivitySpectrumChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/calorie-burn-calculator";
const TITLE = "Calorie Burn Calculator – Ainsworth Compendium MET Precision | CalcDigi";
const DESCRIPTION =
  "Free calorie burn calculator: calculate gross and net calories burned for running, cycling, swimming, weight lifting, and sports using the 2024 Ainsworth Compendium MET database.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const MET_TABLE_DATA = [
  { activity: "Sleeping / Complete Rest", met: "0.9 – 1.0", burn150lbs: "68 kcal/hr", burn180lbs: "82 kcal/hr", intensity: "Basal Rest" },
  { activity: "Desk Work / Typing", met: "1.3 – 1.5", burn150lbs: "102 kcal/hr", burn180lbs: "122 kcal/hr", intensity: "Sedentary" },
  { activity: "Slow Walking (2.0 mph)", met: "2.5 – 2.8", burn150lbs: "190 kcal/hr", burn180lbs: "229 kcal/hr", intensity: "Light Activity" },
  { activity: "Brisk Walking (3.5 mph)", met: "4.3", burn150lbs: "293 kcal/hr", burn180lbs: "351 kcal/hr", intensity: "Moderate Aerobic" },
  { activity: "Weight Training (Moderate Rest)", met: "3.5 – 5.0", burn150lbs: "272 kcal/hr", burn180lbs: "327 kcal/hr", intensity: "Moderate Anaerobic" },
  { activity: "Stationary Cycling (Moderate)", met: "6.8 – 8.0", burn150lbs: "503 kcal/hr", burn180lbs: "604 kcal/hr", intensity: "Vigorous Aerobic" },
  { activity: "Running (6.0 mph / 10:00 pace)", met: "9.8", burn150lbs: "667 kcal/hr", burn180lbs: "800 kcal/hr", intensity: "Vigorous Aerobic" },
  { activity: "High-Intensity Interval Training (HIIT)", met: "10.5 – 12.0", burn150lbs: "768 kcal/hr", burn180lbs: "922 kcal/hr", intensity: "Very High" },
  { activity: "Running (8.0 mph / 7:30 pace)", met: "11.8", burn150lbs: "803 kcal/hr", burn180lbs: "964 kcal/hr", intensity: "Very High" },
  { activity: "Competitive Swimming / Sprints", met: "12.0 – 14.0", burn150lbs: "885 kcal/hr", burn180lbs: "1,062 kcal/hr", intensity: "Maximal Exertion" },
];

export default function CalorieBurnPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Calorie Burn Calculator"
      intro="Quantify workout energy expenditure using the validated 2024 Ainsworth Compendium of Physical Activities. Distinguish between gross total expenditure and true net exercise burn across cardiovascular, resistance, and sports modalities."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Calories = Duration * (MET * 3.5 * Weight_kg) / 200"
      related={[
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
      ]}
      faq={[
        {
          q: "Why does a heavier person burn more calories for the same exercise?",
          a: "Gravitational work equals force times displacement (W = F * d). Moving a 200-lb body against gravity during walking, running, or stair climbing requires significantly greater mechanical force and muscle motor unit recruitment than moving a 130-lb body, directly scaling oxygen demand and caloric burn.",
        },
        {
          q: "How accurate are smartwatches and treadmill calorie counters?",
          a: "A landmark Stanford University study evaluating 7 major consumer fitness trackers found that no device had an error rate below 27% for calorie estimation, with some models overestimating burn by up to 93%. Treadmills and ellipticals are notoriously inaccurate because they do not account for arm-holding or running economy. Using standardized MET equations based on exact body mass provides far greater accuracy.",
        },
        {
          q: "What is the 'Afterburn Effect' (EPOC)?",
          a: "Excess Post-Exercise Oxygen Consumption (EPOC) refers to the elevated metabolic rate following strenuous activity as the body restores ATP-CP stores, metabolizes lactate, lowers core temperature, and repairs muscle tissue. While marketing often claims EPOC burns hundreds of calories, exercise physiology studies confirm EPOC accounts for an additional 6% to 15% of total workout expenditure.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Exercise Metabolism & Calorimetry Review:</span> Standardized against the 2024 Compendium of Physical Activities (Ainsworth et al., Medicine & Science in Sports & Exercise).
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Peer-Reviewed MET Data</div>
        </div>

        {/* Section 1: Definition of MET & Calorimetry */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            What Is a MET (Metabolic Equivalent of Task) and How Is Energy Expended?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human bioenergetics and clinical exercise physiology, the <strong>Metabolic Equivalent of Task (MET)</strong> is the objective physiological ratio comparing the metabolic rate of an active physical task to the resting basal metabolic rate (BMR). By international consensus, <strong>1.0 MET</strong> is defined as the oxygen consumption of an individual sitting quietly at complete physical rest, mathematically standardized to:
          </p>
          <Formula>1.0 MET = 3.5 mL of Oxygen (O2) per Kilogram of Body Mass per Minute</Formula>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because oxidizing 1 liter of oxygen in human cellular mitochondria releases approximately <strong>4.86 to 5.05 kilocalories</strong> of heat energy (depending on whether glucose, glycogen, or fatty acids serve as the primary substrate), this oxygen consumption standard allows precise conversion of any physical task directly into caloric expenditure based on your total body weight and workout duration.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: The MET Energy Continuum & Fuel Substrate Crossover
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Ainsworth 2024 Database
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            As exercise intensity climbs from 1.0 MET (sedentary rest) toward 14.0 METs (all-out sprinting), energy burn surges tenfold while muscle cells transition from aerobic beta-oxidation of fat to anaerobic glycogen glycolysis. Scrub across the intensity spectrum below to view hourly calorie burn and fuel mixture.
          </p>

          <MetActivitySpectrumChart />
        </section>

        {/* Section 3: Gross vs Net Calorie Burn */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Gross vs. Net Energy Expenditure: Why Wearable Fitness Trackers Mislead
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            One of the most frequent errors in nutritional programming is conflating <strong>gross calories</strong> with <strong>net calories</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Gross Caloric Expenditure (Total Burn)</h4>
              <Formula>Gross kcal = Duration &times; (MET &times; 3.5 &times; Weight_kg) / 200</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Measures total metabolic burn during the workout session. Crucially, this <em>includes</em> the baseline calories your brain, heart, and liver would have burned anyway while resting on the couch.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Net Caloric Expenditure (True Workout Bonus)</h4>
              <Formula>Net kcal = Duration &times; ((MET - 1.0) &times; 3.5 &times; Weight_kg) / 200</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Subtracts the 1.0 MET resting baseline. Represents the <strong>pure additional energy deficit</strong> generated by physical movement. This is the figure that must be applied when calculating fat loss.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Comprehensive MET Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Ainsworth Compendium MET Reference & Caloric Burn Table
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The table below provides validated MET intensities and hourly caloric expenditures for representative 150-lb (68 kg) and 180-lb (81.6 kg) individuals across standard movement categories:
          </p>

          <DataTable
            head={["Activity / Exercise Modality", "MET Score", "Burn (150 lbs / 68 kg)", "Burn (180 lbs / 82 kg)", "Cardiorespiratory Intensity"]}
            rows={MET_TABLE_DATA.map((r) => [r.activity, r.met, r.burn150lbs, r.burn180lbs, r.intensity])}
          />
        </section>

        {/* Section 5: Step-by-Step Calculation Walkthrough */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Calculating Energy Burn for a 45-Minute Run
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose a <strong>165-lb (74.84 kg)</strong> individual completes <strong>45 minutes</strong> of running at 6.0 mph (10-minute mile pace, MET = 9.8):
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Convert Weight to Kilograms: <code>165 lbs / 2.20462 = 74.84 kg</code></div>
            <div>2. Apply Gross MET Equation: <code>Calories = 45 &times; (9.8 &times; 3.5 &times; 74.84) / 200</code></div>
            <div>3. Calculate Inner Product: <code>9.8 &times; 3.5 &times; 74.84 = 2,567.01 mL O2/min</code></div>
            <div>4. Multiply by Duration: <code>45 &times; 2,567.01 = 115,515.5 mL O2</code></div>
            <div>5. Divide by 200 (Energy Constant): <code>115,515.5 / 200 = 577.6 Gross kcal</code></div>
            <div>6. Subtract Resting Baseline (1.0 MET): <code>45 &times; (1.0 &times; 3.5 &times; 74.84) / 200 = 59.0 kcal</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Final Net Energy Burn:</span>
              <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mt-1">
                Net Exercise Energy = 577.6 - 59.0 = 518.6 Net kcal
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Pontzer's Constrained Energy Model */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Constrained Model of Energy Expenditure (Why Exercise Alone Fails for Fat Loss)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2016, evolutionary anthropologist Dr. Herman Pontzer published groundbreaking doubly labeled water studies establishing the <strong>Constrained Total Energy Expenditure Model</strong>. Contrary to the traditional additive model (which assumes adding 500 kcal of exercise automatically expands daily burn by 500 kcal), the human body engages in <em>metabolic compensation</em>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Non-Exercise Activity Thermogenesis (NEAT) Suppression:</strong> Following intense workouts, individuals unconsciously fidget less, sit more, and rest longer, offsetting 20% to 35% of the workout calories.
            </li>
            <li>
              <strong>Immune & Endocrine Downregulation:</strong> Over weeks of heavy volume, basal inflammatory signaling and reproductive hormone expenditures subtly contract to conserve energy.
            </li>
            <li>
              <strong>Dietary Prescription Takeaway:</strong> Exercise is unparalleled for cardiovascular longevity, insulin sensitivity, and muscle retention; however, long-term body recomposition requires pairing calculated workout burn with caloric nutritional discipline.
            </li>
          </ul>
        </section>
      
        
        {/* EPOC Bioenergetics & Substrate Crossover */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Excess Post-Exercise Oxygen Consumption (EPOC) &amp; Substrate Oxidation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The total energetic footprint of physical exercise extends beyond the calories burned during active exertion. Following strenuous cardiovascular conditioning or high-volume resistance training, the metabolic rate remains elevated for hours during the recovery phase—a phenomenon known as Excess Post-Exercise Oxygen Consumption (EPOC).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Physiological Drivers of EPOC</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                During the post-workout recovery window, additional oxygen is consumed to replenish intramuscular phosphocreatine (PCr) stores, clear circulating lactate via hepatic gluconeogenesis (Cori cycle), restore muscle and blood myoglobin oxygen reserves, and normalize core body temperature and elevated catecholamines.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Substrate Crossover Concept</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As exercise intensity increases, the relative contribution of fat oxidation decreases while intramuscular glycogen and glucose oxidation surge. However, high-intensity workouts stimulate superior total 24-hour calorie expenditure and trigger higher post-exercise fat oxidation during rest.
              </p>
            </div>
          </div>
          <h2>Wearable Tracking Error Margins &amp; True Energy Burn</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Commercial wearable fitness trackers carry error margins of 15% to 40% when estimating exercise calories. Combine compound multi-joint movements with structured HIIT workouts, and monitor weekly body composition trends for reliable metabolic guidance.
          </p>
        </section>

        
          <h2>Maximizing Exercise Calorie Burn &amp; Metabolic Conditioning</h2>
          <p>
            Optimize your workout energy expenditure and post-exercise recovery with these proven training guidelines:
          </p>
          <ul>
            <li><strong>Incorporate Compound Multi-Joint Movements:</strong> Exercises that recruit large muscle groups (squats, deadlifts, rowing, kettlebell swings) burn significantly more calories per minute than isolation exercises.</li>
            <li><strong>Integrate High-Intensity Interval Training (HIIT):</strong> Alternating periods of maximal exertion with brief rest periods stimulates high caloric expenditure during workouts and elevates post-exercise oxygen consumption (EPOC).</li>
            <li><strong>Maintain Consistent Daily Movement (NEAT):</strong> Do not compensate for hard workouts by becoming sedentary the rest of the day. Maintain daily walking and spontaneous movement to maximize total 24-hour calorie burn.</li>
            <li><strong>Fuel &amp; Hydrate Adequately:</strong> Consume balanced meals with complex carbohydrates and protein to power high-intensity workouts and support rapid muscular recovery.</li>
          </ul>
          <p>
            Combine structured exercise sessions with an active daily lifestyle for sustainable fitness and metabolic health.
          </p>


        
          <h2>Biomechanics, Work Efficiency &amp; Wearable Device Discrepancies</h2>
          <p>
            Commercial wearable fitness trackers estimate caloric burn based on heart rate and accelerometer data, but studies in the <em>Journal of Personalized Medicine</em> show that wearable devices carry error margins of 15% to 40% when estimating exercise calorie expenditure.
          </p>
          <p>
            Calibrating workouts using standardized Metabolic Equivalent of Task (MET) calculations and monitoring weekly body composition trends provides a significantly more reliable gauge of true metabolic expenditure than wrist-based trackers.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Caloric burn from physical exercise is one part of total daily energy output. Compare your exercise expenditure against baseline maintenance using the <a href="/calculators/health/tdee-calculator">TDEE Calculator</a>, calculate resting basal energy with the <a href="/calculators/health/bmr-calculator">BMR Calculator</a>, track running economy with the <a href="/calculators/health/pace-calculator">Pace Calculator</a>, and measure cardiorespiratory fitness with our <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <CalorieBurnCalculator />
    </CalcPage>
  );
}
