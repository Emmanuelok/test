"use client";

import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Check, Send } from "lucide-react";
import { cn, formatCAD } from "@/lib/utils";

const AMOUNTS = [25, 45, 65, 95, 150, 250];

export function GiftCardComposer() {
  const [amount, setAmount] = useState(45);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="max-w-xl mx-auto text-center border border-gold/40 bg-gold/5 rounded-sm p-10">
        <div className="mx-auto size-16 rounded-full bg-gold/15 border border-gold/40 inline-grid place-items-center mb-6">
          <Check className="size-8 text-gold" />
        </div>
        <h2 className="serif text-3xl">Sent.</h2>
        <p className="text-ink-dim mt-3">
          {to || "Your recipient"} just got a {formatCAD(amount)} 1949 gift card.
          They can redeem it at any chair.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-gold hover:text-gold-bright"
        >
          Send another &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <div className="aspect-[1.7/1] border border-gold/40 rounded-sm bg-gradient-to-br from-bg-elev via-bg to-bg-soft p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 size-72 bg-gold/10 blur-3xl rounded-full" />
          <div className="flex items-start justify-between relative">
            <Logo size={64} compact />
            <div className="text-right">
              <div className="text-[9px] tracking-eyebrow text-gold">1949 BARBER SHOP</div>
              <div className="text-[9px] tracking-eyebrow text-ink-mute">GIFT CARD</div>
            </div>
          </div>
          <div className="relative">
            <div className="text-[10px] tracking-eyebrow text-ink-mute mb-1">VALUE</div>
            <div className="serif text-5xl gold-text tabular-nums">{formatCAD(amount)}</div>
            <div className="mt-4 text-xs text-ink-dim">
              To: <span className="text-ink">{to || "—"}</span>
              {from && <> · From <span className="text-ink">{from}</span></>}
            </div>
            {note && (
              <div className="mt-2 text-sm italic text-ink-dim line-clamp-2">
                &ldquo;{note}&rdquo;
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-mute">
          Card preview · sent as a digital image &amp; redeemable code
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="space-y-6"
      >
        <div>
          <div className="text-xs tracking-eyebrow text-ink-mute mb-3">AMOUNT</div>
          <div className="grid grid-cols-3 gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(a)}
                className={cn(
                  "py-3 rounded-sm border tabular-nums transition-all",
                  amount === a
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line hover:border-gold/40",
                )}
              >
                {formatCAD(a)}
              </button>
            ))}
          </div>
        </div>

        <Field label="To (their name)">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Dad"
            className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none"
            required
          />
        </Field>

        <Field label="Their email or phone">
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="dad@example.ca  ·  or  (709) 555-0149"
            className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none"
            required
          />
        </Field>

        <Field label="From">
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="The kids"
            className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none"
          />
        </Field>

        <Field label="A short note (optional)">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Happy birthday — go get the Full 1949."
            rows={3}
            className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none resize-none"
          />
        </Field>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-6 py-4 rounded-sm hover:bg-gold-bright"
        >
          <Send className="size-4" /> Send {formatCAD(amount)} gift card
        </button>
        <p className="text-[10px] text-ink-mute text-center">
          They&apos;ll get a redemption code immediately. Works at every chair.
          No expiry.
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs tracking-eyebrow text-ink-mute mb-2">{label}</div>
      {children}
    </label>
  );
}
