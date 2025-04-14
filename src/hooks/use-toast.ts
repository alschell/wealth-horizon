
import { toast as sonnerToast } from "sonner";

// Export types from toast component
export * from "@/components/ui/toast";

// Define the Toast interface with all required properties
export interface Toast {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  className?: string;
}

// Main toast function that accepts our Toast interface
export function toast(props: Toast) {
  const { title, description, variant, duration, className } = props;
  
  if (variant === "destructive") {
    return sonnerToast.error(title as string, {
      description: description as string,
      duration: duration,
      className: className
    });
  }
  
  return sonnerToast(title as string, {
    description: description as string,
    duration: duration,
    className: className
  });
}

// Stub implementation for useToast that returns the toast function
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss
  };
}
