import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { OrderFlow } from "@/components/order/OrderFlow";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Fazer pedido",
  description:
    "Monte o pedido de cestas básicas da sua empresa. Escolha os modelos, informe os dados e receba um protocolo para o comercial da AGN.",
  alternates: { canonical: "/pedido" },
};

export default function PedidoPage() {
  return (
    <>
      <PageHero
        eyebrow="Pedido B2B"
        title="Monte o pedido da sua empresa"
        description="Escolha as cestas, informe os dados e envie. O protocolo sai na hora. Preço, pagamento e faturamento são confirmados pelo comercial."
      />
      <section className="py-14 md:py-20">
        <Container>
          <Suspense
            fallback={
              <p className="text-sm text-muted">Carregando o pedido...</p>
            }
          >
            <OrderFlow />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
