
import { toast as sonnerToast } from "sonner";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// Re-export the types
export * from "@/components/ui/toast";

export function showSuccessToast(title: string, message: string) {
  sonnerToast.success(message, {
    description: title
  });
}

export function showErrorToast(title: string, message: string) {
  sonnerToast.error(message, {
    description: title
  });
}

export function showInfoToast(title: string, message: string) {
  sonnerToast.info(message, {
    description: title
  });
}

export interface Toast {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
  className?: string;
}

export function toast(props: Toast) {
  const { title, description, variant, action, duration, className } = props;
  
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

// Alternative toast using sonner
export const sonner = {
  success: (message: string, options?: any) => sonnerToast.success(message, options),
  error: (message: string, options?: any) => sonnerToast.error(message, options),
  info: (message: string, options?: any) => sonnerToast.info(message, options),
  warning: (message: string, options?: any) => sonnerToast.warning(message, options),
};
