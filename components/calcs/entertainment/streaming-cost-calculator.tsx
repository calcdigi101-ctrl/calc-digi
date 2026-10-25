"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "streaming-cost-calc",
  title: "Streaming Subscriptions Cost & Cord-Cutting Calculator",
  presets: [
    { label: "Moderate Family Bundle (Netflix + Disney+ + Prime)", values: { netflixTier: "standard", disneyTier: "no_ads", maxTier: "none", huluTier: "ads", primeTier: "prime", appleTier: "none", musicTier: "family", cableBill: 95 } },
    { label: "Binge Watcher Maximum Entertainment (All Services)", values: { netflixTier: "premium", disneyTier: "no_ads", maxTier: "no_ads", huluTier: "no_ads", primeTier: "prime", appleTier: "active", musicTier: "individual", cableBill: 110 } },
    { label: "Budget Cord Cutter (Ad-Supported Essentials)", values: { netflixTier: "ads", disneyTier: "ads", maxTier: "none", huluTier: "ads", primeTier: "none", appleTier: "none", musicTier: "none", cableBill: 85 } },
    { label: "Prestige TV Fanatic (Max + Apple TV + Netflix 4K)", values: { netflixTier: "premium", disneyTier: "none", maxTier: "no_ads", huluTier: "none", primeTier: "none", appleTier: "active", musicTier: "individual", cableBill: 75 } },
    { label: "Minimalist / Rotator (1 Active Service Only)", values: { netflixTier: "standard", disneyTier: "none", maxTier: "none", huluTier: "none", primeTier: "none", appleTier: "none", musicTier: "none", cableBill: 60 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "netflixTier",
      label: "Netflix Subscription",
      default: "standard",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "ads", label: "Standard with Ads ($6.99/mo)" },
        { value: "standard", label: "Standard 1080p Ad-Free ($15.49/mo)" },
        { value: "premium", label: "Premium 4K HDR + Spatial Audio ($22.99/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "disneyTier",
      label: "Disney+ / Hulu Duo Bundle",
      default: "no_ads",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "ads", label: "Disney+ Basic with Ads ($9.99/mo)" },
        { value: "no_ads", label: "Disney+ Premium Ad-Free ($15.99/mo)" },
        { value: "duo_bundle", label: "Disney+ & Hulu Duo Bundle No Ads ($19.99/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "maxTier",
      label: "Max (HBO Max)",
      default: "none",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "ads", label: "Max with Ads ($9.99/mo)" },
        { value: "no_ads", label: "Max Ad-Free 1080p ($16.99/mo)" },
        { value: "ultimate", label: "Max Ultimate 4K ($20.99/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "huluTier",
      label: "Hulu Standalone",
      default: "ads",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "ads", label: "Hulu with Ads ($9.99/mo)" },
        { value: "no_ads", label: "Hulu Ad-Free ($18.99/mo)" },
        { value: "live_tv", label: "Hulu + Live TV ($82.99/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "primeTier",
      label: "Amazon Prime Video",
      default: "prime",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "standalone", label: "Prime Video Standalone ($8.99/mo)" },
        { value: "prime", label: "Full Amazon Prime Membership ($14.99/mo)" },
        { value: "prime_noads", label: "Prime + Ad-Free Upgrade ($17.98/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "appleTier",
      label: "Apple TV+",
      default: "none",
      options: [
        { value: "none", label: "None ($0.00)" },
        { value: "active", label: "Apple TV+ ($9.99/mo)" },
      ],
    },
    {
      kind: "choice",
      key: "musicTier",
      label: "Music Streaming (Spotify / Apple Music)",
      default: "individual",
      options: [
        { value: "none", label: "None / Free with Ads ($0.00)" },
        { value: "individual", label: "Individual Premium ($11.99/mo)" },
        { value: "family", label: "Family Plan 6 Accounts ($19.99/mo)" },
      ],
    },
    {
      kind: "number",
      key: "cableBill",
      label: "Current or Previous Cable TV Bill ($/mo)",
      default: 95,
      min: 0,
      max: 500,
      hint: "Average monthly cost of traditional cable/satellite package (enter 0 if already cord-cut)",
    },
  ],
  compute: (vals) => {
    const netflixMap: Record<string, number> = { none: 0, ads: 6.99, standard: 15.49, premium: 22.99 };
    const disneyMap: Record<string, number> = { none: 0, ads: 9.99, no_ads: 15.99, duo_bundle: 19.99 };
    const maxMap: Record<string, number> = { none: 0, ads: 9.99, no_ads: 16.99, ultimate: 20.99 };
    const huluMap: Record<string, number> = { none: 0, ads: 9.99, no_ads: 18.99, live_tv: 82.99 };
    const primeMap: Record<string, number> = { none: 0, standalone: 8.99, prime: 14.99, prime_noads: 17.98 };
    const appleMap: Record<string, number> = { none: 0, active: 9.99 };
    const musicMap: Record<string, number> = { none: 0, individual: 11.99, family: 19.99 };

    const cNetflix = netflixMap[String(vals.netflixTier || "standard")] || 0;
    const cDisney = disneyMap[String(vals.disneyTier || "no_ads")] || 0;
    const cMax = maxMap[String(vals.maxTier || "none")] || 0;
    const cHulu = huluMap[String(vals.huluTier || "ads")] || 0;
    const cPrime = primeMap[String(vals.primeTier || "prime")] || 0;
    const cApple = appleMap[String(vals.appleTier || "none")] || 0;
    const cMusic = musicMap[String(vals.musicTier || "individual")] || 0;
    const cableBill = Number(vals.cableBill) || 0;

    const monthlyTotal = cNetflix + cDisney + cMax + cHulu + cPrime + cApple + cMusic;
    const annualTotal = monthlyTotal * 12;

    const activeServicesCount = [cNetflix, cDisney, cMax, cHulu, cPrime, cApple, cMusic].filter((c) => c > 0).length;

    const annualCableCost = cableBill * 12;
    const annualDifference = annualCableCost - annualTotal;
    const isSaving = annualDifference > 0;

    return {
      hero: {
        value: `$${monthlyTotal.toFixed(2)} / mo`,
        label: `$${annualTotal.toFixed(0)} Annually across ${activeServicesCount} Active Subscriptions`,
      },
      badge: {
        text: cableBill > 0 ? (isSaving ? `Saves $${annualDifference.toFixed(0)}/yr vs Cable` : `Spends $${Math.abs(annualDifference).toFixed(0)}/yr more than Cable`) : `${activeServicesCount} Active Services`,
        tone: isSaving ? "good" : cableBill > 0 ? "warn" : "info",
      },
      rows: [
        { label: "Total Monthly Streaming Spend", value: `$${monthlyTotal.toFixed(2)} / month` },
        { label: "Total Annual Streaming Cost", value: `$${annualTotal.toFixed(2)} / year` },
        { label: "Active Subscriptions Count", value: `${activeServicesCount} platforms active` },
        { label: "Video Streaming Subtotal", value: `$${(monthlyTotal - cMusic).toFixed(2)} / month` },
        { label: "Music Streaming Subtotal", value: `$${cMusic.toFixed(2)} / month` },
        { label: "Comparison to Cable TV ($/mo)", value: cableBill > 0 ? `$${cableBill.toFixed(2)}/mo ($${annualCableCost.toFixed(0)}/yr)` : "No cable benchmark entered" },
        { label: "Net Cord-Cutting Impact", value: cableBill > 0 ? (isSaving ? `Saving $${annualDifference.toFixed(2)} / year` : `Paying $${Math.abs(annualDifference).toFixed(2)} more / year`) : "$0.00" },
      ],
      steps: [
        `Sum chosen subscriptions: Netflix ($${cNetflix}) + Disney ($${cDisney}) + Max ($${cMax}) + Hulu ($${cHulu}) + Prime ($${cPrime}) + Apple TV+ ($${cApple}) + Music ($${cMusic}) = $${monthlyTotal.toFixed(2)} / month.`,
        `Project annual expenditure: $${monthlyTotal.toFixed(2)} × 12 months = $${annualTotal.toFixed(2)} per year.`,
        `Cable TV benchmark comparison: ($${cableBill} cable - $${monthlyTotal.toFixed(2)} streaming) × 12 = ${isSaving ? `$${annualDifference.toFixed(2)} annual savings` : `$${Math.abs(annualDifference).toFixed(2)} higher expenditure`}.`,
      ],
      note: { text: "Rotating streaming services monthly (subscribing only when your favorite season airs and canceling after) can cut annual streaming expenses by over 60%." },
    };
  },
};

export default function StreamingCostCalculator() {
  return <CalcEngine config={config} />;
}
