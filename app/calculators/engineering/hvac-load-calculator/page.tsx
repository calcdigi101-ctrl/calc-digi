import type { Metadata } from "next";
import HvacLoadCalculator from "@/components/calcs/engineering/hvac-load-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HvacCoolingCapacityZoneChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/hvac-load-calculator";
const TITLE = "HVAC Load Calculator — Manual J Sizing, Cooling Tons & Heating BTU/h | CalcDigi";
const DESCRIPTION =
  "Calculate residential and commercial HVAC heating and cooling thermal loads, air conditioning tonnage (Tons), heating capacity (BTU/h & kW), supply CFM airflow, and sensible heat gain across ASHRAE climate zones 1 through 6.";

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
  { href: "/calculators/engineering/heat-transfer-calculator", icon: "🔥", name: "Heat Transfer & Thermal Resistance" },
  { href: "/calculators/engineering/electrical-load-calculator", icon: "⚡", name: "Electrical Demand & Panel Sizing" },
  { href: "/calculators/engineering/pipe-flow-calculator", icon: "🌊", name: "Pipe Flow & Chilled Water Sizing" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Duct Airflow Velocity Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "HVAC Energy Efficiency Percentage" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Heating & Cooling Energy ROI" },
];

const FAQ_ITEMS = [
  {
    q: "How many BTU/h are in one ton of air conditioning cooling capacity?",
    a: "One ton of refrigeration or air conditioning capacity equals exactly 12,000 BTU/h (British Thermal Units per hour), which corresponds to 3.517 kW of thermal cooling power. The term historically originates from the rate of heat extraction required to freeze or melt one short ton (2,000 lbs) of ice over a 24-hour period (2,000 lbs * 144 BTU/lb latent heat of fusion / 24 hrs = 12,000 BTU/h).",
  },
  {
    q: "What are the risks of installing an oversized HVAC air conditioning unit?",
    a: "An oversized HVAC unit cools the indoor air temperature down to the thermostat setpoint too quickly—a phenomenon called 'short cycling'. Because the compressor does not run continuously long enough (typical 15 to 20-minute run cycles are required), the evaporator coil cannot condense moisture out of the air. This results in high indoor relative humidity, cold clammy conditions, mold/mildew proliferation, severe compressor mechanical wear, and high peak electrical demand charges.",
  },
  {
    q: "How is airflow volume in CFM (Cubic Feet per Minute) calculated from cooling load?",
    a: "Standard residential and commercial HVAC split systems require approximately 400 CFM of supply air per ton of cooling capacity (or roughly 1 CFM per 30 BTU/h of total cooling). Airflow can also be derived from sensible heat load using the sensible heat equation: CFM = Q_sensible / (1.08 * Delta_T), where Delta_T is the temperature difference across the evaporator coil (typically 18°F to 22°F).",
  },
  {
    q: "How do ASHRAE climate zones affect heating and cooling load sizing?",
    a: "ASHRAE Standard 90.1 categorizes North America and global regions into climate zones ranging from Zone 1 (Very Hot / Humid, like Miami or Dubai) to Zone 6–7 (Very Cold / Subarctic, like Minneapolis or Calgary). In Zone 1, sensible and latent cooling loads dominate (requiring 25 to 35 BTU/sq ft of cooling). In Zone 6, winter design temperatures drop below 0°F (-18°C), pushing heating demand up to 45 to 60 BTU/sq ft, while cooling demand is minimal.",
  },
  {
    q: "What is the difference between sensible heat gain and latent heat gain?",
    a: "Sensible heat is thermal energy that increases air temperature directly without changing moisture content (e.g., heat conduction through walls, solar solar radiation through windows, and lighting). Latent heat is energy associated with moisture addition and air humidity (e.g., human perspiration, cooking, showers, and outdoor infiltration humidity). Sizing an AC unit must address both sensible capacity and latent dehumidification capacity.",
  },
  {
    q: "Why is rule-of-thumb HVAC sizing (e.g., 500 sq ft per ton) no longer acceptable?",
    a: "Traditional rules of thumb assume outdated 1970s uninsulated building envelopes. Modern homes built with double or triple-pane Low-E argon windows, continuous exterior rigid foam insulation, air sealing (ACH50 < 3.0), and LED lighting have much lower thermal leakage. Applying 500 sq ft/ton to a modern high-performance home results in 50% to 100% equipment oversizing, leading to catastrophic indoor humidity issues.",
  },
];

export default function HvacLoadPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="HVAC Load Calculator"
      intro="Calculate residential and commercial heating and cooling loads, required air conditioning tonnage, heating capacity in BTU/h and kW, and supply airflow (CFM) across ASHRAE climate zones 1 through 6."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-500/30">
                <svg className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ACCA &amp; ASHRAE Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ACCA Manual J 8th Edition &amp; ASHRAE Standard 90.1</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Thermodynamics &amp; Psychrometrics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How HVAC Cooling Tonnage and Heating BTU/h Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Under <strong>ACCA Manual J protocol</strong>, cooling load is determined by summing conduction heat gains (<strong>Q = U · A · ΔT</strong>), solar heat gains through glazing, internal gains (occupants + appliances), and fresh air infiltration. Total heat gain in BTU/h divided by <strong>12,000 BTU/h yields Cooling Tonnage</strong>. Standard airflow requires <strong>400 CFM per ton of cooling</strong>. To evaluate thermal conductance and R-values of wall assemblies, use our <a href="/calculators/engineering/heat-transfer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">heat transfer calculator</a>, size electrical compressor feed circuits with our <a href="/calculators/engineering/electrical-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">electrical load calculator</a>, or size chilled water hydronic loops with our <a href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</a>.
            </p>
          </div>

          <h2>ASHRAE Climate Zone Heating vs. Cooling Load Intensity</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <HvacCoolingCapacityZoneChart />
          </div>

          <p>
            Heating, ventilation, and air conditioning (HVAC) systems represent the single largest energy consumer in residential and commercial buildings, accounting for over 40% of total electrical and natural gas consumption. Precision load estimation is essential: undersizing leads to failure to maintain comfort during peak design heat waves, while oversizing leads to short cycling, high humidity, indoor mold spores, and inflated initial capital costs.
          </p>
          <p>
            Modern building science requires rigorous calculation of envelope conduction, solar radiant ingress, fenestration shading coefficients, internal plug loads, and occupant metabolic generation. To evaluate ductwork airflow velocity and noise criteria, use our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, calculate SEER/COP energy savings with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and forecast long-term utility bill savings with our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard ACCA Manual J Psychrometric &amp; Heat Gain Formulas</div>
            Q_conduction = U * A * Delta_T = (1 / R_value) * A * (T_out - T_in)
            <br />
            Q_solar = Area_glass * SHGC * Solar_Radiation_Factor
            <br />
            Q_internal = (Occupants * 400 BTU/h) + Plug_Loads_BTU
            <br />
            Cooling_Tons = Total_Cooling_BTU / 12000
            <br />
            Airflow_CFM = Cooling_Tons * 400 CFM/ton = Q_sensible / (1.08 * Delta_T_coil)
            <br />
            Heating_kW = Heating_BTU / 3412.14
          </Formula>

          <h2>ASHRAE Climate Zone Benchmarks &amp; Load Densities</h2>
          <p>
            Sizing benchmarks vary dramatically across geographic regions depending on outdoor 99% winter heating and 1% summer cooling dry-bulb design temperatures.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">ASHRAE Climate Zone Design Temperatures &amp; Typical Load Densities</p>
          <DataTable
            head={["ASHRAE Zone", "Representative Cities", "Summer Design DB (°F / °C)", "Winter Design DB (°F / °C)", "Typical Cooling (BTU/sq ft)"]}
            rows={[
              ["Zone 1 (Very Hot)", "Miami, Honolulu, Dubai", "92°F / 33°C", "52°F / 11°C", "30 - 36 BTU/sq ft"],
              ["Zone 2 (Hot-Humid)", "Houston, Phoenix, New Orleans", "98°F / 37°C", "32°F / 0°C", "26 - 32 BTU/sq ft"],
              ["Zone 3 (Warm)", "Atlanta, Dallas, Los Angeles", "94°F / 34°C", "23°F / -5°C", "22 - 28 BTU/sq ft"],
              ["Zone 4 (Mixed)", "New York, Washington DC, Seattle", "89°F / 32°C", "14°F / -10°C", "18 - 24 BTU/sq ft"],
              ["Zone 5 (Cold)", "Chicago, Denver, Boston", "88°F / 31°C", "2°F / -17°C", "16 - 22 BTU/sq ft"],
              ["Zone 6 (Very Cold)", "Minneapolis, Helena, Montreal", "86°F / 30°C", "-12°F / -24°C", "14 - 18 BTU/sq ft"],
            ]}
          />

          <h2>Infiltration, Ventilation and Latent Humidity Removal</h2>
          <p>
            A common oversight in simplified HVAC estimates is neglecting moisture infiltration. In humid climates, outdoor air entering through envelope gaps carries significant latent heat. An air conditioning evaporator coil must operate below the indoor air dew point temperature (typically 52°F to 55°F) to condense atmospheric water vapor onto drain pans. Ensuring proper runtime cycles through accurate Manual J sizing ensures the system effectively maintains indoor relative humidity between 40% and 55%, preventing dust mites and structural mold growth.
          </p>

          <h2>Sensible Heat Ratio (SHR) and Psychrometric State Points</h2>
          <p>
            In psychrometric analysis, total cooling capacity is partitioned between sensible and latent cooling through the <strong>Sensible Heat Ratio (SHR)</strong>: <code>SHR = Q_sensible / (Q_sensible + Q_latent)</code>. 
          </p>
          <p>
            In arid desert climates (e.g., Phoenix, Las Vegas), the space SHR is high (0.85 to 0.95), meaning nearly all cooling power is dedicated to lowering dry-bulb air temperature. Conversely, in humid coastal environments (e.g., Miami, Houston, Singapore), heavy outdoor ventilation and occupant moisture push space SHR down to 0.65 to 0.75. Standard off-the-shelf air conditioners designed for an SHR of 0.75 will overcool humid indoor air without extracting adequate moisture unless engineered with variable-speed inverter compressors and dual-stage dehumidification reheat coils.
          </p>

          <h2>Dedicated Outdoor Air Systems (DOAS) and Enthalpy Recovery</h2>
          <p>
            Modern commercial green building codes (such as ASHRAE Standard 62.1 for acceptable indoor air quality and ASHRAE 90.1) increasingly mandate decoupling ventilation from space thermal conditioning using a <strong>Dedicated Outdoor Air System (DOAS)</strong>.
          </p>
          <p>
            Under a DOAS architecture, 100% outside fresh air is filtered, dehumidified, and conditioned before being introduced into occupied rooms, while indoor terminal units (such as chilled beams, fan coil units, or VRF heat pumps) handle purely sensible interior heat gains. Integrating a <strong>total energy recovery ventilator (ERV)</strong> with an enthalpy wheel captures 70% to 80% of the cooling energy and moisture from exhaust air, slashing peak summer peak cooling power requirements by up to 35%.
          </p>

          <h2>Ductwork Static Pressure Loss and Fan Sizing</h2>
          <p>
            An air distribution system is only as effective as the ductwork conveying conditioned air from the air handler (AHU) to terminal diffusers. As supply air moves through sheet metal ducts, duct wall friction and turbulent directional changes across elbows, dampers, and transition boots create resistive <strong>External Static Pressure (ESP)</strong>, measured in inches of water gauge (in. w.g.) or Pascals.
          </p>
          <p>
            Standard residential blowers are rated to deliver design airflow (400 CFM/ton) at a total external static pressure of 0.50 in. w.g. (125 Pa). If undersized, pinched flexible ductwork or high-MERV particulate filters escalate static pressure above 0.80 in. w.g., airflow drops, evaporator coils freeze into solid blocks of ice, and ECM blower motors draw maximum electric wattage, triggering premature motor bearing failure.
          </p>
        </>
      }
    >
      <HvacLoadCalculator />
    </CalcPage>
  );
}
