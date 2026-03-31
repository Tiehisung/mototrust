// components/Glassmorphic/GlassmorphicModal.tsx
import React, { ReactNode, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Glassmorphic } from "./BasicGlassmorphic";

interface GlassmorphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  closeOnBackdropClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw]",
};

export function GlassmorphicModal({
  isOpen,
  onClose,
  children,
  title,
  className,
  closeOnBackdropClick = true,
  size = "md",
}: GlassmorphicModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleModalClick = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <Glassmorphic
        blur="lg"
        rounded="xl"
        shadow
        className={cn("relative w-full", sizeMap[size], className)}
        onClick={handleModalClick}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </Glassmorphic>
    </div>
  );
}
