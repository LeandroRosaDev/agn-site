export const interesseValues = [
  "atacado",
  "revenda",
  "rh",
  "parceria",
  "outro",
] as const;

export const frequenciaValues = ["unica", "quinzenal", "mensal"] as const;

export const interesseOptions = [
  { value: "atacado", label: "Compra no atacado" },
  { value: "revenda", label: "Revenda" },
  { value: "rh", label: "Benefício para colaboradores" },
  { value: "parceria", label: "Parceria" },
  { value: "outro", label: "Outro" },
] as const;

export const frequenciaOptions = [
  { value: "unica", label: "Entrega única" },
  { value: "quinzenal", label: "A cada 15 dias" },
  { value: "mensal", label: "Mensal" },
] as const;

export type Interesse = (typeof interesseValues)[number];
export type Frequencia = (typeof frequenciaValues)[number];

export function isInteresse(value: string | null): value is Interesse {
  return interesseValues.some((item) => item === value);
}

export function labelFrom(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
