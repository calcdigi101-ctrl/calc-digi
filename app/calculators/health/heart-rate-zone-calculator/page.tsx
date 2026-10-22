import HeartRateZoneCalculator from "@/components/calcs/health/heart-rate-zone-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HeartRateZoneSpectrumChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/heart-rate-zone-calculator";
const TITLE = "Heart Rate Zone Calculator – 5 Training Zones & Karvonen Formula | CalcDigi";
const DESCRIPTION =
  "Free heart rate zone calculator: determine target heart rate training zones for fat burning, Zone 2 aerobic endurance, lactate threshold, and VO2 max using Karvonen and Tanaka equations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Heart Rate Zone Calculator"
      intro="Accurately determine your five cardiovascular training zones, maximum heart rate (HRmax), and optimal Zone 2 fat-burning aerobic target using the clinically validated Karvonen Heart Rate Reserve (HRR) and Tanaka formulas."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Target HR = (HRmax - Resting HR) * Intensity % + Resting HR"
      related={[
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/cycling-calculator", icon: "🚴", name: "Cycling Calculator" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
      ]}
      faq={[
        {
          q: "What is Zone 2 training and why is it so popular?",
          a: "Zone 2 training (60% to 70% of Heart Rate Reserve or ~65–75% of HRmax) is the aerobic intensity where your type-I slow-twitch muscle fibers utilize fatty acids as their primary fuel substrate through mitochondrial beta-oxidation. Leading longevity physicians like Dr. Peter Attia emphasize Zone 2 because it builds mitochondrial density, improves metabolic flexibility, and clears blood lactate without exhausting the central nervous system.",
        },
        {
          q: "How do I measure my true Resting Heart Rate (RHR)?",
          a: "Measure your pulse immediately upon waking in the morning while still lying in bed, before getting up, eating, or drinking caffeine. Count your beats for 60 full seconds (or use an optical smartwatch or ECG chest strap). Average your morning readings over 5 consecutive days for your baseline RHR.",
        },
        {
          q: "Why is the Karvonen formula superior to the traditional '220 - Age' formula?",
          a: "The classic '220 - Age' formula (Fox formula) only accounts for age and assumes two people of the same age have identical cardiovascular profiles. The Karvonen formula incorporates your actual Resting Heart Rate (RHR) to determine your Heart Rate Reserve (HRR = HRmax - RHR). A trained athlete with an RHR of 45 bpm will have drastically different training zones than an untrained peer with an RHR of 80 bpm.",
        },
        {
          q: "What is the Tanaka formula for Maximum Heart Rate?",
          a: "Published in 2001 by Dr. Hirofumi Tanaka in the Journal of the American College of Cardiology (analyzing 351 studies and 18,712 subjects), the formula HRmax = 208 - (0.7 × Age) eliminated the systematic underestimation of maximum heart rate in older adults that plagued the traditional Fox equation.",
        },
        {
          q: "What is the 'talk test' for Zone 2 aerobic training?",
          a: "The talk test is a validated clinical indicator of aerobic threshold. In Zone 2, you should be able to speak full, coherent sentences continuously without gasping for breath, but you should not have enough spare ventilatory capacity to sing comfortably. If you cannot speak in complete sentences, you have drifted up into Zone 3.",
        },
        {
          q: "What percentage of training time should be spent in each zone?",
          a: "Exercise physiologist Dr. Stephen Seiler formulated the celebrated '80/20 Polarized Training Rule' based on elite endurance athletes: spend roughly 80% of your weekly training volume in low-intensity Zone 2 to build a massive aerobic base, and dedicate 20% to high-intensity Zone 4 (threshold) and Zone 5 (VO2 max) intervals.",
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
                American College of Cardiology (JACC) Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Karvonen Heart Rate Reserve &amp; Tanaka (2001) Clinical Framework
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Cardiorespiratory Exercise Physiology</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>The Cardiovascular Science of Target Heart Rate Zones</h2>
          <p>
            Heart rate training is the most direct, objective window into an athlete's internal bioenergetic metabolism. Rather than
            arbitrarily guessing effort based on speed or subjective fatigue, measuring beats per minute (bpm) allows you to target specific
            cellular adaptations—ranging from capillary bed angiogenesis and mitochondrial biogenesis to lactic acid buffering and
            neuromuscular recruitment.
          </p>
          <p>
            Cardiorespiratory training is segmented into five distinct physiological tiers, each separated by metabolic transitions
            (the first ventilatory threshold VT1 / aerobic threshold, and the second ventilatory threshold VT2 / anaerobic lactate threshold).
          </p>

          
          {/* Interactive Visual Chart / Spectrum */}
          <HeartRateZoneSpectrumChart />

          <h2>The Karvonen Heart Rate Reserve (HRR) Equation</h2>
          <p>
            The <strong>Karvonen formula</strong>, devised by Finnish physiologist Dr. Martti Karvonen, is the clinical gold standard
            for computing target zones because it factors in both maximum cardiac ceiling and baseline autonomic tone (resting heart rate):
          </p>
          <Formula>
            1. Max Heart Rate (Tanaka): HRmax = 208 - (0.7 × Age)
            {"\n"}2. Heart Rate Reserve: HRR = HRmax - Resting Heart Rate (RHR)
            {"\n"}3. Target Heart Rate = (HRR × Intensity %) + Resting Heart Rate
          </Formula>

          <h2>Step-by-Step Practical Calculation: 35-Year-Old with 60 bpm RHR</h2>
          <p>
            Consider a <strong>35-year-old athlete</strong> with a measured resting pulse of <strong>60 bpm</strong> targeting Zone 2 aerobic endurance (60% to 70% HRR):
          </p>
          <ul>
            <li><strong>Step 1: Calculate HRmax (Tanaka)</strong>: 208 - (0.7 × 35) = 208 - 24.5 = <strong>183.5 bpm (~184 bpm)</strong>.</li>
            <li><strong>Step 2: Calculate Heart Rate Reserve (HRR)</strong>: 184 bpm - 60 bpm (RHR) = <strong>124 bpm dynamic reserve</strong>.</li>
            <li><strong>Step 3: Calculate Zone 2 Lower Bound (60%)</strong>: (124 × 0.60) + 60 = 74.4 + 60 = <strong>134 bpm</strong>.</li>
            <li><strong>Step 4: Calculate Zone 2 Upper Bound (70%)</strong>: (124 × 0.70) + 60 = 86.8 + 60 = <strong>147 bpm</strong>.</li>
            <li><strong>Step 5: Resulting Target Zone</strong>: Maintain heart rate between <strong>134 bpm and 147 bpm</strong> during continuous endurance sessions to maximize cellular fat oxidation.</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <h2>The 5 Cardiovascular Training Zones Breakdown Table</h2>
          <p>
            The table below outlines the primary fuel substrates, physiological adaptations, and training times recommended across the 5 heart rate zones:
          </p>

          <DataTable
            head={["Zone Tier", "% of HRmax", "Primary Metabolic Fuel", "Physiological Adaptation", "Perceived Exertion (RPE 1-10)"]}
            rows={[
              ["Zone 1: Active Recovery", "50% – 60%", "85% Fatty Acids", "Promotes blood flow, cellular waste clearance & active parasympathetic recovery", "RPE 1 – 2 (Extremely light, easy conversation)"],
              ["Zone 2: Aerobic Base (Fat Oxidation)", "60% – 70%", "70% Fat / 30% Glucose", "Mitochondrial density, capillary bed growth & maximum fat-burning efficiency", "RPE 3 – 4 (Talk test passed; comfortable nasal breathing)"],
              ["Zone 3: Aerobic Tempo", "70% – 80%", "50% Fat / 50% Glucose", "Cardiac stroke volume expansion, stamina for half-marathon/marathon pacing", "RPE 5 – 6 (Moderate effort; speaking in short sentences only)"],
              ["Zone 4: Lactate Threshold", "80% – 90%", "80% Muscle Glycogen", "Elevates anaerobic threshold, enhances cellular lactate buffering capacity", "RPE 7 – 8 (Hard effort; 1-2 word responses; burning sensation)"],
              ["Zone 5: Anaerobic VO2 Max", "90% – 100%", "100% Glycogen & CP", "Maximal oxygen uptake (VO2 max), fast-twitch muscle recruitment & sprint power", "RPE 9 – 10 (Maximal all-out sprint; sustainable for 30–120 seconds)"],
            ]}
            highlight={1}
          />

          <h2>Why Zone 2 Training Is the Key to Longevity</h2>
          <p>
            Mitochondria are the intracellular organelles responsible for converting dietary fats and glucose into ATP (cellular energy).
            In Zone 2, the rate of blood lactate generation is low enough that type-I muscle fibers can clear and oxidize lactate
            at the same rate it is produced, maintaining lactate levels at roughly <strong>1.5 to 2.0 mmol/L</strong>.
          </p>
          <p>
            Training in Zone 2 for <strong>3 to 4 hours per week</strong> (such as four 45-minute sessions of brisk incline walking, cycling, or light jogging)
            stimulates mitochondrial biogenesis—increasing both the number and energetic efficiency of your mitochondria. This directly
            combats insulin resistance, type-2 diabetes, cardiovascular disease, and age-related metabolic decline.
          </p>

          <h2>Avoiding the "Zone 3 Black Hole" Trap</h2>
          <p>
            A common training mistake among amateur athletes is spending too much time in <strong>Zone 3 ("the grey zone")</strong>.
            Zone 3 feels like a good workout, but it is too intense to maximize mitochondrial fat oxidation (it shifts fuel to glucose)
            while being too easy to stimulate the high-end neuromuscular adaptations of Zone 4 and Zone 5.
          </p>
          <p>
            Embrace polarized training: keep your easy aerobic days truly easy in Zone 2, and save high intensity for dedicated,
            focused interval days in Zone 4 and Zone 5.
          </p>
        
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Aerobic &amp; Cardiovascular Tools</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Heart rate training optimization requires understanding aerobic capacity and vascular conditioning. Pair your training zones with maximal oxygen uptake using the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, calculate speed splits with the <a href="/calculators/health/pace-calculator">Pace Calculator</a>, track blood pressure response with the <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, and evaluate workout energy burn with the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>.
            </p>
          </div>
    
        
        {/* Cardiorespiratory Physiology & Mitochondrial Density */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Cardiorespiratory Bioenergetics: Karvonen Formula &amp; Lactate Kinetics
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Target heart rate training aligns physical cardiovascular exertion with underlying cellular respiration. While traditional age-based formulas (220 − age) carry an empirical standard deviation of ±10 to 12 beats per minute, the Karvonen Heart Rate Reserve (HRR) method factors in individual resting heart rate (HRR = HR_max − HR_rest), providing a significantly more accurate reflection of personal cardiorespiratory fitness and autonomic tone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Zone 2 Cellular Adaptations &amp; Fat Oxidation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Zone 2 training (60%–70% max HR / below the first ventilatory threshold VT1) occurs at the intensity where whole-body fat oxidation rates peak (FAT_max). At this intensity, circulating lactate remains low (~1.5–2.0 mmol/L) as working muscles rely on slow-twitch oxidative motor units. Consistent Zone 2 training stimulates peroxisome proliferator-activated receptor gamma coactivator 1-alpha (PGC-1alpha), accelerating mitochondrial biogenesis and expanding capillary network density around muscle fibers.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Cardiovascular Drift &amp; Stroke Volume Limits</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                During continuous exercise exceeding 45 minutes in warm conditions, cutaneous vasodilation for thermoregulatory heat dissipation and sweat-induced hypovolemia reduce ventricular preload and stroke volume. To maintain constant cardiac output ((Q = HR \\times SV)), heart rate drifts upward by 5% to 15% without an increase in external running speed or cycling wattage.
              </p>
            </div>
          </div>
          <h2>Heart Rate Recovery (HRR) as an Autonomic Mortality Predictor</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The speed of post-exercise heart rate deceleration provides profound insight into autonomic parasympathetic reactivation:
          </p>
          <ul>
            <li><strong>1-Minute Recovery Benchmark:</strong> A heart rate drop of fewer than 12 beats per minute at 1 minute post-exercise (standing) or fewer than 18 bpm (supine) is a validated clinical predictor of autonomic dysfunction and elevated cardiovascular mortality.</li>
            <li><strong>Healthy Conditioning Range:</strong> Active endurance athletes routinely exhibit heart rate drops of 25 to 40 beats per minute within the first 60 seconds of rest.</li>
            <li><strong>Polarized 80/20 Distribution:</strong> Allocate 80% of weekly cardiovascular volume to low-intensity Zone 2 base training and 20% to Zone 4/5 high-intensity intervals for maximum aerobic conditioning and long-term durability.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Utilize a chest-strap heart rate monitor for ECG-accurate telemetry during interval training and adjust training zones following improvements in resting heart rate.
          </p>
        </section>
        
          <h2>Targeted Heart Rate Protocols: Zone 2 Endurance to Zone 5 Intervals</h2>
          <p>
            Implementing structured heart rate zone training requires precise weekly scheduling to elicit specific cellular adaptations:
          </p>
          <ul>
            <li><strong>Zone 1 (Recovery, 50%–60% Max HR):</strong> Active recovery walks, light cycling, and mobility drills that stimulate lymphatic drainage and parasympathetic blood flow without systemic fatigue.</li>
            <li><strong>Zone 2 (Endurance Base, 60%–70% Max HR):</strong> Long conversational steady-state sessions (45–90 minutes). Maximizes cellular mitochondrial density, enhances fat oxidation enzyme capacity, and expands capillary networks around working muscles.</li>
            <li><strong>Zone 3 (Aerobic Tempo, 70%–80% Max HR):</strong> Sustained rhythmic efforts that challenge glycogen storage capacity and lactate buffering without crossing the anaerobic inflection point.</li>
            <li><strong>Zone 4 (Lactate Threshold, 80%–90% Max HR):</strong> 4 to 8-minute intervals (e.g. (4 \\times 5) minutes with 2 minutes rest). Trains the cardiovascular system to clear and recycle lactic acid at race paces.</li>
            <li><strong>Zone 5 (Neuromuscular VO2 Max, 90%–100% Max HR):</strong> 30 to 120-second maximal sprints with full recovery. Expands cardiac left ventricular stroke volume, maximal oxygen uptake, and fast-twitch motor unit recruitment.</li>
          </ul>
          <p>
            Dedicate 80% of your weekly cardiovascular volume to Zone 2 base training and 20% to Zone 4/5 high-intensity intervals for maximum aerobic conditioning and long-term durability.
          </p>

        
          <h2>Cardiorespiratory Thresholds: VT1, VT2 &amp; Lactate Accumulation</h2>
          <p>
            Structured heart rate training aligns cardiovascular intensity with underlying cellular respiration. During progressive aerobic exercise, the body passes through two discrete physiological inflection points:
          </p>
          <ul>
            <li><strong>First Ventilatory Threshold (VT1 / Aerobic Threshold):</strong> Occurs around Zone 2 (~65%–75% max HR). Blood lactate remains at baseline (~1.5–2.0 mmol/L) as mitochondrial fatty acid oxidation peaks. Breathing is steady and comfortable, allowing full conversational sentences.</li>
            <li><strong>Second Ventilatory Threshold (VT2 / Anaerobic Lactate Threshold):</strong> Occurs around Zone 4 (~85%–90% max HR). Lactic acid production by fast-twitch glycolytic motor units exceeds the body's clearance capacity, triggering rapid hyperventilation to buffer hydrogen ions with bicarbonate.</li>
          </ul>
          <h2>The 80/20 Polarized Training Model</h2>
          <p>
            Endurance physiology research across Olympic athletes demonstrates that spending 80% of weekly training volume in low-intensity Zone 2 and 20% in high-intensity Zones 4 and 5 yields superior mitochondrial density and capillary growth compared to chronic &quot;moderate&quot; threshold training (Zone 3). Zone 2 builds the aerobic foundation while high-intensity intervals expand maximal stroke volume and VO2 max.
          </p>

        </>
      }
    >
      <HeartRateZoneCalculator />
    </CalcPage>
  );
}
