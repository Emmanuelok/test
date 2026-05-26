import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLocation,
  locations,
  formatHoursLine,
  isOpenNow,
} from "@/lib/data/locations";
import { barbersForLocation } from "@/lib/data/barbers";
import { MapPin, Phone, Clock, Car, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return {
    title: l.name,
    description: `${l.blurb} ${l.address}, ${l.city}.`,
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();
  const team = barbersForLocation(slug);
  const open = isOpenNow(l);

  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/locations"
          className="text-sm text-ink-dim hover:text-ink mb-8 inline-block"
        >
          ← All locations
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="tracking-eyebrow text-[10px] text-gold mb-3">
              — {l.city.toUpperCase()}
            </div>
            <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
              {l.name}
            </h1>
            <div
              className={`mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow ${
                open ? "text-success" : "text-ink-mute"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${open ? "bg-success animate-pulse" : "bg-ink-mute"}`}
              />
              {open ? "OPEN NOW" : "CLOSED"}
            </div>

            <p className="mt-8 text-lg text-ink-dim leading-relaxed max-w-xl">
              {l.blurb}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/book?location=${l.slug}`}
                className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright"
              >
                Book this location <ChevronRight className="size-4" />
              </Link>
              <a
                href={`tel:${l.phone}`}
                className="inline-flex items-center gap-2 border border-line hover:border-gold/40 px-6 py-3 rounded-sm"
              >
                <Phone className="size-4 text-gold" /> Call
              </a>
              <Link
                href={`/wait-times#${l.slug}`}
                className="inline-flex items-center gap-2 border border-line hover:border-gold/40 px-6 py-3 rounded-sm"
              >
                <Clock className="size-4 text-gold" /> Live wait
              </Link>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-x-6 gap-y-6 text-sm">
              <Info icon={<MapPin className="size-4" />} label="Address">
                {l.address}
                <br />
                <span className="text-ink-dim">
                  {l.city}, {l.province} {l.postal}
                </span>
              </Info>
              <Info icon={<Phone className="size-4" />} label="Phone">
                {l.phone}
              </Info>
              <Info icon={<Car className="size-4" />} label="Parking">
                {l.parking}
              </Info>
              <Info icon={<Clock className="size-4" />} label="Hours">
                <div className="text-xs leading-relaxed text-ink-dim">
                  {l.hours.map((h) => (
                    <div key={h.day}>{formatHoursLine(h)}</div>
                  ))}
                </div>
              </Info>
            </div>

            <div className="mt-12 pt-8 border-t border-line">
              <h3 className="serif text-3xl mb-6">What sets this chair apart</h3>
              <ul className="space-y-2">
                {l.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink-dim">
                    <span className="text-gold mt-1">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-line rounded-sm bg-bg-elev/40 p-6">
              <h3 className="serif text-2xl mb-6">The team here</h3>
              {team.length === 0 ? (
                <p className="text-ink-dim text-sm">Roster updates weekly.</p>
              ) : (
                <ul className="space-y-4">
                  {team.map((b) => (
                    <li
                      key={b.slug}
                      className="flex items-start gap-4 pb-4 border-b border-line/60 last:border-0 last:pb-0"
                    >
                      <div className="size-12 rounded-full border border-gold/40 bg-gold/10 inline-grid place-items-center text-xl shrink-0">
                        {b.fromFlag}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                          <div className="font-medium">{b.name}</div>
                          <Link
                            href={`/book?location=${l.slug}&barber=${b.slug}`}
                            className="text-xs text-gold hover:text-gold-bright shrink-0 ml-2"
                          >
                            Book →
                          </Link>
                        </div>
                        <div className="text-xs text-ink-dim mt-0.5">
                          {b.title} · {b.from}
                        </div>
                        <div className="text-xs text-ink-mute mt-1">
                          {b.specialties.slice(0, 2).join(" · ")}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-9 rounded-sm border border-line inline-grid place-items-center text-gold mt-0.5 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] tracking-eyebrow text-ink-mute mb-1">
          {label}
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
