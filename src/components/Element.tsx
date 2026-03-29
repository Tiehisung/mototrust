import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Import fonts from @fontsource
import "@fontsource/noto-sans-georgian/700.css";
import "@fontsource/titillium-web/400.css";
import "@fontsource/ibarra-real-nova/700.css";

export default function HEADER({
  subtitle,
  title,
  children,
  className = "",
}: {
  title?: ReactNode;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={cn(
        `border-b border-border grow pb-6 pt-6 px-4`,
        "font-noto-sans-georgian", // Using the font class
        className,
      )}
    >
      <div className={`mx-auto`}>
        <H>{title}</H>
        {subtitle && <div className={`font-light`}>{subtitle}</div>}
      </div>
      <div>{children}</div>
    </header>
  );
}

interface IProps {
  text: string;
  icon?: React.ReactNode;
}

export function TITLE({ text, icon }: IProps) {
  return (
    <div className="flex items-center gap-3.5 group">
      {icon && (
        <span className="text-2xl text-muted-foreground group-hover:text-foreground">
          {icon}
        </span>
      )}
      <h1
        className={cn(
          "font-bold text-[20px] leading-7",
          "font-ibarra-real-nova",
        )}
      >
        {text}
      </h1>
    </div>
  );
}

export function H({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 my-6 font-semibold text-3xl tracking-wide">
      {children}
    </div>
  );
}
