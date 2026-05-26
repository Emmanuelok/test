"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const v = useMotionValue(0);
  const rounded = useTransform(v, (x) =>
    decimals === 0 ? Math.round(x).toLocaleString() : x.toFixed(decimals),
  );

  useEffect(() => {
    if (inView) animate(v, to, { duration, ease: [0.22, 1, 0.36, 1] });
  }, [inView, to, duration, v]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
