import type { Metadata } from "next";
import Link from "next/link";
import UvIndexCalculatorComponent from "@/components/calcs/weather/uv-index-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DiurnalUvIndexSunAngleExposureChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/uv-index-calculator";
const TITLE = "UV Index Calculator | Solar Ultraviolet Radiation & Burn Time";
const DESCRIPTION =
  "Calculate solar UV index, Fitzpatrick skin phototype burn time in minutes, minimum erythemal dose (MED), altitude amplification, and SPF sunscreen requirements.";

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
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
  { href: "/calculators/weather/dew-point-calculator", icon: "🌡️", name: "Dew Point Calculator" },
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/environment/solar-panel-calculator", icon: "🔋", name: "Solar Panel Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "Can you get sunburned on a cool or cloudy day?",
    a: "Yes. Ambient temperature has zero correlation with ultraviolet radiation strength. You can sustain severe sunburn in 45°F (7°C) weather if the UV Index is high. Furthermore, thin cirrus and fair-weather clouds allow up to 80% of solar UV radiation to penetrate directly to the surface.",
  },
  {
    q: "What is the difference between UVA and UVB radiation?",
    a: "UVB (280 to 315 nm) comprises about 5% of terrestrial ultraviolet rays; it possesses high photon energy, damages cellular DNA in the epidermis, triggers Vitamin D synthesis, and is the primary cause of sunburn. UVA (315 to 400 nm) comprises 95% of ground UV; it penetrates deeply into the dermal layers, degrades collagen and elastin fibers (causing skin aging and wrinkles), and generates harmful free radicals.",
  },
  {
    q: "Does a higher SPF sunscreen allow you to stay in the sun twice as long?",
    a: "In clinical theory, an SPF 30 sunscreen filters out 96.7% of UVB photons, allowing a user to stay in the sun 30 times longer than unprotected skin. An SPF 50 filters out 98.0%. However, because sunscreen rubs off, breaks down under perspiration, and is rarely applied at the clinical laboratory density (2 mg/cm²), dermatologists advise reapplying every 2 hours regardless of SPF rating.",
  },
  {
    q: "What was the highest UV Index ever recorded on Earth?",
    a: "The world record UV Index was measured at 43.3 atop the Licancabur volcano in the Bolivian Andes (altitude 19,400 feet) on December 29, 2003. In populated tropical areas, solar noon summer UV Index readings regularly reach 12 to 14, which falls into the Extreme Danger category.",
  },
];

export default function UvIndexCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/weather", label: "Weather & Nature" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Photobiological Quick Summary:</strong> The Global Solar UV Index is an international standard measurement of human skin-damaging ultraviolet radiation developed by the World Health Organization (WHO) and World Meteorological Organization (WMO). The scale integrates ground-level spectral irradiance weighted by the CIE Erythema Action Spectrum (which quantifies skin redness and sunburn potential). For fair-skinned individuals (Fitzpatrick Skin Type I and II), unprotected exposure during peak midday summer hours (UV Index 9 to 11) produces painful erythemal burns in under 15 to 20 minutes. Correlating solar UV exposure with ambient heat stress evaluated in our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">heat index calculator</Link> establishes essential outdoor protective schedules.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Diurnal Solar UV Radiation Intensity Curves Across Seasonal Cycles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ground-level UV radiation is dictated primarily by the solar zenith angle—the angle between the sun and the vertical overhead sky. When the sun is high in the sky at solar noon, solar rays traverse the thinnest slice of Earth's protective stratospheric ozone layer. In contrast, during early morning and late afternoon hours, the oblique solar path through the atmosphere increases optical air mass, scattering and absorbing virtually all sunburn-inducing UVB rays. Homeowners and facility operators can compare solar radiation trends with residential energy generation using our <Link href="/calculators/environment/solar-panel-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">solar panel calculator</Link>.
          </p>

          <DiurnalUvIndexSunAngleExposureChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The diurnal chart above illustrates hourly UV Index progressions at 38° North latitude comparing the Summer Solstice (June peak 10.4), Spring Equinox (March peak 6.8), and Winter Solstice (December peak 3.1). More than 60% of daily erythemal UV radiation is delivered during the four-hour window between 11:00 AM and 3:00 PM. Notice that during midwinter, the maximum UV index barely reaches 3.0, allowing extended outdoor exposure without sunburn risk. In contrast, during summer, even morning hours at 10:00 AM exhibit a high UV Index of 5.6. In winter alpine snow environments evaluated in our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">snowfall calculator</Link>, intense ground reflection can elevate winter UV exposure back into dangerous tiers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Erythemal Dose & Phototype Burn Times
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The standardized UV Index (<Formula>{"\text{UVI}"}</Formula>) is calculated by integrating ground spectral irradiance <Formula>{"E(\lambda)"}</Formula> weighted by the McKinley-Diffey CIE erythema action spectrum <Formula>{"s_{er}(\lambda)"}</Formula> across the 290 nm to 400 nm waveband:
          </p>

          <Formula>
            {"\text{UVI} = 40 \times \int_{290\text{ nm}}^{400\text{ nm}} E(\lambda) \cdot s_{er}(\lambda) \, d\lambda"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where the multiplication factor of 40 scales the biologically effective irradiance (in <Formula>{"\text{W/m}^2"}</Formula>) to a convenient dimensionless index where 1 UVI unit equals <Formula>{"25\text{ mW/m}^2"}</Formula>.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Local ground-level Effective UV Index (<Formula>{"\text{UVI}_{eff}"}</Formula>) adjusts baseline atmospheric UV for elevation above sea level (<Formula>{"H_{alt}"}</Formula> in thousands of feet) and surface albedo reflection (<Formula>{"A_{surf}"}</Formula>):
          </p>

          <Formula>
            {"\text{UVI}_{eff} = \text{UVI}_{base} \times \left( 1 + 0.04 \cdot \frac{H_{alt}}{1000} \right) \times \left( 1 + A_{surf} \right)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The Safe Exposure Time to Sunburn (<Formula>{"T_{burn}"}</Formula> in minutes) without topical sunscreen is derived from the Minimal Erythemal Dose (<Formula>{"\text{MED}"}</Formula>) corresponding to the individual's genetic Fitzpatrick skin phototype:
          </p>

          <Formula>
            {"T_{burn} = \frac{\text{Base Minutes at UVI 10} \times 10}{\text{UVI}_{eff}}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Athletes training outdoors during extreme summer conditions can evaluate convective hydration demands in our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link> and monitor atmospheric vapor pressure in our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">humidity calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Fitzpatrick Skin Phototypes & Minimal Erythemal Dose (MED) Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below establishes the clinical dermatological Fitzpatrick skin phototyping scale alongside sunburn latency thresholds at a typical summer UV Index of 8.0:
          </p>

          <DataTable
            head={["Skin Phototype", "Constitutive Skin Pigmentation", "Sun Sensitivity & Tanning Reaction", "Minimal Erythemal Dose (MED)", "Unprotected Burn Time @ UV 8", "Recommended Sunscreen Protection"]}
            rows={[
              ["Type I", "Very pale, ivory white; red/blond hair, freckles", "Always burns severely; never tans", "200 J/m² (Most sensitive)", "12 to 15 minutes", "SPF 50+ Broad Spectrum; UV clothing"],
              ["Type II", "Fair white skin; blue/hazel eyes, blond/brown hair", "Burns easily; tans minimally and with difficulty", "250 J/m²", "15 to 20 minutes", "SPF 50+ Broad Spectrum; wide hat"],
              ["Type III", "Medium white to light olive; dark hair and eyes", "Burns moderately; tans gradually to light brown", "350 J/m²", "25 to 30 minutes", "SPF 30 to 50 Broad Spectrum"],
              ["Type IV", "Olive / Mediterranean / Hispanic / Asian tone", "Burns minimally; tans easily and deeply", "450 J/m²", "35 to 45 minutes", "SPF 30 Broad Spectrum"],
              ["Type V", "Dark brown / Middle Eastern / Indian skin", "Rarely burns; tans profusely and quickly", "600 J/m²", "50 to 65 minutes", "SPF 15 to 30 Broad Spectrum"],
              ["Type VI", "Deeply pigmented dark brown / African skin", "Never burns; deeply pigmented natural melanin", "1,000 J/m² (Highest protection)", "75 to 90+ minutes", "SPF 15+ (Focus on ocular UV protection)"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The data demonstrates that individuals with Fitzpatrick Type I skin can sustain acute cellular DNA damage leading to erythema in just 12 minutes during peak summer sunlight. Melanin pigment in Type V and VI skin absorbs and scatters photon energy, providing a natural biological sun protection factor of approximately SPF 13. However, regardless of skin phototype, ocular tissues remain vulnerable to UV damage (cataracts and photokeratitis), requiring 99% to 100% UV400 rated sunglasses. In cold weather with high wind chill modeled in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>, cold wind masking solar heat leads to deceptively severe sunburns.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Environmental Amplification: Elevation, Surface Albedo & Cloud Scatter
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Several geographical and meteorological factors dramatically modulate the ground-level ultraviolet dose:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Elevational Altitude Gradient (+4% per 1,000 ft):</strong> Because air density and ozone column mass decrease with height, UV Index increases by approximately 10% to 12% per 1,000 meters (approx. 4% per 1,000 feet). A sea-level UV Index of 8.0 surges to over 11.2 at a mountain ski resort at 10,000 feet elevation.
            </li>
            <li>
              <strong>Surface Albedo Reflection:</strong> While green grass reflects only 2% to 4% of UV rays, dry beach sand reflects 15% to 20%, open water reflects 8% to 10%, and fresh winter snow reflects up to 80% to 90%. Snow reflection exposes the underside of the nose, chin, and eyelids to intense reflected radiation.
            </li>
            <li>
              <strong>Broken Cloud Optical Enhancements:</strong> While dense overcast storm clouds reduce UV by 70% to 90%, broken cumulus clouds (scattered fair-weather clouds) can act as focal lenses. Forward-scattering from cloud edges can temporarily amplify ground UV radiation by 10% to 25% above clear-sky baselines.
            </li>
            <li>
              <strong>Vitamin D Synthesis Optimization:</strong> Vitamin D3 synthesis in the skin requires UVB photons (290 to 315 nm). Because the synthesis pathway saturates at roughly one-third of the Minimal Erythemal Dose, spending 10 to 15 minutes in summer sun with arms and legs exposed maximizes Vitamin D production without inducing DNA damage.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Stratospheric Ozone Column Dynamics & Polar Ocular Photokeratitis
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Total atmospheric ozone is quantified in Dobson Units (DU), where 1 DU represents a theoretical 0.01-millimeter thickness of pure ozone gas at standard temperature and pressure. The global average ozone layer thickness is approximately 300 DU (a 3-millimeter shield). Seasonal thinning of the stratospheric ozone layer—most famously manifested in Antarctic and Arctic polar ozone depletion holes—allows shortwave solar UVB photons to penetrate unimpeded to ground level, elevating the baseline UV Index by 15% to 35% during springtime polar inversions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In snowbound alpine and high-latitude environments, unprotected eyes face acute photokeratitis, colloquially known as "snow blindness." The superficial corneal epithelium absorbs reflected UVB rays from snow surfaces, causing cellular apoptosis and corneal desquamation that manifests hours later as excruciating ocular pain, foreign body sensation, and temporary blindness. Outdoor winter recreationists should always pair UV eye protection with temperature checks in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link> and monitor atmospheric condensation in our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Furthermore, drivers operating convertibles or commercial transport vehicles across long distances modeled in our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link> must recognize that while automotive laminated glass windshields block virtually 96% to 99% of UVA and UVB rays, standard non-laminated tempered side window glass permits over 60% of aging UVA radiation to pass directly through, causing unilateral left-sided facial photodamage in frequent drivers. Applying clear ceramic UV-blocking window films to vehicle side windows blocks 99% of harmful UVA wavelengths, safeguarding daily commuters from cumulative long-term dermal photoaging and skin cancer hazards. Routine annual dermatological skin screenings complement daily sun protection, catching early melanomas before invasive metastasis occurs.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            CIE Erythema Action Spectrum Weighting & Solar Zenith Trigonometry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The International Commission on Illumination (CIE) standardized erythema action spectrum quantifies how individual wavelengths of solar light trigger epidermal inflammation. Between 298 nm and 328 nm, biological erythemal effectiveness plummets by more than three orders of magnitude (1,000-fold reduction). Consequently, solar UV Index is exceptionally sensitive to solar zenith angle (<Formula>{'\theta_z'}</Formula>), which is determined by latitude, calendar day of the year, and local solar hour angle: <Formula>{'\cos(\theta_z) = \sin(\phi) \sin(\delta) + \cos(\phi) \cos(\delta) \cos(\omega)'}</Formula>. When the sun drops below 45 degrees elevation from the horizon, the extended optical atmospheric air mass absorbs virtually all UVB radiation, reducing the UV Index below 3.0 and eliminating sunburn hazards for most skin types.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Photocarcinogenesis, DNA Thymine Dimerization & Spectral Sunscreen Efficacy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the molecular biophysical level, solar UV radiation damages human epidermal cells through distinct photochemical mechanisms. UVB photons (280-315 nm) possess sufficient quantum energy to be absorbed directly by native DNA molecules, inducing covalent cross-linking between adjacent pyrimidine bases to form cyclobutane pyrimidine dimers (CPDs) and 6-4 photoproducts. If cellular nucleotide excision repair mechanisms fail to excise these lesions prior to DNA replication, signature C-to-T transition mutations arise, predisposing melanocytes and keratinocytes to malignant melanoma, basal cell carcinoma, and squamous cell carcinoma.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conversely, UVA radiation (315-400 nm) penetrates deeper into the dermal matrix, generating reactive oxygen species (ROS) that oxidize lipid membranes, degrade structural collagen fibers, and induce premature photoaging. Dermatologists and the FDA recommend broad-spectrum mineral sunscreens containing micronized zinc oxide or photostable chemical filters, applied at a standard laboratory density of 2.0 mg/cm&sup2; of exposed skin every two hours, providing balanced photoprotection across both the UVA and UVB action spectra.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ophthalmologists emphasize that ocular UV exposure poses cumulative risks analogous to cutaneous damage. Ultraviolet radiation absorbed by the crystalline lens and cornea accelerates nuclear cataractogenesis and promotes pterygium development, necessitating UV400-rated sunglasses that absorb 99% to 100% of UVA and UVB radiation across all daytime solar zenith angles.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In aquatic recreation and alpine mountaineering, high-albedo reflective surfaces dramatically augment effective UV dose rates. Fresh clean snow reflects up to 80% of ambient solar UV radiation, while white foamy ocean surf and sea spray reflect approximately 25%, effectively doubling exposure to facial skin and unprotected eyes.
          </p>

        </>
      }
    >
      <UvIndexCalculatorComponent />
    </CalcPage>
  );
}
