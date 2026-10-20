"use client";

import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/contato", label: "Contato" },
];

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function scrollSnapshot() {
  return window.scrollY > 8;
}

function scrollServerSnapshot() {
  return false;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    scrollSnapshot,
    scrollServerSnapshot,
  );
  const open = useSyncExternalStore(
    subscribeMenu,
    getMenuSnapshot,
    getMenuServerSnapshot,
  );

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled || open
          ? "border-line bg-white shadow-sm"
          : "border-transparent bg-canvas",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Logo preload />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-brand",
                isActive(pathname, link.href) ? "text-brand" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/pedido">Fazer pedido</Button>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open ? <MobileMenu pathname={pathname} onClose={closeMenu} /> : null}
      </AnimatePresence>
    </header>
  );
}

let menuOpen = false;
const menuListeners = new Set<() => void>();

function subscribeMenu(onStoreChange: () => void) {
  menuListeners.add(onStoreChange);
  return () => menuListeners.delete(onStoreChange);
}

function getMenuSnapshot() {
  return menuOpen;
}

function getMenuServerSnapshot() {
  return false;
}

function emitMenu() {
  menuListeners.forEach((listener) => listener());
}

function openMenu() {
  menuOpen = true;
  emitMenu();
}

function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  emitMenu();
}
