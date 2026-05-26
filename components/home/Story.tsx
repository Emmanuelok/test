import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Story() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="tracking-eyebrow text-[10px] text-gold mb-6">
            — Our Story
          </div>
          <h2 className="serif text-5xl lg:text-6xl leading-[0.95] tracking-display">
            Two immigrants.
            <br />
            <em className="text-gold">One chair.</em>
            <br />A province behind them.
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-ink-dim leading-relaxed">
          <p>
            In 2016, <span className="text-ink font-medium">Yaw Antwi-Adjei</span> arrived
            in St. John&apos;s from Ghana to pursue a Master of Philosophy at
            Memorial. He never planned to open a barbershop. Then he met{" "}
            <span className="text-ink font-medium">Gustavo Valoyes</span>, a
            Colombian master barber with twelve years behind a chair in Bogotá.
            Two years later they opened a single shop and named it 1949 — for
            the year Newfoundland and Labrador joined Canada.
          </p>
          <p>
            Today there are six locations and roughly sixteen barbers — from
            Ghana, Colombia, Italy, the Philippines, Lebanon, Zimbabwe,
            Mauritius, Japan, and the Avalon. CBC called it{" "}
            <em className="text-gold not-italic font-medium">
              &ldquo;The UN of Barbershops.&rdquo;
            </em>{" "}
            We just call it the chair.
          </p>
          <p>
            On the wall at the Village shop is a world map with pins for every
            country a customer has come from. We&apos;re running out of pins.
          </p>

          <div className="pt-4 flex items-center gap-6 flex-wrap">
            <Link
              href="/story"
              className="group inline-flex items-center gap-2 text-gold hover:text-gold-bright"
            >
              Read the full story
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink text-sm"
            >
              · CBC Longform &rarr;
            </a>
            <a
              href="https://www.youtube.com/watch?v=OX6HOyNh0_o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink text-sm"
            >
              · Watch &ldquo;Fade Forward&rdquo; &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
