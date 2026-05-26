"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Msg = {
  role: "user" | "assistant";
  content: string;
  suggestions?: { label: string; href?: string }[];
};

const SEEDS = [
  "I want a skin fade tomorrow morning near Topsail Road",
  "What's the wait at CBS right now?",
  "Book me with Sonny next Saturday",
  "Recommend a cut for an oval face",
  "Send my dad a $50 gift card",
];

export function ConciergeChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey there — I'm the 1949 concierge. Tell me what you need: a cut, a chair near you, a barber by name, a gift for someone. I'll handle the rest.",
      suggestions: SEEDS.slice(0, 3).map((s) => ({ label: s })),
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("No body");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      let suggestions: Msg["suggestions"] | undefined;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.trim()) continue;
          try {
            const evt = JSON.parse(line);
            if (evt.t === "text") {
              acc += evt.v;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: acc,
                };
                return copy;
              });
            } else if (evt.t === "suggestions") {
              suggestions = evt.v;
            }
          } catch {
            // ignore stray
          }
        }
      }
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: acc,
          suggestions,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className={cn("flex flex-col flex-1 min-h-0", compact ? "" : "max-h-[80vh]")}>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-5"
      >
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} onSuggest={send} />
        ))}
        {streaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex items-center gap-2 text-ink-mute text-sm">
            <span className="size-1.5 rounded-full bg-gold animate-pulse" />
            <span className="size-1.5 rounded-full bg-gold animate-pulse [animation-delay:.2s]" />
            <span className="size-1.5 rounded-full bg-gold animate-pulse [animation-delay:.4s]" />
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 bg-bg-elev border border-line rounded-sm focus-within:border-gold/50"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what you need…"
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink-mute"
            disabled={streaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            className="m-1 inline-grid place-items-center size-10 bg-gold text-bg rounded-sm disabled:opacity-30 hover:bg-gold-bright transition-colors"
            aria-label="Send"
          >
            <Send className="size-4" />
          </button>
        </form>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-ink-mute tracking-eyebrow">
          <Sparkles className="size-3 text-gold" />
          Concierge can book chairs, check wait times, recommend cuts &amp; send
          gift cards.
        </div>
      </div>
    </div>
  );
}

function Bubble({
  msg,
  onSuggest,
}: {
  msg: Msg;
  onSuggest: (s: string) => void;
}) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-gold/15 text-ink border border-gold/30 rounded-sm px-4 py-2.5 text-sm">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="size-7 shrink-0 rounded-full border border-gold/40 bg-gold/10 inline-grid place-items-center mt-0.5">
          <Sparkles className="size-3.5 text-gold" />
        </div>
        <div className="text-sm leading-relaxed text-ink whitespace-pre-wrap">
          {msg.content}
        </div>
      </div>
      {msg.suggestions && (
        <div className="pl-10 flex flex-wrap gap-1.5">
          {msg.suggestions.map((s) =>
            s.href ? (
              <Link
                key={s.label}
                href={s.href}
                className="text-xs border border-gold/40 text-gold bg-gold/5 hover:bg-gold/10 px-3 py-1.5 rounded-sm"
              >
                {s.label} &rarr;
              </Link>
            ) : (
              <button
                key={s.label}
                onClick={() => onSuggest(s.label)}
                className="text-xs border border-line hover:border-gold/40 text-ink-dim hover:text-ink px-3 py-1.5 rounded-sm transition-colors"
              >
                {s.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
