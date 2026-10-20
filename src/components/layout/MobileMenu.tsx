"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/contato", label: "Contato" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href;
}

export function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.nav
      id="menu-mobile"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-white px-5 py-6 md:hidden"
    >
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className={cn(
                "block rounded-2xl px-4 py-3 text-lg font-semibold",
                isActive(pathname, link.href)
                  ? "bg-brand-tint text-brand"
                  : "text-ink",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button href="/pedido" className="mt-6 w-full" onClick={onClose}>
        Fazer pedido
      </Button>
    </motion.nav>
  );
}
