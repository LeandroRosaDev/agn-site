import { baskets } from "@/data/baskets";
import { frequenciaValues, interesseValues } from "@/data/options";
import { ufList } from "@/data/ufs";
import { z } from "zod";

function required(message: string) {
  return z.string().trim().min(1, message);
}

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Informe o telefone")
  .refine(
    (value) => value.replace(/\D/g, "").length >= 10,
    "Informe um telefone com DDD",
  );

const cnpjSchema = z
  .string()
  .trim()
  .min(1, "Informe o CNPJ")
  .regex(
    /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/,
    "CNPJ inválido. Use 00.000.000/0001-00",
  );

const emailSchema = z
  .string()
  .trim()
  .pipe(z.email("Informe um e-mail válido"));

export const itemPedidoSchema = z.object({
  slug: required("Cesta inválida"),
  nome: required("Cesta inválida"),
  quantidade: z.number().int().positive("A quantidade precisa ser maior que zero"),
});

export const empresaPedidoSchema = z.object({
  razaoSocial: required("Informe a razão social").max(120, "Use até 120 caracteres"),
  cnpj: cnpjSchema,
  responsavel: required("Informe o responsável").max(80, "Use até 80 caracteres"),
  email: emailSchema,
  telefone: phoneSchema,
  endereco: required("Informe o endereço de entrega").max(160, "Use até 160 caracteres"),
  cidade: required("Informe a cidade").max(80, "Use até 80 caracteres"),
  uf: z.enum(ufList, "Selecione o estado"),
  frequencia: z.enum(frequenciaValues, "Selecione a frequência"),
  observacoes: z.string().trim().max(800, "Use até 800 caracteres"),
});

export const pedidoSchema = z.object({
  itens: z.array(itemPedidoSchema).min(1, "Selecione ao menos uma cesta"),
  empresa: empresaPedidoSchema,
});

export const contatoSchema = z.object({
  empresa: required("Informe a empresa").max(120, "Use até 120 caracteres"),
  cnpj: cnpjSchema,
  responsavel: required("Informe o responsável").max(80, "Use até 80 caracteres"),
  email: emailSchema,
  telefone: phoneSchema,
  interesse: z.enum(interesseValues, "Selecione o tipo de interesse"),
  mensagem: required("Conte o que a empresa precisa").max(
    1200,
    "Use até 1200 caracteres",
  ),
});

export type ItemPedido = z.infer<typeof itemPedidoSchema>;
export type EmpresaPedido = z.infer<typeof empresaPedidoSchema>;
export type Pedido = z.infer<typeof pedidoSchema>;
export type Contato = z.infer<typeof contatoSchema>;

export function pedidoBusinessError(pedido: Pedido) {
  const seen = new Set<string>();

  for (const item of pedido.itens) {
    if (seen.has(item.slug)) {
      return "Há cestas repetidas no pedido.";
    }
    seen.add(item.slug);

    const basket = baskets.find((entry) => entry.slug === item.slug);
    if (!basket || item.nome !== basket.name) {
      return "Uma das cestas enviadas não existe no catálogo.";
    }
    if (item.quantidade < basket.minOrder) {
      return `O pedido mínimo da ${basket.name} é de ${basket.minOrder} unidades.`;
    }
  }

  return null;
}
