// components/Glassmorphic/GlassmorphicNavbar.tsx
import  { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Glassmorphic } from "./BasicGlassmorphic";
 

interface GlassmorphicNavbarProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
  onScroll?: boolean;
}

export function GlassmorphicNavbar({
  children,
  className,
  sticky = true,
  transparent = false,
  onScroll = true,
}: GlassmorphicNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!onScroll) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  return (
    <Glassmorphic
      blur={scrolled ? "lg" : "md"}
      opacity={scrolled ? 0.9 : transparent ? 0.5 : 0.8}
      border={scrolled}
      shadow={scrolled}
      className={cn(
        "w-full px-4 py-3",
        sticky && "sticky top-0 z-50",
        className,
      )}
    >
      {children}
    </Glassmorphic>
  );
}
