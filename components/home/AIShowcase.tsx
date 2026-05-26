import Link from "next/link";
import {
  Sparkles,
  Scissors,
  UserSearch,
  Clock,
  Languages,
  CalendarClock,
  Award,
  CircleDollarSign,
  Bell,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    blurb:
      "Tell us what you want in plain English. The concierge picks the right service, the right barber, the closest chair, and books it — all in one chat.",
    Icon: Sparkles,
    size: "lg",
    tag: "Smart Booking",
    accent: true,
  },
  {
    href: "/style-studio",
    title: "Style Studio",
    blurb:
      "Upload a selfie. We read your face shape and hair texture and walk you through eight cuts that suit you — with side-by-side previews.",
    Icon: Scissors,
    size: "md",
    tag: "Visual AI",
  },
  {
    href: "/match",
    title: "Barber Match™",
    blurb:
      "A two-question quiz pairs you with the barber whose specialty matches your cut.",
    Icon: UserSearch,
    size: "md",
    tag: "Personalization",
  },
  {
    href: "/wait-times",
    title: "Live Wait Times",
    blurb:
      "Real wait at every chair, every location, refreshed every 60 seconds. Walk in when it's quiet.",
    Icon: Clock,
    size: "sm",
    tag: "Live",
  },
  {
    href: "/concierge?lang=auto",
    title: "17 Languages",
    blurb:
      "Concierge speaks the language of every chair: English, French, Spanish, Arabic, Tagalog, Twi, Italian, Punjabi, and 9 more.",
    Icon: Languages,
    size: "sm",
    tag: "Inclusive",
  },
  {
    href: "/account",
    title: "Auto-Rebook",
    blurb:
      "We learn your cadence. When it's time for your next fade, we text you three slots that fit your week.",
    Icon: CalendarClock,
    size: "sm",
    tag: "Predictive",
  },
  {
    href: "/loyalty",
    title: "1949 Rewards",
    blurb:
      "Every visit earns Chairs — redeem for free cuts, beard work or the Full 1949 package.",
    Icon: Award,
    size: "sm",
    tag: "Loyalty",
  },
  {
    href: "/gift-cards",
    title: "Digital Gift Cards",
    blurb:
      "Send a 1949 gift card by text in 30 seconds. Redeemable at every location and every chair.",
    Icon: CircleDollarSign,
    size: "sm",
    tag: "Gifting",
  },
  {
    href: "/notifications",
    title: "Smart Reminders",
    blurb:
      "Driving in from Bay Roberts? Get a heads-up before your slot — and a one-tap reschedule if the weather turns.",
    Icon: Bell,
    size: "sm",
    tag: "SMS · Email",
  },
  {
    href: "/app",
    title: "PWA — Install on Phone",
    blurb:
      "One tap to book from your home screen, even with no signal in The Battery.",
    Icon: Smartphone,
    size: "sm",
    tag: "Offline-First",
  },
];

export function AIShowcase() {
  return (
    <section id="ai" className="py-24 lg:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="tracking-eyebrow text-[10px] text-gold mb-4">
              — Built for 2026
            </div>
            <h2 className="serif text-5xl lg:text-6xl leading-[0.95] tracking-display max-w-3xl">
              The smartest tools
              <br />
              ever put behind a chair.
            </h2>
          </div>
          <p className="max-w-md text-ink-dim leading-relaxed">
            Most barbershops give you a phone number. We&apos;ve built a tool
            for every decision a customer makes — before, during, and after the
            chair. None of these exist anywhere else in Newfoundland.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-3">
          {tools.map((t) => (
            <ToolCard key={t.href} tool={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const span =
    tool.size === "lg"
      ? "col-span-2 row-span-2"
      : tool.size === "md"
        ? "col-span-2 row-span-1"
        : "col-span-1 row-span-1";

  return (
    <Link
      href={tool.href}
      className={cn(
        "group relative overflow-hidden rounded-sm border bg-bg-elev/60 hover:bg-bg-elev transition-all p-5 lg:p-6 flex flex-col justify-between",
        tool.accent ? "border-gold/40 hover:border-gold" : "border-line hover:border-gold/40",
        span,
      )}
    >
      {tool.accent && (
        <div className="absolute -top-20 -right-20 size-48 bg-gold/10 blur-3xl rounded-full" />
      )}
      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "inline-grid place-items-center size-10 rounded-sm border",
            tool.accent
              ? "border-gold/50 bg-gold/10 text-gold"
              : "border-line text-ink-dim group-hover:text-gold group-hover:border-gold/40",
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
            tool.size === "lg" ? "text-2xl serif" : "text-base",
          )}
        >
          {tool.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-ink-dim leading-snug",
            tool.size === "lg" ? "text-base max-w-md" : "text-xs",
          )}
        >
          {tool.blurb}
        </p>
      </div>
    </Link>
  );
}
