/**
 * Booking storage adapter.
 *
 * In dev / Vercel preview we use an in-memory Map (module-scoped).
 * To productionise: swap `BookingStore` for a Postgres/Neon-backed implementation
 * (drop-in — same async interface). The booking *logic* (slot generation,
 * conflict checks) is storage-agnostic.
 */

import { nanoid } from "nanoid";

export type Booking = {
  id: string;
  ref: string; // human-friendly confirmation, e.g. "1949-XK4F"
  locationSlug: string;
  serviceSlug: string;
  barberSlug: string | null; // null = any barber
  startISO: string;
  endISO: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: string;
};

const store = new Map<string, Booking>();

export interface BookingStore {
  create(b: Omit<Booking, "id" | "ref" | "createdAt" | "status">): Promise<Booking>;
  findByRef(ref: string): Promise<Booking | null>;
  listByLocationAndDay(locationSlug: string, dayISO: string): Promise<Booking[]>;
  cancel(ref: string): Promise<Booking | null>;
}

export const bookingStore: BookingStore = {
  async create(input) {
    const id = nanoid();
    const ref = "1949-" + nanoid(4).toUpperCase();
    const booking: Booking = {
      ...input,
      id,
      ref,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    store.set(id, booking);
    return booking;
  },
  async findByRef(ref) {
    for (const b of store.values()) if (b.ref === ref) return b;
    return null;
  },
  async listByLocationAndDay(locationSlug, dayISO) {
    const day = dayISO.slice(0, 10);
    return [...store.values()].filter(
      (b) =>
        b.locationSlug === locationSlug &&
        b.startISO.slice(0, 10) === day &&
        b.status === "confirmed",
    );
  },
  async cancel(ref) {
    for (const b of store.values()) {
      if (b.ref === ref) {
        b.status = "cancelled";
        return b;
      }
    }
    return null;
  },
};
