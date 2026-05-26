import { locations, type Location } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { barbersForLocation } from "@/lib/data/barbers";
import { bookingStore } from "@/lib/bookings/store";

const SLOT_GRID_MIN = 15; // 15-minute booking grid

export type Slot = {
  startISO: string;
  endISO: string;
  label: string; // "10:15 am"
  chairsLeft: number;
};

function dayHours(loc: Location, date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;
  const dayName = days[date.getDay()];
  return loc.hours.find((h) => h.day === dayName);
}

function setTime(d: Date, hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const out = new Date(d);
  out.setHours(h, m, 0, 0);
  return out;
}

function fmt(d: Date) {
  const am = d.getHours() < 12;
  const h12 = d.getHours() % 12 === 0 ? 12 : d.getHours() % 12;
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${h12}:${mm} ${am ? "am" : "pm"}`;
}

export async function getSlotsForDay(
  locationSlug: string,
  serviceSlug: string,
  barberSlug: string | null,
  date: Date,
): Promise<Slot[]> {
  const loc = locations.find((l) => l.slug === locationSlug);
  const svc = services.find((s) => s.slug === serviceSlug);
  if (!loc || !svc) return [];

  const hrs = dayHours(loc, date);
  if (!hrs || hrs.open === null) return [];

  const open = setTime(date, hrs.open!);
  const close = setTime(date, hrs.close!);
  const totalChairs = barberSlug
    ? 1
    : barbersForLocation(locationSlug).length || loc.chairs;

  const dayISO = date.toISOString().slice(0, 10);
  const existing = await bookingStore.listByLocationAndDay(locationSlug, dayISO);

  const slots: Slot[] = [];
  const now = Date.now();

  for (
    let t = new Date(open);
    t.getTime() + svc.durationMin * 60_000 <= close.getTime();
    t = new Date(t.getTime() + SLOT_GRID_MIN * 60_000)
  ) {
    // Skip past-time slots if today.
    if (t.getTime() < now + 30 * 60_000) continue;

    const slotEnd = new Date(t.getTime() + svc.durationMin * 60_000);
    let overlapping = 0;
    for (const b of existing) {
      if (barberSlug && b.barberSlug !== barberSlug) continue;
      const bStart = new Date(b.startISO).getTime();
      const bEnd = new Date(b.endISO).getTime();
      if (bStart < slotEnd.getTime() && bEnd > t.getTime()) overlapping++;
    }
    const chairsLeft = Math.max(0, totalChairs - overlapping);
    if (chairsLeft === 0) continue;

    slots.push({
      startISO: t.toISOString(),
      endISO: slotEnd.toISOString(),
      label: fmt(t),
      chairsLeft,
    });
  }

  return slots;
}

export function nextNDays(n: number) {
  const out: Date[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    out.push(new Date(start.getTime() + i * 86400000));
  }
  return out;
}
