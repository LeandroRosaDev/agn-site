"use client";

import { Button } from "@/components/ui/Button";
import { frequenciaOptions, labelFrom } from "@/data/options";
import { stateNames } from "@/data/ufs";
import type { EmpresaPedido, ItemPedido } from "@/lib/validations";

export function OrderSummary({
  itens,
  empresa,
  submitting,
  error,
  onEditItems,
  onEditCompany,
  onSubmit,
}: {
  itens: ItemPedido[];
  empresa: EmpresaPedido;
  submitting: boolean;
  error: string | null;
  onEditItems: () => void;
  onEditCompany: () => void;
  onSubmit: () => void;
}) {
  const total = itens.reduce((sum, item) => sum + item.quantidade, 0);
  const ufName = stateNames[empresa.uf];

  return (
    <div className="rounded-[1.75rem] border border-line bg-white p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Resumo do pedido</h2>
          <p className="mt-1 text-sm text-muted">{total} unidades no total</p>
        </div>
        <Button type="button" variant="ghost" onClick={onEditItems}>
          Editar cestas
        </Button>
      </div>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {itens.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-4 py-4">
            <span className="font-semibold text-ink">{item.nome}</span>
            <span className="text-sm text-muted">{item.quantidade} un.</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-ink">Empresa e entrega</h3>
        <Button type="button" variant="ghost" onClick={onEditCompany}>
          Editar dados
        </Button>
      </div>
      <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Razão social</dt>
          <dd className="font-medium text-ink">{empresa.razaoSocial}</dd>
        </div>
        <div>
          <dt className="text-muted">CNPJ</dt>
          <dd className="font-medium text-ink">{empresa.cnpj}</dd>
        </div>
        <div>
          <dt className="text-muted">Responsável</dt>
          <dd className="font-medium text-ink">{empresa.responsavel}</dd>
        </div>
        <div>
          <dt className="text-muted">E-mail</dt>
          <dd className="font-medium text-ink">{empresa.email}</dd>
        </div>
        <div>
          <dt className="text-muted">Telefone</dt>
          <dd className="font-medium text-ink">{empresa.telefone}</dd>
        </div>
        <div>
          <dt className="text-muted">Frequência</dt>
          <dd className="font-medium text-ink">
            {labelFrom(frequenciaOptions, empresa.frequencia)}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted">Entrega</dt>
          <dd className="font-medium text-ink">
            {empresa.endereco} — {empresa.cidade}/{empresa.uf}
            {ufName ? ` (${ufName})` : ""}
          </dd>
        </div>
        {empresa.observacoes ? (
          <div className="sm:col-span-2">
            <dt className="text-muted">Observações</dt>
            <dd className="font-medium text-ink">{empresa.observacoes}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-6 rounded-2xl bg-brand-tint px-4 py-3 text-sm text-ink">
        O envio gera um protocolo. Preço, pagamento e nota fiscal são confirmados
        pelo comercial — esta tela ainda não fecha a compra.
      </p>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div className="mt-6">
        <Button type="button" onClick={onSubmit} disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar pedido"}
        </Button>
      </div>
    </div>
  );
}
