import type { Metadata } from "next";
import GearRatioCalculator from "@/components/calcs/engineering/gear-ratio-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GearSpeedTorqueTradeoffChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/gear-ratio-calculator";
const TITLE = "Gear Ratio Calculator — Speed Reduction, Torque Multiplier & Efficiency | CalcDigi";
const DESCRIPTION =
  "Calculate gear train velocity ratio, output shaft RPM, torque multiplication, mechanical advantage, and transferred power (kW / HP) across spur, helical, planetary, and compound gearbox configurations.";

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
  { href: "/calculators/engineering/bolt-torque-calculator", icon: "🔩", name: "Bolt Torque & Preload Force" },
  { href: "/calculators/engineering/pump-calculator", icon: "⚙️", name: "Pump Power & Motor Sizing" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Angular & Linear Speed Calculator" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Force & Torque Newton Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Proportional Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Gear Efficiency Percentage" },
];

const FAQ_ITEMS = [
  {
    q: "How is gear ratio calculated between two meshed gears?",
    a: "The gear ratio (R) is calculated by dividing the number of teeth on the driven gear (T_out) by the number of teeth on the driving gear (T_in): R = T_out / T_in. It can also be determined by the ratio of their pitch diameters (D_out / D_in). For example, if a 20-tooth drive pinion meshes with a 60-tooth driven gear, the gear ratio is 60 / 20 = 3:1 (a 3-to-1 speed reduction).",
  },
  {
    q: "How does gear ratio affect output rotational speed (RPM)?",
    a: "Rotational velocity is inversely proportional to gear ratio: RPM_out = RPM_in / R = RPM_in * (T_in / T_out). In a 4:1 speed-reducing gearbox driven by a 1,800 RPM electric motor, the output shaft will rotate at 1,800 / 4 = 450 RPM. Conversely, in an overdrive setup where R < 1, the output shaft spins faster than the input prime mover.",
  },
  {
    q: "How does gear ratio multiply output torque?",
    a: "Torque is directly multiplied by gear ratio and mechanical efficiency (eta): Torque_out = Torque_in * R * eta. Because mechanical power equals torque multiplied by angular velocity (P = tau * omega), reducing speed by half allows torque to double in an ideal frictionless system. With 95% stage efficiency, a 5:1 gearbox delivering 20 N·m input will produce 20 * 5 * 0.95 = 95 N·m at the output shaft.",
  },
  {
    q: "What role do idler gears play in a gear train?",
    a: "An idler gear inserted between the drive gear and driven gear alters the direction of rotation without changing the overall gear ratio. The idler tooth count cancels out mathematically in the velocity equation (R = T_idler/T_in * T_out/T_idler = T_out/T_in). Idler gears are utilized to bridge physical distance between shafts and reverse rotational sense.",
  },
  {
    q: "How do you calculate compound gear train ratios?",
    a: "In a compound gear train where multiple gears share common intermediate shafts, the total overall gear ratio is the product of individual gear stage ratios: R_total = R_stage1 * R_stage2 * ... * R_stageN = (T_driven1 / T_driver1) * (T_driven2 / T_driver2). This allows extremely high gear reductions (e.g., 100:1) within compact spatial enclosures.",
  },
  {
    q: "What is the typical mechanical efficiency of different gear types?",
    a: "Spur and helical gears with precision ground teeth achieve 97% to 99% efficiency per mesh. Straight bevel gears deliver 95% to 98% efficiency. In contrast, worm gear sets exhibit lower efficiency (50% to 90%) due to sliding friction between worm threads and gear teeth, though they offer massive single-stage reduction (up to 70:1) and natural back-driving self-locking capability.",
  },
];

export default function GearRatioPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Gear Ratio Calculator"
      intro="Calculate gearbox velocity ratio, output shaft rotational speed (RPM), torque multiplication, mechanical advantage, and transmitted shaft power (kW / HP) across spur, helical, planetary, and compound gear systems."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-0.5 font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20 dark:bg-violet-950/40 dark:text-violet-400 dark:ring-violet-500/30">
                <svg className="size-3.5 shrink-0 text-violet-600 dark:text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                AGMA &amp; ISO Machine Design
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">AGMA 2001-D04 Standards &amp; ISO 6336 Gear Rating Calculations</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mechanical Power Transmission</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Gear Ratio and Torque Multiplication Work
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The <strong>gear ratio (R)</strong> equals driven gear teeth divided by driver gear teeth: <strong>R = T_out / T_in</strong>. Output shaft speed drops proportionally: <strong>RPM_out = RPM_in / R</strong>, while output torque increases proportionally multiplied by efficiency: <strong>Torque_out = Torque_in · R · η</strong>. Transmitted mechanical power is conserved: <strong>P (kW) = (Torque · RPM) / 9549</strong>. When bolting heavy planetary gearbox housings and motor flanges, determine exact bolt clamping torques with our <a href="/calculators/engineering/bolt-torque-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">bolt torque calculator</a>, or solve multi-stage reduction fractions using our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
            </p>
          </div>

          <h2>Speed Reduction vs. Output Torque Tradeoff Curve</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <GearSpeedTorqueTradeoffChart />
          </div>

          <p>
            Gears are among the most fundamental machine elements in mechanical engineering, providing positive, non-slip power transmission between rotating shafts. Whether in an electric vehicle transaxle, industrial conveyor reducer, robotics servo actuator, or wind turbine planetary drive, gear trains match the high-speed, low-torque operating characteristics of electric motors and internal combustion engines to the high-torque, low-speed demands of physical work loads.
          </p>
          <p>
            Conservation of energy dictates that in an ideal mechanical transmission system, mechanical power input equals power output. Because rotational mechanical power is the product of torque and angular speed (<code>P = τ × ω</code>), reducing rotational velocity by a given gear factor enables a reciprocal increase in torque. To convert between linear vehicle velocities and rotational shaft speeds, use our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, calculate required linear driving forces using our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>, and evaluate transmission mechanical loss percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Gear Train Kinematic &amp; Torque Equations</div>
            Gear_Ratio (R) = T_out / T_in = D_out / D_in
            <br />
            RPM_out = RPM_in / R
            <br />
            Torque_out = Torque_in * R * eta_efficiency
            <br />
            Power_kW = (Torque_Nm * RPM) / 9549
            <br />
            Power_HP = (Torque_lb_ft * RPM) / 5252
            <br />
            Compound_Ratio = R1 * R2 * ... * Rn
          </Formula>

          <h2>Gearbox Configurations &amp; Mechanical Efficiency Comparison</h2>
          <p>
            Machine designers select specific gear tooth geometries based on noise limits, axial thrust loads, packaging envelope, and mechanical transmission efficiency. When driving high-pressure hydraulic pumps, size corresponding motor drive parameters with our <a href="/calculators/engineering/pump-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pump calculator</a>.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Standard Industrial Gearbox Topologies, Single-Stage Ratios &amp; Efficiencies</p>
          <DataTable
            head={["Gear Type", "Typical Ratio Range (Single Stage)", "Mechanical Efficiency (%)", "Backdrive Capability", "Common Engineering Applications"]}
            rows={[
              ["Spur Gears", "1:1 to 6:1", "97% - 99%", "Yes (Fully reversible)", "Automotive manual transmissions, clockwork, low-cost machinery"],
              ["Helical Gears", "1:1 to 10:1", "96% - 98%", "Yes", "Industrial gear motors, vehicle final drives, smooth high-speed lines"],
              ["Planetary (Epicyclic)", "3:1 to 10:1 (per stage)", "94% - 97%", "Yes", "Robotic joint actuators, automatic transmissions, wheel hub drives"],
              ["Bevel Gears (Straight/Spiral)", "1:1 to 5:1", "95% - 98%", "Yes", "Right-angle shaft drives, automotive differentials, drill presses"],
              ["Worm & Wheel", "5:1 to 70:1", "50% - 90%", "No (Self-locking when lead angle < 5°)", "Elevators, winches, conveyor safety holds, precision indexers"],
            ]}
          />

          <h2>Involute Tooth Profile and Backlash Engineering</h2>
          <p>
            Modern industrial gears utilize an involute tooth profile, which ensures a constant velocity ratio even if shaft center-to-center distances experience minor thermal expansion or manufacturing deflection. When designing high-precision robotics and CNC machine drives, engineers must account for <em>backlash</em>—the deliberate clearance gap between non-driving tooth surfaces. Too little backlash causes tooth binding and thermal seizure, while excessive backlash introduces angular positioning errors and acoustic impact chatter under cyclical load reversal.
          </p>

          <h2>Epicyclic (Planetary) Gear Train Kinematics &amp; The Willis Formula</h2>
          <p>
            In high-density mechanical power transmission systems such as aerospace turboprops, electric vehicle reduction drives, and automated guided vehicles (AGVs), conventional parallel-shaft gearboxes become too heavy and bulky. Engineers deploy <strong>planetary (epicyclic) gear sets</strong>, which distribute load across three or four planetary pinions orbiting a central sun gear inside an internal ring gear.
          </p>
          <p>
            The fundamental kinematic relationship of any epicyclic gear train is governed by the <strong>Willis Equation</strong>: <code>(ω_sun - ω_carrier) / (ω_ring - ω_carrier) = - (Z_ring / Z_sun)</code>. By holding one element stationary while driving another, multiple reduction ratios are achieved within an identical physical envelope:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Stationary Ring Gear (Carrier Output):</strong> When the outer ring is fixed and the sun gear is driven, the carrier rotates in the same direction with a reduction ratio of <code>R = 1 + (Z_ring / Z_sun)</code>. This configuration provides typical single-stage reductions from 3:1 to 10:1 with coaxial input and output shafts.
            </li>
            <li>
              <strong>Stationary Sun Gear (Carrier Output):</strong> When the sun gear is locked and the outer ring is driven, the carrier delivers a modest reduction ratio of <code>R = 1 + (Z_sun / Z_ring)</code>, frequently used in planetary hub wheel drives.
            </li>
            <li>
              <strong>Stationary Carrier (Ring Output):</strong> When the planet carrier is locked against rotation, the gear set operates as an ordinary star gear train with an inverted output direction: <code>R = - (Z_ring / Z_sun)</code>.
            </li>
          </ul>

          <h2>AGMA Tooth Bending Fatigue &amp; Contact Durability (Lewis Formula)</h2>
          <p>
            A gear set may possess the correct theoretical kinematic ratio, but catastrophic failure will occur if gear teeth cannot endure dynamic bending moments and Hertzian contact stresses. Under the <strong>American Gear Manufacturers Association (AGMA 2001-D04)</strong> standard, two primary failure modes dictate gear life:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Root Bending Fatigue:</strong> Each time a tooth engages, tangential transmitted force <code>W_t = 2 · T / d_pitch</code> exerts a cantilever bending moment at the tooth root fillet. The classic Lewis bending equation, modified by AGMA dynamic factors (<em>K_v</em>), overload factors (<em>K_o</em>), and size factors (<em>K_s</em>), calculates root bending stress: <code>σ_bending = (W_t · K_o · K_v · K_s · K_m) / (F · m · J)</code>. Exceeding the fatigue endurance limit initiates progressive microscopic cracking that culminates in catastrophic tooth breakage.
            </li>
            <li>
              <strong>Surface Pitting (Hertzian Contact Stress):</strong> At the contact line between meshing tooth flanks, high normal compressive forces generate intense localized sub-surface shear stresses. If contact stress exceeds the surface endurance limit (<em>s_ac</em>), micro-cracks form beneath the case-hardened layer, causing metal flakes to detach—a failure phenomenon known as <em>macropitting</em>.
            </li>
          </ol>

          <h2>Lubrication Regimes and Gearbox Thermal Management</h2>
          <p>
            Thermal dissipation is frequently the ultimate power-limiting constraint in enclosed gearboxes. Power losses in a gearbox manifest as heat generated by sliding friction between meshing teeth, rolling resistance within bearings, and fluid churning resistance of rotating gears submerged in lubricant baths. 
          </p>
          <h2>Gear Backlash Measurement and Quality Inspection (DIN &amp; AGMA Classes)</h2>
          <p>
            Precision motion control requires rigorous quality verification of gear manufacturing tolerances. The American Gear Manufacturers Association (AGMA) and the International Organization for Standardization (ISO 1328-1) categorize gears into precision grades based on allowable profile deviation, pitch variation, and radial runout. 
          </p>
          <p>
            Circumferential backlash is measured physically on an assembled gear train by locking the driving shaft and mounting a dial test indicator (DTI) normal to the pitch circle of the driven tooth flank. Normal backlash <code>j_n = j_t · cos(α) · cos(β)</code> (where α is pressure angle and β is helix angle) must be verified across multiple rotational quadrants. In high-precision servomechanisms where zero backlash is mandatory, engineers implement split-pinion spring-loaded anti-backlash gears, dual-lead worm gears, or zero-backlash strain wave (harmonic) drives.
          </p>
        </>
      }
    >
      <GearRatioCalculator />
    </CalcPage>
  );
}
