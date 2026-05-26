"use client";

import { motion } from "framer-motion";

const press = [
  { src: "CBC LONGFORM", href: "https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/" },
  { src: "CBC NEWS", href: "https://www.cbc.ca/news/canada/newfoundland-labrador/business-1949-barbershop-1.4957409" },
  { src: "ABSOLUTELY CANADIAN", href: "https://www.youtube.com/watch?v=OX6HOyNh0_o" },
  { src: "BYBLACKS", href: "https://byblacks.com/profiles/business/item/3460-how-this-ghanaian-immigrant-is-changing-the-barbershop-landscape-in-st-john-s" },
  { src: "BLACK CHANGEMAKERS", href: "https://www.cbc.ca/news/canada/newfoundland-labrador/yaw-antwi-adjei-black-changemaker-atlantic-canada-1.6780920" },
];

export function Press() {
  return (
    <section className="py-16 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-[10px] tracking-eyebrow text-gold mb-10">
          — As seen on
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-6 items-center">
          {press.map((p, i) => (
            <motion.a
              key={p.src}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="serif italic text-center text-ink-mute hover:text-gold transition-colors text-sm tracking-eyebrow"
            >
              {p.src}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
