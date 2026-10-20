import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-32">
      <Container>
        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-6xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          Esse endereço não existe ou foi movido. Volte ao início ou fale com o comercial.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Voltar ao início</Button>
          <Button href="/contato" variant="outline">
            Falar com o comercial
          </Button>
        </div>
      </Container>
    </section>
  );
}
