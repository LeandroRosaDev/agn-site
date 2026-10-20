"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { whatsappHref } from "@/data/site";

export function WhatsAppFloat() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o comercial no WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_16px_40px_-12px_rgb(255_107_0_/_70%)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
    >
      <SocialIcon id="whatsapp" className="h-7 w-7" />
    </motion.a>
  );
}
