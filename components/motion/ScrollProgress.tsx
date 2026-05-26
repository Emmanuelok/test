"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div style={{ scaleX: x }} className="scroll-progress w-full" />;
}
