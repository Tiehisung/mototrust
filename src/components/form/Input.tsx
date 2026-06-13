import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Label } from "./Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  faintLabel?: boolean;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      rightIcon,
      onRightIconClick,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <Label
            htmlFor={label?.toString()}
            required={props.required}
            faint={props.faintLabel}
          >
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            id={label?.toString()}
            ref={ref}
            className={cn(
              `
              w-full py-2.5 bg-surface-muted border rounded-xl text-sm
              placeholder:text-muted-foreground/50
              focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
              disabled:opacity-50 disabled:cursor-not-allowed
              dark:bg-surface-elevated
              ${icon ? "pl-10" : "pl-4"}
              ${rightIcon ? "pr-10" : "pr-4"}
              ${
                error
                  ? "border-red-300 dark:border-red-700 focus:ring-red-200"
                  : "border-border"
              }
             `,
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-surface-foreground transition-colors"
            >
              {rightIcon}
            </button>
          )}
          {error && !rightIcon && (
            <HiOutlineExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
