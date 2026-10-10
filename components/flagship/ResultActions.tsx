"use client";

import { useState } from "react";
import { Check, Link2, Printer, RotateCcw } from "lucide-react";
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

  return (
    <div className="fx-no-print mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
      <Button variant="ghost" onClick={onReset} className="px-2 text-sm">
        <RotateCcw aria-hidden className="size-4" /> Reset
      </Button>
      <Button variant="ghost" onClick={share} className="px-2 text-sm">
        {copied ? <Check aria-hidden className="size-4 text-emerald-600" /> : <Link2 aria-hidden className="size-4" />}
        {copied ? "Copied" : "Share"}
      </Button>
      <Button variant="ghost" onClick={() => window.print()} className="px-2 text-sm">
        <Printer aria-hidden className="size-4" /> Print
      </Button>
    </div>
  );
}
