"use client";

import { useState, useEffect } from "react";
import { Check, Code2, Copy, Link2, Printer, RotateCcw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Secondary actions under a result: deliberately ghost-styled so they never compete with "Calculate". */
export function ResultActions({
  onReset,
  title,
  canonicalUrl: propCanonicalUrl,
}: {
  onReset: () => void;
  title: string;
  canonicalUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [embedHeight, setEmbedHeight] = useState(560);
  const [canonicalUrl, setCanonicalUrl] = useState(propCanonicalUrl || "https://www.calcdigi.com");
  const [calcTitle, setCalcTitle] = useState(title);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
      const url = propCanonicalUrl || canonicalTag || (window.location.origin + window.location.pathname);
      setCanonicalUrl(url);

      const h1Text = document.querySelector("h1")?.innerText?.trim();
      if ((!title || title === "Calculator" || title === "Online Calculator") && h1Text) {
        setCalcTitle(h1Text);
      }
    }
  }, [propCanonicalUrl, title]);

  // Close modal on Escape
  useEffect(() => {
    if (!showEmbed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowEmbed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showEmbed]);

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

  const rawTitle = calcTitle || title || "Calculator";
  const cleanTitle = rawTitle
    .replace(/\s*\(Instant & Ad-Free\).*$/i, "")
    .replace(/\s*\|\s*CalcDigi.*$/i, "")
    .replace(/\s*–\s*CalcDigi.*$/i, "")
    .replace(/\s*:.*$/i, "")
    .trim();
  const calculatorName = /\bcalculat(or|ion)\b/i.test(cleanTitle)
    ? cleanTitle
    : `${cleanTitle} Calculator`;
  const anchorText = `${calculatorName} by CalcDigi`;

  const targetUrl = canonicalUrl || "https://www.calcdigi.com";

  const embedSnippet = `<iframe src="${targetUrl}?embed=true" width="100%" height="${embedHeight}" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.06); max-width:100%; overflow:hidden;"></iframe>
<p style="font-size:12px; color:#64748b; margin-top:8px; text-align:center;">
  Free calculator widget by <a href="${targetUrl}" target="_blank" rel="noopener" style="color:#059669; text-decoration:underline; font-weight:500;">${anchorText}</a>
</p>`;

  async function copyEmbedSnippet() {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2500);
    } catch {
      window.prompt("Copy this embed code:", embedSnippet);
    }
  }

  return (
    <>
      <div className="fx-no-print mt-4 grid grid-cols-4 gap-1.5 sm:gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
        <Button variant="ghost" onClick={onReset} className="px-1.5 sm:px-2 text-xs sm:text-sm">
          <RotateCcw aria-hidden className="size-3.5 sm:size-4" /> Reset
        </Button>
        <Button variant="ghost" onClick={share} className="px-1.5 sm:px-2 text-xs sm:text-sm">
          {copied ? <Check aria-hidden className="size-3.5 sm:size-4 text-emerald-600" /> : <Link2 aria-hidden className="size-3.5 sm:size-4" />}
          {copied ? "Copied" : "Share"}
        </Button>
        <Button variant="ghost" onClick={() => window.print()} className="px-1.5 sm:px-2 text-xs sm:text-sm">
          <Printer aria-hidden className="size-3.5 sm:size-4" /> Print
        </Button>
        <Button variant="ghost" onClick={askAi} className="px-1.5 sm:px-2 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 hover:text-emerald-800">
          <Sparkles aria-hidden className="size-3.5 sm:size-4 text-emerald-600" /> Ask AI
        </Button>
      </div>

      {/* Embed this Calculator Button */}
      <div className="fx-no-print fx-embed-trigger mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => setShowEmbed(true)}
          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-300 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs group"
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
          <span>Embed this Calculator on Your Site</span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded-full ml-1">Free</span>
        </button>
      </div>

      {/* Embed Modal Dialog */}
      {showEmbed ? (
        <div
          className="fx-no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="embed-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEmbed(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <Code2 className="size-5" />
                </div>
                <div>
                  <h3 id="embed-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Embed this Calculator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add this interactive widget to your website, blog, or school portal.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmbed(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Height Selector */}
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Widget Height:</span>
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                {[480, 560, 640].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setEmbedHeight(h)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      embedHeight === h
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {h}px
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="relative rounded-xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-xs text-slate-200 dark:border-slate-800">
              <textarea
                readOnly
                value={embedSnippet}
                rows={5}
                className="w-full resize-none border-0 bg-transparent p-0 font-mono text-xs text-slate-300 focus:outline-none selection:bg-emerald-500/30 leading-relaxed cursor-text"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={copyEmbedSnippet}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {embedCopied ? <Check className="size-4 text-white" /> : <Copy className="size-4" />}
                <span>{embedCopied ? "Copied to Clipboard!" : "Copy Embed Code"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowEmbed(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* SEO & Blogger Tip */}
            <div className="mt-3.5 rounded-lg bg-emerald-50/60 p-2.5 border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/40 text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">💡 Easy 10-Second Setup: </span>
              Paste this HTML snippet into any WordPress (Custom HTML block), Webflow, Wix, Squarespace, Ghost, Notion, or custom HTML page.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
