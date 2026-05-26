"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

// Hand-verified Unsplash IDs that actually depict the labelled service.
// Unverified cells use null src → SafeImage renders the branded medallion.
// We refuse to misattribute random stock as 1949's work.
type Cut = { src: string | null; h: string; style: string; by: string };

const cuts: Cut[] = [
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80", h: "h-72", style: "Skin Fade", by: "Sonny" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80", h: "h-96", style: "Hot Towel", by: "Gustavo" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80", h: "h-80", style: "Classic Cut", by: "Marco" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80", h: "h-72", style: "Beard Sculpt", by: "Samir" },
  { src: null, h: "h-96", style: "Signature Fade", by: "Yaw" },
  { src: null, h: "h-72", style: "Kids' Cut", by: "Mandip" },
  { src: null, h: "h-80", style: "Design Line", by: "Sonny" },
  { src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80", h: "h-96", style: "Skin Fade", by: "Amare" },
];

export function Gallery() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="tracking-eyebrow text-[10px] text-gold mb-4">— The Work</div>
          <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
            Fresh off the chair.
          </h2>
        </motion.div>
        <Link
          href="/gallery"
          className="hidden sm:inline-flex items-center gap-1.5 text-gold hover:text-gold-bright text-sm"
        >
          See all 240+ <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cuts.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${c.h} overflow-hidden rounded-sm border border-line group cursor-pointer`}
          >
            <SafeImage
              src={c.src}
              alt={c.style}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fallbackLabel={`${c.style.toUpperCase()} · ${c.by.toUpperCase()}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="text-[10px] tracking-eyebrow text-gold">{c.style.toUpperCase()}</div>
              <div className="text-xs text-ink-dim">by {c.by}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 text-center text-xs text-ink-mute tracking-eyebrow">
        Live shop work lives at{" "}
        <a
          href="https://www.instagram.com/1949barbers/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-bright"
        >
          @1949BARBERS
        </a>
      </div>
    </section>
  );
}
