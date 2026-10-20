import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="hero-wash border-b border-line pt-28 pb-14 md:pt-36 md:pb-16">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
