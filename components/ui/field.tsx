import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared input chrome: border, focus ring, error state. */
export const fieldBox = (invalid?: boolean) =>
  cn(
    "flex min-h-[44px] sm:min-h-[48px] w-full min-w-0 max-w-full items-stretch overflow-hidden rounded-lg border bg-white transition-colors dark:bg-slate-950",
    "focus-within:ring-2 focus-within:ring-emerald-500/20",
    invalid
      ? "border-red-500 focus-within:border-red-500"
      : "border-slate-300 focus-within:border-emerald-600 dark:border-slate-700",
  );

const affix =
  "flex shrink-0 items-center bg-slate-50 px-2.5 sm:px-3 text-xs sm:text-sm font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400 select-none";

export function Label({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
      <span className="truncate">{children}</span>
      {hint ? <span className="text-[11px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 shrink-0">{hint}</span> : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export type UnitDropdownOption = {
  value: string;
  label: string;
};

export type UnitDropdown = {
  value: string;
  options: UnitDropdownOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
};

type NumberFieldProps = Omit<ComponentProps<"input">, "type" | "prefix"> & {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  unitDropdown?: UnitDropdown;
  error?: string;
};

/**
 * Numeric input with inline prefix/suffix badges ("$", "%", "kg"...).
 * type="number" + inputMode="decimal" opens the numeric keypad on mobile.
 */
export function NumberField({ id, label, hint, prefix, suffix, unitDropdown, error, className, ...props }: NumberFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={cn("min-w-0 max-w-full", className)}>
      {label ? <Label htmlFor={id} hint={hint}>{label}</Label> : null}
      <div className={fieldBox(!!error)}>
        {prefix ? <span className={cn(affix, "border-r border-slate-200 dark:border-slate-800")}>{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step="any"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full min-w-0 flex-1 border-0 border-none bg-transparent px-2.5 sm:px-3 text-sm sm:text-base tabular-nums text-slate-900 outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400 dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />
        {unitDropdown ? (
          <div className={cn(affix, "relative border-l border-slate-200 p-0 dark:border-slate-800 transition-colors")}>
            <select
              aria-label={unitDropdown.ariaLabel || "Select measurement unit"}
              value={unitDropdown.value}
              onChange={(e) => unitDropdown.onChange(e.target.value)}
              className="h-full cursor-pointer appearance-none bg-transparent py-0 pl-2 sm:pl-2.5 pr-5 sm:pr-5.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 outline-none border-0 ring-0 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {unitDropdown.options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-medium">
                  {opt.label}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[8px] text-slate-400">
              ▼
            </span>
          </div>
        ) : suffix ? (
          <span className={cn(affix, "border-l border-slate-200 dark:border-slate-800")}>{suffix}</span>
        ) : null}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
