import { Smartphone, Bell, Wifi, MapPin } from "lucide-react";

export const metadata = { title: "Install on Phone" };

export default function Page() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Mobile</div>
      <h1 className="serif text-5xl tracking-display">One tap. Home screen.</h1>
      <p className="mt-6 text-lg text-ink-dim max-w-2xl">
        Install 1949 on your phone like an app. Booking opens in two seconds,
        even with no signal in The Battery. We&apos;ll cache your chair, your
        barber, and your last booking offline.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 gap-3">
        <Tile i={<Smartphone />} t="iOS · Add to Home Screen" d="Tap Share, then 'Add to Home Screen'." />
        <Tile i={<Smartphone />} t="Android · Install App" d="Tap the menu, then 'Install app'." />
        <Tile i={<Wifi />} t="Offline-first" d="Your booking confirmation works without signal." />
        <Tile i={<Bell />} t="Push reminders" d="Opt-in for one-tap rescheduling." />
        <Tile i={<MapPin />} t="Live wait times" d="See every chair at a glance." />
        <Tile i={<Smartphone />} t="Apple Wallet pass" d="Your booking lives in Wallet — coming soon." />
      </div>
    </div>
  );
}

function Tile({ i, t, d }: { i: React.ReactNode; t: string; d: string }) {
  return (
    <div className="border border-line rounded-sm bg-bg-elev/30 p-6">
      <div className="size-9 rounded-sm border border-gold/40 bg-gold/10 inline-grid place-items-center text-gold [&_svg]:size-4 mb-3">
        {i}
      </div>
      <div className="serif text-xl">{t}</div>
      <p className="text-sm text-ink-dim mt-2">{d}</p>
    </div>
  );
}
