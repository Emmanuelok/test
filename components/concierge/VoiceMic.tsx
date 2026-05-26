"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

type SR = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (e: { results: { transcript: string }[][] }) => void;
  onerror: (e: { error: string }) => void;
  onend: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SR;
    webkitSpeechRecognition?: new () => SR;
  }
}

export function VoiceMic({
  onTranscript,
  onSend,
}: {
  onTranscript: (text: string) => void;
  onSend: () => void;
}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recRef = useRef<SR | null>(null);

  useEffect(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (Ctor) setSupported(true);
  }, []);

  function toggle() {
    if (!supported) return;
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = "en-CA";
    r.interimResults = true;
    r.continuous = false;
    let final = "";
    r.onresult = (e) => {
      const t = e.results.map((res) => res[0].transcript).join("");
      final = t;
      onTranscript(t);
    };
    r.onerror = () => setListening(false);
    r.onend = () => {
      setListening(false);
      if (final.trim()) {
        // Small delay to let the input visibly settle before sending.
        setTimeout(onSend, 120);
      }
    };
    recRef.current = r;
    setListening(true);
    r.start();
  }

  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "m-1 inline-grid place-items-center size-10 rounded-sm transition-all border",
        listening
          ? "bg-gold/15 border-gold text-gold animate-pulse"
          : "border-line hover:border-gold/40 text-ink-dim",
      )}
      aria-label={listening ? "Stop listening" : "Speak"}
      title={listening ? "Listening… tap to stop" : "Speak your request"}
    >
      {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
    </button>
  );
}
