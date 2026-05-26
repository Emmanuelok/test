"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, MapPin, Users } from "lucide-react";
import { locations } from "@/lib/data/locations";
import { mockWait } from "@/lib/ai/concierge-brain";
import { cn } from "@/lib/utils";

export function VirtualQueue() {
  const [stage, setStage] = useState<"pick" | "details" | "joined">("pick");
  const [loc, setLoc] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const selected = locations.find((l) => l.slug === loc);
  const wait = loc ? mockWait(loc) : 0;
  const position = Math.max(1, Math.floor(wait / 8));

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {stage === "pick" && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="serif text-3xl mb-2">Which chair?</h2>
              <p className="text-ink-dim mb-8">
                Pick the location you&apos;re heading to. We&apos;ll show you
                the current line.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {locations.map((l) => {
                  const w = mockWait(l.slug);
                  return (
                    <button
                      key={l.slug}
                      onClick={() => setLoc(l.slug)}
                      className={cn(
                        "text-left p-5 rounded-sm border transition-all",
                        loc === l.slug
                          ? "border-gold bg-gold/5"
                          : "border-line hover:border-gold/40",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="serif text-xl">{l.name}</div>
                          <div className="text-xs text-ink-dim mt-1">{l.address}</div>
                        </div>
                        <div className="text-right">
                          <div className="serif text-2xl text-gold tabular-nums">{w}</div>
                          <div className="text-[9px] tracking-eyebrow text-ink-mute">
                            MIN
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                disabled={!loc}
                onClick={() => setStage("details")}
                className="mt-8 bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {stage === "details" && selected && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="serif text-3xl mb-2">Just your name and phone.</h2>
              <p className="text-ink-dim mb-8">
                We&apos;ll text you the moment a chair opens.
              </p>
              <div className="space-y-4 max-w-md">
                <Field label="Your name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan"
                    className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none"
                  />
                </Field>
                <Field label="Mobile">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(709) 555-0149"
                    className="w-full bg-bg-elev border border-line rounded-sm px-4 py-3 text-sm focus:border-gold/50 outline-none"
                  />
                </Field>
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStage("pick")}
                  className="px-6 py-3 text-ink-dim hover:text-ink"
                >
                  ← Back
                </button>
                <button
                  disabled={!name.trim() || phone.replace(/\D/g, "").length < 7}
                  onClick={() => setStage("joined")}
                  className="bg-gold text-bg font-semibold px-6 py-3 rounded-sm hover:bg-gold-bright disabled:opacity-30"
                >
                  Join the queue
                </button>
              </div>
            </motion.div>
          )}

          {stage === "joined" && selected && (
            <motion.div
              key="joined"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/40 bg-gold/5 rounded-sm p-10"
            >
              <div className="mx-auto size-16 rounded-full bg-gold/15 border border-gold/40 inline-grid place-items-center mb-6">
                <Check className="size-8 text-gold" />
              </div>
              <div className="tracking-eyebrow text-[10px] text-gold mb-2">YOU&apos;RE IN LINE</div>
              <h2 className="serif text-4xl mb-2">You&apos;re #{position}.</h2>
              <p className="text-ink-dim">
                {selected.name} · estimated wait <strong className="text-ink">{wait} min</strong>
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-3 text-center text-sm">
                <Card icon={<MapPin />} k={selected.short} v="Where" />
                <Card icon={<Users />} k={`#${position}`} v="Position" />
                <Card icon={<Clock />} k={`${wait} min`} v="Est. wait" />
              </div>
              <p className="mt-8 text-sm text-ink-dim">
                We&apos;ll text {name} at {phone} when you&apos;re about ten
                minutes out. Wander, grab coffee, head over when we say.
              </p>
              <button
                onClick={() => {
                  setStage("pick");
                  setLoc(null);
                  setName("");
                  setPhone("");
                }}
                className="mt-6 text-sm text-ink-mute hover:text-ink-dim"
              >
                ↺ Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-24 border border-line rounded-sm bg-bg-elev/40 p-6">
          <h3 className="serif text-2xl mb-4">How it works</h3>
          <ol className="space-y-4 text-sm text-ink-dim">
            <Step n="1" t="Pick a chair">Six locations across NL.</Step>
            <Step n="2" t="Hold your spot">Name, phone, you&apos;re in line.</Step>
            <Step n="3" t="Wander">Coffee, errands, whatever.</Step>
            <Step n="4" t="We text you">10 min before you&apos;re up.</Step>
            <Step n="5" t="Sit down">Walk straight to the chair.</Step>
          </ol>
        </div>
      </aside>
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

function Card({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="border border-line rounded-sm p-4 bg-bg-elev/40">
      <div className="text-gold mb-2 [&_svg]:size-4 inline-block">{icon}</div>
      <div className="serif text-2xl">{k}</div>
      <div className="text-[10px] tracking-eyebrow text-ink-mute mt-1">{v}</div>
    </div>
  );
}

function Step({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="size-7 shrink-0 rounded-full border border-gold/40 bg-gold/5 text-gold serif text-sm inline-grid place-items-center">
        {n}
      </span>
      <div>
        <div className="text-ink font-medium">{t}</div>
        <div className="text-xs">{children}</div>
      </div>
    </li>
  );
}
