"use client";

import { useState } from "react";
import Link from "next/link";
import { barbers } from "@/lib/data/barbers";
import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const CARES = [
  { id: "fade", label: "A precise fade", weight: { "Skin Fades": 3, "Precision Fades": 3, "Fades": 3, "Fade": 2 } },
  { id: "scissor", label: "Scissor work / classic cut", weight: { "Classic Cut": 3, "Scissor Work": 3 } },
  { id: "beard", label: "Beard / shave craft", weight: { "Beard Sculpt": 3, "Beard": 2, "Hot-Towel Shave": 3 } },
  { id: "texture", label: "Working with my hair texture", weight: { "Textured Hair": 4, "Skin Fade": 2 } },
  { id: "design", label: "Hair design / line work", weight: { "Hair Design": 4, "Line Work": 3, "Edge-Up": 3 } },
  { id: "kids", label: "A great kids' cut", weight: { "Kids": 4 } },
] as const;

const SPEEDS = [
  { id: "fast", label: "Fastest available chair" },
  { id: "best", label: "Best match — I'll wait" },
];

type Score = { barberSlug: string; score: number; reasons: string[] };

function score(care: string, speed: string): Score[] {
  const careDef = CARES.find((c) => c.id === care);
  if (!careDef) return [];
  return barbers
    .map((b) => {
      let s = 0;
      const reasons: string[] = [];
      for (const sp of b.specialties) {
        const w = (careDef.weight as Record<string, number>)[sp];
        if (w) {
          s += w;
          reasons.push(sp);
        }
      }
      // Years bonus.
      s += Math.min(3, b.yearsBehindChair / 4);
      // Speed bonus: more locations = more available chairs.
      if (speed === "fast") s += b.locationSlugs.length * 0.5;
      return { barberSlug: b.slug, score: s, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

export function BarberMatch() {
  const [care, setCare] = useState<string | null>(null);
  const [speed, setSpeed] = useState<string | null>(null);

  const results = care && speed ? score(care, speed) : [];
  const top = results[0];
  const topBarber = top ? barbers.find((b) => b.slug === top.barberSlug) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <div className="text-xs tracking-eyebrow text-gold mb-3">QUESTION 1 OF 2</div>
          <h2 className="serif text-3xl mb-6">What matters most to you?</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {CARES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCare(c.id)}
                className={cn(
                  "text-left p-4 rounded-sm border transition-all",
                  care === c.id
                    ? "border-gold bg-gold/5"
                    : "border-line hover:border-gold/40",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {care && (
          <div>
            <div className="text-xs tracking-eyebrow text-gold mb-3">QUESTION 2 OF 2</div>
            <h2 className="serif text-3xl mb-6">Speed or precision?</h2>
            <div className="grid gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSpeed(s.id)}
                  className={cn(
                    "text-left p-4 rounded-sm border transition-all",
                    speed === s.id
                      ? "border-gold bg-gold/5"
                      : "border-line hover:border-gold/40",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {topBarber ? (
          <div className="border border-gold/40 bg-gold/5 rounded-sm p-8">
            <div className="tracking-eyebrow text-[10px] text-gold mb-2">— Your match</div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="serif text-4xl">{topBarber.name}</h3>
                <div className="text-sm text-ink-dim mt-1">
                  {topBarber.title} · {topBarber.fromFlag} {topBarber.from}
                </div>
              </div>
              <div className="size-16 rounded-full border border-gold/40 bg-bg inline-grid place-items-center text-3xl shrink-0">
                {topBarber.fromFlag}
              </div>
            </div>
            <p className="text-ink-dim leading-relaxed">{topBarber.bio}</p>

            <div className="mt-6 pt-6 border-t border-line/60">
              <div className="text-[10px] tracking-eyebrow text-ink-mute mb-2">WHY THIS MATCH</div>
              <div className="flex flex-wrap gap-1.5">
                {top.reasons.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] tracking-eyebrow text-gold border border-gold/40 bg-gold/5 px-2 py-1 rounded-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-line/60">
              <div className="text-[10px] tracking-eyebrow text-ink-mute mb-2">CUTS AT</div>
              <div className="text-sm text-ink-dim">
                {topBarber.locationSlugs
                  .map((s) => locations.find((l) => l.slug === s)?.name)
                  .join(" · ")}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/book?barber=${topBarber.slug}`}
                className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-5 py-3 rounded-sm hover:bg-gold-bright"
              >
                Book with {topBarber.name.split(" ")[0]}
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 border border-gold/40 hover:border-gold px-5 py-3 rounded-sm"
              >
                See the full team
              </Link>
            </div>

            {results.length > 1 && (
              <div className="mt-8 pt-6 border-t border-line/60">
                <div className="text-[10px] tracking-eyebrow text-ink-mute mb-3">RUNNERS-UP</div>
                <div className="space-y-2">
                  {results.slice(1, 4).map((r) => {
                    const b = barbers.find((x) => x.slug === r.barberSlug)!;
                    return (
                      <Link
                        key={b.slug}
                        href={`/book?barber=${b.slug}`}
                        className="flex items-center justify-between text-sm border border-line/60 rounded-sm p-3 hover:border-gold/40"
                      >
                        <span>
                          {b.fromFlag} {b.name}
                          <span className="text-ink-mute"> · {b.title}</span>
                        </span>
                        <span className="text-gold">Book →</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setCare(null);
                setSpeed(null);
              }}
              className="mt-6 text-xs text-ink-mute hover:text-ink-dim"
            >
              ↺ Run again
            </button>
          </div>
        ) : (
          <div className="border border-dashed border-line rounded-sm p-8 text-center text-ink-mute">
            <div className="serif text-3xl text-ink-dim mb-2">Your match shows here.</div>
            <p className="text-sm">
              Answer both questions on the left. Takes about ten seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
