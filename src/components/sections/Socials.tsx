import { SocialIcon } from "@/components/brand/SocialIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, whatsappHref } from "@/data/site";

const cards = [
  {
    id: "instagram" as const,
    label: "Instagram",
    href: site.socials.instagram,
    handle: site.socials.instagramHandle,
    description: "Novidades da linha e o dia a dia da distribuição.",
  },
  {
    id: "facebook" as const,
    label: "Facebook",
    href: site.socials.facebook,
    handle: site.socials.facebookHandle,
    description: "Comunicados e a presença da AGN para empresas.",
  },
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    href: whatsappHref(),
    handle: site.whatsappDisplay,
    description: "Canal direto com o atendimento comercial.",
  },
];

export function Socials() {
  return (
    <section id="redes" className="scroll-mt-24 bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Redes"
            title="Fale com a AGN onde a sua empresa já está"
            description="Instagram, Facebook e WhatsApp. O pedido formal continua pelo site, com protocolo."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 0.06} className="h-full">
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-[1.75rem] border border-line bg-canvas p-6 transition-colors hover:border-brand"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
                  <SocialIcon id={card.id} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-ink">{card.label}</h3>
                <p className="mt-1 text-sm font-semibold text-brand">{card.handle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
                <span className="mt-6 text-sm font-semibold text-ink">Acessar</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
