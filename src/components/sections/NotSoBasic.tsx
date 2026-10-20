"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { foodById } from "@/data/foods";
import { whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

const phrases = [
  "o café do filho antes da escola",
  "o almoço de domingo",
  "a janta de sexta",
  "o fim do mês sem aperto",
];

const moments = [
  {
    ids: ["cafe"],
    time: "06h50",
    title: "Antes da escola",
    text: "O café que o filho toma sem a mãe precisar improvisar.",
    rotate: "md:-rotate-2",
  },
  {
    ids: ["arroz", "feijao"],
    time: "12h30",
    title: "Domingo em família",
    text: "Arroz e feijão no almoço que junta a casa.",
    rotate: "md:rotate-1",
  },
  {
    ids: ["oleo"],
    time: "19h40",
    title: "A janta de sexta",
    text: "O óleo da refeição que fecha a semana.",
    rotate: "md:-rotate-1",
  },
];

export function NotSoBasic() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-brand-tint py-24 md:py-32">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-0 font-display text-[22vw] leading-none font-bold tracking-[-0.07em] text-transparent select-none [-webkit-text-stroke:1.5px_rgba(11,11,11,0.16)] md:top-0"
      >
        <span className="relative inline-block">
          BÁSICA
          <motion.span
            className="absolute top-[46%] left-0 h-2 w-full origin-left bg-brand md:h-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.15, ease: "easeOut" }}
          />
        </span>
      </p>

      <Container className="relative">
        <h2 className="max-w-3xl text-4xl font-semibold text-ink md:text-6xl">
          Não tem nada de básico numa cesta básica.
        </h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink md:text-2xl">
          Pra quem recebe, é{" "}
          {reduce ? (
            <span className="text-brand">{phrases.join(", ")}.</span>
          ) : (
            <span className="relative inline-grid min-h-[1.4em] align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrases[index]}
                  className="col-start-1 row-start-1 text-brand"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  {phrases[index]}.
                </motion.span>
              </AnimatePresence>
            </span>
          )}
        </p>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {moments.map((moment) => (
            <li
              key={moment.time}
              className={cn(
                "bg-white p-5 shadow-[0_28px_60px_-36px_rgb(11_11_11/45%)]",
                moment.rotate,
              )}
            >
              <div className={cn("flex items-end justify-center gap-2 bg-canvas", moment.ids.length > 1 ? "h-40" : "h-44")}>
                {moment.ids.map((id) => {
                  const food = foodById(id);
                  return (
                    <Image
                      key={food.id}
                      src={food.src}
                      alt={food.alt}
                      width={food.width}
                      height={food.height}
                      className="h-36 w-auto object-contain"
                    />
                  );
                })}
              </div>
              <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                {moment.time}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">{moment.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{moment.text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-xl text-lg leading-relaxed text-ink">
          1 cesta = 30 dias de despensa. Para a empresa, uma linha na folha.
          Para quem recebe, o mês inteiro.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/pedido" size="lg">
            Montar a cesta da minha equipe
          </Button>
          <Button
            href={whatsappHref(
              "Olá! Quero montar cestas para os colaboradores da minha empresa.",
            )}
            variant="outline"
            size="lg"
          >
            Falar com o comercial
          </Button>
        </div>
      </Container>
    </section>
  );
}
