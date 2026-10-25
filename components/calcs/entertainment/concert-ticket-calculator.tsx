"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "concert-ticket-calc",
  title: "Concert Ticket True Cost & Night-Out Budget Calculator",
  presets: [
    { label: "Arena Pop Superstar Tour (2 Tickets)", values: { basePrice: 165, quantity: 2, feePct: 27, parking: 45, merch: 50, concessions: 40 } },
    { label: "Stadium Mega Festival (Solo Pass)", values: { basePrice: 280, quantity: 1, feePct: 24, parking: 60, merch: 85, concessions: 65 } },
    { label: "Indie Rock Club Gig (Pair)", values: { basePrice: 35, quantity: 2, feePct: 18, parking: 15, merch: 30, concessions: 30 } },
    { label: "Theater / Symphony Evening (Couple)", values: { basePrice: 95, quantity: 2, feePct: 15, parking: 25, merch: 0, concessions: 25 } },
    { label: "Group Outing to Amphitheater (4 Lawn Passes)", values: { basePrice: 45, quantity: 4, feePct: 26, parking: 50, merch: 40, concessions: 90 } },
  ],
  fields: [
    {
      kind: "number",
      key: "basePrice",
      label: "Ticket Face Value ($ USD)",
      default: 165,
      min: 5,
      max: 5000,
      hint: "Advertised ticket price before taxes and ticketing platform fees",
    },
    {
      kind: "number",
      key: "quantity",
      label: "Number of Tickets",
      default: 2,
      min: 1,
      max: 20,
      hint: "How many tickets you are purchasing",
    },
    {
      kind: "number",
      key: "feePct",
      label: "Platform Service & Facility Fees (%)",
      default: 27,
      min: 0,
      max: 60,
      hint: "Combined convenience fee, facility charge, order processing (industry avg: 22%–32%)",
    },
    {
      kind: "number",
      key: "parking",
      label: "Parking / Rideshare Transit ($)",
      default: 45,
      min: 0,
      max: 300,
      hint: "Venue parking pass or roundtrip Uber/Lyft rideshare costs",
    },
    {
      kind: "number",
      key: "concessions",
      label: "Drinks & Food Concessions ($)",
      default: 40,
      min: 0,
      max: 500,
      hint: "Beverages, craft beers, stadium food snacks across the group",
    },
    {
      kind: "number",
      key: "merch",
      label: "Tour Merchandise ($)",
      default: 50,
      min: 0,
      max: 1000,
      hint: "Official tour t-shirts ($45-$55), hoodies ($90-$120), posters, vinyl",
    },
  ],
  compute: (vals) => {
    const basePrice = Number(vals.basePrice) || 165;
    const quantity = Number(vals.quantity) || 2;
    const feePct = Number(vals.feePct) || 27;
    const parking = Number(vals.parking) || 0;
    const concessions = Number(vals.concessions) || 0;
    const merch = Number(vals.merch) || 0;

    const baseTotal = basePrice * quantity;
    const feesTotal = baseTotal * (feePct / 100);
    const checkoutTotal = baseTotal + feesTotal;
    const effectiveTicketCost = checkoutTotal / quantity;
    const extrasTotal = parking + concessions + merch;
    const grandTotal = checkoutTotal + extrasTotal;
    const costPerPerson = grandTotal / quantity;
    const feePortionOfGrandTotal = (feesTotal / grandTotal) * 100;

    return {
      hero: {
        value: `$${grandTotal.toFixed(2)}`,
        label: `Total All-In Night Spend ($${costPerPerson.toFixed(2)} / Person for ${quantity} Guests)`,
      },
      badge: {
        text: `Total ${grandTotal.toFixed(0)} Outing`,
        tone: "info",
      },
      chart: {
        type: "donut",
        title: "Concert Outing Expense Distribution",
        data: [
          { name: `Base Tickets ($${baseTotal.toFixed(0)})`, value: Math.max(0.1, Math.round(baseTotal)), color: "#3b82f6" },
          { name: `Service Fees ($${feesTotal.toFixed(0)})`, value: Math.max(0.1, Math.round(feesTotal)), color: "#ef4444" },
          { name: `Parking ($${parking.toFixed(0)})`, value: Math.max(0.1, Math.round(parking)), color: "#f59e0b" },
          { name: `Food & Drinks ($${concessions.toFixed(0)})`, value: Math.max(0.1, Math.round(concessions)), color: "#10b981" },
          { name: `Merchandise ($${merch.toFixed(0)})`, value: Math.max(0.1, Math.round(merch)), color: "#8b5cf6" },
        ].filter(d => d.value > 0.1),
        format: "usd0",
      },
      rows: [
        { label: "Base Tickets Face Value", value: `$${baseTotal.toFixed(2)} (${quantity} × $${basePrice.toFixed(2)})` },
        { label: "Ticketing Service Fees", value: `$${feesTotal.toFixed(2)} (+${feePct}% markup)` },
        { label: "Cart Checkout Total", value: `$${checkoutTotal.toFixed(2)} ($${effectiveTicketCost.toFixed(2)}/ticket)` },
        { label: "Parking & Transit", value: `$${parking.toFixed(2)}` },
        { label: "Concessions (Food/Drinks)", value: `$${concessions.toFixed(2)}` },
        { label: "Tour Merchandise", value: `$${merch.toFixed(2)}` },
        { label: "True All-In Cost Per Guest", value: `$${costPerPerson.toFixed(2)} / person` },
      ],
      steps: [
        `Base tickets subtotal: ${quantity} tickets × $${basePrice} = $${baseTotal.toFixed(2)}.`,
        `Calculate platform fees (${feePct}%): $${baseTotal.toFixed(2)} × ${feePct / 100} = $${feesTotal.toFixed(2)}.`,
        `Cart checkout price: $${baseTotal.toFixed(2)} + $${feesTotal.toFixed(2)} = $${checkoutTotal.toFixed(2)} ($${effectiveTicketCost.toFixed(2)}/ticket).`,
        `Sum ancillary night expenses: $${parking} (transit) + $${concessions} (food/drinks) + $${merch} (merch) = $${extrasTotal.toFixed(2)}.`,
        `Grand Total: $${checkoutTotal.toFixed(2)} + $${extrasTotal.toFixed(2)} = $${grandTotal.toFixed(2)} ($${costPerPerson.toFixed(2)} per person).`,
      ],
      note: { text: "According to a 2023 GAO investigation, hidden platform convenience and processing fees average between 27% and 36% of primary ticket face values." },
    };
  },
};

export default function ConcertTicketCalculator() {
  return <CalcEngine config={config} />;
}
