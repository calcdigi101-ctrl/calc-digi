import type { Metadata } from "next";
import Link from "next/link";
import BatteryLifeCalculatorComponent from "@/components/calcs/electronics/battery-life-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BatteryDischargePeukertCurveChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/battery-life-calculator";
const TITLE = "Battery Life Calculator | Runtime (mAh), Discharge Rate & Autonomy";
const DESCRIPTION =
  "Calculate portable battery runtime in hours and days based on cell capacity (mAh), device current consumption, discharge efficiency, and Peukert losses.";

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
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/solar-panel-calculator", icon: "☀️", name: "Solar Panel" },
  { href: "/calculators/electronics/led-resistor-calculator", icon: "💡", name: "LED Resistor" },
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/voltage-divider-calculator", icon: "🔽", name: "Voltage Divider" },
];

const FAQ_ITEMS = [
  {
    q: "How do you calculate battery runtime in hours from capacity (mAh) and current (mA)?",
    a: "Theoretical battery runtime is computed by dividing rated battery capacity in milliamp-hours (mAh) by device continuous current consumption in milliamps (mA): Runtime (hours) = Capacity / Current Draw. To account for electrochemical internal resistance and DC-DC converter losses, multiply this theoretical figure by an efficiency factor between 0.70 and 0.85.",
  },
  {
    q: "What is Peukert's Law and why does high discharge current reduce battery capacity?",
    a: "Formulated by Wilhelm Peukert in 1897, Peukert's Law demonstrates that battery capacity decreases non-linearly as discharge rate increases: Cp = I^k × t, where k is the Peukert exponent (typically 1.1 to 1.3 for Lithium-Ion). Discharging a cell at 2C depletes useful charge much faster than discharging at C/20 due to electrolyte ionic diffusion saturation and internal I²R heating.",
  },
  {
    q: "What is the difference between battery capacity in mAh and stored energy in Wh?",
    a: "Milliamp-hours (mAh) quantify total electrical charge, whereas Watt-hours (Wh) measure total stored electrical energy: Wh = (mAh × Nominal Voltage) / 1,000. Comparing batteries of differing chemistries requires Watt-hours; for example, a 10,000 mAh 3.7V smartphone power bank stores 37 Wh, while a 10,000 mAh 12V automotive battery stores 120 Wh.",
  },
  {
    q: "How can firmware engineers maximize battery autonomy in portable IoT devices?",
    a: "Firmware engineers maximize IoT battery lifespan by keeping microcontrollers in ultra-low-power sleep states (consuming under 2 microamps) for 99% of the time, activating high-power radio transceivers (Bluetooth LE, LoRaWAN, Wi-Fi) only in brief bursts (10-50 milliseconds), and avoiding continuous sensor polling.",
  },
];

export default function BatteryLifeCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/electronics", label: "Electronics & Engineering" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Engineering Guidance:</strong> Sizing portable battery systems requires evaluating active and sleep-state current consumption alongside Peukert capacity derating. Calculate electrical energy consumption in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and off-grid recharging arrays in our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Electrochemical Discharge Efficiency & Peukert Capacity Roll-Off
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Battery life determination is a foundational engineering discipline across mobile consumer devices, biomedical implants, electric vehicles, and off-grid wireless sensor networks. In practice, a battery cell rated at 3,000 mAh cannot deliver 3,000 mA of current for one full hour. Internal equivalent series resistance (ESR), electrochemical mass-transport kinetics, and ambient temperature degradation reduce the actual delivered energy.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, modern electronic hardware requires stable regulated supply rails (such as 3.3 V or 1.8 V). As a cell discharges from its peak open-circuit voltage down to its minimum cut-off threshold, switch-mode DC-DC buck-boost converters or linear low-dropout (LDO) regulators incur conversion inefficiencies that must be incorporated into operating runtime projections.
          </p>

          <BatteryDischargePeukertCurveChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Governing Battery Autonomy & Energy Formulas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Theoretical runtime in hours (t_theory) is calculated by dividing nominal capacity (C_nom, in mAh) by device average current draw (I_avg, in mA):
          </p>
          <Formula>{"t_{theory} = \frac{C_{nom} (mAh)}{I_{avg} (mA)}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Effective operating runtime (t_effective) incorporates electrochemical discharge efficiency (η_batt, typically 80% to 90%) and regulator efficiency (η_reg):
          </p>
          <Formula>{"t_{effective} = \left( \frac{C_{nom}}{I_{avg}} \right) \times \left( \frac{\eta_{batt}}{100} \right) \times \left( \frac{\eta_{reg}}{100} \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Total stored electrochemical energy (E, in Watt-hours) is computed using cell nominal voltage (V_nom):
          </p>
          <Formula>{"E (Wh) = \frac{C_{nom} (mAh) \times V_{nom} (V)}{1,000}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For continuous DC current calculations, reference our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link> and calculate indicator LED power in our <Link href="/calculators/electronics/led-resistor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">led resistor calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Battery Chemistries & Performance Metrics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Selecting the optimal electrochemical chemistry depends on operating voltage requirements, energy density by weight, cycle life, and thermal tolerance:
          </p>
          <DataTable
            head={["Chemistry Type", "Nominal Voltage", "Energy Density", "Cycle Life (80% DoD)", "Self-Discharge Rate"]}
            rows={[
              ["Lithium Polymer (LiPo)", "3.7 V (4.2V Peak)", "180 - 260 Wh/kg", "300 - 500 cycles", "2% to 3% per month"],
              ["Lithium Iron Phosphate (LiFePO4)", "3.2 V (3.65V Peak)", "90 - 140 Wh/kg", "2,000 - 5,000 cycles", "1% to 2% per month"],
              ["Lithium Thionyl Chloride (Li-SOCl2)", "3.6 V Primary", "400 - 650 Wh/kg", "Primary (Non-rechargeable)", "&lt; 1% per year (10+ yr)"],
              ["Nickel-Metal Hydride (NiMH)", "1.2 V (1.4V Peak)", "60 - 100 Wh/kg", "500 - 1,000 cycles", "15% to 30% per month"],
              ["Lead-Acid (AGM / Gel)", "2.0 V / cell (12V Unit)", "30 - 45 Wh/kg", "300 - 600 cycles", "3% to 5% per month"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Remote Environmental Sensor Node
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An agricultural research team designs a solar-supplemented environmental monitoring station powered by a single 3.7 V 18650 Lithium-Ion cell rated at 3,500 mAh. The microcontroller operates on a 60-second duty cycle:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Active Transmission State:</strong> Consumes 80.0 mA for 1.5 seconds during sensor read and LoRaWAN packet burst.
            </li>
            <li>
              <strong>Deep Sleep State:</strong> Consumes 0.025 mA (25 µA) for the remaining 58.5 seconds.
            </li>
            <li>
              <strong>Weighted Average Current Consumption:</strong>
              <br />
              I_avg = ((80.0 mA × 1.5 s) + (0.025 mA × 58.5 s) / 60 s) = (120.0 + 1.46 / 60) = (121.46 / 60) = 2.024 mA
            </li>
            <li>
              <strong>Effective Battery Runtime (at 85% Efficiency):</strong>
              <br />
              t_effective = ≤ft((3,500 mAh / 2.024 mA)) × 0.85 = 1,729.2 hours ≈ 72.0 Days
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            With over 72 days of autonomous reserve, the unit can comfortably survive extended winter cloud cover. Solar recharge sizing can be modeled in our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link> and wire gauge drops checked in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Depth of Discharge (DoD) & Battery Cycle Life Preservation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The operational longevity of rechargeable secondary batteries depends heavily on Depth of Discharge (DoD). Cycling a standard Lithium-Ion cell from 100% state of charge down to 0% (100% DoD) subjects the cathode crystal lattice to intense mechanical strain, causing micro-cracking and loss of active lithium inventory.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Operating within an 80% to 20% charge window (60% DoD) can extend cycle life from 400 cycles to over 1,500 cycles. Industrial battery management systems (BMS) implement software charge termination at 4.10 V per cell (rather than the maximum 4.20 V limit), doubling cell lifespan with only a minor 10% reduction in initial single-charge capacity.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Testing Standards & Transportation Regulations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Portable energy storage technologies must comply with strict international regulatory regimes to guarantee transport and operational safety:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>UN 38.3 (Transport of Dangerous Goods):</strong> Mandates altitude simulation, thermal cycling (-40°C to +75°C), mechanical vibration, shock, external short circuit, and impact testing before batteries can ship commercially by air.
            </li>
            <li>
              <strong>IEC 62133:</strong> Global safety benchmark for secondary rechargeable cells and battery packs used in portable electronic equipment.
            </li>
            <li>
              <strong>UL 2054 / UL 1642:</strong> Underwriters Laboratories safety standard evaluating overcharge, forced discharge, and thermal runaway containment under abnormal component failure conditions.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When integrating voltage-step-down networks for battery-level ADC telemetry, evaluate bias dividers in our <Link href="/calculators/electronics/voltage-divider-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">voltage divider calculator</Link> and calculate filter delays with our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Rigorous battery runtime calculations allow hardware developers to optimize duty cycles, select appropriate chemistries, and deliver dependable portable autonomy without unexpected field power failures.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Low-Temperature Performance Derating & Arrhenius Electrolyte Viscosity
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Operating portable battery-powered electronics in sub-zero environments introduces severe electrochemical bottlenecks. As ambient temperature plummets toward -20°C, the viscosity of standard organic carbonate liquid electrolytes increases dramatically, impeding the mobility of solvated lithium ions traveling between the cathode and anode.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This internal transport sluggishness manifests macroscopically as a sharp spike in equivalent series internal resistance (ESR). Under heavy discharge currents, this internal resistance causes severe internal IR voltage drop, tripping microcontroller low-voltage lockout (UVLO) circuits prematurely even when substantial chemical charge remains stored inside the cell. Industrial IoT hardware intended for arctic or high-altitude deployment must utilize specialized low-temperature electrolyte blends or integrated self-heating resistance elements.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Battery Management System (BMS) Secondary Safety Topologies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Multi-cell lithium battery packs require sophisticated electronic Battery Management Systems (BMS) to guarantee operational safety. Individual cell voltages must be balanced during charging via passive resistive bleeding or active charge-shuttling capacitive architectures to prevent any single cell from experiencing overcharge stress above 4.25 Volts.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, secondary hardware protection ICs continuously monitor pack discharge currents through redundant high-side MOSFET switches. If an external short circuit or continuous over-current condition is detected, the BMS disconnects the load within microseconds, preventing destructive thermal runaway events and ensuring full compliance with international consumer transport standards.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Self-Discharge Kinetics & Shelf-Life Storage Management
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Even when completely disconnected from an electrical load, all battery cells experience spontaneous self-discharge driven by internal parasitic chemical reactions between the active electrode materials and the surrounding electrolyte. Lithium-ion cells exhibit a self-discharge rate of approximately 2% to 3% per month at room temperature (25°C), while legacy Nickel-Cadmium and NiMH chemistries lose 15% to 30% of their charge monthly.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Storage temperature exerts an exponential influence on self-discharge kinetics according to Arrhenius rate theory. Storing lithium cells at 45°C accelerates capacity degradation by a factor of three. For maximum calendar longevity, secondary cells should be placed in long-term storage at approximately 40% to 50% state of charge in a temperature-controlled environment between 15°C and 20°C.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dynamic Power Profiling for Ultra-Low-Power Firmware Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern embedded firmware engineers utilize specialized digital power profiling analyzers to capture microsecond-level current waveforms. Rather than assuming static average current draw, dynamic profiling identifies transient peripheral wakeups, flash memory write current spikes (often 10 mA to 20 mA), and radio crystal oscillator startup settling intervals.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Optimizing microcontroller clock gating and transitioning peripherals into deep power-down modes between active measurement samples allows engineers to stretch IoT battery autonomy from months to over a decade on a single coin-cell battery.
          </p>



          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Energy Harvesting Integration & Battery Replenishment Topologies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Off-grid IoT nodes and remote telemetry systems frequently combine secondary rechargeable battery banks with photovoltaic harvesting arrays. Engineers can model renewable solar generation using our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link> and verify continuous electrical consumption with our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maximum Power Point Tracking (MPPT) charge controllers match photovoltaic source impedance to battery internal impedance, boosting charging efficiency by 15% to 30% over legacy PWM controllers. Designing adequate battery storage capacity ensures continuous system autonomy across multi-day overcast periods and harsh seasonal fluctuations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Balancing continuous electrical load demands against environmental recharging cycles guarantees uninterrupted uptime across mission-critical field installations.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Solid-State Electrolyte Innovations & Next-Generation Energy Density
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The ongoing evolution of electrochemical energy storage is anchored by solid-state battery technology, which replaces flammable organic liquid carbonate electrolytes with solid ceramic, sulfide, or polymer ion conductors. Solid electrolytes eliminate internal dendrite short-circuit risks, permitting the use of pure metallic lithium anodes that elevate gravimetric energy density beyond 450 Watt-hours per kilogram.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Additionally, solid-state cells operate across broad temperature ranges from -40°C to 100°C without requiring heavy liquid cooling thermal management systems, unlocking extended operational autonomy for electric vehicles and aerospace satellites.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Auditing continuous current draw and transient peaks allows hardware engineers to design robust power distribution networks, optimize regulator efficiencies, and maximize operational battery runtime across demanding field conditions.
          </p>

        </>
      }
    >
      <BatteryLifeCalculatorComponent />
    </CalcPage>
  );
}
