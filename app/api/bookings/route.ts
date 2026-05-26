import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { bookingStore } from "@/lib/bookings/store";
import { getSlotsForDay } from "@/lib/bookings/availability";

const Schema = z.object({
  locationSlug: z.string(),
  serviceSlug: z.string(),
  barberSlug: z.string().nullable().optional(),
  startISO: z.string(),
  endISO: z.string(),
  customerName: z.string().min(2).max(80),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7).max(20),
  notes: z.string().max(280).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Confirm the slot is still available (basic conflict check).
  const start = new Date(data.startISO);
  const slots = await getSlotsForDay(
    data.locationSlug,
    data.serviceSlug,
    data.barberSlug ?? null,
    start,
  );
  const stillAvailable = slots.some((s) => s.startISO === data.startISO);
  if (!stillAvailable) {
    return NextResponse.json(
      { error: "slot_unavailable" },
      { status: 409 },
    );
  }

  const booking = await bookingStore.create({
    locationSlug: data.locationSlug,
    serviceSlug: data.serviceSlug,
    barberSlug: data.barberSlug ?? null,
    startISO: data.startISO,
    endISO: data.endISO,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    notes: data.notes,
  });

  // In production: send confirmation email + SMS here. Stubs left for clarity.
  // await sendConfirmationEmail(booking);
  // await sendConfirmationSMS(booking);

  return NextResponse.json({ booking });
}
