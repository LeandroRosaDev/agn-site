import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const controlClassName =
  "w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-red-600 disabled:cursor-not-allowed disabled:bg-canvas";
