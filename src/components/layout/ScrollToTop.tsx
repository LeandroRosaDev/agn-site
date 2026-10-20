"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function scrollSnapshot() {
  return window.scrollY > 480;
}

function scrollServerSnapshot() {
  return false;
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(
    subscribeToScroll,
    scrollSnapshot,
    scrollServerSnapshot,
  );
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          className="fixed right-5 bottom-24 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg hover:bg-brand focus-visible:ring-4 focus-visible:ring-brand/40 focus-visible:outline-none"
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduce ? "auto" : "smooth",
            })
          }
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
