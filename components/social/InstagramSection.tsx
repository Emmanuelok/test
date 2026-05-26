"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InstagramEmbed } from "./InstagramEmbed";

/**
 * Real posts from @1949barbers. Add a permalink to the list and a new tile
 * appears. To keep the layout balanced, supply 3 or 6.
 */
const posts: string[] = [
  "https://www.instagram.com/reel/C3dBPW3sNpd/",
  // Drop in additional public IG post / reel URLs here.
];

export function InstagramSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — Live · @1949barbers
            </div>
            <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
              From the chair,
              <br />
              <em className="text-gold">to your feed.</em>
            </h2>
          </motion.div>
          <a
            href="https://www.instagram.com/1949barbers/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-gold hover:text-gold-bright text-sm"
          >
            Follow @1949barbers <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {posts.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <InstagramEmbed url={url} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-ink-dim">
          New cuts posted weekly.{" "}
          <Link href="/gallery" className="text-gold hover:text-gold-bright">
            See the full portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
