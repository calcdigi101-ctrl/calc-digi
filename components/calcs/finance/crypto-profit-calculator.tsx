"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num, usd } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "crypto",
  title: "Crypto Profit Calculator",
  fields: [
    { kind: "number", key: "invest", label: "Amount invested", prefix: "$", default: 5000, min: 0.01, max: 1e12 },
    { kind: "number", key: "buy", label: "Buy price per coin", prefix: "$", default: 60000, min: 0.00000001, max: 1e9 },
    { kind: "number", key: "sell", label: "Sell price per coin", prefix: "$", default: 90000, min: 0, max: 1e9 },
    { kind: "number", key: "buyFee", label: "Buy fee", suffix: "%", default: 0.5, min: 0, max: 20, optional: true, group: "Fees & taxes" },
    { kind: "number", key: "sellFee", label: "Sell fee", suffix: "%", default: 0.5, min: 0, max: 20, optional: true, group: "Fees & taxes" },
    { kind: "number", key: "tax", label: "Capital gains tax rate", suffix: "%", default: 0, min: 0, max: 60, optional: true, group: "Fees & taxes" },
  ],
  compute: (v) => {
    const inv = v.invest as number;
    const buyFee = inv * ((v.buyFee as number) / 100);
    const coins = (inv - buyFee) / (v.buy as number);
    const gross = coins * (v.sell as number);
    const sellFee = gross * ((v.sellFee as number) / 100);
    const net = gross - sellFee;
    const preTax = net - inv;
    const tax = Math.max(0, preTax) * ((v.tax as number) / 100);
    const profit = preTax - tax;
    // Sell price at which you get your money back after both fees.
    const breakEven = inv / (coins * (1 - (v.sellFee as number) / 100));
    return {
      hero: { label: profit >= 0 ? "Profit" : "Loss", value: usd(profit), sub: `${profit >= 0 ? "+" : ""}${fixed((profit / inv) * 100, 2)}% return` },
      badge: profit >= 0 ? { text: "Profit", tone: "good" } : { text: "Loss", tone: "bad" },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "Amount invested", value: Math.min(inv, net), color: "#2563eb" },
          profit >= 0 ? { name: "Profit", value: profit, color: "#10b981" } : { name: "Loss", value: -profit, color: "#ef4444" },
          { name: "Fees", value: buyFee + sellFee, color: "#f59e0b" },
          ...(tax > 0 ? [{ name: "Tax", value: tax, color: "#64748b" }] : []),
        ],
      },
      rows: [
        { label: "Coins bought", value: num(coins, 8) },
        { label: "Sale value after fees", value: usd(net) },
        { label: "Total fees", value: usd(buyFee + sellFee) },
        ...(tax > 0 ? [{ label: "Estimated tax", value: usd(tax) }] : []),
        { label: "Break-even sell price", value: usd(breakEven), strong: true },
      ],
      note: { tone: "info", text: "Crypto prices are highly volatile. In the US, crypto held over a year is taxed at long-term capital gains rates; a year or less at ordinary income rates." },
    };
  },
};

export default function CryptoProfitCalculator() {
  return <CalcEngine config={config} />;
}
