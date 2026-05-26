import Link from "next/link";
import { WorldMap } from "@/components/home/WorldMap";
import { Sparkles, ChevronRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <WorldMap />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="flex items-center gap-3 mb-8">
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="tracking-eyebrow text-[10px] text-gold">
            Since 2018 · Newfoundland &amp; Labrador
          </span>
          <div className="flex-1 h-px bg-line max-w-32" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="serif font-medium leading-[0.95] tracking-display text-5xl sm:text-7xl lg:text-[7.5rem]">
              <span className="block text-ink">The</span>
              <span className="block italic">
                <span className="shimmer">UN of</span>
              </span>
              <span className="block text-ink">Barbershops.</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg text-ink-dim leading-relaxed">
              Six chairs across Newfoundland. Seventeen nationalities behind
              them. One precise, hot-towel, scissor-over-comb craft passed
              between every barber in the room.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-7 py-4 rounded-sm hover:bg-gold-bright transition-colors"
              >
                Book a chair
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/concierge"
                className="group inline-flex items-center justify-center gap-2 border border-gold/40 text-ink hover:border-gold hover:bg-gold/5 px-7 py-4 rounded-sm transition-colors"
              >
                <Sparkles className="size-4 text-gold" />
                Ask our AI concierge
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-ink-mute tracking-eyebrow">
              <span>30-Sec Booking</span>
              <span className="text-gold">·</span>
              <span>Walk-Ins Welcome</span>
              <span className="text-gold">·</span>
              <span>All Hair Types</span>
              <span className="text-gold">·</span>
              <span>As Featured On CBC</span>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="relative">
              <Logo size={280} className="spin-slow" />
              <div className="absolute inset-0 blur-3xl bg-gold/10 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
