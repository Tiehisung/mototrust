import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { Label } from "./Label";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  faintLabel?: boolean;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
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
        <textarea
          id={label?.toString()}
          ref={ref}
          className={cn(
            `
            w-full py-2.5 px-4 bg-surface-muted border rounded-xl text-sm resize-none
            placeholder:text-muted-foreground/50
            focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-surface-elevated
            ${error ? "border-red-300 dark:border-red-700" : "border-border"}
          `,
            className,
          )}
          rows={4}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
