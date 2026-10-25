import type { Metadata } from "next";
import GamingPcBuildCalculator from "@/components/calcs/entertainment/gaming-pc-build-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GamingPcComponentBudgetDistributionChart } from "@/components/flagship/entertainment/editorial-charts";

const PATH = "/calculators/entertainment/gaming-pc-build-calculator";
const TITLE = "Gaming PC Build Budget Calculator — Component Balance & PSU Wattage | CalcDigi";
const DESCRIPTION =
  "Calculate optimal component budget allocation, power supply (PSU) wattage requirements, and target resolution performance (1080p, 1440p, 4K) across GPU, CPU, RAM, NVMe SSD, and motherboard for custom gaming PC builds.";

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
  { href: "/calculators/entertainment/video-game-hours-calculator", icon: "🎮", name: "Video Game Backlog & Value" },
  { href: "/calculators/engineering/electrical-load-calculator", icon: "⚡", name: "Electrical Power & Breaker Sizing" },
  { href: "/calculators/physics/speed-calculator", icon: "🚀", name: "Hardware Clock Speed & Bandwidth" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Component Budget Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "GPU to CPU Price Ratio" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "PC Hardware Depreciation & Upgrade ROI" },
];

const FAQ_ITEMS = [
  {
    q: "What percentage of a gaming PC budget should be spent on the graphics card (GPU)?",
    a: "Hardware engineering benchmarks universally recommend allocating between 35% and 45% of your total PC budget directly to the graphics card (GPU). Because the GPU is the primary component rendering 3D polygons, pixel shaders, texture mapping, and ray-tracing lighting effects, spending less than 35% on the GPU typically results in an underpowered gaming experience, while spending over 50% often forces harmful compromises on power supply reliability, motherboard VRMs, and cooling.",
  },
  {
    q: "How much PSU wattage headroom is recommended for modern gaming PCs?",
    a: "Hardware engineers recommend choosing a Power Supply Unit (PSU) rated for at least 1.30× to 1.40× (30% to 40% headroom) over your system's estimated continuous full-load power draw. Modern graphics cards (such as Nvidia GeForce RTX 4080/4090 and AMD Radeon RX 7900 XTX) generate microsecond transient power spikes that can exceed continuous TDP ratings by 1.8× to 2.2×. Adequate headroom prevents instantaneous over-current protection (OCP) shutdowns during heavy gaming sessions.",
  },
  {
    q: "What is a CPU/GPU bottleneck and how can it be avoided?",
    a: "A hardware bottleneck occurs when one component operates at 100% capacity while waiting for a slower component, capping overall system frame rates. A CPU bottleneck happens when a weak processor cannot prepare game draw calls fast enough for a high-end GPU (frequent in 1080p competitive esports). A GPU bottleneck occurs when the graphics card is fully saturated rendering pixels at high resolutions (1440p or 4K), which is the ideal operational state for AAA visual fidelity games.",
  },
  {
    q: "Is 16GB of RAM still sufficient for PC gaming in 2026, or is 32GB required?",
    a: "While 16GB DDR4/DDR5 remains the absolute minimum floor for older titles, 32GB dual-channel RAM (2×16GB) has become the gold standard for modern gaming. Recent titles (such as Hogwarts Legacy, Cyberpunk 2077, and Starfield) routinely allocate 18GB to 22GB of system memory when running with background applications like Discord, browser tabs, and OBS streaming tools open simultaneously.",
  },
  {
    q: "What is the performance difference between 1080p, 1440p, and 4K gaming?",
    a: "Pixel density dictates graphics rendering workloads: 1080p (Full HD) renders roughly 2.07 million pixels per frame; 1440p (Quad HD) renders 3.69 million pixels (78% more pixels); and 4K (Ultra HD) renders 8.29 million pixels (400% more pixels than 1080p). Consequently, 1440p has become the consumer sweet spot, offering sharp visual clarity and high refresh rates (144–240 Hz) without requiring expensive flagship GPUs.",
  },
  {
    q: "How long does a custom gaming PC build remain relevant before needing upgrades?",
    a: "A well-balanced mid-tier gaming PC ($1,200 to $1,600) typically remains capable of playing modern AAA titles at high settings for 4 to 6 years. Thanks to modern upscaling technologies like DLSS, FSR, and Frame Generation, gaming hardware maintains acceptable performance much longer today than during the rapid architectural transitions of the early 2000s.",
  },
];

export default function GamingPcBuildPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/entertainment", label: "Entertainment" }}
      title="Gaming PC Build Calculator"
      intro="Calculate optimal component budget allocation, power supply (PSU) wattage requirements, and target resolution performance (1080p, 1440p, 4K) across GPU, CPU, RAM, NVMe SSD, and motherboard for custom gaming PC builds."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-400 dark:ring-cyan-500/30">
                <svg className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                PC Hardware Engineering Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ATX 3.0 / PCIe 5.0 Power Specifications &amp; Hardware Unboxed Benchmarks</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Custom Hardware Design</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Answer: How to Budget and Size Power for a Gaming PC
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              For a balanced gaming PC, allocate <strong>35% to 45% of total budget to the Graphics Card (GPU)</strong>, <strong>15% to 20% to the Processor (CPU)</strong>, and the remaining 40% across RAM, NVMe SSD, Motherboard, PSU, and Cooling. To size the Power Supply Unit (PSU), sum component TDP ratings (GPU + CPU + 75W baseline) and multiply by <strong>1.35× safety headroom</strong> to handle microsecond transient power spikes: <strong>PSU Watts = (TDP_gpu + TDP_cpu + 75W) × 1.35</strong>. For a $1,450 sweet-spot build, a 650W–750W 80+ Gold PSU is recommended. Sizing electrical branch circuits for multi-monitor battlestations can be planned with our <a href="/calculators/engineering/electrical-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">electrical load calculator</a>, evaluate gaming backlog hours with our <a href="/calculators/entertainment/video-game-hours-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">video game hours calculator</a>, or calculate component budget percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
            </p>
          </div>

          <h2>Component Budget Distribution Across Gaming Performance Tiers</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <GamingPcComponentBudgetDistributionChart />
          </div>

          <p>
            Assembling a custom gaming PC offers unrivaled gaming performance, modular upgradeability, and personalized aesthetics compared to locked-down gaming consoles. However, first-time builders frequently stumble into common budgeting pitfalls: overspending on high-end motherboards, expensive RGB aesthetic liquid coolers, or flagship multi-core CPUs while skimping on the single component that dictates 85% of gaming performance—the graphics card.
          </p>
          <p>
            An optimized gaming PC functions as a synchronized ecosystem where the GPU renders visual geometry, the CPU processes game physics and artificial intelligence scripts, and fast dual-channel RAM feeds game assets smoothly without micro-stuttering. To calculate GPU-to-CPU expenditure ratios, use our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>, calculate hardware data bus speeds with our <a href="/calculators/physics/speed-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed calculator</a>, and forecast multi-year hardware depreciation using our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard PC Hardware Power &amp; Budget Formulation</div>
            Total_Build_Cost = Cost_GPU + Cost_CPU + Cost_Memory_SSD + Cost_Mobo_PSU + Cost_Case_Cooling
            <br />
            GPU_Budget_Share = (Cost_GPU / Total_Build_Cost) * 100 (Optimal: 35% - 45%)
            <br />
            Continuous_Peak_Watts = TDP_GPU + TDP_CPU + Peripherals_Baseline_75W
            <br />
            Recommended_PSU_Watts = Ceil((Continuous_Peak_Watts * 1.35) / 50) * 50
            <br />
            Transient_Spike_Buffer = Recommended_PSU_Watts - Continuous_Peak_Watts
          </Formula>

          <h2>Performance Tiers: Resolution, Frame Rates &amp; Target Hardware</h2>
          <p>
            When planning a PC build, your display monitor resolution and target refresh rate dictate component requirements:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>1080p Esports Tier ($750 - $950):</strong> Optimized for high-framerate competitive esports titles (Valorant, CS2, Fortnite, Apex Legends) at 144Hz to 240Hz. Prioritizes single-core CPU clock speeds and mid-range GPUs (e.g., RTX 4060 or RX 7600) with a 550W–650W PSU.
            </li>
            <li>
              <strong>1440p High-Refresh Sweet Spot ($1,250 - $1,650):</strong> The definitive sweet spot for modern PC gaming. Delivers 100+ FPS in demanding AAA open-world titles at 2560×1440 resolution. Typically pairs an AMD Ryzen 5 7600 / Intel Core i5 with an RTX 4070 Super or RX 7800 XT and a 750W 80+ Gold power supply.
            </li>
            <li>
              <strong>4K Ultra / Ray Tracing Enthusiast ($2,200 - $3,200+):</strong> Built for uncompromised graphical fidelity on 4K OLED gaming monitors and big-screen displays. Features flagship GPUs (RTX 4080 Super / 4090) capable of path-traced lighting and DLSS 3 frame generation, demanding 850W to 1000W ATX 3.0 power supplies with dedicated 12VHPWR native power connectors.
            </li>
          </ul>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">PC Hardware Component Allocation Benchmarks by Budget Tier</p>
          <DataTable
            head={["Budget Classification", "Target Resolution & FPS", "GPU Budget Share", "CPU Budget Share", "Recommended PSU", "Typical Lifespan"]}
            rows={[
              ["Entry Level ($600 - $800)", "1080p 60 - 120 FPS High", "$240 - $320 (38%)", "$110 - $140 (18%)", "550W 80+ Bronze", "3 - 4 years"],
              ["Mid-Range Sweet Spot ($1,200 - $1,500)", "1440p 100 - 165 FPS Ultra", "$500 - $620 (41%)", "$220 - $270 (18%)", "750W 80+ Gold", "4 - 5 years"],
              ["High-End Performance ($1,800 - $2,300)", "1440p/4K 144+ FPS Max", "$750 - $950 (42%)", "$320 - $400 (17%)", "850W 80+ Gold (ATX 3.0)", "5 - 6 years"],
              ["Enthusiast Flagship ($2,500 - $3,500+)", "4K 120+ FPS Ray Tracing", "$1,100 - $1,600 (45%)", "$420 - $550 (16%)", "1000W 80+ Platinum", "6+ years"],
            ]}
          />

          <h2>Power Supply Sizing and ATX 3.0 Transient Management</h2>
          <p>
            The Power Supply Unit (PSU) is the heart of your gaming PC, responsible for rectifying 120V/240V AC mains wall power into steady, ripple-free +12V, +5V, and +3.3V DC rails. Installing an undersized or low-quality power supply risks catastrophic hardware destruction if over-voltage or short-circuit protection circuits fail.
          </p>
          <p>
            Modern graphics architectures generate transient power spikes that last between 1 and 20 milliseconds, drawing up to twice their rated thermal design power (TDP). The new <strong>ATX 3.0 / PCIe 5.0 standard</strong> requires certified power supplies to withstand transient excursions of up to 200% of their rated wattage for 100 microseconds. Ensuring your PSU carries at least an <strong>80+ Gold efficiency rating</strong> and includes 30% to 40% headroom guarantees cool, silent operation and protects sensitive silicon from voltage instability.
          </p>

          <h2>Thermal Management and Airflow Optimization</h2>
          <p>
            Silicon semiconductors generate heat in direct proportion to electrical wattage consumed. Maintaining GPU core temperatures below 75°C and CPU temperatures below 85°C prevents thermal throttling (where clock frequencies are automatically lowered to protect the chip from degradation).
          </p>
          <p>
            Engineers achieve optimal thermal equilibrium by selecting PC cases with open front mesh panels and configuring case fans for <strong>slight positive air pressure</strong> (having slightly more intake CFM airflow than exhaust CFM). Positive pressure forces filtered air outward through unsealed chassis gaps, preventing ambient household dust from accumulating on heat sink fins.
          </p>
        </>
      }
    >
      <GamingPcBuildCalculator />
    </CalcPage>
  );
}
