import BodyShapeCalculator from "@/components/calcs/health/body-shape-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BodyProportionsMatrixChart } from "@/components/flagship/health/editorial-charts/BodyProportionsMatrixChart";

const PATH = "/calculators/health/body-shape-calculator";
const TITLE = "Body Shape Calculator – Hourglass, Pear, Apple & WHR | CalcDigi";
const DESCRIPTION =
  "Discover your precise anatomical body shape (Hourglass, Pear, Rectangle, Apple, Inverted Triangle) with our clinical calculator. Includes WHO waist-to-hip risk profiling and tailored training.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const WHO_WHR_TABLE = [
  { category: "Low Cardiometabolic Risk", womenWhr: "< 0.80", menWhr: "< 0.90", clinicalProfile: "Minimal visceral adiposity; protective gluteofemoral subcutaneous fat profile; low incidence of metabolic syndrome." },
  { category: "Moderate Risk Tier", womenWhr: "0.80 – 0.84", menWhr: "0.90 – 0.94", clinicalProfile: "Gradual central fat accumulation; regular physical conditioning and glycemic monitoring recommended." },
  { category: "Substantially Increased Risk", womenWhr: "≥ 0.85", menWhr: "≥ 0.95", clinicalProfile: "High visceral abdominal fat (VAT); elevated risk of Type 2 diabetes, non-alcoholic fatty liver disease (NAFLD), and coronary artery disease." },
];

const SHAPE_PRESCRIPTION_TABLE = [
  {
    shape: "Hourglass (X-Shape)",
    ratioCriteria: "Bust and hips within 1–2 inches; waist ≥ 8 inches smaller than bust & hips.",
    exerciseFocus: "Full-body functional resistance training, compound squat patterns, overhead press, and moderate Zone 2 cardio.",
    nutritionalStrategy: "Balanced macronutrient distribution (40% carbs, 30% protein, 30% fat) with emphasis on whole-food satiety.",
  },
  {
    shape: "Pear / Spoon (Gynoid)",
    ratioCriteria: "Hips ≥ 2 inches larger than bust; waist-to-hip ratio typically < 0.75.",
    exerciseFocus: "Upper body hypertrophy (lateral raises, lat pulldowns, incline press) to balance silhouette; high-cadence cycling.",
    nutritionalStrategy: "Lower total dietary saturated fats; prioritize monounsaturated fats (olive oil, avocados) and high dietary fiber.",
  },
  {
    shape: "Rectangle (Banana)",
    ratioCriteria: "Bust, waist, and hips within 3 inches of each other; waist indentation < 7 inches.",
    exerciseFocus: "Hypertrophy targeting the latissimus dorsi, side deltoids, and gluteus maximus to create visual waist curvature.",
    nutritionalStrategy: "Higher complex carbohydrate intake and protein (1.8–2.0 g/kg) to fuel progressive muscle hypertrophy.",
  },
  {
    shape: "Inverted Triangle (V-Shape)",
    ratioCriteria: "Bust/shoulders ≥ 2.5 inches wider than hips; waist-to-hip ratio typically 0.80–0.90.",
    exerciseFocus: "Lower-body progressive overload (Romanian deadlifts, walking lunges, hip thrusts) to build gluteal and quad volume.",
    nutritionalStrategy: "Sufficient caloric intake to support lower-body muscular growth without excess abdominal adipose spillover.",
  },
  {
    shape: "Apple (Android / Oval)",
    ratioCriteria: "Waist within 10% of bust and hips, or waist greater than hips; WHR ≥ 0.85 (female) / ≥ 0.95 (male).",
    exerciseFocus: "High-volume cardiovascular conditioning (150–300 min/week), HIIT intervals to deplete visceral fat, core bracing.",
    nutritionalStrategy: "Low-glycemic Mediterranean protocol; minimize refined sugars and fructose to alleviate hepatic steatosis.",
  },
];

export default function BodyShapePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Body Shape Calculator"
      intro="Determine your precise anatomical body shape—Hourglass, Pear, Rectangle, Apple, or Inverted Triangle—using standardized anthropometric ratios and WHO cardiometabolic risk indices."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{WHR} = \frac{\text{Waist Circumference}}{\text{Hip Circumference}} ; \quad \text{BHR} = \frac{\text{Bust}}{\text{Hip}}"
      related={[
        { href: "/calculators/health/waist-to-hip-ratio-calculator", icon: "📏", name: "Waist-to-Hip" },
        { href: "/calculators/health/waist-to-height-ratio-calculator", icon: "📐", name: "Waist-to-Height" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
        { href: "/calculators/health/lean-body-mass-calculator", icon: "💪", name: "Lean Body Mass" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What are the 5 primary morphological body shapes?",
          a: "The five universally recognized anthropometric phenotypes are: 1) Hourglass (balanced bust and hips with a significantly defined natural waist); 2) Pear / Spoon (hips and thighs wider than shoulders and bust); 3) Rectangle / Banana (uniform measurements across bust, waist, and hips with minimal curve); 4) Inverted Triangle (shoulders and bust wider than hips); and 5) Apple / Android (waist measurement equal to or larger than bust and hips, carrying adipose tissue centrally in the abdomen).",
        },
        {
          q: "Why is an Apple body shape associated with higher medical risks than a Pear shape?",
          a: "Apple phenotypes accumulate adipose tissue centrally in the intra-abdominal cavity as Visceral Adipose Tissue (VAT), surrounding the liver, pancreas, and intestines. VAT is metabolically hyperactive, continuously releasing free fatty acids directly into the portal circulation and secreting inflammatory cytokines (TNF-alpha, Interleukin-6) that cause systemic insulin resistance, non-alcoholic fatty liver disease, and atherosclerosis. In contrast, pear phenotypes store subcutaneous fat in the hips and thighs (gluteofemoral depot), which secretes protective adiponectin and acts as a safe lipid sink.",
        },
        {
          q: "Can I alter my skeletal body shape through diet and strength training?",
          a: "Your skeletal framework—the width of your pelvic iliac crests, rib cage dimensions, and clavicle breadth—is genetically fixed. However, muscular hypertrophy and adipose tissue redistribution dramatically modify your external silhouette. You cannot 'spot-reduce' fat from a specific region, but overall caloric deficit reduces midsection visceral fat, while targeted progressive resistance training (e.g., building latissimus dorsi and gluteal muscles) creates the visual taper of an hourglass or athletic V-taper.",
        },
        {
          q: "How should I measure my bust, waist, and hips for maximum accuracy?",
          a: "Use a flexible non-stretch fiberglass tape measure parallel to the floor in front of a mirror: 1) Bust/Chest: Across the fullest projection of the chest; 2) Waist: At the narrowest point of the torso, typically 1 to 2 inches above the umbilicus (belly button) at the end of a normal, relaxed exhalation; 3) Hips: Around the widest prominence of the buttocks and greater trochanters of the femur.",
        },
        {
          q: "What does the World Health Organization (WHO) state about Waist-to-Hip Ratio (WHR)?",
          a: "The World Health Organization establishes that a Waist-to-Hip Ratio (WHR) above 0.85 for women and above 0.90 for men signifies central android adiposity and substantially elevates the long-term risk of cardiovascular disease, myocardial infarction, stroke, and type 2 diabetes mellitus.",
        },
        {
          q: "What is the difference between Android and Gynoid fat distribution?",
          a: "Android fat distribution ('male-pattern' or apple) is concentrated around the trunk and upper abdomen, driven by cortisol and lower androgen-to-estrogen balance, and poses significant cardiovascular risk. Gynoid fat distribution ('female-pattern' or pear) is localized to the lower body (hips, buttocks, and thighs) under the influence of estrogens, providing evolutionary metabolic reserves for pregnancy and lactation with cardioprotective properties.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Anthropometry &amp; Cardiometabolic Review:</span> Calibrated to the World Health Organization (WHO) STEPS surveillance manual, Female Figure Identification Technique (FFIT), and adipose tissue biology.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Verified Epidemiological Standards</div>
        </div>

        {/* Section 1: Anthropometric Science */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Science of Anthropometry: Beyond Simple Scale Weight
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human morphology and public health epidemiology, an individual&apos;s physical profile is governed by two interacting vectors: <strong>skeletal frame geometry</strong> (determined by genetic osteological development) and <strong>adipose tissue partitioning</strong> (regulated by endocrine sex hormones, cortisol, and genetics).
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While Body Mass Index (BMI) remains a broad population metric, it is blind to spatial body composition. Two individuals with identical BMIs of 24.5 kg/m² can have fundamentally distinct health trajectories: one carrying protective gluteofemoral subcutaneous fat (pear phenotype), and the other harboring hazardous intra-abdominal visceral adiposity (apple phenotype). Measuring circumferential proportions provides a direct window into endocrine and cardiovascular wellness.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Morphometry &amp; Visceral Risk Visualizer
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore the biomechanical silhouettes, Waist-to-Hip Ratios (WHR), adipose tissue storage depots, and cardiovascular risk profiles across the five primary human body shapes. Tap any profile to view targeted clinical recommendations:
          </p>
          <BodyProportionsMatrixChart />
        </section>

        {/* Section 3: Visceral vs Subcutaneous Adipose Biology */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Adipose Depot Biology: Visceral (VAT) vs. Subcutaneous (SAT) Fat
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The health consequences of body shape stem directly from the physiological distinction between two distinct adipose tissue depots:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                Visceral Adipose Tissue (VAT) — Apple Phenotype
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Located deep within the peritoneal cavity surrounding internal abdominal organs (mesenteric and omental depots). VAT possesses dense adrenergic innervation, high lipolytic activity, and drains directly into the <strong>hepatic portal vein</strong>.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <li>Floods the liver with free fatty acids, inducing hepatic steatosis (NAFLD).</li>
                <li>Hyper-secretes pro-inflammatory cytokines: Interleukin-6 (IL-6), TNF-α, and PAI-1.</li>
                <li>Reduces circulating adiponectin, triggering systemic insulin resistance.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Gluteofemoral Subcutaneous Fat (SAT) — Pear Phenotype
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Positioned underneath the dermis around the hips, buttocks, and upper thighs. Governed by estrogen receptor alpha (ERα) signaling in females, this tissue acts as a <strong>protective metabolic buffer</strong>.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <li>Acts as a high-capacity sink, trapping excess circulating fatty acids safely.</li>
                <li>Abundantly secretes adiponectin, which improves peripheral insulin sensitivity.</li>
                <li>Associated with lower incidence of atherosclerosis, hypertension, and diabetes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: WHO Clinical Standards Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            World Health Organization (WHO) Waist-to-Hip Cutoff Standards
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The World Health Organization utilizes the Waist-to-Hip Ratio (WHR) as a primary clinical marker for central obesity and cardiometabolic syndrome risk:
          </p>
          <DataTable
            head={["Cardiometabolic Risk Category", "Female WHR Threshold", "Male WHR Threshold", "Clinical Significance & Etiology"]}
            rows={WHO_WHR_TABLE.map((row) => [
              <strong key={row.category} className="text-slate-900 dark:text-slate-100">{row.category}</strong>,
              row.womenWhr,
              row.menWhr,
              row.clinicalProfile,
            ])}
          />
        </section>

        {/* Section 5: Tailored Exercise & Nutritional Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Evidence-Based Training &amp; Nutritional Strategies by Phenotype
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While spot reduction is physiologically impossible, training specific kinetic muscle groups and tailoring nutritional timing allows individuals to optimize their physique and functional health:
          </p>
          <DataTable
            head={["Body Shape", "Morphometric Diagnostic Criteria", "Prescribed Resistance Training Focus", "Targeted Nutritional Strategy"]}
            rows={SHAPE_PRESCRIPTION_TABLE.map((row) => [
              <strong key={row.shape} className="text-slate-900 dark:text-slate-100">{row.shape}</strong>,
              row.ratioCriteria,
              row.exerciseFocus,
              row.nutritionalStrategy,
            ])}
          />
        </section>
      
        
        {/* Endocrine Adipose Partitioning & Anthropometric Science */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Endocrine Adipose Partitioning: Somatotype Genetics &amp; Visceral Risk
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Human phenotypic body geometry reflects an interplay of skeletal pelvic architecture, biacromial shoulder width, androgen-to-estrogen receptor densities, and genetic somatotypic foundation (ectomorph, mesomorph, and endomorph). While commercial fashion categorizes silhouettes into superficial shapes (hourglass, pear, apple, rectangle, inverted triangle), clinical anthropometry evaluates these proportions as direct reflections of hormonal balance and systemic cardiometabolic health.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Android (Apple) Adiposity &amp; Portal Vein Dynamics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Central abdominal adiposity is stimulated by higher androgen-to-estrogen ratios and heightened cortisol receptor density in visceral omental tissue. Visceral fat possesses high lipolytic sensitivity, dumping free fatty acids directly into the hepatic portal vein. This drives hepatic triglyceride accumulation, downregulates insulin clearance, and promotes atherogenic dyslipidemia characterized by elevated small dense LDL particles and suppressed HDL.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Gynoid (Pear) Subcutaneous Reserves &amp; LPL Activity</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Gluteofemoral subcutaneous fat accumulation is driven by estrogen receptor alpha (ER-alpha) signaling, which upregulates lipoprotein lipase (LPL) activity while suppressing lipolysis via high alpha-2 adrenergic receptor concentrations. Subcutaneous lower-body fat acts as an evolutionary metabolic sink, sequestering excess fatty acids away from vital organs and secreting protective high-molecular-weight adiponectin.
              </p>
            </div>
          </div>
          <h2>Biomechanical Alignment &amp; Targeted Physical Programming</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Understanding your anatomical frame enables personalized training adaptations that enhance both aesthetic balance and functional orthopedic longevity:
          </p>
          <ul>
            <li><strong>Hourglass Silhouettes:</strong> Symmetrical skeletal proportions benefit from full-body multi-joint compound resistance training (squats, deadlifts, overhead presses) paired with core anti-rotational stability drills (Pallof presses, side planks) to protect the lumbosacral junction.</li>
            <li><strong>Pear Silhouettes:</strong> Emphasize progressive overhead and lateral deltoid hypertrophy (lateral raises, pull-ups) to broaden the upper thoracic silhouette while employing moderate-load lower-body resistance movements that tone tissue without exacerbating joint strain.</li>
            <li><strong>Apple Silhouettes:</strong> Prioritize metabolic conditioning combining Zone 2 low-intensity cardiovascular volume with compound resistance exercises. Minimizing liquid refined sugars and alcohol preferentially mobilizes deep visceral fat reserves.</li>
            <li><strong>Inverted Triangle Silhouettes:</strong> Direct training volume toward lower-body posterior chain development (hip thrusts, Bulgarian split squats, Romanian deadlifts) to build muscular lower-body fullness that harmonizes broad clavicular dimensions.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Reassess circumferences every 4 to 8 weeks with a flexible vinyl tape measure under identical morning conditions to monitor structural body recomposition and cardiovascular risk reduction.
          </p>
        </section>

        
          <h2>Actionable Lifestyle &amp; Exercise Programming for Your Profile</h2>
          <p>
            Translating body shape analysis into functional physical results requires harmonizing resistance exercises and nutritional timing to your natural skeletal leverage:
          </p>
          <ul>
            <li><strong>Android (Apple) Strategy:</strong> Prioritize high-volume compound resistance training (squats, Romanian deadlifts, overhead presses) combined with moderate-intensity steady-state (Zone 2) cardio. Minimizing refined sugars and alcohol preferentially mobilizes deep visceral mesenteric fat while stabilizing fasting insulin.</li>
            <li><strong>Gynoid (Pear) Strategy:</strong> Focus on progressive upper-body hypertrophy (overhead presses, pull-ups, lateral raises) to broaden the shoulder silhouette while utilizing lower-body compound movements to tone gluteofemoral tissue without overtraining.</li>
            <li><strong>Hourglass Strategy:</strong> Emphasize full-body functional strength training maintaining symmetrical anterior-to-posterior kinetic balance. Prioritize core anti-rotational exercises (Pallof presses, side planks) to protect lumbar spinal integrity.</li>
            <li><strong>Inverted Triangle Strategy:</strong> Direct training volume toward lower-body posterior chain development (hip thrusts, walking lunges, Bulgarian split squats) to build lower-body muscular fullness that balances broad clavicular dimensions.</li>
          </ul>
          <p>
            Reassess your anthropometric circumferences every 4 to 8 weeks with a flexible vinyl tape measure under identical morning conditions to monitor structural body recomposition.
          </p>


        
          <h2>Visceral vs Subcutaneous Fat Deposition &amp; Hormonal Receptors</h2>
          <p>
            Regional human adipose tissue patterning is primarily orchestrated by local sex steroid receptor densities. In android (apple) silhouettes, elevated androgen-to-estrogen receptor ratios and high glucocorticoid receptor expression in mesenteric adipocytes favor visceral trunk fat deposition. Visceral adipocytes possess high beta-1 and beta-2 adrenergic receptor densities, rendering them sensitive to lipolytic catecholamine stimulation during high-intensity exercise.
          </p>
          <p>
            Conversely, gynoid (pear) fat distribution is driven by estrogen receptor alpha (ER-alpha) expression, which upregulates lipoprotein lipase (LPL) activity in gluteofemoral subcutaneous depots while suppressing lipolysis via high alpha-2 adrenergic receptor concentrations. Consequently, gluteofemoral fat serves as an evolutionary energy reserve for pregnancy and lactation, mobilizing more slowly than abdominal depots.
          </p>
          <h2>Biomechanical Posture &amp; Spinal Load Ergonomics</h2>
          <p>
            Your skeletal silhouette directly impacts spinal ergonomics and pelvic alignment. Hourglass and pear profiles with wider pelvic dimensions experience increased femoral Q-angles, requiring targeted gluteus medius strengthening to stabilize knee tracking. Android profiles carrying excess anterior abdominal load often develop compensatory lumbar hyperlordosis and anterior pelvic tilt, benefiting from targeted core anti-extension training.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Anthropometric silhouette typing provides crucial context for cardiovascular risk and body composition. For precise visceral fat analysis, benchmark your proportions against the <a href="/calculators/health/waist-to-hip-ratio-calculator">Waist-to-Hip Ratio Calculator</a>, screen longevity risk with the <a href="/calculators/health/waist-to-height-ratio-calculator">Waist-to-Height Ratio Calculator</a>, and monitor subcutaneous fat percentage using the <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <BodyShapeCalculator />
    </CalcPage>
  );
}
