import type { ReactNode } from "react";
import { Plus } from "lucide-react";

/** Progressive-disclosure section ("+ More Options"), built on <details>. */
export function Disclosure({
  title,
  summary,
  defaultOpen,
  children,
}: {
  title: string;
  summary?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group rounded-xl border border-slate-200 dark:border-slate-800">
      <summary className="flex min-h-[48px] cursor-pointer select-none items-center gap-3 px-4 text-[15px] font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800/50 rounded-xl">
        <Plus aria-hidden className="size-4 shrink-0 text-blue-600 transition-transform group-open:rotate-45" />
        <span className="flex-1">{title}</span>
        {summary ? <span className="text-sm font-normal text-slate-500 tabular-nums dark:text-slate-400">{summary}</span> : null}
      </summary>
      <div className="grid gap-4 border-t border-slate-200 p-4 dark:border-slate-800">{children}</div>
    </details>
  );
}
