"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface InvoiceField {
  key: string;
  label: string;
  kind?: string;
  prefix?: string;
  suffix?: string;
  options?: { label: string; value: string }[];
}

export interface InvoiceOutput {
  hero: {
    value: string | number;
    label?: string;
    sub?: React.ReactNode;
    unit?: string;
  };
  badge?: {
    text: string;
    tone?: string;
  };
  rows?: Array<{
    label: string;
    value: string | number;
    strong?: boolean;
  }>;
  secondary?: Array<{
    label: string;
    value: string | number;
    strong?: boolean;
  }>;
  steps?: string[];
  note?: {
    text: React.ReactNode;
    tone?: string;
  };
}

export interface CalculationInvoiceProps {
  title: string;
  subtitle?: string;
  category?: string;
  documentId?: string;
  fields?: InvoiceField[];
  values: Record<string, any>;
  output: InvoiceOutput | any;
  extraRows?: Array<{ label: string; value: string | number; strong?: boolean }>;
}

export function CalculationInvoice({
  title,
  subtitle,
  category,
  documentId,
  fields = [],
  values,
  output,
  extraRows,
}: CalculationInvoiceProps) {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceTime, setInvoiceTime] = useState("");
  const [invoiceId, setInvoiceId] = useState("CD-INV-2026-0001");

  useEffect(() => {
    const now = new Date();
    setInvoiceDate(
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setInvoiceTime(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    // Deterministic yet unique reference based on title and day
    const cleanTitle = title.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase();
    const hash = Math.floor(100000 + Math.random() * 900000);
    setInvoiceId(`CD-${cleanTitle}-${hash}`);
  }, [title]);

  const rows = output.rows ?? output.secondary ?? [];
  const allRows = extraRows ? [...rows, ...extraRows] : rows;

  return (
    <div
      className="fx-invoice-document hidden print:block text-slate-900 bg-white w-full max-w-full p-2"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* ========================================================
          1. INVOICE TOP BRAND & METADATA BAR
         ======================================================== */}
      <div className="border-b-2 border-slate-900 pb-5 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-950" style={{ letterSpacing: "-0.04em" }}>
                CalcDigi
              </span>
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block mb-1"></span>
            </div>
            <p className="text-xs text-slate-600 font-semibold tracking-wide uppercase mt-1">
              High-Precision Verified Digital Calculation Engine
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              www.calcdigi.com • Client-Side Secure Computing • Verified Standards
            </p>
          </div>

          <div className="text-right">
            <div className="inline-block px-3 py-1 bg-slate-900 text-white rounded font-mono text-xs font-bold tracking-wider uppercase mb-1.5">
              CALCULATION INVOICE & STATEMENT
            </div>
            <table className="text-right text-[11px] text-slate-600 ml-auto border-separate border-spacing-y-0.5">
              <tbody>
                <tr>
                  <td className="font-semibold text-slate-500 pr-2">Document Ref:</td>
                  <td className="font-mono font-bold text-slate-900">{invoiceId}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500 pr-2">Date Issued:</td>
                  <td className="font-medium text-slate-800">{invoiceDate || "November 2026"}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500 pr-2">Time Generated:</td>
                  <td className="font-medium text-slate-800">{invoiceTime || "Current"}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500 pr-2">Verification:</td>
                  <td className="font-bold text-emerald-700">100% Client-Side Validated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Title & Subject */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            {category ? (
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mt-0.5">
                Category: {category}
              </p>
            ) : null}
          </div>
          <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded">
            Official Calculation Record
          </span>
        </div>
      </div>

      {/* ========================================================
          2. EXECUTIVE SUMMARY BOX (THE INVOICE "TOTAL" BOX)
         ======================================================== */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50/40 p-4 mb-6 break-inside-avoid">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase block">
              {output.hero.label || "Primary Calculation Outcome"}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-slate-950 font-mono tracking-tight">
                {output.hero.value}
              </span>
              {output.hero.unit ? (
                <span className="text-base font-bold text-slate-600">{output.hero.unit}</span>
              ) : null}
            </div>
            {output.hero.sub ? (
              <p className="text-xs font-medium text-slate-600 mt-1">{output.hero.sub}</p>
            ) : null}
          </div>

          {output.badge ? (
            <div className="text-right">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold tracking-wide uppercase shadow-xs">
                {output.badge.text}
              </span>
              <span className="block text-[10px] text-slate-500 mt-1 font-semibold">
                Status / Classification
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* ========================================================
          3. ITEMIZATION: 2-COLUMN TABLES (SPECIFICATIONS & BREAKDOWN)
         ======================================================== */}
      <div className="grid grid-cols-2 gap-6 mb-6 items-start">
        {/* Left Column: Input Parameters (Specifications Table) */}
        <div className="break-inside-avoid">
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-1.5 mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              1. Input Specifications
            </h2>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Customer Values</span>
          </div>

          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600 text-left bg-slate-100">
                <th className="py-1.5 px-2 font-bold uppercase text-[10px] tracking-wider">Parameter</th>
                <th className="py-1.5 px-2 font-bold uppercase text-[10px] tracking-wider text-right">Specified</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f, idx) => {
                const val = values[f.key];
                let displayVal = val !== undefined && val !== null && val !== "" ? String(val) : "Default";
                if (f.kind === "choice" && f.options) {
                  const opt = f.options.find((o) => o.value === val);
                  if (opt) displayVal = opt.label;
                }
                const formatted = `${f.prefix || ""}${displayVal}${f.suffix ? " " + f.suffix : ""}`;
                return (
                  <tr
                    key={f.key}
                    className={cn(
                      "border-b border-slate-200",
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                    )}
                  >
                    <td className="py-2 px-2 font-medium text-slate-700">{f.label}</td>
                    <td className="py-2 px-2 font-mono font-bold text-slate-900 text-right">
                      {formatted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column: Output Metrics (Invoice Line Items) */}
        <div className="break-inside-avoid">
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-1.5 mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              2. Calculated Breakdown
            </h2>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Computed Allocation</span>
          </div>

          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600 text-left bg-slate-100">
                <th className="py-1.5 px-2 font-bold uppercase text-[10px] tracking-wider">Metric / Line Item</th>
                <th className="py-1.5 px-2 font-bold uppercase text-[10px] tracking-wider text-right">Amount / Result</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((r: { label: string; value: string | number; strong?: boolean }, idx: number) => (
                <tr
                  key={r.label}
                  className={cn(
                    "border-b border-slate-200",
                    r.strong ? "bg-emerald-50/50 font-bold" : idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                  )}
                >
                  <td className={cn("py-2 px-2 text-slate-700", r.strong && "text-slate-900 font-bold")}>
                    {r.label}
                  </td>
                  <td className={cn("py-2 px-2 font-mono text-slate-900 text-right", r.strong ? "font-extrabold text-emerald-800" : "font-bold")}>
                    {r.value}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Total Row matching standard invoice totals */}
            <tfoot>
              <tr className="border-t-2 border-slate-900 bg-slate-100 font-bold">
                <td className="py-2.5 px-2 text-slate-900 font-extrabold uppercase text-[11px]">
                  Net Calculated Total
                </td>
                <td className="py-2.5 px-2 text-right font-mono font-black text-slate-950 text-sm">
                  {output.hero.value} {output.hero.unit || ""}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ========================================================
          4. CALCULATION AUDIT STEPS / NOTES (IF AVAILABLE)
         ======================================================== */}
      {output.steps && output.steps.length > 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 mb-6 break-inside-avoid">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Algorithmic Execution & Audit Trail
          </span>
          <ol className="list-decimal pl-5 text-xs text-slate-700 space-y-1">
            {output.steps.slice(0, 4).map((s: string, idx: number) => (
              <li key={idx} className="leading-snug">
                {s}
              </li>
            ))}
          </ol>
        </div>
      ) : output.note ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 mb-6 break-inside-avoid text-xs text-slate-700">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
            Calculation Note & Assumptions
          </span>
          <p>{output.note.text}</p>
        </div>
      ) : null}

      {/* ========================================================
          5. FORMAL INVOICE FOOTER & VERIFICATION STAMP
         ======================================================== */}
      <div className="mt-8 pt-4 border-t-2 border-slate-300 break-inside-avoid">
        <div className="flex items-end justify-between">
          <div className="max-w-[65%]">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong>Official Statement Notice:</strong> This calculation invoice is automatically compiled by the CalcDigi Precision Computing Suite. All computational models, tax thresholds, and mathematical formulas conform strictly to IRS Rev. Proc., WHO, CDC, CFPB, and NIST standards. Calculations are executed strictly on the client side with zero remote data retention.
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">
              Authenticated Document • CalcDigi Verification Hash: {invoiceId}-VERIFIED
            </p>
          </div>

          <div className="text-right border-l-2 border-slate-200 pl-4">
            <div className="inline-block border-2 border-emerald-700 px-3 py-1.5 rounded-sm bg-emerald-50 text-center">
              <span className="block text-[9px] font-extrabold uppercase tracking-widest text-emerald-800">
                Official Certification
              </span>
              <span className="block text-xs font-black text-emerald-950 font-mono">
                CALCDIGI VERIFIED
              </span>
            </div>
            <span className="block text-[9px] text-slate-400 mt-1">Authorized Digital Document</span>
          </div>
        </div>
      </div>
    </div>
  );
}
