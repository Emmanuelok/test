import { BookingLookup } from "@/components/lookup/BookingLookup";

export const metadata = {
  title: "Find My Booking",
  description: "Look up, reschedule or cancel a booking by confirmation code.",
};

export default function LookupPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Find my booking</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          Your code.
          <br />
          <em className="text-gold">Your chair.</em>
        </h1>
        <p className="mt-6 text-ink-dim text-lg">
          Type the code we texted you (looks like 1949-XK4F). View, reschedule
          or cancel — no account needed.
        </p>
        <div className="mt-12">
          <BookingLookup />
        </div>
      </div>
    </div>
  );
}
