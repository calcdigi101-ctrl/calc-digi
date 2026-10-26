import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalorieCalculator } from "@/components/flagship/health/CalorieCalculator";
import { CalorieMacroDeficitTrajectoryChart } from "@/components/flagship/health/editorial-charts/CalorieMacroDeficitTrajectoryChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/health/calorie-calculator";
const TITLE = "Calorie Calculator | Daily Calorie Needs, TDEE, Deficit & Macro Split";
const DESCRIPTION =
  "Calculate your exact daily calorie needs for sustainable fat loss, weight maintenance, or lean muscle gain. Powered by the clinically validated Mifflin-St Jeor formula.";

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

const FAQ_ITEMS = [
  {
    q: "How many calories should an average adult consume per day?",
    a: "Daily calorie requirements vary according to biological sex, age, height, total body mass, and occupational physical activity. Sedentary adult women generally need between 1,600 and 2,000 calories per day to maintain baseline weight, while sedentary adult men require 2,000 to 2,400 calories. Active individuals engaging in regular sports, heavy lifting, or manual labor often require 2,600 to 3,200 calories per day to preserve physiological homeostasis.",
  },
  {
    q: "How many calories do I need to burn or cut to lose 1 pound of fat?",
    a: "One pound of human adipose tissue stores approximately 3,500 kilocalories of metabolic chemical energy. Establishing a cumulative 500-calorie daily deficit below your Total Daily Energy Expenditure (TDEE) produces a theoretical deficit of 3,500 calories over seven days, translating to approximately 1 pound (0.45 kg) of fat loss per week. For faster weight loss of 2 pounds per week, a 1,000-calorie daily deficit is required, though medical supervision is advised.",
  },
  {
    q: "What is the key biological difference between BMR and TDEE?",
    a: "Basal Metabolic Rate (BMR) measures the minimal thermodynamic energy required to sustain vital cellular functions—such as pulmonary respiration, cardiac blood circulation, neural processing, cellular ion transport, and renal filtration—at complete physiological and thermal rest. In contrast, Total Daily Energy Expenditure (TDEE) encompasses BMR plus the Thermic Effect of Food (TEF), Non-Exercise Activity Thermogenesis (NEAT), and planned physical exercise.",
  },
  {
    q: "Why is the Mifflin-St Jeor formula preferred over the older Harris-Benedict formula?",
    a: "The Mifflin-St Jeor equation, introduced in 1990, was validated on contemporary populations with varying body compositions. Systematic reviews by the Academy of Nutrition and Dietetics determined that Mifflin-St Jeor predicts resting metabolic rate within 10% of indirect calorimetry in over 82% of non-obese and obese adults, whereas the original 1919 Harris-Benedict equation systematically overestimates human caloric needs by 5% to 15%.",
  },
  {
    q: "What is the absolute lowest daily caloric intake safe for adults?",
    a: "Clinical endocrinology guidelines set safe unmonitored floors at 1,200 calories per day for adult women and 1,500 calories per day for adult men. Restricting intake below these thresholds without strict medical supervision precipitates acute micronutrient deficiencies, biliary gallstone formation, skeletal muscle catabolism, thyroid hormone suppression (low free T3), and adaptive metabolic slowdown.",
  },
  {
    q: "How should I structure my macronutrient split for fat loss versus muscle hypertrophy?",
    a: "For fat loss while preserving lean skeletal mass, clinical sports nutrition recommends 1.6 to 2.2 grams of protein per kilogram of body weight (roughly 30% to 35% of total calories), 20% to 25% dietary fats for endocrine health, and remaining calories from unrefined complex carbohydrates. For muscular hypertrophy, carbohydrates should increase to 45% to 55% of caloric intake to fuel high-intensity glycogen demands and optimize insulin-mediated amino acid uptake.",
  },
  {
    q: "What is metabolic adaptation, and why do fat loss plateaus occur?",
    a: "Metabolic adaptation (adaptive thermogenesis) is an evolutionary defense against starvation. As body mass declines and caloric restriction persists, circulating leptin, thyroid hormones (T3), and sympathetic nervous activity decrease, while ghrelin and cortisol rise. This neuroendocrine shift reduces non-exercise activity (NEAT) and resting energy expenditure by 10% to 15% beyond weight loss alone, necessitating structured refeeds or diet breaks.",
  },
  {
    q: "Can I gain muscle and lose body fat simultaneously (body recomposition)?",
    a: "Yes. Body recomposition occurs most reliably in resistance-training novices, individuals returning from training layoffs, and individuals with elevated body fat percentages. It requires maintaining a slight calorie deficit (200 to 300 kcal/day) or eating at exact maintenance, consuming high dietary protein (2.0 to 2.4 g/kg), and applying progressive overload in resistance training to stimulate muscle protein synthesis.",
  },
];

const ACTIVITY_ROWS = [
  ["Sedentary (Office / Desk Job)", "Little or no structured exercise; predominantly seated lifestyle", "BMR × 1.200"],
  ["Lightly Active (1–3 Days/Week)", "Light walking, yoga, leisure cycling, or recreational sports 1–3 days", "BMR × 1.375"],
  ["Moderately Active (3–5 Days/Week)", "Moderate cardiovascular conditioning or resistance training 3–5 days", "BMR × 1.550"],
  ["Very Active (6–7 Days/Week)", "Intense athletic training, heavy lifting, or strenuous sports 6–7 days", "BMR × 1.725"],
  ["Extra Active (Twice Daily / Physical Labor)", "Competitive athlete, construction worker, or endurance marathon training", "BMR × 1.900"],
];

const MACRO_ROWS = [
  ["Dietary Protein", "4 kcal / gram", "1.6 – 2.2 g/kg (25% – 35%)", "Stimulates muscle protein synthesis, repairs tissue, and delivers high satiety."],
  ["Complex Carbohydrates", "4 kcal / gram", "3.0 – 5.0 g/kg (40% – 50%)", "Replenishes muscle and liver glycogen, powers anaerobic glycolysis, supports thyroid."],
  ["Essential Dietary Fats", "9 kcal / gram", "0.8 – 1.2 g/kg (20% – 30%)", "Synthesizes steroid hormones (testosterone, estrogen) and absorbs vitamins A, D, E, K."],
  ["Dietary Fiber", "1.5 – 2.0 kcal / g", "28 – 38 g daily total", "Slows glycemic transit, feeds gut microbiome, and modulates circulating LDL cholesterol."],
];

const RELATED = [
  { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
  { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
  { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
  { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
  { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
];

export default function CalorieCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/health", label: "Health" }}
      title={TITLE}
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\\text{BMR} = 10m + 6.25h - 5a + s"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Mifflin-St Jeor &amp; Academy of Nutrition Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>Indirect Calorimetry Precision</span>
          </div>
          <h2>How Many Daily Calories Do You Need? (Quick Answer)</h2>
          <p>
            Your exact daily calorie requirement is your <strong>Total Daily Energy Expenditure (TDEE)</strong>. It is calculated by determining your <Link href="/calculators/health/bmr-calculator">Basal Metabolic Rate (BMR)</Link>—the baseline energy expended to sustain life at complete physical rest—and multiplying it by a physical activity level factor between 1.20 and 1.90 using our <Link href="/calculators/health/tdee-calculator">TDEE Calculator</Link>.
          </p>
          <p>
            To maintain your current weight, consume calories equal to your TDEE. To lose 1 pound of adipose tissue per week, establish a consistent 500-calorie daily deficit using our <Link href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</Link>. Conversely, to build lean muscle mass while minimizing adipose gain, consume a modest 250 to 500-calorie daily surplus paired with structured resistance training, monitoring macronutrient ratios through our <Link href="/calculators/health/macro-calculator">Macro Calculator</Link>.
          </p>

          <div className="not-prose my-8">
            <CalorieMacroDeficitTrajectoryChart />
          </div>

          <h2>The Clinical Mifflin-St Jeor Formula</h2>
          <p>
            Published in 1990 by Dr. MD Mifflin and Dr. ST St Jeor in the <em>American Journal of Clinical Nutrition</em>, this formula is universally recognized by the Academy of Nutrition and Dietetics as the most reliable predictive equation for resting metabolic rate:
          </p>

          <h3>Mifflin-St Jeor Formula for Men:</h3>
          <Formula>
            {"\\text{BMR} = (10 \\times \\text{weight in kg}) + (6.25 \\times \\text{height in cm}) - (5 \\times \\text{age in years}) + 5"}
          </Formula>

          <h3>Mifflin-St Jeor Formula for Women:</h3>
          <Formula>
            {"\\text{BMR} = (10 \\times \\text{weight in kg}) + (6.25 \\times \\text{height in cm}) - (5 \\times \\text{age in years}) - 161"}
          </Formula>

          <p>
            <strong>Practical Example:</strong> Consider a 32-year-old male weighing 80 kg (176.4 lbs) with a height of 180 cm (5′11″):
          </p>
          <Formula>
            {"\\text{BMR} = (10 \\times 80) + (6.25 \\times 180) - (5 \\times 32) + 5 = 800 + 1125 - 160 + 5 = 1770 \\text{ kcal/day}"}
          </Formula>
          <p>
            If he participates in moderate exercise 4 days per week (activity factor of 1.55), his maintenance energy expenditure is:
          </p>
          <Formula>
            {"\\text{TDEE} = 1770 \\times 1.55 = 2743.5 \\text{ kcal/day}"}
          </Formula>
          <p>
            To achieve a steady fat loss rate of 1 lb (0.45 kg) per week, his target caloric intake becomes 2,243 kcal/day. You can evaluate how this correlates with your body composition using our <Link href="/calculators/health/bmi-calculator">BMI Calculator</Link> and <Link href="/calculators/health/body-fat-calculator">Body Fat Calculator</Link>.
          </p>

          <h2>The Katch-McArdle Formula (Lean Mass Specific)</h2>
          <p>
            When an individual knows their exact body composition from a DEXA scan or hydrostatic weighing, the Katch-McArdle equation provides superior metabolic accuracy because it calculates energy expenditure strictly from metabolically active Lean Body Mass (LBM) rather than total body weight:
          </p>
          <Formula>
            {"\\text{BMR} = 370 + (21.6 \\times \\text{Lean Body Mass in kg})"}
          </Formula>
          <p>
            Because adipose tissue consumes only 4.5 kcal/kg per day compared to 13.0 kcal/kg per day for skeletal muscle and over 200 kcal/kg per day for vital organs (heart, liver, kidneys, brain), the Katch-McArdle formula prevents underestimating caloric needs in lean athletes and overestimating them in individuals with higher adiposity.
          </p>

          <h2>Physical Activity Level Multipliers</h2>
          <p>
            The Physical Activity Level (PAL) multiplier converts baseline resting metabolic rate into Total Daily Energy Expenditure. Selecting the correct factor is critical to avoid unintentional deficits or surpluses:
          </p>
          <DataTable
            head={["Activity Category", "Lifestyle & Training Description", "TDEE Multiplier"]}
            rows={ACTIVITY_ROWS}
            highlight={2}
          />

          <h2>Macronutrient Partitioning & Energetic Densities</h2>
          <p>
            While total caloric intake determines the trajectory of body weight changes (thermodynamic energy balance), <strong>macronutrient composition</strong> determines whether weight lost represents adipose tissue or functional skeletal muscle. Protein delivers maximal satiety and thermic expenditure, as detailed in our <Link href="/calculators/health/protein-calculator">Protein Calculator</Link>.
          </p>
          <DataTable
            head={["Macronutrient", "Caloric Density", "Target Intake Range", "Physiological Function"]}
            rows={MACRO_ROWS}
          />

          <h2>Components of Total Daily Energy Expenditure</h2>
          <p>
            Human daily energy expenditure is composed of four distinct thermodynamic compartments:
          </p>
          <ul>
            <li>
              <strong>Basal Metabolic Rate (BMR, 60%–70% of TDEE):</strong> The cellular maintenance cost of heart contractions, brain ion gradients, protein turnover, and organ respiration at rest.
            </li>
            <li>
              <strong>Thermic Effect of Food (TEF, 8%–10% of TDEE):</strong> The energetic cost of chewing, swallowing, digesting, absorbing, and storing macronutrients. Dietary protein demands 20% to 30% of its caloric value for processing, compared to 5% to 10% for carbohydrates and 0% to 3% for dietary fats.
            </li>
            <li>
              <strong>Non-Exercise Activity Thermogenesis (NEAT, 15%–30% of TDEE):</strong> All spontaneous physical movement that is not structured exercise, including fidgeting, typing, pacing, walking between rooms, and maintaining upright posture. NEAT is the primary variable that subconscious metabolic adaptation suppresses during aggressive diets.
            </li>
            <li>
              <strong>Exercise Activity Thermogenesis (EAT, 5%–15% of TDEE):</strong> Caloric expenditure resulting from planned cardiovascular workouts, resistance training sessions, and sports.
            </li>
          </ul>

          <h2>The Protein Leverage Hypothesis & Thermic Expenditure</h2>
          <p>
            Formulated by evolutionary biologists Drs. David Raubenheimer and Stephen Simpson, the <strong>Protein Leverage Hypothesis</strong> posits that the human neuroendocrine appetite system continues to drive caloric consumption until a specific daily physiological protein requirement is satisfied. When dietary regimens are low in protein density (e.g., standard Western diets dominated by refined starches and industrial vegetable oils), individuals subconsciously overconsume total carbohydrate and fat calories in a biological drive to obtain necessary essential amino acids.
          </p>
          <p>
            By anchoring your daily nutrition around high-quality whole protein sources (1.6 to 2.2 grams per kilogram of body weight), you exploit two synergistic metabolic advantages: substantial natural appetite suppression mediated through enhanced peptide YY (PYY) and glucagon-like peptide-1 (GLP-1) release, and elevated postprandial thermogenesis that dissipates up to 30% of consumed protein calories as radiant body heat.
          </p>

          <h2>Combating Metabolic Adaptation: Diet Breaks & Carbohydrate Refeeds</h2>
          <p>
            During prolonged caloric deficits, the neuroendocrine system initiates adaptive thermogenesis. Circulating thyroid hormones (free T3), leptin, and testosterone decline, while cortisol and the hunger hormone ghrelin rise. This physiological response can depress resting energy expenditure by 10% to 15% below expectations based purely on loss of body mass.
          </p>
          <p>
            To mitigate hormonal downregulation and sustain physical performance during extended weight loss, nutrition researchers recommend structured diet breaks and carbohydrate refeeds:
          </p>
          <ul>
            <li>
              <strong>48-Hour Carbohydrate Refeeds:</strong> Eating at maintenance calories for 2 consecutive days, with the caloric increase coming predominantly from complex carbohydrates, transiently elevates circulating leptin by up to 30%, replenishes muscle glycogen, and restores intense training output.
            </li>
            <li>
              <strong>Two-Week Diet Breaks (MATADOR Protocol):</strong> The landmark MATADOR clinical study demonstrated that alternating 2 weeks of moderate caloric deficit with 2 weeks of caloric balance achieved significantly greater fat loss and long-term metabolic retention than continuous uninterrupted energy restriction.
            </li>
          </ul>

          <h2>Post-Diet Reverse Dieting: Restoring Metabolic Capacity</h2>
          <p>
            Following the successful completion of an extended cutting phase, immediately returning to historical ad-libitum calorie intakes carries high risks of rapid fat regaining—a biological phenomenon termed "hyperplastic catch-up fat." Because circulating adipokines remain suppressed and gastrointestinal gastric capacity is heightened, newly consumed excess calories are disproportionately shuttled into empty adipocytes.
          </p>
          <p>
            To safely transition out of an energy deficit, implement a structured <strong>reverse diet</strong>. Increase daily intake by 50 to 100 calories per week, primarily through complex carbohydrates and healthy unsaturated fats, while holding protein steady. This gradual incremental ramp-up stimulates progressive increases in spontaneous NEAT, normalizes thyroid hormone conversion (T4 to active free T3), and establishes a higher maintenance caloric ceiling without unwanted adipose accumulation.
          </p>
          <p>
            To verify healthy milestone weight targets, compare your progress with our clinical <Link href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</Link> and calculate fractional percentage changes with the <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Step-by-Step Guide to Establishing Your Caloric Intake</h2>
          <ol>
            <li>
              <strong>Step 1: Calculate Baseline TDEE:</strong> Input your biological sex, current age, height, weight, and realistic activity level into the calculator above.
            </li>
            <li>
              <strong>Step 2: Select Your Physiological Goal:</strong> Choose between mild fat loss (300 kcal deficit), moderate fat loss (500 kcal deficit), weight maintenance, or lean muscle bulking (250 to 400 kcal surplus).
            </li>
            <li>
              <strong>Step 3: Lock in Daily Dietary Protein:</strong> Set protein intake between 1.6 and 2.2 grams per kilogram of total body weight (0.8 to 1.0 g/lb) to preserve lean tissue and curb hunger.
            </li>
            <li>
              <strong>Step 4: Distribute Carbohydrates and Fats:</strong> Allocate 20% to 30% of remaining calories to healthy fats for hormonal stability, and allocate the remainder to fiber-rich complex carbohydrates to support glycogen storage and high-intensity exercise capacity.
            </li>
            <li>
              <strong>Step 5: Monitor Weekly Averages:</strong> Weigh yourself daily in the morning after voiding and track the weekly arithmetic average. Adjust daily intake by 100 to 150 calories if the rate of scale weight change deviates from your target over a consecutive 2 to 3-week evaluation block.
            </li>
          </ol>

          <h2>Clinical Takeaways for Lifelong Energy Balance</h2>
          <p>
            Sustainable body transformation requires viewing energy balance through a long-term physiological lens rather than an acute punitive crash diet. Aligning your daily calorie targets with clinically validated predictive models, defending skeletal muscle mass with adequate protein and progressive resistance stimulus, and honoring biological recovery signals ensures permanent metabolic vitality and cardiovascular health.
          </p>
        </>
      }
    >
      <CalorieCalculator />
    </CalcPage>
  );
}
