"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  min,
  onChange,
  label,
}: {
  value: number;
  min: number;
  onChange: (value: number) => void;
  label: string;
}) {
  function decrease() {
    if (value <= min) {
      onChange(0);
      return;
    }
    onChange(value - 1);
  }

  function increase() {
    if (value === 0) {
      onChange(min);
      return;
    }
    onChange(value + 1);
  }

  return (
    <div>
      <div className="inline-flex items-center rounded-full border border-line bg-canvas">
        <button
          type="button"
          onClick={decrease}
          aria-label={`Diminuir quantidade de ${label}`}
          className="grid h-10 w-10 place-items-center rounded-full text-ink hover:text-brand"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-10 text-center text-sm font-semibold tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={increase}
          aria-label={`Aumentar quantidade de ${label}`}
          className="grid h-10 w-10 place-items-center rounded-full text-ink hover:text-brand"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs text-muted">Mínimo de {min} un. para incluir</p>
    </div>
  );
}
