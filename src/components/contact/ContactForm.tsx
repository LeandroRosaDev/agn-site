"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { interesseOptions, isInteresse } from "@/data/options";
import { submitContato } from "@/lib/api";
import { contatoSchema, type Contato } from "@/lib/validations";

export function ContactForm() {
  const interesse = useSearchParams().get("interesse");
  const initial = isInteresse(interesse) ? interesse : "atacado";
  return <ContactFormFields key={initial} initialInteresse={initial} />;
}

function ContactFormFields({
  initialInteresse,
}: {
  initialInteresse: Contato["interesse"];
}) {
  const [protocolo, setProtocolo] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Contato>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      empresa: "",
      cnpj: "",
      responsavel: "",
      email: "",
      telefone: "",
      interesse: initialInteresse,
      mensagem: "",
    },
  });

  async function onSubmit(values: Contato) {
    setFormError(null);
    const result = await submitContato(values);
    if (!result.ok) {
      if (result.errors) {
        for (const [key, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];
          if (!message) continue;
          if (key in values) {
            setError(key as keyof Contato, { message });
          }
        }
      }
      setFormError(result.message);
      return;
    }
    setProtocolo(result.protocolo);
  }

  if (protocolo) {
    return (
      <div className="rounded-[1.75rem] border border-line bg-white p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-brand">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-ink">Mensagem enviada</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          O comercial recebeu o contato. Guarde o protocolo para acompanhar o retorno.
        </p>
        <p className="mt-6 font-mono text-xl font-semibold text-ink">{protocolo}</p>
        <Button className="mt-6" onClick={() => setProtocolo(null)}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[1.75rem] border border-line bg-white p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Empresa"
          autoComplete="organization"
          wrapperClassName="sm:col-span-2"
          error={errors.empresa?.message}
          {...register("empresa")}
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
        <Select
          label="Interesse"
          options={interesseOptions}
          wrapperClassName="sm:col-span-2"
          error={errors.interesse?.message}
          {...register("interesse")}
        />
        <Textarea
          label="Mensagem"
          placeholder="Volume estimado, cidade de entrega e o que a cesta precisa ter."
          wrapperClassName="sm:col-span-2"
          error={errors.mensagem?.message}
          {...register("mensagem")}
        />
      </div>
      {formError ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {formError}
        </p>
      ) : null}
      <p className="mt-4 text-sm text-muted">
        Empresas de atacado, revenda e RH: este canal é o caminho para uma condição comercial.
      </p>
      <Button type="submit" className="mt-6" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
