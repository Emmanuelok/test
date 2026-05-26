"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

type Cut = {
  src: string | null;
  style: "Fade" | "Classic" | "Beard" | "Kids" | "Design" | "Shave";
  by: string;
  loc: string;
  h: "tall" | "square" | "wide";
};

// Only Unsplash IDs that have been visually verified to depict the labelled
// service are used. The rest are deliberately null → SafeImage renders the
// branded medallion card. Real shop work lives on @1949barbers.
const cuts: Cut[] = [
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80", style: "Fade", by: "Sonny", loc: "Topsail Rd", h: "tall" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80", style: "Shave", by: "Gustavo", loc: "Torbay Rd", h: "tall" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80", style: "Classic", by: "Marco", loc: "CBS", h: "square" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80", style: "Beard", by: "Samir", loc: "Gander", h: "wide" },
  { src: "/gallery/yaw-signature-fade.png", style: "Fade", by: "Yaw", loc: "Topsail Rd", h: "tall" },
  { src: "/gallery/mandip-kids-cut.png", style: "Kids", by: "Mandip", loc: "Freshwater", h: "square" },
  { src: null, style: "Design", by: "Sonny", loc: "Topsail Rd", h: "tall" },
  { src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80", style: "Fade", by: "Amare", loc: "CBS", h: "square" },
  { src: null, style: "Classic", by: "Gustavo", loc: "Torbay Rd", h: "wide" },
  { src: null, style: "Beard", by: "Marco", loc: "CBS", h: "tall" },
  { src: null, style: "Fade", by: "Sonny", loc: "Mt. Pearl", h: "square" },
  { src: null, style: "Design", by: "Kenji", loc: "Topsail Rd", h: "tall" },
];

const FILTERS = ["All", "Fade", "Classic", "Beard", "Kids", "Design", "Shave"] as const;

const HEIGHTS: Record<Cut["h"], string> = {
  tall: "row-span-2",
  square: "row-span-1",
  wide: "row-span-1",
};

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = filter === "All" ? cuts : cuts.filter((c) => c.style === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-sm text-sm transition-all border",
              filter === f
                ? "bg-gold text-bg border-gold font-semibold"
                : "border-line hover:border-gold/40 text-ink-dim hover:text-ink",
            )}
          >
            {f}
            {f !== "All" && (
              <span className="ml-1.5 text-[10px] text-current/60">
                ({cuts.filter((c) => c.style === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.div
              key={c.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                delay: i * 0.03,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "relative overflow-hidden rounded-sm border border-line group cursor-pointer",
                HEIGHTS[c.h],
              )}
            >
              <SafeImage
                src={c.src}
                alt={`${c.style} by ${c.by}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackLabel={`${c.style.toUpperCase()} · ${c.by.toUpperCase()}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-[10px] tracking-eyebrow text-gold">{c.style.toUpperCase()}</div>
                <div className="text-sm text-ink mt-1">by {c.by}</div>
                <div className="text-[10px] tracking-eyebrow text-ink-mute">{c.loc.toUpperCase()}</div>
                <Link
                  href={`/book?service=signature-fade`}
                  className="mt-2 inline-block text-xs text-gold hover:text-gold-bright"
                >
                  Book this look →
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
