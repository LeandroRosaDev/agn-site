import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Canal comercial da AGN para empresas de atacado, revenda, RH e órgãos públicos que querem comprar cestas básicas.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Atacado e empresas"
        title="Fale com o comercial"
        description="Empresas de atacado, revenda, RH e órgãos públicos: conte o volume e o tipo de cesta. O time da AGN retorna com a condição comercial."
      />
      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <Suspense fallback={<p className="text-sm text-muted">Carregando formulário...</p>}>
            <ContactForm />
          </Suspense>
          <ContactInfo />
        </Container>
      </section>
    </>
  );
}
