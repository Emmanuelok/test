"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Repeat } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function ClubTeaser() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-elev/40 to-bg" />
      <div className="absolute -top-40 -right-40 size-[600px] bg-gold/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/5 px-3 py-1.5 rounded-full mb-6">
            <Repeat className="size-3.5 text-gold" />
            <span className="text-[10px] tracking-eyebrow text-gold">NEW · CUT CLUB</span>
          </div>
          <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
            One price.
            <br />
            <em className="text-gold">Every cut.</em>
            <br />
            Every chair.
          </h2>
          <p className="mt-8 text-lg text-ink-dim max-w-md leading-relaxed">
            $79/month. Walk into any 1949 chair, any time, as often as you like.
            Cancel any time.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href="/club"
                className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-7 py-4 rounded-sm hover:bg-gold-bright transition-colors"
              >
                Join the Club
              </Link>
            </Magnetic>
            <Link
              href="/club"
              className="inline-flex items-center px-7 py-4 text-ink-dim hover:text-ink transition-colors"
            >
              How it works &rarr;
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="border border-gold/40 bg-bg-elev/80 backdrop-blur rounded-sm p-8">
            <div className="serif text-7xl gold-text tabular-nums leading-none">$79</div>
            <div className="text-sm text-ink-dim mt-1">CAD / month · all-in</div>
            <ul className="mt-8 space-y-3">
              {[
                "Unlimited haircuts",
                "Free monthly beard trim",
                "Priority booking",
                "All six locations",
                "Skip the line",
                "Cancel any time",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink-dim">
                  <Check className="size-4 text-gold mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
