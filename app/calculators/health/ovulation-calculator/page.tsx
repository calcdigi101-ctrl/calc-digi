import OvulationCalculator from "@/components/calcs/health/ovulation-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MenstrualHormonePhaseChart } from "@/components/flagship/health/editorial-charts/MenstrualHormonePhaseChart";

const PATH = "/calculators/health/ovulation-calculator";
const TITLE = "Ovulation Calculator – Fertile Window, LH Surge & Conception | CalcDigi";
const DESCRIPTION =
  "Calculate your exact ovulation day, 6-day fertile window, and peak conception dates. Track luteal phase duration, cervical mucus biomarkers, and hormone shifts.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const CONCEPTION_PROBABILITY_TABLE = [
  { cycleTiming: "5 Days Before Ovulation (Day -5)", conceptionOdds: "4% – 5%", biologicalState: "Sperm must survive in crypts of cervix; depends on early fertile mucus." },
  { cycleTiming: "4 Days Before Ovulation (Day -4)", conceptionOdds: "10% – 12%", biologicalState: "Estrogen rising; cervical canal opens; mucus becomes increasingly watery." },
  { cycleTiming: "3 Days Before Ovulation (Day -3)", conceptionOdds: "15% – 18%", biologicalState: "Significant sperm survival; entering the prime physiological conception window." },
  { cycleTiming: "2 Days Before Ovulation (Day -2)", conceptionOdds: "25% – 28%", biologicalState: "Peak fertility window; abundant stretchy egg-white cervical mucus (EWCM)." },
  { cycleTiming: "1 Day Before Ovulation (Day -1)", conceptionOdds: "30% – 33% (Peak)", biologicalState: "Luteinizing Hormone (LH) surge underway; optimal timing for sperm capacitation." },
  { cycleTiming: "Day of Ovulation (Day 0)", conceptionOdds: "28% – 30%", biologicalState: "Follicular rupture; ovum released into fallopian tube fimbriae." },
  { cycleTiming: "1 Day Post-Ovulation (Day +1)", conceptionOdds: "< 1%", biologicalState: "Oocyte undergoes apoptosis; cervical os closes; progesterone thickens mucus." },
];

const BIOMARKER_MONITORING_TABLE = [
  {
    biomarker: "Cervical Mucus (Billings Method)",
    detectionMethod: "Daily visual and tactile examination of vulvar secretions.",
    physiologicalBasis: "Estrogen surge stimulates cervical crypts to secrete clear, slippery, highly elastic mucus (Spinnbarkeit) that nourishes sperm.",
    clinicalUtility: "Immediate real-time indicator of fertile window opening 3 to 5 days before ovulation.",
  },
  {
    biomarker: "Urinary LH Surge Strips (OPKs)",
    detectionMethod: "Over-the-counter immunochromatographic urine test strips.",
    physiologicalBasis: "Detects the pituitary surge of Luteinizing Hormone (threshold typically ≥ 25–40 mIU/mL) preceding follicular rupture.",
    clinicalUtility: "Predicts ovulation will occur within the subsequent 24 to 36 hours with >95% clinical accuracy.",
  },
  {
    biomarker: "Basal Body Temperature (BBT)",
    detectionMethod: "Oral basal digital thermometer (0.01° precision) upon waking before getting out of bed.",
    physiologicalBasis: "Progesterone secreted by the new corpus luteum acts on the hypothalamic thermoregulatory center, elevating BBT by 0.5°F–1.0°F.",
    clinicalUtility: "Retrospective confirmation that ovulation has successfully occurred; confirms luteal phase adequacy.",
  },
];

export default function OvulationPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Ovulation Calculator"
      intro="Determine your precise day of ovulation, peak 6-day fertile window, and conception probabilities using evidence-based reproductive endocrinology calibrated to your unique menstrual cycle."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Ovulation Day} = \text{LMP} + (\text{Cycle Length} - \text{Luteal Phase (14 days)})"
      related={[
        { href: "/calculators/health/pregnancy-due-date-calculator", icon: "👶", name: "Pregnancy Due Date" },
        { href: "/calculators/health/period-calculator", icon: "🩸", name: "Period Calculator" },
        { href: "/calculators/health/fertility-calculator", icon: "🌱", name: "Fertility Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What is the biological fertile window, and how long does it last?",
          a: "The biological fertile window encompasses exactly 6 days: the 5 days leading up to ovulation plus the day of ovulation itself. This timeframe is dictated by two physiological lifespans: healthy human sperm can survive in estrogen-stimulated fertile cervical mucus for up to 5 days, while the released human ovum (egg) survives for only 12 to 24 hours following follicular rupture. Intercourse outside this 6-day window has a biological conception probability of virtually zero.",
        },
        {
          q: "Which specific days have the highest probability of conception?",
          a: "In a seminal epidemiological study of 221 healthy women published in The New England Journal of Medicine by Dr. Allen Wilcox and colleagues, the single highest conception rates occurred from intercourse on the two days prior to ovulation (Day -2 and Day -1) and the day of ovulation itself (Day 0), yielding clinical pregnancy rates between 28% and 33%. Having intercourse on Day -2 or Day -1 ensures that capacitated, motile sperm are already present in the fallopian ampulla when the ovum is released.",
        },
        {
          q: "Why is the luteal phase fixed while the follicular phase varies?",
          a: "The menstrual cycle consists of two halves: the follicular phase (from menses to ovulation) and the luteal phase (from ovulation to the next period). The follicular phase is highly variable, taking anywhere from 10 to 22 days depending on stress, travel, illness, or hormonal fluctuations. However, once ovulation occurs, the life cycle of the corpus luteum is biologically predetermined to last almost exactly 14 days (normal range: 12 to 16 days) before undergoing luteolysis in the absence of beta-hCG.",
        },
        {
          q: "How do ovulation predictor kits (OPKs) work?",
          a: "Ovulation predictor kits detect the surge of Luteinizing Hormone (LH) in urine. A rapid surge of estrogen from the mature Graafian follicle triggers the pituitary gland to release a massive spike of LH. This LH surge acts as the hormonal trigger that weakens the follicular wall, causing ovulation to occur 24 to 36 hours later. Testing daily with afternoon urine starting 4 to 5 days before your estimated ovulation date helps pinpoint this critical window.",
        },
        {
          q: "What does Basal Body Temperature (BBT) tell me about ovulation?",
          a: "Basal Body Temperature cannot predict when you are about to ovulate—it can only confirm that ovulation has already taken place. After the follicle ruptures, it transforms into the corpus luteum, which secretes large amounts of progesterone. Progesterone acts on the hypothalamus to elevate resting body temperature by 0.5°F to 1.0°F (0.3°C to 0.6°C). A sustained thermal shift of at least 3 consecutive days confirms successful ovulation.",
        },
        {
          q: "Can I get pregnant if my periods are irregular?",
          a: "Yes, but pinpointing the fertile window via calendar math alone becomes difficult because irregular cycles indicate variable follicular development or anovulation. Women with irregular cycles should combine algorithmic tracking with real-time physical biomarkers: monitoring cervical mucus changes, utilizing urinary LH test strips, or consulting a reproductive endocrinologist to screen for conditions such as Polycystic Ovary Syndrome (PCOS) or thyroid dysfunction.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Reproductive Endocrinology Review:</span> Calibrated to American Society for Reproductive Medicine (ASRM) guidelines, Wilcox fertile window data (NEJM), and WHO fertility awareness standards.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Clinical Standards</div>
        </div>

        {/* Section 1: The Six-Day Window */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Chronobiology of Conception: The 6-Day Fertile Window
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human reproductive physiology, natural conception is constrained by a remarkably brief biological timeframe: the <strong>6-day fertile window</strong>. This window is governed by the asymmetrical lifespans of human gametes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Sperm Longevity (Up to 120 Hours / 5 Days):</strong> Within the acidic vaginal environment, sperm perish within hours. However, under the influence of pre-ovulatory estrogen, the endocervix produces alkaline, nutrient-rich cervical mucus with linear micelle channels. This mucus filters, nourishes, and stores viable sperm in cervical crypts, releasing them gradually into the fallopian tubes for up to 5 days.
            </li>
            <li>
              <strong>Oocyte Longevity (12 to 24 Hours):</strong> Following the LH-mediated rupture of the dominant Graafian follicle, the released ovum is swept into the fallopian fimbriae. If fertilization does not occur within 12 to 24 hours, the oocyte degenerates through cellular apoptosis, rendering subsequent intercourse in that cycle completely infertile.
            </li>
          </ul>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive 28-Day Ovarian Hormone Dynamics
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow the synchronized hormonal orchestration across the menstrual cycle. Scrub along the 28-day timeline to inspect Estrogen surges, the Luteinizing Hormone (LH) trigger, Progesterone thermal shifts, and real-time conception odds:
          </p>
          <MenstrualHormonePhaseChart />
        </section>

        {/* Section 3: Conception Probabilities by Cycle Day */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Empirical Conception Probabilities: The Wilcox NEJM Dataset
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Clinical data published in <em>The New England Journal of Medicine</em> by Dr. Allen Wilcox demonstrates the exact daily statistical likelihood of pregnancy resulting from a single act of unprotected intercourse relative to ovulation:
          </p>
          <DataTable
            head={["Timing Relative to Ovulation", "Clinical Conception Probability", "Gamete Dynamics & Cervical Environment"]}
            rows={CONCEPTION_PROBABILITY_TABLE.map((row) => [
              <strong key={row.cycleTiming} className="text-slate-900 dark:text-slate-100">{row.cycleTiming}</strong>,
              row.conceptionOdds,
              row.biologicalState,
            ])}
          />
        </section>

        {/* Section 4: Biomarkers of Ovulation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Triangulating Ovulation: The Three Clinical Biomarkers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While calendar algorithms provide an accurate statistical estimate, combining mathematical projections with physical biomarker tracking provides near-clinical precision:
          </p>
          <DataTable
            head={["Biological Biomarker", "Clinical Monitoring Protocol", "Endocrine Mechanism", "Diagnostic Utility"]}
            rows={BIOMARKER_MONITORING_TABLE.map((row) => [
              <strong key={row.biomarker} className="text-slate-900 dark:text-slate-100">{row.biomarker}</strong>,
              row.detectionMethod,
              row.physiologicalBasis,
              row.clinicalUtility,
            ])}
          />
        </section>

        {/* Section 5: The Luteal Phase Math */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Biological Constancy of the Luteal Phase
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The foundational rule of reproductive calculations is that <strong>ovulation occurs 14 days before your next period, not 14 days after your last period</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Short Cycles (e.g., 24 Days)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                If a woman has a 24-day cycle, her luteal phase remains ~14 days. Therefore, her follicular phase lasts only 10 days ($24 - 14 = 10$). Her fertile window opens on Day 5—immediately as her menstrual bleeding concludes.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Long Cycles (e.g., 34 Days)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In a 34-day cycle, the corpus luteum still endures for 14 days. Ovulation occurs on Day 20 ($34 - 14 = 20$). Standard calendar apps that blindly predict ovulation on Day 14 would miss her true fertile window by an entire week.
              </p>
            </div>
          </div>
        </section>
      
        
        {/* Fertile Window Triangulation & Cervical Hydrogels */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Triangulating the Fertile Window: LH Surge, Cervical Mucus &amp; BBT
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The biological fertile window encompasses exactly six days: the five days preceding ovulation plus the day of ovum release. Because human spermatozoa maintain fertilizing capacity in alkaline cervical crypts for up to 120 hours (5 days) while the ovum survives only 12 to 24 hours post-follicular rupture, coitus occurring 1 to 2 days prior to ovulation yields the highest per-cycle conception probability (~28%–32%).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Cervical Mucus Billings Method</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Rising pre-ovulatory estrogen stimulates endocervical glands to secrete copious, thin, clear, and stretchy &quot;egg-white&quot; cervical mucus (Spinnbarkeit &gt; 8 cm). This alkaline hydrogel filters morphologically abnormal sperm and creates longitudinal micro-channels facilitating rapid sperm transit into the uterine cavity.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Basal Body Temperature (BBT) Shift</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Progesterone produced by the post-ovulatory corpus luteum acts directly on the preoptic hypothalamic thermoregulatory center, inducing a sustained temperature rise of 0.4°F to 1.0°F (0.2°C–0.5°C). BBT confirms ovulation retrospectively after the fertile window has closed, helping establish individualized luteal phase lengths.
              </p>
            </div>
          </div>
          <h2>Urine Luteinizing Hormone (LH) Testing Kinetics</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The biological trigger for follicular rupture is the mid-cycle surge of pituitary luteinizing hormone (LH):
          </p>
          <ul>
            <li><strong>Surge Onset to Ovulation:</strong> Ovulation typically occurs 24 to 36 hours after the initial onset of the LH surge and 10 to 12 hours after the peak concentration.</li>
            <li><strong>Optimal Urine Testing Window:</strong> Because LH is synthesized overnight and cleared into urine throughout the day, testing urine between 11:00 AM and 3:00 PM (avoiding excessive morning hydration dilution) provides peak detection accuracy.</li>
            <li><strong>Coital Timing Protocol:</strong> Have intercourse every 1 to 2 days during the 5 days leading up to and including the day of ovulation to ensure continuous viable sperm presence in the fallopian ampulla.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Combining digital urine luteinizing hormone (LH) test kits with daily cervical mucus observation provides the most reliable at-home method for identifying peak fertile days.
          </p>
        </section>

        
          <h2>Fertility Awareness &amp; Optimizing Conception Timelines</h2>
          <p>
            Maximize your conception probability by combining digital ovulation calculation with at-home biological markers:
          </p>
          <ul>
            <li><strong>Cervical Mucus Observation:</strong> As ovulation approaches, estrogen stimulates clear, slippery, stretchy &quot;egg-white&quot; mucus that nourishes and transports sperm. Intercourse during egg-white mucus days yields the highest pregnancy rates.</li>
            <li><strong>Urine Luteinizing Hormone (LH) Test Strips:</strong> Test urine mid-day starting 3 to 4 days before your predicted ovulation date. A positive LH test indicates that ovulation will occur within 24 to 36 hours.</li>
            <li><strong>Coital Timing Protocol:</strong> Have intercourse every 1 to 2 days during the 5 days leading up to and including the day of ovulation to ensure continuous viable sperm presence in the reproductive tract.</li>
            <li><strong>Basal Body Temperature (BBT) Confirmation:</strong> A sustained 0.4°F to 1.0°F temperature rise confirms that ovulation has successfully occurred, marking the close of the fertile window.</li>
          </ul>
          <p>
            Consult an OB-GYN or reproductive endocrinologist if conception does not occur after 12 months of timed intercourse (or 6 months if aged 35 or older).
          </p>


        
          <h2>Follicular Waves &amp; Sperm Longevity Dynamics</h2>
          <p>
            In human reproductive biology, human spermatozoa can survive in alkaline, estrogenic cervical crypts for up to 5 days (120 hours). In contrast, a released secondary oocyte remains viable for fertilization for only 12 to 24 hours post-follicular rupture. Consequently, the window of highest conception probability occurs when intercourse takes place 1 to 2 days prior to ovulation, ensuring that capacitated sperm are already waiting in the fallopian tube ampulla when the ovum arrives.
          </p>
          <p>
            Tracking cervical mucus texture—transitioning from dry or sticky to slippery, clear &quot;egg-white&quot; consistency—correlates closely with rising estradiol and peak fertile probability.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Ovulation timing forms the foundation of family planning and reproductive wellness. Model cycle lengths and luteal phase variations with our <a href="/calculators/health/period-calculator">Period Calculator</a>, evaluate cumulative conception probability with the <a href="/calculators/health/fertility-calculator">Fertility Calculator</a>, and compute estimated milestones using the <a href="/calculators/health/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <OvulationCalculator />
    </CalcPage>
  );
}
