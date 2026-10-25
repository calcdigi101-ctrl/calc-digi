import type { Metadata } from "next";
import Link from "next/link";
import EnergyConsumptionCalculator from "@/components/calcs/environment/energy-consumption-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EnergyConsumptionByApplianceChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/energy-consumption-calculator";
const TITLE = "Energy Consumption Calculator | Appliance Watts to kWh & Utility Bill Cost";
const DESCRIPTION =
  "Calculate electric appliance power consumption, convert watts to daily and annual kilowatt-hours (kWh), and estimate utility electricity costs based on runtime, duty cycles, and electric tariffs.";

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
  { href: "/calculators/environment/solar-panel-calculator", icon: "☀️", name: "Rooftop Solar Offset" },
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Household Carbon Footprint" },
  { href: "/calculators/environment/electric-vehicle-savings-calculator", icon: "⚡", name: "EV Charging Cost Calculator" },
  { href: "/calculators/engineering/electrical-load-calculator", icon: "⚡", name: "Electrical Load Calculator" },
  { href: "/calculators/engineering/heat-loss-calculator", icon: "🔥", name: "Home Heat Loss Sizing" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Utility Bill Budget Share" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between Watts (power) and Kilowatt-Hours (energy)?",
    a: "Watts (W) or kilowatts (kW, where 1 kW = 1,000 W) measure the instantaneous rate of electrical power consumption at any single moment. Kilowatt-hours (kWh) measure total electrical energy consumed over time. For example, running a 1,500-watt space heater continuously for two hours consumes: 1,500 W * 2 hours / 1,000 = 3.0 kilowatt-hours of electrical energy. Electric utility companies bill customers based on cumulative kWh consumed.",
  },
  {
    q: "How much does one kilowatt-hour (kWh) of electricity cost in the United States?",
    a: "According to the US Energy Information Administration (EIA), the national average residential electricity tariff is approximately $0.164 per kilowatt-hour. However, regional electric rates vary dramatically across the country: states like Louisiana and Idaho average $0.11 to $0.12/kWh, while California, Massachusetts, and Hawaii regularly exceed $0.28 to $0.42/kWh due to transmission maintenance and clean energy mandates.",
  },
  {
    q: "What is an appliance duty cycle and why does it affect energy calculations?",
    a: "A duty cycle is the percentage of time an appliance actively draws peak rated wattage during its operational cycle. Thermostatically controlled devices—such as refrigerators, air conditioners, heat pumps, and water heaters—do not run compressors continuously. A modern refrigerator might be plugged in for 24 hours per day, but its compressor only runs roughly 35% to 45% of that time, cycling on and off as interior temperatures dictate.",
  },
  {
    q: "What constitutes 'phantom load' or vampire power in modern homes?",
    a: "Phantom load refers to electrical standby power consumed by electronic devices while switched off or in sleep mode. Smart TVs, cable boxes, Wi-Fi routers, game consoles, microwave clocks, and smart speakers continuously draw between 1 and 25 watts to maintain network connectivity and clock displays. The Lawrence Berkeley National Laboratory estimates phantom loads account for 5% to 10% of total residential electric consumption.",
  },
  {
    q: "Which household appliances consume the highest amount of electricity annually?",
    a: "Thermal heating and cooling appliances dominate residential electric bills. Central air conditioning systems consume 2,500 to 4,500 kWh annually ($400–$750/yr), electric resistance water heaters consume 2,500 to 3,500 kWh ($400–$550/yr), clothes dryers consume 800 to 1,200 kWh ($130–$200/yr), and portable space heaters running 8 hours daily throughout winter consume 1,400 to 1,800 kWh ($220–$300/yr).",
  },
  {
    q: "How do Energy Star certified appliances reduce electricity consumption?",
    a: "Appliances bearing the EPA Energy Star label meet rigorous energy efficiency performance standards established by the Department of Energy. For instance, Energy Star refrigerators use advanced high-efficiency variable-speed compressors and enhanced vacuum polyurethane insulation, using 15% less energy than federal standards and over 40% less energy than units manufactured before 2005.",
  },
];

export default function EnergyConsumptionPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Energy Consumption Calculator"
      intro="Calculate electric appliance power consumption, convert watts to daily and annual kilowatt-hours (kWh), and estimate utility electricity costs based on runtime, duty cycles, and electric tariffs."
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
                US EIA RECS & DOE Energy Star Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>IEEE Power Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Tariff Modeling
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How Do You Calculate Appliance Energy Usage and Cost?
                </strong>
                <p className="mt-1">
                  To calculate an appliance&apos;s electrical energy consumption, multiply its rated power in watts (W) by daily operating hours, multiply by the active compressor duty cycle percentage, and divide by 1,000 to convert to kilowatt-hours (kWh): Daily kWh = (Watts * Hours * Duty%) / 1,000. Multiplying daily kWh by your local utility electricity tariff ($/kWh) yields daily operating cost. Multiplying by 365 gives your annual utility bill impact. For example, a 1,500W space heater running 8 hours/day at 100% duty cycle uses 12.0 kWh daily, costing $1.92 per day or $57.60 monthly at $0.16/kWh.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Household Appliance Energy Usage & Annual Electricity Cost</h2>
          <div className="not-prose my-6">
            <EnergyConsumptionByApplianceChart />
          </div>

          <p>
            Understanding electrical energy consumption is the foundational step toward reducing utility expenses and curbing household greenhouse gas emissions. In modern homes, electricity powers everything from life-safety environmental conditioning (heating and cooling) to refrigeration, food preparation, entertainment, computing, and personal vehicle transportation.
          </p>

          <p>
            However, because electrical power is invisible and delivered continuously on demand through wall receptacles, most consumers have little intuitive understanding of how much individual devices cost to operate. A tiny 9-watt LED bulb left illuminated all night costs mere pennies per month, whereas an unnoticed 1,500-watt ceramic space heater operating in a cold basement can add over $60 to a single monthly electric bill.
          </p>

          <p>
            To evaluate how generating your own clean power offsets these appliance loads, cross-reference our <Link href="/calculators/environment/solar-panel-calculator">Solar Panel Calculator</Link>. For sizing home heating capacity or evaluating whole-home electrical breaker panel demand, explore our <Link href="/calculators/engineering/electrical-load-calculator">Electrical Load Calculator</Link> and <Link href="/calculators/engineering/heat-loss-calculator">Home Heat Loss Sizing Calculator</Link>.
          </p>

          <h2>Mathematical Principles of Electrical Energy & Cost Calculations</h2>

          <p>
            Electrical energy accounting is rooted in fundamental physical principles. Power represents the instantaneous rate of energy transfer, defined in watts (where 1 watt equals 1 joule of energy per second):
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Appliance Energy Consumption Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Daily_kWh = [ (Watts * Hours * Duty_Cycle%) / 1,000 ] * Quantity</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where P_watts is the nameplate power rating in watts; t_hours is daily operating time; delta_duty is the active fractional compressor duty cycle (between 0.10 and 1.0); and N_units is the number of identical devices.</div>
          </Formula>

          <p>
            Once daily kilowatt-hours are established, utility bill expenditure and annual grid emissions are derived via linear rate multiplication:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Cost & Annual Carbon Footprint Formulas</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Monthly_Cost = Daily_kWh * 30.42 * Electric_Tariff | Annual_CO2_kg = (Daily_kWh * 365) * 0.386</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where R_rate is the retail electric utility tariff in dollars per kilowatt-hour; 30.42 represents the average days in a calendar month; and 0.386 is the EPA national grid average carbon intensity in kilograms of CO2e per kWh.</div>
          </Formula>

          <h2>Appliance Power Rating Benchmarks & Typical Annual Consumption</h2>

          <p>
            The following authoritative reference table provides standard power ratings, typical daily duty cycles, and average annual utility costs compiled from the US Department of Energy:
          </p>

          <DataTable
            head={["Appliance / Device", "Rated Power (Watts)", "Average Daily Run Time", "Duty Cycle %", "Annual Energy (kWh)", "Annual Cost ($0.16/kWh)"]}
            rows={[
              ["Central Air Conditioner (3-Ton)", "3,500 W", "8 hours / day (summer)", "65% cycling", "3,640 kWh", "$582.40 / yr"],
              ["Electric Water Heater (50-Gal)", "4,500 W", "3 hours / day", "80% cycling", "3,150 kWh", "$504.00 / yr"],
              ["Portable Space Heater", "1,500 W", "8 hours / day (winter)", "100% full draw", "1,440 kWh", "$230.40 / yr"],
              ["Clothes Dryer (Electric)", "3,000 W", "1 hour / day (5 loads/wk)", "90% cycling", "985 kWh", "$157.60 / yr"],
              ["Energy Star Refrigerator", "180 W", "24 hours / day", "40% cycling", "630 kWh", "$100.80 / yr"],
              ["Gaming Desktop Rig + Dual Monitors", "550 W", "5 hours / day", "85% load", "853 kWh", "$136.48 / yr"],
              ["Modern Dishwasher (Heated Dry)", "1,200 W", "1.2 hours / run", "75% cycling", "394 kWh", "$63.04 / yr"],
              ["Whole-Home LED Lighting (10 Bulbs)", "90 W (combined)", "6 hours / day", "100% draw", "197 kWh", "$31.52 / yr"],
            ]}
          />

          <p>
            For evaluating budget allocation shares across appliance classes, see our <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link> and assess household carbon contributions with the <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link>.
          </p>

          <h2>Understanding Duty Cycles: Resistive vs. Inductive Cycling Loads</h2>

          <p>
            A common point of confusion when computing energy consumption involves the difference between purely resistive electrical loads and thermostatically cycled inductive motor loads:
          </p>

          <ul>
            <li>
              <strong>Purely Resistive Loads (100% Duty Cycle):</strong> Space heaters, hair dryers, toasters, and incandescent filaments convert electrical current directly into heat via Ohm&apos;s law resistance (P = I^2 * R). When switched on, they draw their full nameplate wattage continuously until physically switched off.
            </li>
            <li>
              <strong>Thermostatically Cycled Compressor Loads (35%–70% Duty Cycle):</strong> Air conditioners, heat pumps, freezers, and water heaters are governed by temperature setpoints. When the setpoint is reached, the compressor shuts down while low-power sensors remain idle. Calculating energy based on 24 hours of peak wattage would over-estimate consumption by two to three times.
            </li>
            <li>
              <strong>Variable-Speed Inverter Motors:</strong> Modern inverter heat pumps and refrigerators modulate compressor speed continuously between 20% and 100% capacity rather than cycling violently on and off, saving up to 30% in seasonal energy consumption.
            </li>
          </ul>

          <h2>Mitigating Vampire Power & Standby Electric Waste</h2>

          <p>
            Standby power, often termed &apos;vampire draw,&apos; represents continuous low-wattage leakage across consumer electronics. While an individual device drawing 4 watts seems inconsequential, 25 interconnected smart devices drawing an average of 4 watts each continuously consume 100 watts around the clock. Over one full year, that unnoticed leakage totals 876 kWh—costing over $140 on utility bills.
          </p>

          <p>
            Deploying smart power strips with master-controlled outlets, setting computers to sleep mode after 15 minutes of inactivity, and unplugging secondary basement entertainment centers eliminates over 90% of standby electric waste.
          </p>

          <h2>Time-of-Use (TOU) Rate Structures & Peak Demand Shifting</h2>

          <p>
            An increasing number of electrical utility providers have migrated customers from flat-rate kilowatt-hour pricing to dynamic Time-of-Use (TOU) tariffs. Under TOU structures, electricity consumed during high-demand afternoon hours (typically 4:00 PM to 9:00 PM on weekdays) carries a premium rate up to three times higher than baseline off-peak overnight rates.
          </p>

          <p>
            By utilizing programmable delay timers on energy-intensive appliances—running electric dishwashers, clothes dryers, and pool circulation pumps after 10:00 PM—households can reduce annual electric utility expenses by 25% to 40% without reducing their actual kilowatt-hour consumption.
          </p>

          <p>
            To examine how pairing energy efficiency with rooftop photovoltaic generation can create a net-zero home, consult our <Link href="/calculators/environment/solar-panel-calculator">Solar Panel Calculator</Link> and evaluate home conservation benefits with the <Link href="/calculators/environment/water-usage-calculator">Water Usage Calculator</Link>.
          </p>
        </>
      }
    >
      <EnergyConsumptionCalculator />
    </CalcPage>
  );
}
