import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const logo = {
  src: "/logo/agn.webp",
  width: 1200,
  height: 470,
  alt: "AGN — Cesta Básica & Congelados",
} as const;

export function Logo({
  variant = "default",
  preload = false,
}: {
  variant?: "default" | "chip";
  preload?: boolean;
}) {
  const image = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      preload={preload}
      className={cn("w-auto", variant === "chip" ? "h-12" : "h-10")}
    />
  );

  return (
    <Link
      href="/"
      aria-label="AGN, página inicial"
      className={cn(
        "inline-flex rounded-lg focus-visible:ring-4 focus-visible:ring-brand/40 focus-visible:outline-none",
        variant === "chip" && "rounded-2xl bg-white px-4 py-3",
      )}
    >
      {image}
    </Link>
  );
}
