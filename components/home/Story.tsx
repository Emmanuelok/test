"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Story() {
  return (
    <section className="py-24 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative aspect-[4/5] rounded-sm overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"
            alt="The chair at 1949"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[10px] tracking-eyebrow text-gold mb-2">— FOUNDED 2018</div>
            <div className="serif italic text-2xl text-ink">
              &ldquo;A chair is the easiest excuse for a real conversation.&rdquo;
            </div>
            <div className="text-xs text-ink-mute tracking-eyebrow mt-2">
              YAW ANTWI-ADJEI · FOUNDER
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7 lg:pl-8">
          <div className="tracking-eyebrow text-[10px] text-gold mb-6">
            — Our Story
          </div>
          <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
            Two immigrants.
            <br />
            <em className="text-gold">One chair.</em>
            <br />
            A province behind them.
          </h2>

          <div className="mt-10 space-y-5 text-lg text-ink-dim leading-relaxed max-w-xl">
            <p>
              <span className="text-ink font-medium">Yaw</span> from Ghana.{" "}
              <span className="text-ink font-medium">Gustavo</span> from Bogotá. One
              shop on Topsail Road in 2018 — named for the year Newfoundland
              joined Canada.
            </p>
            <p>
              Today: six locations, sixteen barbers, nine countries,{" "}
              <em className="text-gold not-italic font-medium">
                &ldquo;The UN of Barbershops&rdquo;
              </em>{" "}
              (CBC).
            </p>
          </div>

          <div className="mt-10 flex items-center gap-6 flex-wrap text-sm">
            <Link
              href="/story"
              className="group inline-flex items-center gap-2 text-gold hover:text-gold-bright"
            >
              The full story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://newsinteractives.cbc.ca/longform/1949-barber-shop-stjohns/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink"
            >
              CBC Longform &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
