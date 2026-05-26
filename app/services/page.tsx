import Link from "next/link";
import { services } from "@/lib/data/services";
import { formatCAD, formatDuration } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Services",
  description:
    "The full 1949 menu — signature fades, hot-towel shaves, beard sculpts, kids' cuts, and The Full 1949 package.",
};

const grouped = {
  haircut: services.filter((s) => s.category === "haircut"),
  package: services.filter((s) => s.category === "package"),
  beard: services.filter((s) => s.category === "beard"),
  shave: services.filter((s) => s.category === "shave"),
  kids: services.filter((s) => s.category === "kids"),
  specialty: services.filter((s) => s.category === "specialty"),
};

const labels: Record<string, string> = {
  haircut: "Haircuts",
  package: "Packages",
  beard: "Beard",
  shave: "Shaves",
  kids: "Kids",
  specialty: "Specialty",
};

export default function ServicesPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Menu</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Everything we do.
          <br />
          <em className="text-gold">Same price, every chair.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Honest, predictable pricing across all six locations. No upsells. No
          surprises at the chair.
        </p>

        <div className="mt-20 space-y-20">
          {Object.entries(grouped).map(([cat, items]) =>
            items.length === 0 ? null : (
              <section key={cat}>
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="serif text-3xl">{labels[cat]}</h2>
                  <span className="text-xs tracking-eyebrow text-ink-mute">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/book?service=${s.slug}`}
                      className="group p-6 border border-line rounded-sm bg-bg-elev/30 hover:border-gold/40 transition-colors relative"
                    >
                      {s.signature && (
                        <span className="absolute -top-2 left-4 text-[9px] tracking-eyebrow text-gold bg-bg border border-gold/40 px-2 py-0.5 rounded">
                          SIGNATURE
                        </span>
                      )}
                      {s.popular && !s.signature && (
                        <span className="absolute -top-2 left-4 text-[9px] tracking-eyebrow text-ink-dim bg-bg border border-line px-2 py-0.5 rounded">
                          POPULAR
                        </span>
                      )}
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className="serif text-2xl leading-tight">{s.name}</h3>
                        <div className="text-right shrink-0">
                          <div className="text-gold serif text-2xl tabular-nums">
                            {formatCAD(s.priceCad)}
                          </div>
                          <div className="text-[10px] tracking-eyebrow text-ink-mute">
                            {formatDuration(s.durationMin)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-ink-dim italic mb-3">{s.tagline}</p>
                      <p className="text-sm text-ink-dim leading-relaxed">
                        {s.description}
                      </p>
                      {s.includes && (
                        <ul className="mt-4 space-y-1.5">
                          {s.includes.map((inc) => (
                            <li
                              key={inc}
                              className="flex items-start gap-2 text-xs text-ink-dim"
                            >
                              <Check className="size-3 text-gold mt-0.5 shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-5 pt-4 border-t border-line/60 text-sm text-gold inline-flex items-center gap-1">
                        Book this <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
