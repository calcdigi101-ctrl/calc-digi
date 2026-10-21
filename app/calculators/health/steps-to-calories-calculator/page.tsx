import StepsToCaloriesCalculator from "@/components/calcs/health/steps-to-calories-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { StepVolumeCalorieCurveChart } from "@/components/flagship/health/editorial-charts/StepVolumeCalorieCurveChart";

const PATH = "/calculators/health/steps-to-calories-calculator";
const TITLE = "Steps to Calories Calculator – Stride Length & Cadence Precision | CalcDigi";
const DESCRIPTION =
  "Free steps to calories calculator: accurately convert daily step count into calories burned and distance walked (miles & km) using anatomical stride length and Tudor-Locke standards.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const TUDOR_LOCKE_TABLE = [
  { tier: "Sedentary Lifestyle", steps: "< 5,000 steps/day", healthImpact: "Baseline physical inactivity; correlated with elevated visceral adiposity, insulin resistance, and cardiometabolic syndrome." },
  { tier: "Low Active", steps: "5,000 – 7,499 steps/day", healthImpact: "Typical baseline of non-sedentary office workers; modest baseline cardiovascular protection without active conditioning." },
  { tier: "Somewhat Active", steps: "7,500 – 9,999 steps/day", healthImpact: "Meets public health recommendations for all-cause mortality reduction in older adults (Lancet Public Health meta-analysis threshold)." },
  { tier: "Active Baseline", steps: "10,000 – 12,499 steps/day", healthImpact: "Optimal cardiovascular risk reduction; significant enhancement in resting blood pressure, arterial compliance, and daily caloric NEAT." },
  { tier: "Highly Active", steps: "≥ 12,500 steps/day", healthImpact: "High daily energy expenditure; accelerated fat oxidation, superior glycemic control, and maintenance of healthy body weight." },
];

export default function StepsToCaloriesPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Steps to Calories Calculator"
      intro="Accurately convert your daily pedometer or smartwatch step count into total calories burned and distance traversed. Tailored to your anatomical height, body weight, biological sex, and walking cadence."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Distance = Steps * (Height * 0.415) ; Calories = f(MET, Weight, Duration)"
      related={[
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/weight-loss-calculator", icon: "⚖️", name: "Weight Loss" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
        { href: "/calculators/health/bmi-calculator", icon: "📊", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "How many calories do 10,000 steps burn?",
          a: "For an average adult weighing 160 to 180 lbs (72–82 kg), 10,000 steps burns approximately 400 to 500 calories (kcal). Heavier individuals burn more calories for the same step count because moving greater gravitational mass across space requires higher mechanical work, whereas a lighter 120-lb individual burns roughly 300 to 350 kcal.",
        },
        {
          q: "How many miles is 10,000 steps?",
          a: "For an adult of average height (5'6\" to 5'10\"), an average walking stride length is between 2.2 and 2.5 feet (0.67 to 0.76 meters). Consequently, 10,000 steps equates to approximately 4.2 to 5.0 miles (6.8 to 8.0 kilometers).",
        },
        {
          q: "Is 10,000 steps a real scientific requirement?",
          a: "The '10,000 steps' figure originated not from medical laboratories, but as a marketing campaign in Japan in 1965 to promote the 'Manpo-kei' (10,000-steps meter) pedometer following the 1964 Tokyo Olympics. However, extensive modern epidemiological research (including a 2022 Lancet Public Health meta-analysis of 47,471 adults) confirms that mortality risk progressively declines up to 8,000–10,000 steps per day for adults under 60, and plateaus around 6,000–8,000 steps per day for adults aged 60 and older.",
        },
      ]}
    >
      <StepsToCaloriesCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Occupational Kinesiology & NEAT Review:</span> Calibrated to Tudor-Locke physical activity classification indices and the Compendium of Physical Activities walking MET standards.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Epidemiological Standards</div>
        </div>

        {/* Section 1: Non-Exercise Activity Thermogenesis (NEAT) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Science of NEAT: Why Walking Is the Ultimate Metabolic Engine
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human metabolic bioenergetics, daily energy expenditure is divided into Basal Metabolic Rate (BMR, ~60–70%), the Thermic Effect of Food (TEF, ~10%), Exercise Activity Thermogenesis (EAT, ~5%), and <strong>Non-Exercise Activity Thermogenesis (NEAT)</strong>. Pioneered by Dr. James Levine at the Mayo Clinic, NEAT encompasses all kinetic energy expended for occupational work, pacing, walking, and spontaneous muscle tone.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While structured gym workouts occupy barely 45 minutes of the day, step-based locomotion operates across the remaining 15 waking hours. Inter-individual variation in NEAT can account for a difference of up to <strong>800 to 2,000 kilocalories per day</strong> between two people of identical stature. Walking regularly engages the calf skeletal muscle pumps (soleus and gastrocnemius), stimulating lipoprotein lipase (LPL) enzyme activity to clear circulating postprandial triglycerides and glucose from the bloodstream.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Step Volume vs. Caloric Energy Expenditure Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Tudor-Locke Activity Matrix
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Because gravitational work scales linearly with total body weight, moving 200 lbs burns significantly more calories per step than moving 130 lbs. Scrub across daily step volumes below (2,000 to 20,000 steps) to compare caloric burn across body masses against clinical activity categories.
          </p>

          <StepVolumeCalorieCurveChart />
        </section>

        {/* Section 3: Tudor-Locke Classification Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Tudor-Locke Step-Defined Physical Activity Index
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Published in <em>Sports Medicine</em> by Dr. Catrine Tudor-Locke, the internationally recognized step classification index categorizes adult daily lifestyle patterns:
          </p>

          <DataTable
            head={["Physical Activity Category", "Daily Step Count", "Epidemiological Health & Cardiometabolic Impact"]}
            rows={TUDOR_LOCKE_TABLE.map((r) => [r.tier, r.steps, r.healthImpact])}
          />
        </section>

        {/* Section 4: Biomechanical Stride Length Calculation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Biomechanical Stride Length: How Height Dictates Step Distance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Generic smartphone pedometers frequently calculate inaccurate distances by applying a static 2.2-foot stride assumption. In biomechanics, individual step length correlates directly with femur length and standing height:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Men Stride Equation</h4>
              <Formula>Stride Length (inches) = Standing Height (inches) &times; 0.415</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A 5'10" (70 inch) male possesses an average anatomical stride length of <strong>29.05 inches (0.738 meters)</strong>, requiring ~2,180 steps to cover one full mile.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Women Stride Equation</h4>
              <Formula>Stride Length (inches) = Standing Height (inches) &times; 0.413</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A 5'4" (64 inch) female possesses an average stride length of <strong>26.43 inches (0.671 meters)</strong>, requiring ~2,396 steps to traverse one mile.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Energy Expenditure for 10,000 Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose a <strong>165-lb (74.84 kg)</strong> adult female standing <strong>5'6" (66 inches)</strong> walks <strong>10,000 steps</strong> at a moderate brisk pace (110 steps/min, 3.5 METs):
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Compute Stride Length: <code>66 inches &times; 0.413 = 27.26 inches = 0.692 meters</code></div>
            <div>2. Total Distance: <code>10,000 &times; 0.692 m = 6,924 meters = 4.30 miles (6.92 km)</code></div>
            <div>3. Calculate Active Duration: <code>10,000 steps / 110 steps/min = 90.9 minutes (1.52 hours)</code></div>
            <div>4. Calculate Gross Calorie Burn: <code>90.9 min &times; (3.5 &times; 3.5 &times; 74.84) / 200 = 416.7 kcal</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Final Metrics:</span>
              <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mt-1">
                Total Expenditure = 417 kcal • Distance = 4.30 miles • Average Pace = 21:08 / mile
              </p>
            </div>
          </div>
        </section>
      
        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Daily step volume represents the single largest component of Non-Exercise Activity Thermogenesis (NEAT). Incorporate your daily walking burn into total daily energy needs using our <a href="/calculators/health/tdee-calculator">TDEE Calculator</a>, track speed and split times with the <a href="/calculators/health/pace-calculator">Pace Calculator</a>, plan calorie deficit goals with the <a href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</a>, and monitor workout burn via the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
