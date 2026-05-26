import { BarberMatch } from "@/components/match/BarberMatch";

export const metadata = {
  title: "Barber Match",
  description:
    "Two questions, one perfect barber. We match you with the chair whose specialty fits your cut.",
};

export default function MatchPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Barber Match · AI</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display max-w-3xl">
          The right chair
          <br />
          <em className="text-gold">for the right head.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Two questions. We match you with the barber across all six locations
          whose specialty fits your cut — and we explain why.
        </p>
        <div className="mt-16">
          <BarberMatch />
        </div>
      </div>
    </div>
  );
}
