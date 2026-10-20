import {
  Handshake,
  Leaf,
  Receipt,
  Sparkles,
  Timer,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentials, type DifferentialIcon } from "@/data/differentials";

const icons: Record<DifferentialIcon, LucideIcon> = {
  leaf: Leaf,
  truck: Truck,
  timer: Timer,
  handshake: Handshake,
  sparkles: Sparkles,
  receipt: Receipt,
};

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Por que a AGN"
            title="Distribuição pensada para quem compra em volume"
            description="Do item conferido à nota fiscal, o fluxo é o de uma operação B2B — não o de uma compra avulsa."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <article className="h-full rounded-[1.75rem] border border-line bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
