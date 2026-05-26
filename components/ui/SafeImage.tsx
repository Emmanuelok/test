"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

type Props = Omit<ImageProps, "onError" | "alt" | "src"> & {
  alt: string;
  src?: ImageProps["src"] | null;
  fallbackLabel?: string;
};

/**
 * Image wrapper with a branded fallback. Renders the 1949 medallion + an
 * optional style label whenever the remote image fails OR src is omitted.
 * Used in the gallery so we never present third-party stock as 1949 work.
 */
export function SafeImage({ fallbackLabel, alt, src, ...props }: Props) {
  const [errored, setErrored] = useState(false);
  const shouldFallback = !src || errored;

  if (shouldFallback) {
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
          <div className="mt-2 text-[9px] tracking-eyebrow text-ink-mute">
            FROM @1949BARBERS
          </div>
        </div>
      </div>
    );
  }

  return <Image alt={alt} src={src} onError={() => setErrored(true)} {...props} />;
}
