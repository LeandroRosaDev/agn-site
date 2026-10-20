import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-tint text-brand",
  dark: "bg-ink text-white",
  light: "bg-white text-ink shadow-sm",
} as const;

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
