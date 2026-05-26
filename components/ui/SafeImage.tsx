"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

type Props = Omit<ImageProps, "onError" | "alt"> & {
  alt: string;
  fallbackLabel?: string;
};

/**
 * Image wrapper that falls back to a branded SVG card when the remote source
 * fails to load. Prevents the broken-image grid cells from ever appearing.
 */
export function SafeImage({ fallbackLabel, alt, ...props }: Props) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-bg-soft via-bg-elev to-bg flex items-center justify-center">
        <div className="text-center">
          <div className="opacity-30">
            <Logo size={120} compact />
          </div>
          {fallbackLabel && (
            <div className="mt-4 text-[10px] tracking-eyebrow text-gold">
              {fallbackLabel}
            </div>
          )}
        </div>
      </div>
    );
  }
  return <Image alt={alt} onError={() => setErrored(true)} {...props} />;
}
