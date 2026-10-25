import type { Metadata } from "next";
import ReynoldsNumberCalculator from "@/components/calcs/engineering/reynolds-number-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ReynoldsFlowRegimeChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/reynolds-number-calculator";
const TITLE = "Reynolds Number Calculator — Laminar, Transitional & Turbulent Flow | CalcDigi";
const DESCRIPTION =
  "Calculate the dimensionless Reynolds number (Re), determine fluid flow regimes (laminar Re < 2,300, transition, turbulent Re > 4,000), hydrodynamic entrance length, and boundary layer thickness across internal pipes and external airfoils.";

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
  { href: "/calculators/engineering/pipe-flow-calculator", icon: "🌊", name: "Pipe Flow & Head Loss Calculator" },
  { href: "/calculators/engineering/pump-calculator", icon: "⚙️", name: "Pump Power & Head Calculator" },
  { href: "/calculators/engineering/heat-transfer-calculator", icon: "🔥", name: "Convection Heat Transfer Sizing" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Fluid Velocity & Flow Speed" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Viscous Drag & Fluid Shear Force" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Inertial to Viscous Ratio Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical meaning of the Reynolds number?",
    a: "The Reynolds number (Re) is a dimensionless quantity in fluid mechanics representing the ratio of inertial forces to viscous forces within a moving fluid: Re = (Inertial Forces) / (Viscous Forces) = (rho * v * L) / mu = (v * L) / nu. When Re is low, viscous forces dominate, dampening disturbances and keeping fluid streamlines parallel and orderly (laminar). When Re is high, inertial forces overwhelm viscosity, causing chaotic velocity fluctuations and turbulent vortex eddies.",
  },
  {
    q: "What are the critical Reynolds number boundaries for internal pipe flow?",
    a: "For Newtonian fluid flow inside circular enclosed pipes: Laminar Flow occurs when Re < 2,300; Transitional Flow occurs between 2,300 <= Re <= 4,000, where fluid alternates intermittently between laminar filaments and turbulent bursts; and Fully Turbulent Flow occurs when Re > 4,000, where chaotic eddies thoroughly mix fluid throughout the pipe cross-section.",
  },
  {
    q: "How does the critical Reynolds number differ for flow over a flat plate or airfoil?",
    a: "For external flow over an unconfined flat boundary plate or aircraft wing, the characteristic length is distance from the leading edge (x). The critical Reynolds number for external boundary layer laminar-to-turbulent transition is typically Re_crit ≈ 500,000 (5 * 10^5), which is orders of magnitude higher than internal pipe flow (Re_crit = 2,300) because there are no bounding pipe walls to amplify shear instability.",
  },
  {
    q: "What is the difference between dynamic viscosity and kinematic viscosity?",
    a: "Dynamic viscosity (mu, measured in Pa·s or Poise) represents a fluid's intrinsic internal resistance to shear deformation (e.g., water = 0.001 Pa·s at 20°C, SAE 30 motor oil ≈ 0.20 Pa·s). Kinematic viscosity (nu, measured in m²/s or Stokes) is dynamic viscosity divided by fluid density: nu = mu / rho. Kinematic viscosity measures a fluid's momentum diffusivity.",
  },
  {
    q: "What is hydrodynamic entrance length and how does it depend on Reynolds number?",
    a: "Hydrodynamic entrance length (L_h) is the distance from a pipe entrance required for the fluid velocity profile to become fully developed. In laminar flow, entrance length grows linearly with Reynolds number: L_h_laminar ≈ 0.05 * Re * D (meaning at Re = 2,000, entrance length is 100 pipe diameters). In turbulent flow, rapid turbulent mixing accelerates profile development, making entrance length much shorter: L_h_turbulent ≈ 10 * D to 60 * D.",
  },
  {
    q: "Why does turbulent flow dramatically enhance heat and mass transfer?",
    a: "In laminar flow, heat and mass transfer across fluid streamlines relies purely on molecular diffusion, which is very slow. In turbulent flow, macroscopic fluid eddies physically transport hot fluid packets from pipe walls into the cold core fluid, increasing the convective heat transfer coefficient h and the Nusselt number by up to 500% to 1,000%, which is why industrial heat exchangers operate strictly in turbulent flow.",
  },
];

export default function ReynoldsNumberPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Reynolds Number Calculator"
      intro="Calculate the dimensionless Reynolds number (Re), determine fluid flow regimes (laminar Re < 2,300, transition, turbulent Re > 4,000), hydrodynamic entrance length, and boundary layer thickness across internal pipes and external bodies."
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
                ASME &amp; AIAA Fluid Dynamics Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ISO 5167 Flow Measurement &amp; White Fluid Mechanics Principles</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Fluid Dynamics &amp; Aerodynamics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How the Reynolds Number and Flow Regime Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The <strong>Reynolds number (Re)</strong> is the dimensionless ratio of fluid inertial forces to viscous forces: <strong>Re = (ρ · v · D) / μ = (v · D) / ν</strong>, where <em>ρ</em> is fluid density (kg/m³), <em>v</em> is flow velocity (m/s), <em>D</em> is internal pipe diameter (m), and <em>μ</em> is dynamic viscosity (Pa·s). In pipe flow, <strong>Re &lt; 2,300 is Laminar</strong>, <strong>2,300 to 4,000 is Transitional</strong>, and <strong>Re &gt; 4,000 is Fully Turbulent</strong>. Calculate downstream pressure loss with our <a href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</a>, evaluate pumping electrical power with our <a href="/calculators/engineering/pump-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pump calculator</a>, or evaluate heat exchanger convective coefficients with our <a href="/calculators/engineering/heat-transfer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">heat transfer calculator</a>.
            </p>
          </div>

          <h2>Reynolds Number vs. Velocity Across Common Working Fluids</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <ReynoldsFlowRegimeChart />
          </div>

          <p>
            Introduced by Osborne Reynolds in his classic 1883 dye-streak experiments, the Reynolds number is the single most important dimensionless parameter in fluid mechanics, chemical engineering, aerodynamics, and naval architecture. It provides the universal scaling criterion that enables engineers to predict whether a fluid will flow in calm, smooth, parallel laminar sheets or devolve into chaotic, energy-dissipating turbulent vortices.
          </p>
          <p>
            The transition from laminar to turbulent flow fundamentally transforms hydraulic friction factors, wall shear stresses, boundary layer heat convection, and acoustic noise generation. To analyze flow velocity conversions, use our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, calculate viscous drag forces with our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>, and calculate dimensionless force ratios with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Reynolds Number &amp; Boundary Layer Equations</div>
            Re = (rho * v * D) / mu = (v * D) / nu
            <br />
            L_entrance_laminar = 0.05 * Re * D (for Re &lt; 2300)
            <br />
            L_entrance_turbulent = 1.359 * D * Re^(1/4) ≈ 10*D to 50*D
            <br />
            f_laminar = 64 / Re
            <br />
            delta_boundary_laminar = (5.0 * x) / sqrt(Re_x) (Flat plate)
            <br />
            delta_boundary_turbulent = (0.37 * x) / (Re_x)^(1/5) (Flat plate)
          </Formula>

          <h2>Fluid Thermophysical Properties at Standard Temperature (20°C / 68°F)</h2>
          <p>
            Viscosity and density vary dramatically across industrial fluids, altering the Reynolds number by up to six orders of magnitude under identical pipe geometries.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Density, Dynamic Viscosity and Kinematic Viscosity of Common Fluids at 20°C</p>
          <DataTable
            head={["Fluid Description", "Density ρ (kg/m³)", "Dynamic Viscosity μ (Pa·s)", "Kinematic Viscosity ν (m²/s)", "Typical Engineering Flow Regime"]}
            rows={[
              ["Atmospheric Air (1 atm, 20°C)", "1.204 kg/m³", "1.825 × 10⁻⁵ Pa·s", "1.516 × 10⁻⁵ m²/s", "Turbulent in HVAC ducts and vehicle aerodynamics"],
              ["Pure Potable Water", "998.2 kg/m³", "1.002 × 10⁻³ Pa·s", "1.004 × 10⁻⁶ m²/s", "Turbulent in plumbing, municipal mains, and fire lines"],
              ["Ethylene Glycol 50% (Antifreeze)", "1,070 kg/m³", "3.400 × 10⁻³ Pa·s", "3.178 × 10⁻⁶ m²/s", "Transitional / Turbulent in automotive cooling radiators"],
              ["Engine Motor Oil (SAE 10W-30)", "875 kg/m³", "0.140 Pa·s", "1.600 × 10⁻⁴ m²/s", "Laminar inside engine oil galleries and journal bearings"],
              ["Commercial Crude Oil (Heavy)", "920 kg/m³", "0.050 - 0.250 Pa·s", "5.4 × 10⁻⁵ m²/s", "Laminar / Transitional in cross-country export pipelines"],
              ["Pure Honey / Molasses", "1,420 kg/m³", "10.0 Pa·s", "7.042 × 10⁻³ m²/s", "Strictly laminar creeping flow (Stokes flow, Re ≪ 1)"],
            ]}
          />

          <h2>Dynamic Similitude and Wind Tunnel Testing</h2>
          <p>
            The Reynolds number is the cornerstone of <em>dynamic similitude</em> in experimental fluid dynamics. When testing scaled physical scale models of aircraft, submarines, Formula 1 racing cars, or skyscrapers inside wind tunnels or water flumes, kinematic and dynamic similarity with the full-scale prototype is guaranteed if and only if the model's Reynolds number matches the real-world operating Reynolds number (<code>Re_model = Re_prototype</code>). This foundational principle allows aerospace engineers to validate aerodynamic lift and drag coefficients long before manufacturing multi-million dollar full-scale aircraft.
          </p>

          <h2>The Moody Diagram &amp; Turbulent Friction Factor Regimes</h2>
          <p>
            The iconic <strong>Moody Diagram</strong> correlates Reynolds number, relative surface roughness (<code>ε / D</code>), and Darcy friction factor (<em>f</em>) across all possible fluid flow regimes. In laminar flow (<em>Re &lt; 2,300</em>), roughness has zero impact because microscopic wall peaks remain submerged within the slow-moving viscous sublayer.
          </p>
          <p>
            As Reynolds number climbs into the fully rough turbulent regime (<em>Re &gt; 100,000</em>), viscous sublayers thin down until abrasive wall asperities protrude directly into turbulent eddies. Here, friction factor becomes completely independent of Reynolds number, dictated solely by relative roughness: <code>1 / sqrt(f) = - 2.0 · log10(ε / (3.7 · D))</code>. In this region, pumping pressure losses scale strictly with the square of flow velocity.
          </p>

          <h2>Boundary Layer Separation and the 'Drag Crisis'</h2>
          <p>
            In external aerodynamics around bluff bodies (such as spheres, bridge piers, and subsea pipelines), the Reynolds number dictates the location of <strong>boundary layer separation</strong>. As fluid decelerates around the aft contour of a sphere, an adverse pressure gradient (<code>dp/dx &gt; 0</code>) decelerates near-wall fluid.
          </p>
          <p>
            In laminar boundary layers (<em>Re &lt; 10⁵</em>), fluid lacks sufficient momentum to overcome this adverse pressure, separating early at approximately 82° from the forward stagnation point and creating a massive low-pressure turbulent wake with high drag (<em>C_d ≈ 0.47</em>). When Reynolds number exceeds the critical threshold (<em>Re ≈ 3 × 10⁵</em>)—a phenomenon called the <strong>drag crisis</strong>—the boundary layer undergoes turbulent transition, injecting high-energy momentum into the near-wall layer. Separation is delayed until 120°, shrinking the turbulent wake and plummeting drag coefficient by over 75% (<em>C_d ≈ 0.10</em>). This exact fluid dynamic principle explains why golf balls are dimpled: dimples trip the boundary layer into turbulence prematurely, maximizing flight distance.
          </p>

          <h2>Non-Newtonian Fluid Flow and Generalized Reynolds Number</h2>
          <p>
            In food manufacturing, polymer extrusion, and petroleum drilling muds, fluids do not follow Newton's law of constant viscosity. For <strong>Power-Law (Ostwald-de Waele) fluids</strong> where shear stress is <code>τ = K · (dγ/dt)^n</code>, engineers compute a <strong>Metzner-Reed Generalized Reynolds Number (Re_gen)</strong>:
          </p>
          <p>
            <code>Re_gen = (ρ · v^(2-n) · D^n) / (8^(n-1) · K · ((3n + 1) / (4n))^n)</code>
          </p>
          <p>
            For shear-thinning (pseudoplastic, <em>n &lt; 1</em>) fluids such as paint, blood, and drilling bentonite, apparent viscosity plummets under high pipe shear rates, dramatically reducing pumping friction head loss compared to equivalent Newtonian fluids.
          </p>
        </>
      }
    >
      <ReynoldsNumberCalculator />
    </CalcPage>
  );
}
