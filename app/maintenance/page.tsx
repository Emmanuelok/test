"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export default function MaintenancePage() {
  return (
    // position: fixed + high z-index covers any chrome (header/footer/concierge)
    // that the root layout renders, so the maintenance screen dominates without
    // requiring us to refactor the site shell.
    <div className="grain fixed inset-0 z-[300] flex flex-col items-center justify-center px-6 py-16 text-center bg-bg text-ink overflow-y-auto">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] bg-gold/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-12"
      >
        <div className="spin-slow">
          <Logo size={200} />
        </div>
        <div className="absolute inset-8 blur-3xl bg-gold/15 -z-10 rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="tracking-eyebrow text-[10px] text-gold mb-6"
      >
        — UNDER CONSTRUCTION 🚧
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="serif text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-display max-w-3xl"
      >
        We&apos;re sharpening
        <br />
        <em className="text-gold">the blades.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-md text-lg text-ink-dim leading-relaxed"
      >
        Something new is on the way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 pt-8 border-t border-line max-w-md w-full"
      >
        <div className="text-[10px] tracking-eyebrow text-ink-mute">
          IN THE MEANTIME · CALL OR FOLLOW
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-ink-dim">
          <a href="tel:+17095762425" className="hover:text-gold transition-colors">
            (709) 576-2425
          </a>
          <span className="text-gold">·</span>
          <a
            href="https://www.instagram.com/1949barbers/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            @1949barbers
          </a>
        </div>
      </motion.div>
    </div>
  );
}
