import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";
import { Label } from "./Label";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  faintLabel?: boolean;
  error?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <Label
            required={props.required}
            faint={props.faintLabel}
            htmlFor={label?.toString()}
          >
            {label}
          </Label>
        )}

        <select
          id={label?.toString()}
          ref={ref}
          className={cn(
            `w-full py-2.5 px-4 bg-surface-muted border rounded-xl text-sm
            focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-surface-elevated
            ${error ? "border-red-300 dark:border-red-700" : "border-border"}
            `,
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
