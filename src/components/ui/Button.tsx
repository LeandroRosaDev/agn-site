"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  dark: "bg-ink text-white hover:bg-graphite",
  outline:
    "border border-ink/12 bg-white text-ink hover:border-brand hover:text-brand",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-white text-ink hover:bg-brand-tint",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const reduce = useReducedMotion();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
  const interaction =
    reduce || disabled
      ? {}
      : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  if (href) {
    if (href.startsWith("http")) {
      return (
        <motion.a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          {...interaction}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink href={href} className={classes} onClick={onClick} {...interaction}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...interaction}
    >
      {children}
    </motion.button>
  );
}
