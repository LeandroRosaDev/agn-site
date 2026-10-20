import type { Contato, Pedido } from "@/lib/validations";

export type FieldErrors = Record<string, string[] | undefined>;

export type SubmitResult =
  | { ok: true; protocolo: string }
  | { ok: false; message: string; errors?: FieldErrors };

function endpoint(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) return path;
  return `${base}${path}`;
}

function isSubmitResult(value: unknown): value is SubmitResult {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (record.ok === true && typeof record.protocolo === "string") return true;
  if (record.ok === false && typeof record.message === "string") return true;
  return false;
}

async function postJson(path: string, body: unknown): Promise<SubmitResult> {
  try {
    const response = await fetch(endpoint(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data: unknown = await response.json().catch(() => null);
    if (!isSubmitResult(data)) {
      return {
        ok: false,
        message: "Não foi possível concluir o envio. Tente novamente.",
      };
    }
    return data;
  } catch {
    return {
      ok: false,
      message: "Sem conexão com o servidor. Verifique a rede e tente de novo.",
    };
  }
}

/** Único ponto de envio do pedido. Troque a base em NEXT_PUBLIC_API_URL. */
export function submitPedido(payload: Pedido) {
  return postJson("/api/pedidos", payload);
}

/** Único ponto de envio do contato comercial. */
export function submitContato(payload: Contato) {
  return postJson("/api/contato", payload);
}
