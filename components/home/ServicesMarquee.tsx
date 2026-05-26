import { services } from "@/lib/data/services";
import { formatCAD } from "@/lib/utils";
import Link from "next/link";

export function ServicesMarquee() {
  const reel = [...services, ...services];
  return (
    <section className="py-20 border-y border-line bg-bg-elev/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-baseline justify-between mb-10">
        <div>
          <div className="tracking-eyebrow text-[10px] text-gold mb-2">
            — Menu
          </div>
          <h2 className="serif text-3xl lg:text-4xl">
            Everything we do, on every chair.
          </h2>
        </div>
        <Link
          href="/services"
          className="text-sm text-gold hover:text-gold-bright"
        >
          See full menu &rarr;
        </Link>
      </div>
      <div className="no-scrollbar overflow-hidden">
        <div className="marquee flex gap-3 w-max">
          {reel.map((s, i) => (
            <div
              key={i + s.slug}
              className="shrink-0 w-72 border border-line bg-bg p-5 rounded-sm"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="serif text-lg">{s.name}</span>
                <span className="text-gold tabular-nums">
                  {formatCAD(s.priceCad)}
                </span>
              </div>
              <div className="text-xs text-ink-mute tracking-eyebrow mb-3">
                {s.durationMin} MIN
              </div>
              <p className="text-sm text-ink-dim leading-snug">{s.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
