
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingVariant = "spinner" | "skeleton" | "overlay" | "inline";
type LoadingSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LoadingStateProps {
  text?: string;
  variant?: LoadingVariant;
  size?: LoadingSize;
  className?: string;
  textClassName?: string;
  fullPage?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

const sizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

export function LoadingState({
  text,
  variant = "spinner",
  size = "md",
  className,
  textClassName,
  fullPage = false,
  transparent = false,
  children,
}: LoadingStateProps) {
  const containerClass = cn(
    "flex items-center justify-center",
    fullPage ? "fixed inset-0 z-50" : "w-full",
    transparent ? "bg-transparent" : "bg-background/80",
    className
  );

  // Spinner variant
  if (variant === "spinner") {
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
          {text && (
            <p className={cn("text-sm text-muted-foreground", textClassName)}>
              <TranslatedText>{text}</TranslatedText>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Skeleton variant
  if (variant === "skeleton") {
    return (
      <div className={cn("w-full space-y-2", className)}>
        {children || (
          <>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </>
        )}
        {text && (
          <p className={cn("text-xs text-muted-foreground mt-2", textClassName)}>
            <TranslatedText>{text}</TranslatedText>
          </p>
        )}
      </div>
    );
  }

  // Overlay variant (absolute positioned over parent)
  if (variant === "overlay") {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/80 z-10",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
          {text && (
            <p className={cn("text-sm text-muted-foreground", textClassName)}>
              <TranslatedText>{text}</TranslatedText>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      {text && (
        <span className={cn("text-sm", textClassName)}>
          <TranslatedText>{text}</TranslatedText>
        </span>
      )}
    </div>
  );
}
