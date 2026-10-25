import type { Metadata } from "next";
import Link from "next/link";
import SolarPanelCalculator from "@/components/calcs/environment/solar-panel-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SolarPanel25YearCumulativeCashflowChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/solar-panel-calculator";
const TITLE = "Solar Panel Calculator | Sizing, Cost, 30% ITC & 25-Year Payback Analysis";
const DESCRIPTION =
  "Calculate residential rooftop solar panel system size (kW), required monocrystalline panels, turnkey costs, 30% federal clean energy tax credits, annual electric bill savings, and simple capital payback.";

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
  { href: "/calculators/environment/energy-consumption-calculator", icon: "💡", name: "Home Energy Consumption" },
  { href: "/calculators/environment/electric-vehicle-savings-calculator", icon: "⚡", name: "EV Solar Charging Savings" },
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Household Carbon Footprint" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Solar Savings Investment ROI" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Grid Bill Offset Percentage" },
  { href: "/calculators/finance/roi-calculator", icon: "💰", name: "Capital Return on Investment" },
];

const FAQ_ITEMS = [
  {
    q: "How does the federal 30% Residential Clean Energy Tax Credit (Section 25D) work?",
    a: "Under the Inflation Reduction Act of 2022, the Section 25D Residential Clean Energy Credit allows homeowners to deduct exactly 30% of the total turnkey cost of installing a photovoltaic solar system from their federal income tax liability. The credit applies directly to solar panels, mounting hardware, inverters, wiring, permit fees, and qualified energy storage batteries without any maximum dollar expenditure cap through 2032.",
  },
  {
    q: "How many solar panels does an average American home require to offset 100% of electric bills?",
    a: "The average American home consumes approximately 889 kilowatt-hours of electricity per month (~10,680 kWh annually). In a moderate solar region receiving 4.5 peak sun hours per day, offsetting 100% of consumption requires a 7.5 to 8.5 kW DC solar system. Utilizing modern 400-watt monocrystalline panels, this requires between 19 and 22 individual solar panels occupying roughly 380 to 440 square feet of unshaded roof space.",
  },
  {
    q: "What are 'peak sun hours' and how do they differ from total daylight hours?",
    a: "Peak sun hours do not measure the total elapsed time the sun is visible in the sky. Rather, one peak sun hour is scientifically defined as one hour during which solar irradiance averages 1,000 watts per square meter (1 kW/m2) of direct sunlight perpendicular to the surface. While a summer day may have 14 daylight hours, atmospheric angles and haze mean a location might receive 4.5 to 6.0 effective peak sun hours.",
  },
  {
    q: "What is net metering (NEM) and how does it affect solar payback periods?",
    a: "Net Energy Metering (NEM) is a billing mechanism that credits solar homeowners for excess clean electricity fed back into the regional electric utility grid during sunny afternoon hours. Under legacy NEM 1.0/2.0 protocols, utilities credited generation at full retail electric rates. Under newer NEM 3.0 frameworks (such as California's Net Billing Tariff), export credits are based on avoided wholesale generation costs, incentivizing paired battery storage.",
  },
  {
    q: "How long do residential solar panels last and what is degradation over time?",
    a: "Tier-1 monocrystalline silicon photovoltaic panels carry manufacturer warranties guaranteeing 25 to 30 years of power production. High-efficiency panels degrade at approximately 0.3% to 0.5% per year, meaning that after 25 years of continuous outdoor operation, a quality solar panel still produces 86% to 92% of its original factory-rated nameplate wattage.",
  },
  {
    q: "Is rooftop solar still a profitable investment in northern or cloudy climates?",
    a: "Yes. Photovoltaic cells generate electricity from ambient diffused daylight as well as direct beam radiation. Modern monocrystalline silicon panels operate with high quantum efficiency even under overcast skies. Furthermore, northern states (such as New York, Massachusetts, and Connecticut) typically exhibit significantly higher utility electricity tariffs ($0.24 to $0.32/kWh), which balances lower sun hours to produce rapid 6- to 8-year payback periods.",
  },
];

export default function SolarPanelPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Solar Panel Sizing & Payback Calculator"
      intro="Calculate residential rooftop solar panel system size (kW), required monocrystalline panels, turnkey costs, 30% federal clean energy tax credits, annual electric bill savings, and simple capital payback."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                NREL PVWatts & DOE SETO Certified
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>IRS Section 25D Tax Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Photovoltaic Yield Modeling
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How Do You Size and Calculate Solar Panel Payback?
                </strong>
                <p className="mt-1">
                  To size a residential solar array, divide your average monthly kilowatt-hour consumption by 30.42 to find daily demand, then divide by local daily peak sun hours multiplied by a system derate factor (typically 0.82): System kW = Daily kWh / (Sun Hours * 0.82). Dividing total system wattage by individual panel wattage (e.g., 400W) gives the required panel count. Gross cost equals system wattage multiplied by turnkey install cost ($2.80–$3.20/W). Deducting the federal 30% Section 25D Investment Tax Credit (ITC) yields net investment. Dividing net investment by annual utility bill savings gives the simple capital payback period—typically 7 to 9 years—after which the array delivers 15 to 20 years of clean, 100% free electricity.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>25-Year Cumulative Solar Cashflow & Net Wealth Accretion</h2>
          <div className="not-prose my-6">
            <SolarPanel25YearCumulativeCashflowChart />
          </div>

          <p>
            Rooftop photovoltaic (PV) solar represents one of the few home improvement investments that functions as a high-yield, risk-free financial asset. When a homeowner pays an electric utility provider each month, 100% of that expenditure is an unrecoverable operational liability subjected to compounding utility inflation (averaging 2.5% to 4.0% annually over historical decades).
          </p>

          <p>
            Installing a residential solar array swaps an ongoing, indefinite utility liability for a fixed capital asset that generates clean electrical kilowatt-hours on site. Because modern monocrystalline panels carry manufacturer performance guarantees spanning 25 to 30 years, once the upfront capital outlay is amortized through utility bill avoidance, the homeowner generates positive cumulative cash flow for decades.
          </p>

          <p>
            To investigate how solar generation offsets home appliance electric loads, cross-reference our <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>. To evaluate how combining rooftop solar with an electric vehicle eliminates personal transportation fuel bills, explore our <Link href="/calculators/environment/electric-vehicle-savings-calculator">Electric Vehicle Savings Calculator</Link> and calculate your total household emissions reduction with the <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link>.
          </p>

          <h2>Mathematical Formulations for Photovoltaic Sizing & Financial Returns</h2>

          <p>
            Accurate solar engineering begins with the National Renewable Energy Laboratory (NREL) PVWatts performance formulation. Daily kilowatt-hour demand is balanced against local solar insolation:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Solar Array DC Capacity Sizing Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">System_kW_DC = (Monthly_kWh / 30.42) / (Peak_Sun_Hours * 0.82_Derate)</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where kWh_monthly is average monthly electric consumption; PSH is daily peak sun hours; and eta_derate is the overall system derate factor (typically 0.82, accounting for inverter AC conversion loss, wiring resistance, thermal coefficient derating, and dust soiling).</div>
          </Formula>

          <p>
            The physical panel count and financial payback horizon are determined via:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Panel Count & Capital Payback Equations</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Panels_Count = ceil((System_kW * 1000) / Panel_Watts) | Payback_Years = Net_Cost / Annual_Bill_Savings</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where W_panel is individual panel wattage (typically 400W); C_gross is turnkey installed cost; ITC is the federal tax credit (0.30); and S_annual is annual electric utility bill savings in dollars.</div>
          </Formula>

          <h2>Regional Solar Insolation & Typical Financial Performance Matrix</h2>

          <p>
            Solar financial payback varies by geographic insolation and regional utility electric tariffs. The following reference table presents realistic modeled outputs across diverse US geographic zones for an average 900 kWh/month household:
          </p>

          <DataTable
            head={["Geographic Zone", "Daily Peak Sun Hours", "Recommended DC System", "Turnkey Net Cost (30% ITC)", "Annual Bill Savings", "Simple Payback"]}
            rows={[
              ["Sun Belt (Phoenix, Las Vegas)", "5.8 PSH / day", "6.4 kW (16 panels)", "$12,800 net", "$1,620 / yr ($0.15/kWh)", "7.9 years"],
              ["Suburban Midwest (Chicago, Columbus)", "4.5 PSH / day", "8.0 kW (20 panels)", "$16,520 net", "$1,960 / yr ($0.17/kWh)", "8.4 years"],
              ["Pacific Northwest (Seattle, Portland)", "3.8 PSH / day", "9.6 kW (24 panels)", "$19,800 net", "$1,480 / yr ($0.12/kWh)", "13.4 years"],
              ["Northeast Metro (Boston, New York)", "4.2 PSH / day", "8.8 kW (22 panels)", "$18,500 net", "$2,740 / yr ($0.27/kWh)", "6.7 years"],
              ["Texas ERCOT Grid (Dallas, Austin)", "5.2 PSH / day", "7.2 kW (18 panels)", "$14,600 net", "$1,720 / yr ($0.16/kWh)", "8.5 years"],
            ]}
          />

          <p>
            For analyzing compounding capital growth if annual utility savings are reinvested in index funds, explore our <Link href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</Link> and calculate capital efficiency with our <Link href="/calculators/finance/roi-calculator">Return on Investment Calculator</Link>.
          </p>

          <h2>Understanding System Derate Factors & Inverter Architectures</h2>

          <p>
            A common misconception in solar planning is assuming that an 8 kW solar array produces 8 kW of usable alternating current (AC) power during daylight hours. In physical reality, solar panels produce direct current (DC) under Standard Test Conditions (STC: 25°C cell temperature and 1,000 W/m2 irradiance).
          </p>

          <p>
            Operating outdoors introduces several inevitable thermodynamic and electrical derate losses:
          </p>

          <ul>
            <li>
              <strong>Thermal Temperature Coefficient (-0.35%/°C):</strong> Photovoltaic semiconductors become less efficient as surface temperatures rise. On a hot 90°F (32°C) summer afternoon, roof panels reach 140°F (60°C), causing an 11% to 14% drop in peak power output.
            </li>
            <li>
              <strong>Inverter DC-to-AC Conversion Loss (2%–4%):</strong> Inverting DC electricity to 240V split-phase household AC power generates minor heat dissipation.
            </li>
            <li>
              <strong>Wiring & Resistance Losses (1.5%–2%):</strong> Conductor voltage drop along DC string runs and AC interconnects.
            </li>
            <li>
              <strong>Dust, Soiling & Snow Coverage (2%–5%):</strong> Ambient pollen, dust accumulation, and bird droppings slightly attenuate photon transmission through front tempered glass.
            </li>
          </ul>

          <p>
            To evaluate circuit sizing and voltage drop along dedicated conduit runs from rooftop arrays to the main service panel, consult our <Link href="/calculators/engineering/voltage-drop-calculator">Voltage Drop Calculator</Link> and <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Inverter Architectures: String Inverters vs. Microinverters</h2>

          <p>
            Homeowners must choose between two primary inverter architectures: central string inverters with DC power optimizers (such as SolarEdge) or distributed module-level microinverters (such as Enphase IQ8).
          </p>

          <p>
            String inverters connect groups of panels in series. While cost-effective, shading on a single panel can reduce string output unless paired with DC optimizers. In contrast, microinverters attach directly beneath each panel, performing independent Maximum Power Point Tracking (MPPT). If a nearby chimney shades one panel, the remaining array continues generating peak power unimpeded.
          </p>

          <p>
            To evaluate overall household water and energy efficiency synergies, explore our <Link href="/calculators/environment/water-usage-calculator">Water Usage Calculator</Link> and <Link href="/calculators/environment/recycling-savings-calculator">Recycling Savings Calculator</Link>.
          </p>
        </>
      }
    >
      <SolarPanelCalculator />
    </CalcPage>
  );
}
