import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = {
  title: "Book a chair",
  description:
    "Book your next cut at any of six 1949 Barber Shop locations across Newfoundland — Topsail Rd, Torbay Rd, Freshwater, CBS, Mt. Pearl, Gander.",
};

export default function BookPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Booking</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display">
          Find your chair.
        </h1>
      </div>
      <Suspense fallback={<div className="max-w-6xl mx-auto text-ink-dim">Loading…</div>}>
        <BookingFlow />
      </Suspense>
    </div>
  );
}
