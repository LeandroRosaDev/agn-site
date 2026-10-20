"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, Receipt, Truck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/data/images";
import { whatsappHref } from "@/data/site";

const highlights = [
  { icon: Truck, label: "Entrega programada" },
  { icon: Receipt, label: "Nota fiscal" },
  { icon: BadgeCheck, label: "Pedido mínimo claro" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 72]);

  return (
    <section ref={ref} className="hero-wash relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Distribuição B2B</Badge>
          </motion.div>
          <motion.h1
            className="mt-5 max-w-xl text-4xl font-semibold text-ink sm:text-5xl md:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Cestas básicas que chegam no prazo da sua equipe.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            A AGN abastece empresas, departamentos de RH e o atacado com cestas
            prontas, entrega programada e nota fiscal. Escolha o modelo e envie
            o pedido.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            <Button href="/pedido" size="lg">
              Fazer pedido
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={whatsappHref()} variant="outline" size="lg">
              Falar com consultor
            </Button>
          </motion.div>
          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.34 }}
          >
            {highlights.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <item.icon className="h-4 w-4 text-brand" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div style={{ y }} className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-4 -bottom-4 hidden h-full w-full rounded-[2rem] bg-brand sm:block" />
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-tint shadow-[0_30px_70px_-36px_rgb(11_11_11_/_55%)]"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Image
              src={images.hero}
              alt="Alimentos frescos organizados para distribuição de cestas"
              fill
              preload
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute -left-2 bottom-8 hidden max-w-52 rounded-2xl bg-white p-4 shadow-xl sm:block">
            <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
              Pedido mínimo
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              A partir de 10 unidades na linha Premium
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
