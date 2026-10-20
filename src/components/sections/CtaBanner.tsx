import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Próximo passo
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold md:text-5xl">
            Garanta cestas para a sua equipe.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Envie o pedido com os modelos e o volume. O comercial confirma preço,
            prazo e a nota fiscal.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href="/pedido" size="lg">
            Fazer pedido
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={whatsappHref()} variant="light" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
