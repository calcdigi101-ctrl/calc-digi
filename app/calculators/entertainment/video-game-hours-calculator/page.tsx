import type { Metadata } from "next";
import VideoGameHoursCalculator from "@/components/calcs/entertainment/video-game-hours-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VideoGameCostPerHourValueChart } from "@/components/flagship/entertainment/editorial-charts";

const PATH = "/calculators/entertainment/video-game-hours-calculator";
const CANONICAL_URL = "https://www.calcdigi.com/calculators/entertainment/video-game-hours-calculator";
const TITLE = "Video Game Backlog & Hours Calculator (Time to Beat)";
const FULL_TITLE = "Video Game Hours & Backlog Calculator – Time to Beat | CalcDigi";
const DESCRIPTION =
  "Calculate total gaming hours, time to beat your backlog, and cost-per-hour of entertainment across Main Story and 100% Completionist playthroughs.";
const INTRO =
  "Calculate how long it takes to clear your video game backlog queue and determine the cost per hour of entertainment value across Main Story, Side Quests, and 100% Completionist playthroughs.";

export const metadata: Metadata = {
  title: { absolute: FULL_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: FULL_TITLE,
    description: DESCRIPTION,
    type: "website",
    url: CANONICAL_URL,
    siteName: "CalcDigi",
    images: [
      {
        url: "https://www.calcdigi.com/og/video-game-hours-calculator.png",
        width: 1200,
        height: 630,
        alt: "Video Game Hours and Backlog Calculator by CalcDigi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: DESCRIPTION,
    images: ["https://www.calcdigi.com/og/video-game-hours-calculator.png"],
    creator: "@CalcDigi",
    site: "@CalcDigi",
  },
};

const RELATED_CALCULATORS = [
  { href: "https://www.calcdigi.com/calculators/entertainment/movie-ticket-price-calculator", icon: "🎬", name: "Movie Ticket Price Calculator" },
  { href: "https://www.calcdigi.com/calculators/entertainment/streaming-cost-calculator", icon: "📺", name: "Streaming Cost Calculator" },
  { href: "https://www.calcdigi.com/calculators/entertainment/gaming-pc-build-calculator", icon: "🎮", name: "Gaming PC Build Calculator" },
  { href: "https://www.calcdigi.com/calculators/entertainment/book-reading-time-calculator", icon: "📚", name: "Book Reading Time Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How do you calculate cost per hour for video games?",
    a: "Divide the total purchase price of the game by the total hours spent playing: Cost Per Hour = Game Price ÷ Total Hours Played. For example, a $70 game played for 100 hours costs just $0.70 per hour.",
  },
  {
    q: "What is the difference between Main Story and 100% Completionist playtime?",
    a: "Main Story (1.0× baseline) covers only the mandatory critical narrative path. Main + Extras (1.3× to 1.6×) includes side quests and exploration. 100% Completionist (2.0× to 3.0×) requires unlocking every achievement, secret, and collectible.",
  },
  {
    q: "How many hours of video games does the average person play per week?",
    a: "According to the Entertainment Software Association (ESA), the average adult gamer plays approximately 8 to 12 hours per week (~1.2 to 1.7 hours daily). Core gamers frequently log 15 to 25 hours weekly.",
  },
  {
    q: "How can I realistically clear a backlog of 20+ unplayed games?",
    a: "Follow the 'One-In, Two-Out' rule: don't buy a new game until completing two backlog titles. Avoid forcing 100% completion on every game, and abandon titles that fail to engage you after 2–3 hours without guilt.",
  },
  {
    q: "Are subscription services like Xbox Game Pass or PlayStation Plus worth it?",
    a: "Yes, if you play at least 3 new $70 releases per year. At $15–$20 per month, playing 3–4 full games annually fully covers the subscription while giving access to hundreds of catalog titles.",
  },
  {
    q: "How long does it take to beat the average video game?",
    a: "The average narrative video game takes 15 to 30 hours for the main story. Large open-world RPGs (such as Skyrim or Baldur's Gate 3) average 60 to 120 hours.",
  },
];

export default function VideoGameHoursPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/entertainment", label: "Entertainment" }}
      title={TITLE}
      intro={INTRO}
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      exactFaq={true}
      howToNameOverride="How to Calculate Video Game Backlog & Hours"
      authorOverride={{
        "@type": "Person",
        name: "CalcDigi Gaming Team",
        url: "https://www.calcdigi.com/about",
      }}
      datePublishedOverride="2026-10-25"
      dateModifiedOverride="2026-11-17"
      hideEmbedAttribution={true}
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
                Aligned with <a href="https://www.theesa.com/" target="_blank" rel="noopener" className="font-semibold text-slate-800 dark:text-slate-200 underline">Entertainment Software Association (ESA)</a> &amp; <a href="https://howlongtobeat.com/" target="_blank" rel="noopener" className="font-semibold text-slate-800 dark:text-slate-200 underline">HowLongToBeat Telemetry</a>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Gaming Pacing Reference</span>
              <span>•</span>
              <time dateTime="2026-11-17">Updated November 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Answer: How Video Game Backlogs and Cost-Per-Hour Are Sized
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Total backlog playtime equals games count multiplied by average hours adjusted for play style: <strong>Total Backlog Hours = Games × (Base Hours × Style Multiplier)</strong>. Timeline to finish is <strong>Weeks = Total Hours ÷ Available Hours/Week</strong>. Entertainment value equals purchase cost divided by hours: <strong>Cost/Hour = Spend ÷ Hours Played</strong>. A <strong>$70 open-world RPG delivering 80 hours</strong> provides an extraordinary <strong>$0.88 per hour of entertainment</strong>, compared to <strong>$11.20/hour for movie theaters</strong> and <strong>$42.50/hour for live concerts</strong>. Size your gaming PC hardware with our <a href="/calculators/entertainment/gaming-pc-build-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gaming PC build calculator</a>, compare cinema outing costs with our <a href="/calculators/entertainment/movie-ticket-price-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">movie ticket price calculator</a>, stream smarter with our <a href="/calculators/entertainment/streaming-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">streaming cost calculator</a>, or calculate book reading times with our <a href="/calculators/entertainment/book-reading-time-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">book reading time calculator</a>.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            How to Calculate Video Game Hours &amp; Cost Per Hour
          </h2>
          <ol className="mb-8 list-decimal space-y-2 pl-6 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Input Backlog Library Size:</strong> Enter the number of unplayed or unfinished games currently in your Steam, PlayStation, Xbox, or Nintendo queue.</li>
            <li><strong>Select Play Style:</strong> Choose campaign target: <em>Main Story</em> (fast pacing), <em>Main + Extra Quests</em> (balanced), or <em>100% Completionist</em>.</li>
            <li><strong>Set Weekly Gaming Bandwidth:</strong> Enter your realistic available weekly playtime (e.g. 5, 10, or 20 hours/week).</li>
            <li><strong>View Backlog Completion Date:</strong> Get an instant calendar completion target date and calculate your true entertainment cost per hour against movie tickets and dining.</li>
          </ol>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Gaming vs Movies &amp; Concerts: Cost-Per-Hour Comparison
          </h2>

          {/* Benchmark Table Directly in Section */}
          <div className="mb-6">
            <DataTable
              head={["Entertainment Medium", "Typical Cost", "Hours of Enjoyment", "Cost Per Hour", "Value Rating"]}
              rows={[
                ["Movie Theater Outing", "$25 – $35", "2.5 hrs", "~$11.00 – $14.00/hr", "Moderate"],
                ["Live Concert / Sports", "$80 – $150", "3 hrs", "~$27.00 – $50.00/hr", "Premium Event"],
                ["Paperback Book", "$15 – $20", "8 – 10 hrs", "~$1.80 – $2.00/hr", "Very High"],
                ["AAA Game (Main Story)", "$70", "25 hrs", "~$2.80/hr", "High"],
                ["Open-World RPG (Elden Ring, Witcher)", "$70", "100+ hrs", "~$0.70/hr", "Exceptional"],
                ["Indie Replay Game (Hades, Roguelikes)", "$25", "60+ hrs", "~$0.42/hr", "Industry Leading"],
              ]}
            />
          </div>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <VideoGameCostPerHourValueChart />
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The video game industry has eclipsed film box office and recorded music combined to become the largest commercial entertainment sector on the planet. According to <a href="https://www.theesa.com/" target="_blank" rel="noopener" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Entertainment Software Association (ESA) industry reports</a>, interactive digital media consistently ranks among the most cost-effective leisure activities per dollar spent. From sweeping historical open-world role-playing epics to atmospheric indie puzzle adventures and competitive multiplayer leagues, modern video games offer interactive agency, rich narrative storytelling, and cognitive challenge.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
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

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Main Story vs 100% Completionist: Playtime Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            How a player chooses to experience a game exerts a dramatic influence on completion hours. Telemetry from <a href="https://howlongtobeat.com/" target="_blank" rel="noopener" className="text-emerald-600 dark:text-emerald-400 font-medium underline">HowLongToBeat crowdsourced completion data</a> categorizes playthroughs into three distinct playstyle tiers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
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

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Psychology of the Gaming Backlog: Why We Buy Games We Don't Play
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Digital gaming backlogs trigger distinct psychological friction:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
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

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Smart Buying: Price Tracking &amp; Steam Sale Guide
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Smart gamers rarely pay full $70 launch MSRP for backlog titles. Digital storefront price tracking services (such as <em>IsThereAnyDeal</em> for PC gamers, <em>Deku Deals</em> for Nintendo Switch, and <em>PSPrices</em> for PlayStation) track historical price drop trends. Major seasonal events (Steam Summer Sale, Autumn Black Friday, Holiday Winter Sales) reliably discount major AAA releases by 30% to 50% within six months of release. Setting custom price drop alerts ensures you acquire titles only when you are genuinely ready to install and play them immediately.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            5 Proven Rules to Clear Your Video Game Backlog
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Reclaim your gaming joy with these proven rules:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
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
