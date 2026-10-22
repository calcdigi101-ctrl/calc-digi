import ProteinIntakeCalculator from "@/components/calcs/health/protein-intake-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ProteinIntakeSpectrumChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/protein-intake-calculator";
const TITLE = "Protein Intake Calculator – Daily Grams for Muscle & Fat Loss | CalcDigi";
const DESCRIPTION =
  "Free protein intake calculator: determine your optimal daily protein target in grams based on body weight, resistance training, fat loss preservation, and ISSN sports nutrition guidelines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Protein Intake Calculator"
      intro="Accurately calculate your optimal daily dietary protein requirements in grams and meal doses based on body weight, training intensity, and athletic goals according to International Society of Sports Nutrition (ISSN) guidelines."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Daily Protein (g) = Weight (kg) * Goal Multiplier (0.8 to 2.4 g/kg)"
      related={[
        { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/one-rep-max-calculator", icon: "🏋️", name: "One Rep Max" },
      ]}
      faq={[
        {
          q: "How much protein do I need to build muscle?",
          a: "The International Society of Sports Nutrition (ISSN) and extensive meta-analyses by Dr. Brad Schoenfeld and Dr. Stuart Phillips recommend consuming 1.6 to 2.2 grams of protein per kilogram of body weight (0.73 to 1.0 grams per pound) daily when engaged in progressive resistance training to maximize muscle hypertrophy.",
        },
        {
          q: "Why is the RDA for protein (0.8 g/kg) considered too low for active adults?",
          a: "The Recommended Dietary Allowance (RDA) of 0.8 g/kg (0.36 g/lb) was established by the Institute of Medicine as the statistical minimum required to prevent clinical nitrogen deficiency and muscle wasting in sedentary individuals. It was never intended as an optimal target for athletes, active exercisers, or older adults striving to preserve muscle mass.",
        },
        {
          q: "Why do I need more protein during a fat loss diet?",
          a: "When you are in a caloric deficit, your body is in a catabolic energetic state and is more prone to breaking down lean skeletal muscle tissue for fuel through gluconeogenesis. Increasing protein to 2.0 to 2.4 g/kg (up to 1.1 g/lb) spares muscle mass, elevates metabolic burn via the thermic effect of food (TEF), and maximizes fullness hormones (PYY and GLP-1).",
        },
        {
          q: "How much protein can the body absorb in a single meal?",
          a: "While your digestive tract can eventually absorb almost all the protein you consume, the muscle protein synthesis (MPS) response reaches a biological saturation point (the 'muscle full' effect) at roughly 25 to 40 grams of high-quality protein (or ~0.40 g/kg per meal). Distributing protein evenly across 3 to 5 meals stimulates MPS more effectively than consuming all your protein in one giant dinner.",
        },
        {
          q: "What is the leucine threshold in protein nutrition?",
          a: "Leucine is an essential branched-chain amino acid (BCAA) that acts as the primary molecular trigger for the mTOR (mechanistic target of rapamycin) signaling pathway, which initiates muscle protein synthesis. Research shows a meal must provide roughly 2.5 to 3.0 grams of leucine (found in ~30g of whey, beef, chicken, or eggs) to fully stimulate the anabolic machinery.",
        },
        {
          q: "Can consuming a high-protein diet damage healthy kidneys?",
          a: "No. Systematic clinical reviews have repeatedly concluded that high-protein diets (up to 2.8 to 3.3 g/kg) have no adverse effects on glomerular filtration rate (GFR), renal function, or bone density in healthy individuals with normal kidney function. Individuals with pre-existing chronic kidney disease (CKD), however, must consult their nephrologist regarding clinical protein restriction.",
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
                ISSN Sports Nutrition Position Stand Validated
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Peer-Reviewed Meta-Analyses by Morton, Phillips &amp; Schoenfeld
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Exercise Physiology &amp; Anabolic Signaling</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>The Biological Role of Dietary Protein</h2>
          <p>
            Dietary protein is the sole macronutrient that provides organic nitrogen and essential amino acids required for the
            continual synthesis of structural proteins, hormones, enzymes, and immunoglobulins. While carbohydrates and fats serve
            predominantly as metabolic fuel substrates, amino acids are the fundamental molecular building blocks of all physical tissues.
          </p>
          <p>
            Human skeletal muscle is in a dynamic state of perpetual turnover, characterized by simultaneous <strong>Muscle Protein Synthesis (MPS)</strong> and
            <strong>Muscle Protein Breakdown (MPB)</strong>. When MPB exceeds MPS over time, muscle mass is lost (atrophy).
            To induce muscular growth (hypertrophy) or preserve muscle during a weight-loss diet, total MPS must exceed MPB. This net
            positive nitrogen balance requires two synergistic stimuli: mechanical tension from resistance training and sufficient essential amino acids
            from dietary protein.
          </p>

          
          {/* Interactive Visual Chart / Spectrum */}
          <ProteinIntakeSpectrumChart />

          <h2>The Clinical Protein Spectrum: RDA vs Sports Science</h2>
          <p>
            There is a vast gulf between the government RDA and the optimal athletic recommendations supported by modern sports science:
          </p>

          <h3>1. The RDA Deficiency Baseline (0.8 g/kg)</h3>
          <p>
            The Recommended Dietary Allowance (0.8 g/kg / 0.36 g/lb) represents the lowest amount of protein a sedentary individual can
            consume without developing clinical protein-energy malnutrition. It was derived from short-term nitrogen balance studies in the 1980s and
            does not support athletic performance, optimal body composition, or healthy muscle retention in aging adults.
          </p>

          <h3>2. The ISSN Athletic Hypertrophy Range (1.6 to 2.2 g/kg)</h3>
          <p>
            The landmark 2018 meta-analysis published in the <em>British Journal of Sports Medicine</em> (Morton et al., reviewing 49 studies
            and 1,863 participants) conclusively proved that protein supplementation enhances muscle mass and strength gains up to
            <strong>1.62 g/kg (0.73 g/lb)</strong>, with optimal confidence intervals extending up to <strong>2.2 g/kg (1.0 g/lb)</strong>.
          </p>
          <Formula>
            Optimal Daily Hypertrophy Protein = Body Weight (kg) × 1.6 to 2.2 g/kg
            {"\n"}Optimal Daily Hypertrophy Protein = Body Weight (lbs) × 0.8 to 1.0 g/lb
          </Formula>

          <h2>Step-by-Step Practical Calculation: 175-lb Lifter</h2>
          <p>
            Consider a <strong>175-lb (79.38 kg) individual</strong> lifting weights 4 days per week with the goal of increasing lean muscular tissue:
          </p>
          <ul>
            <li><strong>Step 1: Convert Weight to Kilograms</strong>: 175 lbs ÷ 2.20462 = <strong>79.38 kg</strong>.</li>
            <li><strong>Step 2: Apply Hypertrophy Factor (1.8 g/kg)</strong>: 79.38 kg × 1.8 g/kg = <strong>142.9 grams of protein per day</strong>.</li>
            <li><strong>Step 3: Calculate Caloric Value</strong>: 142.9 g × 4 kcal/g = <strong>571.6 calories from protein</strong>.</li>
            <li><strong>Step 4: Distribute Across 4 Daily Meals</strong>: 142.9 g ÷ 4 meals = <strong>35.7 grams of protein per meal</strong>.</li>
            <li><strong>Step 5: Verify Leucine Trigger Threshold</strong>: 36g of chicken breast, eggs, or whey provides ~3.1g of leucine—easily exceeding the ~2.7g threshold required to maximize the mTOR MPS cascade.</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <h2>Clinical Protein Requirements Across Disciplines Table</h2>
          <p>
            The table below shows validated protein recommendations across population groups and training goals based on guidelines
            from the International Society of Sports Nutrition (ISSN) and American College of Sports Medicine (ACSM):
          </p>

          <DataTable
            head={["Training Category / Life Stage", "g / kg Target", "g / lb Target", "Daily Target (175 lbs)", "Primary Physiological Objective"]}
            rows={[
              ["Sedentary Baseline", "0.8 g / kg", "0.36 g / lb", "63 g / day", "Prevents clinical nitrogen deficiency (IOM minimum)"],
              ["Healthy Aging (Age 50+)", "1.2 – 1.5 g / kg", "0.55 – 0.68 g / lb", "95 – 119 g / day", "Overcomes age-related anabolic resistance & prevents sarcopenia"],
              ["Endurance Athlete", "1.2 – 1.4 g / kg", "0.55 – 0.64 g / lb", "95 – 111 g / day", "Supports mitochondrial biogenesis, glycogen synthesis & tissue repair"],
              ["Hypertrophy & Strength", "1.6 – 2.2 g / kg", "0.73 – 1.00 g / lb", "127 – 175 g / day", "Maximal myofibrillar muscle protein synthesis (MPS) ceiling"],
              ["Caloric Deficit / Fat Loss", "2.0 – 2.4 g / kg", "0.91 – 1.10 g / lb", "159 – 191 g / day", "Spares lean mass during deficit; maximizes satiety hormones (PYY/GLP-1)"],
            ]}
            highlight={3}
          />

          <h2>The Leucine Trigger &amp; Meal Timing Distribution</h2>
          <p>
            Consuming your entire daily protein intake in a single meal is substantially less anabolic than distributing it evenly.
            Muscle protein synthesis is a refractory process: once stimulated by a bolus of amino acids containing at least
            <strong>2.5 to 3.0 grams of leucine</strong>, MPS remains elevated for approximately 2 to 3 hours before returning to baseline
            (the "muscle full" phenomenon).
          </p>
          <p>
            To maximize daily muscle synthesis, consume <strong>3 to 5 evenly spaced meals</strong>, each providing roughly
            0.40 g of protein per kg of body weight (~25g to 40g per meal), separated by 3 to 4 hours.
          </p>

          <h2>Protein Quality: Digestible Indispensable Amino Acid Score (DIAAS)</h2>
          <p>
            Not all protein sources are created equal. The Food and Agriculture Organization (FAO) evaluates protein quality using the
            <strong>DIAAS (Digestible Indispensable Amino Acid Score)</strong>, which measures true ileal amino acid digestibility:
          </p>
          <ul>
            <li><strong>Whey Protein Isolate (DIAAS 1.30+):</strong> Rapidly digested, exceptionally rich in leucine (~11%), making it the gold standard for post-workout recovery.</li>
            <li><strong>Whole Eggs &amp; Dairy (DIAAS 1.15 – 1.20):</strong> Near-perfect amino acid profile with exceptional bioavailability.</li>
            <li><strong>Beef, Poultry &amp; Fish (DIAAS 1.00 – 1.10):</strong> Complete protein sources containing high levels of creatine, carnosine, and bioavailable iron.</li>
            <li><strong>Soy, Pea &amp; Plant Blends (DIAAS 0.85 – 0.95):</strong> High-quality plant sources; pairing complementary grains (rice and beans) or supplementing with leucine optimizes anabolic potential.</li>
          </ul>
        
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Nutrition &amp; Performance Tools</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Optimizing protein distribution must be balanced against total daily energy and macronutrient targets. Structure your complete carbohydrate, fat, and protein ratios with our <a href="/calculators/health/macro-calculator">Macro Calculator</a>, determine daily energy needs with the <a href="/calculators/health/calorie-calculator">Calorie Calculator</a>, track active lean body mass with the <a href="/calculators/health/lean-body-mass-calculator">Lean Body Mass Calculator</a>, and test strength progression using the <a href="/calculators/health/one-rep-max-calculator">One Rep Max Calculator</a>.
            </p>
          </div>
    
        
        {/* Leucine Threshold & Splanchnic First-Pass Extraction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Leucine Trigger Hypothesis, Muscle Full Effect &amp; Splanchnic Extraction
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Skeletal muscle mass is determined by the net balance between Muscle Protein Synthesis (MPS) and Muscle Protein Breakdown (MPB) over time. Dietary amino acids do not merely serve as physical structural building blocks; specific branched-chain amino acids (BCAAs)—most notably L-leucine—act as potent intracellular molecular signaling ligands that activate the mechanistic target of rapamycin complex 1 (mTORC1).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Leucine Threshold (2.5g to 3.5g per Bolus)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To trigger the fractional synthetic rate of new muscle tissue, an individual meal must deliver sufficient leucine to cross the intracellular threshold (typically ~2.7–3.0 grams of leucine, found in 25–35g of intact whey, beef, eggs, or poultry). Once crossed, MPS peaks at 90 to 120 minutes and returns to baseline within 3 to 4 hours (muscle full effect), indicating that spreading protein across 3 to 5 meals optimizes daily net protein balance.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">First-Pass Splanchnic Extraction in Aging</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ingested dietary protein does not pass directly into systemic circulation; between 40% and 55% of dietary amino acids are extracted on first pass by the gut mucosa and liver (splanchnic bed) for local turnover and urea synthesis. In older adults suffering from anabolic resistance, splanchnic extraction increases, necessitating higher per-meal protein boluses (0.40–0.45 g/kg/meal) to stimulate youthful MPS rates.
              </p>
            </div>
          </div>
          <h2>Collagen Synthesis &amp; Connective Tissue Recovery</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consuming 15 to 20 grams of collagen peptides paired with 50 mg of Vitamin C approximately 45 to 60 minutes prior to tendon-loading exercise accelerates collagen synthesis, protects articular cartilage, and reinforces tendon durability.
          </p>
        </section>
        
          <h2>Quality Scoring &amp; Plant vs Animal Protein Bioavailability</h2>
          <p>
            Not all dietary protein sources are metabolized with equal biological efficiency. Nutrition science utilizes the Digestible Indispensable Amino Acid Score (DIAAS) to evaluate true ileal amino acid digestibility:
          </p>
          <ul>
            <li><strong>Whey Protein Isolate &amp; Whole Eggs (DIAAS &gt; 1.15):</strong> Rapidly digested, highly bioavailable, and exceptionally rich in branched-chain amino acids (leucine, isoleucine, valine) that rapidly saturate the muscle protein synthesis trigger.</li>
            <li><strong>Lean Meats, Poultry &amp; Fish (DIAAS 1.00–1.15):</strong> Complete essential amino acid profiles providing highly bioavailable micronutrients including heme iron, zinc, selenium, and preformed creatine.</li>
            <li><strong>Plant-Based Sources (Soy, Pea, Legumes, Rice, DIAAS 0.70–0.90):</strong> Plant proteins often exhibit lower concentrations of specific essential amino acids (methionine in legumes, lysine in grains). Plant-based athletes should combine complementary sources (e.g. pea and rice protein) and increase total daily intake by 10% to 15% (~1.8–2.2 g/kg) to match animal protein anabolic efficacy.</li>
          </ul>
          <p>
            Distribute protein evenly across 3 to 5 meals per day (25–40g per meal) to maintain continuous positive nitrogen balance and support muscle recovery.
          </p>

        
          <h2>Muscle Protein Synthesis (MPS) vs Breakdown &amp; Leucine Saturation</h2>
          <p>
            Skeletal muscle hypertrophy and recovery are governed by the dynamic equilibrium between Muscle Protein Synthesis (MPS) and Muscle Protein Breakdown (MPB). Ingesting dietary protein provides the essential amino acids (EAAs) required to synthesize new structural proteins. Specifically, the branched-chain amino acid L-leucine serves as the primary biochemical trigger that activates the intracellular mTORC1 pathway.
          </p>
          <p>
            To fully saturate the leucine trigger, each meal should deliver approximately 2.5 to 3.5 grams of leucine (found in roughly 25 to 40 grams of animal protein or 35 to 50 grams of complementary plant protein). Once triggered, muscle protein synthesis peaks at 90 to 120 minutes and returns to baseline within 3 to 4 hours. Distributing daily protein across 3 to 5 meals ensures continuous positive net protein balance throughout the day.
          </p>
          <h2>Anabolic Resistance in Older Adults</h2>
          <p>
            As adults age beyond 50, skeletal muscle tissue develops anabolic resistance—a blunted protein synthetic response to both dietary amino acids and mechanical tension. Overcoming anabolic resistance requires higher per-meal protein doses (0.40–0.45 g/kg/meal) and consistent resistance exercise to stimulate youthful rates of muscle repair and prevent sarcopenic muscle loss.
          </p>

        </>
      }
    >
      <ProteinIntakeCalculator />
    </CalcPage>
  );
}
