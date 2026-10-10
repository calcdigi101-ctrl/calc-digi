import type { Format } from "./types";

export const usd = (n: number, digits = 2) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const usd0 = (n: number) => usd(n, 0);

export const num = (n: number, digits = 2) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

export const fixed = (n: number, digits = 2) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export const pct = (n: number, digits = 2) => `${num(n, digits)}%`;

export const compactUsd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });

/** "4 yrs 3 mos" from a month count. */
export const duration = (months: number) => {
  const m = Math.round(months);
  const y = Math.floor(m / 12);
  const r = m % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y === 1 ? "" : "s"}`);
  if (r || !y) parts.push(`${r} mo${r === 1 ? "" : "s"}`);
  return parts.join(" ");
};

export function formatBy(format: Format | undefined, n: number) {
  switch (format) {
    case "usd":
      return usd(n);
    case "usd0":
      return usd0(n);
    case "pct":
      return pct(n);
    case "plain":
      return String(n);
    default:
      return num(n);
  }
}

export function axisBy(format: Format | undefined, n: number) {
  if (format === "usd" || format === "usd0") return compactUsd(n);
  if (format === "pct") return `${num(n, 1)}%`;
  return n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });
}
