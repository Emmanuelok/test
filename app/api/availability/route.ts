import { NextRequest, NextResponse } from "next/server";
import { getSlotsForDay } from "@/lib/bookings/availability";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const location = sp.get("location");
  const service = sp.get("service");
  const barber = sp.get("barber");
  const dateStr = sp.get("date");
  if (!location || !service || !dateStr) {
    return NextResponse.json({ error: "missing params" }, { status: 400 });
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "bad date" }, { status: 400 });
  }
  const slots = await getSlotsForDay(location, service, barber || null, date);
  return NextResponse.json({ slots });
}
