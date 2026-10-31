import BraSizeCalculator from "@/components/calcs/health/bra-size-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BraCupVolumeMatrixChart } from "@/components/flagship/health/editorial-charts/BraCupVolumeMatrixChart";

const PATH = "/calculators/health/bra-size-calculator";
const TITLE = "Bra Size Calculator – Modern Snug Band & Sister Sizing | CalcDigi";
const DESCRIPTION =
  "Find your true bra size using modern snug-band anthropometrics and sister sizing volume matrices. Compare US, UK, EU, and international standards.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const CUP_DIFFERENTIAL_TABLE = [
  { diffInches: "< 0.5 in", diffCm: "< 1.3 cm", usCup: "AA", ukCup: "AA", typicalVol34: "~200 cc" },
  { diffInches: "0.5 – 1.0 in", diffCm: "1.3 – 2.5 cm", usCup: "A", ukCup: "A", typicalVol34: "~290 cc" },
  { diffInches: "1.1 – 2.0 in", diffCm: "2.6 – 5.1 cm", usCup: "B", ukCup: "B", typicalVol34: "~410 cc" },
  { diffInches: "2.1 – 3.0 in", diffCm: "5.2 – 7.6 cm", usCup: "C", ukCup: "C", typicalVol34: "~530 cc" },
  { diffInches: "3.1 – 4.0 in", diffCm: "7.7 – 10.2 cm", usCup: "D", ukCup: "D", typicalVol34: "~660 cc" },
  { diffInches: "4.1 – 5.0 in", diffCm: "10.3 – 12.7 cm", usCup: "DD (E)", ukCup: "DD", typicalVol34: "~810 cc" },
  { diffInches: "5.1 – 6.0 in", diffCm: "12.8 – 15.2 cm", usCup: "DDD (F)", ukCup: "E", typicalVol34: "~970 cc" },
  { diffInches: "6.1 – 7.0 in", diffCm: "15.3 – 17.8 cm", usCup: "G", ukCup: "F", typicalVol34: "~1,150 cc" },
  { diffInches: "7.1 – 8.0 in", diffCm: "17.9 – 20.3 cm", usCup: "H", ukCup: "FF", typicalVol34: "~1,350 cc" },
  { diffInches: "8.1 – 9.0 in", diffCm: "20.4 – 22.9 cm", usCup: "I", ukCup: "G", typicalVol34: "~1,560 cc" },
];

const SISTER_SIZES_TABLE = [
  { sisterGroup: "Group 1 (~410 cc)", tightBand: "30D", targetBand: "32C", looseBand: "34B", widestBand: "36A" },
  { sisterGroup: "Group 2 (~530 cc)", tightBand: "30DD", targetBand: "32D", looseBand: "34C", widestBand: "36B" },
  { sisterGroup: "Group 3 (~660 cc)", tightBand: "30DDD/F", targetBand: "32DD", looseBand: "34D", widestBand: "36C" },
  { sisterGroup: "Group 4 (~810 cc)", tightBand: "30G", targetBand: "32DDD/F", looseBand: "34DD", widestBand: "36D" },
  { sisterGroup: "Group 5 (~970 cc)", tightBand: "30H", targetBand: "32G", looseBand: "34DDD/F", widestBand: "36DD" },
  { sisterGroup: "Group 6 (~1,150 cc)", tightBand: "32H", targetBand: "34G", looseBand: "36DDD/F", widestBand: "38DD" },
];

const INTERNATIONAL_SIZE_TABLE = [
  { usCa: "30D", uk: "30D", euIso: "65D", franceSpain: "80D", australia: "8D" },
  { usCa: "32DD", uk: "32DD", euIso: "70E", franceSpain: "85E", australia: "10DD" },
  { usCa: "34C", uk: "34C", euIso: "75C", franceSpain: "90C", australia: "12C" },
  { usCa: "34DD", uk: "34DD", euIso: "75E", franceSpain: "90E", australia: "12DD" },
  { usCa: "36D", uk: "36D", euIso: "80D", franceSpain: "95D", australia: "14D" },
  { usCa: "38DD", uk: "38DD", euIso: "85E", franceSpain: "100E", australia: "16DD" },
];

export default function BraSizePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Bra Size Calculator"
      intro="Accurately determine your true bra size using modern snug-band anthropometry and volumetric sister-sizing principles. Avoid neck and shoulder strain by finding your ideal biomechanical fit."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Band Size} = \text{RoundEven}(\text{Underbust}), \quad \text{Cup Index} = \text{Bust} - \text{Band Size}"
      related={[
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight Calculator" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/waist-to-hip-ratio-calculator", icon: "📏", name: "Waist-to-Hip Ratio" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
      ]}
      faq={[
        {
          q: "How should I measure my underbust and bust accurately?",
          a: "Use a flexible fiberglass measuring tape. For the underbust, wrap the tape snugly directly under the breasts on your ribcage, exhaling gently to get your resting chest dimension. For the bust, measure around the fullest point (apex) while wearing an unpadded or thinly lined bra, keeping the tape horizontal and parallel to the floor without compressing breast tissue.",
        },
        {
          q: "Why is my calculated cup size larger than what I usually wear?",
          a: "Most women have historically been fitted using the outdated '+4 method' (e.g. measuring 32 inches and wearing a 36B). When properly fitted with a modern snug band (32) that provides real support, the bust-to-band difference increases, meaning you are actually a 32DD. A 32DD holds the exact same cup volume as a 36B, but the snug band transfers 85% of the weight to your ribcage rather than your shoulders.",
        },
        {
          q: "What is a sister size and when should I use one?",
          a: "Sister sizes share the exact same cup volume but have different band sizes. For example, 32D, 34C, and 36B all have the same cup capacity. If a 34C band feels slightly too tight around your ribcage, trying a 36B provides a looser band while keeping the cup fit identical.",
        },
        {
          q: "How often should I measure my bra size?",
          a: "You should remeasure your bra size every 6 to 12 months, or after significant hormonal or metabolic life events such as weight changes of 5–10 lbs, pregnancy, breastfeeding, starting or stopping hormonal contraception, or starting weight training.",
        },
        {
          q: "Why does the European (EU) band number differ so much from US band sizes?",
          a: "US band sizes are measured in inches (e.g., 34). European sizing uses centimeters but historically incorporates an engineered 10 cm reduction to ensure elastic tightness. A 34-inch ribcage is roughly 86 cm, which corresponds to an EU 75 band. In French sizing, 15 is added to the EU band, making it a 90 band.",
        },
      ]}
      article={
        <>

        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Ergonomics &amp; Breast Biomechanics Review:</span> Calibrated to University of Portsmouth Breast Health research protocols, modern snug-band standards, and ISO 13402 garment anthropometrics.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Biomechanical Standards</div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Biomechanics of Breast Support: Why 80% of Women Wear the Wrong Size
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Extensive biomechanical and ergonomic studies—most notably conducted by the Research Group in Breast Health
            at the University of Portsmouth—have consistently revealed that <strong>between 70% and 85% of women
            wear an incorrectly sized bra</strong>. The overwhelming majority wear a band that is 1 to 2 sizes too large
            and a cup that is 2 to 3 sizes too small.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            From an anatomical perspective, female breast tissue contains no skeletal muscle. It is composed of glandular
            lobules, adipose tissue, and fragile fibrous connective bands known as <strong>Cooper&apos;s suspensory ligaments</strong>.
            When unsupported or improperly supported, cyclic kinetic motion during walking and running induces tension on Cooper&apos;s
            ligaments, causing irreversible tissue distension (ptosis) and chronic musculoskeletal strain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">The Thoracic Underband (85% Support)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The primary anchor of any bra is the underband. It must sit horizontally level around the thoracic cage directly
                beneath the inframammary fold, generating frictional hoop tension to bear 80% to 85% of breast weight.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Shoulder Straps (15% Support)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Straps should provide stability, not weight-bearing suspension. When straps dig deep red grooves into the trapezius
                muscles, it indicates the underband is too loose to support the breast mass, transferring excessive mechanical load to the cervical spine.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Bra Cup Volume &amp; Sister-Sizing Mechanical Matrix
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore how cup volume (displacement in cc/mL) scales across different band sizes. Select cup letters (B, C, D, DD) and scrub across band sizes to inspect volumetric sister size equivalence:
          </p>
          <BraCupVolumeMatrixChart />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Mechanical Logic of Sister Sizes &amp; Volumetric Equivalence
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A foundational principle of bra engineering is that <strong>a cup letter does not denote an absolute volume</strong>.
            A &ldquo;D cup&rdquo; is not a fixed unit of mass; it merely signifies a 4-inch differential between the band and the bust.
            Consequently, a 30D bra cup holds approximately 480 cc of breast tissue, whereas a 38D bra cup holds approximately 920 cc—almost
            twice the cubic volume!
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"\\Delta = \\text{Bust} - \\text{Band}, \\quad V_{\\text{cup}} \\propto \\text{Band} \\times \\Delta"}</Formula>
          </div>
          <DataTable
            head={["Sister Volume Group", "Snugger Band (+1 Cup)", "Target Size", "Looser Band (-1 Cup)", "Widest Band (-2 Cups)"]}
            rows={SISTER_SIZES_TABLE.map((r) => [
              <strong key={r.sisterGroup} className="text-slate-900 dark:text-white">{r.sisterGroup}</strong>,
              r.tightBand,
              <strong key={`${r.sisterGroup}-target`} className="text-indigo-600 dark:text-indigo-400">{r.targetBand}</strong>,
              r.looseBand,
              r.widestBand,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Bust-to-Band Differential Standard (US vs. UK Cup Equivalents)
          </h2>
          <DataTable
            head={["Bust – Band (Inches)", "Bust – Band (Centimeters)", "US / CA Cup Letter", "UK Cup Letter", "Approximate Volume (34 Band)"]}
            rows={CUP_DIFFERENTIAL_TABLE.map((r) => [
              <strong key={r.diffInches} className="text-slate-900 dark:text-white">{r.diffInches}</strong>,
              r.diffCm,
              <strong key={`${r.diffInches}-us`} className="text-pink-600 dark:text-pink-400">{r.usCup}</strong>,
              r.ukCup,
              r.typicalVol34,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            International Bra Size Conversion Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            European and international standards (such as ISO 13402 and EN 13402) express band size directly in centimeters based on
            snug underbust measurement rounded to the nearest 5 cm increments.
          </p>
          <DataTable
            head={["US / Canada", "UK Standard", "European (EU / ISO)", "France / Spain", "Australia / NZ"]}
            rows={INTERNATIONAL_SIZE_TABLE.map((r) => [
              <strong key={r.usCa} className="text-slate-900 dark:text-white">{r.usCa}</strong>,
              r.uk,
              <strong key={`${r.usCa}-eu`} className="text-indigo-600 dark:text-indigo-400">{r.euIso}</strong>,
              r.franceSpain,
              r.australia,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Checklist: 5 Tell-Tale Signs Your Bra Does Not Fit
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Back Band Rides Upward:</strong> If the back clasp rides toward your shoulder blades rather than staying parallel to the floor, the band is too loose. Drop down a band size and go up one cup letter.</li>
            <li><strong>Center Gore Floats Away:</strong> The central wire connection (gore) between your breasts should lay completely flush against your sternum. If it floats or sits on breast tissue, the cups are too small.</li>
            <li><strong>Tissue Spillage (&ldquo;Quad-Boobing&rdquo;):</strong> If breast tissue bulges over the top or sides of the cup, the cup volume is at least 1 to 2 sizes too small.</li>
            <li><strong>Shoulder Grooves &amp; Headaches:</strong> Deep red indents on your shoulders indicate that your straps are carrying weight meant for the ribcage band.</li>
            <li><strong>Underwire Pokes Breast Tissue:</strong> The underwire arc should fully encircle all breast tissue on the lateral ribcage toward the mid-axillary line without pinching mammary glands.</li>
          </ul>
        </section>
      
        
        {/* Orthopedic Mastopexy & Thoracic Musculoskeletal Health */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Orthopedic Mastopexy: Cooper&apos;s Ligaments &amp; Kinetic Load Distribution
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Female breast tissue is composed primarily of glandular lobules and adipose tissue without internal skeletal or muscular architecture. Anatomical support relies entirely on the superficial fascial system and delicate retinacula cutis known as Cooper&apos;s suspensory ligaments. During physical locomotion, running, or high-impact jumping, unsupported breasts undergo three-dimensional figure-eight displacement averaging up to 15 centimeters of vertical, lateral, and anterior-posterior oscillation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The 80/20 Band-to-Strap Weight Distribution Rule</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In a properly fitted brassiere, exactly 80% to 85% of total breast mass support must originate from the firm anchorage of the underbust ribcage band, while shoulder straps should contribute no more than 15% to 20%. Wearing an overly loose band forces shoulder straps to bear excessive downward traction, compressing the subclavicular brachial plexus nerve bundle and predisposing wearers to chronic cervicothoracic postural headaches and trapezius myofascial trigger points.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Center Gore &amp; Wire Alignment Diagnostics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A flawless clinical fit requires that the central rigid bridge (the gore) rest completely flush against the sternum bone without lifting, twisting, or floating. Furthermore, underwire channels must trace the natural inframammary fold without encroaching upon or digging into peripheral axillary glandular tail of Spence tissue.
              </p>
            </div>
          </div>
          <h2>Sister Sizing Mechanics: Equivalent Cup Volumes</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Cup letters are not fixed volumes; a 32D, 34C, and 36B all hold the identical volume of breast tissue (~390 cc). If a band feels too loose or tight, navigate sister sizes to adjust ribcage circumference without altering cup volume:
          </p>
          <ul>
            <li><strong>To tighten the band:</strong> Step down one band size and increase one cup letter (e.g. 36C becomes 34D).</li>
            <li><strong>To loosen the band:</strong> Step up one band size and decrease one cup letter (e.g. 32D becomes 34C).</li>
            <li><strong>Hook Adjustment Protocol:</strong> A new bra should fit snugly on the loosest outer hook, reserving the inner tighter hooks for when elastic naturally stretches over months of wear.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because hormonal shifts during pregnancy, lactation, weight fluctuations, and hormonal contraceptive use continuously modify thoracic dimensions, measure every 6 to 12 months using a flexible non-elastic sewing tape.
          </p>
        </section>

        
          <h2>Fitting Checklist: 5 Signs of an Incorrect Bra Fit</h2>
          <p>
            Ensure your brassiere delivers optimal orthopedic support by evaluating these 5 clinical fitting checkpoints:
          </p>
          <ul>
            <li><strong>Band Riding Up in the Back:</strong> If the back band arches upward toward your shoulder blades rather than resting parallel to the floor, the band is too large. Step down a band size and sister-size up in the cup.</li>
            <li><strong>Shoulder Digging &amp; Red Grooves:</strong> Deep red indentations on your trapezius muscles confirm that shoulder straps are overcompensating for an unsupportive band. The band must support 80%+ of the breast weight.</li>
            <li><strong>Spillage or Quadraboob:</strong> If breast tissue bulges over the top or sides of the cups, the cup volume is too small. Increase the cup letter by one or two sizes.</li>
            <li><strong>Floating Central Gore:</strong> If the central fabric/wire bridge does not sit flat against your sternum bone, the cup depth is inadequate or the band is too loose.</li>
            <li><strong>Wrinkling or Gap in Cups:</strong> Empty space or fabric wrinkling at the top of the cup indicates an overly large cup volume or a mismatched cup projection shape.</li>
          </ul>
          <p>
            Re-measure with a non-elastic tape measure every 6 to 12 months or after any significant change in body weight, training intensity, or hormonal profile.
          </p>


        
          <h2>Musculoskeletal Posture &amp; Brachial Plexus Decompression</h2>
          <p>
            Wearing an incorrectly fitted brassiere—specifically a band that is too large paired with cups that are too small—forces the shoulder straps to support excessive weight. The downward vector of strap tension compresses the upper fibers of the trapezius muscle, levator scapulae, and the subclavian neurovascular bundle, predisposing women to thoracic outlet syndrome symptoms, tension headaches, and scapular dyskinesis.
          </p>
          <p>
            A snug, level band acts as a cantilever foundation that distributes gravitational breast weight across the entire thoracic ribcage, instantly decompressing cervical and thoracic spinal segments. Reassessing your bra size after hormonal shifts, postpartum recovery, or fitness body composition changes ensures optimal postural alignment.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Accurate chest and band measurements frequently fluctuate with total weight and hormonal shifts. Track whole-body anthropometrics with our <a href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</a>, monitor proportional silhouette changes with the <a href="/calculators/health/body-shape-calculator">Body Shape Calculator</a>, and benchmark lean versus adipose changes with the <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <BraSizeCalculator />
    </CalcPage>
  );
}
