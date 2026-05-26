const press = [
  {
    src: "CBC LONGFORM",
    quote: "The UN of Barbershops.",
    href: "https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/",
  },
  {
    src: "CBC NEWS",
    quote: "Business is booming. Staff gel with their community.",
    href: "https://www.cbc.ca/news/canada/newfoundland-labrador/business-1949-barbershop-1.4957409",
  },
  {
    src: "BYBLACKS",
    quote:
      "Changing the barbershop landscape in St. John's.",
    href: "https://byblacks.com/profiles/business/item/3460-how-this-ghanaian-immigrant-is-changing-the-barbershop-landscape-in-st-john-s",
  },
  {
    src: "ABSOLUTELY CANADIAN",
    quote: "Fade Forward — The Story of 1949.",
    href: "https://www.youtube.com/watch?v=OX6HOyNh0_o",
  },
];

export function Press() {
  return (
    <section className="py-20 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="tracking-eyebrow text-[10px] text-gold mb-10 text-center">
          — As featured in
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {press.map((p) => (
            <a
              key={p.src}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-line hover:border-gold/40 p-6 rounded-sm group transition-colors"
            >
              <div className="text-[10px] tracking-eyebrow text-gold mb-3">
                {p.src}
              </div>
              <p className="serif italic text-xl leading-snug">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="mt-4 text-xs text-ink-mute group-hover:text-ink-dim">
                Read &rarr;
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
