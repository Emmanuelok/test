import Link from "next/link";
import { Check, Repeat } from "lucide-react";

export const metadata = {
  title: "Cut Club · Unlimited Cuts",
  description:
    "$79/month. Unlimited cuts at any 1949 chair. Priority booking. Cancel any time.",
};

const tiers = [
  {
    name: "Solo",
    price: 79,
    desc: "Unlimited cuts. One person.",
    perks: ["Unlimited haircuts", "Free beard trim monthly", "Priority booking", "Skip the line", "All 6 locations", "Cancel any time"],
    cta: "Join Solo",
  },
  {
    name: "Family",
    price: 149,
    desc: "Up to 4 people in one plan.",
    perks: ["Everything in Solo", "4 family members", "Kids' cuts included", "Shared booking calendar", "Free monthly beard trim each"],
    cta: "Join Family",
    accent: true,
  },
  {
    name: "Corporate",
    price: "Custom",
    desc: "For teams & companies.",
    perks: ["Volume pricing", "Office grooming days", "Invoiced billing", "Dedicated account manager", "Branded gift cards"],
    cta: "Talk to us",
  },
];

export default function ClubPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/5 px-3 py-1.5 rounded-full mb-6">
          <Repeat className="size-3.5 text-gold" />
          <span className="text-[10px] tracking-eyebrow text-gold">CUT CLUB</span>
        </div>
        <h1 className="serif text-5xl lg:text-8xl leading-[0.9] tracking-display">
          One price.
          <br />
          <em className="text-gold">Every cut.</em>
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          Walk into any 1949 chair, any time, as often as you want. From $79/mo.
        </p>

        <div className="mt-16 grid lg:grid-cols-3 gap-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`p-8 rounded-sm border ${
                t.accent
                  ? "border-gold/50 bg-gradient-to-b from-gold/10 to-bg-elev/30"
                  : "border-line bg-bg-elev/30"
              }`}
            >
              {t.accent && (
                <div className="text-[10px] tracking-eyebrow text-gold mb-2">MOST POPULAR</div>
              )}
              <h3 className="serif text-3xl">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="serif text-6xl gold-text tabular-nums">
                  {typeof t.price === "number" ? `$${t.price}` : t.price}
                </span>
                {typeof t.price === "number" && (
                  <span className="text-ink-mute text-sm">/mo</span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-dim">{t.desc}</p>
              <ul className="mt-8 space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink-dim">
                    <Check className="size-4 text-gold mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link
                href={typeof t.price === "number" ? `/book?club=${t.name.toLowerCase()}` : "/concierge"}
                className={`mt-8 block text-center font-semibold py-3 rounded-sm transition-colors ${
                  t.accent
                    ? "bg-gold text-bg hover:bg-gold-bright"
                    : "border border-gold/40 hover:border-gold hover:bg-gold/5"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 border-t border-line pt-16">
          <h2 className="serif text-4xl mb-12">Questions</h2>
          <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-ink-dim">
            <Faq q="How does Cut Club work?">
              Walk into any of our six locations, give your name, sit in the
              next open chair. No payment at the chair — we charge $79 on the
              same day each month.
            </Faq>
            <Faq q="Really unlimited?">
              Really. The average member comes in twice a month. Some come
              weekly. You decide.
            </Faq>
            <Faq q="Can I bring a friend?">
              Family plan covers four people in one household. Otherwise, send
              them a gift card.
            </Faq>
            <Faq q="What about beard, shave, design?">
              Cuts are unlimited. Add-ons (beard sculpt, hot-towel shave,
              design lines) are 25% off for members.
            </Faq>
            <Faq q="Cancel any time?">
              Yes. Pause for a month or cancel entirely from your account —
              one tap, no questions.
            </Faq>
            <Faq q="Tipping?">
              Tips go to your barber as always — never the company. Members
              tend to leave a little more, and our team appreciates it.
            </Faq>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="serif text-xl text-ink mb-2">{q}</dt>
      <dd className="text-sm leading-relaxed">{children}</dd>
    </div>
  );
}
