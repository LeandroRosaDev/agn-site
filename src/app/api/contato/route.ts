import { flattenError } from "zod";
import { createProtocol } from "@/lib/protocol";
import { contatoSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "JSON inválido." }, { status: 400 });
  }

  const parsed = contatoSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Revise os campos do contato.";
    return Response.json(
      {
        ok: false,
        message,
        errors: flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  return Response.json({ ok: true, protocolo: createProtocol("CON") });
}
