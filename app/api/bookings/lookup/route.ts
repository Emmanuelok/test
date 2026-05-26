import { NextRequest, NextResponse } from "next/server";
import { bookingStore } from "@/lib/bookings/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "missing ref" }, { status: 400 });
  const b = await bookingStore.findByRef(ref.toUpperCase().trim());
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });
  // Redact phone/email for privacy on lookup.
  return NextResponse.json({
    booking: {
      ref: b.ref,
      locationSlug: b.locationSlug,
      serviceSlug: b.serviceSlug,
      barberSlug: b.barberSlug,
      startISO: b.startISO,
      endISO: b.endISO,
      customerName: b.customerName.split(" ")[0],
      status: b.status,
    },
  });
}

export async function POST(req: NextRequest) {
  const { ref } = await req.json();
  if (!ref) return NextResponse.json({ error: "missing ref" }, { status: 400 });
  const b = await bookingStore.cancel(String(ref).toUpperCase().trim());
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ booking: b });
}
