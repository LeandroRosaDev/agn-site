"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BasketCard } from "@/components/order/BasketCard";
import { OrderForm } from "@/components/order/OrderForm";
import { OrderSuccess } from "@/components/order/OrderSuccess";
import { OrderSummary } from "@/components/order/OrderSummary";
import { Button } from "@/components/ui/Button";
import { baskets, getBasket } from "@/data/baskets";
import { submitPedido } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  pedidoBusinessError,
  type EmpresaPedido,
  type ItemPedido,
} from "@/lib/validations";

const steps = [
  { id: 1, label: "Cestas" },
  { id: 2, label: "Empresa" },
  { id: 3, label: "Resumo" },
] as const;

function initialQuantities(slug: string) {
  const basket = getBasket(slug);
  if (!basket) return {};
  return { [basket.slug]: basket.minOrder };
}

export function OrderFlow() {
  const slug = useSearchParams().get("cesta") ?? "";
  return <OrderWizard key={slug} initialSlug={slug} />;
}

function OrderWizard({ initialSlug }: { initialSlug: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    initialQuantities(initialSlug),
  );
  const [empresa, setEmpresa] = useState<EmpresaPedido | null>(null);
  const [protocolo, setProtocolo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const firstRender = useRef(true);

  const itens = useMemo<ItemPedido[]>(
    () =>
      baskets.flatMap((basket) => {
        const quantidade = quantities[basket.slug] ?? 0;
        if (quantidade <= 0) return [];
        return [{ slug: basket.slug, nome: basket.name, quantidade }];
      }),
    [quantities],
  );

  const total = itens.reduce((sum, item) => sum + item.quantidade, 0);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [step, protocolo]);

  function continueFromItems() {
    setAttempted(true);
    if (itens.length === 0) {
      setError("Escolha ao menos uma cesta para continuar.");
      return;
    }
    setError(null);
    setStep(2);
  }

  async function sendOrder() {
    if (!empresa) return;
    const payload = { itens, empresa };
    const rule = pedidoBusinessError(payload);
    if (rule) {
      setError(rule);
      return;
    }

    setSubmitting(true);
    setError(null);
    const result = await submitPedido(payload);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setProtocolo(result.protocolo);
  }

  if (protocolo) {
    return (
      <OrderSuccess
        protocolo={protocolo}
        onReset={() => {
          setProtocolo(null);
          setStep(1);
          setQuantities(initialQuantities(initialSlug));
          setEmpresa(null);
          setError(null);
          setAttempted(false);
        }}
      />
    );
  }

  return (
    <div>
      <ol className="mb-8 grid grid-cols-3 gap-3">
        {steps.map((item) => {
          const current = item.id === step;
          const done = item.id < step;
          return (
            <li key={item.id}>
              <div
                className={cn(
                  "h-1 rounded-full",
                  done || current ? "bg-brand" : "bg-line",
                )}
              />
              <p
                className={cn(
                  "mt-2 text-xs font-semibold tracking-wide uppercase",
                  current ? "text-brand" : "text-muted",
                )}
              >
                {item.id}. {item.label}
              </p>
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <div>
          <div className="grid gap-6 lg:grid-cols-3">
            {baskets.map((basket) => (
              <BasketCard
                key={basket.slug}
                basket={basket}
                quantity={quantities[basket.slug] ?? 0}
                onQuantityChange={(value) => {
                  setQuantities((current) => ({ ...current, [basket.slug]: value }));
                  setError(null);
                }}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-line bg-white p-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-ink">
                {total} {total === 1 ? "unidade selecionada" : "unidades selecionadas"}
              </p>
              {attempted && error ? (
                <p role="alert" className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted">
                  O botão de mais já aplica o pedido mínimo de cada cesta.
                </p>
              )}
            </div>
            <Button type="button" onClick={continueFromItems}>
              Continuar
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <OrderForm
          defaultValues={empresa}
          onBack={() => setStep(1)}
          onSubmit={(values) => {
            setEmpresa(values);
            setError(null);
            setStep(3);
          }}
        />
      ) : null}

      {step === 3 && empresa ? (
        <OrderSummary
          itens={itens}
          empresa={empresa}
          submitting={submitting}
          error={error}
          onEditItems={() => setStep(1)}
          onEditCompany={() => setStep(2)}
          onSubmit={sendOrder}
        />
      ) : null}
    </div>
  );
}
