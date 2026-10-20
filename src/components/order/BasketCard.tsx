"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { QuantityStepper } from "@/components/order/QuantityStepper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Basket } from "@/data/baskets";
import { cn } from "@/lib/utils";

export function BasketCard({
  basket,
  quantity,
  onQuantityChange,
}: {
  basket: Basket;
  quantity?: number;
  onQuantityChange?: (value: number) => void;
}) {
  const preview = basket.items.slice(0, 5);
  const remaining = basket.items.length - preview.length;
  const selected = (quantity ?? 0) > 0;

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white",
        basket.highlight || selected ? "border-brand shadow-[0_20px_50px_-36px_rgb(255_107_0_/_80%)]" : "border-line",
      )}
    >
      <div className="relative aspect-[5/4]">
        <Image
          src={basket.image}
          alt={basket.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {basket.highlight ? (
          <Badge className="absolute top-4 left-4">Mais pedida</Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          {basket.tagline}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-ink">{basket.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{basket.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink">
          {preview.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {remaining > 0 ? (
          <p className="mt-2 text-sm font-medium text-muted">+ {remaining} itens</p>
        ) : null}
        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
          <div>
            <dt className="text-muted">Peso médio</dt>
            <dd className="font-semibold text-ink">{basket.weight}</dd>
          </div>
          <div>
            <dt className="text-muted">Pedido mínimo</dt>
            <dd className="font-semibold text-ink">{basket.minOrder} un.</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm font-semibold text-brand">Sob consulta</p>
        <div className="mt-5">
          {onQuantityChange ? (
            <QuantityStepper
              value={quantity ?? 0}
              min={basket.minOrder}
              label={basket.name}
              onChange={onQuantityChange}
            />
          ) : (
            <Button href={`/pedido?cesta=${basket.slug}`} className="w-full">
              Pedir esta cesta
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
