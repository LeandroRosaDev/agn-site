import { Sparkles } from "lucide-react";
import { BasketCard } from "@/components/order/BasketCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { baskets } from "@/data/baskets";

export function CatalogPreview() {
  return (
    <section id="catalogo" className="scroll-mt-24 bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Três cestas prontas. Uma sob medida."
            description="Os modelos abaixo já saem com composição fechada. O valor é confirmado pelo comercial conforme o volume e a frequência."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {baskets.map((basket, index) => (
            <Reveal key={basket.slug} delay={index * 0.06} className="h-full">
              <BasketCard basket={basket} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-dashed border-brand/40 bg-brand-tint p-6 md:flex-row md:items-center md:p-8">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-ink">Cesta personalizada</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Precisa de outra composição, de um mix para revenda ou de um
                  volume fora das linhas? O comercial monta a cesta com a sua empresa.
                </p>
              </div>
            </div>
            <Button href="/contato?interesse=outro" variant="dark">
              Montar com o comercial
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
