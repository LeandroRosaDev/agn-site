import { Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  formatAddress,
  mapsDirectionsHref,
  mapsEmbedSrc,
  mapsSearchHref,
  site,
} from "@/data/site";

export function LocationMap() {
  const address = formatAddress();

  return (
    <section
      id="onde-estamos"
      className="scroll-mt-24 border-t border-line bg-white py-20 md:py-28"
      aria-label="Localização da AGN"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Onde estamos"
            title="A AGN em Araruama"
            description="Atacado e distribuição de cestas básicas na Região dos Lagos, no Rio de Janeiro."
          />
          <ul className="mt-8 space-y-4 text-sm text-ink">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>
                {address.line1}
                <br />
                {address.line2}
                <br />
                CEP {address.line3}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>{site.hours}</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={mapsDirectionsHref()}>Como chegar</Button>
            <Button href={mapsSearchHref()} variant="outline">
              Ver no Google Maps
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-canvas">
          <iframe
            title="Mapa da AGN na Rua Eduardo Shalders, Araruama"
            src={mapsEmbedSrc()}
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}
