
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define a variant type that extends the base Badge variants
export type CustomBadgeVariant = "default" | "destructive" | "outline" | "secondary" | "success";

interface CustomBadgeProps extends Omit<React.ComponentProps<typeof Badge>, 'variant'> {
  variant?: CustomBadgeVariant;
}

export const CustomBadge: React.FC<CustomBadgeProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  // Map "success" variant to appropriate styles using our black/gray/white palette
  let variantClass = "";
  if (variant === "success") {
    variantClass = "bg-gray-800 hover:bg-gray-900 text-white";
    variant = "outline" as any; // Use outline as base and override with our custom styles
  }

  return (
    <Badge
      variant={variant === "success" ? "outline" : variant}
      className={cn(variantClass, className)}
      {...props}
    />
  );
};
