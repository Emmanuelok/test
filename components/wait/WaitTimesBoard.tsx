"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locations, isOpenNow } from "@/lib/data/locations";
import { mockWait } from "@/lib/ai/concierge-brain";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function tier(min: number) {
  if (min < 10) return { label: "Walk straight in", cls: "text-success border-success/40 bg-success/5" };
  if (min < 25) return { label: "Comfortable", cls: "text-gold border-gold/40 bg-gold/5" };
  return { label: "Busy — book ahead", cls: "text-danger border-danger/40 bg-danger/5" };
}

export function WaitTimesBoard() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);
  const updatedAt = new Date();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 text-xs tracking-eyebrow">
        <span className="text-ink-mute">UPDATED {updatedAt.toLocaleTimeString()}</span>
        <span className="flex items-center gap-2 text-gold">
          <span className="size-1.5 rounded-full bg-success animate-pulse" /> LIVE
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {locations.map((l) => {
          const open = isOpenNow(l);
          const wait = open ? mockWait(l.slug) : null;
          const t = wait !== null ? tier(wait) : null;
          return (
            <Link
              key={l.slug}
              id={l.slug}
              href={`/book?location=${l.slug}`}
              className="block p-6 border border-line rounded-sm bg-bg-elev/30 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="serif text-2xl">{l.name}</div>
                  <div className="text-xs text-ink-dim mt-1">{l.address}</div>
                </div>
                <Clock className="size-4 text-gold mt-1" />
              </div>
              {open && wait !== null && t ? (
                <>
                  <div className="serif text-6xl gold-text tabular-nums leading-none">
                    {wait}
                    <span className="text-2xl ml-1 text-ink-dim">min</span>
                  </div>
                  <div className={cn("mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow border rounded-sm px-2 py-1", t.cls)}>
                    {t.label}
                  </div>
                </>
              ) : (
                <>
                  <div className="serif text-3xl text-ink-mute">Closed</div>
                  <div className="mt-3 text-xs text-ink-dim">
                    Opens at the next listed hour. Book ahead to skip the wait.
                  </div>
                </>
              )}
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                <span className="text-ink-mute tracking-eyebrow">{l.chairs} CHAIRS</span>
                <span className="text-gold inline-flex items-center gap-1">
                  Book a slot <ChevronRight className="size-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
