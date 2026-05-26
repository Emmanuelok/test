import Link from "next/link";
import { Bell, MessageSquare, Mail, Calendar } from "lucide-react";

export const metadata = { title: "Smart Reminders" };

export default function Page() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Smart Reminders</div>
      <h1 className="serif text-5xl tracking-display">A nudge when it&apos;s time. Not a minute before.</h1>
      <p className="mt-6 text-lg text-ink-dim max-w-2xl">
        We learn your cadence. When it&apos;s time for the next cut, we text
        you three slots that fit your usual week. If the weather turns the day
        of your appointment, we offer to reschedule — one tap.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 gap-3">
        {[
          { i: <Calendar />, t: "Booking confirmation", d: "Texted + emailed the second you book." },
          { i: <Bell />, t: "Day-of reminder", d: "Two hours before your chair." },
          { i: <MessageSquare />, t: "Time-for-your-next-cut", d: "Personalised to your typical cadence." },
          { i: <Mail />, t: "Birthday cut", d: "Once a year — on us." },
        ].map((x) => (
          <div key={x.t} className="border border-line rounded-sm bg-bg-elev/30 p-6">
            <div className="size-9 rounded-sm border border-gold/40 bg-gold/10 inline-grid place-items-center text-gold [&_svg]:size-4 mb-3">
              {x.i}
            </div>
            <div className="serif text-xl">{x.t}</div>
            <p className="text-sm text-ink-dim mt-2">{x.d}</p>
          </div>
        ))}
      </div>
      <Link href="/account" className="mt-12 inline-flex items-center gap-2 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright">
        Manage in my account
      </Link>
    </div>
  );
}
