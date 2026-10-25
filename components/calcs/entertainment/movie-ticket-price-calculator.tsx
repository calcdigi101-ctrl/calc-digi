"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "movie-ticket-price-calc",
  title: "Movie Ticket & Cinema Outing Cost Calculator",
  presets: [
    { label: "Date Night Premium IMAX (2 Adults)", values: { format: "imax", adults: 2, kidsSeniors: 0, popcornCombos: 1, extraDrinksCandy: 14, bookingFee: 4 } },
    { label: "Family Weekend Outing (2 Adults, 2 Kids)", values: { format: "standard", adults: 2, kidsSeniors: 2, popcornCombos: 2, extraDrinksCandy: 18, bookingFee: 7 } },
    { label: "Bargain Matinee Solo Trip (1 Adult)", values: { format: "matinee", adults: 1, kidsSeniors: 0, popcornCombos: 0, extraDrinksCandy: 6, bookingFee: 0 } },
    { label: "Dolby Cinema Blockbuster Premiere (3 Adults)", values: { format: "dolby", adults: 3, kidsSeniors: 0, popcornCombos: 2, extraDrinksCandy: 20, bookingFee: 6 } },
    { label: "Teen Group Standard Evening (4 Tickets)", values: { format: "standard", adults: 4, kidsSeniors: 0, popcornCombos: 2, extraDrinksCandy: 22, bookingFee: 8 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "format",
      label: "Screening Format & Time",
      default: "standard",
      options: [
        { value: "matinee", label: "Early Matinee Standard 2D (~$10.50 adult / $8.50 kid)" },
        { value: "standard", label: "Evening Prime Standard 2D (~$14.50 adult / $11.50 kid)" },
        { value: "imax", label: "IMAX with Laser (~$21.50 adult / $17.50 kid)" },
        { value: "dolby", label: "Dolby Cinema at AMC (~$22.50 adult / $18.50 kid)" },
        { value: "threed", label: "RealD 3D Screen (~$18.00 adult / $14.50 kid)" },
      ],
    },
    {
      kind: "number",
      key: "adults",
      label: "Adult Tickets",
      default: 2,
      min: 0,
      max: 20,
      hint: "Standard adult admission headcount",
    },
    {
      kind: "number",
      key: "kidsSeniors",
      label: "Child (under 12) / Senior (60+) Tickets",
      default: 0,
      min: 0,
      max: 20,
      hint: "Discounted admission headcount",
    },
    {
      kind: "number",
      key: "popcornCombos",
      label: "Popcorn & Drink Combos ($17.50 avg)",
      default: 1,
      min: 0,
      max: 10,
      hint: "Large tub popcorn + 2 fountain drinks combo",
    },
    {
      kind: "number",
      key: "extraDrinksCandy",
      label: "Additional Candy / Snacks ($)",
      default: 14,
      min: 0,
      max: 150,
      hint: "Movie candy boxes ($5-$7 ea), nachos, hot dogs, ICEE upgrades",
    },
    {
      kind: "number",
      key: "bookingFee",
      label: "Online Convenience Booking Fees ($)",
      default: 4,
      min: 0,
      max: 40,
      hint: "Fandango / app ticket fee (~$1.75–$2.25/ticket, $0 if rewards member)",
    },
  ],
  compute: (vals) => {
    const format = String(vals.format || "standard");
    const adults = Number(vals.adults) || 0;
    const kidsSeniors = Number(vals.kidsSeniors) || 0;
    const popcornCombos = Number(vals.popcornCombos) || 0;
    const extraDrinksCandy = Number(vals.extraDrinksCandy) || 0;
    const bookingFee = Number(vals.bookingFee) || 0;

    const priceTable: Record<string, { adult: number; kid: number; name: string }> = {
      matinee: { adult: 10.5, kid: 8.5, name: "Matinee 2D" },
      standard: { adult: 14.5, kid: 11.5, name: "Standard 2D" },
      imax: { adult: 21.5, kid: 17.5, name: "IMAX" },
      dolby: { adult: 22.5, kid: 18.5, name: "Dolby Cinema" },
      threed: { adult: 18.0, kid: 14.5, name: "RealD 3D" },
    };

    const rates = priceTable[format] || priceTable.standard;
    const adultTicketsTotal = adults * rates.adult;
    const kidTicketsTotal = kidsSeniors * rates.kid;
    const totalTicketsCost = adultTicketsTotal + kidTicketsTotal;
    const totalGuests = adults + kidsSeniors || 1;

    const concessionsTotal = popcornCombos * 17.5 + extraDrinksCandy;
    const grandTotal = totalTicketsCost + concessionsTotal + bookingFee;
    const costPerPerson = grandTotal / totalGuests;
    const concessionSharePct = grandTotal > 0 ? (concessionsTotal / grandTotal) * 100 : 0;

    return {
      hero: {
        value: `$${grandTotal.toFixed(2)}`,
        label: `Total Cinema Outing Cost ($${costPerPerson.toFixed(2)} / Person for ${totalGuests} Attendees)`,
      },
      badge: {
        text: concessionsTotal > totalTicketsCost ? "Concessions Exceed Tickets" : "Balanced Outing Spend",
        tone: concessionsTotal > totalTicketsCost ? "warn" : "good",
      },
      rows: [
        { label: "Ticket Admissions Subtotal", value: `$${totalTicketsCost.toFixed(2)} (${rates.name})` },
        { label: "Adult Admissions", value: `${adults} × $${rates.adult.toFixed(2)} = $${adultTicketsTotal.toFixed(2)}` },
        { label: "Child / Senior Admissions", value: `${kidsSeniors} × $${rates.kid.toFixed(2)} = $${kidTicketsTotal.toFixed(2)}` },
        { label: "Concessions & Snacks", value: `$${concessionsTotal.toFixed(2)} (${concessionSharePct.toFixed(1)}% of total)` },
        { label: "Online Ticketing Convenience Fee", value: `$${bookingFee.toFixed(2)}` },
        { label: "Effective Cost Per Person", value: `$${costPerPerson.toFixed(2)} / person` },
      ],
      steps: [
        `Calculate tickets: (${adults} Adults × $${rates.adult}) + (${kidsSeniors} Children/Seniors × $${rates.kid}) = $${totalTicketsCost.toFixed(2)}.`,
        `Calculate concessions: (${popcornCombos} combos × $17.50) + $${extraDrinksCandy} snacks = $${concessionsTotal.toFixed(2)}.`,
        `Sum all outing expenses: $${totalTicketsCost.toFixed(2)} (tickets) + $${concessionsTotal.toFixed(2)} (food) + $${bookingFee.toFixed(2)} (fees) = $${grandTotal.toFixed(2)}.`,
        `Per-attendee average: $${grandTotal.toFixed(2)} ÷ ${totalGuests} attendees = $${costPerPerson.toFixed(2)} per person.`,
      ],
      note: { text: "According to National Association of Theatre Owners (NATO) financial reports, movie theater chains generate over 75% of their net operating profits from concession stand sales." },
    };
  },
};

export default function MovieTicketPriceCalculator() {
  return <CalcEngine config={config} />;
}
