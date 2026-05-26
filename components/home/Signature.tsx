"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blocks = [
  {
    eyebrow: "SIGNATURE",
    title: "The Full 1949",
    desc: "Fade. Beard. Hot-towel shave. 90 minutes.",
    price: "$95",
    href: "/book?service=the-full-1949",
    img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "FLAGSHIP",
    title: "Skin Fade",
    desc: "Razor-finished. The cut on every feed.",
    price: "$45",
    href: "/book?service=skin-fade",
    img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=80",
  },
];

export function Signature() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="tracking-eyebrow text-[10px] text-gold mb-4">— Signature</div>
          <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
            Two cuts we&apos;re known for.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-3">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[5/6] lg:aspect-[4/5] rounded-sm overflow-hidden group"
            >
              <Image
                src={b.img}
                alt={b.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                <div className="tracking-eyebrow text-[10px] text-gold mb-3">— {b.eyebrow}</div>
                <h3 className="serif text-5xl lg:text-6xl tracking-display">{b.title}</h3>
                <p className="mt-3 text-lg text-ink-dim max-w-sm">{b.desc}</p>
                <div className="mt-6 flex items-baseline justify-between">
                  <Link
                    href={b.href}
                    className="group/btn inline-flex items-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright transition-colors"
                  >
                    Book this
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <span className="serif text-3xl gold-text tabular-nums">{b.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
