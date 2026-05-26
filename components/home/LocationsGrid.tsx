"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { locations, isOpenNow } from "@/lib/data/locations";
import { ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/motion/Spotlight";

export function LocationsGrid() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — Locations
            </div>
            <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
              Six chairs.
              <br />
              <em className="text-gold">One province.</em>
            </h2>
          </motion.div>
          <Link
            href="/locations"
            className="hidden sm:inline-flex items-center gap-1.5 text-gold hover:text-gold-bright text-sm"
          >
            View all <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locations.map((l, i) => {
            const open = isOpenNow(l);
            return (
              <motion.div
                key={l.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/locations/${l.slug}`} className="block h-full">
                  <Spotlight className="h-full border border-line hover:border-gold/50 bg-bg-elev/40 p-6 rounded-sm transition-all hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-8">
                      <span className="serif text-3xl text-gold tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow ${
                          open ? "text-success" : "text-ink-mute"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${open ? "bg-success animate-pulse" : "bg-ink-mute"}`}
                        />
                        {open ? "Open Now" : "Closed"}
                      </span>
                    </div>
                    <div className="serif text-2xl text-ink leading-tight">
                      {l.name}
                    </div>
                    <div className="text-sm text-ink-dim mt-1">
                      {l.address}, {l.city}
                    </div>
                    <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between">
                      <div className="text-xs text-ink-mute tracking-eyebrow">
                        {l.chairs} CHAIRS
                      </div>
                      <ArrowUpRight className="size-4 text-ink-mute group-hover:text-gold transition-all" />
                    </div>
                  </Spotlight>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
