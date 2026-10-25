import type { Metadata } from "next";
import BoltTorqueCalculator from "@/components/calcs/engineering/bolt-torque-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BoltTorqueClampingForceChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/bolt-torque-calculator";
const TITLE = "Bolt Torque Calculator — Tightening Torque, Preload Clamping & Nut Factor K | CalcDigi";
const DESCRIPTION =
  "Calculate bolt tightening torque (N·m & lb-ft), tensile preload clamping force (kN / lbs), proof load stresses, and K nut friction factors for ISO Grade 8.8, 10.9, 12.9, and SAE Grade 5 and 8 fasteners across dry, lubricated, and anti-seize conditions.";

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

const RELATED_CALCULATORS = [
  { href: "/calculators/engineering/structural-steel-calculator", icon: "🏗️", name: "Structural Steel AISC Connections" },
  { href: "/calculators/engineering/gear-ratio-calculator", icon: "⚙️", name: "Gear Ratio & Shaft Torque" },
  { href: "/calculators/engineering/beam-load-calculator", icon: "📐", name: "Beam Deflection & Bending Stress" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Tensile Clamping Force Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Bolt Yield Stress Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Thread Pitch & Friction Ratio" },
];

const FAQ_ITEMS = [
  {
    q: "What is the short-form bolt torque formula (T = K * F * d)?",
    a: "The standard engineering formula for tightening torque is T = K * F_i * d. Here, T is the applied tightening torque (in N·m or lb·ft), K is the dimensionless torque coefficient (nut factor), F_i is target bolt tensile preload clamping force (in Newtons or pounds), and d is nominal bolt shank diameter (in meters or feet). Only about 10% to 15% of applied torque actually stretches the bolt into tension; the remaining 85% to 90% is consumed overcoming thread friction and under-head bearing face friction.",
  },
  {
    q: "What target percentage of proof load or yield strength is recommended for bolt preload?",
    a: "For rigid structural and mechanical clamped joints subjected to dynamic cyclical or fatigue loads, engineering codes (such as VDI 2230 and AISC) recommend preloading bolts to 70% to 75% of proof load (or roughly 65% to 75% of yield strength F_y). For permanent critical structural joints, preloads up to 85% to 90% of proof load are specified to prevent joint separation and transverse shear slip.",
  },
  {
    q: "Why is lubrication (nut factor K) so critical to bolt tightening?",
    a: "The nut factor K varies significantly with thread condition: dry zinc-plated steel has K ≈ 0.20 to 0.22, lightly oiled plain black oxide steel has K ≈ 0.15 to 0.18, and bolts treated with moly paste or copper anti-seize drop to K ≈ 0.10 to 0.12. If a mechanic applies a dry torque specification to a bolt lubricated with anti-seize, the actual clamping preload force will be nearly double the design intent, easily yielding or snapping the bolt shank.",
  },
  {
    q: "What do ISO metric bolt property classes (8.8, 10.9, 12.9) mean?",
    a: "In ISO metric property class markings, the first number represents one-hundredth of the nominal tensile strength in MPa, and the second number represents the ratio of yield strength to tensile strength multiplied by ten. For an ISO Grade 8.8 bolt: minimum tensile strength is 8 * 100 = 800 MPa, and yield strength is 800 * 0.8 = 640 MPa. For Grade 10.9: tensile strength is 1,000 MPa, yield is 900 MPa. For Grade 12.9: tensile is 1,200 MPa, yield is 1,080 MPa.",
  },
  {
    q: "What is bolt tensile stress area (A_t) and how is it calculated?",
    a: "The tensile stress area (A_t) is the effective cross-sectional area through the threaded portion of the bolt that resists tensile tension: A_t = (pi / 4) * [d - 0.9382 * p]^2 (for metric fasteners, where d is nominal diameter and p is thread pitch). Because threads cut grooves into the shank, A_t is always smaller than the gross nominal shank area (pi * d^2 / 4). Tensile preload force is F_i = sigma_proof * A_t * Target_Percentage.",
  },
  {
    q: "Why do properly preloaded bolts rarely fail from fatigue?",
    a: "In a properly designed rigid bolted joint, the clamped flange members are much stiffer than the flexible elongated bolt shank. When an external cyclic working tensile load is applied, approximately 90% of the load merely relieves compressive stress within the clamped joint flanges; only ~10% of the fluctuating load transfers into the bolt shank itself. As long as clamping preload prevents joint separation, the bolt experiences negligible cyclic stress amplitude, shielding it from fatigue failure.",
  },
];

export default function BoltTorquePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Bolt Torque Calculator"
      intro="Calculate fastener tightening torque (N·m & lb-ft), tensile clamping preload force (kN / lbs), proof load utilization, and K nut friction factors across ISO Metric Grades 8.8, 10.9, 12.9, and SAE Grades 5 and 8."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-950/40 dark:text-orange-400 dark:ring-orange-500/30">
                <svg className="size-3.5 shrink-0 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ASME &amp; VDI Fastener Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ASME B1.13M, ISO 898-1 &amp; VDI 2230 Bolted Joint Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mechanical Fastener Engineering</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Bolt Tightening Torque and Clamping Preload Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Tightening torque is calculated using the short-form equation <strong>T = K · F_preload · d</strong>, where <em>K</em> is the nut friction coefficient, <em>F_preload</em> is desired tensile clamping preload force, and <em>d</em> is nominal bolt shank diameter. Target preload is typically sized to <strong>75% of fastener proof load</strong> (<code>F_preload = 0.75 · σ_proof · A_t</code>). Friction condition heavily influences torque: dry zinc fasteners require <strong>K ≈ 0.20</strong>, lightly oiled fasteners require <strong>K ≈ 0.15</strong>, and anti-seize paste drops to <strong>K ≈ 0.12</strong>. For structural beam-to-column splice connections, verify flexural moment with our <a href="/calculators/engineering/structural-steel-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">structural steel calculator</a>, check rotating shaft torque with our <a href="/calculators/engineering/gear-ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gear ratio calculator</a>, or evaluate joint tensile forces with our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>.
            </p>
          </div>

          <h2>Tightening Torque vs. Preload Clamping Force Across Lubricants</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <BoltTorqueClampingForceChart />
          </div>

          <p>
            Threaded fasteners are among the most critical components in mechanical assemblies, automotive chassis, aerospace structures, and civil engineering infrastructure. The primary functional objective of tightening a threaded fastener is not merely to hold parts together, but to act as a stiff mechanical spring. Preloading the bolt into axial tension clamps the mating flange interfaces together under intense compressive pressure.
          </p>
          <p>
            When external separation forces or shear moments act upon a bolted joint, high interface friction between the clamped joint plates prevents lateral slip and protects the bolt shank from cyclical shear fatigue. Applying accurate torque requires strict accounting of thread friction. To analyze beam connection bending stresses, use our <a href="/calculators/engineering/beam-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">beam load calculator</a>, evaluate proof load safety margin percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and calculate thread pitch ratios with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Bolted Joint Mechanics &amp; Preload Equations</div>
            A_t = (pi / 4) * [d - 0.9382 * p]^2 (Metric Tensile Stress Area)
            <br />
            F_preload = Target_Fraction * Proof_Stress * A_t
            <br />
            T = K * F_preload * d
            <br />
            T_dry (K = 0.20) = 0.20 * F_preload * d
            <br />
            T_oiled (K = 0.15) = 0.15 * F_preload * d
            <br />
            T_antiseize (K = 0.12) = 0.12 * F_preload * d
          </Formula>

          <h2>Fastener Property Classes and Proof Strength Ratings</h2>
          <p>
            Fastener materials are categorized into strength grades by ISO (metric) and SAE (inch) standards. The proof stress represents the maximum tensile stress a bolt can withstand without undergoing permanent plastic deformation.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Fastener Grade Mechanical Properties, Proof Stress &amp; Minimum Tensile Strengths</p>
          <DataTable
            head={["Fastener Specification", "Proof Strength (MPa / ksi)", "Yield Strength (MPa / ksi)", "Tensile Strength (MPa / ksi)", "Typical Application"]}
            rows={[
              ["ISO Grade 4.8 (Low Carbon)", "310 MPa / 45 ksi", "340 MPa / 49 ksi", "420 MPa / 61 ksi", "Non-critical covers, sheet metal brackets, furniture"],
              ["ISO Grade 8.8 (Medium Carbon Quenched)", "580 MPa / 84 ksi", "640 MPa / 93 ksi", "800 MPa / 116 ksi", "Automotive chassis, general machinery, pipe flanges"],
              ["ISO Grade 10.9 (Alloy Steel Quenched)", "830 MPa / 120 ksi", "940 MPa / 136 ksi", "1,040 MPa / 151 ksi", "Cylinder heads, engine connecting rods, crane hooks"],
              ["ISO Grade 12.9 (High-Strength Alloy)", "970 MPa / 141 ksi", "1,100 MPa / 160 ksi", "1,220 MPa / 177 ksi", "High-stress hydraulic cylinders, race engine main studs"],
              ["SAE Grade 5 (Medium Carbon Quenched)", "85 ksi / 586 MPa", "92 ksi / 634 MPa", "120 ksi / 827 MPa", "Standard North American machinery and truck frames"],
              ["SAE Grade 8 (Medium Carbon Alloy)", "120 ksi / 827 MPa", "130 ksi / 896 MPa", "150 ksi / 1,034 MPa", "Heavy off-highway construction equipment, aerospace ground"],
            ]}
          />

          <h2>Torque-Tension Scatter and Calibration Methods</h2>
          <p>
            A torque wrench measures rotational resistance, not direct clamping tension. Due to variations in surface roughness, zinc plating thickness, thread burrs, and operator technique, the torque-tension relationship exhibits up to ±25% scatter when using uncalibrated manual click-type torque wrenches. In mission-critical aerospace and structural steel connections, engineers utilize torque-angle (turn-of-nut) methods, direct tension indicator (DTI) squirt washers, or ultrasonic bolt elongation measurement to guarantee uniform preload clamping across joint arrays.
          </p>

          <h2>Turn-of-Nut Method and Torque-Angle Tightening</h2>
          <p>
            To eliminate the ±25% preload scatter caused by unpredictable thread friction coefficients, structural steel codes (such as the <strong>RCSC Specification for Structural Joints Using High-Strength Bolts</strong>) mandate the <strong>Turn-of-Nut tightening method</strong>.
          </p>
          <p>
            Under this protocol, the joint is first brought to a uniform <strong>snug-tight condition</strong> using an ordinary spud wrench or impact wrench (typically 20% to 30% of target tension, bringing all faying steel surfaces into solid metal-to-metal contact). Subsequently, the nut is rotated through a specified angle (e.g., 1/3 turn or 120° for bolt lengths up to 4 diameters; 1/2 turn for lengths up to 8 diameters). Because nut rotation directly translates into axial elongation along the bolt thread lead (<code>ΔL = Angle / 360° · Pitch</code>), tension is determined by the bolt's elastic-plastic stress-strain curve rather than friction.
          </p>

          <h2>Embedment Relaxation and Joint Preload Loss</h2>
          <p>
            Immediately following fastener tightening, microscopic surface peaks and machining burrs on thread contact flanks and joint plates undergo localized plastic deformation under intense clamping pressure—a phenomenon known as <strong>embedment relaxation</strong>.
          </p>
          <p>
            In rigid metal-to-metal joints, embedment causes an unavoidable 2% to 5% loss of initial preload tension within the first few minutes after torquing. In soft gasketed pipe joints or painted structural steel assemblies, creep relaxation can dissipate up to 15% to 20% of preload. To maintain persistent clamping force in vibrating or thermally cycling machinery, engineers incorporate conical <strong>Belleville disc spring washers</strong> that provide high elastic compliance to absorb joint relaxation without losing clamping seal integrity.
          </p>

          <h2>Stainless Steel Thread Galling and Galvanic Compatibility</h2>
          <p>
            When tightening austenitic stainless steel bolts (such as 304 / A2 or 316 / A4), high contact pressures and sliding friction strip away the microscopic passive chromium oxide film protecting the metal. Direct metal-to-metal contact leads to instantaneous microscopic cold-welding termed <strong>thread galling</strong>, permanently seizing threads and snapping bolt shanks before proper torque is reached. Applying PTFE-based thread lubricants or nickel anti-seize paste is mandatory for all stainless fasteners.
          </p>
        </>
      }
    >
      <BoltTorqueCalculator />
    </CalcPage>
  );
}
