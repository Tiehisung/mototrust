// components/Glassmorphic/GlassmorphicCard.tsx
import  { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Glassmorphic } from "./BasicGlassmorphic";
 

interface GlassmorphicCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  onClick?: () => void;
}

export function GlassmorphicCard({
  children,
  title,
  subtitle,
  icon,
  className,
  contentClassName,
  headerClassName,
  blur = "md",
  interactive = false,
  onClick,
}: GlassmorphicCardProps) {
  return (
    <Glassmorphic
      blur={blur}
      rounded="xl"
      shadow
      border
      interactive={interactive}
      onClick={onClick}
      className={cn("p-6", className)}
    >
      {(title || icon) && (
        <div className={cn("flex items-center gap-3 mb-4", headerClassName)}>
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </Glassmorphic>
  );
}
