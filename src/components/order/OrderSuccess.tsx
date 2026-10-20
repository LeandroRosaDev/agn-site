"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function OrderSuccess({
  protocolo,
  onReset,
}: {
  protocolo: string;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copyProtocol() {
    try {
      await navigator.clipboard.writeText(protocolo);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-line bg-white px-6 py-10 text-center md:px-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-brand">
        <CircleCheck className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-3xl font-semibold text-ink">Pedido enviado</h2>
      <p className="mt-3 text-muted">
        Guarde o protocolo. O comercial da AGN usa esse código para confirmar
        valores, prazo e faturamento.
      </p>
      <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
        Protocolo
      </p>
      <p className="mt-2 font-mono text-2xl font-semibold text-ink">{protocolo}</p>
      <button
        type="button"
        onClick={copyProtocol}
        className="mt-3 text-sm font-semibold text-brand"
      >
        {copied ? "Protocolo copiado" : "Copiar protocolo"}
      </button>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Voltar ao início</Button>
        <Button variant="outline" onClick={onReset}>
          Novo pedido
        </Button>
      </div>
    </div>
  );
}
