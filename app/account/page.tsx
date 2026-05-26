import Link from "next/link";
import { Award, Calendar, Bell, CreditCard, MapPin, User } from "lucide-react";

export const metadata = {
  title: "My Account",
  description: "Your cuts, your barber, your Chairs.",
};

// In production: this page is auth-gated and pulls live data from your account.
// Mocked here to demonstrate the experience.

const upcoming = {
  ref: "1949-XK4F",
  location: "Topsail Road",
  barber: "Sonny",
  service: "Signature Fade",
  when: "Sat · Jun 7 · 11:15 am",
};

const past = [
  { date: "May 11", what: "Signature Fade", barber: "Sonny", earned: 9 },
  { date: "Apr 19", what: "Beard Sculpt", barber: "Marco", earned: 4 },
  { date: "Mar 28", what: "The Full 1949", barber: "Yaw", earned: 19 },
  { date: "Mar 6", what: "Skin Fade", barber: "Amare", earned: 9 },
];

export default function AccountPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="tracking-eyebrow text-[10px] text-gold mb-3">— My Account</div>
            <h1 className="serif text-5xl lg:text-6xl tracking-display">
              Hey, Jordan.
            </h1>
            <p className="mt-3 text-ink-dim">
              Your cuts, your chairs, your Chairs.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <div className="text-[10px] tracking-eyebrow text-ink-mute">YOUR TIER</div>
            <div className="serif text-3xl gold-text">Loyal</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-3 mb-12">
          <Card className="lg:col-span-4" icon={<Award className="size-5 text-gold" />} label="Chairs balance">
            <div className="serif text-5xl gold-text tabular-nums">87</div>
            <div className="mt-2 text-xs text-ink-mute tracking-eyebrow">
              63 MORE TO FOUNDER&apos;S CHAIR
            </div>
            <Link href="/loyalty" className="mt-4 inline-block text-sm text-gold">
              Redeem &rarr;
            </Link>
          </Card>
          <Card className="lg:col-span-4" icon={<Calendar className="size-5 text-gold" />} label="Lifetime cuts">
            <div className="serif text-5xl tabular-nums">23</div>
            <div className="mt-2 text-xs text-ink-mute tracking-eyebrow">
              SINCE OCT 2023
            </div>
          </Card>
          <Card className="lg:col-span-4" icon={<MapPin className="size-5 text-gold" />} label="Favourite chair">
            <div className="serif text-2xl">Topsail Road</div>
            <div className="mt-2 text-xs text-ink-mute tracking-eyebrow">
              W/ SONNY · 11 VISITS
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-12 gap-3 mb-12">
          <div className="lg:col-span-7 border border-gold/40 bg-gold/5 rounded-sm p-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[10px] tracking-eyebrow text-gold">UPCOMING</span>
              <span className="text-xs text-ink-mute tabular-nums">{upcoming.ref}</span>
            </div>
            <div className="serif text-3xl">{upcoming.when}</div>
            <div className="mt-2 text-ink-dim">
              {upcoming.service} · {upcoming.barber} · {upcoming.location}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="text-sm border border-gold/40 hover:border-gold px-4 py-2 rounded-sm">
                Reschedule
              </button>
              <button className="text-sm border border-line hover:border-gold/40 px-4 py-2 rounded-sm">
                Add to calendar
              </button>
              <button className="text-sm text-ink-mute hover:text-ink-dim px-4 py-2">
                Cancel
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 border border-line rounded-sm bg-bg-elev/30 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="size-4 text-gold" />
              <span className="text-[10px] tracking-eyebrow text-gold">SMART REMINDER</span>
            </div>
            <div className="serif text-xl leading-tight">
              You usually book a fade every 25 days.
            </div>
            <p className="mt-2 text-sm text-ink-dim">
              Your last cut was 23 days ago. Want us to text three slots
              that fit your usual week?
            </p>
            <button className="mt-4 inline-flex items-center gap-2 bg-gold text-bg font-semibold text-sm px-4 py-2.5 rounded-sm hover:bg-gold-bright">
              Yes, text them to me
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-3">
          <div className="lg:col-span-8 border border-line rounded-sm bg-bg-elev/30 p-6">
            <h2 className="serif text-2xl mb-6">Recent visits</h2>
            <ul className="space-y-1">
              {past.map((v, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-line/60 last:border-0"
                >
                  <div>
                    <div className="text-sm text-ink">
                      {v.what} <span className="text-ink-mute">· {v.barber}</span>
                    </div>
                    <div className="text-xs text-ink-mute tracking-eyebrow">
                      {v.date.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-sm text-gold tabular-nums">
                    +{v.earned} <span className="text-xs text-ink-mute">Chairs</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 border border-line rounded-sm bg-bg-elev/30 p-6 space-y-4">
            <h2 className="serif text-2xl">Preferences</h2>
            <Pref icon={<User />} label="Preferred barber" value="Sonny" />
            <Pref icon={<MapPin />} label="Preferred location" value="Topsail Rd" />
            <Pref icon={<CreditCard />} label="Saved card" value="Visa •••• 1949" />
            <Pref icon={<Bell />} label="Reminders" value="SMS + Email" />
            <Link
              href="/concierge"
              className="block mt-6 text-sm text-gold hover:text-gold-bright"
            >
              Update with the concierge &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  className,
  icon,
  label,
  children,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border border-line rounded-sm bg-bg-elev/30 p-6 ${className ?? ""}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <span className="text-[10px] tracking-eyebrow text-ink-mute">{label.toUpperCase()}</span>
      </div>
      {children}
    </div>
  );
}

function Pref({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="size-8 rounded-sm border border-line inline-grid place-items-center text-gold shrink-0 [&_svg]:size-3.5">
        {icon}
      </div>
      <div>
        <div className="text-[10px] tracking-eyebrow text-ink-mute">
          {label.toUpperCase()}
        </div>
        <div className="text-ink">{value}</div>
      </div>
    </div>
  );
}
