"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { WorldMap } from "@/components/home/WorldMap";
import { Magnetic } from "@/components/motion/Magnetic";
import { LiveTicker } from "@/components/site/LiveTicker";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[92vh]">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/85 to-bg z-10" />
        <Image
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-[5]">
        <WorldMap />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="tracking-eyebrow text-[10px] text-gold">
            St. John&apos;s · CBS · Mt. Pearl · Gander
          </span>
          <div className="hidden sm:flex flex-1 h-px bg-line max-w-32" />
          <div className="hidden sm:block">
            <LiveTicker />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9">
            <h1 className="serif font-medium leading-[0.88] tracking-display text-[3.4rem] sm:text-8xl lg:text-[10rem]">
              <Line delay={0.1}>The</Line>
              <Line delay={0.18} italic gold>
                UN of
              </Line>
              <Line delay={0.28}>Barbershops.</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease }}
              className="mt-10 max-w-md text-lg lg:text-xl text-ink-dim leading-relaxed"
            >
              Six chairs. Seventeen flags. One Newfoundland.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Magnetic strength={0.25}>
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-8 py-4 rounded-sm hover:bg-gold-bright transition-colors"
                >
                  Book a chair
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link
                  href="/concierge"
                  className="group inline-flex items-center justify-center gap-2 border border-gold/40 text-ink hover:border-gold hover:bg-gold/5 px-8 py-4 rounded-sm transition-colors"
                >
                  <Sparkles className="size-4 text-gold" />
                  Ask the concierge
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="lg:col-span-3 lg:text-right space-y-4 text-sm"
          >
            <Stat n="6" l="Locations" />
            <Stat n="17" l="Languages" />
            <Stat n="47k" l="Cuts since 2018" />
            <Stat n="4.9★" l="1,800+ reviews" />
          </motion.aside>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 text-[10px] tracking-eyebrow text-ink-mute flex flex-col items-center gap-2"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
  italic,
  gold,
}: {
  children: React.ReactNode;
  delay: number;
  italic?: boolean;
  gold?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease }}
        className={`block ${italic ? "italic" : ""} ${gold ? "shimmer" : "text-ink"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="border-t border-line pt-3">
      <div className="serif text-3xl text-gold gold-text">{n}</div>
      <div className="text-[10px] tracking-eyebrow text-ink-mute mt-0.5">
        {l}
      </div>
    </div>
  );
}
