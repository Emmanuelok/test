"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NLMap } from "@/components/locations/NLMap";

export function MapTeaser() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="tracking-eyebrow text-[10px] text-gold mb-4">— The Province</div>
          <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
            Six chairs. <em className="text-gold">Mapped.</em>
          </h2>
        </motion.div>
        <Link
          href="/locations"
          className="hidden sm:inline-flex items-center gap-1.5 text-gold hover:text-gold-bright text-sm"
        >
          Visit all six <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <NLMap />
      </div>
    </section>
  );
}
