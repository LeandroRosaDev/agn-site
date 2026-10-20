import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { formatAddress, site, whatsappHref } from "@/data/site";

export function ContactInfo() {
  const address = formatAddress();
  const items: {
    icon: LucideIcon | "whatsapp";
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }[] = [
    { icon: Phone, label: "Telefone", value: site.phone, href: site.phoneHref },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      value: site.whatsappDisplay,
      href: whatsappHref(),
      external: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: `${address.line1}, ${address.line2}, ${address.line3}`,
    },
    { icon: Clock3, label: "Horário", value: site.hours },
  ];

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const body = (
          <>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand">
              {item.icon === "whatsapp" ? (
                <SocialIcon id="whatsapp" className="h-5 w-5" />
              ) : (
                <item.icon className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                {item.label}
              </span>
              <span className="mt-1 block text-sm font-semibold text-ink">{item.value}</span>
            </span>
          </>
        );

        return (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-[1.5rem] border border-line bg-white p-4 transition-colors hover:border-brand"
              >
                {body}
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-[1.5rem] border border-line bg-white p-4">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
