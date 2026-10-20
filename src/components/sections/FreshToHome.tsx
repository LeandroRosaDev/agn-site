"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { foods, type Food } from "@/data/foods";
import { cn } from "@/lib/utils";

function travelWindow(index: number) {
  const start = 0.06 + index * 0.04;
  const end = 0.34 + index * 0.04;
  return { start, end, mid: (start + end) / 2 };
}

function FoodItem({
  food,
  index,
  progress,
  stage,
}: {
  food: Food;
  index: number;
  progress: MotionValue<number>;
  stage: { w: number; h: number };
}) {
  const { start, end, mid } = travelWindow(index);
  const fadeEnd = Math.min(end + 0.05, 0.78);
  const item = stage.w < 768 ? 92 : 146;
  const basketWidth = Math.min(stage.w * (stage.w < 768 ? 0.5 : 0.32), 340);
  const basketHeight = basketWidth * 0.75;
  const mouthY = stage.h - stage.h * 0.07 - basketHeight * 0.5;
  const fromX = (food.start.x / 100) * stage.w - item / 2;
  const fromY = (food.start.y / 100) * stage.h - item / 2;
  const toX = stage.w * 0.5 - item / 2;
  const toY = mouthY - item * 0.42;
  const arc = (index % 2 === 0 ? -1 : 1) * Math.min(stage.w, stage.h) * 0.07;

  const x = useTransform(progress, [start, mid, end], [fromX, (fromX + toX) / 2 + arc, toX]);
  const y = useTransform(progress, [start, mid, end], [fromY, Math.min(fromY, toY) - 56, toY]);
  const rotate = useTransform(progress, [start, end], [food.rotate, food.rotate * 0.15]);
  const scale = useTransform(progress, [start, end], [1, 0.42]);
  const opacity = useTransform(progress, [0, end, fadeEnd, 0.82], [1, 1, 1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute top-0 left-0 z-20 h-[92px] w-[92px] will-change-transform md:h-[146px] md:w-[146px]",
        !food.mobile && "max-md:hidden",
      )}
      style={{ x, y, rotate, scale, opacity }}
    >
      <div className="food-float h-full w-full" style={{ animationDelay: `${index * 0.18}s` }}>
        <Image
          src={food.src}
          alt=""
          width={food.width}
          height={food.height}
          loading="eager"
          className="h-full w-full object-contain"
        />
      </div>
    </motion.div>
  );
}

function GiantWord({
  text,
  opacity,
  fill,
  className,
}: {
  text: string;
  opacity: MotionValue<number>;
  fill: MotionValue<number>;
  className?: string;
}) {
  const clipPath = useTransform(
    fill,
    (value) => `inset(0 ${((1 - value) * 100).toFixed(2)}% 0 0)`,
  );

  return (
    <motion.p
      aria-hidden="true"
      style={{ opacity }}
      className={cn(
        "pointer-events-none absolute inset-x-0 text-center font-display leading-[0.84] font-bold tracking-[-0.07em]",
        className,
      )}
    >
      <span className="relative inline-block max-w-full">
        <span className="text-canvas [paint-order:stroke_fill] [-webkit-text-stroke:3px_rgba(11,11,11,0.88)]">
          {text}
        </span>
        <motion.span className="absolute inset-0 text-ink" style={{ clipPath }}>
          {text}
        </motion.span>
      </span>
    </motion.p>
  );
}

function BasketBack() {
  return (
    <svg viewBox="0 0 320 240" className="h-auto w-full" aria-hidden="true">
      <path
        d="M86 74c0-34 148-34 148 0"
        fill="none"
        stroke="#0B0B0B"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M48 88h224l-26 128H74L48 88Z" fill="#F6EFE6" stroke="#0B0B0B" strokeWidth="4" />
    </svg>
  );
}

function BasketFront() {
  return (
    <svg viewBox="0 0 320 240" className="pointer-events-none h-auto w-full" aria-hidden="true">
      <path d="M42 122h236l-22 100H64L42 122Z" fill="#E7D4BE" stroke="#0B0B0B" strokeWidth="4" />
      <path d="M30 114h260" stroke="#FF6B00" strokeWidth="14" strokeLinecap="round" />
      <path d="M72 154h176M80 182h160" stroke="#0B0B0B" strokeOpacity="0.16" strokeWidth="3" />
    </svg>
  );
}

function House({ open }: { open: MotionValue<number> }) {
  const light = useTransform(open, [0, 1], [0.08, 1]);

  return (
    <svg viewBox="0 0 280 240" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="132" cy="226" rx="118" ry="9" fill="#0B0B0B" opacity="0.12" />
      <path d="M16 230 L112 216 H196 L236 230 Z" fill="#E4D0B8" />
      <path d="M190 118 L236 142 V214 H190 Z" fill="#F6EFE6" stroke="#0B0B0B" strokeWidth="3" />
      <path d="M28 118 H190 V214 H28 Z" fill="#fff" stroke="#0B0B0B" strokeWidth="3" />
      <path d="M12 122 L109 46 L206 122 Z" fill="#FF6B00" stroke="#0B0B0B" strokeWidth="3" strokeLinejoin="round" />
      <path d="M109 46 L206 122 L248 146 L151 70 Z" fill="#E85D00" stroke="#0B0B0B" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 112 L109 62 M68 118 L109 86 M96 120 L109 108" fill="none" stroke="#0B0B0B" strokeOpacity="0.28" strokeWidth="2" />
      <path d="M162 62 H186 V96 H162 Z" fill="#1A1A1A" stroke="#0B0B0B" strokeWidth="2.5" />
      <path d="M156 56 H192 V66 H156 Z" fill="#0B0B0B" />
      <rect x="44" y="140" width="40" height="32" fill="#FFF3E8" stroke="#0B0B0B" strokeWidth="3" />
      <path d="M64 140 V172 M44 156 H84" stroke="#0B0B0B" strokeWidth="2" />
      <rect x="40" y="170" width="48" height="5" fill="#0B0B0B" />
      <rect x="96" y="140" width="40" height="32" fill="#FFF3E8" stroke="#0B0B0B" strokeWidth="3" />
      <path d="M116 140 V172 M96 156 H136" stroke="#0B0B0B" strokeWidth="2" />
      <rect x="92" y="170" width="48" height="5" fill="#0B0B0B" />
      <rect x="146" y="150" width="34" height="64" fill="#1A1A1A" />
      <rect x="150" y="154" width="26" height="56" fill="#FF6B00" />
      <motion.rect
        x="159"
        y="158"
        width="8"
        height="48"
        fill="#FFD7B8"
        style={{ scaleX: light, transformOrigin: "163px 182px" }}
      />
      <path d="M142 146 H184 V154 H142 Z" fill="#0B0B0B" />
      <circle cx="170" cy="184" r="2.4" fill="#FFF3E8" />
      <path d="M138 214 H188 V222 H138 Z" fill="#E7D4BE" stroke="#0B0B0B" strokeWidth="2.5" />
      <circle cx="46" cy="206" r="13" fill="#E85D00" />
      <circle cx="34" cy="212" r="9" fill="#FF6B00" />
      <circle cx="58" cy="212" r="8" fill="#C4552A" />
    </svg>
  );
}

function ScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 1200, h: 800 });
  const [ctaOn, setCtaOn] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      setStage({ w: rect.width, h: rect.height });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const basketWidth = Math.min(stage.w * (stage.w < 768 ? 0.5 : 0.32), 340);
  const houseWidth = stage.w < 768 ? Math.min(stage.w * 0.4, 200) : Math.min(stage.w * 0.28, 280);
  const houseTarget = stage.w * 0.92 - houseWidth + houseWidth * 0.36;
  const basketX = useTransform(scrollYProgress, (value) => {
    const travel = value < 0.8 ? 0 : Math.min((value - 0.8) / 0.17, 1);
    return travel * (houseTarget - stage.w * 0.5) - basketWidth / 2;
  });
  const basketScale = useTransform(scrollYProgress, [0.7, 0.78, 0.84, 0.97], [1, 1.06, 1, 0.4]);
  const sealY = useTransform(scrollYProgress, [0.7, 0.8], ["-130%", "0%"]);
  const sealOpacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]);
  const houseOpacity = useTransform(scrollYProgress, [0.78, 0.83], [0, 1]);
  const houseScale = useTransform(scrollYProgress, [0.78, 0.96], [0.18, 1]);
  const door = useTransform(scrollYProgress, [0.86, 0.97], [0.08, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.9, 1], [18, 0]);
  const frescoOpacity = useTransform(scrollYProgress, [0.24, 0.34], [1, 0]);
  const frescoFill = useTransform(scrollYProgress, [0, 0.28], [0, 1]);
  const diretoOpacity = useTransform(scrollYProgress, [0.28, 0.36, 0.74, 0.82], [0, 1, 1, 0]);
  const diretoFill = useTransform(scrollYProgress, [0.32, 0.7], [0, 1]);
  const casaOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const casaFill = useTransform(scrollYProgress, [0.8, 0.96], [0, 1]);
  const noteOne = useTransform(scrollYProgress, [0.16, 0.3], [1, 0]);
  const noteTwo = useTransform(scrollYProgress, [0.22, 0.34, 0.7, 0.8], [0, 1, 1, 0]);
  const noteThree = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const desktopCount = useTransform(scrollYProgress, (value) => {
    const arrived = foods.filter((_, index) => value >= travelWindow(index).end).length;
    return `${arrived}/${foods.length}`;
  });
  const mobileCount = useTransform(scrollYProgress, (value) => {
    const playing = foods
      .map((food, index) => ({ food, index }))
      .filter(({ food }) => food.mobile);
    const arrived = playing.filter(({ index }) => value >= travelWindow(index).end).length;
    return `${arrived}/${playing.length}`;
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value > 0.92;
    setCtaOn((current) => (current === next ? current : next));
  });

  const basketStyle = { x: basketX, scale: basketScale, left: "50%" };

  return (
    <section ref={sectionRef} id="fresco" className="relative h-[260vh] bg-canvas lg:h-[300vh]">
      <h2 className="sr-only">Fresco, direto para a casa do colaborador.</h2>
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-canvas pt-16"
      >
        <GiantWord
          text="FRESCO."
          opacity={frescoOpacity}
          fill={frescoFill}
          className="top-[14%] text-[18vw] lg:text-[14vw]"
        />
        <GiantWord
          text="DIRETO."
          opacity={diretoOpacity}
          fill={diretoFill}
          className="top-[14%] text-[18vw] lg:text-[14vw]"
        />
        <GiantWord
          text={"PRA\nCASA."}
          opacity={casaOpacity}
          fill={casaFill}
          className="top-[12%] text-[16vw] whitespace-pre-line lg:text-[12vw]"
        />

        <motion.p
          style={{ opacity: noteOne }}
          className="absolute top-24 left-5 z-30 text-xs font-semibold tracking-[0.16em] text-ink uppercase md:left-10"
        >
          01 — selecionado no dia
        </motion.p>
        <motion.p
          style={{ opacity: noteTwo }}
          className="absolute top-24 left-5 z-30 text-xs font-semibold tracking-[0.16em] text-ink uppercase md:left-10"
        >
          02 — <motion.span className="md:hidden">{mobileCount}</motion.span>
          <motion.span className="hidden md:inline">{desktopCount}</motion.span> itens na cesta
        </motion.p>
        <motion.p
          style={{ opacity: noteThree }}
          className="absolute top-24 right-5 z-30 text-right text-xs font-semibold tracking-[0.16em] text-ink uppercase md:right-10"
        >
          03 — entregue na casa do colaborador
        </motion.p>

        {foods.map((food, index) => (
          <FoodItem
            key={food.id}
            food={food}
            index={index}
            progress={scrollYProgress}
            stage={stage}
          />
        ))}

        <motion.div
          className="absolute bottom-[7%] z-10 w-[min(50vw,340px)] md:w-[min(32vw,340px)]"
          style={basketStyle}
        >
          <BasketBack />
        </motion.div>
        <motion.div
          className="absolute bottom-[7%] z-30 w-[min(50vw,340px)] md:w-[min(32vw,340px)]"
          style={basketStyle}
        >
          <BasketFront />
          <motion.div
            className="absolute top-[46%] right-[9%] left-[9%]"
            style={{ y: sealY, opacity: sealOpacity }}
          >
            <p className="rounded-md bg-ink px-2 py-2 text-center text-[9px] font-semibold tracking-[0.12em] text-white uppercase sm:text-[10px]">
              AGN · Cesta Básica & Congelados
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: houseOpacity, scale: houseScale, transformOrigin: "50% 100%" }}
          className="absolute right-[8%] bottom-[7%] z-10 w-[min(40vw,200px)] md:w-[min(28vw,280px)]"
        >
          <House open={door} />
        </motion.div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaOn ? "auto" : "none" }}
          className="absolute bottom-[10%] left-5 z-40 flex w-full max-w-72 flex-col gap-3 sm:left-10"
        >
          <Button href="/pedido" size="lg" className="h-auto py-3 text-center whitespace-normal">
            Montar a cesta da minha equipe
          </Button>
          <Button href="/#catalogo" variant="outline" size="lg" className="w-full">
            Ver os modelos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function StillScene() {
  return (
    <section className="bg-canvas py-20 md:py-28">
      <Container>
        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
          Do campo à casa
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold text-ink md:text-6xl">
          Fresco. Direto. Pra casa.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Os alimentos saem selecionados no dia, entram na cesta e seguem para a
          casa do colaborador.
        </p>
        <ul className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {foods
            .filter((food) => food.mobile)
            .map((food) => (
              <li key={food.id} className="flex flex-col items-center gap-2">
                <Image
                  src={food.src}
                  alt={food.alt}
                  width={food.width}
                  height={food.height}
                  className="h-24 w-full object-contain"
                />
                <span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  {food.label}
                </span>
              </li>
            ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/pedido" size="lg">
            Montar a cesta da minha equipe
          </Button>
          <Button href="/#catalogo" variant="outline" size="lg">
            Ver os modelos
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function FreshToHome() {
  return (
    <>
      <div className="motion-reduce:hidden">
        <ScrollScene />
      </div>
      <div className="hidden motion-reduce:block">
        <StillScene />
      </div>
    </>
  );
}
