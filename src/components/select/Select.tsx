import useGetParam, { useUpdateSearchParams } from "@/hooks/params";
import { Label } from "../ui/label";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OverlayLoader } from "../loaders/OverlayLoader";

export interface SelectOption {
  label: string;
  value: string;
}

interface ISELECT {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  selectStyles?: string;
  loading?: boolean;
  name?: string;
  paramKey?: string;
  label?: ReactNode;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function SELECT({
  options,
  name,
  value,
  error,
  onChange,
  label,
  className,
  paramKey,
  selectStyles,
  loading,
  ...props
}: ISELECT) {
  const { setParam } = useUpdateSearchParams();

  const defaultSP = useGetParam(paramKey as string);

  const handleOnChange = (val: string) => {
    if (typeof onChange !== "undefined") {
      onChange(val);
    } else {
      if (paramKey) setParam((paramKey as string) ?? "filter", val);
    }
  };

  return (
    <>
      <div className={cn("flex items-center gap-2 relative", className)}>
        {label && (
          <Label htmlFor={name} className="_label text-muted-foreground">
            {label}
          </Label>
        )}
        <select
          value={value || defaultSP}
          onChange={(e) => handleOnChange?.(e.target.value)}
          className={cn(
            `bg-input text-sm border px-2 h-9 border-input rounded py-2
    focus:outline-none focus:ring-2 focus:ring-primary
    disabled:cursor-not-allowed disabled:opacity-50`,
            selectStyles,
          )}
          {...props}
        >
          <option value="" hidden>
            {props.placeholder}
          </option>
          {options?.map((op, i) => (
            <option
              key={i}
              value={op.value}
              selected={op.value == (value || defaultSP)}
              className="bg-accent"
            >
              {op.label}
            </option>
          ))}
        </select>

        {loading && <OverlayLoader isLoading />}
      </div>
      {error && (
        <p
          className={` text-destructive text-left text-sm font-light line-clamp-2`}
        >
          {error}
        </p>
      )}
    </>
  );
}
