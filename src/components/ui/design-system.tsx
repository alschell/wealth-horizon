
import React from "react";
import { cn } from "@/lib/utils";

// Section container for consistent spacing and styling
export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-6 mb-6", className)}
    {...props}
  />
));
SectionContainer.displayName = "SectionContainer";

// Page header for consistent page titles
export const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6", className)}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

// Content grid for multi-column layouts
export interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: "1" | "2" | "3" | "4";
}

export const ContentGrid = React.forwardRef<HTMLDivElement, ContentGridProps>(
  ({ className, columns = "1", ...props }, ref) => {
    const gridCols = {
      "1": "grid-cols-1",
      "2": "grid-cols-1 lg:grid-cols-2",
      "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn(`grid gap-6 ${gridCols[columns]}`, className)}
        {...props}
      />
    );
  }
);
ContentGrid.displayName = "ContentGrid";

// Subtle animation wrapper for content transitions
export const AnimatedContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "transition-all duration-300 animate-fade-in", 
      className
    )}
    {...props}
  />
));
AnimatedContent.displayName = "AnimatedContent";
