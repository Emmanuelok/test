"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Scissors,
  UserSearch,
  Clock,
  Languages,
  CalendarClock,
  Award,
  Mic,
  Users,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/motion/Spotlight";

type Tool = {
  href: string;
  title: string;
  blurb: string;
  Icon: React.ComponentType<{ className?: string }>;
  size: "lg" | "md" | "sm";
  tag: string;
  accent?: boolean;
};

const tools: Tool[] = [
  {
    href: "/concierge",
    title: "AI Concierge",
    blurb: "One sentence in. A confirmed booking out.",
    Icon: Sparkles,
    size: "lg",
    tag: "Smart Booking",
    accent: true,
  },
  {
    href: "/style-studio",
    title: "Style Studio",
    blurb: "Eight cuts ranked for your face shape.",
    Icon: Scissors,
    size: "md",
    tag: "Visual AI",
  },
  {
    href: "/match",
    title: "Barber Match™",
    blurb: "Two questions. One perfect chair.",
    Icon: UserSearch,
    size: "md",
    tag: "Personal",
  },
  {
    href: "/wait-times",
    title: "Live Wait",
    blurb: "Every chair, every minute.",
    Icon: Clock,
    size: "sm",
    tag: "Live",
  },
  {
    href: "/walk-in",
    title: "Virtual Queue",
    blurb: "Join from your phone. Skip the lobby.",
    Icon: Users,
    size: "sm",
    tag: "Walk-Ins",
  },
  {
    href: "/concierge",
    title: "17 Languages",
    blurb: "Speak yours — we answer in it.",
    Icon: Languages,
    size: "sm",
    tag: "Inclusive",
  },
  {
    href: "/concierge?voice=1",
    title: "Voice Booking",
    blurb: "Press, speak, done.",
    Icon: Mic,
    size: "sm",
    tag: "Hands-Free",
  },
  {
    href: "/account",
    title: "Auto Re-book",
    blurb: "We learn your cadence.",
    Icon: CalendarClock,
    size: "sm",
    tag: "Predictive",
  },
  {
    href: "/club",
    title: "Cut Club",
    blurb: "Unlimited chairs. One monthly price.",
    Icon: Repeat,
    size: "sm",
    tag: "Subscription",
  },
  {
    href: "/loyalty",
    title: "Rewards",
    blurb: "Every cut earns Chairs.",
    Icon: Award,
    size: "sm",
    tag: "Loyalty",
  },
];

export function AIShowcase() {
  return (
    <section className="py-24 lg:py-32 border-t border-line relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — 2026 Toolkit
            </div>
            <h2 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display max-w-3xl">
              Smartest tools
              <br />
              behind a chair.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-xs text-ink-dim leading-relaxed"
          >
            None of these exist on another barbershop site in Canada.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-3">
          {tools.map((t, i) => (
            <ToolCard key={t.href + i} tool={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const span =
    tool.size === "lg"
      ? "col-span-2 row-span-2"
      : tool.size === "md"
        ? "col-span-2 row-span-1"
        : "col-span-1 row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.05,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={span}
    >
      <Link href={tool.href} className="block h-full">
        <Spotlight
          className={cn(
            "h-full rounded-sm border p-5 lg:p-6 flex flex-col justify-between transition-all hover:-translate-y-0.5",
            tool.accent
              ? "border-gold/50 bg-gradient-to-br from-gold/10 to-transparent hover:border-gold"
              : "border-line bg-bg-elev/60 hover:border-gold/40",
          )}
        >
          <div className="relative flex items-start justify-between">
            <div
              className={cn(
                "inline-grid place-items-center size-10 rounded-sm border",
                tool.accent
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-line text-ink-dim",
              )}
            >
              <tool.Icon className="size-4" />
            </div>
            <span className="text-[9px] tracking-eyebrow text-ink-mute">
              {tool.tag}
            </span>
          </div>

          <div className="relative">
            <h3
              className={cn(
                "font-semibold leading-tight",
                tool.size === "lg" ? "text-3xl serif" : "text-base",
              )}
            >
              {tool.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-ink-dim leading-snug",
                tool.size === "lg" ? "text-lg max-w-xs" : "text-xs",
              )}
            >
              {tool.blurb}
            </p>
          </div>
        </Spotlight>
      </Link>
    </motion.div>
  );
}
