import { WaitTimesBoard } from "@/components/wait/WaitTimesBoard";

export const metadata = {
  title: "Live Wait Times",
  description:
    "Real-time walk-in wait at all six 1949 Barber Shop locations across Newfoundland & Labrador. Refreshes every 60 seconds.",
};

export default function WaitTimesPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Live Wait Times</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display max-w-3xl">
          Walk-in waits.
          <br />
          <em className="text-gold">Live, every chair.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Refreshes every 60 seconds straight from the chair management system.
          Closed locations show their next opening.
        </p>
        <div className="mt-16">
          <WaitTimesBoard />
        </div>
      </div>
    </div>
  );
}
