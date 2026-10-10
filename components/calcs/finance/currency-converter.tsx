"use client";

import { useMemo } from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";
import { FX_SNAPSHOT, type Rates } from "@/lib/fx";

const POPULAR = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "PKR", "MXN", "AED", "SAR"];

// Static names: Intl.DisplayNames output differs between Node and browsers, which breaks hydration.
const NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", CAD: "Canadian Dollar", AUD: "Australian Dollar",
  CHF: "Swiss Franc", CNY: "Chinese Yuan", INR: "Indian Rupee", PKR: "Pakistani Rupee", MXN: "Mexican Peso", BRL: "Brazilian Real",
  KRW: "South Korean Won", SGD: "Singapore Dollar", HKD: "Hong Kong Dollar", NZD: "New Zealand Dollar", SEK: "Swedish Krona",
  NOK: "Norwegian Krone", DKK: "Danish Krone", ZAR: "South African Rand", AED: "UAE Dirham", SAR: "Saudi Riyal", TRY: "Turkish Lira",
  RUB: "Russian Ruble", PLN: "Polish Zloty", THB: "Thai Baht", IDR: "Indonesian Rupiah", MYR: "Malaysian Ringgit", PHP: "Philippine Peso",
  BDT: "Bangladeshi Taka", EGP: "Egyptian Pound", NGN: "Nigerian Naira", ILS: "Israeli New Shekel", VND: "Vietnamese Dong",
  KWD: "Kuwaiti Dinar", QAR: "Qatari Riyal", CZK: "Czech Koruna", HUF: "Hungarian Forint", ARS: "Argentine Peso", CLP: "Chilean Peso",
  COP: "Colombian Peso", BHD: "Bahraini Dinar", OMR: "Omani Rial", JOD: "Jordanian Dinar", LKR: "Sri Lankan Rupee", NPR: "Nepalese Rupee",
  KES: "Kenyan Shilling", MAD: "Moroccan Dirham", PEN: "Peruvian Sol", TWD: "New Taiwan Dollar", UAH: "Ukrainian Hryvnia", RON: "Romanian Leu",
  ISK: "Icelandic Krona", AFN: "Afghan Afghani", IRR: "Iranian Rial", IQD: "Iraqi Dinar", GHS: "Ghanaian Cedi", ETB: "Ethiopian Birr",
};
const currencyName = (code: string) => NAMES[code] ?? code;

const fmtCur = (n: number, code: string) => {
  const digits = Math.abs(n) >= 1 ? 2 : 6;
  return `${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })} ${code}`;
};

export function makeConfig(rates: Rates, updated: string, live: boolean): CalcConfig {
  const codes = Object.keys(rates).filter((c) => /^[A-Z]{3}$/.test(c));
  const ordered = [...POPULAR.filter((c) => rates[c]), ...codes.filter((c) => !POPULAR.includes(c)).sort()];
  const options = ordered.map((c) => ({ value: c, label: `${c} – ${currencyName(c)}` }));
  return {
    id: "fx",
    title: "Currency Converter",
    fields: [
      { kind: "number", key: "amount", label: "Amount", default: 100, min: 0, max: 1e15, full: true },
      { kind: "choice", key: "from", label: "From", default: "USD", options },
      { kind: "choice", key: "to", label: "To", default: "PKR", options },
    ],
    compute: (v) => {
      const from = String(v.from);
      const to = String(v.to);
      const rate = rates[to] / rates[from];
      const result = (v.amount as number) * rate;
      const others = POPULAR.filter((c) => c !== from && rates[c]).slice(0, 8);
      return {
        hero: { label: `${from} → ${to}`, value: fmtCur(result, to), sub: `${fmtCur(v.amount as number, from)} at 1 ${from} = ${num(rate, 6)} ${to}` },
        rows: [
          { label: `1 ${from}`, value: `${num(rate, 6)} ${to}`, strong: true },
          { label: `1 ${to}`, value: `${num(1 / rate, 6)} ${from}` },
          { label: "Rates updated", value: new Date(updated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) },
        ],
        note: live
          ? { tone: "info", text: "Mid-market reference rates, refreshed daily. Banks and card networks add a margin or fee, so the rate you get will be a little worse." }
          : { tone: "warn", text: "Live rates are unavailable right now; showing a recent snapshot. Check with your bank before exchanging money." },
        details: [
          {
            title: `${fmtCur(v.amount as number, from)} in other currencies`,
            table: { head: ["Currency", "Amount", "Rate"], rows: others.map((c) => [`${c} – ${currencyName(c)}`, fmtCur(((v.amount as number) * rates[c]) / rates[from], c), num(rates[c] / rates[from], 6)]) },
          },
        ],
      };
    },
  };
}

export const config = makeConfig(FX_SNAPSHOT.rates, FX_SNAPSHOT.updated, false);

export default function CurrencyConverter({ rates, updated, live }: { rates: Rates; updated: string; live: boolean }) {
  const cfg = useMemo(() => makeConfig(rates, updated, live), [rates, updated, live]);
  return <CalcEngine config={cfg} />;
}
