// components/Glassmorphic/Glassmorphic.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl" | "none";
  opacity?: number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  border?: boolean;
  shadow?: boolean;
  background?: string;
  borderColor?: string;
  hoverEffect?: boolean;
  interactive?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const blurMap = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function Glassmorphic({
  children,
  className,
  blur = "md",
  opacity = 0.7,
  rounded = "lg",
  border = true,
  shadow = true,
  background = "bg-white/10 dark:bg-black/10",
  borderColor = "border-white/20 dark:border-white/10",
  hoverEffect = false,
  interactive = false,
}: GlassmorphicProps) {
  return (
    <div
      className={cn(
        // Base styles
        "transition-all duration-300",
        blurMap[blur],
        roundedMap[rounded],
        background,
        border && `border ${borderColor}`,
        shadow && "shadow-lg",
        // Hover effects
        hoverEffect && "hover:scale-105 hover:shadow-xl",
        interactive &&
          "cursor-pointer hover:bg-white/20 dark:hover:bg-black/20",
        className,
      )}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      }}
    >
      {children}
    </div>
  );
}
