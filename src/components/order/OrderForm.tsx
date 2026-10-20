"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { frequenciaOptions } from "@/data/options";
import { stateOptions } from "@/data/ufs";
import {
  empresaPedidoSchema,
  type EmpresaPedido,
} from "@/lib/validations";

const emptyEmpresa: EmpresaPedido = {
  razaoSocial: "",
  cnpj: "",
  responsavel: "",
  email: "",
  telefone: "",
  endereco: "",
  cidade: "",
  uf: "RJ",
  frequencia: "mensal",
  observacoes: "",
};

export function OrderForm({
  defaultValues,
  onSubmit,
  onBack,
}: {
  defaultValues?: EmpresaPedido | null;
  onSubmit: (values: EmpresaPedido) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpresaPedido>({
    resolver: zodResolver(empresaPedidoSchema),
    defaultValues: defaultValues ?? emptyEmpresa,
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-[1.75rem] border border-line bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Razão social"
          autoComplete="organization"
          wrapperClassName="sm:col-span-2"
          error={errors.razaoSocial?.message}
          {...register("razaoSocial")}
        />
        <Input
          label="CNPJ"
          inputMode="numeric"
          placeholder="00.000.000/0001-00"
          error={errors.cnpj?.message}
          {...register("cnpj")}
        />
        <Input
          label="Responsável"
          autoComplete="name"
          error={errors.responsavel?.message}
          {...register("responsavel")}
        />
        <Input
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Telefone"
          type="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          error={errors.telefone?.message}
          {...register("telefone")}
        />
        <Input
          label="Endereço de entrega"
          autoComplete="street-address"
          wrapperClassName="sm:col-span-2"
          error={errors.endereco?.message}
          {...register("endereco")}
        />
        <Input
          label="Cidade"
          autoComplete="address-level2"
          error={errors.cidade?.message}
          {...register("cidade")}
        />
        <Select
          label="Estado"
          autoComplete="address-level1"
          options={stateOptions}
          error={errors.uf?.message}
          {...register("uf")}
        />
        <Select
          label="Frequência"
          options={frequenciaOptions}
          wrapperClassName="sm:col-span-2"
          error={errors.frequencia?.message}
          {...register("frequencia")}
        />
        <Textarea
          label="Observações"
          placeholder="Horário de recebimento, doca, composição extra..."
          wrapperClassName="sm:col-span-2"
          error={errors.observacoes?.message}
          {...register("observacoes")}
        />
      </div>
      <p className="mt-4 text-sm text-muted">
        Os dados servem para o atendimento comercial deste pedido.
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Voltar às cestas
        </Button>
        <Button type="submit">Revisar pedido</Button>
      </div>
    </form>
  );
}
