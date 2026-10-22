import type { Metadata } from "next";
import { Suspense } from "react";
import { CalorieCalculator } from "@/components/flagship/health/CalorieCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { CalorieMacroDeficitTrajectoryChart } from "@/components/flagship/health/editorial-charts/CalorieMacroDeficitTrajectoryChart";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/calorie-calculator";
const TITLE = "Calorie Calculator – Daily Calorie Needs & TDEE | CalcDigi";
const DESCRIPTION =
  "Free daily calorie calculator. Calculate your exact calorie needs for weight loss, maintenance, or muscle gain using the clinically validated Mifflin-St Jeor formula, with macro breakdowns.";

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
    q: "How many calories should I eat per day?",
    a: "The average adult requires 1,600 to 3,000 calories per day depending on biological sex, age, height, current weight, and physical activity level. Sedentary women typically require around 1,800 to 2,000 calories for maintenance, while moderately active men often need 2,400 to 2,800 calories.",
  },
  {
    q: "How many calories do I need to cut to lose 1 pound per week?",
    a: "One pound of body fat contains approximately 3,500 calories of energy. To lose 1 pound (0.45 kg) per week, you need an average daily calorie deficit of 500 calories below your Total Daily Energy Expenditure (TDEE). For 2 pounds per week, a 1,000-calorie daily deficit is required.",
  },
  {
    q: "What is the difference between BMR and TDEE?",
    a: "Basal Metabolic Rate (BMR) is the baseline number of calories your body burns at complete rest to keep organs functioning (breathing, circulating blood, cell repair). Total Daily Energy Expenditure (TDEE) is your BMR multiplied by your physical activity factor, representing the total calories you burn in a full 24-hour day.",
  },
  {
    q: "Why is the Mifflin-St Jeor formula considered the gold standard?",
    a: "The Mifflin-St Jeor equation was published in 1990 and is recognized by the Academy of Nutrition and Dietetics as the most clinically accurate formula for estimating resting metabolic rate in healthy individuals, outperforming the older 1919 Harris-Benedict formula by an average of 5% in clinical trials.",
  },
  {
    q: "What is the absolute minimum safe daily calorie intake?",
    a: "Medical guidelines establish that women should generally never consume fewer than 1,200 calories per day, and men should never consume fewer than 1,500 calories per day without direct clinical supervision. Eating below these thresholds increases the risk of gallstones, muscle wasting, metabolic slowdown, and severe nutrient deficiencies.",
  },
  {
    q: "How should I distribute my macronutrients (Protein, Carbs, Fats)?",
    a: "A balanced macro distribution comprises 25–35% protein, 40–50% carbohydrates, and 25–30% dietary fats. Protein provides 4 calories per gram, carbohydrates provide 4 calories per gram, and fats provide 9 calories per gram.",
  },
];

const ACTIVITY_ROWS = [
  ["Sedentary", "Little or no exercise; desk job", "BMR × 1.200"],
  ["Lightly Active", "Light exercise or sports 1–3 days per week", "BMR × 1.375"],
  ["Moderately Active", "Moderate exercise or sports 3–5 days per week", "BMR × 1.550"],
  ["Very Active", "Hard exercise or physical sports 6–7 days per week", "BMR × 1.725"],
  ["Extra Active", "Very heavy physical training, athletics, or physical labor job", "BMR × 1.900"],
];

const RELATED = [
  { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
  { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
  { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
  { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
  { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Health Calculators", item: `${SITE_URL}/pages/health` },
                { "@type": "ListItem", position: 3, name: "Calorie Calculator", item: `${SITE_URL}${PATH}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Calorie Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              applicationCategory: "HealthApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      <CalculatorPage
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/pages/health", label: "Health" },
          { label: "Calorie Calculator" },
        ]}
        title="Calorie Calculator"
        intro="Calculate your personalized daily calorie requirements for healthy weight loss, maintenance, or muscle gain. Powered by the clinically validated Mifflin-St Jeor formula with instant macronutrient breakdown."
      >
        <Suspense fallback={<div className="mt-6 h-[500px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <CalorieCalculator />
        </Suspense>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡</span> Related Calculators
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
          </div>
          <RelatedLinks links={RELATED} />
        </section>

        <Editorial>
          <h2>How Many Calories Do You Need Daily? (GEO Quick Answer)</h2>
          <p>
            Your <strong>Total Daily Energy Expenditure</strong> is computed by multiplying your <a href="/calculators/health/bmr-calculator">Basal Metabolic Rate (BMR)</a> — the calories burned at complete physical rest — by an activity multiplier using our <a href="/calculators/health/tdee-calculator">TDEE Calculator</a> based on your lifestyle and workout frequency.
          </p>
          <p>
            To maintain current weight, consume calories equal to your TDEE. To achieve safe, sustainable fat loss, establish a 500-calorie daily deficit using our <a href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</a> (equivalent to 1 lb of fat loss per week). To build muscle, target a mild 250 to 500-calorie daily surplus alongside resistance training and monitor your gram ratios with the <a href="/calculators/health/macro-calculator">Macro Calculator</a>.
          </p>

          <div className="not-prose my-8">
            <CalorieMacroDeficitTrajectoryChart />
          </div>

          <h2>The Mifflin-St Jeor Equation</h2>
          <p>
            The Mifflin-St Jeor equation is the international clinical benchmark for calculating human basal metabolic rate:
          </p>

          <h3>For Men:</h3>
          <Formula>BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5</Formula>

          <h3>For Women:</h3>
          <Formula>BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) − 161</Formula>

          <p>
            <em>Example:</em> A 30-year-old male weighing 75 kg (165 lbs) with a height of 178 cm (5′10″):
            <br />
            BMR = (10 × 75) + (6.25 × 178) − (5 × 30) + 5 = 750 + 1,112.5 − 150 + 5 = <strong>1,718 calories/day</strong>.
            <br />
            With moderate exercise (multiplier 1.55), his TDEE is 1,718 × 1.55 = <strong>2,663 calories/day</strong>.
          </p>

          <h2>Physical Activity Level Multipliers</h2>
          <p>
            Select the activity tier that accurately mirrors your habitual physical exertion over a typical week:
          </p>
          <DataTable
            head={["Activity Level", "Description", "TDEE Multiplier"]}
            rows={ACTIVITY_ROWS}
            highlight={2}
          />

          

          <h2>Macronutrient Distribution Guidelines</h2>
          <p>
            Calories provide the quantitative energy balance, but <strong>macronutrients</strong> determine body composition, hormonal health, and satiety:
          </p>
          <ul>
            <li>
              <strong>Protein (4 cal/g):</strong> Essential for muscle protein synthesis, tissue repair, and appetite regulation. Recommended range: 1.6 to 2.2 grams per kilogram of body weight for active individuals.
            </li>
            <li>
              <strong>Carbohydrates (4 cal/g):</strong> The body&rsquo;s preferred glycogen energy source for high-intensity training, brain function, and thyroid support.
            </li>
            <li>
              <strong>Dietary Fats (9 cal/g):</strong> Crucial for steroid hormone production (including testosterone and estrogen), fat-soluble vitamin absorption (A, D, E, K), and cellular membrane integrity.
            </li>
          </ul>

          
        {/* Adaptive Thermogenesis & Strategic Refeeds */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Overcoming Metabolic Adaptation: Strategic Diet Breaks &amp; Refeeds
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            During prolonged continuous caloric restriction, the human neuroendocrine system initiates adaptive thermogenesis. Circulating thyroid hormones (free T3), leptin, and testosterone decrease while ghrelin and cortisol rise, dropping resting metabolic rate by 10% to 15% beyond what is predicted by fat and lean mass loss alone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">48-Hour Carbohydrate Refeeds</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Implementing 1 to 2 consecutive days of maintenance calories focused on high complex carbohydrates elevates circulating leptin by up to 30%, replenishes intramuscular glycogen stores, suppresses muscle protein breakdown, and restores training power output.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Two-Week Diet Breaks (MATADOR Protocol)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The landmark MATADOR randomized controlled trial demonstrated that alternating two weeks of caloric deficit with two weeks of energy balance produced greater overall fat loss, higher resting metabolic rate retention, and superior long-term weight maintenance compared to continuous dieting.
              </p>
            </div>
          </div>
          <h2>Water Weight Fluctuations vs Genuine Fat Loss</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Glycogen binds 3 to 4 grams of intracellular water per gram. Early diet weight drops reflect fluid clearance rather than pure adipose loss. Prioritize protein intakes of 1.0 to 1.2 grams per pound of lean body mass to protect skeletal muscle tissue while maintaining a consistent daily step count to counteract subconscious NEAT reduction.
          </p>
        </section>

          
          <h2>Sustainable Caloric Deficit Strategies for Long-Term Fat Loss</h2>
          <p>
            Ensure your fat loss journey is healthy, sustainable, and permanent with these clinical principles:
          </p>
          <ul>
            <li><strong>Choose a Moderate Deficit (300 to 500 kcal):</strong> Moderate deficits produce steady, predictable fat loss of 0.5 to 1.0 lb per week while preserving energy, workout performance, and lean muscle mass.</li>
            <li><strong>Prioritize High Dietary Protein (&ge;1.0 g/lb lean mass):</strong> Protein provides maximum satiety, burns calories through the thermic effect of food, and prevents muscle wasting during dieting.</li>
            <li><strong>Incorporate Structured Diet Breaks:</strong> Every 8 to 12 weeks of dieting, spend 1 to 2 weeks eating at maintenance calories to normalize leptin and thyroid hormones before resuming a deficit.</li>
            <li><strong>Focus on Sleep &amp; Stress Management:</strong> Chronically elevated cortisol and sleep deprivation increase appetite, drive cravings for hyper-palatable foods, and promote muscle breakdown.</li>
          </ul>
          <p>
            Approach fat loss with patience, track weekly weight averages, and build healthy habits that last a lifetime.
          </p>


          
          <h2>Dietary Induced Thermogenesis &amp; Long-Term Energy Regulation</h2>
          <p>
            The Thermic Effect of Food (TEF) accounts for approximately 8% to 10% of total daily calorie expenditure. Different macronutrients carry vastly different energetic extraction costs: dietary protein requires 20% to 30% of its caloric value simply for digestion and metabolic processing, compared to 5% to 10% for carbohydrates and 0% to 3% for dietary fats.
          </p>
          <p>
            Consequently, a high-protein diet accelerates metabolic rate, supports muscle tissue preservation, and provides powerful satiety signaling via peptide YY and GLP-1, making calorie restriction significantly easier to sustain over months.
          </p>


          
          <h2>Adaptive Thermogenesis &amp; Mitochondrial Uncoupling</h2>
          <p>
            During prolonged periods of caloric deficit, the body engages adaptive thermogenesis—a reduction in resting energy expenditure beyond what is predicted by the loss of body mass alone. This evolutionary survival mechanism downregulates mitochondrial uncoupling proteins (such as UCP3 in skeletal muscle), increasing metabolic efficiency so fewer calories are dissipated as heat.
          </p>
          <p>
            Incorporating intermittent refeed days at maintenance calories stimulates leptin secretion and temporarily reverses adaptive thermogenesis, protecting training performance and supporting sustainable fat loss.
          </p>

          <h2>Frequently Asked Questions</h2>
          <Faq items={FAQ_ITEMS} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
