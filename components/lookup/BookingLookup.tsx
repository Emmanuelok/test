"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Check, X, Calendar, MapPin } from "lucide-react";
import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { format } from "date-fns";

type Booking = {
  ref: string;
  locationSlug: string;
  serviceSlug: string;
  startISO: string;
  customerName: string;
  status: "confirmed" | "cancelled" | "completed";
};

export function BookingLookup() {
  const [ref, setRef] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "found" | "missing" | "cancelled">("idle");
  const [booking, setBooking] = useState<Booking | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.trim()) return;
    setState("loading");
    try {
      const res = await fetch(`/api/bookings/lookup?ref=${encodeURIComponent(ref)}`);
      if (!res.ok) {
        setState("missing");
        setBooking(null);
        return;
      }
      const data = await res.json();
      setBooking(data.booking);
      setState(data.booking.status === "cancelled" ? "cancelled" : "found");
    } catch {
      setState("missing");
    }
  }

  async function cancel() {
    if (!booking) return;
    setState("loading");
    const res = await fetch("/api/bookings/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: booking.ref }),
    });
    if (res.ok) {
      setState("cancelled");
      setBooking({ ...booking, status: "cancelled" });
    }
  }

  const loc = booking ? locations.find((l) => l.slug === booking.locationSlug) : null;
  const svc = booking ? services.find((s) => s.slug === booking.serviceSlug) : null;

  return (
    <div>
      <form
        onSubmit={lookup}
        className="flex flex-col sm:flex-row gap-2 max-w-lg"
      >
        <div className="flex-1 flex items-center bg-bg-elev border border-line rounded-sm focus-within:border-gold/50">
          <span className="pl-4 text-ink-mute">
            <Search className="size-4" />
          </span>
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="1949-XK4F"
            className="flex-1 bg-transparent px-3 py-3 text-sm tabular-nums uppercase outline-none placeholder:text-ink-mute placeholder:normal-case"
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading" || !ref.trim()}
          className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright disabled:opacity-30"
        >
          {state === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Find"
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {state === "missing" && (
          <motion.div
            key="missing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-8 border border-danger/40 bg-danger/5 rounded-sm p-6"
          >
            <div className="text-danger text-sm">
              We couldn&apos;t find a booking with that code. Double-check the
              confirmation text we sent.
            </div>
          </motion.div>
        )}

        {(state === "found" || state === "cancelled") && booking && loc && svc && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 border rounded-sm p-8 ${
              state === "cancelled"
                ? "border-line bg-bg-elev/40"
                : "border-gold/40 bg-gold/5"
            }`}
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-[10px] tracking-eyebrow text-gold">
                {state === "cancelled" ? "CANCELLED" : "CONFIRMED"}
              </span>
              <span className="text-xs text-ink-mute tabular-nums">{booking.ref}</span>
            </div>
            <div className="serif text-3xl">Hi, {booking.customerName}.</div>
            <div className="mt-4 space-y-3 text-ink-dim">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-gold" />
                <span>
                  {format(new Date(booking.startISO), "EEEE, MMMM d")} at{" "}
                  {format(new Date(booking.startISO), "h:mm a")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-gold" />
                <span>
                  {loc.name} · {svc.name}
                </span>
              </div>
            </div>

            {state === "found" && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-5 py-2.5 rounded-sm hover:bg-gold-bright text-sm">
                  Reschedule
                </button>
                <button
                  onClick={cancel}
                  className="inline-flex items-center gap-2 border border-line hover:border-danger/40 hover:text-danger px-5 py-2.5 rounded-sm text-sm transition-colors"
                >
                  <X className="size-4" /> Cancel
                </button>
              </div>
            )}

            {state === "cancelled" && (
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-success">
                <Check className="size-4" /> Cancelled. We&apos;ve texted a
                confirmation.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
