
import React from "react";
import { cn } from "@/lib/utils";

export type StatusType = "success" | "warning" | "error" | "info" | "pending";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = "md",
  withLabel = false,
  label,
  className,
  ...props
}) => {
  const statusColors = {
    success: "bg-green-600",
    warning: "bg-amber-500",
    error: "bg-red-600",
    info: "bg-blue-500",
    pending: "bg-gray-400"
  };

  const statusLabels = {
    success: label || "Success",
    warning: label || "Warning",
    error: label || "Error",
    info: label || "Info",
    pending: label || "Pending"
  };

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4"
  };

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <div className={cn("rounded-full", statusColors[status], sizeClasses[size])} />
      {withLabel && (
        <span className="text-xs ml-2 text-gray-600">{statusLabels[status]}</span>
      )}
    </div>
  );
};
