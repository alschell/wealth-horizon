
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "info" | "pending";

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  label?: string;
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
    success: "bg-gray-800",
    warning: "bg-gray-400",
    error: "bg-gray-600",
    info: "bg-gray-500",
    pending: "bg-gray-300"
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
