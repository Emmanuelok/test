import Link from "next/link";

export const metadata = {
  title: "Our Story",
  description:
    "How 1949 Barber Shop became 'The UN of Barbershops' — Yaw Antwi-Adjei, Gustavo Valoyes, and six chairs across Newfoundland.",
};

export default function StoryPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Our Story</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Two immigrants,
          <br />
          <em className="text-gold">one province,</em>
          <br />
          and a chair for everyone.
        </h1>

        <div className="mt-12 prose-lg space-y-8 text-lg text-ink-dim leading-relaxed">
          <p className="text-2xl serif italic text-ink">
            &ldquo;The UN of Barbershops.&rdquo;
            <span className="text-base not-italic text-ink-mute block mt-2">
              — CBC News
            </span>
          </p>

          <p>
            In 2016, Yaw Antwi-Adjei left Ghana for St. John&apos;s on a
            Master of Philosophy scholarship to Memorial. He&apos;d cut hair
            on the side his whole life, but his career was supposed to live
            in academic journals.
          </p>

          <p>
            Then he met Gustavo Valoyes — a Colombian master barber with
            twelve years behind a chair in Bogotá and the same hunger to build
            something. They opened the first 1949 in 2018, on Topsail Road in
            St. John&apos;s. They named it for the year Newfoundland and
            Labrador joined Canada.
          </p>

          <p>
            What happened next surprised even them. Word spread fast through the
            international student community, the Black community, the basketball
            crowd, the lunchtime professionals. The shop became a meeting
            place — a chair for everyone who&apos;d shown up somewhere new and
            needed to be seen.
          </p>

          <p>
            They put a world map on the wall. Customers pinned the cities
            they were from. The map filled up.
          </p>

          <div className="not-prose border-l-2 border-gold pl-6 my-12">
            <p className="serif italic text-2xl text-ink">
              &ldquo;A haircut is the easiest excuse for a real conversation.
              We&apos;ve had Zimbabwe and Mauritius and Italy and the
              Philippines all sitting on the bench at once, talking about
              hockey. That&apos;s the whole point.&rdquo;
            </p>
            <p className="mt-3 text-sm tracking-eyebrow text-gold">
              — YAW ANTWI-ADJEI, FOUNDER
            </p>
          </div>

          <p>
            Today there are six locations — Topsail Road, Torbay Road and
            Freshwater Road in St. John&apos;s, plus Mt. Pearl, Conception Bay
            South and Gander. Roughly sixteen barbers cut here, from nine
            different countries, speaking seventeen languages between them.
          </p>

          <p>
            CBC has profiled the shop in a longform feature, a documentary
            short called <em>Fade Forward</em>, and several news pieces. Yaw
            was named a Black Changemaker for Atlantic Canada in 2023.
          </p>

          <p>
            None of which is the point. The point is the chair. The point is
            making sure that whatever you came in with — a face, a beard, a
            story, a language you grew up with — leaves looking and feeling
            like the best version of itself.
          </p>

          <p className="text-ink">
            We&apos;ve cut over 47,000 heads since we opened the first chair.
            We&apos;d like to cut yours next.
          </p>
        </div>

        <div className="mt-16 pt-12 border-t border-line">
          <div className="text-[10px] tracking-eyebrow text-gold mb-3">— In the press</div>
          <ul className="space-y-3 text-ink-dim">
            <li>
              <a
                href="https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                CBC Longform — &ldquo;The World on a Corner&rdquo; &rarr;
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=OX6HOyNh0_o"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                Absolutely Canadian — &ldquo;Fade Forward&rdquo; (CBC TV) &rarr;
              </a>
            </li>
            <li>
              <a
                href="https://byblacks.com/profiles/business/item/3460-how-this-ghanaian-immigrant-is-changing-the-barbershop-landscape-in-st-john-s"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                ByBlacks — Changing the barbershop landscape in St. John&apos;s &rarr;
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright"
          >
            Book a chair
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center gap-2 border border-gold/40 hover:border-gold px-6 py-3 rounded-sm"
          >
            Meet the team
          </Link>
        </div>
      </article>
    </div>
  );
}
