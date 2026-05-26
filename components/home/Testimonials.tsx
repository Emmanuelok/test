"use client";

import { motion } from "framer-motion";

const reviews = [
  { quote: "Best fade since I moved to the island.", name: "Connor M.", where: "Topsail Rd · Google" },
  { quote: "First haircut for a four-year-old. Perfect.", name: "Sarah K.", where: "CBS · Facebook" },
  { quote: "Twenty-six bucks. Unreal.", name: "Liam P.", where: "Torbay Rd · Google" },
  { quote: "The most relaxing forty minutes of my month.", name: "Devon R.", where: "Topsail Rd · Fresha" },
  { quote: "Sonny spoke Tagalog. Understood me instantly.", name: "Mark V.", where: "Mt. Pearl · Instagram" },
  { quote: "Look ten years younger. My wife noticed.", name: "Patrick D.", where: "Freshwater · Google" },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — From the chair
            </div>
            <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
              <em className="text-gold">1,800+</em> five-stars.
            </h2>
          </div>
          <div className="text-right hidden lg:block">
            <div className="serif text-6xl gold-text leading-none">★★★★★</div>
            <div className="text-[10px] tracking-eyebrow text-ink-mute mt-2">
              GOOGLE · FACEBOOK · FRESHA
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className="border border-line bg-bg-elev/40 p-6 rounded-sm flex flex-col justify-between hover:border-gold/30 transition-colors"
            >
              <div>
                <div className="text-gold text-sm">★★★★★</div>
                <blockquote className="serif italic text-2xl leading-snug mt-3 text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-line/60">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs tracking-eyebrow text-ink-mute mt-1">
                  {r.where}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
