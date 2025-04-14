
import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "@/components/ui/toast";

// Export types from toast component
export * from "@/components/ui/toast";

// Define the Toast interface with all required properties
export interface Toast {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastProps["action"];
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

// Named toast functions for different types of notifications
export function showSuccessToast(title: string, message: string, duration?: number) {
  sonnerToast.success(title, {
    description: message,
    duration: duration
  });
}

export function showErrorToast(title: string, message: string, duration?: number) {
  sonnerToast.error(title, {
    description: message,
    duration: duration
  });
}

export function showInfoToast(title: string, message: string, duration?: number) {
  sonnerToast.info(title, {
    description: message,
    duration: duration
  });
}

// Stub implementation for useToast that returns the toast function
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss
  };
}
