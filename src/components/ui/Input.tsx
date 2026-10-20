import { forwardRef, type ComponentProps } from "react";
import { cn, controlClassName } from "@/lib/utils";

type Props = {
  label: string;
  error?: string;
  wrapperClassName?: string;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, wrapperClassName, id, name, className, ...props },
  ref,
) {
  const fieldId = id ?? name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(controlClassName, "h-12", className)}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
});
