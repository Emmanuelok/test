import { VirtualQueue } from "@/components/walkin/VirtualQueue";

export const metadata = {
  title: "Virtual Walk-In Queue",
  description:
    "Hold your spot from your phone. Join the walk-in line at any 1949 chair and we'll text you when you're up.",
};

export default function WalkInPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Virtual Queue</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          Skip the lobby.
          <br />
          <em className="text-gold">Hold your spot.</em>
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          Join the walk-in line from your phone. We&apos;ll text you when
          you&apos;re ten minutes out.
        </p>
        <div className="mt-16">
          <VirtualQueue />
        </div>
      </div>
    </div>
  );
}
