import { forwardRef, type ComponentProps } from "react";
import { cn, controlClassName } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  error?: string;
  wrapperClassName?: string;
  options: readonly Option[];
  placeholder?: string;
} & ComponentProps<"select">;

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  {
    label,
    error,
    wrapperClassName,
    options,
    placeholder,
    id,
    name,
    className,
    ...props
  },
  ref,
) {
  const fieldId = id ?? name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        ref={ref}
        id={fieldId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(controlClassName, "h-12 bg-white", className)}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
});
