import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared input chrome: border, focus ring, error state. */
export const fieldBox = (invalid?: boolean) =>
  cn(
    "flex min-h-[48px] items-stretch overflow-hidden rounded-lg border bg-white transition-colors dark:bg-slate-950",
    "focus-within:ring-2 focus-within:ring-emerald-500/20",
    invalid
      ? "border-red-500 focus-within:border-red-500"
      : "border-slate-300 focus-within:border-emerald-600 dark:border-slate-700",
  );

const affix =
  "flex shrink-0 items-center bg-slate-50 px-3 text-sm font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400";

export function Label({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
      <span>{children}</span>
      {hint ? <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{hint}</span> : null}
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

type NumberFieldProps = Omit<ComponentProps<"input">, "type" | "prefix"> & {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
};

/**
 * Numeric input with inline prefix/suffix badges ("$", "%", "kg"...).
 * type="number" + inputMode="decimal" opens the numeric keypad on mobile.
 */
export function NumberField({ id, label, hint, prefix, suffix, error, className, ...props }: NumberFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
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
          className="w-full min-w-0 flex-1 border-0 border-none bg-transparent px-3 text-base tabular-nums text-slate-900 outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400 dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />
        {suffix ? <span className={cn(affix, "border-l border-slate-200 dark:border-slate-800")}>{suffix}</span> : null}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
