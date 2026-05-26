"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) return;
        setDone(true);
      }}
      className="w-full"
    >
      <div className="text-[10px] tracking-eyebrow text-gold mb-3">— The Cut, monthly</div>
      <p className="text-sm text-ink-dim mb-4">
        New cuts, new chairs, the occasional discount. One email a month, never more.
      </p>
      <div className={cn(
        "flex items-center bg-bg-elev border rounded-sm transition-colors",
        done ? "border-success/50" : "border-line focus-within:border-gold/50",
      )}>
        <span className="pl-3 text-ink-mute">
          <Mail className="size-4" />
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={done}
          placeholder="you@example.ca"
          className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-ink-mute disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={done}
          className="m-0.5 px-3 py-2 bg-gold text-bg font-semibold rounded-sm text-xs hover:bg-gold-bright disabled:bg-success disabled:text-bg"
        >
          {done ? <Check className="size-4" /> : "Sign up"}
        </button>
      </div>
      {done && (
        <p className="mt-2 text-[10px] tracking-eyebrow text-success">
          IN. SEE YOU AT THE FIRST OF NEXT MONTH.
        </p>
      )}
    </form>
  );
}
