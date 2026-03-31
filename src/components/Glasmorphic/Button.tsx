// components/Glassmorphic/GlassmorphicButton.tsx
import  { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Glassmorphic } from "./BasicGlassmorphic";
 

interface GlassmorphicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
}

const sizeMap = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantMap = {
  primary: "bg-primary/20 hover:bg-primary/30 border-primary/50",
  secondary: "bg-secondary/20 hover:bg-secondary/30 border-secondary/50",
  danger: "bg-red-500/20 hover:bg-red-500/30 border-red-500/50",
};

export function GlassmorphicButton({
  children,
  onClick,
  className,
  disabled = false,
  size = "md",
  variant = "primary",
}: GlassmorphicButtonProps) {
  return (
    <Glassmorphic
      blur="sm"
      rounded="full"
      border
      hoverEffect
      interactive={!disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all",
        sizeMap[size],
        variantMap[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Glassmorphic>
  );
}
