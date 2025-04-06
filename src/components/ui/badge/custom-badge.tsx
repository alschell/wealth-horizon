
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "outline";

interface CustomBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  success: "bg-green-100 text-green-800 hover:bg-green-200",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  error: "bg-red-100 text-red-800 hover:bg-red-200",
  info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100",
};

export function CustomBadge({ variant = "default", children, className }: CustomBadgeProps) {
  return (
    <Badge className={cn(variantClasses[variant], className)} variant="secondary">
      {children}
    </Badge>
  );
}
