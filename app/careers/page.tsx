import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Careers · Join the Chair",
  description:
    "1949 is hiring barbers in Newfoundland. We sponsor international barbers through the NL provincial program — the same way our founders got here.",
};

const openings = [
  { title: "Senior Barber", loc: "Topsail Rd · St. John's", type: "Full-time" },
  { title: "Barber", loc: "CBS", type: "Full-time" },
  { title: "Barber", loc: "Gander", type: "Full-time" },
  { title: "Apprentice Barber", loc: "Mt. Pearl", type: "Full-time" },
  { title: "Shop Manager", loc: "Multi-location · NL", type: "Salary + bonus" },
];

export default function CareersPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Careers</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          Find your chair.
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          We&apos;re hiring across all six locations. We sponsor barbers from
          abroad through the Atlantic Immigration Program — same path our
          founders took.
        </p>

        <div className="mt-16">
          <h2 className="serif text-3xl mb-6">Open positions</h2>
          <ul className="space-y-1">
            {openings.map((o) => (
              <li key={o.title + o.loc}>
                <Link
                  href="/concierge"
                  className="group flex items-center justify-between py-5 border-b border-line hover:border-gold/40 transition-colors"
                >
                  <div>
                    <div className="serif text-2xl">{o.title}</div>
                    <div className="text-xs text-ink-dim mt-1 flex items-center gap-1.5">
                      <MapPin className="size-3 text-gold" />
                      {o.loc}
                      <span className="text-ink-mute mx-2">·</span>
                      {o.type}
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-ink-mute group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="serif text-3xl mb-4">What we offer</h2>
            <ul className="space-y-3 text-ink-dim">
              <li>· Above-industry commission + tips</li>
              <li>· Benefits, paid vacation, dental</li>
              <li>· Continuing education stipend</li>
              <li>· Sponsorship for the right hand from abroad</li>
              <li>· A team you&apos;ll want to show up for</li>
              <li>· A chair you&apos;ll stay at for a decade</li>
            </ul>
          </div>
          <div>
            <h2 className="serif text-3xl mb-4">What we look for</h2>
            <ul className="space-y-3 text-ink-dim">
              <li>· Two+ years behind a chair</li>
              <li>· Strong portfolio — fades and scissor work</li>
              <li>· Comfort with all hair textures</li>
              <li>· Calm with kids, patient with seniors</li>
              <li>· English working knowledge</li>
              <li>· A second language is a real plus</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border border-gold/40 bg-gold/5 rounded-sm p-10">
          <div className="text-[10px] tracking-eyebrow text-gold mb-3">
            — INTERNATIONAL APPLICANTS
          </div>
          <h2 className="serif text-3xl">
            Yaw came from Ghana. Sonny from the Philippines.
            <br />
            <em className="text-gold">Your story&apos;s welcome.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            We&apos;re a designated employer under the Newfoundland and
            Labrador Provincial Nominee Program and the Atlantic Immigration
            Program. If you&apos;re a barber abroad with two-plus years of
            experience, send us a portfolio — we&apos;ve done this before.
          </p>
          <Link
            href="/concierge"
            className="mt-8 inline-flex items-center gap-2 bg-gold text-bg font-semibold px-7 py-3.5 rounded-sm hover:bg-gold-bright"
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
}
