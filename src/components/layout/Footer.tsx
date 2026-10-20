import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { Container } from "@/components/ui/Container";
import { formatAddress, site, whatsappHref } from "@/data/site";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/pedido", label: "Fazer pedido" },
  { href: "/contato", label: "Contato" },
  { href: "/#faq", label: "Perguntas frequentes" },
];

export function Footer() {
  const address = formatAddress();
  const socials = [
    {
      id: "instagram" as const,
      label: "Instagram",
      href: site.socials.instagram,
    },
    {
      id: "facebook" as const,
      label: "Facebook",
      href: site.socials.facebook,
    },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      href: whatsappHref(),
    },
  ];

  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="chip" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Venda e distribuição de cestas básicas para empresas, RH e atacado.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Navegação
          </h2>
          <ul className="mt-4 space-y-2">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Contato
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-white">
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.line3}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Redes
          </h2>
          <ul className="mt-4 flex gap-3">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
                >
                  <SocialIcon id={social.id} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/60">{site.hours}</p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. Todos os direitos reservados.
          </p>
          <p>CNPJ {site.cnpj}</p>
        </Container>
      </div>
    </footer>
  );
}
