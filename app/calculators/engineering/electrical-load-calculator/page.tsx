import type { Metadata } from "next";
import ElectricalLoadCalculator from "@/components/calcs/engineering/electrical-load-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ElectricalDemandLoadBreakdownChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/electrical-load-calculator";
const TITLE = "Electrical Load Calculator — NEC Panel Sizing & Demand Amperage | CalcDigi";
const DESCRIPTION =
  "Calculate residential and commercial electrical service load, total connected wattage, NEC 220 demand factors, continuous EV charger loads, main breaker panel sizing (100A, 200A, 400A), and required copper/aluminum service feeder conductor gauge.";

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
  { href: "/calculators/engineering/pump-calculator", icon: "⚙️", name: "Pump Power & Motor kW Calculator" },
  { href: "/calculators/engineering/signal-to-noise-calculator", icon: "📡", name: "Signal to Noise Ratio (SNR)" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Electrical Demand Percentage" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Ohm's Law & Power Wattage" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Utility Electricity Cost Projections" },
];

const FAQ_ITEMS = [
  {
    q: "How does the National Electrical Code (NEC Article 220) calculate residential demand load?",
    a: "NEC Article 220 Part III mandates calculating general lighting and small appliance branch circuits on an area basis: 3 Volt-Amperes (VA) per square foot of living area, plus two 1,500 VA small appliance branch circuits for the kitchen, plus one 1,500 VA laundry circuit. The first 3,000 VA of this combined general load is counted at 100% demand factor, and the remainder is discounted to 35% demand factor under NEC Table 220.42, recognizing that not every receptacle is energized simultaneously.",
  },
  {
    q: "Why are electric vehicle (EV) chargers calculated at 125% continuous rating?",
    a: "NEC Article 625 defines Level 2 electric vehicle supply equipment (EVSE) as a continuous load because charging sessions routinely run continuously for three hours or longer. Under NEC 210.19 and 210.20, continuous loads must be sized at 125% of their rated amperage to prevent long-term thermal fatigue, breaker nuisance tripping, and busbar overheating. For example, a 48-Amp Level 2 EV charger requires a dedicated 60-Amp circuit breaker (48 A * 1.25 = 60 A) and appropriately sized 6 AWG copper wire.",
  },
  {
    q: "When is a 200-Amp electrical service panel required instead of a 100-Amp panel?",
    a: "A 100-Amp panel provides 24,000 VA (at 240V split-phase), which is adequate only for modest homes with natural gas heating, gas cooking, and no EV charging. When modern homes add central air conditioning (30-40A), an electric heat pump, an electric water heater (4,500W / 18.75A), induction cooktop, and a Level 2 EV charger (40-60A), total demand load quickly exceeds 120 Amps. Under NEC calculations, any home exceeding 24 kVA net calculated demand legally requires upgrading to a 200-Amp (48 kVA) service panel.",
  },
  {
    q: "What is the difference between single-phase (120/240V) and three-phase (120/208V, 277/480V) power?",
    a: "Residential North American services use 120/240V split-phase power derived from a center-tapped transformer, where 120V serves general lighting/outlets and 240V powers heavy appliances (I = P / 240V). Commercial and industrial facilities utilize three-phase alternating current with voltages separated by 120-degree phase angles. Three-phase current formula includes a square root of 3 factor: I = P / (sqrt(3) * V_LL * Power_Factor), delivering 73% more power over smaller conductor cross-sections with zero pulsating torque in motors.",
  },
  {
    q: "What size wire gauge (AWG) is required for a 200-Amp residential service entrance?",
    a: "Under NEC Table 310.12 (Dwelling Unit Service Feeder Conductor Sizing), a 200-Amp residential service panel requires 2/0 AWG copper conductors (with 75°C insulation ratings like THHN/THWN) or 4/0 AWG aluminum conductors. For a 100-Amp service, 4 AWG copper or 2 AWG aluminum is standard.",
  },
  {
    q: "What is the difference between connected load and calculated demand load?",
    a: "Connected load is the raw mathematical sum of nameplate wattage for every light fixture, motor, and receptacle installed in a building. Calculated demand load is the statistically realistic maximum coincident load expected to operate simultaneously, calculated by applying NEC diversity demand factors. Sizing main electrical gear to 100% of connected load would lead to vastly oversized, uneconomic service switchgear and utility transformers.",
  },
];

export default function ElectricalLoadPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Electrical Load Calculator"
      intro="Calculate residential and commercial electrical service load, total connected wattage, NEC 220 demand factors, continuous EV charger loads, main breaker panel sizing (100A, 200A, 400A), and required copper/aluminum service feeder conductor gauge."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-500/30">
                <svg className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                NFPA 70 &amp; IEEE Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">National Electrical Code (NEC Article 220) &amp; IEEE 141 Red Book</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Power Distribution Systems</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Electrical Service Panels Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Under <strong>NEC Article 220</strong>, residential electrical load is sized by summing general lighting (3 VA/sq ft), small appliances (4,500 VA), HVAC heating/cooling, and heavy dedicated loads. General loads receive diversity discounts: <strong>100% on the first 3,000 VA, and 35% on remaining wattage</strong>. Continuous loads such as Level 2 EV chargers must be factored at <strong>125%</strong>. Total calculated amperage dictates service panel selection: <strong>Amps = Demand VA / 240V</strong>. Standard panels are <strong>100A, 200A, and 400A</strong>. For sizing heavy electrical HVAC chiller compressors, consult our <a href="/calculators/engineering/hvac-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">HVAC load calculator</a>, evaluate motor pump kW draws with our <a href="/calculators/engineering/pump-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pump calculator</a>, or calculate electrical demand percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
            </p>
          </div>

          <h2>Residential &amp; Commercial Demand Load Breakdown</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <ElectricalDemandLoadBreakdownChart />
          </div>

          <p>
            Proper electrical load calculations are paramount for building safety, code compliance, fire prevention, and energy efficiency. Underestimating electrical demand leads to catastrophic breaker tripping, overheated busbars, and hazardous conductor insulation breakdown. Conversely, overestimating loads leads to massively bloated utility transformer fees, expensive switchgear over-procurement, and unwieldy heavy copper conductor pulls.
          </p>
          <p>
            The National Electrical Code (NEC / NFPA 70) provides rigorous, legally binding calculation frameworks that distinguish between connected nameplate wattage and diversified coincident peak demand. By applying proven diversity demand factors, engineers simulate real-world human appliance usage patterns. For telecom and signal distribution, analyze noise thresholds using our <a href="/calculators/engineering/signal-to-noise-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">signal to noise calculator</a>, and forecast long-term utility electrical consumption costs with our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard NEC Residential Demand &amp; Amperage Formulas</div>
            General_VA = (Area_sqft * 3 VA/sqft) + (Kitchen_Circuits * 1500 VA) + (Laundry_Circuit * 1500 VA)
            <br />
            Diversified_General_VA = 3000 VA + ((General_VA - 3000 VA) * 0.35)
            <br />
            Continuous_EV_VA = EV_Amps * 240V * 1.25
            <br />
            Total_Demand_VA = Diversified_General_VA + Max(AC_VA, Heat_VA) + WaterHeater_VA + Dryer_VA + Cooking_VA + Continuous_EV_VA
            <br />
            Amps_Single_Phase = Total_Demand_VA / 240V
            <br />
            Amps_Three_Phase = Total_Demand_VA / (1.732 * V_LL * Power_Factor)
          </Formula>

          <h2>Standard Panel Sizes and Service Feeder Conductor Gauges</h2>
          <p>
            Once total net demand amperage is calculated, electrical engineers select standard NEMA rated service equipment. NEC Table 310.12 mandates the minimum cross-sectional wire gauge for copper and aluminum service entrance conductors.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Standard Electrical Service Panel Sizes, Feeder Gauges &amp; Maximum Capacity</p>
          <DataTable
            head={["Panel Rating (Amps)", "System Voltage", "Max Demand Capacity (kVA)", "Copper Feeder (75°C)", "Aluminum Feeder (75°C)"]}
            rows={[
              ["100 Amps", "120/240V 1-Phase", "24.0 kVA", "#4 AWG Copper", "#2 AWG Aluminum"],
              ["125 Amps", "120/240V 1-Phase", "30.0 kVA", "#2 AWG Copper", "#1/0 AWG Aluminum"],
              ["150 Amps", "120/240V 1-Phase", "36.0 kVA", "#1 AWG Copper", "#2/0 AWG Aluminum"],
              ["200 Amps", "120/240V 1-Phase", "48.0 kVA", "#2/0 AWG Copper", "#4/0 AWG Aluminum"],
              ["400 Amps", "120/240V 1-Phase", "96.0 kVA", "Two parallel runs of 3/0 Cu", "Two parallel runs of 250 kcmil Al"],
              ["600 Amps (Commercial)", "120/208V 3-Phase", "216.0 kVA", "Two parallel runs of 350 kcmil Cu", "Two parallel runs of 500 kcmil Al"],
            ]}
          />

          <h2>Continuous Loads vs. Non-Continuous Loads</h2>
          <p>
            Under NEC Section 210.20, a continuous load is defined as any operational load where the maximum current is sustained for 3 hours or more. Continuous loads—most notably electric vehicle charging stations, commercial lighting banks, and continuous exhaust ventilation fans—must be calculated at 125% of their continuous rating. Failure to apply this 1.25 multiplier leads to steady thermal accumulation in circuit breaker bi-metallic strips, resulting in nuisance breaker trips even when operating within nominal rating.
          </p>

          <h2>Voltage Drop Calculations and Feeder Length Limits (NEC 210.19)</h2>
          <p>
            While the National Electrical Code sets minimum wire gauges to prevent conductor insulation meltdown (ampacity sizing), long conductor runs introduce resistive voltage drop that degrades electrical equipment efficiency. Under <strong>NEC Section 210.19(A) Informational Note 4</strong>, total voltage drop must not exceed <strong>3% on branch circuits</strong> or <strong>5% across combined feeder and branch circuits</strong>.
          </p>
          <p>
            For a single-phase 120/240V circuit carrying current <em>I</em> over one-way distance <em>L</em> (feet), voltage drop is calculated as: <code>V_drop = (2 · K · I · L) / Circular_Mils</code>, where <em>K</em> is conductor resistivity (12.9 ohms-cmil/ft for copper, 21.2 for aluminum). If voltage drops by more than 5%, electric motors draw increased amperage to maintain mechanical output, triggering overload relays and causing LED luminaires to visibly flicker.
          </p>

          <h2>Power Factor and Non-Linear Harmonic Loads</h2>
          <p>
            In modern commercial facilities dominated by non-linear electronics—such as computer server racks, variable frequency drives (VFD), and LED electronic drivers—current waveforms become distorted, creating high <strong>Total Harmonic Distortion (THD)</strong>.
          </p>
          <p>
            Triplen harmonics (specifically the 3rd harmonic at 180 Hz and 9th at 540 Hz) do not cancel out in the neutral conductor of a three-phase 4-wire system; instead, they add together arithmetically. In high-density office buildings, neutral current can exceed 170% of phase current, causing severe transformer overheating. Electrical engineers resolve this by specifying 200% rated oversized neutral conductors and <strong>K-rated isolation transformers</strong> (e.g., K-13 or K-20) capable of dissipating high eddy current losses.
          </p>

          <h2>Short-Circuit Current Ratings (SCCR) and Arc Flash Safety</h2>
          <p>
            Service panel sizing must also account for <strong>Available Fault Current</strong> supplied by the utility substation transformer. Every circuit breaker has an <strong>Ampere Interrupting Capacity (AIC)</strong> rating—the maximum short-circuit fault current it can safely quench without violently rupturing. Standard residential panels provide 10,000 AIC (10 kA), whereas commercial service switchboards require 22,000 to 65,000 AIC ratings. Under <strong>NFPA 70E standards</strong>, calculating available bolted fault current determines incident arc-flash energy boundaries and required personal protective equipment (PPE).
          </p>
        </>
      }
    >
      <ElectricalLoadCalculator />
    </CalcPage>
  );
}
