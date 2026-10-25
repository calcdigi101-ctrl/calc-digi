"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "party-planning-calc",
  title: "Party Food, Drinks & Supplies Budget Planner",
  presets: [
    { label: "Backyard BBQ / Cookout (25 Guests, 4 Hours)", values: { guests: 25, duration: 4, eventType: "bbq", budgetPerGuest: 28 } },
    { label: "Evening Cocktail Party (40 Guests, 3 Hours)", values: { guests: 40, duration: 3, eventType: "cocktail", budgetPerGuest: 35 } },
    { label: "Seated Dinner Party (12 Guests, 4 Hours)", values: { guests: 12, duration: 4, eventType: "dinner", budgetPerGuest: 45 } },
    { label: "Kids Birthday Celebration (20 Kids + 15 Adults, 3 Hours)", values: { guests: 35, duration: 3, eventType: "birthday", budgetPerGuest: 18 } },
    { label: "Game Day Super Bowl Gathering (18 Guests, 5 Hours)", values: { guests: 18, duration: 5, eventType: "bbq", budgetPerGuest: 24 } },
  ],
  fields: [
    {
      kind: "number",
      key: "guests",
      label: "Total Guest Headcount",
      default: 25,
      min: 2,
      max: 500,
      hint: "Number of adults and older teens attending the gathering",
    },
    {
      kind: "number",
      key: "duration",
      label: "Party Duration (Hours)",
      default: 4,
      min: 1,
      max: 12,
      hint: "Expected length of the event (dictates drink and portion consumption)",
    },
    {
      kind: "choice",
      key: "eventType",
      label: "Gathering Style & Catering Type",
      default: "bbq",
      options: [
        { value: "bbq", label: "Casual Backyard BBQ / Buffet (Heavy meat, sides, beer)" },
        { value: "cocktail", label: "Cocktail Reception (Passed finger foods & mixed drinks)" },
        { value: "dinner", label: "Seated Dinner Party (Plated courses & wine)" },
        { value: "birthday", label: "Birthday Party (Pizza/sliders, punch, cake & snacks)" },
      ],
    },
    {
      kind: "number",
      key: "budgetPerGuest",
      label: "Target Budget Per Guest ($ USD)",
      default: 28,
      min: 5,
      max: 200,
      hint: "Estimated total food, beverage, and tableware spend per attendee",
    },
  ],
  compute: (vals) => {
    const guests = Number(vals.guests) || 25;
    const duration = Number(vals.duration) || 4;
    const eventType = String(vals.eventType || "bbq");
    const budgetPerGuest = Number(vals.budgetPerGuest) || 28;

    // Industry standard drink formula: 2 drinks first hour + 1 drink each subsequent hour
    const drinksPerGuest = 2 + Math.max(0, duration - 1);
    const totalDrinks = guests * drinksPerGuest;

    // Approximate drink allocation breakdown: 50% beer/cider, 30% wine, 20% liquor/cocktails (or sodas)
    const beerCount = Math.round(totalDrinks * 0.45);
    const wineBottles = Math.ceil((totalDrinks * 0.30) / 5); // 5 glasses per 750ml bottle
    const nonAlcoholicSodas = Math.round(totalDrinks * 0.25);
    const iceLbs = Math.ceil(guests * 1.5); // 1.5 lbs ice per person

    // Food portions
    let appPieces = 0;
    let meatLbs = 0;
    let sideLbs = 0;

    if (eventType === "cocktail") {
      appPieces = guests * (duration <= 2 ? 8 : 12);
      meatLbs = 0;
      sideLbs = 0;
    } else {
      appPieces = guests * 4;
      meatLbs = Number((guests * 0.5).toFixed(1)); // 0.5 lb cooked meat per person
      sideLbs = Number((guests * 0.35).toFixed(1)); // 0.35 lb sides per person
    }

    const totalBudget = guests * budgetPerGuest;

    return {
      hero: {
        value: `${totalDrinks} Drinks | ${iceLbs} lbs Ice`,
        label: `Provisioning for ${guests} Guests over ${duration} Hours ($${totalBudget.toLocaleString()} Total Budget)`,
      },
      badge: {
        text: `$${budgetPerGuest.toFixed(0)} / Guest`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Beverage Provisioning Breakdown",
        data: [
          { name: `Beer & Seltzers (${beerCount})`, value: Math.max(1, beerCount), color: "#f59e0b" },
          { name: `Wine Servings (${wineBottles * 5})`, value: Math.max(1, wineBottles * 5), color: "#8b5cf6" },
          { name: `Non-Alcoholic (${nonAlcoholicSodas})`, value: Math.max(1, nonAlcoholicSodas), color: "#06b6d4" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Alcoholic & Soft Drinks", value: `${totalDrinks} total servings (${drinksPerGuest} / person)` },
        { label: "Beer / Seltzers Needed", value: `~${beerCount} cans/bottles (~${Math.ceil(beerCount / 24)} cases of 24)` },
        { label: "Wine Needed (750ml bottles)", value: `~${wineBottles} bottles (~${Math.ceil(wineBottles / 12)} cases of 12)` },
        { label: "Water & Non-Alcoholic Sodas", value: `~${nonAlcoholicSodas} servings` },
        { label: "Ice Provisioning", value: `${iceLbs} lbs of bagged ice (chilling & glasses)` },
        { label: eventType === "cocktail" ? "Finger Food Hors d'oeuvres" : "Main Course Cooked Meat/Protein", value: eventType === "cocktail" ? `${appPieces} total appetizer pieces` : `${meatLbs} lbs meat + ${appPieces} app pieces` },
        { label: "Total Estimated Event Budget", value: `$${totalBudget.toLocaleString()} ($${budgetPerGuest}/guest)` },
      ],
      steps: [
        `Beverage Rule: 2 drinks in hour 1 + 1 drink each remaining ${duration - 1} hours = ${drinksPerGuest} drinks/guest.`,
        `Total drinks volume: ${guests} guests × ${drinksPerGuest} drinks = ${totalDrinks} total servings.`,
        `Allocation: 45% Beer (~${beerCount} cans), 30% Wine (~${wineBottles} bottles @ 5 glasses/bottle), 25% Non-alcoholic (~${nonAlcoholicSodas} cans).`,
        `Ice calculation: ${guests} guests × 1.5 lbs/person = ${iceLbs} lbs total ice required for coolers and drink service.`,
        `Food portioning (${eventType}): ${meatLbs > 0 ? `${meatLbs} lbs main protein (0.5 lb/person) + ` : ""}${appPieces} appetizer pieces.`,
      ],
      note: { text: "Professional event caterers recommend adding a 10% buffer on ice and non-alcoholic drinks if temperatures exceed 80°F (27°C)." },
    };
  },
};

export default function PartyPlanningCalculator() {
  return <CalcEngine config={config} />;
}
