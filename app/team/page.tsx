import Link from "next/link";
import { barbers } from "@/lib/data/barbers";
import { locations } from "@/lib/data/locations";

export const metadata = {
  title: "The Team",
  description:
    "Sixteen barbers from Ghana, Colombia, Italy, the Philippines, Lebanon, Zimbabwe, Mauritius, Japan and the Avalon. The UN of barbershops.",
};

export default function TeamPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Team</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Sixteen chairs.
          <br />
          <em className="text-gold">Seventeen flags.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Our team has come from nine countries. They&apos;ve trained on three
          continents. They share one set of standards and one chair.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {barbers.map((b) => (
            <article
              key={b.slug}
              className="border border-line rounded-sm bg-bg-elev/30 p-6 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="size-16 rounded-full border border-gold/40 bg-gold/10 inline-grid place-items-center text-3xl">
                  {b.fromFlag}
                </div>
                <span className="text-[10px] tracking-eyebrow text-ink-mute">
                  {b.yearsBehindChair}Y BEHIND CHAIR
                </span>
              </div>
              <h2 className="serif text-2xl leading-tight">{b.name}</h2>
              <div className="text-xs text-ink-mute tracking-eyebrow mt-1">
                {b.title.toUpperCase()}
              </div>
              <div className="text-sm text-ink-dim mt-1">From {b.from}</div>
              <p className="mt-4 text-sm text-ink-dim leading-relaxed">{b.bio}</p>

              <div className="mt-5">
                <div className="text-[10px] tracking-eyebrow text-ink-mute mb-2">
                  SPECIALTY
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {b.specialties.map((sp) => (
                    <span
                      key={sp}
                      className="text-[10px] tracking-eyebrow border border-line px-2 py-1 rounded-sm"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] tracking-eyebrow text-ink-mute mb-2">
                  LANGUAGES
                </div>
                <div className="text-xs text-ink-dim">
                  {b.languages.join(" · ")}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                <div className="text-[10px] tracking-eyebrow text-ink-mute truncate">
                  {b.locationSlugs
                    .map((s) => locations.find((l) => l.slug === s)?.short)
                    .join(" · ")}
                </div>
                <Link
                  href={`/book?barber=${b.slug}`}
                  className="text-xs text-gold hover:text-gold-bright shrink-0 ml-3"
                >
                  Book →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
