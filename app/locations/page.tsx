import Link from "next/link";
import { locations, formatHoursLine, isOpenNow } from "@/lib/data/locations";
import { MapPin, Phone, Clock, ChevronRight, Car } from "lucide-react";
import { NLMap } from "@/components/locations/NLMap";

export const metadata = {
  title: "Locations",
  description:
    "Six 1949 Barber Shop locations across Newfoundland — Topsail Rd, Torbay Rd, Freshwater (St. John's), CBS, Mt. Pearl, Gander.",
};

export default function LocationsPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Locations</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Six chairs.
          <br />
          <em className="text-gold">One province.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          The same craft, six different neighbourhoods. Walk in or book ahead.
        </p>

        <div className="mt-16">
          <NLMap />
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-3">
          {locations.map((l) => {
            const open = isOpenNow(l);
            return (
              <div
                key={l.slug}
                className="border border-line rounded-sm bg-bg-elev/30 p-8 group hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="serif text-3xl tracking-display">{l.name}</div>
                    <div className="mt-1 text-ink-dim">{l.short}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow ${
                      open ? "text-success" : "text-ink-mute"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${open ? "bg-success animate-pulse" : "bg-ink-mute"}`}
                    />
                    {open ? "Open now" : "Closed"}
                  </span>
                </div>

                <p className="text-ink-dim leading-relaxed">{l.blurb}</p>

                <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      {l.address}
                      <br />
                      <span className="text-ink-dim">
                        {l.city}, {l.province} {l.postal}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="size-4 text-gold shrink-0 mt-0.5" />
                    <a href={`tel:${l.phone}`} className="hover:text-gold">
                      {l.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="size-4 text-gold shrink-0 mt-0.5" />
                    <div className="text-xs text-ink-dim leading-relaxed">
                      {l.hours.map((h) => (
                        <div key={h.day}>{formatHoursLine(h)}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="size-4 text-gold shrink-0 mt-0.5" />
                    <div className="text-xs text-ink-dim">
                      {l.parking}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {l.features.slice(0, 2).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] tracking-eyebrow border border-line px-2 py-0.5 rounded-sm"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-3">
                  <Link
                    href={`/book?location=${l.slug}`}
                    className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-4 py-2.5 rounded-sm hover:bg-gold-bright transition-colors text-sm"
                  >
                    Book at {l.short} <ChevronRight className="size-3.5" />
                  </Link>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="text-sm text-ink-dim hover:text-ink"
                  >
                    Details &amp; team &rarr;
                  </Link>
                  {l.fresha && (
                    <a
                      href={l.fresha}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-mute hover:text-ink-dim"
                    >
                      Fresha &rarr;
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
