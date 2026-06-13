import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ILabel {
  children?: ReactNode;
  className?: string;
  faint?: boolean;
  required?: boolean;
  htmlFor?: string;
}

export function Label({
  children,
  faint = false,
  className,
  htmlFor,
  required,
}: ILabel) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-xs font-medium mb-2 ",
        faint ? "text-muted-foreground" : " text-surface-foreground",
        className,
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
