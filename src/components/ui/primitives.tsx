import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";

/* =========================================================
   <Container>  — page-level horizontal frame
   ========================================================= */
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-[var(--container-px)]",
        size === "default" && "max-w-[1440px]",
        size === "narrow" && "max-w-[960px]",
        size === "wide" && "max-w-[1600px]",
        className
      )}
      {...props}
    />
  )
);
Container.displayName = "Container";

/* =========================================================
   <Section>  — vertical rhythm, optional inverse styling
   ========================================================= */
interface SectionProps extends HTMLAttributes<HTMLElement> {
  inverse?: boolean;
  size?: "default" | "sm" | "lg";
  as?: ElementType;
}
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, inverse, size = "default", as: Tag = "section", ...props }, ref) => {
    const Element = Tag as ElementType;
    return (
      <Element
        ref={ref as never}
        className={cn(
          "relative",
          size === "default" && "py-section",
          size === "sm" && "py-section-sm",
          size === "lg" && "py-[clamp(120px,16vw,220px)]",
          inverse && "bg-inverse-bg text-inverse-fg",
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

/* =========================================================
   <Heading>  — display serif by default
   ========================================================= */
type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  variant?: HeadingVariant;
  family?: "display" | "sans";
  italic?: boolean;
  balance?: boolean;
  children: ReactNode;
}
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = "h2", variant, family = "display", italic, balance = true, className, children, ...props }, ref) => {
    const Tag = as as ElementType;
    const v = variant ?? as;
    return (
      <Tag
        ref={ref as never}
        className={cn(
          family === "display" ? "font-display" : "font-sans-ui font-medium",
          italic && "italic",
          v === "display-xl" && "text-display-xl",
          v === "display-lg" && "text-display-lg",
          v === "display-md" && "text-display-md",
          v === "display-sm" && "text-display-sm",
          v === "h1" && "text-h1",
          v === "h2" && "text-h2",
          v === "h3" && "text-h3",
          v === "h4" && "text-h4",
          balance && "text-balance",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

/* =========================================================
   <Text>
   ========================================================= */
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "lg" | "base" | "sm" | "caption";
  tone?: "default" | "mid" | "low" | "inverse" | "inverse-mid";
  as?: "p" | "span" | "div";
  balance?: boolean;
  children: ReactNode;
}
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "base", tone = "mid", as = "p", balance, className, children, ...props }, ref) => {
    const Tag = as as ElementType;
    return (
      <Tag
        ref={ref as never}
        className={cn(
          "font-sans-ui",
          variant === "lg" && "text-body-lg",
          variant === "base" && "text-body",
          variant === "sm" && "text-body-sm",
          variant === "caption" && "text-caption",
          tone === "default" && "text-ink",
          tone === "mid" && "text-ink-mid",
          tone === "low" && "text-ink-low",
          tone === "inverse" && "text-inverse-fg",
          tone === "inverse-mid" && "text-inverse-mid",
          balance && "text-pretty",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Text.displayName = "Text";

/* =========================================================
   <Eyebrow>  — short uppercase mono label with leading bar
   ========================================================= */
interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
  withBar?: boolean;
  children: ReactNode;
}
export const Eyebrow = forwardRef<HTMLDivElement, EyebrowProps>(
  ({ accent, withBar = true, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-3",
        accent ? "text-eyebrow-accent" : "text-eyebrow",
        className
      )}
      {...props}
    >
      {withBar && (
        <span
          aria-hidden="true"
          className={cn(
            "block h-px w-6",
            accent ? "bg-accent" : "bg-ink-mid"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  )
);
Eyebrow.displayName = "Eyebrow";

/* =========================================================
   <NumberDisplay>  — large mono number for stats/KPIs
   ========================================================= */
interface NumberDisplayProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  unit?: string;
  size?: "sm" | "md" | "lg" | "xl";
  accent?: boolean;
}
export const NumberDisplay = forwardRef<HTMLDivElement, NumberDisplayProps>(
  ({ value, unit, size = "md", accent, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-mono-ui inline-flex items-baseline gap-1.5", className)}
      {...props}
    >
      <span
        className={cn(
          "leading-none tracking-tight font-light",
          size === "sm" && "text-[24px]",
          size === "md" && "text-[40px]",
          size === "lg" && "text-[64px]",
          size === "xl" && "text-[clamp(72px,9vw,140px)]",
          accent ? "text-accent" : "text-ink"
        )}
      >
        {value}
      </span>
      {unit && (
        <span className="text-caption text-ink-low font-mono-ui">{unit}</span>
      )}
    </div>
  )
);
NumberDisplay.displayName = "NumberDisplay";
