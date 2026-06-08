import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";
import React, { CSSProperties, ReactNode } from "react";
import { toast } from "sonner";
import { TButtonSize, TButtonVariant } from "../ui/button";
import { getErrorMessage } from "@/lib/error";

interface IProps<T> {
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  primaryText?: string;
  loadingText?: string;
  children?: ReactNode;
  escapeOnEnd?: boolean;
  disabled?: boolean;
  styles?: CSSProperties;
  disableToast?: boolean;
  id?: string;

  // RTK Query mutation hook
  mutation: any; // The RTK Query mutation hook (e.g., useDeleteSomethingMutation)
  data?: T; // Data to pass to the mutation
  onSuccess?: (result?: any) => void;
  onError?: (error?: any) => void;
 
}

export function RtkActionButton<T = any>({
  variant,
  className,
  children,
  loadingText,
  primaryText,
  escapeOnEnd = false,
  styles = {},
  disabled = false,
  disableToast,
  size,
  id,
  mutation,
  data,
  onSuccess,
  onError,
  
}: IProps<T>) {
  const [trigger, { isLoading }] = mutation();

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const result = await trigger(data).unwrap();

      if (!disableToast) {
        toast.success(result?.message || "Action completed successfully");
      }

      onSuccess?.(result);

      if (escapeOnEnd) fireEscape();
    } catch (error) {
      toast.error(getErrorMessage(error));
      onError?.(error);
    }
  };

  return (
    <Button
      loading={isLoading}
      disabled={disabled || isLoading}
      text={primaryText}
      loadingText={loadingText}
      onClick={handleAction}
      className={className}
      styles={styles}
      variant={variant}
      size={size}
      id={id}
    >
      {children}
    </Button>
  );
}

