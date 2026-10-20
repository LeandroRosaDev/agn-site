import { Container } from "@/components/ui/Container";
import { clients } from "@/data/clients";

export function Clients() {
  const groups = [clients, clients];

  return (
    <section id="clientes" className="border-y border-line bg-white py-12" aria-label="Clientes">
      <Container>
        <p className="text-center text-sm font-semibold tracking-[0.18em] text-muted uppercase">
          Empresas que confiam na AGN
        </p>
      </Container>
      <div className="marquee mt-8 overflow-hidden">
        <div className="marquee-track flex w-max">
          {groups.map((group, groupIndex) => (
            <ul
              key={groupIndex}
              className="flex gap-4 pr-4"
              aria-hidden={groupIndex === 1 ? true : undefined}
            >
              {group.map((client) => (
                <li
                  key={`${groupIndex}-${client.name}`}
                  className="flex h-16 min-w-48 items-center justify-center rounded-2xl border border-line bg-canvas px-6 font-display text-lg font-semibold tracking-tight text-ink"
                >
                  {client.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
    </section>
  );
}
