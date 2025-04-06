
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "info" | "neutral";

interface StatusIndicatorProps {
  type?: StatusType;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  label?: string;
  className?: string;
}

const statusColors = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-gray-500",
};

const sizeClasses = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function StatusIndicator({
  type = "neutral",
  size = "md",
  pulse = false,
  label,
  className,
}: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded-full",
          statusColors[type],
          sizeClasses[size],
          pulse && "animate-pulse",
          className
        )}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </div>
  );
}
