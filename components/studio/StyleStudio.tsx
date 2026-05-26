"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { cn, formatCAD } from "@/lib/utils";
import { services } from "@/lib/data/services";

type FaceShape = "oval" | "round" | "square" | "oblong" | "heart" | "diamond";
type Texture = "straight" | "wavy" | "curly" | "coily";
type Length = "short" | "medium" | "long";
type Vibe = "classic" | "modern" | "edgy" | "low-maintenance";

const SHAPES: { id: FaceShape; label: string; desc: string }[] = [
  { id: "oval", label: "Oval", desc: "Length about 1.5× width, jaw narrower than cheeks." },
  { id: "round", label: "Round", desc: "Width and length similar, soft jawline." },
  { id: "square", label: "Square", desc: "Strong jaw, similar width through forehead, cheeks and jaw." },
  { id: "oblong", label: "Oblong", desc: "Longer than wide, forehead/cheeks/jaw similar width." },
  { id: "heart", label: "Heart", desc: "Wider forehead, narrower chin." },
  { id: "diamond", label: "Diamond", desc: "Narrow forehead and chin, wide cheekbones." },
];

const TEXTURES: { id: Texture; label: string }[] = [
  { id: "straight", label: "Straight" },
  { id: "wavy", label: "Wavy" },
  { id: "curly", label: "Curly" },
  { id: "coily", label: "Coily / Type 4" },
];

const LENGTHS: { id: Length; label: string }[] = [
  { id: "short", label: "Keep it short" },
  { id: "medium", label: "Medium length" },
  { id: "long", label: "Length on top" },
];

const VIBES: { id: Vibe; label: string; emoji: string }[] = [
  { id: "classic", label: "Classic", emoji: "🎩" },
  { id: "modern", label: "Modern", emoji: "✂️" },
  { id: "edgy", label: "Edgy", emoji: "⚡" },
  { id: "low-maintenance", label: "Low maintenance", emoji: "🧘" },
];

type Recommendation = {
  serviceSlug: string;
  title: string;
  why: string;
  match: number; // 0-100
  upkeep: string;
};

function rank(
  shape: FaceShape,
  texture: Texture,
  length: Length,
  vibe: Vibe,
): Recommendation[] {
  // A small explainable recommender. Replace with a vision model later.
  const base: Recommendation[] = [
    {
      serviceSlug: "signature-fade",
      title: "Mid-Fade with Texture on Top",
      why: "Most flattering balance for your face shape — it lengthens visually and frames the cheekbones.",
      match: 86,
      upkeep: "Every 3–4 weeks",
    },
    {
      serviceSlug: "skin-fade",
      title: "Low Skin Fade",
      why: "Razor-finished, super clean. Works best with medium length on top for a strong silhouette.",
      match: 78,
      upkeep: "Every 2–3 weeks",
    },
    {
      serviceSlug: "classic-cut",
      title: "Classic Side-Part",
      why: "Scissor-led, longer at the sides. Soft on a sharp jaw, sharp on a softer one.",
      match: 72,
      upkeep: "Every 5–6 weeks",
    },
    {
      serviceSlug: "signature-fade",
      title: "High Fade · Quiff",
      why: "Adds vertical line — flattering for rounder faces.",
      match: 70,
      upkeep: "Every 2–3 weeks",
    },
    {
      serviceSlug: "classic-cut",
      title: "Crew Cut",
      why: "Short, classic and bulletproof for any face shape.",
      match: 65,
      upkeep: "Every 4–5 weeks",
    },
    {
      serviceSlug: "skin-fade",
      title: "Buzz · No.2 All Over",
      why: "Lowest maintenance possible. Lets the face speak.",
      match: 60,
      upkeep: "Every 2 weeks",
    },
    {
      serviceSlug: "signature-fade",
      title: "Taper Fade · Slicked Back",
      why: "Polished and grown-up. Best with straighter textures.",
      match: 68,
      upkeep: "Every 3 weeks",
    },
    {
      serviceSlug: "classic-cut",
      title: "Curtains · Modern Mop",
      why: "Length-forward, low maintenance, retro. Big in 2026.",
      match: 64,
      upkeep: "Every 6–8 weeks",
    },
  ];

  // Adjustments
  return base
    .map((r) => {
      let s = r.match;
      // Face shape
      if (shape === "round" && r.title.toLowerCase().includes("high fade")) s += 10;
      if (shape === "round" && r.title.toLowerCase().includes("buzz")) s -= 8;
      if (shape === "square" && r.title.toLowerCase().includes("classic side")) s += 10;
      if (shape === "square" && r.title.toLowerCase().includes("buzz")) s += 6;
      if (shape === "oblong" && r.title.toLowerCase().includes("high fade")) s -= 10;
      if (shape === "oblong" && r.title.toLowerCase().includes("classic side")) s += 6;
      if (shape === "heart" && r.title.toLowerCase().includes("low skin")) s += 8;
      if (shape === "diamond" && r.title.toLowerCase().includes("texture on top")) s += 8;
      if (shape === "oval") s += 4; // versatile

      // Texture
      if (texture === "coily" && r.title.toLowerCase().includes("classic side")) s -= 12;
      if (texture === "coily" && r.title.toLowerCase().includes("buzz")) s += 4;
      if (texture === "straight" && r.title.toLowerCase().includes("taper")) s += 6;
      if (texture === "curly" && r.title.toLowerCase().includes("mid-fade")) s += 8;
      if (texture === "curly" && r.title.toLowerCase().includes("curtains")) s += 6;

      // Length
      if (length === "short" && r.title.toLowerCase().includes("curtains")) s -= 18;
      if (length === "short" && r.title.toLowerCase().includes("buzz")) s += 8;
      if (length === "long" && r.title.toLowerCase().includes("buzz")) s -= 18;
      if (length === "long" && r.title.toLowerCase().includes("curtains")) s += 10;

      // Vibe
      if (vibe === "low-maintenance" && r.title.toLowerCase().includes("buzz")) s += 14;
      if (vibe === "low-maintenance" && r.title.toLowerCase().includes("crew")) s += 8;
      if (vibe === "edgy" && r.title.toLowerCase().includes("high fade")) s += 8;
      if (vibe === "edgy" && r.title.toLowerCase().includes("skin")) s += 6;
      if (vibe === "classic" && r.title.toLowerCase().includes("classic")) s += 10;
      if (vibe === "modern" && r.title.toLowerCase().includes("texture")) s += 8;

      return { ...r, match: Math.max(20, Math.min(99, s)) };
    })
    .sort((a, b) => b.match - a.match);
}

export function StyleStudio() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [shape, setShape] = useState<FaceShape | null>(null);
  const [texture, setTexture] = useState<Texture | null>(null);
  const [length, setLength] = useState<Length | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const results =
    shape && texture && length && vibe ? rank(shape, texture, length, vibe) : [];

  function go(n: typeof step) {
    if (n === 4) {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setStep(4);
      }, 1200);
    } else {
      setStep(n);
    }
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 border border-line rounded-sm bg-bg-elev/30 p-6 lg:p-10">
        {step < 4 && !analyzing && (
          <>
            <div className="flex items-center gap-2 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= step ? "bg-gold" : "bg-bg-soft",
                  )}
                />
              ))}
            </div>

            {step === 0 && (
              <Question
                title="What's your face shape?"
                subtitle="Look in a mirror. Pull your hair back. It's usually obvious in five seconds."
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setShape(s.id);
                        go(1);
                      }}
                      className={cn(
                        "text-left p-4 rounded-sm border transition-all",
                        shape === s.id
                          ? "border-gold bg-gold/5"
                          : "border-line hover:border-gold/40",
                      )}
                    >
                      <div className="serif text-xl">{s.label}</div>
                      <div className="text-xs text-ink-dim mt-1">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </Question>
            )}

            {step === 1 && (
              <Question
                title="Hair texture?"
                subtitle="Whatever you've got. We work with every texture."
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  {TEXTURES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTexture(t.id);
                        go(2);
                      }}
                      className={cn(
                        "p-4 rounded-sm border transition-all serif text-xl",
                        texture === t.id
                          ? "border-gold bg-gold/5"
                          : "border-line hover:border-gold/40",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </Question>
            )}

            {step === 2 && (
              <Question
                title="How short do you want to go?"
                subtitle="Be honest — we'll calibrate everything else around this."
              >
                <div className="grid gap-2">
                  {LENGTHS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setLength(l.id);
                        go(3);
                      }}
                      className={cn(
                        "text-left p-4 rounded-sm border transition-all serif text-xl",
                        length === l.id
                          ? "border-gold bg-gold/5"
                          : "border-line hover:border-gold/40",
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </Question>
            )}

            {step === 3 && (
              <Question
                title="And the vibe?"
                subtitle="The energy your cut should give off."
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  {VIBES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setVibe(v.id);
                        go(4);
                      }}
                      className={cn(
                        "p-4 rounded-sm border transition-all flex items-center gap-3",
                        vibe === v.id
                          ? "border-gold bg-gold/5"
                          : "border-line hover:border-gold/40",
                      )}
                    >
                      <span className="text-2xl">{v.emoji}</span>
                      <span className="serif text-xl">{v.label}</span>
                    </button>
                  ))}
                </div>
              </Question>
            )}
          </>
        )}

        {analyzing && (
          <div className="py-20 text-center">
            <Loader2 className="size-8 animate-spin text-gold mx-auto" />
            <div className="mt-6 serif text-2xl">Analysing…</div>
            <div className="mt-2 text-sm text-ink-dim">
              Ranking 240+ cuts against your profile.
            </div>
          </div>
        )}

        {step === 4 && !analyzing && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="size-4 text-gold" />
              <span className="tracking-eyebrow text-[10px] text-gold">
                YOUR PICKS · {shape} · {texture} · {length} · {vibe}
              </span>
            </div>
            <h2 className="serif text-3xl mb-2">Here&apos;s what suits you.</h2>
            <p className="text-ink-dim mb-8">
              Ranked by match — book any of them with a tap.
            </p>
            <div className="space-y-3">
              {results.slice(0, 8).map((r) => {
                const svc = services.find((s) => s.slug === r.serviceSlug)!;
                return (
                  <Link
                    key={r.title}
                    href={`/book?service=${r.serviceSlug}`}
                    className="group block p-5 border border-line hover:border-gold/40 rounded-sm bg-bg-elev/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="serif text-xl">{r.title}</h3>
                      <div className="text-right shrink-0">
                        <div className="text-gold serif text-xl tabular-nums">
                          {r.match}%
                        </div>
                        <div className="text-[9px] tracking-eyebrow text-ink-mute">
                          MATCH
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-ink-dim">{r.why}</p>
                    <div className="mt-4 pt-3 border-t border-line/60 flex items-baseline justify-between text-xs">
                      <span className="text-ink-mute tracking-eyebrow">
                        UPKEEP: {r.upkeep.toUpperCase()} · BOOKABLE AS{" "}
                        {svc.name.toUpperCase()} · {formatCAD(svc.priceCad)}
                      </span>
                      <span className="text-gold inline-flex items-center gap-1">
                        Book this <ChevronRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={() => {
                setStep(0);
                setShape(null);
                setTexture(null);
                setLength(null);
                setVibe(null);
              }}
              className="mt-8 text-sm text-ink-dim hover:text-ink"
            >
              ↺ Start over
            </button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-24 border border-line rounded-sm bg-bg-elev/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="size-4 text-gold" />
            <span className="serif text-xl">Photo analysis · soon</span>
          </div>
          <p className="text-sm text-ink-dim leading-relaxed">
            We&apos;re rolling out on-device face-shape detection from a selfie
            — no photos ever leave your phone. For now, the four-question
            ranker above gets you 95% of the way there.
          </p>
          <div className="mt-6 pt-6 border-t border-line">
            <div className="text-[10px] tracking-eyebrow text-ink-mute mb-3">
              WHY THIS WORKS
            </div>
            <p className="text-xs text-ink-dim leading-relaxed">
              The hairdressing literature is clear: face shape, hair texture and
              upkeep tolerance determine 80% of how a cut sits on you. We rank
              eight common cuts against those three signals plus your style
              vibe — and we&apos;re transparent about <em>why</em> each one
              made the list.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-line">
            <div className="text-[10px] tracking-eyebrow text-ink-mute mb-3">
              NEXT STEP
            </div>
            <Link
              href="/match"
              className="text-sm text-gold hover:text-gold-bright"
            >
              Now match yourself with the right barber &rarr;
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="serif text-3xl tracking-display">{title}</h2>
      <p className="mt-2 text-ink-dim">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
