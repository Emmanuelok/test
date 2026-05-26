"use client";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { value: 6, label: "Locations · NL" },
  { value: 17, label: "Languages" },
  { value: 47, label: "Cuts, in thousands", suffix: "k" },
  { value: 4.9, label: "Avg. rating · 1,800+ reviews", decimals: 1, suffix: "★" },
];

export function StatStrip() {
  return (
    <section className="border-y border-line bg-bg-elev/40 py-12 relative overflow-hidden">
      <div className="absolute inset-0 hairline opacity-50" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} index={i}>
            <div className="text-center lg:text-left lg:px-8 lg:border-l first:border-0 border-line">
              <div className="serif text-5xl text-gold gold-text font-semibold">
                <Counter
                  to={s.value}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-2 text-[10px] tracking-eyebrow text-ink-dim">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
