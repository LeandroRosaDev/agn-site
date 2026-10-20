import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section className="bg-ink py-20 text-white md:py-24" aria-label="Números da operação">
      <Container>
        <SectionHeading
          invert
          eyebrow="Operação"
          title="Escala de quem entrega toda semana"
          description="Cestas, empresas e cidades na rotina de distribuição da AGN."
        />
        <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-white/65">{stat.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold text-brand md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
