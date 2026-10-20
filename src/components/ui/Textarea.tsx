import { forwardRef, type ComponentProps } from "react";
import { cn, controlClassName } from "@/lib/utils";

type Props = {
  label: string;
  error?: string;
  wrapperClassName?: string;
} & ComponentProps<"textarea">;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { label, error, wrapperClassName, id, name, className, rows = 5, ...props },
  ref,
) {
  const fieldId = id ?? name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        name={name}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(controlClassName, "min-h-32 resize-y py-3", className)}
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
