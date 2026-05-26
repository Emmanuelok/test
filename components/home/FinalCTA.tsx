import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative border-t border-line py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-gold/5 blur-3xl rounded-full" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="tracking-eyebrow text-[10px] text-gold mb-6">
          — The chair is open
        </div>
        <h2 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Your next great cut
          <br />
          is <em className="text-gold">thirty seconds</em> away.
        </h2>
        <p className="mt-8 text-lg text-ink-dim max-w-xl mx-auto">
          Book online, walk in, or just ask our AI concierge what you need.
          Six locations across Newfoundland are ready when you are.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-8 py-4 rounded-sm hover:bg-gold-bright transition-colors"
          >
            Book a chair
          </Link>
          <Link
            href="/concierge"
            className="inline-flex items-center justify-center gap-2 border border-gold/40 hover:border-gold hover:bg-gold/5 px-8 py-4 rounded-sm transition-colors"
          >
            <Sparkles className="size-4 text-gold" />
            Ask the concierge
          </Link>
        </div>
      </div>
    </section>
  );
}
