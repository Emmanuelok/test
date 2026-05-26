import Link from "next/link";

export const metadata = {
  title: "Press Kit",
  description:
    "Press resources for 1949 Barber Shop — founder bios, photography, brand assets, key facts.",
};

const features = [
  { src: "CBC", title: "The World on a Corner", year: "2023", href: "https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/" },
  { src: "CBC", title: "Fade Forward — Absolutely Canadian (TV)", year: "2023", href: "https://www.youtube.com/watch?v=OX6HOyNh0_o" },
  { src: "CBC", title: "Business is booming at 1949", year: "2019", href: "https://www.cbc.ca/news/canada/newfoundland-labrador/business-1949-barbershop-1.4957409" },
  { src: "CBC", title: "Living his dream at the 'UN of barbershops'", year: "2021", href: "https://www.cbc.ca/news/canada/newfoundland-labrador/mandip-garcha-barber-dream-1949-barbershop-1.6109674" },
  { src: "CBC", title: "Black Changemaker · Yaw Antwi-Adjei", year: "2023", href: "https://www.cbc.ca/news/canada/newfoundland-labrador/yaw-antwi-adjei-black-changemaker-atlantic-canada-1.6780920" },
  { src: "ByBlacks", title: "Changing the barbershop landscape in St. John's", year: "2022", href: "https://byblacks.com/profiles/business/item/3460-how-this-ghanaian-immigrant-is-changing-the-barbershop-landscape-in-st-john-s" },
];

export default function PressPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Press</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          The press kit.
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          Brand assets, founder bios, key facts, recent coverage.
        </p>

        <div className="mt-20">
          <h2 className="serif text-3xl mb-8">Coverage</h2>
          <ul className="space-y-1">
            {features.map((f) => (
              <li key={f.title}>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-line hover:border-gold/40"
                >
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-gold">{f.src}</div>
                    <div className="serif text-xl mt-1">{f.title}</div>
                  </div>
                  <div className="text-sm text-ink-mute tabular-nums">{f.year}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="serif text-3xl mb-4">Quick facts</h2>
            <ul className="space-y-2 text-ink-dim text-sm">
              <li><strong className="text-ink">Founded:</strong> 2018 · Topsail Rd, St. John&apos;s</li>
              <li><strong className="text-ink">Founders:</strong> Yaw Antwi-Adjei (Ghana) &amp; Gustavo Valoyes (Colombia)</li>
              <li><strong className="text-ink">Locations:</strong> 6 across NL (St. John&apos;s × 3, CBS, Mt. Pearl, Gander)</li>
              <li><strong className="text-ink">Team:</strong> ~16 barbers, 9 countries, 17 languages</li>
              <li><strong className="text-ink">Recognition:</strong> CBC Longform · Documentary · Black Changemakers</li>
              <li><strong className="text-ink">Tagline:</strong> The UN of Barbershops</li>
            </ul>
          </div>
          <div>
            <h2 className="serif text-3xl mb-4">Media contact</h2>
            <p className="text-sm text-ink-dim leading-relaxed">
              For interviews, photography, or visit requests, write to
              <br />
              <a className="text-gold" href="mailto:press@1949barbershop.ca">press@1949barbershop.ca</a>
              <br />
              We respond within one business day.
            </p>
            <Link
              href="/story"
              className="mt-6 inline-flex items-center text-sm text-gold hover:text-gold-bright"
            >
              Read the founders&apos; story →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
