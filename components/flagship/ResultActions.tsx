"use client";

import { useState } from "react";
import { Check, Link2, Printer, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Secondary actions under a result: deliberately ghost-styled so they never compete with "Calculate". */
export function ResultActions({ onReset, title }: { onReset: () => void; title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} | CalcDigi`, url });
        return;
      } catch {
        // User dismissed the sheet, or share is unsupported for this payload: fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  function askAi() {
    const prompt = `Can you analyze my calculation for "${title}" and give me practical advice, tips or insights?`;
    if (typeof window !== "undefined") {
      if ((window as any).openAiWithPrompt) {
        (window as any).openAiWithPrompt(prompt);
      } else {
        const fab = document.querySelector<HTMLElement>("[data-open-ai]");
        fab?.click();
        const inp = document.getElementById("ai-panel-input") as HTMLInputElement;
        if (inp) {
          inp.value = prompt;
          inp.focus();
        }
      }
    }
  }

  return (
    <div className="fx-no-print mt-4 grid grid-cols-4 gap-1 sm:gap-2 border-t border-slate-200 pt-3 sm:pt-4 dark:border-slate-800">
      <Button variant="ghost" onClick={onReset} className="px-1 min-[360px]:px-1.5 sm:px-2 text-[11px] min-[360px]:text-xs sm:text-sm min-h-[40px] sm:min-h-[48px] gap-1 sm:gap-1.5">
        <RotateCcw aria-hidden className="size-3 min-[360px]:size-3.5 sm:size-4 shrink-0" />
        <span className="truncate">Reset</span>
      </Button>
      <Button variant="ghost" onClick={share} className="px-1 min-[360px]:px-1.5 sm:px-2 text-[11px] min-[360px]:text-xs sm:text-sm min-h-[40px] sm:min-h-[48px] gap-1 sm:gap-1.5">
        {copied ? <Check aria-hidden className="size-3 min-[360px]:size-3.5 sm:size-4 text-emerald-600 shrink-0" /> : <Link2 aria-hidden className="size-3 min-[360px]:size-3.5 sm:size-4 shrink-0" />}
        <span className="truncate">{copied ? "Copied" : "Share"}</span>
      </Button>
      <Button variant="ghost" onClick={() => window.print()} className="px-1 min-[360px]:px-1.5 sm:px-2 text-[11px] min-[360px]:text-xs sm:text-sm min-h-[40px] sm:min-h-[48px] gap-1 sm:gap-1.5">
        <Printer aria-hidden className="size-3 min-[360px]:size-3.5 sm:size-4 shrink-0" />
        <span className="truncate">Print</span>
      </Button>
      <Button variant="ghost" onClick={askAi} className="px-1 min-[360px]:px-1.5 sm:px-2 text-[11px] min-[360px]:text-xs sm:text-sm min-h-[40px] sm:min-h-[48px] gap-1 sm:gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800">
        <Sparkles aria-hidden className="size-3 min-[360px]:size-3.5 sm:size-4 text-emerald-600 shrink-0" />
        <span className="truncate">Ask AI</span>
      </Button>
    </div>
  );
}
