import Link from "next/link";
import { Check } from "lucide-react";

export const metadata = {
  title: "1949 Rewards",
  description:
    "Every cut earns Chairs. Redeem for free fades, beard work and The Full 1949 package.",
};

const tiers = [
  {
    name: "Regular",
    chairs: 0,
    perks: ["Earn 1 Chair per $5 spent", "Birthday cut on us", "Skip-the-line walk-ins"],
  },
  {
    name: "Loyal",
    chairs: 50,
    perks: [
      "All Regular perks",
      "10% off every visit",
      "Early access to seasonal promos",
      "Free beard trim with any cut once a quarter",
    ],
  },
  {
    name: "Founder's Chair",
    chairs: 250,
    perks: [
      "All Loyal perks",
      "Free Full 1949 package on your anniversary",
      "Pick-your-barber priority booking",
      "Bring a friend free, once a year",
    ],
  },
];

const redemptions = [
  { chairs: 40, reward: "Free Line-Up" },
  { chairs: 80, reward: "Free Beard Sculpt" },
  { chairs: 150, reward: "Free Classic Cut" },
  { chairs: 200, reward: "Free Signature Fade" },
  { chairs: 400, reward: "Free Full 1949 Package" },
];

export default function LoyaltyPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— 1949 Rewards</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Earn chairs.
          <br />
          <em className="text-gold">Sit in them free.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          A loyalty programme that&apos;s simple and worth using. Every cut,
          beard or shave earns Chairs. Redeem for the next one — or save up for
          the works.
        </p>

        <div className="mt-16 grid lg:grid-cols-3 gap-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 rounded-sm border ${i === 2 ? "border-gold/40 bg-gold/5" : "border-line bg-bg-elev/30"}`}
            >
              {i === 2 && (
                <div className="text-[10px] tracking-eyebrow text-gold mb-2">
                  TOP TIER
                </div>
              )}
              <h3 className="serif text-3xl mb-2">{t.name}</h3>
              <div className="text-sm text-ink-dim mb-6">
                {t.chairs === 0 ? "Start here" : `${t.chairs}+ Chairs / yr`}
              </div>
              <ul className="space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-dim">
                    <Check className="size-4 text-gold mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="serif text-4xl mb-6">Redemptions</h2>
            <ul className="space-y-3">
              {redemptions.map((r) => (
                <li
                  key={r.chairs}
                  className="flex items-baseline justify-between border-b border-line/60 pb-3"
                >
                  <span className="text-ink">{r.reward}</span>
                  <span className="text-gold serif tabular-nums">
                    {r.chairs} <span className="text-xs text-ink-mute">Chairs</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line rounded-sm bg-bg-elev/40 p-8">
            <h3 className="serif text-2xl mb-4">How it works</h3>
            <ol className="space-y-3 text-sm text-ink-dim list-decimal pl-5">
              <li>Sign up at any chair — or in your account.</li>
              <li>
                You earn Chairs automatically every visit. We track them in your
                account.
              </li>
              <li>
                Redeem at the chair, or apply them in the booking flow at
                checkout.
              </li>
              <li>
                Tier moves are based on rolling 12-month earnings — once you
                level up, you stay there for a year.
              </li>
            </ol>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright"
            >
              Book a cut to start earning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
