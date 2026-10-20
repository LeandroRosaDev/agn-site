"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const text = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString("pt-BR"),
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, motionValue, reduce, value]);

  return (
    <span ref={ref}>
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
