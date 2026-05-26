"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function FinalCTA() {
  return (
    <section className="relative border-t border-line py-32 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-gold/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <div className="tracking-eyebrow text-[10px] text-gold mb-6">
          — The chair is open
        </div>
        <h2 className="serif text-6xl lg:text-8xl leading-[0.9] tracking-display">
          Thirty seconds.
          <br />
          <em className="text-gold">Then a chair.</em>
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Magnetic>
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-10 py-5 rounded-sm hover:bg-gold-bright transition-colors"
            >
              Book a chair
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/concierge"
              className="inline-flex items-center justify-center gap-2 border border-gold/40 hover:border-gold hover:bg-gold/5 px-10 py-5 rounded-sm transition-colors"
            >
              <Sparkles className="size-4 text-gold" />
              Ask the concierge
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
