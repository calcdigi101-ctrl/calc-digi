import type { Metadata } from "next";
import VideoGameHoursCalculator from "@/components/calcs/entertainment/video-game-hours-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VideoGameCostPerHourValueChart } from "@/components/flagship/entertainment/editorial-charts";

const PATH = "/calculators/entertainment/video-game-hours-calculator";
const TITLE = "Video Game Backlog & Cost-Per-Hour Value Calculator | CalcDigi";
const DESCRIPTION =
  "Calculate how long it takes to clear your video game backlog queue and determine the cost per hour of entertainment value across Main Story, Side Quests, and 100% Completionist playthroughs.";

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
  { href: "/calculators/entertainment/gaming-pc-build-calculator", icon: "🖥️", name: "Gaming PC Build Budget Calculator" },
  { href: "/calculators/entertainment/movie-ticket-price-calculator", icon: "🎬", name: "Movie Cinema Outing Cost" },
  { href: "/calculators/entertainment/book-reading-time-calculator", icon: "📚", name: "Book Reading Time Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Backlog Completion Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Cost Per Hour Value Ratio" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Gaming Subscription Multi-Year Cost" },
];

const FAQ_ITEMS = [
  {
    q: "How does the 'Cost-Per-Hour' entertainment metric evaluate video games?",
    a: "The Cost-Per-Hour metric divides the purchase price of a game by the total hours of active enjoyment it delivers: Cost Per Hour = Game Price ÷ Hours Played. A $70 open-world RPG played for 100 hours yields a cost of just $0.70 per hour. In contrast, a 2.5-hour movie theater outing costing $28 yields $11.20 per hour, and a live concert night out averages $40+ per hour, making gaming one of the most cost-efficient interactive entertainment mediums in existence.",
  },
  {
    q: "What is a 'gaming backlog' and why do gamers accumulate one?",
    a: "A gaming backlog refers to a collection of purchased video games that a player owns but has not yet played or completed. Backlogs accumulate due to digital storefront seasonal discount sales (Steam Summer Sale, PlayStation Black Friday), subscription services offering dozens of downloadable titles (Xbox Game Pass, PlayStation Plus), and limited available leisure time.",
  },
  {
    q: "How do game completion times differ between 'Main Story' and '100% Completionist'?",
    a: "According to crowdsourced telemetry from HowLongToBeat: The 'Main Story' critical path focuses strictly on mandatory narrative missions, representing the baseline 1.0× playtime. A 'Main + Extras' playthrough involves exploring side quests, companion story arcs, and optional dungeons, expanding playtime by 1.3× to 1.6×. A '100% Completionist' playthrough (hunting every collectible, achievement, and Platinum Trophy) expands playtime by 2.0× to 3.0×.",
  },
  {
    q: "How many hours of video games does the average gamer play per week?",
    a: "Entertainment Software Association (ESA) industry reports indicate that the average adult gamer plays approximately 8 to 12 hours per week (~1.2 to 1.7 hours per day). Dedicated gamers and university students often play 15 to 25 hours weekly, while busy parents and working professionals typically average 4 to 7 hours per week.",
  },
  {
    q: "How can I realistically conquer a backlog of 20+ unplayed video games?",
    a: "To overcome backlog paralysis: 1) Implement a 'One-In, Two-Out' purchase freeze—do not buy a new release until completing two backlog titles; 2) Stop forcing completionist runs and embrace playing just the core narrative campaign; 3) Abandon games that fail to engage you after 2 to 3 hours without guilt (sunk cost fallacy); and 4) Group your library into short indie games (4–10 hours) and massive epics.",
  },
  {
    q: "Are gaming subscriptions like Xbox Game Pass or PlayStation Plus worth the monthly fee?",
    a: "Yes, for gamers who play at least 2 to 3 new titles every quarter. Xbox Game Pass Ultimate ($19.99/mo) and PlayStation Plus Extra ($14.99/mo) provide instant access to catalogs worth thousands of dollars. If a subscriber plays just three $70 AAA day-one releases per year, the subscription pays for itself while granting access to hundreds of indie gems.",
  },
];

export default function VideoGameHoursPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/entertainment", label: "Entertainment" }}
      title="Video Game Backlog Calculator"
      intro="Calculate how long it takes to clear your video game backlog queue and determine the cost per hour of entertainment value across Main Story, Side Quests, and 100% Completionist playthroughs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-950/40 dark:text-indigo-400 dark:ring-indigo-500/30">
                <svg className="size-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Interactive Entertainment Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Aligned with <strong className="font-semibold text-slate-800 dark:text-slate-200">Entertainment Software Association (ESA) &amp; HowLongToBeat Telemetry</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Gaming Pacing Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Answer: How Video Game Backlogs and Cost-Per-Hour Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Total backlog playtime equals games count multiplied by average hours adjusted for play style: <strong>Total Backlog Hours = Games × (Base Hours × Style Multiplier)</strong>. Timeline to finish is <strong>Weeks = Total Hours ÷ Available Hours/Week</strong>. Entertainment value equals purchase cost divided by hours: <strong>Cost/Hour = Spend ÷ Hours Played</strong>. A <strong>$70 open-world RPG delivering 80 hours</strong> provides an extraordinary <strong>$0.88 per hour of entertainment</strong>, compared to <strong>$11.20/hour for movie theaters</strong> and <strong>$42.50/hour for live concerts</strong>. Size your gaming PC hardware with our <a href="/calculators/entertainment/gaming-pc-build-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gaming PC build calculator</a>, compare cinema outing costs with our <a href="/calculators/entertainment/movie-ticket-price-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">movie ticket price calculator</a>, or calculate book reading times with our <a href="/calculators/entertainment/book-reading-time-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">book reading time calculator</a>.
            </p>
          </div>

          <h2>Entertainment Value: Cost-Per-Hour Across Entertainment Mediums</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <VideoGameCostPerHourValueChart />
          </div>

          <p>
            The video game industry has eclipsed film box office and recorded music combined to become the largest commercial entertainment sector on the planet. From sweeping historical open-world role-playing epics to atmospheric indie puzzle adventures and competitive multiplayer leagues, modern video games offer interactive agency, rich narrative storytelling, and cognitive challenge.
          </p>
          <p>
            However, the sheer volume of games released each year—amplified by digital storefront bundle sales and library subscription passes—has created the ubiquitous modern gamer dilemma: the expanding <em>backlog pile of shame</em>. Calculating your realistic completion velocity and entertainment value per dollar transforms unplayed libraries into clear milestones. To evaluate completion ratios, use our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>, calculate completion percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and forecast multi-year gaming subscription compounding using our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Gaming Backlog &amp; Entertainment Value Formulation</div>
            Effective_Game_Hours = Base_Hours * Play_Style_Multiplier
            <br />
            Total_Backlog_Hours = Backlog_Game_Count * Effective_Game_Hours
            <br />
            Weeks_To_Clear_Backlog = Total_Backlog_Hours / Available_Hours_Per_Week
            <br />
            Months_To_Clear_Backlog = Weeks_To_Clear_Backlog / 4.33
            <br />
            Entertainment_Cost_Per_Hour = Total_Games_Acquisition_Cost / Total_Backlog_Hours
          </Formula>

          <h2>Playstyle Multipliers: Critical Path vs. 100% Completionist</h2>
          <p>
            How a player chooses to experience a game exerts a dramatic influence on completion hours:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Main Story Only (1.0× Multiplier):</strong> The focused critical narrative path. Skips secondary side quests, lore journals, and optional challenge dungeons. Ideal for players with limited weekly gaming time who want to experience major narrative arcs.
            </li>
            <li>
              <strong>Main + Extras (1.4× Multiplier):</strong> The definitive standard playthrough for the majority of gamers. Involves completing the main campaign, notable character side quests, discovering hidden gear, and exploring the world organically.
            </li>
            <li>
              <strong>100% Completionist / Platinum Trophy (2.2× to 3.0× Multiplier):</strong> Tracking down every hidden collectible, conquering ultra-hard optional superbosses, completing New Game Plus cycles, and unlocking all platform trophies or achievements.
            </li>
          </ul>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Video Game Genres, Playstyle Hours &amp; Effective Cost Per Hour (at $70 Price)</p>
          <DataTable
            head={["Gaming Genre & Archetype", "Main Story Hours", "Main + Extras Hours", "100% Completionist", "Cost / Hour (at $70 MSRP)"]}
            rows={[
              ["Linear Cinematic Action (e.g. Uncharted)", "12 - 16 hours", "18 - 22 hours", "30 - 40 hours", "$3.50 - $4.50 / hour"],
              ["Action RPG / Soulslike (e.g. Elden Ring)", "45 - 55 hours", "75 - 95 hours", "120 - 150 hours", "$0.75 - $0.95 / hour"],
              ["Open-World RPG (e.g. Witcher, Bethesda)", "50 - 65 hours", "90 - 120 hours", "180 - 250+ hours", "$0.55 - $0.75 / hour"],
              ["Indie Roguelike / Metroidvania (e.g. Hades)", "20 - 25 hours", "40 - 60 hours", "90 - 120 hours", "$0.35 - $0.50 / hour (at $25)"],
              ["Grand Strategy / 4X (e.g. Civilization)", "N/A (Replayable)", "60 - 100 hours", "300 - 500+ hours", "$0.15 - $0.30 / hour"],
              ["Live Service Multiplayer (e.g. Destiny, Apex)", "Campaign: 15 hrs", "Seasonal: 100+ hrs", "500 - 1000+ hours", "$0.05 - $0.15 / hour"],
            ]}
          />

          <h2>Psychology of the Digital Backlog and the Sunk Cost Fallacy</h2>
          <p>
            Digital gaming backlogs trigger distinct psychological friction:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>The Sunk Cost Fallacy:</strong> Feeling obligated to play through an unengaging or frustrating game simply because you paid $60 for it. Life is too short to play boring games; recognize that the money is already spent whether you force yourself to finish the title or not.
            </li>
            <li>
              <strong>Choice Paralysis:</strong> Staring at a Steam library of 200 installed games for 45 minutes without being able to choose one. Overcome this by uninstalling everything except the SINGLE game you are currently playing.
            </li>
            <li>
              <strong>FOMO (Fear of Missing Out):</strong> Purchasing new releases on launch day to participate in social media conversation, only to leave them sitting unplayed in your queue while their price drops by 50% six months later during holiday sales.
            </li>
          </ul>

          <h2>Price Tracking Tools and Seasonal Sale Optimization</h2>
          <p>
            Smart gamers rarely pay full $70 launch MSRP for backlog titles. Digital storefront price tracking services (such as <em>IsThereAnyDeal</em> for PC gamers, <em>Deku Deals</em> for Nintendo Switch, and <em>PSPrices</em> for PlayStation) track historical price drop trends. Major seasonal events (Steam Summer Sale, Autumn Black Friday, Holiday Winter Sales) reliably discount major AAA releases by 30% to 50% within six months of release. Setting custom price drop alerts ensures you acquire titles only when you are genuinely ready to install and play them immediately.
          </p>

          <h2>Actionable Rules to Defeat Your Gaming Backlog</h2>
          <p>
            Reclaim your gaming joy with these proven rules:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>The Rule of One:</strong> Install and actively play only ONE narrative game at a time. Do not begin another sprawling campaign until rolling credits on the current one.
            </li>
            <li>
              <strong>The 3-Hour Escape Hatch:</strong> If a game has not captivated you after 3 hours of gameplay, uninstall it without remorse. Move on to an experience that sparks genuine excitement.
            </li>
            <li>
              <strong>Interleave Palette Cleansers:</strong> After finishing an epic 80-hour RPG, do not immediately dive into another 100-hour title. Cleanse your gaming palate with a short, polished 4-to-6 hour indie narrative game.
            </li>
          </ol>
        </>
      }
    >
      <VideoGameHoursCalculator />
    </CalcPage>
  );
}
