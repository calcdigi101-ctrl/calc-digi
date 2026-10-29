import type { ReactNode } from "react";

/** Values handed to compute(): numbers for numeric fields, strings for choice/date/text fields. */
export type Values = Record<string, number | string>;

type FieldBase = {
  key: string;
  label: string;
  hint?: string;
  /** Span both columns of the form grid. */
  full?: boolean;
  /** Put the field inside a collapsible group with this title (progressive disclosure). */
  group?: string;
  /** Only show when this returns true for the current values. */
  showIf?: (v: Values) => boolean;
};

export type NumberField = FieldBase & {
  kind: "number";
  default: number;
  min?: number;
  max?: number;
  /** Field may be left empty; compute() then receives 0. */
  optional?: boolean;
  prefix?: string;
  suffix?: string;
  integer?: boolean;
  unitOptions?: { value: string; label: string }[];
};

export type ChoiceField = FieldBase & {
  kind: "choice";
  default: string;
  options: { value: string; label: string }[];
  /** Render as segmented buttons instead of a <select> (good for ≤ 4 options). */
  segmented?: boolean;
};

export type DateField = FieldBase & {
  kind: "date";
  /** "today" resolves on the client; otherwise YYYY-MM-DD. */
  default: string;
};

export type TextField = FieldBase & {
  kind: "text";
  default: string;
  placeholder?: string;
};

export type Field = NumberField | ChoiceField | DateField | TextField;

export type Tone = "good" | "warn" | "bad" | "info" | "neutral";

export type ChartSeries = { key: string; name: string; color?: string };

export type Chart =
  | { type: "donut"; title?: string; data: { name: string; value: number; color?: string }[]; format?: Format }
  | {
      type: "bar" | "stacked-bar" | "area" | "line";
      title?: string;
      x: string;
      series: ChartSeries[];
      data: Record<string, number | string>[];
      format?: Format;
    };

export type Format = "usd" | "usd0" | "num" | "pct" | "plain";

export type Spectrum = {
  value: number;
  min: number;
  max: number;
  segments: { to: number; color: string; label: string }[];
  ticks?: number[];
  label?: string;
};

export type Preset = {
  label: string;
  values: Record<string, number | string>;
};

export type Output = {
  hero: { label: string; value: string; unit?: string; sub?: ReactNode };
  badge?: { text: string; tone: Tone };
  spectrum?: Spectrum;
  rows?: { label: string; value: string; strong?: boolean }[];
  secondary?: { label: string; value: string; strong?: boolean }[];
  steps?: string[];
  chart?: Chart;
  /** Wide charts/tables rendered full-width below the tool grid. */
  details?: {
    title: string;
    chart?: Chart;
    table?: { head: string[]; rows: (string | number)[][] };
    /** Month-by-month loan schedule: renders the balance chart plus a yearly/monthly table. */
    amortization?: { principal: number; rows: { period: number; interest: number; principal: number; balance: number }[] };
  }[];
  note?: { text: ReactNode; tone?: Tone };
};

export type CalcConfig = {
  /** Used for element ids and the share title. */
  id: string;
  title: string;
  fields: Field[];
  presets?: Preset[];
  compute: (v: Values) => Output | { error: string };
  /** Extra validation across fields; return field key → message. */
  validate?: (v: Values) => Partial<Record<string, string>> | void;
  /** Label for the result card heading. */
  resultLabel?: string;
  disclaimer?: string;
};

export const PALETTE = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4", "#64748b", "#ec4899"];
