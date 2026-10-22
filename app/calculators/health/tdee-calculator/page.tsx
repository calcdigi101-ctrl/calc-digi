import TdeeCalculator from "@/components/calcs/health/tdee-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TdeeActivitySpectrumChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/tdee-calculator";
const TITLE = "TDEE Calculator – Total Daily Energy Expenditure & Calorie Deficit | CalcDigi";
const DESCRIPTION =
  "Free TDEE calculator: estimate Total Daily Energy Expenditure, maintenance calories, and target caloric deficits for sustainable fat loss and muscle hypertrophy using physical activity multipliers.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="TDEE Calculator"
      intro="Accurately determine your Total Daily Energy Expenditure (TDEE)—the exact number of calories you burn each day across resting metabolism, daily steps, digestion, and physical training."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="TDEE = BMR * PAL (Physical Activity Level)"
      related={[
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
        { href: "/calculators/health/weight-loss-calculator", icon: "📉", name: "Weight Loss" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
      ]}
      faq={[
        {
          q: "What is Total Daily Energy Expenditure (TDEE)?",
          a: "Total Daily Energy Expenditure (TDEE) is the total quantity of calories your body burns over a 24-hour period. It is composed of four distinct metabolic components: Basal Metabolic Rate (BMR, ~60–75%), Non-Exercise Activity Thermogenesis (NEAT, ~15%), the Thermic Effect of Food (TEF, ~10%), and Exercise Activity Thermogenesis (EAT, ~5–15%).",
        },
        {
          q: "How many calories should I eat below my TDEE to lose one pound of fat per week?",
          a: "One pound of human adipose tissue stores approximately 3,500 kcal of chemical energy. Creating a daily caloric deficit of 500 kcal below your maintenance TDEE (500 kcal × 7 days = 3,500 kcal deficit) produces an average rate of fat loss of approximately 1.0 lb per week without severe metabolic adaptation.",
        },
        {
          q: "Why do most people overestimate their activity level on TDEE calculators?",
          a: "Most people classify themselves as 'Moderately Active' simply because they exercise for 45 minutes four times per week. However, if the remaining 23 hours of the day are spent sitting at an office desk, driving, and sleeping, their overall Physical Activity Level (PAL) is actually closer to 'Lightly Active'. When in doubt, start with a lower activity multiplier to avoid overestimating your maintenance burn.",
        },
        {
          q: "What is NEAT and why is it crucial for fat loss?",
          a: "Non-Exercise Activity Thermogenesis (NEAT) encompasses all the energy expended for everything we do that is not sleeping, eating, or sports-like exercise: walking to the store, taking the stairs, typing, cleaning, and fidgeting. NEAT can vary by up to 800 to 1,000 calories per day between two people of similar size, making daily step counts one of the most effective fat-loss levers.",
        },
        {
          q: "How often should I recalculate my TDEE as I lose weight?",
          a: "You should recalculate your TDEE every 10 to 15 pounds of weight loss. As your total mass decreases, your body requires fewer calories to move itself, and your BMR naturally drops. Failing to adjust your caloric intake to your new lower body weight is the primary cause of weight loss plateaus.",
        },
        {
          q: "What is adaptive thermogenesis (metabolic adaptation)?",
          a: "Adaptive thermogenesis is an evolutionary survival mechanism where the body downregulates resting metabolism and spontaneous physical movement (subconsciously lowering NEAT) beyond what can be predicted by weight loss alone. Incorporating diet breaks and maintaining high protein intake helps minimize this adaptation.",
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
                ACSM Exercise Physiology Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Physical Activity Level (PAL) Multipliers Validated by FAO/WHO
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Metabolic Energetics &amp; Nutrition</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>Understanding the Four Pillars of TDEE</h2>
          <p>
            Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is the cumulative sum of every kilocalorie your body
            burns in a single day. Rather than being a static number, TDEE is a dynamic physiological continuum composed of
            four distinct energetic compartments:
          </p>
          <ol>
            <li>
              <strong>Basal Metabolic Rate (<a href="/calculators/health/bmr-calculator">BMR Calculator</a>, ~60% – 75% of TDEE):</strong> The fundamental energy required to support cellular
              function, organ respiration, and neurological signaling while completely resting in bed.
            </li>
            <li>
              <strong>Non-Exercise Activity Thermogenesis (NEAT, ~15% of TDEE):</strong> The calories burned through subconscious
              physical movement, posture maintenance, typing, fidgeting, and walking throughout your daily routine (track step volume with our <a href="/calculators/health/steps-to-calories-calculator">Steps to Calories Calculator</a>).
            </li>
            <li>
              <strong>Thermic Effect of Food (TEF, ~8% – 10% of TDEE):</strong> The metabolic cost of digesting, absorbing,
              transporting, and storing dietary macronutrients. Protein has the highest TEF (20%–30%), followed by carbohydrates
              (5%–10%) and dietary fats (0%–3%). Set your target nutrient distribution with the <a href="/calculators/health/macro-calculator">Macro Calculator</a>.
            </li>
            <li>
              <strong>Exercise Activity Thermogenesis (EAT, ~5% – 15% of TDEE):</strong> The energy expended during deliberate,
              structured cardiovascular or resistance workouts. For non-professional athletes, EAT represents a surprisingly small
              portion of total 24-hour calorie burn. For targeted intake adjustments, explore our <a href="/calculators/health/calorie-calculator">Calorie Calculator</a>.
            </li>
          </ol>

          
          {/* Interactive Visual Chart / Spectrum */}
          <TdeeActivitySpectrumChart />

          <h2>The Mathematical TDEE Formula</h2>
          <p>
            TDEE is calculated by establishing your resting BMR using the clinical Mifflin-St Jeor equation and then scaling it
            by your empirical <strong>Physical Activity Level (PAL)</strong> factor:
          </p>
          <Formula>TDEE = BMR × PAL Multiplier</Formula>

          <h2>Step-by-Step Practical Calculation: 180-lb Office Worker</h2>
          <p>
            Suppose a <strong>30-year-old male</strong> weighs <strong>180 lbs (81.65 kg)</strong>, stands <strong>5 feet 10 inches (177.8 cm)</strong>,
            works a desk job, and lifts weights 4 times per week:
          </p>
          <ul>
            <li><strong>Step 1: Compute Baseline BMR</strong>: (10 × 81.65) + (6.25 × 177.8) - (5 × 30) + 5 = <strong>1,783 kcal/day</strong>.</li>
            <li><strong>Step 2: Assign Physical Activity Level</strong>: 4 weekly resistance workouts with an office job corresponds to Moderately Active (<strong>1.55x PAL</strong>).</li>
            <li><strong>Step 3: Calculate Maintenance TDEE</strong>: 1,783 × 1.55 = <strong>2,764 kcal/day</strong> to keep weight perfectly stable.</li>
            <li><strong>Step 4: Establish 500-kcal Fat Loss Target</strong>: 2,764 - 500 = <strong>2,264 kcal/day</strong>.</li>
            <li><strong>Step 5: Project Weekly Weight Loss Runway</strong>: 500 kcal deficit × 7 days = 3,500 kcal weekly deficit = <strong>-1.0 lb pure fat lost per week</strong>.</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <h2>Physical Activity Level (PAL) Multiplier Guidelines</h2>
          <p>
            The table below breaks down the standardized FAO/WHO and ACSM Physical Activity Level (PAL) multipliers, step counts,
            and estimated daily caloric expenditures for an individual with a 1,600 kcal BMR:
          </p>

          <DataTable
            head={["Activity Category", "PAL Factor", "Typical Daily Steps", "Daily Calories (1,600 BMR)", "Typical Lifestyle Description"]}
            rows={[
              ["Sedentary", "1.200x", "< 5,000 steps", "1,920 kcal / day", "Desk job, remote work, driving, no intentional exercise"],
              ["Lightly Active", "1.375x", "6,000 – 8,000 steps", "2,200 kcal / day", "Teacher, retail sales, or 1–3 casual cardio/light gym workouts per week"],
              ["Moderately Active", "1.550x", "8,000 – 11,000 steps", "2,480 kcal / day", "Active job or 3–5 dedicated moderate-to-high intensity lifting sessions"],
              ["Very Active", "1.725x", "12,000 – 15,000 steps", "2,760 kcal / day", "Physical trade (carpenter, nurse) plus 6 days of rigorous athletic training"],
              ["Extremely Active", "1.900x", "16,000+ steps", "3,040 kcal / day", "Heavy manual construction labor or competitive collegiate/endurance athlete"],
            ]}
            highlight={2}
          />

          <h2>Caloric Deficit Strategy: Mild vs Moderate vs Aggressive</h2>
          <p>
            Selecting the correct caloric deficit size determines whether you lose pure adipose tissue while preserving lean muscle,
            or trigger metabolic burnout and muscular wasting:
          </p>
          <ul>
            <li>
              <strong>Mild Deficit (10% to 15% / ~250–350 kcal):</strong> Ideal for lean individuals, competitive physique athletes,
              and those wanting maximum strength retention and zero workout fatigue. Projected loss: ~0.5 lb per week.
            </li>
            <li>
              <strong>Standard Deficit (20% to 25% / ~500 kcal):</strong> The gold standard for sustainable clinical weight loss.
              Preserves metabolic health and energy while delivering steady, predictable progress of 1.0 lb per week.
            </li>
            <li>
              <strong>Aggressive Deficit (30%+ / ~750–1,000 kcal):</strong> Reserved for individuals with clinical obesity (BMI &gt; 35).
              Must be paired with high dietary protein (&ge; 1.0 g/lb) and progressive resistance training to avoid muscular catabolism.
            </li>
          </ul>

          <h2>Overcoming Weight Loss Plateaus</h2>
          <p>
            When weight loss stalls for more than 2 to 3 consecutive weeks, it is rarely due to a "broken metabolism." Instead, it is
            almost always explained by one of three physiological realities:
          </p>
          <ol>
            <li><strong>Unconscious NEAT Drop:</strong> When dieted, people subconsciously blink less, sit more, and move less, dropping daily NEAT burn by 200 to 400 calories without realizing it. Maintain a consistent daily step goal (e.g. 8,000 to 10,000 steps) to anchor your NEAT.</li>
            <li><strong>Lower Mass Burn:</strong> A lighter body requires fewer calories to move across space. A 200-lb person who reaches 180 lbs has reduced their maintenance TDEE by roughly 150 to 200 calories simply by carrying 20 fewer pounds.</li>
            <li><strong>Calorie Tracking Creep:</strong> Unmeasured cooking oils, salad dressings, sauces, and weekend cheat meals often erase a weekday calorie deficit. Weigh food with a digital scale for 7 days to audit actual intake.</li>
          </ol>
        </>
      }
    >
      <TdeeCalculator />
    </CalcPage>
  );
}
