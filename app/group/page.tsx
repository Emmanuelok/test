import Link from "next/link";
import { Users, Briefcase, Heart, Trophy } from "lucide-react";

export const metadata = {
  title: "Group Bookings",
  description:
    "Weddings, sports teams, corporate grooming days. Multi-chair, multi-person bookings at any 1949 location.",
};

const blocks = [
  {
    Icon: Heart,
    eyebrow: "WEDDINGS",
    title: "The Wedding Party",
    desc: "Groom, best man, brothers, dads, ring bearer. Book the whole shop for two hours. Espresso and the morning of.",
    cta: "Plan a wedding",
  },
  {
    Icon: Trophy,
    eyebrow: "SPORTS TEAMS",
    title: "The Team Cut",
    desc: "St. John's Edge basketball regulars. Whole-roster bookings before tournament weekends. Discounted by the dozen.",
    cta: "Book the team",
  },
  {
    Icon: Briefcase,
    eyebrow: "CORPORATE",
    title: "Office Grooming Days",
    desc: "We come to you, or we host. Quarterly grooming pop-ups for your office. Invoiced. Loved by employees.",
    cta: "Talk to us",
  },
  {
    Icon: Users,
    eyebrow: "FAMILY DAYS",
    title: "Family Saturdays",
    desc: "Dad, two kids, granddad. Same chair, four cuts in 90 minutes, one bill. Family rate.",
    cta: "Book a family slot",
  },
];

export default function GroupPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Group Bookings</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          More than one chair?
          <br />
          <em className="text-gold">We&apos;ll clear the shop.</em>
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          Weddings, teams, offices, families. Tell us how many. We&apos;ll find
          the chairs.
        </p>

        <div className="mt-16 grid lg:grid-cols-2 gap-3">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="border border-line rounded-sm bg-bg-elev/30 p-8 hover:border-gold/40 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-sm border border-gold/40 bg-gold/10 inline-grid place-items-center text-gold">
                  <b.Icon className="size-4" />
                </div>
                <div className="text-[10px] tracking-eyebrow text-gold">— {b.eyebrow}</div>
              </div>
              <h3 className="serif text-3xl">{b.title}</h3>
              <p className="mt-3 text-ink-dim leading-relaxed">{b.desc}</p>
              <Link
                href="/concierge"
                className="mt-6 inline-flex items-center gap-2 text-gold hover:text-gold-bright"
              >
                {b.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 border border-gold/40 bg-gold/5 rounded-sm p-10 text-center">
          <h2 className="serif text-4xl">Tell us the date.</h2>
          <p className="mt-3 text-ink-dim max-w-md mx-auto">
            Our team will design the booking, hold the chairs, and confirm
            within an hour during business hours.
          </p>
          <Link
            href="/concierge"
            className="mt-8 inline-flex items-center gap-2 bg-gold text-bg font-semibold px-8 py-4 rounded-sm hover:bg-gold-bright"
          >
            Plan a group booking
          </Link>
        </div>
      </div>
    </div>
  );
}
