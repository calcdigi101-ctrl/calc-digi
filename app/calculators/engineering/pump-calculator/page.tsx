import type { Metadata } from "next";
import PumpCalculator from "@/components/calcs/engineering/pump-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PumpSystemHeadCurveChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/pump-calculator";
const TITLE = "Pump Calculator — Water Horsepower, Brake Power (BHP) & Electrical kW | CalcDigi";
const DESCRIPTION =
  "Calculate centrifugal pump water horsepower (WHP), shaft brake horsepower (BHP), electrical power draw (kW), total dynamic head (TDH), and annual operational energy cost across water, glycol, and hydrocarbon slurries.";

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
  { href: "/calculators/engineering/reynolds-number-calculator", icon: "🌀", name: "Reynolds Number Flow Regime" },
  { href: "/calculators/engineering/electrical-load-calculator", icon: "⚡", name: "Electrical Motor Load & Amperage" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Impeller Velocity Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Pump Efficiency Percentage" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Lifecycle Pumping Energy Cost" },
];

const FAQ_ITEMS = [
  {
    q: "What is Total Dynamic Head (TDH) and how is it calculated?",
    a: "Total Dynamic Head (TDH) is the total equivalent height of fluid column that a pump must overcome to deliver flow through a piping system. It is calculated as TDH = Static Head (vertical elevation difference between suction surface and discharge reservoir) + Friction Head Loss (Darcy-Weisbach loss in straight pipes and valves) + Velocity Head (v^2 / 2g) + Pressure Differential Head between vessels: TDH = H_static + h_friction + (v^2 / 2g) + Delta_P_surface / (rho * g).",
  },
  {
    q: "What is the difference between Water Horsepower (WHP) and Brake Horsepower (BHP)?",
    a: "Water Horsepower (WHP or hydraulic power) is the theoretical mechanical work transferred directly into the fluid: WHP = (Q * TDH * SG) / 3960 (with Q in GPM, TDH in feet, SG as specific gravity), or P_hyd (kW) = (rho * g * Q * TDH) / 1000. Brake Horsepower (BHP) is the actual mechanical power required at the pump drive shaft to account for impeller hydraulic friction, disk windage, and mechanical seal drag: BHP = WHP / eta_pump.",
  },
  {
    q: "What is the Best Efficiency Point (BEP) on a pump curve?",
    a: "The Best Efficiency Point (BEP) is the specific operating condition along a pump's head-capacity (H-Q) curve where hydraulic efficiency reaches its maximum design peak (typically 75% to 88% in industrial end-suction pumps). Operating a pump significantly to the left (low flow) or right (high flow) of BEP causes severe radial shaft deflection, bearing overload, mechanical seal leakage, and cavitation damage.",
  },
  {
    q: "What is Net Positive Suction Head (NPSH) and how does it prevent cavitation?",
    a: "Net Positive Suction Head is the absolute suction pressure available above the fluid's vapor pressure at the pump suction nozzle. NPSH_Available (NPSHa) must exceed the pump manufacturer's NPSH_Required (NPSHr) by a safety margin of at least 0.6 m to 1.0 m (2 to 3 ft). If NPSHa drops below NPSHr, vapor bubbles form at low-pressure impeller eye regions and violently collapse against impeller metal, eroding impellers and causing severe vibration.",
  },
  {
    q: "How do pump Affinity Laws predict changes with impeller trim or speed change?",
    a: "The Affinity Laws dictate how performance scales when changing shaft rotational speed (N) or impeller outer diameter (D): Flow rate Q scales linearly with speed (Q2/Q1 = N2/N1); Total head H scales with the square of speed (H2/H1 = (N2/N1)^2); and Shaft power P scales with the cube of speed (P2/P1 = (N2/N1)^3). This cubic relationship makes Variable Frequency Drives (VFDs) exceptionally energy-efficient for throttling flow.",
  },
  {
    q: "How do you calculate annual electrical operating cost for an industrial pump?",
    a: "Annual electricity cost is calculated as Cost = Motor_kW * Operating_Hours_per_Year * Electricity_Tariff_per_kWh. Because industrial pumps often operate 8,000 hours per year (24/7), the electricity consumed over just one to two years routinely exceeds the original capital purchase price of the pump itself, making efficiency optimization paramount.",
  },
];

export default function PumpPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Pump Calculator"
      intro="Calculate centrifugal pump hydraulic water horsepower (WHP), shaft brake horsepower (BHP), electrical motor kW consumption, total dynamic head (TDH), and annual operational energy costs across water, glycol, and process liquids."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-950/40 dark:text-teal-400 dark:ring-teal-500/30">
                <svg className="size-3.5 shrink-0 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Hydraulic Institute &amp; ISO Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ANSI/HI 14.3 Centrifugal Pump Standards &amp; ISO 9906 Testing Specifications</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Turbomachinery &amp; Hydraulics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Pump Power and Motor Sizing Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Theoretical hydraulic power (Water Horsepower) is calculated as <strong>P_hyd (kW) = (ρ · g · Q · TDH) / 1000</strong>. Shaft Brake Horsepower is <strong>BHP = P_hyd / η_pump</strong>. Electrical motor power draw accounts for motor efficiency: <strong>P_elec (kW) = BHP (kW) / η_motor</strong>. Operating at the pump's <strong>Best Efficiency Point (BEP)</strong> minimizes radial thrust vibration and cavitation erosion. Determine upstream piping friction head loss with our <a href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</a>, check fluid flow regime with our <a href="/calculators/engineering/reynolds-number-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Reynolds number calculator</a>, or size dedicated motor power branch circuits with our <a href="/calculators/engineering/electrical-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">electrical load calculator</a>.
            </p>
          </div>

          <h2>Pump H-Q Head Curve vs. System Resistance &amp; Operating Point</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <PumpSystemHeadCurveChart />
          </div>

          <p>
            Centrifugal pumps are the workhorses of municipal potable water plants, industrial chemical processing facilities, wastewater collection networks, and commercial building HVAC hydronic heating/cooling loops. A pump converts mechanical rotational energy from an electric motor or diesel engine into hydraulic pressure energy by accelerating fluid through a high-speed rotating impeller and decelerating it in an expanding volute casing.
          </p>
          <p>
            The physical operating point of any pumping installation is determined by the intersection of the manufacturer's pump performance curve (head vs. flow) and the system resistance curve. System resistance consists of a static elevation component plus dynamic friction head loss that increases quadratically with flow rate. To evaluate motor peripheral tip velocities, use our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, assess combined system efficiency percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and forecast cumulative lifecycle electric utility bills using our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Hydraulic Pumping &amp; Power Equations</div>
            TDH = H_static + h_friction + h_minor + (v_discharge^2 / (2 * g))
            <br />
            P_hydraulic_kW = (rho * g * Q_m3s * TDH_m) / 1000
            <br />
            WHP = (Flow_GPM * TDH_ft * Specific_Gravity) / 3960
            <br />
            BHP = WHP / eta_pump
            <br />
            P_electrical_kW = (BHP * 0.7457) / eta_motor
            <br />
            Annual_Energy_Cost = P_electrical_kW * Operating_Hours * Electricity_Rate
          </Formula>

          <h2>Centrifugal Pump Efficiencies &amp; Specific Speed Classifications</h2>
          <p>
            Pump efficiency varies according to impeller geometry, quantified by the dimensionless parameter <em>Specific Speed (Ns)</em>. Radial flow impellers produce high head at low flow rates, while axial flow propeller pumps move vast volumes of fluid against low static heads.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Centrifugal Pump Specific Speed Classes, Efficiencies &amp; Typical Applications</p>
          <DataTable
            head={["Impeller Type", "Specific Speed Ns (US Units)", "Peak Efficiency Range", "Head vs. Flow Profile", "Typical Industrial Application"]}
            rows={[
              ["Radial Vane (Narrow)", "500 - 1,500", "68% - 82%", "High Head, Low Discharge", "Boiler feedwater, high-pressure reverse osmosis filtration"],
              ["Francis Vane (Mixed)", "1,500 - 4,000", "80% - 89%", "Medium Head, Medium Flow", "Municipal water supply, HVAC chilled water, industrial cooling"],
              ["Mixed Flow (Semi-Axial)", "4,000 - 7,000", "82% - 88%", "Low Head, High Discharge", "Stormwater drainage, irrigation canals, thermal power condensers"],
              ["Axial Flow (Propeller)", "7,000 - 15,000", "78% - 85%", "Very Low Head, Massive Flow", "Flood control pumping stations, drydock dewatering"],
            ]}
          />

          <h2>Variable Frequency Drives (VFD) and the Affinity Laws</h2>
          <p>
            When process flow requirements fluctuate, throttling discharge valves introduces massive artificial friction head loss, wasting thousands of kilowatt-hours. Applying a Variable Frequency Drive (VFD) to adjust motor rotational speed (<em>N</em>) leverages the cubic affinity law: <code>P₂ / P₁ = (N₂ / N₁)³</code>. Reducing pump rotational speed by just 20% drops electric power consumption by nearly 50% (<code>0.8³ = 0.512</code>), delivering extraordinary return on capital investment in commercial HVAC and municipal pumping stations.
          </p>

          <h2>Suction Specific Speed (Nss) &amp; Minimum Continuous Stable Flow</h2>
          <p>
            To prevent premature mechanical failure, hydraulic engineers calculate <strong>Suction Specific Speed (Nss)</strong>: <code>Nss = (RPM · sqrt(GPM)) / (NPSHr)^0.75</code>. 
          </p>
          <p>
            Under <strong>ANSI/HI 9.6.1 standards</strong>, pumps with an <em>Nss</em> value exceeding 11,000 to 12,000 US units feature large impeller eye diameters that are acutely susceptible to <strong>suction and discharge recirculation</strong> when throttled below Best Efficiency Point (BEP). Operating at low partial flows generates violent acoustic cavitation vortices at impeller vane inlet tips, causing intense low-frequency hydraulic pulsation, rapid mechanical seal destruction, and shaft fatigue fracture. Maintaining flow above the Minimum Continuous Stable Flow (MCSF) boundary is mandatory for industrial uptime.
          </p>

          <h2>Series vs. Parallel Pumping Configurations</h2>
          <p>
            When a single pump cannot meet process hydraulic operating requirements, multiple pumps are configured in either series or parallel arrays:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Parallel Pumping (Flow Multiplication):</strong> Connecting two identical pumps with common suction and discharge manifolds produces a composite H-Q curve where flow rates add horizontally: <code>Q_total = Q₁ + Q₂</code> at an identical head. Parallel piping is optimal for systems with flat resistance curves (high static elevation head and low piping friction), such as municipal water booster stations.
            </li>
            <li>
              <strong>Series Pumping (Head Stacking):</strong> In high-lift applications (such as deep open-pit mine dewatering and multi-stage boiler feedlines), the discharge of the first pump feeds directly into the suction nozzle of the second. Heads add vertically: <code>H_total = H₁ + H₂</code> at a constant volumetric flow rate. The second pump casing and stuffing box must be structurally rated to withstand combined discharge pressures.
            </li>
          </ul>

          <h2>Pumping Viscous Liquids and ANSI/HI 9.6.7 Derating</h2>
          <p>
            Standard manufacturer pump performance curves are calibrated using pure water at 20°C (viscosity 1.0 cSt). When pumping heavy viscous fluids—such as heavy crude oil, gear lubricants, molten chocolate, or polymer slurries (viscosities &gt; 20 cSt)—fluid disk friction against rotating impeller shrouds escalates dramatically.
          </p>
          <p>
            Hydraulic Institute standard <strong>ANSI/HI 9.6.7</strong> mandates applying empirical correction factors: <code>Q_viscous = C_Q · Q_water</code>, <code>H_viscous = C_H · H_water</code>, and <code>η_viscous = C_η · η_water</code>. Pumping a 500 cSt oil can cut peak hydraulic efficiency by more than 50% while doubling required motor brake horsepower (BHP), requiring specialized open-impeller designs or positive displacement progressive cavity pumps.
          </p>
        </>
      }
    >
      <PumpCalculator />
    </CalcPage>
  );
}
