"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { ConciergeChat } from "./ConciergeChat";

export function ConciergeMount() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-gold text-bg font-semibold px-4 py-3 rounded-full shadow-2xl shadow-gold/20 hover:bg-gold-bright transition-all hover:scale-105"
        aria-label="Open AI Concierge"
      >
        <Sparkles className="size-4" />
        <span className="hidden sm:inline text-sm">Ask the concierge</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-bg/80 backdrop-blur" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-bg border-l border-line flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <span className="serif text-lg">1949 Concierge</span>
                <span className="text-[9px] tracking-eyebrow text-gold border border-gold/30 bg-gold/10 px-1.5 py-0.5 rounded">
                  AI
                </span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-5 text-ink-dim hover:text-ink" />
              </button>
            </div>
            <ConciergeChat compact />
          </div>
        </div>
      )}
    </>
  );
}
