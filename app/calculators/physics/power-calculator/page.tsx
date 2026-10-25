import type { Metadata } from "next";
import Link from "next/link";
import PowerCalculator from "@/components/calcs/physics/power-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PowerHorsepowerCurrentChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/power-calculator";
const TITLE = "Power Calculator | Mechanical Watts, Brake Horsepower & Electrical Amps";
const DESCRIPTION =
  "Calculate mechanical power output (P = E/t), brake horsepower, electrical input power, thermal dissipation losses, and AC/DC line current across voltages.";

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
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/physics/potential-energy-calculator", icon: "🏔️", name: "Potential Energy" },
  { href: "/calculators/engineering/horsepower-calculator", icon: "🏎️", name: "Engine Horsepower" },
  { href: "/calculators/engineering/ohms-law-calculator", icon: "🔌", name: "Ohm's Law (V=IR)" },
  { href: "/calculators/environment/energy-consumption-calculator", icon: "🌱", name: "Energy Consumption" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for power?",
    a: "Power (P) is the scalar physical quantity measuring the temporal rate at which work is performed or energy is converted: P = dW / dt = E / t. In the International System of Units (SI), power is measured in Watts (W), where one Watt equals one Joule of energy converted per second (1 W = 1 J/s). In mechanical systems moving at velocity v under force F, instantaneous power is given by P = F · v.",
  },
  {
    q: "What is the exact mathematical conversion between Watts and mechanical Horsepower?",
    a: "One mechanical horsepower (imperial brake horsepower, HP) is formally defined as 33,000 foot-pounds of work per minute, which converts exactly to 745.69987 Watts (standard engineering rounded value: 1 HP = 745.7 W). In the metric horsepower system (PS, cv, or ch used in European automotive benchmarks), 1 metric horsepower is defined as 75 kgf·m/s, converting to 735.49875 Watts. Consequently, 1 mechanical HP equals approximately 1.0139 metric PS.",
  },
  {
    q: "How does mechanical efficiency affect total electrical power consumption?",
    a: "No physical electric motor or thermal engine operates at 100% efficiency due to winding electrical resistance, magnetic core hysteresis, and mechanical bearing friction. The overall efficiency factor η connects useful output power to total required input power: P_input = P_output / (η / 100). A 15 kW industrial motor operating at 90% efficiency draws 16.67 kW of electrical power from the grid, with the remaining 1.67 kW dissipated into the atmosphere as thermal heat.",
  },
  {
    q: "How do you calculate electrical current draw from known power and voltage?",
    a: "Under direct current (DC) or single-phase alternating current (AC) with unity power factor (PF = 1.0), electrical power relates to voltage and current via Joule's Law: P = V · I. Solving for electric current yields: I = P / V. For example, a 7,200-watt (7.2 kW) Level 2 electric vehicle charger operating at a standard residential potential of 240 Volts draws exactly I = 7,200 W / 240 V = 30.0 Amperes of continuous electrical current.",
  },
  {
    q: "What is the critical distinction between power and energy?",
    a: "Energy is a capacity or quantity of physical work (measured in Joules or kilowatt-hours), while power is the instantaneous rate at which that energy flows (measured in Watts or horsepower). Energy equals power multiplied by time: E = P · t. A 100-watt light bulb running for 10 hours consumes 1,000 watt-hours (1 kWh = 3.6 MJ) of energy. A massive 1,000-watt microwave consumes the identical 1 kWh of energy in just 1 hour because it operates at ten times the power rate.",
  },
  {
    q: "How does torque relate to power in rotating mechanical shafts and vehicle engines?",
    a: "In rotational mechanical systems, power is the product of torsional moment (torque τ in N·m) and rotational angular velocity (ω in radians per second): P = τ · ω = τ · (2π · RPM / 60). In traditional imperial automotive engineering, this fundamental relationship yields the classic dyno formula: Horsepower = (Torque in lb-ft × RPM) / 5252. At exactly 5,252 RPM, horsepower and torque curves on an engine dynamometer graph always cross.",
  },
];

export default function PowerCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Mechanical & Electrical Power Calculator"
      intro="Calculate mechanical power output (P = E/t), brake horsepower, electrical input demand, thermal dissipation losses, and line current across supply voltages."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-500/30">
                <svg className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-4 & IEC 60034-30-1 Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Electro-Mechanical Power Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Thermal Loss & Amperage Engine
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-blue-500/20 bg-blue-50/60 p-4 dark:border-blue-500/30 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating mechanical and electrical power?
                </strong>
                <p className="mt-1">
                  Power measures the rate of energy expenditure: P = E / t = W / t. Transforming 750,000 Joules of energy over 60 seconds delivers exactly 12,500 Watts (12.50 kW), equivalent to 16.76 mechanical brake horsepower (1 HP = 745.7 W). In electrical motor applications operating at 90% efficiency on a 240V supply, total electrical input demand is 13.89 kW, drawing 57.9 Amperes of current while dissipating 1.39 kW as thermal waste heat.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Motor Power Classes: Kilowatts, Brake Horsepower & Current Draw at 240V</h2>
          <div className="not-prose my-6">
            <PowerHorsepowerCurrentChart />
          </div>

          <p>
            Power is the decisive physical metric governing the dynamic performance, velocity capability, and operational speed of every mechanical and electrical system in existence. Standardized globally within ISO 80000-4 and the International Electrotechnical Commission (IEC), the SI derived unit of power is the Watt (1 W = 1 J/s = 1 N·m/s). From sub-watt microprocessors and domestic appliances to megawatt locomotive drivetrains and gigawatt electrical utility stations, calculating power rates determines engineering sizing and thermal limits.
          </p>

          <p>
            The profound operational distinction between energy and power is frequently conflated in everyday dialogue. Energy represents the total finite capacity to perform work (a reservoir of Joules or kilowatt-hours), whereas power dictates how swiftly that work can be extracted. A small 1-horsepower motor can lift the identical weight as a 100-horsepower industrial crane, but requires one hundred times as long to complete the ascent.
          </p>

          <h2>Foundational Power Equations across Physical Domains</h2>

          <p>
            Power appears across mechanics, electromagnetism, and rotational kinematics through consistent mathematical formulations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Classical Mechanical Power Rate</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = dW / dt = E / t = F · v</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields power in Watts from energy E (Joules) over elapsed time t (seconds), or force × velocity.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Imperial Horsepower Conversion</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">HP = P_watts / 745.69987   |   P_watts = HP · 745.7</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts standard SI metric Watts into James Watt mechanical brake horsepower.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Rotational Shaft Power from Torque</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = τ · ω = τ · (2π · RPM / 60)   ⟹   HP = (τ_ft-lb · RPM) / 5252</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates shaft power output from torque τ and rotational revolutions per minute.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Electrical Joule Power & Current Draw</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = V · I = I² · R = V² / R   ⟹   I = P / V</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Connects electrical potential (Volts), current (Amps), and resistance (Ohms).</div>
          </Formula>

          <h2>Standard Electric Motor Efficiency Tiers (IEC 60034-30-1)</h2>

          <p>
            Under international standards established by the International Electrotechnical Commission (IEC 60034-30-1), low-voltage three-phase asynchronous industrial induction motors are categorized into four standardized efficiency classes:
          </p>

          <DataTable
            head={["Efficiency Tier", "IEC Code", "Nominal Efficiency (15 kW)", "Thermal Losses (kW)", "Operating Application"]}
            rows={[
              ["Standard Efficiency", "IE1", "88.7%", "1.91 kW Heat Loss", "Legacy phased-out industrial pumps"],
              ["High Efficiency", "IE2", "90.6%", "1.56 kW Heat Loss", "Variable-frequency inverter drives"],
              ["Premium Efficiency", "IE3", "92.1%", "1.29 kW Heat Loss", "Mandatory standard for modern factory motors"],
              ["Super Premium", "IE4", "93.9%", "0.97 kW Heat Loss", "Permanent-magnet synchronous motors"],
            ]}
          />


          <h2>Three-Phase Alternating Current Electrical Power Formulations</h2>

          <p>
            In industrial manufacturing facilities and commercial power distribution networks, electric power is transmitted via balanced three-phase alternating current (AC). Calculating three-phase electrical power requires incorporating the square root of three factor (√3 ≈ 1.732) and the power factor (cos φ):
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Three-Phase AC Active Power Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P_active = √3 · V_LL · I_line · cos(φ)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates real useful electrical power in Watts from line-to-line voltage and line current.</div>
          </Formula>

          <p>
            Here, V_LL represents line-to-line RMS voltage (typically 400V in Europe or 480V in North America), I_line is the line current in Amperes, and cos(φ) is the displacement power factor (typically 0.85 to 0.95 for industrial inductive motor loads). Apparent power is measured in Volt-Amperes (VA), while reactive power is measured in Volt-Amperes Reactive (VAR).
          </p>

          <h2>Thermal Dissipation & Industrial Heat Sink Sizing</h2>

          <p>
            Because electrical inefficiencies convert directly into thermal energy (P_loss = P_in - P_out), power electronics enclosures—such as solar inverters, electric vehicle motor drives, and variable frequency drives (VFDs)—require dedicated thermal management. Thermal dissipation is quantified in Watts of heat, demanding aluminum extruded heat sinks with thermal resistance R_th (measured in °C/W) to prevent junction temperatures from exceeding 125°C.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical power delivery calculations across industrial and automotive applications:
          </p>

          <h3>Case Study A: Residential Level 2 Electric Vehicle Charger</h3>
          <p>
            An electric vehicle charging station delivers E = 432,000 Joules (432 kJ) into a vehicle battery pack every minute (t = 60.0 seconds) from a residential single-phase V = 240 Volt AC supply with an internal power electronics efficiency of η = 95.0%.
          </p>
          <ul>
            <li><strong>Output Charging Power Rate:</strong> P_out = 432,000 J ÷ 60.0 s = 7,200 Watts (7.20 kW).</li>
            <li><strong>Mechanical Horsepower Equivalent:</strong> 7,200 W ÷ 745.7 W/HP = 9.66 Horsepower.</li>
            <li><strong>Total Grid Input Power Demand:</strong> P_in = 7.20 kW ÷ 0.95 = 7.579 kW (7,579 Watts).</li>
            <li><strong>Continuous Electrical Amperage:</strong> I = 7,579 W ÷ 240 V = 31.58 Amperes (requires a 40A dedicated breaker).</li>
            <li><strong>Thermal Waste Heat Dissipation:</strong> P_loss = 7,579 - 7,200 = 379 Watts of cabinet heat rejection.</li>
          </ul>

          <h3>Case Study B: Industrial Machine Tool Spindle (15 kW Output)</h3>
          <p>
            A CNC vertical machining center spindle delivers P_out = 15.0 kW (20.1 HP) of cutting power at a constant shaft speed of 6,000 RPM over an operating run of t = 3,600 seconds (1.0 hour) at η = 92.0% efficiency on a 400V 3-phase line.
          </p>
          <ul>
            <li><strong>Total Mechanical Energy Delivered:</strong> E = 15,000 W × 3,600 s = 54,000,000 Joules (54.0 MJ = 15.0 kWh).</li>
            <li><strong>Shaft Cutting Torque:</strong> τ = P / ω = 15,000 ÷ (2π × 6,000 / 60) = 15,000 ÷ 628.32 = 23.87 N·m.</li>
            <li><strong>Electrical Input Demand:</strong> P_in = 15.0 kW ÷ 0.92 = 16.304 kW.</li>
            <li><strong>Continuous Energy Consumed:</strong> Exactly 16.30 kWh per hour of machining operation.</li>
            <li><strong>Thermal Heat Dissipated:</strong> P_loss = 1.304 kW continuous heat requiring chiller coolant flow.</li>
          </ul>

          <h2>Physical Boundaries & Thermal Operating Envelopes</h2>

          <p>
            When operating high-power machinery under extreme continuous duty cycles:
          </p>

          <ol>
            <li>
              <strong>Joule Heating Limitations (I²R):</strong> High electrical current generates internal copper winding heat in direct proportion to current squared. Doubling current quadruples thermal heating, necessitating forced ventilation or liquid cooling jackets.
            </li>
            <li>
              <strong>Power Factor Degradation (cos φ):</strong> Inductive loads (such as electric motors and transformers) create a phase lag between voltage and current. A low power factor (e.g. PF = 0.80) increases apparent current draw, demanding heavier cabling without delivering additional useful work.
            </li>
            <li>
              <strong>Altitude Derating for Air Cooling:</strong> Electric motors operating in thin high-altitude air (above 1,000 meters elevation) suffer from reduced air heat-capacity, requiring a 1% power derating per 100 meters to prevent thermal winding failure.
            </li>
          </ol>


          <p>
            Variable Frequency Drives (VFDs) optimize energy consumption in centrifugal pumps and industrial ventilation fans by modulating motor rotational speed to match real-time fluid demand. According to the Affinity Laws for turbomachinery, fluid flow rate scales linearly with shaft speed (Q ∝ N), but required shaft power scales with the cube of speed (P ∝ N³). Reducing a fan's speed by just 20% slashes required power by nearly 50%, generating dramatic electricity cost savings in commercial building HVAC operations.
          </p>

          <h2>Authoritative International Standards & Power Metrology</h2>

          <p>
            For verified power standards and electrical machinery ratings:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International specifications for physical quantities and units of mechanics, energy, and power.
            </li>
            <li>
              <strong>IEC 60034-1:</strong> International Electrotechnical Commission standard for rating and performance of rotating electrical machines.
            </li>
            <li>
              <strong>IEEE Standard 112:</strong> Standard test procedure for polyphase induction motors and generators efficiency verification.
            </li>
            <li>
              <strong>NEMA MG 1:</strong> National Electrical Manufacturers Association standards for motors and generators in North American industrial applications.
            </li>
          </ul>
        </>
      }
    >
      <PowerCalculator />
    </CalcPage>
  );
}
