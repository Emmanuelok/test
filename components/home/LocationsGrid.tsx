import Link from "next/link";
import { locations, isOpenNow } from "@/lib/data/locations";
import { ChevronRight, MapPin } from "lucide-react";

export function LocationsGrid() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — Locations
            </div>
            <h2 className="serif text-5xl lg:text-6xl leading-[0.95] tracking-display">
              Six chairs.
              <br />
              <em className="text-gold">One province.</em>
            </h2>
          </div>
          <Link
            href="/locations"
            className="text-gold hover:text-gold-bright text-sm inline-flex items-center gap-1.5"
          >
            See all locations <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locations.map((l) => {
            const open = isOpenNow(l);
            return (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="group relative border border-line hover:border-gold/50 bg-bg-elev/40 hover:bg-bg-elev p-6 rounded-sm transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <MapPin className="size-4 text-gold" />
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow ${
                      open ? "text-success" : "text-ink-mute"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        open ? "bg-success animate-pulse" : "bg-ink-mute"
                      }`}
                    />
                    {open ? "Open Now" : "Closed"}
                  </span>
                </div>
                <div className="serif text-2xl text-ink leading-tight">
                  {l.name}
                </div>
                <div className="text-sm text-ink-dim mt-1">{l.address}</div>
                <div className="text-sm text-ink-dim">
                  {l.city}, {l.province} {l.postal}
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <div className="text-xs text-ink-mute tracking-eyebrow">
                    {l.chairs} CHAIRS · WALK-INS
                  </div>
                  <ChevronRight className="size-4 text-ink-mute group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
