import type { Metadata } from "next";
import { Handshake, Receipt, ShieldCheck, Timer, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Stats } from "@/components/sections/Stats";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutLogistics,
  aboutMission,
  aboutStory,
  aboutTimeline,
  aboutValues,
  aboutVision,
} from "@/data/about";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A AGN vende e distribui cestas básicas para empresas. Conheça a operação, os valores e a forma de entrega.",
  alternates: { canonical: "/sobre" },
};

const valueIcons: Record<(typeof aboutValues)[number]["icon"], LucideIcon> = {
  timer: Timer,
  shield: ShieldCheck,
  receipt: Receipt,
  handshake: Handshake,
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="A empresa"
        title="Quem abastece a cesta da sua equipe"
        description="A AGN concentra venda e distribuição de cestas básicas para empresas que precisam de padrão, volume e prazo — não de uma compra solta."
      />

      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              História
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              A cesta pronta, no lugar do improviso
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
              <Image
                src={images.market}
                alt="Banca de alimentos frescos, referência visual da operação"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.75rem] bg-ink p-8 text-white">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">Missão</p>
            <p className="mt-4 text-2xl font-semibold leading-snug">{aboutMission}</p>
          </article>
          <article className="rounded-[1.75rem] border border-line bg-canvas p-8">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">Visão</p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-ink">{aboutVision}</p>
          </article>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">O que guia a entrega</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[value.icon];
              return (
                <Reveal key={value.title} delay={index * 0.05} className="h-full">
                  <article className="h-full rounded-[1.75rem] border border-line bg-white p-6">
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-semibold text-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">Linha do tempo</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              Da banca ao pedido com protocolo
            </h2>
            <ol className="mt-10 space-y-8 border-l border-line pl-8">
              {aboutTimeline.map((event) => (
                <li key={event.year} className="relative">
                  <span className="absolute top-1.5 -left-[2.4rem] h-3 w-3 rounded-full border-2 border-white bg-brand" />
                  <p className="text-sm font-semibold text-brand">{event.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{event.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{event.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">Estrutura</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              Como a cesta sai da AGN
            </h2>
            <ul className="mt-6 space-y-3">
              {aboutLogistics.map((step) => (
                <li key={step} className="flex gap-3 text-sm text-ink">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  {step}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={images.warehouse}
                  alt="Centro de distribuição com prateleiras de alimentos"
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:mt-8">
                <Image
                  src={images.logistics}
                  alt="Operação logística de expedição"
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Stats />
      <CtaBanner />
    </>
  );
}
