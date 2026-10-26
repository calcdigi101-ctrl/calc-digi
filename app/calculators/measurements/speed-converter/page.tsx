import type { Metadata } from "next";
import Link from "next/link";
import SpeedConverterComponent from "@/components/calcs/measurements/speed-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SpeedKinematicRegimesChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/speed-converter";
const TITLE = "Speed & Velocity Converter | m/s, km/h, mph & Nautical Knots";
const DESCRIPTION =
  "Convert meters per second, kilometers per hour, miles per hour, knots, and Mach numbers with exact kinematic derivations and interactive speed regime modeling.";

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
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/calculators/physics/velocity-calculator", icon: "🏎️", name: "Velocity Calculator" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/measurements/fuel-economy-converter", icon: "⛽", name: "Fuel Economy" },
  { href: "/pages/measurements", icon: "🚀", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical difference between speed and velocity?",
    a: "Speed is a scalar physical quantity describing the rate of change of distance traveled over time, regardless of direction (e.g., 60 mph). Velocity is a vector quantity incorporating both speed and spatial direction (e.g., 60 mph due Northeast). In kinematics, an object traveling in a circle at constant speed undergoes continuous acceleration because its velocity vector changes direction.",
  },
  {
    q: "How is a nautical knot defined and why is it used in aviation and marine navigation?",
    a: "One knot (kn or kt) is defined as exactly one nautical mile per hour (1,852 meters per hour, or ~0.5144 m/s, ~1.1508 mph). It is universally favored in aviation and maritime charting because one nautical mile directly corresponds to one minute of latitude arc along any meridian on Earth's surface, simplifying navigation on spherical Mercator charts.",
  },
  {
    q: "Why does the speed of sound (Mach 1) change with altitude and temperature?",
    a: "The speed of sound in an ideal gas is governed by a = √(γ × R × T), depending solely on the absolute thermodynamic temperature T (and gas ratio γ). At standard sea level (15°C / 288.15 K), sound travels at ~340.3 m/s (1,225 km/h or 761.2 mph). In the stratosphere at -56.5°C (216.65 K), sound speed drops to ~295.1 m/s (1,062 km/h or 660 mph).",
  },
  {
    q: "How do you quickly estimate km/h to mph in mental arithmetic?",
    a: "A quick mental approximation uses the Fibonacci sequence (3, 5, 8, 13, 21, 34, 55, 89), where adjacent numbers closely mirror the conversion ratio (~1.609). Alternatively, multiply the speed in km/h by 0.6 (or take 60% of km/h and add a couple mph). For example, 100 km/h × 0.6214 ≈ 62.14 mph.",
  },
];

export default function SpeedConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Kinematic Guidance:</strong> Speed measures the temporal rate of spatial displacement. In transport engineering, ballistics, and aerodynamic flight modeling, cross-reference our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and calculate kinetic impact energy using our <Link href="/calculators/physics/kinetic-energy-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">kinetic energy calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Kinematic Foundations of Translational Velocity & Speed Regimes
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In classical Newtonian mechanics, translational speed quantifies the magnitude of position change per unit of elapsed time: v = ds/dt. In the International System of Units (SI), the coherent derived unit of speed is meters per second (m/s). However, human civil infrastructure, transportation networks, and military aviation have created specialized operational units reflecting practical operational needs.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Terrestrial motorists gauge vehicle speed in kilometers per hour (km/h) or statute miles per hour (mph). Commercial mariners and airline pilots calibrate airspeed indicators in nautical knots (kn), while high-speed aerospace vehicles measure velocity relative to the local speed of sound using dimensionless Mach numbers. Accurate inter-conversion between these domains is essential for flight safety, traffic enforcement, and spaceflight trajectory planning.
          </p>

          <SpeedKinematicRegimesChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivations & SI Kinematic Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All translational velocity transformations compute through the SI coherent base unit of meters per second (m/s). The conversion from source speed to target unit computes via scalar ratios:
          </p>
          <Formula>{"v_{\\text{target}} = v_{\\text{source}} \\times \\left( \\frac{\\kappa_{\\text{source}}}{\\kappa_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where κ represents the exact velocity in meters per second corresponding to 1 unit of the given speed scale:
          </p>
          <Formula>{"1 \\text{ km/h} = \\frac{1000 \\text{ m}}{3600 \\text{ s}} = \\frac{1}{3.6} \\text{ m/s} \\approx 0.277778 \\text{ m/s}"}</Formula>
          <Formula>{"1 \\text{ mph} = \\frac{1609.344 \\text{ m}}{3600 \\text{ s}} = 0.44704 \\text{ m/s}, \\quad 1 \\text{ knot} = \\frac{1852 \\text{ m}}{3600 \\text{ s}} \\approx 0.514444 \\text{ m/s}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For vehicle dynamics and stopping distance analysis, speed directly influences stopping distance quadratically with kinetic energy; explore our <Link href="/calculators/physics/velocity-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">velocity calculator</Link> and calculate route timing in the <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Speed Units
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across terrestrial, nautical, aerodynamic, and relativistic regimes:
          </p>
          <DataTable
            head={["Velocity Unit", "Symbol", "Value in m/s", "Value in km/h", "Value in mph"]}
            rows={[
              ["Meters per Second (SI)", "m/s", "1.0 m/s", "3.6 km/h", "2.236936 mph"],
              ["Kilometers per Hour", "km/h", "0.277778 m/s", "1.0 km/h", "0.621371 mph"],
              ["Miles per Hour (Statute)", "mph", "0.44704 m/s", "1.609344 km/h", "1.0 mph"],
              ["Nautical Knot", "kn / kt", "0.514444 m/s", "1.852 km/h", "1.150779 mph"],
              ["Feet per Second", "ft/s / fps", "0.3048 m/s", "1.09728 km/h", "0.681818 mph"],
              ["Inches per Second", "in/s", "0.0254 m/s", "0.09144 km/h", "0.056818 mph"],
              ["Mach Number (Sea Level 15°C)", "Ma", "340.29 m/s", "1,225.04 km/h", "761.20 mph"],
              ["Mach Number (Stratosphere -56°C)", "Ma", "295.07 m/s", "1,062.25 km/h", "660.05 mph"],
              ["Speed of Light in Vacuum (c)", "c", "299,792,458 m/s", "1.07925 × 10⁹ km/h", "6.70616 × 10⁸ mph"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Jet Transatlantic Flight Profile
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an Airbus A350 cruising at flight level FL370 (37,000 feet) over the North Atlantic. The primary flight display indicates a Mach number of 0.85 in ambient air temperature of -54°C (219.15 K). The flight dispatcher must calculate true airspeed (TAS) in nautical knots, metric km/h, and imperial mph for air traffic sequencing:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Compute Local Speed of Sound):</strong> a = √(1.4 × 287.058 J/(kg·K) × 219.15 K) = √(88,074) ≈ 296.77 m/s.</li>
            <li><strong>Step 2 (Calculate True Airspeed in m/s):</strong> TAS = 0.85 × 296.77 m/s = 252.25 m/s.</li>
            <li><strong>Step 3 (Convert to Knots):</strong> 252.25 m/s ÷ (1,852 / 3,600) = 490.35 knots (KTAS).</li>
            <li><strong>Step 4 (Convert to km/h and mph):</strong> In km/h: 252.25 × 3.6 = 908.1 km/h. In mph: 252.25 ÷ 0.44704 = 564.27 mph.</li>
            <li><strong>Step 5 (Fuel Burn Verification):</strong> Cross-verify aerodynamic drag and specific fuel consumption using our <Link href="/calculators/measurements/fuel-economy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">fuel economy converter</Link> and calculate mass reserves in the <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aerodynamic Regimes: Subsonic, Transonic, Supersonic & Hypersonic
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In fluid dynamics and aeronautics, flight velocities are classified into distinct aerodynamic regimes based on the Mach number (M = v / a):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Subsonic (M &lt; 0.8):</strong> Airflow over all aircraft surfaces remains below local sound speed; streamlines flow smoothly without compressibility shocks.</li>
            <li><strong>Transonic (0.8 ≤ M ≤ 1.2):</strong> Local supersonic airflow pockets develop over wings and cockpits, causing shockwave detachment, wave drag divergence, and severe buffeting.</li>
            <li><strong>Supersonic (1.2 &lt; M &lt; 5.0):</strong> Attached oblique shockwaves envelop the airframe; sonic booms propagate across the ground plane.</li>
            <li><strong>Hypersonic (M ≥ 5.0):</strong> Extreme kinetic dissipation heats boundary layers beyond 1,000°C, causing atmospheric gas dissociation, molecular ionization, and plasma sheath blackout.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Doppler Radar & LIDAR Traffic Enforcement Metrology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern highway patrol speed measurement relies on the Doppler frequency shift principle. A police radar gun emits microwave pulses at 24.15 GHz (K-band). When the signal reflects off a moving automobile traveling at velocity v, the reflected frequency shifts by Δf = 2 × f₀ × (v / c) × cos(θ), where θ represents the cosine alignment angle between radar beam and traffic lane.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Police LIDAR units, by contrast, emit short infrared laser pulses (905 nm) and measure time-of-flight reflections over hundreds of pulses, computing speed as ds/dt with a narrow 3-milliradian beam that isolates individual target vehicles. For electronic signal engineering, cross-reference frequency parameters in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Athletics, Automotive Safety & Maritime Voyage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In human athletic performance, sprinters analyze peak velocities in meters per second: Usain Bolt&apos;s world-record 100-meter dash reached a top speed of 12.42 m/s (44.72 km/h or 27.78 mph) between the 60m and 80m marks. In automotive engineering, vehicle stopping distance increases quadratically with speed: doubling vehicle speed from 30 mph to 60 mph quadruples braking distance due to E_k = 0.5 × m × v².
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial shipping, container vessels operate in &apos;slow-steaming&apos; mode (typically 12 to 18 knots instead of 24 knots), exploiting the cubic law of hydrodynamic resistance (propulsive power scales with v³) to reduce bunker fuel consumption by over 40%. For further engineering tools, explore our <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link> or calculate academic statistics in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Special Relativity: Lorentz Transformation & Time Dilation at Relativistic Speeds
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In classical mechanics, Galilean velocity addition (v_total = v₁ + v₂) holds true at terrestrial velocities. However, as speeds approach the universal speed of light in vacuum (c = 299,792,458 m/s), Albert Einstein&apos;s special theory of relativity demonstrates that the speed of light remains an invariant speed limit across all inertial frames of reference. Velocities combine via relativistic velocity addition: v_rel = (v₁ + v₂) ÷ [1 + (v₁ × v₂ / c²)].
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At these extreme kinematic regimes, moving objects experience relativistic time dilation and spatial length contraction governed by the Lorentz factor γ = 1 ÷ √(1 - v² / c²). For instance, in particle accelerators like the Large Hadron Collider, protons accelerated to 0.999999991 c exhibit a Lorentz factor γ ≈ 7,450. To their laboratory frame, their operational lifetime is dilated by over seven thousand times, proving that Newtonian kinematics must give way to relativistic formulations at cosmic velocities.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astrodynamics: Orbital Velocities & Planetary Escape Velocity Thresholds
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In astrodynamics and space mission design, spacecraft trajectories are dictated by gravitational orbital mechanics. For a satellite in low Earth orbit (LEO, altitude ~400 km), circular orbital velocity is determined by v_orbit = √(G × M_Earth / r) ≈ 7.67 km/s (approximately 27,600 km/h or 17,150 mph). At this speed, the spacecraft completes an entire revolution around the globe every 92 minutes.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To escape Earth&apos;s gravitational potential well entirely and travel to the Moon or Mars, a spacecraft must achieve parabolic escape velocity: v_esc = √(2 × G × M_Earth / r) = √2 × v_orbit ≈ 11.19 km/s (40,280 km/h or 25,030 mph). Rocket propulsion engineers calculate velocity increments (delta-v) using the Tsiolkovsky rocket equation, carefully converting exhaust velocities in meters per second to verify fuel mass ratios.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ballistic Terminal Velocity & Aerodynamic Drag Equilibrium
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When a body falls through a planetary atmosphere under gravitational acceleration g, aerodynamic drag force increases quadratically with speed: F_drag = 0.5 × ρ × v² × C_d × A. Terminal velocity v_t is reached at the kinematic equilibrium point where upward aerodynamic drag exactly balances downward gravitational weight force: v_t = √[(2 × m × g) ÷ (ρ × C_d × A)]. For a human skydiver in belly-to-earth orientation, terminal velocity stabilizes at approximately 54 m/s (195 km/h or 120 mph).
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In rail transportation engineering, high-speed rail trains like Japan&apos;s Shinkansen and France&apos;s TGV cruise at operational speeds between 300 and 320 km/h (83.3 to 88.9 m/s, or 186 to 199 mph). Dynamic overhead catenary pantograph contact stability and aerodynamic crosswind resistance require real-time velocity tracking to adjust regenerative braking and prevent derailment along curved alignments.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In wind turbine power generation, electrical power yield scales with the cube of wind velocity: P = 0.5 × ρ × A × v³ × C_p. Accurate anemometer velocity conversions between knots, meters per second, and miles per hour allow wind farm operators to optimize turbine pitch angles and trigger storm cut-out braking mechanisms.
          </p>
        </>
      }
    >
      <SpeedConverterComponent />
    </CalcPage>
  );
}
