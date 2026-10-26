import type { Metadata } from "next";
import Link from "next/link";
import WireGaugeCalculatorComponent from "@/components/calcs/electronics/wire-gauge-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WireGaugeDistanceVoltageDropChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/wire-gauge-calculator";
const TITLE = "Wire Gauge Calculator | AWG Size, Voltage Drop & Ampacity Limits";
const DESCRIPTION =
  "Calculate American Wire Gauge (AWG) conductor resistance, two-way loop voltage drop, conductor thermal loss, and NEC ampacity compliance.";

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
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/solar-panel-calculator", icon: "☀️", name: "Solar Panel" },
  { href: "/calculators/electronics/battery-life-calculator", icon: "🔋", name: "Battery Life" },
  { href: "/calculators/electronics/three-phase-power-calculator", icon: "⚡", name: "Three-Phase Power" },
  { href: "/calculators/electronics/transformer-calculator", icon: "🔄", name: "Transformer" },
];

const FAQ_ITEMS = [
  {
    q: "What is American Wire Gauge (AWG) and how does conductor sizing scale?",
    a: "American Wire Gauge (AWG) is a standardized logarithmic wire gauge system used since 1857 in North America for solid, non-ferrous electrical conductors. In AWG sizing, higher gauge numbers designate smaller wire diameters and cross-sectional areas. Every step of 3 AWG numbers halves or doubles the conductor's cross-sectional area; for example, AWG 10 has roughly twice the copper area of AWG 13.",
  },
  {
    q: "What is the National Electrical Code (NEC) recommended maximum voltage drop?",
    a: "The National Electrical Code (NEC NFPA 70 Informational Note 210.19(A)) recommends that the maximum voltage drop on branch circuits should not exceed 3.0%, and the cumulative voltage drop across both feeders and branch circuits combined should not exceed 5.0%. Excess voltage drop causes motor overheating, dimming lights, and electronic logic brownouts.",
  },
  {
    q: "How do you calculate two-way circuit voltage drop in electrical wiring?",
    a: "Voltage drop (ΔV) is computed using Ohm's Law: ΔV = I × R_loop = I × (2 × Distance × R_per_length). In single-phase AC or DC circuits, current must traverse both the outbound 'hot' conductor and return 'neutral' conductor, requiring the one-way circuit length to be doubled when computing loop resistance.",
  },
  {
    q: "What is the difference between solid core and stranded copper wire ampacity?",
    a: "Solid and stranded copper wires of identical gauge have essentially identical continuous DC ampacities because total copper cross-sectional area is calibrated to match. However, stranded wire offers superior mechanical flexibility for conduit pulling and automotive harnesses, while solid wire is preferred for screw-terminal junction box connections in residential construction.",
  },
];

export default function WireGaugeCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Sizing electrical conductors prevents conductor overheating while guaranteeing terminal voltage complies with NEC 3% drop limits. To calculate continuous load wattage, cross-reference our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and calculate circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Percentage Voltage Drop vs Conductor Distance at 15A
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Selecting the correct electrical conductor size is one of the most critical responsibilities in electrical engineering, building construction, and industrial automation. Conductor sizing is governed by two distinct engineering constraints: <strong>thermal ampacity</strong> (the maximum current a wire can carry continuously without exceeding insulation thermal ratings) and <strong>voltage drop</strong> (the loss of electrical potential along the length of the conductor due to copper electrical resistance).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While a standard AWG 14 copper conductor may be thermally rated by code to carry 15 Amperes over a short 10-foot run, routing that same 15-Amp load over 100 feet produces severe voltage drop exceeding 5%. This causes inductive motors to stall, electronic power supplies to drop out of regulation, and wasted electrical energy to dissipate as heat along building conduits.
          </p>

          <WireGaugeDistanceVoltageDropChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations for Conductor Sizing & Voltage Drop
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The diameter (d_n, in millimeters) of an American Wire Gauge conductor of gauge index n is defined by the mathematical logarithmic progression:
          </p>
          <Formula>{"d_n = 0.127 mm \times 92^{\frac{36 - n}{39}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In single-phase two-wire branch circuits (outbound hot plus return neutral), total circuit loop resistance (R_loop) and voltage drop (Δ V) across length (L, in feet) are:
          </p>
          <Formula>{"R_{loop} = \frac{2 \times L \times R_{1000}}{1,000}, \quad \Delta V = I \times R_{loop}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The percentage voltage drop (\%VD) and Joule power dissipation (P_loss, in Watts) within the conductors are:
          </p>
          <Formula>{"\%VD = \left( \frac{\Delta V}{V_{source}} \right) \times 100, \quad P_{loss} = I^2 \times R_{loop}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For three-phase feeder voltage drop calculations, reference our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate solar PV array wiring in our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            NEC Copper Conductor Ampacity & Resistance Reference Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below summarizes standard AWG copper conductor physical diameters, cross-sectional areas, resistance per 1,000 feet, and NEC Table 310.16 ampacities at 75°C (THHN / THWN insulation):
          </p>
          <DataTable
            head={["Conductor Size (AWG)", "Diameter (Inches)", "Area (Circular Mils)", "Resistance (Ω / 1,000 ft at 20°C)", "NEC 75°C Ampacity Rating", "Standard Circuit Application"]}
            rows={[
              ["AWG 14", "0.0641 in", "4,110 cmil", "2.525 Ω", "15 A (Overcurrent Limit)", "General 120V residential lighting & convenience outlets"],
              ["AWG 12", "0.0808 in", "6,530 cmil", "1.588 Ω", "20 A (Overcurrent Limit)", "Kitchen small appliance circuits, bathroom receptacles"],
              ["AWG 10", "0.1019 in", "10,380 cmil", "0.9989 Ω", "30 A (Overcurrent Limit)", "Electric clothes dryers, residential water heaters, 240V AC"],
              ["AWG 8", "0.1285 in", "16,510 cmil", "0.6282 Ω", "50 A", "Electric ranges, central air conditioning compressors"],
              ["AWG 6", "0.1620 in", "26,240 cmil", "0.3951 Ω", "65 A", "Residential subpanel feeders, EV level 2 fast chargers (48A)"],
              ["AWG 4", "0.2043 in", "41,740 cmil", "0.2485 Ω", "85 A", "Heavy subpanel feeders, large commercial HVAC compressors"],
              ["AWG 2", "0.2576 in", "66,360 cmil", "0.1563 Ω", "115 A", "100A residential main service entrance cables"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Case Study: Long-Distance 120V Detached Garage Circuit
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An electrical contractor installs underground feeder (UF-B) cable from a residential main service panel to a detached workshop garage located L = 120 feet away. The circuit supplies a 120 V 16.0 A continuous air compressor load (protected by a 20A breaker):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Total Loop Conductor Distance:</strong> 2 × 120 ft = 240 feet
            </li>
            <li>
              <strong>Option A: Minimum Code Size AWG 12:</strong>
              <br />
              R_loop = (240 / 1,000) × 1.588 Ω = 0.3811 Ω
              <br />
              Δ V = 16.0 A × 0.3811 Ω = 6.10 V → \%VD = (6.10 / 120) × 100 = 5.08\% (Exceeds NEC 3% rule)
            </li>
            <li>
              <strong>Option B: Upsized to AWG 10:</strong>
              <br />
              R_loop = (240 / 1,000) × 0.9989 Ω = 0.2397 Ω
              <br />
              Δ V = 16.0 A × 0.2397 Ω = 3.84 V → \%VD = (3.84 / 120) × 100 = 3.20\% (Marginal)
            </li>
            <li>
              <strong>Option C: Upsized to AWG 8:</strong>
              <br />
              R_loop = (240 / 1,000) × 0.6282 Ω = 0.1508 Ω
              <br />
              Δ V = 16.0 A × 0.1508 Ω = 2.41 V → \%VD = (2.41 / 120) × 100 = 2.01\% (Optimal, compliant)
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Upsizing to AWG 8 guarantees delivered terminal voltage of 117.6 V, protecting the compressor motor from thermal burnout. For battery storage systems, calculate runtime in our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link> and calculate step-down transformers in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermal Derating: Ambient Temperature & Conduit Bundling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Published wire ampacities assume an ambient temperature of 30°C (86°F) and not more than three current-carrying conductors in a single raceway or cable. Operating cables in high ambient environments (such as unventilated attic spaces or rooftop solar conduit reaching 60°C) severely impairs heat dissipation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under NEC Table 310.15(B)(1), conductors installed in 50°C ambient temperatures must apply an ampacity correction factor of 0.82 (for 75°C rated insulation). Furthermore, when bundling 4 to 6 conductors in one conduit, an additional 0.80 derating factor applies (0.82 × 0.80 = 0.656). Failing to apply thermal derating results in accelerated insulation embrittlement and catastrophic electrical fire hazards.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For low-voltage signal cabling and indicator networks, calculate ballast resistors in our <Link href="/calculators/electronics/led-resistor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">led resistor calculator</Link> and calculate signal attenuation with our <Link href="/calculators/electronics/decibel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">decibel calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate wire gauge calculations incorporating conductor loop resistance, distance voltage drop, and environmental thermal derating ensure safe, code-compliant, and energy-efficient electrical installations across residential, commercial, and industrial facilities.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Step-Up Autotransformer Voltage Drop Remediation Strategies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When electrical branch circuits must span extreme distances—such as outdoor agricultural irrigation pumps, runway lighting, or remote mining camps located 1,000 to 3,000 feet from the main distribution transformer—upsizing copper conductors to satisfy NEC 3% voltage drop limits becomes economically prohibitive. Sizing conductors for extreme distances could mandate multi-thousand-dollar AWG 4/0 or 250 kcmil cables for modest 20-Amp loads.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In such engineering scenarios, contractors implement high-voltage buck-boost step-up topologies. By stepping up 120V or 240V to 480V or 600V at the source panel using a compact autotransformer, line current is cut in half or quarter, slashing resistive loop losses by up to 94% (P = I² R). At the remote equipment termination, a matched step-down transformer restores nominal utilization voltage, delivering code-compliant terminal voltage at a fraction of heavy copper cabling costs.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Properly calculating conductor loop resistance, distance voltage drop, and thermal derating ensures safe, code-compliant, and energy-efficient electrical installations across residential, commercial, and industrial facilities.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Conduit Fill Capacity & Thermal Dissipation Factors (NEC Chapter 9)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Pulling multiple electrical conductors through rigid metal conduit (RMC) or electrical metallic tubing (EMT) is governed by strict National Electrical Code conduit fill limits codified in NEC Chapter 9, Table 1. When installing more than two conductors, total cross-sectional area of all wires cannot exceed 40% of the interior conduit cross-sectional area.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The 60% remaining air space serves two vital functions: it provides mechanical clearance to prevent conductor insulation jacket shredding during wire pulling, and it ensures convective thermal dissipation. Jamming conduits beyond the 40% threshold traps I² R Joule heat inside the raceway, degrading insulation lifespan and precipitating conductor short-circuit faults.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying appropriate conductor gauge sizing accounting for terminal temperature ratings (60°C, 75°C, 90°C) prevents terminal screw overheating and guarantees long-term connection integrity under sustained continuous electrical loads.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Adhering strictly to NEC voltage drop recommendations maintains motor operating torque, reduces unnecessary energy waste in building conduits, and ensures compliant electrical installations.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Conductor Ampacity Derating & Industrial Power Distribution
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When sizing electrical wiring for heavy machinery, contractors must evaluate continuous line current using our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link> and audit total apparent wattage in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            National Electrical Code (NEC Table 310.16) enforces strict ampacity adjustment factors when more than three current-carrying conductors share a single conduit, or when ambient temperatures exceed 30°C. Sizing conductors adequately prevents thermal degradation of PVC insulation, eliminates fire hazards, and safeguards high-power electrical systems.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proper conductor loop resistance and distance voltage drop budgeting ensures safe, code-compliant, and energy-efficient electrical installations.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Superconducting Cables & Cryogenic High-Density Conduction
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In metropolitan underground power corridors where digging additional conduit trenches is physically impossible, utilities are deploying High-Temperature Superconducting (HTS) power cables. Fabricated using rare-earth barium copper oxide (YBCO) ceramic tapes cooled by circulating liquid nitrogen at -196°C (77 Kelvin), HTS conductors lose all electrical DC resistance identically.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A compact 6-inch diameter HTS cable can transport over 3,000 Amperes of electrical current at medium distribution voltages—delivering the same energy capacity as multiple massive overhead 345 kV high-voltage transmission lines without generating external magnetic fields or thermal dissipation into surrounding soil.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Additionally, commercial marine and aerospace electrification programs utilize lightweight stranded aluminum alloy conductors (AAAC) with cross-linked polyethylene (XLPE) insulation, achieving 50% weight reductions over legacy copper wiring harnesses while guaranteeing full compliance with aerospace fire safety and mechanical vibration endurance standards.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Selecting code-compliant conductor diameters minimizes electrical loop resistance, lowers utility operating costs, and eliminates thermal fire hazards in industrial facilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate voltage drop planning across long-distance distribution feeders guarantees proper equipment terminal voltages and uninterrupted factory machinery operations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Properly rated terminal lugs and conduit fill calculations maintain electrical safety compliance under National Electrical Code regulations.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Auditing wire ampacity across extreme ambient temperatures prevents insulation melting and guarantees safe, code-compliant commercial power transmission networks. Selecting proper stranded wire gauges ensures physical flexibility and vibration resistance in automotive and industrial installations.
          </p>

        </>
      }
    >
      <WireGaugeCalculatorComponent />
    </CalcPage>
  );
}
