import type { Metadata } from "next";
import PipeFlowCalculator from "@/components/calcs/engineering/pipe-flow-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PipeFlowHeadLossCurveChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/pipe-flow-calculator";
const TITLE = "Pipe Flow Calculator — Velocity, Discharge & Darcy-Weisbach Head Loss | CalcDigi";
const DESCRIPTION =
  "Calculate pipe internal fluid velocity, volumetric flow rate (L/s, m³/h, GPM), Darcy-Weisbach friction factor, pressure drop (kPa/psi), and hydraulic head loss across carbon steel, copper, PVC, and ductile iron pipelines.";

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
  { href: "/calculators/engineering/reynolds-number-calculator", icon: "🌀", name: "Reynolds Number Flow Regime" },
  { href: "/calculators/engineering/pump-calculator", icon: "⚙️", name: "Pump Power & TDH Head Calculator" },
  { href: "/calculators/engineering/hvac-load-calculator", icon: "❄️", name: "HVAC Load & Chilled Water Sizing" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Fluid Speed & Velocity Calculator" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Force & Pressure Calculator" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "⛰️", name: "Elevation Grade & Slope Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the Darcy-Weisbach equation for pipe head loss?",
    a: "The Darcy-Weisbach equation is the universally accepted standard for calculating frictional head loss in closed pipe flow: h_f = f * (L / D) * (v^2 / (2 * g)). Here, h_f is head loss in meters of fluid, f is Darcy friction factor (dimensionless), L is total pipe length in meters, D is inner pipe diameter in meters, v is average fluid velocity in m/s, and g is gravitational acceleration (9.81 m/s^2). Frictional pressure drop is obtained by multiplying head loss by fluid density and gravity: Delta_P = rho * g * h_f.",
  },
  {
    q: "What is the recommended fluid velocity in municipal water and HVAC piping?",
    a: "ASHRAE and ASPE plumbing engineering guidelines recommend maintaining water velocity between 1.0 m/s and 2.4 m/s (3 to 8 ft/s) in general distribution lines. Velociy below 0.6 m/s allows suspended sediment and biofilm to settle, whereas velocity above 3.0 m/s (10 ft/s) causes severe erosion corrosion in copper and carbon steel pipe walls, creates disruptive acoustic water hammer noise, and dramatically escalates pump electrical operating costs.",
  },
  {
    q: "How does pipe diameter influence frictional pressure drop?",
    a: "Frictional pressure loss is governed by an inverse fifth-power relationship relative to diameter at a constant volumetric flow rate Q. Because velocity scales as v = Q / (pi * D^2 / 4) and Darcy loss scales with v^2 / D, substituting velocity yields h_f proportional to 1 / D^5. Consequently, cutting pipe internal diameter in half increases frictional pressure drop by 2^5 = 32 times for the same flow rate.",
  },
  {
    q: "What is the difference between laminar flow and turbulent flow in pipes?",
    a: "Fluid regime is determined by the dimensionless Reynolds number (Re = rho * v * D / mu). Laminar flow occurs when Re < 2,300; fluid travels in smooth, non-mixing parallel streamlines, and friction factor is simply f = 64 / Re, independent of pipe wall roughness. Turbulent flow occurs when Re > 4,000; chaotic fluid eddies dominate, and friction factor is governed by the Colebrook-White equation depending on relative surface roughness (epsilon / D).",
  },
  {
    q: "What is the equivalent length method for pipe fittings and valves?",
    a: "Pipe fittings (elbows, tees, reducers, and valves) disrupt smooth fluid streamlines, causing localized turbulence termed 'minor losses'. Engineers quantify these losses using loss coefficients K or equivalent lengths L_eq (expressed as L/D ratios). For instance, a standard 90-degree long radius elbow has an L/D ratio of ~30, meaning one elbow produces the same friction head loss as 30 diameters of straight pipe.",
  },
  {
    q: "How do you convert head loss in meters of fluid column into pressure drop in kPa or psi?",
    a: "To convert hydraulic head loss (h_f in meters) to pressure drop (Delta_P in Pascals), multiply by fluid density and gravitational acceleration: Delta_P (Pa) = rho * g * h_f. For water at 20°C (rho = 998 kg/m³, g = 9.81 m/s²), 1 meter of head corresponds to 9.79 kPa, or 0.433 psi. Conversely, 1 psi equals approximately 2.31 feet of water column.",
  },
];

export default function PipeFlowPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Pipe Flow Calculator"
      intro="Calculate internal pipe fluid velocity, volumetric discharge flow rate (L/s, m³/h, GPM), Darcy-Weisbach friction factor, pressure loss, and total hydraulic head loss across smooth and commercial industrial piping."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-400 dark:ring-cyan-500/30">
                <svg className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Hydraulics &amp; ASME Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ASME B31.3 Process Piping &amp; ASHRAE Fundamentals Chapter 22</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Fluid Mechanics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Pipe Velocity and Head Loss Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              In pressurized fluid piping, volumetric discharge is calculated as <strong>Q = v · A = v · (π · D² / 4)</strong>. Frictional head loss over length <em>L</em> is governed by the <strong>Darcy-Weisbach equation: h_f = f · (L / D) · (v² / 2g)</strong>. For water distribution, optimal velocity is <strong>1.2 to 2.1 m/s (4 to 7 ft/s)</strong>; exceeding 2.4 m/s triggers rapid pipe wall erosion and water hammer, while velocities below 0.6 m/s permit sediment deposition. To analyze pump power needed to overcome this head loss, use our <a href="/calculators/engineering/pump-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pump calculator</a>, determine the exact flow regime with our <a href="/calculators/engineering/reynolds-number-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Reynolds number calculator</a>, or evaluate hydronic loops using our <a href="/calculators/engineering/hvac-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">HVAC load calculator</a>.
            </p>
          </div>

          <h2>Darcy Head Loss vs. Flow Velocity Across Pipe Diameters</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <PipeFlowHeadLossCurveChart />
          </div>

          <p>
            Fluid transport through closed conduits is foundational across municipal water distribution, petrochemical plants, district cooling networks, and building plumbing systems. As viscous fluid travels through a pipe, shear stresses between fluid layers and friction against inner pipe walls dissipate kinetic energy into heat. This energy dissipation manifests as a continuous drop in piezometric head along the pipeline.
          </p>
          <p>
            Accurate pipeline sizing balances initial capital expenditure against lifecycle operating energy. Installing undersized pipe saves on material costs, but because head loss escalates with the square of velocity (and inversely with diameter to the fifth power), operational pumping electricity rises dramatically. You can verify fluid velocity conversions with our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, calculate pipeline elevation head using our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>, and calculate line thrust forces with our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fundamental Pipe Hydraulics &amp; Darcy-Weisbach Equations</div>
            Q = v * A = v * (pi * D^2 / 4)
            <br />
            h_f = f * (L / D) * (v^2 / (2 * g))
            <br />
            Delta_P = rho * g * h_f
            <br />
            Re = (rho * v * D) / mu = (v * D) / nu
            <br />
            f_laminar = 64 / Re (for Re &lt; 2300)
            <br />
            f_turbulent = 0.25 / [log10((epsilon / (3.7 * D)) + (5.74 / Re^0.9))]^2 (Swamee-Jain)
          </Formula>

          <h2>Surface Roughness and Pipe Material Selection</h2>
          <p>
            In turbulent flow, the Darcy friction factor <em>f</em> is dictated by the relative roughness <code>ε / D</code>, where ε is the absolute surface height of wall irregularities. Smooth plastic materials such as PVC, CPVC, and HDPE exhibit near-hydraulic smoothness, while aged cast iron and galvanized steel accumulate mineral scaling and tuberculation that multiply friction head loss over operational lifetimes.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Absolute Roughness Values &amp; Recommended Velocity Limits by Pipe Material</p>
          <DataTable
            head={["Piping Material", "Absolute Roughness ε (mm)", "Recommended Velocity (m/s)", "Hazen-Williams C Factor", "Primary Engineering Application"]}
            rows={[
              ["PVC / CPVC Plastic", "0.0015 mm", "1.2 - 2.5 m/s", "150", "Potable water, corrosive chemical drainage, swimming pools"],
              ["Copper (Type K, L, M)", "0.0015 mm", "1.0 - 2.0 m/s", "140 - 150", "Domestic domestic cold/hot water distribution, HVAC chilled water"],
              ["Commercial Welded Carbon Steel (Sch 40)", "0.045 mm", "1.2 - 3.0 m/s", "120 - 130", "Fire protection sprinkler lines, steam lines, industrial loops"],
              ["Ductile Iron (Cement Mortar Lined)", "0.040 mm", "1.0 - 2.5 m/s", "140", "Municipal water transmission mains, sewage pressure lines"],
              ["Galvanized Iron (Aged 10+ yrs)", "0.150 mm", "0.9 - 1.8 m/s", "100 - 110", "Legacy domestic plumbing, compressed air utility headers"],
            ]}
          />

          <h2>Balancing Capital Cost and Pumping Power</h2>
          <p>
            A common engineering pitfall is undersizing pipe diameter to minimize piping procurement cost. Because hydraulic power demand is proportional to <code>P_hyd = Q × ΔP</code>, an undersized pipe forces pumps to operate against high discharge heads, burning kilowatt-hours 24 hours a day, 365 days a year. Sizing lines using our calculator ensures velocities remain within the ASHRAE optimal band (1.2 to 2.1 m/s), guaranteeing reliable cavitation-free operation and low noise transmission throughout mechanical plantrooms.
          </p>

          <h2>Minor Frictional Losses in Valves and Fittings (K-Factor Method)</h2>
          <p>
            In process piping and plumbing loops, straight pipe friction constitutes only part of total system head loss. Valves, elbows, tees, reducers, and strainers disrupt fluid streamlines, producing localized eddy separation and pressure drops known as <strong>minor losses</strong>: <code>h_minor = K · (v² / (2 · g))</code>.
          </p>
          <p>
            The resistance coefficient <strong>K</strong> is experimentally determined under ASME standards: a fully open gate valve has a minimal <em>K ≈ 0.15</em>, whereas a standard globe valve has an intense tortuous flow path with <em>K ≈ 10.0</em>. Alternatively, engineers employ the <strong>Equivalent Length method (L_eq = K · D / f)</strong>, expressing each fitting as an equivalent length of straight pipe. In complex industrial mechanical rooms with dozens of valves, minor losses often exceed straight pipe friction by over 150%.
          </p>

          <h2>Hydraulic Transients and Water Hammer (Joukowsky Equation)</h2>
          <p>
            When a downstream quarter-turn motorized ball valve snaps shut rapidly or a booster pump trips offline during a power outage, the sudden deceleration of flowing liquid converts fluid kinetic energy into an acoustic pressure shockwave known as <strong>hydraulic water hammer</strong>.
          </p>
          <p>
            The peak transient pressure surge is governed by the <strong>Joukowsky Equation</strong>: <code>ΔP_surge = ρ · a · Δv</code>, where <em>a</em> is the acoustic pressure wave propagation velocity through the liquid-filled pipe (typically 1,000 to 1,400 m/s in steel pipes). If valve closure time is shorter than the critical reflection time <code>t_c = 2 · L / a</code>, instantaneous pressure surges can exceed normal operating pressure by 500% to 1,000%, splitting pipe welds, fracturing valve bodies, and shearing pipe hanger brackets. Engineers protect systems by installing bladder surge vessels and slow-closing check valves.
          </p>

          <h2>Darcy-Weisbach vs. Hazen-Williams Empirical Formula</h2>
          <p>
            Civil fire sprinkler engineers frequently employ the empirical <strong>Hazen-Williams formula</strong>: <code>h_f = (10.67 · L · Q^1.852) / (C^1.852 · D^4.87)</code> due to its algebraic simplicity. However, the Hazen-Williams roughness coefficient <em>C</em> is valid exclusively for clean water at ambient temperatures (10°C to 25°C). It completely ignores fluid viscosity changes, density shifts, and Reynolds number transitions.
          </p>
          <p>
            For rigorous chemical process engineering, chilled glycol loops, steam condensate lines, and high-temperature thermal fluids, the <strong>Darcy-Weisbach equation</strong> is the sole physically sound methodology recognized by ASME B31.3 and ISO standards worldwide.
          </p>
        </>
      }
    >
      <PipeFlowCalculator />
    </CalcPage>
  );
}
