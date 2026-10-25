import type { Metadata } from "next";
import HeatTransferCalculator from "@/components/calcs/engineering/heat-transfer-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ThermalConductivityResistanceChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/heat-transfer-calculator";
const TITLE = "Heat Transfer Calculator — Conduction, Convection & Radiation Heat Rate | CalcDigi";
const DESCRIPTION =
  "Calculate multi-mode thermal heat transfer rates (Watts & BTU/h), heat flux (W/m²), thermal resistance R-value, overall U-factor, and wall assembly surface temperatures across conduction (Fourier), convection (Newton), and radiation (Stefan-Boltzmann).";

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
  { href: "/calculators/engineering/hvac-load-calculator", icon: "❄️", name: "HVAC Load & Cooling Tonnage" },
  { href: "/calculators/engineering/pipe-flow-calculator", icon: "🌊", name: "Pipe Flow & Chilled Water Sizing" },
  { href: "/calculators/engineering/electrical-load-calculator", icon: "⚡", name: "Electrical Thermal Demand Sizing" },
  { href: "/calculators/physics/force-calculator", icon: "🔥", name: "Thermal Force & Work Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Thermal Efficiency Percentage" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Insulation Energy Payback Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is Fourier's Law of Thermal Conduction?",
    a: "Fourier's Law states that the rate of conductive heat transfer through a homogeneous material is directly proportional to surface area and temperature gradient, and inversely proportional to material thickness: Q = (k * A * Delta_T) / L. Here, Q is heat transfer rate in Watts, k is material thermal conductivity in W/(m·K), A is cross-sectional surface area in m², Delta_T is temperature differential in Kelvin or Celsius, and L is material layer thickness in meters.",
  },
  {
    q: "How does Newton's Law of Cooling describe convective heat transfer?",
    a: "Convective heat transfer between a solid surface and a moving fluid (air, water, or oil) is governed by Newton's Law of Cooling: Q = h * A * (T_surface - T_fluid). The convective heat transfer coefficient h (in W/(m²·K)) depends on fluid velocity, viscosity, thermodynamic properties, and surface orientation. In natural air convection, h ranges from 5 to 25 W/(m²·K), while forced turbulent water convection reaches 1,000 to 15,000 W/(m²·K).",
  },
  {
    q: "What is the Stefan-Boltzmann Law for thermal radiation heat exchange?",
    a: "Thermal radiation is electromagnetic radiation emitted by all matter above absolute zero. The net radiative heat exchange between a grey surface and its surrounding environment is governed by the Stefan-Boltzmann Law: Q = epsilon * sigma * A * (T_surface^4 - T_ambient^4). Here, epsilon is surface emissivity (0 <= epsilon <= 1.0), sigma is the Stefan-Boltzmann constant (5.670374e-8 W/(m²·K⁴)), and temperatures MUST be expressed in absolute Kelvin.",
  },
  {
    q: "What is the mathematical relationship between thermal conductivity (k), R-value, and U-factor?",
    a: "Thermal resistance (R-value in m²·K/W or hr·ft²·°F/BTU) is thickness divided by thermal conductivity: R = L / k. The overall heat transfer coefficient (U-factor) is the reciprocal of total composite thermal resistance: U = 1 / R_total = 1 / (R_si + R_layer1 + R_layer2 + ... + R_se). A lower U-factor indicates superior thermal insulation performance.",
  },
  {
    q: "Why are radiation heat transfer calculations so sensitive to temperature changes?",
    a: "Because radiative emission scales with absolute temperature raised to the fourth power (T⁴), doubling absolute temperature (e.g., from 300 K to 600 K) causes radiative heat flux to surge by 2⁴ = 16 times. At moderate ambient temperatures, conduction and convection dominate; however, in high-temperature applications (furnaces, combustion chambers, re-entry heat shields), radiation quickly becomes the overwhelming heat transfer mechanism.",
  },
  {
    q: "How do thermal contact resistance and air films affect multi-layer composite walls?",
    a: "In addition to solid material layers, real-world heat transfer through building walls or heat sink interfaces is impeded by boundary fluid air films (inside air film R_si ≈ 0.13 m²·K/W, outside air film R_se ≈ 0.04 m²·K/W) and microscopic air gaps between imperfectly flat solid surfaces. Applying thermal interface paste (TIM) eliminates microscopic air voids, dramatically lowering contact resistance in microelectronic cooling.",
  },
];

export default function HeatTransferPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Heat Transfer Calculator"
      intro="Calculate multi-mode thermal heat transfer rates (Watts & BTU/h), heat flux (W/m²), thermal resistance R-value, overall U-factor, and wall surface temperatures across conduction (Fourier), convection (Newton), and radiation (Stefan-Boltzmann)."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950/40 dark:text-rose-400 dark:ring-rose-500/30">
                <svg className="size-3.5 shrink-0 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ASME &amp; ASHRAE Thermal Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ISO 6946 Building Components &amp; Incropera Fundamentals of Heat Transfer</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Thermodynamics &amp; Thermal Physics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Conduction, Convection and Radiation Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Heat transfers through three fundamental physical mechanisms: <strong>Conduction</strong> (Fourier's Law: <code>Q = k · A · ΔT / L</code>), <strong>Convection</strong> (Newton's Cooling Law: <code>Q = h · A · ΔT</code>), and <strong>Radiation</strong> (Stefan-Boltzmann: <code>Q = ε · σ · A · (T₁⁴ - T₂⁴)</code>). In composite wall assemblies, overall heat transfer is governed by the <strong>U-factor: U = 1 / R_total</strong>, where thermal resistance is <code>R = L / k</code>. To size building air conditioning equipment based on envelope heat gain, use our <a href="/calculators/engineering/hvac-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">HVAC load calculator</a>, size heat exchanger fluid flow rates with our <a href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</a>, or calculate electrical heating wattage with our <a href="/calculators/engineering/electrical-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">electrical load calculator</a>.
            </p>
          </div>

          <h2>Thermal Conductivity vs. Insulation Resistance (R-Value)</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <ThermalConductivityResistanceChart />
          </div>

          <p>
            Thermal engineering is essential across architectural building envelope design, high-performance electronics cooling, aerospace propulsion, power plant boiler design, and cryogenics. Whenever a temperature differential exists between two regions in physical space, thermal energy spontaneously migrates from higher temperature matter to lower temperature matter in strict accordance with the Second Law of Thermodynamics.
          </p>
          <p>
            Selecting appropriate insulation materials requires analyzing thermal conductivity <em>k</em> (measured in W/(m·K) or BTU·in/(hr·ft²·°F)). While structural metals like copper and aluminum rapidly conduct heat away from sensitive computer processor dies, porous insulation materials like polyurethane foam and aerogel trap stagnant air pockets to arrest both conductive and convective heat migration. To evaluate insulation investment payback over time, use our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>, calculate thermal efficiency gain percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and assess thermal expansion forces with our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Multi-Mode Heat Transfer Governing Equations</div>
            Q_conduction = (k * A * (T_hot - T_cold)) / L
            <br />
            Q_convection = h * A * (T_surface - T_fluid)
            <br />
            Q_radiation = epsilon * sigma * A * (T_hot_K^4 - T_cold_K^4)
            <br />
            R_layer = L / k
            <br />
            R_total = R_si + Sum(R_layers) + R_se
            <br />
            U_overall = 1 / R_total
            <br />
            Heat_Flux (q) = Q / A = U * Delta_T (W/m^2)
          </Formula>

          <h2>Thermal Conductivity &amp; Resistance Properties of Common Materials</h2>
          <p>
            Thermal conductivity spans more than four orders of magnitude between high-conductivity metals and advanced synthetic insulating aerogels.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Thermal Conductivity (k) and 100mm Layer R-Values for Key Engineering Materials</p>
          <DataTable
            head={["Material Classification", "Thermal Conductivity k (W/m·K)", "R-Value per 100mm (m²·K/W)", "R-Value per 4 inch (hr·ft²·°F/BTU)", "Typical Engineering Use"]}
            rows={[
              ["Pure Copper (Electrolytic)", "385.0 W/m·K", "0.00026 m²·K/W", "R-0.0015", "CPU heat pipes, industrial heat exchangers, microelectronics"],
              ["Structural Carbon Steel", "50.0 W/m·K", "0.0020 m²·K/W", "R-0.011", "Pressure vessels, boiler fire tubes, structural building framing"],
              ["Dense Concrete / Brickwork", "1.30 W/m·K", "0.077 m²·K/W", "R-0.44", "Building exterior structural walls, thermal mass storage"],
              ["Window Float Glass", "0.96 W/m·K", "0.104 m²·K/W", "R-0.59", "Architectural glazing, solar thermal collector glass covers"],
              ["Fiberglass Batt Insulation", "0.038 W/m·K", "2.63 m²·K/W", "R-15.0", "Residential wall cavity and roof attic insulation"],
              ["Polyisocyanurate (PIR) Board", "0.022 W/m·K", "4.55 m²·K/W", "R-26.0", "Continuous commercial building envelope, cryogenic cold storage"],
            ]}
          />

          <h2>Combined Heat Transfer and Thermal Bridging</h2>
          <p>
            In practical engineering systems, heat transfer rarely occurs via a single isolated mode. In an architectural building envelope, solar radiation warms exterior cladding; heat conducts inward through siding, insulation, and timber or steel studs; and indoor room air warms via convection and radiation. When conductive steel studs penetrate insulation layers without continuous exterior foam breaks, a phenomenon known as <em>thermal bridging</em> occurs, degrading effective wall assembly R-values by up to 40% and creating cold indoor condensation hotspots prone to structural rot.
          </p>

          <h2>Extended Surfaces and Heat Sink Fin Efficiency</h2>
          <p>
            When convective heat transfer between a solid surface and surrounding ambient air is limited by low air convective coefficients (<em>h ≈ 10 to 25 W/m²·K</em> in natural convection), engineers attach <strong>extended surfaces (fins)</strong> to multiply active heat transfer area. Common examples include extruded aluminum heatsinks on microprocessors, pinned air-cooled cylinder heads on motorcycles, and spirally wound copper finned tubes in economizers.
          </p>
          <p>
            However, adding fin length provides diminishing thermal returns because conductive resistance cools the fin tip relative to the root base. Thermal engineers quantify performance using <strong>Fin Efficiency (η_f)</strong>: <code>η_f = Q_actual / Q_ideal = tanh(m · L_c) / (m · L_c)</code>, where the fin performance parameter is <code>m = sqrt((h · P) / (k · A_c))</code>. If <em>m · L</em> exceeds 2.5, the outer tip of the fin drops to ambient temperature and transfers virtually zero additional heat, wasting material weight and increasing boundary air pressure drop.
          </p>

          <h2>Transient Heat Conduction and the Lumped Capacitance Method</h2>
          <p>
            In manufacturing thermal processing—such as metal billet quenching, glass tempering, and food thermal sterilization—temperature varies continuously over time <code>T = T(t)</code>. When internal conductive resistance within a solid is negligible compared to external convective resistance at its boundary, spatial temperature gradients across the body remain flat.
          </p>
          <p>
            This operational assumption is verified using the dimensionless <strong>Biot Number (Bi)</strong>: <code>Bi = (h · L_c) / k_solid</code>, where characteristic length is volume divided by surface area <code>L_c = V / A_s</code>. When <strong>Bi &lt; 0.10</strong>, the <strong>Lumped Capacitance Method</strong> applies with greater than 95% accuracy. Temperature decay over time follows an exponential cooling curve governed by the thermal time constant <code>τ_thermal = (ρ · V · c_p) / (h · A_s) = R_th · C_th</code>:
          </p>
          <p>
            <code>(T(t) - T_ambient) / (T_initial - T_ambient) = exp(- t / τ_thermal)</code>
          </p>

          <h2>Radiation View Factors and Cryogenic Radiation Shields</h2>
          <p>
            In vacuum environments where convective and conductive mediums are absent—such as satellite orbital instrumentation, thermonuclear fusion vessels, and liquid nitrogen dewars—thermal radiation is the only operative heat loss channel. The geometric orientation between two radiating surfaces is dictated by the <strong>Radiation View Factor (F₁₂)</strong>, representing the fraction of diffuse radiant energy leaving surface 1 that directly intercepts surface 2.
          </p>
          <p>
            Inserting a thin, highly reflective radiation shield of emissivity ε_s between two parallel radiant plates introduces additional surface radiative resistances. For <em>N</em> radiation shields possessing equal emissivity, net radiative heat flux drops dramatically to <code>q_shielded = q_unshielded / (N + 1)</code>. In spacecraft aerospace thermal blankets (Multi-Layer Insulation, MLI), stacking 20 to 40 aluminized Mylar foils separated by Dacron scrim nets reduces radiant heat leakage by more than 97%, keeping sensitive cryogenic propellant tanks stable against solar heating.
          </p>

          <h2>Empirical Convection Correlations (Dittus-Boelter Equation)</h2>
          <p>
            In internal forced convective heat transfer inside turbulent pipes and heat exchangers, convective coefficient <em>h</em> is predicted using the dimensionless <strong>Nusselt Number (Nu)</strong>: <code>Nu = (h · D) / k_fluid</code>. The classic <strong>Dittus-Boelter correlation</strong> states: <code>Nu = 0.023 · Re^(0.8) · Pr^n</code>, where <em>Pr</em> is the fluid Prandtl number (ν/α), and exponent <em>n = 0.4</em> for fluid heating (or <em>0.3</em> for fluid cooling). This power-law coupling reinforces why turbulent velocity dramatically magnifies heat exchanger throughput.
          </p>
        </>
      }
    >
      <HeatTransferCalculator />
    </CalcPage>
  );
}
