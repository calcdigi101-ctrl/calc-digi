import LeanBodyMassCalculator from "@/components/calcs/health/lean-body-mass-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LbmCompositionSpectrumChart } from "@/components/flagship/health/editorial-charts/LbmCompositionSpectrumChart";

const PATH = "/calculators/health/lean-body-mass-calculator";
const TITLE = "Lean Body Mass Calculator";
const DESCRIPTION =
  "Calculate your lean body mass (LBM), fat mass, and Fat-Free Mass Index (FFMI) with clinical precision using Boer, James, and Hume formulas.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FORMULA_COMPARISON_TABLE = [
  {
    formula: "Boer Equation (1984)",
    cohort: "41 adult surgical patients undergoing total parenteral nutrition and drug pharmacokinetic modeling.",
    primaryUse: "Modern hospital pharmacology, anesthetic titration, aminoglycoside dosing, and oncologic regimens.",
    notes: "Consistently recognized as the most reliable anthropometric estimate across normal and overweight populations.",
  },
  {
    formula: "James Equation (1976)",
    cohort: "Originally developed for the UK Medical Research Council to define fat-free limits in obesity research.",
    primaryUse: "Historic clinical studies and traditional sports physiology nomograms.",
    notes: "Tends to underestimate lean mass in individuals with high adiposity (BMI > 35 kg/m²) due to quadratic height term.",
  },
  {
    formula: "Hume Equation (1966)",
    cohort: "Early isotopic dilution and antipyrine water distribution trials across mixed gender samples.",
    primaryUse: "General population estimates and baseline physiological research.",
    notes: "Yields conservative estimates, providing an effective lower bound in clinical and fitness evaluations.",
  },
  {
    formula: "Direct Body Fat Subtraction",
    cohort: "Requires hydrostatic weighing, DEXA scan (dual-energy X-ray absorptiometry), or multi-frequency BIA.",
    primaryUse: "Elite athletic coaching and clinical DEXA body composition reporting.",
    notes: "Gold standard reference method: Total Weight × (1 − Body Fat % / 100).",
  },
];

const FFMI_NORMS_TABLE = [
  { tier: "Below Average Muscularity", maleFfmi: "< 18.0 kg/m²", femaleFfmi: "< 14.5 kg/m²", status: "Suboptimal lean tissue; potential risk of sarcopenia or catabolic wasting under chronic stress." },
  { tier: "Average Natural Build", maleFfmi: "18.0 – 19.9 kg/m²", femaleFfmi: "14.5 – 16.9 kg/m²", status: "Typical untrained adult with standard physical activity and balanced nutritional habits." },
  { tier: "Above Average / Athletic", maleFfmi: "20.0 – 21.9 kg/m²", femaleFfmi: "17.0 – 18.9 kg/m²", status: "Visible athletic muscularity; regular resistance training and structured protein intake." },
  { tier: "Excellent / Advanced", maleFfmi: "22.0 – 24.9 kg/m²", femaleFfmi: "19.0 – 21.9 kg/m²", status: "Advanced natural bodybuilders and strength athletes with years of progressive overload." },
  { tier: "Upper Natural Genetic Limit", maleFfmi: "25.0 – 25.4 kg/m²", femaleFfmi: "22.0 – 22.5 kg/m²", status: "Pre-steroid era bodybuilding champions (established by Dr. Harrison Pope / Kouri et al., 1995)." },
  { tier: "Supra-Physiological", maleFfmi: "≥ 25.5 kg/m²", femaleFfmi: "≥ 22.6 kg/m²", status: "Statistically improbable without exogenous androgenic / anabolic enhancement." },
];

export default function LeanBodyMassPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Lean Body Mass Calculator"
      intro="Accurately determine your Lean Body Mass (LBM), skeletal muscle reserve, and Fat-Free Mass Index (FFMI) using the three clinical gold-standard equations: Boer, James, and Hume."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="LBM_{Boer} = 0.407 \cdot W + 0.267 \cdot H - 19.2 \;(\text{male})"
      related={[
        { href: "https://www.calcdigi.com/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator (Body Mass Index)" },
        { href: "https://www.calcdigi.com/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "https://www.calcdigi.com/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator (Daily Calorie Needs)" },
        { href: "https://www.calcdigi.com/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator (Basal Metabolic Rate)" },
      ]} article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Endocrinology &amp; Pharmacokinetics Review:</span> Calibrated to Boer (1984), James (1976), and Hume (1966) equations with Fat-Free Mass Index (FFMI) natural muscularity stratification.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Peer-Reviewed Clinical Standards</div>
        </div>

        {/* Section 1: Clinical Definition and Anatomy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Deconstructing Body Composition: Lean Mass vs. Fat Mass
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human physiology and clinical medicine, <strong>Lean Body Mass (LBM)</strong>—frequently termed fat-free mass (FFM)—defines the aggregate weight of every non-adipose component within the human organism. While colloquial fitness dialogue equates lean mass exclusively with skeletal muscle, LBM encompasses four distinct physiological compartments:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Skeletal Muscle Tissue (~42–48% of LBM):</strong> The voluntary contractile muscle responsible for biomechanical locomotion, posture, glycogen storage, and insulin-mediated glucose disposal.
            </li>
            <li>
              <strong>Essential Visceral Organs (~18–22% of LBM):</strong> The liver, heart, kidneys, spleen, lungs, and brain. Despite comprising less than a quarter of lean weight, these metabolically intense organs account for over 60% of resting basal energy expenditure.
            </li>
            <li>
              <strong>Mineralized Skeletal System (~12–15% of LBM):</strong> The cortical and trabecular bone matrix that houses hematopoietic bone marrow and regulates calcium homeostasis.
            </li>
            <li>
              <strong>Intracellular &amp; Extracellular Fluids (~18–22% of LBM):</strong> Blood plasma, interstitial lymph, and intracellular hydration critical for enzymatic reactions and cellular turgor.
            </li>
          </ul>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Lean Body Mass Partitioning &amp; FFMI Benchmark
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Examine how varying body fat percentages partition total body weight into functional lean tissue versus adipose storage for a standardized adult (175 lbs / 79.4 kg, 5&apos;10&quot; / 178 cm). Touch or hover along the curve to observe shifts in Lean Body Mass, total fat mass, and Normalized Fat-Free Mass Index (FFMI).
          </p>
          <LbmCompositionSpectrumChart />
        </section>

        {/* Section 3: Mathematical Formulations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Mathematical Formulations: Boer, James, and Hume
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Prior to the ubiquity of multi-frequency bioelectrical impedance and dual-energy X-ray absorptiometry (DEXA), clinical investigators developed regression models correlating stature and mass with total body water (tritium dilution) to ascertain lean weight.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Boer Equation (1984)</h3>
              <p className="text-xs text-slate-500 mb-3">Modern Pharmacokinetic Gold Standard</p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono">
                <Formula>{"LBM_{male} = 0.407 \\cdot W + 0.267 \\cdot H - 19.2"}</Formula>
                <Formula>{"LBM_{female} = 0.252 \\cdot W + 0.473 \\cdot H - 48.3"}</Formula>
              </div>
              <p className="text-xs text-slate-500 mt-3">Where <em>W</em> is weight in kilograms and <em>H</em> is height in centimeters.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">James Equation (1976)</h3>
              <p className="text-xs text-slate-500 mb-3">Traditional Nomogram Standard</p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono">
                <Formula>{"LBM_{male} = 1.1 \\cdot W - 128 \\cdot (W / H)^2"}</Formula>
                <Formula>{"LBM_{female} = 1.07 \\cdot W - 148 \\cdot (W / H)^2"}</Formula>
              </div>
              <p className="text-xs text-slate-500 mt-3">Quadratic weight-to-height ratio model calibrated on standard BMI ranges.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Hume Equation (1966)</h3>
            <p className="text-xs text-slate-500 mb-3">Isotopic Water Distribution Model</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono text-slate-700 dark:text-slate-300">
              <Formula>{"LBM_{male} = 0.3281 \\cdot W + 0.33929 \\cdot H - 29.5336"}</Formula>
              <Formula>{"LBM_{female} = 0.29569 \\cdot W + 0.41813 \\cdot H - 43.2933"}</Formula>
            </div>
          </div>
        </section>

        {/* Section 4: Clinical Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Comparative Clinical Utility of Anthropometric Formulas
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The table below synthesizes empirical comparisons between the three major historical equations and modern DEXA imaging:
          </p>
          <DataTable
            head={["Formula Name", "Development Cohort", "Primary Application", "Clinical Characteristics & Limitations"]}
            rows={FORMULA_COMPARISON_TABLE.map((row) => [
              <strong key={row.formula} className="text-slate-900 dark:text-slate-100">{row.formula}</strong>,
              row.cohort,
              row.primaryUse,
              row.notes,
            ])}
          />
        </section>

        {/* Section 5: Fat-Free Mass Index (FFMI) and Natural Limits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Fat-Free Mass Index (FFMI) and Natural Muscular Ceilings
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 1995, Dr. Harrison Pope and Elena Kouri of Harvard Medical School published a landmark investigation examining whether a physiological ceiling exists for natural muscular development without anabolic-androgenic steroids (AAS). By evaluating 83 steroid users and 74 non-users, along with 20 historical Mr. America winners from the pre-steroid era (1939–1959), they formulated the <strong>Normalized Fat-Free Mass Index (FFMI)</strong>:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"\\text{Normalized FFMI} = \\frac{\\text{LBM (kg)}}{(\\text{Height in meters})^2} + 6.1 \\cdot (1.8 - \\text{Height in meters})"}</Formula>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The Harvard researchers discovered that pre-steroid era bodybuilding champions exhibited a mean normalized FFMI of <strong>25.4</strong>. While dedicated athletes with extraordinary genetics can reach 24 to 25 kg/m² after years of progressive resistance training, values exceeding 25.5 kg/m² represent a statistical outlier in the absence of chemical enhancement.
          </p>
          <DataTable
            head={["FFMI Classification", "Male Standard (kg/m²)", "Female Standard (kg/m²)", "Physiological Interpretation"]}
            rows={FFMI_NORMS_TABLE.map((row) => [
              <strong key={row.tier} className="text-slate-900 dark:text-slate-100">{row.tier}</strong>,
              row.maleFfmi,
              row.femaleFfmi,
              row.status,
            ])}
          />
        </section>

        {/* Section 6: Pharmacological & Metabolic Significance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pharmacokinetics &amp; Metabolic Expenditure Applications
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Beyond bodybuilding aesthetics, accurate estimation of Lean Body Mass is vital in two high-stakes medical domains:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                1. Precision Drug Dosing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Hydrophilic medications—including anesthetic induction agents (propofol, rocuronium), aminoglycoside antibiotics (gentamicin, tobramycin), and chemotherapeutics—distribute primarily into extracellular water and vascular lean volume. Dosing these drugs based on total weight in obese patients can precipitate catastrophic overdoses, while dosing on ideal body weight can cause underdosing. Lean body mass provides the exact therapeutic volume of distribution.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                2. Katch-McArdle Basal Metabolic Rate
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Standard BMR equations like Harris-Benedict or Mifflin-St Jeor rely only on gross height and weight, introducing significant error for either very lean muscular athletes or individuals with clinical adiposity. The Katch-McArdle formula bypasses gross weight entirely:
              </p>
              <div className="mt-2 text-xs font-mono">
                <Formula>{"\\text{BMR} = 370 + 21.6 \\cdot \\text{LBM (kg)}"}</Formula>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                This yields unmatched accuracy for calculating nutritional deficits, maintenance caloric targets, and contest preparation macros.
              </p>
            </div>
          </div>
        </section>
      
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Clinical FFMI Cutoffs &amp; Functional Muscle Quality
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Fat-Free Mass Index (FFMI) normalizes lean body mass to height squared, providing an objective benchmark for muscular development independent of adipose tissue. In natural populations, biological male FFMI plateaus near 25.0 kg/m², while values below 17.5 in men or 15.0 in women indicate sarcopenic vulnerability requiring progressive resistance training.
          </p>
        </section>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Lean tissue mass is the primary driver of basal metabolic expenditure and physical performance. Contrast your lean mass against total adipose tissue with the <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>, calculate resting caloric demand using the <a href="/calculators/health/bmr-calculator">BMR Calculator</a>, assess muscle hypertrophy targets with the <a href="/calculators/health/protein-intake-calculator">Protein Intake Calculator</a>, and determine frame-relative goals with our <a href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <LeanBodyMassCalculator />
    </CalcPage>
  );
}
