import type { Metadata } from "next";
import Link from "next/link";
import SolarPanelCalculatorComponent from "@/components/calcs/electronics/solar-panel-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SolarIrradianceMonthlyYieldCurveChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/solar-panel-calculator";
const TITLE = "Solar Panel Calculator | Photovoltaic System Sizing & Energy Yield";
const DESCRIPTION =
  "Calculate solar PV array kilowatt capacity, number of solar panels required, daily kilowatt-hour yield, and inverter sizing based on peak sun hours.";

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
  { href: "/calculators/electronics/battery-life-calculator", icon: "🔋", name: "Battery Life" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/three-phase-power-calculator", icon: "⚡", name: "Three-Phase Power" },
  { href: "/calculators/electronics/transformer-calculator", icon: "🔄", name: "Transformer" },
];

const FAQ_ITEMS = [
  {
    q: "How do you calculate the number of solar panels needed for a home?",
    a: "To calculate required solar panels, divide daily household electricity demand (kWh) by the local average daily Peak Sun Hours (PSH), adjust for system derating losses (typically 15% to 20%), and divide by individual panel wattage: Array Watts = [Daily kWh / PSH / (1 - Loss)] × 1,000. Dividing Array Watts by panel rating (e.g., 400W) gives the total number of solar panels.",
  },
  {
    q: "What is a 'Peak Sun Hour' (PSH) and how does it differ from daylight hours?",
    a: "A Peak Sun Hour represents the equivalent duration during which solar solar irradiance averages 1,000 Watts per square meter (1 kW/m²). While daylight may last 12 hours from dawn to dusk, early morning and late afternoon solar intensity is low. A typical location in North America receives between 3.5 and 5.5 Peak Sun Hours of full-intensity equivalent radiation daily.",
  },
  {
    q: "What causes environmental and electrical derate losses in solar PV systems?",
    a: "Solar PV derate losses aggregate several real-world factors: DC-to-AC inverter conversion losses (3% to 5%), solar panel thermal degradation in hot summer weather (-0.35%/°C above 25°C), surface dust and soiling (2% to 4%), DC/AC wiring resistive voltage drop (1% to 2%), and module mismatch or partial shading (2% to 5%).",
  },
  {
    q: "What is the difference between monocrystalline and polycrystalline solar panels?",
    a: "Monocrystalline panels are fabricated from single continuous silicon crystal ingots (Czochralski process), yielding higher commercial conversion efficiencies (20% to 23%), superior black aesthetics, and lower temperature coefficients. Polycrystalline panels are cast from melted fragments, yielding lower efficiency (15% to 17%) and a speckled blue appearance.",
  },
];

export default function SolarPanelCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Sizing photovoltaic installations requires balancing regional solar irradiance against annual household consumption and seasonal variations. To size backup battery banks, cross-reference our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link> and calculate circuit power demands in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Monthly Solar Irradiance Harvest vs Household Demand
          </h2>
          <SolarIrradianceMonthlyYieldCurveChart />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Solar photovoltaic (PV) engineering transforms electromagnetic solar radiation directly into electrical direct current through the photovoltaic effect discovered by Edmond Becquerel in 1839. When solar photons possessing energy greater than the bandgap threshold strike a doped silicon p-n junction, electron-hole pairs are liberated. The internal built-in electric field sweeps these carriers across the junction, generating usable electrical current.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designing a reliable residential or commercial solar array requires modeling local solar insolation metrics, panel tilt angles, seasonal sun trajectories, and comprehensive system derating factors. Because solar generation peaks during midday summer months while electrical consumption often peaks during winter heating or summer air conditioning cycles, accurate sizing ensures annual net energy neutrality.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Photovoltaic Array Sizing & Energy Production Equations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The required daily direct current generation (E_DC, in kWh) accounting for system derate factor (η_sys = 1 - Loss% / 100) is:
          </p>
          <Formula>{"E_{DC} = \frac{E_{target} (kWh/day)}{\eta_{sys}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The required DC array nameplate capacity (P_array, in kW) and total panel quantity (N_panels) based on regional Peak Sun Hours (PSH) are:
          </p>
          <Formula>{"P_{array} (kW) = \frac{E_{DC}}{PSH}, \quad N_{panels} = \left\lceil \frac{P_{array} \times 1,000}{P_{panel} (Watts)} \right\rceil"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Expected annual AC energy yield (E_annual, in kWh/year) is computed as:
          </p>
          <Formula>{"E_{annual} = P_{installed} (kW) \times PSH \times \eta_{sys} \times 365 days"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To size string conductor runs from the roof combiner box to the inverter, calculate voltage drop in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link> and calculate circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Regional Peak Sun Hours & Annual Insolation Averages
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Solar irradiance varies dramatically across geographic latitudes and climate zones:
          </p>
          <DataTable
            head={["Geographic Region", "Average Peak Sun Hours (PSH)", "Annual Solar Insolation", "Optimal Year-Round Tilt", "System Viability Rating"]}
            rows={[
              ["US Desert Southwest (Arizona, Nevada)", "5.5 - 6.5 hrs/day", "2,000 - 2,400 kWh/m²", "30° - 34° South", "World-Class Photovoltaic Potential"],
              ["US Sunbelt / Southern California", "4.8 - 5.5 hrs/day", "1,750 - 2,000 kWh/m²", "32° - 36° South", "Excellent Solar Return on Investment"],
              ["US Midwest / Central Plains", "4.0 - 4.6 hrs/day", "1,450 - 1,700 kWh/m²", "38° - 42° South", "Strong Commercial & Residential Yield"],
              ["US Pacific Northwest / New England", "3.2 - 3.8 hrs/day", "1,150 - 1,400 kWh/m²", "42° - 46° South", "Moderate Yield (Offset by high utility rates)"],
              ["Northern Europe (Germany, UK)", "2.8 - 3.4 hrs/day", "1,000 - 1,250 kWh/m²", "35° - 45° South", "Viable with High Net-Metering Incentives"],
              ["Equatorial Tropics", "4.5 - 5.2 hrs/day", "1,650 - 1,900 kWh/m²", "10° - 15° South/North", "High Uniform Year-Round Generation"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: 10 kW Residential Rooftop System
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A suburban household consumes an average of 900 kWh of electricity per month (30.0 kWh/day). The home is located in an area receiving 4.50 Peak Sun Hours daily. The engineering design specifies high-efficiency 400 Watt monocrystalline modules and models an industry-standard 20% system loss (η_sys = 0.80):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Required Daily DC Generation:</strong>
              <br />
              E_DC = 30.0 kWh / 0.80 = 37.5 kWh/day
            </li>
            <li>
              <strong>Required Array DC Capacity:</strong>
              <br />
              P_array = 37.5 kWh / 4.50 PSH = 8.333 kW DC = 8,333 Watts
            </li>
            <li>
              <strong>Total Number of 400W Panels:</strong>
              <br />
              N_panels = ceil(8,333 W / 400 W) = ceil(20.83) = 21 Panels (Rounded to 22 for symmetrical string balance)
            </li>
            <li>
              <strong>Installed Array Capacity:</strong>
              <br />
              P_installed = 22 × 400 W = 8,800 W = 8.80 kW DC
            </li>
            <li>
              <strong>Expected Annual AC Generation:</strong>
              <br />
              E_annual = 8.80 kW × 4.50 hrs × 0.80 × 365 days = 11,563 kWh/year
            </li>
            <li>
              <strong>Recommended Inverter Sizing (DC-to-AC Ratio 1.20):</strong>
              <br />
              P_inverter = 8.80 kW / 1.20 = 7.33 kW AC (Select standard 7.6 kW string inverter)
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An 8.8 kW array generating 11,563 kWh annually fully offsets the household&apos;s 10,800 kWh annual consumption. For commercial three-phase grid-tied installations, consult our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate utility isolation transformers in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            String Inverter vs Microinverter & DC Optimizer Architectures
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern solar installations utilize distinct power conversion architectures:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Centralized String Inverters:</strong> Multiple modules are wired in series strings producing 300V to 600V DC. Highly cost-effective for unobstructed roofs, but partial shading on a single panel pulls down the throughput of the entire series string.
            </li>
            <li>
              <strong>Module-Level Power Electronics (MLPE - Microinverters):</strong> Small grid-tied inverters mounted beneath each individual panel convert DC directly to 240V AC at the module. Offers independent Maximum Power Point Tracking (MPPT), superior shade tolerance, and module-level monitoring.
            </li>
            <li>
              <strong>DC Optimizers:</strong> Paired with a centralized inverter, DC optimizers condition voltage per panel to prevent string mismatch while consolidating AC conversion in a single wall unit.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For off-grid autonomous energy setups, model storage reserves in our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link> and calculate wire drops in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Rigorous solar panel array sizing empowers building owners and renewable engineers to optimize solar yields, achieve energy independence, and maximize financial return over the 25-year operational lifespan of photovoltaic systems.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Temperature Coefficient of Power (Pmax) & Summer Thermal Derating
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A common consumer misconception is that solar panels generate peak electrical power during scorching summer heatwaves. In semiconductor physics, however, solar photovoltaic cells exhibit a negative Temperature Coefficient of Maximum Power (γ_Pmp, typically -0.35% to -0.40% per degree Celsius above 25°C Standard Test Conditions).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When ambient summer air temperature reaches 38°C (100°F), direct sunlight absorption inside dark silicon cells elevates internal module temperatures to 65°C or higher (40°C above STC rating). At 65°C, thermal generation of intrinsic charge carriers narrows the effective silicon bandgap, causing panel operating voltage (V_mp) to collapse. An 8 kW array with a -0.38%/^°C coefficient experiences a thermal loss of 40 × 0.38\% = 15.2\%, reducing peak output by over 1,200 Watts. Maintaining adequate clearance beneath rooftop panels ensures convective airflow cooling, preserving harvestable solar yields.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate solar PV array sizing empowers building owners and renewable engineers to optimize solar yields, achieve energy independence, and maximize financial return over the operational lifespan of photovoltaic systems.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Light-Induced Degradation (LID) & 25-Year Production Warranties
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When newly manufactured p-type monocrystalline solar modules are exposed to outdoor sunlight for the very first few hours, they experience an initial performance loss termed Light-Induced Degradation (LID). In standard p-type silicon doped with boron, trace oxygen impurities present during Czochralski crystal growth form boron-oxygen defect complexes under solar illumination, reducing initial module conversion efficiency by 1.5% to 2.5% within the first month.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Following initial LID stabilization, modern Tier-1 photovoltaic panels exhibit a predictable annual linear degradation rate of approximately 0.40% to 0.50% per year due to ultraviolet weathering and thermal cycling. Premium n-type TOPCon and heterojunction (HJT) cell architectures replace boron with phosphorus, virtually eliminating LID and enabling 25-to-30-year manufacturer production warranties guaranteeing over 85% of original nameplate capacity.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Integrating automated panel cleaning systems and optimizing azimuth orientations against regional solar trajectories maximizes kilowatt-hour capture across changing seasons.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Continuous remote string monitoring identifies soiled panels and module mismatch early, protecting system investment and guaranteeing peak clean energy output over decades of clean renewable power generation.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Off-Grid Energy Storage & Photovoltaic Cable Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designing resilient solar photovoltaic installations requires matching harvestable solar yield to storage capacity modeled in our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link> and minimizing string voltage drop via our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because low-voltage DC solar strings carry substantial current from rooftop arrays down to central inverters, keeping voltage drop below 1.5% maximizes kWh energy delivery. High-efficiency MPPT charge controllers dynamically adjust array operating voltage to extract maximum available wattage throughout changing weather conditions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate solar PV array sizing empowers property owners to optimize renewable yields, achieve energy independence, and maximize investment return.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tandem Perovskite-Silicon Photovoltaic Cells & Efficiency Breakthroughs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standard single-junction monocrystalline silicon solar cells face an immutable theoretical efficiency ceiling of 29.4%, dictated by the Shockley-Queisser limit. To surpass this boundary, advanced photovoltaic research centers have engineered monolithic Tandem Perovskite-Silicon solar cells, combining a wide-bandgap metal-halide perovskite top cell with a standard silicon bottom cell.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The perovskite top layer efficiently harvests high-energy blue and green photons, while the underlying silicon base captures transmitted red and near-infrared wavelengths. Commercial tandem solar modules are demonstrating certified operational conversion efficiencies exceeding 33%, allowing residential rooftop solar arrays to generate over 30% more clean electricity from the identical roof surface area.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Coupling tandem photovoltaic modules with smart string inverters guarantees optimal harvestable energy capture across decades of continuous clean power generation.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designing solar photovoltaic arrays with appropriate temperature compensation coefficients maximizes annual megawatt-hour energy yields and guarantees long-term return on clean energy investments.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Monitoring string performance against simulated baseline irradiance identifies module soiling or shading issues early, ensuring peak solar generation throughout every season.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proper combiner box fusing and rapid-shutdown compliance protect first responders and maintain safe commercial rooftop photovoltaic installations.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Routine thermal inspections and maximum power point tracking audits guarantee maximum energy harvest and long-term economic return across commercial solar arrays.
          </p>

        </>
      }
    >
      <SolarPanelCalculatorComponent />
    </CalcPage>
  );
}
