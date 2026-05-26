import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { Sparkles, Languages, Calendar, MapPin, Award, MessageSquare } from "lucide-react";

export const metadata = {
  title: "AI Concierge",
  description:
    "Tell our AI concierge what you need — a cut, a barber, a chair near you, a gift. It'll handle the rest, in 17 languages.",
};

const capabilities = [
  { Icon: Calendar, t: "Books in 30 sec", d: "Picks the service, barber and slot from one sentence." },
  { Icon: MapPin, t: "Finds the closest chair", d: "Across all six locations in NL." },
  { Icon: Sparkles, t: "Recommends cuts", d: "By face shape, hair texture and preference." },
  { Icon: Languages, t: "17 languages", d: "Whatever you speak at the breakfast table." },
  { Icon: Award, t: "Knows your history", d: "Remembers your last cut and your favourite barber." },
  { Icon: MessageSquare, t: "Texts you reminders", d: "And reschedules if the weather turns." },
];

export default function ConciergePage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">
          — AI Concierge
        </div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display max-w-3xl">
          Tell us what you need.
          <br />
          <em className="text-gold">We&apos;ll handle the rest.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          A real concierge for a real barbershop — only smarter, faster, and
          available every minute of every day.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 border border-line rounded-sm bg-bg-elev/30 flex flex-col min-h-[600px] max-h-[80vh]">
          <ConciergeChat />
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 border border-line rounded-sm bg-bg-elev/30 p-6">
            <h3 className="serif text-2xl mb-6">What it can do</h3>
            <ul className="space-y-5">
              {capabilities.map((c) => (
                <li key={c.t} className="flex items-start gap-3">
                  <div className="size-8 shrink-0 rounded-sm border border-gold/40 bg-gold/5 inline-grid place-items-center text-gold">
                    <c.Icon className="size-4" />
                  </div>
                  <div>
                    <div className="font-medium text-ink text-sm">{c.t}</div>
                    <div className="text-xs text-ink-dim mt-0.5 leading-snug">
                      {c.d}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-line">
              <div className="text-[10px] tracking-eyebrow text-ink-mute">
                YOUR PRIVACY
              </div>
              <p className="text-xs text-ink-dim mt-2 leading-relaxed">
                Conversations stay between you and the shop. We don&apos;t sell
                your data and we don&apos;t train models on it. Period.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
