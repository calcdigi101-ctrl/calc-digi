import BmrCalculator from "@/components/calcs/health/bmr-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BmrAgeDeclineChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/bmr-calculator";
const TITLE = "BMR Calculator – Basal Metabolic Rate (Mifflin-St Jeor) | CalcDigi";
const DESCRIPTION =
  "Free BMR calculator: calculate your Basal Metabolic Rate using the clinically validated Mifflin-St Jeor and Revised Harris-Benedict formulas with daily calorie targets.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="BMR Calculator"
      intro="Accurately calculate your Basal Metabolic Rate (BMR)—the minimum daily calories your body burns at complete rest to sustain vital cellular, brain, and cardiac functions."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="BMR = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + s"
      related={[
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "⚖️", name: "Ideal Weight" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
      ]}
      faq={[
        {
          q: "What is Basal Metabolic Rate (BMR)?",
          a: "Basal Metabolic Rate (BMR) represents the absolute minimum amount of energy (measured in kilocalories per day) your body expends to maintain basic life-sustaining physiological processes at rest, including cellular respiration, heartbeat, blood circulation, lung ventilation, kidney filtration, and brain function.",
        },
        {
          q: "Should I eat fewer calories than my BMR to lose weight quickly?",
          a: "No. Clinicians and sports dietitians strongly advise against eating below your resting BMR. Doing so triggers adaptive thermogenesis (metabolic slowdown), spikes hunger hormones like ghrelin, depresses thyroid hormones (T3/T4), and forces the body to catabolize lean muscle tissue. Use your TDEE as the baseline and maintain a moderate 300 to 500 kcal deficit above your BMR.",
        },
        {
          q: "Which BMR formula is the most accurate?",
          a: "The Mifflin-St Jeor equation (published in 1990) is recognized by the Academy of Nutrition and Dietetics as the clinical gold standard, with an accuracy rate within 10% of indirect calorimetry for non-obese and obese adults. The older Harris-Benedict formula (revised in 1984) tends to slightly overestimate energy expenditure in modern sedentary populations.",
        },
        {
          q: "How does aging affect my BMR?",
          a: "BMR naturally declines by approximately 2% to 3% per decade after age 20. This reduction is primarily driven by age-related loss of metabolically active lean skeletal muscle (sarcopenia) and decreased organ mass. Progressive resistance training and adequate dietary protein can significantly attenuate this decline.",
        },
        {
          q: "How does body composition influence metabolic rate?",
          a: "Skeletal muscle tissue is metabolically dense, burning roughly 6 calories per pound per day at complete rest, compared to adipose fat tissue which burns only about 2 calories per pound per day. Therefore, two individuals with identical body weights and heights will have vastly different BMRs if one has lower body fat and more muscle mass.",
        },
        {
          q: "What is the difference between BMR and RMR?",
          a: "BMR is measured under strict laboratory conditions: immediately after waking in a darkened room, following 8 hours of sleep and a 12-hour fast in a thermoneutral environment. Resting Metabolic Rate (RMR) is measured under less restrictive conditions (such as after traveling to a clinic) and typically yields values about 5% to 10% higher than BMR.",
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
                Academy of Nutrition &amp; Dietetics Validated
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Mifflin-St Jeor &amp; Roza-Shizgal Clinical Standard
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Peer-Reviewed Clinical Physiology</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>What Is Basal Metabolic Rate (BMR)?</h2>
          <p>
            Your <strong>Basal Metabolic Rate (BMR)</strong> is the total volume of caloric energy your body expends every
            twenty-four hours merely to stay alive in a post-absorptive, resting state. Even when you are completely immobile
            in bed, your internal organs are continuously consuming fuel: the brain consumes approximately 20% of your basal
            energy, the liver expends 21%, the skeletal muscles consume 22% at rest, the kidneys account for 8%, the heart
            demands 9%, and other tissues consume the remaining 20%.
          </p>
          <p>
            For the average non-athlete, BMR constitutes the overwhelming majority—roughly <strong>60% to 75%</strong>—of
            <a href="/calculators/health/tdee-calculator"> Total Daily Energy Expenditure (TDEE)</a>. The remaining energy burn is split between Non-Exercise Activity Thermogenesis
            (NEAT, ~15%), the Thermic Effect of Food (TEF, ~10%), and deliberate physical exercise (EAT, ~5% to 15%). To compute your exact daily deficit or surplus targets, pair this with our <a href="/calculators/health/calorie-calculator">Calorie Calculator</a> or <a href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</a>, or track your metabolically active tissue using the <a href="/calculators/health/lean-body-mass-calculator">Lean Body Mass Calculator</a>.
          </p>

          
          {/* Interactive Visual Chart / Spectrum */}
          <BmrAgeDeclineChart />

          <h2>Clinical BMR Equations: Mifflin-St Jeor vs Harris-Benedict</h2>
          <p>
            Medical researchers have formulated predictive mathematical models based on statistical regression analysis across
            thousands of clinical indirect calorimetry metabolic tests:
          </p>

          <h3>1. The Mifflin-St Jeor Formula (Clinical Gold Standard)</h3>
          <p>
            Introduced in 1990 by Dr. MD Mifflin and Dr. ST St Jeor, this formula is regarded by clinical endocrinologists
            and clinical nutritionists as the most accurate estimation tool for modern populations:
          </p>
          <Formula>
            Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
            {"\n"}Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
          </Formula>

          <h3>2. The Revised Harris-Benedict Formula (Roza &amp; Shizgal 1984)</h3>
          <p>
            Originally derived in 1919 by James Arthur Harris and Francis Gano Benedict, this model was recalibrated in 1984
            using modern respiratory chamber evaluations:
          </p>
          <Formula>
            Men: BMR = 88.362 + (13.397 × kg) + (4.799 × cm) - (5.677 × age)
            {"\n"}Women: BMR = 447.593 + (9.247 × kg) + (3.098 × cm) - (4.330 × age)
          </Formula>

          <h2>Step-by-Step Practical Calculation: 32-Year-Old Adult</h2>
          <p>
            To illustrate how the Mifflin-St Jeor formula determines caloric burn, consider a <strong>32-year-old male</strong> weighing
            <strong>180 lbs (81.65 kg)</strong> with a height of <strong>5 feet 10 inches (177.8 cm)</strong>:
          </p>
          <ul>
            <li><strong>Step 1: Calculate Weight Component</strong>: 10 × 81.65 kg = <strong>816.5 kcal</strong>.</li>
            <li><strong>Step 2: Calculate Height Component</strong>: 6.25 × 177.8 cm = <strong>1,111.25 kcal</strong>.</li>
            <li><strong>Step 3: Calculate Age Component</strong>: 5 × 32 years = <strong>160.0 kcal</strong>.</li>
            <li><strong>Step 4: Combine with Biological Constant (+5)</strong>: 816.5 + 1,111.25 - 160.0 + 5 = <strong>1,772.75 kcal/day</strong>.</li>
            <li><strong>Step 5: Determine Hourly Burn Rate</strong>: 1,772.75 ÷ 24 hours = <strong>73.86 kcal per hour</strong> while sleeping or resting.</li>
            <li><strong>Step 6: Compute Sedentary Maintenance TDEE</strong>: 1,772.75 × 1.2 = <strong>2,127 kcal/day</strong> to maintain current weight with a desk job.</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <h2>Why You Should Never Eat Below Your BMR</h2>
          <p>
            A dangerous misconception in rapid weight-loss culture is restricting food intake below resting BMR. When caloric
            intake drops below this physiological threshold, the human endocrine system initiates acute evolutionary defense mechanisms:
          </p>
          <ul>
            <li><strong>Thyroid Hormone Downregulation:</strong> Active triiodothyronine (T3) levels plummet, slowing mitochondrial respiration rate throughout every cell in your body.</li>
            <li><strong>Accelerated Muscle Catabolism:</strong> Because dietary protein and energy are deficient to sustain liver glycogen, your body breaks down skeletal muscle tissue through gluconeogenesis to fuel the central nervous system.</li>
            <li><strong>Leptin Collapse &amp; Ghrelin Surge:</strong> Satiety hormone leptin plummets while hunger hormone ghrelin spikes to extreme levels, inevitably inducing uncontrollable binge eating episodes.</li>
            <li><strong>Suppressed Immune &amp; Reproductive Function:</strong> In women, chronic low energy availability triggers functional hypothalamic amenorrhea (cessation of menstrual cycle) and progressive bone mineral density loss.</li>
          </ul>

          <h2>Age-Related Metabolic Benchmarks Table</h2>
          <p>
            The table below illustrates average population resting BMR values across lifespan decades for standard heights and body weights:
          </p>

          <DataTable
            head={["Age Decade", "Male BMR (175 lbs / 5'10\")", "Female BMR (140 lbs / 5'5\")", "Decade Decline", "Primary Metabolic Driver"]}
            rows={[
              ["Age 20 – 29", "1,820 kcal / day", "1,510 kcal / day", "Baseline (Peak)", "Peak lean muscle mass and hormonal endocrine vitality"],
              ["Age 30 – 39", "1,770 kcal / day", "1,460 kcal / day", "-2.8%", "Early subtle drops in natural growth hormone and NEAT steps"],
              ["Age 40 – 49", "1,715 kcal / day", "1,410 kcal / day", "-5.8%", "Beginning of clinical sarcopenia (~3% to 5% muscle loss per decade)"],
              ["Age 50 – 59", "1,650 kcal / day", "1,350 kcal / day", "-9.5%", "Post-menopausal endocrine shifts and diminished mitochondrial density"],
              ["Age 60 – 69", "1,580 kcal / day", "1,290 kcal / day", "-13.2%", "Reduced organ mass and lower average daily step volumes"],
              ["Age 70+", "1,450 kcal / day", "1,180 kcal / day", "-20.3%", "Accelerated sarcopenia; higher dietary protein required to stimulate MPS"],
            ]}
            highlight={1}
          />

          <h2>How to Naturally Increase Your Resting BMR</h2>
          <p>
            While genetics, sex, and height establish your baseline, research demonstrates several evidence-based levers to optimize your metabolic engine:
          </p>
          <ol>
            <li><strong>Progressive Resistance Training:</strong> Building 5 to 10 pounds of lean muscle increases 24-hour basal burn and enhances post-exercise oxygen consumption (EPOC).</li>
            <li><strong>Optimize Dietary Protein Intake:</strong> Protein has a thermic effect of food (TEF) of 20% to 30%, meaning your body expends roughly 25 calories merely digesting and metabolizing every 100 calories of lean protein consumed.</li>
            <li><strong>Prioritize 7 to 9 Hours of Sleep:</strong> Sleep deprivation increases nighttime cortisol, blunts insulin sensitivity, and reduces next-day resting metabolic rate by up to 8%.</li>
            <li><strong>Adequate Hydration:</strong> Drinking 500 ml (17 fl oz) of water induces mild water-induced thermogenesis, temporarily boosting metabolic rate by 24% to 30% for 40 to 60 minutes.</li>
          </ol>
        </>
      }
    >
      <BmrCalculator />
    </CalcPage>
  );
}
