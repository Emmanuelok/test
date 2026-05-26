"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Scissors,
  User,
  Calendar,
  Loader2,
} from "lucide-react";
import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { barbers, barbersForLocation } from "@/lib/data/barbers";
import { formatCAD, formatDuration, cn } from "@/lib/utils";
import { format } from "date-fns";

type Step = "location" | "service" | "barber" | "time" | "details" | "done";
const STEPS: Step[] = ["location", "service", "barber", "time", "details", "done"];

type Slot = {
  startISO: string;
  endISO: string;
  label: string;
  chairsLeft: number;
};

export function BookingFlow() {
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState<Step>("location");
  const [locationSlug, setLocationSlug] = useState<string | null>(params.get("location"));
  const [serviceSlug, setServiceSlug] = useState<string | null>(params.get("service"));
  const [barberSlug, setBarberSlug] = useState<string | null>(params.get("barber"));
  const [date, setDate] = useState<Date>(new Date());
  const [slot, setSlot] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const loc = locations.find((l) => l.slug === locationSlug);
  const svc = services.find((s) => s.slug === serviceSlug);
  const barber = barbers.find((b) => b.slug === barberSlug);

  // Auto-advance if pre-filled from query string.
  useEffect(() => {
    if (locationSlug && step === "location") setStep("service");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch slots whenever location/service/barber/date change.
  useEffect(() => {
    if (!locationSlug || !serviceSlug || step !== "time") return;
    let cancelled = false;
    setLoadingSlots(true);
    const qs = new URLSearchParams({
      location: locationSlug,
      service: serviceSlug,
      date: date.toISOString(),
    });
    if (barberSlug) qs.set("barber", barberSlug);
    fetch(`/api/availability?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSlots(data.slots ?? []);
      })
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [locationSlug, serviceSlug, barberSlug, date, step]);

  const stepIndex = STEPS.indexOf(step);
  const progress = (stepIndex / (STEPS.length - 1)) * 100;

  const canNext = useMemo(() => {
    switch (step) {
      case "location":
        return !!locationSlug;
      case "service":
        return !!serviceSlug;
      case "barber":
        return true; // optional
      case "time":
        return !!slot;
      case "details":
        return (
          details.name.trim().length > 1 &&
          /\S+@\S+\.\S+/.test(details.email) &&
          details.phone.replace(/\D/g, "").length >= 7
        );
      default:
        return false;
    }
  }, [step, locationSlug, serviceSlug, slot, details]);

  function next() {
    if (step === "details") return submit();
    setStep(STEPS[stepIndex + 1]);
  }

  function back() {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  }

  async function submit() {
    if (!locationSlug || !serviceSlug || !slot) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationSlug,
          serviceSlug,
          barberSlug,
          startISO: slot.startISO,
          endISO: slot.endISO,
          customerName: details.name,
          customerEmail: details.email,
          customerPhone: details.phone,
          notes: details.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error === "slot_unavailable"
          ? "That slot was just taken. Pick another time."
          : "Couldn't save your booking. Try again.");
        if (data.error === "slot_unavailable") setStep("time");
        return;
      }
      setBookingRef(data.booking.ref);
      setStep("done");
    } catch {
      setErr("Network hiccup. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const eligibleBarbers = locationSlug ? barbersForLocation(locationSlug) : [];

  return (
    <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      <div className="lg:col-span-8">
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs tracking-eyebrow text-ink-mute mb-3">
            <span>
              Step {Math.min(stepIndex + 1, STEPS.length - 1)} of {STEPS.length - 1}
            </span>
            <span className="text-gold">{stepLabel(step)}</span>
          </div>
          <div className="h-1 bg-bg-elev rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === "location" && (
          <StepCard title="Where would you like to be cut?" subtitle="Pick the chair closest to you. Walk-ins are welcome at all six.">
            <div className="grid sm:grid-cols-2 gap-3">
              {locations.map((l) => (
                <button
                  key={l.slug}
                  onClick={() => setLocationSlug(l.slug)}
                  className={cn(
                    "text-left p-5 rounded-sm border transition-all",
                    locationSlug === l.slug
                      ? "border-gold bg-gold/5"
                      : "border-line hover:border-gold/40 bg-bg-elev/30",
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <MapPin className="size-4 text-gold" />
                    {locationSlug === l.slug && <Check className="size-4 text-gold" />}
                  </div>
                  <div className="serif text-xl">{l.name}</div>
                  <div className="text-xs text-ink-dim mt-1">{l.address}</div>
                  <div className="text-xs text-ink-mute mt-3 tracking-eyebrow">
                    {l.chairs} CHAIRS · {l.city.toUpperCase()}
                  </div>
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {step === "service" && (
          <StepCard title="What can we do for you?" subtitle="Pick a service — you can change it at the chair if you change your mind.">
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setServiceSlug(s.slug)}
                  className={cn(
                    "text-left p-5 rounded-sm border transition-all relative",
                    serviceSlug === s.slug
                      ? "border-gold bg-gold/5"
                      : "border-line hover:border-gold/40 bg-bg-elev/30",
                  )}
                >
                  {s.signature && (
                    <span className="absolute -top-2 left-4 text-[9px] tracking-eyebrow text-gold bg-bg border border-gold/40 px-2 py-0.5 rounded">
                      SIGNATURE
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <Scissors className="size-4 text-gold" />
                    {serviceSlug === s.slug && <Check className="size-4 text-gold" />}
                  </div>
                  <div className="mt-2 serif text-lg leading-tight">{s.name}</div>
                  <div className="text-xs text-ink-dim mt-1">{s.tagline}</div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-gold tabular-nums">{formatCAD(s.priceCad)}</span>
                    <span className="text-[10px] tracking-eyebrow text-ink-mute">
                      {formatDuration(s.durationMin)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {step === "barber" && (
          <StepCard
            title="Any barber preference?"
            subtitle={`Optional — skip to let us pick the next open chair at ${loc?.short ?? "your location"}.`}
          >
            <button
              onClick={() => setBarberSlug(null)}
              className={cn(
                "w-full text-left p-5 rounded-sm border mb-3 transition-all",
                barberSlug === null
                  ? "border-gold bg-gold/5"
                  : "border-line hover:border-gold/40 bg-bg-elev/30",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="serif text-lg">Any available barber</div>
                  <div className="text-xs text-ink-dim mt-1">
                    Fastest. We&apos;ll pair you with the next open chair.
                  </div>
                </div>
                {barberSlug === null && <Check className="size-4 text-gold" />}
              </div>
            </button>
            <div className="grid sm:grid-cols-2 gap-3">
              {eligibleBarbers.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setBarberSlug(b.slug)}
                  className={cn(
                    "text-left p-5 rounded-sm border transition-all",
                    barberSlug === b.slug
                      ? "border-gold bg-gold/5"
                      : "border-line hover:border-gold/40 bg-bg-elev/30",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="serif text-lg">{b.name}</div>
                      <div className="text-xs text-ink-dim mt-1">
                        {b.title} · {b.fromFlag} {b.from}
                      </div>
                    </div>
                    {barberSlug === b.slug && <Check className="size-4 text-gold" />}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {b.specialties.slice(0, 3).map((sp) => (
                      <span
                        key={sp}
                        className="text-[10px] tracking-eyebrow text-ink-mute border border-line px-2 py-0.5 rounded-sm"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {step === "time" && (
          <StepCard title="When works for you?" subtitle="Pick a day, then a time. Slots refresh in real-time.">
            <DateStrip date={date} setDate={setDate} />
            <div className="mt-6">
              {loadingSlots ? (
                <div className="py-10 text-center text-ink-mute flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Loading slots…
                </div>
              ) : slots.length === 0 ? (
                <div className="py-10 text-center text-ink-dim">
                  No openings on this day. Try another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                  {slots.map((s) => {
                    const selected = slot?.startISO === s.startISO;
                    return (
                      <button
                        key={s.startISO}
                        onClick={() => setSlot(s)}
                        className={cn(
                          "p-3 rounded-sm border text-sm tabular-nums transition-all",
                          selected
                            ? "border-gold bg-gold/15 text-gold"
                            : "border-line hover:border-gold/40",
                        )}
                      >
                        {s.label}
                        <div className="text-[9px] text-ink-mute mt-0.5">
                          {s.chairsLeft} {s.chairsLeft === 1 ? "chair" : "chairs"} left
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </StepCard>
        )}

        {step === "details" && (
          <StepCard title="Last bit — your details." subtitle="So we can text you a confirmation and a reminder. We don't share these.">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Your name"
                value={details.name}
                onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                placeholder="Jordan Walsh"
              />
              <Input
                label="Phone"
                value={details.phone}
                onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                placeholder="(709) 555-0149"
              />
              <Input
                label="Email"
                value={details.email}
                onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                placeholder="jordan@example.ca"
                className="sm:col-span-2"
              />
              <Input
                label="Anything we should know? (optional)"
                value={details.notes}
                onChange={(v) => setDetails((d) => ({ ...d, notes: v }))}
                placeholder="First time here — looking for a low fade with texture on top."
                multiline
                className="sm:col-span-2"
              />
            </div>
            {err && <div className="mt-4 text-sm text-danger">{err}</div>}
          </StepCard>
        )}

        {step === "done" && bookingRef && (
          <div className="border border-gold/40 bg-gold/5 rounded-sm p-8 text-center">
            <div className="mx-auto size-16 rounded-full bg-gold/15 border border-gold/40 inline-grid place-items-center mb-6">
              <Check className="size-8 text-gold" />
            </div>
            <div className="tracking-eyebrow text-[10px] text-gold mb-2">
              Confirmed
            </div>
            <h2 className="serif text-3xl">You&apos;re in.</h2>
            <p className="text-ink-dim mt-3 max-w-md mx-auto">
              We&apos;ve texted and emailed a confirmation to {details.email}.
              See you at <strong>{loc?.name}</strong> on{" "}
              <strong>{slot && format(new Date(slot.startISO), "EEE, MMM d 'at' h:mm a")}</strong>.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-gold/40 px-4 py-3 rounded-sm">
              <span className="text-xs tracking-eyebrow text-ink-mute">CONFIRMATION</span>
              <span className="serif text-xl text-gold tabular-nums">{bookingRef}</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-line hover:border-gold/40 px-6 py-3 rounded-sm"
              >
                Back to home
              </a>
              <a
                href="/account"
                className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright"
              >
                See it in my account
              </a>
            </div>
          </div>
        )}

        {step !== "done" && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1 text-ink-dim hover:text-ink disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
            <button
              onClick={next}
              disabled={!canNext || submitting}
              className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Booking…
                </>
              ) : step === "details" ? (
                <>Confirm booking</>
              ) : (
                <>
                  Continue <ChevronRight className="size-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-24 border border-line rounded-sm bg-bg-elev/40 p-6">
          <div className="tracking-eyebrow text-[10px] text-gold mb-4">
            — Your booking
          </div>
          <Summary
            location={loc?.name}
            service={svc?.name}
            servicePrice={svc?.priceCad}
            serviceDuration={svc?.durationMin}
            barber={barber?.name ?? (barberSlug === null && step !== "location" && step !== "service" ? "Any available" : undefined)}
            time={slot ? format(new Date(slot.startISO), "EEE, MMM d · h:mm a") : undefined}
          />
        </div>
      </aside>
    </div>
  );
}

function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="serif text-3xl lg:text-4xl tracking-display">{title}</h2>
      {subtitle && <p className="mt-2 text-ink-dim max-w-2xl">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function DateStrip({ date, setDate }: { date: Date; setDate: (d: Date) => void }) {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++)
    days.push(new Date(today.getTime() + i * 86400000));

  return (
    <div className="no-scrollbar overflow-x-auto -mx-2 px-2">
      <div className="flex gap-2 min-w-max">
        {days.map((d) => {
          const selected = d.toDateString() === date.toDateString();
          const isToday = d.toDateString() === today.toDateString();
          return (
            <button
              key={d.toISOString()}
              onClick={() => setDate(d)}
              className={cn(
                "shrink-0 w-16 p-3 rounded-sm border transition-all text-center",
                selected
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-line hover:border-gold/40",
              )}
            >
              <div className="text-[10px] tracking-eyebrow text-ink-mute">
                {isToday ? "TODAY" : format(d, "EEE").toUpperCase()}
              </div>
              <div className={cn("serif text-2xl mt-1", selected && "text-gold")}>
                {format(d, "d")}
              </div>
              <div className="text-[10px] tracking-eyebrow text-ink-mute">
                {format(d, "MMM").toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="text-xs tracking-eyebrow text-ink-mute mb-2">{label}</div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none resize-none placeholder:text-ink-mute"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none placeholder:text-ink-mute"
        />
      )}
    </label>
  );
}

function Summary(props: {
  location?: string;
  service?: string;
  servicePrice?: number;
  serviceDuration?: number;
  barber?: string;
  time?: string;
}) {
  const empty = !props.location && !props.service && !props.time;
  return (
    <div className="space-y-4 text-sm">
      <Row icon={<MapPin className="size-3.5" />} label="Location" value={props.location} />
      <Row icon={<Scissors className="size-3.5" />} label="Service" value={props.service} />
      <Row icon={<User className="size-3.5" />} label="Barber" value={props.barber} />
      <Row icon={<Calendar className="size-3.5" />} label="When" value={props.time} />
      {props.servicePrice && (
        <div className="pt-4 mt-4 border-t border-line flex items-baseline justify-between">
          <span className="text-ink-mute text-xs tracking-eyebrow">TOTAL</span>
          <span className="serif text-2xl text-gold">
            {formatCAD(props.servicePrice)}
          </span>
        </div>
      )}
      {empty && (
        <p className="text-ink-mute text-xs">Pick a chair to get started.</p>
      )}
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-7 rounded-sm border border-line inline-grid place-items-center text-gold mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] tracking-eyebrow text-ink-mute">{label}</div>
        <div className="text-sm text-ink truncate">{value ?? "—"}</div>
      </div>
    </div>
  );
}

function stepLabel(s: Step) {
  switch (s) {
    case "location":
      return "LOCATION";
    case "service":
      return "SERVICE";
    case "barber":
      return "BARBER";
    case "time":
      return "DATE & TIME";
    case "details":
      return "YOUR DETAILS";
    case "done":
      return "CONFIRMED";
  }
}
